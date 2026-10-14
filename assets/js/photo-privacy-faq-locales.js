/* Add localized photo privacy disclosures to both homepage privacy answers.
 * Existing FAQ translation remains in place; this uses the localized Photo-to-AI privacy text.
 */
(function(w,d){'use strict';
function current(){var i=w._pgI18n;return String(i&&typeof i.curLang==='function'?i.curLang():localStorage.getItem('pgLang')||navigator.language||'EN').toUpperCase().replace(/-/g,'_');}
function run(){
 var code=current(),all=w.PGPhotoAILocales||{},p=all[code]||all[code.split('_')[0]]||all.EN;
 if(!p)return;
 var add=p.photoPolicy||p.privacy||'';
 if(!add)return;
 d.querySelectorAll('[data-i18n="fq3a"]').forEach(function(el){
  var old=el.dataset.pgPhotoPrivacyAppend||'';
  var text=el.textContent||'';
  if(old&&text.endsWith(' '+old))text=text.slice(0,-old.length-1);
  if(code==='EN'&&text.includes('Photo to AI keeps')){el.dataset.pgPhotoPrivacyAppend='';return;}
  if(!text.includes(add)){el.textContent=text.trim()+' '+add;el.dataset.pgPhotoPrivacyAppend=add;}
 });
}
function deferRun(){setTimeout(run,60);setTimeout(run,350);}
w.addEventListener('pg:languagechange',deferRun);
w.addEventListener('pageshow',deferRun);
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',deferRun,{once:true});else deferRun();
})(window,document);
