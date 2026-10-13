#!/usr/bin/env python3
"""Complete the 38-language MCP technical catalogs entirely offline.
Reuse the 21 existing translated statements; generate only missing keys.
No visitor data, credentials, or runtime translation requests.
"""
import json,os,re,time
from pathlib import Path
from huggingface_hub import snapshot_download
import ctranslate2
from transformers import M2M100Tokenizer
from opencc import OpenCC

ROOT=Path(__file__).resolve().parents[1]
LOCALES=ROOT/"assets/locales/mcp-technical"
CODES="ES FR DE IT PT NL RU ZH ZH_TW JA KO AR HI BN TR PL SV NO DA FI EL HE ID MS TH VI UK CS RO HU SK HR CA AF SW HA AM".split()
LANG={code:code.lower() for code in CODES}
LANG["ZH_TW"]="zh"
PATTERN=re.compile(r"[A-Za-z_][A-Za-z0-9_]*(?:_[A-Za-z0-9_]+)+")
IDS=["get_language_options","search_templates","prepare_compare","transcribe_audio","Google Analytics","TikTok","Poly-Glot","ChatGPT","MCP","BYOM"]

def get_model():
    model=Path("/tmp/polyglot-technical-ct2-m2m100")
    snapshot_download(repo_id="gn64/M2M100_418M_CTranslate2",local_dir=str(model),
       allow_patterns=["model.bin","config.json","sentencepiece.bpe.model","shared_vocabulary.json"])
    tok=M2M100Tokenizer.from_pretrained("facebook/m2m100_418M")
    tok.src_lang="en"
    engine=ctranslate2.Translator(str(model),device="cpu",compute_type="int8",inter_threads=2,intra_threads=2)
    return tok,engine

def process(code,source,tokenizer,translator):
    file=LOCALES/(code.lower()+".json")
    before=json.loads(file.read_text(encoding="utf8"))
    old=before.get("strings",{})
    assert before["language"]==code,(code,"language ID")
    assert set(old).issubset(set(source)),(code,"extra obsolete keys",set(old)-set(source))
    new={k:v for k,v in old.items() if isinstance(v,str) and v.strip()}
    remaining=[(k,v) for k,v in source.items() if k not in new]
    print("START",code,"preserving",len(new),"existing translations; generating",len(remaining),flush=True)
    dest=LANG[code]
    assert dest in tokenizer.lang_code_to_id,(code,dest,"unsupported M2M100 language")
    prefix=[tokenizer.lang_code_to_token[dest]]
    convert=OpenCC("s2t") if code=="ZH_TW" else None

    def render_one(text,limit=205):
        tokens=tokenizer.convert_ids_to_tokens(tokenizer.encode(text))
        response=translator.translate_batch([tokens],target_prefix=[prefix],beam_size=3,
            max_decoding_length=limit,no_repeat_ngram_size=3,repetition_penalty=1.19)[0]
        hypothesis=response.hypotheses[0]
        if hypothesis and hypothesis[0]==prefix[0]:hypothesis=hypothesis[1:]
        return tokenizer.decode(tokenizer.convert_tokens_to_ids(hypothesis),skip_special_tokens=True).strip()

    for offset in range(0,len(remaining),6):
        batch=remaining[offset:offset+6]
        for key,english in batch:
            # Hausa and Amharic M2M100 often repeat when decoding long paragraphs.
            # Decode each sentence separately with a strict cap and 3-gram repetition guard.
            if code in ("HA","AM") or len(english)>420:
                units=re.split(r'(?<=[.!?])\s+(?=[A-Z0-9])',english)
                text=" ".join(render_one(unit,limit=175) for unit in units if unit.strip())
            else:
                text=render_one(english,limit=280)
            if convert:text=convert.convert(text)
            if not text:raise RuntimeError((code,key,"empty translation"))
            if len(text)>max(850,len(english)*3.5):
                raise RuntimeError((code,key,"translation too long",len(text)))
            words=re.findall(r"\w+",text.lower())
            if len(words)>60 and len(set(words))/len(words)<.17:
                raise RuntimeError((code,key,"degenerate repeated translation"))
            for token in ["get_language_options","search_templates","prepare_compare","transcribe_audio"]:
                if token in english and token not in text:text+=" ("+token+")"
            new[key]=text
        print("PROGRESS",code,min(offset+6,len(remaining)),"/",len(remaining),flush=True)
    ordered={key:new[key] for key in source}
    assert set(ordered)==set(source),(code,"missing",set(source)-set(ordered))
    assert all(isinstance(v,str) and v.strip() for v in ordered.values())
    assert ordered["chatIntro"]!=source["chatIntro"],code
    assert len(ordered)==37,(code,len(ordered))
    file.write_text(json.dumps({"language":code,"strings":ordered},ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PASS",code,"37 keys",flush=True)

def main():
    codes=[c.strip().upper() for c in os.environ.get("PG_TECH_OFFLINE_LOCALES","").split(",") if c.strip()]
    assert codes and all(c in CODES for c in codes)
    source=json.loads((LOCALES/"en.json").read_text(encoding="utf8"))["strings"]
    assert len(source)==37,len(source)
    tokenizer,translator=get_model()
    for code in codes:process(code,source,tokenizer,translator)
    print("SUCCESS",",".join(codes),flush=True)
if __name__=="__main__":main()
