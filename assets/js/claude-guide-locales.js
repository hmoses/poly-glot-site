/* Poly-Glot Claude/MCP guide: 38-language parity using reviewed local MCP guidance.
   Never translate endpoints, tool identifiers or copyable configuration. */
(function(){
"use strict";
var localized={
EN:{title:"How to invoke Poly-Glot tools in Claude",introServer:"One server. All directories list the same production Poly-Glot MCP server.",introClient:"Compatible clients. Your AI client must support remote Streamable HTTP MCP.",introConnect:"Connect. Add the production URL below, name it Poly-Glot, and approve tools.",troubleTitle:"MCP troubleshooting",troubleDesc:"Connections · Sign-in · Tools · Free trial"},
ZH_TW:{title:"如何在 Claude 中呼叫 Poly-Glot 工具",introServer:"同一伺服器。所有目錄都指向同一個 Poly-Glot 正式版 MCP 伺服器。",introClient:"相容用戶端。AI 助理必須支援透過 Streamable HTTP 連接遠端 MCP。",introConnect:"連線。新增下方正式版網址，命名為 Poly-Glot，並核准工具存取權限。",troubleTitle:"MCP 疑難排解",troubleDesc:"連線 · 登入 · 工具 · 免費試用"},
ZH:{title:"如何在 Claude 中调用 Poly-Glot 工具",introServer:"一个服务器。所有目录都指向同一个 Poly-Glot 正式版 MCP 服务器。",introClient:"兼容客户端。AI 助手必须支持通过 Streamable HTTP 连接远程 MCP。",introConnect:"连接。添加下方正式版网址，命名为 Poly-Glot，并批准工具使用权限。",troubleTitle:"MCP 故障排除",troubleDesc:"连接 · 登录 · 工具 · 免费试用"},
NL:{title:"Poly-Glot-tools gebruiken in Claude",introServer:"Eén server. Alle gidsen verwijzen naar dezelfde productie-MCP-server van Poly-Glot.",introClient:"Compatibele clients. Je assistent moet externe MCP via Streamable HTTP ondersteunen.",introConnect:"Verbinden. Voeg de productie-URL toe, noem deze Poly-Glot en geef toestemming voor tools.",troubleTitle:"MCP-problemen oplossen",troubleDesc:"Verbinding · Aanmelden · Tools · Proefperiode"},
ES:{title:"Cómo invocar herramientas Poly-Glot en Claude",introServer:"Un servidor. Todos los directorios muestran el mismo servidor MCP de producción de Poly-Glot.",introClient:"Clientes compatibles. El asistente debe admitir MCP remoto mediante Streamable HTTP.",introConnect:"Conectar. Añade la URL de producción, nómbrala Poly-Glot y autoriza las herramientas.",troubleTitle:"Solución de problemas de MCP",troubleDesc:"Conexión · Inicio de sesión · Herramientas · Prueba gratis"},
FR:{title:"Utiliser les outils Poly-Glot dans Claude",introServer:"Un seul serveur. Tous les annuaires répertorient le même serveur MCP de production Poly-Glot.",introClient:"Clients compatibles. Votre assistant doit prendre en charge MCP distant via Streamable HTTP.",introConnect:"Connexion. Ajoutez l’URL de production, nommez-la Poly-Glot et autorisez les outils.",troubleTitle:"Dépannage MCP",troubleDesc:"Connexion · Identification · Outils · Essai gratuit"},
DE:{title:"Poly-Glot-Tools in Claude aufrufen",introServer:"Ein Server. Alle Verzeichnisse verweisen auf denselben produktiven Poly-Glot-MCP-Server.",introClient:"Kompatible Clients. Der Assistent muss Remote-MCP über Streamable HTTP unterstützen.",introConnect:"Verbinden. Produktions-URL eingeben, Poly-Glot benennen und Tools freigeben.",troubleTitle:"MCP-Fehlerbehebung",troubleDesc:"Verbindung · Anmeldung · Tools · Gratis-Test"},
JA:{title:"Claude で Poly-Glot ツールを呼び出す方法",introServer:"サーバーは1つ。すべてのディレクトリは同じ Poly-Glot 本番 MCP サーバーを参照します。",introClient:"対応クライアント。AI アシスタントは Streamable HTTP によるリモート MCP に対応する必要があります。",introConnect:"接続。本番 URL を追加し、Poly-Glot と名付けてツールへのアクセスを許可します。",troubleTitle:"MCP のトラブルシューティング",troubleDesc:"接続 · ログイン · ツール · 無料試用"},
AR:{title:"كيفية استدعاء أدوات Poly-Glot في Claude",introServer:"خادم واحد. تشير جميع الأدلة إلى خادم Poly-Glot MCP الإنتاجي نفسه.",introClient:"عملاء متوافقون. يجب أن يدعم مساعد الذكاء الاصطناعي MCP البعيد عبر Streamable HTTP.",introConnect:"الاتصال. أضف رابط الإنتاج أدناه، وسمّه Poly-Glot، ووافق على أذونات الأدوات.",troubleTitle:"استكشاف مشكلات MCP وإصلاحها",troubleDesc:"الاتصال · تسجيل الدخول · الأدوات · تجربة مجانية"}
};
var serial=0,cache={};
function code(){var i=window._pgI18n;return i&&i.curLang?i.curLang():"EN";}
function string(v){return Array.isArray(v)?v.join(" "):typeof v==="string"?v:"";}
function load(lang){
 if(lang==="EN")return Promise.resolve(null);
 if(cache[lang])return cache[lang];
 var base="assets/locales/";
 cache[lang]=Promise.all([
  fetch(base+"mcp-troubleshooting/"+lang.toLowerCase()+".json?v=20261010-2",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("MCP locale missing");return r.json();}),
  fetch(base+"mcp-technical/"+lang.toLowerCase()+".json?v=20261010-tech-v4",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("Technical locale missing");return r.json();}),
  fetch(base+"subpages/"+lang.toLowerCase()+".json?v=20261010-faq38",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("Page locale missing");return r.json();})
 ]).then(function(data){return {tr:data[0].strings,tech:data[1].strings,sub:data[2]};}).catch(function(e){delete cache[lang];console.warn("[Poly-Glot Claude guide]",e.message);return null;});
 return cache[lang];
}
var original=new WeakMap();
function setText(el,v){if(el&&v&&el.textContent!==v)el.textContent=v;}
function apply(lang,bundle){
 var base=localized[lang],tr=bundle&&bundle.tr||{},tech=bundle&&bundle.tech||{},sub=bundle&&bundle.sub||{},
 i=window._pgI18n,d=i&&i.dictionary&&i.dictionary[lang]||{};
 var isLocalized=lang!=="EN",phrase=function(key,fallback){return base&&base[key]||fallback;};
 // For additional languages, use the existing native locale pack rather than
 // leaving an untranslated English instruction on the page.
 var nativeSetup=window._pgMcpSetupCopy&&window._pgMcpSetupCopy[lang];
 var nativeSummary=nativeSetup&&typeof nativeSetup[1]==="string"?nativeSetup[1]:"";
 // Reuse the translated product summary (not the much longer support FAQ)
 // for the compact connect-panel introduction in all supported languages.
 var firstSentence=nativeSummary.match(/^[^.!。؟]+[.!。؟]/u);
 var card1=phrase("introServer",isLocalized?(firstSentence?firstSentence[0]:nativeSummary)||string(tr.intro):localized.EN.introServer);
 var card2=phrase("introClient",isLocalized?string(tr.quick2):localized.EN.introClient);
 var card3=phrase("introConnect",isLocalized?string(tr.quick3):localized.EN.introConnect);
 var x={
  introServer:card1,introClient:card2,introConnect:card3,
  endpointLabel:isLocalized?string(tr.endpointLabel):"Production MCP URL — use this exact HTTPS address",
  privacyPolicyLink:(isLocalized?(sub["Privacy Policy"]||"Privacy Policy"):"Privacy Policy")+" ↗",
  mcpSetupLink:isLocalized?string(tr.setupLink):"MCP setup guide ↗",
  guideTitle:phrase("title",isLocalized?string(tr.toolsTitle):localized.EN.title),
  guideIntro:isLocalized?string(tr.quick3)+" "+string(tr.quick4):"In a Claude chat, select + → Connectors, enable Poly-Glot, and ask for a tool by name. Approve access when prompted.",
  browseTitle:isLocalized?string(tr.groupCore):"1. Search templates (read-only)",
  browsePrompt:isLocalized?string(tr.quick4):"Use Poly-Glot's search_templates tool to find LinkedIn templates for AI productivity.",
  buildTitle:isLocalized?string(tr.groupCore)+" · build_prompt":"2. Build a prompt (Send action)",
  buildPrompt:isLocalized?(d.mcpEx1||string(tr.toolsIntro)):"Find an accessible LinkedIn template in Poly-Glot and use build_prompt to write about AI productivity.",
  compareTitle:isLocalized?string(tr.toolsTitle)+" · prepare_compare":"3. Prepare comparison (trial or Pro)",
  comparePrompt:isLocalized?"prepare_compare: "+(d.mcpEx2||string(tr.toolsIntro)):"Use Poly-Glot's prepare_compare tool to prepare this prompt for ChatGPT, Claude, and Gemini.",
  guideNote:isLocalized?string(tr.error5Body)+" "+string(tech.compareExample):"Searching templates is read-only. build_prompt and prepare_compare are Send actions; Compare Mode requires an active trial or Pro. prepare_compare returns a prompt and destinations, not completed AI responses.",
  resultLabel:isLocalized?(d.mcpExH||string(tr.toolsTitle)):"Illustrative Claude response — not a live result",
  resultText:isLocalized?string(tech.compareExample):"Poly-Glot prepared your prompt for ChatGPT, Claude, and Gemini. It has not opened the workspace or generated any model responses. Use the returned destinations to send the prompt and compare answers.",
  docsLabel:isLocalized?string(tr.clientDocs):"Read Claude's official connector instructions ↗",
  troubleTitle:phrase("troubleTitle",isLocalized?string(tr.errorsTitle):localized.EN.troubleTitle),
  troubleDesc:phrase("troubleDesc",isLocalized?[tr.groupCore,tr.groupCustom,tr.groupLanguage].map(string).join(" · "):localized.EN.troubleDesc),
  clientClaude:isLocalized?"Customize → Connectors → + Add → Add custom connector. "+string(tr.quick3)+" "+string(tr.quick4):"In Claude, open Customize → Connectors, select + Add → Add custom connector, enter Poly-Glot and the production URL, and approve requested permissions. Enable Poly-Glot using the + → Connectors menu in a chat."
 };
 document.querySelectorAll("[data-pg-claude-l10n]").forEach(function(el){
  var key=el.getAttribute("data-pg-claude-l10n");setText(el,x[key]);
  if(lang==="HE"||lang==="AR")el.setAttribute("dir","auto");else el.removeAttribute("dir");
 });
 var link=document.querySelector("[data-pg-claude-trouble-link]");if(link)link.setAttribute("aria-label",x.troubleTitle);
 // Claude labels are exact application UI strings. Surrounding guidance is translated.
 var claudeCard=document.querySelector('#mcp-troubleshooting [data-pg-claude-l10n="clientClaude"]');
 if(claudeCard)setText(claudeCard,x.clientClaude);
 var homeSteps=document.querySelector('[data-i18n-html="mcpClSteps"]');
 if(homeSteps){var steps=[
  "Customize → Connectors → + Add → Add custom connector",
  "Poly-Glot · "+(isLocalized?string(tr.endpointLabel):"Production MCP URL") ,
  isLocalized?string(tr.quick3):"Approve tool permissions, then in Claude chat open + → Connectors and enable Poly-Glot."
 ];
 var html=steps.map(function(value){return "<li>"+value.replace(/&/g,"&amp;").replace(/</g,"&lt;")+"</li>";}).join("");
 if(homeSteps.innerHTML!==html)homeSteps.innerHTML=html;
 }
 // FAQ is separate from the trouble-section translation runtime.
 var faq=document.querySelectorAll('#pg-mcp-faq > article');
 if(faq.length===4){
  var translated=isLocalized?[
   [tech.homeMcp,tr.intro].map(string).filter(Boolean).join(" "),
   "15 MCP: 7 "+string(tr.groupCore)+" · 4 "+string(tr.groupCustom)+" · 4 "+string(tr.groupLanguage)+". "+string(tr.toolsIntro),
   [tr.quick2,tr.quick3].map(string).filter(Boolean).join(" "),
   string(tr.setupLink)
  ]:[];
  // Dedicated reviewed FAQ answers for the Traditional Chinese storefront.
  if(lang==="ZH_TW"){
   translated[0]="Poly-Glot 提供託管式 Streamable HTTP MCP（模型上下文協定）伺服器，可搜尋範本、建立提示詞、準備 AI 比較、連接自訂模型（BYOM）、處理語言與音訊，以及查詢訂閱狀態。唯讀查詢不會啟動試用；傳送操作與受限工具會由伺服器驗證存取權限。";
   translated[1]="目前的 Poly-Glot MCP 伺服器提供 15 種工具：7 種核心工具、4 種自訂模型（BYOM）工具，以及 4 種語言與音訊工具。工具是否出現取決於用戶端的 MCP 支援與權限；部分操作需要經過驗證的有效試用或 Pro 訂閱。";
   translated[2]="不是所有 AI 助理都能連接。用戶端必須支援遠端 Streamable HTTP MCP，並能完成連線、授權及工具權限設定。";
   translated[3]="請參閱 Poly-Glot 首頁的 MCP 設定區域，取得正式版端點網址、相容性說明與整合指南。";
  }
  if(lang==="ZH"){
   translated[0]="Poly-Glot 提供托管式 Streamable HTTP MCP（模型上下文协议）服务器，用于搜索模板、构建提示词、准备 AI 比较、自定义模型（BYOM）、语言与音频处理以及查看订阅状态。只读操作不会启动试用；发送操作和受限工具由服务器验证权限。";
   translated[1]="当前 Poly-Glot MCP 服务器提供 15 个工具：7 个核心工具、4 个自定义模型（BYOM）工具，以及 4 个语言与音频工具。工具是否可用取决于客户端支持和权限；部分操作要求已验证的有效试用或 Pro 订阅。";
   translated[2]="并非所有 AI 助手都能连接。客户端必须支持远程 Streamable HTTP MCP，并完成身份验证和工具授权。";
   translated[3]="请查看 Poly-Glot 首页的 MCP 设置区域，获取正式版端点、兼容性和接入说明。";
  }
  faq.forEach(function(article,index){
   var p=article.querySelector(":scope > p");if(!p)return;
   if(!original.has(p))original.set(p,p.textContent);
   setText(p,isLocalized?translated[index]:original.get(p));
  });
 }
 document.documentElement.setAttribute("data-pg-claude-guide-language",lang);
 document.documentElement.setAttribute("data-pg-claude-guide-coverage",isLocalized&&(!bundle||!tech.compareExample)?"partial":"complete");
}
function refresh(){var lang=code(),token=++serial;if(lang==="EN"){apply(lang,null);return;}
 load(lang).then(function(bundle){if(token===serial&&code()===lang)apply(lang,bundle);});
}
function start(){refresh();window.addEventListener("pg:languagechange",function(){refresh();setTimeout(refresh,200);});window.addEventListener("pageshow",refresh);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
window._pgClaudeGuide={refresh:refresh,status:function(){return document.documentElement.getAttribute("data-pg-claude-guide-coverage");}};
})();