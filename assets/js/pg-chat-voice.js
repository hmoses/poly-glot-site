/* Poly-Glot chat voice: Web Speech input + LanceDB-style playback.
 * 38 site locales. Local device voices only; never substitute a different language.
 * Speech recognition may use the browser's remote service (not this website).
 */
(function () {
  "use strict";
  var CODE_LOCALE = {
    EN:"en-US", ES:"es-ES", FR:"fr-FR", DE:"de-DE", IT:"it-IT",
    PT:"pt-BR", NL:"nl-NL", RU:"ru-RU", ZH:"zh-CN", ZH_TW:"zh-TW",
    JA:"ja-JP", KO:"ko-KR", AR:"ar-SA", HI:"hi-IN", BN:"bn-BD",
    TR:"tr-TR", PL:"pl-PL", SV:"sv-SE", NO:"nb-NO", DA:"da-DK",
    FI:"fi-FI", EL:"el-GR", HE:"he-IL", ID:"id-ID", MS:"ms-MY",
    TH:"th-TH", VI:"vi-VN", UK:"uk-UA", CS:"cs-CZ", RO:"ro-RO",
    HU:"hu-HU", SK:"sk-SK", HR:"hr-HR", CA:"ca-ES", AF:"af-ZA",
    SW:"sw-KE", HA:"ha-NG", AM:"am-ET"
  };
  // mic | stop dictation | replay | stop playback | listening | auto speak
  var LOCALE_LABELS = String.raw`
EN|Ask aloud|Stop listening|Read reply aloud|Stop speaking|Listening…|Read replies automatically
ES|Preguntar por voz|Dejar de escuchar|Leer respuesta en voz alta|Detener voz|Escuchando…|Leer respuestas automáticamente
FR|Poser une question à l'oral|Arrêter l'écoute|Lire la réponse à voix haute|Arrêter la lecture|Écoute en cours…|Lire les réponses automatiquement
DE|Frage sprechen|Zuhören beenden|Antwort vorlesen|Sprachausgabe stoppen|Ich höre zu…|Antworten automatisch vorlesen
IT|Fai una domanda a voce|Smetti di ascoltare|Leggi la risposta|Interrompi la voce|In ascolto…|Leggi automaticamente le risposte
PT|Perguntar por voz|Parar de ouvir|Ler resposta em voz alta|Parar leitura|Ouvindo…|Ler respostas automaticamente
NL|Vraag inspreken|Stop met luisteren|Antwoord voorlezen|Stop voorlezen|Luisteren…|Antwoorden automatisch voorlezen
RU|Задать вопрос голосом|Остановить прослушивание|Прочитать ответ вслух|Остановить озвучивание|Слушаю…|Читать ответы автоматически
ZH|语音提问|停止聆听|朗读回答|停止朗读|正在聆听…|自动朗读回答
ZH_TW|語音提問|停止聆聽|朗讀回覆|停止朗讀|正在聆聽…|自動朗讀回覆
JA|声で質問|聞き取りを停止|回答を読み上げる|読み上げを停止|聞き取り中…|回答を自動読み上げ
KO|음성으로 질문|듣기 중지|답변 읽어 주기|음성 중지|듣는 중…|답변 자동 읽기
AR|اسأل بصوتك|إيقاف الاستماع|قراءة الرد بصوت عالٍ|إيقاف الصوت|جارٍ الاستماع…|قراءة الردود تلقائيًا
HI|बोलकर पूछें|सुनना बंद करें|उत्तर सुनें|आवाज़ बंद करें|सुन रहे हैं…|उत्तर अपने आप सुनाएँ
BN|কথা বলে প্রশ্ন করুন|শোনা বন্ধ করুন|উত্তর শুনুন|পড়া বন্ধ করুন|শোনা হচ্ছে…|স্বয়ংক্রিয়ভাবে উত্তর পড়ুন
TR|Sesle sor|Dinlemeyi durdur|Yanıtı sesli oku|Seslendirmeyi durdur|Dinleniyor…|Yanıtları otomatik seslendir
PL|Zadaj pytanie głosowo|Przestań słuchać|Odczytaj odpowiedź|Zatrzymaj odczyt|Słucham…|Czytaj odpowiedzi automatycznie
SV|Ställ en fråga med rösten|Sluta lyssna|Läs upp svaret|Stoppa uppläsning|Lyssnar…|Läs upp svar automatiskt
NO|Still et spørsmål med stemmen|Stopp lytting|Les opp svaret|Stopp opplesing|Lytter…|Les opp svar automatisk
DA|Stil et spørgsmål med stemmen|Stop med at lytte|Læs svaret højt|Stop oplæsning|Lytter…|Læs svar op automatisk
FI|Kysy puhumalla|Lopeta kuuntelu|Lue vastaus ääneen|Lopeta puhe|Kuunnellaan…|Lue vastaukset automaattisesti
EL|Ρωτήστε με τη φωνή σας|Διακοπή ακρόασης|Εκφώνηση απάντησης|Διακοπή ομιλίας|Ακούω…|Αυτόματη εκφώνηση απαντήσεων
HE|שאלו בקול|הפסק להאזין|הקראת התשובה|הפסק הקראה|מקשיב…|הקראת תשובות אוטומטית
ID|Bertanya dengan suara|Berhenti mendengarkan|Bacakan jawaban|Hentikan suara|Mendengarkan…|Bacakan jawaban otomatis
MS|Tanya dengan suara|Berhenti mendengar|Baca jawapan dengan suara|Hentikan bacaan|Mendengar…|Baca jawapan secara automatik
TH|ถามด้วยเสียง|หยุดฟัง|อ่านคำตอบออกเสียง|หยุดอ่าน|กำลังฟัง…|อ่านคำตอบอัตโนมัติ
VI|Hỏi bằng giọng nói|Dừng nghe|Đọc câu trả lời|Dừng đọc|Đang nghe…|Tự động đọc câu trả lời
UK|Запитати голосом|Зупинити прослуховування|Озвучити відповідь|Зупинити озвучення|Слухаю…|Автоматично озвучувати відповіді
CS|Zeptat se hlasem|Ukončit poslech|Přečíst odpověď|Zastavit předčítání|Poslouchám…|Automaticky číst odpovědi
RO|Întreabă vocal|Oprește ascultarea|Citește răspunsul|Oprește redarea|Ascult…|Citește automat răspunsurile
HU|Kérdezz hanggal|Hallgatás leállítása|Válasz felolvasása|Felolvasás leállítása|Figyelek…|Válaszok automatikus felolvasása
SK|Opýtať sa hlasom|Zastaviť počúvanie|Prečítať odpoveď|Zastaviť čítanie|Počúvam…|Automaticky čítať odpovede
HR|Postavi pitanje glasom|Prestani slušati|Pročitaj odgovor naglas|Zaustavi čitanje|Slušam…|Automatski čitaj odgovore
CA|Pregunta amb la veu|Deixa d'escoltar|Llegeix la resposta en veu alta|Atura la veu|Escoltant…|Llegeix les respostes automàticament
AF|Vra met jou stem|Hou op luister|Lees antwoord hardop|Stop voorlees|Luister…|Lees antwoorde outomaties
SW|Uliza kwa sauti|Acha kusikiliza|Soma jibu kwa sauti|Acha kusoma|Ninasikiliza…|Soma majibu kiotomatiki
HA|Yi tambaya da murya|Daina sauraro|Karanta amsa da murya|Dakatar da magana|Ana sauraro…|Karanta amsoshi kai tsaye
AM|በድምፅ ይጠይቁ|ማዳመጥ አቁም|መልሱን በድምፅ አንብብ|ንግግርን አቁም|በማዳመጥ ላይ…|መልሶችን በራስ-ሰር አንብብ`;
  var labels = {};
  LOCALE_LABELS.trim().split("\n").forEach(function(row){
    var parts = row.split("|"); labels[parts.shift()] = parts;
  });
  var synth = ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) ? window.speechSynthesis : null;
  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var activeRecognition = null, manualStop = false, resultText = "";
  var token = 0, speaking = false, pendingVoiceAnswer = false, autoSpeak = false;
  var currentLang = "", selectedVoice = null, voices = [];
  var mic, select, autoButton, status, msgHost;

  function code() {
    var raw = (window._pgI18n && typeof window._pgI18n.curLang === "function" && window._pgI18n.curLang()) ||
      window._pgChatLang || document.documentElement.lang || "EN";
    raw = String(raw).toUpperCase().replace(/-/g,"_");
    if (raw === "ZH_HANT" || raw === "ZH_HK") raw = "ZH_TW";
    if (raw === "NB" || raw === "NN") raw = "NO";
    return CODE_LOCALE[raw] ? raw : "EN";
  }
  function L(index){ return (labels[currentLang] || labels.EN)[index]; }
  function report(message) { if(status)status.textContent=message || ""; }
  function localeName() {
    var all=window._pgI18n && window._pgI18n.LANGS;
    var matched=all && all.find(function(v){return v.code===currentLang;});
    return matched ? matched.name : currentLang;
  }
  function stopAudio() {
    token++; speaking=false;
    if(synth) synth.cancel();
  }
  function stopRecognition() {
    if(activeRecognition) {
      var r=activeRecognition;activeRecognition=null;manualStop=true;
      try{r.abort();}catch(e){}
    }
    if(mic) {
      mic.classList.remove("pgVoice-live");
      mic.setAttribute("aria-label", L(0));mic.title=L(0);
      mic.setAttribute("aria-pressed","false");
    }
  }
  function chooseVoice() {
    if (!synth) return null;
    var wanted=CODE_LOCALE[currentLang];
    var exact=voices.filter(function(v){return String(v.lang).toLowerCase().replace(/_/g,"-")===wanted.toLowerCase();});
    var same=voices.filter(function(v){return String(v.lang).toLowerCase().replace(/_/g,"-").split("-")[0]===wanted.toLowerCase().split("-")[0];});
    var pool=exact.length?exact:((currentLang==="ZH" || currentLang==="ZH_TW")?[]:same);
    if(!pool.length)return null;
    var preference=/samantha|natural|premium|enhanced|ava|aria|jenny|google us english|allison/i;
    return pool.find(function(v){return preference.test(v.name);}) || pool.find(function(v){return v.default;}) || pool[0];
  }
  function refreshVoicePicker() {
    if(!select)return;
    voices=synth ? synth.getVoices() : [];
    var wanted=CODE_LOCALE[currentLang];
    var matching=voices.filter(function(v){return String(v.lang).toLowerCase().replace(/_/g,"-").split("-")[0]===wanted.toLowerCase().split("-")[0];});
    matching.sort(function(a,b){return a.name.localeCompare(b.name);});
    select.replaceChildren();
    selectedVoice=chooseVoice();
    var saved="";
    try{saved=localStorage.getItem("pgChatVoice:"+currentLang)||"";}catch(e){}
    var remembered=matching.find(function(v){return v.voiceURI===saved;});
    if(remembered)selectedVoice=remembered;
    if(!matching.length) {
      var missing=document.createElement("option");
      missing.textContent=localeName()+": voice unavailable";
      select.appendChild(missing);
      select.disabled=true;
    }else{
      matching.forEach(function(v){
        var opt=document.createElement("option");
        opt.value=v.voiceURI;
        opt.textContent=v.name+" ("+v.lang+")";
        select.appendChild(opt);
      });
      select.disabled=false;
      if(selectedVoice)select.value=selectedVoice.voiceURI;
    }
    enhanceMessages();
  }
  function chunks(text) {
    var sentences=String(text).replace(/https?:\/\/\S+/g,"")
      .replace(/[\u{1F300}-\u{1FAFF}]/gu,"").replace(/\s+/g," ").trim()
      .split(/(?<=[.!?。！？।؟؛])\s*|(?<=\n)/u).filter(Boolean);
    var out=[], buffer="";
    sentences.forEach(function(s){
      var letters=Array.from(s);
      while(letters.length>220){
        if(buffer){out.push(buffer);buffer="";}
        out.push(letters.splice(0,220).join(""));
      }
      s=letters.join("");
      if(buffer.length+s.length>220){out.push(buffer);buffer="";}
      buffer=(buffer?buffer+" ":"")+s;
    });
    if(buffer)out.push(buffer);
    return out;
  }
  function speak(text) {
    stopAudio();
    if(!synth || !selectedVoice){report(localeName()+": matching voice unavailable on this device.");return;}
    var units=chunks(text);
    if(!units.length)return;
    var myToken=token;
    speaking=true;
    function next(){
      if(myToken!==token || !speaking)return;
      if(!units.length){speaking=false;report("");return;}
      var u=new SpeechSynthesisUtterance(units.shift());
      u.voice=selectedVoice;
      u.lang=selectedVoice.lang || CODE_LOCALE[currentLang];
      // Match the LanceDB voice tour's natural 0.96x delivery.
      u.rate=0.96;u.pitch=1;u.volume=1;
      u.onend=next;
      u.onerror=function(e){
        if(myToken===token && e.error!=="canceled" && e.error!=="interrupted"){
          speaking=false;report("Voice playback unavailable. Try another voice.");
        }
      };
      try{synth.speak(u);}catch(e){speaking=false;report("Voice playback unavailable.");}
    }
    next();
  }
  function spokenText(message) {
    var el=message && message.querySelector(".pgChat-text");
    return el ? (el.innerText || el.textContent).trim() : "";
  }
  function enhanceMessages(){
    if(!msgHost)return;
    Array.prototype.forEach.call(msgHost.querySelectorAll(".pgChat-msg.bot"),function(message){
      if(message.id==="pgChat-typing" || message.querySelector(".pgChat-typing"))return;
      if(message.querySelector(".pgVoice-replay"))return;
      var body=message.querySelector(".pgChat-text");
      if(!body)return;
      var b=document.createElement("button");
      b.type="button";b.className="pgVoice-replay";b.textContent="🔊";
      b.setAttribute("aria-label",L(2));b.title=L(2);
      b.disabled=!synth||!selectedVoice;
      b.addEventListener("click",function(e){e.stopPropagation();speak(spokenText(message));});
      body.appendChild(b);
      if(pendingVoiceAnswer || autoSpeak) {
        pendingVoiceAnswer=false;
        speak(spokenText(message));
      }
    });
    Array.prototype.forEach.call(msgHost.querySelectorAll(".pgVoice-replay"),function(b){
      b.disabled=!synth||!selectedVoice;b.title=L(2);b.setAttribute("aria-label",L(2));
    });
  }
  function sync() {
    var next=code();
    if(next!==currentLang){
      stopAudio();stopRecognition();pendingVoiceAnswer=false;
      currentLang=next;report("");
      refreshVoicePicker();
    }
    if(mic){
      var micLabel=activeRecognition?L(1):L(0);
      mic.title=micLabel;mic.setAttribute("aria-label",micLabel);
      mic.disabled=!Recognition;
      mic.setAttribute("aria-pressed",activeRecognition?"true":"false");
    }
    if(autoButton){
      autoButton.title=L(5);autoButton.setAttribute("aria-label",L(5));
      autoButton.setAttribute("aria-pressed",autoSpeak?"true":"false");
    }
  }
  function toggleMic(){
    sync();
    if(activeRecognition){stopRecognition();report("");return;}
    if(!Recognition){report("Speech recognition is unavailable in this browser. You can type instead.");return;}
    stopAudio();
    resultText="";manualStop=false;
    var r;
    try{r=new Recognition();}catch(e){report("Speech recognition is unavailable.");return;}
    activeRecognition=r;
    r.lang=CODE_LOCALE[currentLang];r.interimResults=false;r.continuous=false;r.maxAlternatives=1;
    r.onresult=function(event){
      if(activeRecognition!==r)return;
      var parts=[];
      for(var i=event.resultIndex||0;i<event.results.length;i++){
        if(event.results[i].isFinal && event.results[i][0])parts.push(event.results[i][0].transcript);
      }
      resultText=parts.join(" ").trim().slice(0,500);
    };
    r.onerror=function(event){
      if(activeRecognition!==r)return;
      manualStop=true;
      var error=event.error||"unknown";
      report(error==="not-allowed" || error==="service-not-allowed" ?
        "Microphone permission denied. You can type instead." :
        error==="language-not-supported" || error==="language-unavailable" ?
        localeName()+": speech recognition is not supported by this browser." :
        "Speech recognition error ("+error+"). You can type instead.");
    };
    r.onend=function(){
      if(activeRecognition!==r)return;
      var text=resultText;
      activeRecognition=null;
      mic.classList.remove("pgVoice-live");
      mic.title=L(0);mic.setAttribute("aria-label",L(0));mic.setAttribute("aria-pressed","false");
      if(!manualStop && text){
        var input=document.getElementById("pgChat-input");
        if(input){
          input.value=text;
          pendingVoiceAnswer=true;
          window.pgChat && window.pgChat.send();
          report("");
        }
      }else if(!manualStop){report("No speech detected. Try again or type your question.");}
    };
    try{
      r.start();
      mic.classList.add("pgVoice-live");
      mic.title=L(1);mic.setAttribute("aria-label",L(1));mic.setAttribute("aria-pressed","true");
      report(L(4));
    }catch(e){
      activeRecognition=null;mic.classList.remove("pgVoice-live");
      report("Unable to start microphone. You can type instead.");
    }
  }
  function init(){
    var win=document.getElementById("pgChat-window");
    var inputArea=document.getElementById("pgChat-input-area");
    var header=document.getElementById("pgChat-header");
    msgHost=document.getElementById("pgChat-messages");
    if(!win || !inputArea || !header || !msgHost || document.getElementById("pgVoice-tools"))return;
    var style=document.createElement("style");
    style.textContent=
      "#pgVoice-tools{display:flex;align-items:center;gap:6px;min-width:0;padding:7px 11px;background:#111626;border-top:1px solid rgba(125,211,252,.12);flex-shrink:0}"+
      "#pgVoice-tools button,#pgVoice-tools select{font:inherit;color:#e8eaf9;background:#212744;border:1px solid rgba(185,183,254,.22);border-radius:9px;min-height:32px}"+
      "#pgVoice-tools button{width:36px;flex-shrink:0;cursor:pointer}"+
      "#pgVoice-tools select{flex:1;min-width:0;max-width:100%;padding:4px;font-size:11px}"+
      "#pgVoice-tools [aria-pressed=true]{background:#493a82;border-color:#a78bfa}"+
      "#pgVoice-tools button:disabled,#pgVoice-tools select:disabled{opacity:.6;cursor:not-allowed}"+
      "#pgVoice-tools button.pgVoice-live{animation:pgVoicePulse 1.2s infinite;background:#812e5e}"+
      "@keyframes pgVoicePulse{50%{box-shadow:0 0 0 5px rgba(180,55,128,.14)}}"+
      ".pgChat-msg.bot .pgChat-text{position:relative;padding-right:34px}"+
      ".pgChat-msg.bot .pgVoice-replay{position:absolute;right:3px;top:3px;background:transparent;color:#c8bbff;border:0;border-radius:7px;padding:4px;cursor:pointer;font-size:14px}"+
      ".pgChat-msg.bot .pgVoice-replay:disabled{opacity:.35;cursor:not-allowed}"+
      "#pgVoice-status{padding:0 12px;background:#111626;color:#c7bee6;font-size:11px;line-height:1.4;flex-shrink:0}"+
      "#pgVoice-status:not(:empty){padding-bottom:6px}"+
      "#pgVoice-tools button:focus-visible,#pgVoice-tools select:focus-visible,.pgVoice-replay:focus-visible{outline:2px solid #c2adff;outline-offset:2px}";
    document.head.appendChild(style);
    var tools=document.createElement("div");tools.id="pgVoice-tools";
    mic=document.createElement("button");mic.type="button";mic.id="pgVoice-mic";mic.textContent="🎙";mic.addEventListener("click",toggleMic);
    select=document.createElement("select");select.id="pgVoice-select";select.setAttribute("aria-label","Voice");
    select.addEventListener("change",function(){
      selectedVoice=voices.find(function(v){return v.voiceURI===select.value;})||null;
      try{if(selectedVoice)localStorage.setItem("pgChatVoice:"+currentLang,selectedVoice.voiceURI);}catch(e){}
      stopAudio();enhanceMessages();
    });
    autoButton=document.createElement("button");autoButton.type="button";autoButton.id="pgVoice-auto";
    autoButton.textContent="🔈";autoButton.addEventListener("click",function(){
      autoSpeak=!autoSpeak;
      autoButton.textContent=autoSpeak?"🔊":"🔈";
      sync();
      if(!autoSpeak)stopAudio();
    });
    tools.append(mic,select,autoButton);
    status=document.createElement("div");status.id="pgVoice-status";status.setAttribute("role","status");status.setAttribute("aria-live","polite");
    win.insertBefore(tools,inputArea);win.insertBefore(status,inputArea);
    currentLang=code();
    refreshVoicePicker();sync();
    if(synth && synth.addEventListener)synth.addEventListener("voiceschanged",refreshVoicePicker);
    if(window.MutationObserver) {
      new MutationObserver(enhanceMessages).observe(msgHost,{childList:true,subtree:true});
      new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    }
    window.addEventListener("pg:languagechange",sync);
    document.addEventListener("change",function(e){
      if(e.target && e.target!==select && e.target.id!=="pgChat-topics-select")Promise.resolve().then(sync);
    },true);
    var clear=document.getElementById("pgChat-clear"), close=document.getElementById("pgChat-close");
    if(clear)clear.addEventListener("click",function(){pendingVoiceAnswer=false;stopAudio();stopRecognition();report("");});
    if(close)close.addEventListener("click",function(){pendingVoiceAnswer=false;stopAudio();stopRecognition();report("");});
    window.addEventListener("pagehide",function(){stopAudio();stopRecognition();});
    // No audio is recorded or stored by Poly-Glot. The browser may send microphone
    // audio to its speech recognition service; do not promise on-device recognition.
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();