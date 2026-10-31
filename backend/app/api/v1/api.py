from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    users,
    academic,
    companies,
    applications,
    dailylogs,
    attendance,
    assessments,
    ws
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Autentifikatsiya"])
api_router.include_router(users.router, prefix="/users", tags=["Foydalanuvchilar"])
api_router.include_router(academic.router, prefix="/academic", tags=["Akademik Tuzilma & Excel"])
api_router.include_router(companies.router, prefix="/companies", tags=["Korxonalar & Vakansiyalar"])
api_router.include_router(applications.router, prefix="/applications", tags=["Amaliyot Arizalari & Shartnomalar"])
api_router.include_router(dailylogs.router, prefix="/dailylogs", tags=["Raqamli Kundalik"])
api_router.include_router(attendance.router, prefix="/attendance", tags=["Davomat Nazorati"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["100 Ballik Baholash"])
api_router.include_router(ws.router, prefix="/ws", tags=["Real-Time WebSockets"])
