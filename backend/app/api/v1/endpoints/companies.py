from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.company import Company, Vacancy
from app.models.enums import UserRole
from app.schemas.company import (
    CompanyCreate, CompanyOut,
    VacancyCreate, VacancyOut
)
from app.api.deps import require_roles, get_current_user

router = APIRouter()

@router.get("/", response_model=List[CompanyOut])
async def list_companies(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Company))
    return result.scalars().all()

@router.post("/", response_model=CompanyOut)
async def create_company(
    data: CompanyCreate,
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Students can suggest a company (is_partner=False), Admin/OTM can register partners
    is_partner = True if current_user.role in [UserRole.ADMIN, UserRole.OTM_STAFF] else False
    comp_dict = data.dict()
    comp_dict["is_partner"] = is_partner
    company = Company(**comp_dict)
    db.add(company)
    await db.commit()
    await db.refresh(company)
    return company

@router.get("/vacancies", response_model=List[VacancyOut])
async def list_vacancies(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Vacancy).where(Vacancy.is_active == True))
    return result.scalars().all()

@router.post("/vacancies", response_model=VacancyOut, dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF, UserRole.MENTOR]))])
async def create_vacancy(data: VacancyCreate, db: AsyncSession = Depends(get_db)):
    vacancy = Vacancy(**data.dict())
    db.add(vacancy)
    await db.commit()
    await db.refresh(vacancy)
    return vacancy
