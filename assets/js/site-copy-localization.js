/** Reuse all existing 38-language site copy for previously untagged static text.
 * Non-destructive: never uses machine translation or replaces templated HTML.
 * Template cards and device mocks have their own dedicated localization runtimes.
 */
(function () {
"use strict";
var KEYS=["navSS","navFeat","navPrice1","navDemo","navPrice2","navFAQ","navConnect","navCTA","heroBadge","heroH1a","heroH1b","heroSub","heroMac","heroIOS","trustA","trustB","trustC","platLabel","platIPhone","platIPad","platMac","platAvail","ssEye","ssH","ssSub","naEye","naH","naSub","sc1Tag","sc1H","sc1P","sc1Row","sc1PgLabel","sc1Compare","sc1Trial","sc2Tag","sc2H","sc2P","sc2Prompt","sc2PromptLabel","sc2GptResp","sc2CldResp","sc2Pick","sc2PickSub","imEye","imH","imSub","im1","im1p","im2","im2p","im3","im3p","im4","im4p","im5","im5p","featEye","featH","featSub","f1","f1p","f2","f2p","f3","f3p","f4","f4p","f5","f5p","modEye","modH","modSub","demoEye","demoH","demoSub","probEye","probH","probSub","probBadH","probBadP","probGoodH","probGoodP","saveEye","saveH","saveSub","saveRow","savePgLabel","saveCompare","saveTrial","saveTrA","saveTrB","saveTrC","tplEye","tplH","tplSub","prEye","prH","prSub","prTier1","prName1","prDesc1","prCTA1","prTier2","prName2","prDesc2","prCTA2","prTier3","prName3","prDesc3","prCTA3","pf1a","pf1b","pf1c","pf1d","pf2a","pf2b","pf2c","pf2d","pf3a","pf3b","pf3c","pf3d","fqEye","fqH","fqSub","fq1q","fq1a","fq2q","fq2a","fq3q","fq3a","fq4q","fq4a","fq5q","fq5a","fq6q","fq6a","fq7q","fq7a","fq8q","fq8a","fq9q","fq9a","fq10q","fq10a","mcpEye","mcpH","mcpSub","ftTag","ftProd","ftPlat","ftComp","ftFeat","ftTpl","ftPrice","ftFAQ","ftMacOS","ftIOS","ftConnect","ftMCP","ftPriv","ftTerms","ftSupp","ftContact","ftCopy","ftPrivL","ftTermsL","ftSuppL","chatT","chatSub","chatPH","chatWel","cs1","cs2","cs3","cs4","cs5","cs6","cs7","cs8","cs9","cs10","cs11","cs12","tc1c","tc1t","tc1d","tc2c","tc2t","tc2d","tc3c","tc3t","tc3d","tc4c","tc4t","tc4d","tc5c","tc5t","tc5d","tc6c","tc6t","tc6d","tc7c","tc7t","tc7d","tc8c","tc8t","tc8d","tc9c","tc9t","tc9d","mcpEcoEye","mcpEcoH","mcpEcoP","mcpL1d","mcpL2d","mcpL3d","mcpL4d","mcpL5d","mcpWhatH","mcpWhatP","mcpToolsH","mcpT1d","mcpT2d","mcpT3d","mcpT4d","mcpT5d","mcpT6d","mcpT7d","mcpExH","mcpEx1","mcpEx2","mcpOpenL","mcpOpenS","mcpViewS","mcpClBadge","mcpClSteps","mcpCopyBtn","mcpGptBadge","mcpGptDesc","mcpGptSteps","mcpGptTip","crossDeviceAccess"];
var originals=new WeakMap(), active="EN", busy=false, scheduled=false;
var allowed=/^(?:A|SPAN|DIV|P|H1|H2|H3|H4|H5|BUTTON|LABEL|EM|STRONG|SMALL|LI)$/;
var skip='[data-i18n], [data-i18n-html], #pgChat-window, #pgChat-bubble, .featured-template-grid, .category-constellation, .demo-device-card, .screenshot-gallery, .hero-visual, #iphone-duo, .duo-device, .pg-phone, .pg-static-ipad, .pg-mac-panel-localized, pre, code, textarea, script, style, noscript, svg, [contenteditable="true"]';
function norm(s){return String(s||"").replace(/\s+/g," ").trim();}
function gt(k,lang){try{return window._pgI18n.gt(k,lang)||"";}catch(e){return "";}}
var exact={};
function buildEnglish(){exact={};KEYS.forEach(function(k){var v=norm(gt(k,"EN"));if(v && !exact[v])exact[v]=k;});}
function eligible(el){return el&&allowed.test(el.tagName)&&!el.closest(skip)&&!el.closest('[aria-hidden="true"]')&&el.isConnected;}
function apply(){
 if(busy||!window._pgI18n)return;
 busy=true;
 try{
  var code=window._pgI18n.curLang()||"EN";active=code;
  buildEnglish();
  var root=document.body;if(!root)return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  var node, changed=0;
  while((node=w.nextNode())){
   if(!eligible(node.parentElement))continue;
   var original=originals.get(node);
   if(original===undefined){original=norm(node.nodeValue);originals.set(node,original);}
   if(!original)continue;
   var k=exact[original];if(!k)continue;
   var translated=norm(gt(k,code));if(!translated)translated=original;
   if(norm(node.nodeValue)!==translated){node.nodeValue=translated;changed++;}
  }
  document.querySelectorAll('[title],[aria-label],[placeholder]').forEach(function(el){
   if(!eligible(el))return;
   ["title","aria-label","placeholder"].forEach(function(attr){
    var value=el.getAttribute(attr);if(!value)return;
    var store="pg-copy-origin-"+attr;
    var original=el.getAttribute("data-"+store);
    if(original===null){original=value;el.setAttribute("data-"+store,original);}
    var k=exact[norm(original)];if(!k)return;
    var next=gt(k,code)||original;
    if(value!==next)el.setAttribute(attr,next);
   });
  });
  document.documentElement.setAttribute("data-site-copy-language",code);
 }finally{busy=false;}
}
function schedule(){if(scheduled)return;scheduled=true;setTimeout(function(){scheduled=false;apply();},0);}
window.addEventListener("pg:languagechange",function(){schedule();setTimeout(schedule,160);});
window._pgSiteCopy={apply:apply,language:function(){return active;},knownKeys:function(){return KEYS.length;}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
})();
