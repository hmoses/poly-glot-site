/** Site template gallery translations synced from the native Poly-Glot catalog.
 * Provider names, product tiers and numerical values retain their original semantics.
 */
(function(){
"use strict";
var CAT={"Business":"money","Coding":"coding","AI":"ai","Writing":"writing","Marketing":"marketing","Sales":"sales","Education":"school","Research":"research","Career":"career","Legal":"legal","Finance":"finance","Health":"health","Cooking":"cooking","Garden":"garden","Real Estate":"realestate","Auto":"auto","Travel":"travel","Image AI":"image","Music":"music","Video":"video","Social":"social","Startup":"startup","E-commerce":"ecommerce","Productivity":"productivity","DIY":"diy","Events":"event","Parenting":"parent","Pets":"pets","Sports":"sports","Wellness":"wellness","Languages":"language","Security":"security","Data Science":"datascience","Chemistry":"chemistry","Biology":"biology","Physics":"physics","Math":"math","Money":"makemoney","Free":"free","Everyday":"productivity","Personal Finance":"finance","Home":"diy","Developer":"coding","Data":"datascience","AI / Data Science":"datascience"};
var COUNTS={"EN":"templates","ES":"plantillas","FR":"modèles","DE":"Vorlagen","IT":"modelli","PT":"modelos","NL":"sjablonen","RU":"шаблонов","ZH":"个模板","ZH_TW":"個範本","JA":"テンプレート","KO":"개 템플릿","AR":"قالبًا","HI":"टेम्पलेट","BN":"টেমপ্লেট","TR":"şablon","PL":"szablonów","SV":"mallar","NO":"maler","DA":"skabeloner","FI":"mallia","EL":"πρότυπα","HE":"תבניות","ID":"templat","MS":"templat","TH":"เทมเพลต","VI":"mẫu","UK":"шаблонів","CS":"šablon","RO":"șabloane","HU":"sablon","SK":"šablón","HR":"predložaka","CA":"plantilles","AF":"sjablone","SW":"violezo","HA":"samfura","AM":"አብነቶች"};
var EXPAND={"EN":"Browse all 39 categories ↓","ES":"Ver las 39 categorías ↓","FR":"Voir les 39 catégories ↓","DE":"Alle 39 Kategorien anzeigen ↓","IT":"Mostra tutte le 39 categorie ↓","PT":"Ver todas as 39 categorias ↓","NL":"Bekijk alle 39 categorieën ↓","RU":"Показать все 39 категорий ↓","ZH":"浏览全部 39 个类别 ↓","ZH_TW":"瀏覽全部 39 個類別 ↓","JA":"39 のカテゴリーを表示 ↓","KO":"39개 카테고리 모두 보기 ↓","AR":"عرض الفئات الـ 39 ↓","HI":"सभी 39 श्रेणियाँ देखें ↓","BN":"সব ৩৯টি বিভাগ দেখুন ↓","TR":"39 kategorinin tümünü gör ↓","PL":"Zobacz wszystkie 39 kategorii ↓","SV":"Visa alla 39 kategorier ↓","NO":"Vis alle 39 kategorier ↓","DA":"Vis alle 39 kategorier ↓","FI":"Näytä kaikki 39 luokkaa ↓","EL":"Προβολή και των 39 κατηγοριών ↓","HE":"הצגת כל 39 הקטגוריות ↓","ID":"Lihat semua 39 kategori ↓","MS":"Lihat semua 39 kategori ↓","TH":"ดูทั้ง 39 หมวดหมู่ ↓","VI":"Xem tất cả 39 danh mục ↓","UK":"Переглянути всі 39 категорій ↓","CS":"Zobrazit všech 39 kategorií ↓","RO":"Vezi toate cele 39 de categorii ↓","HU":"Mind a 39 kategória megtekintése ↓","SK":"Zobraziť všetkých 39 kategórií ↓","HR":"Prikaži svih 39 kategorija ↓","CA":"Mostra les 39 categories ↓","AF":"Wys al 39 kategorieë ↓","SW":"Angalia makundi yote 39 ↓","HA":"Duba duk rukunai 39 ↓","AM":"ሁሉንም 39 ምድቦች ይመልከቱ ↓"};
var COLLAPSE={"EN":"Show fewer categories ↑","ES":"Mostrar menos categorías ↑","FR":"Voir moins de catégories ↑","DE":"Weniger Kategorien anzeigen ↑","IT":"Mostra meno categorie ↑","PT":"Mostrar menos categorias ↑","NL":"Minder categorieën tonen ↑","RU":"Показать меньше категорий ↑","ZH":"显示更少类别 ↑","ZH_TW":"顯示較少類別 ↑","JA":"カテゴリーを減らす ↑","KO":"카테고리 접기 ↑","AR":"عرض فئات أقل ↑","HI":"कम श्रेणियाँ दिखाएँ ↑","BN":"কম বিভাগ দেখান ↑","TR":"Daha az kategori göster ↑","PL":"Pokaż mniej kategorii ↑","SV":"Visa färre kategorier ↑","NO":"Vis færre kategorier ↑","DA":"Vis færre kategorier ↑","FI":"Näytä vähemmän luokkia ↑","EL":"Εμφάνιση λιγότερων κατηγοριών ↑","HE":"הצגת פחות קטגוריות ↑","ID":"Tampilkan lebih sedikit kategori ↑","MS":"Tunjuk lebih sedikit kategori ↑","TH":"แสดงหมวดหมู่น้อยลง ↑","VI":"Hiển thị ít danh mục hơn ↑","UK":"Показати менше категорій ↑","CS":"Zobrazit méně kategorií ↑","RO":"Arată mai puține categorii ↑","HU":"Kevesebb kategória megjelenítése ↑","SK":"Zobraziť menej kategórií ↑","HR":"Prikaži manje kategorija ↑","CA":"Mostra menys categories ↑","AF":"Wys minder kategorieë ↑","SW":"Onyesha makundi machache ↑","HA":"Nuna ƙananan rukuni ↑","AM":"ጥቂት ምድቦችን ያሳዩ ↑"};
var baseline=[],button=null,busy=false;
function lang(){return window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():"EN";}
function t(el,text){if(el&&typeof text==="string"&&el.textContent!==text)el.textContent=text;}
function render(){
if(busy)return;
busy=true;
try{
 var code=lang(),localized=(window._pgCatalogLocales||{})[code]||{},pills=localized.p||{},templates=localized.t||{};
 for(var i=0;i<baseline.length;i++){
  var obj=baseline[i],node=obj.node,original=obj.value; if(!node||!node.isConnected)continue;
  var value=original;
  if(code!=="EN"){
   if(obj.kind==="category"){var cat=CAT[original]; if(cat&&pills[cat])value=String(pills[cat]).replace(/^[^\p{L}\p{N}]+/u,"").trim();}
   if(obj.kind==="title"){value=(templates[original]&&templates[original].n)||original;}
   if(obj.kind==="description"){value=(templates[obj.title]&&templates[obj.title].d)||original;}
   if(obj.kind==="counter"){var match=original.match(/^(\d+)/);if(match){var suffix=COUNTS[code]||COUNTS.EN;value=(code==="ZH"||code==="ZH_TW")?match[1]+suffix:match[1]+" "+suffix;}}
   if(obj.kind==="word")value=COUNTS[code]||COUNTS.EN;
  }
  t(node,value);
  if(code==="AR"||code==="HE")node.setAttribute("dir","auto");else node.removeAttribute("dir");
 }
 if(button)t(button,((button.getAttribute("aria-expanded")==="true")?COLLAPSE:EXPAND)[code]||EXPAND.EN);
}finally{busy=false;}
}
function start(){
 var root=document.getElementById("template-categories");if(!root)return;
 root.querySelectorAll(".featured-template-card").forEach(function(card){
  var name=card.querySelector("h3"),p=card.querySelector("p"),id=name?name.textContent.trim():"";
  if(name)baseline.push({node:name,kind:"title",value:id});
  if(p)baseline.push({node:p,kind:"description",value:p.textContent.trim(),title:id});
 });
 root.querySelectorAll(".category-name,.featured-template-category > span:not(.featured-template-icon):not(.pro-template-badge)").forEach(function(el){
  baseline.push({node:el,kind:"category",value:el.textContent.trim()});
 });
 root.querySelectorAll(".category-number").forEach(function(el){baseline.push({node:el,kind:"counter",value:el.textContent.trim()});});
 var w=root.querySelector(".category-count-total span");if(w)baseline.push({node:w,kind:"word",value:w.textContent.trim()});
 button=root.querySelector(".category-expand-btn");
 if(button){
  button.addEventListener("click",function(){setTimeout(render,0);});
  new MutationObserver(function(){if(!busy)setTimeout(render,0);}).observe(button,{attributes:true,attributeFilter:["aria-expanded"]});
 }
 render();
}
window.addEventListener("pg:languagechange",render);
window._pgCatalogTranslate={apply:render,coverage:function(){return Object.keys(window._pgCatalogLocales||{});}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
})();