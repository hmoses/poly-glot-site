/**
 * Poly-Glot site device UI localization.
 * Canonical shared flags/codes come from poly-glot-ai-workspace/localization.js.
 * Core UI strings come from data/widget-locales-bundle.js.
 */
(function(){
"use strict";
// Canonical app flags/codes mirrored from:
// https://github.com/hmoses/poly-glot-ai-workspace/blob/main/localization.js
var APP_LANGS=[{"code":"EN","name":"English","flag":"🇺🇸"},{"code":"ES","name":"Spanish","flag":"🇪🇸"},{"code":"FR","name":"French","flag":"🇫🇷"},{"code":"DE","name":"German","flag":"🇩🇪"},{"code":"IT","name":"Italian","flag":"🇮🇹"},{"code":"PT","name":"Portuguese","flag":"🇧🇷"},{"code":"NL","name":"Dutch","flag":"🇳🇱"},{"code":"RU","name":"Russian","flag":"🇷🇺"},{"code":"ZH","name":"Chinese (Simplified)","flag":"🇨🇳"},{"code":"ZH_TW","name":"Chinese (Traditional)","flag":"🇹🇼"},{"code":"JA","name":"Japanese","flag":"🇯🇵"},{"code":"KO","name":"Korean","flag":"🇰🇷"},{"code":"AR","name":"Arabic","flag":"🇸🇦"},{"code":"HI","name":"Hindi","flag":"🇮🇳"},{"code":"BN","name":"Bengali","flag":"🇧🇩"},{"code":"TR","name":"Turkish","flag":"🇹🇷"},{"code":"PL","name":"Polish","flag":"🇵🇱"},{"code":"SV","name":"Swedish","flag":"🇸🇪"},{"code":"NO","name":"Norwegian","flag":"🇳🇴"},{"code":"DA","name":"Danish","flag":"🇩🇰"},{"code":"FI","name":"Finnish","flag":"🇫🇮"},{"code":"EL","name":"Greek","flag":"🇬🇷"},{"code":"HE","name":"Hebrew","flag":"🇮🇱"},{"code":"ID","name":"Indonesian","flag":"🇮🇩"},{"code":"MS","name":"Malay","flag":"🇲🇾"},{"code":"TH","name":"Thai","flag":"🇹🇭"},{"code":"VI","name":"Vietnamese","flag":"🇻🇳"},{"code":"UK","name":"Ukrainian","flag":"🇺🇦"},{"code":"CS","name":"Czech","flag":"🇨🇿"},{"code":"RO","name":"Romanian","flag":"🇷🇴"},{"code":"HU","name":"Hungarian","flag":"🇭🇺"},{"code":"SK","name":"Slovak","flag":"🇸🇰"},{"code":"HR","name":"Croatian","flag":"🇭🇷"},{"code":"CA","name":"Catalan","flag":"🇪🇸"},{"code":"AF","name":"Afrikaans","flag":"🇿🇦"},
{"code":"SW","name":"Swahili","flag":"🇰🇪","siteOnly":true},
{"code":"HA","name":"Hausa","flag":"🇳🇬","siteOnly":true},
{"code":"AM","name":"Amharic","flag":"🇪🇹","siteOnly":true},
{"code":"FIL","name":"Filipino","flag":"🇵🇭","siteOnly":true}];
var CORE={"EN":{"ask":"Ask Any AI","templates":"Templates","compare":"Compare Mode","compareSend":"Send to Selected","send":"Send","copy":"Copy","outputLabel":"AI will respond in:","search":"Search templates…","empty":"Type or speak your prompt first."},"ES":{"ask":"Pregunta a cualquier IA","templates":"Plantillas","compare":"Modo Comparar","compareSend":"Enviar a seleccionados","send":"Enviar","copy":"Copiar","outputLabel":"La IA responderá en:","search":"Buscar plantillas…","empty":"Escribe o habla tu prompt primero."},"FR":{"ask":"Demandez à n'importe quelle IA","templates":"Modèles","compare":"Mode Comparaison","compareSend":"Envoyer aux sélectionnés","send":"Envoyer","copy":"Copier","outputLabel":"L'IA répondra en:","search":"Rechercher des modèles…","empty":"Tapez ou parlez votre prompt d'abord."},"DE":{"ask":"Frag jede KI","templates":"Vorlagen","compare":"Vergleichsmodus","compareSend":"An Ausgewählte senden","send":"Senden","copy":"Kopieren","outputLabel":"KI antwortet auf:","search":"Vorlagen suchen…","empty":"Tippe oder sprich deinen Prompt zuerst."},"IT":{"ask":"Chiedi a qualsiasi IA","templates":"Modelli","compare":"Modalità Confronto","compareSend":"Invia ai selezionati","send":"Invia","copy":"Copia","outputLabel":"L'IA risponderà in:","search":"Cerca modelli…","empty":"Scrivi o parla il tuo prompt prima."},"PT":{"ask":"Pergunte a qualquer IA","templates":"Modelos","compare":"Modo Comparação","compareSend":"Enviar para selecionados","send":"Enviar","copy":"Copiar","outputLabel":"A IA responderá em:","search":"Pesquisar modelos…","empty":"Digite ou fale seu prompt primeiro."},"NL":{"ask":"Vraag het aan elke AI","templates":"Sjablonen","compare":"Vergelijkingsmodus","compareSend":"Naar geselecteerde sturen","send":"Versturen","copy":"Kopiëren","outputLabel":"AI antwoordt in:","search":"Sjablonen zoeken…","empty":"Typ of spreek je prompt eerst."},"RU":{"ask":"Спросите любой ИИ","templates":"Шаблоны","compare":"Режим сравнения","compareSend":"Отправить выбранным","send":"Отправить","copy":"Копировать","outputLabel":"ИИ ответит на:","search":"Поиск шаблонов…","empty":"Сначала напишите или произнесите запрос."},"ZH":{"ask":"问任何AI","templates":"模板","compare":"对比模式","compareSend":"发送到已选","send":"发送","copy":"复制","outputLabel":"AI将用以下语言回复：","search":"搜索模板…","empty":"请先输入或说出你的提示词。"},"ZH_TW":{"ask":"問任何AI","templates":"範本","compare":"對比模式","compareSend":"傳送到已選","send":"傳送","copy":"複製","outputLabel":"AI將用以下語言回覆：","search":"搜尋範本…","empty":"請先輸入或說出你的提示詞。"},"JA":{"ask":"どのAIにも聞ける","templates":"テンプレート","compare":"比較モード","compareSend":"選択したAIに送信","send":"送信","copy":"コピー","outputLabel":"AIの回答言語：","search":"テンプレートを検索…","empty":"先にプロンプトを入力または話してください。"},"KO":{"ask":"아무 AI에게 물어봐","templates":"템플릿","compare":"비교 모드","compareSend":"선택한 AI로 전송","send":"보내기","copy":"복사","outputLabel":"AI 응답 언어:","search":"템플릿 검색…","empty":"먼저 프롬프트를 입력하거나 말하세요."},"AR":{"ask":"اسأل أي ذكاء اصطناعي","templates":"القوالب","compare":"وضع المقارنة","compareSend":"إرسال إلى المحدد","send":"إرسال","copy":"نسخ","outputLabel":"سيرد الذكاء الاصطناعي بـ:","search":"ابحث في القوالب…","empty":"اكتب أو تحدث طلبك أولاً."},"HI":{"ask":"किसी भी AI से पूछें","templates":"टेम्पलेट्स","compare":"तुलना मोड","compareSend":"चयनित को भेजें","send":"भेजें","copy":"कॉपी","outputLabel":"AI इस भाषा में जवाब देगा:","search":"टेम्पलेट खोजें…","empty":"पहले अपना प्रॉम्प्ट टाइप करें या बोलें।"},"BN":{"ask":"যেকোনো AI কে জিজ্ঞাসা করুন","templates":"টেমপ্লেট","compare":"তুলনা মোড","compareSend":"নির্বাচিতদের পাঠান","send":"পাঠান","copy":"কপি","outputLabel":"AI will respond in:","search":"টেমপ্লেট খুঁজুন…","empty":"Type or speak your prompt first."},"TR":{"ask":"Herhangi bir Yapay Zekaya Sor","templates":"Şablonlar","compare":"Karşılaştırma Modu","compareSend":"Seçilenlere Gönder","send":"Gönder","copy":"Kopyala","outputLabel":"AI will respond in:","search":"Şablon ara…","empty":"Type or speak your prompt first."},"PL":{"ask":"Zapytaj dowolne AI","templates":"Szablony","compare":"Tryb porównania","compareSend":"Wyślij do wybranych","send":"Wyślij","copy":"Kopiuj","outputLabel":"AI will respond in:","search":"Szukaj szablonów…","empty":"Type or speak your prompt first."},"SV":{"ask":"Fråga vilken AI som helst","templates":"Mallar","compare":"Jämförelseläge","compareSend":"Skicka till valda","send":"Skicka","copy":"Kopiera","outputLabel":"AI will respond in:","search":"Sök mallar…","empty":"Type or speak your prompt first."},"NO":{"ask":"Spør hvilken som helst AI","templates":"Maler","compare":"Sammenligningsmodus","compareSend":"Send til valgte","send":"Send","copy":"Kopier","outputLabel":"AI will respond in:","search":"Søk i maler…","empty":"Type or speak your prompt first."},"DA":{"ask":"Spørg enhver AI","templates":"Skabeloner","compare":"Sammenligningstilstand","compareSend":"Send til valgte","send":"Send","copy":"Kopiér","outputLabel":"AI will respond in:","search":"Søg i skabeloner…","empty":"Type or speak your prompt first."},"FI":{"ask":"Kysy miltä tahansa tekoälyltä","templates":"Mallit","compare":"Vertailutila","compareSend":"Lähetä valituille","send":"Lähetä","copy":"Kopioi","outputLabel":"AI will respond in:","search":"Hae malleja…","empty":"Type or speak your prompt first."},"EL":{"ask":"Ρωτήστε οποιοδήποτε AI","templates":"Πρότυπα","compare":"Λειτουργία σύγκρισης","compareSend":"Αποστολή στα επιλεγμένα","send":"Αποστολή","copy":"Αντιγραφή","outputLabel":"AI will respond in:","search":"Αναζήτηση προτύπων…","empty":"Type or speak your prompt first."},"HE":{"ask":"שאל כל AI","templates":"תבניות","compare":"מצב השוואה","compareSend":"שלח לנבחרים","send":"שלח","copy":"העתק","outputLabel":"AI will respond in:","search":"חיפוש תבניות…","empty":"Type or speak your prompt first."},"ID":{"ask":"Tanya AI Mana Saja","templates":"Template","compare":"Mode Perbandingan","compareSend":"Kirim ke yang dipilih","send":"Kirim","copy":"Salin","outputLabel":"AI will respond in:","search":"Cari template…","empty":"Type or speak your prompt first."},"MS":{"ask":"Tanya Mana-mana AI","templates":"Templat","compare":"Mod Perbandingan","compareSend":"Hantar ke yang dipilih","send":"Hantar","copy":"Salin","outputLabel":"AI will respond in:","search":"Cari templat…","empty":"Type or speak your prompt first."},"TH":{"ask":"ถามAIตัวไหนก็ได้","templates":"เทมเพลต","compare":"โหมดเปรียบเทียบ","compareSend":"ส่งไปยังที่เลือก","send":"ส่ง","copy":"คัดลอก","outputLabel":"AI will respond in:","search":"ค้นหาเทมเพลต…","empty":"Type or speak your prompt first."},"VI":{"ask":"Hỏi bất kỳ AI nào","templates":"Mẫu","compare":"Chế độ So sánh","compareSend":"Gửi đến đã chọn","send":"Gửi","copy":"Sao chép","outputLabel":"AI will respond in:","search":"Tìm mẫu…","empty":"Type or speak your prompt first."},"UK":{"ask":"Запитайте будь-який ШІ","templates":"Шаблони","compare":"Режим порівняння","compareSend":"Надіслати обраним","send":"Надіслати","copy":"Копіювати","outputLabel":"AI will respond in:","search":"Пошук шаблонів…","empty":"Type or speak your prompt first."},"CS":{"ask":"Zeptejte se jakéhokoli AI","templates":"Šablony","compare":"Režim porovnání","compareSend":"Odeslat vybraným","send":"Odeslat","copy":"Kopírovat","outputLabel":"AI will respond in:","search":"Hledat šablony…","empty":"Type or speak your prompt first."},"RO":{"ask":"Întreabă orice AI","templates":"Șabloane","compare":"Mod Comparare","compareSend":"Trimite la selectate","send":"Trimite","copy":"Copiază","outputLabel":"AI will respond in:","search":"Caută șabloane…","empty":"Type or speak your prompt first."},"HU":{"ask":"Kérdezz bármely AI-t","templates":"Sablonok","compare":"Összehasonlító mód","compareSend":"Küldés a kiválasztottaknak","send":"Küldés","copy":"Másolás","outputLabel":"AI will respond in:","search":"Sablonok keresése…","empty":"Type or speak your prompt first."},"SK":{"ask":"Opýtajte sa akéhokoľvek AI","templates":"Šablóny","compare":"Režim porovnania","compareSend":"Odoslať vybraným","send":"Odoslať","copy":"Kopírovať","outputLabel":"AI will respond in:","search":"Hľadať šablóny…","empty":"Type or speak your prompt first."},"HR":{"ask":"Pitajte bilo koji AI","templates":"Predlošci","compare":"Način usporedbe","compareSend":"Pošalji odabranima","send":"Pošalji","copy":"Kopiraj","outputLabel":"AI will respond in:","search":"Pretraži predloške…","empty":"Type or speak your prompt first."},"CA":{"ask":"Pregunta a qualsevol IA","templates":"Plantilles","compare":"Mode Comparació","compareSend":"Envia als seleccionats","send":"Envia","copy":"Copia","outputLabel":"AI will respond in:","search":"Cerca plantilles…","empty":"Type or speak your prompt first."},"AF":{"ask":"Vra enige KI","templates":"Sjablone","compare":"Vergelykingsmodus","compareSend":"Stuur na geselekteerdes","send":"Stuur","copy":"Kopieer","outputLabel":"AI will respond in:","search":"Soek sjablone…","empty":"Type or speak your prompt first."},
"SW":{"ask":"Uliza AI Yoyote","templates":"Violezo","compare":"Hali ya Kulinganisha","compareSend":"Tuma kwa Zilizochaguliwa","send":"Tuma","copy":"Nakili","outputLabel":"AI itajibu kwa:","search":"Tafuta violezo…","empty":"Andika au sema ombi lako kwanza."},
"HA":{"ask":"Tambayi Duk Wani AI","templates":"Samfura","compare":"Yanayin Kwatantawa","compareSend":"Aika zuwa Zaɓaɓɓu","send":"Aika","copy":"Kwafi","outputLabel":"AI zai amsa da:","search":"Nemo samfura…","empty":"Rubuta ko faɗi buƙatarka da farko."},
"AM":{"ask":"ማንኛውንም AI ይጠይቁ","templates":"አብነቶች","compare":"የማነጻጸር ሁነታ","compareSend":"ለተመረጡት ላክ","send":"ላክ","copy":"ቅዳ","outputLabel":"AI የሚመልሰው በ:","search":"አብነቶችን ፈልግ…","empty":"መጀመሪያ ጥያቄዎን ይጻፉ ወይም ይናገሩ።"},
"FIL":{"ask":"Magtanong sa Anumang AI","templates":"Mga Template","compare":"Compare Mode","compareSend":"Ipadala sa Napili","send":"Ipadala","copy":"Kopyahin","outputLabel":"Sasagot ang AI sa:","search":"Maghanap ng mga template…","empty":"I-type o sabihin muna ang iyong prompt."}};
var EXTRA={"EN":{"how":"How to Use","history":"History","paste":"Paste","import":"Import","scan":"Scan","talk":"Talk","clearAll":"Clear All","promptHistory":"Prompt History","recent":"Your recent prompts & favorites","all":"All","clear":"Clear","reedit":"Re-edit","howWorks":"How it works","typeLine":"Type, paste, import or talk","appLang":"App Language","outputLang":"Output Language","changesMenus":"changes menus & templates","responds":"AI responds in this language"},"ES":{"how":"Cómo usar","history":"Historial","paste":"Pegar","import":"Importar","scan":"Escanear","talk":"Hablar","clearAll":"Borrar todo","promptHistory":"Historial de prompts","recent":"Tus prompts recientes y favoritos","all":"Todos","clear":"Borrar","reedit":"Reeditar","howWorks":"Cómo funciona","typeLine":"Escribe, pega, importa o habla","appLang":"Idioma de la app","outputLang":"Idioma de salida","changesMenus":"cambia menús y plantillas","responds":"La IA responde en este idioma"},"FR":{"how":"Mode d’emploi","history":"Historique","paste":"Coller","import":"Importer","scan":"Scanner","talk":"Parler","clearAll":"Tout effacer","promptHistory":"Historique des prompts","recent":"Vos prompts récents et favoris","all":"Tous","clear":"Effacer","reedit":"Rééditer","howWorks":"Comment ça marche","typeLine":"Saisissez, collez, importez ou parlez","appLang":"Langue de l’app","outputLang":"Langue de sortie","changesMenus":"modifie les menus et modèles","responds":"L’IA répond dans cette langue"},"DE":{"how":"Anleitung","history":"Verlauf","paste":"Einfügen","import":"Importieren","scan":"Scannen","talk":"Sprechen","clearAll":"Alles löschen","promptHistory":"Prompt-Verlauf","recent":"Deine letzten Prompts & Favoriten","all":"Alle","clear":"Löschen","reedit":"Bearbeiten","howWorks":"So funktioniert’s","typeLine":"Tippen, einfügen, importieren oder sprechen","appLang":"App-Sprache","outputLang":"Ausgabesprache","changesMenus":"ändert Menüs & Vorlagen","responds":"KI antwortet in dieser Sprache"},"IT":{"how":"Come si usa","history":"Cronologia","paste":"Incolla","import":"Importa","scan":"Scansiona","talk":"Parla","clearAll":"Cancella tutto","promptHistory":"Cronologia prompt","recent":"Prompt recenti e preferiti","all":"Tutti","clear":"Cancella","reedit":"Modifica","howWorks":"Come funziona","typeLine":"Scrivi, incolla, importa o parla","appLang":"Lingua app","outputLang":"Lingua di output","changesMenus":"cambia menu e modelli","responds":"L’IA risponde in questa lingua"},"PT":{"how":"Como usar","history":"Histórico","paste":"Colar","import":"Importar","scan":"Digitalizar","talk":"Falar","clearAll":"Limpar tudo","promptHistory":"Histórico de prompts","recent":"Seus prompts recentes e favoritos","all":"Todos","clear":"Limpar","reedit":"Reeditar","howWorks":"Como funciona","typeLine":"Digite, cole, importe ou fale","appLang":"Idioma do app","outputLang":"Idioma de saída","changesMenus":"altera menus e modelos","responds":"A IA responde neste idioma"},"JA":{"how":"使い方","history":"履歴","paste":"貼り付け","import":"読み込む","scan":"スキャン","talk":"話す","clearAll":"すべて消去","promptHistory":"プロンプト履歴","recent":"最近のプロンプトとお気に入り","all":"すべて","clear":"消去","reedit":"再編集","howWorks":"使い方","typeLine":"入力・貼り付け・読み込み・音声","appLang":"アプリ言語","outputLang":"出力言語","changesMenus":"メニューとテンプレートを変更","responds":"AIはこの言語で回答"},"KO":{"how":"사용 방법","history":"기록","paste":"붙여넣기","import":"가져오기","scan":"스캔","talk":"말하기","clearAll":"모두 지우기","promptHistory":"프롬프트 기록","recent":"최근 프롬프트 및 즐겨찾기","all":"전체","clear":"지우기","reedit":"다시 편집","howWorks":"작동 방식","typeLine":"입력, 붙여넣기, 가져오기 또는 말하기","appLang":"앱 언어","outputLang":"출력 언어","changesMenus":"메뉴와 템플릿 변경","responds":"AI가 이 언어로 응답"},"ZH":{"how":"使用方法","history":"历史","paste":"粘贴","import":"导入","scan":"扫描","talk":"语音","clearAll":"全部清除","promptHistory":"提示词历史","recent":"最近的提示词和收藏","all":"全部","clear":"清除","reedit":"重新编辑","howWorks":"工作原理","typeLine":"输入、粘贴、导入或语音","appLang":"应用语言","outputLang":"输出语言","changesMenus":"更改菜单和模板","responds":"AI 用此语言回复"},"ZH_TW":{"how":"使用方法","history":"歷史","paste":"貼上","import":"匯入","scan":"掃描","talk":"語音","clearAll":"全部清除","promptHistory":"提示詞歷史","recent":"最近的提示詞與收藏","all":"全部","clear":"清除","reedit":"重新編輯","howWorks":"運作方式","typeLine":"輸入、貼上、匯入或語音","appLang":"App 語言","outputLang":"輸出語言","changesMenus":"變更選單與範本","responds":"AI 以此語言回覆"},"AR":{"how":"كيفية الاستخدام","history":"السجل","paste":"لصق","import":"استيراد","scan":"مسح","talk":"تحدث","clearAll":"مسح الكل","promptHistory":"سجل الأوامر","recent":"أوامرك الأخيرة والمفضلة","all":"الكل","clear":"مسح","reedit":"إعادة التحرير","howWorks":"كيف يعمل","typeLine":"اكتب أو الصق أو استورد أو تحدث","appLang":"لغة التطبيق","outputLang":"لغة الإخراج","changesMenus":"تغيّر القوائم والقوالب","responds":"يرد الذكاء الاصطناعي بهذه اللغة"},"HI":{"how":"कैसे उपयोग करें","history":"इतिहास","paste":"पेस्ट","import":"आयात","scan":"स्कैन","talk":"बोलें","clearAll":"सब साफ़ करें","promptHistory":"प्रॉम्प्ट इतिहास","recent":"हाल के प्रॉम्प्ट और पसंदीदा","all":"सभी","clear":"साफ़ करें","reedit":"फिर संपादित करें","howWorks":"यह कैसे काम करता है","typeLine":"टाइप, पेस्ट, आयात या बोलें","appLang":"ऐप भाषा","outputLang":"आउटपुट भाषा","changesMenus":"मेनू और टेम्पलेट बदलता है","responds":"AI इस भाषा में जवाब देता है"},
"SW":{"how":"Jinsi ya Kutumia","history":"Historia","paste":"Bandika","import":"Leta","scan":"Changanua","talk":"Ongea","clearAll":"Futa Yote","promptHistory":"Historia ya Maombi","recent":"Maombi yako ya hivi karibuni na vipendwa","all":"Zote","clear":"Futa","reedit":"Hariri tena","howWorks":"Jinsi inavyofanya kazi","typeLine":"Andika, bandika, leta au ongea","appLang":"Lugha ya Programu","outputLang":"Lugha ya Matokeo","changesMenus":"hubadilisha menyu na violezo","responds":"AI hujibu kwa lugha hii"},
"HA":{"how":"Yadda ake Amfani","history":"Tarihi","paste":"Manna","import":"Shigo da","scan":"Duba","talk":"Yi magana","clearAll":"Share Duka","promptHistory":"Tarihin Buƙatu","recent":"Buƙatunka na kwanan nan da waɗanda aka fi so","all":"Duka","clear":"Share","reedit":"Sake gyara","howWorks":"Yadda yake aiki","typeLine":"Rubuta, manna, shigo da ko yi magana","appLang":"Harshen Manhaja","outputLang":"Harshen Fitarwa","changesMenus":"yana canza menus da samfura","responds":"AI zai amsa da wannan harshe"},
"AM":{"how":"እንዴት መጠቀም እንደሚቻል","history":"ታሪክ","paste":"ለጥፍ","import":"አስገባ","scan":"ስካን","talk":"ተናገር","clearAll":"ሁሉንም አጥፋ","promptHistory":"የጥያቄ ታሪክ","recent":"የቅርብ ጊዜ ጥያቄዎች እና ተወዳጆች","all":"ሁሉም","clear":"አጥፋ","reedit":"እንደገና አርትዕ","howWorks":"እንዴት እንደሚሰራ","typeLine":"ይጻፉ፣ ይለጥፉ፣ ያስገቡ ወይም ይናገሩ","appLang":"የመተግበሪያ ቋንቋ","outputLang":"የውጤት ቋንቋ","changesMenus":"ምናሌዎችን እና አብነቶችን ይቀይራል","responds":"AI በዚህ ቋንቋ ይመልሳል"},
"FIL":{"how":"Paano Gamitin","history":"Kasaysayan","paste":"I-paste","import":"I-import","scan":"I-scan","talk":"Magsalita","clearAll":"I-clear Lahat","promptHistory":"Kasaysayan ng Prompt","recent":"Mga kamakailang prompt at paborito","all":"Lahat","clear":"I-clear","reedit":"I-edit Muli","howWorks":"Paano ito gumagana","typeLine":"Mag-type, mag-paste, mag-import o magsalita","appLang":"Wika ng App","outputLang":"Wika ng Output","changesMenus":"binabago ang mga menu at template","responds":"sasagot ang AI sa wikang ito"}};
var originalText=new WeakMap();

function normCode(code){
  code=String(code||"EN").toUpperCase().replace(/-/g,"_");
  if(code==="ZH_TW"||code==="ZH_HANT")return "ZH_TW";
  if(code==="ZH_CN"||code==="ZH_HANS")return "ZH";
  return code;
}
function meta(code){
  var n=normCode(code);
  var m=APP_LANGS.find(function(x){return x.code===n;});
  if(m)return m;
  var g=window._pgI18n&&window._pgI18n.LANGS&&window._pgI18n.LANGS.find(function(x){return normCode(x.code)===n;});
  return g?{code:n,name:g.name,flag:g.flag}:{code:n,name:"English",flag:"🇺🇸"};
}
var DEVICE_EXTRA={
  EN:{compareHelp:"send to multiple AIs",promptIntro:"Hi! Ask Any AI anything — in your language.",promptExample:"Example: Write a polite email to my landlord asking to fix the heater."},
  ES:{compareHelp:"enviar a varias IA",promptIntro:"¡Hola! Pregunta cualquier cosa a cualquier IA — en tu idioma.",promptExample:"Ejemplo: Escribe un correo amable a mi casero pidiendo que repare la calefacción."},
  FR:{compareHelp:"envoyer à plusieurs IA",promptIntro:"Bonjour ! Demandez n'importe quoi à n'importe quelle IA — dans votre langue.",promptExample:"Exemple : Rédigez un e-mail poli à mon propriétaire pour demander de réparer le chauffage."},
  DE:{compareHelp:"an mehrere KIs senden",promptIntro:"Hallo! Frag jede KI alles — in deiner Sprache.",promptExample:"Beispiel: Schreibe eine höfliche E-Mail an meinen Vermieter und bitte um Reparatur der Heizung."},
  IT:{compareHelp:"invia a più IA",promptIntro:"Ciao! Chiedi qualsiasi cosa a qualsiasi IA — nella tua lingua.",promptExample:"Esempio: Scrivi un'e-mail cortese al proprietario chiedendo di riparare il riscaldamento."},
  PT:{compareHelp:"enviar para várias IAs",promptIntro:"Olá! Pergunte qualquer coisa a qualquer IA — no seu idioma.",promptExample:"Exemplo: Escreva um e-mail educado ao senhorio pedindo para consertar o aquecedor."},
  NL:{compareHelp:"naar meerdere AI's sturen",promptIntro:"Hallo! Vraag elke AI alles — in jouw taal.",promptExample:"Voorbeeld: Schrijf een beleefde e-mail aan mijn verhuurder om de verwarming te repareren."},
  RU:{compareHelp:"отправить нескольким ИИ",promptIntro:"Здравствуйте! Спросите любой ИИ о чём угодно — на вашем языке.",promptExample:"Пример: Напишите вежливое письмо арендодателю с просьбой починить отопление."},
  ZH:{compareHelp:"发送到多个 AI",promptIntro:"你好！用你的语言向任何 AI 提问。",promptExample:"示例：写一封礼貌的邮件，请房东修理暖气。"},
  ZH_TW:{compareHelp:"傳送到多個 AI",promptIntro:"你好！用你的語言向任何 AI 提問。",promptExample:"範例：寫一封禮貌的電子郵件，請房東修理暖氣。"},
  JA:{compareHelp:"複数のAIに送信",promptIntro:"こんにちは！あなたの言語で、どのAIにも何でも聞けます。",promptExample:"例：暖房の修理をお願いする丁寧なメールを大家さんに書いてください。"},
  KO:{compareHelp:"여러 AI에 보내기",promptIntro:"안녕하세요! 원하는 언어로 어떤 AI에게든 무엇이든 물어보세요.",promptExample:"예: 집주인에게 난방 수리를 요청하는 정중한 이메일을 작성하세요."},
  AR:{compareHelp:"الإرسال إلى عدة نماذج ذكاء اصطناعي",promptIntro:"مرحبًا! اسأل أي ذكاء اصطناعي أي شيء — بلغتك.",promptExample:"مثال: اكتب رسالة مهذبة إلى المالك تطلب إصلاح التدفئة."},
  HI:{compareHelp:"कई AI को भेजें",promptIntro:"नमस्ते! अपनी भाषा में किसी भी AI से कुछ भी पूछें।",promptExample:"उदाहरण: मकान मालिक को हीटर ठीक करने के लिए विनम्र ईमेल लिखें।"},
  SW:{compareHelp:"tuma kwa AI nyingi",promptIntro:"Habari! Uliza AI yoyote chochote — kwa lugha yako.",promptExample:"Mfano: Andika barua pepe ya heshima kwa mwenye nyumba ukiomba atengeneze hita."},
  HA:{compareHelp:"aika zuwa AI da yawa",promptIntro:"Sannu! Tambayi kowane AI komai — a harshenka.",promptExample:"Misali: Rubuta imel mai ladabi ga mai gida kana neman a gyara hita."},
  AM:{compareHelp:"ወደ ብዙ AI ላክ",promptIntro:"ሰላም! በቋንቋዎ ማንኛውንም AI ማንኛውንም ነገር ይጠይቁ።",promptExample:"ምሳሌ፦ ማሞቂያውን እንዲጠግን ለቤት አከራይ ትሁት ኢሜይል ይጻፉ።"},
  FIL:{compareHelp:"ipadala sa maraming AI",promptIntro:"Kumusta! Magtanong sa anumang AI ng kahit ano — sa iyong wika.",promptExample:"Halimbawa: Sumulat ng magalang na email sa landlord ko para ipaayos ang heater."}
};
function strings(code){
  var n=normCode(code), c=CORE[n]||CORE.EN, e=EXTRA[n]||EXTRA.EN, x=DEVICE_EXTRA[n]||DEVICE_EXTRA.EN;
  var out=Object.assign({},EXTRA.EN,CORE.EN,DEVICE_EXTRA.EN,e,c,x);
  out.compareSelect=out.compareSelect||out.compareSelectAIs||"Select AIs to compare";
  return out;
}
function keyFor(text){
  var t=text.trim();
  var pairs={
    "Ask Any AI":"ask","Templates":"templates","1,000+ Templates":"templates","How to Use":"how","History":"history",
    "Paste":"paste","Import":"import","Scan":"scan","Talk":"talk","Send":"send","Send to AI":"send","Clear All":"clearAll",
    "Prompt History":"promptHistory","Your recent prompts & favorites":"recent","All":"all","Clear":"clear",
    "Copy":"copy","Re-edit":"reedit","How it works":"howWorks","AI will respond in:":"outputLabel",
    "Compare Mode":"compare","Choose AI":"compareSelect","Select AIs to compare":"compareSelect","Send to Selected":"compareSend","Search templates...":"search","Search templates…":"search",
    "Response":"responds","Read":"copy","Share":"copy","Save":"copy",
    "Type, paste, import or talk":"typeLine","App Language":"appLang","Output Language":"outputLang",
    "changes menus & templates":"changesMenus","AI responds in this language":"responds"
  };
  return pairs[t]||null;
}
function translateTextNode(node,S){
  if(!originalText.has(node))originalText.set(node,node.nodeValue);
  var src=originalText.get(node), trimmed=src.trim();
  if(!trimmed)return;
  var prefix=src.slice(0,src.indexOf(trimmed));
  var suffix=src.slice(src.indexOf(trimmed)+trimmed.length);
  var icon="", body=trimmed;
  var m=trimmed.match(/^([^\p{L}\p{N}]*)(.*)$/u);
  if(m){icon=m[1];body=m[2];}

  // Compound helper lines used by the real app UI.
  if(body==="App Language ⬆️ changes menus & templates"){
    node.nodeValue=prefix+icon+(S.appLang||"App Language")+" ⬆️ "+(S.changesMenus||"changes menus & templates")+suffix; return;
  }
  if(body==="Output Language ⬇️ AI responds in this language"){
    node.nodeValue=prefix+icon+(S.outputLang||"Output Language")+" ⬇️ "+(S.responds||"AI responds in this language")+suffix; return;
  }
  if(body==="Compare Mode: send to multiple AIs"){
    node.nodeValue=prefix+icon+(S.compare||"Compare Mode")+": "+(S.compareHelp||"send to multiple AIs")+suffix; return;
  }
  if(body==="Choose AI"){
    node.nodeValue=prefix+(S.compareSelect||"Select AIs to compare")+suffix; return;
  }
  if(body==="Send to AI"){
    node.nodeValue=prefix+(S.send||"Send")+suffix; return;
  }
  if(body==="Prompt auto-filled" || body==="Paste prompt"){
    node.nodeValue=prefix+(S.empty||"Type or speak your prompt first.")+suffix; return;
  }
  if(body==="Compare Mode — 2 AI responses"){
    node.nodeValue=prefix+icon+(S.compare||"Compare Mode")+" — 2 AI"+suffix; return;
  }
  if(body==="Compare and pick the best answer"){
    node.nodeValue=prefix+(S.compare||"Compare Mode")+suffix; return;
  }
  if(body==="Hi ARCHITECT! Ask Any AI anything — in your language." || body==="Hi BUILDER! Ask any AI anything. In your language."){
    node.nodeValue=prefix+(S.promptIntro||body)+suffix; return;
  }
  if(body==="Example: Write a polite email to my landlord asking to fix the heater" || body==="Example: Write a polite email to my landlord asking to fix the heater."){
    node.nodeValue=prefix+(S.promptExample||body)+suffix; return;
  }

  var k=keyFor(body);
  if(k&&S[k])node.nodeValue=prefix+icon+S[k]+suffix;
}
function localizeRoot(root,S){
  if(!root)return;
  var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(function(n){translateTextNode(n,S);});
}
function updateBadges(code){
  var M=meta(code);
  document.querySelectorAll(
    '.hero-phone-mock span, #gallery-iphone span, #gallery-ipad span, #gallery-mac span, #demo span'
  ).forEach(function(el){
    var t=(el.textContent||"").trim();
    if(/^([\u{1F1E6}-\u{1F1FF}]{2})\s+[A-Z]{2,5}$/u.test(t) || t==="🇺🇸 EN"){
      el.textContent=M.flag+" "+M.code.replace("_","-");
    }
  });
  document.querySelectorAll('.hp-lang').forEach(function(el){el.textContent=M.flag+" "+M.code.replace("_","-");});
  document.querySelectorAll('.duo-lang-badge').forEach(function(el){el.textContent=M.flag+" "+M.code.replace("_","-");});
  document.querySelectorAll('.pg-phone-output-select,.ipad-native-output-select,.mac-response-select,.demo-output-language').forEach(function(el){
    var flag=el.querySelector('span:first-child'); if(flag)flag.textContent=M.flag;
    var strong=el.querySelector('strong'); if(strong)strong.textContent=M.name;
  });
}
function ensureStaticLocalizedPanels(){
  document.querySelectorAll('#gallery-iphone .iphone-screen > img, #gallery-ipad .ipad-screen > img, #gallery-mac #macScreen-templates > img').forEach(function(img){
    if(img.dataset.pgLocalized==="1")return;
    var alt=(img.getAttribute('alt')||"");
    var type=/Templates/i.test(alt)?"templates":(/How to Use/i.test(alt)?"how":(/History/i.test(alt)?"history":null));
    if(!type)return;
    img.dataset.pgLocalized="1";
    img.style.display="none";
    var p=document.createElement('div');
    p.className="pg-device-static-localized"+(img.closest&&img.closest("#gallery-mac")?" pg-device-static-localized-mac":"");
    p.dataset.pgScreen=type;
    p.innerHTML='<div class="pgdsl-head"><img src="assets/img/icon-128.png" alt=""><strong>Poly-Glot AI Workspace</strong><span class="pgdsl-badge">🇺🇸 EN</span></div>'
      +'<div class="pgdsl-tabs"><span>✏️ Ask Any AI</span><span class="'+(type==="templates"?"active":"")+'">📋 Templates</span><span class="'+(type==="how"?"active":"")+'">📖 How to Use</span><span class="'+(type==="history"?"active":"")+'">🕐 History</span></div>'
      +(type==="templates"
        ?'<div class="pgdsl-body"><div class="pgdsl-title">Templates</div><div class="pgdsl-search">Search templates…</div><div class="pgdsl-cards"><div><strong>Templates</strong><small>01</small></div><div><strong>Templates</strong><small>02</small></div><div><strong>Templates</strong><small>03</small></div><div><strong>Templates</strong><small>04</small></div><div><strong>Templates</strong><small>05</small></div><div><strong>Templates</strong><small>06</small></div></div></div>'
        :(type==="how"
          ?'<div class="pgdsl-body"><div class="pgdsl-title">How to Use</div><div class="pgdsl-step">1 · Type, paste, import or talk</div><div class="pgdsl-step">2 · App Language ⬆️ changes menus & templates</div><div class="pgdsl-step">3 · Output Language ⬇️ AI responds in this language</div><div class="pgdsl-step">4 · Compare Mode: send to multiple AIs</div></div>'
          :'<div class="pgdsl-body"><div class="pgdsl-history-head"><div><div class="pgdsl-title">Prompt History</div><div class="pgdsl-recent">Your recent prompts & favorites</div></div><div class="pgdsl-history-actions"><span>All</span><span>Clear</span></div></div><div class="pgdsl-history-list"><div><strong>Ask Any AI</strong><small>5m ago</small><p>Test</p><button>Copy</button><button>Re-edit</button></div><div><strong>Ask Any AI</strong><small>12m ago</small><p>Test</p><button>Copy</button><button>Re-edit</button></div><div><strong>Ask Any AI</strong><small>19m ago</small><p>Test</p><button>Copy</button><button>Re-edit</button></div></div></div>'));
    img.parentNode.insertBefore(p,img);
  });
}
function updateStaticPanels(code,S){
  var M=meta(code);
  document.querySelectorAll('.pg-device-static-localized').forEach(function(p){
    var b=p.querySelector('.pgdsl-badge'); if(b)b.textContent=M.flag+" "+M.code.replace("_","-");
    localizeRoot(p,S);
  });

  // Mac How to Use / Compare animation uses live DOM, so update its key labels directly.
  var choose=document.querySelector('#gallery-mac #siteDemo-P2 > div:nth-child(2)');
  if(choose)choose.textContent=S.compareSelect||"Select AIs to compare";
  var cmp=document.querySelector('#gallery-mac #siteDemo-P2 > div:nth-child(3) > span');
  if(cmp)cmp.textContent="🔀 "+(S.compare||"Compare Mode");
  var sendAll=document.getElementById('siteDemo-SendAll');
  if(sendAll){
    var count=document.getElementById('siteDemo-CmpCount');
    var n=count?count.textContent:"0";
    sendAll.innerHTML=(S.compareSend||"Send to Selected")+' (<span id="siteDemo-CmpCount">'+n+'</span>)';
  }
}

function updateDuo(code,S){
  var root=document.getElementById('iphone-duo');
  if(!root)return;
  var M=meta(code);
  var gt=(window._pgI18n&&window._pgI18n.gt)?window._pgI18n.gt:null;
  var g=function(k,fallback){var v=gt?gt(k,normCode(code).replace("_","-")):"";return v||fallback;};

  var kicker=root.querySelector('.duo-kicker');
  if(kicker)kicker.textContent=g('mcpGptBadge','Coming Soon');

  var title=root.querySelector('#duo-title');
  if(title)title.innerHTML='Poly-Glot<br><span>iPhone Duo</span>';

  var copy=root.querySelector('.duo-copy');
  if(copy)copy.textContent=g('sc2P','Send the same prompt to multiple AI apps and compare their responses side by side.');

  var metaBox=root.querySelector('.duo-meta');
  if(metaBox){
    var link=metaBox.querySelector('a');
    var linkText=link?link.textContent:'Explore iPhone Duo at Apple';
    metaBox.childNodes[0].nodeValue='iPhone Duo — October 23, 2026. ';
    if(link)link.textContent=g('navConnect',linkText).replace(/^🔌\s*/,'')+' iPhone Duo';
  }

  var ui=root.querySelector('.duo-ui');
  if(ui){
    var badge=ui.querySelector('.duo-lang-badge'); if(badge)badge.textContent=M.flag+' '+M.code.replace('_','-');
    var tab=ui.querySelector('.tabline'); if(tab)tab.textContent='✏️ '+(S.ask||'Ask Any AI');
    var h=ui.querySelector('h3'); if(h)h.textContent='🔀 '+(S.compare||'Compare Mode');
    var muted=ui.querySelector('h3 + .muted'); if(muted)muted.textContent=S.compareSelect||'Select AIs to compare';
    var prompt=ui.querySelector('.prompt'); if(prompt)prompt.textContent=g('sc2Prompt','Explain quantum computing in simple terms.');
    var send=ui.querySelector('.duo-send'); if(send)send.textContent=S.compareSend||'Send to Selected';
  }

  var resp=root.querySelector('.duo-response');
  if(resp){
    var lbl=resp.querySelector('.duo-response-head .muted'); if(lbl)lbl.textContent=S.response||S.responds||'Response';
    var ps=resp.querySelectorAll('p');
    if(ps[0])ps[0].textContent=g('sc2Prompt','Explain quantum computing in simple terms.');
    if(ps[1])ps[1].textContent=g('sc2PickSub','One prompt. Every AI. You decide.');
    var acts=resp.querySelectorAll('.duo-actions span');
    var labels=[S.copy||'Copy',S.read||'Read',S.share||'Share',S.save||'Save'];
    acts.forEach(function(el,i){el.textContent=labels[i]||el.textContent;});
  }

  root.setAttribute('dir',(normCode(code)==='AR'||normCode(code)==='HE')?'rtl':'ltr');
}
function apply(code){
  var S=strings(code);
  ensureStaticLocalizedPanels();
  [
    document.querySelector('.hero-phone-mock'),
    document.getElementById('gallery-iphone'),
    document.getElementById('gallery-ipad'),
    document.getElementById('gallery-mac'),
    document.getElementById('demo'),
    document.getElementById('iphone-duo'),
    document.getElementById('iphone-duo')
  ].forEach(function(root){localizeRoot(root,S);});
  updateBadges(code);
  updateStaticPanels(code,S);
  updateDuo(code,S);
  document.documentElement.setAttribute('data-device-ui-lang',normCode(code));
  var rtl=(normCode(code)==="AR"||normCode(code)==="HE");
  [
    document.querySelector('.hero-phone-mock'),
    document.getElementById('gallery-iphone'),
    document.getElementById('gallery-ipad'),
    document.getElementById('gallery-mac'),
    document.getElementById('demo')
  ].forEach(function(root){if(root)root.setAttribute('dir',rtl?'rtl':'ltr');});
}
var style=document.createElement('style');
style.textContent=
'.pg-device-static-localized{position:absolute;inset:0;background:#0d0f1a;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;overflow:hidden}'
+'.pgdsl-head{display:flex;align-items:center;gap:8px;padding:6% 6% 3%;font-size:clamp(7px,1.3vw,14px)}'
+'.pgdsl-head img{width:7%;aspect-ratio:1;border-radius:22%}.pgdsl-head strong{font-weight:800}.pgdsl-badge{margin-left:auto;background:rgba(255,255,255,.08);padding:1.5% 2.5%;border-radius:6px}'
+'.pgdsl-tabs{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.38);font-size:clamp(5px,.85vw,10px)}'
+'.pgdsl-tabs span{padding:4% 2%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pgdsl-tabs .active{color:#f59e0b;border-bottom:2px solid #f59e0b}'
+'.pgdsl-body{padding:5% 6%}.pgdsl-title{font-size:clamp(11px,2vw,22px);font-weight:800;margin-bottom:4%}.pgdsl-search{background:#171c22;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:3%;color:#8b949e;font-size:clamp(7px,1.1vw,12px);margin-bottom:4%}'
+'.pgdsl-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:3%}.pgdsl-cards div{height:48px;background:#171c22;border:1px solid rgba(245,158,11,.24);border-radius:8px}'
+'.pgdsl-step{background:#171c22;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:3.3%;margin-bottom:2.5%;font-size:clamp(7px,1.05vw,12px);color:#b9c1ce}'
+'#gallery-iphone .pg-device-static-localized{border-radius:32px}#gallery-ipad .pg-device-static-localized{border-radius:22px}'
+'#gallery-ipad .pgdsl-cards{grid-template-columns:repeat(3,1fr)}#gallery-ipad .pgdsl-cards div{height:58px}'
+'.pgdsl-history-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4%}.pgdsl-recent{font-size:clamp(6px,.9vw,10px);color:#8b949e}.pgdsl-history-actions{display:flex;gap:5px}.pgdsl-history-actions span{padding:4px 7px;border:1px solid rgba(255,255,255,.12);border-radius:7px;font-size:clamp(5px,.8vw,9px)}'
+'.pgdsl-history-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3%}.pgdsl-history-list>div{padding:4%;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:#171c22;min-width:0}.pgdsl-history-list strong{display:block;font-size:clamp(7px,1vw,12px)}.pgdsl-history-list small,.pgdsl-history-list p{font-size:clamp(5px,.75vw,9px);color:#8b949e;margin:3px 0}.pgdsl-history-list button{border:0;border-radius:5px;padding:3px 6px;margin-right:3px;background:#7dd3fc;color:#071018;font-size:clamp(5px,.7vw,8px);font-weight:700}.pgdsl-history-list button+button{background:#202733;color:#e6edf3;border:1px solid rgba(255,255,255,.10)}'
+'#gallery-ipad .pgdsl-history-list{grid-template-columns:repeat(3,minmax(0,1fr))}'
+'.pg-device-static-localized-mac{border-radius:0!important;z-index:5}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-head{padding:2.2% 3% 1.2%;font-size:clamp(7px,.8vw,12px)}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-tabs{font-size:clamp(5px,.62vw,9px)}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-body{padding:2.5% 3%}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-title{font-size:clamp(10px,1.25vw,18px);margin-bottom:2%}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-search{padding:1.5%;margin-bottom:2%;font-size:clamp(6px,.75vw,10px)}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-cards{grid-template-columns:repeat(3,1fr);gap:2%}'
+'#gallery-mac .pg-device-static-localized-mac .pgdsl-cards div{height:42px}'
+'html:not([data-device-ui-lang="EN"]) #gallery-mac #macScreen-askanyai.active{opacity:1!important;visibility:visible!important;pointer-events:auto!important;background:#0d1117!important}'
+'html:not([data-device-ui-lang="EN"]) #gallery-mac .mac-reference-stage{background:#0d1117!important}+'.pg-device-static-localized *{box-sizing:border-box;min-width:0}'+'.pgdsl-head{min-height:0;white-space:nowrap;overflow:hidden}'+'.pgdsl-head strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1}'+'.pgdsl-badge{flex:0 0 auto;white-space:nowrap}'+'.pgdsl-tabs{align-items:stretch}'+'.pgdsl-tabs span{display:flex;align-items:center;justify-content:center;min-width:0;line-height:1.15}'+'.pgdsl-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+'.pgdsl-search{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+'.pgdsl-cards>div{display:flex;flex-direction:column;justify-content:center;gap:3px;padding:7%;overflow:hidden}'+'.pgdsl-cards strong{font-size:clamp(6px,.9vw,11px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#eef2f7}'+'.pgdsl-cards small{font-size:clamp(5px,.7vw,8px);color:#8b949e}'+'.pgdsl-step{white-space:normal;overflow-wrap:anywhere;line-height:1.25}'+'.pgdsl-history-list strong,.pgdsl-history-list p{overflow:hidden;text-overflow:ellipsis}'+'.hero-phone-mock *,#gallery-iphone *,#gallery-ipad *,#gallery-mac *{box-sizing:border-box}'+'#gallery-iphone .pg-phone-ask-title,#gallery-ipad .ipad-native-ask-title,#gallery-mac .mac-native-ask-title{max-width:100%;overflow-wrap:anywhere}'+'#gallery-iphone .pg-phone-tips,#gallery-ipad .ipad-native-help-lines,#gallery-mac .mac-native-help-lines{min-width:0;max-width:100%}'+'#gallery-iphone .pg-phone-tips>div,#gallery-ipad .ipad-native-help-lines>div,#gallery-mac .mac-native-help-lines>div{white-space:normal!important;overflow-wrap:anywhere;line-height:1.28!important}'+'#gallery-iphone .pg-phone-how-link,#gallery-ipad .ipad-native-how-link,#gallery-mac .mac-native-how-link{white-space:nowrap;max-width:38%;overflow:hidden;text-overflow:ellipsis}'+'#gallery-iphone .pg-phone-output-row,#gallery-ipad .ipad-native-output-row{min-width:0;gap:5px!important}'+'#gallery-iphone .pg-phone-output-label,#gallery-ipad .ipad-native-output-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+'#gallery-iphone .pg-phone-output-select,#gallery-ipad .ipad-native-output-select{min-width:0!important;max-width:62%!important}'+'#gallery-iphone .pg-phone-output-select strong,#gallery-ipad .ipad-native-output-select strong{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+'#gallery-iphone .iphone-live-preview>div:nth-child(2){min-width:0;overflow:hidden}'+'#gallery-iphone .iphone-live-preview>div:nth-child(2)>span:nth-child(2){min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+'#gallery-iphone .iphone-live-preview>div:nth-child(3){display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important}'+'#gallery-iphone .iphone-live-preview>div:nth-child(3)>span{min-width:0!important;padding-left:2px!important;padding-right:2px!important;text-align:center!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+'#gallery-ipad .ipad-live-preview>div:nth-child(2){min-width:0;overflow:hidden}'+'#gallery-ipad .ipad-live-preview>div:nth-child(2)>span:nth-child(2){min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+'#gallery-ipad .ipad-live-preview>div:nth-child(3){display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;width:100%!important}'+'#gallery-ipad .ipad-live-preview>div:nth-child(3)>span{min-width:0!important;padding-left:3px!important;padding-right:3px!important;text-align:center!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+'#gallery-mac .mac-reference-tab span{min-width:0!important;max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}'+'html[data-device-ui-lang="AR"] #gallery-iphone .iphone-live-preview,html[data-device-ui-lang="HE"] #gallery-iphone .iphone-live-preview,html[data-device-ui-lang="AR"] #gallery-ipad .ipad-live-preview,html[data-device-ui-lang="HE"] #gallery-ipad .ipad-live-preview{direction:rtl}'+'html[data-device-ui-lang="DE"] #gallery-iphone .iphone-live-preview,html[data-device-ui-lang="FR"] #gallery-iphone .iphone-live-preview,html[data-device-ui-lang="PT"] #gallery-iphone .iphone-live-preview,html[data-device-ui-lang="RU"] #gallery-iphone .iphone-live-preview,html[data-device-ui-lang="HI"] #gallery-iphone .iphone-live-preview{font-size:96%}'+'html[data-device-ui-lang="DE"] #gallery-ipad .ipad-live-preview,html[data-device-ui-lang="FR"] #gallery-ipad .ipad-live-preview,html[data-device-ui-lang="PT"] #gallery-ipad .ipad-live-preview,html[data-device-ui-lang="RU"] #gallery-ipad .ipad-live-preview,html[data-device-ui-lang="HI"] #gallery-ipad .ipad-live-preview{font-size:96%}'';
document.head.appendChild(style);
window._pgDeviceUI={apply:apply,appLanguages:APP_LANGS,_strings:strings};
window.addEventListener('pg:languagechange',function(e){apply(e.detail&&e.detail.code||"EN");});
var reapplyTimer=null;
function observeDeviceUI(){
  var roots=['gallery-iphone','gallery-ipad','gallery-mac','demo','iphone-duo'].map(function(id){return document.getElementById(id);}).filter(Boolean);
  roots.forEach(function(root){
    new MutationObserver(function(){
      clearTimeout(reapplyTimer);
      reapplyTimer=setTimeout(function(){apply(window._pgI18n?window._pgI18n.curLang():"EN");},40);
    }).observe(root,{childList:true,subtree:true});
  });
}
function syncGlobalPickerFlags(){
  if(!window._pgI18n||!window._pgI18n.LANGS)return;
  window._pgI18n.LANGS.forEach(function(L){
    var M=APP_LANGS.find(function(x){return x.code===normCode(L.code)&&!x.siteOnly;});
    if(M)L.flag=M.flag;
  });
  document.querySelectorAll('.pgGlob-row[data-lang]').forEach(function(row){
    var M=meta(row.getAttribute('data-lang'));
    var flag=row.querySelector('.gf'); if(flag)flag.textContent=M.flag;
  });
  var cur=meta(window._pgI18n.curLang());
  var gf=document.getElementById('pgGlobalFlag'); if(gf)gf.textContent=cur.flag;
}
function init(){syncGlobalPickerFlags();apply(window._pgI18n?window._pgI18n.curLang():"EN");observeDeviceUI();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

/* ===== DEVICE UI LANGUAGE LAYOUT HARDENING ===== */
(function(){
"use strict";

var style=document.createElement("style");
style.id="pg-device-ui-layout-hardening";
style.textContent=`
/* Keep branded app/header text stable in every language. */
.hero-phone-mock > .phone-screen > div:nth-child(2),
#gallery-iphone .iphone-live-preview > div:nth-child(2),
#gallery-ipad .ipad-live-preview > div:nth-child(2),
.pg-device-static-localized .pgdsl-head{
  display:flex!important;
  align-items:center!important;
  min-width:0!important;
}
.hero-phone-mock > .phone-screen > div:nth-child(2) > span:nth-child(2),
#gallery-iphone .iphone-live-preview > div:nth-child(2) > span:nth-child(2),
#gallery-ipad .ipad-live-preview > div:nth-child(2) > span:nth-child(2),
.pg-device-static-localized .pgdsl-head strong{
  flex:1 1 auto!important;
  min-width:0!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
.hero-phone-mock > .phone-screen > div:nth-child(2) > span:last-child,
#gallery-iphone .iphone-live-preview > div:nth-child(2) > span:last-child,
#gallery-ipad .ipad-live-preview > div:nth-child(2) > span:last-child,
.pg-device-static-localized .pgdsl-badge{
  flex:0 0 auto!important;
  white-space:nowrap!important;
}

/* All app nav bars stay one horizontal row; long translations shrink/ellipsis instead of wrapping. */
.hero-phone-mock > .phone-screen > div:nth-child(3),
#gallery-iphone .iphone-live-preview > div:nth-child(3),
#gallery-ipad .ipad-live-preview > div:nth-child(3),
.pg-device-static-localized .pgdsl-tabs,
#gallery-mac .mac-reference-hotspots{
  display:grid!important;
  grid-template-columns:repeat(4,minmax(0,1fr))!important;
  width:100%!important;
  min-width:0!important;
}
.hero-phone-mock > .phone-screen > div:nth-child(3) > span,
#gallery-iphone .iphone-live-preview > div:nth-child(3) > span,
#gallery-ipad .ipad-live-preview > div:nth-child(3) > span,
.pg-device-static-localized .pgdsl-tabs > span,
#gallery-mac .mac-reference-tab{
  min-width:0!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  line-height:1.1!important;
  text-align:center!important;
}

/* Localized headings/helper copy must fit their device, never enlarge or clip the hardware frame. */
.pg-phone-ask-title,
.ipad-native-ask-title,
.mac-native-ask-title,
.pgdsl-title{
  max-width:100%!important;
  line-height:1.12!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
.pg-phone-tips,
.ipad-native-help-lines,
.mac-native-help-lines{
  max-width:100%!important;
  min-width:0!important;
  overflow:hidden!important;
}
.pg-phone-tips > div,
.ipad-native-help-lines > div,
.mac-native-help-lines > div{
  white-space:normal!important;
  overflow-wrap:anywhere!important;
  word-break:normal!important;
  line-height:1.22!important;
}
.pg-phone-how-link,
.ipad-native-how-link,
.mac-native-how-link{
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  max-width:36%!important;
}

/* Language/output rows stay side-by-side. */
.pg-phone-output-row,
.ipad-native-output-row{
  display:flex!important;
  align-items:center!important;
  min-width:0!important;
  gap:5px!important;
}
.pg-phone-output-label,
.ipad-native-output-label{
  flex:1 1 auto!important;
  min-width:0!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
.pg-phone-output-select,
.ipad-native-output-select{
  flex:0 1 62%!important;
  width:auto!important;
  min-width:0!important;
  max-width:62%!important;
}
.pg-phone-output-select strong,
.ipad-native-output-select strong{
  min-width:0!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}

/* Buttons remain balanced regardless of translated label length. */
.pg-phone-action-row > div,
.ipad-redesign-action-btn{
  min-width:0!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
.pg-phone-send,
.ipad-redesign-send,
.pg-phone-clear,
.ipad-redesign-clear{
  white-space:nowrap!important;
}

/* Generated localized static screens: keep text visible and proportional. */
.pg-device-static-localized,
.pg-device-static-localized *{
  box-sizing:border-box!important;
  min-width:0;
}
.pg-device-static-localized .pgdsl-cards > div{
  display:flex!important;
  flex-direction:column!important;
  justify-content:center!important;
  padding:6%!important;
  overflow:hidden!important;
}
.pg-device-static-localized .pgdsl-cards strong{
  display:block!important;
  color:#eef2f7!important;
  opacity:1!important;
  visibility:visible!important;
  font-weight:750!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
.pg-device-static-localized .pgdsl-step{
  white-space:normal!important;
  overflow-wrap:anywhere!important;
  line-height:1.2!important;
}

/* Long-script language groups get a small, consistent scale adjustment. */
html[data-device-ui-density="compact"] #gallery-iphone .iphone-live-preview,
html[data-device-ui-density="compact"] #gallery-ipad .ipad-live-preview{
  font-size:92%!important;
}
html[data-device-ui-density="compact"] #gallery-mac .mac-reference-stage{
  font-size:94%!important;
}
html[data-device-ui-density="compact"] .pgdsl-tabs{
  font-size:90%!important;
}
html[data-device-ui-density="compact"] .pgdsl-body{
  padding-top:4%!important;
}

/* CJK uses its native glyph metrics without excessive shrinkage. */
html[data-device-ui-script="cjk"] #gallery-iphone .iphone-live-preview,
html[data-device-ui-script="cjk"] #gallery-ipad .ipad-live-preview,
html[data-device-ui-script="cjk"] #gallery-mac .mac-reference-stage{
  letter-spacing:0!important;
  word-break:keep-all!important;
}

/* RTL: preserve device geometry while aligning readable content correctly. */
html[data-device-ui-dir="rtl"] .pg-phone-ask-body,
html[data-device-ui-dir="rtl"] .ipad-live-preview,
html[data-device-ui-dir="rtl"] .mac-reference-stage,
html[data-device-ui-dir="rtl"] .pg-device-static-localized{
  direction:rtl!important;
  text-align:right;
}
html[data-device-ui-dir="rtl"] .pg-phone-output-select,
html[data-device-ui-dir="rtl"] .ipad-native-output-select{
  margin-left:0!important;
  margin-right:auto!important;
}
`;
document.head.appendChild(style);

function norm(code){
  code=String(code||"EN").toUpperCase().replace(/-/g,"_");
  if(code==="ZH_HANT")return "ZH_TW";
  if(code==="ZH_CN"||code==="ZH_HANS")return "ZH";
  return code;
}
function currentCode(){
  return norm(window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():"EN");
}
function harden(code){
  code=norm(code);
  var rtl=(code==="AR"||code==="HE");
  var cjk=(code==="ZH"||code==="ZH_TW"||code==="JA"||code==="KO");
  var compact=["DE","FR","IT","PT","NL","RU","HI","BN","TR","PL","SV","NO","DA","FI","EL","HE","ID","MS","TH","VI","UK","CS","RO","HU","SK","HR","CA","AF","SW","HA","AM","FIL"].indexOf(code)>=0;
  document.documentElement.setAttribute("data-device-ui-dir",rtl?"rtl":"ltr");
  document.documentElement.setAttribute("data-device-ui-script",cjk?"cjk":"latin");
  document.documentElement.setAttribute("data-device-ui-density",compact?"compact":"normal");

  ["gallery-iphone","gallery-ipad","gallery-mac","demo"].forEach(function(id){
    var el=document.getElementById(id);
    if(el){
      el.setAttribute("lang",code.toLowerCase().replace("_","-"));
      el.setAttribute("dir",rtl?"rtl":"ltr");
    }
  });

  /* Keep Mac caption in the selected language instead of leaving an English sentence under localized UI. */
  var macLabel=document.getElementById("macTabLabel");
  var active=document.querySelector("#gallery-mac .mac-reference-tab.active span");
  if(macLabel&&active) macLabel.textContent=(active.textContent||"").trim();

  /* Never allow generated template cards to render as empty boxes. */
  var activeTemplate=document.querySelector(".pg-device-static-localized .pgdsl-tabs .active");
  var templateWord=activeTemplate?(activeTemplate.textContent||"").replace(/^[^\\p{L}\\p{N}]*/u,"").trim():"";
  document.querySelectorAll(".pg-device-static-localized .pgdsl-cards strong").forEach(function(el){
    if(!(el.textContent||"").trim()&&templateWord)el.textContent=templateWord;
  });
}

window.addEventListener("pg:languagechange",function(e){
  var code=e.detail&&e.detail.code||currentCode();
  setTimeout(function(){harden(code);},0);
  setTimeout(function(){harden(code);},120);
});
if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){harden(currentCode());},80);});
}else{
  setTimeout(function(){harden(currentCode());},80);
}
})();



