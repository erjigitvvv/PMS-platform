# 🛡 PMS PLATFORM — COMPREHENSIVE RISK MANAGEMENT MATRIX
> **OTM Talabalar Amaliyotini Boshqarish Tizimida Foydalanish Risklar Tahlili va Himoya Mexanizmlari**

---

## 1. 🎓 TALABA UCHUN RISKLAR
1. **Soxta korxona kiritish xavfi (Yuqori):**
   * *Yechim:* Korxona STIR (INN) raqami majburiy tekshiriladi; Dekanat tasdiqlamaguncha ariza amaliyotga aylanmaydi.
2. **Kundalikni oxirgi kunda to'plash (Yuqori):**
   * *Yechim:* Qat'iy sanalar validatsiyasi. O'tib ketgan eski kunlar uchun kundalik yozish tizim tomonidan avtomatik bloklanadi.
3. **Plagiat va ko'chirmachilik (O'rta):**
   * *Yechim:* Yuklangan fayllarning SHA256 xeshini solishtirish; foto-hisobot yuklash majburiyati.

---

## 2. 🏢 KORXONA MENTORI UCHUN RISKLAR
1. **Vaqt yetishmasligi va befarqlik (Yuqori):**
   * *Yechim:* Saytga kirmasdan Telegram Bot orqali 1 ta bosishda [✓ Approve] qilish imkoniyati.
2. **Subyektiv yoki ko'r-ko'rona baholash (O'rta):**
   * *Yechim:* 3 ta aniq rubrika mezonlari (Intizom: 15b, Vazifa: 20b, Ko'nikma: 15b) va majburiy taqriz kiritish.
3. **Parolni talabaga berib yuborish xavfi (Yuqori):**
   * *Yechim:* IP-manzil va brauzer audit logini yuritish; talaba va mentor IP manzili bir xil bo'lsa shubhali faoliyat qayd etiladi.

---

## 3. 👨‍🏫 KAFEDRA O'QITUVCHISI UCHUN RISKLAR
1. **Masofaviy nazoratning susayishi (O'rta):**
   * *Yechim:* Tizim orqali har haftalik avtomatik davomat va muammolar hisoboti o'qituvchiga yetkaziladi.
2. **Baholashdagi korrupsiya va shaxsiy munosabat (Yuqori):**
   * *Yechim:* O'qituvchining bahosi 50 balldan oshmaydi; korxona mentori qo'ygan 50 ballga ustoz aralasha olmaydi.
3. **Katta guruhlar yuklamasi (O'rta):**
   * *Yechim:* 60 kunlik kundaliklar bitta ixcham "Summary Sheet" ko'rinishida xulosalanadi.

---

## 4. 🏛 KAFEDRA MUDIRI / DEKANAT UCHUN RISKLAR
1. **Excel formatdagi xatoliklar (Yuqori):**
   * *Yechim:* Atomik import; xato qatorlar alohida ro'yxat qilinadi, to'g'ri talabalar esa bazaga muvaffaqiyatli commit bo'ladi.
2. **Rektorat buyruqlarining kechikishi (O'rta):**
   * *Yechim:* "Dastlabki ruxsat" (Conditional) maqomi, buyruq raqami kiritilishi bilan PDF avtomatik yangilanadi.

---

## 5. 👑 SUPER ADMIN VA TIZIM INFRATUZILMASI RISKLARI
1. **Ma'lumotlar yo'qolishi (Yuqori):**
   * *Yechim:* PostgreSQL kunlik avtomatik Cron Backup (Zaxira nusxasi).
2. **Cho'qqi yuklamalar (Peak Traffic) (O'rta):**
   * *Yechim:* Asinxron FastAPI + Redis kesh + PostgreSQL Connection Pooling.
3. **Kiberxavfsizlik va ruxsatsiz kirish (Yuqori):**
   * *Yechim:* JWT tokenlar, Bcrypt xesh, role-based decorators (`require_roles`).
