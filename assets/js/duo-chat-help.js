/* Poly-Glot iPhone Duo help — 38 localized chatbot categories.
 * Adds visible Duo shortcuts, dropdown optgroup, and factual answers without
 * replacing the existing chat translation runtime or sending prompts to AI.
 */
(function () {
  "use strict";
  var rows = String.raw`
EN|iPhone Duo help|Overview|Folded screen|Unfolded screen|Compare AIs|Responses|When folded, use Ask Any AI in the normal single-screen workspace.|When unfolded, Ask Any AI is on the left and the comparison workspace is on the right.|Type your prompt and tap Send. Enable Compare Mode, select the AI providers, then open each one separately.|The AI apps run separately. Poly-Glot cannot read their replies. Return to the comparison workspace and enter each response in its labeled field.
ES|Ayuda de iPhone Duo|Vista general|Pantalla plegada|Pantalla desplegada|Comparar IA|Respuestas|Plegado, usa Ask Any AI en la pantalla habitual.|Desplegado, Ask Any AI está a la izquierda y el espacio de comparación a la derecha.|Escribe tu consulta y toca Enviar. Activa Comparar, selecciona las IA y abre cada una por separado.|Las apps de IA funcionan por separado. Poly-Glot no puede leer sus respuestas. Vuelve al espacio de comparación e introduce cada respuesta en su campo.
FR|Aide iPhone Duo|Présentation|Écran replié|Écran déplié|Comparer les IA|Réponses|Replié, utilisez Ask Any AI dans son interface habituelle.|Déplié, Ask Any AI est à gauche et l’espace de comparaison à droite.|Saisissez votre demande et touchez Envoyer. Activez Comparer, choisissez les IA et ouvrez-les séparément.|Les apps d’IA sont distinctes. Poly-Glot ne peut pas lire leurs réponses. Revenez à l’espace de comparaison et saisissez chaque réponse dans son champ.
DE|iPhone Duo-Hilfe|Übersicht|Zugeklappt|Aufgeklappt|KIs vergleichen|Antworten|Zugeklappt nutzen Sie Ask Any AI auf einem Bildschirm.|Aufgeklappt ist Ask Any AI links und der Vergleichsbereich rechts.|Prompt eingeben und Senden tippen. Vergleichsmodus aktivieren, KI-Anbieter auswählen und einzeln öffnen.|Die KI-Apps laufen separat. Poly-Glot kann ihre Antworten nicht lesen. Kehren Sie zum Vergleich zurück und tragen Sie jede Antwort in das passende Feld ein.
IT|Aiuto iPhone Duo|Panoramica|Schermo chiuso|Schermo aperto|Confronta le IA|Risposte|Da chiuso, usa Ask Any AI nella normale schermata singola.|Da aperto, Ask Any AI è a sinistra e il confronto a destra.|Scrivi il prompt e tocca Invia. Attiva Confronta, scegli le IA e apri ogni app separatamente.|Le app IA sono separate. Poly-Glot non può leggere le loro risposte. Torna al confronto e inserisci ogni risposta nel campo corretto.
PT|Ajuda do iPhone Duo|Visão geral|Tela dobrada|Tela aberta|Comparar IAs|Respostas|Dobrado, use Ask Any AI na tela única habitual.|Aberto, Ask Any AI fica à esquerda e a área de comparação à direita.|Digite seu prompt e toque em Enviar. Ative Comparar, escolha as IAs e abra cada uma separadamente.|Os apps de IA são separados. O Poly-Glot não lê as respostas. Volte à comparação e insira cada resposta no campo indicado.
NL|iPhone Duo-hulp|Overzicht|Ingevouwen scherm|Uitgevouwen scherm|AI vergelijken|Antwoorden|Ingevouwen gebruikt u Ask Any AI op het gewone scherm.|Uitgevouwen staat Ask Any AI links en de vergelijkingsruimte rechts.|Typ uw prompt en tik op Verzenden. Schakel Vergelijken in, kies AI-providers en open ze afzonderlijk.|AI-apps werken apart. Poly-Glot kan hun antwoorden niet lezen. Ga terug naar de vergelijking en voer elk antwoord in het juiste veld in.
RU|Справка iPhone Duo|Обзор|Сложенный экран|Развернутый экран|Сравнение ИИ|Ответы|В сложенном состоянии Ask Any AI работает в обычном режиме одного экрана.|В развернутом состоянии Ask Any AI слева, а область сравнения справа.|Введите запрос и нажмите «Отправить». Включите сравнение, выберите ИИ и открывайте их по очереди.|Приложения ИИ работают отдельно. Poly-Glot не читает их ответы. Вернитесь к сравнению и введите каждый ответ в свое поле.
ZH|iPhone Duo 帮助|概览|折叠屏幕|展开屏幕|比较 AI|回答|折叠时，可在单屏工作区正常使用 Ask Any AI。|展开时，左侧显示 Ask Any AI，右侧显示比较工作区。|输入提示词并点击发送。开启比较模式，选择 AI 提供商，然后分别打开。|AI 应用独立运行。Poly-Glot 无法读取其回答。返回比较工作区，将每个回答输入对应字段。
ZH-TW|iPhone Duo 說明|概覽|摺疊畫面|展開畫面|比較 AI|回覆|摺疊時，可在一般單螢幕工作區使用 Ask Any AI。|展開時，左側為 Ask Any AI，右側為比較工作區。|輸入提示詞並點選傳送。啟用比較模式，選擇 AI 供應商，再分別開啟。|AI App 獨立執行。Poly-Glot 無法讀取回覆。請返回比較工作區，將每則回覆輸入對應欄位。
JA|iPhone Duo ヘルプ|概要|折りたたみ時|展開時|AI を比較|回答|折りたたみ時は通常の単一画面で Ask Any AI を使います。|展開時は左側に Ask Any AI、右側に比較ワークスペースが表示されます。|プロンプトを入力して送信をタップ。比較モードを有効にし、AI を選んで個別に開きます。|AI アプリは別々に動作し、Poly-Glot は回答を読み取れません。比較画面に戻り、各回答を対応する欄に入力してください。
KO|iPhone Duo 도움말|개요|접힌 화면|펼친 화면|AI 비교|응답|접었을 때는 일반 단일 화면에서 Ask Any AI를 사용하세요.|펼치면 왼쪽에 Ask Any AI, 오른쪽에 비교 작업 공간이 표시됩니다.|프롬프트를 입력하고 보내기를 누르세요. 비교 모드를 켜고 AI를 선택한 뒤 각각 여세요.|AI 앱은 별도로 실행됩니다. Poly-Glot은 응답을 읽을 수 없습니다. 비교 화면으로 돌아와 각 응답을 해당 입력란에 넣으세요.
AR|مساعدة iPhone Duo|نظرة عامة|الشاشة المطوية|الشاشة المفتوحة|مقارنة الذكاء الاصطناعي|الردود|عند الطي، استخدم Ask Any AI في شاشة واحدة كالمعتاد.|عند فتح الجهاز، يظهر Ask Any AI يسارًا ومساحة المقارنة يمينًا.|اكتب طلبك واضغط إرسال. فعّل وضع المقارنة واختر خدمات الذكاء الاصطناعي وافتح كلًا منها على حدة.|تعمل تطبيقات الذكاء الاصطناعي بشكل منفصل، ولا يستطيع Poly-Glot قراءة الردود. عد إلى مساحة المقارنة وأدخل كل رد في حقله.
HI|iPhone Duo सहायता|परिचय|मुड़ी स्क्रीन|खुली स्क्रीन|AI तुलना|जवाब|फ़ोन मोड़ने पर सामान्य एकल स्क्रीन में Ask Any AI इस्तेमाल करें।|फ़ोन खोलने पर बाईं ओर Ask Any AI और दाईं ओर तुलना कार्यक्षेत्र दिखता है।|प्रॉम्प्ट लिखकर भेजें दबाएँ। तुलना मोड चालू करें, AI चुनें और प्रत्येक ऐप अलग से खोलें।|AI ऐप अलग चलते हैं। Poly-Glot उनके जवाब नहीं पढ़ सकता। तुलना पर लौटें और हर जवाब उसके फ़ील्ड में दर्ज करें।
BN|iPhone Duo সহায়তা|সংক্ষিপ্ত বিবরণ|ভাঁজ করা স্ক্রিন|খোলা স্ক্রিন|AI তুলনা|উত্তর|ভাঁজ করা অবস্থায় সাধারণ একক স্ক্রিনে Ask Any AI ব্যবহার করুন।|খোলা অবস্থায় বামে Ask Any AI এবং ডানে তুলনার অংশ থাকে।|প্রম্পট লিখে Send চাপুন। Compare Mode চালু করে AI নির্বাচন করুন এবং প্রতিটি আলাদাভাবে খুলুন।|AI অ্যাপগুলি আলাদা চলে। Poly-Glot তাদের উত্তর পড়তে পারে না। তুলনায় ফিরে প্রতিটি উত্তর তার ঘরে লিখুন।
TR|iPhone Duo yardımı|Genel bakış|Katlı ekran|Açık ekran|Yapay zekaları karşılaştır|Yanıtlar|Katlıyken Ask Any AI'ı normal tek ekranda kullanın.|Açıkken Ask Any AI solda, karşılaştırma alanı sağdadır.|İsteminizi yazıp Gönder'e dokunun. Karşılaştırma Modu'nu açın, yapay zekaları seçip ayrı ayrı açın.|Yapay zeka uygulamaları ayrıdır. Poly-Glot yanıtlarını okuyamaz. Karşılaştırmaya dönüp her yanıtı uygun alana girin.
PL|Pomoc iPhone Duo|Przegląd|Ekran złożony|Ekran rozłożony|Porównaj AI|Odpowiedzi|Po złożeniu korzystaj z Ask Any AI na zwykłym pojedynczym ekranie.|Po rozłożeniu Ask Any AI jest po lewej, a porównanie po prawej.|Wpisz polecenie i stuknij Wyślij. Włącz tryb porównania, wybierz AI i otwórz każdą osobno.|Aplikacje AI działają oddzielnie. Poly-Glot nie może czytać odpowiedzi. Wróć do porównania i wpisz każdą odpowiedź w jej pole.
SV|iPhone Duo-hjälp|Översikt|Hopfälld skärm|Utfälld skärm|Jämför AI|Svar|Hopfälld använder du Ask Any AI på den vanliga skärmen.|Utfälld visas Ask Any AI till vänster och jämförelsen till höger.|Skriv din fråga och tryck Skicka. Slå på jämförelseläge, välj AI och öppna dem var för sig.|AI-apparna körs separat. Poly-Glot kan inte läsa deras svar. Gå tillbaka och skriv varje svar i rätt fält.
NO|iPhone Duo-hjelp|Oversikt|Sammenfoldet skjerm|Utfoldet skjerm|Sammenlign AI|Svar|Sammenfoldet bruker du Ask Any AI på vanlig enkeltskjerm.|Utfoldet vises Ask Any AI til venstre og sammenligningen til høyre.|Skriv spørsmålet og trykk Send. Aktiver sammenligningsmodus, velg AI og åpne dem hver for seg.|AI-appene kjører separat. Poly-Glot kan ikke lese svarene deres. Gå tilbake og skriv hvert svar i riktig felt.
DA|iPhone Duo-hjælp|Oversigt|Foldet skærm|Udfoldet skærm|Sammenlign AI|Svar|Foldet bruges Ask Any AI på den normale skærm.|Udfoldet vises Ask Any AI til venstre og sammenligningen til højre.|Skriv din prompt og tryk Send. Slå sammenligning til, vælg AI og åbn dem hver for sig.|AI-apps kører separat. Poly-Glot kan ikke læse deres svar. Gå tilbage og indtast hvert svar i det rigtige felt.
FI|iPhone Duo -ohje|Yleiskatsaus|Taitettu näyttö|Avattu näyttö|Vertaa tekoälyjä|Vastaukset|Taitettuna käytä Ask Any AI -toimintoa tavallisella näytöllä.|Avattuna Ask Any AI on vasemmalla ja vertailutila oikealla.|Kirjoita kehote ja napauta Lähetä. Ota vertailutila käyttöön, valitse tekoälyt ja avaa ne erikseen.|Tekoälysovellukset toimivat erikseen. Poly-Glot ei voi lukea vastauksia. Palaa vertailuun ja syötä vastaus omaan kenttään.
EL|Βοήθεια iPhone Duo|Επισκόπηση|Διπλωμένη οθόνη|Ανοιχτή οθόνη|Σύγκριση AI|Απαντήσεις|Όταν είναι διπλωμένο, χρησιμοποιήστε το Ask Any AI στην κανονική οθόνη.|Όταν ανοίγει, το Ask Any AI είναι αριστερά και η σύγκριση δεξιά.|Γράψτε την ερώτηση και πατήστε Αποστολή. Ενεργοποιήστε τη σύγκριση, επιλέξτε AI και ανοίξτε τα ξεχωριστά.|Οι εφαρμογές AI λειτουργούν χωριστά. Το Poly-Glot δεν διαβάζει απαντήσεις. Επιστρέψτε στη σύγκριση και γράψτε κάθε απάντηση στο πεδίο της.
HE|עזרה ל-iPhone Duo|סקירה|מסך מקופל|מסך פתוח|השוואת AI|תשובות|כשהמכשיר מקופל, משתמשים ב-Ask Any AI במסך הרגיל.|כשהמכשיר פתוח, Ask Any AI משמאל ואזור ההשוואה מימין.|מקלידים בקשה ולוחצים על שליחה. מפעילים מצב השוואה, בוחרים שירותי AI ופותחים כל אחד בנפרד.|אפליקציות ה-AI פועלות בנפרד. Poly-Glot אינו קורא את התשובות שלהן. חזרו להשוואה והזינו כל תשובה בשדה המתאים.
ID|Bantuan iPhone Duo|Ringkasan|Layar terlipat|Layar terbuka|Bandingkan AI|Jawaban|Saat terlipat, gunakan Ask Any AI pada layar tunggal biasa.|Saat dibuka, Ask Any AI ada di kiri dan area perbandingan di kanan.|Ketik prompt lalu ketuk Kirim. Aktifkan Mode Bandingkan, pilih AI, lalu buka satu per satu.|Aplikasi AI berjalan terpisah. Poly-Glot tidak bisa membaca jawabannya. Kembali ke perbandingan dan isi tiap jawaban pada kolomnya.
MS|Bantuan iPhone Duo|Gambaran|Skrin dilipat|Skrin dibuka|Bandingkan AI|Jawapan|Apabila dilipat, gunakan Ask Any AI pada skrin tunggal biasa.|Apabila dibuka, Ask Any AI di kiri dan ruang perbandingan di kanan.|Taip prompt dan ketik Hantar. Hidupkan Mod Banding, pilih AI dan buka satu demi satu.|Aplikasi AI berjalan berasingan. Poly-Glot tidak boleh membaca jawapannya. Kembali ke perbandingan dan masukkan setiap jawapan dalam medannya.
TH|วิธีใช้ iPhone Duo|ภาพรวม|หน้าจอพับ|หน้าจอกาง|เปรียบเทียบ AI|คำตอบ|เมื่อพับ ให้ใช้ Ask Any AI บนหน้าจอเดียวตามปกติ|เมื่อกาง Ask Any AI จะอยู่ด้านซ้ายและพื้นที่เปรียบเทียบอยู่ด้านขวา|พิมพ์คำสั่งแล้วแตะส่ง เปิดโหมดเปรียบเทียบ เลือก AI แล้วเปิดแต่ละแอปแยกกัน|แอป AI ทำงานแยกกัน Poly-Glot อ่านคำตอบไม่ได้ กลับสู่พื้นที่เปรียบเทียบและใส่แต่ละคำตอบในช่องที่กำหนด
VI|Trợ giúp iPhone Duo|Tổng quan|Màn hình gập|Màn hình mở|So sánh AI|Phản hồi|Khi gập, dùng Ask Any AI trên màn hình đơn thông thường.|Khi mở, Ask Any AI ở bên trái và vùng so sánh ở bên phải.|Nhập lời nhắc rồi nhấn Gửi. Bật chế độ So sánh, chọn AI và mở từng ứng dụng riêng.|Các ứng dụng AI hoạt động riêng. Poly-Glot không thể đọc phản hồi. Quay lại vùng so sánh và nhập từng phản hồi vào ô tương ứng.
UK|Допомога iPhone Duo|Огляд|Складений екран|Розгорнутий екран|Порівняння ШІ|Відповіді|У складеному вигляді використовуйте Ask Any AI на звичайному екрані.|У розгорнутому вигляді Ask Any AI ліворуч, а порівняння праворуч.|Введіть запит і натисніть Надіслати. Увімкніть порівняння, виберіть ШІ та відкрийте кожен окремо.|Застосунки ШІ працюють окремо. Poly-Glot не читає відповіді. Поверніться до порівняння та введіть кожну відповідь у своє поле.
CS|Nápověda iPhone Duo|Přehled|Složená obrazovka|Rozložená obrazovka|Porovnání AI|Odpovědi|Ve složeném stavu používejte Ask Any AI na běžné obrazovce.|V rozloženém stavu je Ask Any AI vlevo a porovnání vpravo.|Napište dotaz a klepněte na Odeslat. Zapněte režim porovnání, vyberte AI a otevřete je jednotlivě.|Aplikace AI běží samostatně. Poly-Glot nedokáže číst odpovědi. Vraťte se k porovnání a zadejte každou odpověď do jejího pole.
RO|Ajutor iPhone Duo|Prezentare|Ecran pliat|Ecran deschis|Compară AI|Răspunsuri|Când e pliat, folosește Ask Any AI pe ecranul obișnuit.|Când e deschis, Ask Any AI este în stânga și comparația în dreapta.|Scrie solicitarea și apasă Trimite. Activează modul de comparare, alege AI și deschide-le separat.|Aplicațiile AI rulează separat. Poly-Glot nu le poate citi răspunsurile. Revino la comparație și introdu fiecare răspuns în câmpul său.
HU|iPhone Duo súgó|Áttekintés|Összecsukva|Kinyitva|AI összehasonlítás|Válaszok|Összecsukva az Ask Any AI a szokásos egyképernyős módban használható.|Kinyitva az Ask Any AI balra, az összehasonlítás jobbra kerül.|Írja be a kérést, és koppintson a Küldésre. Kapcsolja be az összehasonlítást, válassza ki az AI-kat, majd nyissa meg őket külön.|Az AI-alkalmazások külön futnak. A Poly-Glot nem olvassa a válaszaikat. Térjen vissza, és írja minden választ a megfelelő mezőbe.
SK|Pomocník iPhone Duo|Prehľad|Zložená obrazovka|Rozložená obrazovka|Porovnanie AI|Odpovede|V zloženom stave používajte Ask Any AI na bežnej obrazovke.|V rozloženom stave je Ask Any AI vľavo a porovnanie vpravo.|Napíšte otázku a ťuknite na Odoslať. Zapnite porovnávanie, vyberte AI a otvorte ich samostatne.|AI aplikácie bežia oddelene. Poly-Glot nevie čítať ich odpovede. Vráťte sa a každú odpoveď vložte do správneho poľa.
HR|Pomoć za iPhone Duo|Pregled|Sklopljen zaslon|Rasklopljen zaslon|Usporedi AI|Odgovori|Kad je sklopljen, koristite Ask Any AI na uobičajenom zaslonu.|Kad je rasklopljen, Ask Any AI nalazi se lijevo, a usporedba desno.|Upišite upit i dodirnite Pošalji. Uključite usporedbu, odaberite AI i otvorite ih pojedinačno.|AI aplikacije rade odvojeno. Poly-Glot ne čita njihove odgovore. Vratite se i unesite svaki odgovor u odgovarajuće polje.
CA|Ajuda d’iPhone Duo|Resum|Pantalla plegada|Pantalla desplegada|Compara IA|Respostes|Plegat, utilitza Ask Any AI a la pantalla única habitual.|Desplegat, Ask Any AI és a l’esquerra i l’espai de comparació a la dreta.|Escriu el missatge i toca Envia. Activa la comparació, tria les IA i obre cadascuna per separat.|Les apps d’IA són independents. Poly-Glot no en pot llegir les respostes. Torna a la comparació i posa cada resposta al camp corresponent.
AF|iPhone Duo-hulp|Oorsig|Gevoude skerm|Oopgevoude skerm|Vergelyk KI|Antwoorde|Wanneer dit gevou is, gebruik Ask Any AI op die gewone skerm.|Wanneer dit oopgevou is, is Ask Any AI links en die vergelyking regs.|Tik jou opdrag en druk Stuur. Skakel Vergelyk aan, kies KI-dienste en maak elkeen apart oop.|KI-programme werk apart. Poly-Glot kan nie antwoorde lees nie. Keer terug na Vergelyk en voer elke antwoord in sy veld in.
SW|Msaada wa iPhone Duo|Muhtasari|Skrini iliyokunjwa|Skrini iliyofunguliwa|Linganisha AI|Majibu|Ikiwa imekunjwa, tumia Ask Any AI kwenye skrini moja ya kawaida.|Ikifunguliwa, Ask Any AI iko kushoto na eneo la kulinganisha kulia.|Andika swali na uguse Tuma. Washa hali ya kulinganisha, chagua AI na ufungue kila moja kando.|Programu za AI zinafanya kazi kando. Poly-Glot haiwezi kusoma majibu yao. Rudi kwenye ulinganisho na weka kila jibu kwenye sehemu yake.
HA|Taimakon iPhone Duo|Bayani|Allo a naɗe|Allo a buɗe|Kwatanta AI|Amsoshi|Idan an naɗe, yi amfani da Ask Any AI a allo ɗaya kamar yadda aka saba.|Idan an buɗe, Ask Any AI yana hagu, wurin kwatantawa yana dama.|Rubuta tambaya ka taɓa Aika. Kunna yanayin kwatantawa, zaɓi AI ka buɗe kowannensu daban.|Manhajojin AI suna aiki daban. Poly-Glot ba zai iya karanta amsoshinsu ba. Koma wurin kwatantawa ka saka kowace amsa a filinta.
AM|የiPhone Duo እገዛ|አጠቃላይ እይታ|የታጠፈ ማያ|የተከፈተ ማያ|AI አወዳድር|ምላሾች|ሲታጠፍ Ask Any AIን በመደበኛው አንድ ማያ ይጠቀሙ።|ሲከፈት Ask Any AI በግራ እና የማወዳደሪያ ክፍል በቀኝ ይታያሉ።|ጥያቄ ጻፉና ላክ ይጫኑ። ማወዳደርን አብሩ፣ AI ይምረጡና እያንዳንዱን በተናጠል ይክፈቱ።|የAI መተግበሪያዎች ለብቻቸው ይሰራሉ። Poly-Glot ምላሾቻቸውን ማንበብ አይችልም። ወደ ማወዳደሪያው ይመለሱና እያንዳንዱን ምላሽ በትክክለኛው መስክ ያስገቡ።
`.trim();
  var translations = Object.create(null);
  rows.split(/\n/).forEach(function (line) {
    var bits = line.split("|");
    if (bits.length === 11) translations[bits[0]] = bits.slice(1);
  });
  translations.ZH_TW = translations["ZH-TW"];

  function lang() {
    var raw = (window._pgChatLang || (window._pgI18n && window._pgI18n.curLang && window._pgI18n.curLang()) || document.documentElement.lang || "EN").toUpperCase().replace("_", "-");
    var aliases = {"EN-US":"EN","EN-GB":"EN","PT-BR":"PT","PT-PT":"PT","ZH-HANS":"ZH","ZH-HANT":"ZH-TW"};
    return aliases[raw] || raw;
  }
  function local() {return translations[lang()] || translations.EN;}
  var kinds = ["overview","folded","unfolded","compare","responses"];
  function heading(kind) {
    var l = local();
    var idx = kinds.indexOf(kind);
    return "📱 iPhone Duo · " + l[idx+1];
  }
  function answer(kind) {
    var l = local();
    if (kind === "overview") {
      var chat = window._pgChatI18n;
      var duo = chat && chat.DUO;
      var data = duo && (duo[lang()] || duo[lang().replace("-","_")] || duo.EN);
      return "**" + heading("overview") + "**\n\n" + (l[6] + " " + l[7]) +
        "\n\n[iPhone Duo](https://hmoses.github.io/poly-glot-site/#iphone-duo)";
    }
    var ix = kinds.indexOf(kind);
    return "**" + heading(kind) + "**\n\n" + l[ix+5] +
      "\n\n[iPhone Duo](https://hmoses.github.io/poly-glot-site/#iphone-duo)";
  }
  function keyFor(q) {
    q = String(q || "").toLocaleLowerCase().trim();
    if (!q) return null;
    var menu = local();
    for (var i = 0; i < kinds.length; i++) {
      if (q === heading(kinds[i]).toLocaleLowerCase() || q === ("duo:" + kinds[i])) return kinds[i];
    }
    if (/\b(iphone[ -]?duo|duo)\b/.test(q) && /\b(folded|closed|fold|collapsed)\b/.test(q)) return "folded";
    if (/\b(iphone[ -]?duo|duo)\b/.test(q) && /\b(unfold|open|expanded)\b/.test(q)) return "unfolded";
    if (/\b(iphone[ -]?duo|duo)\b/.test(q) && /\b(compare|select ai|providers?)\b/.test(q)) return "compare";
    if (/\b(iphone[ -]?duo|duo)\b/.test(q) && /\b(responses?|paste|read replies|answers?)\b/.test(q)) return "responses";
    return null;
  }
  window._pgDuoHelpLookup = function(q) {
    var k = keyFor(q);
    return k ? answer(k) : null;
  };

  function init() {
    var wrap = document.getElementById("pgChat-topics-bar");
    var select = document.getElementById("pgChat-topics-select");
    if (!wrap || !select) return;
    var quick = document.getElementById("pgChat-duo-quick");
    if (!quick) {
      quick = document.createElement("div");
      quick.id = "pgChat-duo-quick";
      quick.setAttribute("role","group");
      var header = document.createElement("div");
      header.id = "pgChat-duo-label";
      quick.appendChild(header);
      var chips = document.createElement("div");
      chips.id = "pgChat-duo-chips";
      kinds.forEach(function(kind) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-duo-kind",kind);
        b.addEventListener("click",function() {
          if (window.pgChat && window.pgChat.ask) window.pgChat.ask(heading(kind));
        });
        chips.appendChild(b);
      });
      quick.appendChild(chips);
      wrap.insertBefore(quick,select);
    }
    var group = document.getElementById("pgChat-duo-group");
    if (!group) {
      group = document.createElement("optgroup");
      group.id = "pgChat-duo-group";
      var old = Array.prototype.find.call(select.options,function(o){return o.value === "iPhone Duo";});
      if (old) group.appendChild(old);
      kinds.forEach(function(kind) {
        if (kind === "overview") return;
        var o = document.createElement("option");
        o.value = "duo:" + kind;
        o.setAttribute("data-duo-kind",kind);
        group.appendChild(o);
      });
      select.insertBefore(group,select.options[1] || null);
    }
    initFaq();
    refresh();
  }

  function initFaq() {
    var list = document.querySelector('#faq .faq-list');
    if (!list || document.getElementById('pgFaq-duo')) return;
    var group = document.createElement('div');
    group.id = 'pgFaq-duo';
    var title = document.createElement('h3');
    title.id = 'pgFaq-duo-title';
    title.style.cssText = 'font-size:1.05rem;color:#c5beff;margin:22px 0 5px;';
    group.appendChild(title);
    kinds.forEach(function(kind) {
      var item = document.createElement('div');
      item.className = 'faq-item';
      item.setAttribute('data-duo-faq',kind);
      var question = document.createElement('div');
      question.className = 'faq-q';
      question.tabIndex = 0;
      question.setAttribute('role','button');
      question.setAttribute('aria-expanded','false');
      var questionText = document.createElement('span');
      questionText.className = 'pgFaq-duo-question';
      var toggle = document.createElement('span');
      toggle.className = 'toggle';
      toggle.setAttribute('aria-hidden','true');
      toggle.textContent = '+';
      question.appendChild(questionText);
      question.appendChild(toggle);
      var answer = document.createElement('div');
      answer.className = 'faq-a';
      var p = document.createElement('p');
      p.className = 'pgFaq-duo-answer';
      answer.appendChild(p);
      question.addEventListener('click',function() {
        if (typeof window.toggleFaq === 'function') window.toggleFaq(question);
        else if (typeof toggleFaq === 'function') toggleFaq(question);
        question.setAttribute('aria-expanded',String(answer.classList.contains('open')));
      });
      question.addEventListener('keydown',function(ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); question.click(); }
      });
      item.appendChild(question);
      item.appendChild(answer);
      group.appendChild(item);
    });
    // Keep the general product FAQs first, with Duo questions prominent below.
    list.insertBefore(group,list.children[2] || null);
  }

  function refreshFaq() {
    var group = document.getElementById('pgFaq-duo');
    if (!group) return;
    var l = local();
    document.getElementById('pgFaq-duo-title').textContent = '📱 ' + l[0];
    group.querySelectorAll('[data-duo-faq]').forEach(function(item) {
      var kind = item.getAttribute('data-duo-faq');
      var index = kinds.indexOf(kind);
      item.querySelector('.pgFaq-duo-question').textContent = 'iPhone Duo · ' + l[index+1];
      item.querySelector('.pgFaq-duo-answer').textContent = kind === 'overview' ? l[6] + ' ' + l[7] : l[index+5];
    });
  }

  function refresh() {
    refreshFaq();
    var quick = document.getElementById("pgChat-duo-quick");
    var group = document.getElementById("pgChat-duo-group");
    if (!quick || !group) return;
    var l = local();
    quick.setAttribute("aria-label",l[0]);
    document.getElementById("pgChat-duo-label").textContent = "📱 " + l[0];
    group.label = "📱 " + l[0];
    quick.querySelectorAll("[data-duo-kind]").forEach(function(el) {
      el.textContent = l[kinds.indexOf(el.getAttribute("data-duo-kind")) + 1];
    });
    Array.prototype.forEach.call(group.querySelectorAll("option"),function(o) {
      if (o.value === "iPhone Duo") {
        o.textContent = l[1];
      } else if (o.hasAttribute("data-duo-kind")) {
        o.textContent = heading(o.getAttribute("data-duo-kind"));
      }
    });
  }
  var style = document.createElement("style");
  style.id = "pgChat-duo-visible-38";
  style.textContent = "#pgChat-duo-quick{margin-bottom:7px}" +
    "#pgChat-duo-label{color:#d5d8ff;font-weight:700;font-size:.76rem;margin:0 0 5px 2px}" +
    "#pgChat-duo-chips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin;padding:0 0 3px;max-width:100%;-webkit-overflow-scrolling:touch}" +
    "#pgChat-duo-chips button{flex:0 0 auto;border:1px solid rgba(129,119,255,.55);border-radius:999px;background:rgba(116,82,217,.14);color:#f0efff;font-size:.74rem;line-height:1.25;padding:7px 10px;min-height:32px;cursor:pointer;font-family:inherit}" +
    "#pgChat-duo-chips button:focus-visible{outline:2px solid #b7abff;outline-offset:2px}" +
    "#pgChat-duo-chips button:hover{background:rgba(116,82,217,.3)}";
  (document.head || document.documentElement).appendChild(style);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
  window.addEventListener("pg:languagechange",refresh);
  document.addEventListener("change",function(ev) {
    if (ev.target && ev.target.id !== "pgChat-topics-select") Promise.resolve().then(refresh);
  },true);
  if (window.MutationObserver) {
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  }
})();
