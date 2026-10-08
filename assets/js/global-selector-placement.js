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
 // The homepage i18n.js owns the one canonical flag/code list.
 var api=window._pgI18n,btn=document.getElementById("pgGlobalLangBtn");
 if(api&&btn){
  var lang=api.curLang(),entry=api.LANGS.find(function(x){return x.code===lang;})||api.LANGS[0];
  var flag=document.getElementById("pgGlobalFlag"),code=document.getElementById("pgGlobalCode");
  if(flag)flag.textContent=entry.flag;
  if(code)code.textContent=entry.code;
  btn.setAttribute("aria-label","Language: "+entry.name);
  btn.setAttribute("title",entry.name);
  document.querySelectorAll("#pgGlobalLangDD .pgGlob-row").forEach(function(row){
   var value=api.LANGS.find(function(x){return x.code===row.getAttribute("data-lang");});
   if(!value)return;
   var glyph=row.querySelector(".gf");if(glyph)glyph.textContent=value.flag;
   row.setAttribute("aria-label",value.name+" ("+value.code+")");
  });
 }
 var dd=document.getElementById("pgGlobalLangDD");
 if(dd){dd.style.setProperty("z-index","2147483001","important");}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",place,{once:true});else place();
window.addEventListener("pg:languagechange",place);
})();