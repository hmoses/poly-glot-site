/* Translate secondary-page copy with the same 38-language dictionary as the homepage.
   Preserve original paragraphs without a matching translation, especially legal text. */
(function(){
"use strict";
var i=window._pgI18n;if(!i||!i.dictionary||!i.dictionary.EN)return;
var original=new WeakMap(),entries=[],lookup=new Map(),attrs=[];
function norm(x){return String(x||"").replace(/\s+/g," ").trim();}
Object.keys(i.dictionary.EN).forEach(function(k){var v=i.dictionary.EN[k];if(typeof v==="string"&&v.length>2&&v.length<400&&!/[<>]/.test(v)&&!lookup.has(norm(v)))lookup.set(norm(v),k);});
var explicit={"Support":"ftSupp","Privacy Policy":"ftPriv","Terms of Use":"ftTerms","Features":"ftFeat","Pricing":"ftPrice","Templates":"ftTpl","FAQ":"ftFAQ","MCP Setup":"ftConnect","Explore related topics":"ftProd","Frequently asked questions":"fqH","Poly-Glot knowledge center":"fqH","App Store":"navCTA"};
function scan(){
if(!document.body)return;
var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),node;
while(node=walker.nextNode()){
 if(original.has(node)||!node.parentElement||node.parentElement.closest("script,style,noscript,pre,code,textarea,svg,#pgGlobalLangDD,#pgGlobalLangPicker,[data-i18n],[data-i18n-html]"))continue;
 var value=norm(node.nodeValue),key=explicit[value]||lookup.get(value);
 if(!key)continue;
 original.set(node,{text:node.nodeValue,key:key});entries.push(node);
}
document.querySelectorAll("[aria-label],[title],[placeholder]").forEach(function(el){["aria-label","title","placeholder"].forEach(function(a){var value=el.getAttribute(a),key=explicit[norm(value)]||lookup.get(norm(value));if(!key||el.hasAttribute("data-pg-original-"+a))return;el.setAttribute("data-pg-original-"+a,value);attrs.push({el:el,a:a,key:key,value:value});});});
}
function apply(){
scan();var lang=i.curLang();
entries=entries.filter(function(n){return n.isConnected;});
entries.forEach(function(n){var o=original.get(n);if(!o)return;var tr=lang==="EN"?o.text:i.dictionary[lang]&&i.dictionary[lang][o.key];if(!tr||/[<>]/.test(tr))tr=o.text;if(n.nodeValue!==tr)n.nodeValue=tr;});
attrs=attrs.filter(function(x){return x.el.isConnected;});
attrs.forEach(function(x){var tr=lang==="EN"?x.value:i.dictionary[lang]&&i.dictionary[lang][x.key];x.el.setAttribute(x.a,tr&&!/[<>]/.test(tr)?tr:x.value);});
var rtl=lang==="AR"||lang==="HE";document.querySelectorAll("main,article,footer").forEach(function(el){el.setAttribute("dir",rtl?"rtl":"ltr");});
}
window.addEventListener("pg:languagechange",apply);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
window._pgSecondaryLocalization={apply:apply,translatedNodes:function(){return entries.length;}};
})();