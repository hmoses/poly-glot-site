#!/usr/bin/env python3
"""Build static MCP troubleshooting translations using the site's proven offline M2M100 pipeline.

This is a build step only: no live visitor input is sent to an external translator.
Technical identifiers and DOM structure stay in the English source HTML.
"""
import json, os, re, time
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment
from huggingface_hub import snapshot_download
import ctranslate2
from transformers import M2M100Tokenizer

ROOT=Path(__file__).resolve().parents[1]
CODES="ES FR DE IT PT NL RU ZH ZH_TW JA KO AR HI BN TR PL SV NO DA FI EL HE ID MS TH VI UK CS RO HU SK HR CA AF SW HA AM".split()
SKIP={"code","pre","script","style","textarea","svg"}
CODES_MAP={code:code.lower() for code in CODES}
CODES_MAP.update({"ZH_TW":"zh", "ZH":"zh"})
try:
    from opencc import OpenCC
except ImportError:
    OpenCC=None

def extract():
    html=BeautifulSoup((ROOT/"mcp-integrations.html").read_text(encoding="utf8"),"html.parser")
    section=html.find(id="mcp-troubleshooting")
    if section is None:raise RuntimeError("Missing MCP guide")
    entries={}
    for el in section.select("[data-mcp-tr]"):
        key=el["data-mcp-tr"]
        segments=[]
        for n in el.descendants:
            if not isinstance(n,NavigableString) or isinstance(n,Comment):continue
            if any(p.name in SKIP for p in n.parents):continue
            val=" ".join(str(n).split())
            if val:segments.append(val)
        if not segments:raise RuntimeError("Empty source: "+key)
        if key in entries:
            if entries[key]!=segments:raise RuntimeError("Conflicting repeated source key: "+key)
        else:entries[key]=segments
    if len(entries)<40:raise RuntimeError("Unexpectedly few source labels")
    return entries

def main():
    langs=[x.strip().upper() for x in os.environ.get("PG_MCP_LOCALES","").split(",") if x.strip()]
    if not langs or any(lang not in CODES for lang in langs):
        raise RuntimeError("Pass one or more valid PG_MCP_LOCALES")
    source=extract()
    dirname=ROOT/"assets/locales/mcp-troubleshooting"
    dirname.mkdir(parents=True,exist_ok=True)
    start=time.monotonic()
    model=Path("/tmp/polyglot-mcp-m2m100-model")
    snapshot_download(repo_id="gn64/M2M100_418M_CTranslate2",local_dir=str(model),
        allow_patterns=["model.bin","config.json","sentencepiece.bpe.model","shared_vocabulary.json"])
    tokenizer=M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")
    tokenizer.src_lang="en"
    translator=ctranslate2.Translator(str(model),device="cpu",compute_type="int8",inter_threads=2,intra_threads=2)
    simplified_to_traditional=OpenCC("s2t") if OpenCC else None
    print("Model loaded in",round(time.monotonic()-start,1),"seconds",flush=True)

    # Existing approved human edits are retained; don't rewrite Dutch.
    for lang in langs:
        filename=dirname/(lang.lower()+".json")
        old={}
        if filename.exists():
            old=json.loads(filename.read_text(encoding="utf8")).get("strings",{})
        reused={}
        for key,parts in source.items():
            prev=old.get(key)
            if isinstance(prev,list) and len(prev)==len(parts) and all(isinstance(s,str) and s.strip() for s in prev):
                reused[key]=prev
        todo=list(dict.fromkeys(s for k,v in source.items() if k not in reused for s in v))
        # Reuse previously published translations when the text occurs in another guide.
        subpage=ROOT/"assets/locales/subpages"/(lang.lower()+".json")
        previous=json.loads(subpage.read_text(encoding="utf8")) if subpage.exists() else {}
        answers={s:previous[s] for s in todo if isinstance(previous.get(s),str) and previous[s].strip() and previous[s]!=s}
        todo=[s for s in todo if s not in answers]
        target=CODES_MAP[lang]
        prefix=[tokenizer.lang_code_to_token[target]]
        for offset in range(0,len(todo),12):
            batch=todo[offset:offset+12]
            token_batch=[tokenizer.convert_ids_to_tokens(tokenizer.encode(s)) for s in batch]
            result=translator.translate_batch(token_batch,target_prefix=[prefix]*len(batch),
                beam_size=2,max_decoding_length=480)
            for origin,response in zip(batch,result):
                hypothesis=response.hypotheses[0]
                if hypothesis and hypothesis[0]==prefix[0]:hypothesis=hypothesis[1:]
                translated=tokenizer.decode(tokenizer.convert_tokens_to_ids(hypothesis),skip_special_tokens=True).strip()
                if not translated:
                    retry=origin.rstrip(".!?")+"."
                    token_retry=tokenizer.convert_ids_to_tokens(tokenizer.encode(retry))
                    retry_out=translator.translate_batch([token_retry],target_prefix=[prefix],beam_size=3,max_decoding_length=480)[0].hypotheses[0]
                    if retry_out and retry_out[0]==prefix[0]:retry_out=retry_out[1:]
                    translated=tokenizer.decode(tokenizer.convert_tokens_to_ids(retry_out),skip_special_tokens=True).strip()
                if lang=="ZH_TW" and simplified_to_traditional:translated=simplified_to_traditional.convert(translated)
                if not translated:raise RuntimeError("Empty translation "+lang+" "+repr(origin))
                answers[origin]=translated
            print(lang,min(offset+12,len(todo)),"/",len(todo),flush=True)

        result={k:reused[k] if k in reused else [answers[s] for s in v] for k,v in source.items()}
        if set(result)!=set(source):raise RuntimeError("Missing labels: "+lang)
        if any(len(result[k])!=len(v) or any(not s.strip() for s in result[k]) for k,v in source.items()):
            raise RuntimeError("Incomplete translation: "+lang)
        if result["title"][0]==source["title"][0]:raise RuntimeError("Untranslated heading: "+lang)
        filename.write_text(json.dumps({"language":lang,"strings":result},ensure_ascii=False,indent=2)+"\n",encoding="utf8")
        print("PASS",lang,len(result),"translated keys",sum(map(len,result.values())),"text segments",flush=True)
    print("COMPLETE",",".join(langs),"elapsed",round(time.monotonic()-start,1),flush=True)

if __name__=="__main__":main()
