/** Localized plain-language descriptions of the eight expanded MCP tools. */
(function(){
"use strict";
var TOOLS=["transcribe_audio","detect_language","translate_text","localize_text","get_custom_model_capabilities","validate_custom_model","run_custom_model","prepare_custom_compare"];
var EN=["Transcribe audio for Poly-Glot workflows","Detect text language and map it to a supported language","Translate text while preserving meaning and formatting","Localize text for a target language, locale, audience, and tone","Show Bring Your Own Model capabilities and requirements","Validate a developer-supplied custom model endpoint","Run a Poly-Glot prompt against a custom model endpoint","Prepare Compare Mode with built-in AI providers and custom models"];
var elems=[];
function init(){
 var root=document.getElementById("connect");if(!root)return;
 root.querySelectorAll(".pg-mcp-motion-card code").forEach(function(el){
  var name=el.textContent.trim(),i=TOOLS.indexOf(name);
  if(i>=0){var paragraph=el.nextElementSibling;if(paragraph&&paragraph.tagName==="P")elems[i]=paragraph;}
 });
 apply();
}
function apply(){
 if(!elems.length)return;
 var lang=window._pgI18n?.curLang?.()||"EN";
 var dict=window._pgMcpToolCopy||{},text=lang==="EN"?EN:dict[lang]||EN;
 TOOLS.forEach(function(name,i){
  var node=elems[i],value=text[i];if(!node||typeof value!=="string")return;
  if(node.textContent!==value)node.textContent=value;
  if(lang==="AR"||lang==="HE")node.setAttribute("dir","auto");else node.removeAttribute("dir");
 });
}
window.addEventListener("pg:languagechange",function(){setTimeout(apply,0);});
window._pgMcpToolsLocale={apply:apply,count:function(){return elems.filter(Boolean).length;}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();