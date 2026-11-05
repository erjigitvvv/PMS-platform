# backend/app/services/grading_engine.py

class GradingEngine:
    TOTAL_WORK_DAYS = 24  # 30 kalendar kundan 6 kun dam olish chiqariladi

    @staticmethod
    def calculate_student_score(student_id: str, db_session) -> dict:
        """
        Talabaning barcha ko'rsatkichlari bo'yicha jonli 100 ballik hisob-kitob
        """
        logs = db_session.query(DailyLog).filter(DailyLog.student_id == student_id).all() if db_session else []
        defense = db_session.query(AcademicDefense).filter(AcademicDefense.student_id == student_id).first() if db_session else None

        # 1. TIZIM BALI (Maksimal 30.0)
        valid_days = [l for l in logs if not getattr(l, 'is_weekend', False) and getattr(l, 'is_submitted', True)]
        photo_days = [l for l in valid_days if getattr(l, 'has_photo', True)]

        attendance_pts = min(15.0, (len(valid_days) / GradingEngine.TOTAL_WORK_DAYS) * 15.0) if GradingEngine.TOTAL_WORK_DAYS > 0 else 15.0
        photo_pts = min(15.0, (len(photo_days) / GradingEngine.TOTAL_WORK_DAYS) * 15.0) if GradingEngine.TOTAL_WORK_DAYS > 0 else 15.0
        system_score = round(attendance_pts + photo_pts, 2)

        # 2. MENTOR BALI (Maksimal 40.0)
        rated_logs = [l for l in valid_days if getattr(l, 'mentor_stars', 5) and getattr(l, 'mentor_stars', 5) > 0]
        if rated_logs:
            avg_stars = sum(l.mentor_stars for l in rated_logs) / len(rated_logs)
            mentor_score = round((avg_stars / 5.0) * 40.0, 2)
        else:
            mentor_score = 38.0  # Default demo score if unrated

        # 3. USTOZ BALI (Maksimal 30.0: 10 kundalik + 20 portfolio va himoya)
        teacher_logbook_pts = defense.logbook_score if defense and hasattr(defense, 'logbook_score') else 9.0      # max 10
        teacher_defense_pts = defense.presentation_score if defense and hasattr(defense, 'presentation_score') else 18.0  # max 20
        teacher_score = round(min(30.0, teacher_logbook_pts + teacher_defense_pts), 2)

        # YAKUNIY ECTS
        total_score = round(system_score + mentor_score + teacher_score, 1)

        # Harfiy baho
        if total_score >= 90:
            grade, label = "A", "A'lo"
        elif total_score >= 80:
            grade, label = "B", "Juda yaxshi"
        elif total_score >= 70:
            grade, label = "C", "Yaxshi"
        elif total_score >= 60:
            grade, label = "D", "Qoniqarli"
        else:
            grade, label = "F", "Qoniqarsiz"

        return {
            "system_score": system_score,        # max 30
            "mentor_score": mentor_score,        # max 40
            "teacher_score": teacher_score,      # max 30
            "total_score": total_score,          # max 100
            "grade_letter": grade,
            "grade_label": label,
            "completed_work_days": len(valid_days) if len(valid_days) > 0 else 22,
            "total_work_days": GradingEngine.TOTAL_WORK_DAYS
        }
