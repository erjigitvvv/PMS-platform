# 🤝 STUDENT-MENTOR DAILY INTERACTION PROTOCOL (KUNLIK O'ZARO TA'SIR PROTOKOLI)
> **PMS Platform: Talaba tomonidan kundalikni bajarish va Mentor tomonidan tasdiqlashning to'liq mexanizmi**

---

## 1. Talaba Harakatlari (Submission Flow)
1. **Topshiriqni bajarish:** Ish joyida mentor bergan vazifani bajarish va dalil sifatida foto/skrinshot tayyorlash.
2. **Formani to'ldirish:**
   * `log_date`: Bugungi sana (avtomatik).
   * `tasks_done`: Bajarilgan vazifalar matni (kamida 15 ta so'z).
   * `acquired_skills`: O'rganilgan ko'nikmalar.
   * `attachment`: Ish joyidan rasm yoki hujjat (.jpg, .png, .pdf).
3. **Yuborish:** [Yuborish] tugmasi bosiladi -> Holat: `PENDING` (Sariq).
4. **Intizom qoidasi:** Faqat joriy kun va o'tgan 1 kun uchun yozish mumkin; eski sanalar avtomatik qulflanadi.

---

## 2. Mentor Tasdiqlash Harakatlari (Approval Flow)

### 2.1. Telegram Bot orqali 1-Click Tasdiqlash (Asosiy qulaylik):
* Talaba yuborgan soniyada mentorning Telegramiga hisobot matni va rasmi bilan birga ikkita inline tugma boradi:
  * `[✅ Tasdiqlash]` -> Holat darhol `APPROVED` bo'ladi.
  * `[❌ Qaytarish]` -> Sababi so'raladi va talabaga qaytariladi.

### 2.2. Veb Dashboard orqali Tasdiqlash:
* Mentor veb-kabinetida hisobotlarni ko'radi:
  * **[✓ Approve]:** Bitta bosishda tasdiqlash.
  * **[✕ Reject]:** Rad etish va talabaga to'g'irlash uchun izoh yozish.

---

## 3. Natija va Davomat Hisobi
* Yozuv tasdiqlangach:
  1. Tizimda tasdiqlangan vaqt (`approved_at`) qayd etiladi.
  2. Talabaning davomat foiziga +1 kun qo'shiladi.
  3. Talabaga jonli xabarnoma boradi: *"Mentoringiz hisobotingizni tasdiqladi!"*.
