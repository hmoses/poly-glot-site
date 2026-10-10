#!/usr/bin/env python3
"""Generate complete static troubleshooting locale catalogs for 37 non-English languages.

Translate individual visible text nodes while preserving <strong>, <code>,
<details>, <a> and the existing parallax-card DOM. Run at build time only.
"""
from __future__ import annotations
import json, os, re, time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup, NavigableString, Comment
from deep_translator import GoogleTranslator
ROOT=Path(__file__).resolve().parents[1]
LANG={"ES":"es","FR":"fr","DE":"de","IT":"it","PT":"pt","NL":"nl","RU":"ru","ZH":"zh-CN","ZH_TW":"zh-TW","JA":"ja","KO":"ko","AR":"ar","HI":"hi","BN":"bn","TR":"tr","PL":"pl","SV":"sv","NO":"no","DA":"da","FI":"fi","EL":"el","HE":"iw","ID":"id","MS":"ms","TH":"th","VI":"vi","UK":"uk","CS":"cs","RO":"ro","HU":"hu","SK":"sk","HR":"hr","CA":"ca","AF":"af","SW":"sw","HA":"ha","AM":"am"}
CODE=re.compile(r"\b(?:get_language_options|get_subscription_status|open_workspace|search_templates|get_template|build_prompt|prepare_compare|get_custom_model_capabilities|validate_custom_model|run_custom_model|prepare_custom_compare|transcribe_audio|detect_language|translate_text|localize_text)\b")
SKIP={"code","pre","script","style","textarea","svg"}
def extract():
    html=BeautifulSoup((ROOT/"mcp-integrations.html").read_text(encoding="utf8"),"html.parser")
    parent=html.find(id="mcp-troubleshooting")
    assert parent,"Missing troubleshooting section"
    entries={}
    for element in parent.select("[data-mcp-tr]"):
        key=element["data-mcp-tr"]
        chunks=[]
        for node in element.descendants:
            if not isinstance(node,NavigableString) or isinstance(node,Comment):continue
            if any(p.name in SKIP for p in node.parents):continue
            part=" ".join(str(node).split())
            if part:chunks.append(part)
        assert chunks,f"Empty localization string: {key}"
        if key in entries:assert entries[key]==chunks,f"Conflicting duplicate translation key: {key}"
        else:entries[key]=chunks
    assert len(entries)>=40,f"Unexpectedly incomplete troubleshooting catalog: {len(entries)} keys"
    return entries
def worker(item,target):
    source=item
    for attempt in range(5):
        try:
            value=GoogleTranslator(source="en",target=target).translate(source)
            if value and value.strip():
                result=value.strip()
                missing=[m for m in dict.fromkeys(CODE.findall(source)) if m not in result]
                if missing:result+=" ("+", ".join(missing)+")"
                return result
        except Exception as e:
            if attempt==4:print(f"Translation failure {target} {source[:65]}: {e}",flush=True)
            time.sleep(min(24,2**attempt))
    raise RuntimeError(f"Translation failure {target}: {source[:90]}")
def main():
    code=os.environ.get("PG_MCP_LOCALE")
    if code not in LANG:raise RuntimeError(f"PG_MCP_LOCALE must be one of {','.join(LANG)}")
    source=extract()
    out=ROOT/"assets"/"locales"/"mcp-troubleshooting"
    out.mkdir(parents=True,exist_ok=True)
    path=out/(code.lower()+".json")
    existing={}
    if path.exists():
        try:existing=json.loads(path.read_text(encoding="utf8")).get("strings",{})
        except (ValueError,TypeError):pass
    translations={};tasks={}
    for key,segments in source.items():
        saved=existing.get(key,[])
        translated=[]
        for index,segment in enumerate(segments):
            if index<len(saved) and isinstance(saved[index],str) and saved[index].strip() and saved[index]!=segment:
                translated.append(saved[index])
            else:
                translated.append(None)
                tasks[segment]=None
        translations[key]=translated
    # A small worker pool limits request bursts. Caching repeated text reduces API traffic.
    resolved={}
    with ThreadPoolExecutor(max_workers=2) as pool:
        pending={pool.submit(worker,segment,LANG[code]):segment for segment in tasks}
        for idx,future in enumerate(as_completed(pending),1):
            resolved[pending[future]]=future.result()
            if idx%20==0:print(code,idx,"/",len(tasks),flush=True)
    for key,segments in source.items():
        translations[key]=[translations[key][j] or resolved[segment] for j,segment in enumerate(segments)]
    assert set(translations)==set(source)
    assert all(len(translations[k])==len(s) and all(x.strip() for x in translations[k]) for k,s in source.items())
    assert translations["title"][0]!=source["title"][0],f"{code}: missing translated title"
    payload={"language":code,"strings":translations}
    path.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"PASS: {code}: {len(translations)} guide blocks, {sum(map(len,translations.values()))} text segments",flush=True)
if __name__=="__main__":main()
