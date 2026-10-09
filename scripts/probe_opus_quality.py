"""Quick quality probe for Apache-2.0 Helsinki OPUS multilingual model."""
from transformers import MarianMTModel, MarianTokenizer
import torch,time
model_id='Helsinki-NLP/opus-mt-en-mul'
print('Loading',model_id,flush=True)
tok=MarianTokenizer.from_pretrained(model_id)
m=MarianMTModel.from_pretrained(model_id).eval()
phrases=['Explore related topics','Connect from other supported MCP clients','Terms of Use','Privacy Policy','Compare AI Tools with Poly-Glot','Do I need to subscribe to use Poly-Glot?','The app is available for Apple devices.']
for code in ['es','fr','de','ar','ja']:
 for term in phrases:
  text='>>'+code+'<< '+term
  ids=tok([text],return_tensors='pt',padding=True,truncation=True)
  with torch.no_grad():outputs=m.generate(**ids,num_beams=2,max_new_tokens=90)
  print(code,repr(term),repr(tok.decode(outputs[0],skip_special_tokens=True)),flush=True)
