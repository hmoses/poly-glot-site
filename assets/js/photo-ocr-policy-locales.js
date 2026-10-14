/* Localized privacy notices for user-directed iOS OCR/Photo-to-AI.
 * Reuses the same 39 translated app/site strings. No hidden upload or analytics.
 */
(function(w,d){"use strict";
function lang(){var i=w._pgI18n;return String(i&&typeof i.curLang==="function"?i.curLang():localStorage.getItem("pgLang")||navigator.language||"EN").toUpperCase().replace(/-/g,"_");}
function pack(){var all=w.PGPhotoAILocales||{};var c=lang();return all[c]||all[c.split("_")[0]]||all.EN;}
function apply(){var p=pack();if(!p)return;
 var h=d.getElementById("pgPhotoPrivacyHeading"),a=d.getElementById("pgPhotoPrivacyOCR"),b=d.getElementById("pgPhotoPrivacyTransfer"),c=d.getElementById("pgPhotoPrivacyTrial");
 if(h)h.textContent="📷 "+p.feature+" · iPhone / iPad";
 if(a)a.textContent=p.ocrMeaning;
 if(b)b.textContent=p.photoCompatibility+" "+p.photoPolicy+" "+p.manualPhoto+" "+p.duckImageModel+" "+p.huggingUnavailable;
 if(c)c.textContent=p.locked;
}
w.addEventListener("pg:languagechange",apply);
w.addEventListener("pageshow",apply);
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})(window,document);
