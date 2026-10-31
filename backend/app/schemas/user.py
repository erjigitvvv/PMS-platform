from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime
from app.models.enums import UserRole

class UserBase(BaseModel):
    username: str
    full_name: str
    role: UserRole
    phone: Optional[str] = None
    telegram_chat_id: Optional[str] = None
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    telegram_chat_id: Optional[str] = None
    is_active: Optional[bool] = None

class UserOut(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
