/* Compact localized Photo to AI privacy summary; detailed disclosures live in privacy.html. */
(function(w,d){'use strict';
var english='Your settings stay on your device. Photos leave only when you choose to share them. See the Privacy Policy for details.';
function apply(){
 var i=w._pgI18n,raw=String(i&&typeof i.curLang==='function'?i.curLang():localStorage.getItem('pgLang')||navigator.language||'EN').toUpperCase().replace(/-/g,'_');
 var p=w.PGPhotoAILocales||{},l=p[raw]||p[raw.split('_')[0]]||p.EN;
 var summary=raw==='EN'?english:(l&&l.privacy?l.privacy:english);
 d.querySelectorAll('[data-i18n="fq3a"]').forEach(function(e){e.textContent=summary;});
}
function rerender(){setTimeout(apply,0);setTimeout(apply,180);setTimeout(apply,600);}
w.addEventListener('pg:languagechange',rerender);
w.addEventListener('pageshow',rerender);
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',rerender,{once:true});else rerender();
})(window,document);
