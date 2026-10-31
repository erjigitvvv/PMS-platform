# 📝 PMS PLATFORM — ROLE-BASED DATA INPUT & FIELD SPECIFICATION
> **5 ta Rol Uchun Tizimga Kiritiladigan Profil va Operatsion Ma'lumotlar Spetsifikatsiyasi**

---

## 1. 🎓 TALABA (Student) MA'LUMOTLARI
* **A) Dekanat kiritadigan shaxsiy ma'lumotlar:**
  * `full_name`: F.I.SH (Majburiy)
  * `student_id_number`: **Tizim tomonidan avtomatik beriladigan unikal ID** (Masalan: `STD-2026-0001`). *HEMIS ID talab etilmaydi va tizimdan chiqarilgan.*
  * `faculty`: Fakultet nomi
  * `department`: Kafedra nomi
  * `group_name`: Guruh nomi (masalan: `DI-202-22`)
  * `course_year`: 1, 2, 3 yoki 4-kurs
  * `phone`: Bog'lanish telefoni (+998...)
  * `pinfl`: 14 xonali JSHSHIR (Shartnomaga kiritiladi, ixtiyoriy)
* **B) Talabaning o'zi kiritadigan ma'lumotlar:**
  * `application`: Tanlangan korxona yoki o'zi topgan korxona rekvizitlari (Nomi, STIR, Rahbari, Telefoni)
  * `daily_logs`:
    * `log_date`: Amaliyot kuni sanasi
    * `tasks_done`: Kunlik bajarilgan vazifalar matni
    * `acquired_skills`: Egallangan yangi ko'nikmalar
    * `attachments`: Ish joyidan rasm yoki hujjat skrinshoti (.png, .jpg, .pdf)
  * `final_report`: Yakuniy hisobot hujjati (.pdf, .docx, 15-25 bet)

---

## 2. 🏢 KORXONA VA MENTOR MA'LUMOTLARI
* **A) Korxona rekvizitlari:**
  * `company_name`: Tashkilot nomi (masalan: `Uzum Technologies MCHJ`, Majburiy)
  * `tin_stir`: 9 xonali STIR/INN raqami (Majburiy)
  * `address`: Yuridik manzili (Majburiy)
  * `director_name`: Tashkilot rahbari F.I.SH (Shartnoma uchun majburiy)
  * `contact_phone`: Tashkilot telefon raqami (Majburiy)
  * `email`: **Rasmiy e-pochta (Ixtiyoriy)**
  * `is_partner`: **Hamkorlik maqomi (Ixtiyoriy / Standart: Mustaqil)**
* **B) Mentorning kiritadigan ma'lumotlari:**
  * `full_name`: **Mentorning FIO (F.I.SH) — Majburiy**
  * `phone`: **Mentorning telefon raqami (+998...) — Majburiy**
  * `position`: Lavozimi (Ixtiyoriy)
  * `vacancies`: Lavozim nomi, talablar, kvota soni
  * `attendance`: Kunlik davomat holati (`PRESENT`, `ABSENT`, `EXCUSED`) + sabab izohi
  * `log_review`: Tasdiqlash (`APPROVED`) yoki Qaytarish sababi (`REJECTED` + izoh)
  * `final_assessment` (Maks 50 ball):
    * Mehnat intizomi (0-15 ball)
    * Topshiriqlar ijrosi (0-20 ball)
    * Kasbiy salohiyat (0-15 ball)
    * Rasmiy tavsiyanoma/xarakteristika matni

---

## 3. 👨‍🏫 KAFEDRA O'QITUVCHISI MA'LUMOTLARI
* **A) O'qituvchi profili:**
  * `full_name`: F.I.SH
  * `department`: Kafedrasi
  * `academic_degree`: Ilmiy unvoni (Dotsent, Professor, Katta o'qituvchi)
  * `phone`, `email`
* **B) Jarayonda kiritadigan ma'lumotlar:**
  * `syllabus_file`: Amaliyot sillabusi va metodik ko'rsatmalar fayli (.pdf)
  * `academic_notes`: Talaba kundaliklari va hisobotlariga maslahat/izohlar
  * `final_assessment` (Maks 50 ball):
    * Kundalik sifati (0-15 ball)
    * Yakuniy hisobot sifati (0-15 ball)
    * Himoya va taqdimot (0-20 ball)
    * Kafedra xulosasi

---

## 4. 🏛 KAFEDRA MUDIRI / DEKANAT MA'LUMOTLARI
* **A) Akademik boshqaruv:**
  * Fakultetlar ro'yxati (Nomi, kodi)
  * Kafedralar ro'yxati (Nomi, kodi)
  * Guruhlar ro'yxati (Nomi, kursi, ta'lim turi)
* **B) Excel import ma'lumotlari:**
  * `[F.I.SH] | [Talaba ID] | [Guruh] | [JSHSHIR] | [Login] | [Parol] | [Telefon]`
* **C) Rasmiy shartnoma va buyruq parametrlari:**
  * Rektorat buyruq raqami va sanasi (masalan: `№ 45/B`, `2026-02-15`)
  * OTM yuridik rekvizitlari (Hisob raqami, INN, MFO, Rektor F.I.SH)

---

## 5. 👑 SUPER ADMIN MA'LUMOTLARI
* `user_management`:
  * `username`: Unikal login
  * `password`: Xavfsiz parol
  * `role`: ADMIN, OTM_STAFF, TEACHER, MENTOR, STUDENT
  * `is_active`: True/False
* `system_settings`: Fayllar yuklash hajmi limiti (max 25 MB), audit jurnali, zaxiralash parametrlari.
