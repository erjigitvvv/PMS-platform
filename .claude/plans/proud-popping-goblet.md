# Implementation Plan: Dekanat Guruhlar Katalogi va Gender Integratsiyasi (Sprint v3.2)

## Context
The Product Owner & QA Lead have requested a key extension to the Dekanat portal (`frontend/src/app/dekanat/page.tsx`):
1. **Gender Integration**: Add `gender: 'ERKAK' | 'AYOL'` to all student records and display gender chips (`👨 Erkak` / `👩 Ayol`) in the student table, with filtering capability.
2. **Academic Groups Hub (`activeTab === 'groups'`)**: Introduce a dedicated "Guruhlar Katalogi" tab with Bento cards calculating real-time statistics (total students, male/female count and percentages, assigned practice ratio, health status: Healthy/Warning/Critical), tutor details, bulk Telegram DM actions, ZIP archive triggers, and safe deletion rules.
3. **Deep-Linking**: Clicking `[ 👥 {total} nafar Talabalar ]` on a group card navigates to the student tab pre-filtered by that group code.
4. **Bulk Telegram DM**: Clicking `[ 💬 Guruhga Telegram DM ]` automatically selects all students in that group and opens the `@tiupm_bot` messaging modal.

## Critical Files to Modify
- `frontend/src/app/dekanat/page.tsx`

## Implementation Steps
1. **Update Interfaces**:
   - Add `gender: 'ERKAK' | 'AYOL'` to `StudentItem`.
   - Add `AcademicGroupItem` interface.
2. **Add Academic Groups State**:
   - Initialize `groups` state with sample groups (`DI-202-22`, `DI-201-22`, `AI-101-23`, etc.).
   - Add state for group search, course filter, and group creation modal.
3. **Implement Real-time Statistics Calculation & Health Status**:
   - Compute metrics dynamically from `students` array.
4. **Build "Guruhlar Katalogi" UI (`activeTab === 'groups'`)**:
   - Header with search, course filter, and `[ + Yangi Guruh Yaratish ]` button.
   - Bento Grid cards with Health badge, Tutor info, Gender demographics chip, Progress bar, and action buttons.
5. **Enhance Student Table (`activeTab === 'students'`)**:
   - Add Gender column with styled chips.
   - Add Gender filter dropdown (`Barchasi`, `👨 Erkak`, `👩 Ayol`).
   - Ensure deep-linking from group cards works seamlessly (`groupFilter` state).
6. **Verification**:
   - Run `npm --prefix frontend run build` to ensure zero type errors.

## Verification Plan
- Run `npm --prefix frontend run build` to verify TypeScript and Next.js compilation.
