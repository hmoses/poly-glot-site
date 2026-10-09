"""Diagnose missing first target token in generated static translations."""
import sys,time
from pathlib import Path
from huggingface_hub import snapshot_download
from opencc import OpenCC
import ctranslate2
path=Path('/tmp/pg-small100-probe')
snapshot_download(repo_id='entai2965/small100-ctranslate2',local_dir=str(path),allow_patterns=['model.bin','config.json','sentencepiece.bpe.model','shared_vocabulary.json','special_tokens_map.json','tokenization_small100.py','tokenizer_config.json','vocab.json'])
sys.path.insert(0,str(path))
from tokenization_small100 import SMALL100Tokenizer
tok=SMALL100Tokenizer.from_pretrained(str(path))
tr=ctranslate2.Translator(str(path),device='cpu',compute_type='int8',inter_threads=2,intra_threads=2)
for lang in ('es','nl','fr'):
 tok.tgt_lang=lang
 for src in ('Privacy Policy','Terms of Use','Open Cursor → Customize → MCPs','We do not collect, store, or transmit any personal information.'):
  inp=tok.convert_ids_to_tokens(tok.encode(src))
  result=tr.translate_batch([inp],target_prefix=[[tok.lang_code_to_token[lang]]],beam_size=2,max_decoding_length=192)[0]
  hypo=result.hypotheses[0]
  def d(tokens):return tok.decode(tok.convert_tokens_to_ids(tokens),skip_special_tokens=True)
  print(lang,repr(src),'hypothesis',hypo[:5],'all:',repr(d(hypo)),'stripped:',repr(d(hypo[1:])),flush=True)
