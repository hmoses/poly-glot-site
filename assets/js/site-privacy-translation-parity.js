/* Keep the product's privacy claim accurate in every supported language.
 * Reuse the already-reviewed 38-language FAQ disclosure for the feature tile;
 * never claim all processing is on-device or that prompts never reach servers.
 */
(function(){
 "use strict";
 var api=window._pgI18n,dict=api&&api.dictionary;if(!dict)return;
 (api.LANGS||[]).forEach(function(l){
  var entry=dict[l.code];if(!entry)return;
  if(entry.fq3q)entry.f4=entry.fq3q;
  if(entry.fq3a)entry.f4p=entry.fq3a;
 });
})();