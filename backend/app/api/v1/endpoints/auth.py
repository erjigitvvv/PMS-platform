from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import Token, LoginRequest
from app.schemas.user import UserOut
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    login_data: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    raw_user = login_data.username.strip()
    alias_map = {
        'admin': 'AD987789',
        'dekanat': 'DK204581',
        'oqituvchi': 'TC309482',
        'teacher': 'TC309482',
        'mentor': 'MN408193',
        'talaba': 'ST501824',
        'student': 'ST501824'
    }
    target_username = alias_map.get(raw_user.lower(), raw_user)
    result = await db.execute(
        select(User).where(
            (User.username == target_username) | 
            (User.username == raw_user) |
            (User.username == raw_user.upper())
        )
    )
    user = result.scalars().first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Noto'g'ri login yoki parol"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Foydalanuvchi akkaunti bloklangan"
        )
    
    access_token = create_access_token(subject=str(user.id), role=user.role.value)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user_id": str(user.id),
        "full_name": user.full_name
    }

@router.get("/me", response_model=UserOut)
async def read_users_me(
    current_user: User = Depends(get_current_user)
):
    return current_user
