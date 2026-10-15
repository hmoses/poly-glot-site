/* Photo-to-AI help content: localized answers to OCR, scanner and privacy questions. */
(function(w,d){"use strict";
function code(){var i=w._pgI18n;var s=String(i&&typeof i.curLang==="function"?i.curLang():localStorage.getItem("pgLang")||"EN").toUpperCase().replace(/-/g,"_");return s;}
function pack(lang){var a=w.PGPhotoAILocales||{};return a[lang]||a[lang.split("_")[0]]||a.EN;}
function install(){
 var all=w.PGPhotoAILocales||{},chat=w._pgChatI18n;if(!chat||!chat.KBL)return;
 for(var lang of Object.keys(all)){var p=all[lang];var c=lang==="ZH_TW"?"ZH-TW":lang;
  var guides=w.PGPhotoHandoffGuideLocales||{},h=guides[lang]||guides[lang.split("_")[0]];
  var ios=h&&h[0]||p.photoUploadCopy||p.manualPhoto;
  var mac=h&&h[1]||p.manualPhoto;
  var context=h&&h[2]||p.context;
  var compatibility=h&&h[3]||p.providerLimit;
  var answer="**📷 "+p.feature+" · Mac · iPhone · iPad**\n\n"+
    p.ocrMeaning+"\n\n**📱 iPhone / iPad**\n"+ios+
    "\n\n**💻 Mac**\n"+mac+
    "\n\n"+context+"\n\n"+compatibility+
    "\n\n"+p.photoPolicy+"\n\n"+p.locked;
  if(!chat.KBL[c])chat.KBL[c]={};
  chat.KBL[c]["photo to ai"]=answer;
  if(c!==lang){if(!chat.KBL[lang])chat.KBL[lang]={};chat.KBL[lang]["photo to ai"]=answer;}
 }
}
function label(){var p=pack(code());var option=d.querySelector('#pgChat-topics-select option[value="Photo to AI"]');if(option&&p)option.textContent="📷 "+p.feature;}
w.PGPhotoAIIsQuestion=function(q){q=String(q||"").toLowerCase();if(/\bocr\b|optical character recognition|photos?|pictures?|images?|scann?(?:er|ing)?|camera/.test(q))return true;
 var c=code(),p=pack(c);return !!(p&&[p.feature,p.scanText].some(function(v){return v&&v.length>=4&&q.indexOf(v.toLowerCase())>=0;}));
};
function apply(){install();label();}
w.addEventListener("pg:languagechange",apply);
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",apply);else apply();
})(window,document);
