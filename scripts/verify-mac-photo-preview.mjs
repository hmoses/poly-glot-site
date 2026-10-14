/* Check all Photo to AI locale entries and the three-action Mac laptop layout. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const css=read('assets/css/mac-photo-preview.css');
const js=read('assets/js/mac-photo-preview.js');
const global={window:{},localStorage:{getItem:()=>null},navigator:{language:'en'},_uiLang:'EN'};
vm.createContext(global);vm.runInContext(read('assets/js/photo-to-ai-locales.js'),global);
const catalogs=global.window.PGPhotoAILocales;
const codes=Object.keys(catalogs).sort();
assert.equal(codes.length,39,'Photo to AI catalog must cover English and 38 translations');
const actionSource=js.match(/var macActionLocales=(\{[^;]+\});/);
assert(actionSource,'Mac localized action map is missing');
const localizedAction=JSON.parse(actionSource[1]);
assert.deepEqual(Object.keys(localizedAction).sort(),codes,'Mac paste action needs one translated value for every supported language');
for(const [locale,dict] of Object.entries(catalogs)){
  for(const key of ['feature','choose','context','share','manualPhoto','photoPolicy','privacy','scanText','duckImageModel','huggingUnavailable','locked']){
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
assert(js.includes("w.addEventListener('pg:languagechange',relabel)")&&js.includes("dialog.dir=/^(AR|HE)$/.test(lang())"),'Live language switching / RTL missing');
assert(html.includes('mac-photo-preview.js?v=')&&html.includes('mac-photo-preview.css?v='),'Mac demo assets not linked');
assert(js.includes('PGPhotoAILocales'),'New modal must reuse localized photo catalog');
console.log('PASS: Mac app preview: 3 evenly-sized buttons, 39 locales, localized paste action/close, RTL, no mobile changes.');
