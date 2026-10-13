/* Readable, locale-safe copy layout. Does not rewrite translations or links. */
(function () {
  "use strict";
  var selector = "main p, main li, .feature-card p, .guide-card p, article p, #pgAnalyticsPolicyBody, #pgPrivacyAnalyticsBody, .section-sub, body > p";
  var pending = false;
  function chunk(root) {
    if (!root || root.closest("pre, code, script, style, nav, button, a, table, .language-list, [data-pg-tech]")) return;
    var text = root.textContent.trim();
    if (text.length < 270 || root.querySelector("a, code, button, input, select, textarea, ul, ol, p, .pg-copy-chunk")) return;
    var host = root;
    if (root.children.length) {
      if (root.children.length !== 1 || root.children[0].tagName !== "SPAN") return;
      host = root.children[0];
    }
    var raw = host.textContent.trim();
    if (raw.length < 270) return;
    var sentences = raw.match(/[^.!?。！？]+(?:[.!?。！？]+(?=\s|$)|$)/gu);
    if (!sentences || sentences.length < 3) return;
    // Some machine-localized sentences omit the space after punctuation.
    // Never chunk when the sentence matcher failed to capture every character.
    // Otherwise a sentence can disappear from the displayed and copied text.
    if (sentences.join("").replace(/\s+/g,"") !== raw.replace(/\s+/g,"")) return;
    var groups = [];
    for (var i = 0; i < sentences.length; i += 2) groups.push(sentences.slice(i, i + 2).join(" ").trim());
    if (groups.length < 2) return;
    var fragment = document.createDocumentFragment();
    groups.forEach(function (part, index) {
      var line = document.createElement("span");
      line.className = "pg-copy-chunk";
      // Keep a literal separator between the visual chunks so copying text
      // and screen-reader textContent do not join sentences as "one.Two".
      line.textContent = part + (index < groups.length - 1 ? " " : "");
      fragment.appendChild(line);
    });
    host.replaceChildren(fragment);
    root.classList.add("pg-scanable-copy");
  }
  function apply() {
    pending = false;
    document.querySelectorAll(selector).forEach(chunk);
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(apply);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule);
  else schedule();
  window.addEventListener("pg:languagechange", schedule);
  window.addEventListener("pageshow", schedule);
  var observer = new MutationObserver(function (changes) {
    for (var i = 0; i < changes.length; i++) {
      var m = changes[i];
      if (m.type === "characterData" || (m.addedNodes && Array.prototype.some.call(m.addedNodes, function (n) { return n.nodeType === 3; }))) {
        schedule(); return;
      }
    }
  });
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true});
})();
