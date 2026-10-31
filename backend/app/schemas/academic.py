from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID

class FacultyBase(BaseModel):
    name: str
    code: Optional[str] = None

class FacultyCreate(FacultyBase):
    pass

class FacultyOut(FacultyBase):
    id: UUID

    class Config:
        from_attributes = True

class DepartmentBase(BaseModel):
    name: str
    faculty_id: UUID
    code: Optional[str] = None

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentOut(DepartmentBase):
    id: UUID

    class Config:
        from_attributes = True

class AcademicGroupBase(BaseModel):
    name: str
    department_id: UUID
    course_year: Optional[str] = "4"
    education_type: Optional[str] = "BACHELOR"

class AcademicGroupCreate(AcademicGroupBase):
    pass

class AcademicGroupOut(AcademicGroupBase):
    id: UUID

    class Config:
        from_attributes = True
