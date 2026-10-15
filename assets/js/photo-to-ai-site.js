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
 var tapPasteHints={"EN":"iPhone/iPad: Touch and hold in the AI chat, then choose Paste.","ES":"iPhone/iPad: Mantén pulsado el campo del chat de IA y elige Pegar.","FR":"iPhone/iPad : maintenez le doigt dans le chat IA, puis choisissez Coller.","DE":"iPhone/iPad: Berühre und halte das KI-Chatfeld und wähle Einfügen.","IT":"iPhone/iPad: tieni premuto nella chat IA e scegli Incolla.","PT":"iPhone/iPad: mantenha premido no chat da IA e escolha Colar.","NL":"iPhone/iPad: houd het chatveld van de AI ingedrukt en kies Plakken.","RU":"iPhone/iPad: нажмите и удерживайте поле чата ИИ, затем выберите «Вставить».","ZH":"iPhone/iPad：长按 AI 聊天输入框，然后选择“粘贴”。","ZH_TW":"iPhone/iPad：長按 AI 聊天輸入欄，然後選擇「貼上」。","JA":"iPhone/iPad：AI チャットの入力欄を長押しし、「ペースト」を選びます。","KO":"iPhone/iPad: AI 채팅 입력란을 길게 누른 다음 붙여넣기를 선택하세요.","AR":"iPhone/iPad: اضغط مطولًا في حقل محادثة الذكاء الاصطناعي، ثم اختر لصق.","HI":"iPhone/iPad: AI चैट में दबाकर रखें, फिर पेस्ट चुनें।","BN":"iPhone/iPad: AI চ্যাটের ঘরটি চেপে ধরে পেস্ট নির্বাচন করুন।","TR":"iPhone/iPad: AI sohbet alanına basılı tutun, ardından Yapıştır'ı seçin.","PL":"iPhone/iPad: przytrzymaj pole czatu AI, a następnie wybierz Wklej.","SV":"iPhone/iPad: håll ned i AI-chatten och välj Klistra in.","NO":"iPhone/iPad: trykk og hold i KI-chatten, og velg Lim inn.","DA":"iPhone/iPad: tryk og hold i AI-chatten, og vælg Sæt ind.","FI":"iPhone/iPad: kosketa AI-keskustelukenttää pitkään ja valitse Liitä.","EL":"iPhone/iPad: πατήστε παρατεταμένα στο πεδίο συνομιλίας AI και επιλέξτε Επικόλληση.","HE":"iPhone/iPad: לחצו לחיצה ארוכה בשדה הצ'אט של ה-AI ובחרו הדבק.","ID":"iPhone/iPad: sentuh dan tahan kolom obrolan AI, lalu pilih Tempel.","MS":"iPhone/iPad: sentuh dan tahan ruangan sembang AI, kemudian pilih Tampal.","TH":"iPhone/iPad: แตะช่องแชต AI ค้างไว้ แล้วเลือก วาง","VI":"iPhone/iPad: chạm và giữ ô trò chuyện AI, rồi chọn Dán.","UK":"iPhone/iPad: натисніть і утримуйте поле чату ШІ, потім виберіть «Вставити».","CS":"iPhone/iPad: podržte prst v poli chatu AI a vyberte Vložit.","RO":"iPhone/iPad: țineți apăsat în chatul AI, apoi alegeți Lipire.","HU":"iPhone/iPad: érintse meg hosszan az AI-csevegőmezőt, majd válassza a Beillesztés lehetőséget.","SK":"iPhone/iPad: podržte prst v poli AI chatu a vyberte Prilepiť.","HR":"iPhone/iPad: dodirnite i zadržite polje AI razgovora pa odaberite Zalijepi.","CA":"iPhone/iPad: mantén premut el camp del xat d'IA i tria Enganxa.","AF":"iPhone/iPad: druk en hou die KI-kletsveld in, en kies Plak.","SW":"iPhone/iPad: gusa na ushikilie sehemu ya mazungumzo ya AI, kisha chagua Bandika.","HA":"iPhone/iPad: taɓa ka riƙe akwatin tattaunawar AI, sannan zaɓi Manna.","AM":"iPhone/iPad፦ በAI ውይይት መስክ ላይ ተጭነው ይቆዩ፣ ከዚያ ለጥፍ የሚለውን ይምረጡ።"};
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
   set('pg-mac-photo-desktop-note',handoff[1]||('💻 Mac · '+(t.choose||'Choose photo')+' · '+(t.manualPhoto||'Paste or attach the image in the AI browser tab.')));
   set('pg-ios-photo-scan-title','📄 '+(t.scanText||'Scan text'));
   set('pg-ios-photo-scan-copy',t.ocrMeaning||'OCR extracts editable text from pictures.');
   set('pg-ios-photo-upload-title','🖼️ '+(t.photoUploadTitle||'Upload photos to AI'));
   set('pg-ios-photo-upload-copy',handoff[0]||t.photoUploadCopy||'Choose a photo, paste or attach it in the AI chat, then send.');
   set('pg-ios-photo-tap-hint',tapPasteHints[lang]||tapPasteHints[lang.split('_')[0]]||tapPasteHints.EN);
   set('pg-ios-photo-share-title','✍️ '+(t.context||'Add context'));
   set('pg-ios-photo-share-copy',handoff[2]||t.photoCompatibility||'Add your question or instructions beside the image in the AI chat before sending.');
   set('pg-ios-photo-trial',t.locked||'Pro required after your 3-day trial.');
   set('pg-ios-photo-privacy',t.privacy||'Photos leave your device only when you share them.');
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
