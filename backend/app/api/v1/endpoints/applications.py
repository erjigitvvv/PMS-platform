import os
from typing import List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.internship import InternshipApplication, Contract, FinalAssessment
from app.models.user import User, StudentProfile
from app.models.company import Company
from app.models.enums import UserRole, ApplicationStatus
from app.schemas.internship import ApplicationCreate, ApplicationOut
from app.api.deps import get_current_user, require_roles
from app.services.document_service import DocumentGenerator
from app.core.websocket_manager import manager

router = APIRouter()

@router.get("/", response_model=List[ApplicationOut])
async def list_applications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role in [UserRole.ADMIN, UserRole.OTM_STAFF]:
        result = await db.execute(select(InternshipApplication))
        return result.scalars().all()
    elif current_user.role == UserRole.STUDENT:
        res_prof = await db.execute(select(StudentProfile).where(StudentProfile.user_id == current_user.id))
        prof = res_prof.scalars().first()
        if not prof:
            return []
        result = await db.execute(select(InternshipApplication).where(InternshipApplication.student_id == prof.id))
        return result.scalars().all()
    else:
        result = await db.execute(select(InternshipApplication))
        return result.scalars().all()

@router.post("/", response_model=ApplicationOut)
async def create_application(
    data: ApplicationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=403, detail="Faqat talabalar amaliyot arizasi bera oladi")

    res_prof = await db.execute(select(StudentProfile).where(StudentProfile.user_id == current_user.id))
    prof = res_prof.scalars().first()
    if not prof:
        raise HTTPException(status_code=400, detail="Talaba profili topilmadi")

    application = InternshipApplication(
        student_id=prof.id,
        company_id=data.company_id,
        internship_type=data.internship_type,
        start_date=data.start_date,
        end_date=data.end_date,
        status=ApplicationStatus.SUBMITTED
    )
    db.add(application)
    await db.flush()

    # Automatically initialize FinalAssessment container
    assessment = FinalAssessment(application_id=application.id)
    db.add(assessment)

    await db.commit()
    await db.refresh(application)

    # Real-time WebSocket push to OTM staff
    await manager.broadcast_to_role({
        "event": "NEW_APPLICATION",
        "message": f"Talaba {current_user.full_name} yangi amaliyot arizasi topshirdi",
        "application_id": str(application.id)
    }, role="OTM_STAFF")

    return application

@router.post("/{application_id}/approve")
async def approve_application_and_generate_contract(
    application_id: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF])),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(InternshipApplication).where(InternshipApplication.id == application_id))
    app = res.scalars().first()
    if not app:
        raise HTTPException(status_code=404, detail="Ariza topilmadi")

    app.status = ApplicationStatus.APPROVED

    # Contract generation
    contract_number = f"AMAL-{str(app.id)[:8].upper()}"
    docx_path = f"media/contracts/{contract_number}.docx"
    pdf_path = f"media/contracts/{contract_number}.pdf"

    res_company = await db.execute(select(Company).where(Company.id == app.company_id))
    company = res_company.scalars().first()
    res_student = await db.execute(select(StudentProfile).where(StudentProfile.id == app.student_id))
    student_profile = res_student.scalars().first()
    res_student_user = await db.execute(select(User).where(User.id == student_profile.user_id))
    student_user = res_student_user.scalars().first()

    DocumentGenerator.generate_contract_docx(
        contract_number=contract_number,
        student_name=student_user.full_name if student_user else "Talaba",
        university_name="Toshkent Xalqaro Universiteti (TIU)",
        company_name=company.name if company else "Hamkor Korxona",
        director_name=company.director_name if company else "",
        start_date=str(app.start_date),
        end_date=str(app.end_date),
        output_path=docx_path
    )

    DocumentGenerator.generate_contract_pdf(
        contract_number=contract_number,
        student_name=student_user.full_name if student_user else "Talaba",
        university_name="Toshkent Xalqaro Universiteti (TIU)",
        company_name=company.name if company else "Hamkor Korxona",
        start_date=str(app.start_date),
        end_date=str(app.end_date),
        output_path=pdf_path
    )

    contract = Contract(
        application_id=app.id,
        contract_number=contract_number,
        file_pdf_path=pdf_path,
        file_docx_path=docx_path,
        is_signed_by_otm=True
    )
    db.add(contract)
    await db.commit()

    # Real-time notify student
    if student_user:
        await manager.send_personal_message({
            "event": "APPLICATION_APPROVED",
            "message": "Arizangiz tasdiqlandi va 3 tomonlama shartnoma generatsiya qilindi!",
            "contract_pdf": pdf_path,
            "contract_docx": docx_path
        }, user_id=str(student_user.id))

    return {
        "success": True,
        "message": "Ariza tasdiqlandi va shartnoma yaratildi",
        "contract_number": contract_number,
        "pdf": pdf_path,
        "docx": docx_path
    }
