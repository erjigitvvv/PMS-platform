# 🤖 TELEGRAM BOT WORKFLOW & INTERACTION ARCHITECTURE
> **PMS Platform: Talaba va Korxona Mentori Uchun To'liq Telegram Bot Ekotizimi**

---

## 1. Konsepsiya va Yondashuv
* **Muammo:** Veb-saytga har kuni kirib login-parol terish talaba va band mentor uchun noqulay.
* **Yechim:** Kunlik amaliyot jarayonlarini (kundalik to'ldirish, rasm yuklash, tasdiqlash, davomat belgilash) 100% Telegram Bot orqali amalga oshirish.
* **Ma'lumotlar bazasi integratsiyasi:** Bot va Veb platforma yagona FastAPI backend va PostgreSQL bazasi orqali sinxron ishlaydi.

---

## 2. 🎓 Talaba Ssenariysi (Student Bot Workflow)
1. **Kirish:** `/start` orqali tizimga ulanadi (Deep linking).
2. **Asosiy menyu (Reply Keyboard):**
   * `📝 Bugungi kundalikni to'ldirish`
   * `📊 Mening davomatim va ballarim`
   * `📄 Shartnoma PDF ni olish`
3. **Kundalik FSM (Finite State Machine) sikli:**
   * Qadam 1: Bot vazifalar matnini so'raydi -> Talaba yozadi;
   * Qadam 2: Bot egallangan ko'nikmalarni so'raydi -> Talaba yozadi;
   * Qadam 3: Bot foto-hisobot so'raydi -> Talaba rasm/hujjat yuklaydi;
   * Qadam 4: Baza yangilanadi (`status = PENDING`) va mentorga tezkor push yuboriladi.

---

## 3. 🏢 Mentor Ssenariysi (Mentor Bot Workflow)
1. **Jonli xabarnoma va 1-Click Tasdiqlash:**
   * Talaba hisobot yuborishi bilan mentorga inline tugmali xabar boradi:
     `[✅ Tasdiqlash]` / `[❌ Qaytarish]`
   * Mentor bitta bosishda tasdiqlaydi (`status = APPROVED`).
2. **Avtomatik Davomat Eslatmasi:**
   * Har kuni soat 10:00 da bot mentordan talaba davomatini so'raydi:
     `[🟢 Keldi]` | `[🔴 Kelmadi]` | `[🟡 Sababli]`
3. **Yakuniy 50 ballik baholash:**
   * Amaliyot yakunida mezonlar asosida ball qo'yish va qisqa xarakteristika yozish.

---

## 4. Arxitekturaviy Bog'liqlik
```
[Telegram Foydalanuvchisi] 
       ↕ (aiogram 3.x)
[PMS Telegram Bot] 
       ↕ (Internal HTTP / REST API)
[FastAPI Backend] 
       ↕ (SQLAlchemy Async)
[PostgreSQL 16 Database]
       ↕ (WebSockets)
[Dekanat Veb Dashboardi (Jonli ko'rinadi)]
```
