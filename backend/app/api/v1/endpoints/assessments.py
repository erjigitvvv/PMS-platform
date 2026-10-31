from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.internship import FinalAssessment
from app.models.enums import UserRole
from app.schemas.internship import AssessmentOut, AssessmentUpdateMentor, AssessmentUpdateTeacher
from app.api.deps import require_roles

router = APIRouter()

def calculate_grade(total_score: float) -> str:
    if total_score >= 90:
        return "A"
    elif total_score >= 80:
        return "B"
    elif total_score >= 70:
        return "C"
    elif total_score >= 60:
        return "D"
    else:
        return "F"

@router.get("/application/{app_id}", response_model=AssessmentOut)
async def get_assessment(
    app_id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(FinalAssessment).where(FinalAssessment.application_id == app_id))
    assessment = result.scalars().first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Baholash ma'lumotlari topilmadi")
    return assessment

@router.patch("/application/{app_id}/mentor", response_model=AssessmentOut, dependencies=[Depends(require_roles([UserRole.MENTOR, UserRole.ADMIN]))])
async def grade_by_mentor(
    app_id: str,
    data: AssessmentUpdateMentor,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(FinalAssessment).where(FinalAssessment.application_id == app_id))
    assessment = result.scalars().first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Baholash ma'lumotlari topilmadi")

    if data.mentor_score > 50:
        raise HTTPException(status_code=400, detail="Mentor bahosi 50 balldan oshmasligi kerak")

    assessment.mentor_score = data.mentor_score
    assessment.mentor_review = data.mentor_review
    assessment.total_score = assessment.mentor_score + assessment.teacher_score
    assessment.grade_letter = calculate_grade(assessment.total_score)

    await db.commit()
    await db.refresh(assessment)
    return assessment

@router.patch("/application/{app_id}/teacher", response_model=AssessmentOut, dependencies=[Depends(require_roles([UserRole.TEACHER, UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def grade_by_teacher(
    app_id: str,
    data: AssessmentUpdateTeacher,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(FinalAssessment).where(FinalAssessment.application_id == app_id))
    assessment = result.scalars().first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Baholash ma'lumotlari topilmadi")

    if data.teacher_score > 50:
        raise HTTPException(status_code=400, detail="OTM bahosi 50 balldan oshmasligi kerak")

    assessment.teacher_score = data.teacher_score
    assessment.teacher_review = data.teacher_review
    assessment.total_score = assessment.mentor_score + assessment.teacher_score
    assessment.grade_letter = calculate_grade(assessment.total_score)

    await db.commit()
    await db.refresh(assessment)
    return assessment
