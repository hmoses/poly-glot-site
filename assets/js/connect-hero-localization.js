/* Connect page: bind the actual hero and introduction to locale changes. */
(function(){"use strict";
if(!/connect\.html$/.test(location.pathname))return;
var HU=[
"Kapcsolja össze a Poly-Glotot az MCP-ökoszisztémával",
"Használja ugyanazt az éles Poly-Glot MCP-kiszolgálót a kompatibilis kliensekben, több mint 1000 promptsablonnal, 15 eszközzel, 38 nyelvvel és összehasonlító móddal.",
"🌐 Mi az a Poly-Glot?",
"A Poly-Glot AI Workspace többnyelvű mesterségesintelligencia-munkaterület, amely jobb promptok létrehozását, többnyelvű munkát és vezető AI-asszisztensek válaszainak összehasonlítását teszi lehetővé. Több mint 1000 promptsablont, 38 nyelvet, összehasonlító módot és fejlesztőknek szánt MCP-eszközöket kínál.",
"Az alkalmazás Apple-eszközökön érhető el. A Poly-Glot MCP-kiszolgáló ugyanezeket a prompt- és nyelvi eszközöket elérhetővé teszi kompatibilis AI-asszisztensekben, például a Claude-ban és a ChatGPT-ben."
];
var baseline,els;
function setup(){els=[document.querySelector(".hero h1"),document.querySelector(".hero p"),document.querySelector(".about-card")?.previousElementSibling,document.querySelectorAll(".about-card > p")[0],document.querySelectorAll(".about-card > p")[1]];if(els.some(function(e){return !e;}))return;baseline=els.map(function(e){return e.innerHTML;});apply();}
function apply(){if(!els)return;var api=window._pgI18n,lang=api?.curLang?.()||"EN";
if(lang==="EN"){els.forEach(function(e,n){e.innerHTML=baseline[n];});return;}
var copy=lang==="HU"?HU:null;
var mcp=window._pgMcpSetupCopy&&window._pgMcpSetupCopy[lang];
var headline=copy?copy[0]:(mcp&&mcp[0])||api.gt("mcpH",lang);
var description=copy?copy[1]:(mcp&&mcp[1])||api.gt("mcpSub",lang);
if(headline)els[0].textContent=headline;
if(description)els[1].textContent=description;
if(copy){[2,3,4].forEach(function(n){els[n].textContent=copy[n];});}
else {var what=api.gt("fq1q",lang),intro=api.gt("fq1a",lang);if(what)els[2].textContent=what;if(intro)els[3].textContent=intro;}
var rtl=lang==="AR"||lang==="HE";els.forEach(function(e){e.setAttribute("dir",rtl?"rtl":"auto");});
}
window.addEventListener("pg:languagechange",apply);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});else setup();
})();