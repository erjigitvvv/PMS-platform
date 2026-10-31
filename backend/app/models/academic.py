import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Faculty(Base):
    __tablename__ = "faculties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False, unique=True)
    code = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    departments = relationship("Department", back_populates="faculty", cascade="all, delete-orphan")

class Department(Base):
    __tablename__ = "departments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    faculty_id = Column(UUID(as_uuid=True), ForeignKey("faculties.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(200), nullable=False)
    code = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    faculty = relationship("Faculty", back_populates="departments")
    groups = relationship("AcademicGroup", back_populates="department", cascade="all, delete-orphan")
    teachers = relationship("TeacherProfile", back_populates="department")

class AcademicGroup(Base):
    __tablename__ = "academic_groups"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    course_year = Column(String(10), default="4")
    education_type = Column(String(50), default="BACHELOR")
    created_at = Column(DateTime, default=datetime.utcnow)

    department = relationship("Department", back_populates="groups")
    students = relationship("StudentProfile", back_populates="group")
