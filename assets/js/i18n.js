/**
 * Poly-Glot AI Workspace — Global i18n System v2
 * 37 Languages — EXACT match with the app's language picker
 * Translates ALL text surfaces: nav, hero, badges, buttons, sections, pricing, FAQ, footer, chat
 */
(function(){
"use strict";

// ===== 37 LANGUAGES — same codes, flags, order as the app =====
var LANGS=[
{code:"EN",flag:"\u{1F1FA}\u{1F1F8}",name:"English"},
{code:"ES",flag:"\u{1F1EA}\u{1F1F8}",name:"Espa\u00f1ol"},
{code:"FR",flag:"\u{1F1EB}\u{1F1F7}",name:"Fran\u00e7ais"},
{code:"DE",flag:"\u{1F1E9}\u{1F1EA}",name:"Deutsch"},
{code:"IT",flag:"\u{1F1EE}\u{1F1F9}",name:"Italiano"},
{code:"PT",flag:"\u{1F1E7}\u{1F1F7}",name:"Portugu\u00eas"},
{code:"NL",flag:"\u{1F1F3}\u{1F1F1}",name:"Nederlands"},
{code:"RU",flag:"\u{1F1F7}\u{1F1FA}",name:"\u0420\u0443\u0441\u0441\u043A\u0438\u0439"},
{code:"ZH",flag:"\u{1F1E8}\u{1F1F3}",name:"\u7B80\u4F53\u4E2D\u6587"},
{code:"ZH-TW",flag:"\u{1F1F9}\u{1F1FC}",name:"\u7E41\u9AD4\u4E2D\u6587"},
{code:"JA",flag:"\u{1F1EF}\u{1F1F5}",name:"\u65E5\u672C\u8A9E"},
{code:"KO",flag:"\u{1F1F0}\u{1F1F7}",name:"\uD55C\uAD6D\uC5B4"},
{code:"AR",flag:"\u{1F1F8}\u{1F1E6}",name:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629"},
{code:"HI",flag:"\u{1F1EE}\u{1F1F3}",name:"\u0939\u093F\u0928\u094D\u0926\u0940"},
{code:"BN",flag:"\u{1F1E7}\u{1F1E9}",name:"\u09AC\u09BE\u0982\u09B2\u09BE"},
{code:"TR",flag:"\u{1F1F9}\u{1F1F7}",name:"T\u00fcrk\u00e7e"},
{code:"PL",flag:"\u{1F1F5}\u{1F1F1}",name:"Polski"},
{code:"SV",flag:"\u{1F1F8}\u{1F1EA}",name:"Svenska"},
{code:"NO",flag:"\u{1F1F3}\u{1F1F4}",name:"Norsk"},
{code:"DA",flag:"\u{1F1E9}\u{1F1F0}",name:"Dansk"},
{code:"FI",flag:"\u{1F1EB}\u{1F1EE}",name:"Suomi"},
{code:"EL",flag:"\u{1F1EC}\u{1F1F7}",name:"\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"},
{code:"ID",flag:"\u{1F1EE}\u{1F1E9}",name:"Bahasa Indonesia"},
{code:"MS",flag:"\u{1F1F2}\u{1F1FE}",name:"Bahasa Melayu"},
{code:"TH",flag:"\u{1F1F9}\u{1F1ED}",name:"\u0E44\u0E17\u0E22"},
{code:"VI",flag:"\u{1F1FB}\u{1F1F3}",name:"Ti\u1EBFng Vi\u1EC7t"},
{code:"UK",flag:"\u{1F1FA}\u{1F1E6}",name:"\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"},
{code:"CS",flag:"\u{1F1E8}\u{1F1FF}",name:"\u010Ce\u0161tina"},
{code:"RO",flag:"\u{1F1F7}\u{1F1F4}",name:"Rom\u00e2n\u0103"},
{code:"HU",flag:"\u{1F1ED}\u{1F1FA}",name:"Magyar"},
{code:"SK",flag:"\u{1F1F8}\u{1F1F0}",name:"Sloven\u010Dina"},
{code:"HR",flag:"\u{1F1ED}\u{1F1F7}",name:"Hrvatski"},
{code:"CA",flag:"\u{1F1EA}\u{1F1F8}",name:"Catal\u00e0"},
{code:"AF",flag:"\u{1F1FF}\u{1F1E6}",name:"Afrikaans"},
{code:"SW",flag:"\u{1F1F0}\u{1F1EA}",name:"Swahili"},
{code:"HA",flag:"\u{1F1F3}\u{1F1EC}",name:"Hausa"},
{code:"AM",flag:"\u{1F1EA}\u{1F1F9}",name:"\u12A0\u121B\u122D\u129B"}
];

// ===== TRANSLATION KEYS =====
// Every visible text surface on the page gets a key.
// nav: navSS, navFeat, navPrice1, navDemo, navPrice2, navFAQ, navConnect, navCTA
// hero: heroBadge, heroH1a, heroH1b, heroSub, heroMac, heroIOS, trustA, trustB, trustC
// platforms: platLabel, platIPhone, platIPad, platMac
// screenshots: ssEye, ssH, ssSub
// native apps: naEye, naH, naSub
// showcase card 1: sc1Tag, sc1H, sc1P, sc1Row, sc1PgLabel, sc1Compare, sc1Trial
// showcase card 2: sc2Tag, sc2H, sc2P, sc2Prompt, sc2Pick, sc2PickSub
// input methods: imEye, imH, imSub
// features: featEye, featH, featSub, f1, f1p, f2, f2p, f3, f3p, f4, f4p, f5, f5p
// models: modEye, modH, modSub
// demo: demoEye, demoH, demoSub
// problem: probEye, probH, probSub, probBadH, probBadP, probGoodH, probGoodP
// save/compare: saveEye, saveH, saveSub, saveRow, savePgLabel, saveCompare, saveTrial, saveTrA, saveTrB, saveTrC
// templates: tplEye, tplH, tplSub
// pricing: prEye, prH, prSub
// pricing cards: prTier1, prName1, prDesc1, prCTA1, prTier2, prName2, prDesc2, prCTA2, prTier3, prName3, prDesc3, prCTA3
// pricing features lists: pf1a,pf1b,pf1c,pf1d, pf2a,pf2b,pf2c,pf2d, pf3a,pf3b,pf3c,pf3d
// faq: fqEye, fqH, fqSub, fq1q..fq10q, fq1a..fq10a
// mcp: mcpEye, mcpH, mcpSub
// footer: ftTag, ftProd, ftPlat, ftComp, ftFeat, ftTpl, ftPrice, ftFAQ, ftMacOS, ftIOS, ftConnect, ftMCP, ftPriv, ftTerms, ftSupp, ftContact, ftCopy, ftPrivL, ftTermsL, ftSuppL
// chat: chatT, chatSub, chatPH, chatWel, cs1..cs12

var T={};

// ===== ENGLISH (complete — master key set) =====
T.EN={
// Nav
navSS:"Screenshots",navFeat:"Features",navPrice1:"Pricing",navDemo:"Demo",navPrice2:"Pricing",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C Connect",navCTA:"Available Now",
// Hero
heroBadge:"Available Now on Mac, iPhone & iPad",
heroH1a:"Every Language. One Prompt.",
heroH1b:"Every AI \u2014 Compare the Results.",
heroSub:"Tell Poly-Glot what you need. Type or speak naturally in your language. Choose your AI, compare answers, pick the best one. 1,000+ templates in 37 languages. Available now on Mac, iPhone & iPad.",
heroMac:"\uF8FF Mac \u2014 Download Now",
heroIOS:"\uD83D\uDCF1 iPhone & iPad \u2014 Download Now",
trustA:"100% On-Device",trustB:"No Data Collection",trustC:"3-Day Free Trial",
// Platforms
platLabel:"Available on Apple platforms",
platIPhone:"iPhone",platIPad:"iPad",platMac:"macOS",
platAvail:"Available Now",
// Screenshots
ssEye:"\uD83D\uDCF8 Screenshots",ssH:"See it for yourself.",ssSub:"Poly-Glot AI Workspace runs natively on Mac, iPhone & iPad. Available now on the App Store.",
// Native Apps
naEye:"\uD83D\uDCF2 Native Apps",naH:"One AI workspace. Every Apple device.",naSub:"Poly-Glot AI Workspace runs natively on Mac, iPhone & iPad. Same templates, same power, wherever you work.",
// Showcase Card 1
sc1Tag:"\uD83D\uDCB0 Why use 1 AI?",
sc1H:"\uD83D\uDD00 Compare 9 AIs \u2014 pick the best answer",
sc1P:"Send the same prompt to ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, and Mistral. Compare answers side by side with \uD83D\uDD00 Compare Mode. Fully localized in 37 languages \u2014 every response in your language. Just $9.99/mo.",
sc1Row:"1 AI subscription",
sc1PgLabel:"Poly-Glot AI Workspace",
sc1Compare:"\uD83D\uDD00 Compare Mode \u00b7 9 AIs \u00b7 37 languages \u00b7 One subscription.",
sc1Trial:"3-day free trial included \u00b7 Cancel anytime \u00b7 $6.67/mo with annual",
// Showcase Card 2
sc2Tag:"\uD83D\uDD00 Compare Mode",
sc2H:"Which answer would you pick?",
sc2P:"Send the same prompt to multiple AI apps and compare their responses. Toggle \uD83D\uDD00 Compare Mode on, select which AIs you want, then tap Send to All. Each AI opens with your prompt ready. Pick the best answer.",
sc2Prompt:"Write a polite email to my landlord asking to fix the heater before winter.",
sc2Pick:"\u2713 Pick the one that sounds like you.",
sc2PickSub:"One prompt. Every AI. You decide.",
// Input Methods
imEye:"\u270D\uFE0F Input Methods",imH:"Five ways to build prompts",imSub:"Type it, paste it, import it, or dictate it \u2014 in any of 37 languages. The entire app is fully localized, so Poly-Glot meets you wherever your ideas start.",
// Features
featEye:"\u26A1 Features",featH:"Everything you need to write better prompts",featSub:"Why choose or pay for one AI? Ask Poly-Glot. Choose your models. Compare the answers. Pick the best one.",
f1:"1,000+ Prompt Templates",f1p:"Curated templates for writing, coding, marketing, education, business, and more. Organized by category, ready to use.",
f2:"Voice Input",f2p:"Speak your prompt instead of typing. On-device speech recognition turns your voice into structured, copy-ready prompts.",
f3:"One-Tap Copy",f3p:"Build your prompt, tap copy, paste it into ChatGPT, Claude, Gemini, or any AI. No accounts, no APIs, no friction.",
f4:"100% Private",f4p:"Everything runs on your device. No data collection, no tracking, no servers. Your prompts never leave your phone or Mac.",
f5:"Fully Localized in 37 Languages",f5p:"The entire UI \u2014 every button, label, menu, and template \u2014 is fully translated into 37 languages. Choose your output language and send to one AI or compare several. Every response comes back in your selected language from the first word. Not just prompts \u2014 the whole app speaks your language.",
// Models
modEye:"\uD83E\uDD16 Compatible With",modH:"Works with 9 AI apps",modSub:"Poly-Glot works with every AI. Ask multiple models the same question and compare their answers.",
// Demo
demoEye:"\uD83C\uDFA4 Live App Demo",demoH:"See Poly-Glot AI Workspace in action",demoSub:"Type your prompt, choose your AIs, and tap Send. Each AI opens in its own browser tab, responds, and you return to the app to send the next.",
// Problem
probEye:"\uD83E\uDDE0 The Problem",probH:"Why one AI isn't enough",probSub:"Every AI thinks differently. ChatGPT writes one way, Claude another. Gemini reasons differently than Grok. The best answer depends on the question \u2014 so why limit yourself to one? Poly-Glot lets you ask them all and compare.",
probBadH:"\u274C Using one AI",probBadP:"You ask ChatGPT, get one answer, and hope it's right. No second opinion. No comparison. No way to know if another AI would have given you something better.",
probGoodH:"\u2714\uFE0F Using Poly-Glot with Compare Mode",probGoodP:"Type your question once, toggle \uD83D\uDD00 Compare Mode, select ChatGPT + Claude + Gemini, and get 3 different perspectives in seconds. Pick the best answer. \uD83D\uDD00 Compare Mode requires a Pro subscription.",
// Save/Compare block
saveEye:"\uD83D\uDCB0 Why use 1 AI?",saveH:"\uD83D\uDD00 Compare 9 AIs \u2014 pick the best answer",
saveSub:"Why settle for one AI when you can compare them all? Send the same prompt to ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, and Mistral with \uD83D\uDD00 Compare Mode. Every response comes back in your selected language \u2014 37 languages fully localized. 3-day free trial, then 1 free send/day. Pro from $9.99/mo.",
saveRow:"1 AI subscription",savePgLabel:"Poly-Glot AI Workspace",
saveCompare:"\uD83D\uDD00 Compare Mode \u00b7 9 AIs \u00b7 37 languages \u00b7 One subscription.",
saveTrial:"3-day free trial \u00b7 1 free send/day after \u00b7 Cancel anytime",
saveTrA:"100% On-Device",saveTrB:"No Data Collection",saveTrC:"Fully Localized \u2014 37 Languages",
// Templates
tplEye:"\uD83D\uDCDA Template Library",tplH:"1,000+ templates. Every category.",tplSub:"From marketing copy to code reviews, from lesson plans to legal drafts. Find the right prompt in seconds.",
// Pricing
prEye:"\uD83D\uDCB0 Pricing",prH:"Start free. Upgrade when ready.",prSub:"3-day free trial \u2014 everything unlocked. All 1,000+ templates, Compare Mode, unlimited sends. After trial: 1 free send/day. Pro for unlimited access.",
prTier1:"Free",prName1:"Trial",prDesc1:"3-day free trial \u00b7 then 1 free send/day",prCTA1:"Download Free",
prTier2:"Pro Monthly",prName2:"Pro",prDesc2:"Full access. Cancel anytime.",prCTA2:"Download Free",
prTier3:"Pro Yearly",prName3:"Pro Annual",prDesc3:"Save 33% vs monthly",prCTA3:"Download Free",
pf1a:"25 Featured Templates",pf1b:"1 Free Send / Day",pf1c:"All 9 AIs",pf1d:"Voice Input",
pf2a:"All 1,000+ Templates",pf2b:"Unlimited Sends",pf2c:"\uD83D\uDD00 Compare Mode",pf2d:"Priority Support",
pf3a:"Everything in Pro",pf3b:"Best Value",pf3c:"$6.67/mo effective",pf3d:"All Future Updates",
// FAQ
fqEye:"\u2753 FAQ",fqH:"Common questions",fqSub:"Everything you need to know about Poly-Glot AI Workspace.",
fq1q:"What is Poly-Glot AI Workspace?",
fq1a:"Poly-Glot AI Workspace is a native app for Mac, iPhone & iPad that lets you ask any AI \u2014 ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, and more \u2014 all from one place. The entire UI is fully localized in 37 languages. Type or speak naturally, use 1,000+ templates, and toggle \uD83D\uDD00 Compare Mode to send to multiple AIs and pick the best answer.",
fq2q:"Where is Poly-Glot AI Workspace available?",
fq2a:"Available now on the App Store for Mac, iPhone, and iPad. You can also connect via MCP \u2014 see the Connect section.",
fq3q:"Is my data private?",
fq3a:"Yes. 100% on your device. No data collection, no tracking, no servers. Your prompts never leave your device.",
fq4q:"What is Compare Mode?",
fq4a:"Compare Mode lets you send the same prompt to multiple AI models at once and see both responses side by side. Pick the best answer. Included in the free trial and Pro.",
fq5q:"Which AI models does it support?",
fq5a:"ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, HuggingChat, DuckDuckGo AI.",
fq6q:"How does the free trial work?",
fq6a:"3-day trial with everything unlocked. After that, 1 free send/day. Upgrade to Pro ($9.99/mo or $79.99/yr) for unlimited.",
fq7q:"How many input methods are supported?",
fq7a:"Five: type, paste, import, scan, and dictate. The entire UI is fully localized in 37 languages.",
fq8q:"Can I cancel my subscription?",
fq8a:"Yes. Cancel anytime from Apple ID settings. No questions asked.",
fq9q:"Why use 1 AI when you can compare 9?",
fq9a:"Most AI subscriptions cost $20/mo for one service. Poly-Glot gives you 9 AIs with Compare Mode from $9.99/mo. Fully localized in 37 languages.",
fq10q:"What is MCP and how does it work with Poly-Glot?",
fq10a:"MCP (Model Context Protocol) lets AI assistants connect to external tools. Connect Poly-Glot via MCP to search templates and build prompts from within Claude or ChatGPT.",
// MCP
mcpEye:"\uD83D\uDD0C MCP Integration",mcpH:"Connect to Claude & ChatGPT",mcpSub:"Access 1,000+ prompt templates directly inside your AI assistant \u2014 no app download required.",
// Footer
ftTag:"Every Language. One Prompt. Every AI \u2014 Compare the Results. 1,000+ templates. 37 languages. Available now on Mac, iPhone & iPad.",
ftProd:"Product",ftPlat:"Platform",ftComp:"Company",
ftFeat:"Features",ftTpl:"Templates",ftPrice:"Pricing",ftFAQ:"FAQ",
ftMacOS:"\uD83D\uDCBB macOS \u2014 Available Now",ftIOS:"\uD83D\uDCF1 iOS \u2014 Available Now",ftConnect:"\uD83D\uDD0C Connect to Claude / ChatGPT",ftMCP:"\uD83C\uDF10 MCP Listings",
ftPriv:"Privacy Policy",ftTerms:"Terms of Use",ftSupp:"Support",ftContact:"Contact",
ftCopy:"\u00a9 2025 Poly-Glot AI. All rights reserved.",
ftPrivL:"Privacy",ftTermsL:"Terms",ftSuppL:"Support",
// Chat
chatT:"Poly-Glot AI Assistant",chatSub:"Ask me anything about the product",chatPH:"Ask a question\u2026",
chatWel:"Hey there! \uD83E\uDD9C I'm the Poly-Glot AI Assistant. Ask me anything about features, pricing, AIs, languages, templates, or how to get started!",
cs1:"What is Poly-Glot?",cs2:"How much?",cs3:"Which AIs?",cs4:"Templates?",cs5:"Private?",cs6:"Devices?",cs7:"How it works?",cs8:"Free trial?",cs9:"Compare Mode?",cs10:"MCP setup?",cs11:"Languages?",cs12:"Download?"
};

// ===== SPANISH =====
T.ES={
navSS:"Capturas",navFeat:"Funciones",navPrice1:"Precios",navDemo:"Demo",navPrice2:"Precios",navFAQ:"Preguntas",navConnect:"\uD83D\uDD0C Conectar",navCTA:"Disponible",
heroBadge:"Disponible en Mac, iPhone y iPad",heroH1a:"Todos los idiomas. Un prompt.",heroH1b:"Todas las IA \u2014 Compara resultados.",
heroSub:"Dile a Poly-Glot lo que necesitas. Escribe o habla en tu idioma. Elige tu IA, compara respuestas, elige la mejor. M\u00e1s de 1.000 plantillas en 37 idiomas. Disponible en Mac, iPhone y iPad.",
heroMac:"\uF8FF Mac \u2014 Descargar",heroIOS:"\uD83D\uDCF1 iPhone y iPad \u2014 Descargar",
trustA:"100% en el dispositivo",trustB:"Sin recolecci\u00f3n de datos",trustC:"Prueba gratis 3 d\u00edas",
platLabel:"Disponible en plataformas Apple",platAvail:"Disponible",
ssEye:"\uD83D\uDCF8 Capturas",ssH:"Compru\u00e9balo t\u00fa mismo.",ssSub:"Poly-Glot funciona de forma nativa en Mac, iPhone y iPad. Disponible en la App Store.",
naEye:"\uD83D\uDCF2 Apps nativas",naH:"Un espacio de trabajo IA. Todos los dispositivos Apple.",naSub:"Poly-Glot funciona de forma nativa en Mac, iPhone y iPad. Las mismas plantillas, el mismo poder.",
sc1Tag:"\uD83D\uDCB0 \u00bfPor qu\u00e9 usar 1 IA?",sc1H:"\uD83D\uDD00 Compara 9 IAs \u2014 elige la mejor",sc1P:"Env\u00eda el mismo prompt a ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot y Mistral. Compara respuestas con \uD83D\uDD00 Modo Comparar. 37 idiomas. Solo $9.99/mes.",
sc1Row:"1 suscripci\u00f3n IA",sc1PgLabel:"Poly-Glot AI Workspace",sc1Compare:"\uD83D\uDD00 Modo Comparar \u00b7 9 IAs \u00b7 37 idiomas \u00b7 Una suscripci\u00f3n.",sc1Trial:"Prueba gratis 3 d\u00edas \u00b7 Cancela cuando quieras \u00b7 $6.67/mes anual",
sc2Tag:"\uD83D\uDD00 Modo Comparar",sc2H:"\u00bfQu\u00e9 respuesta elegir\u00edas?",sc2P:"Env\u00eda el mismo prompt a varias IAs y compara sus respuestas. Activa \uD83D\uDD00 Modo Comparar, selecciona las IAs, toca Enviar. Elige la mejor.",
sc2Prompt:"Escribe un correo amable a mi casero pidi\u00e9ndole que arregle la calefacci\u00f3n antes del invierno.",
sc2Pick:"\u2713 Elige la que suene como t\u00fa.",sc2PickSub:"Un prompt. Todas las IA. T\u00fa decides.",
imEye:"\u270D\uFE0F M\u00e9todos de entrada",imH:"Cinco formas de crear prompts",imSub:"Escr\u00edbelo, p\u00e9galo, imp\u00f3rtalo o d\u00edctalo \u2014 en 37 idiomas. Toda la app est\u00e1 localizada.",
featEye:"\u26A1 Funciones",featH:"Todo para escribir mejores prompts",featSub:"\u00bfPor qu\u00e9 pagar por una sola IA? Elige tus modelos. Compara. Elige la mejor.",
f1:"1.000+ plantillas",f1p:"Plantillas para escritura, c\u00f3digo, marketing, educaci\u00f3n y m\u00e1s.",
f2:"Entrada de voz",f2p:"Habla en lugar de escribir. Reconocimiento de voz en el dispositivo.",
f3:"Copiar con un toque",f3p:"Crea tu prompt, c\u00f3pialo, p\u00e9galo en cualquier IA.",
f4:"100% privado",f4p:"Todo en tu dispositivo. Sin datos, sin rastreo, sin servidores.",
f5:"37 idiomas",f5p:"Toda la interfaz traducida en 37 idiomas. Cada bot\u00f3n, men\u00fa y plantilla.",
modEye:"\uD83E\uDD16 Compatible con",modH:"Funciona con 9 apps de IA",modSub:"Poly-Glot funciona con todas las IA. Compara respuestas.",
demoEye:"\uD83C\uDFA4 Demo en vivo",demoH:"Mira Poly-Glot en acci\u00f3n",demoSub:"Escribe tu prompt, elige tus IAs, toca Enviar.",
probEye:"\uD83E\uDDE0 El problema",probH:"\u00bfPor qu\u00e9 una sola IA no es suficiente?",probSub:"Cada IA piensa diferente. La mejor respuesta depende de la pregunta. Poly-Glot te deja preguntar a todas y comparar.",
probBadH:"\u274C Usar una sola IA",probBadP:"Preguntas a ChatGPT, recibes una respuesta y esperas que sea correcta. Sin segunda opini\u00f3n.",
probGoodH:"\u2714\uFE0F Usar Poly-Glot con Modo Comparar",probGoodP:"Escribe una vez, activa \uD83D\uDD00 Modo Comparar, obt\u00e9n 3 perspectivas en segundos.",
saveEye:"\uD83D\uDCB0 \u00bfPor qu\u00e9 usar 1 IA?",saveH:"\uD83D\uDD00 Compara 9 IAs \u2014 elige la mejor",
saveSub:"\u00bfPor qu\u00e9 conformarte con una IA? Compara todas con \uD83D\uDD00 Modo Comparar. 37 idiomas. Prueba gratis 3 d\u00edas. Pro desde $9.99/mes.",
saveRow:"1 suscripci\u00f3n IA",savePgLabel:"Poly-Glot AI Workspace",saveCompare:"\uD83D\uDD00 Modo Comparar \u00b7 9 IAs \u00b7 37 idiomas \u00b7 Una suscripci\u00f3n.",
saveTrial:"Prueba gratis 3 d\u00edas \u00b7 1 env\u00edo gratis/d\u00eda \u00b7 Cancela cuando quieras",
saveTrA:"100% en el dispositivo",saveTrB:"Sin recolecci\u00f3n de datos",saveTrC:"37 idiomas",
tplEye:"\uD83D\uDCDA Plantillas",tplH:"1.000+ plantillas. Todas las categor\u00edas.",tplSub:"De marketing a c\u00f3digo. Encuentra el prompt correcto en segundos.",
prEye:"\uD83D\uDCB0 Precios",prH:"Empieza gratis. Mejora cuando quieras.",prSub:"Prueba gratis 3 d\u00edas. Todo desbloqueado. Pro para acceso ilimitado.",
prTier1:"Gratis",prName1:"Prueba",prDesc1:"Prueba gratis 3 d\u00edas \u00b7 luego 1 env\u00edo/d\u00eda",prCTA1:"Descargar gratis",
prTier2:"Pro Mensual",prName2:"Pro",prDesc2:"Acceso completo. Cancela cuando quieras.",prCTA2:"Descargar gratis",
prTier3:"Pro Anual",prName3:"Pro Anual",prDesc3:"Ahorra 33% vs mensual",prCTA3:"Descargar gratis",
pf1a:"25 plantillas destacadas",pf1b:"1 env\u00edo gratis/d\u00eda",pf1c:"Las 9 IAs",pf1d:"Entrada de voz",
pf2a:"1.000+ plantillas",pf2b:"Env\u00edos ilimitados",pf2c:"\uD83D\uDD00 Modo Comparar",pf2d:"Soporte prioritario",
pf3a:"Todo en Pro",pf3b:"Mejor valor",pf3c:"$6.67/mes efectivo",pf3d:"Todas las actualizaciones",
fqEye:"\u2753 Preguntas",fqH:"Preguntas frecuentes",fqSub:"Todo lo que necesitas saber sobre Poly-Glot.",
fq1q:"\u00bfQu\u00e9 es Poly-Glot AI Workspace?",fq1a:"Una app nativa para Mac, iPhone y iPad para usar cualquier IA desde un solo lugar. 37 idiomas, 1.000+ plantillas, Modo Comparar.",
fq2q:"\u00bfD\u00f3nde est\u00e1 disponible?",fq2a:"En la App Store para Mac, iPhone y iPad. Tambi\u00e9n v\u00eda MCP.",
fq3q:"\u00bfMis datos son privados?",fq3a:"S\u00ed. 100% en tu dispositivo. Sin recolecci\u00f3n de datos.",
fq4q:"\u00bfQu\u00e9 es el Modo Comparar?",fq4a:"Env\u00eda el mismo prompt a varias IAs y compara respuestas lado a lado.",
fq5q:"\u00bfQu\u00e9 modelos soporta?",fq5a:"ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, HuggingChat, DuckDuckGo AI.",
fq6q:"\u00bfC\u00f3mo funciona la prueba?",fq6a:"3 d\u00edas gratis con todo. Luego 1 env\u00edo/d\u00eda. Pro desde $9.99/mes.",
fq7q:"\u00bfCu\u00e1ntos m\u00e9todos de entrada?",fq7a:"Cinco: escribir, pegar, importar, escanear, dictar.",
fq8q:"\u00bfPuedo cancelar?",fq8a:"S\u00ed. Cancela desde los ajustes de tu Apple ID.",
fq9q:"\u00bfPor qu\u00e9 1 IA si puedes comparar 9?",fq9a:"La mayor\u00eda cuesta $20/mes por una IA. Poly-Glot da 9 desde $9.99/mes.",
fq10q:"\u00bfQu\u00e9 es MCP?",fq10a:"MCP conecta asistentes IA con herramientas externas. Conecta Poly-Glot a Claude o ChatGPT.",
mcpEye:"\uD83D\uDD0C Integraci\u00f3n MCP",mcpH:"Conecta con Claude y ChatGPT",mcpSub:"Accede a 1.000+ plantillas directamente en tu asistente IA.",
ftTag:"Todos los idiomas. Un prompt. Todas las IA \u2014 Compara. 1.000+ plantillas. 37 idiomas.",
ftProd:"Producto",ftPlat:"Plataforma",ftComp:"Empresa",ftFeat:"Funciones",ftTpl:"Plantillas",ftPrice:"Precios",ftFAQ:"Preguntas",
ftMacOS:"\uD83D\uDCBB macOS \u2014 Disponible",ftIOS:"\uD83D\uDCF1 iOS \u2014 Disponible",ftConnect:"\uD83D\uDD0C Conectar con Claude / ChatGPT",ftMCP:"\uD83C\uDF10 Listados MCP",
ftPriv:"Pol\u00edtica de privacidad",ftTerms:"Condiciones de uso",ftSupp:"Soporte",ftContact:"Contacto",
ftCopy:"\u00a9 2025 Poly-Glot AI. Todos los derechos reservados.",ftPrivL:"Privacidad",ftTermsL:"Condiciones",ftSuppL:"Soporte",
chatT:"Asistente IA Poly-Glot",chatSub:"Preg\u00fantame sobre el producto",chatPH:"Haz una pregunta\u2026",
chatWel:"\u00a1Hola! \uD83E\uDD9C Soy el Asistente IA. Preg\u00fantame sobre funciones, precios, IAs, idiomas o plantillas.",
cs1:"\u00bfQu\u00e9 es?",cs2:"\u00bfCu\u00e1nto cuesta?",cs3:"\u00bfQu\u00e9 IAs?",cs4:"\u00bfPlantillas?",cs5:"\u00bfPrivado?",cs6:"\u00bfDispositivos?",cs7:"\u00bfC\u00f3mo funciona?",cs8:"Prueba gratis",cs9:"Modo Comparar",cs10:"Config MCP",cs11:"Idiomas",cs12:"Descargar"
};

// ===== FRENCH =====
T.FR={
navSS:"Captures",navFeat:"Fonctions",navPrice1:"Tarifs",navDemo:"D\u00e9mo",navPrice2:"Tarifs",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C Connecter",navCTA:"Disponible",
heroBadge:"Disponible sur Mac, iPhone et iPad",heroH1a:"Toutes les langues. Un prompt.",heroH1b:"Toutes les IA \u2014 Comparez les r\u00e9sultats.",
heroSub:"Dites \u00e0 Poly-Glot ce dont vous avez besoin. Tapez ou parlez dans votre langue. Choisissez votre IA, comparez, choisissez la meilleure. 1 000+ mod\u00e8les en 37 langues.",
heroMac:"\uF8FF Mac \u2014 T\u00e9l\u00e9charger",heroIOS:"\uD83D\uDCF1 iPhone et iPad \u2014 T\u00e9l\u00e9charger",
trustA:"100% sur l'appareil",trustB:"Aucune collecte de donn\u00e9es",trustC:"Essai gratuit 3 jours",
platLabel:"Disponible sur les plateformes Apple",platAvail:"Disponible",
ssEye:"\uD83D\uDCF8 Captures",ssH:"Voyez par vous-m\u00eame.",ssSub:"Poly-Glot fonctionne nativement sur Mac, iPhone et iPad.",
naEye:"\uD83D\uDCF2 Apps natives",naH:"Un espace de travail IA. Chaque appareil Apple.",naSub:"Poly-Glot fonctionne nativement sur Mac, iPhone et iPad. M\u00eames mod\u00e8les, m\u00eame puissance.",
sc1Tag:"\uD83D\uDCB0 Pourquoi 1 seule IA ?",sc1H:"\uD83D\uDD00 Comparez 9 IA \u2014 choisissez la meilleure",sc1P:"Envoyez le m\u00eame prompt \u00e0 ChatGPT, Claude, Gemini et plus. Comparez avec \uD83D\uDD00 Mode Comparaison. 37 langues. $9.99/mois.",
sc1Row:"1 abonnement IA",sc1Compare:"\uD83D\uDD00 Mode Comparaison \u00b7 9 IA \u00b7 37 langues \u00b7 Un abonnement.",sc1Trial:"Essai gratuit 3 jours \u00b7 Annulez \u00e0 tout moment",
sc2Tag:"\uD83D\uDD00 Mode Comparaison",sc2H:"Quelle r\u00e9ponse choisiriez-vous ?",sc2P:"Envoyez le m\u00eame prompt \u00e0 plusieurs IA et comparez. Choisissez la meilleure.",
sc2Pick:"\u2713 Choisissez celle qui vous ressemble.",sc2PickSub:"Un prompt. Toutes les IA. Vous d\u00e9cidez.",
imEye:"\u270D\uFE0F M\u00e9thodes de saisie",imH:"Cinq fa\u00e7ons de cr\u00e9er des prompts",imSub:"Tapez, collez, importez ou dictez \u2014 en 37 langues.",
featEye:"\u26A1 Fonctions",featH:"Tout pour de meilleurs prompts",featSub:"Pourquoi payer pour une seule IA ? Choisissez. Comparez. Choisissez la meilleure.",
f1:"1 000+ mod\u00e8les",f1p:"Mod\u00e8les pour \u00e9criture, code, marketing, \u00e9ducation et plus.",
f2:"Saisie vocale",f2p:"Parlez au lieu de taper. Reconnaissance vocale sur l'appareil.",
f3:"Copie rapide",f3p:"Cr\u00e9ez votre prompt, copiez, collez dans n'importe quelle IA.",
f4:"100% priv\u00e9",f4p:"Tout sur votre appareil. Aucune donn\u00e9e collect\u00e9e.",
f5:"37 langues",f5p:"Toute l'interface traduite en 37 langues.",
modEye:"\uD83E\uDD16 Compatible avec",modH:"Fonctionne avec 9 apps IA",modSub:"Poly-Glot fonctionne avec toutes les IA. Comparez les r\u00e9ponses.",
demoEye:"\uD83C\uDFA4 D\u00e9mo en direct",demoH:"Voyez Poly-Glot en action",demoSub:"Tapez votre prompt, choisissez vos IA, appuyez sur Envoyer.",
probEye:"\uD83E\uDDE0 Le probl\u00e8me",probH:"Pourquoi une seule IA ne suffit pas",probSub:"Chaque IA pense diff\u00e9remment. Poly-Glot vous permet de toutes les interroger et comparer.",
probBadH:"\u274C Utiliser une seule IA",probBadP:"Vous demandez \u00e0 ChatGPT et esp\u00e9rez que la r\u00e9ponse soit bonne.",
probGoodH:"\u2714\uFE0F Utiliser Poly-Glot avec le Mode Comparaison",probGoodP:"Tapez une fois, activez le mode, obtenez 3 perspectives en secondes.",
saveEye:"\uD83D\uDCB0 Pourquoi 1 seule IA ?",saveH:"\uD83D\uDD00 Comparez 9 IA",saveSub:"Comparez toutes les IA. 37 langues. Essai gratuit. Pro \u00e0 $9.99/mois.",
saveRow:"1 abonnement IA",saveCompare:"\uD83D\uDD00 Mode Comparaison \u00b7 9 IA \u00b7 37 langues.",saveTrial:"Essai gratuit 3 jours \u00b7 Annulez \u00e0 tout moment",
saveTrA:"100% sur l'appareil",saveTrB:"Aucune collecte",saveTrC:"37 langues",
tplEye:"\uD83D\uDCDA Mod\u00e8les",tplH:"1 000+ mod\u00e8les. Toutes cat\u00e9gories.",tplSub:"Du marketing au code. Trouvez le bon prompt en secondes.",
prEye:"\uD83D\uDCB0 Tarifs",prH:"Commencez gratuitement.",prSub:"Essai gratuit 3 jours. Tout d\u00e9bloqu\u00e9. Pro pour acc\u00e8s illimit\u00e9.",
prTier1:"Gratuit",prName1:"Essai",prDesc1:"Essai gratuit 3 jours \u00b7 puis 1 envoi/jour",prCTA1:"T\u00e9l\u00e9charger",
prTier2:"Pro Mensuel",prName2:"Pro",prDesc2:"Acc\u00e8s complet. Annulez quand vous voulez.",prCTA2:"T\u00e9l\u00e9charger",
prTier3:"Pro Annuel",prName3:"Pro Annuel",prDesc3:"\u00c9conomisez 33%",prCTA3:"T\u00e9l\u00e9charger",
pf1a:"25 mod\u00e8les vedettes",pf1b:"1 envoi gratuit/jour",pf1c:"Les 9 IA",pf1d:"Saisie vocale",
pf2a:"1 000+ mod\u00e8les",pf2b:"Envois illimit\u00e9s",pf2c:"\uD83D\uDD00 Mode Comparaison",pf2d:"Support prioritaire",
pf3a:"Tout dans Pro",pf3b:"Meilleur rapport",pf3c:"$6.67/mois effectif",pf3d:"Toutes mises \u00e0 jour",
fqEye:"\u2753 FAQ",fqH:"Questions fr\u00e9quentes",fqSub:"Tout ce qu'il faut savoir sur Poly-Glot.",
mcpEye:"\uD83D\uDD0C Int\u00e9gration MCP",mcpH:"Connectez-vous \u00e0 Claude et ChatGPT",mcpSub:"Acc\u00e9dez \u00e0 1 000+ mod\u00e8les dans votre assistant IA.",
ftTag:"Toutes les langues. Un prompt. Toutes les IA. 1 000+ mod\u00e8les. 37 langues.",
ftProd:"Produit",ftPlat:"Plateforme",ftComp:"Entreprise",ftFeat:"Fonctions",ftTpl:"Mod\u00e8les",ftPrice:"Tarifs",ftFAQ:"FAQ",
ftPriv:"Politique de confidentialit\u00e9",ftTerms:"Conditions",ftSupp:"Support",ftContact:"Contact",
ftCopy:"\u00a9 2025 Poly-Glot AI. Tous droits r\u00e9serv\u00e9s.",ftPrivL:"Confidentialit\u00e9",ftTermsL:"Conditions",ftSuppL:"Support",
chatT:"Assistant IA Poly-Glot",chatSub:"Posez vos questions",chatPH:"Posez une question\u2026",
chatWel:"Bonjour ! \uD83E\uDD9C Je suis l'assistant Poly-Glot. Posez vos questions !",
cs1:"C'est quoi ?",cs2:"Combien ?",cs3:"Quelles IA ?",cs4:"Mod\u00e8les ?",cs5:"Priv\u00e9 ?",cs6:"Appareils ?",cs7:"Comment ?",cs8:"Essai gratuit",cs9:"Mode comparaison",cs10:"Config MCP",cs11:"Langues ?",cs12:"T\u00e9l\u00e9charger"
};

// ===== GERMAN =====
T.DE={
navSS:"Screenshots",navFeat:"Funktionen",navPrice1:"Preise",navDemo:"Demo",navPrice2:"Preise",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C Verbinden",navCTA:"Jetzt verf\u00fcgbar",
heroBadge:"Verf\u00fcgbar auf Mac, iPhone und iPad",heroH1a:"Alle Sprachen. Ein Prompt.",heroH1b:"Alle KIs \u2014 Ergebnisse vergleichen.",
heroSub:"Sag Poly-Glot, was du brauchst. Tippe oder sprich in deiner Sprache. W\u00e4hle deine KI, vergleiche Antworten. 1.000+ Vorlagen in 37 Sprachen.",
heroMac:"\uF8FF Mac \u2014 Herunterladen",heroIOS:"\uD83D\uDCF1 iPhone & iPad \u2014 Herunterladen",
trustA:"100% auf dem Ger\u00e4t",trustB:"Keine Datenerfassung",trustC:"3 Tage kostenlos",
platLabel:"Auf Apple-Plattformen verf\u00fcgbar",platAvail:"Verf\u00fcgbar",
ssEye:"\uD83D\uDCF8 Screenshots",ssH:"\u00dcberzeuge dich selbst.",ssSub:"Poly-Glot l\u00e4uft nativ auf Mac, iPhone und iPad.",
naEye:"\uD83D\uDCF2 Native Apps",naH:"Ein KI-Arbeitsbereich. Jedes Apple-Ger\u00e4t.",naSub:"Poly-Glot l\u00e4uft nativ auf Mac, iPhone und iPad. Gleiche Vorlagen, gleiche Leistung.",
featEye:"\u26A1 Funktionen",featH:"Alles f\u00fcr bessere Prompts",featSub:"Warum f\u00fcr eine KI bezahlen? W\u00e4hle deine Modelle. Vergleiche. W\u00e4hle die beste.",
f1:"1.000+ Vorlagen",f1p:"Vorlagen f\u00fcr Schreiben, Code, Marketing, Bildung und mehr.",
f2:"Spracheingabe",f2p:"Sprich statt zu tippen. Spracherkennung auf dem Ger\u00e4t.",
f3:"Ein-Tipp-Kopie",f3p:"Erstelle deinen Prompt, kopiere, f\u00fcge in jede KI ein.",
f4:"100% privat",f4p:"Alles auf deinem Ger\u00e4t. Keine Daten, kein Tracking.",
f5:"37 Sprachen",f5p:"Die gesamte Oberfl\u00e4che in 37 Sprachen \u00fcbersetzt.",
modEye:"\uD83E\uDD16 Kompatibel mit",modH:"Funktioniert mit 9 KI-Apps",modSub:"Poly-Glot funktioniert mit jeder KI. Vergleiche Antworten.",
probEye:"\uD83E\uDDE0 Das Problem",probH:"Warum eine KI nicht reicht",
probBadH:"\u274C Eine KI nutzen",probBadP:"Du fragst ChatGPT und hoffst, die Antwort stimmt.",
probGoodH:"\u2714\uFE0F Poly-Glot mit Vergleichsmodus",probGoodP:"Einmal tippen, Vergleichsmodus aktivieren, 3 Perspektiven in Sekunden.",
tplEye:"\uD83D\uDCDA Vorlagen",tplH:"1.000+ Vorlagen. Alle Kategorien.",tplSub:"Von Marketing bis Code. Finde den richtigen Prompt in Sekunden.",
prEye:"\uD83D\uDCB0 Preise",prH:"Kostenlos starten.",prSub:"3 Tage kostenlos. Alles freigeschaltet. Pro f\u00fcr unbegrenzten Zugang.",
prTier1:"Kostenlos",prName1:"Testversion",prDesc1:"3 Tage kostenlos \u00b7 dann 1 Sendung/Tag",prCTA1:"Kostenlos laden",
prTier2:"Pro Monatlich",prName2:"Pro",prDesc2:"Voller Zugang. Jederzeit k\u00fcndbar.",prCTA2:"Kostenlos laden",
prTier3:"Pro J\u00e4hrlich",prName3:"Pro J\u00e4hrlich",prDesc3:"33% sparen",prCTA3:"Kostenlos laden",
fqEye:"\u2753 FAQ",fqH:"H\u00e4ufige Fragen",fqSub:"Alles \u00fcber Poly-Glot.",
mcpEye:"\uD83D\uDD0C MCP-Integration",mcpH:"Mit Claude & ChatGPT verbinden",mcpSub:"Zugriff auf 1.000+ Vorlagen direkt in deinem KI-Assistenten.",
ftTag:"Alle Sprachen. Ein Prompt. Alle KIs. 1.000+ Vorlagen. 37 Sprachen.",
ftProd:"Produkt",ftPlat:"Plattform",ftComp:"Unternehmen",ftFeat:"Funktionen",ftTpl:"Vorlagen",ftPrice:"Preise",ftFAQ:"FAQ",
ftPriv:"Datenschutz",ftTerms:"Nutzungsbedingungen",ftSupp:"Support",ftContact:"Kontakt",
ftCopy:"\u00a9 2025 Poly-Glot AI. Alle Rechte vorbehalten.",ftPrivL:"Datenschutz",ftTermsL:"Nutzung",ftSuppL:"Support",
chatT:"Poly-Glot KI-Assistent",chatSub:"Fragen zum Produkt",chatPH:"Frage stellen\u2026",
chatWel:"Hallo! \uD83E\uDD9C Poly-Glot KI-Assistent. Frag mich zu Funktionen, Preisen, KIs oder Sprachen!",
cs1:"Was ist Poly-Glot?",cs2:"Was kostet es?",cs3:"Welche KIs?",cs4:"Vorlagen?",cs5:"Privat?",cs6:"Ger\u00e4te?",cs7:"Wie funktioniert es?",cs8:"Kostenlos testen",cs9:"Vergleichsmodus",cs10:"MCP einrichten",cs11:"Sprachen?",cs12:"Herunterladen"
};

// ===== JAPANESE =====
T.JA={
navSS:"\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8",navFeat:"\u6A5F\u80FD",navPrice1:"\u6599\u91D1",navDemo:"\u30C7\u30E2",navPrice2:"\u6599\u91D1",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C \u63A5\u7D9A",navCTA:"\u63D0\u4F9B\u4E2D",
heroBadge:"Mac\u3001iPhone\u3001iPad\u3067\u5229\u7528\u53EF\u80FD",heroH1a:"\u3059\u3079\u3066\u306E\u8A00\u8A9E\u3002\u4E00\u3064\u306E\u30D7\u30ED\u30F3\u30D7\u30C8\u3002",heroH1b:"\u3059\u3079\u3066\u306EAI \u2014 \u7D50\u679C\u3092\u6BD4\u8F03\u3002",
heroSub:"Poly-Glot\u306B\u4F55\u304C\u5FC5\u8981\u304B\u4F1D\u3048\u307E\u3057\u3087\u3046\u3002\u81EA\u5206\u306E\u8A00\u8A9E\u3067\u5165\u529B\u307E\u305F\u306F\u97F3\u58F0\u3002AI\u3092\u9078\u3073\u3001\u56DE\u7B54\u3092\u6BD4\u8F03\u3057\u3001\u6700\u9069\u306A\u3082\u306E\u3092\u9078\u629E\u300237\u8A00\u8A9E\u30011,000\u4EE5\u4E0A\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3002",
heroMac:"\uF8FF Mac \u2014 \u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",heroIOS:"\uD83D\uDCF1 iPhone & iPad \u2014 \u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
trustA:"100%\u30AA\u30F3\u30C7\u30D0\u30A4\u30B9",trustB:"\u30C7\u30FC\u30BF\u53CE\u96C6\u306A\u3057",trustC:"3\u65E5\u9593\u7121\u6599\u4F53\u9A13",
platLabel:"Apple\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0\u3067\u5229\u7528\u53EF\u80FD",platAvail:"\u5229\u7528\u53EF\u80FD",
ssEye:"\uD83D\uDCF8 \u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8",ssH:"\u3054\u81EA\u8EAB\u3067\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002",ssSub:"Poly-Glot\u306FMac\u3001iPhone\u3001iPad\u3067\u30CD\u30A4\u30C6\u30A3\u30D6\u306B\u52D5\u4F5C\u3057\u307E\u3059\u3002",
naEye:"\uD83D\uDCF2 \u30CD\u30A4\u30C6\u30A3\u30D6\u30A2\u30D7\u30EA",naH:"\u4E00\u3064\u306EAI\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u3002\u3059\u3079\u3066\u306EApple\u30C7\u30D0\u30A4\u30B9\u3002",naSub:"\u540C\u3058\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3001\u540C\u3058\u30D1\u30EF\u30FC\u3002",
sc1Tag:"\uD83D\uDCB0 \u306A\u305C1\u3064\u306EAI\u3060\u3051\uFF1F",sc1H:"\uD83D\uDD00 9\u3064\u306EAI\u3092\u6BD4\u8F03 \u2014 \u6700\u9069\u3092\u9078\u629E",sc1P:"ChatGPT\u3001Claude\u3001Gemini\u306A\u3069\u306B\u540C\u3058\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u9001\u4FE1\u3002\uD83D\uDD00\u6BD4\u8F03\u30E2\u30FC\u30C9\u306737\u8A00\u8A9E\u5BFE\u5FDC\u3002$9.99/\u6708\u3002",
sc1Row:"AI 1\u4EF6\u306E\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3",sc1Compare:"\uD83D\uDD00 \u6BD4\u8F03\u30E2\u30FC\u30C9 \u00b7 9 AI \u00b7 37\u8A00\u8A9E \u00b7 1\u3064\u306E\u30B5\u30D6\u30B9\u30AF",sc1Trial:"3\u65E5\u9593\u7121\u6599 \u00b7 \u3044\u3064\u3067\u3082\u30AD\u30E3\u30F3\u30BB\u30EB",
sc2Tag:"\uD83D\uDD00 \u6BD4\u8F03\u30E2\u30FC\u30C9",sc2H:"\u3069\u306E\u56DE\u7B54\u3092\u9078\u3073\u307E\u3059\u304B\uFF1F",sc2P:"\u8907\u6570\u306EAI\u306B\u540C\u3058\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u9001\u4FE1\u3057\u3001\u56DE\u7B54\u3092\u6BD4\u8F03\u3002\u6700\u9069\u3092\u9078\u629E\u3002",
sc2Pick:"\u2713 \u81EA\u5206\u3089\u3057\u3044\u56DE\u7B54\u3092\u9078\u3073\u307E\u3057\u3087\u3046\u3002",sc2PickSub:"\u4E00\u3064\u306E\u30D7\u30ED\u30F3\u30D7\u30C8\u3002\u3059\u3079\u3066\u306EAI\u3002\u3042\u306A\u305F\u304C\u6C7A\u3081\u308B\u3002",
imEye:"\u270D\uFE0F \u5165\u529B\u65B9\u6CD5",imH:"5\u3064\u306E\u30D7\u30ED\u30F3\u30D7\u30C8\u4F5C\u6210\u65B9\u6CD5",imSub:"\u5165\u529B\u3001\u8CBC\u308A\u4ED8\u3051\u3001\u30A4\u30F3\u30DD\u30FC\u30C8\u3001\u97F3\u58F0\u5165\u529B \u2014 37\u8A00\u8A9E\u5BFE\u5FDC\u3002",
featEye:"\u26A1 \u6A5F\u80FD",featH:"\u3088\u308A\u826F\u3044\u30D7\u30ED\u30F3\u30D7\u30C8\u306B\u5FC5\u8981\u306A\u3059\u3079\u3066",featSub:"\u306A\u305C1\u3064\u306EAI\u306B\u6255\u3046\uFF1F\u30E2\u30C7\u30EB\u3092\u9078\u3073\u3001\u6BD4\u8F03\u3057\u3001\u6700\u9069\u3092\u9078\u629E\u3002",
f1:"1,000\u4EE5\u4E0A\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",f1p:"\u57F7\u7B46\u3001\u30B3\u30FC\u30C9\u3001\u30DE\u30FC\u30B1\u30C6\u30A3\u30F3\u30B0\u3001\u6559\u80B2\u306A\u3069\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3002",
f2:"\u97F3\u58F0\u5165\u529B",f2p:"\u30BF\u30A4\u30D4\u30F3\u30B0\u306E\u4EE3\u308F\u308A\u306B\u8A71\u3059\u3002\u30AA\u30F3\u30C7\u30D0\u30A4\u30B9\u97F3\u58F0\u8A8D\u8B58\u3002",
f3:"\u30EF\u30F3\u30BF\u30C3\u30D7\u30B3\u30D4\u30FC",f3p:"\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u4F5C\u6210\u3001\u30B3\u30D4\u30FC\u3001\u4EFB\u610F\u306EAI\u306B\u8CBC\u308A\u4ED8\u3051\u3002",
f4:"100%\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8",f4p:"\u3059\u3079\u3066\u30C7\u30D0\u30A4\u30B9\u4E0A\u3067\u5B8C\u7D50\u3002\u30C7\u30FC\u30BF\u53CE\u96C6\u306A\u3057\u3002",
f5:"37\u8A00\u8A9E\u5BFE\u5FDC",f5p:"UI\u5168\u4F53\u304C37\u8A00\u8A9E\u306B\u7FFB\u8A33\u6E08\u307F\u3002\u30DC\u30BF\u30F3\u3001\u30E1\u30CB\u30E5\u30FC\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3059\u3079\u3066\u3002",
modEye:"\uD83E\uDD16 \u5BFE\u5FDC",modH:"9\u3064\u306EAI\u30A2\u30D7\u30EA\u306B\u5BFE\u5FDC",modSub:"\u3059\u3079\u3066\u306EAI\u3067\u52D5\u4F5C\u3002\u56DE\u7B54\u3092\u6BD4\u8F03\u3002",
demoEye:"\uD83C\uDFA4 \u30E9\u30A4\u30D6\u30C7\u30E2",demoH:"Poly-Glot\u3092\u5B9F\u969B\u306B\u898B\u308B",demoSub:"\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u5165\u529B\u3001AI\u3092\u9078\u629E\u3001\u9001\u4FE1\u3092\u30BF\u30C3\u30D7\u3002",
probEye:"\uD83E\uDDE0 \u554F\u984C",probH:"\u306A\u305C1\u3064\u306EAI\u3067\u306F\u4E0D\u5341\u5206\u306A\u306E\u304B",
probBadH:"\u274C 1\u3064\u306EAI\u3092\u4F7F\u3046",probBadP:"ChatGPT\u306B\u805E\u3044\u3066\u3001\u6B63\u3057\u3044\u3053\u3068\u3092\u7948\u308B\u3002\u6BD4\u8F03\u306A\u3057\u3002",
probGoodH:"\u2714\uFE0F Poly-Glot\u306E\u6BD4\u8F03\u30E2\u30FC\u30C9\u3092\u4F7F\u3046",probGoodP:"\u4E00\u5EA6\u5165\u529B\u3001\u6BD4\u8F03\u30E2\u30FC\u30C9ON\u3001\u6570\u79D2\u30673\u3064\u306E\u8996\u70B9\u3002",
saveEye:"\uD83D\uDCB0 \u306A\u305C1\u3064\u306EAI\u3060\u3051\uFF1F",saveH:"\uD83D\uDD00 9\u3064\u306EAI\u3092\u6BD4\u8F03",saveSub:"\u3059\u3079\u3066\u306EAI\u3092\u6BD4\u8F03\u300237\u8A00\u8A9E\u30023\u65E5\u9593\u7121\u6599\u3002Pro $9.99/\u6708\u304B\u3089\u3002",
saveRow:"AI 1\u4EF6\u306E\u30B5\u30D6\u30B9\u30AF",saveCompare:"\uD83D\uDD00 \u6BD4\u8F03\u30E2\u30FC\u30C9 \u00b7 9 AI \u00b7 37\u8A00\u8A9E\u3002",saveTrial:"3\u65E5\u9593\u7121\u6599 \u00b7 \u3044\u3064\u3067\u3082\u30AD\u30E3\u30F3\u30BB\u30EB",
saveTrA:"100%\u30AA\u30F3\u30C7\u30D0\u30A4\u30B9",saveTrB:"\u30C7\u30FC\u30BF\u53CE\u96C6\u306A\u3057",saveTrC:"37\u8A00\u8A9E\u5BFE\u5FDC",
tplEye:"\uD83D\uDCDA \u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",tplH:"1,000\u4EE5\u4E0A\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3002\u5168\u30AB\u30C6\u30B4\u30EA\u30FC\u3002",tplSub:"\u30DE\u30FC\u30B1\u30C6\u30A3\u30F3\u30B0\u304B\u3089\u30B3\u30FC\u30C9\u307E\u3067\u3002\u6570\u79D2\u3067\u6B63\u3057\u3044\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u898B\u3064\u3051\u308B\u3002",
prEye:"\uD83D\uDCB0 \u6599\u91D1",prH:"\u7121\u6599\u3067\u59CB\u3081\u3088\u3046\u3002",prSub:"3\u65E5\u9593\u7121\u6599\u4F53\u9A13\u3002\u5168\u6A5F\u80FD\u89E3\u653E\u3002Pro\u3067\u7121\u5236\u9650\u30A2\u30AF\u30BB\u30B9\u3002",
prTier1:"\u7121\u6599",prName1:"\u4F53\u9A13\u7248",prDesc1:"3\u65E5\u9593\u7121\u6599 \u00b7 \u305D\u306E\u5F8C1\u56DE/\u65E5",prCTA1:"\u7121\u6599\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
prTier2:"Pro \u6708\u984D",prName2:"Pro",prDesc2:"\u30D5\u30EB\u30A2\u30AF\u30BB\u30B9\u3002\u3044\u3064\u3067\u3082\u89E3\u7D04\u3002",prCTA2:"\u7121\u6599\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
prTier3:"Pro \u5E74\u984D",prName3:"Pro \u5E74\u984D",prDesc3:"33%\u304A\u5F97",prCTA3:"\u7121\u6599\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
pf1a:"25\u306E\u6CE8\u76EE\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",pf1b:"1\u65E51\u56DE\u7121\u6599",pf1c:"9\u3064\u306EAI\u5168\u3066",pf1d:"\u97F3\u58F0\u5165\u529B",
pf2a:"1,000+\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",pf2b:"\u7121\u5236\u9650\u9001\u4FE1",pf2c:"\uD83D\uDD00 \u6BD4\u8F03\u30E2\u30FC\u30C9",pf2d:"\u512A\u5148\u30B5\u30DD\u30FC\u30C8",
pf3a:"Pro\u306E\u5168\u6A5F\u80FD",pf3b:"\u6700\u9AD8\u306E\u4FA1\u5024",pf3c:"$6.67/\u6708\u5B9F\u8CEA",pf3d:"\u4ECA\u5F8C\u306E\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u5168\u3066",
fqEye:"\u2753 FAQ",fqH:"\u3088\u304F\u3042\u308B\u8CEA\u554F",fqSub:"Poly-Glot\u306B\u3064\u3044\u3066\u77E5\u308B\u3079\u304D\u3053\u3068\u3002",
fq1q:"Poly-Glot AI Workspace\u3068\u306F\uFF1F",fq1a:"Mac\u3001iPhone\u3001iPad\u7528\u306E\u30CD\u30A4\u30C6\u30A3\u30D6\u30A2\u30D7\u30EA\u300237\u8A00\u8A9E\u30011,000+\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3001\u6BD4\u8F03\u30E2\u30FC\u30C9\u642D\u8F09\u3002",
fq2q:"\u3069\u3053\u3067\u5229\u7528\u3067\u304D\u307E\u3059\u304B\uFF1F",fq2a:"App Store\u3067Mac\u3001iPhone\u3001iPad\u5411\u3051\u306B\u63D0\u4F9B\u4E2D\u3002MCP\u63A5\u7D9A\u3082\u53EF\u80FD\u3002",
fq3q:"\u30C7\u30FC\u30BF\u306F\u5B89\u5168\u3067\u3059\u304B\uFF1F",fq3a:"\u306F\u3044\u3002100%\u30C7\u30D0\u30A4\u30B9\u4E0A\u3002\u30C7\u30FC\u30BF\u53CE\u96C6\u306A\u3057\u3002",
fq4q:"\u6BD4\u8F03\u30E2\u30FC\u30C9\u3068\u306F\uFF1F",fq4a:"\u540C\u3058\u30D7\u30ED\u30F3\u30D7\u30C8\u3092\u8907\u6570\u306EAI\u306B\u9001\u4FE1\u3057\u3001\u56DE\u7B54\u3092\u4E26\u3079\u3066\u6BD4\u8F03\u3002",
fq5q:"\u5BFE\u5FDCAI\u30E2\u30C7\u30EB\u306F\uFF1F",fq5a:"ChatGPT\u3001Claude\u3001Gemini\u3001Grok\u3001Perplexity\u3001Copilot\u3001Mistral\u3001HuggingChat\u3001DuckDuckGo AI\u3002",
fq6q:"\u7121\u6599\u4F53\u9A13\u306E\u4ED5\u7D44\u307F\u306F\uFF1F",fq6a:"3\u65E5\u9593\u5168\u6A5F\u80FD\u89E3\u653E\u3002\u305D\u306E\u5F8C1\u65E51\u56DE\u7121\u6599\u3002Pro $9.99/\u6708\u307E\u305F\u306F$79.99/\u5E74\u3002",
fq7q:"\u5165\u529B\u65B9\u6CD5\u306F\u4F55\u7A2E\u985E\uFF1F",fq7a:"5\u7A2E\u985E\uFF1A\u5165\u529B\u3001\u8CBC\u308A\u4ED8\u3051\u3001\u30A4\u30F3\u30DD\u30FC\u30C8\u3001\u30B9\u30AD\u30E3\u30F3\u3001\u97F3\u58F0\u5165\u529B\u3002",
fq8q:"\u89E3\u7D04\u3067\u304D\u307E\u3059\u304B\uFF1F",fq8a:"\u306F\u3044\u3002Apple ID\u8A2D\u5B9A\u304B\u3089\u3044\u3064\u3067\u3082\u89E3\u7D04\u53EF\u80FD\u3002",
fq9q:"\u306A\u305C1\u3064\u306EAI\u3067\u6E80\u8DB3\uFF1F",fq9a:"\u307B\u3068\u3093\u3069\u306EAI\u306F$20/\u6708\u30021\u3064\u3060\u3051\u3002Poly-Glot\u306F9\u3064\u306EAI\u3092$9.99/\u6708\u304B\u3089\u3002",
fq10q:"MCP\u3068\u306F\uFF1F",fq10a:"MCP\u3067AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u304C\u5916\u90E8\u30C4\u30FC\u30EB\u306B\u63A5\u7D9A\u3002Claude\u3084ChatGPT\u304B\u3089Poly-Glot\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u691C\u7D22\u3002",
mcpEye:"\uD83D\uDD0C MCP\u7D71\u5408",mcpH:"Claude & ChatGPT\u306B\u63A5\u7D9A",mcpSub:"AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u5185\u30671,000+\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306B\u30A2\u30AF\u30BB\u30B9\u3002",
ftTag:"\u3059\u3079\u3066\u306E\u8A00\u8A9E\u3002\u4E00\u3064\u306E\u30D7\u30ED\u30F3\u30D7\u30C8\u3002\u3059\u3079\u3066\u306EAI\u3002",
ftProd:"\u88FD\u54C1",ftPlat:"\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0",ftComp:"\u4F1A\u793E",ftFeat:"\u6A5F\u80FD",ftTpl:"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",ftPrice:"\u6599\u91D1",ftFAQ:"FAQ",
ftPriv:"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC",ftTerms:"\u5229\u7528\u898F\u7D04",ftSupp:"\u30B5\u30DD\u30FC\u30C8",ftContact:"\u304A\u554F\u3044\u5408\u308F\u305B",
ftCopy:"\u00a9 2025 Poly-Glot AI. All rights reserved.",ftPrivL:"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC",ftTermsL:"\u5229\u7528\u898F\u7D04",ftSuppL:"\u30B5\u30DD\u30FC\u30C8",
chatT:"Poly-Glot AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8",chatSub:"\u88FD\u54C1\u306B\u3064\u3044\u3066\u8CEA\u554F",chatPH:"\u8CEA\u554F\u3092\u5165\u529B\u2026",
chatWel:"\u3053\u3093\u306B\u3061\u306F\uFF01\uD83E\uDD9C Poly-Glot AI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u6A5F\u80FD\u3001\u6599\u91D1\u3001AI\u3001\u8A00\u8A9E\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306B\u3064\u3044\u3066\u304A\u6C17\u8EFD\u306B\uFF01",
cs1:"Poly-Glot\u3068\u306F?",cs2:"\u6599\u91D1\u306F?",cs3:"\u5BFE\u5FDCAI?",cs4:"\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8?",cs5:"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC?",cs6:"\u30C7\u30D0\u30A4\u30B9?",cs7:"\u4F7F\u3044\u65B9?",cs8:"\u7121\u6599\u4F53\u9A13",cs9:"\u6BD4\u8F03\u30E2\u30FC\u30C9",cs10:"MCP\u8A2D\u5B9A",cs11:"\u8A00\u8A9E?",cs12:"\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9"
};

// ===== KOREAN =====
T.KO={
navSS:"\uc2a4\ud06c\ub9b0\uc0f7",navFeat:"\uae30\ub2a5",navPrice1:"\uac00\uaca9",navDemo:"\ub370\ubaa8",navPrice2:"\uac00\uaca9",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C \uc5f0\uacb0",navCTA:"\uc774\uc6a9 \uac00\ub2a5",
heroBadge:"Mac, iPhone, iPad \uc0ac\uc6a9 \uac00\ub2a5",heroH1a:"\ubaa8\ub4e0 \uc5b8\uc5b4. \ud558\ub098\uc758 \ud504\ub86c\ud504\ud2b8.",heroH1b:"\ubaa8\ub4e0 AI \u2014 \uacb0\uacfc \ube44\uad50.",
heroSub:"Poly-Glot\uc5d0\uac8c \ud544\uc694\ud55c \uac83\uc744 \ub9d0\ud558\uc138\uc694. \uc790\uc2e0\uc758 \uc5b8\uc5b4\ub85c \uc785\ub825\ud558\uac70\ub098 \ub9d0\ud558\uc138\uc694. AI\ub97c \uc120\ud0dd\ud558\uace0 \ub2f5\ubcc0\uc744 \ube44\uad50\ud558\uc138\uc694. 37\uac1c \uc5b8\uc5b4, 1,000\uac1c \uc774\uc0c1\uc758 \ud15c\ud50c\ub9bf.",
heroMac:"\uF8FF Mac \u2014 \ub2e4\uc6b4\ub85c\ub4dc",heroIOS:"\uD83D\uDCF1 iPhone & iPad \u2014 \ub2e4\uc6b4\ub85c\ub4dc",
trustA:"100% \uc628\ub514\ubc14\uc774\uc2a4",trustB:"\ub370\uc774\ud130 \uc218\uc9d1 \uc5c6\uc74c",trustC:"3\uc77c \ubb34\ub8cc \uccb4\ud5d8",
featEye:"\u26A1 \uae30\ub2a5",featH:"\ub354 \ub098\uc740 \ud504\ub86c\ud504\ud2b8\ub97c \uc704\ud55c \ubaa8\ub4e0 \uac83",
f1:"1,000+ \ud15c\ud50c\ub9bf",f2:"\uc74c\uc131 \uc785\ub825",f3:"\uc6d0\ud0ed \ubcf5\uc0ac",f4:"100% \ube44\uacf5\uac1c",f5:"37\uac1c \uc5b8\uc5b4",
modEye:"\uD83E\uDD16 \ud638\ud658",modH:"9\uac1c AI \uc571\uacfc \ud638\ud658",
prEye:"\uD83D\uDCB0 \uac00\uaca9",prH:"\ubb34\ub8cc\ub85c \uc2dc\uc791.",
prTier1:"\ubb34\ub8cc",prName1:"\uccb4\ud5d8\ud310",prCTA1:"\ubb34\ub8cc \ub2e4\uc6b4\ub85c\ub4dc",
prTier2:"Pro \uc6d4\uac04",prName2:"Pro",prCTA2:"\ubb34\ub8cc \ub2e4\uc6b4\ub85c\ub4dc",
prTier3:"Pro \uc5f0\uac04",prName3:"Pro \uc5f0\uac04",prCTA3:"\ubb34\ub8cc \ub2e4\uc6b4\ub85c\ub4dc",
fqEye:"\u2753 FAQ",fqH:"\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38",
tplEye:"\uD83D\uDCDA \ud15c\ud50c\ub9bf",tplH:"1,000+ \ud15c\ud50c\ub9bf. \ubaa8\ub4e0 \uce74\ud14c\uace0\ub9ac.",
chatT:"Poly-Glot AI \uc5b4\uc2dc\uc2a4\ud134\ud2b8",chatSub:"\uc81c\ud488\uc5d0 \ub300\ud574 \ubb3c\uc5b4\ubcf4\uc138\uc694",chatPH:"\uc9c8\ubb38\ud558\uc138\uc694\u2026",
chatWel:"\uc548\ub155\ud558\uc138\uc694! \uD83E\uDD9C Poly-Glot AI \uc5b4\uc2dc\uc2a4\ud134\ud2b8\uc785\ub2c8\ub2e4. \uae30\ub2a5, \uac00\uaca9, AI, \ud15c\ud50c\ub9bf\uc5d0 \ub300\ud574 \ubb3c\uc5b4\ubcf4\uc138\uc694!",
cs1:"Poly-Glot\uc774\ub780?",cs2:"\uac00\uaca9\uc740?",cs3:"\uc5b4\ub5a4 AI?",cs4:"\ud15c\ud50c\ub9bf?",cs5:"\uac1c\uc778\uc815\ubcf4?",cs6:"\uae30\uae30?",cs7:"\uc5b4\ub5bb\uac8c?",cs8:"\ubb34\ub8cc \uccb4\ud5d8",cs9:"\ube44\uad50 \ubaa8\ub4dc",cs10:"MCP \uc124\uc815",cs11:"\uc5b8\uc5b4?",cs12:"\ub2e4\uc6b4\ub85c\ub4dc"
};

// ===== CHINESE SIMPLIFIED =====
T.ZH={
navSS:"\u622a\u56fe",navFeat:"\u529f\u80fd",navPrice1:"\u4ef7\u683c",navDemo:"\u6f14\u793a",navPrice2:"\u4ef7\u683c",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C \u8fde\u63a5",navCTA:"\u7acb\u5373\u4f7f\u7528",
heroBadge:"\u5df2\u5728 Mac\u3001iPhone\u3001iPad \u4e0a\u63d0\u4f9b",heroH1a:"\u6240\u6709\u8bed\u8a00\u3002\u4e00\u4e2a\u63d0\u793a\u8bcd\u3002",heroH1b:"\u6240\u6709AI \u2014 \u6bd4\u8f83\u7ed3\u679c\u3002",
heroSub:"\u544a\u8bc9 Poly-Glot \u4f60\u9700\u8981\u4ec0\u4e48\u3002\u7528\u4f60\u7684\u8bed\u8a00\u8f93\u5165\u6216\u8bf4\u8bdd\u3002\u9009\u62e9AI\uff0c\u6bd4\u8f83\u7b54\u6848\u3002\u652f\u631037\u79cd\u8bed\u8a00\uff0c1,000+\u6a21\u677f\u3002",
heroMac:"\uF8FF Mac \u2014 \u4e0b\u8f7d",heroIOS:"\uD83D\uDCF1 iPhone & iPad \u2014 \u4e0b\u8f7d",
trustA:"100%\u672c\u5730\u8fd0\u884c",trustB:"\u4e0d\u6536\u96c6\u6570\u636e",trustC:"3\u5929\u514d\u8d39\u8bd5\u7528",
featEye:"\u26A1 \u529f\u80fd",featH:"\u5199\u51fa\u66f4\u597d\u63d0\u793a\u8bcd\u6240\u9700\u7684\u4e00\u5207",
f1:"1,000+\u6a21\u677f",f2:"\u8bed\u97f3\u8f93\u5165",f3:"\u4e00\u952e\u590d\u5236",f4:"100%\u79c1\u5bc6",f5:"37\u79cd\u8bed\u8a00",
modEye:"\uD83E\uDD16 \u517c\u5bb9",modH:"\u652f\u63019\u4e2aAI\u5e94\u7528",
prEye:"\uD83D\uDCB0 \u4ef7\u683c",prH:"\u514d\u8d39\u5f00\u59cb\u3002",
prTier1:"\u514d\u8d39",prName1:"\u8bd5\u7528",prCTA1:"\u514d\u8d39\u4e0b\u8f7d",
prTier2:"Pro \u6708\u4ed8",prName2:"Pro",prCTA2:"\u514d\u8d39\u4e0b\u8f7d",
prTier3:"Pro \u5e74\u4ed8",prName3:"Pro \u5e74\u4ed8",prCTA3:"\u514d\u8d39\u4e0b\u8f7d",
fqEye:"\u2753 FAQ",fqH:"\u5e38\u89c1\u95ee\u9898",
tplEye:"\uD83D\uDCDA \u6a21\u677f",tplH:"1,000+\u6a21\u677f\u3002\u6240\u6709\u7c7b\u522b\u3002",
chatT:"Poly-Glot AI\u52a9\u624b",chatSub:"\u5173\u4e8e\u4ea7\u54c1\u7684\u4efb\u4f55\u95ee\u9898",chatPH:"\u8f93\u5165\u95ee\u9898\u2026",
chatWel:"\u4f60\u597d\uff01\uD83E\uDD9C Poly-Glot AI\u52a9\u624b\u3002\u5173\u4e8e\u529f\u80fd\u3001\u4ef7\u683c\u3001AI\u3001\u8bed\u8a00\u968f\u65f6\u63d0\u95ee\uff01",
cs1:"\u4ec0\u4e48\u662fPoly-Glot?",cs2:"\u591a\u5c11\u94b1?",cs3:"\u54ea\u4e9bAI?",cs4:"\u6a21\u677f?",cs5:"\u9690\u79c1?",cs6:"\u8bbe\u5907?",cs7:"\u5982\u4f55\u4f7f\u7528?",cs8:"\u514d\u8d39\u8bd5\u7528",cs9:"\u6bd4\u8f83\u6a21\u5f0f",cs10:"MCP\u8bbe\u7f6e",cs11:"\u8bed\u8a00?",cs12:"\u4e0b\u8f7d"
};

// ===== CHINESE TRADITIONAL =====
T["ZH-TW"]={
navSS:"\u622a\u5716",navFeat:"\u529f\u80fd",navPrice1:"\u50f9\u683c",navDemo:"\u6f14\u793a",navPrice2:"\u50f9\u683c",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C \u9023\u63a5",navCTA:"\u7acb\u5373\u4f7f\u7528",
heroBadge:"\u5df2\u5728 Mac\u3001iPhone\u3001iPad \u4e0a\u63d0\u4f9b",heroH1a:"\u6240\u6709\u8a9e\u8a00\u3002\u4e00\u500b\u63d0\u793a\u8a5e\u3002",heroH1b:"\u6240\u6709AI \u2014 \u6bd4\u8f03\u7d50\u679c\u3002",
heroSub:"\u544a\u8a34 Poly-Glot \u4f60\u9700\u8981\u4ec0\u9ebc\u3002\u7528\u4f60\u7684\u8a9e\u8a00\u8f38\u5165\u6216\u8aaa\u8a71\u3002\u9078\u64c7AI\uff0c\u6bd4\u8f03\u7b54\u6848\u300237\u7a2e\u8a9e\u8a00\uff0c1,000+\u6a23\u677f\u3002",
trustA:"100%\u672c\u6a5f\u904b\u884c",trustB:"\u4e0d\u6536\u96c6\u8cc7\u6599",trustC:"3\u5929\u514d\u8cbb\u8a66\u7528",
chatT:"Poly-Glot AI\u52a9\u624b",chatPH:"\u8f38\u5165\u554f\u984c\u2026",
chatWel:"\u4f60\u597d\uff01\uD83E\uDD9C Poly-Glot AI\u52a9\u624b\u3002\u95dc\u65bc\u529f\u80fd\u3001\u50f9\u683c\u3001AI\u3001\u8a9e\u8a00\u96a8\u6642\u63d0\u554f\uff01"
};

// ===== ITALIAN =====
T.IT={
navSS:"Screenshot",navFeat:"Funzioni",navPrice1:"Prezzi",navDemo:"Demo",navPrice2:"Prezzi",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C Connetti",navCTA:"Disponibile",
heroBadge:"Disponibile su Mac, iPhone e iPad",heroH1a:"Tutte le lingue. Un prompt.",heroH1b:"Tutte le IA \u2014 Confronta i risultati.",
heroSub:"Di' a Poly-Glot cosa ti serve. Scrivi o parla nella tua lingua. Scegli la tua IA, confronta, scegli la migliore. 1.000+ modelli in 37 lingue.",
trustA:"100% sul dispositivo",trustB:"Nessuna raccolta dati",trustC:"Prova gratuita 3 giorni",
featEye:"\u26A1 Funzioni",featH:"Tutto per prompt migliori",
f1:"1.000+ modelli",f2:"Input vocale",f3:"Copia con un tocco",f4:"100% privato",f5:"37 lingue",
prEye:"\uD83D\uDCB0 Prezzi",prH:"Inizia gratis.",
prTier1:"Gratuito",prName1:"Prova",prCTA1:"Scarica gratis",prTier2:"Pro Mensile",prName2:"Pro",prCTA2:"Scarica gratis",prTier3:"Pro Annuale",prName3:"Pro Annuale",prCTA3:"Scarica gratis",
chatT:"Assistente Poly-Glot",chatSub:"Chiedi del prodotto",chatPH:"Fai una domanda\u2026",
chatWel:"Ciao! \uD83E\uDD9C Assistente Poly-Glot AI. Chiedimi di funzioni, prezzi, IA o lingue!"
};

// ===== PORTUGUESE =====
T.PT={
navSS:"Capturas",navFeat:"Recursos",navPrice1:"Pre\u00e7os",navDemo:"Demo",navPrice2:"Pre\u00e7os",navFAQ:"FAQ",navConnect:"\uD83D\uDD0C Conectar",navCTA:"Dispon\u00edvel",
heroBadge:"Dispon\u00edvel no Mac, iPhone e iPad",heroH1a:"Todos os idiomas. Um prompt.",heroH1b:"Todas as IAs \u2014 Compare os resultados.",
heroSub:"Diga ao Poly-Glot o que voc\u00ea precisa. Digite ou fale no seu idioma. Escolha sua IA, compare, escolha a melhor. 1.000+ modelos em 37 idiomas.",
trustA:"100% no dispositivo",trustB:"Sem coleta de dados",trustC:"Teste gr\u00e1tis 3 dias",
featEye:"\u26A1 Recursos",featH:"Tudo para prompts melhores",
f1:"1.000+ modelos",f2:"Entrada de voz",f3:"Copiar com um toque",f4:"100% privado",f5:"37 idiomas",
prEye:"\uD83D\uDCB0 Pre\u00e7os",prH:"Comece gr\u00e1tis.",
prTier1:"Gr\u00e1tis",prName1:"Teste",prCTA1:"Baixar gr\u00e1tis",prTier2:"Pro Mensal",prName2:"Pro",prCTA2:"Baixar gr\u00e1tis",prTier3:"Pro Anual",prName3:"Pro Anual",prCTA3:"Baixar gr\u00e1tis",
chatT:"Assistente Poly-Glot",chatSub:"Pergunte sobre o produto",chatPH:"Fa\u00e7a uma pergunta\u2026",
chatWel:"Ol\u00e1! \uD83E\uDD9C Assistente Poly-Glot AI. Pergunte sobre recursos, pre\u00e7os, IAs ou idiomas!"
};

// ===== DUTCH =====
T.NL={heroBadge:"Beschikbaar op Mac, iPhone en iPad",heroH1a:"Alle talen. E\u00e9n prompt.",heroH1b:"Alle AI's \u2014 Vergelijk.",trustA:"100% op het apparaat",trustB:"Geen data verzameld",trustC:"3 dagen gratis",chatT:"Poly-Glot AI Assistent",chatPH:"Stel een vraag\u2026",chatWel:"Hallo! \uD83E\uDD9C Poly-Glot AI Assistent. Vraag over functies, prijzen of talen!"};

// ===== RUSSIAN =====
T.RU={heroBadge:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u043d\u0430 Mac, iPhone, iPad",heroH1a:"\u0412\u0441\u0435 \u044f\u0437\u044b\u043a\u0438. \u041e\u0434\u0438\u043d \u043f\u0440\u043e\u043c\u043f\u0442.",heroH1b:"\u0412\u0441\u0435 \u0418\u0418 \u2014 \u0421\u0440\u0430\u0432\u043d\u0438.",trustA:"100% \u043d\u0430 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0435",trustB:"\u0411\u0435\u0437 \u0441\u0431\u043e\u0440\u0430 \u0434\u0430\u043d\u043d\u044b\u0445",trustC:"3 \u0434\u043d\u044f \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e",chatT:"\u041f\u043e\u043c\u043e\u0449\u043d\u0438\u043a Poly-Glot",chatPH:"\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u2026",chatWel:"\u041f\u0440\u0438\u0432\u0435\u0442! \uD83E\uDD9C \u041f\u043e\u043c\u043e\u0449\u043d\u0438\u043a Poly-Glot AI. \u0421\u043f\u0440\u043e\u0441\u0438\u0442\u0435 \u043e \u0444\u0443\u043d\u043a\u0446\u0438\u044f\u0445, \u0446\u0435\u043d\u0430\u0445, \u0418\u0418 \u0438\u043b\u0438 \u044f\u0437\u044b\u043a\u0430\u0445!"};

// ===== ARABIC =====
T.AR={heroBadge:"\u0645\u062a\u0648\u0641\u0631 \u0639\u0644\u0649 Mac \u0648 iPhone \u0648 iPad",heroH1a:"\u0643\u0644 \u0627\u0644\u0644\u063a\u0627\u062a. \u0623\u0645\u0631 \u0648\u0627\u062d\u062f.",heroH1b:"\u0643\u0644 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u2014 \u0642\u0627\u0631\u0646.",trustA:"100% \u0639\u0644\u0649 \u0627\u0644\u062c\u0647\u0627\u0632",trustB:"\u0628\u062f\u0648\u0646 \u062c\u0645\u0639 \u0628\u064a\u0627\u0646\u0627\u062a",trustC:"3 \u0623\u064a\u0627\u0645 \u0645\u062c\u0627\u0646\u064b\u0627",chatT:"\u0645\u0633\u0627\u0639\u062f Poly-Glot",chatPH:"\u0627\u0637\u0631\u062d \u0633\u0624\u0627\u0644\u0627\u064b\u2026",chatWel:"\u0645\u0631\u062d\u0628\u0627\u064b! \uD83E\uDD9C \u0645\u0633\u0627\u0639\u062f Poly-Glot. \u0627\u0633\u0623\u0644 \u0639\u0646 \u0627\u0644\u0645\u064a\u0632\u0627\u062a \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631!"};

// ===== HINDI =====
T.HI={heroBadge:"Mac, iPhone, iPad \u092a\u0930 \u0909\u092a\u0932\u092c\u094d\u0927",heroH1a:"\u0938\u092d\u0940 \u092d\u093e\u0937\u093e\u090f\u0902\u0964 \u090f\u0915 \u092a\u094d\u0930\u0949\u092e\u094d\u092a\u094d\u091f\u0964",heroH1b:"\u0938\u092d\u0940 AI \u2014 \u092a\u0930\u093f\u0923\u093e\u092e \u0924\u0941\u0932\u0928\u093e\u0964",trustA:"100% \u0921\u093f\u0935\u093e\u0907\u0938 \u092a\u0930",trustB:"\u0915\u094b\u0908 \u0921\u0947\u091f\u093e \u0938\u0902\u0917\u094d\u0930\u0939 \u0928\u0939\u0940\u0902",trustC:"3 \u0926\u093f\u0928 \u092e\u0941\u092b\u094d\u0924",chatT:"Poly-Glot AI \u0938\u0939\u093e\u092f\u0915",chatPH:"\u092a\u094d\u0930\u0936\u094d\u0928 \u092a\u0942\u091b\u0947\u0902\u2026",chatWel:"\u0928\u092e\u0938\u094d\u0924\u0947! \uD83E\uDD9C Poly-Glot AI \u0938\u0939\u093e\u092f\u0915\u0964 \u0935\u093f\u0936\u0947\u0937\u0924\u093e\u0913\u0902, \u092e\u0942\u0932\u094d\u092f, AI, \u092d\u093e\u0937\u093e\u0913\u0902 \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u092a\u0942\u091b\u0947\u0902!"};

// ===== TURKISH =====
T.TR={heroBadge:"Mac, iPhone ve iPad'de mevcut",heroH1a:"T\u00fcm diller. Bir prompt.",heroH1b:"T\u00fcm AI \u2014 Kar\u015f\u0131la\u015ft\u0131r.",trustA:"100% cihazda",trustB:"Veri toplama yok",trustC:"3 g\u00fcn \u00fccretsiz",chatT:"Poly-Glot AI Asistan",chatPH:"Soru sorun\u2026",chatWel:"Merhaba! \uD83E\uDD9C Poly-Glot AI Asistan. \u00d6zellikler, fiyatlar, AI veya diller hakk\u0131nda sorun!"};

// ===== POLISH =====
T.PL={heroBadge:"Dost\u0119pne na Mac, iPhone i iPad",heroH1a:"Wszystkie j\u0119zyki. Jeden prompt.",heroH1b:"Wszystkie AI \u2014 Por\u00f3wnaj.",trustA:"100% na urz\u0105dzeniu",trustB:"Bez zbierania danych",trustC:"3 dni za darmo",chatT:"Asystent Poly-Glot AI",chatPH:"Zadaj pytanie\u2026",chatWel:"Cze\u015b\u0107! \uD83E\uDD9C Asystent Poly-Glot AI. Pytaj o funkcje, ceny, AI lub j\u0119zyki!"};

// ===== BENGALI =====
T.BN={heroBadge:"Mac, iPhone, iPad-\u098f \u0989\u09aa\u09b2\u09ac\u09cd\u09a7",heroH1a:"\u09b8\u09ac \u09ad\u09be\u09b7\u09be\u0964 \u098f\u0995\u099f\u09bf \u09aa\u09cd\u09b0\u09ae\u09cd\u09aa\u099f\u0964",heroH1b:"\u09b8\u09ac AI \u2014 \u09ab\u09b2\u09be\u09ab\u09b2 \u09a4\u09c1\u09b2\u09a8\u09be \u0995\u09b0\u09c1\u09a8\u0964",trustA:"100% \u09a1\u09bf\u09ad\u09be\u0987\u09b8\u09c7",trustB:"\u09a1\u09c7\u099f\u09be \u09b8\u0982\u0997\u09cd\u09b0\u09b9 \u09a8\u09c7\u0987",trustC:"3 \u09a6\u09bf\u09a8 \u09ab\u09cd\u09b0\u09bf",chatT:"Poly-Glot AI \u09b8\u09b9\u09be\u09af\u09bc\u0995",chatPH:"\u09aa\u09cd\u09b0\u09b6\u09cd\u09a8 \u0995\u09b0\u09c1\u09a8\u2026",chatWel:"\u09b9\u09cd\u09af\u09be\u09b2\u09cb! \uD83E\uDD9C Poly-Glot AI \u09b8\u09b9\u09be\u09af\u09bc\u0995\u0964"};

// ===== AFRIKAANS =====
T.AF={heroBadge:"Beskikbaar op Mac, iPhone en iPad",heroH1a:"Alle tale. Een prompt.",heroH1b:"Alle KI \u2014 Vergelyk resultate.",trustA:"100% op toestel",trustB:"Geen data-insameling",trustC:"3 dae gratis",chatT:"Poly-Glot KI-assistent",chatPH:"Vra 'n vraag\u2026",chatWel:"Hallo! \uD83E\uDD9C Poly-Glot KI-assistent. Vra oor funksies, pryse, KI of tale!"};

// ===== SWAHILI =====
T.SW={heroBadge:"Inapatikana kwenye Mac, iPhone na iPad",heroH1a:"Lugha zote. Prompt moja.",heroH1b:"AI zote \u2014 Linganisha matokeo.",trustA:"100% kwenye kifaa",trustB:"Hakuna ukusanyaji data",trustC:"Siku 3 bure",chatT:"Msaidizi wa Poly-Glot AI",chatPH:"Uliza swali\u2026",chatWel:"Habari! \uD83E\uDD9C Msaidizi wa Poly-Glot AI. Uliza kuhusu vipengele, bei, AI au lugha!"};

// ===== HAUSA =====
T.HA={heroBadge:"Akwai a Mac, iPhone da iPad",heroH1a:"Duk harsuna. Prompt \u0257aya.",heroH1b:"Duk AI \u2014 Kwatanta sakamako.",trustA:"100% a na'ura",trustB:"Babu tattara bayanai",trustC:"Kwanaki 3 kyauta",chatT:"Mai taimako Poly-Glot AI",chatPH:"Yi tambaya\u2026",chatWel:"Sannu! \uD83E\uDD9C Mai taimako na Poly-Glot AI."};

// ===== AMHARIC =====
T.AM={heroBadge:"Mac\u1363 iPhone\u1363 iPad \u120B\u12ED \u12ED\u1308\u129B\u120D",heroH1a:"\u1201\u1209\u121D \u1240\u1295\u1306\u127D\u1362 \u12A0\u1295\u12F5 prompt.",heroH1b:"\u1201\u1209\u121D AI \u2014 \u12CD\u1324\u1276\u127D\u1295 \u12A0\u1295\u133B\u1355\u122D.",trustA:"100% \u1260\u1218\u1233\u122A\u12EB \u120B\u12ED",trustB:"\u12E8\u1218\u1228\u1303 \u1235\u1265\u1235\u1265 \u12E8\u1208\u121D",trustC:"3 \u1240\u1295 \u1290\u133D",chatT:"Poly-Glot AI \u1228\u12F3\u1275",chatPH:"\u1325\u12EB\u1244 \u12ED\u1325\u12E8\u1241\u2026",chatWel:"\u1230\u120B\u121D! \uD83E\uDD9C Poly-Glot AI \u1228\u12F3\u1275\u1362"};

// ===== GETTER =====
function gt(k,lang){return(T[lang]&&T[lang][k])||T.EN[k]||'';}

// ===== GLOBAL STATE =====
var curLang='EN';

// ===== BUILD PICKER =====
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

// ===== SET LANGUAGE =====
function setLang(code,flag){
curLang=code;
var gf=document.getElementById('pgGlobalFlag'),gc=document.getElementById('pgGlobalCode');
if(gf)gf.textContent=flag;if(gc)gc.textContent=code;
document.querySelectorAll('.pgGlob-row').forEach(function(r){r.classList.toggle('active',r.getAttribute('data-lang')===code);});
var dd=document.getElementById('pgGlobalLangDD');if(dd)dd.classList.remove('open');
var cf=document.getElementById('pgChat-lang-flag');if(cf)cf.textContent=flag;
applyAll(code);
updateChat(code);
try{localStorage.setItem('pgLang',code);}catch(e){}
}

// ===== APPLY TO ALL SITE ELEMENTS =====
function applyAll(lang){
document.querySelectorAll('[data-i18n]').forEach(function(el){
var k=el.getAttribute('data-i18n'),v=gt(k,lang);
if(v){
var toggle=el.querySelector('.toggle');
var ck=el.querySelector('.ck,.check');
if(el.tagName==='A'&&el.getAttribute('href')){
el.textContent=v;
}else{
el.textContent=v;
}
if(toggle)el.appendChild(toggle);
if(ck){el.insertBefore(ck,el.firstChild);el.insertBefore(document.createTextNode(' '),ck.nextSibling);}
}
});
}

// ===== UPDATE CHAT WIDGET =====
function updateChat(lang){
var t1=document.querySelector('#pgChat-header-left div div:first-child');
var t2=document.querySelector('#pgChat-header-left div div:last-child');
if(t1)t1.textContent=gt('chatT',lang);
if(t2)t2.textContent=gt('chatSub',lang);
var inp=document.getElementById('pgChat-input');
if(inp)inp.placeholder=gt('chatPH',lang);
window._pgChatLang=lang;
}

// ===== TAG ALL ELEMENTS =====
function tagAll(){
// Nav links
var navA=document.querySelectorAll('nav.nav ul.nav-links li a');
var nk=['navSS','navFeat','navPrice1','navDemo','navPrice2','navFAQ','navConnect'];
navA.forEach(function(a,i){if(nk[i])a.setAttribute('data-i18n',nk[i]);});
// Nav CTA
var navCTA=document.querySelector('nav.nav .nav-cta a');
if(navCTA)navCTA.setAttribute('data-i18n','navCTA');
// Hero
tag('.hero-badge','heroBadge');
// Hero H1 — tag the h1 itself for the first line, and the gradient-text span for the second
var heroH1=document.querySelector('.hero h1');
if(heroH1){
var gt_span=heroH1.querySelector('.gradient-text');
// Wrap the text node (first line) in a span if not already
var firstText=heroH1.childNodes[0];
if(firstText&&firstText.nodeType===3){
var s=document.createElement('span');s.setAttribute('data-i18n','heroH1a');
s.textContent=firstText.textContent.trim();
heroH1.replaceChild(s,firstText);
// Remove the <br> if present
var br=heroH1.querySelector('br');
if(br)heroH1.removeChild(br);
// Re-add br before gradient
heroH1.insertBefore(document.createElement('br'),gt_span);
}else if(firstText&&firstText.getAttribute){
firstText.setAttribute('data-i18n','heroH1a');
}
if(gt_span)gt_span.setAttribute('data-i18n','heroH1b');
}
tag('.hero-sub','heroSub');
// Hero buttons
var heroActions=document.querySelectorAll('.hero-actions .btn-coming-soon');
if(heroActions[0])heroActions[0].setAttribute('data-i18n','heroMac');
if(heroActions[1])heroActions[1].setAttribute('data-i18n','heroIOS');
// Trust items
var ti=document.querySelectorAll('.trust-item');
if(ti[0])ti[0].setAttribute('data-i18n','trustA');
if(ti[1])ti[1].setAttribute('data-i18n','trustB');
if(ti[2])ti[2].setAttribute('data-i18n','trustC');
// Platform section
tag('.platforms-label','platLabel');
var platformPills=document.querySelectorAll('.platform-pill');
platformPills.forEach(function(p){
var avail=p.querySelector('span[style*="color:#10b981"]');
if(avail)avail.setAttribute('data-i18n','platAvail');
});

// ===== SECTIONS — tag by order of appearance =====
var sections=document.querySelectorAll('.section');
sections.forEach(function(sec){
var id=sec.id||'';
var eye=sec.querySelector('.section-eyebrow');
var h2=sec.querySelector('.section-title');
var sub=sec.querySelector('.section-sub');

if(id==='screenshots'){
if(eye)eye.setAttribute('data-i18n','ssEye');
if(h2)h2.setAttribute('data-i18n','ssH');
if(sub)sub.setAttribute('data-i18n','ssSub');
}
// Native apps section (has showcase-grid)
else if(sec.querySelector('.showcase-grid')){
if(eye)eye.setAttribute('data-i18n','naEye');
if(h2)h2.setAttribute('data-i18n','naH');
if(sub)sub.setAttribute('data-i18n','naSub');
// Showcase cards
var cards=sec.querySelectorAll('.showcase-card');
if(cards[0]){
tagIn(cards[0],'.platform-tag','sc1Tag');
tagIn(cards[0],'h3','sc1H');
tagIn(cards[0],'h3 ~ p','sc1P');
}
if(cards[1]){
tagIn(cards[1],'.platform-tag','sc2Tag');
tagIn(cards[1],'h3','sc2H');
tagIn(cards[1],'h3 ~ p','sc2P');
}
}
else if(id==='input'){
if(eye)eye.setAttribute('data-i18n','imEye');
if(h2)h2.setAttribute('data-i18n','imH');
if(sub)sub.setAttribute('data-i18n','imSub');
}
else if(id==='features'){
if(eye)eye.setAttribute('data-i18n','featEye');
if(h2)h2.setAttribute('data-i18n','featH');
if(sub)sub.setAttribute('data-i18n','featSub');
var fc=sec.querySelectorAll('.feature-card');
var fkeys=[['f1','f1p'],['f2','f2p'],['f3','f3p'],['f4','f4p'],['f5','f5p']];
fc.forEach(function(c,i){
if(fkeys[i]){tagIn(c,'h4',fkeys[i][0]);tagIn(c,'p',fkeys[i][1]);}
});
}
else if(id==='models'){
if(eye)eye.setAttribute('data-i18n','modEye');
if(h2)h2.setAttribute('data-i18n','modH');
if(sub)sub.setAttribute('data-i18n','modSub');
}
else if(id==='demo'){
if(eye)eye.setAttribute('data-i18n','demoEye');
if(h2)h2.setAttribute('data-i18n','demoH');
if(sub)sub.setAttribute('data-i18n','demoSub');
}
else if(id==='why'){
if(eye)eye.setAttribute('data-i18n','probEye');
if(h2)h2.setAttribute('data-i18n','probH');
// The paragraph right after h2
var probDesc=h2?h2.nextElementSibling:null;
if(probDesc&&probDesc.tagName==='P')probDesc.setAttribute('data-i18n','probSub');
// Bad/Good cards
var probCards=sec.querySelectorAll('[style*="border-radius:12px"]');
probCards.forEach(function(pc){
var header=pc.querySelector('div[style*="text-transform:uppercase"]');
var body=pc.querySelector('p');
if(header&&header.textContent.indexOf('\u274C')>=0){if(header)header.setAttribute('data-i18n','probBadH');if(body)body.setAttribute('data-i18n','probBadP');}
else if(header&&header.textContent.indexOf('\u2714')>=0){if(header)header.setAttribute('data-i18n','probGoodH');if(body)body.setAttribute('data-i18n','probGoodP');}
});
}
else if(id==='save'){
if(eye)eye.setAttribute('data-i18n','saveEye');
if(h2)h2.setAttribute('data-i18n','saveH');
var saveDesc=h2?h2.nextElementSibling:null;
if(saveDesc&&saveDesc.tagName==='P')saveDesc.setAttribute('data-i18n','saveSub');
}
else if(id==='templates'){
if(eye)eye.setAttribute('data-i18n','tplEye');
if(h2)h2.setAttribute('data-i18n','tplH');
if(sub)sub.setAttribute('data-i18n','tplSub');
}
else if(id==='pricing'){
if(eye)eye.setAttribute('data-i18n','prEye');
if(h2)h2.setAttribute('data-i18n','prH');
if(sub)sub.setAttribute('data-i18n','prSub');
var pc=sec.querySelectorAll('.pricing-card');
if(pc[0]){
tagIn(pc[0],'.pricing-tier','prTier1');tagIn(pc[0],'.pricing-name','prName1');
tagIn(pc[0],'.pricing-desc','prDesc1');tagIn(pc[0],'.pricing-cta','prCTA1');
var li0=pc[0].querySelectorAll('.pricing-features li');
if(li0[0])li0[0].setAttribute('data-i18n','pf1a');
if(li0[1])li0[1].setAttribute('data-i18n','pf1b');
if(li0[2])li0[2].setAttribute('data-i18n','pf1c');
if(li0[3])li0[3].setAttribute('data-i18n','pf1d');
}
if(pc[1]){
tagIn(pc[1],'.pricing-tier','prTier2');tagIn(pc[1],'.pricing-name','prName2');
tagIn(pc[1],'.pricing-desc','prDesc2');tagIn(pc[1],'.pricing-cta','prCTA2');
var li1=pc[1].querySelectorAll('.pricing-features li');
if(li1[0])li1[0].setAttribute('data-i18n','pf2a');
if(li1[1])li1[1].setAttribute('data-i18n','pf2b');
if(li1[2])li1[2].setAttribute('data-i18n','pf2c');
if(li1[3])li1[3].setAttribute('data-i18n','pf2d');
}
if(pc[2]){
tagIn(pc[2],'.pricing-tier','prTier3');tagIn(pc[2],'.pricing-name','prName3');
tagIn(pc[2],'.pricing-desc','prDesc3');tagIn(pc[2],'.pricing-cta','prCTA3');
var li2=pc[2].querySelectorAll('.pricing-features li');
if(li2[0])li2[0].setAttribute('data-i18n','pf3a');
if(li2[1])li2[1].setAttribute('data-i18n','pf3b');
if(li2[2])li2[2].setAttribute('data-i18n','pf3c');
if(li2[3])li2[3].setAttribute('data-i18n','pf3d');
}
}
else if(id==='faq'){
if(eye)eye.setAttribute('data-i18n','fqEye');
if(h2)h2.setAttribute('data-i18n','fqH');
if(sub)sub.setAttribute('data-i18n','fqSub');
var fqi=sec.querySelectorAll('.faq-item');
fqi.forEach(function(item,i){
var n=i+1;
var q=item.querySelector('.faq-q');
var a=item.querySelector('.faq-a p');
if(q&&T.EN['fq'+n+'q'])q.setAttribute('data-i18n','fq'+n+'q');
if(a&&T.EN['fq'+n+'a'])a.setAttribute('data-i18n','fq'+n+'a');
});
}
else if(id==='connect'){
if(eye)eye.setAttribute('data-i18n','mcpEye');
if(h2)h2.setAttribute('data-i18n','mcpH');
if(sub)sub.setAttribute('data-i18n','mcpSub');
}
});

// Footer
tag('.footer-tagline','ftTag');
var fh=document.querySelectorAll('.footer h5');
if(fh[0])fh[0].setAttribute('data-i18n','ftProd');
if(fh[1])fh[1].setAttribute('data-i18n','ftPlat');
if(fh[2])fh[2].setAttribute('data-i18n','ftComp');
// Footer product links
var footerSections=document.querySelectorAll('.footer-grid > div');
if(footerSections[1]){
var prodLinks=footerSections[1].querySelectorAll('a');
if(prodLinks[0])prodLinks[0].setAttribute('data-i18n','ftFeat');
if(prodLinks[1])prodLinks[1].setAttribute('data-i18n','ftTpl');
if(prodLinks[2])prodLinks[2].setAttribute('data-i18n','ftPrice');
if(prodLinks[3])prodLinks[3].setAttribute('data-i18n','ftFAQ');
}
if(footerSections[3]){
var compLinks=footerSections[3].querySelectorAll('a');
if(compLinks[0])compLinks[0].setAttribute('data-i18n','ftPriv');
if(compLinks[1])compLinks[1].setAttribute('data-i18n','ftTerms');
if(compLinks[2])compLinks[2].setAttribute('data-i18n','ftSupp');
if(compLinks[3])compLinks[3].setAttribute('data-i18n','ftContact');
}
tag('.footer-copy','ftCopy');
var fl=document.querySelectorAll('.footer-legal a');
if(fl[0])fl[0].setAttribute('data-i18n','ftPrivL');
if(fl[1])fl[1].setAttribute('data-i18n','ftTermsL');
if(fl[2])fl[2].setAttribute('data-i18n','ftSuppL');
}

function tag(sel,key){var el=document.querySelector(sel);if(el)el.setAttribute('data-i18n',key);}
function tagIn(p,sel,key){var el=p.querySelector(sel);if(el)el.setAttribute('data-i18n',key);}

// ===== CSS =====
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
+'.pgGlob-row .gc{font-size:0.65rem;font-weight:700;color:#7dd3fc;font-family:"Fira Code",monospace;width:28px}'
+'.pgGlob-row .gn{flex:1;font-size:0.78rem}'
+'@media(max-width:480px){#pgGlobalLangPicker{bottom:16px;left:8px}}';
document.head.appendChild(css);

// ===== INIT =====
function init(){
buildPicker();tagAll();
var saved;try{saved=localStorage.getItem('pgLang');}catch(e){}
if(saved){var L=LANGS.find(function(l){return l.code===saved;});if(L)setLang(L.code,L.flag);}
}

// Expose
window._pgI18n={gt:gt,curLang:function(){return curLang;},LANGS:LANGS,setLang:setLang};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
