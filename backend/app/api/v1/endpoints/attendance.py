from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.internship import AttendanceRecord
from app.models.enums import UserRole
from app.schemas.internship import AttendanceCreate, AttendanceOut
from app.api.deps import require_roles

router = APIRouter()

@router.get("/application/{app_id}", response_model=List[AttendanceOut])
async def get_attendance_for_application(
    app_id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(AttendanceRecord).where(AttendanceRecord.application_id == app_id).order_by(AttendanceRecord.attendance_date.desc())
    )
    return result.scalars().all()

@router.post("/", response_model=AttendanceOut, dependencies=[Depends(require_roles([UserRole.MENTOR, UserRole.ADMIN]))])
async def record_attendance(
    data: AttendanceCreate,
    db: AsyncSession = Depends(get_db)
):
    # Upsert mantiqi: agar shu kunga allaqachon davomat belgilangan bo'lsa, yangilaymiz
    existing = await db.execute(
        select(AttendanceRecord).where(
            AttendanceRecord.application_id == data.application_id,
            AttendanceRecord.attendance_date == data.attendance_date
        )
    )
    record = existing.scalars().first()
    if record:
        record.status = data.status
        record.note = data.note
    else:
        record = AttendanceRecord(
            application_id=data.application_id,
            attendance_date=data.attendance_date,
            status=data.status,
            note=data.note
        )
        db.add(record)

    await db.commit()
    await db.refresh(record)
    return record
