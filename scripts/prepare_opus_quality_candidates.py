#!/usr/bin/env python3
"""Prepare higher-quality Apache-2.0 OPUS translation candidates (no automatic overwrite).
Localizes only public site strings, never visitor content. Candidates undergo review.
"""
import os,json,re,pathlib
import torch
from transformers import MarianMTModel,MarianTokenizer
ROOT=pathlib.Path(__file__).resolve().parents[1]
ISO={'ES':'spa','FR':'fra','DE':'deu','IT':'ita','PT':'por','NL':'nld','RU':'rus'}
CODE=os.environ.get('PG_LOCALE','ES')
assert CODE in ISO, f'Unsupported candidate language {CODE}'
torch.set_num_threads(2)
src=json.loads((ROOT/'assets/locales/subpages/en.json').read_text(encoding='utf8'))
old=json.loads((ROOT/'assets/locales/subpages'/(CODE.lower()+'.json')).read_text(encoding='utf8'))
model='Helsinki-NLP/opus-mt-en-mul'
tok=MarianTokenizer.from_pretrained(model)
net=MarianMTModel.from_pretrained(model).eval()
target=ISO[CODE]
keep=set(['App Store','Poly-Glot','MCP','MCP.so','Cursor','GitHub','ChatGPT','Claude','Gemini','Grok','Copilot','Mistral','Perplexity','JSON','HTTPS','HTTP','API','SDK'])
def translateable(term):
 if term in keep:return False
 if len(term)<18 or len(term)>1800:return False
 if re.search(r'https?://|\\w+\\.json|<[/A-Za-z]|\\{\\{|\\}\}',term):return False
 if re.fullmatch(r'[A-Z0-9_+ -]+',term):return False
 return True
keys=[s for s in src if translateable(s)]
result=dict(old); accepted=0; rejected=0
for i in range(0,len(keys),8):
 terms=keys[i:i+8]
 encoded=tok([f'>>{target}<< '+s for s in terms],return_tensors='pt',padding=True,truncation=True,max_length=450)
 with torch.no_grad():
  ids=net.generate(**encoded,num_beams=3,max_new_tokens=250)
 translated=tok.batch_decode(ids,skip_special_tokens=True)
 for term,val in zip(terms,translated):
  val=val.strip()
  good=bool(val and len(val)>min(8,len(term)*0.25) and len(val)<len(term)*3 and val!=term)
  # Preserve exact numeric entitlements and section-specific values.
  nums=re.findall(r'\\d+(?:[.,]\\d+)*',term)
  for n in nums:
   if n not in val and n.replace(',','.') not in val:good=False
  if good:
   result[term]=val;accepted+=1
  else:rejected+=1
 if i%64==0:print(CODE,i,'/',len(keys),'accepted',accepted,'rejected',rejected,flush=True)
dest=ROOT/'quality-candidates'
dest.mkdir(exist_ok=True)
(dest/(CODE.lower()+'.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\\n',encoding='utf8')
print(CODE,'COMPLETE candidate',accepted,'accepted',rejected,'fallback','of',len(keys),flush=True)
for k in ['Privacy Policy','Terms of Use','The app is available for Apple devices.','By using Poly-Glot AI Workspace, you agree to these terms.','We do not collect, store, or transmit any personal information. The App operates entirely on-device. No user data, prompts, or usage information is sent to any server.']:
 if k in result:print(CODE,'SAMPLE',repr(k),repr(result[k]),flush=True)
