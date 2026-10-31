import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, index=True)
    tin_stir = Column(String(20), unique=True, index=True, nullable=True)  # STIR / INN
    address = Column(String(500), nullable=True)
    director_name = Column(String(255), nullable=True)
    contact_phone = Column(String(50), nullable=True)
    email = Column(String(100), nullable=True)
    is_partner = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    mentors = relationship("MentorProfile", back_populates="company", cascade="all, delete-orphan")
    vacancies = relationship("Vacancy", back_populates="company", cascade="all, delete-orphan")
    applications = relationship("InternshipApplication", back_populates="company")

class Vacancy(Base):
    __tablename__ = "vacancies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    quota = Column(Integer, default=5)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="vacancies")
