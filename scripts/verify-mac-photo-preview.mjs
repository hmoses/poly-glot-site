/* Check all Photo to AI locale entries and the three-action Mac laptop layout. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const css=read('assets/css/mac-photo-preview.css');
const js=read('assets/js/mac-photo-preview.js');
assert.doesNotThrow(()=>new vm.Script(js),'Mac modal JS must parse');
const global={window:{},localStorage:{getItem:()=>null},navigator:{language:'en'},_uiLang:'EN'};
vm.createContext(global);vm.runInContext(read('assets/js/photo-to-ai-locales.js'),global);
const catalogs=global.window.PGPhotoAILocales;
const codes=Object.keys(catalogs).sort();
assert.equal(codes.length,39,'Photo to AI catalog must cover English and 38 translations');
const actionSource=js.match(/var macActionLocales=(\{[^;]+\});/);
assert(actionSource,'Mac localized action map is missing');
const localizedAction=JSON.parse(actionSource[1]);
assert.deepEqual(Object.keys(localizedAction).sort(),codes,'Mac paste action needs one translated value for every supported language');
const clearSource=js.match(/var clearPhotoLocales=(\{[^;]+\});/);
assert(clearSource,'Mac clear-photo localized labels are missing');
const clearLabels=JSON.parse(clearSource[1]);
assert.deepEqual(Object.keys(clearLabels).sort(),codes,'Mac Clear Photo must have 39 localized labels');
for(const [locale,text] of Object.entries(clearLabels))assert(text.trim()&&typeof text==='string','Missing localized Clear Photo label: '+locale);
for(const [locale,dict] of Object.entries(catalogs)){
  for(const key of ['feature','choose','share','photoPolicy','locked']){
    assert.equal(typeof dict[key],'string',`${locale}.${key} missing`);
    assert(dict[key].trim(),`${locale}.${key} empty`);
  }
  const [action,close]=localizedAction[locale];
  assert(action.trim().length>=5&&close.trim().length>=2,`${locale} action/close translation incomplete`);
  if(locale!=='EN')assert.notEqual(action,localizedAction.EN[0],`${locale} fell back to English`);
}
assert.equal((html.match(/class="pg-mac-photo-actions"/g)||[]).length,1,'Mac action group duplicated or missing');
const actionGroup=html.split('class="pg-mac-photo-actions"')[1].split('<!-- Talk + Send row -->')[0];
assert(actionGroup.includes('Paste')&&actionGroup.includes('Import')&&actionGroup.includes('data-pg-photo-preview-action'),'Mac action group must contain Paste, Import, and Photo to AI');
assert(actionGroup.indexOf('Paste')<actionGroup.indexOf('Import')&&actionGroup.indexOf('Import')<actionGroup.indexOf('data-pg-photo-preview-action'),'Mac button order changed');
assert(/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)!important/.test(css),'Mac scaled three-column override missing');
assert(css.includes('html:not([data-device-ui-lang="EN"])')&&css.includes('html[dir="rtl"]'),'Localized and RTL Mac row scaling missing');
assert(js.includes("w.addEventListener('pg:languagechange',relabel)")&&js.includes("dialog.dir=/^(AR|HE)(_|$)/.test(lang())"),'Live language switching / RTL missing');
assert(html.includes('mac-photo-preview.js?v=20261017-image-only-v3')&&html.includes('mac-photo-preview.css?v=20261017-image-only-v3'),'Current Mac demo assets not linked or cache-buster stale');
const modal=js.slice(js.indexOf('function init()'));
for(const needed of ['pgMacDemoComposer','pgMacDemoPreviewBox','pgMacDemoImage','pgMacDemoPlaceholder','pgMacDemoClear','pgMacDemoChoose','pgMacDemoAI','pgMacDemoSend','pgMacDemoStep1','pgMacDemoStep2','pgMacDemoStep3'])assert(modal.includes(needed),'Missing native Mac v3 panel feature: '+needed);
for(const old of ['pgMacDemoContext','pgMacDemoNotes','pgMacDemoOCR','pgMacDemoInstructions','pgMacDemoCaption'])assert(!js.includes(old),'Retired macOS content still present: '+old);
assert(!js.includes('option value="copilot"'),'Website preview must advertise eight providers, not Copilot');
assert.equal((js.match(/<option value=/g)||[]).length,8,'Exactly eight website AI destinations');
assert(js.includes("el('pgMacDemoPlaceholder').addEventListener('click'") &&
       js.includes("el('pgMacDemoChoose').addEventListener('click'") &&
       js.includes("el('pgMacDemoAI').addEventListener('change',relabel)") &&
       js.includes("el('pgMacDemoClear').addEventListener('click',disposePhoto)"),
       'Mac image, clear, provider and photo picker interactions missing');
assert(css.includes('#pgMacDemoComposer.has-photo')&&css.includes('background:linear-gradient(135deg,#10b981,#059669)'),'Mac image composer or green native action not styled');
assert(css.includes('max-height:calc(100dvh - 32px)'),'Mac demo dialog must remain within viewport');
assert(js.includes('PGPhotoHandoffGuideLocales'),'Localized Mac paste hint missing');
assert(js.includes('PGPhotoAILocales'),'New modal must reuse localized photo catalog');
console.log('PASS: Mac App Preview uses native Photo to AI v3 image-only layout; photo choose/clear and 8-provider menu work, obsolete context/OCR removed, 39 locales preserved.');
