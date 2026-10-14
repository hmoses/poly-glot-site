/* Mac App Preview: visual parity with shipped macOS Photo to AI panel.
 * Demo stays on this page; no provider API, upload or entitlement changes.
 */
(function(w,d){'use strict';
 var dialog,selectedFile,objectUrl;
 var macActionLocales={"EN":["Open selected AI (paste photo)","Close"],"ES":["Abrir la IA elegida (pegar foto)","Cerrar"],"FR":["Ouvrir l’IA choisie (coller la photo)","Fermer"],"DE":["Ausgewählte KI öffnen (Foto einfügen)","Schließen"],"IT":["Apri l’IA selezionata (incolla foto)","Chiudi"],"PT":["Abrir IA selecionada (colar foto)","Fechar"],"NL":["Geselecteerde AI openen (foto plakken)","Sluiten"],"RU":["Открыть выбранный ИИ (вставить фото)","Закрыть"],"ZH":["打开所选 AI（粘贴照片）","关闭"],"ZH_TW":["開啟所選 AI（貼上照片）","關閉"],"JA":["選択したAIを開く（写真を貼り付け）","閉じる"],"KO":["선택한 AI 열기(사진 붙여넣기)","닫기"],"AR":["افتح الذكاء الاصطناعي المحدد (ألصق الصورة)","إغلاق"],"HI":["चुना हुआ AI खोलें (फ़ोटो चिपकाएँ)","बंद करें"],"TR":["Seçilen yapay zekâyı aç (fotoğrafı yapıştır)","Kapat"],"PL":["Otwórz wybraną AI (wklej zdjęcie)","Zamknij"],"SV":["Öppna vald AI (klistra in foto)","Stäng"],"DA":["Åbn valgt AI (indsæt foto)","Luk"],"NO":["Åpne valgt KI (lim inn bilde)","Lukk"],"FI":["Avaa valittu tekoäly (liitä kuva)","Sulje"],"EL":["Άνοιγμα επιλεγμένου AI (επικόλληση φωτογραφίας)","Κλείσιμο"],"HE":["פתיחת AI שנבחר (הדבקת תמונה)","סגירה"],"TH":["เปิด AI ที่เลือก (วางรูปภาพ)","ปิด"],"VI":["Mở AI đã chọn (dán ảnh)","Đóng"],"ID":["Buka AI pilihan (tempel foto)","Tutup"],"MS":["Buka AI dipilih (tampal foto)","Tutup"],"UK":["Відкрити вибраний ШІ (вставити фото)","Закрити"],"RO":["Deschide AI selectat (lipește fotografia)","Închide"],"CS":["Otevřít vybranou AI (vložit fotku)","Zavřít"],"HU":["Kiválasztott MI megnyitása (fotó beillesztése)","Bezárás"],"SK":["Otvoriť vybranú AI (vložiť fotku)","Zavrieť"],"HR":["Otvori odabrani AI (zalijepi fotografiju)","Zatvori"],"CA":["Obre la IA seleccionada (enganxa la foto)","Tanca"],"TL":["Buksan ang napiling AI (i-paste ang larawan)","Isara"],"BN":["নির্বাচিত AI খুলুন (ছবি পেস্ট করুন)","বন্ধ করুন"],"SW":["Fungua AI iliyochaguliwa (bandika picha)","Funga"],"AF":["Maak gekose KI oop (plak foto)","Sluit"],"AM":["የተመረጠውን AI ክፈት (ፎቶ ለጥፍ)","ዝጋ"],"HA":["Buɗe AI da aka zaɓa (manna hoto)","Rufe"]};
 function el(id){return d.getElementById(id);}
 function lang(){return String((w._pgI18n&&w._pgI18n.curLang&&w._pgI18n.curLang())||d.documentElement.lang||'EN').toUpperCase().replace(/-/g,'_');}
 function copy(key,fallback){var data=w.PGPhotoAILocales||{};var locale=lang();var obj=data[locale]||data[locale.split('_')[0]]||data.EN||{};return obj[key]||data.EN?.[key]||fallback;}
 function set(id,value){var target=el(id);if(target&&target.textContent!==value)target.textContent=value;}
 function relabel(){
  set('pgMacDemoTitle','📷 '+copy('feature','Photo to AI'));
  set('pgMacDemoChoose','📁 '+copy('choose','Choose photo'));
  set('pgMacDemoPrivacy',copy('photoPolicy','Photos stay on your Mac until you send them to another app.'));
  set('pgMacDemoContext',copy('context','Add context (optional)'));
  set('pgMacDemoProvider',copy('share','Share with AI'));
  set('pgMacDemoOCR',copy('scanText','Scan text')+' (OCR)');
  var cap=d.querySelector('#screenshots [data-i18n="ssH"]');
  set('pgMacDemoCaption',(cap?.textContent||copy('feature','Photo to AI'))+' · '+copy('photoPolicy','Photos remain on your Mac until shared.'));
  var actions=macActionLocales[lang()]||macActionLocales[lang().split('_')[0]]||macActionLocales.EN;
  if(dialog)dialog.dir=/^(AR|HE)$/.test(lang())?'rtl':'ltr';
  set('pgMacDemoSend',actions[0]);
  var closeBtn=el('pgMacDemoClose');if(closeBtn)closeBtn.setAttribute('aria-label',actions[1]);
  var list=el('pgMacDemoInstructions');if(list){
   var instructions=[copy('choose','Choose photo')+' · '+copy('context','Add context (optional)'),copy('manualPhoto','Paste or attach the image in the selected AI chat.'),copy('privacy','Photos leave your device only when you share them.')];
   var provider=el('pgMacDemoAI');if(provider?.value==='duckduckgo')instructions.push(copy('duckImageModel','Duck.ai: choose an image-capable model.'));
   if(provider?.value==='huggingchat')instructions.push(copy('huggingUnavailable','HuggingChat image support varies by model.'));
   list.replaceChildren();instructions.forEach(function(item){var li=d.createElement('li');li.textContent=item;list.appendChild(li);});
  }
  var previewBtn=el('pgMacPhotoPreviewTrigger');if(previewBtn){var title=copy('feature','Photo to AI');previewBtn.setAttribute('aria-label',title);}
 }
 function close(){if(!dialog)return;dialog.hidden=true;d.body.classList.remove('pg-mac-demo-open');if(selectedFile)selectedFile.focus();}
 function open(){if(!dialog)return;selectedFile=d.activeElement;dialog.hidden=false;d.body.classList.add('pg-mac-demo-open');relabel();el('pgMacDemoClose').focus();}
 function init(){
  var action=d.querySelector('#gallery-mac #macScreen-askanyai .pg-mac-photo-preview-control');
  if(!action)return;
  action.id='pgMacPhotoPreviewTrigger';action.tabIndex=0;action.setAttribute('role','button');
  action.addEventListener('click',open);
  action.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open();}});
  dialog=d.createElement('div');dialog.id='pgMacPhotoDemoOverlay';dialog.hidden=true;
  dialog.setAttribute('role','presentation');
  dialog.innerHTML='<div class="pg-mac-demo-shade"></div><section role="dialog" aria-modal="true" aria-labelledby="pgMacDemoTitle" class="pg-mac-demo-sheet">'+
   '<div class="pg-mac-demo-heading"><strong id="pgMacDemoTitle">📷 Photo to AI</strong><button id="pgMacDemoClose" type="button" aria-label="Close Mac preview">×</button></div>'+
   '<p id="pgMacDemoPrivacy"></p>'+
   '<button class="pg-mac-demo-choose" type="button" id="pgMacDemoChoose">📁 Choose photo</button><input type="file" accept="image/*" hidden id="pgMacDemoFile">'+
   '<p class="pg-mac-demo-filename" id="pgMacDemoFilename"></p><img id="pgMacDemoImage" class="pg-mac-demo-image" hidden alt="Selected photo preview">'+
   '<label id="pgMacDemoContext" for="pgMacDemoNotes">Add context (optional)</label><textarea id="pgMacDemoNotes" rows="4" maxlength="20000"></textarea>'+
   '<div class="pg-mac-demo-instructions"><ul id="pgMacDemoInstructions"></ul></div>'+
   '<label for="pgMacDemoAI" id="pgMacDemoProvider">Share with AI</label><select id="pgMacDemoAI">'+
   '<option value="chatgpt">ChatGPT</option><option value="claude">Claude</option><option value="gemini">Gemini</option><option value="grok">Grok</option><option value="perplexity">Perplexity</option><option value="mistral">Mistral</option><option value="duckduckgo">DuckDuckGo AI</option><option value="huggingchat">HuggingChat</option></select>'+
   '<div class="pg-mac-demo-action" id="pgMacDemoSend">Open selected AI (paste photo)</div><div class="pg-mac-demo-ocr" id="pgMacDemoOCR">Scan text (OCR)</div>'+
   '<p class="pg-mac-demo-caption" id="pgMacDemoCaption">App Preview</p></section>';
  d.body.appendChild(dialog);
  dialog.querySelector('.pg-mac-demo-shade').addEventListener('click',close);
  el('pgMacDemoClose').addEventListener('click',close);
  el('pgMacDemoAI').addEventListener('change',relabel);
  el('pgMacDemoChoose').addEventListener('click',function(){el('pgMacDemoFile').click();});
  el('pgMacDemoFile').addEventListener('change',function(){
   var f=this.files&&this.files[0];if(!f||!f.type.startsWith('image/'))return;
   if(objectUrl)URL.revokeObjectURL(objectUrl);
   objectUrl=URL.createObjectURL(f);
   el('pgMacDemoFilename').textContent=f.name;
   var img=el('pgMacDemoImage');img.src=objectUrl;img.hidden=false;
  });
  d.addEventListener('keydown',function(event){if(event.key==='Escape'&&!dialog.hidden)close();});
  w.addEventListener('pg:languagechange',relabel);
  w.addEventListener('pageshow',relabel);
  relabel();
 }
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})(window,document);
