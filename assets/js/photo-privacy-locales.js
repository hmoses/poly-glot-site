/* Localized Photo-to-AI privacy addendum. Existing privacy and analytics wording is unchanged. */
(function(w,d){'use strict';
function code(){
 var raw=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())||
   localStorage.getItem('pgLang')||navigator.language||'EN';
 return String(raw).toUpperCase().replace(/-/g,'_');
}
function apply(){
 var all=w.PGPhotoAILocales||{},raw=code(),t=all[raw]||all[raw.split('_')[0]]||all.EN;
 if(!t)return;
 var title=d.getElementById('pgPhotoPolicyHeading'),ocr=d.getElementById('pgPhotoPolicyOCR'),
     share=d.getElementById('pgPhotoPolicySharing'),wrap=d.getElementById('pgPhotoPolicy');
 if(title)title.textContent=t.comingSoonLine+' / OCR';
 if(ocr)ocr.textContent=t.comingSoon+': '+t.ocrMeaning;
 if(share)share.textContent=t.comingSoon+': '+t.privacy+' '+t.providerLimit;
 var details=d.getElementById('pgPhotoPolicyProviders');
 if(!details&&wrap){details=d.createElement('p');details.id='pgPhotoPolicyProviders';wrap.appendChild(details);}
 if(details)details.textContent=t.comingSoon+': ChatGPT · Claude · Gemini · Grok · Perplexity · Mistral: '+t.manualPhoto+' DuckDuckGo AI: '+t.duckImageModel+' HuggingChat: '+t.huggingUnavailable;
 if(wrap)wrap.dir=raw==='AR'||raw==='HE'?'rtl':'ltr';
}
w.addEventListener('pg:languagechange',apply);
w.addEventListener('pageshow',apply);
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})(window,document);