/* ===== DEVICE UI FORMAT STABILITY v2 ===== */
(function(){
  function norm(code){ return String(code||"EN").toUpperCase().replace(/-/g,"_"); }
  function applyStableLayout(code){
    code=norm(code);
    var html=document.documentElement;
    var compact=["DE","FR","PT","RU","HI","BN","TR","PL","FI","EL","HE","UK","RO","HU","SK","HR","CA","AF","SW","HA","AM","FIL"].indexOf(code)>=0;
    var cjk=["ZH","ZH_TW","JA","KO"].indexOf(code)>=0;
    html.setAttribute("data-device-ui-density", compact ? "compact" : "normal");
    html.setAttribute("data-device-ui-script", cjk ? "cjk" : "latin");

    var S=(window._pgDeviceUI&&window._pgDeviceUI._strings)?window._pgDeviceUI._strings(code):null;
    var names={ZH:"模板",ZH_TW:"範本",JA:"テンプレート",KO:"템플릿",PT:"Modelos",ES:"Plantillas",FR:"Modèles",DE:"Vorlagen"};
    var label=(S&&S.templates)||names[code]||"Templates";
    document.querySelectorAll(".pg-device-static-localized[data-pg-screen='templates'] .pgdsl-cards > div").forEach(function(card,i){
      var strong=card.querySelector("strong");
      if(!strong){ strong=document.createElement("strong"); card.prepend(strong); }
      strong.textContent=label+" "+String(i+1).padStart(2,"0");
      strong.style.display="block";
      strong.style.opacity="1";
      strong.style.visibility="visible";
      strong.style.color="#eef2f7";
      var small=card.querySelector("small");
      if(small) small.style.display="none";
    });
    document.querySelectorAll(".pg-device-static-localized .pgdsl-head strong").forEach(function(el){
      el.textContent="Poly-Glot AI Workspace";
    });
  }

  var css=document.createElement("style");
  css.id="pg-device-ui-format-stability-v2";
  css.textContent=
  '.pg-device-static-localized{font-size:100%!important}'+
  '.pg-device-static-localized .pgdsl-head{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;align-items:center!important;gap:6px!important}'+
  '.pg-device-static-localized .pgdsl-head strong{font-size:clamp(6px,1vw,12px)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+
  '.pg-device-static-localized .pgdsl-tabs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important}'+
  '.pg-device-static-localized .pgdsl-tabs span{min-width:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;padding-left:2px!important;padding-right:2px!important}'+
  '.pg-device-static-localized .pgdsl-cards{align-items:stretch!important}'+
  '.pg-device-static-localized .pgdsl-cards>div{min-width:0!important;overflow:hidden!important;display:flex!important;align-items:flex-start!important;justify-content:center!important}'+
  '.pg-device-static-localized .pgdsl-cards strong{display:block!important;opacity:1!important;visibility:visible!important;color:#eef2f7!important;font-size:clamp(6px,.9vw,11px)!important;line-height:1.15!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}'+
  '#gallery-iphone .pg-device-static-localized .pgdsl-body{padding:5% 5%!important}'+
  '#gallery-ipad .pg-device-static-localized .pgdsl-body{padding:4% 5%!important}'+
  'html[data-device-ui-density="compact"] #gallery-iphone .pg-device-static-localized,html[data-device-ui-density="compact"] #gallery-ipad .pg-device-static-localized{font-size:90%!important}'+
  'html[data-device-ui-density="compact"] #gallery-mac .pg-device-static-localized-mac{font-size:92%!important}'+
  'html[data-device-ui-script="cjk"] .pg-device-static-localized{font-size:96%!important}'+
  'html[data-device-ui-script="cjk"] .pgdsl-cards strong{letter-spacing:0!important;word-break:keep-all!important}'+
  '#gallery-iphone .iphone-live-preview>div:nth-child(2)>span:nth-child(2),#gallery-ipad .ipad-live-preview>div:nth-child(2)>span:nth-child(2){white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;font-size:clamp(7px,2vw,12px)!important}'+
  '#gallery-iphone .iphone-live-preview>div:nth-child(3),#gallery-ipad .ipad-live-preview>div:nth-child(3){display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important}'+
  '#gallery-iphone .iphone-live-preview>div:nth-child(3)>span,#gallery-ipad .ipad-live-preview>div:nth-child(3)>span{min-width:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}';
  document.head.appendChild(css);

  window.addEventListener("pg:languagechange",function(e){setTimeout(function(){applyStableLayout(e.detail&&e.detail.code||"EN");},20);});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){applyStableLayout(window._pgI18n?window._pgI18n.curLang():"EN");},50);});
  else setTimeout(function(){applyStableLayout(window._pgI18n?window._pgI18n.curLang():"EN");},50);
  window._pgDeviceStableLayout=applyStableLayout;
})();


