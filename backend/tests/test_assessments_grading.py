"""
Test Assessments and Grading
- Mentor can score 0-5 (scaled to 50)
- Teacher can score 0-50
- Total score and letter grade (A/B/C/D/F) calculated correctly
"""
import pytest
import httpx
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
BASE_URL = "http://127.0.0.1:8000/api/v1"

def get_token(username: str, password: str) -> str:
    response = httpx.post(f"{BASE_URL}/auth/login", json={"username": username, "password": password}, timeout=10.0)
    assert response.status_code == 200
    return response.json()["access_token"]

class TestAssessmentsGrading:
    """Test mentor and teacher grading system"""

    def _setup_approved_application(self):
        """Helper to create an approved application"""
        student_token = get_token("talaba", "Talaba123!")
        company_id = httpx.get(f"{BASE_URL}/companies/", timeout=10.0).json()[0]["id"]

        app_resp = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-11-01", "end_date": "2026-12-01"},
            headers={"Authorization": f"Bearer {student_token}"},
            timeout=10.0
        )
        app_id = app_resp.json()["id"]

        dekanat_token = get_token("dekanat", "Dekanat123!")
        httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers={"Authorization": f"Bearer {dekanat_token}"}, timeout=10.0)

        return app_id

    def test_mentor_can_score_0_to_5(self):
        """Mentor can score between 0 and 5, scaled to 50"""
        app_id = self._setup_approved_application()

        mentor_token = get_token("mentor", "Mentor123!")
        headers = {"Authorization": f"Bearer {mentor_token}"}

        # Score 5.0 (maximum)
        score_data = {"mentor_score": 5.0, "mentor_review": "Ajoyib natija"}
        response = httpx.patch(f"{BASE_URL}/assessments/application/{app_id}/mentor", json=score_data, headers=headers, timeout=10.0)

        assert response.status_code == 200, f"Mentor scoring failed: {response.text}"
        result = response.json()
        assert result["mentor_score"] == 5.0
        # 5 * 10 = 50 in total_score
        assert result["total_score"] == 50.0
        print(f"✓ Mentor scored 5.0, scaled to {result['total_score']} in total")

    def test_teacher_can_score_0_to_50(self):
        """Teacher can score between 0 and 50"""
        app_id = self._setup_approved_application()

        # First mentor scores
        mentor_token = get_token("mentor", "Mentor123!")
        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id}/mentor",
            json={"mentor_score": 4.0, "mentor_review": "Yaxshi ish"},
            headers={"Authorization": f"Bearer {mentor_token}"},
            timeout=10.0
        )

        # Teacher scores
        teacher_token = get_token("oqituvchi", "Ustoz123!")
        headers = {"Authorization": f"Bearer {teacher_token}"}

        score_data = {"teacher_score": 46.0, "teacher_review": "Hisobot a'lo darajada"}
        response = httpx.patch(f"{BASE_URL}/assessments/application/{app_id}/teacher", json=score_data, headers=headers, timeout=10.0)

        assert response.status_code == 200, f"Teacher scoring failed: {response.text}"
        result = response.json()
        assert result["teacher_score"] == 46.0
        print(f"✓ Teacher scored 46.0")

    def test_total_score_calculation(self):
        """Total score = (mentor_score * 10) + teacher_score"""
        app_id = self._setup_approved_application()

        # Mentor scores 5.0 -> 50
        mentor_token = get_token("mentor", "Mentor123!")
        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id}/mentor",
            json={"mentor_score": 5.0, "mentor_review": "Mukammal"},
            headers={"Authorization": f"Bearer {mentor_token}"},
            timeout=10.0
        )

        # Teacher scores 46.0 -> 46
        teacher_token = get_token("oqituvchi", "Ustoz123!")
        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id}/teacher",
            json={"teacher_score": 46.0, "teacher_review": "A'lo"},
            headers={"Authorization": f"Bearer {teacher_token}"},
            timeout=10.0
        )

        # Get final assessment
        response = httpx.get(f"{BASE_URL}/assessments/application/{app_id}", timeout=10.0)
        result = response.json()

        # 5 * 10 + 46 = 96
        assert result["total_score"] == 96.0, f"Expected 96.0, got {result['total_score']}"
        assert result["grade_letter"] == "A", f"Expected grade A, got {result['grade_letter']}"
        print(f"✓ Total score: {result['total_score']}, Grade: {result['grade_letter']}")

    def test_grade_letter_calculation(self):
        """Test grade letter calculation: A (>=90), B (>=80), C (>=70), D (>=60), F (<60)"""
        app_id = self._setup_approved_application()

        # Test case 1: 96 -> A
        mentor_token = get_token("mentor", "Mentor123!")
        teacher_token = get_token("oqituvchi", "Ustoz123!")

        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id}/mentor",
            json={"mentor_score": 5.0},
            headers={"Authorization": f"Bearer {mentor_token}"},
            timeout=10.0
        )
        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id}/teacher",
            json={"teacher_score": 46.0},
            headers={"Authorization": f"Bearer {teacher_token}"},
            timeout=10.0
        )

        response = httpx.get(f"{BASE_URL}/assessments/application/{app_id}", timeout=10.0)
        result = response.json()
        assert result["grade_letter"] == "A"
        print(f"✓ Score 96 = Grade A")

        # Test case 2: 85 -> B
        app_id2 = self._setup_approved_application()
        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id2}/mentor",
            json={"mentor_score": 4.0},  # 40
            headers={"Authorization": f"Bearer {mentor_token}"},
            timeout=10.0
        )
        httpx.patch(
            f"{BASE_URL}/assessments/application/{app_id2}/teacher",
            json={"teacher_score": 45.0},  # 45
            headers={"Authorization": f"Bearer {teacher_token}"},
            timeout=10.0
        )
        response = httpx.get(f"{BASE_URL}/assessments/application/{app_id2}", timeout=10.0)
        result = response.json()
        assert result["total_score"] == 85.0
        assert result["grade_letter"] == "B"
        print(f"✓ Score 85 = Grade B")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])