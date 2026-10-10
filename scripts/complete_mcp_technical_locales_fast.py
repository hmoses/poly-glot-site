#!/usr/bin/env python3
"""Fast safe rebuild of only new MCP technical claims while preserving 21 approved locale entries.

The source-of-truth English catalog contains 37 claims. Each existing 21-claim
locale is reused, and only missing keys are machine translated at build time.
"""
import json,os
from concurrent.futures import ThreadPoolExecutor,as_completed
from build_mcp_technical_locales import SOURCE,TARGET,DEST,translate

def main():
    langs=os.environ.get('PG_TECH_LOCALES','').upper().split(',')
    if not langs or any(k not in TARGET for k in langs):raise ValueError(langs)
    for lang in langs:
        file=DEST/(lang.lower()+'.json')
        existing=json.loads(file.read_text(encoding='utf8'))
        assert existing['language']==lang,lang
        current=existing.get('strings',{})
        # Keep previously checked translations intact. Do not translate them again.
        keep={k:v for k,v in current.items() if k in SOURCE and isinstance(v,str) and v.strip() and v!=SOURCE[k]}
        missing={k:v for k,v in SOURCE.items() if k not in keep}
        if missing:
            with ThreadPoolExecutor(max_workers=4) as pool:
                futures={pool.submit(translate,txt,TARGET[lang]):k for k,txt in missing.items()}
                for f in as_completed(futures):
                    key=futures[f];keep[key]=f.result()
                    print('TRANSLATED',lang,key,flush=True)
        assert set(keep)==set(SOURCE),(lang,'missing keys')
        assert keep['chatIntro']!=SOURCE['chatIntro'],lang
        file.write_text(json.dumps({'language':lang,'strings':keep},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
        print('PASS',lang,len(keep),'verified localized technical claims, reused',len(current),'original keys',flush=True)
if __name__=='__main__':main()
