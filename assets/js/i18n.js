/**
 * Poly-Glot AI Workspace — Global i18n System v1
 * 37 Languages · Same flags as the app
 * Translates entire site + chat widget
 */
(function(){
"use strict";
var LANGS=[
{code:"EN",flag:"\u{1F1FA}\u{1F1F8}",name:"English"},{code:"ES",flag:"\u{1F1EA}\u{1F1F8}",name:"Espa\u00f1ol"},
{code:"FR",flag:"\u{1F1EB}\u{1F1F7}",name:"Fran\u00e7ais"},{code:"DE",flag:"\u{1F1E9}\u{1F1EA}",name:"Deutsch"},
{code:"IT",flag:"\u{1F1EE}\u{1F1F9}",name:"Italiano"},{code:"PT",flag:"\u{1F1E7}\u{1F1F7}",name:"Portugu\u00eas"},
{code:"JA",flag:"\u{1F1EF}\u{1F1F5}",name:"\u65E5\u672C\u8A9E"},{code:"KO",flag:"\u{1F1F0}\u{1F1F7}",name:"\uD55C\uAD6D\uC5B4"},
{code:"ZH",flag:"\u{1F1E8}\u{1F1F3}",name:"\u4E2D\u6587(\u7B80\u4F53)"},{code:"ZT",flag:"\u{1F1F9}\u{1F1FC}",name:"\u4E2D\u6587(\u7E41\u9AD4)"},
{code:"AR",flag:"\u{1F1F8}\u{1F1E6}",name:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629"},{code:"HI",flag:"\u{1F1EE}\u{1F1F3}",name:"\u0939\u093F\u0928\u094D\u0926\u0940"},
{code:"TR",flag:"\u{1F1F9}\u{1F1F7}",name:"T\u00fcrk\u00e7e"},{code:"RU",flag:"\u{1F1F7}\u{1F1FA}",name:"\u0420\u0443\u0441\u0441\u043A\u0438\u0439"},
{code:"PL",flag:"\u{1F1F5}\u{1F1F1}",name:"Polski"},{code:"NL",flag:"\u{1F1F3}\u{1F1F1}",name:"Nederlands"},
{code:"SV",flag:"\u{1F1F8}\u{1F1EA}",name:"Svenska"},{code:"DA",flag:"\u{1F1E9}\u{1F1F0}",name:"Dansk"},
{code:"NO",flag:"\u{1F1F3}\u{1F1F4}",name:"Norsk"},{code:"FI",flag:"\u{1F1EB}\u{1F1EE}",name:"Suomi"},
{code:"CS",flag:"\u{1F1E8}\u{1F1FF}",name:"\u010Ce\u0161tina"},{code:"HU",flag:"\u{1F1ED}\u{1F1FA}",name:"Magyar"},
{code:"RO",flag:"\u{1F1F7}\u{1F1F4}",name:"Rom\u00e2n\u0103"},{code:"UK",flag:"\u{1F1FA}\u{1F1E6}",name:"\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"},
{code:"EL",flag:"\u{1F1EC}\u{1F1F7}",name:"\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"},{code:"HE",flag:"\u{1F1EE}\u{1F1F1}",name:"\u05E2\u05D1\u05E8\u05D9\u05EA"},
{code:"TH",flag:"\u{1F1F9}\u{1F1ED}",name:"\u0E44\u0E17\u0E22"},{code:"VI",flag:"\u{1F1FB}\u{1F1F3}",name:"Ti\u1EBFng Vi\u1EC7t"},
{code:"ID",flag:"\u{1F1EE}\u{1F1E9}",name:"Bahasa Indonesia"},{code:"MS",flag:"\u{1F1F2}\u{1F1FE}",name:"Bahasa Melayu"},
{code:"FIL",flag:"\u{1F1F5}\u{1F1ED}",name:"Filipino"},{code:"CA",flag:"\u{1F1EA}\u{1F1F8}",name:"Catal\u00e0"},
{code:"HR",flag:"\u{1F1ED}\u{1F1F7}",name:"Hrvatski"},{code:"SK",flag:"\u{1F1F8}\u{1F1F0}",name:"Sloven\u010Dina"},
{code:"BG",flag:"\u{1F1E7}\u{1F1EC}",name:"\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"},
{code:"LT",flag:"\u{1F1F1}\u{1F1F9}",name:"Lietuvi\u0173"},{code:"ET",flag:"\u{1F1EA}\u{1F1EA}",name:"Eesti"}
];

// === TRANSLATIONS (10 primary + fallback EN for rest) ===
var T={};
T.EN={navSS:"Screenshots",navFeat:"Features",navPrice:"Pricing",navDemo:"Demo",navFAQ:"FAQ",
heroBadge:"Available Now on Mac, iPhone & iPad",heroH1a:"Every Language. One Prompt.",heroH1b:"Every AI \u2014 Compare the Results.",
heroSub:"One prompt. Use multiple AIs. Ask Poly-Glot what you need. Type or speak naturally, in your language. Choose your AI models, compare the answers, pick the best one. 1,000+ templates. Fully localized UI in 38 languages. Works on iPhone, iPad, and Mac.",
heroMac:"\uF8FF Mac \u2014 Download Now",heroIOS:"\uD83D\uDCF1 iPhone & iPad \u2014 Download Now",
trust1:"3-Day Free Trial",trust2:"No Data Collection",trust3:"Fully Localized \u2014 35 Languages",
platLabel:"AVAILABLE ON ALL YOUR DEVICES",
featEye:"\u26A1 Features",featH:"Everything you need to write better prompts",featSub:"Why choose or pay for one AI? Ask Poly-Glot. Choose your models. Compare the answers. Pick the best one.",
f1:"1,000+ Prompt Templates",f1p:"Curated templates for writing, coding, marketing, education, business, and more.",
f2:"Voice Input",f2p:"Speak your prompt instead of typing. On-device speech recognition.",
f3:"One-Tap Copy",f3p:"Build your prompt, tap copy, paste into ChatGPT, Claude, Gemini, or any AI.",
f4:"100% Private",f4p:"Everything runs on your device. No data collection, no tracking, no servers.",
f5:"Fully Localized in 38 Languages",f5p:"The entire UI \u2014 every button, label, menu, and template \u2014 is translated.",
modEye:"\uD83E\uDD16 Compatible With",modH:"Works with 9 AI apps",modSub:"Poly-Glot works with every AI. Ask multiple models the same question and compare their answers.",
tplEye:"\uD83D\uDCDA Template Library",tplH:"1,000+ templates. 40+ categories.",tplSub:"Expert-crafted prompt templates organized by category.",
prEye:"\uD83D\uDCB0 Pricing",prH:"Start free. Upgrade when ready.",prSub:"Try 25 featured templates free for 3 days. Unlock everything with Pro.",
prFree:"Free",prTrial:"Trial",prFreeD:"3-day free trial",
prPro:"Pro Monthly",prProN:"Pro",prProD:"Full access. Cancel anytime.",
prYear:"Pro Yearly",prYearN:"Pro Annual",prYearD:"Save 33% vs monthly",
prCTA:"Get on Mac",
fqEye:"\u2753 FAQ",fqH:"Common questions",fqSub:"Everything you need to know about Poly-Glot AI Workspace.",
fq1q:"What is Poly-Glot AI Workspace?",fq1a:"Poly-Glot AI Workspace is a native app for iPhone, iPad, and Mac that lets you ask any AI \u2014 ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, and more \u2014 all from one place.",
fq2q:"Is my data private?",fq2a:"Yes. 100% on your device. No data collection.",
fq3q:"What is Compare Mode?",fq3a:"Send the same prompt to multiple AIs and compare responses side by side.",
fq4q:"Which AI models?",fq4a:"ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, HuggingChat, DuckDuckGo AI.",
fq5q:"How does the free trial work?",fq5a:"3-day trial with full access. Then Pro $9.99/mo or $79.99/yr.",
fq6q:"How many input methods?",fq6a:"Five: type, paste, import, scan, dictate.",
fq7q:"Can I cancel?",fq7a:"Yes. Cancel anytime from Apple ID settings.",
ftTag:"Every Language. One Prompt. Every AI \u2014 Compare the Results.",
ftProd:"Product",ftLegal:"Legal",ftConn:"Connect",
ftPriv:"Privacy Policy",ftTerms:"Terms of Use",ftSupp:"Support",ftContact:"Contact",
chatT:"Poly-Glot AI Assistant",chatSub:"Ask me anything about the product",chatPH:"Ask a question...",
chatWel:"Hey there! \uD83E\uDD9C I'm the Poly-Glot AI Assistant. Ask me anything about features, pricing, AIs, languages, templates, or how to get started!",
cs1:"What is Poly-Glot?",cs2:"How much?",cs3:"Which AIs?",cs4:"Templates?",cs5:"Private?",cs6:"Devices?",cs7:"How it works?",cs8:"Free trial?",cs9:"Compare Mode?",cs10:"MCP setup?",cs11:"Languages?",cs12:"Download?"
};
T.ES={navSS:"Capturas",navFeat:"Funciones",navPrice:"Precios",navDemo:"Demo",navFAQ:"Preguntas",
heroBadge:"Disponible en Mac, iPhone y iPad",heroH1a:"Todos los idiomas. Un prompt.",heroH1b:"Todas las IA \u2014 Compara resultados.",
heroSub:"Un prompt. M\u00faltiples IAs. Escribe o habla en tu idioma. Elige modelos de IA, compara respuestas. M\u00e1s de 1.000 plantillas. 38 idiomas.",
heroMac:"\uF8FF Mac \u2014 Descargar",heroIOS:"\uD83D\uDCF1 iPhone y iPad \u2014 Descargar",
trust1:"Prueba gratis 3 d\u00edas",trust2:"Sin recolecci\u00f3n de datos",trust3:"35 idiomas",
featEye:"\u26A1 Funciones",featH:"Todo para mejores prompts",f1:"M\u00e1s de 1.000 plantillas",f2:"Entrada de voz",f3:"Copiar con un toque",f4:"100% privado",f5:"38 idiomas",
modEye:"\uD83E\uDD16 Compatible con",modH:"9 apps de IA",prEye:"\uD83D\uDCB0 Precios",prH:"Empieza gratis.",prCTA:"Obtener en Mac",
fqEye:"\u2753 Preguntas",fqH:"Preguntas frecuentes",
ftTag:"Todos los idiomas. Un prompt. Todas las IA.",ftProd:"Producto",ftLegal:"Legal",ftConn:"Conectar",
chatT:"Asistente IA Poly-Glot",chatSub:"Preg\u00fantame sobre el producto",chatPH:"Haz una pregunta...",
chatWel:"\u00a1Hola! \uD83E\uDD9C Soy el Asistente IA. Preg\u00fantame sobre funciones, precios, IAs, idiomas o plantillas!",
cs1:"\u00bfQu\u00e9 es?",cs2:"\u00bfCu\u00e1nto cuesta?",cs3:"\u00bfQu\u00e9 IAs?",cs4:"\u00bfPlantillas?",cs5:"\u00bfPrivado?",cs6:"\u00bfDispositivos?",cs7:"\u00bfC\u00f3mo funciona?",cs8:"Prueba gratis",cs9:"Modo comparar",cs10:"Configurar MCP",cs11:"Idiomas",cs12:"Descargar"
};
T.FR={navSS:"Captures",navFeat:"Fonctions",navPrice:"Tarifs",navDemo:"D\u00e9mo",navFAQ:"FAQ",
heroBadge:"Disponible sur Mac, iPhone et iPad",heroH1a:"Toutes les langues. Un prompt.",heroH1b:"Toutes les IA \u2014 Comparez.",
heroSub:"Un prompt. Plusieurs IA. Tapez ou parlez. Choisissez vos mod\u00e8les, comparez. 1 000+ mod\u00e8les. 38 langues.",
trust1:"Essai gratuit 3 jours",trust2:"Aucune collecte",trust3:"35 langues",
featEye:"\u26A1 Fonctions",featH:"Tout pour de meilleurs prompts",f1:"1 000+ mod\u00e8les",f2:"Saisie vocale",f3:"Copie rapide",f4:"100% priv\u00e9",f5:"38 langues",
prEye:"\uD83D\uDCB0 Tarifs",prH:"Commencez gratuitement.",prCTA:"Obtenir sur Mac",
fqEye:"\u2753 FAQ",fqH:"Questions fr\u00e9quentes",
chatT:"Assistant IA Poly-Glot",chatSub:"Posez vos questions",chatPH:"Posez une question...",
chatWel:"Bonjour ! \uD83E\uDD9C Je suis l'assistant Poly-Glot. Posez vos questions sur les fonctions, tarifs, IA ou langues !",
cs1:"C'est quoi ?",cs2:"Combien ?",cs3:"Quelles IA ?",cs4:"Mod\u00e8les ?",cs5:"Priv\u00e9 ?",cs6:"Appareils ?",cs7:"Comment ?",cs8:"Essai gratuit",cs9:"Mode comparaison",cs10:"Config MCP",cs11:"Langues ?",cs12:"T\u00e9l\u00e9charger"
};
T.DE={navSS:"Screenshots",navFeat:"Funktionen",navPrice:"Preise",navDemo:"Demo",navFAQ:"FAQ",
heroBadge:"Verf\u00fcgbar auf Mac, iPhone und iPad",heroH1a:"Alle Sprachen. Ein Prompt.",heroH1b:"Alle KIs \u2014 Vergleiche Ergebnisse.",
heroSub:"Ein Prompt. Mehrere KIs. Tippen oder sprechen. KI-Modelle w\u00e4hlen, Antworten vergleichen. 1.000+ Vorlagen. 38 Sprachen.",
trust1:"3 Tage kostenlos",trust2:"Keine Datenerfassung",trust3:"35 Sprachen",
featEye:"\u26A1 Funktionen",featH:"Alles f\u00fcr bessere Prompts",f1:"1.000+ Vorlagen",f2:"Spracheingabe",f3:"Ein-Tap-Kopie",f4:"100% privat",f5:"38 Sprachen",
prEye:"\uD83D\uDCB0 Preise",prH:"Kostenlos starten.",prCTA:"Auf Mac laden",
fqEye:"\u2753 FAQ",fqH:"H\u00e4ufige Fragen",
chatT:"Poly-Glot KI-Assistent",chatSub:"Fragen zum Produkt",chatPH:"Frage stellen...",
chatWel:"Hallo! \uD83E\uDD9C Poly-Glot KI-Assistent. Fragen zu Funktionen, Preisen, KIs, Sprachen oder Vorlagen!",
cs1:"Was ist Poly-Glot?",cs2:"Was kostet es?",cs3:"Welche KIs?",cs4:"Vorlagen?",cs5:"Privat?",cs6:"Ger\u00e4te?",cs7:"Wie funktioniert es?",cs8:"Kostenlos testen",cs9:"Vergleichsmodus",cs10:"MCP einrichten",cs11:"Sprachen?",cs12:"Herunterladen"
};
T.JA={navSS:"\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8",navFeat:"\u6A5F\u80FD",navPrice:"\u6599\u91D1",navDemo:"\u30C7\u30E2",navFAQ:"FAQ",
heroBadge:"Mac\u3001iPhone\u3001iPad\u3067\u5229\u7528\u53EF\u80FD",heroH1a:"\u3059\u3079\u3066\u306E\u8A00\u8A9E\u3002\u4E00\u3064\u306E\u30D7\u30ED\u30F3\u30D7\u30C8\u3002",heroH1b:"\u3059\u3079\u3066\u306EAI \u2014 \u7D50\u679C\u3092\u6BD4\u8F03\u3002",
trust1:"3\u65E5\u9593\u7121\u6599",trust2:"\u30C7\u30FC\u30BF\u53CE\u96C6\u306A\u3057",trust3:"35\u8A00\u8A9E",
featEye:"\u26A1 \u6A5F\u80FD",featH:"\u3088\u308A\u826F\u3044\u30D7\u30ED\u30F3\u30D7\u30C8\u306B\u5FC5\u8981\u306A\u3059\u3079\u3066",f1:"1,000+\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",f2:"\u97F3\u58F0\u5165\u529B",f3:"\u30EF\u30F3\u30BF\u30C3\u30D7\u30B3\u30D4\u30FC",f4:"100%\u30D7\u30E9\u30A4\u30D0\u30FC\u30C8",f5:"38\u8A00\u8A9E\u5BFE\u5FDC",
prEye:"\uD83D\uDCB0 \u6599\u91D1",prH:"\u7121\u6599\u3067\u59CB\u3081\u3088\u3046\u3002",prCTA:"Mac\u3067\u5165\u624B",
chatT:"Poly-Glot AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8",chatSub:"\u88FD\u54C1\u306B\u3064\u3044\u3066\u8CEA\u554F",chatPH:"\u8CEA\u554F\u3092\u5165\u529B...",
chatWel:"\u3053\u3093\u306B\u3061\u306F\uFF01\uD83E\uDD9C Poly-Glot AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u6A5F\u80FD\u3001\u6599\u91D1\u3001AI\u3001\u8A00\u8A9E\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306B\u3064\u3044\u3066\u304A\u6C17\u8EFD\u306B\uFF01",
cs1:"Poly-Glot\u3068\u306F?",cs2:"\u6599\u91D1\u306F?",cs3:"\u5BFE\u5FDCAI?",cs4:"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8?",cs5:"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC?",cs6:"\u30C7\u30D0\u30A4\u30B9?",cs7:"\u4F7F\u3044\u65B9?",cs8:"\u7121\u6599\u4F53\u9A13",cs9:"\u6BD4\u8F03\u30E2\u30FC\u30C9",cs10:"MCP\u8A2D\u5B9A",cs11:"\u8A00\u8A9E?",cs12:"\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9"
};
T.KO={heroBadge:"Mac, iPhone, iPad \uC0AC\uC6A9 \uAC00\uB2A5",heroH1a:"\uBAA8\uB4E0 \uC5B8\uC5B4. \uD558\uB098\uC758 \uD504\uB86C\uD504\uD2B8.",heroH1b:"\uBAA8\uB4E0 AI \u2014 \uACB0\uACFC \uBE44\uAD50.",
chatT:"Poly-Glot AI \uC5B4\uC2DC\uC2A4\uD134\uD2B8",chatPH:"\uC9C8\uBB38\uD558\uC138\uC694...",
chatWel:"\uC548\uB155\uD558\uC138\uC694! \uD83E\uDD9C Poly-Glot AI \uC5B4\uC2DC\uC2A4\uD134\uD2B8\uC785\uB2C8\uB2E4. \uAE30\uB2A5, \uAC00\uACA9, AI, \uD15C\uD50C\uB9BF\uC5D0 \uB300\uD574 \uBB3C\uC5B4\uBCF4\uC138\uC694!"
};
T.ZH={heroBadge:"\u5DF2\u5728 Mac\u3001iPhone\u3001iPad \u4E0A\u63D0\u4F9B",heroH1a:"\u6240\u6709\u8BED\u8A00\u3002\u4E00\u4E2A\u63D0\u793A\u8BCD\u3002",heroH1b:"\u6240\u6709AI \u2014 \u6BD4\u8F83\u7ED3\u679C\u3002",
chatT:"Poly-Glot AI\u52A9\u624B",chatPH:"\u8F93\u5165\u95EE\u9898...",chatWel:"\u4F60\u597D\uFF01\uD83E\uDD9C Poly-Glot AI\u52A9\u624B\u3002\u5173\u4E8E\u529F\u80FD\u3001\u4EF7\u683C\u3001AI\u3001\u8BED\u8A00\u968F\u65F6\u63D0\u95EE\uFF01"};
T.PT={heroBadge:"Dispon\u00edvel no Mac, iPhone e iPad",heroH1a:"Todos os idiomas. Um prompt.",heroH1b:"Todas as IAs \u2014 Compare.",
chatT:"Assistente Poly-Glot",chatPH:"Fa\u00e7a uma pergunta...",chatWel:"Ol\u00e1! \uD83E\uDD9C Assistente Poly-Glot AI. Pergunte sobre recursos, pre\u00e7os, IAs ou idiomas!"};
T.AR={heroBadge:"\u0645\u062A\u0648\u0641\u0631 \u0639\u0644\u0649 Mac \u0648 iPhone \u0648 iPad",heroH1a:"\u0643\u0644 \u0627\u0644\u0644\u063A\u0627\u062A. \u0623\u0645\u0631 \u0648\u0627\u062D\u062F.",heroH1b:"\u0643\u0644 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u2014 \u0642\u0627\u0631\u0646.",
chatT:"\u0645\u0633\u0627\u0639\u062F Poly-Glot",chatPH:"\u0627\u0637\u0631\u062D \u0633\u0624\u0627\u0644\u0627\u064B...",chatWel:"\u0645\u0631\u062D\u0628\u0627\u064B! \uD83E\uDD9C \u0645\u0633\u0627\u0639\u062F Poly-Glot. \u0627\u0633\u0623\u0644 \u0639\u0646 \u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631!"};
T.HI={heroBadge:"Mac, iPhone, iPad \u092A\u0930 \u0909\u092A\u0932\u092C\u094D\u0927",heroH1a:"\u0938\u092D\u0940 \u092D\u093E\u0937\u093E\u090F\u0902\u0964 \u090F\u0915 \u092A\u094D\u0930\u0949\u092E\u094D\u092A\u094D\u091F\u0964",heroH1b:"\u0938\u092D\u0940 AI \u2014 \u092A\u0930\u093F\u0923\u093E\u092E \u0924\u0941\u0932\u0928\u093E\u0964",
chatT:"Poly-Glot AI \u0938\u0939\u093E\u092F\u0915",chatPH:"\u092A\u094D\u0930\u0936\u094D\u0928 \u092A\u0942\u091B\u0947\u0902...",chatWel:"\u0928\u092E\u0938\u094D\u0924\u0947! \uD83E\uDD9C Poly-Glot AI \u0938\u0939\u093E\u092F\u0915\u0964 \u0935\u093F\u0936\u0947\u0937\u0924\u093E\u0913\u0902, \u092E\u0942\u0932\u094D\u092F, AI, \u092D\u093E\u0937\u093E\u0913\u0902 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u092A\u0942\u091B\u0947\u0902!"};
T.IT={heroBadge:"Disponibile su Mac, iPhone e iPad",heroH1a:"Tutte le lingue. Un prompt.",heroH1b:"Tutte le IA \u2014 Confronta.",
chatT:"Assistente Poly-Glot",chatPH:"Fai una domanda...",chatWel:"Ciao! \uD83E\uDD9C Assistente Poly-Glot AI. Chiedimi di funzioni, prezzi, IA o lingue!"};
T.RU={heroBadge:"\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043D\u0430 Mac, iPhone, iPad",heroH1a:"\u0412\u0441\u0435 \u044F\u0437\u044B\u043A\u0438. \u041E\u0434\u0438\u043D \u043F\u0440\u043E\u043C\u043F\u0442.",heroH1b:"\u0412\u0441\u0435 \u0418\u0418 \u2014 \u0421\u0440\u0430\u0432\u043D\u0438.",
chatT:"\u041F\u043E\u043C\u043E\u0449\u043D\u0438\u043A Poly-Glot",chatPH:"\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441...",chatWel:"\u041F\u0440\u0438\u0432\u0435\u0442! \uD83E\uDD9C \u041F\u043E\u043C\u043E\u0449\u043D\u0438\u043A Poly-Glot AI. \u0421\u043F\u0440\u043E\u0441\u0438\u0442\u0435 \u043E \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u0445, \u0446\u0435\u043D\u0430\u0445, \u0418\u0418 \u0438\u043B\u0438 \u044F\u0437\u044B\u043A\u0430\u0445!"};
T.TR={heroBadge:"Mac, iPhone ve iPad'de mevcut",heroH1a:"T\u00fcm diller. Bir prompt.",heroH1b:"T\u00fcm AI \u2014 Kar\u015f\u0131la\u015ft\u0131r.",
chatT:"Poly-Glot AI Asistan",chatPH:"Soru sorun...",chatWel:"Merhaba! \uD83E\uDD9C Poly-Glot AI Asistan. \u00d6zellikler, fiyatlar, AI veya diller hakk\u0131nda sorun!"};
T.NL={heroBadge:"Beschikbaar op Mac, iPhone en iPad",heroH1a:"Alle talen. E\u00e9n prompt.",heroH1b:"Alle AI's \u2014 Vergelijk.",
chatT:"Poly-Glot AI Assistent",chatPH:"Stel een vraag...",chatWel:"Hallo! \uD83E\uDD9C Poly-Glot AI Assistent. Vraag over functies, prijzen, AI's of talen!"};
T.PL={heroBadge:"Dost\u0119pne na Mac, iPhone i iPad",heroH1a:"Wszystkie j\u0119zyki. Jeden prompt.",heroH1b:"Wszystkie AI \u2014 Por\u00f3wnaj.",
chatT:"Asystent Poly-Glot AI",chatPH:"Zadaj pytanie...",chatWel:"Cze\u015b\u0107! \uD83E\uDD9C Asystent Poly-Glot AI. Pytaj o funkcje, ceny, AI lub j\u0119zyki!"};

function gt(k,lang){return(T[lang]&&T[lang][k])||T.EN[k]||'';}

// === GLOBAL STATE ===
var curLang='EN';

// === BUILD PICKER ===
function buildPicker(){
var wrap=document.createElement('div');wrap.id='pgGlobalLangPicker';
wrap.innerHTML='<div id="pgGlobalLangBtn" title="Change language"><span id="pgGlobalFlag">\u{1F1FA}\u{1F1F8}</span><span id="pgGlobalCode">EN</span></div><div id="pgGlobalLangDD"></div>';
document.body.appendChild(wrap);
var dd=document.getElementById('pgGlobalLangDD');
LANGS.forEach(function(L){
var r=document.createElement('div');r.className='pgGlob-row'+(L.code==='EN'?' active':'');
r.setAttribute('data-lang',L.code);
r.innerHTML='<span class="gf">'+L.flag+'</span><span class="gc">'+L.code+'</span><span class="gn">'+L.name+'</span>';
r.onclick=function(){setLang(L.code,L.flag);};
dd.appendChild(r);
});
document.getElementById('pgGlobalLangBtn').onclick=function(e){e.stopPropagation();dd.classList.toggle('open');};
document.addEventListener('click',function(e){if(!wrap.contains(e.target))dd.classList.remove('open');});
}

// === SET LANGUAGE ===
function setLang(code,flag){
curLang=code;
var gf=document.getElementById('pgGlobalFlag'),gc=document.getElementById('pgGlobalCode');
if(gf)gf.textContent=flag;if(gc)gc.textContent=code;
document.querySelectorAll('.pgGlob-row').forEach(function(r){r.classList.toggle('active',r.getAttribute('data-lang')===code);});
var dd=document.getElementById('pgGlobalLangDD');if(dd)dd.classList.remove('open');
// Chat picker button
var cf=document.getElementById('pgChat-lang-flag');if(cf)cf.textContent=flag;
// Apply site translations
applyAll(code);
// Update chat
updateChat(code);
try{localStorage.setItem('pgLang',code);}catch(e){}
}

// === APPLY TO SITE ===
function applyAll(lang){
document.querySelectorAll('[data-i18n]').forEach(function(el){
var k=el.getAttribute('data-i18n'),v=gt(k,lang);
if(v){
// Preserve toggle span in FAQ questions
var toggle=el.querySelector('.toggle');
el.textContent=v;
if(toggle)el.appendChild(toggle);
}
});
}

// === UPDATE CHAT WIDGET ===
function updateChat(lang){
var t1=document.querySelector('#pgChat-header-left div div:first-child');
var t2=document.querySelector('#pgChat-header-left div div:last-child');
if(t1)t1.textContent=gt('chatT',lang);
if(t2)t2.textContent=gt('chatSub',lang);
var inp=document.getElementById('pgChat-input');
if(inp)inp.placeholder=gt('chatPH',lang);
window._pgChatLang=lang;
}

// === TAG ELEMENTS ===
function tagAll(){
// Nav
var navA=document.querySelectorAll('nav.nav ul li a');
var nk=['navSS','navFeat','navPrice','navDemo','navPrice','navFAQ'];
navA.forEach(function(a,i){if(nk[i])a.setAttribute('data-i18n',nk[i]);});
// Hero
tag('.hero-badge','heroBadge');
tag('.hero h1 .gradient-text','heroH1b');
tag('.hero-sub','heroSub');
// Trust items — tag spans that have check marks
var ti=document.querySelectorAll('.trust-item');
if(ti[0])ti[0].setAttribute('data-i18n','trust1');
if(ti[1])ti[1].setAttribute('data-i18n','trust2');
if(ti[2])ti[2].setAttribute('data-i18n','trust3');
// Features
tag('#features .section-eyebrow','featEye');
tag('#features .section-title','featH');
tag('#features .section-sub','featSub');
var fc=document.querySelectorAll('#features .feature-card');
if(fc[0]){tagIn(fc[0],'h4','f1');tagIn(fc[0],'p','f1p');}
if(fc[1]){tagIn(fc[1],'h4','f2');tagIn(fc[1],'p','f2p');}
if(fc[2]){tagIn(fc[2],'h4','f3');tagIn(fc[2],'p','f3p');}
if(fc[3]){tagIn(fc[3],'h4','f4');tagIn(fc[3],'p','f4p');}
if(fc[4]){tagIn(fc[4],'h4','f5');tagIn(fc[4],'p','f5p');}
// Models
tag('#models .section-eyebrow','modEye');tag('#models .section-title','modH');tag('#models .section-sub','modSub');
// Templates
tag('#templates .section-eyebrow','tplEye');tag('#templates .section-title','tplH');tag('#templates .section-sub','tplSub');
// Pricing
tag('#pricing .section-eyebrow','prEye');tag('#pricing .section-title','prH');tag('#pricing .section-sub','prSub');
var pc=document.querySelectorAll('#pricing .pricing-card');
if(pc[0]){tagIn(pc[0],'.pricing-tier','prFree');tagIn(pc[0],'.pricing-name','prTrial');tagIn(pc[0],'.pricing-desc','prFreeD');}
if(pc[1]){tagIn(pc[1],'.pricing-tier','prPro');tagIn(pc[1],'.pricing-name','prProN');tagIn(pc[1],'.pricing-desc','prProD');}
if(pc[2]){tagIn(pc[2],'.pricing-tier','prYear');tagIn(pc[2],'.pricing-name','prYearN');tagIn(pc[2],'.pricing-desc','prYearD');}
var ctas=document.querySelectorAll('#pricing .pricing-cta');
ctas.forEach(function(c){c.setAttribute('data-i18n','prCTA');});
// FAQ
tag('#faq .section-eyebrow','fqEye');tag('#faq .section-title','fqH');tag('#faq .section-sub','fqSub');
var fqi=document.querySelectorAll('#faq .faq-item');
fqi.forEach(function(item,i){
var n=i+1;var q=item.querySelector('.faq-q');var a=item.querySelector('.faq-a p');
if(q&&T.EN['fq'+n+'q'])q.setAttribute('data-i18n','fq'+n+'q');
if(a&&T.EN['fq'+n+'a'])a.setAttribute('data-i18n','fq'+n+'a');
});
// Footer
tag('.footer-tagline','ftTag');
var fh=document.querySelectorAll('.footer h5');
if(fh[0])fh[0].setAttribute('data-i18n','ftProd');
if(fh[1])fh[1].setAttribute('data-i18n','ftLegal');
if(fh[2])fh[2].setAttribute('data-i18n','ftConn');
}
function tag(sel,key){var el=document.querySelector(sel);if(el)el.setAttribute('data-i18n',key);}
function tagIn(p,sel,key){var el=p.querySelector(sel);if(el)el.setAttribute('data-i18n',key);}

// === CSS ===
var css=document.createElement('style');
css.textContent='#pgGlobalLangPicker{position:fixed;bottom:24px;left:24px;z-index:99998}'
+'#pgGlobalLangBtn{display:flex;align-items:center;gap:6px;padding:8px 14px;background:linear-gradient(135deg,#141730,#1a1e3a);border:1px solid rgba(125,211,252,0.15);border-radius:30px;cursor:pointer;color:#e8ecf4;font-family:"Fira Code",monospace;font-size:0.78rem;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:transform 0.15s,box-shadow 0.15s}'
+'#pgGlobalLangBtn:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(0,0,0,0.5)}'
+'#pgGlobalFlag{font-size:1.1rem}#pgGlobalCode{color:#7dd3fc}'
+'#pgGlobalLangDD{display:none;position:absolute;bottom:44px;left:0;width:240px;max-height:400px;overflow-y:auto;background:#141730;border:1px solid rgba(125,211,252,0.15);border-radius:14px;padding:6px;box-shadow:0 12px 48px rgba(0,0,0,0.7);scrollbar-width:thin;scrollbar-color:rgba(125,211,252,0.15) transparent}'
+'#pgGlobalLangDD::-webkit-scrollbar{width:4px}#pgGlobalLangDD::-webkit-scrollbar-thumb{background:rgba(125,211,252,0.15);border-radius:2px}'
+'#pgGlobalLangDD.open{display:block}'
+'.pgGlob-row{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;cursor:pointer;font-size:0.8rem;color:#e8ecf4;transition:background 0.12s;border:1px solid transparent}'
+'.pgGlob-row:hover{background:rgba(125,211,252,0.08)}'
+'.pgGlob-row.active{background:rgba(124,58,237,0.2);border-color:rgba(124,58,237,0.3)}'
+'.pgGlob-row .gf{font-size:1.1rem;width:22px;text-align:center}'
+'.pgGlob-row .gc{font-size:0.65rem;font-weight:700;color:#7dd3fc;font-family:"Fira Code",monospace;width:24px}'
+'.pgGlob-row .gn{flex:1;font-size:0.78rem}'
+'@media(max-width:480px){#pgGlobalLangPicker{bottom:16px;left:8px}}';
document.head.appendChild(css);

// === INIT ===
function init(){
buildPicker();tagAll();
var saved;try{saved=localStorage.getItem('pgLang');}catch(e){}
if(saved){var L=LANGS.find(function(l){return l.code===saved;});if(L)setLang(L.code,L.flag);}
}

// Expose
window._pgI18n={gt:gt,curLang:function(){return curLang;},LANGS:LANGS,setLang:setLang};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
