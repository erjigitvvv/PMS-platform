# OTM Talabalar Amaliyotini Boshqarish Platformasi (PMS)
## Davlat Komissiyasi va BMI Himoyasi Uchun Jonli Demo Ssenariysi (5 Daqiqa)

Ushbu qo'llanma Bitiruv Malakaviy Ishi (BMI) himoyasida Davlat Komissiyasiga platformaning ishlash jarayonini ketma-ket va professional tarzda namoyish etish uchun mo'ljallangan.

---

### 1-QADAM: Tizimga Kirish va Rollar (1 daqiqa)
* **Maqsad:** 5 ta rol (`STUDENT`, `MENTOR`, `TEACHER`, `OTM_STAFF`, `ADMIN`) va ularning huquqlarini ko'rsatish.
* **Harakat:** 
  1. `http://127.0.0.1:8000/docs` (Swagger UI) yoki `http://localhost:3000` (Next.js Frontend) sahifasini oching.
  2. Dekanat sifatida kiring: `dekanat` / `Dekanat123!` (yoki yuqori o'ng burchakdagi rolni almashtirish tugmasidan foydalaning).

### 2-QADAM: Excel Ommaviy Import va Student ID (1 daqiqa)
* **Maqsad:** Yuzlab talabalarni ommaviy ro'yxatdan o'tkazish va avtomatik unikal ID yaratishni ko'rsatish.
* **Harakat:** 
  1. Dekanat panelida talabalarning Excel ro'yxatini (`.xlsx`) yuklang.
  2. Tizim har bir talabaga avtomatik ravishda `STD-2026-0001`, `STD-2026-0002` kabi Student ID berishini ko'rsating.

### 3-QADAM: Arizadan 3 Tomonlama Shartnomagacha (1 daqiqa)
* **Maqsad:** Talaba arizasi va Dekanat tomonidan bir tugmada PDF/Word shartnoma generatsiya qilinishini namoyish etish.
* **Harakat:** 
  1. Talaba (`talaba` / `Talaba123!`) sifatida kirib, **Uzum Technologies MCHJ** yoki **IT Park** ga amaliyot arizasini yuboring.
  2. Dekanat (`dekanat`) sifatida kirib, arizani tasdiqlang (`Approve`).
  3. `media/contracts/` papkasida haqiqiy `AMAL-....docx` va `AMAL-....pdf` uch tomonlama shartnoma generatsiya qilinganini ko'rsating.

### 4-QADAM: Kundalik va LATE Davomat (1 daqiqa)
* **Maqsad:** Talaba raqamli kundaligi va mentor tomonidan yangi `LATE` (Kech keldi) statusi bilan davomat belgilanishi.
* **Harakat:** 
  1. Talaba bajarilgan ishlar va ko'nikmalarni kiritadi (`PENDING`).
  2. Mentor (`mentor` / `Mentor123!`) davomatda `LATE` (Kech keldi) ni belgilaydi va kundalikni 1 ta bosishda `APPROVED` qiladi.

### 5-QADAM: 100 Ballik Baholash va Telegram Bot (1 daqiqa)
* **Maqsad:** Mentor va OTM ustozining baholash zanjiri (`(5*10) + 46 = 96` ball, `A` baho) hamda `@tiupm_bot` Telegram boti integratsiyasi.
* **Harakat:** 
  1. Mentor talabaga `5.0` ball qo'yadi.
  2. OTM ustozining (`oqituvchi` / `Ustoz123!`) `46` ball qo'shishi bilan jami `96.0` ball va `A` harfli baho shakllanishini ko'rsating.
  3. Jonli `@tiupm_bot` orqali talaba kundalik yuborishi va mentor xabarnoma olishini tushuntiring.
