
/**
 * Clean device UI localization runtime.
 * Rebuilt from the app/site localization dictionaries.
 */
(function(){
"use strict";
var APP_LANGS=[
{"code":"EN","name":"English","flag":"🇺🇸"},
{"code":"ES","name":"Spanish","flag":"🇪🇸"},
{"code":"FR","name":"French","flag":"🇫🇷"},
{"code":"DE","name":"German","flag":"🇩🇪"},
{"code":"IT","name":"Italian","flag":"🇮🇹"},
{"code":"PT","name":"Portuguese","flag":"🇧🇷"},
{"code":"NL","name":"Dutch","flag":"🇳🇱"},
{"code":"RU","name":"Russian","flag":"🇷🇺"},
{"code":"ZH","name":"Chinese (Simplified)","flag":"🇨🇳"},
{"code":"ZH_TW","name":"Chinese (Traditional)","flag":"🇹🇼"},
{"code":"JA","name":"Japanese","flag":"🇯🇵"},
{"code":"KO","name":"Korean","flag":"🇰🇷"},
{"code":"AR","name":"Arabic","flag":"🇸🇦"},
{"code":"HI","name":"Hindi","flag":"🇮🇳"},
{"code":"BN","name":"Bengali","flag":"🇧🇩"},
{"code":"TR","name":"Turkish","flag":"🇹🇷"},
{"code":"PL","name":"Polish","flag":"🇵🇱"},
{"code":"SV","name":"Swedish","flag":"🇸🇪"},
{"code":"NO","name":"Norwegian","flag":"🇳🇴"},
{"code":"DA","name":"Danish","flag":"🇩🇰"},
{"code":"FI","name":"Finnish","flag":"🇫🇮"},
{"code":"EL","name":"Greek","flag":"🇬🇷"},
{"code":"HE","name":"Hebrew","flag":"🇮🇱"},
{"code":"ID","name":"Indonesian","flag":"🇮🇩"},
{"code":"MS","name":"Malay","flag":"🇲🇾"},
{"code":"TH","name":"Thai","flag":"🇹🇭"},
{"code":"VI","name":"Vietnamese","flag":"🇻🇳"},
{"code":"UK","name":"Ukrainian","flag":"🇺🇦"},
{"code":"CS","name":"Czech","flag":"🇨🇿"},
{"code":"RO","name":"Romanian","flag":"🇷🇴"},
{"code":"HU","name":"Hungarian","flag":"🇭🇺"},
{"code":"SK","name":"Slovak","flag":"🇸🇰"},
{"code":"HR","name":"Croatian","flag":"🇭🇷"},
{"code":"CA","name":"Catalan","flag":"🇪🇸"},
{"code":"AF","name":"Afrikaans","flag":"🇿🇦"},
{"code":"SW","name":"Swahili","flag":"🇰🇪"},
{"code":"HA","name":"Hausa","flag":"🇳🇬"},
{"code":"AM","name":"Amharic","flag":"🇪🇹"},];
var CORE={"EN":{"ask":"Ask Any AI","templates":"Templates","compare":"Compare Mode","compareSend":"Send to Selected","send":"Send","copy":"Copy","outputLabel":"AI will respond in:","search":"Search templates…","empty":"Type or speak your prompt first."},"ES":{"ask":"Pregunta a cualquier IA","templates":"Plantillas","compare":"Modo Comparar","compareSend":"Enviar a seleccionados","send":"Enviar","copy":"Copiar","outputLabel":"La IA responderá en:","search":"Buscar plantillas…","empty":"Escribe o habla tu prompt primero."},"FR":{"ask":"Demandez à n'importe quelle IA","templates":"Modèles","compare":"Mode Comparaison","compareSend":"Envoyer aux sélectionnés","send":"Envoyer","copy":"Copier","outputLabel":"L'IA répondra en:","search":"Rechercher des modèles…","empty":"Tapez ou parlez votre prompt d'abord."},"DE":{"ask":"Frag jede KI","templates":"Vorlagen","compare":"Vergleichsmodus","compareSend":"An Ausgewählte senden","send":"Senden","copy":"Kopieren","outputLabel":"KI antwortet auf:","search":"Vorlagen suchen…","empty":"Tippe oder sprich deinen Prompt zuerst."},"IT":{"ask":"Chiedi a qualsiasi IA","templates":"Modelli","compare":"Modalità Confronto","compareSend":"Invia ai selezionati","send":"Invia","copy":"Copia","outputLabel":"L'IA risponderà in:","search":"Cerca modelli…","empty":"Scrivi o parla il tuo prompt prima."},"PT":{"ask":"Pergunte a qualquer IA","templates":"Modelos","compare":"Modo Comparação","compareSend":"Enviar para selecionados","send":"Enviar","copy":"Copiar","outputLabel":"A IA responderá em:","search":"Pesquisar modelos…","empty":"Digite ou fale seu prompt primeiro."},"NL":{"ask":"Vraag het aan elke AI","templates":"Sjablonen","compare":"Vergelijkingsmodus","compareSend":"Naar geselecteerde sturen","send":"Versturen","copy":"Kopiëren","outputLabel":"AI antwoordt in:","search":"Sjablonen zoeken…","empty":"Typ of spreek je prompt eerst."},"RU":{"ask":"Спросите любой ИИ","templates":"Шаблоны","compare":"Режим сравнения","compareSend":"Отправить выбранным","send":"Отправить","copy":"Копировать","outputLabel":"ИИ ответит на:","search":"Поиск шаблонов…","empty":"Сначала напишите или произнесите запрос."},"ZH":{"ask":"问任何AI","templates":"模板","compare":"对比模式","compareSend":"发送到已选","send":"发送","copy":"复制","outputLabel":"AI将用以下语言回复：","search":"搜索模板…","empty":"请先输入或说出你的提示词。"},"ZH_TW":{"ask":"問任何AI","templates":"範本","compare":"對比模式","compareSend":"傳送到已選","send":"傳送","copy":"複製","outputLabel":"AI將用以下語言回覆：","search":"搜尋範本…","empty":"請先輸入或說出你的提示詞。"},"JA":{"ask":"どのAIにも聞ける","templates":"テンプレート","compare":"比較モード","compareSend":"選択したAIに送信","send":"送信","copy":"コピー","outputLabel":"AIの回答言語：","search":"テンプレートを検索…","empty":"先にプロンプトを入力または話してください。"},"KO":{"ask":"아무 AI에게 물어봐","templates":"템플릿","compare":"비교 모드","compareSend":"선택한 AI로 전송","send":"보내기","copy":"복사","outputLabel":"AI 응답 언어:","search":"템플릿 검색…","empty":"먼저 프롬프트를 입력하거나 말하세요."},"AR":{"ask":"اسأل أي ذكاء اصطناعي","templates":"القوالب","compare":"وضع المقارنة","compareSend":"إرسال إلى المحدد","send":"إرسال","copy":"نسخ","outputLabel":"سيرد الذكاء الاصطناعي بـ:","search":"ابحث في القوالب…","empty":"اكتب أو تحدث طلبك أولاً."},"HI":{"ask":"किसी भी AI से पूछें","templates":"टेम्पलेट्स","compare":"तुलना मोड","compareSend":"चयनित को भेजें","send":"भेजें","copy":"कॉपी","outputLabel":"AI इस भाषा में जवाब देगा:","search":"टेम्पलेट खोजें…","empty":"पहले अपना प्रॉम्प्ट टाइप करें या बोलें।"},"BN":{"ask":"যেকোনো AI কে জিজ্ঞাসা করুন","templates":"টেমপ্লেট","compare":"তুলনা মোড","compareSend":"নির্বাচিতদের পাঠান","send":"পাঠান","copy":"কপি","outputLabel":"AI এই ভাষায় উত্তর দেবে:","search":"টেমপ্লেট খুঁজুন…","empty":"প্রথমে আপনার প্রম্পট লিখুন বা বলুন।"},"TR":{"ask":"Herhangi bir Yapay Zekaya Sor","templates":"Şablonlar","compare":"Karşılaştırma Modu","compareSend":"Seçilenlere Gönder","send":"Gönder","copy":"Kopyala","outputLabel":"Yapay zekâ şu dilde yanıt verecek:","search":"Şablon ara…","empty":"Önce isteminizi yazın veya söyleyin."},"PL":{"ask":"Zapytaj dowolne AI","templates":"Szablony","compare":"Tryb porównania","compareSend":"Wyślij do wybranych","send":"Wyślij","copy":"Kopiuj","outputLabel":"AI odpowie w języku:","search":"Szukaj szablonów…","empty":"Najpierw wpisz lub wypowiedz polecenie."},"SV":{"ask":"Fråga vilken AI som helst","templates":"Mallar","compare":"Jämförelseläge","compareSend":"Skicka till valda","send":"Skicka","copy":"Kopiera","outputLabel":"AI svarar på:","search":"Sök mallar…","empty":"Skriv eller säg din prompt först."},"NO":{"ask":"Spør hvilken som helst AI","templates":"Maler","compare":"Sammenligningsmodus","compareSend":"Send til valgte","send":"Send","copy":"Kopier","outputLabel":"KI svarer på:","search":"Søk i maler…","empty":"Skriv eller si forespørselen din først."},"DA":{"ask":"Spørg enhver AI","templates":"Skabeloner","compare":"Sammenligningstilstand","compareSend":"Send til valgte","send":"Send","copy":"Kopiér","outputLabel":"AI svarer på:","search":"Søg i skabeloner…","empty":"Skriv eller sig din prompt först."},"FI":{"ask":"Kysy miltä tahansa tekoälyltä","templates":"Mallit","compare":"Vertailutila","compareSend":"Lähetä valituille","send":"Lähetä","copy":"Kopioi","outputLabel":"Tekoäly vastaa kielellä:","search":"Hae malleja…","empty":"Kirjoita tai sano kehotteesi ensin."},"EL":{"ask":"Ρωτήστε οποιοδήποτε AI","templates":"Πρότυπα","compare":"Λειτουργία σύγκρισης","compareSend":"Αποστολή στα επιλεγμένα","send":"Αποστολή","copy":"Αντιγραφή","outputLabel":"Η τεχνητή νοημοσύνη θα απαντήσει στα:","search":"Αναζήτηση προτύπων…","empty":"Πληκτρολογήστε ή πείτε πρώτα το αίτημά σας."},"HE":{"ask":"שאל כל AI","templates":"תבניות","compare":"מצב השוואה","compareSend":"שלח לנבחרים","send":"שלח","copy":"העתק","outputLabel":"הבינה המלאכותית תשיב בשפה:","search":"חיפוש תבניות…","empty":"הקלידו או אמרו תחילה את הבקשה שלכם."},"ID":{"ask":"Tanya AI Mana Saja","templates":"Template","compare":"Mode Perbandingan","compareSend":"Kirim ke yang dipilih","send":"Kirim","copy":"Salin","outputLabel":"AI akan menjawab dalam bahasa:","search":"Cari template…","empty":"Ketik atau ucapkan perintah Anda terlebih dahulu."},"MS":{"ask":"Tanya Mana-mana AI","templates":"Templat","compare":"Mod Perbandingan","compareSend":"Hantar ke yang dipilih","send":"Hantar","copy":"Salin","outputLabel":"AI akan menjawab dalam bahasa:","search":"Cari templat…","empty":"Taip atau sebut arahan anda dahulu."},"TH":{"ask":"ถามAIตัวไหนก็ได้","templates":"เทมเพลต","compare":"โหมดเปรียบเทียบ","compareSend":"ส่งไปยังที่เลือก","send":"ส่ง","copy":"คัดลอก","outputLabel":"AI จะตอบเป็นภาษา:","search":"ค้นหาเทมเพลต…","empty":"พิมพ์หรือพูดคำสั่งของคุณก่อน"},"VI":{"ask":"Hỏi bất kỳ AI nào","templates":"Mẫu","compare":"Chế độ So sánh","compareSend":"Gửi đến đã chọn","send":"Gửi","copy":"Sao chép","outputLabel":"AI sẽ trả lời bằng:","search":"Tìm mẫu…","empty":"Hãy nhập hoặc nói lời nhắc của bạn trước."},"UK":{"ask":"Запитайте будь-який ШІ","templates":"Шаблони","compare":"Режим порівняння","compareSend":"Надіслати обраним","send":"Надіслати","copy":"Копіювати","outputLabel":"ШІ відповідатиме мовою:","search":"Пошук шаблонів…","empty":"Спочатку введіть або промовте свій запит."},"CS":{"ask":"Zeptejte se jakéhokoli AI","templates":"Šablony","compare":"Režim porovnání","compareSend":"Odeslat vybraným","send":"Odeslat","copy":"Kopírovat","outputLabel":"AI odpoví v jazyce:","search":"Hledat šablony…","empty":"Nejprve napište nebo řekněte svůj požadavek."},"RO":{"ask":"Întreabă orice AI","templates":"Șabloane","compare":"Mod Comparare","compareSend":"Trimite la selectate","send":"Trimite","copy":"Copiază","outputLabel":"AI va răspunde în:","search":"Caută șabloane…","empty":"Mai întâi scrieți sau rostiți solicitarea."},"HU":{"ask":"Kérdezz bármely AI-t","templates":"Sablonok","compare":"Összehasonlító mód","compareSend":"Küldés a kiválasztottaknak","send":"Küldés","copy":"Másolás","outputLabel":"Az MI ezen a nyelven válaszol:","search":"Sablonok keresése…","empty":"Először írja be vagy mondja el a kérését."},"SK":{"ask":"Opýtajte sa akéhokoľvek AI","templates":"Šablóny","compare":"Režim porovnania","compareSend":"Odoslať vybraným","send":"Odoslať","copy":"Kopírovať","outputLabel":"AI odpovie v jazyku:","search":"Hľadať šablóny…","empty":"Najprv napíšte alebo vyslovte svoju požiadavku."},"HR":{"ask":"Pitajte bilo koji AI","templates":"Predlošci","compare":"Način usporedbe","compareSend":"Pošalji odabranima","send":"Pošalji","copy":"Kopiraj","outputLabel":"AI će odgovoriti na jeziku:","search":"Pretraži predloške…","empty":"Najprije upišite ili izgovorite svoj upit."},"CA":{"ask":"Pregunta a qualsevol IA","templates":"Plantilles","compare":"Mode Comparació","compareSend":"Envia als seleccionats","send":"Envia","copy":"Copia","outputLabel":"La IA respondrà en:","search":"Cerca plantilles…","empty":"Primer escriu o dicta la teva indicació."},"AF":{"ask":"Vra enige KI","templates":"Sjablone","compare":"Vergelykingsmodus","compareSend":"Stuur na geselekteerdes","send":"Stuur","copy":"Kopieer","outputLabel":"KI sal antwoord in:","search":"Soek sjablone…","empty":"Tik of sê eers jou versoek."},"SW":{"ask":"Uliza AI Yoyote","templates":"Violezo","compare":"Hali ya Kulinganisha","compareSend":"Tuma kwa Zilizochaguliwa","send":"Tuma","copy":"Nakili","outputLabel":"AI itajibu kwa:","search":"Tafuta violezo…","empty":"Andika au sema ombi lako kwanza."},"HA":{"ask":"Tambayi Duk Wani AI","templates":"Samfura","compare":"Yanayin Kwatantawa","compareSend":"Aika zuwa Zaɓaɓɓu","send":"Aika","copy":"Kwafi","outputLabel":"AI zai amsa da:","search":"Nemo samfura…","empty":"Rubuta ko faɗi buƙatarka da farko."},"AM":{"ask":"ማንኛውንም AI ይጠይቁ","templates":"አብነቶች","compare":"የማነጻጸር ሁነታ","compareSend":"ለተመረጡት ላክ","send":"ላክ","copy":"ቅዳ","outputLabel":"AI የሚመልሰው በ:","search":"አብነቶችን ፈልግ…","empty":"መጀመሪያ ጥያቄዎን ይጻፉ ወይም ይናገሩ።"},"FIL":{"ask":"Magtanong sa Anumang AI","templates":"Mga Template","compare":"Mode ng Paghahambing","compareSend":"Ipadala sa Napili","send":"Ipadala","copy":"Kopyahin","outputLabel":"Sasagot ang AI sa:","search":"Maghanap ng mga template…","empty":"I-type o sabihin muna ang iyong prompt."}};
var EXTRA={"EN":{"how":"How to Use","history":"History","paste":"Paste","import":"Import","scan":"Scan","talk":"Talk","clearAll":"Clear All","promptHistory":"Prompt History","recent":"Your recent prompts & favorites","all":"All","clear":"Clear","reedit":"Re-edit","howWorks":"How it works","typeLine":"Type, paste, import or talk","appLang":"App Language","outputLang":"Output Language","changesMenus":"changes menus & templates","responds":"AI responds in this language"},"ES":{"how":"Cómo usar","history":"Historial","paste":"Pegar","import":"Importar","scan":"Escanear","talk":"Hablar","clearAll":"Borrar todo","promptHistory":"Historial de prompts","recent":"Tus prompts recientes y favoritos","all":"Todos","clear":"Borrar","reedit":"Reeditar","howWorks":"Cómo funciona","typeLine":"Escribe, pega, importa o habla","appLang":"Idioma de la app","outputLang":"Idioma de salida","changesMenus":"cambia menús y plantillas","responds":"La IA responde en este idioma"},"FR":{"how":"Mode d’emploi","history":"Historique","paste":"Coller","import":"Importer","scan":"Scanner","talk":"Parler","clearAll":"Tout effacer","promptHistory":"Historique des prompts","recent":"Vos prompts récents et favoris","all":"Tous","clear":"Effacer","reedit":"Rééditer","howWorks":"Comment ça marche","typeLine":"Saisissez, collez, importez ou parlez","appLang":"Langue de l’app","outputLang":"Langue de sortie","changesMenus":"modifie les menus et modèles","responds":"L’IA répond dans cette langue"},"DE":{"how":"Anleitung","history":"Verlauf","paste":"Einfügen","import":"Importieren","scan":"Scannen","talk":"Sprechen","clearAll":"Alles löschen","promptHistory":"Prompt-Verlauf","recent":"Deine letzten Prompts & Favoriten","all":"Alle","clear":"Löschen","reedit":"Bearbeiten","howWorks":"So funktioniert’s","typeLine":"Tippen, einfügen, importieren oder sprechen","appLang":"App-Sprache","outputLang":"Ausgabesprache","changesMenus":"ändert Menüs & Vorlagen","responds":"KI antwortet in dieser Sprache"},"IT":{"how":"Come si usa","history":"Cronologia","paste":"Incolla","import":"Importa","scan":"Scansiona","talk":"Parla","clearAll":"Cancella tutto","promptHistory":"Cronologia prompt","recent":"Prompt recenti e preferiti","all":"Tutti","clear":"Cancella","reedit":"Modifica","howWorks":"Come funziona","typeLine":"Scrivi, incolla, importa o parla","appLang":"Lingua app","outputLang":"Lingua di output","changesMenus":"cambia menu e modelli","responds":"L’IA risponde in questa lingua"},"PT":{"how":"Como usar","history":"Histórico","paste":"Colar","import":"Importar","scan":"Digitalizar","talk":"Falar","clearAll":"Limpar tudo","promptHistory":"Histórico de prompts","recent":"Seus prompts recentes e favoritos","all":"Todos","clear":"Limpar","reedit":"Reeditar","howWorks":"Como funciona","typeLine":"Digite, cole, importe ou fale","appLang":"Idioma do app","outputLang":"Idioma de saída","changesMenus":"altera menus e modelos","responds":"A IA responde neste idioma"},"JA":{"how":"使い方","history":"履歴","paste":"貼り付け","import":"読み込む","scan":"スキャン","talk":"話す","clearAll":"すべて消去","promptHistory":"プロンプト履歴","recent":"最近のプロンプトとお気に入り","all":"すべて","clear":"消去","reedit":"再編集","howWorks":"使い方","typeLine":"入力・貼り付け・読み込み・音声","appLang":"アプリ言語","outputLang":"出力言語","changesMenus":"メニューとテンプレートを変更","responds":"AIはこの言語で回答"},"KO":{"how":"사용 방법","history":"기록","paste":"붙여넣기","import":"가져오기","scan":"스캔","talk":"말하기","clearAll":"모두 지우기","promptHistory":"프롬프트 기록","recent":"최근 프롬프트 및 즐겨찾기","all":"전체","clear":"지우기","reedit":"다시 편집","howWorks":"작동 방식","typeLine":"입력, 붙여넣기, 가져오기 또는 말하기","appLang":"앱 언어","outputLang":"출력 언어","changesMenus":"메뉴와 템플릿 변경","responds":"AI가 이 언어로 응답"},"ZH":{"how":"使用方法","history":"历史","paste":"粘贴","import":"导入","scan":"扫描","talk":"语音","clearAll":"全部清除","promptHistory":"提示词历史","recent":"最近的提示词和收藏","all":"全部","clear":"清除","reedit":"重新编辑","howWorks":"工作原理","typeLine":"输入、粘贴、导入或语音","appLang":"应用语言","outputLang":"输出语言","changesMenus":"更改菜单和模板","responds":"AI 用此语言回复"},"ZH_TW":{"how":"使用方法","history":"歷史","paste":"貼上","import":"匯入","scan":"掃描","talk":"語音","clearAll":"全部清除","promptHistory":"提示詞歷史","recent":"最近的提示詞與收藏","all":"全部","clear":"清除","reedit":"重新編輯","howWorks":"運作方式","typeLine":"輸入、貼上、匯入或語音","appLang":"App 語言","outputLang":"輸出語言","changesMenus":"變更選單與範本","responds":"AI 以此語言回覆"},"AR":{"how":"كيفية الاستخدام","history":"السجل","paste":"لصق","import":"استيراد","scan":"مسح","talk":"تحدث","clearAll":"مسح الكل","promptHistory":"سجل الأوامر","recent":"أوامرك الأخيرة والمفضلة","all":"الكل","clear":"مسح","reedit":"إعادة التحرير","howWorks":"كيف يعمل","typeLine":"اكتب أو الصق أو استورد أو تحدث","appLang":"لغة التطبيق","outputLang":"لغة الإخراج","changesMenus":"تغيّر القوائم والقوالب","responds":"يرد الذكاء الاصطناعي بهذه اللغة"},"HI":{"how":"कैसे उपयोग करें","history":"इतिहास","paste":"पेस्ट","import":"आयात","scan":"स्कैन","talk":"बोलें","clearAll":"सब साफ़ करें","promptHistory":"प्रॉम्प्ट इतिहास","recent":"हाल के प्रॉम्प्ट और पसंदीदा","all":"सभी","clear":"साफ़ करें","reedit":"फिर संपादित करें","howWorks":"यह कैसे काम करता है","typeLine":"टाइप, पेस्ट, आयात या बोलें","appLang":"ऐप भाषा","outputLang":"आउटपुट भाषा","changesMenus":"मेनू और टेम्पलेट बदलता है","responds":"AI इस भाषा में जवाब देता है"},
"SW":{"how":"Jinsi ya Kutumia","history":"Historia","paste":"Bandika","import":"Leta","scan":"Changanua","talk":"Ongea","clearAll":"Futa Yote","promptHistory":"Historia ya Maombi","recent":"Maombi yako ya hivi karibuni na vipendwa","all":"Zote","clear":"Futa","reedit":"Hariri tena","howWorks":"Jinsi inavyofanya kazi","typeLine":"Andika, bandika, leta au ongea","appLang":"Lugha ya Programu","outputLang":"Lugha ya Matokeo","changesMenus":"hubadilisha menyu na violezo","responds":"AI hujibu kwa lugha hii"},
"HA":{"how":"Yadda ake Amfani","history":"Tarihi","paste":"Manna","import":"Shigo da","scan":"Duba","talk":"Yi magana","clearAll":"Share Duka","promptHistory":"Tarihin Buƙatu","recent":"Buƙatunka na kwanan nan da waɗanda aka fi so","all":"Duka","clear":"Share","reedit":"Sake gyara","howWorks":"Yadda yake aiki","typeLine":"Rubuta, manna, shigo da ko yi magana","appLang":"Harshen Manhaja","outputLang":"Harshen Fitarwa","changesMenus":"yana canza menus da samfura","responds":"AI zai amsa da wannan harshe"},
"AM":{"how":"እንዴት መጠቀም እንደሚቻል","history":"ታሪክ","paste":"ለጥፍ","import":"አስገባ","scan":"ስካን","talk":"ተናገር","clearAll":"ሁሉንም አጥፋ","promptHistory":"የጥያቄ ታሪክ","recent":"የቅርብ ጊዜ ጥያቄዎች እና ተወዳጆች","all":"ሁሉም","clear":"አጥፋ","reedit":"እንደገና አርትዕ","howWorks":"እንዴት እንደሚሰራ","typeLine":"ይጻፉ፣ ይለጥፉ፣ ያስገቡ ወይም ይናገሩ","appLang":"የመተግበሪያ ቋንቋ","outputLang":"የውጤት ቋንቋ","changesMenus":"ምናሌዎችን እና አብነቶችን ይቀይራል","responds":"AI በዚህ ቋንቋ ይመልሳል"},
"FIL":{"how":"Paano Gamitin","history":"Kasaysayan","paste":"I-paste","import":"I-import","scan":"I-scan","talk":"Magsalita","clearAll":"I-clear Lahat","promptHistory":"Kasaysayan ng Prompt","recent":"Mga kamakailang prompt at paborito","all":"Lahat","clear":"I-clear","reedit":"I-edit Muli","howWorks":"Paano ito gumagana","typeLine":"Mag-type, mag-paste, mag-import o magsalita","appLang":"Wika ng App","outputLang":"Wika ng Output","changesMenus":"binabago ang mga menu at template","responds":"sasagot ang AI sa wikang ito"}};
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

var FULL_EXTRA={"NL":{"how":"Hoe te gebruiken","history":"Geschiedenis","paste":"Plakken","import":"Importeren","scan":"Scannen","talk":"Spreken","clearAll":"Alles wissen","promptHistory":"Promptgeschiedenis","recent":"Je recente prompts en favorieten","all":"Alles","clear":"Wissen","reedit":"Opnieuw bewerken","howWorks":"Hoe het werkt","typeLine":"Typ, plak, importeer of spreek","appLang":"App-taal","outputLang":"Uitvoertaal","changesMenus":"wijzigt menu's en sjablonen","responds":"AI antwoordt in deze taal"},"RU":{"how":"Как использовать","history":"История","paste":"Вставить","import":"Импорт","scan":"Сканировать","talk":"Говорить","clearAll":"Очистить всё","promptHistory":"История запросов","recent":"Недавние запросы и избранное","all":"Все","clear":"Очистить","reedit":"Редактировать","howWorks":"Как это работает","typeLine":"Введите, вставьте, импортируйте или говорите","appLang":"Язык приложения","outputLang":"Язык ответа","changesMenus":"меняет меню и шаблоны","responds":"ИИ отвечает на этом языке"},"BN":{"how":"কীভাবে ব্যবহার করবেন","history":"ইতিহাস","paste":"পেস্ট","import":"ইমপোর্ট","scan":"স্ক্যান","talk":"বলুন","clearAll":"সব মুছুন","promptHistory":"প্রম্পট ইতিহাস","recent":"আপনার সাম্প্রতিক প্রম্পট ও পছন্দেরগুলো","all":"সব","clear":"মুছুন","reedit":"আবার সম্পাদনা","howWorks":"কীভাবে কাজ করে","typeLine":"টাইপ, পেস্ট, ইমপোর্ট বা বলুন","appLang":"অ্যাপের ভাষা","outputLang":"আউটপুট ভাষা","changesMenus":"মেনু ও টেমপ্লেট বদলায়","responds":"AI এই ভাষায় উত্তর দেয়","compareHelp":"একাধিক AI-তে পাঠান","promptIntro":"হ্যালো! আপনার ভাষায় যেকোনো AI-কে যেকোনো প্রশ্ন করুন।","promptExample":"উদাহরণ: বাড়িওয়ালাকে হিটার ঠিক করতে অনুরোধ করে একটি ভদ্র ইমেইল লিখুন।"},"TR":{"how":"Nasıl Kullanılır","history":"Geçmiş","paste":"Yapıştır","import":"İçe Aktar","scan":"Tara","talk":"Konuş","clearAll":"Tümünü Temizle","promptHistory":"İstem Geçmişi","recent":"Son istemleriniz ve favorileriniz","all":"Tümü","clear":"Temizle","reedit":"Yeniden Düzenle","howWorks":"Nasıl çalışır","typeLine":"Yazın, yapıştırın, içe aktarın veya konuşun","appLang":"Uygulama Dili","outputLang":"Çıktı Dili","changesMenus":"menüleri ve şablonları değiştirir","responds":"AI bu dilde yanıt verir","compareHelp":"birden fazla AI'ya gönder","promptIntro":"Merhaba! Kendi dilinizde herhangi bir AI'ya istediğinizi sorun.","promptExample":"Örnek: Ev sahibime ısıtıcıyı tamir etmesini rica eden nazik bir e-posta yazın."},"PL":{"how":"Jak używać","history":"Historia","paste":"Wklej","import":"Importuj","scan":"Skanuj","talk":"Mów","clearAll":"Wyczyść wszystko","promptHistory":"Historia promptów","recent":"Ostatnie prompty i ulubione","all":"Wszystkie","clear":"Wyczyść","reedit":"Edytuj ponownie","howWorks":"Jak to działa","typeLine":"Pisz, wklejaj, importuj lub mów","appLang":"Język aplikacji","outputLang":"Język wyjściowy","changesMenus":"zmienia menu i szablony","responds":"AI odpowiada w tym języku","compareHelp":"wyślij do wielu AI","promptIntro":"Cześć! Zapytaj dowolne AI o cokolwiek — w swoim języku.","promptExample":"Przykład: Napisz uprzejmy e-mail do właściciela z prośbą o naprawę ogrzewania."},"SV":{"how":"Så använder du","history":"Historik","paste":"Klistra in","import":"Importera","scan":"Skanna","talk":"Tala","clearAll":"Rensa allt","promptHistory":"Prompthistorik","recent":"Dina senaste promptar och favoriter","all":"Alla","clear":"Rensa","reedit":"Redigera igen","howWorks":"Så fungerar det","typeLine":"Skriv, klistra in, importera eller tala","appLang":"Appspråk","outputLang":"Utdataspråk","changesMenus":"ändrar menyer och mallar","responds":"AI svarar på detta språk","compareHelp":"skicka till flera AI","promptIntro":"Hej! Fråga vilken AI som helst om vad som helst — på ditt språk.","promptExample":"Exempel: Skriv ett artigt mejl till min hyresvärd och be om att värmen repareras."},"NO":{"how":"Slik bruker du","history":"Historikk","paste":"Lim inn","import":"Importer","scan":"Skann","talk":"Snakk","clearAll":"Tøm alt","promptHistory":"Ledeteksthistorikk","recent":"Dine nylige ledetekster og favoritter","all":"Alle","clear":"Tøm","reedit":"Rediger på nytt","howWorks":"Slik fungerer det","typeLine":"Skriv, lim inn, importer eller snakk","appLang":"Appspråk","outputLang":"Utdataspråk","changesMenus":"endrer menyer og maler","responds":"AI svarer på dette språket","compareHelp":"send til flere AI-er","promptIntro":"Hei! Spør hvilken som helst AI om hva som helst — på ditt språk.","promptExample":"Eksempel: Skriv en høflig e-post til utleieren og be om å få reparert varmen."},"DA":{"how":"Sådan bruges den","history":"Historik","paste":"Indsæt","import":"Importér","scan":"Scan","talk":"Tal","clearAll":"Ryd alt","promptHistory":"Prompthistorik","recent":"Dine seneste prompts og favoritter","all":"Alle","clear":"Ryd","reedit":"Rediger igen","howWorks":"Sådan fungerer det","typeLine":"Skriv, indsæt, importér eller tal","appLang":"App-sprog","outputLang":"Outputsprog","changesMenus":"ændrer menuer og skabeloner","responds":"AI svarer på dette sprog","compareHelp":"send til flere AI'er","promptIntro":"Hej! Spørg enhver AI om hvad som helst — på dit sprog.","promptExample":"Eksempel: Skriv en høflig e-mail til min udlejer og bed om at få varmen repareret."},"FI":{"how":"Käyttöohje","history":"Historia","paste":"Liitä","import":"Tuo","scan":"Skannaa","talk":"Puhu","clearAll":"Tyhjennä kaikki","promptHistory":"Kehotehistoria","recent":"Viimeisimmät kehotteesi ja suosikit","all":"Kaikki","clear":"Tyhjennä","reedit":"Muokkaa uudelleen","howWorks":"Näin se toimii","typeLine":"Kirjoita, liitä, tuo tai puhu","appLang":"Sovelluksen kieli","outputLang":"Tulostuskieli","changesMenus":"muuttaa valikoita ja malleja","responds":"AI vastaa tällä kielellä","compareHelp":"lähetä usealle AI:lle","promptIntro":"Hei! Kysy miltä tahansa tekoälyltä mitä tahansa — omalla kielelläsi.","promptExample":"Esimerkki: Kirjoita kohtelias sähköposti vuokranantajalle ja pyydä korjaamaan lämmitys."},"EL":{"how":"Τρόπος χρήσης","history":"Ιστορικό","paste":"Επικόλληση","import":"Εισαγωγή","scan":"Σάρωση","talk":"Μίλα","clearAll":"Εκκαθάριση όλων","promptHistory":"Ιστορικό προτροπών","recent":"Οι πρόσφατες προτροπές και τα αγαπημένα σας","all":"Όλα","clear":"Εκκαθάριση","reedit":"Επεξεργασία ξανά","howWorks":"Πώς λειτουργεί","typeLine":"Πληκτρολογήστε, επικολλήστε, εισαγάγετε ή μιλήστε","appLang":"Γλώσσα εφαρμογής","outputLang":"Γλώσσα εξόδου","changesMenus":"αλλάζει μενού και πρότυπα","responds":"Το AI απαντά σε αυτή τη γλώσσα","compareHelp":"αποστολή σε πολλά AI","promptIntro":"Γεια! Ρωτήστε οποιοδήποτε AI οτιδήποτε — στη γλώσσα σας.","promptExample":"Παράδειγμα: Γράψτε ένα ευγενικό email στον ιδιοκτήτη ζητώντας να επισκευάσει τη θέρμανση."},"HE":{"how":"כיצד להשתמש","history":"היסטוריה","paste":"הדבק","import":"ייבוא","scan":"סריקה","talk":"דבר","clearAll":"נקה הכול","promptHistory":"היסטוריית הנחיות","recent":"ההנחיות האחרונות והמועדפות שלך","all":"הכול","clear":"נקה","reedit":"ערוך שוב","howWorks":"איך זה עובד","typeLine":"הקלד, הדבק, ייבא או דבר","appLang":"שפת האפליקציה","outputLang":"שפת הפלט","changesMenus":"משנה תפריטים ותבניות","responds":"ה-AI עונה בשפה זו","compareHelp":"שלח למספר מערכות AI","promptIntro":"שלום! שאל כל AI כל דבר — בשפה שלך.","promptExample":"דוגמה: כתוב אימייל מנומס לבעל הבית ובקש לתקן את החימום."},"ID":{"how":"Cara Menggunakan","history":"Riwayat","paste":"Tempel","import":"Impor","scan":"Pindai","talk":"Bicara","clearAll":"Hapus Semua","promptHistory":"Riwayat Prompt","recent":"Prompt terbaru dan favorit Anda","all":"Semua","clear":"Hapus","reedit":"Edit Ulang","howWorks":"Cara kerjanya","typeLine":"Ketik, tempel, impor, atau bicara","appLang":"Bahasa Aplikasi","outputLang":"Bahasa Output","changesMenus":"mengubah menu dan template","responds":"AI menjawab dalam bahasa ini","compareHelp":"kirim ke beberapa AI","promptIntro":"Halo! Tanyakan apa saja kepada AI mana pun — dalam bahasa Anda.","promptExample":"Contoh: Tulis email sopan kepada pemilik rumah untuk meminta perbaikan pemanas."},"MS":{"how":"Cara Menggunakan","history":"Sejarah","paste":"Tampal","import":"Import","scan":"Imbas","talk":"Bercakap","clearAll":"Kosongkan Semua","promptHistory":"Sejarah Prom","recent":"Prom terkini dan kegemaran anda","all":"Semua","clear":"Kosongkan","reedit":"Edit Semula","howWorks":"Cara ia berfungsi","typeLine":"Taip, tampal, import atau bercakap","appLang":"Bahasa Aplikasi","outputLang":"Bahasa Output","changesMenus":"mengubah menu dan templat","responds":"AI menjawab dalam bahasa ini","compareHelp":"hantar kepada beberapa AI","promptIntro":"Hai! Tanya mana-mana AI apa sahaja — dalam bahasa anda.","promptExample":"Contoh: Tulis e-mel sopan kepada tuan rumah untuk meminta pemanas dibaiki."},"TH":{"how":"วิธีใช้","history":"ประวัติ","paste":"วาง","import":"นำเข้า","scan":"สแกน","talk":"พูด","clearAll":"ล้างทั้งหมด","promptHistory":"ประวัติพรอมต์","recent":"พรอมต์ล่าสุดและรายการโปรดของคุณ","all":"ทั้งหมด","clear":"ล้าง","reedit":"แก้ไขอีกครั้ง","howWorks":"วิธีการทำงาน","typeLine":"พิมพ์ วาง นำเข้า หรือพูด","appLang":"ภาษาของแอป","outputLang":"ภาษาผลลัพธ์","changesMenus":"เปลี่ยนเมนูและเทมเพลต","responds":"AI ตอบเป็นภาษานี้","compareHelp":"ส่งไปยัง AI หลายตัว","promptIntro":"สวัสดี! ถาม AI ตัวไหนก็ได้ในภาษาของคุณ","promptExample":"ตัวอย่าง: เขียนอีเมลสุภาพถึงเจ้าของบ้านเพื่อขอให้ซ่อมเครื่องทำความร้อน"},"VI":{"how":"Cách sử dụng","history":"Lịch sử","paste":"Dán","import":"Nhập","scan":"Quét","talk":"Nói","clearAll":"Xóa tất cả","promptHistory":"Lịch sử lời nhắc","recent":"Lời nhắc gần đây và mục yêu thích","all":"Tất cả","clear":"Xóa","reedit":"Chỉnh sửa lại","howWorks":"Cách hoạt động","typeLine":"Nhập, dán, nhập tệp hoặc nói","appLang":"Ngôn ngữ ứng dụng","outputLang":"Ngôn ngữ đầu ra","changesMenus":"thay đổi menu và mẫu","responds":"AI trả lời bằng ngôn ngữ này","compareHelp":"gửi đến nhiều AI","promptIntro":"Xin chào! Hỏi bất kỳ AI nào bất cứ điều gì — bằng ngôn ngữ của bạn.","promptExample":"Ví dụ: Viết email lịch sự cho chủ nhà đề nghị sửa máy sưởi."},"UK":{"how":"Як користуватися","history":"Історія","paste":"Вставити","import":"Імпорт","scan":"Сканувати","talk":"Говорити","clearAll":"Очистити все","promptHistory":"Історія запитів","recent":"Останні запити та вибране","all":"Усі","clear":"Очистити","reedit":"Редагувати знову","howWorks":"Як це працює","typeLine":"Введіть, вставте, імпортуйте або говоріть","appLang":"Мова застосунку","outputLang":"Мова відповіді","changesMenus":"змінює меню та шаблони","responds":"ШІ відповідає цією мовою","compareHelp":"надіслати кільком ШІ","promptIntro":"Вітаємо! Запитайте будь-який ШІ про що завгодно — своєю мовою.","promptExample":"Приклад: Напишіть ввічливий лист орендодавцю з проханням полагодити опалення."},"CS":{"how":"Jak používat","history":"Historie","paste":"Vložit","import":"Importovat","scan":"Skenovat","talk":"Mluvit","clearAll":"Vymazat vše","promptHistory":"Historie promptů","recent":"Nedávné prompty a oblíbené","all":"Vše","clear":"Vymazat","reedit":"Znovu upravit","howWorks":"Jak to funguje","typeLine":"Pište, vložte, importujte nebo mluvte","appLang":"Jazyk aplikace","outputLang":"Jazyk výstupu","changesMenus":"mění nabídky a šablony","responds":"AI odpovídá v tomto jazyce","compareHelp":"odeslat více AI","promptIntro":"Ahoj! Zeptejte se jakéhokoli AI na cokoli — ve svém jazyce.","promptExample":"Příklad: Napište zdvořilý e-mail pronajímateli s žádostí o opravu topení."},"RO":{"how":"Cum se folosește","history":"Istoric","paste":"Lipește","import":"Importă","scan":"Scanează","talk":"Vorbește","clearAll":"Șterge tot","promptHistory":"Istoric prompturi","recent":"Prompturile recente și favoritele tale","all":"Toate","clear":"Șterge","reedit":"Editează din nou","howWorks":"Cum funcționează","typeLine":"Tastează, lipește, importă sau vorbește","appLang":"Limba aplicației","outputLang":"Limba rezultatului","changesMenus":"schimbă meniurile și șabloanele","responds":"AI răspunde în această limbă","compareHelp":"trimite către mai multe AI","promptIntro":"Salut! Întreabă orice AI orice — în limba ta.","promptExample":"Exemplu: Scrie un e-mail politicos proprietarului și cere repararea încălzirii."},"HU":{"how":"Használat","history":"Előzmények","paste":"Beillesztés","import":"Importálás","scan":"Beolvasás","talk":"Beszéd","clearAll":"Összes törlése","promptHistory":"Promptelőzmények","recent":"Legutóbbi promptok és kedvencek","all":"Összes","clear":"Törlés","reedit":"Újraszerkesztés","howWorks":"Hogyan működik","typeLine":"Írj, illessz be, importálj vagy beszélj","appLang":"Alkalmazás nyelve","outputLang":"Kimeneti nyelv","changesMenus":"módosítja a menüket és sablonokat","responds":"Az AI ezen a nyelven válaszol","compareHelp":"küldés több AI-nak","promptIntro":"Szia! Kérdezz bármit bármely AI-tól — a saját nyelveden.","promptExample":"Példa: Írj udvarias e-mailt a főbérlőnek, és kérd a fűtés megjavítását."},"SK":{"how":"Ako používať","history":"História","paste":"Vložiť","import":"Importovať","scan":"Skenovať","talk":"Hovoriť","clearAll":"Vymazať všetko","promptHistory":"História promptov","recent":"Nedávne prompty a obľúbené","all":"Všetko","clear":"Vymazať","reedit":"Upraviť znova","howWorks":"Ako to funguje","typeLine":"Píšte, vložte, importujte alebo hovorte","appLang":"Jazyk aplikácie","outputLang":"Jazyk výstupu","changesMenus":"mení ponuky a šablóny","responds":"AI odpovedá v tomto jazyku","compareHelp":"odoslať viacerým AI","promptIntro":"Ahoj! Opýtajte sa akéhokoľvek AI na čokoľvek — vo svojom jazyku.","promptExample":"Príklad: Napíšte zdvorilý e-mail prenajímateľovi so žiadosťou o opravu kúrenia."},"HR":{"how":"Kako koristiti","history":"Povijest","paste":"Zalijepi","import":"Uvezi","scan":"Skeniraj","talk":"Govori","clearAll":"Očisti sve","promptHistory":"Povijest upita","recent":"Nedavni upiti i favoriti","all":"Sve","clear":"Očisti","reedit":"Ponovno uredi","howWorks":"Kako radi","typeLine":"Upišite, zalijepite, uvezite ili govorite","appLang":"Jezik aplikacije","outputLang":"Jezik izlaza","changesMenus":"mijenja izbornike i predloške","responds":"AI odgovara na ovom jeziku","compareHelp":"pošalji više AI-ja","promptIntro":"Pozdrav! Pitajte bilo koji AI bilo što — na svom jeziku.","promptExample":"Primjer: Napišite pristojan e-mail stanodavcu i zamolite da popravi grijanje."},"CA":{"how":"Com utilitzar","history":"Historial","paste":"Enganxa","import":"Importa","scan":"Escaneja","talk":"Parla","clearAll":"Esborra-ho tot","promptHistory":"Historial de prompts","recent":"Prompts recents i preferits","all":"Tot","clear":"Esborra","reedit":"Torna a editar","howWorks":"Com funciona","typeLine":"Escriu, enganxa, importa o parla","appLang":"Idioma de l'app","outputLang":"Idioma de sortida","changesMenus":"canvia menús i plantilles","responds":"La IA respon en aquest idioma","compareHelp":"envia a diverses IA","promptIntro":"Hola! Pregunta qualsevol cosa a qualsevol IA — en el teu idioma.","promptExample":"Exemple: Escriu un correu educat al propietari demanant que repari la calefacció."},"AF":{"how":"Hoe om te gebruik","history":"Geskiedenis","paste":"Plak","import":"Voer in","scan":"Skandeer","talk":"Praat","clearAll":"Vee alles uit","promptHistory":"Promptgeskiedenis","recent":"Jou onlangse prompts en gunstelinge","all":"Alles","clear":"Vee uit","reedit":"Redigeer weer","howWorks":"Hoe dit werk","typeLine":"Tik, plak, voer in of praat","appLang":"Programtaal","outputLang":"Uitvoertaal","changesMenus":"verander spyskaarte en sjablone","responds":"AI antwoord in hierdie taal","compareHelp":"stuur na verskeie AI's","promptIntro":"Hallo! Vra enige KI enigiets — in jou taal.","promptExample":"Voorbeeld: Skryf 'n beleefde e-pos aan my verhuurder en vra dat die verwarmer herstel word."}};

var AUX={"EN":{"free":"FREE","response":"Response","read":"Read","share":"Share","save":"Save","replay":"↻ Replay Demo","fullyLocalized":"Fully Localized UI"},"ES":{"free":"GRATIS","response":"Respuesta","read":"Leer","share":"Compartir","save":"Guardar","replay":"↻ Repetir demo","fullyLocalized":"Interfaz totalmente localizada"},"FR":{"free":"GRATUIT","response":"Réponse","read":"Lire","share":"Partager","save":"Enregistrer","replay":"↻ Rejouer la démo","fullyLocalized":"Interface entièrement localisée"},"DE":{"free":"KOSTENLOS","response":"Antwort","read":"Lesen","share":"Teilen","save":"Speichern","replay":"↻ Demo wiederholen","fullyLocalized":"Vollständig lokalisierte Oberfläche"},"IT":{"free":"GRATIS","response":"Risposta","read":"Leggi","share":"Condividi","save":"Salva","replay":"↻ Ripeti demo","fullyLocalized":"Interfaccia completamente localizzata"},"PT":{"free":"GRÁTIS","response":"Resposta","read":"Ler","share":"Compartilhar","save":"Salvar","replay":"↻ Repetir demonstração","fullyLocalized":"Interface totalmente localizada"},"NL":{"free":"GRATIS","response":"Antwoord","read":"Lezen","share":"Delen","save":"Opslaan","replay":"↻ Demo opnieuw afspelen","fullyLocalized":"Volledig gelokaliseerde interface"},"RU":{"free":"БЕСПЛАТНО","response":"Ответ","read":"Читать","share":"Поделиться","save":"Сохранить","replay":"↻ Повторить демо","fullyLocalized":"Полностью локализованный интерфейс"},"ZH":{"free":"免费","response":"回答","read":"朗读","share":"分享","save":"保存","replay":"↻ 重播演示","fullyLocalized":"完全本地化界面"},"ZH_TW":{"free":"免費","response":"回覆","read":"朗讀","share":"分享","save":"儲存","replay":"↻ 重播示範","fullyLocalized":"完整在地化介面"},"JA":{"free":"無料","response":"回答","read":"読み上げ","share":"共有","save":"保存","replay":"↻ デモを再生","fullyLocalized":"完全にローカライズされたUI"},"KO":{"free":"무료","response":"응답","read":"읽기","share":"공유","save":"저장","replay":"↻ 데모 다시보기","fullyLocalized":"완전히 현지화된 UI"},"AR":{"free":"مجاني","response":"الرد","read":"قراءة","share":"مشاركة","save":"حفظ","replay":"↻ إعادة العرض","fullyLocalized":"واجهة مترجمة بالكامل"},"HI":{"free":"मुफ़्त","response":"उत्तर","read":"पढ़ें","share":"साझा करें","save":"सहेजें","replay":"↻ डेमो फिर चलाएँ","fullyLocalized":"पूरी तरह स्थानीयकृत इंटरफ़ेस"},"BN":{"free":"বিনামূল্যে","response":"উত্তর","read":"পড়ুন","share":"শেয়ার","save":"সংরক্ষণ","replay":"↻ ডেমো আবার চালান","fullyLocalized":"সম্পূর্ণ স্থানীয়কৃত ইন্টারফেস"},"TR":{"free":"ÜCRETSİZ","response":"Yanıt","read":"Oku","share":"Paylaş","save":"Kaydet","replay":"↻ Demoyu Tekrar Oynat","fullyLocalized":"Tam Yerelleştirilmiş Arayüz"},"PL":{"free":"BEZPŁATNE","response":"Odpowiedź","read":"Czytaj","share":"Udostępnij","save":"Zapisz","replay":"↻ Odtwórz demo ponownie","fullyLocalized":"W pełni zlokalizowany interfejs"},"SV":{"free":"GRATIS","response":"Svar","read":"Läs","share":"Dela","save":"Spara","replay":"↻ Spela upp demon igen","fullyLocalized":"Helt lokaliserat gränssnitt"},"NO":{"free":"GRATIS","response":"Svar","read":"Les","share":"Del","save":"Lagre","replay":"↻ Spill demoen på nytt","fullyLocalized":"Fullt lokalisert grensesnitt"},"DA":{"free":"GRATIS","response":"Svar","read":"Læs","share":"Del","save":"Gem","replay":"↻ Afspil demo igen","fullyLocalized":"Fuldt lokaliseret brugerflade"},"FI":{"free":"ILMAINEN","response":"Vastaus","read":"Lue","share":"Jaa","save":"Tallenna","replay":"↻ Toista demo uudelleen","fullyLocalized":"Täysin lokalisoitu käyttöliittymä"},"EL":{"free":"ΔΩΡΕΑΝ","response":"Απάντηση","read":"Ανάγνωση","share":"Κοινοποίηση","save":"Αποθήκευση","replay":"↻ Επανάληψη επίδειξης","fullyLocalized":"Πλήρως τοπικοποιημένη διεπαφή"},"HE":{"free":"חינם","response":"תגובה","read":"קרא","share":"שתף","save":"שמור","replay":"↻ הפעל את ההדגמה שוב","fullyLocalized":"ממשק מותאם במלואו"},"ID":{"free":"GRATIS","response":"Jawaban","read":"Baca","share":"Bagikan","save":"Simpan","replay":"↻ Putar Ulang Demo","fullyLocalized":"Antarmuka Sepenuhnya Dilokalkan"},"MS":{"free":"PERCUMA","response":"Jawapan","read":"Baca","share":"Kongsi","save":"Simpan","replay":"↻ Mainkan Semula Demo","fullyLocalized":"Antara Muka Dilokalkan Sepenuhnya"},"TH":{"free":"ฟรี","response":"คำตอบ","read":"อ่าน","share":"แชร์","save":"บันทึก","replay":"↻ เล่นเดโมอีกครั้ง","fullyLocalized":"อินเทอร์เฟซที่แปลครบถ้วน"},"VI":{"free":"MIỄN PHÍ","response":"Phản hồi","read":"Đọc","share":"Chia sẻ","save":"Lưu","replay":"↻ Phát lại bản demo","fullyLocalized":"Giao diện được bản địa hóa hoàn toàn"},"UK":{"free":"БЕЗКОШТОВНО","response":"Відповідь","read":"Читати","share":"Поділитися","save":"Зберегти","replay":"↻ Повторити демо","fullyLocalized":"Повністю локалізований інтерфейс"},"CS":{"free":"ZDARMA","response":"Odpověď","read":"Číst","share":"Sdílet","save":"Uložit","replay":"↻ Přehrát demo znovu","fullyLocalized":"Plně lokalizované rozhraní"},"RO":{"free":"GRATUIT","response":"Răspuns","read":"Citește","share":"Distribuie","save":"Salvează","replay":"↻ Redă din nou demonstrația","fullyLocalized":"Interfață complet localizată"},"HU":{"free":"INGYENES","response":"Válasz","read":"Olvasás","share":"Megosztás","save":"Mentés","replay":"↻ Demó újrajátszása","fullyLocalized":"Teljesen lokalizált felület"},"SK":{"free":"ZADARMO","response":"Odpoveď","read":"Čítať","share":"Zdieľať","save":"Uložiť","replay":"↻ Prehrať demo znova","fullyLocalized":"Plne lokalizované rozhranie"},"HR":{"free":"BESPLATNO","response":"Odgovor","read":"Čitaj","share":"Podijeli","save":"Spremi","replay":"↻ Ponovi demo","fullyLocalized":"Potpuno lokalizirano sučelje"},"CA":{"free":"GRATIS","response":"Resposta","read":"Llegeix","share":"Comparteix","save":"Desa","replay":"↻ Torna a reproduir la demo","fullyLocalized":"Interfície completament localitzada"},"AF":{"free":"GRATIS","response":"Antwoord","read":"Lees","share":"Deel","save":"Stoor","replay":"↻ Speel demo weer","fullyLocalized":"Volledig gelokaliseerde koppelvlak"},"SW":{"free":"BURE","response":"Jibu","read":"Soma","share":"Shiriki","save":"Hifadhi","replay":"↻ Cheza Demo Tena","fullyLocalized":"Kiolesura Kilichotafsiriwa Kikamilifu"},"HA":{"free":"KYAUTA","response":"Amsa","read":"Karanta","share":"Raba","save":"Ajiye","replay":"↻ Sake Kunna Demo","fullyLocalized":"Cikakken Tsarin da Aka Fassara"},"AM":{"free":"ነፃ","response":"ምላሽ","read":"አንብብ","share":"አጋራ","save":"አስቀምጥ","replay":"↻ ዴሞውን እንደገና አጫውት","fullyLocalized":"ሙሉ በሙሉ የተተረጎመ በይነገጽ"},"FIL":{"free":"LIBRE","response":"Sagot","read":"Basahin","share":"Ibahagi","save":"I-save","replay":"↻ I-replay ang Demo","fullyLocalized":"Ganap na Naka-localize na UI"}};

function norm(code){
  code=String(code||"EN").toUpperCase().replace(/-/g,"_");
  if(code==="ZH_HANT")return "ZH_TW";
  if(code==="ZH_HANS"||code==="ZH_CN")return "ZH";
  return code;
}
/* Display the active language in its own writing system, rather than in English. */
var NATIVE_LANGUAGE_NAMES={
  EN:"English",ES:"Español",FR:"Français",DE:"Deutsch",IT:"Italiano",PT:"Português",
  NL:"Nederlands",RU:"Русский",ZH:"简体中文",ZH_TW:"繁體中文",JA:"日本語",KO:"한국어",
  AR:"العربية",HI:"हिन्दी",BN:"বাংলা",TR:"Türkçe",PL:"Polski",SV:"Svenska",
  NO:"Norsk",DA:"Dansk",FI:"Suomi",EL:"Ελληνικά",HE:"עברית",ID:"Bahasa Indonesia",
  MS:"Bahasa Melayu",TH:"ไทย",VI:"Tiếng Việt",UK:"Українська",CS:"Čeština",
  RO:"Română",HU:"Magyar",SK:"Slovenčina",HR:"Hrvatski",CA:"Català",
  AF:"Afrikaans",SW:"Kiswahili",HA:"Hausa",AM:"አማርኛ",FIL:"Filipino"
};
/* Render selected language name in the selected language (not English). */
var PG_NATIVE_LANGUAGE_NAMES={"EN":"English","ES":"Español","FR":"Français","DE":"Deutsch","IT":"Italiano","PT":"Português","NL":"Nederlands","RU":"Русский","ZH":"简体中文","ZH_TW":"繁體中文","JA":"日本語","KO":"한국어","AR":"العربية","HI":"हिन्दी","BN":"বাংলা","TR":"Türkçe","PL":"Polski","SV":"Svenska","NO":"Norsk","DA":"Dansk","FI":"Suomi","EL":"Ελληνικά","HE":"עברית","ID":"Bahasa Indonesia","MS":"Bahasa Melayu","TH":"ไทย","VI":"Tiếng Việt","UK":"Українська","CS":"Čeština","RO":"Română","HU":"Magyar","SK":"Slovenčina","HR":"Hrvatski","CA":"Català","AF":"Afrikaans","SW":"Kiswahili","HA":"Hausa","AM":"አማርኛ","FIL":"Filipino"};
function localizedLanguageName(M){return PG_NATIVE_LANGUAGE_NAMES[norm(M.code)]||M.name||M.code;}
function meta(code){
  var n=norm(code),m=APP_LANGS.find(function(x){return x.code===n});
  /* Preserve existing flags and codes, localize only the visible language name. */
  return m ? {code:m.code,name:NATIVE_LANGUAGE_NAMES[n]||m.name,flag:m.flag} :
    {code:n,name:NATIVE_LANGUAGE_NAMES[n]||n,flag:"🌐"};
}
function strings(code){
  var n=norm(code),c=CORE[n]||CORE.EN,e=EXTRA[n]||EXTRA.EN,x=DEVICE_EXTRA[n]||DEVICE_EXTRA.EN;
  var out=Object.assign({},EXTRA.EN,CORE.EN,DEVICE_EXTRA.EN,e,c,x,FULL_EXTRA[n]||{},AUX[n]||{});
  var extraFallback={
    AR:{how:"طريقة الاستخدام",history:"السجل",paste:"لصق",import:"استيراد",scan:"مسح",talk:"تحدث",clearAll:"مسح الكل",howWorks:"كيف يعمل",typeLine:"اكتب، الصق، استورد، امسح أو تحدث",appLang:"لغة التطبيق",outputLang:"لغة الإخراج",changesMenus:"تغيّر القوائم والقوالب",responds:"يرد الذكاء الاصطناعي بهذه اللغة",compareHelp:"أرسل لعدة ذكاءات اصطناعية",promptIntro:"مرحبًا! اسأل أي ذكاء اصطناعي أي شيء بلغتك.",promptExample:"مثال: اكتب بريدًا مهذبًا لمالك العقار واطلب إصلاح التدفئة.",outputLabel:"سيرد الذكاء الاصطناعي بـ:",empty:"اكتب أو تحدث بطلبك أولاً."},
    HE:{how:"מדריך שימוש",history:"היסטוריה",paste:"הדבק",import:"ייבוא",scan:"סריקה",talk:"דבר",clearAll:"נקה הכל",howWorks:"איך זה עובד",typeLine:"הקלד, הדבק, יבא, סרוק או דבר",appLang:"שפת האפליקציה",outputLang:"שפת פלט",changesMenus:"משנה תפריטים ותבניות",responds:"ה-AI עונה בשפה זו",compareHelp:"שלח למספר מערכות AI",promptIntro:"שלום! שאל כל AI כל דבר — בשפה שלך.",promptExample:"דוגמה: כתוב מייל מנומס לבעל הדירה ובקש לתקן את החימום.",outputLabel:"ה-AI יענה ב:",empty:"הקלד או אמור קודם את הבקשה שלך."},
    RU:{how:"Как использовать",history:"История",paste:"Вставить",import:"Импорт",scan:"Сканировать",talk:"Говорить",clearAll:"Очистить всё",howWorks:"Как это работает",typeLine:"Введите, вставьте, импортируйте или говорите",appLang:"Язык приложения",outputLang:"Язык ответа",changesMenus:"меняет меню и шаблоны",responds:"ИИ отвечает на этом языке",all:"Все",clear:"Очистить"},
    NL:{how:"Hoe te gebruiken",history:"Geschiedenis",paste:"Plakken",import:"Importeren",scan:"Scannen",talk:"Spreken",clearAll:"Alles wissen",howWorks:"Hoe het werkt",typeLine:"Typ, plak, importeer of spreek",appLang:"App-taal",outputLang:"Uitvoertaal",changesMenus:"wijzigt menu's en sjablonen",responds:"AI antwoordt in deze taal"},
    BN:{how:"কীভাবে ব্যবহার করবেন",history:"ইতিহাস",paste:"পেস্ট",import:"ইমপোর্ট",scan:"স্ক্যান",talk:"বলুন",clearAll:"সব মুছুন"},
    TR:{how:"Nasıl Kullanılır",history:"Geçmiş",paste:"Yapıştır",import:"İçe Aktar",scan:"Tara",talk:"Konuş",clearAll:"Tümünü Temizle"},
    PL:{how:"Jak używać",history:"Historia",paste:"Wklej",import:"Importuj",scan:"Skanuj",talk:"Mów",clearAll:"Wyczyść wszystko"},
    SV:{how:"Så använder du",history:"Historik",paste:"Klistra in",import:"Importera",scan:"Skanna",talk:"Tala",clearAll:"Rensa allt"},
    NO:{how:"Slik bruker du",history:"Historikk",paste:"Lim inn",import:"Importer",scan:"Skann",talk:"Snakk",clearAll:"Tøm alt"},
    DA:{how:"Sådan bruges den",history:"Historik",paste:"Indsæt",import:"Importér",scan:"Scan",talk:"Tal",clearAll:"Ryd alt"},
    FI:{how:"Käyttöohje",history:"Historia",paste:"Liitä",import:"Tuo",scan:"Skannaa",talk:"Puhu",clearAll:"Tyhjennä kaikki"},
    EL:{how:"Τρόπος χρήσης",history:"Ιστορικό",paste:"Επικόλληση",import:"Εισαγωγή",scan:"Σάρωση",talk:"Μίλα",clearAll:"Εκκαθάριση όλων"},
    HE:{how:"כיצד להשתמש",history:"היסטוריה",paste:"הדבק",import:"ייבוא",scan:"סריקה",talk:"דבר",clearAll:"נקה הכול"},
    ID:{how:"Cara Menggunakan",history:"Riwayat",paste:"Tempel",import:"Impor",scan:"Pindai",talk:"Bicara",clearAll:"Hapus Semua"},
    MS:{how:"Cara Menggunakan",history:"Sejarah",paste:"Tampal",import:"Import",scan:"Imbas",talk:"Bercakap",clearAll:"Kosongkan Semua"},
    TH:{how:"วิธีใช้",history:"ประวัติ",paste:"วาง",import:"นำเข้า",scan:"สแกน",talk:"พูด",clearAll:"ล้างทั้งหมด"},
    VI:{how:"Cách sử dụng",history:"Lịch sử",paste:"Dán",import:"Nhập",scan:"Quét",talk:"Nói",clearAll:"Xóa tất cả"},
    UK:{how:"Як користуватися",history:"Історія",paste:"Вставити",import:"Імпорт",scan:"Сканувати",talk:"Говорити",clearAll:"Очистити все"},
    CS:{how:"Jak používat",history:"Historie",paste:"Vložit",import:"Importovat",scan:"Skenovat",talk:"Mluvit",clearAll:"Vymazat vše"},
    RO:{how:"Cum se folosește",history:"Istoric",paste:"Lipește",import:"Importă",scan:"Scanează",talk:"Vorbește",clearAll:"Șterge tot"},
    HU:{how:"Használat",history:"Előzmények",paste:"Beillesztés",import:"Importálás",scan:"Beolvasás",talk:"Beszéd",clearAll:"Összes törlése"},
    SK:{how:"Ako používať",history:"História",paste:"Vložiť",import:"Importovať",scan:"Skenovať",talk:"Hovoriť",clearAll:"Vymazať všetko"},
    HR:{how:"Kako koristiti",history:"Povijest",paste:"Zalijepi",import:"Uvezi",scan:"Skeniraj",talk:"Govori",clearAll:"Očisti sve"},
    CA:{how:"Com utilitzar",history:"Historial",paste:"Enganxa",import:"Importa",scan:"Escaneja",talk:"Parla",clearAll:"Esborra-ho tot"},
    AF:{how:"Hoe om te gebruik",history:"Geskiedenis",paste:"Plak",import:"Voer in",scan:"Skandeer",talk:"Praat",clearAll:"Vee alles uit"}
  };
  if(extraFallback[n])out=Object.assign(out,extraFallback[n]);
  out.compareSelect=out.compareSelect||"Select AIs to compare";
  return out;
}
function current(){return norm(window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():"EN")}
function setText(el,v){if(el&&v!=null)el.textContent=v}
function roots(){return [document.querySelector(".hero-phone-mock"),document.getElementById("demo"),document.getElementById("gallery-iphone"),document.getElementById("gallery-ipad"),document.getElementById("iphone-duo"),document.getElementById("pgLightboxClone")].filter(Boolean)}

var exact={
 "Ask Any AI":"ask","Templates":"templates","1,000+ Templates":"templates","How to Use":"how","History":"history","Paste":"paste","Import":"import","Scan":"scan","Talk":"talk","Send":"send","Send to AI":"send","Clear All":"clearAll","Prompt History":"promptHistory","Your recent prompts & favorites":"recent","All":"all","Clear":"clear","Copy":"copy","Re-edit":"reedit","How it works":"howWorks","AI will respond in:":"outputLabel","Compare Mode":"compare","Choose AI":"compareSelect","Select AIs to compare":"compareSelect","Send to Selected":"compareSend","Search templates...":"search","Search templates…":"search"
};
var _pgOriginalText=new WeakMap();
function localizeText(root,S){
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[],node;
  while((node=w.nextNode()))nodes.push(node);
  nodes.forEach(function(n){
    if(!n.parentElement||/^(SCRIPT|STYLE)$/i.test(n.parentElement.tagName))return;
    if(!_pgOriginalText.has(n))_pgOriginalText.set(n,n.nodeValue||"");
    var raw=_pgOriginalText.get(n)||"",t=raw.trim(); if(!t)return;
    var icon=(t.match(/^[^\p{L}\p{N}]*/u)||[""])[0],body=t.slice(icon.length);
    var k=exact[body]||exact[t];
    if(k&&S[k]){
      var lead=(raw.match(/^\s*/)||[""])[0],tail=(raw.match(/\s*$/)||[""])[0];
      n.nodeValue=lead+icon+S[k]+tail;
    }else{
      n.nodeValue=raw;
    }
  });
}
function syncAllTabLabels(S,M){
  var values=[S.ask,S.templates,S.how,S.history];

  function applyTabs(container){
    if(!container)return;
    var spans=Array.from(container.children).filter(function(el){return el&&el.tagName});
    if(spans.length<4)return;
    var icons=["✏️ ","📋 ","📖 ","🕐 "];
    spans.slice(0,4).forEach(function(el,i){
      var txt=(el.textContent||"").trim();
      var originalIcon=(txt.match(/^[^\p{L}\p{N}]*/u)||[""])[0];
      el.textContent=(originalIcon||icons[i])+values[i];
    });
  }

  document.querySelectorAll(".iphone-ask-tabs,.demo-ask-tabs,.history-preview .hp-tabs,.pgl-tabs,.pgdsl-tabs,.pg-real-tabs").forEach(applyTabs);

  document.querySelectorAll("#gallery-ipad .ipad-live-preview").forEach(function(root){
    var tabbar=root.children&&root.children[2];
    if(tabbar)applyTabs(tabbar);
  });

  var hero=document.querySelector(".hero-phone-mock .phone-screen");
  if(hero&&hero.children&&hero.children[2])applyTabs(hero.children[2]);

  /* History screens: localize every visible label and remove English-only sample content. */
  var sampleTitles=[S.ask,S.ask,S.compare,S.templates,S.how,S.history];
  var sampleTexts=[
    "Test",
    S.promptExample,
    S.compareHelp,
    S.typeLine,
    S.howWorks,
    S.recent
  ];
  var sampleTimes=["5m","5m","9m","12m","18m","24m"];

  document.querySelectorAll(".history-preview").forEach(function(root){
    var badge=root.querySelector(".hp-lang");
    if(badge)badge.textContent=M.flag+" "+M.code.replace("_","-");

    setText(root.querySelector(".hp-h"),S.promptHistory||S.history);
    setText(root.querySelector(".hp-note"),S.recent);

    var pills=root.querySelectorAll(".hp-actions .hp-pill");
    if(pills[0])pills[0].textContent=S.all;
    if(pills[1])pills[1].textContent=S.clear;

    root.querySelectorAll(".hp-card").forEach(function(card,i){
      var title=card.querySelector(".hp-card-title");
      var time=card.querySelector(".hp-time");
      var body=card.querySelector(".hp-text");
      if(title)title.textContent=sampleTitles[i%sampleTitles.length];
      if(time)time.textContent=sampleTimes[i%sampleTimes.length];
      if(body)body.textContent=sampleTexts[i%sampleTexts.length];
      var btns=card.querySelectorAll(".hp-btn");
      if(btns[0])btns[0].textContent=S.copy;
      if(btns[1])btns[1].textContent=S.reedit;
    });
  });

  document.querySelectorAll(".pg-phone-action-row,.ipad-redesign-actions").forEach(function(row){
    var items=row.children||[];
    if(items[0])items[0].innerHTML="📋 <strong>"+S.paste+"</strong>";
    if(items[1])items[1].innerHTML="📄 <strong>"+S.import+"</strong>";
    if(items[2])items[2].innerHTML="📷 <strong>"+S.scan+"</strong>";
  });

  document.querySelectorAll(".pg-phone-talk,.ipad-redesign-talk").forEach(function(el){
    var spans=el.querySelectorAll("span");
    if(spans.length)spans[spans.length-1].textContent=S.talk;
  });
  document.querySelectorAll(".pg-phone-send,.ipad-redesign-send").forEach(function(el){el.textContent=S.send});
  document.querySelectorAll(".pg-phone-clear,.ipad-redesign-clear").forEach(function(el){el.textContent="🗑 "+S.clearAll});

  /* Keep template cards readable in every language: translated label + clean numeric suffix. */
  document.querySelectorAll(".pgdsl-cards>div b,.pgmac-template-grid>div b,.pgl-grid>div b").forEach(function(el,i){
    el.textContent=S.templates+" "+((i%6)+1);
  });
}

function composed(root,S){
 root.querySelectorAll(".pg-phone-tips,.ipad-native-help-lines,.mac-native-help-lines,.demo-ask-description").forEach(function(box){
   var l=box.children;
   if(l[0])l[0].textContent="✏️ "+S.typeLine;
   if(l[1])l[1].textContent="🏳️ "+S.appLang+" ⬆️ "+S.changesMenus;
   if(l[2])l[2].textContent="🌐 "+S.outputLang+" ⬇️ "+S.responds;
   if(l[3])l[3].textContent="🔀 "+S.compare+": "+S.compareHelp;
 });
 root.querySelectorAll(".pg-phone-prompt-box>div,.ipad-native-prompt-box>div,.mac-native-prompt-box>div").forEach(function(el){el.innerHTML=S.promptIntro+"<br><br>"+S.promptExample});
}

function badge(root,M){root.querySelectorAll(".pgdsl-badge,.duo-lang-badge,.pg-phone-lang-badge,.ipad-native-lang-badge").forEach(function(el){el.textContent=M.flag+" "+M.code.replace("_","-")})}

function localizedScreenMarkup(type,S,M,device){
 var active=type==="templates"?"templates":type==="how"?"how":type==="history"?"history":"ask";
 var tabs='<div class="pg-real-tabs">'+
   '<span class="'+(active==="ask"?"active":"")+'">✏️ '+S.ask+'</span>'+
   '<span class="'+(active==="templates"?"active":"")+'">📋 '+S.templates+'</span>'+
   '<span class="'+(active==="how"?"active":"")+'">📖 '+S.how+'</span>'+
   '<span class="'+(active==="history"?"active":"")+'">🕐 '+S.history+'</span></div>';
 var body="";
 if(active==="templates"){
   body='<div class="pg-real-body"><h3>📋 '+S.templates+'</h3><div class="pg-real-search">🔎 '+S.search+'</div>'+
     '<div class="pg-real-template-grid">'+
     Array.from({length:6},function(_,i){return '<div class="pg-real-template-card"><b>'+S.templates+' '+(i+1)+'</b><small>AI</small><span>›</span></div>'}).join("")+
     '</div></div>';
 }else if(active==="how"){
   body='<div class="pg-real-body"><h3>📖 '+S.how+'</h3><div class="pg-real-steps">'+
     '<div><b>1</b><span>'+S.typeLine+'</span></div>'+
     '<div><b>2</b><span>'+S.appLang+' — '+S.changesMenus+'</span></div>'+
     '<div><b>3</b><span>'+S.outputLang+' — '+S.responds+'</span></div>'+
     '<div><b>4</b><span>'+S.compare+' — '+S.compareHelp+'</span></div>'+
     '</div></div>';
 }else{
   body='<div class="pg-real-body"><div class="pg-real-history-head"><div><h3>🕐 '+(S.promptHistory||S.history)+'</h3><small>'+S.recent+'</small></div><div><span>'+S.all+'</span><span>'+S.clear+'</span></div></div>'+
   '<div class="pg-real-history-list">'+
   '<div><b>'+S.ask+'</b><small>5m</small><p>Test</p><em>'+S.copy+'</em><em>'+S.reedit+'</em></div>'+
   '<div><b>'+S.ask+'</b><small>12m</small><p>'+S.promptExample+'</p><em>'+S.copy+'</em><em>'+S.reedit+'</em></div>'+
   '<div><b>'+S.compare+'</b><small>19m</small><p>'+S.compareHelp+'</p><em>'+S.copy+'</em><em>'+S.reedit+'</em></div>'+
   '</div></div>';
 }
 return '<div class="pg-real-head"><img src="assets/img/icon-128.png" alt=""><strong>Poly-Glot AI Workspace</strong><span>'+M.flag+' '+M.code.replace("_","-")+'</span></div>'+tabs+body;
}

function makeStatic(img,type,S,M){
 var p=img.previousElementSibling;
 if(!p||!p.classList.contains("pg-device-static-localized")){
   p=document.createElement("div");p.className="pg-device-static-localized";img.parentNode.insertBefore(p,img);
 }
 p.classList.toggle("pg-static-ipad",!!img.closest(".ipad-screen"));
 p.classList.toggle("pg-static-iphone",!!img.closest(".iphone-screen"));
 p.innerHTML=localizedScreenMarkup(type,S,M,img.closest(".ipad-screen")?"ipad":"iphone");
 img.style.display="none";
}
function staticScreens(S,M,c){
  /* Visual parity rule: use the exact English device surfaces for every locale.
     Do not replace iPhone/iPad screens with alternate reconstructed markup. */
  document.querySelectorAll('#gallery-iphone .pg-device-static-localized,#gallery-ipad .pg-device-static-localized').forEach(function(p){p.remove()});
  document.querySelectorAll('#gallery-iphone .iphone-screen>img,#gallery-ipad .ipad-screen>img').forEach(function(img){
    img.style.display="block";
    img.style.visibility="visible";
    img.style.opacity="1";
  });
}

function macOverlay(S,M,c){
 var host=document.querySelector("#gallery-mac .mac-reference-interactive");
 if(!host)return;
 /* Re-render only after the actual language changes, not on every tab click
    or delayed i18n retry. This prevents flicker and preserves tab transitions. */
 if(host.getAttribute("data-pg-mac-locale")===c &&
    (c==="EN" || host.querySelector(".pg-mac-badge-localized"))){
   /* Fast path is safe only if the rendered name and heading match this locale.
      Otherwise repair the screen without depending on a new language-change event. */
   var value=host.querySelector("#macScreen-askanyai .mac-response-select strong");
   var heading=host.querySelector("#macScreen-askanyai .mac-native-ask-title");
   if(value&&heading&&value.textContent===localizedLanguageName(M)&&heading.textContent==="🤔 "+S.ask)return;
 }
 host.setAttribute("data-pg-mac-locale",c);

 /* Use the real HTML Mac panel for localized UI. This keeps one clean renderer
    instead of drawing translated text on top of the baked English screenshot. */
 host.querySelectorAll(".pg-mac-full-overlay,.pg-mac-panel-localized,.pg-final-mac-locale,.pg-gallery-mac-text-overlay,.pg-mac-badge-localized").forEach(function(el){el.remove()});

 var stage=host.querySelector(".mac-reference-stage");
 var tabs=host.querySelectorAll(".mac-reference-tab");
 var ask=host.querySelector("#macScreen-askanyai");
 var body=ask&&ask.querySelector(".mac-ask-body");

 /* Restore tab buttons from any older text-mask inline styles. */
 tabs.forEach(function(btn){
   btn.style.removeProperty("opacity");
   btn.style.removeProperty("color");
   btn.style.removeProperty("background");
   btn.style.removeProperty("border");
   btn.style.removeProperty("box-shadow");
   var sp=btn.querySelector("span");
   if(sp){
     sp.style.removeProperty("opacity");
     sp.style.removeProperty("color");
   }
 });

 if(c==="EN"){
   if(stage){
     stage.style.removeProperty("display");
     stage.style.removeProperty("visibility");
     stage.style.removeProperty("opacity");
     stage.style.removeProperty("pointer-events");
   }
   tabs.forEach(function(btn,i){
     var sp=btn.querySelector("span");
     if(sp)sp.textContent=["✏️ Ask Any AI","📋 Templates","📖 How to Use","🕐 History"][i];
   });
   /* Continue below so every Mac screen field is restored in English. */
 } else {
   if(stage){
     stage.style.removeProperty("display");
     stage.style.removeProperty("visibility");
     stage.style.removeProperty("opacity");
     stage.style.removeProperty("pointer-events");
   }
   /* One localized badge covers the English badge baked into the image. */
   var badge=document.createElement("div");
   badge.className="pg-mac-badge-localized";
   badge.textContent=M.flag+" "+M.code.replace("_","-");
   host.appendChild(badge);
   var labels=["✏️ "+S.ask,"📋 "+S.templates,"📖 "+S.how,"🕐 "+S.history];
   tabs.forEach(function(btn,i){
     var sp=btn.querySelector("span");
     if(sp)sp.textContent=labels[i];
   });
 }

 /* Keep the visible labels and accessible names in the same locale.
    Only the UI chrome is translated; saved user prompts retain their own text. */
 var tabKeys=[S.ask,S.templates,S.how,S.history];
 tabs.forEach(function(btn,i){
   if(tabKeys[i])btn.setAttribute("aria-label",tabKeys[i]);
 });
 host.setAttribute("aria-label",tabKeys.filter(Boolean).join(" · "));
 var nav=host.querySelector(".mac-reference-hotspots");
 if(nav)nav.setAttribute("aria-label",tabKeys.filter(Boolean).join(" · "));
 var templatesScreen=host.querySelector("#macScreen-templates");
 if(templatesScreen){
   templatesScreen.setAttribute("aria-label",S.templates+" — Mac");
   var img=templatesScreen.querySelector("img");
   if(img)img.setAttribute("alt",S.templates+" — Mac");
 }
 var historyScreen=host.querySelector("#macScreen-history");
 if(historyScreen)historyScreen.setAttribute("aria-label",S.history+" — Mac");

 if(body){
   var title=body.querySelector(".mac-native-ask-title");
   if(title)title.textContent="🤔 "+S.ask;

   var lines=body.querySelectorAll(".mac-native-help-lines>div");
   if(lines[0])lines[0].textContent="✏️ "+S.typeLine;
   if(lines[1])lines[1].textContent="🏳️ "+S.appLang+" ⬆️ "+S.changesMenus;
   if(lines[2])lines[2].textContent="🌐 "+S.outputLang+" ⬇️ "+S.responds;
   if(lines[3])lines[3].textContent="🔀 "+S.compare+": "+S.compareHelp;

   var how=body.querySelector(".mac-native-how-link");
   if(how)how.textContent=S.howWorks||S.how;

   var out=body.querySelector(".mac-response-label");
   if(out)out.textContent="🌐 "+S.outputLabel;

   var sel=body.querySelector(".mac-response-select");
   if(sel){
     var spans=sel.querySelectorAll("span");
     var strong=sel.querySelector("strong");
     if(spans[0])spans[0].textContent=M.flag;
     if(strong)strong.textContent=localizedLanguageName(M);
   }

   var kids=body.children;
   if(kids[3]){
     var prompt=kids[3].querySelector("div")||kids[3];
     prompt.innerHTML=(S.promptIntro||"")+"<br><br>"+(S.promptExample||"");
   }
   if(kids[4]){
     var actions=kids[4].children;
     if(actions[0])actions[0].textContent="📋 "+S.paste;
     if(actions[1])actions[1].textContent="📄 "+S.import;
   }
   if(kids[5]){
     var talk=kids[5].children[0];
     var send=kids[5].children[1];
     if(talk){
       var mic=talk.querySelector("span");
       talk.textContent="";
       if(mic){talk.appendChild(mic);talk.appendChild(document.createTextNode(" "+S.talk));}
       else talk.textContent="🎤 "+S.talk;
     }
     if(send)send.textContent=S.send;
   }
   if(kids[6])kids[6].textContent="🗑 "+(S.clearAll||"Clear All");
 }

 var hint=document.querySelector("#macTabHint span");
 if(hint){
   if(window._pgMacPreviewTabCTA)window._pgMacPreviewTabCTA.apply(S);
   else hint.textContent="👇 Click the tabs to view: "+S.ask+" · "+S.templates+" · "+S.how+" · "+S.history;
 }
}
function syncPlainBadges(S,M){
  roots().forEach(function(root){
    root.querySelectorAll("span,div").forEach(function(el){
      var t=(el.textContent||"").trim();
      if(t==="🇺🇸 EN"||t==="EN"&&el.children.length===0){
        if(el.closest(".iphone-live-preview,.ipad-live-preview,.demo-phone-screen,.demo-device-card-lang,.hero-phone-mock")){
          el.textContent=M.flag+" "+M.code.replace("_","-");
        }
      }
    });
  });
}

function siteLabels(S,M,c){
  var hint=document.querySelector("#macTabHint span");
  if(hint)hint.textContent="👇 "+S.ask+" · "+S.templates+" · "+S.how+" · "+S.history;

  var macLabel=document.getElementById("macTabLabel");
  if(macLabel){
    var selected=document.querySelector("#gallery-mac .mac-reference-tab.active");
    var tab=selected&&selected.id?selected.id.replace("macTab-",""):"askanyai";
    var captions={
      askanyai:S.ask+" — "+S.typeLine,
      templates:S.templates,
      howtouse:S.how+" — "+(S.howWorks||S.how),
      history:S.history+" — "+(S.recent||S.history)
    };
    macLabel.textContent=captions[tab]||captions.askanyai;
    macLabel.setAttribute("lang",c==="ZH_TW"?"zh-Hant":c.toLowerCase());
    macLabel.setAttribute("dir",(c==="HE"||c==="AR")?"rtl":"ltr");
  }

  document.querySelectorAll("#gallery-iphone .gallery-label,#gallery-ipad .gallery-label").forEach(function(el){
    var t=(el.getAttribute("data-en")||el.textContent||"").trim();
    if(!el.getAttribute("data-en"))el.setAttribute("data-en",t);
    if(/template/i.test(t))el.textContent=S.templates;
    else if(/how to use/i.test(t))el.textContent=S.how;
    else if(/history/i.test(t))el.textContent=S.history;
    else if(/ask any ai/i.test(t))el.textContent=S.ask;
  });

  var h=document.querySelector("#demo .demo-device-card-lang>h3");
  if(h){
    var v="";
    try{v=window._pgI18n&&window._pgI18n.gt?window._pgI18n.gt("f5",c.replace("_","-")):""}catch(e){}
    h.textContent="🌍 "+(S.fullyLocalized||"Fully Localized UI");
  }

  var cur=document.getElementById("langCurrentLabel");
  if(cur)cur.textContent="🌍 "+M.flag+" "+M.code.replace("_","-");

  var replay=document.querySelector("#demo .demo-replay-btn");
  if(replay)replay.textContent=S.replay||"↻ Replay Demo";
}

function languageDemoOverlay(S,M,c){
  /* Keep the Fully Localized UI phone as a live animated demo.
     A previous localized overlay covered the original phone and froze its
     built-in language cycling, which also caused the caption and phone UI
     to drift out of sync. Remove that overlay here and let the original
     interactive/animated demo own #langPhone. */
  var phone=document.getElementById("langPhone");if(!phone)return;
  var o=phone.querySelector(".pg-langphone-global");
  if(o)o.remove();
}
function duo(S,M,c){
  var root=document.getElementById("iphone-duo");if(!root)return;
  var gt=function(k,fb){
    try{
      var v=window._pgI18n&&window._pgI18n.gt?window._pgI18n.gt(k,c.replace("_","-")):"";
      return v&&v!==k?v:fb;
    }catch(e){return fb}
  };

  /* Localize section copy. */
  var kicker=root.querySelector(".duo-kicker");
  var titleA=root.querySelector('[data-i18n="duoTitleA"]');
  var titleB=root.querySelector('[data-i18n="duoTitleB"]');
  var copy=root.querySelector(".duo-copy");
  var metaText=root.querySelector('[data-i18n="duoMeta"]');
  var linkText=root.querySelector('[data-i18n="duoLink"]');

  if(kicker)kicker.textContent=gt("duoKicker","Coming Soon");
  if(titleA)titleA.textContent=gt("duoTitleA","Poly-Glot");
  if(titleB)titleB.textContent=gt("duoTitleB","on iPhone Duo");
  if(copy)copy.textContent=gt("duoCopy","A fold-aware Poly-Glot experience is coming to iPhone Duo.");
  if(metaText)metaText.textContent=gt("duoMeta","iPhone Duo pre-orders begin October 16, 2026. Available October 23.");
  if(linkText)linkText.textContent=gt("duoLink","Explore iPhone Duo at Apple");

  root.setAttribute("lang",c.toLowerCase().replace("_","-"));
  root.setAttribute("dir","ltr");root.setAttribute("data-pg-rtl",(c==="AR"||c==="HE")?"true":"false");

  /* Keep the exact English Xcode/device image for every language. */
  var image=root.querySelector(".duo-static-en");
  if(image){
    image.style.display="block";
    image.style.visibility="visible";
    image.style.opacity="1";
  }

  var localizedDevice=root.querySelector(".duo-localized-device");
  if(localizedDevice){
    localizedDevice.style.display="none";
    localizedDevice.style.visibility="hidden";
    localizedDevice.style.opacity="0";
  }

  /* Text-only overlay: DISABLED — always show static English image. */
  var overlay=root.querySelector(".duo-localized-overlay");
  if(overlay){overlay.innerHTML="";overlay.style.display="none";overlay.style.visibility="hidden";overlay.style.opacity="0";}
  return;
  /* DEAD CODE BELOW - overlays disabled */
  var prompt=gt("sc2Prompt",S.promptExample||"Explain quantum computing in simple terms.");
  var responseA=gt("sc2P",S.compareHelp||"Compare responses side by side.");
  var responseB=gt("sc2PickSub",S.responds||"Response");
  var selected=S.compareSend||"Send to Selected";
  var dir=(c==="AR"||c==="HE")?"rtl":"ltr";

  overlay.style.display="block";
  overlay.style.visibility="visible";
  overlay.style.opacity="1";
  overlay.className="duo-localized-overlay duo-text-only";
  overlay.setAttribute("lang",c.toLowerCase().replace("_","-"));
  overlay.setAttribute("dir",dir);

  overlay.innerHTML=
    '<span class="duo-loc badge">'+M.flag+' '+M.code.replace("_","-")+'</span>'+
    '<span class="duo-loc tab ask">✏️ '+S.ask+'</span>'+
    '<span class="duo-loc tab templates">📋 '+S.templates+'</span>'+
    '<span class="duo-loc tab how">📖 '+S.how+'</span>'+
    '<span class="duo-loc tab history">🕐 '+S.history+'</span>'+
    '<span class="duo-loc compare-title">🔀 '+S.compare+'</span>'+
    '<span class="duo-loc compare-sub">'+S.compareHelp+'</span>'+
    '<span class="duo-loc prompt-label">'+(S.promptIntro||S.ask)+'</span>'+
    '<span class="duo-loc prompt">'+prompt+'</span>'+
    '<span class="duo-loc select-label">'+(S.compareSelect||S.compare)+'</span>'+
    '<span class="duo-loc send">✈ '+selected+' (2)</span>'+
    '<span class="duo-loc model-sub model-sub-a">'+S.response+'</span>'+
    '<span class="duo-loc model-sub model-sub-b">'+S.response+'</span>'+
    '<span class="duo-loc response response-a">'+responseA+' '+responseB+'</span>'+
    '<span class="duo-loc response response-b">'+responseA+' '+responseB+'</span>'+
    '<span class="duo-loc actions actions-a">'+S.copy+'　 '+S.read+'　 '+S.share+'　 '+S.save+'</span>'+
    '<span class="duo-loc actions actions-b">'+S.copy+'　 '+S.read+'　 '+S.share+'　 '+S.save+'</span>';
}

function heroMacTextOverlay(S,M,c){
  var host=document.querySelector(".hero-device-stack .hero-mac-crop");
  if(!host)return;
  var old=host.querySelector(".pg-hero-mac-text-overlay");
  if(c==="EN"){ if(old)old.remove(); return; }
  if(!old){
    old=document.createElement("div");
    old.className="pg-hero-mac-text-overlay";
    host.appendChild(old);
  }
  old.setAttribute("lang",c.toLowerCase().replace("_","-"));
  old.setAttribute("dir","ltr");old.setAttribute("data-pg-rtl",(c==="AR"||c==="HE")?"true":"false");
  old.innerHTML=
    '<span class="pg-hm lang">'+M.flag+' '+M.code.replace("_","-")+'</span>'+
    '<span class="pg-hm tab t1">✏️ '+S.ask+'</span>'+
    '<span class="pg-hm tab t2">📋 '+S.templates+'</span>'+
    '<span class="pg-hm tab t3">📖 '+S.how+'</span>'+
    '<span class="pg-hm tab t4">🕐 '+S.history+'</span>'+
    '<span class="pg-hm title">🤔 '+S.ask+'</span>'+
    '<span class="pg-hm how">'+(S.howWorks||S.how)+'</span>'+
    '<span class="pg-hm help h1">✏️ '+S.typeLine+'</span>'+
    '<span class="pg-hm help h2">🏳️ '+S.appLang+' ⬆️ '+S.changesMenus+'</span>'+
    '<span class="pg-hm help h3">🌐 '+S.outputLang+' ⬇️ '+S.responds+'</span>'+
    '<span class="pg-hm help h4">🔀 '+S.compare+': '+S.compareHelp+'</span>'+
    '<span class="pg-hm output">🌐 '+S.outputLabel+'</span>'+
    '<span class="pg-hm select">'+M.flag+' '+(localizedLanguageName(M))+'　▼</span>'+
    '<span class="pg-hm prompt">'+S.promptIntro+'<br><br>'+S.promptExample+'</span>'+
    '<span class="pg-hm action paste">📋 '+S.paste+'</span>'+
    '<span class="pg-hm action imp">📄 '+S.import+'</span>'+
    '<span class="pg-hm talk">🎤 '+S.talk+'</span>'+
    '<span class="pg-hm send">'+S.send+'</span>';
}


/* Render the Mac's secondary screens in the same locale as Ask Any AI. */
function localizeMacSecondaryTabs(S,M,c){
 var gallery=document.getElementById("gallery-mac");if(!gallery)return;
 function localizedTitle(i){
   var key="tc"+((i%9)+1)+"t",v="",en="";
   try{if(window._pgI18n&&window._pgI18n.gt){
     v=window._pgI18n.gt(key,c)||"";
     en=window._pgI18n.gt(key,"EN")||"";
   }}catch(e){}
   return v&&(c==="EN"||v!==en)?v:S.templates+" "+(i+1);
 }
 var template=gallery.querySelector("#macScreen-templates");
 if(template){
   var layer=template.querySelector(".pg-mac-panel-localized");
   if(c==="EN"){if(layer)layer.remove();}
   else{
     if(!layer){layer=document.createElement("div");layer.className="pg-mac-panel-localized";template.appendChild(layer);}
     /* Rebuild only for a different locale, not on every tab click or retry. */
     if(layer.dataset.pgMacPanelLocale!==c || !layer.querySelector(".pg-real-body")){
       var scratch=document.createElement("div");
       scratch.innerHTML=localizedScreenMarkup("templates",S,M,"mac");
       var body=scratch.querySelector(".pg-real-body");
       if(body){
         body.querySelectorAll(".pg-real-template-card b").forEach(function(el,i){el.textContent=localizedTitle(i)});
         layer.replaceChildren(body);
       }
       layer.dataset.pgMacPanelLocale=c;
     }
     layer.lang=c==="ZH_TW"?"zh-Hant":c.toLowerCase();
     layer.dir=c==="AR"||c==="HE"?"rtl":"ltr";
   }
   template.setAttribute("aria-label",S.templates);
 }
 var history=gallery.querySelector("#macScreen-history");
 if(history){
   var header=history.querySelector(".mac-history-heading");
   var note=history.querySelector(".mac-history-note");
   if(header)header.textContent=c==="EN"?"Prompt History":(S.promptHistory||S.history);
   if(note)note.textContent=c==="EN"?"Your recent prompts & favorites":S.recent;
   var pills=history.querySelectorAll(".mac-history-pill");
   if(pills[0])pills[0].textContent=c==="EN"?"All":S.all;
   if(pills[1])pills[1].textContent=c==="EN"?"Clear":S.clear;
   var titles=["Ask Any AI","Ask Any AI","Interview Coach","Resume Optimizer","Ask Any AI","Translation","Code Explainer","Meeting Summary","API Documentation","Release Notes","Content Strategy","Localization QA"];
   var samples=["Test","Write a polite email to my landlord asking to fix the heater.","Prepare {{name}} for a {{job_title}} interview at {{company}}.","Improve this resume for a senior technical writer role.","Compare the best AI tools for developer documentation.","Translate this product description into French and Arabic.","Explain this JavaScript function in plain English.","Summarize these meeting notes into decisions and action items.","Draft a concise API quickstart from this OpenAPI spec.","Turn these engineering commits into customer-facing release notes.","Create an information architecture for this Help Center.","Review this localized UI copy for clarity and consistency."];
   var localized=[S.promptIntro,S.promptExample,S.compareHelp,S.typeLine,S.promptExample,S.promptIntro,S.howWorks,S.recent,S.typeLine,S.compareHelp,S.changesMenus,S.responds];
   history.querySelectorAll(".mac-history-card").forEach(function(card,i){
     var title=card.querySelector(".mac-history-card-title"),body=card.querySelector(".mac-history-text");
     if(title)title.textContent=c==="EN"?(titles[i]||S.ask):((i===0||i===1||i===4)?S.ask:localizedTitle(i));
     if(body)body.textContent=c==="EN"?(samples[i]||""):(localized[i]||S.promptExample);
     card.querySelectorAll(".mac-history-btn").forEach(function(btn){
       if(btn.classList.contains("copy"))btn.textContent=c==="EN"?"Copy":S.copy;
       else if(!btn.classList.contains("del"))btn.textContent=c==="EN"?"Re-edit":S.reedit;
     });
   });
   history.lang=c==="ZH_TW"?"zh-Hant":c.toLowerCase();
   history.dir=c==="AR"||c==="HE"?"rtl":"ltr";
   history.setAttribute("aria-label",S.history);
 }
 /* The How to Use tab animates; localize its static chrome without changing
    providers, animation timing, or the generated demonstration responses. */
 var demo=gallery.querySelector("#macScreen-howtouse");
 if(demo){
   var send=demo.querySelector("#siteDemo-SendBtn");
   if(send)send.textContent=c==="EN"?"Send to AI":S.send;
   var select=demo.querySelector("#siteDemo-P2 > div:nth-child(2)");
   if(select)select.textContent=c==="EN"?"Choose AI":(S.compareSelect||S.compare);
   var mode=demo.querySelector("#siteDemo-P2 > div:nth-child(3) > span");
   if(mode)mode.textContent="🔀 "+(c==="EN"?"Compare Mode":S.compare);
   var sendSelected=demo.querySelector("#siteDemo-SendAll");
   if(sendSelected&&sendSelected.firstChild&&sendSelected.firstChild.nodeType===3)
     sendSelected.firstChild.nodeValue=(c==="EN"?"Send to Selected":(S.compareSend||S.send))+" (";
   var messages=demo.querySelectorAll(".siteDemo-AI > div:nth-child(2) > div:nth-child(2)");
   messages.forEach(function(el,i){
     if(c==="EN")el.textContent=i===0||i===3?"Prompt auto-filled":"Paste prompt";
     else if(c==="FR")el.textContent=i===0||i===3?"Prompt inséré automatiquement":"Coller le prompt";
     else el.textContent=i===0||i===3?(S.typeLine||S.ask):(S.paste||"");
   });
   var title=demo.querySelector("#siteDemo-P3 > div:first-child");
   if(title)title.textContent="🔀 "+(c==="EN"?"Compare Mode":S.compare)+" — 2 AI";
   var foot=demo.querySelector("#siteDemo-P3 > div:last-child");
   if(foot)foot.textContent=c==="EN"?"⬆ Compare and pick the best answer":"⬆ "+(S.compareHelp||S.compare);
   if(demo.dataset.pgDemoLocale!==c){
     demo.dataset.pgDemoLocale=c;
     if(demo.classList.contains("active")&&typeof window._siteDemoStart==="function"){
       try{window._siteDemoStart()}catch(e){}
     }
   }
 }
}

function apply(code){
 var c=norm(code||current()),S=strings(c),M=meta(c);
 document.documentElement.setAttribute("data-device-ui-lang",c);
 /* Keep the already-localized Mac template layer mounted across same-language tab changes. */
 document.querySelectorAll(".pg-device-static-localized").forEach(function(el){el.remove()});

 /* Mac is rendered first so no legacy localization path can visibly win. */
 try{macOverlay(S,M,c)}catch(e){console.error("Poly-Glot Mac localization:",e)}

 roots().forEach(function(r){
   /* Do not mutate the Mac gallery DOM after its canonical localized render exists. */
   if(r&&r.id==="gallery-mac")return;
   localizeText(r,S);composed(r,S);badge(r,M);
   r.setAttribute("dir","ltr");
   r.setAttribute("data-pg-rtl",(c==="AR"||c==="HE")?"true":"false");
 });
 staticScreens(S,M,c);
 heroMacTextOverlay(S,M,c);
 syncPlainBadges(S,M);
 syncAllTabLabels(S,M);
 siteLabels(S,M,c);
 localizeMacSecondaryTabs(S,M,c);
 languageDemoOverlay(S,M,c);
 duo(S,M,c);
}
var css=document.createElement("style");css.textContent=
'.pg-device-static-localized{position:absolute;inset:0;background:#0d0f1a;color:#fff;z-index:8;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;overflow:hidden}.pgdsl-head{display:flex;align-items:center;gap:8px;padding:5% 6% 3%}.pgdsl-head img{width:8%;aspect-ratio:1;border-radius:22%}.pgdsl-head strong{font-size:clamp(7px,1.5vw,15px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pgdsl-badge{margin-left:auto;font-size:clamp(6px,1vw,10px);background:rgba(255,255,255,.08);padding:3px 6px;border-radius:5px}.pgdsl-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid rgba(255,255,255,.08);font-size:clamp(5px,.9vw,10px);color:#8b949e}.pgdsl-tabs span{padding:4% 2%;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pgdsl-tabs .active{color:#f59e0b;border-bottom:2px solid #f59e0b}.pgdsl-body{padding:5% 6%}.pgdsl-title{font-weight:800;font-size:clamp(11px,2vw,20px);margin-bottom:4%}.pgdsl-search,.pgdsl-step{background:#1c2128;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:3%;margin-bottom:3%;color:#aab2c0}.pgdsl-cards{display:grid;grid-template-columns:1fr 1fr;gap:3%}.pgdsl-cards div,.pgdsl-history-list div{background:#1a1e2e;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:6%;min-height:45px}.pgdsl-history-actions{display:flex;gap:6px;margin-bottom:4%}.pgdsl-history-actions span{border:1px solid rgba(255,255,255,.12);padding:4px 8px;border-radius:6px}.pgdsl-history-list{display:grid;grid-template-columns:repeat(2,1fr);gap:3%}.iphone-screen,.ipad-screen{position:relative}'+
'.pg-mac-full-overlay{position:absolute!important;left:10.6%!important;top:11.15%!important;width:78.8%!important;height:71.95%!important;z-index:140!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:none!important;background:#0d1117!important;color:#fff!important;overflow:hidden!important;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif!important}.pg-mac-full-overlay .pgdsl-head{height:13%;padding:1.6% 3%}.pg-mac-full-overlay .pgdsl-head img{width:4.5%}.pg-mac-full-overlay .pgdsl-tabs{height:11%;font-size:clamp(5px,.72vw,10px)}.pg-mac-full-overlay .pgdsl-tabs span{display:flex;align-items:center;justify-content:center;padding:0 2%}.pgmac-body{padding:3% 4%;font-size:clamp(6px,.7vw,10px)}.pgmac-body h3{font-size:clamp(10px,1.2vw,16px);margin:0 0 1.6%}.pgmac-help{line-height:1.45;color:#aab2c0}.pgmac-output{margin:2% 0;background:#161b22;border:1px solid rgba(255,255,255,.08);padding:1.6% 2%;border-radius:7px}.pgmac-prompt{min-height:82px;border:2px solid #8b2cff;border-radius:8px;padding:2.5%;color:#8b949e}.pgmac-actions{display:grid;grid-template-columns:1fr 1fr;gap:1%;margin-top:1.8%}.pgmac-actions span{background:#1c2128;padding:1.5%;text-align:center;border-radius:6px}.pgmac-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:1.6%}.pgmac-bottom b{background:linear-gradient(135deg,#7c3aed,#2563eb);padding:1.5% 5%;border-radius:7px}';
css.textContent+=
'.pg-langphone-global{position:absolute;inset:0;z-index:999;background:#0d0f1a;color:#fff;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif}.pgl-status{height:42px;display:flex;justify-content:space-between;align-items:flex-end;padding:0 24px 7px;font-size:.72rem;font-weight:700}.pgl-head{display:flex;align-items:center;gap:8px;padding:7px 14px}.pgl-head img{width:26px;height:26px;border-radius:6px}.pgl-head div{min-width:0}.pgl-head b{display:block;font-size:.7rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pgl-head small{display:block;color:#596071;font-size:.43rem}.pgl-head>span{margin-left:auto;background:rgba(255,255,255,.08);padding:4px 7px;border-radius:5px;font-size:.53rem}.pgl-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid rgba(255,255,255,.07)}.pgl-tabs span{padding:8px 3px;text-align:center;font-size:.46rem;font-weight:600;color:#6e7380;line-height:1.12;min-width:0}.pgl-tabs .active{color:#f59e0b;border-bottom:2px solid #f59e0b}.pgl-body{padding:12px;flex:1;overflow:hidden}.pgl-search{background:#1c2128;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:9px 12px;color:#777f8d;font-size:.54rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pgl-cats{display:flex;gap:5px;margin:9px 0}.pgl-cats span{border:1px solid rgba(255,255,255,.1);padding:5px 9px;border-radius:15px;color:#808796;font-size:.46rem}.pgl-cats .on{background:#45c78c;color:#fff;border-color:#45c78c}.pgl-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.pgl-grid>div{min-height:92px;background:#1a1e2e;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:9px 9px 0;display:flex;flex-direction:column;overflow:hidden}.pgl-grid em{font-style:normal;color:#f59e0b;font-size:.42rem;font-weight:700}.pgl-grid b{font-size:.54rem;line-height:1.2;margin:3px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pgl-grid small{font-size:.39rem;color:#687080;line-height:1.2;flex:1}.pgl-grid strong{margin:0 -9px;background:#e9a32d;color:#111;padding:4px 9px;font-size:.41rem}.pgl-home{width:36%;height:5px;background:#fff;border-radius:3px;margin:7px auto 10px;opacity:.2}';
css.textContent+=
'html:not([data-device-ui-lang="EN"]) #gallery-mac .pg-mac-full-overlay{z-index:140!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .mac-reference-hotspots{z-index:160!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .mac-reference-hotspots .mac-reference-tab span{opacity:1!important;color:inherit!important;text-shadow:none!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .mac-reference-tab::after{display:none!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .pg-mac-full-overlay .pgdsl-tabs .active{border-bottom:2px solid #f59e0b!important;box-shadow:none!important;background:rgba(245,158,11,.08)!important}'+
'.pg-duo-xcode-head,.pg-duo-xcode-foot{display:flex;align-items:center;justify-content:space-between;background:#2a3139;color:#dfe7f2;padding:10px 14px;font-size:.72rem;border:1px solid rgba(255,255,255,.08)}'+
'.pg-duo-xcode-head{border-radius:18px 18px 0 0}.pg-duo-xcode-foot{border-radius:0 0 18px 18px}.pg-duo-traffic{color:#ff6b6b;letter-spacing:4px}'+
'#iphone-duo .pg-duo-device-shell{display:grid;grid-template-columns:1.12fr .94fr .94fr;gap:2px;background:#05070b;border-left:1px solid rgba(255,255,255,.07);border-right:1px solid rgba(255,255,255,.07);overflow:hidden}'+
'#iphone-duo .pg-duo-pane{min-width:0;background:#071018;color:#edf3fb;padding:14px 12px;min-height:430px;position:relative}'+
'#iphone-duo .pg-duo-control{border-right:2px solid #111827}'+
'#iphone-duo .pg-duo-response{border-left:1px solid rgba(255,255,255,.05);display:flex;flex-direction:column}'+
'#iphone-duo .pg-duo-apphead{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:7px;align-items:center;margin-bottom:8px}'+
'#iphone-duo .pg-duo-apphead img{width:28px;height:28px;border-radius:7px}#iphone-duo .pg-duo-apphead b{display:block;font-size:.66rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#iphone-duo .pg-duo-apphead small{display:block;color:#6f7b8e;font-size:.46rem}#iphone-duo .pg-duo-apphead>span{font-size:.5rem;background:#141d2a;padding:4px 6px;border-radius:5px}'+
'#iphone-duo .pg-duo-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:10px}#iphone-duo .pg-duo-tabs span{padding:6px 2px;font-size:.43rem;color:#788396;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}#iphone-duo .pg-duo-tabs .on{color:#e879f9;border-bottom:2px solid #d946ef}'+
'#iphone-duo .pg-duo-control h3{font-size:.8rem;margin:5px 0 2px}#iphone-duo .pg-duo-muted{font-size:.5rem;color:#8d98a9;line-height:1.3;margin:0 0 8px}#iphone-duo .pg-duo-control label{display:block;font-size:.5rem;font-weight:700;margin-bottom:5px}'+
'#iphone-duo .pg-duo-prompt{background:#182231;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:9px;font-size:.56rem;line-height:1.3;margin-bottom:8px}#iphone-duo .pg-duo-select{display:block;font-size:.52rem;margin-bottom:5px}'+
'#iphone-duo .pg-duo-ai{font-size:.51rem;padding:3px 0;color:#cbd5e1}#iphone-duo .pg-duo-ai.checked{color:#34d399;font-weight:700}#iphone-duo .pg-duo-ai span{color:#e5edf7;margin-left:6px}'+
'#iphone-duo .pg-duo-control button{position:absolute;left:12px;right:12px;bottom:12px;border:0;border-radius:7px;padding:9px;background:linear-gradient(90deg,#7c3aed,#8b5cf6);color:#fff;font-size:.56rem;font-weight:800}'+
'#iphone-duo .pg-duo-modelhead{display:flex;align-items:center;gap:8px;margin-bottom:10px}#iphone-duo .pg-duo-model{width:30px;height:30px;border-radius:7px;display:grid;place-items:center;background:#0f766e;color:white;font-weight:800}#iphone-duo .pg-duo-model.ppx{background:#0f4c5c}#iphone-duo .pg-duo-modelhead b{display:block;font-size:.7rem}#iphone-duo .pg-duo-modelhead small{color:#6f7b8e;font-size:.45rem}'+
'#iphone-duo .pg-duo-response p{font-size:.53rem;line-height:1.45;color:#c7d0dc;margin:0 0 10px}#iphone-duo .pg-duo-actions{margin-top:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}#iphone-duo .pg-duo-actions span{border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:6px 2px;text-align:center;font-size:.43rem;color:#b8c2cf}'+
'@media(max-width:760px){#iphone-duo .pg-duo-device-shell{grid-template-columns:1.12fr .94fr .94fr}#iphone-duo .pg-duo-pane{min-height:300px;padding:9px 7px}#iphone-duo .pg-duo-response p{font-size:.42rem}#iphone-duo .pg-duo-control h3{font-size:.62rem}#iphone-duo .pg-duo-control button{left:7px;right:7px;bottom:7px;padding:7px;font-size:.46rem}#iphone-duo .pg-duo-tabs span{font-size:.35rem}#iphone-duo .pg-duo-apphead b{font-size:.5rem}}';
css.textContent+=
'#iphone-duo .duo-localized-overlay{container-type:inline-size}'+
'#iphone-duo .duo-ov-pane{position:absolute;background:linear-gradient(180deg,rgba(6,15,24,.985),rgba(2,8,14,.995));overflow:hidden;box-sizing:border-box;color:#eef3fb}'+
'#iphone-duo .duo-ov-left{left:24.15%;top:15.45%;width:26.15%;height:68.25%;padding:1.55% 1.25% 1.2%;clip-path:polygon(2.5% 1%,98.5% 3%,99.5% 98%,0 100%);border-radius:2.2% 1.4% 1.2% 2.2%}'+
'#iphone-duo .duo-ov-mid{left:50.15%;top:16.75%;width:18.45%;height:66.55%;padding:1.65% 1.1% 1.15%;clip-path:polygon(1% 0,99% 2%,99% 98%,0 100%)}'+
'#iphone-duo .duo-ov-right{left:68.35%;top:17.65%;width:18.45%;height:65.8%;padding:1.65% 1.1% 1.15%;clip-path:polygon(0 0,97.5% 3%,100% 99%,1% 98%);border-radius:0 2.2% 2.2% 0}'+
'#iphone-duo .duo-ov-apphead{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:.45cqw;align-items:center;margin-bottom:.5cqw}'+
'#iphone-duo .duo-ov-apphead img{width:2.35cqw;height:2.35cqw;border-radius:.5cqw}#iphone-duo .duo-ov-apphead b{display:block;font-size:1.12cqw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#iphone-duo .duo-ov-apphead small{display:block;color:#8792a5;font-size:.68cqw}#iphone-duo .duo-ov-apphead>span{font-size:.82cqw;background:#182231;padding:.28cqw .45cqw;border-radius:.35cqw;white-space:nowrap}'+
'#iphone-duo .duo-ov-tabs{display:grid;grid-template-columns:1.2fr .9fr 1fr .85fr;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:.55cqw}#iphone-duo .duo-ov-tabs span{padding:.42cqw .18cqw;font-size:.71cqw;color:#8d98aa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}#iphone-duo .duo-ov-tabs .active{color:#e879f9;border-bottom:2px solid #d946ef}'+
'#iphone-duo .duo-ov-compare-title{font-size:1.22cqw;font-weight:750;margin:.45cqw 0 .15cqw}#iphone-duo .duo-ov-sub{font-size:.77cqw;color:#9aa5b6;line-height:1.25;margin-bottom:.5cqw}#iphone-duo .duo-ov-label{font-size:.78cqw;font-weight:700;margin:.28cqw 0}'+
'#iphone-duo .duo-ov-prompt{background:#172334;border:1px solid #2b3b50;border-radius:.55cqw;padding:.65cqw .8cqw;font-size:.9cqw;line-height:1.25;margin-bottom:.5cqw}#iphone-duo .duo-ov-select{margin-top:.15cqw}'+
'#iphone-duo .duo-ov-ai{font-size:.82cqw;line-height:1.5;color:#d5dce7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#iphone-duo .duo-ov-ai.checked{color:#34d399;font-weight:700}#iphone-duo .duo-ov-ai span{color:#ecf1f7;margin-left:.28cqw}'+
'#iphone-duo .duo-ov-send{position:absolute;left:5%;right:4%;bottom:3.6%;padding:.72cqw .45cqw;border-radius:.5cqw;background:linear-gradient(90deg,#6d28d9,#8b5cf6);font-size:.86cqw;font-weight:800;text-align:center;color:#fff}'+
'#iphone-duo .duo-ov-modelhead{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:.5cqw;align-items:center;margin-bottom:.85cqw}#iphone-duo .duo-ov-model{width:2.6cqw;height:2.6cqw;border-radius:.55cqw;display:grid;place-items:center;background:#10a37f;color:#fff;font-size:1.4cqw;font-weight:900}.duo-ov-model.ppx{background:#0d6b78!important}#iphone-duo .duo-ov-modelhead b{display:block;font-size:1.05cqw}#iphone-duo .duo-ov-modelhead small{display:block;color:#8b96a7;font-size:.69cqw}#iphone-duo .duo-ov-modelhead i{font-style:normal;color:#8ba0c1;font-size:1.2cqw}'+
'#iphone-duo .duo-ov-mid p,#iphone-duo .duo-ov-right p{font-size:.82cqw;line-height:1.46;color:#cbd4df;margin:0 0 .9cqw}#iphone-duo .duo-ov-actions{position:absolute;left:5%;right:5%;bottom:3.5%;display:grid;grid-template-columns:repeat(4,1fr);gap:.3cqw}#iphone-duo .duo-ov-actions span{font-size:.62cqw;text-align:center;color:#dfe6ef;border:1px solid rgba(255,255,255,.08);border-radius:.35cqw;padding:.4cqw .1cqw}'+
'@media(max-width:760px){#iphone-duo .duo-ov-left{padding:1.25% 1.1%}#iphone-duo .duo-ov-mid,#iphone-duo .duo-ov-right{padding:1.25% .9%}}';
css.textContent+='/* MAC LOCALIZED TAB STYLE PARITY v9 */'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .pg-mac-full-overlay .pgdsl-tabs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;height:11%!important;background:#05080d!important;border-top:1px solid rgba(255,255,255,.035)!important;border-bottom:1px solid rgba(255,255,255,.065)!important;overflow:hidden!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .pg-mac-full-overlay .pgdsl-tabs span{display:flex!important;align-items:center!important;justify-content:center!important;min-width:0!important;padding:0 4px!important;margin:0!important;background:#05080d!important;color:rgba(255,255,255,.48)!important;border:0!important;border-bottom:3px solid transparent!important;border-radius:0!important;box-shadow:none!important;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",sans-serif!important;font-size:clamp(6px,.72vw,11px)!important;font-weight:600!important;line-height:1!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transition:color .16s ease,background .16s ease,border-color .16s ease,box-shadow .16s ease!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .pg-mac-full-overlay .pgdsl-tabs span.active{color:#f59e0b!important;background:rgba(245,158,11,.14)!important;border-bottom-color:#f59e0b!important;box-shadow:inset 0 0 0 1px rgba(245,158,11,.34),0 0 12px rgba(245,158,11,.16)!important}'+
'html:not([data-device-ui-lang="EN"]) #gallery-mac .pg-mac-full-overlay .pgdsl-tabs span:not(.active){color:rgba(255,255,255,.48)!important;background:#05080d!important;border-bottom-color:transparent!important;box-shadow:none!important}';
css.textContent+='/* HERO MAC TEXT-ONLY LOCALIZATION v17 — preserve approved render */'+
'.hero-device-stack .hero-mac-crop{position:relative!important}.pg-hero-mac-text-overlay{position:absolute!important;left:6.6%!important;top:3.8%!important;width:86.8%!important;height:80.8%!important;z-index:260!important;pointer-events:none!important;color:#fff!important;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",sans-serif!important}.pg-hero-mac-text-overlay .pg-hm{position:absolute!important;display:flex!important;align-items:center!important;box-sizing:border-box!important;overflow:hidden!important;white-space:nowrap!important;text-overflow:ellipsis!important}.pg-hero-mac-text-overlay .lang{right:2.9%!important;top:8.1%!important;height:6.2%!important;padding:0 .65em!important;border-radius:.45em!important;background:#171b25!important;font-size:clamp(5px,.85vw,10px)!important}.pg-hero-mac-text-overlay .tab{top:17.2%!important;height:7.4%!important;justify-content:center!important;background:#05080d!important;font-size:clamp(5px,.82vw,10px)!important;font-weight:600!important;color:#858b96!important}.pg-hero-mac-text-overlay .t1{left:0!important;width:25%!important;color:#f59e0b!important;border-bottom:2px solid #f59e0b!important}.pg-hero-mac-text-overlay .t2{left:25%!important;width:25%!important}.pg-hero-mac-text-overlay .t3{left:50%!important;width:25%!important}.pg-hero-mac-text-overlay .t4{left:75%!important;width:25%!important}.pg-hero-mac-text-overlay .title{left:4.2%!important;top:29.3%!important;width:28%!important;height:6.5%!important;background:#080c12!important;font-size:clamp(7px,1.35vw,15px)!important;font-weight:800!important}.pg-hero-mac-text-overlay .how{right:4%!important;top:31%!important;width:18%!important;height:4.8%!important;justify-content:flex-end!important;background:#080c12!important;color:#c084fc!important;text-decoration:underline!important;font-size:clamp(5px,.75vw,9px)!important}.pg-hero-mac-text-overlay .help{left:4.2%!important;width:51%!important;height:4.2%!important;background:#080c12!important;color:#aab2c0!important;font-size:clamp(4px,.66vw,8px)!important}.pg-hero-mac-text-overlay .h1{top:36.8%!important}.pg-hero-mac-text-overlay .h2{top:40.4%!important}.pg-hero-mac-text-overlay .h3{top:44%!important}.pg-hero-mac-text-overlay .h4{top:47.6%!important}.pg-hero-mac-text-overlay .output{left:4.2%!important;top:53.2%!important;width:24%!important;height:5.5%!important;background:#080c12!important;color:#aab2c0!important;font-size:clamp(4px,.68vw,8px)!important}.pg-hero-mac-text-overlay .select{left:28.4%!important;top:52.4%!important;width:31.5%!important;height:6.6%!important;padding:0 1.1em!important;background:#171b25!important;border:1px solid rgba(255,255,255,.10)!important;border-radius:.55em!important;font-size:clamp(4px,.7vw,8px)!important}.pg-hero-mac-text-overlay .prompt{left:4.1%!important;top:61.3%!important;width:91.8%!important;height:17.6%!important;justify-content:center!important;text-align:center!important;white-space:normal!important;background:#0c1017!important;color:#8d96a6!important;border:2px solid #7c3aed!important;border-radius:.55em!important;padding:1.2%!important;font-size:clamp(4px,.68vw,8px)!important;line-height:1.35!important}.pg-hero-mac-text-overlay .action{top:81.2%!important;height:6.5%!important;justify-content:center!important;background:#161c28!important;color:#cfd5df!important;border-radius:.35em!important;font-size:clamp(4px,.66vw,8px)!important}.pg-hero-mac-text-overlay .paste{left:4.1%!important;width:44.8%!important}.pg-hero-mac-text-overlay .imp{left:51.1%!important;width:44.8%!important}.pg-hero-mac-text-overlay .talk{left:4.1%!important;top:89.6%!important;width:20%!important;height:5.8%!important;background:#080c12!important;color:#aab2c0!important;font-size:clamp(4px,.66vw,8px)!important}.pg-hero-mac-text-overlay .send{right:4.1%!important;top:88.8%!important;width:13.5%!important;height:7.2%!important;justify-content:center!important;background:linear-gradient(90deg,#7c3aed,#2563eb)!important;border-radius:.45em!important;font-weight:700!important;font-size:clamp(4px,.68vw,8px)!important}@media(max-width:760px){.pg-hero-mac-text-overlay{left:6.1%!important;top:3.6%!important;width:87.8%!important;height:81%!important}.pg-hero-mac-text-overlay .tab,.pg-hero-mac-text-overlay .title,.pg-hero-mac-text-overlay .how,.pg-hero-mac-text-overlay .help,.pg-hero-mac-text-overlay .output,.pg-hero-mac-text-overlay .select,.pg-hero-mac-text-overlay .prompt,.pg-hero-mac-text-overlay .action,.pg-hero-mac-text-overlay .talk,.pg-hero-mac-text-overlay .send,.pg-hero-mac-text-overlay .lang{font-size:5px!important}}';
css.textContent+='/* GALLERY LOCALIZED DEVICE PARITY v18 */'+
'.pg-device-static-localized{position:absolute!important;inset:0!important;z-index:30!important;background:#0d0f1a!important;color:#fff!important;overflow:hidden!important;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",sans-serif!important}.pg-real-head{height:12%;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:2%;padding:2.2% 4%;background:#080b10;border-bottom:1px solid rgba(255,255,255,.06)}.pg-real-head img{width:auto!important;height:62%!important;max-width:none!important;border-radius:22%!important}.pg-real-head strong{font-size:clamp(7px,1.25vw,13px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pg-real-head span{font-size:clamp(6px,.9vw,10px);padding:.35em .65em;border-radius:.45em;background:rgba(255,255,255,.08);white-space:nowrap}.pg-real-tabs{height:10%;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));background:#070a0f;border-bottom:1px solid rgba(255,255,255,.07)}.pg-real-tabs span{display:flex;align-items:center;justify-content:center;min-width:0;padding:0 2px;font-size:clamp(5px,.82vw,9px);font-weight:600;color:rgba(255,255,255,.46);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:2px solid transparent}.pg-real-tabs span.active{color:#f59e0b;background:rgba(245,158,11,.08);border-bottom-color:#f59e0b}.pg-real-body{height:78%;padding:4% 5%;overflow:hidden;background:#0d1117}.pg-real-body h3{font-size:clamp(9px,1.55vw,16px);margin:0 0 3%;color:#fff}.pg-real-search{height:12%;display:flex;align-items:center;padding:0 3%;border:1px solid rgba(255,255,255,.12);border-radius:.65em;background:#1c2128;color:#8b949e;font-size:clamp(6px,.9vw,10px);margin-bottom:3%}.pg-real-template-grid{display:grid;grid-template-columns:1fr 1fr;gap:3%;height:68%}.pg-real-template-card{position:relative;min-width:0;padding:5%;border:1px solid rgba(255,255,255,.08);border-radius:.65em;background:#171c27;display:flex;flex-direction:column;justify-content:center}.pg-real-template-card b{font-size:clamp(6px,1vw,11px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pg-real-template-card small{color:#7dd3fc;font-size:clamp(5px,.72vw,8px);margin-top:3%}.pg-real-template-card span{position:absolute;right:6%;top:50%;transform:translateY(-50%);color:#6b7280}.pg-real-steps{display:grid;grid-template-columns:1fr;gap:4%;height:78%}.pg-real-steps>div{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:4%;padding:0 4%;border:1px solid rgba(255,255,255,.11);border-radius:.7em;background:#1c2128;color:#b3bac5;font-size:clamp(6px,.95vw,11px);overflow:hidden}.pg-real-steps b{width:1.8em;height:1.8em;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(125,211,252,.12);color:#7dd3fc}.pg-real-steps span{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pg-real-history-head{display:flex;align-items:center;justify-content:space-between;gap:3%;margin-bottom:3%}.pg-real-history-head h3{margin:0}.pg-real-history-head small{display:block;color:#8b949e;font-size:clamp(5px,.75vw,8px)}.pg-real-history-head>div:last-child{display:flex;gap:.4em}.pg-real-history-head>div:last-child span{padding:.35em .65em;border:1px solid rgba(255,255,255,.1);border-radius:.45em;font-size:clamp(5px,.72vw,8px)}.pg-real-history-list{display:grid;grid-template-columns:1fr;gap:3%}.pg-real-history-list>div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2%;padding:2.5% 3%;border:1px solid rgba(255,255,255,.08);border-radius:.6em;background:#171c27}.pg-real-history-list b,.pg-real-history-list p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pg-real-history-list b{font-size:clamp(6px,.9vw,10px)}.pg-real-history-list small{font-size:clamp(5px,.7vw,8px);color:#8b949e}.pg-real-history-list p{grid-column:1 / -1;color:#aab2c0;font-size:clamp(5px,.75vw,9px);margin:.2em 0}.pg-real-history-list em{font-style:normal;color:#7dd3fc;font-size:clamp(5px,.7vw,8px);margin-right:.5em}.pg-static-iphone .pg-real-head{height:13%}.pg-static-iphone .pg-real-tabs{height:11%}.pg-static-iphone .pg-real-body{height:76%}.pg-static-iphone .pg-real-template-grid{grid-template-columns:1fr!important}.pg-static-iphone .pg-real-template-card:nth-child(n+5){display:none}.pg-static-iphone .pg-real-head strong{font-size:7px}.pg-static-iphone .pg-real-head span,.pg-static-iphone .pg-real-tabs span,.pg-static-iphone .pg-real-body h3,.pg-static-iphone .pg-real-search,.pg-static-iphone .pg-real-template-card b,.pg-static-iphone .pg-real-template-card small,.pg-static-iphone .pg-real-steps>div,.pg-static-iphone .pg-real-history-list *{font-size:5.5px!important}.pg-static-ipad .pg-real-head strong{font-size:8px}.pg-static-ipad .pg-real-head span,.pg-static-ipad .pg-real-tabs span,.pg-static-ipad .pg-real-body h3,.pg-static-ipad .pg-real-search,.pg-static-ipad .pg-real-template-card b,.pg-static-ipad .pg-real-template-card small,.pg-static-ipad .pg-real-steps>div,.pg-static-ipad .pg-real-history-list *{font-size:6px!important}.mac-reference-stage{position:relative!important}.pg-mac-panel-localized{position:absolute!important;inset:0!important;z-index:120!important;background:#0d1117!important;color:#fff!important;overflow:hidden!important;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",sans-serif!important}.pg-mac-panel-localized .pg-real-head,.pg-mac-panel-localized .pg-real-tabs{display:none!important}.pg-mac-panel-localized .pg-real-body{height:100%!important;padding:4% 5%!important}.pg-mac-panel-localized .pg-real-body h3{font-size:clamp(10px,1.25vw,16px)!important}.pg-mac-panel-localized .pg-real-search,.pg-mac-panel-localized .pg-real-steps>div,.pg-mac-panel-localized .pg-real-template-card b{font-size:clamp(7px,.82vw,10px)!important}.pg-mac-panel-localized .pg-real-template-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}';
document.head.appendChild(css);
window._pgDeviceUI={apply:apply,appLanguages:APP_LANGS,_strings:strings};
window.addEventListener("pg:languagechange",function(e){apply(e.detail&&e.detail.code||current())});
document.addEventListener("click",function(e){
  if(e.target&&e.target.closest&&e.target.closest("#gallery-mac .mac-reference-tab")){
    setTimeout(function(){apply(current())},30);
  }
});
/* Fail-safe: the global picker can restore its saved language at DOMContentLoaded.
   Re-apply after layout/images settle so the Mac overlay can never remain on the
   baked-in English render while the rest of the page is localized. */
function reapplyStable(){apply(current());setTimeout(function(){apply(current())},80);setTimeout(function(){apply(current())},300);setTimeout(function(){apply(current())},900)}
window.addEventListener("pageshow",reapplyStable);
window.addEventListener("focus",function(){setTimeout(function(){apply(current())},30)});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reapplyStable);else reapplyStable();
})();
