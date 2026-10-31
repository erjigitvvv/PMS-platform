from pydantic import BaseModel
from typing import Optional
from app.models.enums import UserRole

class Token(BaseModel):
    access_token: str
    token_type: str
    role: UserRole
    user_id: str
    full_name: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str
