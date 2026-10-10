/* Technical copy parity for the Poly-Glot MCP server (38 languages).
 * These 21 items are intentionally isolated from the general marketing i18n
 * because incorrect outdated technical translations must never replace truth.
 * The English source is static for no-JS and search crawlers.
 */
(function(){
"use strict";
var EN={"homeMcp":"MCP (Model Context Protocol) lets compatible AI assistants connect to external tools. Poly-Glot exposes template discovery, prompt building, and comparison preparation. Preparing a comparison does not automatically contact the selected AI providers or retrieve their answers.","claudeAccess":"Claude custom connector availability depends on your current Claude plan, app version, and workspace permissions. Use Settings → Connectors when available.","chatIntro":"Connect Poly-Glot as a remote MCP app or custom connector when supported by your ChatGPT account or workspace. Availability and authorization depend on your plan and settings.","chatHeading":"Set up a compatible MCP connection","chatStep1":"Check ChatGPT Apps or developer settings","chatStep1Body":"Open the available Apps or custom MCP configuration in ChatGPT. Your plan, workspace, and administrator may restrict this feature.","chatStep2":"Add the production Streamable HTTP endpoint","chatStep2Body":"When your account supports a custom remote MCP server, supply the exact URL below and complete any required authentication.","chatStep3":"Approve tools and verify access","chatStep3Body":"Refresh discovered tools and try get_language_options or search_templates. Sign in with a verified Poly-Glot account for trial activation, Send actions, and subscription access.","chatNoteTitle":"Client compatibility note","chatNoteBody":"Tool access depends on the client and permissions. The embedded workspace GUI may not render in every MCP client. Poly-Glot does not promise an App Store listing or automatic one-click installation.","chatHelpLink":"Read current ChatGPT MCP troubleshooting →","toolGetTemplate":"Get template fields; paid prompt bodies are returned only when the account is entitled","compareExample":"The prepare_compare tool returned one prompt and a plan for ChatGPT, Claude, and Gemini. It does not automatically call those providers or collect their answers; use each selected AI and compare the results yourself.","freeAnswer":"The app-managed 3-day full-access trial starts on the first qualifying Send after account verification and does not automatically turn into a paid subscription. After it expires, 25 free templates and one single-AI Send per rolling 24 hours remain available; Compare Mode, BYOM, language-processing tools, and Pro templates require an active trial or Pro subscription.","appAnswer":"You can browse free MCP tools from a compatible client. Starting the trial and using restricted tools requires a verified Poly-Glot account, and Apple subscription purchase or restoration may require the native app. MCP client support and embedded GUI availability vary.","privacyAnswer":"The MCP server processes tool requests and records operational usage metadata. Custom-model and audio tools can send provided content to the chosen processing provider. Do not include secrets in support requests or public logs. Review the","privacyCollection":"App history and settings may be stored on your device. When you use connected AI services or the remote Poly-Glot MCP server, requests are transmitted to the selected services. The MCP backend verifies account entitlements and records operational metadata such as tool usage and errors; a signed-in account is required for trial activation and restricted Send actions. Do not submit passwords, API keys, or private receipts in support messages.","privacyPurchases":"Apple processes in-app subscription payments. Poly-Glot may verify and record subscription entitlement state or Apple transaction identifiers to determine feature access; payment card details are handled by Apple, not by this website.","privacyServices":"This website uses Google Analytics and a TikTok advertising pixel. Website visitors may have browser and interaction data processed by these services under their own policies. AI providers, optional custom-model endpoints, speech-recognition services, and audio/transcription providers may process content when you choose to send it. Their separate privacy terms apply.","termsWhat":"In native-app workflows, Poly-Glot can prepare and copy a prompt, then open the AI provider you select. MCP tools also run through a remote server that enforces subscription access and processes permitted requests. Provider responses and availability depend on the selected service and workflow.","termsCompare":"Prepare the same prompt for multiple selected AI providers and compare their responses through the supported workflow. The MCP prepare_compare tool does not itself contact the providers or retrieve their answers.","termsTrial":"The app-managed 3-day full-access trial starts on the first eligible Send after account verification; its start is recorded by the entitlement service and does not automatically convert into a paid subscription. Reinstalling the app or changing devices does not create a new trial for the same verified account.","termsGated":"After the full-access trial, these features require a Pro subscription; Bring Your Own Model and language-processing MCP tools are also restricted:","termsPrivacy":"App history and settings may remain on your device, but requests to third-party AI providers and remote MCP tools can transmit content to those services. Poly-Glot's MCP server verifies account entitlements and logs operational metadata; custom-model and transcription workflows can send provided content to selected processors. The website also uses analytics and advertising pixels. Review the Privacy Policy and each provider's terms.","pricingPrivacy":"App history and settings can remain on-device. Submitted prompts go to the selected AI provider, while remote MCP requests pass through the Poly-Glot server. The MCP service verifies entitlements and records operational usage metadata; processing providers have their own privacy policies.","pricingVoice":"Voice input can use on-device recognition where supported, with a server-based fallback depending on the device and settings. The MCP transcribe_audio tool sends supplied audio to its configured transcription provider and requires active trial or Pro access.","pricingTrial":"The app-managed 3-day full-access trial begins with the first eligible Send for a verified account. It does not automatically convert into a paid Apple subscription. Starting the trial and restoring a paid subscription require appropriate account verification.","pricingExpired":"After trial expiry, 25 free templates remain available, with one single-AI Send shared across free workflows every rolling 24 hours. Pro templates, Compare Mode, BYOM execution and MCP language-processing tools require an active trial or Pro; the trial itself never starts a paid subscription.","compareHow":"Poly-Glot prepares one consistent prompt for the providers you select. The app supports comparing their separate responses where the external services and client workflow allow it. The MCP prepare_compare tool stages prompts and provider instructions; it does not automatically invoke models or collect responses.","compareAuto":"No. You choose which AI providers to use. In an MCP client, prepare_compare generates a comparison plan rather than executing provider requests. Sending, displaying, and comparing actual answers depend on the chosen app or client and each provider.","templatesFree":"There are 25 designated free templates. Browsing and searching are read-only; restricted Pro template bodies are returned only when the verified account has an active trial or Pro entitlement. After the 3-day trial, free templates remain available but Pro templates and Compare Mode lock.","templatesPro":"No paid subscription is required to browse or use the limited free tier. A verified account is needed to start a trial or use restricted Send actions. Pro unlocks restricted templates, Compare Mode and unlimited sends, plus eligible BYOM and MCP language-processing features.","languagesCount":"Poly-Glot supports 38 named interface languages, including right-to-left Arabic and Hebrew, and independent output-language controls. MCP language detection, translation, localization and transcription are separate restricted processing tools that require an active trial or Pro subscription.","mcpIntro":"Poly-Glot provides a hosted Streamable HTTP Model Context Protocol server with tools for template discovery, prompt building, comparison preparation, BYOM, language and audio processing, and subscription status. Read-only discovery does not start a trial; Send and restricted tools use verified server-side entitlements.","mcpCount":"The current MCP server code registers 15 tools: seven core tools, four BYOM tools, and four language and audio tools. Discovery depends on client support and permissions; some tool actions require an authenticated trial or Pro account."};
var languages=["EN","ES","FR","DE","IT","PT","NL","RU","ZH","ZH_TW","JA","KO","AR","HI","BN","TR","PL","SV","NO","DA","FI","EL","HE","ID","MS","TH","VI","UK","CS","RO","HU","SK","HR","CA","AF","SW","HA","AM"];
var cache={EN:EN}, pending={},serial=0,mode="pending";
function language(){
 var cur=window._pgI18n&&typeof window._pgI18n.curLang==="function"?window._pgI18n.curLang():"";
 if(languages.indexOf(cur)>=0)return cur;
 var query=new URLSearchParams(location.search).get("lang")||"EN";
 return languages.indexOf(query.toUpperCase())>=0?query.toUpperCase():"EN";
}
function render(code,strings){
 var elements=document.querySelectorAll("[data-pg-tech]");
 if(!elements.length)return;
 var ok=0;
 elements.forEach(function(el){
  var key=el.getAttribute("data-pg-tech");
  var translation=strings&&strings[key];
  var usable=typeof translation==="string"&&translation.trim().length>0;
  var next=usable?translation:EN[key];
  if(typeof next==="string"&&el.textContent!==next)el.textContent=next;
  if(usable)ok++;
 });
 mode=(code==="EN"?"english":ok===elements.length?"complete":"partial");
 document.documentElement.setAttribute("data-pg-technical-l10n",mode);
 document.documentElement.setAttribute("data-pg-technical-language",code);
 document.documentElement.setAttribute("data-pg-technical-count",String(ok));
}
function load(code){
 if(cache[code])return Promise.resolve(cache[code]);
 if(pending[code])return pending[code];
 pending[code]=fetch("assets/locales/mcp-technical/"+code.toLowerCase()+".json?v=20261010-tech-v3",{cache:"no-store"}).then(function(resp){
  if(!resp.ok)throw Error("Missing technical locale "+code+" "+resp.status);
  return resp.json();
 }).then(function(data){
  if(!data||data.language!==code||typeof data.strings!=="object"||Object.keys(EN).some(function(k){return !data.strings[k]})){
   throw Error("Incomplete technical locale "+code);
  }
  cache[code]=data.strings;
  return data.strings;
 });
 return pending[code];
}
function apply(){
 var code=language(),generation=++serial;
 if(code==="EN"){render(code,EN);return;}
 load(code).then(function(v){if(generation===serial&&language()===code)render(code,v);}).catch(function(e){
  if(generation===serial&&language()===code)render(code,EN);
  console.warn("Poly-Glot technical locale unavailable:",e.message);
 });
}
function schedule(){setTimeout(apply,80);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
window.addEventListener("pg:languagechange",schedule);
window.addEventListener("pageshow",schedule);
window._pgTechnicalAccuracy={apply:apply,keys:Object.keys(EN),status:function(){return mode;},language:language};
})();