/* ===== DEVICE UI LOCALIZATION + RESPONSIVE FORMAT v3 ===== */
(function(){
"use strict";

function code(){
  return window._pgI18n&&window._pgI18n.curLang ? window._pgI18n.curLang() : "EN";
}
function norm(v){ return String(v||"EN").toUpperCase().replace(/-/g,"_"); }
function meta(c){
  c=norm(c);
  var list=(window._pgDeviceUI&&window._pgDeviceUI.appLanguages)||[];
  return list.find(function(x){return norm(x.code)===c;}) || {code:c,name:"English",flag:"🇺🇸"};
}
function strings(c){
  return window._pgDeviceUI&&window._pgDeviceUI._strings ? window._pgDeviceUI._strings(c) : {};
}
function setText(root,sel,value){
  if(!root||!value)return;
  root.querySelectorAll(sel).forEach(function(el){el.textContent=value;});
}
function setTab(root,idx,value){
  if(!root||!value)return;
  root.querySelectorAll(".demo-ask-tabs").forEach(function(tabs){
    var span=tabs.children[idx];
    if(span){
      var icon=["✏️","📋","ℹ️","🕐"][idx]||"";
      span.textContent=icon+" "+value;
    }
  });
}

/* Explicitly localize live device demos, including clones created after the language switch. */
function localizeLiveDemo(root,c){
  if(!root)return;
  var S=strings(c), M=meta(c);
  var ask=S.ask||"Ask Any AI";
  var templates=S.templates||"Templates";
  var how=S.how||"How to Use";
  var history=S.history||"History";

  setTab(root,0,ask);
  setTab(root,1,templates);
  setTab(root,2,how);
  setTab(root,3,history);

  setText(root,".demo-ask-heading",ask);
  setText(root,".pg-phone-how-link",S.howWorks||"How it works");
  setText(root,".pg-phone-output-label",S.outputLabel||"AI will respond in:");
  setText(root,".pg-phone-demo-send",S.send||"Send");
  setText(root,".pg-phone-demo-clear","🗑 "+(S.clearAll||"Clear All"));

  root.querySelectorAll(".demo-ask-description").forEach(function(desc){
    var lines=desc.children;
    if(lines[0]) lines[0].textContent="✏️ "+(S.typeLine||"Type, paste, import or talk");
    if(lines[1]) lines[1].textContent="🏳️ "+(S.appLang||"App Language")+" ⬆️ "+(S.changesMenus||"changes menus & templates");
    if(lines[2]) lines[2].textContent="🌐 "+(S.outputLang||"Output Language")+" ⬇️ "+(S.responds||"AI responds in this language");
    if(lines[3]) lines[3].textContent="🔀 "+(S.compare||"Compare Mode")+": "+(S.compareHelp||"send to multiple AIs");
  });

  root.querySelectorAll(".pg-phone-output-select").forEach(function(sel){
    var spans=sel.querySelectorAll("span");
    if(spans[0])spans[0].textContent=M.flag;
    var strong=sel.querySelector("strong");
    if(strong)strong.textContent=M.name;
  });

  root.querySelectorAll(".demo-phone-screen-ask > div:nth-child(2) > span:last-child").forEach(function(b){
    b.textContent=M.flag+" "+M.code.replace("_","-");
  });

  var menu=root.querySelector("#demoAIMenu");
  if(menu){
    var title=menu.children[1]; if(title) title.textContent=S.compareSelect||"Select AIs to compare";
    var cmp=menu.children[2]&&menu.children[2].querySelector("span"); if(cmp) cmp.textContent="🔀 "+(S.compare||"Compare Mode");
    var send=menu.querySelector("#demoSendAll");
    if(send){
      var cnt=menu.querySelector("#demoCmpCount");
      var n=cnt?cnt.textContent:"0";
      send.innerHTML=(S.compareSend||"Send to Selected")+' (<span id="demoCmpCount">'+n+'</span>)';
    }
  }

  root.setAttribute("lang",norm(c).toLowerCase().replace("_","-"));
  root.setAttribute("dir",(norm(c)==="AR"||norm(c)==="HE")?"rtl":"ltr");
}


function localizeDuo(c){
  var root=document.getElementById("iphone-duo");
  if(!root)return;
  c=norm(c);
  var S=strings(c), M=meta(c);

  // The localized HTML device is the source of truth once a non-English language is selected.
  var staticImg=root.querySelector(".duo-static-en");
  var live=root.querySelector(".duo-localized-device");
  if(staticImg) staticImg.style.display=(c==="EN")?"block":"none";
  if(live) live.style.display="grid";

  // Language badge.
  root.querySelectorAll(".duo-lang-badge").forEach(function(el){
    el.textContent=M.flag+" "+M.code.replace("_","-");
  });

  // Left screen: app nav + Compare Mode workflow.
  var tab=root.querySelector(".duo-screen.left .tabline");
  if(tab) tab.textContent="✏️ "+(S.ask||"Ask Any AI");

  var cmpTitle=root.querySelector(".duo-screen.left h3");
  if(cmpTitle) cmpTitle.textContent="🔀 "+(S.compare||"Compare Mode");

  var muted=root.querySelector(".duo-screen.left h3 + .muted");
  if(muted) muted.textContent=S.compareSelect||S.compareHelp||"Select AIs to compare";

  var prompt=root.querySelector(".duo-screen.left .prompt");
  if(prompt){
    var prompts={
      EN:"Explain quantum computing in simple terms.",
      ES:"Explica la computación cuántica en términos sencillos.",
      FR:"Explique l’informatique quantique en termes simples.",
      DE:"Erkläre Quantencomputing in einfachen Worten.",
      IT:"Spiega il calcolo quantistico in termini semplici.",
      PT:"Explique computação quântica em termos simples.",
      NL:"Leg quantumcomputing in eenvoudige woorden uit.",
      RU:"Объясни квантовые вычисления простыми словами.",
      ZH:"用简单的语言解释量子计算。",
      ZH_TW:"用簡單的語言解釋量子運算。",
      JA:"量子コンピューティングを簡単に説明してください。",
      KO:"양자 컴퓨팅을 쉽게 설명해 주세요.",
      AR:"اشرح الحوسبة الكمية ببساطة.",
      HI:"क्वांटम कंप्यूटिंग को सरल शब्दों में समझाएँ।",
      TR:"Kuantum bilişimi basitçe açıkla.",
      PL:"Wyjaśnij komputery kwantowe prostymi słowami.",
      UK:"Поясни квантові обчислення простими словами."
    };
    prompt.textContent=prompts[c]||prompt.getAttribute("data-en")||prompt.textContent;
    if(!prompt.getAttribute("data-en")) prompt.setAttribute("data-en","Explain quantum computing in simple terms.");
  }

  var send=root.querySelector(".duo-send");
  if(send) send.textContent=S.compareSend||"Send to Selected";

  // Right screen: response card and actions.
  var responseLabel=root.querySelector(".duo-response-head .muted");
  if(responseLabel){
    var responseWords={
      EN:"Response",ES:"Respuesta",FR:"Réponse",DE:"Antwort",IT:"Risposta",PT:"Resposta",
      NL:"Antwoord",RU:"Ответ",ZH:"回答",ZH_TW:"回覆",JA:"回答",KO:"응답",AR:"الرد",
      HI:"उत्तर",TR:"Yanıt",PL:"Odpowiedź",UK:"Відповідь"
    };
    responseLabel.textContent=responseWords[c]||"Response";
  }

  var paras=root.querySelectorAll(".duo-response p");
  if(paras[0]){
    var p1={
      EN:"Quantum computing is a new kind of computing that uses quantum bits to solve some problems differently from classical computers.",
      ES:"La computación cuántica usa bits cuánticos para resolver algunos problemas de forma distinta a las computadoras clásicas.",
      FR:"L’informatique quantique utilise des bits quantiques pour résoudre certains problèmes différemment des ordinateurs classiques.",
      DE:"Quantencomputer verwenden Quantenbits, um bestimmte Probleme anders zu lösen als klassische Computer.",
      IT:"Il calcolo quantistico usa bit quantistici per risolvere alcuni problemi in modo diverso dai computer classici.",
      PT:"A computação quântica usa bits quânticos para resolver alguns problemas de forma diferente dos computadores clássicos.",
      RU:"Квантовые вычисления используют квантовые биты, чтобы решать некоторые задачи иначе, чем классические компьютеры.",
      ZH:"量子计算使用量子比特，以不同于传统计算机的方式解决某些问题。",
      ZH_TW:"量子運算使用量子位元，以不同於傳統電腦的方式解決某些問題。",
      JA:"量子コンピューティングは量子ビットを使い、従来のコンピューターとは異なる方法で一部の問題を解きます。",
      KO:"양자 컴퓨팅은 양자 비트를 사용해 일부 문제를 기존 컴퓨터와 다른 방식으로 해결합니다。",
      AR:"تستخدم الحوسبة الكمية البتات الكمية لحل بعض المشكلات بطريقة مختلفة عن الحواسيب التقليدية."
    };
    paras[0].textContent=p1[c]||p1.EN;
  }
  if(paras[1]){
    var p2={
      EN:"Compare this answer with the other selected AI responses side by side.",
      ES:"Compara esta respuesta con las otras respuestas de IA seleccionadas, una al lado de la otra.",
      FR:"Comparez cette réponse côte à côte avec les autres réponses d’IA sélectionnées.",
      DE:"Vergleiche diese Antwort direkt mit den anderen ausgewählten KI-Antworten.",
      IT:"Confronta questa risposta con le altre risposte IA selezionate, affiancate.",
      PT:"Compare esta resposta lado a lado com as outras respostas de IA selecionadas.",
      RU:"Сравните этот ответ рядом с ответами других выбранных ИИ.",
      ZH:"将此回答与其他已选 AI 的回答并排比较。",
      ZH_TW:"將此回覆與其他已選 AI 的回覆並排比較。",
      JA:"この回答を、選択した他のAIの回答と並べて比較できます。",
      KO:"이 답변을 선택한 다른 AI의 답변과 나란히 비교하세요.",
      AR:"قارن هذه الإجابة جنبًا إلى جنب مع إجابات الذكاء الاصطناعي الأخرى المحددة."
    };
    paras[1].textContent=p2[c]||p2.EN;
  }

  var actions=root.querySelectorAll(".duo-actions span");
  var actionSets={
    EN:["Copy","Read","Share","Save"],ES:["Copiar","Leer","Compartir","Guardar"],FR:["Copier","Lire","Partager","Enregistrer"],
    DE:["Kopieren","Lesen","Teilen","Sichern"],IT:["Copia","Leggi","Condividi","Salva"],PT:["Copiar","Ler","Compartilhar","Salvar"],
    RU:["Копировать","Читать","Поделиться","Сохранить"],ZH:["复制","朗读","分享","保存"],ZH_TW:["複製","朗讀","分享","儲存"],
    JA:["コピー","読み上げ","共有","保存"],KO:["복사","읽기","공유","저장"],AR:["نسخ","قراءة","مشاركة","حفظ"]
  };
  var aa=actionSets[c]||actionSets.EN;
  actions.forEach(function(el,i){if(aa[i])el.textContent=aa[i];});

  root.setAttribute("lang",c.toLowerCase().replace("_","-"));
  root.setAttribute("dir",(c==="AR"||c==="HE")?"rtl":"ltr");
}

function applyAll(c){
  c=norm(c);
  var roots=[
    document.getElementById("demo"),
    document.getElementById("gallery-iphone"),
    document.getElementById("gallery-ipad"),
    document.getElementById("gallery-mac"),
    document.getElementById("iphone-duo"),
    document.querySelector(".hero-phone-mock"),
    document.getElementById("pgLightboxClone")
  ].filter(Boolean);
  roots.forEach(function(r){
    if(window._pgDeviceUI&&window._pgDeviceUI.apply) {
      /* main apply handles gallery + generated static panels */
    }
    localizeLiveDemo(r,c);
  });
  localizeDuo(c);
  document.documentElement.setAttribute("data-device-ui-lang",c);
}

/* One layout system for long translations and CJK/RTL scripts. */
var st=document.createElement("style");
st.id="pg-device-ui-responsive-v3";
st.textContent=`
/* Header brand never wraps or pushes the language badge out. */
#demo .demo-phone-screen-ask>div:nth-child(2),
#pgLightboxClone .demo-phone-screen-ask>div:nth-child(2),
#gallery-iphone .iphone-live-preview>div:nth-child(2),
#gallery-ipad .ipad-live-preview>div:nth-child(2){
  display:grid!important;
  grid-template-columns:auto minmax(0,1fr) auto!important;
  align-items:center!important;
  min-width:0!important;
}
#demo .demo-phone-screen-ask>div:nth-child(2)>div,
#pgLightboxClone .demo-phone-screen-ask>div:nth-child(2)>div{
  min-width:0!important;
}
#demo .demo-phone-screen-ask>div:nth-child(2)>div>div:first-child,
#pgLightboxClone .demo-phone-screen-ask>div:nth-child(2)>div>div:first-child{
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}

/* Tabs always remain a single proportional row. */
#demo .demo-ask-tabs,
#pgLightboxClone .demo-ask-tabs,
#gallery-iphone .iphone-live-preview>div:nth-child(3),
#gallery-ipad .ipad-live-preview>div:nth-child(3),
.pg-device-static-localized .pgdsl-tabs{
  display:grid!important;
  grid-template-columns:repeat(4,minmax(0,1fr))!important;
  gap:0!important;
  width:100%!important;
  min-width:0!important;
}
#demo .demo-ask-tabs>span,
#pgLightboxClone .demo-ask-tabs>span,
#gallery-iphone .iphone-live-preview>div:nth-child(3)>span,
#gallery-ipad .ipad-live-preview>div:nth-child(3)>span,
.pg-device-static-localized .pgdsl-tabs>span{
  min-width:0!important;
  max-width:100%!important;
  padding-left:3px!important;
  padding-right:3px!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  text-align:center!important;
  line-height:1.1!important;
}

/* Ask screen scales by available space instead of clipping translated strings. */
#demo .demo-ask-content,
#pgLightboxClone .demo-ask-content{
  min-height:0!important;
  overflow:hidden!important;
}
#demo .demo-ask-heading,
#pgLightboxClone .demo-ask-heading{
  flex:0 0 auto!important;
  white-space:normal!important;
  overflow-wrap:anywhere!important;
  line-height:1.1!important;
}
#demo .demo-ask-description,
#pgLightboxClone .demo-ask-description{
  flex:0 0 auto!important;
  min-width:0!important;
  overflow:hidden!important;
}
#demo .demo-ask-description>div,
#pgLightboxClone .demo-ask-description>div{
  white-space:normal!important;
  overflow-wrap:anywhere!important;
  line-height:1.22!important;
}
#demo .demo-output-language,
#pgLightboxClone .demo-output-language{
  min-width:0!important;
  flex:0 0 auto!important;
}
#demo .pg-phone-output-label,
#pgLightboxClone .pg-phone-output-label{
  min-width:0!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  white-space:nowrap!important;
}
#demo .pg-phone-output-select,
#pgLightboxClone .pg-phone-output-select{
  min-width:0!important;
  max-width:62%!important;
}
#demo .pg-phone-output-select strong,
#pgLightboxClone .pg-phone-output-select strong{
  min-width:0!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}

/* Prompt text may wrap, but never gets cut mid-line. */
#demo #demoTextarea,
#pgLightboxClone #demoTextarea{
  min-height:88px!important;
  height:auto!important;
  max-height:128px!important;
  overflow:hidden!important;
  white-space:normal!important;
  overflow-wrap:anywhere!important;
  word-break:normal!important;
  line-height:1.42!important;
}

/* Long-language density keeps the same device geometry. */
html[data-device-ui-lang="DE"] #demo .demo-ask-content,
html[data-device-ui-lang="FR"] #demo .demo-ask-content,
html[data-device-ui-lang="IT"] #demo .demo-ask-content,
html[data-device-ui-lang="PT"] #demo .demo-ask-content,
html[data-device-ui-lang="RU"] #demo .demo-ask-content,
html[data-device-ui-lang="HI"] #demo .demo-ask-content,
html[data-device-ui-lang="BN"] #demo .demo-ask-content,
html[data-device-ui-lang="AR"] #demo .demo-ask-content,
html[data-device-ui-lang="HE"] #demo .demo-ask-content{
  font-size:92%!important;
}
html[data-device-ui-lang="ZH"] #demo .demo-ask-content,
html[data-device-ui-lang="ZH_TW"] #demo .demo-ask-content,
html[data-device-ui-lang="JA"] #demo .demo-ask-content,
html[data-device-ui-lang="KO"] #demo .demo-ask-content{
  font-size:95%!important;
}

/* Generated localized template cards always contain visible text. */
.pg-device-static-localized .pgdsl-cards>div{
  min-width:0!important;
  overflow:hidden!important;
  padding:5%!important;
}
.pg-device-static-localized .pgdsl-cards strong{
  display:block!important;
  max-width:100%!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
`;
st.textContent += `
/* Localized iPhone Duo UI stays proportional across languages. */
#iphone-duo .duo-localized-device{min-width:0!important}
#iphone-duo .duo-ui,#iphone-duo .duo-response{min-width:0!important;overflow:hidden!important}
#iphone-duo .duo-ui .topline{
  display:grid!important;
  grid-template-columns:auto minmax(0,1fr) auto!important;
  align-items:center!important;
  min-width:0!important;
}
#iphone-duo .duo-ui .brand{
  white-space:nowrap!important;
  overflow:hidden!important;
  text-overflow:ellipsis!important;
}
#iphone-duo .duo-lang-badge{white-space:nowrap!important}
#iphone-duo .tabline,
#iphone-duo .duo-ui h3,
#iphone-duo .duo-ui .muted,
#iphone-duo .duo-send,
#iphone-duo .duo-response,
#iphone-duo .duo-actions span{
  overflow-wrap:anywhere!important;
}
html[data-device-ui-density="compact"] #iphone-duo .duo-ui,
html[data-device-ui-density="compact"] #iphone-duo .duo-response{font-size:92%!important}
html[data-device-ui-script="cjk"] #iphone-duo .duo-ui,
html[data-device-ui-script="cjk"] #iphone-duo .duo-response{font-size:95%!important;letter-spacing:0!important}
html[data-device-ui-dir="rtl"] #iphone-duo .duo-localized-device{direction:rtl!important}
`;
document.head.appendChild(st);

window.addEventListener("pg:languagechange",function(e){
  var c=e.detail&&e.detail.code||code();
  setTimeout(function(){applyAll(c);},0);
  setTimeout(function(){applyAll(c);},80);
  setTimeout(function(){applyAll(c);},250);
});

/* Catch dynamically created zoom/lightbox clones and re-localize them immediately. */
var mo=new MutationObserver(function(muts){
  var relevant=muts.some(function(m){return m.addedNodes&&m.addedNodes.length;});
  if(relevant)setTimeout(function(){applyAll(code());},20);
});
mo.observe(document.body,{childList:true,subtree:true});

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){applyAll(code());},100);});
}else{
  setTimeout(function(){applyAll(code());},100);
}
window._pgDeviceUILocalizeV3=applyAll;
})();

