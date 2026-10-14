/* Traditional Chinese (Taiwan) completeness pass for homepage text.
 * Updates presentation only: never translates tool identifiers, URLs, prices,
 * service/brand names or user-entered data; never affects native apps.
 * Works alongside existing per-section localizers and locale switches. */
(function(w,d){'use strict';
const patch={
  mcpEye:'🔌 MCP 整合',
  mcpH:'Poly-Glot MCP 生態系統',
  mcpSub:'使用同一個正式版 Poly-Glot MCP 伺服器，連接支援的用戶端和探索平台，使用 15 項工具、38 種語言及比較模式。',
  mcpWhatH:'什麼是 MCP？',
  mcpWhatP:'MCP（模型上下文協定）讓相容的 AI 助理連接外部工具。Poly-Glot 提供範本搜尋、提示詞建立和比較準備功能。準備比較不代表自動聯絡 AI 服務供應商或擷取其回答。',
  mcpEcoEye:'🌐 MCP 生態系統',
  mcpEcoH:'在 MCP 生態系統中探索 Poly-Glot',
  mcpEcoP:'同一個正式版 MCP 伺服器已登錄於多個探索平台。目錄資訊及版本一致性透過自動化 CI/CD 和 MCP 同步流程維護。',
  mcpL1d:'正式版 MCP 伺服器及各版本發行資訊的官方登錄項目。',
  mcpL2d:'公開目錄條目，列出 Poly-Glot 的 15 項 MCP 工具及伺服器資訊。',
  mcpL3d:'可供搜尋、檢視和探索 MCP 生態系統的目錄頁面。',
  mcpL4d:'提供 Poly-Glot AI Workspace 探索及示範功能的公開 Space。',
  mcpL5d:'申請收錄於 Awesome MCP Servers 社群目錄的提交項目。',
  mcpOpenL:'開啟目錄條目 →',
  mcpOpenS:'開啟 Space →',
  mcpViewS:'查看提交內容 →',
  mcpToolsH:'15 個可用工具',
  mcpGptBadge:'即將推出',
  mcpGptDesc:'ChatGPT 是否提供自訂 MCP 連接功能取決於帳戶、工作區及設定。Poly-Glot 的公開商店上架狀態尚待確認。',
  mcpGptTip:'💡 請查看 ChatGPT 中是否有支援自訂 MCP 的設定。公開商店上架與自訂連接並不相同。',
  showcaseLead:'免費 AI 提供答案；Poly-Glot 提供更多選擇和更有效率的使用方式。',
  showcaseBody:'建立一次提示詞，選擇 8 家 AI 服務供應商中的一家使用，或透過比較模式參考不同觀點並挑選最合適的回答。提供 38 種介面語言及 1,000 多個可重複使用的範本。',
  showcaseTrial:'免費下載，完整試用 3 天。',
  showcasePro:'在 Poly-Glot 成為日常工作流程的一部分後，升級 Pro 即可使用無限次傳送、所有範本及比較模式。',
  fq3q:'我的資料安全嗎？',
  fq3a:'App 的歷史紀錄與設定保留在裝置上。語音輸入會在可用時使用裝置端語音辨識；若失敗，可能改用 Apple 的伺服器端語音辨識。傳送提示詞時，內容會送到所選的 AI 服務供應商以產生回答。Apple 及所選服務供應商的隱私條款適用於各自處理的資料。',
  crossDeviceH:'一次訂閱，支援所有 Apple 裝置，也可使用 MCP。',
  crossDeviceP:'使用同一 Apple ID，可在 iPhone、iPad 與 Mac 上使用相同的 Poly-Glot 存取權益。支援的 MCP 用戶端可在連結帳戶後使用相同權益，無須另外訂閱 MCP。',
  prEye:'💰 價格',
  prSub:'完整功能試用 3 天，包含所有範本、比較模式及無限次傳送。試用後，每滾動 24 小時仍提供一次免費單一 AI 傳送。升級 Pro 可繼續享有完整功能。',
  prCTA1:'免費下載',
  prCTA2:'免費下載',
  prCTA3:'免費下載',
  mcpGptSteps:'<li>確認 ChatGPT 帳戶是否支援自訂 MCP 連接功能。</li><li>如支援，新增 Poly-Glot 正式版 MCP 端點。</li><li>完成授權、允許工具存取，並測試可用的工具。</li>'
};
const other={
 '#pg-mcp-connect-title':'在支援的 MCP 用戶端中連接 Poly-Glot',
 '.pg-mcp-connect-step:nth-child(1) .pg-mcp-connect-step-title':'選擇 MCP 用戶端',
 '.pg-mcp-connect-step:nth-child(1) .pg-mcp-connect-step-text':'開啟用戶端的 MCP、連接器、工具或整合設定。',
 '.pg-mcp-connect-step:nth-child(2) .pg-mcp-connect-step-title':'新增遠端伺服器',
 '.pg-mcp-connect-step:nth-child(2) .pg-mcp-connect-step-text':'貼上 Poly-Glot MCP 端點，並儲存為 Poly-Glot。',
 '.pg-mcp-connect-step:nth-child(3) .pg-mcp-connect-step-title':'授權並使用工具',
 '.pg-mcp-connect-step:nth-child(3) .pg-mcp-connect-step-text':'核准工具存取權限，即可搜尋範本、建立提示詞及準備比較。',
 '.pg-mcp-connect-action[href="mcp-integrations.html"] span':'探索 MCP 整合功能 →'
};
const toolNames=['search_templates','get_template','build_prompt','prepare_compare','get_language_options','get_subscription_status','open_workspace','transcribe_audio','detect_language','translate_text','localize_text','get_custom_model_capabilities','validate_custom_model','run_custom_model','prepare_custom_compare'];
const toolDescriptions=[
 '搜尋 1,000 多個範本','查看範本詳細資料','填寫並產生提示詞','準備比較 2–8 個 AI','支援 38 種語言','查看訂閱方案','開啟完整工作區',
 '將音訊轉錄為文字以用於 Poly-Glot','偵測文字語言並對應到支援的語言','翻譯文字並保留原意與格式',
 '依目標語言、地區、受眾與語氣在地化文字','查看自訂模型的功能與需求','驗證開發者提供的自訂模型端點',
 '透過自訂模型端點執行 Poly-Glot 提示詞','準備內建 AI 供應商和自訂模型的比較'
];
let scheduled=false,tries=0;
function lang(){const i=w._pgI18n;return i&&typeof i.curLang==='function'?i.curLang():'EN';}
function apply(){
 scheduled=false;
 if(lang()!=='ZH_TW')return;
 const i=w._pgI18n,dict=i&&i.dictionary;
 if(dict){dict.ZH_TW=dict.ZH_TW||{};Object.assign(dict.ZH_TW,patch);}
 for(const key of Object.keys(patch)){
  const val=patch[key];
  d.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){
   if(key==='mcpGptSteps')return;
   if(key==='fq3q'&&el.querySelector('.toggle')){const toggle=el.querySelector('.toggle');el.textContent=val;el.appendChild(toggle);}
   else if(el.children.length===0&&el.textContent!==val)el.textContent=val;
   else if(key==='fq3a'&&el.textContent!==val)el.textContent=val;
  });
 }
 for(const sel of Object.keys(other))d.querySelectorAll('#connect '+sel).forEach(function(el){if(el.textContent!==other[sel])el.textContent=other[sel];});
 const steps=d.querySelector('#connect [data-i18n-html="mcpGptSteps"]');
 // Replace only the ordered-list contents, avoiding repeated 1. 1. numbering.
 if(steps&&steps.innerHTML!==patch.mcpGptSteps){steps.innerHTML=patch.mcpGptSteps;steps.setAttribute('data-pg-zh-tw-steps','true');}
 const title=d.querySelector('#pg-mcp-tools .pg-mcp-tools-toggle-title');if(title)title.textContent=patch.mcpToolsH;
 const cards=d.querySelectorAll('#pg-mcp-tools .pg-mcp-motion-card');
 if(cards.length===15){
  cards.forEach(function(card,index){const id=card.querySelector('code');const desc=card.querySelector('p');if(id&&id.textContent.trim()===toolNames[index]&&desc&&desc.textContent!==toolDescriptions[index])desc.textContent=toolDescriptions[index];});
 }
 const faq=d.querySelector('#faq [data-i18n="fq3a"]');if(faq)faq.textContent=patch.fq3a;
 const buy=d.querySelector('[data-i18n="crossDeviceH"]');if(buy)buy.textContent=patch.crossDeviceH;
 const purchase=d.querySelector('[data-i18n="crossDeviceP"]');if(purchase)purchase.textContent=patch.crossDeviceP;
 d.querySelectorAll('#features .pg-feature-privacy-link').forEach(function(privacy){if(privacy.textContent!=='閱讀隱私權詳情 →')privacy.textContent='閱讀隱私權詳情 →';privacy.setAttribute('aria-label','閱讀完整隱私權政策');});
 // Never alter brand names, MCP endpoint strings, numeric prices or code snippets.
}
function schedule(){if(scheduled)return;scheduled=true;w.requestAnimationFrame? w.requestAnimationFrame(apply):setTimeout(apply,0);}
function boot(){apply();w.addEventListener('pg:languagechange',function(){schedule();setTimeout(apply,240);});w.addEventListener('pageshow',schedule);setTimeout(apply,350);}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(window,document);
