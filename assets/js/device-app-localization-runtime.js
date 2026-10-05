/**
 * Site device localization runtime.
 * Adapted from the production iOS/macOS localization-runtime.js used by
 * Poly-Glot AI Workspace. Uses the same reverse-map + MutationObserver
 * strategy so device mockups switch language the same way the apps do.
 */
(function(){
  'use strict';
  if(window.__pgSiteAppLocalizationRuntimeLoaded) return;
  window.__pgSiteAppLocalizationRuntimeLoaded=true;

  var originalText=new WeakMap();
  var originalAttr=new WeakMap();
  var scheduled=false;

  function norm(v){ return String(v||'EN').toUpperCase().replace(/-/g,'_'); }
  function currentCode(){
    try { return norm(window._pgI18n&&window._pgI18n.curLang ? window._pgI18n.curLang() : 'EN'); }
    catch(e){ return 'EN'; }
  }
  function hasUI(){
    return !!(window._pgDeviceUI && typeof window._pgDeviceUI._strings==='function');
  }
  function table(code){
    if(!hasUI()) return {};
    return window._pgDeviceUI._strings(norm(code)) || {};
  }
  function currentTable(){ return table(currentCode()); }

  function allCodes(){
    var list=(window._pgDeviceUI&&window._pgDeviceUI.appLanguages)||[];
    var out=['EN'];
    list.forEach(function(x){
      var c=norm(x&&x.code);
      if(out.indexOf(c)<0) out.push(c);
    });
    return out;
  }

  /* Same idea as the native app runtime: map every known localized value
     back to its semantic key, then render that key in the active language. */
  function buildReverseMap(){
    var rev={}, ambiguous={};
    allCodes().forEach(function(code){
      var t=table(code);
      Object.keys(t).forEach(function(key){
        var v=t[key];
        if(typeof v!=='string'||!v||v.length>=500||v.indexOf('<')!==-1||v.indexOf('\n')!==-1) return;
        if(ambiguous[v]) return;
        if(typeof rev[v]==='undefined') rev[v]=key;
        else if(rev[v]!==key){ delete rev[v]; ambiguous[v]=true; }
      });
    });
    return rev;
  }

  var aliases={
    'Ask Any AI':'ask',
    'Templates':'templates',
    '1,000+ Templates':'templates',
    'How to Use':'how',
    'History':'history',
    'Paste':'paste',
    'Import':'import',
    'Scan':'scan',
    'Talk':'talk',
    'Send':'send',
    'Send to AI':'send',
    'Send to Selected':'compareSend',
    'Clear All':'clearAll',
    'Prompt History':'promptHistory',
    'Your recent prompts & favorites':'recent',
    'All':'all',
    'Clear':'clear',
    'Copy':'copy',
    'Re-edit':'reedit',
    'How it works':'howWorks',
    'AI will respond in:':'outputLabel',
    'Compare Mode':'compare',
    'Choose AI':'compareSelect',
    'Select AIs to compare':'compareSelect',
    'Search templates...':'search',
    'Search templates…':'search',
    'Type, paste, import or talk':'typeLine',
    'App Language':'appLang',
    'Output Language':'outputLang',
    'changes menus & templates':'changesMenus',
    'AI responds in this language':'responds'
  };

  function translated(key,fallback){
    var cur=currentTable(), en=table('EN');
    return (cur&&cur[key])||(en&&en[key])||fallback||'';
  }

  function rememberNode(node){
    if(!originalText.has(node)) originalText.set(node,node.nodeValue||'');
    return originalText.get(node);
  }

  function localizeTextNode(node,rev){
    if(!node||!node.parentElement) return;
    var p=node.parentElement;
    if(/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|CODE|PRE)$/i.test(p.tagName)||p.isContentEditable) return;

    var raw=rememberNode(node);
    var trimmed=raw.trim();
    if(!trimmed) return;

    var lead=(raw.match(/^\s*/)||[''])[0], tail=(raw.match(/\s*$/)||[''])[0];
    var icon='', body=trimmed;
    var m=trimmed.match(/^([^\p{L}\p{N}]*)(.*)$/u);
    if(m){ icon=m[1]; body=m[2]; }

    var key=rev[body]||aliases[body]||rev[trimmed]||aliases[trimmed];

    /* Compound helper lines used by the actual iOS/macOS UI. */
    if(body==='App Language ⬆️ changes menus & templates'){
      node.nodeValue=lead+icon+translated('appLang','App Language')+' ⬆️ '+translated('changesMenus','changes menus & templates')+tail;
      return;
    }
    if(body==='Output Language ⬇️ AI responds in this language'){
      node.nodeValue=lead+icon+translated('outputLang','Output Language')+' ⬇️ '+translated('responds','AI responds in this language')+tail;
      return;
    }
    if(/^Compare Mode\s*:\s*send to multiple AIs$/i.test(body)){
      node.nodeValue=lead+icon+translated('compare','Compare Mode')+': '+translated('compareHelp','send to multiple AIs')+tail;
      return;
    }

    if(key){
      var next=translated(key,body);
      if(next) node.nodeValue=lead+icon+next+tail;
    }
  }

  function attrMemory(el){
    var m=originalAttr.get(el);
    if(!m){m={}; originalAttr.set(el,m);}
    return m;
  }

  function localizeAttributes(el,rev){
    if(!el||!el.getAttribute) return;
    var mem=attrMemory(el);
    ['placeholder','title','aria-label'].forEach(function(attr){
      var now=el.getAttribute(attr);
      if(!now) return;
      if(typeof mem[attr]==='undefined') mem[attr]=now;
      var raw=mem[attr], key=rev[raw]||aliases[raw];
      if(key){
        var next=translated(key,raw);
        if(next) el.setAttribute(attr,next);
      }
    });
  }

  function deviceRoots(){
    return [
      document.querySelector('.hero-phone-mock'),
      document.getElementById('demo'),
      document.getElementById('gallery-iphone'),
      document.getElementById('gallery-ipad'),
      document.getElementById('gallery-mac'),
      document.getElementById('iphone-duo'),
      document.getElementById('pgLightboxClone')
    ].filter(Boolean);
  }

  function localizeRoot(root,rev){
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
    var nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(n){localizeTextNode(n,rev);});
    root.querySelectorAll('*').forEach(function(el){localizeAttributes(el,rev);});
  }

  function localizeSpecialSurfaces(){
    var c=currentCode(), s=currentTable();

    function cleanIconText(el, icon, value){
      if(!el || !value) return;
      el.textContent=(icon?icon+' ':'')+value;
    }
    function setExactText(root, from, to){
      if(!root || !to) return;
      root.querySelectorAll('*').forEach(function(el){
        if(el.children.length===0 && (el.textContent||'').trim()===from) el.textContent=to;
      });
    }

    /* Explicit device-gallery navigation labels. These are interactive UI,
       so they must follow the global language selector rather than remain
       frozen in the original English mockup. */
    var macAsk=document.querySelector('#macTab-askanyai span');
    var macTpl=document.querySelector('#macTab-templates span');
    var macHow=document.querySelector('#macTab-howtouse span');
    var macHist=document.querySelector('#macTab-history span');
    cleanIconText(macAsk,'✏️',s.ask||'Ask Any AI');
    cleanIconText(macTpl,'📋',s.templates||'Templates');
    cleanIconText(macHow,'📖',s.how||'How to Use');
    cleanIconText(macHist,'🕐',s.history||'History');

    /* History screen chrome. User-generated/sample prompt content can remain
       content, but every app control/heading is localized. */
    var mh=document.getElementById('macScreen-history');
    if(mh){
      var heading=mh.querySelector('.mac-history-heading');
      var note=mh.querySelector('.mac-history-note');
      if(heading) heading.textContent=s.promptHistory||s.history||'Prompt History';
      if(note) note.textContent=s.recent||'Your recent prompts & favorites';
      var pills=mh.querySelectorAll('.mac-history-pill');
      if(pills[0]) pills[0].textContent=s.all||'All';
      if(pills[1]) pills[1].textContent=s.clear||'Clear';
      mh.querySelectorAll('.mac-history-btn.copy').forEach(function(el){el.textContent=s.copy||'Copy';});
      mh.querySelectorAll('.mac-history-btn:not(.copy):not(.del)').forEach(function(el){el.textContent=s.reedit||'Re-edit';});
      mh.querySelectorAll('.mac-history-card-title').forEach(function(el){
        if((el.textContent||'').trim()==='Ask Any AI') el.textContent=s.ask||'Ask Any AI';
      });
    }

    /* Caption under the active Mac screen. Keep it short so every language
       stays proportional on mobile. */
    var macLabel=document.getElementById('macTabLabel');
    if(macLabel){
      var active=document.querySelector('#gallery-mac .mac-reference-tab.active');
      var id=active&&active.id||'macTab-askanyai';
      if(id.indexOf('templates')>=0) macLabel.textContent=(s.templates||'Templates');
      else if(id.indexOf('howtouse')>=0) macLabel.textContent=(s.how||'How to Use');
      else if(id.indexOf('history')>=0) macLabel.textContent=(s.history||'History');
      else macLabel.textContent=(s.ask||'Ask Any AI')+' — '+(s.typeLine||'Type, paste, import or talk');
    }

    /* Hint above Mac mockup — works for every supported app language. */
    var hint=document.querySelector('#macTabHint span');
    if(hint){
      hint.textContent='👇 '+(s.ask||'Ask Any AI')+' · '+(s.templates||'Templates')+' · '+(s.how||'How to Use')+' · '+(s.history||'History');
    }

    /* Caption under Mac mockup. */
    document.querySelectorAll('#gallery-mac .gallery-caption,#gallery-mac [class*="caption"],#gallery-mac p').forEach(function(el){
      var txt=(el.textContent||'').trim();
      if(/^Ask Any AI\s*[—-]\s*Type or speak,\s*choose your AI/i.test(txt)){
        var captions={
          EN:'Ask Any AI — Type or speak, choose your AI',
          ES:'Pregunta a cualquier IA — Escribe o habla y elige tu IA',
          FR:'Demandez à n’importe quelle IA — Écrivez ou parlez, puis choisissez votre IA',
          DE:'Frag jede KI — Tippen oder sprechen und KI auswählen',
          IT:'Chiedi a qualsiasi IA — Scrivi o parla e scegli la tua IA',
          PT:'Pergunte a qualquer IA — Digite ou fale e escolha sua IA',
          NL:'Vraag het aan elke AI — Typ of spreek en kies je AI',
          RU:'Спросите любой ИИ — введите или произнесите запрос и выберите ИИ',
          ZH:'问任何 AI — 输入或说出内容，然后选择 AI',
          ZH_TW:'問任何 AI — 輸入或說出內容，然後選擇 AI',
          JA:'どのAIにも聞ける — 入力または話してAIを選択',
          KO:'아무 AI에게 물어봐 — 입력하거나 말한 뒤 AI를 선택하세요',
          AR:'اسأل أي ذكاء اصطناعي — اكتب أو تحدث ثم اختر الذكاء الاصطناعي',
          HI:'किसी भी AI से पूछें — टाइप करें या बोलें और अपना AI चुनें'
        };
        el.textContent=captions[c]||((s.ask||'Ask Any AI')+' — '+(s.typeLine||'Type or speak'));
      }
    });

    var rtl=/^(AR|HE)$/.test(c);
    deviceRoots().forEach(function(root){
      root.setAttribute('lang',c.toLowerCase().replace('_','-'));
      root.setAttribute('dir',rtl?'rtl':'ltr');
    });
  }

  function localizeAllVisible(){
    if(!hasUI()||!document.body) return false;

    /* Let the existing structured renderer update first, then apply the
       same reverse-map safety net used in the native apps. */
    try{
      if(window._pgDeviceUI&&typeof window._pgDeviceUI.apply==='function'){
        window._pgDeviceUI.apply(currentCode());
      }
    }catch(e){}

    var rev=buildReverseMap();
    deviceRoots().forEach(function(root){ localizeRoot(root,rev); });
    localizeSpecialSurfaces();

    document.documentElement.setAttribute('data-device-ui-lang',currentCode());
    return true;
  }

  function schedule(){
    if(scheduled) return;
    scheduled=true;
    setTimeout(function(){
      scheduled=false;
      localizeAllVisible();
    },0);
  }

  function install(){
    if(!hasUI()){ setTimeout(install,100); return; }
    if(!window.__pgSiteAppLocalizationObserver&&document.documentElement){
      window.__pgSiteAppLocalizationObserver=new MutationObserver(schedule);
      window.__pgSiteAppLocalizationObserver.observe(document.documentElement,{
        subtree:true,childList:true,characterData:true,attributes:true,
        attributeFilter:['placeholder','title','aria-label']
      });
    }
    schedule();
  }

  window.addEventListener('pg:languagechange',function(){
    schedule();
    setTimeout(schedule,80);
    setTimeout(schedule,250);
  });

  window.__pgSiteLocalizeAllVisible=localizeAllVisible;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
