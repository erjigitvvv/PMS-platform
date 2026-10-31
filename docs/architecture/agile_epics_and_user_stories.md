# 📋 PMS PLATFORM — AGILE EPICS & DETAILED USER STORIES SPECIFICATION
> **Oliy Ta'lim Muassasasi Talabalar Amaliyotini Boshqarish Tizimi (6 ta Epik va 15 ta Foydalanuvchi Hikoyasi)**

---

## 🎯 EPIC 1: Autentifikatsiya va 5 ta Rol Ruxsatlari (Auth & RBAC)
* **US-1.1 (Yagona Kirish):** Foydalanuvchi sifatida bitta `/login` oynasida kirib, o'z rolimga mos panelga yo'naltirilishni xohlayman.
* **US-1.2 (Ruxsatlar Himoyasi):** Talaba sifatida faqat o'z ma'lumotlarimni ko'rishni, boshqa rollar funksiyasiga kira olmaslikni xohlayman (403 Forbidden).

---

## 🎯 EPIC 2: Hamkor Korxonalar va Amaliyot Arizalari
* **US-2.1 (Vakansiya Tanlash):** Talaba sifatida katalogdan o'z sohamga mos korxonani tanlab ariza yuborishni xohlayman (`SUBMITTED`).
* **US-2.2 (Mustaqil Korxona Taklif Qilish):** Talaba sifatida o'zim topgan yangi korxona rekvizitlarini (STIR, rahbar, telefon) kiritishni xohlayman.

---

## 🎯 EPIC 3: Qog'ozsiz 3 Tomonlama Shartnomalar
* **US-3.1 (Avtomatik PDF/DOCX Generatsiyasi):** Dekanat arizani tasdiqlashi bilan tizim unikal QR-kodli rasmiy 3 tomonlama shartnomani generatsiya qilishini xohlayman.

---

## 🎯 EPIC 4: Raqamli Kundalik va Davomat (Telegram Bot Integratsiyasi)
* **US-4.1 (Telegram Botda Kundalik Yozish):** Talaba sifatida `@tiupm_bot` orqali vazifa, ko'nikma va ish joyi fotosuratini 1 daqiqada yuborishni xohlayman.
* **US-4.2 (Mentorning 1-Click Tasdiqlashi):** Mentor sifatida Telegramdagi `[✅ Tasdiqlash]` tugmasini bitta bosish orqali hisobotni tasdiqlashni xohlayman.
* **US-4.3 (Davomatda LATE - Kech Keldi):** Mentor sifatida kech kelgan talabalarni `[🟡 Kech keldi]` (0.75x) holatida qayd etishni xohlayman.

---

## 🎯 EPIC 5: 100 Ballik Baholash va Excel Analitikasi
* **US-5.1 (Mentor 0-5 Balli):** Mentor sifatida 0 dan 5 gacha baho qo'yishni va tizim uni 50 ballik ekvivalentga aylantirishini xohlayman.
* **US-5.2 (OTM Himoyasi va ECTS Natija):** Ustoz sifatida 0-50 ball qo'yib, jami 100 ballik ECTS reytingini (A, B, C, D, F) shakllantirishni xohlayman.
* **US-5.3 (Excel Ommaviy Import va Student ID):** Dekanat sifatida talabalarni Exceldan yuklab, tizim avtomatik `STD-2026-XXXX` ID lar berishini xohlayman.

---

## 🎯 EPIC 6: Antifraud, Tailgating va Jarimalar
* **US-6.1 (Anti-Tailgating Nazorati):** Talaba mentor nomidan kirib o'ziga tasdiq bosolmasligi uchun IP va qurilma klonlari avtomatik fosh qilinishini xohlayman.
* **US-6.2 (Intizomiy Jarimalar):** Kechiktirilgan kundaliklar uchun avtomatik -1 ball jarima chegirilishini xohlayman.
