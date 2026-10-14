/* Localized, iOS-only photo scanner feature in the Poly-Glot product page. */
(function(w,d){'use strict';
var APP='https://apps.apple.com/us/app/poly-glot-ai-workspace/id6804499285';
function strings(){var all=w.PGPhotoAILocales||{};var raw=String(localStorage.getItem('pgLang')||navigator.language||'EN').toUpperCase().replace(/-/g,'_');return all[raw]||all[raw.split('_')[0]]||all.EN||{};}
function localize(){var t=strings();[['pg-scanner-title',t.feature],['pg-scanner-desc',t.macNews],['pg-scanner-gate',t.iosNews],['pg-scanner-privacy',t.privacy],['pg-scanner-cta',(t.feature||'Photo to AI')+' →']].forEach(function(k){var el=d.getElementById(k[0]);if(el&&k[1]&&el.textContent!==k[1])el.textContent=k[1];});}
function render(){
 if(d.getElementById('pg-photo-scanner-product'))return;
 var anchor=d.getElementById('features');if(!anchor||!anchor.parentNode)return;
 var sec=d.createElement('section');sec.id='pg-photo-scanner-product';
 sec.setAttribute('aria-label','Photo to AI on iPhone and iPad');
 sec.style.cssText='padding:36px 18px;background:linear-gradient(120deg,#191833,#102b43);color:#f8fafc;border-block:1px solid rgba(190,177,255,.22)';
 sec.innerHTML='<div style="max-width:1080px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:22px;align-items:center">'
 +'<div><div style="color:#c4b5fd;font-weight:750;font-size:12px;letter-spacing:.07em;text-transform:uppercase">NEW · iPhone & iPad only · OCR</div><h2 id="pg-scanner-title" style="font-size:clamp(27px,4vw,40px);margin:12px 0;color:#fff">Photo to AI</h2><p id="pg-scanner-desc" style="font-size:16px;line-height:1.65;color:#d8dfef">On iPhone and iPad: scan text or share photos with AI.</p>'
 +'<p id="pg-scanner-gate" style="color:#e9d5ff;font-weight:650;margin:12px 0">Free for 3 days, then Pro.</p><a id="pg-scanner-cta" href="'+APP+'" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:6px;padding:12px 18px;border-radius:10px;background:#ddd6fe;color:#26134a;text-decoration:none;font-weight:750">Get iOS app →</a></div>'
 +'<div style="border:1px solid #606e8c;border-radius:17px;background:#0e1728;padding:21px"><div style="font-size:17px;font-weight:750">📷 + ✍️ → 🤖</div><p id="pg-scanner-privacy" style="font-size:14px;line-height:1.75;color:#d4deef;margin:12px 0 0">Your photo leaves your device only if you choose to share it.</p><p style="font-size:12px;color:#aab8d1;margin-top:8px">Apple Share Sheet · Supported recipient apps only · No paid AI API required</p></div></div>';
 anchor.parentNode.insertBefore(sec,anchor);localize();
}
function init(){render();var last='';setInterval(function(){var v=localStorage.getItem('pgLang')||'';if(v!==last){last=v;localize();}},1500);}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})(window,document);
