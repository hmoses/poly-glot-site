/* Photo to AI product section — single localized source of truth.
 * iPhone/iPad only. App Store rollout is not assumed until verified.
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
 function render(){
   var section=d.getElementById('pg-ios-photo-ai-site');
   if(!section)return; // Never add a second promotion block.
   var t=copy(),name=t.feature||'Photo to AI';
   set('pg-ios-photo-kicker','📷 '+(t.comingSoon||'Coming soon')+' · iPhone / iPad');
   set('pg-ios-photo-title',name);
   set('pg-ios-photo-scan-title','📄 '+(t.scanText||'Scan text'));
   set('pg-ios-photo-scan-copy',t.ocrMeaning||'OCR extracts editable text from pictures.');
   set('pg-ios-photo-upload-title','🖼️ '+(t.photoUploadTitle||'Upload photos to AI'));
   set('pg-ios-photo-upload-copy',t.photoUploadCopy||'Take or choose a photo, then share it with a compatible AI app. If sharing is unsupported, attach it in the AI app.');
   set('pg-ios-photo-share-title','✍️ '+(t.context||'Add context'));
   set('pg-ios-photo-share-copy',t.photoCompatibility||'Take or choose a photo and add optional instructions.');
   set('pg-ios-photo-trial',t.locked||'Pro required after your 3-day trial.');
   set('pg-ios-photo-privacy',t.privacy||'Photos leave your device only when you share them.');
   var rtl=/^(AR|HE)$/.test(language());
   section.setAttribute('dir',rtl?'rtl':'ltr');
   // iOS-only product previews: do not change Mac controls.
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
