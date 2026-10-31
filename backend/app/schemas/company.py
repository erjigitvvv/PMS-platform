from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class CompanyBase(BaseModel):
    name: str
    tin_stir: Optional[str] = None
    address: Optional[str] = None
    director_name: Optional[str] = None
    contact_phone: Optional[str] = None
    email: Optional[str] = None
    is_partner: Optional[bool] = False

class CompanyCreate(CompanyBase):
    pass

class CompanyOut(CompanyBase):
    id: UUID

    class Config:
        from_attributes = True

class VacancyBase(BaseModel):
    company_id: UUID
    title: str
    description: Optional[str] = None
    requirements: Optional[str] = None
    quota: Optional[int] = 5
    is_active: Optional[bool] = True

class VacancyCreate(VacancyBase):
    pass

class VacancyOut(VacancyBase):
    id: UUID

    class Config:
        from_attributes = True
