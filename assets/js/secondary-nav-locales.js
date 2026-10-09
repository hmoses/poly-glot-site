/* Localized secondary-guide navigation: same homepage language state and flags. */
(function(){
"use strict";
var L={"EN":["MCP Ecosystem","App Store"],"ES":["Ecosistema MCP","Ver en App Store"],"FR":["Écosystème MCP","Voir sur l’App Store"],"DE":["MCP-Ökosystem","Im App Store ansehen"],"IT":["Ecosistema MCP","Vedi su App Store"],"PT":["Ecossistema MCP","Ver na App Store"],"NL":["MCP-ecosysteem","Bekijk in de App Store"],"RU":["Экосистема MCP","Открыть в App Store"],"ZH":["MCP 生态系统","前往 App Store"],"ZH_TW":["MCP 生態系統","前往 App Store"],"JA":["MCP エコシステム","App Storeで入手"],"KO":["MCP 생태계","App Store에서 보기"],"AR":["منظومة MCP","عرض في App Store"],"HI":["MCP इकोसिस्टम","App Store पर देखें"],"BN":["MCP ইকোসিস্টেম","App Store-এ দেখুন"],"TR":["MCP Ekosistemi","App Store’da görüntüle"],"PL":["Ekosystem MCP","Zobacz w App Store"],"SV":["MCP-ekosystemet","Visa i App Store"],"NO":["MCP-økosystem","Vis i App Store"],"DA":["MCP-økosystem","Se i App Store"],"FI":["MCP-ekosysteemi","Näytä App Storessa"],"EL":["Οικοσύστημα MCP","Προβολή στο App Store"],"HE":["מערכת MCP","הצגה ב-App Store"],"ID":["Ekosistem MCP","Lihat di App Store"],"MS":["Ekosistem MCP","Lihat di App Store"],"TH":["ระบบนิเวศ MCP","ดูใน App Store"],"VI":["Hệ sinh thái MCP","Xem trên App Store"],"UK":["Екосистема MCP","Переглянути в App Store"],"CS":["Ekosystém MCP","Zobrazit v App Store"],"RO":["Ecosistemul MCP","Vezi în App Store"],"HU":["MCP-ökoszisztéma","Megtekintés az App Store-ban"],"SK":["Ekosystém MCP","Zobraziť v App Store"],"HR":["MCP ekosustav","Pogledaj u App Storeu"],"CA":["Ecosistema MCP","Veure a l’App Store"],"AF":["MCP-ekostelsel","Bekyk in die App Store"],"SW":["Mfumo wa MCP","Tazama kwenye App Store"],"HA":["Tsarin MCP","Duba a App Store"],"AM":["የMCP ሥነ-ምህዳር","በApp Store ይመልከቱ"]};
function apply(){
  var api=window._pgI18n;
  var lang=api&&api.curLang?api.curLang():"EN";
  var t=L[lang]||L.EN;
  document.querySelectorAll('header nav a[href="./#connect"]').forEach(function(a){a.textContent="🔌 "+t[0];});
  document.querySelectorAll('header nav a[href*="apps.apple.com"]').forEach(function(a){a.textContent=t[1];});
}
window.addEventListener("pg:languagechange",apply);
window.addEventListener("pageshow",apply);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();
