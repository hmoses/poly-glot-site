/* Extend the existing 38-language dictionary to unchanged plain-text copy.
 * Only exact source-string matches are translated. Brand names, dynamic values,
 * device mocks, and entitlement UI remain owned by their existing renderers.
 */
(function(){
"use strict";
var originals=new WeakMap(),tracked=[],englishMap=null;
function normalize(s){return String(s||"").replace(/\s+/g," ").trim();}
function current(){return window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():"EN";}
function map(){var i18n=window._pgI18n,d=i18n&&i18n.dictionary;if(!d||!d.EN)return null;
 if(englishMap)return englishMap;englishMap=new Map();
 Object.keys(d.EN).forEach(function(key){
  var value=d.EN[key],str=normalize(value);
  if(typeof value!=="string"||str.length<3||str.length>180||/[<>]/.test(str)||/\{\{/.test(str))return;
  if(!englishMap.has(str))englishMap.set(str,key);
 });
 return englishMap;
}
function skipped(node){
 var p=node&&node.parentElement;if(!p)return true;
 return !!p.closest("script,style,noscript,pre,code,textarea,option,svg,[data-i18n],[data-i18n-html],[contenteditable],#template-categories,#demo,#screenshots,#iphone-duo,#pgChat-widget,#pgGlobalLangPicker,#pgGlobalLangDD,.demo-iphone-frame,.screenshot-gallery");
}
function register(){
 var lookup=map();if(!lookup||!document.body)return;
 var walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walk.nextNode()){
  var node=walk.currentNode;if(skipped(node)||originals.has(node))continue;
  var before=node.nodeValue||"",key=lookup.get(normalize(before));
  if(!key)continue;
  var match=before.match(/^(\s*)([\s\S]*?)(\s*)$/);
  var data={original:before,key:key,left:match?match[1]:"",right:match?match[3]:""};
  originals.set(node,data);tracked.push({node:node,data:data});
 }
}
var active=false;
function apply(){
 if(active)return;active=true;
 try{
  register();
  var lang=current(),i18n=window._pgI18n;if(!i18n)return;
  tracked=tracked.filter(function(x){return x.node.isConnected;});
  tracked.forEach(function(x){
   var data=x.data,translation=(lang==="EN")?normalize(data.original):i18n.gt(data.key,lang);
   if(!translation||/[<>]/.test(translation))translation=normalize(data.original);
   var wanted=data.left+translation+data.right;
   if(x.node.nodeValue!==wanted)x.node.nodeValue=wanted;
  });
 }finally{active=false;}
}
window._pgSiteCopyFallback={apply:apply,tracked:function(){return tracked.length;}};
window.addEventListener("pg:languagechange",function(){setTimeout(apply,0);});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();