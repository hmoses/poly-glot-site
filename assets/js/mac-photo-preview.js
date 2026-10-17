/* Mac App Preview: parity with production macOS image-only Photo to AI v3.
 * Demo stays on this page; no provider API, upload or entitlement changes.
 */
(function(w,d){'use strict';
 var dialog,selectedFile,objectUrl;
 var macActionLocales={"EN":["Open selected AI (paste photo)","Close"],"ES":["Abrir la IA elegida (pegar foto)","Cerrar"],"FR":["Ouvrir l’IA choisie (coller la photo)","Fermer"],"DE":["Ausgewählte KI öffnen (Foto einfügen)","Schließen"],"IT":["Apri l’IA selezionata (incolla foto)","Chiudi"],"PT":["Abrir IA selecionada (colar foto)","Fechar"],"NL":["Geselecteerde AI openen (foto plakken)","Sluiten"],"RU":["Открыть выбранный ИИ (вставить фото)","Закрыть"],"ZH":["打开所选 AI（粘贴照片）","关闭"],"ZH_TW":["開啟所選 AI（貼上照片）","關閉"],"JA":["選択したAIを開く（写真を貼り付け）","閉じる"],"KO":["선택한 AI 열기(사진 붙여넣기)","닫기"],"AR":["افتح الذكاء الاصطناعي المحدد (ألصق الصورة)","إغلاق"],"HI":["चुना हुआ AI खोलें (फ़ोटो चिपकाएँ)","बंद करें"],"TR":["Seçilen yapay zekâyı aç (fotoğrafı yapıştır)","Kapat"],"PL":["Otwórz wybraną AI (wklej zdjęcie)","Zamknij"],"SV":["Öppna vald AI (klistra in foto)","Stäng"],"DA":["Åbn valgt AI (indsæt foto)","Luk"],"NO":["Åpne valgt KI (lim inn bilde)","Lukk"],"FI":["Avaa valittu tekoäly (liitä kuva)","Sulje"],"EL":["Άνοιγμα επιλεγμένου AI (επικόλληση φωτογραφίας)","Κλείσιμο"],"HE":["פתיחת AI שנבחר (הדבקת תמונה)","סגירה"],"TH":["เปิด AI ที่เลือก (วางรูปภาพ)","ปิด"],"VI":["Mở AI đã chọn (dán ảnh)","Đóng"],"ID":["Buka AI pilihan (tempel foto)","Tutup"],"MS":["Buka AI dipilih (tampal foto)","Tutup"],"UK":["Відкрити вибраний ШІ (вставити фото)","Закрити"],"RO":["Deschide AI selectat (lipește fotografia)","Închide"],"CS":["Otevřít vybranou AI (vložit fotku)","Zavřít"],"HU":["Kiválasztott MI megnyitása (fotó beillesztése)","Bezárás"],"SK":["Otvoriť vybranú AI (vložiť fotku)","Zavrieť"],"HR":["Otvori odabrani AI (zalijepi fotografiju)","Zatvori"],"CA":["Obre la IA seleccionada (enganxa la foto)","Tanca"],"TL":["Buksan ang napiling AI (i-paste ang larawan)","Isara"],"BN":["নির্বাচিত AI খুলুন (ছবি পেস্ট করুন)","বন্ধ করুন"],"SW":["Fungua AI iliyochaguliwa (bandika picha)","Funga"],"AF":["Maak gekose KI oop (plak foto)","Sluit"],"AM":["የተመረጠውን AI ክፈት (ፎቶ ለጥፍ)","ዝጋ"],"HA":["Buɗe AI da aka zaɓa (manna hoto)","Rufe"]};
 w.PGPhotoPreviewActionLabels=macActionLocales;
 if(typeof w.dispatchEvent==='function' && typeof w.Event==='function')w.dispatchEvent(new w.Event('pg:photo-action-locales-ready'));

 function el(id){return d.getElementById(id);}
 function lang(){return String((w._pgI18n&&w._pgI18n.curLang&&w._pgI18n.curLang())||d.documentElement.lang||'EN').toUpperCase().replace(/-/g,'_');}
 function catalog(){var data=w.PGPhotoAILocales||{},code=lang();return data[code]||data[code.split('_')[0]]||data.EN||{};}
 function copy(key,fallback){var dict=catalog();return dict[key]||fallback;}
 function actionTranslations(){var c=lang();return macActionLocales[c]||macActionLocales[c.split('_')[0]]||macActionLocales.EN;}
 function openAction(){return actionTranslations()[0].replace(/\s*[\(（][^\)）]*[\)）]\s*$/,'').trim();}
 function set(id,value){var target=el(id);if(target&&target.textContent!==value)target.textContent=value;}
 function relabel(){
  if(!dialog)return;
  dialog.dir=/^(AR|HE)(_|$)/.test(lang())?'rtl':'ltr';
  set('pgMacDemoTitle','📷 '+copy('feature','Photo to AI'));
  set('pgMacDemoPrivacy',copy('photoPolicy','Photos leave your device only when you share them.'));
  set('pgMacDemoChooseLabel',copy('choose','Choose photo'));
  set('pgMacDemoChoose','📁 '+copy('choose','Choose photo'));
  set('pgMacDemoClear','× '+copy('clearPhoto','Clear photo'));
  set('pgMacDemoProvider',copy('share','Share with AI'));
  set('pgMacDemoSend','📷 '+openAction());
  set('pgMacDemoStep1','• '+copy('choose','Choose photo')+' · '+copy('share','Share with AI')+' · '+openAction());
  var locale=lang(),all=w.PGPhotoHandoffGuideLocales||{},guide=all[locale]||all[locale.split('_')[0]]||all.EN||[];
  set('pgMacDemoStep2','• '+(guide[4]||'Right-click in the AI chat and choose Paste.')+' · ⌘V');
  set('pgMacDemoStep3','• '+copy('locked','Pro required after your 3-day trial.'));
  var filename=el('pgMacDemoFileName');
  if(filename&&filename.dataset.empty==='true')filename.textContent='';
  var closeBtn=el('pgMacDemoClose');
  if(closeBtn)closeBtn.setAttribute('aria-label',actionTranslations()[1]);
  var trigger=el('pgMacPhotoPreviewTrigger');
  if(trigger)trigger.setAttribute('aria-label',copy('feature','Photo to AI'));
 }
 function disposePhoto(){
  if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}
  var img=el('pgMacDemoImage'),box=el('pgMacDemoPreviewBox'),placeholder=el('pgMacDemoPlaceholder'),frame=el('pgMacDemoComposer');
  if(img){img.removeAttribute('src');img.hidden=true;}
  if(box)box.hidden=true;
  if(placeholder)placeholder.hidden=false;
  if(frame)frame.classList.remove('has-photo');
  if(el('pgMacDemoFileName')){el('pgMacDemoFileName').textContent='';el('pgMacDemoFileName').dataset.empty='true';}
  if(el('pgMacDemoFile'))el('pgMacDemoFile').value='';
 }
 function onFile(){
  var f=this.files&&this.files[0];
  if(!f||!f.type.startsWith('image/'))return;
  disposePhoto();
  objectUrl=URL.createObjectURL(f);
  var img=el('pgMacDemoImage');img.src=objectUrl;img.hidden=false;
  el('pgMacDemoPreviewBox').hidden=false;
  el('pgMacDemoPlaceholder').hidden=true;
  el('pgMacDemoComposer').classList.add('has-photo');
  var name=el('pgMacDemoFileName');name.dataset.empty='false';name.textContent=f.name;
 }
 function close(){
  if(!dialog)return;
  dialog.hidden=true;
  d.body.classList.remove('pg-mac-demo-open');
  if(selectedFile&&typeof selectedFile.focus==='function')selectedFile.focus();
 }
 function open(){
  if(!dialog)return;
  selectedFile=d.activeElement;
  dialog.hidden=false;
  d.body.classList.add('pg-mac-demo-open');
  relabel();
  el('pgMacDemoClose').focus();
 }
 function init(){
  var action=d.querySelector('#gallery-mac #macScreen-askanyai .pg-mac-photo-preview-control');
  if(!action)return;
  action.id='pgMacPhotoPreviewTrigger';
  action.tabIndex=0;
  action.setAttribute('role','button');
  action.addEventListener('click',open);
  action.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open();}});
  dialog=d.createElement('div');dialog.id='pgMacPhotoDemoOverlay';dialog.hidden=true;dialog.setAttribute('role','presentation');
  dialog.innerHTML=
   '<div class="pg-mac-demo-shade"></div><section role="dialog" aria-modal="true" aria-labelledby="pgMacDemoTitle" class="pg-mac-demo-sheet">'+
   '<div class="pg-mac-demo-heading"><strong id="pgMacDemoTitle">📷 Photo to AI</strong><button id="pgMacDemoClose" type="button" aria-label="Close Mac preview">×</button></div>'+
   '<p id="pgMacDemoPrivacy"></p>'+
   '<div id="pgMacDemoComposer" class="pg-mac-demo-composer">'+
    '<div id="pgMacDemoPlaceholder" class="pg-mac-demo-placeholder"><div class="pg-mac-demo-folder">📁</div><strong id="pgMacDemoChooseLabel">Choose photo</strong><small>Finder · Files · Desktop</small></div>'+
    '<div id="pgMacDemoPreviewBox" class="pg-mac-demo-image-wrap" hidden><img id="pgMacDemoImage" hidden alt="Selected photo preview"><button id="pgMacDemoClear" type="button">× Clear photo</button></div>'+
   '</div>'+
   '<div id="pgMacDemoFileName" class="pg-mac-demo-filename"></div>'+
   '<button class="pg-mac-demo-choose" type="button" id="pgMacDemoChoose">📁 Choose photo</button><input type="file" accept="image/*" hidden id="pgMacDemoFile">'+
   '<label for="pgMacDemoAI" id="pgMacDemoProvider">Share with AI</label><select id="pgMacDemoAI">'+
   '<option value="chatgpt">ChatGPT</option><option value="claude">Claude</option><option value="gemini">Gemini</option><option value="grok">Grok</option><option value="perplexity">Perplexity</option><option value="mistral">Mistral</option><option value="duckduckgo">DuckDuckGo AI</option><option value="huggingchat">HuggingChat</option></select>'+
   '<div class="pg-mac-demo-action" id="pgMacDemoSend">📷 Open selected AI</div>'+
   '<div class="pg-mac-demo-steps"><p id="pgMacDemoStep1"></p><p id="pgMacDemoStep2"></p><p id="pgMacDemoStep3"></p></div>'+
   '</section>';
  d.body.appendChild(dialog);
  dialog.querySelector('.pg-mac-demo-shade').addEventListener('click',close);
  el('pgMacDemoClose').addEventListener('click',close);
  el('pgMacDemoPlaceholder').addEventListener('click',function(){el('pgMacDemoFile').click();});
  el('pgMacDemoChoose').addEventListener('click',function(){el('pgMacDemoFile').click();});
  el('pgMacDemoFile').addEventListener('change',onFile);
  el('pgMacDemoClear').addEventListener('click',disposePhoto);
  el('pgMacDemoAI').addEventListener('change',relabel);
  d.addEventListener('keydown',function(event){if(event.key==='Escape'&&!dialog.hidden)close();});
  w.addEventListener('pg:languagechange',relabel);
  w.addEventListener('pageshow',relabel);
  relabel();
 }
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})(window,document);
