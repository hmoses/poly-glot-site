/* Match the homepage language-selector placement: immediately beside the brand. */
(function(){
function place(){
 var picker=document.getElementById("pgGlobalLangPicker");if(!picker)return;
 var brand=document.querySelector("nav .nav-brand, nav a[href='./'], nav a[href='/'], nav .nav-title");
 var host=brand&&brand.parentElement;
 if(!host){host=document.querySelector("nav .container, header .wrap, nav, header");}
 if(!host){host=document.body;host.insertBefore(picker,host.firstChild);}
 else if(brand&&brand.nextSibling)host.insertBefore(picker,brand.nextSibling);
 else host.appendChild(picker);
 if(host!==document.body){host.style.setProperty("display","flex","important");host.style.setProperty("align-items","center","important");host.style.setProperty("flex-wrap","wrap","important");host.style.setProperty("gap","12px","important");}
 ["position","top","right","bottom","left","margin"].forEach(function(p){picker.style.setProperty(p,p==="position"?"relative":p==="margin"?"0":"auto","important");});
 picker.style.setProperty("z-index","99999","important");
 var dd=document.getElementById("pgGlobalLangDD");
 if(dd){dd.style.setProperty("z-index","2147483001","important");}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",place,{once:true});else place();
window.addEventListener("pg:languagechange",place);
})();