/* Photo to AI product section — single localized source of truth.
 * iPhone/iPad camera and Mac Finder use different native photo workflows.
 * OCR, photo handoff, trial, and privacy are separate scannable statements.
 */
(function(w,d){'use strict';
 var APP='https://apps.apple.com/us/app/poly-glot-ai-workspace/id6804499285?platform=iphone';
 function language(){
   var v=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())||
     localStorage.getItem('pgLang')||d.documentElement.lang||navigator.language||'EN';
   return String(v).toUpperCase().replace(/-/g,'_');
 }
 function copy(){
   var all=w.PGPhotoAILocales||{},code=language();
   return all[code]||all[code.split('_')[0]]||all.EN||{};
 }
 function set(id,value){
   var e=d.getElementById(id);if(e&&value&&e.textContent!==value)e.textContent=value;
 }
 var comingSoon={"EN":"Coming Soon","ES":"Próximamente","FR":"Bientôt disponible","DE":"Demnächst","IT":"Prossimamente","PT":"Em breve","NL":"Binnenkort","RU":"Скоро","ZH":"即将推出","ZH_TW":"即將推出","JA":"近日公開","KO":"출시 예정","AR":"قريبًا","HI":"जल्द आ रहा है","BN":"শীঘ্রই আসছে","TR":"Yakında","PL":"Wkrótce","SV":"Kommer snart","NO":"Kommer snart","DA":"Kommer snart","FI":"Tulossa pian","EL":"Σύντομα","HE":"בקרוב","ID":"Segera hadir","MS":"Akan datang","TH":"เร็ว ๆ นี้","VI":"Sắp ra mắt","UK":"Незабаром","CS":"Již brzy","RO":"În curând","HU":"Hamarosan","SK":"Už čoskoro","HR":"Uskoro","CA":"Properament","AF":"Binnekort","SW":"Inakuja hivi karibuni","HA":"Yana nan tafe","AM":"በቅርቡ"};
 function render(){
   var section=d.getElementById('pg-ios-photo-ai-site');
   if(!section)return; // Never add a second promotion block.
   var t=copy(),name=t.feature||'Photo to AI';
   var allHandoff=w.PGPhotoHandoffGuideLocales||{},lang=language();
   var handoff=allHandoff[lang]||allHandoff[lang.split('_')[0]]||allHandoff.EN||[];
   set('pg-ios-photo-kicker','📷 '+name+' · Mac · iPhone · iPad');
   set('pg-ios-photo-title',name);
   var badge=d.getElementById('pg-ios-photo-soon-badge');
   if(badge){var label=comingSoon[language()]||comingSoon[language().split('_')[0]]||comingSoon.EN;
     if(badge.textContent!==label)badge.textContent=label;
     badge.setAttribute('aria-label',label);
   }
   set('pg-mac-photo-desktop-note',(handoff[1]||('💻 Mac · '+(t.choose||'Choose photo')+' · '+(t.manualPhoto||'Paste or attach the image in the AI browser tab.')))+' '+(handoff[4]||'Or right-click in the AI chat and choose Paste.'));
   set('pg-ios-photo-scan-title','📄 '+(t.scanText||'Scan text'));
   set('pg-ios-photo-scan-copy',t.ocrMeaning||'OCR extracts editable text from pictures.');
   set('pg-ios-photo-upload-title','🖼️ '+(t.photoUploadTitle||'Upload photos to AI'));
   set('pg-ios-photo-upload-copy',handoff[0]||t.photoUploadCopy||'Choose a photo, paste or attach it in the AI chat, then send.');
   set('pg-ios-photo-share-title','✍️ '+(t.context||'Add context'));
   set('pg-ios-photo-share-copy',handoff[2]||t.photoCompatibility||'Add your question or instructions beside the image in the AI chat before sending.');
   set('pg-ios-photo-trial',t.locked||'Pro required after your 3-day trial.');
   set('pg-ios-photo-privacy',t.photoPolicy||t.privacy||'Photos leave your device only when you share them. Receiving AI apps may process shared photos.');
   set('pg-ios-photo-compatibility',handoff[3]||t.providerLimit||'Image paste or attachment depends on the AI provider.');
   section.setAttribute('aria-label',name+' · Mac · iPhone · iPad');
   var rtl=/^(AR|HE)$/.test(language());
   section.setAttribute('dir',rtl?'rtl':'ltr');
   // Reuse the same 38-language Photo-to-AI label on all device previews.
   d.querySelectorAll('[data-pg-photo-preview-action]').forEach(function(x){
     if(x.textContent!==name)x.textContent=name;
   });
   // Retire the previous redundant announcement below Multiple Input Options.
   var duplicate=d.getElementById('pg-photo-input-soon');if(duplicate)duplicate.remove();
 }
 function init(){
   render();
 }
 w.addEventListener('pg:languagechange',render);
 w.addEventListener('pageshow',render);
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
