from huggingface_hub import snapshot_download
import ctranslate2,sys
root=snapshot_download('entai2965/small100-ctranslate2',allow_patterns=['model.bin','config.json','sentencepiece.bpe.model','shared_vocabulary.json','special_tokens_map.json','tokenization_small100.py','tokenizer_config.json','vocab.json'])
sys.path.insert(0,root)
from tokenization_small100 import SMALL100Tokenizer
tok=SMALL100Tokenizer.from_pretrained(root)
ct=ctranslate2.Translator(root,device='cpu',compute_type='int8')
for language in ['es','fr','de']:
 tok.tgt_lang=language
 prefix=[tok.lang_code_to_token[language]]
 for term in ['Connect from other supported MCP clients','15 Tools Available','Explore related topics','What is MCP?','Support','The app is available for Apple devices.']:
  tokens=tok.convert_ids_to_tokens(tok.encode(term))
  obj=ct.translate_batch([tokens],target_prefix=[prefix],beam_size=4,max_decoding_length=384)[0]
  hypo=obj.hypotheses[0]
  for drop in [0,1]:
   out=tok.decode(tok.convert_tokens_to_ids(hypo[drop:]),skip_special_tokens=True)
   print(language,repr(term),'drop',drop,repr(out),flush=True)
  print('hypothesis',hypo[:5],flush=True)
