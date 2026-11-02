# Implementation Plan: Teacher & Admin Portal Submenus, 100-Point ECTS, and Anti-Fraud Integration

## Context
Following the successful implementation of the Dekanat portal, Product Owner (PO) has requested equivalent advanced enhancements to the remaining two major portals:
1. **Teacher Portal (`frontend/src/app/teacher/page.tsx`)**:
   - `CollapsibleSidebar` with "Akademik Nazorat" accordion submenus: "Kundaliklar Taftishi" (`logbook-review`) and "100 Ballik ECTS Baholash" (`grading-100`).
   - Interactive 100-point ECTS grading calculator combining mentor scores (0-50) and teacher defense scores (0-50) to output A, B, C, D, F grades.
   - Live search and student detail modal.
2. **Admin Portal (`frontend/src/app/admin/page.tsx`)**:
   - `CollapsibleSidebar` with accordion submenus:
     - "Tuzilma & Kvotalar" (`structure`): "Fakultetlar va Dekanatlar" (`faculties-depts`) with `[+ Yangi Fakultet/Dekanat Qo'shish]` modal generating `DK######` logins, and "Akademik Guruhlar va Kvotalar" (`groups-quotas`).
     - "Xavfsizlik & Anti-Fraud" (`security`): "Anti-Tailgating Jurnali" (`antifraud-logs`) with CRITICAL/WARNING/INFO risk levels, and "Tizim Zaxirasi" (`system-backups`).
3. **Design & Quality Standards**:
   - 100% vector Lucide React icons, 0 emojis, clean minimalist TIU branding, `shadow-sm`.
   - Verified 0-error Next.js production build (`npm run build`) and 24/24 passing Python Pytest integration tests.

## Critical Files to Modify
- `frontend/src/app/teacher/page.tsx`: Add Kundaliklar Taftishi, 100-point ECTS grading calculator, live search, and StudentDetailModal.
- `frontend/src/app/admin/page.tsx`: Add Faculties/Dekanats management with modal credential generation, Academic Groups/Quotas, Anti-Tailgating audit logs, and System Backups.

## Verification Steps
1. Run `npm --prefix frontend run build` to verify 0 errors.
2. Run `python -m pytest backend/tests/ -v` to verify 24/24 tests pass successfully.
