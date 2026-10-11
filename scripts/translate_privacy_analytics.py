#!/usr/bin/env python3
"""Translate only new October 2026 PostHog policy copy; preserve every prior locale key.
Published static legal copy may be sent to a translation service during CI.
Translations should be reviewed by a fluent reviewer for legally significant wording.
"""
import json, os, time, re
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
from deep_translator import GoogleTranslator
ROOT=Path(__file__).resolve().parents[1]
LANG={'ES':'es','FR':'fr','DE':'de','IT':'it','PT':'pt','NL':'nl','RU':'ru','ZH':'zh-CN','ZH_TW':'zh-TW','JA':'ja','KO':'ko','AR':'ar','HI':'hi','BN':'bn','TR':'tr','PL':'pl','SV':'sv','NO':'no','DA':'da','FI':'fi','EL':'el','HE':'iw','ID':'id','MS':'ms','TH':'th','VI':'vi','UK':'uk','CS':'cs','RO':'ro','HU':'hu','SK':'sk','HR':'hr','CA':'ca','AF':'af','SW':'sw','HA':'ha','AM':'am'}
def clean(s):return " ".join(s.split())
soup=BeautifulSoup((ROOT/'privacy.html').read_text(encoding='utf8'),'html.parser')
h=next(h for h in soup.find_all('h2') if h.get_text(strip=True)=='Optional In-App Usage Analytics')
strings=[clean(h.get_text())]
for sibling in list(h.next_siblings):
 if getattr(sibling,'name',None)=='h2':break
 if getattr(sibling,'name',None)!='p':continue
 for node in sibling.descendants:
  if isinstance(node,NavigableString):
   raw=clean(str(node))
   if raw and re.search('[A-Za-z]',raw):strings.append(raw)
strings=list(dict.fromkeys(strings))
assert len(strings)>=5, 'Missing expected optional analytics privacy clauses'
script=(ROOT/'assets/js/privacy-analytics-exact-locales.js').read_text(encoding='utf8')
curated=json.loads(script.split('var texts=',1)[1].split(';',1)[0])
root=ROOT/'assets/locales/subpages'
code=os.environ.get('PG_ONLY_LOCALE')
assert code in LANG, 'Must translate precisely one supported locale'
path=root/(code.lower()+'.json')
prior=json.loads(path.read_text(encoding='utf8')) if path.exists() else {}
translation=prior.copy()
engine=GoogleTranslator(source='en',target=LANG[code])
for original in strings:
 if original in curated[code]:
  result=curated[code][original]
 else:
  result=None
  for attempt in range(6):
   try:
    result=engine.translate(original)
    if result and result.strip():break
   except Exception as err:
    print(code,'retry',attempt+1,str(err)[:120],flush=True)
   time.sleep(min(16,2**attempt))
 assert isinstance(result,str) and result.strip(),f'{code}: untranslated: {original[:100]}'
 translation[original]=result.strip()
path.write_text(json.dumps(translation,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
enpath=root/'en.json'
# en.json must be updated once by the aggregator, not by concurrent matrix jobs.
print(f'{code}: {len(strings)} PostHog policy terms localized; previous {len(prior)} keys retained',flush=True)
