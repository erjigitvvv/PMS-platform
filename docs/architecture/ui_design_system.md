# ⚪ Ultra-Clean White Minimalist Design System
> **Dizayn Konsepsiyasi: Oq, Minimalistik, Toza va Nafis (Pure White & Clean)**

---

## 1. Falsafa va Asosiy Qoidalar (Design Principles)

1. **Air & Space (Nafas oluvchi bo'shliq):**
   * Elementlar bir-biriga yopishib turmaydi; keng margin va paddinglar (`p-6`, `p-8`, `gap-6`).
2. **Pure White Canvas (Sof oq zamin):**
   * Asosiy fon: sof oq (`#FFFFFF`) yoki eng mayin kulrang parda (`#FAFAFA` / `#F8FAFC`).
   * Kartochkalar (Cards): sof oq fonda o'ta yupqa, deyarli sezilmas chegara chiziqlari bilan ajratiladi (`border border-zinc-200/80` yoki `border-slate-100`).
3. **Subtle Elevation (Yengil soyalar):**
   * Qo'pol qora soyalar mutlaqo yo'q. Faqat eng mayin, tarqoq tabiiy yorug'lik effektlari (`shadow-[0_1px_3px_rgba(0,0,0,0.04)]` yoki `shadow-sm`).
4. **Monochrome + Targeted Accents (Monoxrom va Aniq Aksentlar):**
   * Asosiy matnlar: chuqur qora (`#09090B` / `text-zinc-900`) va nozik kulrang (`#71717A` / `text-zinc-500`).
   * Tugmalar (Buttons): Vercel/Linear uslubidagi chuqur qora tugma (`bg-zinc-900 text-white hover:bg-zinc-800`) va toza oq konturli tugmalar (`bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-50`).
   * Status ko'rsatkichlari: Juda mayin pastel fondagi piktogrammalar (masalan, yashil tasdiq: `bg-emerald-50 text-emerald-700 border border-emerald-200/60`).

---

## 2. Ranglar Palitrasi (Design Tokens)

| Element | Qiymati / Tailwind Class | Ko'rinishi va Vazifasi |
| :--- | :--- | :--- |
| **Canvas Background** | `#FAFAFA` (`bg-zinc-50/50`) | Umumiy sahifa foni |
| **Card / Surface** | `#FFFFFF` (`bg-white`) | Kartochkalar, modallar, jadvallar |
| **Borders / Dividers**| `#E4E4E7` (`border-zinc-200`) | Elementlar orasidagi nafis 1px chiziq |
| **Primary Text** | `#09090B` (`text-zinc-900`) | Sarlavhalar, asosiy raqamlar |
| **Muted Text** | `#71717A` (`text-zinc-500`) | Izohlar, sanalar, ikkinchi darajali ma'lumot |
| **Status: Success** | `bg-emerald-50 text-emerald-700` | Tasdiqlangan amaliyot, kundalik |
| **Status: Pending** | `bg-amber-50 text-amber-700` | Kutilayotgan arizalar |
| **Status: Rejected**| `bg-rose-50 text-rose-700` | Qaytarilgan vazifalar |

---

## 3. Tipografiya va Shakllar
* **Shrift:** `Inter` / `Plus Jakarta Sans` — ultra-tiniq, zamonaviy.
* **Burchaklar (Border Radius):** 
  * Kartochkalar: `rounded-2xl` (16px) — yumshoq va zamonaviy;
  * Tugmalar va inputlar: `rounded-xl` (12px);
  * Paktlar (Badges): `rounded-full`.
