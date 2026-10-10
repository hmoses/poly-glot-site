#!/usr/bin/env python3
"""Publish complete static MCP guide translations; preserve structural HTML and technical code.

Uses a public translation endpoint only at build time with public English documentation.
Never sends visitor text, credentials or analytics.
"""
import json,os,re,time,urllib.parse,urllib.request
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/locales/mcp-troubleshooting"
LANG={"ES":"es","FR":"fr","DE":"de","IT":"it","PT":"pt","NL":"nl","RU":"ru",
 "ZH":"zh-CN","ZH_TW":"zh-TW","JA":"ja","KO":"ko","AR":"ar","HI":"hi","BN":"bn",
 "TR":"tr","PL":"pl","SV":"sv","NO":"no","DA":"da","FI":"fi","EL":"el",
 "HE":"iw","ID":"id","MS":"ms","TH":"th","VI":"vi","UK":"uk","CS":"cs",
 "RO":"ro","HU":"hu","SK":"sk","HR":"hr","CA":"ca","AF":"af","SW":"sw",
 "HA":"ha","AM":"am"}
SKIP={"code","pre","script","style","textarea","svg"}
def source():
    soup=BeautifulSoup((ROOT/"mcp-integrations.html").read_text(encoding="utf8"),"html.parser")
    result={}
    for el in soup.select("#mcp-troubleshooting [data-mcp-tr]"):
        key=el["data-mcp-tr"]
        parts=[]
        for n in el.descendants:
            if not isinstance(n,NavigableString) or isinstance(n,Comment):continue
            if any(ancestor.name in SKIP for ancestor in n.parents):continue
            segment=" ".join(str(n).split())
            if segment:parts.append(segment)
        if key in result:
            assert result[key]==parts,key
        else:result[key]=parts
    assert len(result)==45,(len(result),"Unexpected source structure")
    return result
def fetch_translation(text,target):
    params=urllib.parse.urlencode({"client":"gtx","sl":"en","tl":target,"dt":"t","q":text})
    url="https://translate.googleapis.com/translate_a/single?"+params
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 PolyGlotSiteLocalization/1.0"})
    with urllib.request.urlopen(req,timeout=22) as response:
        result=json.load(response)
    if not isinstance(result,list) or not result or not isinstance(result[0],list):
        raise ValueError("Malformed machine translation response")
    value="".join(part[0] for part in result[0] if isinstance(part,list) and part and isinstance(part[0],str)).strip()
    if not value:raise ValueError("Empty translation for "+text[:60])
    return value
def translate(text,target):
    # Preserve product brand across languages. Technical function IDs are kept inside <code> in the HTML.
    terms={"Poly-Glot":"POLYGLOTBRAND"}
    protected=text.replace("Poly-Glot","POLYGLOTBRAND")
    last=None
    for attempt in range(5):
        try:
            output=fetch_translation(protected,target)
            # The translation service may insert spaces in all-caps placeholders.
            output=re.sub(r"POLY\\s*GLOT\\s*BRAND", "Poly-Glot",output,flags=re.I)
            output=output.replace("POLYGLOTBRAND","Poly-Glot")
            if "POLYGLOTBRAND" in protected and "Poly-Glot" not in output:
                # Rather than publish a brand name omission, retry translation without placeholder.
                output=fetch_translation(text,target)
            if not output.strip():raise ValueError("Translation empty")
            if len(output)>max(250,len(text)*6):
                raise ValueError("Translation length implausible: "+str(len(output)))
            if len(output)>180:
                tokens=re.findall(r"\\w+",output.lower())
                if len(tokens)>60 and len(set(tokens))/len(tokens)<0.13:
                    raise ValueError("Likely repetitive MT degeneration")
            return output
        except Exception as e:
            last=e
            print("RETRY",target,attempt+1,type(e).__name__,str(e)[:80],flush=True)
            time.sleep(min(9,1.5*(attempt+1)))
    raise RuntimeError(f"Translation failed {target}: {text[:65]}: {last}")
def main():
    lang=os.environ.get("PG_MCP_GOOGLE_LANG","").strip().upper()
    if lang not in LANG:raise ValueError("Unknown target locale "+lang)
    original=source()
    OUT.mkdir(parents=True,exist_ok=True)
    path=OUT/(lang.lower()+".json")
    if lang=="NL":
        # The Dutch catalog was manually reviewed and should not be overwritten.
        val=json.loads(path.read_text(encoding="utf8"))
        assert val["language"]=="NL" and set(val["strings"])==set(original)
        print("PASS preserved reviewed Dutch translations",flush=True)
        return
    cache={}
    answer={}
    total=sum(len(v) for v in original.values())
    completed=0
    for key,parts in original.items():
        translated=[]
        for part in parts:
            if part not in cache:cache[part]=translate(part,LANG[lang])
            translated.append(cache[part])
            completed+=1
        answer[key]=translated
        if completed%12==0:print(lang,completed,"/",total,flush=True)
    assert set(answer)==set(original)
    assert all(len(answer[k])==len(original[k]) and all(v.strip() for v in answer[k]) for k in original)
    assert answer["title"][0]!=original["title"][0]
    path.write_text(json.dumps({"language":lang,"strings":answer},ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PASS",lang,len(answer),"keys",sum(len(v) for v in answer.values()),"segments",flush=True)
if __name__=="__main__":main()
