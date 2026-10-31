# 📜 PMS PLATFORM — AI DEVELOPMENT CONSTITUTION & CODING RULES
> **DIQQAT AI (Gemini, Claude, Cursor, Copilot):** Ushbu loyihada kod yozish, yangi modul yoki UI komponent qo'shishda quyidagi 6 ta qat'iy qoidaga 100% rioya qilishing shart. Har qanday chetga chiqish loyiha arxitekturasini buzadi!

---

## 1. TEXNOLOGIK STEKNING O'ZGARMASLIGI (TECH STACK IMMUTABILITY)

### Backend:
* **Faqat FastAPI (Python 3.11+).** Boshqa freymvorklar (Django, Flask) kiritilishi qat'iyan taqiqlanadi!
* **ORM:** Faqat `SQLAlchemy 2.0 (Async)` + `asyncpg`. Barcha DB so'rovlar `select()`, `await db.execute()` shaklida asinxron bo'lishi shart. Sinhron `db.query()` ishlatish taqiqlanadi.
* **Validatsiya:** Faqat `Pydantic v2`.
* **Primary Key:** Barcha jadvallarda ID ustuni faqat `UUID (v4)` bo'lishi shart.

### Frontend:
* **Faqat Next.js 14+ (App Router) + TypeScript.**
* **CSS:** Faqat `Tailwind CSS`. Boshqa hech qanday UI kutubxonalar (MUI, AntDesign, Chakra UI, Bootstrap) o'rnatilishi TAQIQLANADI!
* **Ikonkalar:** Faqat `lucide-react`.

---

## 2. DIZAYN VA UI BO'YICHA QAT'IY QOIDALAR (WHITE MINIMALIST ONLY)

Loyihaning dizayni: **Sof Oq, Minimalistik, Nozik va Toza (Pure White & Clean)**.

1. **Fon va Zamin:**
   * Sahifa foni: Har doim `#FAFAFA` (`bg-[#FAFAFA]`).
   * Kartochkalar (Cards): Har doim sof oq fon (`bg-white`), nafis 1px chegara (`border border-zinc-200/80`), `rounded-2xl` va nozik soya (`shadow-subtle` yoki `shadow-sm`).
2. **Ranglar cheklovi:**
   * Asosiy matn: `text-zinc-900`.
   * Ikkinchi darajali matn: `text-zinc-500` yoki `text-zinc-400`.
   * Tugmalar (Buttons): Faqat chuqur qora (`bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl`) yoki oq konturli (`bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl`).
   * Statuslar: Faqat pastel fonli StatusBadge (`bg-emerald-50 text-emerald-700`, `bg-amber-50 text-amber-700`, `bg-rose-50 text-rose-700`).
3. **QAT'IYAN TAQIQLANADI:**
   * ❌ Rang-barang qalin gradientlar (masalan, binafsha-pushti gradientlar);
   * ❌ Qalin qora og'ir soyalar (`shadow-2xl`);
   * ❌ To'q ko'k yoki rangli to'liq fonlar;
   * ❌ Sharp (0 radiusli) to'rtburchak qirralar.

---

## 3. RBAC VA XAVFSIZLIK CHEKLOVLARI (5 TA ROL MATRITSASI)

Har bir API endpoint va UI sahifasi 5 ta roldan biriga tegishli ekanligi qat'iy tekshirilishi shart:
1. `ADMIN` (Super Admin)
2. `OTM_STAFF` (Amaliyot bo'limi / Dekanat)
3. `TEACHER` (Kafedra O'qituvchisi)
4. `MENTOR` (Korxona Mentori)
5. `STUDENT` (Talaba)

* Barcha himoyalangan API endpointlarda `dependencies=[Depends(require_roles([...]))]` bo'lishi shart.
* Talaba faqat o'ziga tegishli arizalar va kundaliklarni ko'ra oladi va tahrirlaydi.
* Mentor faqat o'z korxonasiga biriktirilgan talabalarni ko'radi va tasdiqlaydi.
* Parollar faqat `bcrypt` orqali heshlanadi.

---

## 4. PAPKALAR VA FAYLLAR TARTIBI (CLEAN FOLDER DISCIPLINE)

Loyihada fayllar faqat o'z o'rniga joylashtiriladi:
* Yangi DB jadvali -> `backend/app/models/`
* Yangi validatsiya sxemasi -> `backend/app/schemas/`
* Yangi endpoint -> `backend/app/api/v1/endpoints/` va `api.py` ga include qilinadi
* Yangi servis / generator -> `backend/app/services/`
* Yangi UI komponenti -> `frontend/src/components/`
* Hech qanday loyiha kodi ildiz (root) papkaga tashlanmasligi kerak!

---

## 5. TIL VA TERMINOLOGIYA QOIDALARI

* **Kod va nomlash (Identifiers):** Faqat ingliz tilida (`snake_case` Python uchun, `camelCase` TypeScript uchun).
* **Foydalanuvchi interfeysi (UI) va Xabarlar:** Faqat o'zbek tilida (Lotin alifbosi), rasmiy va toza akademik uslubda (masalan: *"Tasdiqlash"*, *"Kutilmoqda"*, *"Amaliyot Kundaligi"*, *"3 tomonlama shartnoma"*).

---

## 6. AI JAVOBLARINI TEKSHIRISH (SELF-VERIFICATION)

AI yangi kod yaratganida yoki tahrirlaganida:
1. Python sintaksis xatolarini tekshirishi shart (`python -m compileall`).
2. Mavjud kodlarni o'chirib yubormasdan, mavjud arxitekturani davom ettirishi shart.
