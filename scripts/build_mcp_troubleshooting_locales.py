#!/usr/bin/env python3
"""Build static 38-language Poly-Glot MCP troubleshooting catalogs.

This is a build-time task; site visitors never send text to a translation API.
English HTML is canonical and crawlable even if the locale build fails.
"""
from __future__ import annotations
import json, os, re, time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator
ROOT = Path(__file__).resolve().parents[1]
LANG = {"ES":"es","FR":"fr","DE":"de","IT":"it","PT":"pt","NL":"nl","RU":"ru",
"ZH":"zh-CN","ZH_TW":"zh-TW","JA":"ja","KO":"ko","AR":"ar","HI":"hi",
"BN":"bn","TR":"tr","PL":"pl","SV":"sv","NO":"no","DA":"da","FI":"fi",
"EL":"el","HE":"iw","ID":"id","MS":"ms","TH":"th","VI":"vi","UK":"uk",
"CS":"cs","RO":"ro","HU":"hu","SK":"sk","HR":"hr","CA":"ca","AF":"af",
"SW":"sw","HA":"ha","AM":"am"}
IDENTIFIERS = re.compile(r"\b(?:get_language_options|get_subscription_status|open_workspace|search_templates|get_template|build_prompt|prepare_compare|get_custom_model_capabilities|validate_custom_model|run_custom_model|prepare_custom_compare|transcribe_audio|detect_language|translate_text|localize_text)\b")
def extract():
    document=BeautifulSoup((ROOT/"mcp-integrations.html").read_text(encoding="utf8"),"html.parser")
    box=document.find(id="mcp-troubleshooting")
    assert box, "MCP guide not found"
    items={}
    for el in box.select("[data-mcp-tr]"):
        key=el.get("data-mcp-tr")
        value=" ".join(el.stripped_strings)
        assert key and value and key not in items, "Empty or duplicate key "+str(key)
        items[key]=value
    assert len(items)>=35, f"Only {len(items)} translatable entries"
    return items
def preserve_codes(source, translation):
    codes=list(dict.fromkeys(IDENTIFIERS.findall(source)))
    lost=[code for code in codes if code not in translation]
    if lost: translation=translation.rstrip(" .。") + " (" + ", ".join(lost) + ")"
    return translation.strip()
def translate_one(item,target):
    key,source=item
    for retry in range(5):
        try:
            tr=GoogleTranslator(source="en",target=target).translate(source)
            if tr and tr.strip():
                return key,preserve_codes(source,tr.strip())
        except Exception as exc:
            if retry==4: print(f"Translate {key} failed: {exc}",flush=True)
            time.sleep(min(18,2**retry))
    raise RuntimeError(f"Unable to translate {key} into {target}")
def main():
    en=extract()
    out=ROOT/"assets"/"locales"/"mcp-troubleshooting"
    out.mkdir(parents=True,exist_ok=True)
    locale=os.getenv("PG_MCP_LOCALE","")
    if locale not in LANG: raise RuntimeError(f"Unsupported locale: {locale}")
    target=LANG[locale]
    # Per-locale throttled workers; preserve all content without truncation.
    translated={}
    with ThreadPoolExecutor(max_workers=3) as pool:
        futures=[pool.submit(translate_one,entry,target) for entry in en.items()]
        for result in as_completed(futures):
            k,v=result.result()
            translated[k]=v
    missing=set(en)-set(translated)
    assert not missing,f"{locale} missing keys: {missing}"
    assert all(translated[k] and len(translated[k])<6000 for k in en)
    assert translated["title"]!=en["title"],f"{locale} heading not localized"
    file=out/(locale.lower()+".json")
    file.write_text(json.dumps({"language":locale,"strings":{k:translated[k] for k in en}},
                  ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"SUCCESS: {locale} {len(translated)} translated troubleshooting strings",flush=True)
if __name__=="__main__":main()
