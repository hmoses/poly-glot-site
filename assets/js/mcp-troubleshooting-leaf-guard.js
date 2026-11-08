/* Final localization guard for plain-text MCP troubleshooting fields.
 * The technical guide can replace text nodes after its initial localization pass.
 * This guard keeps published 38-language content attached to current DOM nodes,
 * without touching code examples, links, form controls, or saved user input.
 */
(function(){
"use strict";
if(window._pgMcpLeafLocaleFix)return;
var cache={},generation=0,pending=false,lastApplied=0;
function language(){var api=window._pgI18n;return api&&typeof api.curLang==="function"?api.curLang():"EN";}
function root(){return document.getElementById("mcp-troubleshooting");}
function read(code){
 if(cache[code])return cache[code];
 cache[code]=fetch("assets/locales/mcp-troubleshooting/"+code.toLowerCase()+".json?v=20261108-leaf-qa1",{cache:"no-store"})
   .then(function(resp){if(!resp.ok)throw Error("MCP locale "+code+" HTTP "+resp.status);return resp.json();})
   .then(function(json){if(!json||json.language!==code||!json.strings)throw Error("Invalid MCP locale "+code);return json.strings;})
   .catch(function(err){delete cache[code];console.warn("[Poly-Glot MCP leaf localization]",err.message);return null;});
 return cache[code];
}
function apply(){
 var section=root(),code=language(),ticket=++generation;
 if(!section||code==="EN")return;
 read(code).then(function(strings){
  if(ticket!==generation||language()!==code||!strings)return;
  var applied=0;
  section.querySelectorAll("[data-mcp-tr]").forEach(function(el){
   // Nested, copyable MCP examples retain their original markup and are
   // translated by the full troubleshooting locale runtime.
   if(el.querySelector("code,pre,a,input,button,textarea,select"))return;
   var key=el.getAttribute("data-mcp-tr"),tokens=strings[key];
   if(!Array.isArray(tokens)||tokens.length!==1||typeof tokens[0]!=="string"||!tokens[0].trim())return;
   if(el.textContent.trim()!==tokens[0].trim())el.textContent=tokens[0];
   applied++;
  });
  section.setAttribute("data-mcp-leaf-locale",code);
  section.setAttribute("data-mcp-leaf-count",String(applied));
  lastApplied=applied;
 });
}
function schedule(){
 if(pending)return;
 pending=true;setTimeout(function(){pending=false;apply();},0);
}
function start(){
 var section=root();if(!section)return;
 apply();setTimeout(apply,220);setTimeout(apply,900);setTimeout(apply,2300);
 section.addEventListener("toggle",schedule,true);
 if(typeof MutationObserver!=="undefined"){
  new MutationObserver(function(changes){
   if(changes.some(function(change){return change.type==="characterData"||(change.addedNodes&&change.addedNodes.length);}))schedule();
  }).observe(section,{subtree:true,childList:true,characterData:true});
 }
}
window.addEventListener("pg:languagechange",function(){schedule();setTimeout(apply,180);});
window.addEventListener("pageshow",schedule);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
window._pgMcpLeafLocaleFix={apply:apply,count:function(){return lastApplied;}};
})();
