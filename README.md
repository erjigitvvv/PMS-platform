# 🎓 OTM Talabalar Amaliyotini Boshqarish Platformasi (PMS)
> **Practicum & Internship Management System for Higher Education Institutions**  
> *Zamonaviy, shaffof, qog'ozsiz va real-vaqt rejimida ishlovchi amaliyot boshqaruv ekotizimi.*

---

## 📌 Loyiha Haqida

Ushbu platforma Oliy ta'lim muassasalarida talabalar amaliyotini (malakaviy, o'quv, ishlab chiqarish, pedagogik va diplomoldi) tashkil etish, 3 tomonlama shartnomalarni avtomatlashtirish, amaliyot kundaliklarini yuritish va davomatni nazorat qilish jarayonlarini to'liq raqamlashtirish uchun ishlab chiqilgan.

### 🌟 Asosiy Imkoniyatlar:
1. **5 ta Rolga asoslangan RBAC:** Super Admin, OTM Amaliyot Bo'limi (Dekanat), Kafedra O'qituvchisi, Korxona Mentori va Talaba.
2. **Qog'ozsiz Shartnomalar:** OTM, Talaba va Tashkilot o'rtasida 3 tomonlama shartnoma va yo'llanmani avtomatik generatsiya qilish (`.pdf`, `.docx`).
3. **Excel Ommaviy Import:** Talabalar va guruhlar bazasini bitta tugma orqali Excel fayldan yuklash.
4. **Raqamli Kundalik (Logbook):** Talabaning kunlik hisoboti va mentor tomonidan 1 ta bosishda tasdiqlanishi (`Approve`/`Reject`).
5. **Real-time WebSockets:** Harakatlar (kundalik yuborilishi, mentor tasdiqlashi) brauzerda jonli aks etadi.
6. **Telegram Bot (`aiogram 3.x`):** Muhim bildirishnomalar va muddat eslatmalari avtomatik foydalanuvchilarning Telegramiga yuboriladi.
7. **100 Ballik Shaffof Baholash:** Korxona mentori (50 ball) va OTM rahbari (50 ball) rubrikalari.

---

## 🏗 Arxitektura va Monorepo Strukturasi

```
PMS-platform/
├── backend/                  # FastAPI Asinxron Backend
│   ├── app/
│   │   ├── api/              # REST API v1 va WebSockets
│   │   ├── core/             # Konfiguratsiya, Xavfsizlik (JWT), DB, WS Manager
│   │   ├── models/           # PostgreSQL SQLAlchemy 2.0 Modellari
│   │   ├── schemas/          # Pydantic v2 validatsiya sxemalari
│   │   ├── services/         # Word/PDF generatsiya, Excel parser
│   │   └── main.py           # FastAPI dasturining kirish nuqtasi
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # Next.js 14 / React Dashboard
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── Dockerfile
│   └── package.json
├── bot/                      # Telegram Notifikatsiya Xizmati
│   ├── bot.py                # aiogram 3.x asinxron bot
│   ├── Dockerfile
│   └── requirements.txt
├── scripts/
│   └── seed_demo_data.py     # 5 ta rol uchun demo ma'lumotlar generatori
├── docker-compose.yml        # PostgreSQL, Redis, Backend, Bot orchestration
└── README.md
```

---

## 📚 To'liq Loyiha Hujjatlari va Arxitektura Portali (Master Documentation)

Loyiha bo'yicha ishlab chiqilgan barcha rasmiy spetsifikatsiyalar va standartlar:

