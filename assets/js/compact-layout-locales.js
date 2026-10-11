/* Two-view links: short default landing page + one-click original product tour.
   Localized in the same 38 languages as the Poly-Glot site. */
(function(){
"use strict";
var t={"EN":["Full product tour","Short homepage"],"ES":["Recorrido completo del producto","Página de inicio breve"],"FR":["Visite complète du produit","Accueil simplifié"],"DE":["Vollständige Produkttour","Kompakte Startseite"],"IT":["Tour completo del prodotto","Pagina iniziale breve"],"PT":["Tour completo do produto","Página inicial resumida"],"NL":["Volledige producttour","Beknopte startpagina"],"RU":["Полный обзор продукта","Краткая главная страница"],"ZH":["完整产品导览","精简主页"],"ZH_TW":["完整產品導覽","精簡首頁"],"JA":["製品ツアーの全編を見る","短縮版ホームページ"],"KO":["전체 제품 둘러보기","간략한 홈 화면"],"AR":["جولة كاملة في المنتج","الصفحة الرئيسية المختصرة"],"HI":["पूरा प्रोडक्ट टूर","संक्षिप्त होमपेज"],"BN":["সম্পূর্ণ পণ্য পরিচিতি","সংক্ষিপ্ত হোমপেজ"],"TR":["Ürünün tamamını keşfedin","Kısa ana sayfa"],"PL":["Pełna prezentacja produktu","Skrócona strona główna"],"SV":["Fullständig produktvisning","Kort startsida"],"NO":["Fullstendig produktomvisning","Kort startside"],"DA":["Fuld produktrundvisning","Kort forside"],"FI":["Koko tuote-esittely","Tiivis etusivu"],"EL":["Πλήρης περιήγηση στο προϊόν","Σύντομη αρχική σελίδα"],"HE":["סיור מלא במוצר","דף בית מקוצר"],"ID":["Tur produk lengkap","Beranda ringkas"],"MS":["Jelajah produk penuh","Halaman utama ringkas"],"TH":["ดูผลิตภัณฑ์ฉบับเต็ม","หน้าแรกแบบย่อ"],"VI":["Khám phá sản phẩm đầy đủ","Trang chủ rút gọn"],"UK":["Повний огляд продукту","Стисла головна сторінка"],"CS":["Kompletní prohlídka produktu","Stručná úvodní stránka"],"RO":["Prezentarea completă a produsului","Pagina principală scurtă"],"HU":["Teljes termékbemutató","Rövid kezdőlap"],"SK":["Kompletná prehliadka produktu","Stručná úvodná stránka"],"HR":["Cjeloviti obilazak proizvoda","Skraćena početna stranica"],"CA":["Visita completa del producte","Pàgina inicial breu"],"AF":["Volledige produktoorsig","Kort tuisblad"],"SW":["Ziara kamili ya bidhaa","Ukurasa mfupi wa mwanzo"],"HA":["Cikakken yawon samfur","Gajeren shafin farko"],"AM":["ሙሉ የምርት መጎብኘት","አጭር መነሻ ገጽ"]};
function apply(code){
 var lang=String(code||"EN").toUpperCase().replace("-","_");
 var pair=t[lang]||t.EN;
 document.querySelectorAll("[data-pg-layout-label]").forEach(function(node){
  var key=node.getAttribute("data-pg-layout-label");
  var value=key==="short"?pair[1]:pair[0];
  if(node.textContent!==value)node.textContent=value;
 });
}
function current(){var a=window._pgI18n;return a&&typeof a.curLang==="function"?a.curLang():(document.documentElement.lang||"EN");}
window.addEventListener("pg:languagechange",function(e){apply(e.detail&&e.detail.code||current());});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){apply(current());},{once:true});else apply(current());
})();
