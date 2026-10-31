import uuid
from datetime import datetime, date
from sqlalchemy import Column, String, Boolean, DateTime, Date, ForeignKey, Float, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.core.database import Base, GUID
from app.models.enums import InternshipType, ApplicationStatus, LogStatus, AttendanceStatus

class InternshipApplication(Base):
    __tablename__ = "internship_applications"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    student_id = Column(GUID, ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    company_id = Column(GUID, ForeignKey("companies.id", ondelete="RESTRICT"), nullable=False)
    mentor_id = Column(GUID, ForeignKey("mentor_profiles.id", ondelete="SET NULL"), nullable=True)
    teacher_id = Column(GUID, ForeignKey("teacher_profiles.id", ondelete="SET NULL"), nullable=True)

    internship_type = Column(SQLEnum(InternshipType), default=InternshipType.INDUSTRIAL, nullable=False)
    status = Column(SQLEnum(ApplicationStatus), default=ApplicationStatus.SUBMITTED, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    order_number = Column(String(100), nullable=True)  # Rektorat buyrug'i raqami
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("StudentProfile", back_populates="applications")
    company = relationship("Company", back_populates="applications")
    mentor = relationship("MentorProfile", back_populates="mentored_applications")
    teacher = relationship("TeacherProfile", back_populates="supervised_applications")

    contract = relationship("Contract", back_populates="application", uselist=False, cascade="all, delete-orphan")
    daily_logs = relationship("DailyLog", back_populates="application", cascade="all, delete-orphan")
    attendances = relationship("AttendanceRecord", back_populates="application", cascade="all, delete-orphan")
    assessment = relationship("FinalAssessment", back_populates="application", uselist=False, cascade="all, delete-orphan")
    penalties = relationship("PenaltyRecord", back_populates="application", cascade="all, delete-orphan")

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    application_id = Column(GUID, ForeignKey("internship_applications.id", ondelete="CASCADE"), unique=True, nullable=False)
    contract_number = Column(String(100), unique=True, nullable=False)
    file_pdf_path = Column(String(500), nullable=True)
    file_docx_path = Column(String(500), nullable=True)
    is_signed_by_otm = Column(Boolean, default=False)
    is_signed_by_company = Column(Boolean, default=False)
    is_signed_by_student = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("InternshipApplication", back_populates="contract")

class DailyLog(Base):
    __tablename__ = "daily_logs"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    application_id = Column(GUID, ForeignKey("internship_applications.id", ondelete="CASCADE"), nullable=False)
    log_date = Column(Date, nullable=False, default=date.today)
    tasks_done = Column(Text, nullable=False)
    acquired_skills = Column(Text, nullable=True)
    mentor_feedback = Column(Text, nullable=True)
    teacher_notes = Column(Text, nullable=True)
    status = Column(SQLEnum(LogStatus), default=LogStatus.PENDING, nullable=False)
    approved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("InternshipApplication", back_populates="daily_logs")
    attachments = relationship("DailyLogAttachment", back_populates="daily_log", cascade="all, delete-orphan")

class DailyLogAttachment(Base):
    __tablename__ = "daily_log_attachments"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    daily_log_id = Column(GUID, ForeignKey("daily_logs.id", ondelete="CASCADE"), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    daily_log = relationship("DailyLog", back_populates="attachments")

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    application_id = Column(GUID, ForeignKey("internship_applications.id", ondelete="CASCADE"), nullable=False)
    attendance_date = Column(Date, nullable=False, default=date.today)
    status = Column(SQLEnum(AttendanceStatus), default=AttendanceStatus.PRESENT, nullable=False)
    note = Column(String(255), nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("InternshipApplication", back_populates="attendances")

class FinalAssessment(Base):
    __tablename__ = "final_assessments"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    application_id = Column(GUID, ForeignKey("internship_applications.id", ondelete="CASCADE"), unique=True, nullable=False)

    mentor_score = Column(Float, default=0.0)
    mentor_review = Column(Text, nullable=True)

    teacher_score = Column(Float, default=0.0)
    teacher_review = Column(Text, nullable=True)

    total_score = Column(Float, default=0.0)
    grade_letter = Column(String(5), nullable=True)

    final_report_file = Column(String(500), nullable=True)
    submitted_at = Column(DateTime, nullable=True)
    graded_at = Column(DateTime, nullable=True)

    application = relationship("InternshipApplication", back_populates="assessment")

class PenaltyRecord(Base):
    __tablename__ = "penalty_records"

    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    application_id = Column(GUID, ForeignKey("internship_applications.id", ondelete="CASCADE"), nullable=False)
    penalty_type = Column(String(50), nullable=False)
    penalty_points = Column(Float, nullable=False, default=1.0)
    reason = Column(Text, nullable=False)
    is_waived = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    application = relationship("InternshipApplication", back_populates="penalties")
