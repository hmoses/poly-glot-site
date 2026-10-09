#!/usr/bin/env python3
"""Selectively improve public-page machine translations with reviewed safeguards.

Uses the public site source text and OPUS candidate catalogs only.
This is mechanical screening, NOT human/legal certification.
"""
from pathlib import Path
import json,re,os,sys
ROOT=Path(__file__).resolve().parents[1]
CAT=ROOT/'assets/locales/subpages'
CAND=ROOT/'quality-candidates'
LANGS=('es','fr','de','it','pt','nl','ru')
BRANDS=('Poly-Glot','ChatGPT','Claude','Gemini','Grok','Perplexity','Copilot','Mistral','HuggingChat','DuckDuckGo','Cursor','Glama','MCP.so','GitHub','Neon','Apple','App Store','iOS','macOS','MCP','HTTPS','HTTP','JSON','Pro')
NEG={
 'es':r'\b(?:no|ning[uú]n|ni|nunca|sin)\b',
 'fr':r'\b(?:ne|pas|aucun|sans|jamais|ni)\b',
 'de':r'\b(?:nicht|kein\w*|ohne|nie)\b',
 'it':r'\b(?:non|nessun\w*|senza|mai)\b',
 'pt':r'\b(?:n[aã]o|nenhum\w*|sem|nunca)\b',
 'nl':r'\b(?:niet|geen|zonder|nooit)\b',
 'ru':r'(?:не|нет|без|никогда)'
}
def safe(key,value,locale):
    if not isinstance(value,str) or not value.strip():return False
    if key==value:return False
    if len(value)<max(7,0.24*len(key)) or len(value)>3.0*len(key):return False
    if '<script' in value.lower() or 'javascript:' in value.lower():return False
    if any(tag in key and tag not in value for tag in BRANDS):return False
    source_nums=re.findall(r'\d+(?:[.,]\d+)*',key)
    target_nums=re.findall(r'\d+(?:[.,]\d+)*',value)
    def norm_num(n):return n.replace(',','.')
    if any(norm_num(n) not in [norm_num(x) for x in target_nums] for n in source_nums):return False
    # Protect negative guarantees and permissions statements.
    if re.search(r'\b(?:not|no|never|without|doesn.t|don.t)\b',key,re.I):
        if not re.search(NEG[locale],value,re.I):return False
    if re.search(r'https?://|\.json\b|\[\[|\{\{|<[/\w]',key):return False
    if re.search(r'^\s*[\{\[\]#*]|^\s*["\x27]?\w+\s*:',key):return False
    return True

def run():
    source=set(json.loads((CAT/'en.json').read_text(encoding='utf8')))
    stats={}
    changed=0
    for lang in LANGS:
        file=CAT/(lang+'.json'); candidate=CAND/(lang+'.json')
        if not candidate.is_file():raise SystemExit('Missing quality artifact '+str(candidate))
        old=json.loads(file.read_text(encoding='utf8'))
        proposals=json.loads(candidate.read_text(encoding='utf8'))
        count=0
        for english in source:
            alt=proposals.get(english)
            if alt and alt!=old.get(english) and safe(english,alt,lang):
                old[english]=alt;count+=1
        if set(old)!=source:raise SystemExit(f'Coverage changed for {lang}')
        if count:
            file.write_text(json.dumps(old,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
        stats[lang]=count
        changed+=count
    print('OPUS quality replacements passing guards:',stats,'total:',changed,flush=True)
    if changed<80:raise SystemExit('Too few quality replacements; inspect the candidate artifacts')
if __name__=='__main__':run()
