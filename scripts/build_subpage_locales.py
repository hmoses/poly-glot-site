#!/usr/bin/env python3
"""Build per-language static translation dictionaries for the Poly-Glot secondary pages.
Requires: pip install beautifulsoup4 deep-translator
Never sends visitor content; translates only published site copy during a build.
"""
import json, re, time, pathlib, sys
from bs4 import BeautifulSoup, NavigableString
from deep_translator import GoogleTranslator
ROOT=pathlib.Path(__file__).resolve().parents[1]
PAGES=['connect.html','compare-ai-tools.html','multilingual-ai-workspace.html','prompt-templates.html','mcp-integrations.html','privacy-and-pricing.html','privacy.html','terms.html','support.html','share.html','seo-setup.html','linkedin.html','linkedin-mcp-2026.html']
LANG={'ES':'es','FR':'fr','DE':'de','IT':'it','PT':'pt','NL':'nl','RU':'ru','ZH':'zh-CN','ZH_TW':'zh-TW','JA':'ja','KO':'ko','AR':'ar','HI':'hi','BN':'bn','TR':'tr','PL':'pl','SV':'sv','NO':'no','DA':'da','FI':'fi','EL':'el','HE':'iw','ID':'id','MS':'ms','TH':'th','VI':'vi','UK':'uk','CS':'cs','RO':'ro','HU':'hu','SK':'sk','HR':'hr','CA':'ca','AF':'af','SW':'sw','HA':'ha','AM':'am'}
SKIP={'script','style','noscript','pre','code','textarea','svg','template'}
def normalize(t): return ' '.join(t.split())
def extract():
    found=set()
    for page in PAGES:
        soup=BeautifulSoup((ROOT/page).read_text(encoding='utf8'),'html.parser')
        for node in soup.find_all(string=True):
            if any(p.name in SKIP or p.has_attr('data-no-translate') for p in node.parents): continue
            text=normalize(str(node))
            if not text or not re.search('[A-Za-z]',text) or re.match(r'^(https?://|www\.|[\\{\\}\[\\];=]+$)',text):continue
            if len(text)>4500: continue
            found.add(text)
        for tag in soup.find_all(True):
            if tag.name in SKIP: continue
            for attr in ('aria-label','title','placeholder','alt'):
                value=tag.get(attr)
                if isinstance(value,str):
                    value=normalize(value)
                    if value and re.search('[A-Za-z]',value):found.add(value)
    return sorted(found)
def main():
    terms=extract()
    assert len(LANG)==37
    dest=ROOT/'assets'/'locales'/'subpages'
    dest.mkdir(parents=True,exist_ok=True)
    source=dest/'en.json';source.write_text(json.dumps(terms,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('Unique English source strings:',len(terms),flush=True)
    missing={}
    for code,target in LANG.items():
        path=dest/(code.lower()+'.json')
        prior={}
        if path.exists():
            try:prior=json.loads(path.read_text(encoding='utf8'))
            except ValueError:pass
        translations={s:prior[s] for s in terms if s in prior and prior[s] and prior[s]!=s}
        translator=GoogleTranslator(source='en',target=target)
        for n,term in enumerate(terms):
            if term in translations:continue
            for attempt in range(4):
                try:
                    value=translator.translate(term)
                    if value and value.strip() and value.strip()!=term:
                        translations[term]=value.strip()
                    elif value and value.strip()==term:
                        translations[term]=term # product and technical terms may be intentionally unchanged
                    break
                except Exception as exc:
                    if attempt==3:print(f'FAILED {code} {n}: {exc}',flush=True)
                    else:time.sleep(2**attempt)
            if n%50==0:
                path.write_text(json.dumps(translations,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
                print(code,n,'/',len(terms),flush=True)
            time.sleep(0.09)
        path.write_text(json.dumps(translations,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
        unfilled=[t for t in terms if t not in translations]
        if unfilled:missing[code]=unfilled
        print(code,'complete',len(translations),'/',len(terms),flush=True)
    report={'languages':len(LANG),'source_strings':len(terms),'missing':missing}
    (dest/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    if missing:
        print('Translation gaps:',{k:len(v) for k,v in missing.items()},flush=True)
        sys.exit(1)
if __name__=='__main__':main()
