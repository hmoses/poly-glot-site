/* Fill untranslated website controls from Poly-Glot's existing 38-language
   native-device and help-chat lexicons. Only UI text; no entitlements change. */
(function(){
  "use strict";
  var dict=window._pgI18n&&window._pgI18n.dictionary;
  if(!dict)return;
  var langs=window._pgI18n.LANGS||[];
  var labelMap={
    ftFeat:"_features",
    ftTpl:"_templates",
    ftPrice:"_pricing",
    ftPriv:"_privacy",
    ftPrivL:"_privacy",
    ftSupp:"_support",
    ftSuppL:"_support"
  };
  langs.forEach(function(L){
    var code=L.code,base=dict.EN||{},dest=dict[code]||(dict[code]={});
    var topics=window._pgChatI18n&&window._pgChatI18n.getTopics?window._pgChatI18n.getTopics(code):null;
    var native=window._pgDeviceUI&&typeof window._pgDeviceUI._strings==="function"?window._pgDeviceUI._strings(code):null;
    Object.keys(labelMap).forEach(function(key){
      var text=topics&&topics[labelMap[key]];
      if(text&&(!dest[key]||dest[key]===base[key]))dest[key]=text;
    });
    if(native){
      ["sc2Tag","pf2c"].forEach(function(key){
        if(native.compare&&(!dest[key]||dest[key]===base[key]))dest[key]="🔀 "+native.compare;
      });
      if(native.copy&&(!dest.mcpCopyBtn||dest.mcpCopyBtn===base.mcpCopyBtn))dest.mcpCopyBtn=native.copy;
    }
  });
})();