from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.internship import DailyLog, InternshipApplication
from app.models.user import User, StudentProfile
from app.models.enums import UserRole, LogStatus
from app.schemas.internship import DailyLogCreate, DailyLogOut, DailyLogReview
from app.api.deps import get_current_user, require_roles
from app.core.websocket_manager import manager

router = APIRouter()

@router.get("/application/{app_id}", response_model=List[DailyLogOut])
async def get_logs_for_application(
    app_id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(DailyLog).where(DailyLog.application_id == app_id).order_by(DailyLog.log_date.desc())
    )
    return result.scalars().all()

@router.post("/", response_model=DailyLogOut)
async def create_daily_log(
    data: DailyLogCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=403, detail="Faqat talabalar kundalik to'ldira oladi")

    log = DailyLog(
        application_id=data.application_id,
        log_date=data.log_date,
        tasks_done=data.tasks_done,
        acquired_skills=data.acquired_skills,
        status=LogStatus.PENDING
    )
    db.add(log)
    await db.commit()
    await db.refresh(log)

    # Real-time notification to Mentor
    await manager.broadcast_to_role({
        "event": "NEW_DAILY_LOG",
        "message": f"{current_user.full_name} yangi kundalik kiritdi",
        "log_id": str(log.id),
        "log_date": str(log.log_date)
    }, role="MENTOR")

    return log

@router.patch("/{log_id}/review", response_model=DailyLogOut)
async def review_daily_log(
    log_id: str,
    review_data: DailyLogReview,
    current_user: User = Depends(require_roles([UserRole.MENTOR, UserRole.ADMIN])),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(DailyLog).where(DailyLog.id == log_id))
    log = res.scalars().first()
    if not log:
        raise HTTPException(status_code=404, detail="Kundalik yozuvi topilmadi")

    log.status = review_data.status
    log.mentor_feedback = review_data.mentor_feedback
    if review_data.status == LogStatus.APPROVED:
        log.approved_at = datetime.utcnow()

    await db.commit()
    await db.refresh(log)

    # Find student to push real-time notification
    res_app = await db.execute(select(InternshipApplication).where(InternshipApplication.id == log.application_id))
    app = res_app.scalars().first()
    if app:
        res_stud = await db.execute(select(StudentProfile).where(StudentProfile.id == app.student_id))
        stud_prof = res_stud.scalars().first()
        if stud_prof:
            await manager.send_personal_message({
                "event": "LOG_REVIEWED",
                "message": f"Kundaligingiz '{review_data.status.value}' qilindi",
                "log_id": str(log.id),
                "status": review_data.status.value
            }, user_id=str(stud_prof.user_id))

    return log
