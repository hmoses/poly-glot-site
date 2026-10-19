/* Subscription funnel: 38 existing site languages, text-only override, no entitlement changes. */
(function(){
"use strict";
const policy={"EN":["Eligible customers start a 3-day Pro trial by approving an Apple subscription.","Unless canceled, Apple charges the displayed plan price after the trial and renews automatically.","After the trial, an active Pro subscription is required for sends, templates and Compare Mode. There is no ongoing free Send allowance.","Earlier app-managed trials do not cause charges without separate Apple subscription approval."],"ES":["Los usuarios elegibles inician una prueba Pro de 3 días al autorizar una suscripción de Apple.","Si no cancelan, Apple cobra el precio indicado tras la prueba y renueva la suscripción automáticamente.","Después de la prueba se necesita Pro para enviar, usar plantillas y el modo Comparar. No hay envíos gratuitos recurrentes.","Las pruebas antiguas de la app no generan cargos sin autorizar una suscripción de Apple."],"FR":["Les personnes éligibles commencent un essai Pro de 3 jours en autorisant un abonnement Apple.","Sans résiliation, Apple facture le prix affiché après l’essai et renouvelle automatiquement l’abonnement.","Après l’essai, Pro est nécessaire pour les envois, les modèles et le mode Comparaison. Il n’y a pas d’envois gratuits récurrents.","Les anciens essais gérés par l’application ne génèrent aucun prélèvement sans autorisation d’abonnement Apple."],"DE":["Berechtigte Nutzer starten eine dreitägige Pro-Testphase, indem sie ein Apple-Abonnement bestätigen.","Ohne Kündigung berechnet Apple nach dem Test den angezeigten Preis und verlängert das Abo automatisch.","Nach dem Test ist Pro für Sendungen, Vorlagen und den Vergleichsmodus erforderlich. Es gibt kein dauerhaftes kostenloses Sendekontingent.","Frühere App-Testphasen lösen ohne separate Zustimmung zu einem Apple-Abo keine Zahlung aus."],"IT":["Gli utenti idonei avviano una prova Pro di 3 giorni autorizzando un abbonamento Apple.","Se non annullato, Apple addebita il prezzo mostrato dopo la prova e rinnova automaticamente l’abbonamento.","Dopo la prova, Pro è necessario per invii, modelli e modalità Confronto. Non sono previsti invii gratuiti continuativi.","Le vecchie prove gestite dall’app non causano addebiti senza un’autorizzazione separata all’abbonamento Apple."],"PT":["Usuários elegíveis iniciam uma avaliação Pro de 3 dias ao autorizar uma assinatura da Apple.","Se não for cancelada, a Apple cobra o preço exibido após o teste e renova a assinatura automaticamente.","Após o teste, é preciso ter Pro para envios, modelos e Modo Comparação. Não há envios grátis recorrentes.","Testes antigos do app não geram cobranças sem autorização separada de uma assinatura Apple."],"NL":["Gebruikers die in aanmerking komen, starten een Pro-proefperiode van 3 dagen door een Apple-abonnement goed te keuren.","Zonder opzegging brengt Apple na de proefperiode de getoonde prijs in rekening en verlengt het abonnement automatisch.","Na de proefperiode is Pro vereist voor verzendingen, sjablonen en vergelijkingsmodus. Er is geen doorlopend gratis verzendtegoed.","Oude proefperioden in de app leiden niet tot kosten zonder aparte goedkeuring voor een Apple-abonnement."],"RU":["Подходящие пользователи начинают 3-дневный пробный период Pro после подтверждения подписки Apple.","Если подписку не отменить, Apple спишет указанную цену после пробного периода и будет автоматически продлевать её.","После пробного периода для отправки запросов, шаблонов и режима сравнения требуется Pro. Постоянных бесплатных отправок нет.","Старые пробные периоды приложения не вызывают списаний без отдельного согласия на подписку Apple."],"ZH":["符合资格的用户授权 Apple 订阅后即可开始 3 天 Pro 试用。","如未取消，Apple 将在试用期结束后按显示的价格收费，并自动续订。","试用结束后，发送、模板和对比模式均需有效 Pro 订阅。不再提供持续免费的发送次数。","旧版应用内试用未经单独授权 Apple 订阅不会产生费用。"],"ZH_TW":["符合資格的用戶授權 Apple 訂閱後即可開始 3 天 Pro 試用。","如未取消，Apple 將在試用結束後依顯示價格收費，並自動續訂。","試用結束後，傳送、範本和比較模式都需要有效的 Pro 訂閱。不再提供持續免費的傳送次數。","舊版 App 內試用未經另外授權 Apple 訂閱不會產生費用。"],"JA":["対象ユーザーはAppleのサブスクリプションを承認すると、Proを3日間無料で試せます。","解約しない場合、試用期間終了後に表示された料金が請求され、自動更新されます。","試用後、送信・テンプレート・比較モードには有効なProサブスクリプションが必要です。継続的な無料送信枠はありません。","従来のアプリ内試用だけでは、Appleサブスクリプションの別途承認なしに課金されません。"],"KO":["대상 사용자는 Apple 구독을 승인하면 3일간 Pro를 체험할 수 있습니다.","취소하지 않으면 체험 종료 후 표시된 요금이 청구되고 Apple에서 자동 갱신됩니다.","체험 후 전송, 템플릿, 비교 모드를 사용하려면 Pro 구독이 필요합니다. 계속 제공되는 무료 전송 횟수는 없습니다.","이전 앱 내 체험은 별도 Apple 구독 승인 없이 결제되지 않습니다."],"AR":["يمكن للمستخدمين المؤهلين بدء تجربة Pro لمدة 3 أيام بعد الموافقة على اشتراك Apple.","إذا لم يُلغَ الاشتراك، تفرض Apple السعر المعروض بعد التجربة وتجدده تلقائيًا.","بعد التجربة يلزم اشتراك Pro للإرسال والقوالب ووضع المقارنة. لا توجد حصة إرسال مجانية مستمرة.","لا تؤدي التجارب القديمة داخل التطبيق إلى رسوم دون موافقة منفصلة على اشتراك Apple."],"HI":["पात्र उपयोगकर्ता Apple सदस्यता मंज़ूर करके Pro का 3 दिन का ट्रायल शुरू कर सकते हैं।","रद्द न करने पर Apple ट्रायल के बाद दिखाई गई कीमत लेता है और सदस्यता अपने आप नवीनीकृत करता है।","ट्रायल के बाद भेजने, टेम्पलेट और तुलना मोड के लिए Pro सदस्यता ज़रूरी है। नियमित मुफ़्त भेजने की सुविधा नहीं है।","पुराने ऐप ट्रायल अलग Apple सदस्यता मंज़ूरी के बिना शुल्क नहीं लगाते।"],"BN":["যোগ্য ব্যবহারকারীরা Apple সাবস্ক্রিপশন অনুমোদন করে ৩ দিনের Pro ট্রায়াল শুরু করতে পারেন।","বাতিল না করলে ট্রায়ালের পর Apple দেখানো মূল্য চার্জ করবে এবং স্বয়ংক্রিয়ভাবে নবায়ন করবে।","ট্রায়ালের পর পাঠানো, টেমপ্লেট ও তুলনা মোডের জন্য Pro সাবস্ক্রিপশন দরকার। নিয়মিত বিনামূল্যে পাঠানোর সুবিধা নেই।","পুরোনো অ্যাপ ট্রায়াল আলাদা Apple সাবস্ক্রিপশন অনুমোদন ছাড়া চার্জ করে না।"],"TR":["Uygun kullanıcılar Apple aboneliğini onaylayarak 3 günlük Pro denemesini başlatabilir.","İptal edilmezse Apple deneme sonunda gösterilen tutarı tahsil eder ve aboneliği otomatik yeniler.","Deneme sonrasında gönderim, şablonlar ve Karşılaştırma Modu için Pro gerekir. Sürekli ücretsiz gönderim hakkı yoktur.","Eski uygulama denemeleri ayrı Apple aboneliği onayı olmadan ücretlendirilmez."],"PL":["Uprawnieni użytkownicy mogą rozpocząć 3-dniowy okres próbny Pro po zatwierdzeniu subskrypcji Apple.","Bez anulowania Apple po próbie pobierze pokazaną cenę i automatycznie odnowi subskrypcję.","Po okresie próbnym wysyłanie, szablony i tryb porównania wymagają Pro. Nie ma stałego limitu bezpłatnych wysłań.","Starsze próby w aplikacji nie powodują opłat bez osobnego zatwierdzenia subskrypcji Apple."],"SV":["Berättigade användare kan starta en 3-dagars Pro-provperiod genom att godkänna en Apple-prenumeration.","Om den inte sägs upp debiterar Apple det visade priset efter provperioden och förnyar automatiskt.","Efter provperioden krävs Pro för sändningar, mallar och jämförelseläge. Ingen löpande gratis sändning ingår.","Äldre provperioder i appen medför ingen debitering utan separat godkännande av en Apple-prenumeration."],"NO":["Kvalifiserte brukere kan starte en 3-dagers Pro-prøveperiode ved å godkjenne et Apple-abonnement.","Hvis det ikke sies opp, belaster Apple den viste prisen etter prøven og fornyer automatisk.","Etter prøven kreves Pro for sendinger, maler og sammenligningsmodus. Det finnes ingen løpende gratis sendinger.","Tidligere prøveperioder i appen medfører ingen betaling uten separat godkjenning av et Apple-abonnement."],"DA":["Berettigede brugere kan starte en 3-dages Pro-prøveperiode ved at godkende et Apple-abonnement.","Hvis det ikke opsiges, opkræver Apple den viste pris efter prøveperioden og fornyer automatisk.","Efter prøveperioden kræves Pro til afsendelse, skabeloner og sammenligning. Der er ingen løbende gratis afsendelser.","Ældre prøveperioder i appen medfører ingen betaling uden særskilt godkendelse af et Apple-abonnement."],"FI":["Ehdot täyttävät käyttäjät voivat aloittaa 3 päivän Pro-kokeilun hyväksymällä Apple-tilauksen.","Ellei tilausta peruta, Apple veloittaa kokeilun jälkeen näytetyn hinnan ja uusii tilauksen automaattisesti.","Kokeilun jälkeen lähetykset, mallipohjat ja vertailutila edellyttävät Pro-tilausta. Jatkuvia ilmaisia lähetyksiä ei ole.","Aiemmat sovelluskokeilut eivät aiheuta maksuja ilman erillistä Apple-tilauksen hyväksyntää."],"EL":["Οι επιλέξιμοι χρήστες ξεκινούν δοκιμή Pro 3 ημερών εγκρίνοντας συνδρομή Apple.","Αν δεν ακυρωθεί, η Apple χρεώνει την εμφανιζόμενη τιμή μετά τη δοκιμή και ανανεώνει αυτόματα.","Μετά τη δοκιμή απαιτείται Pro για αποστολές, πρότυπα και λειτουργία σύγκρισης. Δεν παρέχονται συνεχείς δωρεάν αποστολές.","Οι παλιές δοκιμές της εφαρμογής δεν χρεώνονται χωρίς ξεχωριστή έγκριση συνδρομής Apple."],"HE":["משתמשים זכאים יכולים להתחיל ניסיון Pro ל-3 ימים באישור מינוי Apple.","אם לא מבטלים, Apple מחייבת במחיר המוצג אחרי הניסיון ומחדשת את המינוי אוטומטית.","לאחר הניסיון נדרש Pro לשליחה, לתבניות ולמצב השוואה. אין מכסה מתמשכת של שליחות חינם.","תקופות ניסיון ישנות באפליקציה אינן גורמות לחיוב ללא אישור נפרד למינוי Apple."],"ID":["Pengguna yang memenuhi syarat dapat memulai uji coba Pro 3 hari dengan menyetujui langganan Apple.","Jika tidak dibatalkan, Apple menagih harga yang ditampilkan setelah uji coba dan memperpanjang otomatis.","Setelah uji coba, Pro diperlukan untuk pengiriman, templat, dan Mode Banding. Tidak ada jatah kirim gratis berkelanjutan.","Uji coba aplikasi lama tidak menimbulkan tagihan tanpa persetujuan langganan Apple terpisah."],"MS":["Pengguna yang layak boleh memulakan percubaan Pro 3 hari dengan meluluskan langganan Apple.","Jika tidak dibatalkan, Apple mengenakan harga yang dipaparkan selepas percubaan dan memperbaharui secara automatik.","Selepas percubaan, Pro diperlukan untuk penghantaran, templat dan Mod Banding. Tiada kuota penghantaran percuma berterusan.","Percubaan aplikasi lama tidak menyebabkan caj tanpa kelulusan langganan Apple berasingan."],"TH":["ผู้มีสิทธิ์เริ่มทดลองใช้ Pro 3 วันได้เมื่ออนุมัติการสมัครสมาชิกผ่าน Apple","หากไม่ยกเลิก Apple จะเรียกเก็บราคาที่แสดงหลังสิ้นสุดการทดลองและต่ออายุอัตโนมัติ","หลังทดลองใช้ ต้องมี Pro เพื่อส่งข้อความ ใช้เทมเพลต และโหมดเปรียบเทียบ ไม่มีสิทธิ์ส่งฟรีต่อเนื่อง","การทดลองใช้แบบเก่าในแอปจะไม่คิดเงินหากไม่ได้อนุมัติการสมัครสมาชิก Apple แยกต่างหาก"],"VI":["Người đủ điều kiện có thể dùng thử Pro 3 ngày khi chấp thuận đăng ký qua Apple.","Nếu không hủy, Apple tính phí theo giá hiển thị sau thời gian thử và tự động gia hạn.","Sau khi dùng thử, cần Pro để gửi, dùng mẫu và Chế độ So sánh. Không còn lượt gửi miễn phí định kỳ.","Bản dùng thử cũ trong ứng dụng không bị tính phí nếu chưa phê duyệt đăng ký Apple riêng."],"UK":["Користувачі, які відповідають умовам, починають 3-денну пробну версію Pro після схвалення підписки Apple.","Якщо не скасувати, Apple стягує вказану ціну після пробного періоду та автоматично поновлює підписку.","Після пробного періоду для надсилання, шаблонів і режиму порівняння потрібен Pro. Постійних безкоштовних надсилань немає.","Старі пробні версії застосунку не спричиняють списань без окремого схвалення підписки Apple."],"CS":["Oprávnění uživatelé mohou zahájit 3denní zkušební období Pro schválením předplatného Apple.","Pokud jej nezruší, Apple po zkoušce účtuje zobrazenou cenu a automaticky obnovuje předplatné.","Po zkoušce je pro odesílání, šablony a režim porovnání nutné Pro. Nejsou dostupná průběžná bezplatná odeslání.","Starší zkoušky aplikace nezpůsobují platby bez samostatného schválení předplatného Apple."],"RO":["Utilizatorii eligibili pot începe o probă Pro de 3 zile aprobând un abonament Apple.","Dacă nu este anulat, Apple percepe prețul afișat după probă și reînnoiește automat abonamentul.","După probă este necesar Pro pentru trimiteri, șabloane și Modul Comparare. Nu există trimiteri gratuite recurente.","Probele vechi ale aplicației nu generează plăți fără aprobarea separată a unui abonament Apple."],"HU":["A jogosult felhasználók egy Apple-előfizetés jóváhagyásával 3 napos Pro-próbát indíthatnak.","Lemondás nélkül az Apple a próba után levonja a megjelenített díjat, és automatikusan megújítja az előfizetést.","A próba után a küldéshez, sablonokhoz és összehasonlításhoz Pro szükséges. Nincs folyamatos ingyenes küldési keret.","A régi alkalmazáspróbák külön Apple-előfizetési jóváhagyás nélkül nem járnak terheléssel."],"SK":["Oprávnení používatelia môžu začať 3-dňovú skúšku Pro schválením predplatného Apple.","Ak ho nezrušia, Apple po skúške účtuje zobrazenú cenu a automaticky predlžuje predplatné.","Po skúške je na odosielanie, šablóny a porovnávací režim potrebné Pro. Neexistuje priebežný bezplatný limit odosielania.","Staršie skúšky aplikácie nespôsobujú platby bez osobitného schválenia predplatného Apple."],"HR":["Korisnici koji ispunjavaju uvjete mogu započeti trodnevnu probu Pro odobravanjem Apple pretplate.","Ako se ne otkaže, Apple naplaćuje prikazanu cijenu nakon probe i automatski obnavlja pretplatu.","Nakon probe potreban je Pro za slanje, predloške i način usporedbe. Nema trajnih besplatnih slanja.","Starije probe u aplikaciji ne uzrokuju naplatu bez zasebnog odobrenja Apple pretplate."],"CA":["Les persones elegibles poden començar una prova de Pro de 3 dies autoritzant una subscripció d'Apple.","Si no es cancel·la, Apple cobra el preu mostrat després de la prova i renova automàticament.","Després de la prova, cal Pro per enviar, utilitzar plantilles i el mode Comparació. No hi ha enviaments gratuïts recurrents.","Les proves antigues de l'aplicació no generen càrrecs sense autoritzar una subscripció d'Apple per separat."],"AF":["Geskikte gebruikers kan ’n 3-dae Pro-proef begin deur ’n Apple-intekening goed te keur.","Tensy dit gekanselleer word, hef Apple die aangeduide prys ná die proef en hernu die intekening outomaties.","Ná die proef is Pro nodig vir stuuraksies, sjablone en vergelykingsmodus. Daar is geen deurlopende gratis stuurtoelae nie.","Ouer app-proewe veroorsaak geen heffings sonder afsonderlike Apple-intekeninggoedkeuring nie."],"SW":["Watumiaji wanaostahiki huanza jaribio la Pro la siku 3 kwa kuidhinisha usajili wa Apple.","Usipoghairi, Apple hutoza bei iliyoonyeshwa baada ya jaribio na husasisha usajili kiotomatiki.","Baada ya jaribio, Pro inahitajika kwa kutuma, violezo na Hali ya Kulinganisha. Hakuna mgao wa kutuma bila malipo unaoendelea.","Majaribio ya awali ya programu hayatozwi bila idhini tofauti ya usajili wa Apple."],"HA":["Masu cancanta za su fara gwajin Pro na kwanaki 3 bayan amincewa da biyan kuɗin Apple.","Idan ba a soke ba, Apple zai caji farashin da aka nuna bayan gwaji kuma ya sabunta kai tsaye.","Bayan gwaji, Pro ake bukata don aikawa, samfura da Yanayin Kwatantawa. Babu damar aikawa kyauta ta dindindin.","Tsoffin gwaje-gwajen manhaja ba sa jawo caji ba tare da sabon amincewar biyan kuɗin Apple ba."],"AM":["ብቁ ተጠቃሚዎች የApple ምዝገባን በማጽደቅ የ3 ቀን Pro ሙከራ ይጀምራሉ።","ካልተሰረዘ Apple ከሙከራው በኋላ የታየውን ዋጋ ያስከፍላል እና በራስ-ሰር ያድሳል።","ከሙከራው በኋላ ለመላክ፣ ለአብነቶች እና ለንጽጽር ሁነታ Pro ያስፈልጋል። ቀጣይ ነፃ መላክ የለም።","የቀድሞ የመተግበሪያ ሙከራዎች ያለ ተለየ የApple ምዝገባ ፈቃድ ክፍያ አያስከትሉም።"]};
window._pgSubscriptionPolicy=policy;
const after={"ES":"Después de la prueba de 3 días:","FR":"Après l’essai de 3 jours :","DE":"Nach der 3-tägigen Testphase:","IT":"Dopo la prova di 3 giorni:","PT":"Após o teste de 3 dias:","NL":"Na de proefperiode van 3 dagen:","RU":"После 3-дневной пробы:","ZH":"3 天试用结束后：","ZH_TW":"3 天試用結束後：","JA":"3 日間の試用後：","KO":"3일 체험 후:","AR":"بعد التجربة لمدة 3 أيام:","HI":"3 दिन के ट्रायल के बाद:","BN":"৩ দিনের ট্রায়ালের পর:","TR":"3 günlük denemeden sonra:","PL":"Po 3-dniowej próbie:","SV":"Efter 3 dagars provperiod:","NO":"Etter 3 dagers prøveperiode:","DA":"Efter 3 dages prøveperiode:","FI":"Kolmen päivän kokeilun jälkeen:","EL":"Μετά τη δοκιμή 3 ημερών:","HE":"לאחר ניסיון של 3 ימים:","ID":"Setelah uji coba 3 hari:","MS":"Selepas percubaan 3 hari:","TH":"หลังทดลองใช้ฟรี 3 วัน:","VI":"Sau 3 ngày dùng thử:","UK":"Після триденної пробної версії:","CS":"Po 3denní zkoušce:","RO":"După testul de 3 zile:","HU":"A 3 napos próba után:","SK":"Po 3-dňovej skúške:","HR":"Nakon 3 dana probe:","CA":"Després de la prova de 3 dies:","AF":"Ná die proeftydperk van 3 dae:","SW":"Baada ya majaribio ya siku 3:","HA":"Bayan gwajin kwanaki 3:","AM":"ከ3 ቀናት ሙከራ በኋላ:","EN":"After the 3-day trial:"};
const order=["trial","locked","free","billing"];
function language(){
  return window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():"EN";
}
function patchDictionary(){
  var all=window._pgI18n&&window._pgI18n.dictionary;if(!all)return;
  Object.keys(policy).forEach(function(code){
    var p=policy[code],d=all[code];if(!d)return;
    var title=d.trustC||all.EN.trustC||"3-Day Pro Trial";
    d.prH=title+" · Pro";
    d.prTier1=title;
    d.prName1=title+" · Pro";
    d.prDesc1=p[0];
    d.prSub=p[0]+" "+p[1];
    d.fq6a=p[0]+" "+p[1]+" "+p[2];
    d.fqFreeQ=after[code]||after.EN;
    d.fqFreeA=p[2]+" "+p[3];
    d.showcaseTrial=p[0];
    d.sc1Trial=p[1];
    d.pricingAccessNote=p[3];
    d.pf1a=d.pf2a||all.EN.pf2a;
    d.pf1b=d.pf2b||all.EN.pf2b;
    d.pf1c=d.pf2c||all.EN.pf2c;
    d.pf1d=d.f5||all.EN.f5;
    ["fq1a","fq9q","fq9a"].forEach(function(k){
      if(typeof d[k]==="string")d[k]=d[k].replace(/\b9\b/g,"8");
    });
  });
}
/* Keep answers in the page's 38-language chat synchronized with the pricing funnel. */
function patchChat(){
  var chat=window._pgChatI18n;
  if(!chat||!chat.KBL)return;
  Object.keys(policy).forEach(function(code){
    var p=policy[code],key=code==='ZH_TW'?'ZH-TW':code;
    var entry=chat.KBL[key]||(chat.KBL[key]={});
    var message='**'+(after[code]||after.EN)+'**\n\n'+p[0]+'\n\n'+p[1]+'\n\n'+p[2]+'\n\n'+p[3];
    ['trial','after trial','free plan','how much'].forEach(function(topic){entry[topic]=message;});
    entry.template=p[2];
    entry.download=p[0]+' '+p[1]+' https://apps.apple.com/us/app/poly-glot-ai-workspace/id6804499285';
    var topics=chat.TOPICS[key];if(topics&&topics._afterTrial)topics._freePlan=topics._afterTrial;
    var responses=chat.CHAT_RESPONSES[key];
    if(responses){
      if(responses.greeting)responses.greeting=responses.greeting.replace(/9 AI/g,'8 AI').replace(/9 supported AI providers/gi,'8 supported AI providers');
      if(responses.thanks&&/24.hour|24-hour|24 horas|24 heures|24 Stunden|24時間|24小时|24 小时|24 小時|24시간|24.?час|24.?ساعة/i.test(responses.thanks))responses.thanks=responses.yesno||p[0];
      if(responses.fallback&&/24.hour|24-hour|24 horas|24 heures|24 Stunden|24時間|24小时|24 小時|24시간|24.?час|24.?ساعة|9 AI|free templates|Free:/i.test(responses.fallback))responses.fallback=p[0]+'\n\n'+p[1]+'\n\n'+p[2]+'\n\n'+p[3];
    }
  });
  if(chat.KBL['ZH-TW'])chat.KBL.ZH_TW=chat.KBL['ZH-TW'];
}
function update(el,value){
  if(!el||!value)return;
  if(el.classList&&el.classList.contains("faq-q")){
    var node=Array.prototype.find.call(el.childNodes,function(n){return n.nodeType===3});
    if(node)node.nodeValue=value;
    else el.insertBefore(document.createTextNode(value),el.firstChild);
  }else if(el.textContent!==value){el.textContent=value;}
}
function apply(){
  patchDictionary();
  patchChat();
  var code=language(),p=policy[code]||policy.EN;
  var d=(window._pgI18n&&window._pgI18n.dictionary||{})[code]||{};
  ["prH","prSub","prTier1","prName1","prDesc1","pf1a","pf1b","pf1c","pf1d","fq6a","fqFreeQ","fqFreeA","showcaseTrial","sc1Trial","pricingAccessNote"].forEach(function(key){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){update(el,d[key]);});
  });
  var root=document.getElementById("pg-trial-details");
  if(root){
    [p[0],p[2],p[3],p[1]].forEach(function(t,i){
      update(root.querySelector('[data-pg-trial-detail="'+order[i]+'"]'),t);
    });
    root.setAttribute("aria-label",d.prH||"Apple introductory subscription terms");
  }
  update(document.getElementById("pg-post-trial-heading"),after[code]||after.EN);
  update(document.getElementById("pg-post-trial-benefits"),p[2]);
  update(document.getElementById("pg-post-trial-note"),p[3]);
  update(document.querySelector('#pg-mcp-subscribe [data-pg-sub-t="trial"]'),p[0]+" "+p[1]);
  var cards=document.querySelectorAll("#pg-plan-cards .pricing-card");
  if(cards.length===3){
    var first=cards[0].querySelector(".pricing-price");
    if(first)first.setAttribute("aria-label",p[0]);
  }
  // Value proposition: replace the retired recurring-free-send claim on the third feature chunk.
  var chunks=document.querySelectorAll(".pg-sc1-chunk p");
  if(chunks.length>=3){update(chunks[2],p[2]);}
  // Subpages remain localized by their existing selector; replace only the corrected subscription paragraphs.
  document.querySelectorAll("[data-pg-funnel]").forEach(function(el){
    var kind=el.getAttribute("data-pg-funnel");
    var message={
      trial:p[0]+" "+p[1]+" "+p[3],
      after:p[2]+" "+p[3],
      compare:p[0]+" "+p[1]+" "+p[2],
      templates:p[0]+" "+p[2],
      legacy:p[0]+" "+p[1]+" "+p[3]
    }[kind];
    update(el,message);
  });
  var sel=document.getElementById("pgChat-topic");
  if(sel){var opt=sel.querySelector('option[value="Free plan"]');if(opt)opt.textContent=after[code]||after.EN;}
  var para=document.querySelector('[data-i18n="fq7a"]');
  if(para&&code==="EN")update(para,"Six: type, paste, import, scan, dictate, or use Photo to AI. The UI is available in 38 languages.");
  document.documentElement.setAttribute("data-subscription-funnel-localized",code);
}
var pending=0;
function schedule(){
  if(pending)clearTimeout(pending);
  apply();
  requestAnimationFrame(apply);
  pending=setTimeout(function(){pending=0;apply();},240);
}
patchDictionary();
window.addEventListener("pg:languagechange",schedule);
window.addEventListener("pageshow",schedule);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
window._pgSubscriptionFunnel={locales:Object.keys(policy).length,policy:policy,apply:schedule};
})();
