/* Poly-Glot /go/ and /go/stats/ — 38-language shared catalog localization.
   Preserve all campaign URLs, UTM parameters, analytics IDs and click behavior. */
(function(){
'use strict';
var base=new URL('../',document.currentScript.src);
var original=new WeakMap(),tracked=new Set(),catalogs={},pending={},active='EN',observer;
var ignore='script,style,noscript,pre,code,textarea,svg,[contenteditable],[data-no-translate],.link-url';
var translations={
 'Download Free on App Store':'Download on the App Store',
 'Download Now':'Download Now'
};
function language(){
 var explicit=new URLSearchParams(location.search).get('lang');
 var stored=null;try{stored=localStorage.getItem('pgLang')||sessionStorage.getItem('pgLang');}catch(e){}
 var raw=(explicit||stored||navigator.language||'en').replace(/-/g,'_').toUpperCase();
 var names={ZH_HANT:'ZH_TW',ZH_HK:'ZH_TW',ZH_CN:'ZH',PT_BR:'PT',PT_PT:'PT'};
 raw=names[raw]||raw;
 return raw;
}
function nodes(){
 var walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
 while((n=walk.nextNode())){
  if(!n.parentElement||n.parentElement.closest(ignore))continue;
  var raw=n.nodeValue,term=raw.trim();
  if(!term||!/[A-Za-z]/.test(term)||/^https?:/i.test(term))continue;
  if(!original.has(n)){original.set(n,{raw:raw,key:term});tracked.add(n);}
 }
}
function apply(lang){
 active=lang;
 document.documentElement.lang=lang==='ZH_TW'?'zh-Hant':lang.toLowerCase().replace('_','-');
 var dict=catalogs[lang]||{};
 nodes();
 tracked.forEach(function(n){
  if(!n.isConnected){tracked.delete(n);return;}
  var o=original.get(n);if(!o||n.parentElement.closest(ignore))return;
  var translated=lang==='EN'?null:dict[o.key];
  if(!translated&&lang!=='EN'&&translations[o.key])translated=dict[translations[o.key]];
  var value=typeof translated==='string'&&translated.trim()?translated:null;
  var leading=o.raw.match(/^\s*/)[0],trailing=o.raw.match(/\s*$/)[0];
  var next=value?leading+value+trailing:o.raw;
  if(n.nodeValue!==next)n.nodeValue=next;
 });
}
function load(lang){
 if(lang==='EN'){apply('EN');return;}
 if(catalogs[lang]){apply(lang);return;}
 if(pending[lang])return;
 pending[lang]=fetch(new URL('assets/locales/subpages/'+lang.toLowerCase()+'.json',base),{cache:'no-cache'})
  .then(function(r){if(!r.ok)throw Error('Missing locale '+lang);return r.json();})
  .then(function(data){catalogs[lang]=data;if(active===lang)apply(lang);})
  .catch(function(e){console.warn('[Poly-Glot go locale]',e.message);})
  .finally(function(){delete pending[lang];});
}
function change(){var lang=language();active=lang;load(lang);}
window.addEventListener('pg:languagechange',function(e){if(e.detail&&e.detail.code){active=e.detail.code;load(active);}else change();});
window.addEventListener('pageshow',change);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',change,{once:true});else change();
if(typeof MutationObserver!=='undefined'){
 observer=new MutationObserver(function(changes){if(changes.some(function(x){return x.addedNodes&&x.addedNodes.length;}))apply(active);});
 observer.observe(document.documentElement,{subtree:true,childList:true});
}
})();