#!/usr/bin/env python3
"""Offline commercial-compatible 38-language catalog generation.
SMaLL-100: MIT; model: entai2965/small100-ctranslate2.
Model is used only during publishing; no visitor data and no model in Pages output.
"""
import json, os, sys, pathlib, re, time
# Source extraction must never import network-dependent translation libraries.
from build_subpage_locales import ROOT, LANG, extract
from huggingface_hub import snapshot_download
import ctranslate2

CODES={code:code.lower() for code in LANG}
CODES.update({"ZH":"zh","ZH_TW":"zh","FIL":"tl"})
# Traditional Chinese shares the Chinese model output, then converts script offline.
try:
    from opencc import OpenCC
except ImportError:
    OpenCC=None

def main():
    path=pathlib.Path(os.environ.get('PG_OFFLINE_MODEL','/tmp/pg-small100-model'))
    start=time.monotonic()
    print('Downloading MIT-licensed offline translation model...',flush=True)
    snapshot_download(
        repo_id='entai2965/small100-ctranslate2',
        local_dir=str(path),
        allow_patterns=['model.bin','config.json','sentencepiece.bpe.model',
                        'shared_vocabulary.json','special_tokens_map.json',
                        'tokenization_small100.py','tokenizer_config.json','vocab.json'],
    )
    sys.path.insert(0,str(path))
    from tokenization_small100 import SMALL100Tokenizer
    tokenizer=SMALL100Tokenizer.from_pretrained(str(path))
    translator=ctranslate2.Translator(str(path),device='cpu',compute_type='int8',
                                       inter_threads=2,intra_threads=2)
    print('Offline model loaded in',round(time.monotonic()-start,1),'seconds',flush=True)
    en=extract()
    print('Unique source strings',len(en),flush=True)
    probe=os.environ.get('PG_OFFLINE_PROBE')=='1'
    if probe:
        en=['Connect your AI assistant to Poly-Glot MCP.',
            'Save the configuration, enable the server, and approve tool access.',
            'Privacy Policy']
    only=os.environ.get('PG_ONLY_LOCALE')
    if only and only not in LANG:raise ValueError('Unsupported locale '+only)
    selected=os.environ.get('PG_ONLY_LOCALES')
    codes=['ES','NL','AR','ZH_TW'] if probe else selected.split(',') if selected else [only] if only else list(LANG)
    if any(c not in LANG for c in codes):raise ValueError('Unknown locale in group '+str(codes))
    outdir=ROOT/'assets'/'locales'/'subpages'
    outdir.mkdir(parents=True,exist_ok=True)
    (outdir/'en.json').write_text(json.dumps(en,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    traditional=OpenCC('s2t') if OpenCC else None
    for code in codes:
        language=CODES[code]
        tokenizer.tgt_lang=language
        prefix=[tokenizer.lang_code_to_token[language]]
        target_file=outdir/(code.lower()+'.json')
        old={}
        if target_file.exists():
            try:old=json.loads(target_file.read_text(encoding='utf8'))
            except ValueError:pass
        output={term:old[term] for term in en if term in old and old[term]}
        # A lone interface shortcut/technical letter is language-neutral.
        for term in en:
            if re.fullmatch(r'[A-Za-z]',term) or re.fullmatch(r'[A-Z0-9_-]{2,8}',term):
                output[term]=term
        todo=[term for term in en if term not in output]
        print(code,'source count',len(en),'remaining',len(todo),flush=True)
        for i in range(0,len(todo),12):
            batch=todo[i:i+12]
            token_batch=[tokenizer.convert_ids_to_tokens(tokenizer.encode(s)) for s in batch]
            translations=translator.translate_batch(
                token_batch,target_prefix=[prefix]*len(batch),
                beam_size=1,max_decoding_length=384)
            for term,result in zip(batch,translations):
                ids=tokenizer.convert_tokens_to_ids(result.hypotheses[0][1:])
                translated=tokenizer.decode(ids,skip_special_tokens=True).strip()
                if code=='ZH_TW' and traditional:translated=traditional.convert(translated)
                # Do not silently replace missing machine outputs with English.
                if not translated and (len(term)<=2 or re.fullmatch(r'[A-Z0-9._/+:-]{2,30}',term)):
                    translated=term # A symbol, identifier or acronym needs no natural-language translation.
                if not translated:
                    # Short UI labels can decode to EOS only; re-encode with
                    # punctuation to provide sentence context before failing.
                    retry=term.rstrip('.!?')+'.'
                    retry_tokens=tokenizer.convert_ids_to_tokens(tokenizer.encode(retry))
                    result2=translator.translate_batch([retry_tokens],target_prefix=[prefix],beam_size=3,max_decoding_length=384)[0]
                    retry_ids=tokenizer.convert_tokens_to_ids(result2.hypotheses[0][1:])
                    translated=tokenizer.decode(retry_ids,skip_special_tokens=True).strip().rstrip('.。।')
                if not translated:raise ValueError(f'Empty translation after retry: {code} {term[:80]}')
                output[term]=translated
            if (i//12)%15==0:
                target_file.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
                print(code,min(i+12,len(todo)),'/',len(todo),flush=True)
        target_file.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
        missing=set(en)-set(output)
        if missing:raise RuntimeError(f'{code} untranslated source nodes: {len(missing)}')
        print(code,'COMPLETE',len(output),'strings',flush=True)
    print('Completed in seconds',round(time.monotonic()-start,1),flush=True)
if __name__=='__main__':main()
