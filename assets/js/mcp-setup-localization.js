/** MCP connection instructions: all 38 site languages.
 * Only edits static marketing guidance; endpoint, links, MCP/auth behavior and product names stay unchanged.
 */
(function(){
"use strict";
var EN=[
 "Connect Poly-Glot from supported MCP clients",
 "The listings below are discovery surfaces for the same production Poly-Glot MCP server. You do not need a different server for each directory. Supported means the client supports a remote Streamable HTTP MCP server like Poly-Glot's production endpoint. In a supported client, add the production endpoint below, name it Poly-Glot, then approve tool access when prompted.",
 "Explore MCP integrations →",
 "1. Choose your MCP client",
 "Open the client's MCP, Connectors, Tools, or Integrations settings.",
 "2. Add the remote server",
 "Paste the Poly-Glot MCP endpoint and save it as Poly-Glot.",
 "3. Approve & use the tools",
 "Allow tool access, then search templates, build prompts, prepare comparisons, and use the available Poly-Glot MCP tools."
];
var nodes=[],savedMarkup=[],ready=false;
function txt(s){return String(s||"").replace(/\s+/g," ").trim();}
function current(){return window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():"EN";}
function locate(){
 var root=document.getElementById("mcp-listings");if(!root)return;
 var all=Array.from(root.querySelectorAll("div,p,a"));
 function find(test){return all.filter(function(el){return test(el);}).sort(function(a,b){return a.querySelectorAll("*").length-b.querySelectorAll("*").length;})[0]||null;}
 nodes[0]=find(function(el){return el.tagName==="DIV"&&txt(el.textContent)===EN[0];});
 nodes[1]=find(function(el){return el.tagName==="P"&&txt(el.textContent).indexOf("The listings below are discovery surfaces")===0;});
 nodes[2]=root.querySelector('a[href="mcp-integrations.html"]');
 var grid=find(function(el){return el.tagName==="DIV"&&el.children.length===3&&el.style.gridTemplateColumns.indexOf("180px")>=0&&el.textContent.indexOf("Choose your MCP client")>=0;});
 if(grid){
  var cards=grid.children;
  [0,1,2].forEach(function(i){var kids=cards[i].children;nodes[3+i*2]=kids[0]||null;nodes[4+i*2]=kids[1]||null;});
 }
 savedMarkup=nodes.map(function(node){return node?node.innerHTML:null;});
 ready=nodes.every(Boolean);
}
function apply(){
 if(!ready)return;
 var code=current(),dict=window._pgMcpSetupCopy||{},copy=code==="EN"?EN:dict[code];
 if(!copy||copy.length!==EN.length)return;
 nodes.forEach(function(node,i){
  if(!node)return;
  if(code==="EN"){
   if(node.innerHTML!==savedMarkup[i])node.innerHTML=savedMarkup[i];
  }else if(node.textContent!==copy[i]){
   node.textContent=copy[i];
  }
  if(code==="AR"||code==="HE")node.setAttribute("dir","auto");else node.removeAttribute("dir");
 });
}
function init(){locate();apply();}
window._pgMcpSetupLocale={apply:apply,ready:function(){return ready;},translatedLocales:function(){return Object.keys(window._pgMcpSetupCopy||{});}};
window.addEventListener("pg:languagechange",function(){setTimeout(apply,0);});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();