/* Native localized privacy-policy review date (38 supported site languages).
 * Keep the policy date in UTC and never alter policy/legal text or personal data. */
(function(){
"use strict";
var labels={"EN":"Last updated","ES":"Última actualización","FR":"Dernière mise à jour","DE":"Zuletzt aktualisiert","IT":"Ultimo aggiornamento","PT":"Última atualização","NL":"Laatst bijgewerkt","RU":"Последнее обновление","ZH":"最后更新","ZH_TW":"最後更新","JA":"最終更新日","KO":"최종 업데이트","AR":"آخر تحديث","HI":"अंतिम अद्यतन","BN":"সর্বশেষ হালনাগাদ","TR":"Son güncelleme","PL":"Ostatnia aktualizacja","SV":"Senast uppdaterad","NO":"Sist oppdatert","DA":"Sidst opdateret","FI":"Päivitetty viimeksi","EL":"Τελευταία ενημέρωση","HE":"עדכון אחרון","ID":"Terakhir diperbarui","MS":"Kemas kini terakhir","TH":"อัปเดตล่าสุด","VI":"Cập nhật lần cuối","UK":"Останнє оновлення","CS":"Poslední aktualizace","RO":"Ultima actualizare","HU":"Utolsó frissítés","SK":"Posledná aktualizácia","HR":"Posljednje ažuriranje","CA":"Darrera actualització","AF":"Laas opgedateer","SW":"Ilisasishwa mwisho","HA":"Sabuntawa ta ƙarshe","AM":"ለመጨረሻ ጊዜ የተዘመነ"};
var date=new Date("2026-10-10T12:00:00Z");
function update(){
 var el=document.querySelector("[data-pg-privacy-date]");if(!el)return;
 var i=window._pgI18n,lang=i&&i.curLang?i.curLang():"EN";
 if(!labels[lang])lang="EN";
 var dateLocale=lang==="ZH_TW"?"zh-TW":lang==="ZH"?"zh-CN":lang==="NO"?"nb-NO":lang.toLowerCase();
 var formatted="October 10, 2026";
 try{formatted=new Intl.DateTimeFormat(dateLocale,{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(date);}catch(e){}
 el.textContent=labels[lang]+": "+formatted;
 el.setAttribute("dir",lang==="AR"||lang==="HE"?"auto":"ltr");
 document.documentElement.setAttribute("data-pg-privacy-date-language",lang);
}
window.addEventListener("pg:languagechange",function(){update();setTimeout(update,100);});
window.addEventListener("pageshow",update);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",update,{once:true});else update();
window._pgPrivacyDateLocale={apply:update,locales:Object.keys(labels)};
})();
