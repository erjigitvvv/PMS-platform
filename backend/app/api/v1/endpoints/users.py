from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.security import get_password_hash
from app.models.user import User, StudentProfile, TeacherProfile, MentorProfile
from app.models.enums import UserRole
from app.schemas.user import UserCreate, UserOut, UserUpdate
from app.api.deps import require_roles, get_current_user

router = APIRouter()

@router.get("/", response_model=List[UserOut], dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def list_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    return result.scalars().all()

@router.post("/", response_model=UserOut, dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.OTM_STAFF]))])
async def create_user(data: UserCreate, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.username == data.username))
    if res.scalars().first():
        raise HTTPException(status_code=400, detail="Ushbu username band")

    new_user = User(
        username=data.username,
        hashed_password=get_password_hash(data.password),
        full_name=data.full_name,
        role=data.role,
        phone=data.phone,
        telegram_chat_id=data.telegram_chat_id,
        is_active=data.is_active
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user
