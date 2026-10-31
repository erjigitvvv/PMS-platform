import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.core.database import Base, GUID
from app.models.enums import UserRole

class User(Base):
    __tablename__ = "users"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.STUDENT, index=True)
    phone = Column(String(50), nullable=True)
    telegram_chat_id = Column(String(100), nullable=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student_profile = relationship("StudentProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    teacher_profile = relationship("TeacherProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    mentor_profile = relationship("MentorProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    group_id = Column(GUID, ForeignKey("academic_groups.id", ondelete="SET NULL"), nullable=True)
    student_id_number = Column(String(50), unique=True, nullable=True)
    course_year = Column(String(10), default="4")

    user = relationship("User", back_populates="student_profile")
    group = relationship("AcademicGroup", back_populates="students")
    applications = relationship("InternshipApplication", back_populates="student")

class TeacherProfile(Base):
    __tablename__ = "teacher_profiles"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    department_id = Column(GUID, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    academic_degree = Column(String(100), nullable=True)

    user = relationship("User", back_populates="teacher_profile")
    department = relationship("Department", back_populates="teachers")
    supervised_applications = relationship("InternshipApplication", back_populates="teacher")

class MentorProfile(Base):
    __tablename__ = "mentor_profiles"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    company_id = Column(GUID, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    position = Column(String(150), nullable=True)

    user = relationship("User", back_populates="mentor_profile")
    company = relationship("Company", back_populates="mentors")
    mentored_applications = relationship("InternshipApplication", back_populates="mentor")
