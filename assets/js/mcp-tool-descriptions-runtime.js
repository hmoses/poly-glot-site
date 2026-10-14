/** Single source for all 15 MCP tool-card descriptions.
 * Seven original descriptions reuse i18n.js. Eight additional descriptions reuse
 * the existing complete 37-translation MCP catalog. Tool IDs stay untranslated.
 * DOM selectors survive the copy-button wrapper used by code-copy.js.
 */
(function(w,d){'use strict';
var TOOLS=['search_templates','get_template','build_prompt','prepare_compare','get_language_options','get_subscription_status','open_workspace','transcribe_audio','detect_language','translate_text','localize_text','get_custom_model_capabilities','validate_custom_model','run_custom_model','prepare_custom_compare'];
var EN=[
'Search 1,000+ templates','View template details','Fill & generate prompts','Compare across 2–8 AIs',
'38 supported languages','Check your plan','Launch full workspace',
'Transcribe audio for Poly-Glot workflows','Detect text language and map it to a supported language',
'Translate text while preserving meaning and formatting',
'Localize text for a target language, locale, audience, and tone',
'Show Bring Your Own Model capabilities and requirements',
'Validate a developer-supplied custom model endpoint',
'Run a Poly-Glot prompt against a custom model endpoint',
'Prepare Compare Mode with built-in AI providers and custom models'
];
var TITLES={"EN":"15 Tools Available","ES":"15 herramientas disponibles","FR":"15 outils disponibles","DE":"15 Tools verfügbar","IT":"15 strumenti disponibili","PT":"15 ferramentas disponíveis","NL":"15 beschikbare tools","RU":"15 доступных инструментов","ZH":"15 项可用工具","ZH_TW":"15 個可用工具","JA":"利用可能なツール 15 個","KO":"사용 가능한 도구 15개","AR":"15 أداة متاحة","HI":"15 उपकरण उपलब्ध","BN":"১৫টি টুল উপলব্ধ","TR":"15 araç mevcut","PL":"15 dostępnych narzędzi","SV":"15 tillgängliga verktyg","NO":"15 tilgjengelige verktøy","DA":"15 tilgængelige værktøjer","FI":"15 työkalua käytettävissä","EL":"15 διαθέσιμα εργαλεία","HE":"15 כלים זמינים","ID":"15 alat tersedia","MS":"15 alat tersedia","TH":"เครื่องมือที่มีให้ใช้ 15 รายการ","VI":"15 công cụ có sẵn","UK":"Доступно 15 інструментів","CS":"15 dostupných nástrojů","RO":"15 instrumente disponibile","HU":"15 elérhető eszköz","SK":"15 dostupných nástrojov","HR":"15 dostupnih alata","CA":"15 eines disponibles","AF":"15 beskikbare nutsmiddels","SW":"Zana 15 zinapatikana","HA":"Akwai kayan aiki 15","AM":"15 መሣሪያዎች ይገኛሉ"};
var cards=[],root=null,scheduled=false,observer=null;
function locale(){
 var i=w._pgI18n,raw=i&&typeof i.curLang==='function'?i.curLang():localStorage.getItem('pgLang')||'EN';
 return String(raw||'EN').toUpperCase().replace(/-/g,'_');
}
function lookup(code,index){
 if(code==='EN')return EN[index];
 var dict=w._pgI18n&&w._pgI18n.dictionary||{},table=dict[code]||dict[code.replace('_','-')]||{};
 if(index<7){
  var value=table['mcpT'+(index+1)+'d'];
  if(!value)return EN[index];
  // An obsolete translation still says 2–9 providers; the contract supports 2–8.
  return index===3?value.replace(/9/g,'8'):value;
 }
 var expanded=w._pgMcpToolCopy||{},list=expanded[code]||expanded[code.replace('_','-')];
 return list&&list[index-7]||EN[index];
}
function init(){
 root=d.getElementById('pg-mcp-tools');if(!root)return;
 cards=TOOLS.map(function(name){
  var code=Array.from(root.querySelectorAll('.pg-mcp-motion-card code')).find(function(el){return el.textContent.trim()===name;});
  return code&&code.closest('.pg-mcp-motion-card');
 });
 if(cards.some(function(card){return !card;}))w.console&&console.warn('Poly-Glot: not all 15 MCP tool cards were found');
 if('MutationObserver' in w){
  observer=new MutationObserver(function(){schedule();});
  observer.observe(root,{subtree:true,childList:true,characterData:true});
 }
 apply();
}
function apply(){
 scheduled=false;
 if(!root)return;
 var code=locale(),rtl=code==='AR'||code==='HE';
 cards.forEach(function(card,index){
  if(!card)return;
  var p=card.querySelector('p');if(!p)return;
  var value=lookup(code,index);
  if(p.textContent!==value)p.textContent=value;
  if(rtl)p.setAttribute('dir','auto');else p.removeAttribute('dir');
 });
 var header=d.getElementById('pg-mcp-tools-summary'),title=header&&header.querySelector('.pg-mcp-tools-toggle-title');
 var dictionary=w._pgI18n&&w._pgI18n.dictionary||{};
 var table=dictionary[code]||dictionary[code.replace('_','-')]||{};
 var label=TITLES[code]||'15 Tools Available';
 if(title&&title.textContent!==label)title.textContent=label;
 root.setAttribute('dir',rtl?'rtl':'ltr');
}
function schedule(){
 if(scheduled)return;
 scheduled=true;
 if(w.requestAnimationFrame)w.requestAnimationFrame(apply);else setTimeout(apply,0);
}
w.addEventListener('pg:languagechange',function(){schedule();setTimeout(schedule,180);});
w.addEventListener('pageshow',schedule);
w._pgMcpToolsLocale={apply:apply,count:function(){return cards.filter(Boolean).length;},tools:TOOLS};
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
