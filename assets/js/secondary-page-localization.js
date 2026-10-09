/* Translate secondary-page copy with the same 38-language dictionary as the homepage.
   Preserve original paragraphs without a matching translation, especially legal text. */
(function(){
"use strict";
var i=window._pgI18n;if(!i||!i.dictionary||!i.dictionary.EN)return;
var original=new WeakMap(),entries=[],lookup=new Map(),attrs=[];
var originalDocumentTitle=document.title;
var exactVI={"Production MCP endpoint":"Điểm cuối MCP chính thức","Copy":"Sao chép","Copied!":"Đã sao chép!","Remote Streamable HTTP endpoint exposing Poly-Glot's 15 MCP tools.":"Điểm cuối Streamable HTTP từ xa cung cấp 15 công cụ MCP của Poly-Glot.","Official MCP Registry":"Sổ đăng ký MCP chính thức","Live":"Đang hoạt động","Open Official MCP Registry →":"Mở sổ đăng ký MCP chính thức →","Canonical registry discovery entry for":"Mục đăng ký chính thức dành cho","Verified + Featured":"Đã xác minh · Nổi bật","Public remote-MCP listing with the production endpoint and live tool inspection.":"Danh mục MCP từ xa công khai với điểm cuối chính thức và khả năng kiểm tra công cụ trực tiếp.","Open MCP.so →":"Mở MCP.so →","Listed":"Đã đăng ký","Connector listing with health checks, tool schemas, and MCP inspection.":"Danh sách kết nối có kiểm tra tình trạng, lược đồ công cụ và khả năng kiểm tra MCP.","Open Glama →":"Mở Glama →","Running":"Đang chạy","Public Poly-Glot AI Workspace MCP Space for ecosystem discovery and demonstration.":"Không gian MCP công khai của Poly-Glot AI Workspace để khám phá và trải nghiệm.","Open Hugging Face Space →":"Mở Hugging Face Space →","MCP client compatibility":"Khả năng tương thích với ứng dụng khách MCP","Supported":"Được hỗ trợ","Live Now":"Đang hoạt động","Available":"Có sẵn","Open Cursor → Customize → MCPs":"Mở Cursor → Tùy chỉnh → MCPs","Add Poly-Glot as a remote server":"Thêm Poly-Glot làm máy chủ từ xa","Enable Poly-Glot":"Bật Poly-Glot","Open the client's MCP / Tools / Integrations settings":"Mở cài đặt MCP / Công cụ / Tích hợp của ứng dụng","Select remote HTTP / Streamable HTTP":"Chọn HTTP từ xa / Streamable HTTP","Paste the production endpoint":"Dán điểm cuối chính thức","Directories are not clients:":"Danh mục không phải là ứng dụng khách:","Desktop App (Recommended)":"Ứng dụng máy tính (được đề xuất)","Open Claude Desktop Settings":"Mở cài đặt Claude Desktop","Add a new MCP connector":"Thêm kết nối MCP mới","Name it \"Poly-Glot\"":"Đặt tên là “Poly-Glot”","Start using it!":"Bắt đầu sử dụng!","Claude.ai (Web)":"Claude.ai (Web)","Add connector with the same URL":"Thêm kết nối với cùng URL","Approve tool access when prompted":"Cho phép truy cập công cụ khi được yêu cầu","What to expect":"Điều bạn có thể mong đợi","Start prompting with 1,000+ templates":"Bắt đầu với hơn 1.000 mẫu câu lệnh","Manual setup":"Thiết lập thủ công","One-click install":"Cài đặt bằng một lần nhấp","Open Cursor MCP settings":"Mở cài đặt MCP của Cursor","Add the Poly-Glot remote server":"Thêm máy chủ Poly-Glot từ xa","🌐 Active Poly-Glot MCP Ecosystem":"🌐 Hệ sinh thái MCP Poly-Glot đang hoạt động","🔌 What is MCP?":"🔌 MCP là gì?","🧩 Connect from other supported MCP clients":"🧩 Kết nối từ các ứng dụng MCP tương thích khác","Works with Claude.ai (Free, Pro, Team, and Enterprise plans).":"Hoạt động với Claude.ai (gói Free, Pro, Team và Enterprise).","After the client completes the MCP handshake, it should discover the same 15 server-side Poly-Glot tools.":"Sau khi ứng dụng hoàn tất bắt tay MCP, ứng dụng sẽ nhận diện 15 công cụ Poly-Glot trên máy chủ.","Save the configuration, enable the server, and approve tool access when Cursor asks. Poly-Glot's 15 tools will then be available to Agent.":"Lưu cấu hình, bật máy chủ và chấp thuận quyền truy cập khi Cursor yêu cầu. Sau đó Agent sẽ sử dụng được 15 công cụ Poly-Glot.","Name it Poly-Glot, connect, and approve tools":"Đặt tên Poly-Glot, kết nối và cho phép công cụ","Explore related topics":"Khám phá các chủ đề liên quan","Frequently asked questions":"Câu hỏi thường gặp","Terms":"Điều khoản","Home":"Trang chủ","Support":"Hỗ trợ","App Store":"App Store","Privacy":"Quyền riêng tư","Privacy Policy":"Chính sách quyền riêng tư","Terms of Use":"Điều khoản sử dụng"}; var exactOriginal=new WeakMap(),exactNodes=[];
function norm(x){return String(x||"").replace(/\s+/g," ").trim();}
Object.keys(i.dictionary.EN).forEach(function(k){var v=i.dictionary.EN[k];if(typeof v==="string"&&v.length>2&&v.length<400&&!/[<>]/.test(v)&&!lookup.has(norm(v)))lookup.set(norm(v),k);});
var explicit={"Support":"ftSupp","Privacy Policy":"ftPriv","Terms of Use":"ftTerms","Features":"ftFeat","Pricing":"ftPrice","Templates":"ftTpl","FAQ":"ftFAQ","MCP Setup":"ftConnect","Explore related topics":"ftProd","Frequently asked questions":"fqH","Poly-Glot knowledge center":"fqH","App Store":"navCTA"};
function scan(){
if(!document.body)return;
var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),node;
while(node=walker.nextNode()){
 if(original.has(node)||!node.parentElement||node.parentElement.closest("script,style,noscript,pre,code,textarea,svg,#pgGlobalLangDD,#pgGlobalLangPicker,[data-i18n],[data-i18n-html]"))continue;
 var value=norm(node.nodeValue),key=explicit[value]||lookup.get(value);
 if(!key)continue;
 original.set(node,{text:node.nodeValue,key:key});entries.push(node);
}
document.querySelectorAll("[aria-label],[title],[placeholder]").forEach(function(el){["aria-label","title","placeholder"].forEach(function(a){var value=el.getAttribute(a),key=explicit[norm(value)]||lookup.get(norm(value));if(!key||el.hasAttribute("data-pg-original-"+a))return;el.setAttribute("data-pg-original-"+a,value);attrs.push({el:el,a:a,key:key,value:value});});});
}
/* Capture all visible translatable copy, including cards, buttons, FAQ and footer.
 * Never replace executable examples, technical identifiers, or user data. */
var allOrigins=new WeakMap(),allNodes=[],allAttrs=[],attrOrigins=new WeakMap();
function eligible(n){var p=n.parentElement;if(!p||p.closest("script,style,noscript,pre,code,textarea,svg,#pgGlobalLangDD,#pgGlobalLangPicker,[data-i18n],[data-i18n-html],[contenteditable],[data-no-translate]"))return false;return !p.closest(".code-block,.hljs,.language-json")||!!p.closest("button");}
function registerAll(){
 if(!document.body)return;
 var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
 while(n=walker.nextNode()){
  if(!eligible(n)||allOrigins.has(n))continue;
  var raw=n.nodeValue,term=norm(raw);
  if(!term||!/[A-Za-z]/.test(term)||/^https?:/i.test(term))continue;
  if(window._pgEnglishSourceSet&&!window._pgEnglishSourceSet.has(term))continue;
  allOrigins.set(n,{raw:raw,term:term});
  allNodes.push(n);
 }
 document.querySelectorAll("[aria-label],[title],[placeholder],[alt]").forEach(function(el){
  if(el.closest("#pgGlobalLangDD,#pgGlobalLangPicker,[data-no-translate]"))return;
  ["aria-label","title","placeholder","alt"].forEach(function(a){
   var value=el.getAttribute(a),term=norm(value);if(!term)return;
   var key=a+"|"+term;
   var record=attrOrigins.get(el)||{};
   if(record[a])return;record[a]={value:value,term:term};attrOrigins.set(el,record);allAttrs.push({el:el,a:a,value:value,term:term});
  });
 });
}
var pgFeedbackLocales={"ES":["Copiar","Copiado"],"FR":["Copier","Copié"],"DE":["Kopieren","Kopiert"],"IT":["Copia","Copiato"],"PT":["Copiar","Copiado"],"NL":["Kopiëren","Gekopieerd"],"RU":["Копировать","Скопировано"],"ZH":["复制","已复制"],"ZH_TW":["複製","已複製"],"JA":["コピー","コピーしました"],"KO":["복사","복사됨"],"AR":["نسخ","تم النسخ"],"HI":["कॉपी करें","कॉपी किया गया"],"BN":["কপি করুন","কপি হয়েছে"],"TR":["Kopyala","Kopyalandı"],"PL":["Kopiuj","Skopiowano"],"SV":["Kopiera","Kopierat"],"NO":["Kopier","Kopiert"],"DA":["Kopiér","Kopieret"],"FI":["Kopioi","Kopioitu"],"EL":["Αντιγραφή","Αντιγράφηκε"],"HE":["העתק","הועתק"],"ID":["Salin","Tersalin"],"MS":["Salin","Disalin"],"TH":["คัดลอก","คัดลอกแล้ว"],"VI":["Sao chép","Đã sao chép"],"UK":["Копіювати","Скопійовано"],"CS":["Kopírovat","Zkopírováno"],"RO":["Copiază","Copiat"],"HU":["Másolás","Másolva"],"SK":["Kopírovať","Skopírované"],"HR":["Kopiraj","Kopirano"],"CA":["Copia","Copiat"],"AF":["Kopieer","Gekopieer"],"SW":["Nakili","Imenakiliwa"],"HA":["Kwafi","An kwafa"],"AM":["ቅዳ","ተቀድቷል"]};
var pgSharedShortUI={"ES":["Enviar","Pegar","y","o"],"FR":["Envoyer","Coller","et","ou"],"DE":["Senden","Einfügen","und","oder"],"IT":["Invia","Incolla","e","o"],"PT":["Enviar","Colar","e","ou"],"NL":["Verzenden","Plakken","en","of"],"RU":["Отправить","Вставить","и","или"],"ZH":["发送","粘贴","和","或"],"ZH_TW":["傳送","貼上","和","或"],"JA":["送信","貼り付け","と","または"],"KO":["보내기","붙여넣기","및","또는"],"AR":["إرسال","لصق","و","أو"],"HI":["भेजें","चिपकाएँ","और","या"],"BN":["পাঠান","পেস্ট করুন","এবং","অথবা"],"TR":["Gönder","Yapıştır","ve","veya"],"PL":["Wyślij","Wklej","i","lub"],"SV":["Skicka","Klistra in","och","eller"],"NO":["Send","Lim inn","og","eller"],"DA":["Send","Indsæt","og","eller"],"FI":["Lähetä","Liitä","ja","tai"],"EL":["Αποστολή","Επικόλληση","και","ή"],"HE":["שליחה","הדבקה","ו","או"],"ID":["Kirim","Tempel","dan","atau"],"MS":["Hantar","Tampal","dan","atau"],"TH":["ส่ง","วาง","และ","หรือ"],"VI":["Gửi","Dán","và","hoặc"],"UK":["Надіслати","Вставити","і","або"],"CS":["Odeslat","Vložit","a","nebo"],"RO":["Trimite","Lipește","și","sau"],"HU":["Küldés","Beillesztés","és","vagy"],"SK":["Odoslať","Prilepiť","a","alebo"],"HR":["Pošalji","Zalijepi","i","ili"],"CA":["Envia","Enganxa","i","o"],"AF":["Stuur","Plak","en","of"],"SW":["Tuma","Bandika","na","au"],"HA":["Aika","Manna","da","ko"],"AM":["ላክ","ለጥፍ","እና","ወይም"]};
/* Some legacy page scripts replace DOM nodes with already-localized copy.
 * Recognize catalog output so it is not reclassified as untranslated English. */
var pgLocalizedSets={};
function alreadyLocalized(term,lang){
 if(lang==="EN")return false;
 var catalog=window._pgSecondaryExact&&window._pgSecondaryExact[lang];
 if(!catalog)return false;
 var cached=pgLocalizedSets[lang];
 if(!cached||cached.catalog!==catalog){
  var words=new Set(Object.values(catalog).filter(function(v){return typeof v==="string";}));
  var dict=i.dictionary[lang]||{};
  Object.keys(dict).forEach(function(k){if(typeof dict[k]==="string")words.add(dict[k]);});
  cached=pgLocalizedSets[lang]={catalog:catalog,values:words};
 }
 return cached.values.has(term);
}
var pgCriticalTerms={"ES":["Inicio","Activo","Después de la prueba gratuita","¿Qué ocurre cuando termina la prueba gratuita?"],"FR":["Accueil","En ligne","Après l’essai gratuit","Que se passe-t-il à la fin de l’essai gratuit ?"],"DE":["Startseite","Aktiv","Nach der kostenlosen Testphase","Was passiert, wenn die kostenlose Testphase endet?"],"IT":["Pagina iniziale","Attivo","Dopo la prova gratuita","Cosa succede al termine della prova gratuita?"],"PT":["Início","Ativo","Após o período de teste gratuito","O que acontece quando o período de teste gratuito termina?"],"NL":["Startpagina","Actief","Na de gratis proefperiode","Wat gebeurt er wanneer de gratis proefperiode afloopt?"],"RU":["Главная","Работает","После бесплатного пробного периода","Что произойдёт после окончания бесплатного пробного периода?"],"ZH":["首页","运行中","免费试用结束后","免费试用结束后会怎样？"],"ZH_TW":["首頁","運作中","免費試用結束後","免費試用結束後會怎樣？"],"JA":["ホーム","稼働中","無料トライアル終了後","無料トライアルが終了するとどうなりますか？"],"KO":["홈","활성","무료 체험 종료 후","무료 체험이 끝나면 어떻게 되나요?"],"AR":["الرئيسية","نشط","بعد انتهاء الفترة التجريبية المجانية","ماذا يحدث عند انتهاء الفترة التجريبية المجانية؟"],"HI":["होम","सक्रिय","निःशुल्क परीक्षण अवधि के बाद","निःशुल्क परीक्षण अवधि समाप्त होने पर क्या होता है?"],"BN":["হোম","সক্রিয়","বিনামূল্যের ট্রায়াল শেষ হওয়ার পরে","বিনামূল্যের ট্রায়াল শেষ হলে কী হয়?"],"TR":["Ana sayfa","Etkin","Ücretsiz denemeden sonra","Ücretsiz deneme bittiğinde ne olur?"],"PL":["Strona główna","Aktywny","Po bezpłatnym okresie próbnym","Co się dzieje po zakończeniu bezpłatnego okresu próbnego?"],"SV":["Startsida","Aktiv","Efter den kostnadsfria provperioden","Vad händer när den kostnadsfria provperioden tar slut?"],"NO":["Hjem","Aktiv","Etter gratis prøveperiode","Hva skjer når den gratis prøveperioden er over?"],"DA":["Forside","Aktiv","Efter den gratis prøveperiode","Hvad sker der, når den gratis prøveperiode slutter?"],"FI":["Etusivu","Aktiivinen","Ilmaisen kokeilujakson jälkeen","Mitä tapahtuu ilmaisen kokeilujakson päätyttyä?"],"EL":["Αρχική","Ενεργό","Μετά τη δωρεάν δοκιμή","Τι συμβαίνει όταν λήξει η δωρεάν δοκιμή;"],"HE":["דף הבית","פעיל","לאחר תקופת הניסיון החינמית","מה קורה כשתקופת הניסיון החינמית מסתיימת?"],"ID":["Beranda","Aktif","Setelah uji coba gratis","Apa yang terjadi setelah masa uji coba gratis berakhir?"],"MS":["Laman utama","Aktif","Selepas percubaan percuma","Apa yang berlaku apabila percubaan percuma tamat?"],"TH":["หน้าแรก","ใช้งานอยู่","หลังสิ้นสุดช่วงทดลองใช้ฟรี","จะเกิดอะไรขึ้นเมื่อช่วงทดลองใช้ฟรีสิ้นสุดลง?"],"VI":["Trang chủ","Đang hoạt động","Sau thời gian dùng thử miễn phí","Điều gì xảy ra khi thời gian dùng thử miễn phí kết thúc?"],"UK":["Головна","Активний","Після безкоштовного пробного періоду","Що станеться після завершення безкоштовного пробного періоду?"],"CS":["Domů","Aktivní","Po bezplatném zkušebním období","Co se stane po skončení bezplatného zkušebního období?"],"RO":["Acasă","Activ","După perioada de încercare gratuită","Ce se întâmplă când se încheie perioada de încercare gratuită?"],"HU":["Főoldal","Aktív","Az ingyenes próbaidőszak után","Mi történik az ingyenes próbaidőszak végén?"],"SK":["Domov","Aktívne","Po bezplatnom skúšobnom období","Čo sa stane po skončení bezplatného skúšobného obdobia?"],"HR":["Početna","Aktivno","Nakon besplatnog probnog razdoblja","Što se događa nakon završetka besplatnog probnog razdoblja?"],"CA":["Inici","Actiu","Després de la prova gratuïta","Què passa quan s'acaba la prova gratuïta?"],"AF":["Tuisblad","Aktief","Na die gratis proeftydperk","Wat gebeur wanneer die gratis proeftydperk eindig?"],"SW":["Nyumbani","Inatumika","Baada ya kipindi cha majaribio ya bila malipo","Nini hutokea kipindi cha majaribio ya bila malipo kinapoisha?"],"HA":["Gida","Yana aiki","Bayan lokacin gwaji na kyauta","Me ke faruwa idan lokacin gwaji na kyauta ya ƙare?"],"AM":["መነሻ","እየሰራ ነው","ከነፃ የሙከራ ጊዜ በኋላ","ነፃው የሙከራ ጊዜ ሲያበቃ ምን ይከሰታል?"]};
var pgCriticalKeys={"Home":0,"Live":1,"After the Trial":2,"What happens when the trial ends?":3};
function translate(term,lang){
 /* MCP configuration literals must remain byte-for-byte copyable. */
 if(/^\s*"[^"]+"\s*:\s*\{/.test(term)||/^\s*\{\s*"[^"]+"\s*:/.test(term))return term;

 if(pgCriticalTerms[lang]&&Object.prototype.hasOwnProperty.call(pgCriticalKeys,term))return pgCriticalTerms[lang][pgCriticalKeys[term]];
 if(alreadyLocalized(term,lang))return term;
 if(pgSharedShortUI[lang]){var labels={"Send":0,"Paste":1,"and":2,"or":3,", and":2,", or":3};if(Object.prototype.hasOwnProperty.call(labels,term)){var result=pgSharedShortUI[lang][labels[term]];return term.charAt(0)===","?", "+result:result;}}

 if(pgFeedbackLocales[lang]&&(term==="Copy"||term==="Copied!"||term==="✓ Copied!")){
  var word=pgFeedbackLocales[lang][term==="Copy"?0:1];return term.charAt(0)==="✓"?"✓ "+word+(lang==="EN"?"!":""):word+(term==="Copied!"?"!":"");
 }
 if(lang==="EN")return term;
 var extra=(window._pgSecondaryExact&&window._pgSecondaryExact[lang]);
 if(lang==="VI"&&(!extra||!Object.prototype.hasOwnProperty.call(extra,term)))extra=exactVI;
 /* Legal headings and shared navigation labels have curated homepage translations. */
 var known=explicit[term];
 if(known){var curated=i.dictionary[lang]&&i.dictionary[lang][known];if(typeof curated==="string"&&curated&&!/[<>]/.test(curated))return curated;}
 var key=lookup.get(term);
 if(key){var value=i.dictionary[lang]&&i.dictionary[lang][key];if(typeof value==="string"&&value&&!/[<>]/.test(value))return value;}
 if(extra&&Object.prototype.hasOwnProperty.call(extra,term))return extra[term];
 return null; // Preserve intentional brand names if untranslated.
}
function apply(){
 registerAll();
 var lang=i.curLang(),rtl=lang==="AR"||lang==="HE";
 document.documentElement.setAttribute("dir",rtl?"rtl":"ltr");
 if(document.body)document.body.setAttribute("dir",rtl?"rtl":"ltr");
 allNodes=allNodes.filter(function(n){
  var o=allOrigins.get(n),source=window._pgEnglishSourceSet;
  if(!n.isConnected||(source&&o&&!source.has(o.term))){allOrigins.delete(n);return false;}
  return true;
 });
 allNodes.forEach(function(n){var o=allOrigins.get(n);if(!o)return;
  var value=translate(o.term,lang),target;
  if(lang==="EN"||!value)target=o.raw;
  else{var m=o.raw.match(/^(\s*)([\s\S]*?)(\s*)$/);target=(m?m[1]:"")+value+(m?m[3]:"");}
  if(n.nodeValue!==target)n.nodeValue=target;
 });
 allAttrs=allAttrs.filter(function(x){return x.el.isConnected&&(!window._pgEnglishSourceSet||window._pgEnglishSourceSet.has(x.term));});
 allAttrs.forEach(function(x){var value=translate(x.term,lang);var target=value||x.value;if(x.el.getAttribute(x.a)!==target)x.el.setAttribute(x.a,target);});
 document.querySelectorAll("main,article,footer,.card,.guide-card,.about-card").forEach(function(el){el.setAttribute("dir",rtl?"rtl":"ltr");});
 var pageTitle=translate(originalDocumentTitle,lang);
 if(originalDocumentTitle&&document.title!==(pageTitle||originalDocumentTitle))document.title=pageTitle||originalDocumentTitle;
 document.documentElement.setAttribute("data-pg-secondary-locale",lang);
 /* Report actual translation coverage; a visible selector is not proof of completion. */
 var missing=[],seen=new Set();
 allNodes.forEach(function(n){var o=allOrigins.get(n);if(!o||!o.term||seen.has(o.term))return;seen.add(o.term);if(lang!=="EN"&&!translate(o.term,lang))missing.push(o.term);});
 window._pgSecondaryLocaleAudit={language:lang,page:location.pathname,total:seen.size,missing:missing,complete:missing.length===0};
 document.dispatchEvent(new CustomEvent("pg:localization-audited",{detail:window._pgSecondaryLocaleAudit}));

}
/* Use the homepage language engine as the only source of locale state. */
window.addEventListener("pg:languagechange",function(){apply();});
window.addEventListener("pageshow",function(){apply();});
/* Localize content added later by page scripts, while avoiding observer loops. */
var mutationPending=false;
if(typeof MutationObserver!=="undefined"&&document.documentElement){
 var observer=new MutationObserver(function(changes){
  if(!changes.some(function(change){return change.addedNodes&&change.addedNodes.length>0;}))return;
  if(mutationPending)return;
  mutationPending=true;
  setTimeout(function(){mutationPending=false;apply();},0);
 });
 observer.observe(document.documentElement,{childList:true,subtree:true});
}
window.addEventListener("DOMContentLoaded",function(){apply();});

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
window._pgSecondaryLocalization={apply:apply,translatedNodes:function(){return allNodes.length;},coverage:function(){var lang=i.curLang(),translated=0;allNodes.forEach(function(n){var o=allOrigins.get(n);if(o&&translate(o.term,lang))translated++;});return {lang:lang,total:allNodes.length,translated:translated,missing:allNodes.length-translated};}};
})();