# ⚙️ PMS PLATFORM — CORE SYSTEM ALGORITHMS & LOGIC SPECIFICATION
> **Oliy ta'lim muassasasi talabalar amaliyotini boshqarish platformasining 6 ta asosiy algoritmi**

---

## 1. Uch Tomonlama Shartnoma Generatsiyasi Algoritmi
* **Maqsad:** OTM, Talaba va Tashkilot o'rtasidagi yuridik hujjatni inson aralashuvisiz, xatosiz yaratish.
* **Mantiq:**
  1. `student_id` va `company_id` validatsiyasi (talabada ayni vaqtda faol ariza bo'lmasligi shart).
  2. Korxona kvotasini tekshirish (`active_applications < company.quota`).
  3. Unikal raqam generatsiyasi: `AMAL-{YIL}-{FAKULTET_KODI}-{SEQ_NUM}`.
  4. `.docx` shabloniga rekvizitlarni kiritish va `ReportLab` orqali rasmiy PDF konvertatsiyasi.
  5. Pastki burchakka ommaviy verifikatsiya qiluvchi QR-kod muhrini qo'yish: `https://pms.edu.uz/verify/{SHA256_HASH}`.

---

## 2. Raqamli Kundalik (Logbook) Validatsiya Algoritmi
* **Qoidalar:**
  1. Sana cheklovi: `application.start_date <= log_date <= min(today, application.end_date)`.
  2. Bitta kunda bitta talaba tomonidan 2 ta kundalik kiritilishi taqiqlanadi (Unikal: `application_id + log_date`).
  3. Holatlar zanjiri:
     * Boshlang'ich holat: `PENDING`;
     * Mentor tasdiqlasa: `APPROVED` + `approved_at = now()`;
     * Mentor rad etsa: `REJECTED` + `mentor_feedback` majburiy izohi.
  4. Hodisa tranzaksiyasi: WebSocket orqali talaba ekranida jonli bildirishnoma chiqarish.

---

## 3. Davomat Nazorati va KPI Foizini Hisoblash Algoritmi
* **Ish kunlari:** Shanba va yakshanba hamda davlat bayramlari chiqarib tashlanadi.
* **Formula:**
  $$\text{Davomat Foizi} = \left( \frac{N_{\text{kelgan}} + 0.5 \times N_{\text{sababli}}}{N_{\text{ish kunlari}}} \right) \times 100\%$$
* **Risk darajalari:**
  * $\ge 85\%$: Normal (Yashil);
  * $70\% - 84\%$: Diqqat talab (Sariq eslatma talaba va ustozga);
  * $< 70\%$: Qoniqarsiz (Dekanatga amaliyotdan chetlatish signali).

---

## 4. 100 Ballik Baholash va ECTS Konvertatsiya Algoritmi
* **Baho taqsimoti:**
  * $S_{\text{mentor}} \in [0, 50]$ (Korxona amaliy intizomi va vazifalar);
  * $S_{\text{teacher}} \in [0, 50]$ (Kafedra hisobot himoyasi).
  * $S_{\text{jami}} = S_{\text{mentor}} + S_{\text{teacher}} \in [0, 100]$.
* **Harfli reyting:**
  * $90 - 100$: **A** (A'lo)
  * $80 - 89$: **B** (Yaxshi)
  * $70 - 79$: **C** (Qoniqarli)
  * $60 - 69$: **D** (O'tish)
  * $< 60$: **F** (Qayta o'tish)

---

## 5. Excel Ommaviy Import Algoritmi
* **Xavfsiz qabul qilish:** `io.BytesIO` oqimi orqali faylni diskka keraksiz yozmasdan xotirada tahlil qilish.
* **Guruh auto-discovery:** Agar Excelda ko'rsatilgan guruh nomi bazada bo'lmasa, u avtomatik yaratiladi.
* **Atomiklik:** Xatolik bergan qatorlar yig'ilib, foydalanuvchiga ro'yxat qilib qaytariladi, to'g'ri qatorlar esa bazaga muvaffaqiyatli commit qilinadi.

---

## 6. Real-Time WebSocket & Telegram Bildirishnomalar Algoritmi
* **Marshrutlash:**
  1. Yangi hodisa sodir bo'lganda (`EVENT_TYPE`), maqsadli `user_id` yoki `role` aniqlanadi.
  2. Agar foydalanuvchi tizimda onlayn bo'lsa -> `active_connections[user_id]` orqali WebSocket push yuboriladi (<50ms).
  3. Agar foydalanuvchida `telegram_chat_id` mavjud bo'lsa -> `aiogram Bot API` orqali xabar yuboriladi.
  4. Har ikkala holatda ham hodisa `notifications` jadvaliga yoziladi.
