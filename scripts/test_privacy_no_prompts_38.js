// Smoke-test the published privacy statement in every supported UI locale.
// Deliberately self-contained: no browser runtime or network required.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const html = fs.readFileSync("privacy.html", "utf8");
const script = fs.readFileSync("assets/js/privacy-analytics-locales.js", "utf8");
const sentence = "It does not transmit prompt text or AI responses.";
assert.ok(html.includes('<p id="pgAnalyticsPolicyNoPrompts">' + sentence + "</p>"),
  "Missing clear English privacy disclosure");
assert.ok(html.includes("id=\"pgAnalyticsPolicy\" data-no-translate"),
  "Existing localizer must not overwrite curated privacy translations");
assert.ok(html.includes("privacy-analytics-locales.js?v=20261011-noprompts-38"),
  "Privacy page must invalidate the previous locale script cache");
const expected = ["EN","ES","FR","DE","IT","PT","NL","RU","ZH","ZH_TW",
  "JA","KO","AR","HI","BN","TR","PL","SV","NO","DA","FI","EL","HE",
  "ID","MS","TH","VI","UK","CS","RO","HU","SK","HR","CA","AF","SW","HA","AM"];
for (const code of expected) {
  const nodes = new Map([
    ["pgAnalyticsPolicyHeading",{textContent:"Optional in-app analytics"}],
    ["pgAnalyticsPolicyBody",{textContent:"If you enable anonymous analytics"}],
    ["pgAnalyticsPolicyNoPrompts",{textContent:sentence}],
    ["pgAnalyticsPolicy",{dir:"ltr"}],
  ]);
  const document = {
    readyState:"complete",
    getElementById:(id)=>nodes.get(id)||null,
    addEventListener:()=>{},
  };
  const window = {
    _pgI18n:{curLang:()=>code},
    addEventListener:()=>{},
  };
  vm.runInNewContext(script,{window,document}, {timeout:3000});
  const words = nodes.get("pgAnalyticsPolicyNoPrompts").textContent;
  assert.ok(typeof words==="string"&&words.length>12, code+" translation missing");
  if(code!=="EN")assert.notEqual(words,sentence,code+" English fallback");
  else assert.equal(words,sentence);
  assert.equal(nodes.get("pgAnalyticsPolicy").dir,
    ["AR","HE"].includes(code)?"rtl":"ltr");
  assert.equal(window._pgAnalyticsPolicyLocale.languages.length,38,
    "Expected precisely 38 locale entries");
}
console.log("PASS: standalone prompt/privacy disclosure localized for all 38 languages");
