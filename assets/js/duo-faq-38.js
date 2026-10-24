/* Localized iPhone Duo FAQs. Uses the same 38-language copy as the chatbot. */
(function () {
  "use strict";
  var KINDS = ["overview", "folded", "unfolded", "compare", "responses"];
  function insert() {
    var list = document.querySelector("#faq .faq-list");
    var fn = window._pgDuoHelpLookup;
    if (!list || typeof fn !== "function") return;
    var marker = document.querySelector('#faq [data-i18n="fq4q"]');
    var sibling = marker && marker.closest(".faq-item");
    var after = sibling ? sibling.nextSibling : null;
    KINDS.forEach(function (kind) {
      var id = "pg-faq-duo-" + kind;
      var item = document.getElementById(id);
      if (!item) {
        item = document.createElement("div");
        item.className = "faq-item";
        item.id = id;
        var question = document.createElement("div");
        question.className = "faq-q";
        question.setAttribute("role", "button");
        question.setAttribute("tabindex", "0");
        question.setAttribute("aria-expanded", "false");
        question.addEventListener("click", function () {
          if (typeof window.toggleFaq === "function") window.toggleFaq(question);
          question.setAttribute("aria-expanded", question.parentNode.querySelector(".faq-a").classList.contains("open") ? "true" : "false");
        });
        question.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            question.click();
          }
        });
        var toggle = document.createElement("span");
        toggle.className = "toggle";
        toggle.setAttribute("aria-hidden", "true");
        toggle.textContent = "+";
        question.appendChild(toggle);
        var answer = document.createElement("div");
        answer.className = "faq-a";
        var para = document.createElement("p");
        answer.appendChild(para);
        if (kind === "overview") {
          var link = document.createElement("p");
          var a = document.createElement("a");
          a.href = "#iphone-duo";
          a.textContent = "iPhone Duo →";
          link.appendChild(a);
          answer.appendChild(link);
        }
        item.appendChild(question);
        item.appendChild(answer);
        list.insertBefore(item, after);
      }
    });
    refresh();
  }
  function refresh() {
    var fn = window._pgDuoHelpLookup;
    if (typeof fn !== "function") return;
    KINDS.forEach(function (kind) {
      var item = document.getElementById("pg-faq-duo-" + kind);
      if (!item) return;
      var response = fn("duo:" + kind);
      if (!response) return;
      var parts = response.split("\n\n");
      var heading = (parts[0] || "").replace(/^\*\*/, "").replace(/\*\*$/, "");
      var question = item.querySelector(".faq-q");
      var toggle = question.querySelector(".toggle");
      question.textContent = heading;
      question.appendChild(toggle);
      question.setAttribute("aria-label", heading);
      item.querySelector(".faq-a p").textContent = parts[1] || "";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", insert, {once:true});
  else insert();
  window.addEventListener("pg:languagechange", function () { Promise.resolve().then(refresh); });
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id !== "pgChat-topics-select") Promise.resolve().then(refresh);
  }, true);
  if (window.MutationObserver) {
    new MutationObserver(refresh).observe(document.documentElement, {attributes:true, attributeFilter:["lang"]});
  }
})();