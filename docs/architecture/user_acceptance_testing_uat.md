# 📋 PMS PLATFORM — USER ACCEPTANCE TESTING (UAT) SPECIFICATION
> **Oliy Ta'lim Muassasasi Talabalar Amaliyotini Boshqarish Platformasining 5 ta Rol Bo'yicha Qabul Qilish Mezonlari**

---

## 1. 🎓 Talaba (Student Acceptance Criteria)
* [x] **UAT-1.1:** Korxonalar katalogidan vakansiyani tanlash va ariza topshirish (`SUBMITTED`).
* [x] **UAT-1.2:** Dekanat tasdiqlashi bilanoq rasmiy QR-kodli 3 tomonlama shartnomani (.pdf/.docx) yuklab olish.
* [x] **UAT-1.3:** Kunlik amaliyot kundaligini (vazifalar, ko'nikmalar, foto/fayllar) veb yoki Telegram botda to'ldirish.
* [x] **UAT-1.4:** Eskirgan kunlar avtomatik qulflanishi (oxirgi kunda ommaviy soxta hisobot yozishning oldi olinishi).
* [x] **UAT-1.5:** Shaxsiy amaliyot ko'rsatkichlari va 100 ballik ECTS natijasini (A/B/C/D) shaffof ko'rish.

---

## 2. 🏢 Korxona Mentori (Mentor Acceptance Criteria)
* [x] **UAT-2.1:** Faqat o'z korxonasiga biriktirilgan talabalarni ko'rish (tijorat siri ta'minlanishi).
* [x] **UAT-2.2:** Kundalikni 1 ta bosishda [✓ Approve] yoki izoh bilan [✕ Reject] qilish (Vebda yoki Telegramda).
* [x] **UAT-2.3:** Kunlik davomatni yangi `LATE` (Kech keldi - 0.75x) holati bilan belgilash.
* [x] **UAT-2.4:** Amaliyot yakunida talabaga 0–5 ball shkalasida baho qo'yish va rasmiy tavsiyanoma yozish.

---

## 3. 👨‍🏫 Kafedra O'qituvchisi (Teacher Acceptance Criteria)
* [x] **UAT-3.1:** O'z kafedrasiga tegishli talabalarning amaliyot kundaliklari va mentor izohlarini masofadan monitoring qilish.
* [x] **UAT-3.2:** Talaba topshirgan yakuniy hisobotni tekshirish va kafedrada himoya o'tkazish.
* [x] **UAT-3.3:** OTM bahosini (0-50 ball) kiritish va umumiy 100 ballik ECTS reytingini (A, B, C, D, F) shakllantirish.

---

## 4. 🏛 Kafedra Mudiri / Dekanat (Deanery Acceptance Criteria)
* [x] **UAT-4.1:** Excel orqali talabalar ro'yxatini yuklash va tizim tomonidan avtomatik unikal `STD-2026-XXXX` ID larining berilishi (HEMIS talab etilmaydi).
* [x] **UAT-4.2:** Hamkor korxonalarni tekshirish va kvotalarni tasdiqlash.
* [x] **UAT-4.3:** Buyruq raqamini kiritib, 3 tomonlama shartnomaning avtomatik generatsiyasini tasdiqlash.
* [x] **UAT-4.4:** Universitet miqyosidagi tahliliy hisobot va davomat monitoringini ko'rish.

---

## 5. 🛡️ Xavfsizlik va Antifraud (Security & Compliance Criteria)
* [x] **UAT-5.1:** Tailgating himoyasi: Talaba mentor nomidan kirib o'ziga tasdiq bosolmasligi (IP/Device kloni tekshiruvi).
* [x] **UAT-5.2:** Intizomiy jarimalar: Kechiktirilgan kundaliklar uchun avtomatik -1 ball jarima chegirilishi (`penalty_records`).
* [x] **UAT-5.3:** Dizayn qat'iyligi: Oq minimalistik toza interfeys qoidalariga 100% moslik.

---

## 🏁 Xulosa:
Barcha 18 ta mezon to'liq bajarildi va sinovdan muvaffaqiyatli o'tdi (**UAT STATUS: 100% PASSED**).
Loyiha Davlat Attestatsiya Komissiyasi (BMI himoyasi) va OTMda ishlab chiqarishga (Production) qabul qilishga to'liq tayyor.
