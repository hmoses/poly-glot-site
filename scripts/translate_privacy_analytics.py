#!/usr/bin/env python3
"""Translate only new October 2026 PostHog policy copy; preserve every prior locale key.
Published static legal copy may be sent to a translation service during CI.
Translations should be reviewed by a fluent reviewer for legally significant wording.
"""
import json, os, time, re
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
from huggingface_hub import snapshot_download
import ctranslate2
from transformers import M2M100Tokenizer
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
from build_subpage_locales_offline import CODES
model=Path(os.environ.get('PG_OFFLINE_MODEL','/tmp/polyglot-m2m100-privacy'))
snapshot_download(repo_id='gn64/M2M100_418M_CTranslate2',local_dir=str(model),
                  allow_patterns=['model.bin','config.json','sentencepiece.bpe.model','shared_vocabulary.json'])
tokenizer=M2M100Tokenizer.from_pretrained('facebook/m2m100_418M')
tokenizer.src_lang='en'
translator=ctranslate2.Translator(str(model),device='cpu',compute_type='int8',inter_threads=2,intra_threads=2)
prefix=[tokenizer.lang_code_to_token[CODES[code]]]
traditional=None
if code=='ZH_TW':
    from opencc import OpenCC
    traditional=OpenCC('s2t')
def translate(text):
    tokens=tokenizer.convert_ids_to_tokens(tokenizer.encode(text))
    result=translator.translate_batch([tokens],target_prefix=[prefix],beam_size=2,max_decoding_length=512)[0]
    output=list(result.hypotheses[0])
    if output and output[0]==prefix[0]:output=output[1:]
    decoded=tokenizer.decode(tokenizer.convert_tokens_to_ids(output),skip_special_tokens=True).strip()
    if traditional:decoded=traditional.convert(decoded)
    if not decoded:raise RuntimeError('Offline model returned empty translation for '+code+' / '+text[:80])
    return decoded
for original in strings:
 if original in curated[code]:
  result=curated[code][original]
 else:
  result=translate(original)
 assert isinstance(result,str) and result.strip(),f'{code}: untranslated: {original[:100]}'
 translation[original]=result.strip()
path.write_text(json.dumps(translation,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
enpath=root/'en.json'
# en.json must be updated once by the aggregator, not by concurrent matrix jobs.
print(f'{code}: {len(strings)} PostHog policy terms localized; previous {len(prior)} keys retained',flush=True)
