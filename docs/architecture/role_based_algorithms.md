# 🎯 ROLE-BASED OPERATIONAL ALGORITHMS (VAKOLATLAR BO'YICHA ISH ALGORITMLARI)
> **PMS Platform: 5 ta Rolning 0-Qadamdan Yakuniy Qadamgacha To'liq Ish Faoliyati Algoritmi**

---

## 1. 🎓 TALABA (Student) ALGORITMI
```
Qadam 1: Tizimga Login (Username/Talaba ID va Parol) orqali kirish.
Qadam 2: Amaliyot joyini belgilash:
         IF (Hamkor korxonalar katalogidan tanlasa):
             Vakansiyani tanlaydi va [Ariza topshirish] tugmasini bosadi.
         ELSE IF (O'z korxonasini taklif qilsa):
             Korxona rekvizitlarini (nomi, STIR, rahbar F.I.SH, telefon) kiritadi.
Qadam 3: Ariza holatini kuzatish (Status: SUBMITTED -> APPROVED).
Qadam 4: Dekanat tasdiqlagach, generatsiya bo'lgan 3 tomonlama shartnomani (.pdf / .docx) yuklab oladi.
Qadam 5: Kunlik amaliyot davomida (Har kuni):
         - Sana tanlaydi (Faqat amaliyot davri va bugungi kundan oshmagan sana);
         - Bajarilgan vazifalar va o'rganilgan ko'nikmalarni yozadi;
         - Foto/hujjat hisobotini yuklaydi;
         - [Yuborish] tugmasini bosadi (Status: PENDING).
         IF (Mentor REJECT qilsa):
             Izohni o'qiydi, tuzatib qayta yuboradi.
         ELSE (Mentor APPROVE qilsa):
             Tasdiqlangan statusga o'tadi.
Qadam 6: Amaliyot yakunida Yakuniy Hisobot faylini topshiradi.
Qadam 7: Mentor (50 ball) va Kafedra (50 ball) qo'ygan umumiy 100 ballik natijani ko'radi.
```

---

## 2. 🏢 KORXONA MENTORI (Company Mentor) ALGORITMI
```
Qadam 1: Tizimga kirish -> Boshqaruv panelida faqat o'z korxonasiga kelgan talabalar ro'yxatini ko'rish.
Qadam 2: (Ixtiyoriy) Yangi amaliyot o'rni/vakansiya ochish (Kvota soni bilan).
Qadam 3: Har kunlik harakatlar:
         A) Davomat belgilash: Har bir talaba uchun [Keldi] / [Kelmadi] / [Sababli].
         B) Kundaliklarni tekshirish:
            IF (Vazifalar to'liq bajarilgan bo'lsa):
                [✓ Approve] bosadi -> Status: APPROVED (Avtomatik tasdiqlangan vaqt belgilanadi).
            ELSE:
                [✕ Reject] bosadi -> Majburiy sabab izohini yozadi -> Talabaga qaytariladi.
Qadam 4: Amaliyot davri tugagach:
         - Talabaning intizomi, amaliy bilimi va ko'nikmalariga qarab 0 dan 50 ballgacha baho qo'yadi;
         - Rasmiy xarakteristika/tavsiyanoma matnini yozadi va tasdiqlaydi.
```

---

## 3. 👨‍🏫 KAFEDRA O'QITUVCHISI (OTM Amaliyot Rahbari) ALGORITMI
```
Qadam 1: Tizimga kirish -> Kafedraga biriktirilgan talabalar monitoringini ochish.
Qadam 2: Amaliyot dasturi, uslubiy ko'rsatmalar va sillabusni platformaga yuklash.
Qadam 3: Davriy masofaviy monitoring:
         - Talabalarning kunlik kundaliklarini ko'rish;
         - Mentorning munosabatlarini kuzatish;
         - Talaba hisobotlariga akademik tavsiya/izoh qoldirish.
Qadam 4: Yakuniy himoya bosqichi:
         - Talabaning yakuniy hisobotini (.pdf) tekshirish;
         - Amaliyot himoyasini o'tkazish;
         - 0 dan 50 ballgacha OTM bahosini kiritish;
         - Tizim ECTS mezonlari asosida yakuniy A, B, C, D, F reytingini generatsiya qiladi.
```

---

## 4. 🏛 KAFEDRA MUDIRI / OTM AMALIYOT BO'LIMI (Dekanat) ALGORITMI
```
Qadam 1: O'quv yili/semestr boshida:
         - Kafedralar va guruhlarni shakllantirish;
         - Tayyor Excel shablon orqali talabalar ro'yxatini ommaviy yuklash (Bulk Import).
Qadam 2: Hamkor korxonalarni tekshirish va tasdiqlash:
         - Talabalar kiritgan mustaqil korxonalarning STIR va rekvizitlarini ko'rib, tasdiqlash yoki rad etish.
Qadam 3: Arizalarni rasmiylashtirish:
         - Talabaning arizasini ko'rib chiqish;
         - Rektorat buyruq raqamini kiritish;
         - [Tasdiqlash] tugmasini bosish -> Tizim avtomatik 3 tomonlama shartnomani QR-kod bilan PDF/Word qiladi.
Qadam 4: Universitet amaliyot monitoringi:
         - Qaysi fakultet/guruhda qatnashish foizi qanday ekanligini jonli dashboardda kuzatish.
Qadam 5: Yakuniy hisobot:
         - Semestr yakunida butun universitet natijalarini Vazirlik talabi bo'yicha 1 ta tugma bilan Excelga eksport qilish.
```

---

## 5. 👑 SUPER ADMIN (Tizim Administratori) ALGORITMI
```
Qadam 1: Tizim infratuzilmasi monitoringi (FastAPI, PostgreSQL ulanishlari, Redis, WebSockets kanallari).
Qadam 2: Mas'ul xodimlar (Dekanat, Mudirlar) akkauntlarini yaratish va rollarni sozlash.
Qadam 3: Tizim xavfsizlik audit loglarini (Loginlar, IP manzillar, o'zgarishlar tarixi) tahlil qilish.
Qadam 4: Ma'lumotlar bazasining kunlik avtomatik Backup (Zaxira nusxasi) jarayonini nazorat qilish.
Qadam 5: Favqulodda nizoli holatlarni to'g'rilash (masalan, noto'g'ri biriktirilgan rahbarlarni almashtirish).
```