1. ⚙️ **[Tizimning 6 ta Asosiy Matematik Algoritmi](docs/architecture/system_algorithms.md)** — Shartnoma generatsiyasi, Logbook State Machine, Davomat formulasi va ECTS konvertatsiyasi.
2. 🎯 **[5 ta Rol Bo'yicha Bosqichma-bosqich Algoritmlar](docs/architecture/role_based_algorithms.md)** — Talaba, Mentor, Ustoz, Dekanat va Adminning to'liq harakatlar xaritasi.
3. 📝 **[Ma'lumotlar Kiritish va Maydonlar Spetsifikatsiyasi](docs/architecture/role_data_input_specification.md)** — Avtomatik Student ID, optional rekvizitlar va formalar.
4. 🗄️ **[Ma'lumotlar Bazasi va ACID Algoritmlari](docs/architecture/database_master_architecture.md)** — PostgreSQL 16 relyatsion sxemasi (16 ta jadval), Pessimistic locking va triggerlar.
5. 🤝 **[Talaba-Mentor O'zaro Ta'sir Protokoli](docs/architecture/student_mentor_interaction_protocol.md)** — Kunlik kundalik yozish va 1-bosishda tasdiqlash.
6. 🤖 **[Telegram Bot Ekotizimi va Ssenariysi](docs/architecture/telegram_bot_workflow.md)** — aiogram 3.x FSM interaktiv boti.
7. 🛡️ **[Eskalatsiya, Tailgating Antifraud va Jarimalar](docs/architecture/notification_antifraud_penalties.md)** — Xabarnomalar eskalatsiyasi, soxtakorlikni fosh qilish va jarima formulasi.
8. ⚠️ **[Foydalanish Xatarlari va Himoya Matritsasi](docs/architecture/risk_management_matrix.md)** — Har bir rol bo'yicha risklar va dasturiy yechimlar.
9. ⚪ **[Oq Minimalistik Dizayn Tizimi](docs/architecture/ui_design_system.md)** — Pure White & Clean tokens, Tailwind va komponentlar standarti.
10. 🔒 **[RBAC Ruxsatlar va Vakolatlar Matritsasi](docs/architecture/rbac_matrix.md)** — 5 ta rolning qat'iy CRUD chegaralari.
11. 📜 **[AI Development Constitution (AI Qoidalari)](AI_GUIDELINES.md)** va **[.cursorrules](.cursorrules)** — Sun'iy intellekt arxitekturani buzmasligi uchun qat'iy qoidalar.

---

## 👥 5 ta Asosiy Rol va Huquqlar Matritsasi

```mermaid
graph LR
    SA[1. Super Admin] -->|Tizim nazorati| OTM
    OTM[2. OTM Dekanat] -->|Shartnomalar & Import| STU[5. Talaba]
    OTM -->|Biriktirish| TCH[3. O'qituvchi]
    OTM -->|Hamkorlik| MEN[4. Korxona Mentori]
    STU -->|Kunlik hisobot| MEN
    MEN -->|Tasdiqlash & 50 ball| STU
    TCH -->|Himoya & 50 ball| STU
```

| Rol | Dashboard vazifalari | Amallar va Ruxsatlar |
| :--- | :--- | :--- |
| **👑 Super Admin** | Tizim monitoringi, audit | Foydalanuvchilar, rollar, zaxira nusxalari |
| **🏛 OTM Dekanat** | Amaliyot boshqaruvi, statistika | Talabalarni Exceldan import qilish, shartnoma PDF/Word chiqarish |
| **👨‍🏫 Kafedra Ustoz** | O'z talabalari ro'yxati | Amaliyot kundaliklarini ko'rish, yakuniy himoya bahosini qo'yish |
| **🏢 Korxona Mentori** | Amaliyotchilar davomati | Kunlik kundalikni 1 ta bosishda tasdiqlash, korxona bahosini qo'yish |
| **🎓 Talaba** | Shaxsiy amaliyot kabineti | Vakansiya tanlash, kundalik to'ldirish, shartnoma yuklab olish |

---

## ⚡ Tezkor Ishga Tushirish (Quick Start)

### 1-Usul: Docker Compose Orqali (Tavsiya etiladi)
Barcha xizmatlarni (PostgreSQL, Redis, Backend, Bot) bir buyruq bilan ko'tarish:
```bash
docker-compose up --build -d
```
* **Swagger API Docs:** `http://localhost:8000/docs`
* **Frontend:** `http://localhost:3000`

---

### 2-Usul: Lokal Muhitda Ishga Tushirish

#### 1. Backend sozlash:
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

#### 2. Demo ma'lumotlarni yuklash:
```bash
python ../scripts/seed_demo_data.py
```

#### 3. FastAPI serverini ishga tushirish:
```bash
uvicorn app.main:app --reload --port 8000
```
Brauzerda `http://127.0.0.1:8000/docs` manzilini oching va interaktiv Swagger hujjatlaridan foydalaning!

---

## 🔑 Sinov Hisoblari (Seed Accounts)

| Rol | Username | Parol | Mas'uliyati |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `Admin123!` | Tizim administratori |
| **OTM Dekanat** | `dekanat` | `Dekanat123!` | Amaliyot bo'limi boshlig'i |
| **Kafedra O'qituvchisi** | `oqituvchi` | `Ustoz123!` | Ilmiy amaliyot rahbari |
| **Korxona Mentori** | `mentor` | `Mentor123!` | Tashkilot yetakchi muhandisi |
| **Amaliyotchi Talaba** | `talaba` | `Talaba123!` | DI-202 guruhi talabasi |

---

## 📡 REST API Yo'nalishlari Xaritasi

| Modul | Endpoint | Metod | Tavsif |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth/login` | `POST` | JWT token olish (Login) |
| **Auth** | `/api/v1/auth/me` | `GET` | Joriy foydalanuvchi ma'lumotlari |
| **Akademik** | `/api/v1/academic/faculties` | `GET/POST` | Fakultetlar ro'yxati va yaratish |
| **Akademik** | `/api/v1/academic/import-students-excel`| `POST` | Talabalarni Excel orqali ommaviy yuklash |
| **Korxonalar**| `/api/v1/companies/` | `GET/POST` | Hamkor korxonalar katalogi |
| **Arizalar** | `/api/v1/applications/` | `POST` | Talaba tomonidan amaliyot arizasi |
| **Arizalar** | `/api/v1/applications/{id}/approve` | `POST` | 3 tomonlama shartnoma generatsiyasi (PDF/Word) |
| **Kundalik** | `/api/v1/dailylogs/` | `POST` | Kunlik amaliyot yozuvini kiritish |
| **Kundalik** | `/api/v1/dailylogs/{id}/review` | `PATCH` | Mentor tasdiqlashi (Approve/Reject) |
| **Davomat** | `/api/v1/attendance/` | `POST` | Kunlik davomat belgilash |
| **Baholash** | `/api/v1/assessments/application/{id}/mentor` | `PATCH` | Mentor bahosi (0-50 ball) |
| **Baholash** | `/api/v1/assessments/application/{id}/teacher`| `PATCH` | OTM bahosi (0-50 ball) |
| **Real-time** | `/api/v1/ws/live` | `WebSocket` | Real-vaqt bildirishnomalari kanali |

---

## 📄 Litsenziya
Ushbu loyiha MIT litsenziyasi ostida taqdim etiladi.
