/* Photo-to-AI help content: localized answers to OCR, scanner and privacy questions. */
(function(w,d){"use strict";
function code(){var i=w._pgI18n;var s=String(i&&typeof i.curLang==="function"?i.curLang():localStorage.getItem("pgLang")||"EN").toUpperCase().replace(/-/g,"_");return s;}
function pack(lang){var a=w.PGPhotoAILocales||{};return a[lang]||a[lang.split("_")[0]]||a.EN;}
function install(){
 var all=w.PGPhotoAILocales||{},chat=w._pgChatI18n;if(!chat||!chat.KBL)return;
 for(var lang of Object.keys(all)){var p=all[lang];var c=lang==="ZH_TW"?"ZH-TW":lang;
  var answer="**📷 "+p.comingSoonLine+"**\n\n"+p.comingSoon+" — "+p.ocrMeaning+"\n\n"+p.photoCompatibility+"\n\n"+p.locked+"\n\n"+p.photoPolicy+"\n\n**ChatGPT · Claude · Gemini · Grok · Perplexity · Mistral**\n"+p.manualPhoto+"\n\n**DuckDuckGo AI**\n"+p.duckImageModel+"\n\n**HuggingChat**\n"+p.huggingUnavailable;
  if(!chat.KBL[c])chat.KBL[c]={};
  chat.KBL[c]["photo to ai"]=answer;
  if(c!==lang){if(!chat.KBL[lang])chat.KBL[lang]={};chat.KBL[lang]["photo to ai"]=answer;}
 }
}
function label(){var p=pack(code());var option=d.querySelector('#pgChat-topics-select option[value="Photo to AI"]');if(option&&p)option.textContent="📷 "+p.comingSoonLine;}
w.PGPhotoAIIsQuestion=function(q){q=String(q||"").toLowerCase();if(/\bocr\b|optical character recognition|photos?|pictures?|images?|scann?(?:er|ing)?|camera/.test(q))return true;
 var c=code(),p=pack(c);return !!(p&&[p.feature,p.scanText].some(function(v){return v&&v.length>=4&&q.indexOf(v.toLowerCase())>=0;}));
};
function apply(){install();label();}
w.addEventListener("pg:languagechange",apply);
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",apply);else apply();
})(window,document);
