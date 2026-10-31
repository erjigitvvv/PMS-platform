from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.academic import Faculty, Department, AcademicGroup
from app.models.enums import UserRole
from app.schemas.academic import (
    FacultyCreate, FacultyOut,
    DepartmentCreate, DepartmentOut,
    AcademicGroupCreate, AcademicGroupOut
)
from app.api.deps import require_roles, get_current_user
from app.services.excel_service import parse_and_import_students_excel

router = APIRouter()

# Faculties
@router.get("/faculties", response_model=List[FacultyOut])
async def list_faculties(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Faculty))
    return result.scalars().all()

@router.post("/faculties", response_model=FacultyOut, dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def create_faculty(data: FacultyCreate, db: AsyncSession = Depends(get_db)):
    faculty = Faculty(**data.dict())
    db.add(faculty)
    await db.commit()
    await db.refresh(faculty)
    return faculty

# Departments
@router.get("/departments", response_model=List[DepartmentOut])
async def list_departments(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Department))
    return result.scalars().all()

@router.post("/departments", response_model=DepartmentOut, dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def create_department(data: DepartmentCreate, db: AsyncSession = Depends(get_db)):
    dept = Department(**data.dict())
    db.add(dept)
    await db.commit()
    await db.refresh(dept)
    return dept

# Groups
@router.get("/groups", response_model=List[AcademicGroupOut])
async def list_groups(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AcademicGroup))
    return result.scalars().all()

@router.post("/groups", response_model=AcademicGroupOut, dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def create_group(data: AcademicGroupCreate, db: AsyncSession = Depends(get_db)):
    grp = AcademicGroup(**data.dict())
    db.add(grp)
    await db.commit()
    await db.refresh(grp)
    return grp

# Excel Import for Students
@router.post("/import-students-excel", dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def import_students_excel(
    department_id: str = Form(...),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    if not file.filename.endswith((".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Faqat Excel (.xlsx) fayllarni yuklash mumkin")
    
    contents = await file.read()
    res = await parse_and_import_students_excel(contents, department_id, db)
    return res
