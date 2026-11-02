# Implementation Plan: Dekanat Portal Comprehensive Expansion & Notifications

## Context
Product Owner (PO) has requested a comprehensive set of enhancements to the Dekanat portal (`frontend/src/app/dekanat/page.tsx`) and login logo (`frontend/src/app/login/page.tsx`):
1. **Login Logo (`/login`)**: Enlarge to `h-28 sm:h-32 w-auto object-contain`, borderless, transparent, centered.
2. **Notification Popover**: Add interactive `Bell` icon with unread badge (`3`) in the Dekanat header, opening a dropdown popover with "Bildirishnomalar Markazi", "Barchasini o'qilgan deb belgilash", and 4 real notifications with relative timestamps and category badges.
3. **Full-Width Content Container**: Expand container from `max-w-6xl` to `max-w-7xl` / `w-full px-4 sm:px-6 lg:px-8` so tables use full viewport width.
4. **Student Submenus & Filtering**: Restructure student submenus to:
   - `Barcha Talabalar`
   - `⚠️ Ustozsiz Talabalar`
   - `🏢 Korxona Biriktiruvi`
   - `📊 Kundalik & Davomat`
   Add group filter pills (`[Barchasi]`, `[DI-202-22]`, `[DT-207-22]`, `[AI-101-23]`), multi-select checkboxes for bulk operations, and export button.
5. **Optional Student Creation Modal**: Remove mandatory `*` for teacher and company in `isStudentModalOpen` modal. Provide default `-- Biriktirilmasin (Keyinroq biriktirish) --` and `-- Tanlanmasin (Keyinroq biriktirish) --` options.
6. **Teachers Table View**: Add table view for "Kafedra Ustozlari" with columns for ID (`TC######`), name, degree/position, department, phone, academic workload progress bar (`3/8`), status, and "Ko'rish" modal trigger, with a toggle between Grid and Table views.
7. **Partner Companies & New Partner Modal**: Enhance partner company catalog and add a **"+ Yangi Tashkilot Qo'shish"** modal supporting name, logo upload / initials badge, category, quota, TIN, address, contact person, and phone.
8. **Verification**: Verify Next.js production build (`npm --prefix frontend run build`) and Pytest suite (`pytest backend/tests/ -v`).

