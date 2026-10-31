import io
import openpyxl
from datetime import datetime
from typing import List, Dict, Any
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.academic import Faculty, Department, AcademicGroup
from app.models.user import User, StudentProfile
from app.models.enums import UserRole
from app.core.security import get_password_hash

async def parse_and_import_students_excel(file_bytes: bytes, department_id: str, db: AsyncSession) -> Dict[str, Any]:
    workbook = openpyxl.load_workbook(filename=io.BytesIO(file_bytes), data_only=True)
    sheet = workbook.active

    created_students = 0
    errors = []

    # Expected columns: Full Name | Group Name | Username | Password | Phone (Student ID is auto-generated)
    current_year = datetime.now().year
    # Count existing students to continue sequence
    count_res = await db.execute(select(func.count(StudentProfile.id)))
    base_seq = count_res.scalar() or 0

    for row_idx, row in enumerate(sheet.iter_rows(min_row=2, values_only=True), start=2):
        if not row or not any(row):
            continue
        try:
            full_name = str(row[0]).strip() if row[0] else None
            group_name = str(row[1]).strip() if len(row) > 1 and row[1] else "Standart Guruh"
            username = str(row[2]).strip() if len(row) > 2 and row[2] else None
            password = str(row[3]).strip() if len(row) > 3 and row[3] else "Talaba123!"
            phone = str(row[4]).strip() if len(row) > 4 and row[4] else None

            if not full_name or not username:
                errors.append(f"{row_idx}-qator: Ism-familiya yoki username kiritilmagan")
                continue

            # Auto-generate unique Student ID: e.g. STD-2026-0001
            base_seq += 1
            auto_student_id = f"STD-{current_year}-{base_seq:04d}"

            # Check if group exists, else create
            res_grp = await db.execute(
                select(AcademicGroup).where(
                    AcademicGroup.name == group_name,
                    AcademicGroup.department_id == department_id
                )
            )
            group = res_grp.scalars().first()
            if not group:
                group = AcademicGroup(name=group_name, department_id=department_id)
                db.add(group)
                await db.flush()

            # Check if user exists
            res_user = await db.execute(select(User).where(User.username == username))
            existing_user = res_user.scalars().first()
            if existing_user:
                errors.append(f"{row_idx}-qator: '{username}' foydalanuvchisi allaqachon mavjud")
                continue

            # Create User
            new_user = User(
                username=username,
                hashed_password=get_password_hash(password),
                full_name=full_name,
                role=UserRole.STUDENT,
                phone=phone
            )
            db.add(new_user)
            await db.flush()

            # Create Student Profile
            profile = StudentProfile(
                user_id=new_user.id,
                group_id=group.id,
                student_id_number=auto_student_id
            )
            db.add(profile)
            created_students += 1

        except Exception as e:
            errors.append(f"{row_idx}-qator: Xatolik - {str(e)}")

    await db.commit()
    return {
        "success": True,
        "imported_count": created_students,
        "errors": errors
    }
