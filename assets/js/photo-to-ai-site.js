/* Localized, iOS-only photo scanner feature in the Poly-Glot product page. */
(function(w,d){'use strict';
var APP='https://apps.apple.com/us/app/poly-glot-ai-workspace/id6804499285';
function strings(){var all=w.PGPhotoAILocales||{};var current=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())||localStorage.getItem('pgLang')||navigator.language||'EN';var raw=String(current).toUpperCase().replace(/-/g,'_');return all[raw]||all[raw.split('_')[0]]||all.EN||{};}
function localize(){var t=strings();[['pg-scanner-title',t.comingSoonLine||t.feature],['pg-scanner-desc',(t.ocrMeaning||'')+' '+(t.comingSoon||'Coming soon')+': '+(t.photoCompatibility||'')],['pg-scanner-gate',t.comingSoonTrial||t.locked],['pg-scanner-privacy',t.photoPolicy||t.privacy],['pg-scanner-cta','App Store · '+(t.feature||'Photo to AI')+' →'],['pg-photo-guide-title','📎 '+(t.comingSoon||'Coming soon')+' · '+(t.feature||'Photo to AI')],['pg-photo-guide-common','ChatGPT · Claude · Gemini · Grok · Perplexity · Mistral: '+(t.manualPhoto||'Attach in the AI app.')],['pg-photo-guide-duck','DuckDuckGo AI: '+(t.duckImageModel||'Image support depends on model.')],['pg-photo-guide-hug','HuggingChat: '+(t.huggingUnavailable||'Service not available.')]].forEach(function(k){var el=d.getElementById(k[0]);if(el&&k[1]&&el.textContent!==k[1])el.textContent=k[1];});
 // These are live HTML previews of the actual iOS/iPadOS action row.
 // Replace the previous OCR-only Scan label, without inserting a fictitious fourth button.
 var previewLabel=t.feature||'Photo to AI';
 Array.prototype.forEach.call(d.querySelectorAll('[data-pg-photo-preview-action]'),function(el){
   if(el.textContent!==previewLabel)el.textContent=previewLabel;
 });
}
function render(){
 // The localized, SEO-visible Photo-to-AI section is authoritative. Never duplicate it.
 var existing=d.getElementById('pg-ios-photo-ai-site');
 if(existing){
   if(!d.getElementById('pg-photo-ai-compatibility-guide')){
     var panel=d.createElement('details');panel.id='pg-photo-ai-compatibility-guide';
     panel.setAttribute('data-no-translate','');
     panel.style.cssText='max-width:1050px;margin:16px auto 0;padding:12px 16px;border:1px solid rgba(167,139,250,.4);border-radius:12px;font-size:13px;line-height:1.65;color:#f7f4ff';
     panel.innerHTML='<summary id="pg-photo-guide-title" style="cursor:pointer;font-weight:700">📎 Photo to AI · AI</summary><p id="pg-photo-guide-common"></p><p id="pg-photo-guide-duck"></p><p id="pg-photo-guide-hug"></p>';
     existing.appendChild(panel);
   }
   localize();return;
 }
 if(d.getElementById('pg-photo-scanner-product'))return;
 var anchor=d.getElementById('features');if(!anchor||!anchor.parentNode)return;
 var sec=d.createElement('section');sec.id='pg-photo-scanner-product';
 sec.setAttribute('aria-label','Photo to AI on iPhone and iPad');
 sec.style.cssText='padding:36px 18px;background:linear-gradient(120deg,#191833,#102b43);color:#f8fafc;border-block:1px solid rgba(190,177,255,.22)';
 sec.innerHTML='<div style="max-width:1080px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:22px;align-items:center">'
 +'<div><div style="color:#c4b5fd;font-weight:750;font-size:12px;letter-spacing:.07em;text-transform:uppercase">📱 iPhone · iPad · OCR · Coming soon</div><h2 id="pg-scanner-title" style="font-size:clamp(27px,4vw,40px);margin:12px 0;color:#fff">Coming soon: Photo to AI</h2><p id="pg-scanner-desc" style="font-size:16px;line-height:1.65;color:#d8dfef">Coming soon on iPhone and iPad: photo sharing with optional context for compatible AI apps.</p>'
 +'<p id="pg-scanner-gate" style="color:#e9d5ff;font-weight:650;margin:12px 0">Planned for the 3-day trial, then Pro.</p><a id="pg-scanner-cta" href="'+APP+'" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:6px;padding:12px 18px;border-radius:10px;background:#ddd6fe;color:#26134a;text-decoration:none;font-weight:750">Get iOS app →</a></div>'
 +'<div style="border:1px solid #606e8c;border-radius:17px;background:#0e1728;padding:21px"><div style="font-size:17px;font-weight:750">📷 + ✍️ → 🤖</div><p id="pg-scanner-privacy" style="font-size:14px;line-height:1.75;color:#d4deef;margin:12px 0 0">Your photo leaves your device only if you choose to share it.</p></div></div>';
 anchor.parentNode.insertBefore(sec,anchor);localize();
}
function init(){render();var last='';setInterval(function(){var v=localStorage.getItem('pgLang')||'';if(v!==last){last=v;localize();}},1500);}
w.addEventListener('pg:languagechange',localize);
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})(window,document);
