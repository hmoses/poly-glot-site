/* Mac preview click-through invitation; matches native device labels in all 38 languages.
 * Shared by the inline gallery and all device-localization renderers so switching
 * languages never restores the previous label-only hint.
 */
(function(){
  'use strict';
  const invitations={"EN":"Click the tabs to view:","ES":"Haz clic en las pestañas para ver:","FR":"Cliquez sur les onglets pour voir :","DE":"Klicke auf die Tabs, um Folgendes anzusehen:","IT":"Fai clic sulle schede per vedere:","PT":"Clique nas abas para ver:","NL":"Klik op de tabbladen om te bekijken:","RU":"Нажмите на вкладки, чтобы посмотреть:","ZH":"点击标签页查看：","ZH_TW":"點擊分頁查看：","JA":"タブをクリックして表示：","KO":"탭을 클릭하여 보기:","AR":"انقر على علامات التبويب لعرض:","HI":"देखने के लिए टैब पर क्लिक करें:","BN":"দেখতে ট্যাবে ক্লিক করুন:","TR":"Görmek için sekmelere tıklayın:","PL":"Kliknij karty, aby zobaczyć:","SV":"Klicka på flikarna för att visa:","NO":"Klikk på fanene for å se:","DA":"Klik på fanerne for at se:","FI":"Näytä napsauttamalla välilehtiä:","EL":"Κάντε κλικ στις καρτέλες για προβολή:","HE":"לחצו על הלשוניות כדי לצפות:","ID":"Klik tab untuk melihat:","MS":"Klik tab untuk melihat:","TH":"คลิกแท็บเพื่อดู:","VI":"Nhấp vào các thẻ để xem:","UK":"Натисніть вкладки, щоб переглянути:","CS":"Kliknutím na karty zobrazíte:","RO":"Faceți clic pe file pentru a vedea:","HU":"Kattints a lapokra a megtekintéshez:","SK":"Kliknite na karty a zobrazte:","HR":"Kliknite kartice za prikaz:","CA":"Feu clic a les pestanyes per veure:","AF":"Klik op die oortjies om te sien:","SW":"Bofya vichupo ili kuona:","HA":"Danna shafuka don gani:","AM":"ለማየት ትሮቹን ጠቅ ያድርጉ:"};
  const isRTL=code=>code==='AR'||code==='HE';
  function currentLang(){
    const c=window._pgI18n&&typeof window._pgI18n.curLang==='function'
      ? window._pgI18n.curLang() : new URLSearchParams(location.search).get('lang');
    const n=String(c||'EN').toUpperCase().replace('-','_');
    return Object.prototype.hasOwnProperty.call(invitations,n)?n:'EN';
  }
  function text(strings,code){
    const l=code&&invitations[code]?code:currentLang();
    const s=strings||{};
    return '👇 '+invitations[l]+' '+
      (s.ask||'Ask Any AI')+' · '+
      (s.templates||'Templates')+' · '+
      (s.how||'How to Use')+' · '+
      (s.history||'History');
  }
  function apply(strings,code){
    const hint=document.querySelector('#macTabHint span');
    if(!hint)return false;
    const lang=code&&invitations[code]?code:currentLang();
    const value=text(strings,lang);
    if(hint.textContent!==value)hint.textContent=value;
    const htmlLang=lang==='ZH_TW'?'zh-Hant':lang.toLowerCase();
    if(hint.getAttribute('lang')!==htmlLang)hint.setAttribute('lang',htmlLang);
    const direction=isRTL(lang)?'rtl':'ltr';
    if(hint.getAttribute('dir')!==direction)hint.setAttribute('dir',direction);
    if(!hint.hasAttribute('data-mac-preview-cta'))hint.setAttribute('data-mac-preview-cta','');
    return true;
  }
  // Other device renderers may refresh after the language selector. Keep the
  // instruction as the single source of truth without re-triggering mutations
  // when the translated text is already correct.
  let observed=null;
  let observer=null;
  function refresh(){
    const l=currentLang();
    const strings=window._pgDeviceUI&&typeof window._pgDeviceUI._strings==='function'
      ? window._pgDeviceUI._strings(l) : {};
    apply(strings,l);
  }
  function install(){
    const hint=document.querySelector('#macTabHint span');
    if(!hint)return;
    if(observed!==hint){
      if(observer)observer.disconnect();
      observer=new MutationObserver(refresh);
      observer.observe(hint,{characterData:true,childList:true,subtree:true});
      observed=hint;
    }
    refresh();
  }
  window._pgMacPreviewTabCTA={text,apply,currentLang,invitations,refresh};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
  window.addEventListener('pg:languagechange',()=>{
    refresh();
    setTimeout(refresh,70);
  });
  window.addEventListener('pageshow',install);
})();
