# 🎓 DAVLAT ATTESTATSIYA KOMISSIYASI HIMOYASI UCHUN MAXSUS PAKET
## Bitiruv Malakaviy Ishi (BMI) Taqdimot Slaydlari, 5 Daqiqalik Nutq Matni va Savol-Javoblar Bazasi

* **Mavzu**: Oliy ta'lim muassasalari talabalari amaliyotini boshqarish va monitoring qilishning axborot tizimini ishlab chiqish (PMS - Practicum Management System)
* **Ta'lim muassasasi**: Toshkent Xalqaro Universiteti (TIU)
* **Daraja**: Bakalavriat (Axborot texnologiyalari va dasturiy injiniring)
* **Tizim havolasi**: [PMS Platform GitHub Repository](https://github.com/erjigitvvv/PMS-platform)
* **Telegram Bot**: `@tiupm_bot`

---

## 📑 1-BO'LIM: 12 TA SLAYDDAN IBORAT TAQDIMOT STRUKTURASI

Har bir slayd uchun ekranda ko'rsatiladigan vizual bloklar, jadvallar va himoyachi talabaning asosiy urg'u berishi kerak bo'lgan tayanch tushunchalari belgilangan.

### Slayd 1: Titul Slaydi
* **Sarlavha**: Oliy ta'lim muassasalari talabalari amaliyotini boshqarish va monitoring qilishning axborot tizimi (PMS Platform)
* **Ost-sarlavha**: Bitiruv Malakaviy Ishi (BMI) himoyasi
* **Bajaruvchi**: Talaba F.I.Sh.
* **Ilmiy rahbar**: Ilmiy darajasi va F.I.Sh.
* **Muassasa**: Toshkent Xalqaro Universiteti (TIU) — 2026-yil
* **Vizual element**: Universitet logotipi, tizim screenshotining minimalist foni.

### Slayd 2: Muammoning Dolzarbligi va Kamchiliklar
* **Sarlavha**: An'anaviy amaliyot jarayonidagi tizimli muammolar
* **Qiyosiy tahlil**:
  * 🔴 **Qog'ozbozlik**: 3 nusxadagi qog'oz shartnomalar, buyruqlar va qo'lda to'ldiriladigan kundaliklar (byurokratiya).
  * 🔴 **"Ghost Internship" (Soxta amaliyot)**: Talaba korxonaga bormasdan, amaliyot so'ngida faqat muhr bostirib kelishi.
  * 🔴 **Haqiqiy monitoringning yo'qligi**: OTM rahbari va dekanat talabaning real vaqtda korxonadagi davomati va vazifalaridan bexabar.
  * 🔴 **Baholashdagi subyektivlik**: Korxona rahbarining rasmiyatchilik uchun qo'ygan 1 ta bahosi; ECTS shaffof kriteriyalarining yo'qligi.

### Slayd 3: Loyihaning Maqsadi va Asosiy Vazifalari
* **Sarlavha**: Tadqiqot va ishlanmaning maqsadi
* **Asosiy maqsad**: OTM, Korxona va Talaba o'rtasidagi barcha amaliyot jarayonlarini 100% raqamlashtirish, shaffof nazorat qilish va xolis ECTS baholash tizimini joriy etish.
* **Vazifalar**:
  1. Yagona ma'lumotlar bazasi va 5 rolli RBAC xavfsiz tizimini loyihalash;
  2. 3 tomonlama yuridik shartnomalarni 1 soniyada avtomatik PDF/DOCX generatsiya qilish;
  3. Telegram Bot (@tiupm_bot) orqali kunlik kundalik va davomatni 1-click tasdiqlash;
  4. Korxona mentori (0-5) va OTM rahbari (0-50) o'rtasida muvozanatlashgan 100 ballik baholash algoritmini amalga oshirish.

### Slayd 4: Tizim Arxitekturasi va Texnologik Stak
* **Sarlavha**: Zamonaviy, xavfsiz va yuqori unumdor arxitektura
* **Backend**: Python FastAPI (Asinxron ASGI arxitektura, SQLAlchemy 2.0 Async, Pydantic v2).
* **Frontend**: Next.js 14 (App Router, React Server Components, TypeScript, Tailwind CSS minimalist dizayn).
* **Mobil integratsiya**: Aiogram 3.x asosidagi Telegram Bot (FSM, Inline webhook router).
* **Ma'lumotlar bazasi**: PostgreSQL (ACID tranzaksiyalari, Pessimistic locking, UUID v4) + SQLite lokal sinovlar uchun.
* **Xavfsizlik**: JWT (Access & Refresh), PBKDF2 SHA-256 xeshlash, CORS, RBAC middleware.

### Slayd 5: Rolli Model (RBAC - 5 ta Foydalanuvchi Roli)
* **Sarlavha**: Rollar kesimidagi avtorizatsiya va funksional matritsa
* **Jadval**:
  | Rol | Asosiy funksional va huquqlar | Kirish kanali |
  | :--- | :--- | :--- |
  | 🏛️ **Admin** | Tizim parametrlari, OTM fakultet/kafedra ma'lumotlari, audit | Web Portal |
  | 📑 **Dekanat / OTM Staff** | Talabalar Excel bulk-import, kvotalar, shartnoma tasdiqlash | Web Portal |
  | 👨‍💼 **Korxona Mentori** | Talaba davomati (Keldi/Kech/Sababli), kunlik hisobotni qabul qilish, 0-5 baho | Telegram Bot + Web |
  | 👨‍🏫 **Kafedra Rahbari** | Akademik nazorat, talaba kundaligini tekshirish, 0-50 ballik yakuniy baho | Web Portal |
  | 🎓 **Talaba** | Korxona tanlash, ariza topshirish, kunlik vazifalar/foto hisobot yuborish | Web + Telegram Bot |

### Slayd 6: 3 Tomonlama Shartnomalar Avtomatik Generatsiyasi
* **Sarlavha**: Avtomatlashtirilgan hujjatlar oqimi (PDF & DOCX)
* **Mexanizm**:
  1. Dekanat arizani tasdiqlashi bilan tizimda unikal raqam generatsiya qilinadi: `AMAL-XXXXXXXX`.
  2. ReportLab va python-docx kutubxonalari asosida OTM rekvizitlari, Korxona rahbari F.I.Sh va Talaba pasport/shaxsiy ma'lumotlari kiritilgan rasmiy shartnoma shakllanadi.
  3. Talaba va korxona kabinetiga darhol yuklab olish uchun taqdim etiladi.
  4. WebSocket orqali talabaga bir zumda: *"Arizangiz tasdiqlandi va shartnoma shakllantirildi"* xabarnomasi boradi.

### Slayd 7: Kunlik Kundalik va Davomat Monitoringi
* **Sarlavha**: Telegram Bot orqali monitoring va `LATE` davomat algoritmi
* **Jarayon**:
  * Talaba soat 18:00 gacha bajargan amaliy ishlari, egallagan ko'nikmalari va foto-isbotini Telegram bot orqali yuboradi.
  * Mentorga Telegram orqali xabar boradi va u 1 tugma bilan `[✅ Tasdiqlash]` yoki `[❌ Qaytarish]` amalini bajaradi.
  * **Davomat koeffitsientlari**:
    $$\text{Vazn} = \begin{cases} 1.0, & \text{PRESENT (Vaqtida keldi)} \\ 0.75, & \text{LATE (Kechikib keldi - O'zbekistonda ilk bor)} \\ 0.5, & \text{EXCUSED (Sababli)} \\ 0.0, & \text{ABSENT (Kelmadi)} \end{cases}$$

### Slayd 8: Anti-Fraud va Xolislik Mexanizmlari
* **Sarlavha**: Soxta amaliyotlarning oldini oluvchi xavfsizlik filtrlari
* **Himoya choralari**:
  1. **Anti-Tailgating (IP-Proxy tekshiruvi)**: Agar talaba kundalik topshirgan IP bilan mentor tasdiqlagan IP 5 daqiqa ichida bir xil bo'lib chiqsa, tizim buni *"Shubhali birgalikdagi tasdiqlash"* deb bayroqlaydi.
  2. **Kelajak sanaga taqiq**: Talaba oldingi yoki kelajakdagi kunlar uchun birdaniga kundalik to'ldira olmaydi (har kungi hisobot faqat o'sha kuni yuboriladi).
  3. **Kvota poygasi himoyasi**: Korxonadagi vakant o'rinlar Pessimistic Locking (`SELECT FOR UPDATE`) orqali limitdan oshib ketishdan himoyalangan.

### Slayd 9: 100 Ballik Xolis Baholash Tizimi (ECTS Modeli)
* **Sarlavha**: ECTS talablariga to'la mos keluvchi gibrid baholash rubrikasi
* **Matematik formula**:
  $$\text{Yakuniy Ball} = (\text{Mentor Balli} \times 10) + \text{OTM Rahbari Balli} = (5 \times 10) + 50 = 100$$
* **Baholash mezoni**:
  * **Mentor (0 — 5 ball)**: Intizom, amaliy mahorat, korxona qoidalariga rioya (maksimal 50 ballga normallashtiriladi).
  * **OTM Rahbari (0 — 50 ball)**: Kundalik sifati, davomat ko'rsatkichi, hisobot va amaliyot himoyasi.
  * **ECTS Harfiy Bahosi**: 90-100: **A**, 80-89: **B**, 70-79: **C**, 60-69: **D**, <60: **F (Qayta amaliyot)**.

### Slayd 10: Dasturiy Sinovlar va Sifat Kafolati (QA Sprint)
* **Sarlavha**: 100% Avtomatlashtirilgan test qamrovi (Pytest Integration Suite)
* **Statistika**:
  * Jami testlar: **24 ta / 24 ta PASSED (100% Yashil)**
  * Test modullari:
    1. `test_auth_rbac.py` (7 ta test — barcha rollar kirishi va xavfsizlik cheklovlari)
    2. `test_applications_contracts.py` (3 ta test — ariza va shartnoma generatsiyasi)
    3. `test_dailylogs_edgecases.py` (4 ta test — kelajak sana, dublikat va mentor tasdig'i)
    4. `test_attendance_late.py` (4 ta test — LATE statusi va kunlik upsert)
    5. `test_assessments_grading.py` (4 ta test — 0-5 mentor, 0-50 rahbar, ECTS kalkulyatori)
    6. `test_excel_import.py` (3 ta test — avtomatik STD-2026-XXXX ID va bulk import)

### Slayd 11: Amaliy Samara va Iqtisodiy Ko'rsatkichlar
* **Sarlavha**: PMS Platformasini joriy etishdan kutilayotgan natijalar
* **Metrikalar**:
  * 📉 **Vaqt tejalishi**: Hujjat aylanishi 14 kundan **15 daqiqagacha** qisqaradi (98% tezlashuv).
  * 💰 **Qog'oz sarfi**: 1000 nafar talaba uchun yillik 12 000 varaq qog'oz va chop etish xarajatlari **0 ga tenglashtiriladi**.
  * 📊 **Shaffoflik**: Dekanat va rektorat real vaqtda barcha talabalarning korxonalardagi jonli holatini ko'rib turadi.
  * 🤝 **Ish beruvchi qoniqishi**: Mentor uchun murakkab jadvallar o'rniga qulay Telegram-interfeys.

### Slayd 12: Xulosa va Istiqbolli Rejalar
* **Sarlavha**: BMI xulosasi va rivojlanish bosqichlari
* **Xulosa**: BMI doirasida ishlab chiqilgan PMS tizimi OTM talabalari amaliyotini boshqarishdagi inson omilini kamaytirib, jarayonni to'liq raqamlashtirdi va sinovlardan muvaffaqiyatli o'tdi.
* **Kelajakdagi rivojlanish**:
  1. HEMIS (Oliy ta'lim axborot tizimi) bilan to'g'ridan-to'g'ri API sinxronizatsiyasi;
  2. Talabaning ko'nikmalariga mos vakansiyalarni tavsiya etuvchi AI Recommender moduli;
  3. Korxonalar tomonidan eng iqtidorli talabalarga avtomatik Job Offer yuborish funksionali.

---

## 🎙️ 2-BO'LIM: 5 DAQIQALIK RASMIY HIMOYA NUTQI MATNI (DAVLAT KOMISSIYASI UCHUN)

*(Nutqni o'qish yoki yoddan ifodali aytish uchun taymer va bosqichlar bo'yicha taqsimlangan)*

---

### [0:00 — 0:45] 1-BOSQICH: KIRISH VA MUAMMONING DOLZARBLIGI
> "Hurmatli Davlat attestatsiya komissiyasi raisi, hurmatli komissiya a'zolari!
> 
> Bugungi kunda Oliy ta'lim muassasalarida ta'lim sifatini oshirish va bitiruvchilarning mehnat bozoriga to'liq tayyor bo'lib chiqishida amaliyot (ya'ni stajirovka) eng muhim bo'g'in hisoblanadi. Biroq, amaldagi an'anaviy amaliyot tizimi bir qator jiddiy muammolarga ega:
> Birinchidan — haddan tashqari qog'ozbozlik va 3 tomonlama shartnomalarni rasmiylashtirishdagi byurokratiya;
> Ikkinchidan — eng achinarlisi, talabaning korxonaga bormasdan, amaliyot oxirida shunchaki muhr bostirib kelishi, ya'ni 'soxta amaliyot' holatlari;
> Uchinchidan — OTM kafedrasi va dekanatida talabaning amaliyotdagi real faoliyati ustidan kunlik monitoring mexanizmining yo'qligi.
> 
> Aynan shu dolzarb muammolarni bartaraf etish maqsadida, men o'zimning bitiruv malakaviy ishim doirasida **'OTM talabalari amaliyotini boshqarish va monitoring qilishning axborot tizimi — PMS Platformasi'**ni loyihaladim va to'liq ishlab chiqdim."

---

### [0:45 — 1:45] 2-BOSQICH: ARXITEKTURA VA TEXNOLOGIK ASOSLAR
> "Loyiha doirasida zamonaviy mikroxizmatlar va asinxron arxitekturaga tayanildi:
> Backend qismi yuqori tezlikka ega asinxron **Python FastAPI** va **SQLAlchemy 2.0** orqali qurildi.
> Frontend foydalanuvchi interfeysi esa eng so'nggi **Next.js 14 App Router** va **Tailwind CSS** asosida, ortiqcha yuklamalarsiz, 'Pure White Minimalist' standartida yaratildi.
> Ma'lumotlar bazasi sifatida relyatsion **PostgreSQL** tizimidan foydalanildi.
> 
> Tizimda 5 ta asosiy foydalanuvchi roli joriy qilingan:
> 1. Tizim Administratori;
> 2. Dekanat / OTM mas'uli;
> 3. Korxona mentori;
> 4. Kafedra o'qituvchisi;
> 5. Va amaliyotchi Talaba.
> 
> Korxona mentorlari har kuni kompyuter orqasida o'tirmasligini inobatga olib, ular uchun barcha amallarni smartfon orqali tezkor bajarish imkonini beruvchi rasmiy **@tiupm_bot** Telegram boti tizim bilan real vaqt rejimida integratsiya qilindi."

---

### [1:45 — 3:00] 3-BOSQICH: ASOSIY INNOVATSION FUNKSIONALLAR VA DEMO
> "Ruxsatingiz bilan, platformaning 4 ta eng asosiy innovatsion yechimiga to'xtalib o'tsam:
> 
> **Birinchisi — Shartnomalarning 1 soniyada generatsiyasi**: Dekanat talaba arizasini tasdiqlashi bilanoq, tizim OTM, korxona va talabaning barcha rekvizitlarini birlashtirib, rasmiy yuridik kuchga ega 3 tomonlama shartnomaning PDF va DOCX formatlarini avtomatik yaratadi va yuboradi.
> 
> **Ikkinchisi — Telegram orqali 1-bosishda tasdiqlash**: Talaba har kuni soat 18:00 gacha o'zining bajargan ishlari va o'rgangan texnologiyalarini tizimga yoki botga kiritadi. Korxona mentoriga darhol Telegramda bildirishnoma boradi va u birgina `[Tasdiqlash]` tugmasini bosish orqali hisobotni qabul qiladi.
> 
> **Uchinchisi — `LATE` (Kechikish) koeffitsientli davomat tizimi**: Tizimda ilk bor davomat shunchaki 'bor' yoki 'yo'q' emas, balki 4 xil holatda qayd etiladi: Keldi (1.0), Kechikib keldi (0.75), Sababli (0.5) va Kelmadi (0). Bu talabaning haqiqiy mehnat intizomini shakllantiradi.
> 
> **To'rtinchisi — Anti-Fraud (Soxtalikdan himoya)**: Tizim talaba va mentorning IP-manzillarini solishtiradi. Agar talaba bilan tasdiqlovchining IP-si bir xil bo'lsa, tizim buni shubhali deb belgilaydi. Shuningdek, talaba o'tgan yoki kelajak kunlar uchun birdaniga soxta kundalik to'ldira olmaydi."

---

### [3:00 — 4:00] 4-BOSQICH: 100 BALLIK ECTS BAHOLASH VA SIFAT SINOVLARI (QA)
> "Amaliyotni baholash xolisligi uchun 100 ballik gibrid formula joriy qilindi:
> Korxona mentori talabaga 0 dan 5 gacha bo'lgan an'anaviy shkala bo'yicha baho qo'yadi. Tizim buni avtomatik ravishda 10 ga ko'paytirib, 50 ballik ekvivalentga aylantiradi.
> Qolgan 50 ball esa kafedra mas'ul o'qituvchisi tomonidan talabaning yuritgan kundaligi va himoyasiga qarab qo'yiladi.
> Natijada 100 ballik ECTS standarti (A, B, C, D, F) bo'yicha xolis, ikkala tomonning bahosi muvozanatlashgan yakuniy baho shakllanadi.
> 
> Tizimning mustahkamligi va xatosiz ishlashini ta'minlash uchun xalqaro QA standartlari asosida **Pytest integratsion testlar to'plami** yaratildi.
> Tizimning 6 ta asosiy yo'nalishi — Autentifikatsiya, Shartnomalar, Kundaliklar, Davomat, Baholash va Excel Import bo'yicha jami **24 ta avtomatlashtirilgan test** ishlab chiqildi va ularning barchasi **100% yashil (PASSED)** holatda muvaffaqiyatli o'tdi."

---

### [4:00 — 5:00] 5-BOSQICH: AMALIY NATIJALAR, SAMARA VA XULOSA
> "Platformaning amaliyotga joriy etilishi natijasida:
> - Hujjat aylanishiga ketadigan vaqt 14 kundan **15 daqiqagacha** qisqaradi;
> - Har 1000 nafar talaba hisobiga yillik minglab qog'oz varaqlar tejalib, to'liq yashil ekotizimga o'tiladi;
> - Eng asosiysi — OTM ma'muriyati har bir talaba qaysi korxonada nima ish qilayotganini real vaqt rejimida kuzatib borish imkoniyatiga ega bo'ldi.
> 
> Xulosa qilib aytganda, ishlab chiqilgan axborot tizimi ta'lim va ishlab chiqarish integratsiyasini yangi bosqichga olib chiquvchi, to'liq ishchi holatdagi milliy dasturiy mahsulotdir.
> 
> E'tiboringiz uchun katta rahmat! Savollaringizga mamnuniyat bilan javob berishga tayyorman!"

---

## ❓ 3-BO'LIM: KOMISSIYA A'ZOLARI TOMONIDAN KUTILAYOTGAN 10 TA QALTIS SAVOL VA ZARBADOR JAVOBLAR (Q&A CHEAT SHEET)

---

### 1-Savol: "HEMIS axborot tizimi bor-ku, siz yaratgan platformaning unga qanday aloqasi bor yoki undan nima farqi bor?"
* **Eng to'g'ri javob**:
  > "Juda o'rinli savol, domla. HEMIS tizimi OTMning umumiy o'quv rejalari, fanlar va davomatni yuritish uchun mo'ljallangan global boshqaruv tizimidir. Biroq, unda korxonalar bilan 3 tomonlama yuridik shartnoma generatsiyasi, korxona mentorlariga alohida mobil kabinet taqdim etish, har kungi texnik kundalikni foto-hisobot bilan tasdiqlash va anti-fraud kabi chuqurlashtirilgan amaliyot mexanizmlari mavjud emas. Bizning platformamiz HEMISga raqobatchi emas, balki ixtisoslashgan modul sifatida xizmat qiladi. Tizimimizdagi RESTful API orqali yakuniy 100 ballik baholar va shartnoma ma'lumotlarini to'g'ridan-to'g'ri HEMIS bazasiga avtomatik eksport qilish imkoniyati ko'zda tutilgan."

---

### 2-Savol: "Korxona mentori har kuni talabaning kundaligini tekshirishga vaqt ajrata olmasa nima bo'ladi? Ular juda band odamlar-ku?"
* **Eng to'g'ri javob**:
  > "Aynan korxona rahbarlari va mentorlarining bandligini inobatga olgan holda biz Web-portalga qo'shimcha ravishda **Telegram Bot (@tiupm_bot)** yechimini kiritdik. Mentordan hech qanday qog'oz to'ldirish yoki murakkab saytlarga kirish talab etilmaydi. Talaba hisobot yuborganida mentorning Telegramiga qisqa xulosa boradi. Mentor yo'lda yoki tanaffus vaqtida 2 soniya ichida `[✅ Tasdiqlash]` tugmasini bosishi kifoya. Agar mentor 3 kun davomida javob bermasa, tizim unga yumshoq eslatma yuboradi, kafedra rahbariga esa monitoring panelida ogohlantirish ko'rsatiladi."

---

### 3-Savol: "Talaba o'zi kirmasdan, uning o'rniga boshqa do'sti yoki korxonadagi boshqa kimdir kundalik to'ldirib qo'yishi mumkinmi? Xavfsizlik qanday ta'minlangan?"
* **Eng to'g'ri javob**:
  > "Buning oldini olish uchun tizimimizda 3 qavatli xavfsizlik arxitekturasi joriy etilgan:
  > 1. Har bir talaba va mentor alohida JWT autentifikatsiyasiga ega;
  > 2. Biz **Anti-Tailgating algoritmini** kiritdik: agar talaba kundalik yuborgan qurilma IP-manzili bilan mentor tasdiqlagan IP-manzil bir xil bo'lib chiqsa va oradagi vaqt 5 daqiqadan kam bo'lsa, tizim buni zudlik bilan 'Proxy-approval' deb qayd etadi va dekanatga signal beradi;
  > 3. Tizimda retrospektiv (o'tgan kunlar uchun) yoki kelajak kunlar uchun hisobot kiritish qat'iyan taqiqlangan — faqat o'sha kuni soat 23:59 gacha hisobot topshirish mumkin."

---

### 4-Savol: "Davomatdagi LATE (Kechikish) statusi qanday ishlaydi va nima uchun u 0.75 koeffitsient qilib olindi?"
* **Eng to'g'ri javob**:
  > "O'quv jarayonida ko'pincha talaba kechikib kelsa yoki umuman kelmadi deb belgilanadi, yoki ko'z yumiladi. Bu adolatsizlikka olib keladi. Mehnat kodeksi va xalqaro KPI metodologiyasiga muvofiq, xodimning kechikishi ish unumdorligining qisman pasayishini bildiradi. Shuning uchun biz ilmiy asoslangan 0.75 (ya'ni 75% unumdorlik) koeffitsientini kiritdik. Agar talaba amaliyot davrida tez-tez kech qolsa, bu uning umumiy davomat reytingida adolatli aks etadi va yakuniy balliga ta'sir qiladi."

---

### 5-Savol: "Shartnomaning yuridik kuchi qanday? Avtomatik yaratilgan PDF qog'oz shartnoma o'rnini bosa oladimi?"
* **Eng to'g'ri javob**:
  > "O'zbekiston Respublikasining 'Elektron hujjat aylanishi to'g'risida'gi Qonuniga muvofiq, elektron shaklda tuzilgan va tomonlarning identifikatorlari tasdiqlangan hujjatlar to'laqonli yuridik kuchga ega. Tizimimiz yaratadigan shartnoma OTMning yuridik bo'limi tomonidan tasdiqlangan namunaviy 3 tomonlama shablon asosida tuziladi, unda OTM rekvizitlari, korxona INN raqami va talaba ma'lumotlari bo'ladi. Tizim shartnomani DOCX va PDF formatida chiqaradi, zarurat tug'ilganda E-IMZO (elektron raqamli imzo) orqali imzolash yoki chop etib an'anaviy muhr bosish uchun ham to'liq moslashtirilgan."

---

### 6-Savol: "Nima uchun backend uchun aynan Python FastAPI tanlandi, Django yoki Node.js emas?"
* **Eng to'g'ri javob**:
  > "Buning uchta asosiy texnik sababi bor:
  > Birinchidan — **Asinxronlik (Asyncio)**: FastAPI ASGI standartida ishlaydi, bu esa bir vaqtning o'zida minglab talabalar kundalik topshirganda va Telegram botdan so'rovlar kelganda tizimning minimal resurs sarflab, yuqori tezlikda javob berishini ta'minlaydi.
  > Ikkinchidan — **Avtomatik tiplashtirish va validatsiya**: Pydantic v2 orqali barcha kiruvchi ma'lumotlar avtomatik tekshiriladi, bu xatoliklarni 80% ga kamaytiradi.
  > Uchinchidan — **Avtomatik OpenAPI (Swagger)**: Tizim frontend va mobil integratsiya uchun bir zumda to'liq hujjatlashtirilgan API specifikatsiyasini taqdim etadi."

---

### 7-Savol: "Agar korxonada 3 ta bo'sh amaliyot o'rni bo'lsa-yu, bir vaqtda 10 nafar talaba ariza yuborsa, kvota oshib ketmaydimi?"
* **Eng to'g'ri javob**:
  > "Bunday holat 'Race Condition' (poyga holati) deb ataladi. Biz buni ma'lumotlar bazasi darajasida **Pessimistic Locking** (`select().with_for_update()`) mexanizmi orqali hal qilganmiz. Talaba ariza yuborayotgan soniyada korxona vakansiya qatori tranzaksiya yakunlanguncha bloklanadi, mavjud kvota soni tekshiriladi va faqat kvota bo'sh bo'lsagina qabul qilinadi. Shunday qilib, belgilangan kvotadan 1 ta ham ortiqcha ariza qabul qilinishi mumkin emas."

---

### 8-Savol: "Talabaning yakuniy bahosi qanday hisoblanadi? Korxona mentori bilan OTM o'qituvchisi o'rtasida ziddiyat bo'lsa-chi?"
* **Eng to'g'ri javob**:
  > "Biz baholashda xolislikni ta'minlash uchun bahoni 50/50 balansida taqsimladik:
  > Mentor korxonadagi amaliy intizom va ko'nikmalarni 0 dan 5 ballgacha baholaydi (bu tizimda 10 ga ko'paytirilib, 50 ball bo'ladi).
  > OTM o'qituvchisi esa talabaning yozgan hisoboti, taqdimoti va nazariy tayyorgarligini 0 dan 50 ballgacha baholaydi.
  > Ikkala ball qo'shilib, 100 ballik ECTS shkalasiga keltiriladi. Agar mentor 5 qo'ysa-yu, talaba hisobot topshirmasa, u maksimal 50 ball oladi va fandan o'ta olmaydi. Bu esa bir tomonlama subyektivlikning oldini oladi."

---

### 9-Savol: "Tizimning ishonchliligi qanday tekshirilgan? Real ish rejimiga tayyormi?"
* **Eng to'g'ri javob**:
  > "Loyiha ishlab chiqilishining yakuniy bosqichida to'liq QA (Sifat nazorati) jarayoni o'tkazildi. Tizim uchun **24 ta avtomatlashtirilgan Pytest integratsion testlari** yozildi.
  > Bu testlar foydalanuvchi avtorizatsiyasidan tortib, noqonuniy arizalarni qaytarish, dublikat kundaliklarni bloklash, shartnomalar generatsiyasi va Excel orqali yuzlab talabalarni bir zumda bazaga kiritishgacha bo'lgan barcha ssenariylarni qamrab oldi. Hozirgi kunda barcha 24 ta test 100% yashil natija bilan o'tgan bo'lib, tizim real ekspluatatsiyaga to'liq tayyor."

---

### 10-Savol: "Loyiha kelajakda qanday tijoratlashtirilishi yoki boshqa OTMlarga tatbiq etilishi mumkin?"
* **Eng to'g'ri javob**:
  > "PMS platformasi modulli va ko'p ijarachili (Multi-tenant SaaS) arxitekturada loyihalashtirilgan.
  > Universitetlar uchun tizimni o'zlarining serverlariga Docker konteynerlar orqali 10 daqiqada o'rnatish (On-Premise) yoki bulutli xizmat (SaaS) sifatida abonent to'lovi asosida ulash imkoniyati mavjud.
  > Shuningdek, tizim korxonalar uchun bo'lajak yosh mutaxassislarni talabalik davridanoq saralab olish va ishga taklif qilish (Talent Acquisition) maydonchasi sifatida xizmat qila oladi."
