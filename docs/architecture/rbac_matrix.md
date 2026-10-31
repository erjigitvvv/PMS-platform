# 🔒 ROLE-BASED ACCESS CONTROL (RBAC) & PERMISSION SPECIFICATION
> **PMS Platform: 5 ta Rol uchun Yagona Vakolatlar va Ruxsatlar Matritsasi**

---

## 1. Yagona Matritsa (Action Matrix)

| Sahifa / Funksiya | Talaba (STUDENT) | Korxona Mentori (MENTOR) | Kafedra Ustoz (TEACHER) | OTM Dekanat (OTM_STAFF) | Super Admin (ADMIN) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`/login` (Kirish)** | ✅ O'z kabineti | ✅ O'z kabineti | ✅ O'z kabineti | ✅ O'z kabineti | ✅ Boshqaruv |
| **`/dashboard`** | 👁 Shaxsiy KPI | 👁 Amaliyotchilari | 👁 Kafedra KPI | 👁 Universitet KPI | 👁 Tizim audit |
| **`/companies`** | 👁 Ko'rish + Ariza | 👁 O'z korxonasi | 👁 Ro'yxatni ko'rish | ✅ To'liq CRUD | ✅ To'liq CRUD |
| **`/contracts`** | ⚡ PDF/Word olish | ⚡ Tasdiqlash | 👁 Ko'rish | ✅ Generatsiya & Buyruq | ✅ To'liq CRUD |
| **`/logbook` (Yozish)** | ✅ Kunlik kiritish | ❌ Ruxsat yo'q | ❌ Ruxsat yo'q | ❌ Ruxsat yo'q | ❌ Ruxsat yo'q |
| **`/logbook` (Tasdiq)** | ❌ O'zini tasdiqlolmaydi | ⚡ **[Approve / Reject]** | 👁 Tavsiya/Izoh | 👁 Audit nazorati | ⚡ Favqulodda |
| **`/attendance`** | 👁 Shaxsiy davomat | ✅ **Kunlik belgilash** | 👁 Monitoring | 👁 Umumiy hisobot | ✅ Tahrirlash |
| **Mentor Bahosi (50 b.)** | 👁 Natijani ko'rish | ⚡ **Qo'yish (0-50) + Taqriz** | ❌ O'zgartira olmaydi | 👁 Ko'rish | ⚡ Admin nazorati |
| **OTM Bahosi (50 b.)** | 👁 Natijani ko'rish | ❌ O'zgartira olmaydi | ⚡ **Qo'yish (0-50) + Himoya**| 👁 Ko'rish | ⚡ Admin nazorati |
| **`/academic` & Excel** | ❌ Kirish taqiqlangan | ❌ Kirish taqiqlangan | 👁 Faqat o'z guruhi | ✅ **Excel Import/Export** | ✅ To'liq CRUD |
| **`/settings`** | ✅ Profil & Telegram | ✅ Profil & Telegram | ✅ Profil & Telegram | ✅ Profil & Telegram | ✅ To'liq CRUD |

---

## 2. Backend API Ruxsatlar Qoidasi (FastAPI Implementation)

Barcha API marshrutlarida quyidagi dependensilar orqali ruxsat tekshirilishi shart:

```python
# Faqat Talaba uchun:
@router.post("/dailylogs/", dependencies=[Depends(require_roles([UserRole.STUDENT]))])

# Faqat Korxona Mentori uchun:
@router.patch("/dailylogs/{id}/review", dependencies=[Depends(require_roles([UserRole.MENTOR]))])

# Faqat OTM Dekanat va Admin uchun:
@router.post("/academic/import-students-excel", dependencies=[Depends(require_roles([UserRole.OTM_STAFF, UserRole.ADMIN]))])

# Faqat O'qituvchi uchun:
@router.patch("/assessments/{id}/teacher", dependencies=[Depends(require_roles([UserRole.TEACHER]))])
```

---

## 3. Frontend UI Render Qoidasi (Role-Adaptive UI)

Foydalanuvchi interfeysida faqat uning roliga ruxsat berilgan tugma va sahifalar ko'rsatiladi:
* Talaba ekranida "Baholash" yoki "Tasdiqlash" tugmalari render bo'lmaydi.
* Mentor ekranida "Excel import" yoki boshqa kafedralar ko'rinmaydi.
* Har qanday ruxsatsiz URL kiritilsa, tizim toza oq fonda `403 — Ruxsat etilmagan sahifa` xabarnomasini ko'rsatadi.
