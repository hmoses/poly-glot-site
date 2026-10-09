#!/usr/bin/env python3
"""Validate and install reviewed OPUS candidates without changing technical literals."""
import json,re,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
SOURCE=set(json.loads((ROOT/'assets/locales/subpages/en.json').read_text(encoding='utf8')))
CODES=['ES','FR','DE','IT','PT','NL','RU']
PROTECT=('Poly-Glot','ChatGPT','Claude','Gemini','Grok','Perplexity','Mistral','Copilot','HuggingChat','DuckDuckGo','Apple','iOS','macOS','MCP','HTTP','JSON','API')
for code in CODES:
    oldfile=ROOT/'assets/locales/subpages'/(code.lower()+'.json')
    newfile=ROOT/'quality-candidates'/(code.lower()+'.json')
    old=json.loads(oldfile.read_text(encoding='utf8'))
    new=json.loads(newfile.read_text(encoding='utf8'))
    assert SOURCE<=old.keys(),f'Old catalog incomplete for {code}'
    assert SOURCE<=new.keys(),f'Candidate catalog incomplete for {code}'
    merged=dict(old);accepted=0;protected=0
    for en in SOURCE:
        candidate=new[en]
        if candidate==old[en] or not isinstance(candidate,str) or not candidate.strip():continue
        if len(en)<18 or len(candidate)>len(en)*3 or len(candidate)<len(en)*.2:continue
        if any(token in en and token not in candidate for token in PROTECT):
            protected+=1
            continue
        numbers=re.findall(r'\d+(?:[.,]\d+)*',en)
        if any(n not in candidate and n.replace(',','.') not in candidate for n in numbers):continue
        if code=='RU' and len(en)>30 and not re.search(r'[\u0400-\u04FF]',candidate):continue
        merged[en]=candidate;accepted+=1
    assert accepted>100,f'Too few upgraded strings {code}: {accepted}'
    oldfile.write_text(json.dumps(merged,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(code,'accepted',accepted,'protected',protected,'total source',len(SOURCE),flush=True)
print('Validated seven catalog upgrades.',flush=True)
