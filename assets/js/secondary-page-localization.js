/* Translate secondary-page copy with the same 38-language dictionary as the homepage.
   Preserve original paragraphs without a matching translation, especially legal text. */
(function(){
"use strict";
var i=window._pgI18n;if(!i||!i.dictionary||!i.dictionary.EN)return;
var original=new WeakMap(),entries=[],lookup=new Map(),attrs=[];
var exactVI={"Production MCP endpoint":"Điểm cuối MCP chính thức","Copy":"Sao chép","Copied!":"Đã sao chép!","Remote Streamable HTTP endpoint exposing Poly-Glot's 15 MCP tools.":"Điểm cuối Streamable HTTP từ xa cung cấp 15 công cụ MCP của Poly-Glot.","Official MCP Registry":"Sổ đăng ký MCP chính thức","Live":"Đang hoạt động","Open Official MCP Registry →":"Mở sổ đăng ký MCP chính thức →","Canonical registry discovery entry for":"Mục đăng ký chính thức dành cho","Verified + Featured":"Đã xác minh · Nổi bật","Public remote-MCP listing with the production endpoint and live tool inspection.":"Danh mục MCP từ xa công khai với điểm cuối chính thức và khả năng kiểm tra công cụ trực tiếp.","Open MCP.so →":"Mở MCP.so →","Listed":"Đã đăng ký","Connector listing with health checks, tool schemas, and MCP inspection.":"Danh sách kết nối có kiểm tra tình trạng, lược đồ công cụ và khả năng kiểm tra MCP.","Open Glama →":"Mở Glama →","Running":"Đang chạy","Public Poly-Glot AI Workspace MCP Space for ecosystem discovery and demonstration.":"Không gian MCP công khai của Poly-Glot AI Workspace để khám phá và trải nghiệm.","Open Hugging Face Space →":"Mở Hugging Face Space →","MCP client compatibility":"Khả năng tương thích với ứng dụng khách MCP","Supported":"Được hỗ trợ","Live Now":"Đang hoạt động","Available":"Có sẵn","Open Cursor → Customize → MCPs":"Mở Cursor → Tùy chỉnh → MCPs","Add Poly-Glot as a remote server":"Thêm Poly-Glot làm máy chủ từ xa","Enable Poly-Glot":"Bật Poly-Glot","Open the client's MCP / Tools / Integrations settings":"Mở cài đặt MCP / Công cụ / Tích hợp của ứng dụng","Select remote HTTP / Streamable HTTP":"Chọn HTTP từ xa / Streamable HTTP","Paste the production endpoint":"Dán điểm cuối chính thức","Directories are not clients:":"Danh mục không phải là ứng dụng khách:","Desktop App (Recommended)":"Ứng dụng máy tính (được đề xuất)","Open Claude Desktop Settings":"Mở cài đặt Claude Desktop","Add a new MCP connector":"Thêm kết nối MCP mới","Name it \"Poly-Glot\"":"Đặt tên là “Poly-Glot”","Start using it!":"Bắt đầu sử dụng!","Claude.ai (Web)":"Claude.ai (Web)","Add connector with the same URL":"Thêm kết nối với cùng URL","Approve tool access when prompted":"Cho phép truy cập công cụ khi được yêu cầu","What to expect":"Điều bạn có thể mong đợi","Start prompting with 1,000+ templates":"Bắt đầu với hơn 1.000 mẫu câu lệnh","Manual setup":"Thiết lập thủ công","One-click install":"Cài đặt bằng một lần nhấp","Open Cursor MCP settings":"Mở cài đặt MCP của Cursor","Add the Poly-Glot remote server":"Thêm máy chủ Poly-Glot từ xa","🌐 Active Poly-Glot MCP Ecosystem":"🌐 Hệ sinh thái MCP Poly-Glot đang hoạt động","🔌 What is MCP?":"🔌 MCP là gì?","🧩 Connect from other supported MCP clients":"🧩 Kết nối từ các ứng dụng MCP tương thích khác","Works with Claude.ai (Free, Pro, Team, and Enterprise plans).":"Hoạt động với Claude.ai (gói Free, Pro, Team và Enterprise).","After the client completes the MCP handshake, it should discover the same 15 server-side Poly-Glot tools.":"Sau khi ứng dụng hoàn tất bắt tay MCP, ứng dụng sẽ nhận diện 15 công cụ Poly-Glot trên máy chủ.","Save the configuration, enable the server, and approve tool access when Cursor asks. Poly-Glot's 15 tools will then be available to Agent.":"Lưu cấu hình, bật máy chủ và chấp thuận quyền truy cập khi Cursor yêu cầu. Sau đó Agent sẽ sử dụng được 15 công cụ Poly-Glot.","Name it Poly-Glot, connect, and approve tools":"Đặt tên Poly-Glot, kết nối và cho phép công cụ","Explore related topics":"Khám phá các chủ đề liên quan","Frequently asked questions":"Câu hỏi thường gặp","Terms":"Điều khoản","Home":"Trang chủ","Support":"Hỗ trợ","App Store":"App Store","Privacy":"Quyền riêng tư","Privacy Policy":"Chính sách quyền riêng tư","Terms of Use":"Điều khoản sử dụng"}; var exactOriginal=new WeakMap(),exactNodes=[];
function norm(x){return String(x||"").replace(/\s+/g," ").trim();}
Object.keys(i.dictionary.EN).forEach(function(k){var v=i.dictionary.EN[k];if(typeof v==="string"&&v.length>2&&v.length<400&&!/[<>]/.test(v)&&!lookup.has(norm(v)))lookup.set(norm(v),k);});
var explicit={"Support":"ftSupp","Privacy Policy":"ftPriv","Terms of Use":"ftTerms","Features":"ftFeat","Pricing":"ftPrice","Templates":"ftTpl","FAQ":"ftFAQ","MCP Setup":"ftConnect","Explore related topics":"ftProd","Frequently asked questions":"fqH","Poly-Glot knowledge center":"fqH","App Store":"navCTA"};
function scan(){
if(!document.body)return;
var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),node;
while(node=walker.nextNode()){
 if(original.has(node)||!node.parentElement||node.parentElement.closest("script,style,noscript,pre,code,textarea,svg,#pgGlobalLangDD,#pgGlobalLangPicker,[data-i18n],[data-i18n-html]"))continue;
 var value=norm(node.nodeValue),key=explicit[value]||lookup.get(value);
 if(!key)continue;
 original.set(node,{text:node.nodeValue,key:key});entries.push(node);
}
document.querySelectorAll("[aria-label],[title],[placeholder]").forEach(function(el){["aria-label","title","placeholder"].forEach(function(a){var value=el.getAttribute(a),key=explicit[norm(value)]||lookup.get(norm(value));if(!key||el.hasAttribute("data-pg-original-"+a))return;el.setAttribute("data-pg-original-"+a,value);attrs.push({el:el,a:a,key:key,value:value});});});
}
/* Capture all visible translatable copy, including cards, buttons, FAQ and footer.
 * Never replace executable examples, technical identifiers, or user data. */
var allOrigins=new WeakMap(),allNodes=[],allAttrs=[],attrOrigins=new WeakMap();
function eligible(n){var p=n.parentElement;return !!p&&!p.closest("script,style,noscript,pre,code,textarea,svg,#pgGlobalLangDD,#pgGlobalLangPicker,[contenteditable],.code-block,.hljs,.language-json,[data-no-translate]");}
function registerAll(){
 if(!document.body)return;
 var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
 while(n=walker.nextNode()){
  if(!eligible(n)||allOrigins.has(n))continue;
  var raw=n.nodeValue,term=norm(raw);
  if(!term||!/[A-Za-z]/.test(term)||/^https?:|^[{}[\\]"':,./\\\\0-9+_=-]+$/.test(term))continue;
  allOrigins.set(n,{raw:raw,term:term});
  allNodes.push(n);
 }
 document.querySelectorAll("[aria-label],[title],[placeholder],[alt]").forEach(function(el){
  if(el.closest("#pgGlobalLangDD,#pgGlobalLangPicker,[data-no-translate]"))return;
  ["aria-label","title","placeholder","alt"].forEach(function(a){
   var value=el.getAttribute(a),term=norm(value);if(!term)return;
   var key=a+"|"+term;
   var record=attrOrigins.get(el)||{};
   if(record[a])return;record[a]={value:value,term:term};attrOrigins.set(el,record);allAttrs.push({el:el,a:a,value:value,term:term});
  });
 });
}
function translate(term,lang){
 if(lang==="EN")return term;
 var extra=lang==="VI"?exactVI:(window._pgSecondaryExact&&window._pgSecondaryExact[lang]);
 if(extra&&Object.prototype.hasOwnProperty.call(extra,term))return extra[term];
 var key=explicit[term]||lookup.get(term);
 if(key){var value=i.dictionary[lang]&&i.dictionary[lang][key];if(typeof value==="string"&&value&&!/[<>]/.test(value))return value;}
 return null; // Never manufacture translations or replace text with unrelated claims.
}
function apply(){
 registerAll();
 var lang=i.curLang(),rtl=lang==="AR"||lang==="HE";
 allNodes=allNodes.filter(function(n){return n.isConnected;});
 allNodes.forEach(function(n){var o=allOrigins.get(n);if(!o)return;
  var value=translate(o.term,lang),target;
  if(lang==="EN"||!value)target=o.raw;
  else{var m=o.raw.match(/^(\\s*)([\\s\\S]*?)(\\s*)$/);target=(m?m[1]:"")+value+(m?m[3]:"");}
  if(n.nodeValue!==target)n.nodeValue=target;
 });
 allAttrs=allAttrs.filter(function(x){return x.el.isConnected;});
 allAttrs.forEach(function(x){var value=translate(x.term,lang);var target=value||x.value;if(x.el.getAttribute(x.a)!==target)x.el.setAttribute(x.a,target);});
 document.querySelectorAll("main,article,footer,.card,.guide-card,.about-card").forEach(function(el){el.setAttribute("dir",rtl?"rtl":"ltr");});
 document.documentElement.setAttribute("data-pg-secondary-locale",lang);
}
window.addEventListener("pg:languagechange",apply);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
window._pgSecondaryLocalization={apply:apply,translatedNodes:function(){return allNodes.length;},coverage:function(){var lang=i.curLang(),translated=0;allNodes.forEach(function(n){var o=allOrigins.get(n);if(o&&translate(o.term,lang))translated++;});return {lang:lang,total:allNodes.length,translated:translated,missing:allNodes.length-translated};}};
})();