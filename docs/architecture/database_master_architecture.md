# 🗄️ PMS PLATFORM — MASTER DATABASE ARCHITECTURE & OPERATIONAL ALGORITHMS
> **PostgreSQL 16 Relyatsion Sxemasi, 16 ta Jadval Spetsifikatsiyasi va Ma'lumotlar Bazasining Qat'iy Algoritmlari**

---

## 1. Relyatsion Jadvallar Arxitekturasi

### 1.1. Foydalanuvchilar va Rollar
* **`users`:** `id (UUID PK)`, `username (UNIQUE)`, `hashed_password`, `full_name`, `role (ENUM)`, `phone`, `telegram_chat_id`, `is_active`, `created_at`, `updated_at`.
* **`student_profiles`:** `id (UUID PK)`, `user_id (UUID FK -> users.id, UNIQUE)`, `group_id (UUID FK -> academic_groups.id)`, `student_id_number (UNIQUE)`, `course_year`.
* **`teacher_profiles`:** `id (UUID PK)`, `user_id (UUID FK -> users.id, UNIQUE)`, `department_id (UUID FK -> departments.id)`, `academic_degree`.
* **`mentor_profiles`:** `id (UUID PK)`, `user_id (UUID FK -> users.id, UNIQUE)`, `company_id (UUID FK -> companies.id)`, `position`.

### 1.2. Akademik Tuzilma
* **`faculties`:** `id (UUID PK)`, `name (VARCHAR 200, UNIQUE)`, `code`.
* **`departments`:** `id (UUID PK)`, `faculty_id (UUID FK -> faculties.id)`, `name`, `code`.
* **`academic_groups`:** `id (UUID PK)`, `department_id (UUID FK -> departments.id)`, `name`, `course_year`, `education_type`.

### 1.3. Korxonalar va Vakansiyalar
* **`companies`:** `id (UUID PK)`, `name`, `tin_stir (UNIQUE, INDEX)`, `address`, `director_name`, `contact_phone`, `email`, `is_partner`.
* **`vacancies`:** `id (UUID PK)`, `company_id (UUID FK -> companies.id)`, `title`, `description`, `requirements`, `quota`, `is_active`.

### 1.4. Amaliyot, Kundalik va Hujjatlar
* **`internship_applications`:** `id (UUID PK)`, `student_id (FK)`, `company_id (FK)`, `mentor_id (FK)`, `teacher_id (FK)`, `internship_type`, `status (SUBMITTED, APPROVED, IN_PROGRESS, COMPLETED)`, `start_date`, `end_date`, `order_number`.
* **`contracts`:** `id (UUID PK)`, `application_id (FK, UNIQUE)`, `contract_number (UNIQUE)`, `file_pdf_path`, `file_docx_path`, `qr_hash (UNIQUE)`, `is_signed_by_otm`, `is_signed_by_company`.
* **`daily_logs`:** `id (UUID PK)`, `application_id (FK)`, `log_date`, `tasks_done`, `acquired_skills`, `mentor_feedback`, `status (PENDING, APPROVED, REJECTED)`, `approved_at`. (Constraint: `UNIQUE(application_id, log_date)`).
* **`daily_log_attachments`:** `id (UUID PK)`, `daily_log_id (FK)`, `file_path`, `file_name`, `file_type`.
* **`attendance_records`:** `id (UUID PK)`, `application_id (FK)`, `attendance_date`, `status (PRESENT, ABSENT, EXCUSED)`, `note`. (Constraint: `UNIQUE(application_id, attendance_date)`).
* **`final_assessments`:** `id (UUID PK)`, `application_id (FK, UNIQUE)`, `mentor_score (0-50)`, `mentor_review`, `teacher_score (0-50)`, `teacher_review`, `total_score (0-100)`, `grade_letter (A, B, C, D, F)`, `final_report_file`.
* **`audit_logs`:** `id (UUID PK)`, `user_id (FK)`, `action`, `entity_type`, `entity_id`, `ip_address`, `created_at`.
* **`notifications`:** `id (UUID PK)`, `user_id (FK)`, `title`, `message`, `is_read`, `created_at`.

---

## 2. Ma'lumotlar Bazasining 6 ta Qat'iy Algoritmi

1. **Kvota poygasi peximistik qulflash algoritmi (Pessimistic Locking):**
   `SELECT quota FROM vacancies WHERE id = :id FOR UPDATE;` orqali bir vaqtda kelgan arizalarning kvotadan oshib ketishining oldi olinadi.
2. **ACID Tranzaksiya Algoritmi:**
   Ariza tasdiqlanishi va hujjat generatsiyasi yagona tranzaksiya ichida bajariladi (`BEGIN ... COMMIT / ROLLBACK`).
3. **Avtomatik Baholash Triggeri:**
   `mentor_score` va `teacher_score` qo'shilib, avtomatik `total_score` va ECTS harfiy ko'rsatkichi (`A/B/C/D/F`) hisoblanadi.
4. **Idempotent Duplikatsiyadan Himoya:**
   Bitta kunda bitta talabaga ikkinchi kundalik yoki ikkinchi davomat kiritish bazadagi `UNIQUE` kompozit indekslar orqali bloklanadi.
5. **Soft Delete va Audit Tracing:**
   Foydalanuvchi yoki korxona ma'lumotlari jismonan o'chirilmaydi, barcha o'zgarishlar `audit_logs` jadvaliga yoziladi.
6. **Uzluksiz Backup Algoritmi:**
   Har tunda `pg_dump` orqali to'liq zaxira olinadi va WAL arxivlash yoqiladi.
