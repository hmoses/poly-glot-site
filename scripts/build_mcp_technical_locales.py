#!/usr/bin/env python3
"""Build static, reviewed-for-structure MCP technical copy for supported languages.
Translation occurs only at build time, never with visitor data. Fail closed on
missing or degraded translations, and preserve technical identifiers.
"""
import json, os, re, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/"assets/locales/mcp-technical"
SOURCE=json.loads((DEST/"en.json").read_text(encoding="utf8"))["strings"]
TARGET={
"ES":"es","FR":"fr","DE":"de","IT":"it","PT":"pt","NL":"nl","RU":"ru",
"ZH":"zh-CN","ZH_TW":"zh-TW","JA":"ja","KO":"ko","AR":"ar",
"HI":"hi","BN":"bn","TR":"tr","PL":"pl","SV":"sv","NO":"no",
"DA":"da","FI":"fi","EL":"el","HE":"iw","ID":"id","MS":"ms",
"TH":"th","VI":"vi","UK":"uk","CS":"cs","RO":"ro","HU":"hu",
"SK":"sk","HR":"hr","CA":"ca","AF":"af","SW":"sw","HA":"ha","AM":"am"}
IDENTIFIERS=["get_language_options","search_templates","prepare_compare","Streamable HTTP","MCP"]
def translate(text,code):
    params=urllib.parse.urlencode({"client":"gtx","sl":"en","tl":code,"dt":"t","q":text})
    url="https://translate.googleapis.com/translate_a/single?"+params
    err=None
    for attempt in range(6):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 PolyGlotTechnicalCopy/1.0"})
            with urllib.request.urlopen(req,timeout=22) as response: data=json.load(response)
            result="".join(x[0] for x in data[0] if isinstance(x,list) and x and isinstance(x[0],str)).strip()
            if not result:raise ValueError("Empty translation")
            if len(result)>max(750,len(text)*4.1):raise ValueError("Excessive translation length")
            words=re.findall(r"\w+",result.casefold())
            if len(words)>60 and len(set(words))/len(words)<.14:raise ValueError("Degenerate repeated words")
            # Never allow a technical function name to be renamed in public docs.
            for name in ["get_language_options","search_templates","prepare_compare"]:
                if name in text and name not in result:
                    result+=" ("+name+")"
            if "https://" in text and "https://" not in result:raise ValueError("URL modified")
            return result
        except Exception as e:
            err=e
            print("RETRY",code,attempt+1,str(e)[:150],flush=True)
            time.sleep(min(15,2**attempt))
    raise RuntimeError("Untranslatable "+code+": "+str(err))
def one(lang):
    translated={}
    with ThreadPoolExecutor(max_workers=3) as pool:
        jobs={pool.submit(translate,source,TARGET[lang]):key for key,source in SOURCE.items()}
        for future in as_completed(jobs):
            key=jobs[future]
            translated[key]=future.result()
    assert set(translated)==set(SOURCE)
    assert translated["chatIntro"]!=SOURCE["chatIntro"],lang
    for key,value in translated.items():
        assert isinstance(value,str) and value.strip() and len(value)<1200,(lang,key)
    path=DEST/(lang.lower()+".json")
    path.write_text(json.dumps({"language":lang,"strings":translated},ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PASS",lang,len(translated),"technical claims",flush=True)
def main():
    langs=os.environ.get("PG_TECH_LOCALES","").upper().split(",")
    assert langs and all(k in TARGET for k in langs),langs
    for lang in langs:one(lang)
if __name__=="__main__":main()
