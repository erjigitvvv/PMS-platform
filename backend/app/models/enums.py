import enum

class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    OTM_STAFF = "OTM_STAFF"
    TEACHER = "TEACHER"
    MENTOR = "MENTOR"
    STUDENT = "STUDENT"

class InternshipType(str, enum.Enum):
    QUALIFICATION = "QUALIFICATION"   # Malakaviy amaliyot
    INDUSTRIAL = "INDUSTRIAL"         # Ishlab chiqarish amaliyoti
    PEDAGOGICAL = "PEDAGOGICAL"       # Pedagogik amaliyot
    GRADUATION = "GRADUATION"         # Diplomoldi amaliyoti

class ApplicationStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class LogStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class AttendanceStatus(str, enum.Enum):
    PRESENT = "PRESENT"       # Kelgan
    LATE = "LATE"             # Kech kelgan
    ABSENT = "ABSENT"         # Kelmagan
    EXCUSED = "EXCUSED"       # Sababli
