/* Reuse all 38 reviewed MCP setup translations for help cards and FAQs.
 * Runs after site-copy-localization.js has exposed its translated setup steps. */
(function(){
"use strict";
var i18n=window._pgI18n,site=window._pgSiteCopy;
if(!i18n||!i18n.dictionary||!site||!site.mcpLocales)return;
var all=i18n.dictionary;
i18n.LANGS.forEach(function(language){
 var code=language.code,record=all[code]||(all[code]={}),en=all.EN,steps=site.mcpLocales[code]||site.mcpLocales.EN;
 if(code==="EN"||!steps)return;
 function fill(key,value){if(value&&(!record[key]||record[key]===en[key]))record[key]=value;}
 fill("mcpWhatP",record.fq10a||steps[1]);
 fill("mcpClSteps","<li>"+steps[4]+"</li><li>"+steps[6]+"</li><li>"+steps[8]+"</li>");
 fill("mcpGptSteps","<li>"+steps[3]+"</li><li>"+steps[5]+"</li><li>"+steps[7]+"</li>");
 fill("mcpGptDesc",steps[1]);
 fill("mcpGptTip","💡 "+steps[8]);
 fill("prName3",record.prTier3);
 var terms=window._pgChatI18n&&window._pgChatI18n.getTopics?window._pgChatI18n.getTopics(code):null;
 if(terms){fill("ftSupp",terms._support);fill("ftSuppL",terms._support);}
});
})();