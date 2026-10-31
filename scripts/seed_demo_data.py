import asyncio
import sys
import os

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.core.database import AsyncSessionLocal, engine, Base
from app.models.user import User, StudentProfile, TeacherProfile, MentorProfile
from app.models.academic import Faculty, Department, AcademicGroup
from app.models.company import Company, Vacancy
from app.models.enums import UserRole
from app.core.security import get_password_hash

async def seed():
    print("Baza jadvallarini yaratish...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        print("Demo ma'lumotlarni kiritish...")
        
        # 1. Faculty, Department, Group
        faculty = Faculty(name="Axborot texnologiyalari va raqamli iqtisodiyot", code="ATRI")
        db.add(faculty)
        await db.flush()

        department = Department(name="Dasturiy injiniring kafedrasi", faculty_id=faculty.id, code="DI")
        db.add(department)
        await db.flush()

        group = AcademicGroup(name="DI-202-22", department_id=department.id, course_year="4")
        db.add(group)
        await db.flush()

        # 2. Company & Vacancy
        company = Company(
            name="Uzum Technologies MCHJ",
            tin_stir="305889123",
            address="Toshkent sh., Mirobod t., Oybek ko'chasi 12",
            director_name="Shaxzod Rahimov",
            contact_phone="+998712000000",
            email="hr@uzum.com",
            is_partner=True
        )
        db.add(company)
        await db.flush()

        vacancy = Vacancy(
            company_id=company.id,
            title="Junior Backend Developer (Python / FastAPI)",
            description="Talabalar uchun haq to'lanadigan 3 oylik amaliyot o'rni",
            requirements="Python, REST API, Git asoslari",
            quota=3
        )
        db.add(vacancy)
        await db.flush()

        # 3. Users for all 5 roles
        # Role 1: Super Admin
        admin = User(
            username="admin",
            hashed_password=get_password_hash("Admin123!"),
            full_name="Asosiy Administrator",
            role=UserRole.ADMIN,
            phone="+998901111111"
        )
        db.add(admin)

        # Role 2: OTM Staff (Dekanat / Amaliyot bo'limi)
        staff = User(
            username="dekanat",
            hashed_password=get_password_hash("Dekanat123!"),
            full_name="Alisher Qodirov (Amaliyot bo'limi boshlig'i)",
            role=UserRole.OTM_STAFF,
            phone="+998902222222"
        )
        db.add(staff)

        # Role 3: Teacher (Kafedra o'qituvchisi)
        teacher_user = User(
            username="oqituvchi",
            hashed_password=get_password_hash("Ustoz123!"),
            full_name="Dotsent Jamshid Karimov",
            role=UserRole.TEACHER,
            phone="+998903333333"
        )
        db.add(teacher_user)
        await db.flush()
        teacher_prof = TeacherProfile(user_id=teacher_user.id, department_id=department.id, academic_degree="Dotsent")
        db.add(teacher_prof)

        # Role 4: Mentor (Korxona rahbari/mentori)
        mentor_user = User(
            username="mentor",
            hashed_password=get_password_hash("Mentor123!"),
            full_name="Sardor Bekmurodov (Lead Engineer)",
            role=UserRole.MENTOR,
            phone="+998904444444"
        )
        db.add(mentor_user)
        await db.flush()
        mentor_prof = MentorProfile(user_id=mentor_user.id, company_id=company.id, position="Lead Backend Engineer")
        db.add(mentor_prof)

        # Role 5: Student (Amaliyotchi talaba)
        student_user = User(
            username="talaba",
            hashed_password=get_password_hash("Talaba123!"),
            full_name="Bekzod Ergashev (Talaba)",
            role=UserRole.STUDENT,
            phone="+998905555555"
        )
        db.add(student_user)
        await db.flush()
        student_prof = StudentProfile(user_id=student_user.id, group_id=group.id, student_id_number="TIU-2022-049")
        db.add(student_prof)

        await db.commit()
        print("\n[OK] Demo ma'lumotlar muvaffaqiyatli yuklandi!")
        print("--------------------------------------------------")
        print("Sinov hisoblari (Login va Parollar):")
        print("1. Super Admin:       admin       / Admin123!")
        print("2. OTM Dekanat:       dekanat     / Dekanat123!")
        print("3. Kafedra Rahbari:   oqituvchi   / Ustoz123!")
        print("4. Korxona Mentori:   mentor      / Mentor123!")
        print("5. Amaliyotchi Talaba:talaba      / Talaba123!")
        print("--------------------------------------------------")

if __name__ == "__main__":
    asyncio.run(seed())
