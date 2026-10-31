from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import date, datetime
from app.models.enums import InternshipType, ApplicationStatus, LogStatus, AttendanceStatus

class ApplicationCreate(BaseModel):
    company_id: UUID
    internship_type: InternshipType
    start_date: date
    end_date: date

class ApplicationOut(BaseModel):
    id: UUID
    student_id: UUID
    company_id: UUID
    mentor_id: Optional[UUID] = None
    teacher_id: Optional[UUID] = None
    internship_type: InternshipType
    status: ApplicationStatus
    start_date: date
    end_date: date
    order_number: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class DailyLogCreate(BaseModel):
    application_id: UUID
    log_date: date
    tasks_done: str
    acquired_skills: Optional[str] = None

class DailyLogReview(BaseModel):
    status: LogStatus
    mentor_feedback: Optional[str] = None

class DailyLogOut(BaseModel):
    id: UUID
    application_id: UUID
    log_date: date
    tasks_done: str
    acquired_skills: Optional[str] = None
    mentor_feedback: Optional[str] = None
    status: LogStatus
    approved_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    application_id: UUID
    attendance_date: date
    status: AttendanceStatus
    note: Optional[str] = None

class AttendanceOut(BaseModel):
    id: UUID
    application_id: UUID
    attendance_date: date
    status: AttendanceStatus
    note: Optional[str] = None

    class Config:
        from_attributes = True

class AssessmentUpdateMentor(BaseModel):
    mentor_score: float
    mentor_review: Optional[str] = None

class AssessmentUpdateTeacher(BaseModel):
    teacher_score: float
    teacher_review: Optional[str] = None

class AssessmentOut(BaseModel):
    id: UUID
    application_id: UUID
    mentor_score: float
    mentor_review: Optional[str] = None
    teacher_score: float
    teacher_review: Optional[str] = None
    total_score: float
    grade_letter: Optional[str] = None

    class Config:
        from_attributes = True
