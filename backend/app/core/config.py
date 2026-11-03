import os
from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

_BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
_DEFAULT_DB = os.path.join(_BASE_DIR, "pms.db").replace("\\", "/")

class Settings(BaseSettings):
    PROJECT_NAME: str = "OTM Talabalar Amaliyotini Boshqarish Platformasi (PMS)"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "secret_key_for_development_jwt_token_must_change_in_production_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite+aiosqlite:///{_DEFAULT_DB}")

    # Redis & Real-time
    REDIS_URL: str = "redis://localhost:6379/0"

    # Telegram
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_BOT_USERNAME: str = ""

    # File storage
    MEDIA_DIR: str = "media"
    DOCS_TEMPLATES_DIR: str = "app/templates/contracts"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
