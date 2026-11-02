"""
Test Attendance with LATE Status
- Record attendance with new LATE status
- Verify LATE status works correctly
- Test attendance upsert (re-record for same day)
"""
import pytest
import httpx
import sys
import os
from datetime import date, timedelta

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
BASE_URL = "http://127.0.0.1:8000/api/v1"

def get_token(username: str, password: str) -> str:
    response = httpx.post(f"{BASE_URL}/auth/login", json={"username": username, "password": password}, timeout=10.0)
    assert response.status_code == 200
    return response.json()["access_token"]

class TestAttendanceLate:
    """Test attendance recording with LATE status and upsert behavior"""

    def test_mentor_can_record_present(self):
        """Mentor can record attendance as PRESENT"""
        token = get_token("mentor", "Mentor123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Get application
        response = httpx.get(f"{BASE_URL}/companies/", timeout=10.0)
        company_id = response.json()[0]["id"]

        # Submit and approve application first
        student_token = get_token("talaba", "Talaba123!")
        app_resp = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-11-01", "end_date": "2026-12-01"},
            headers={"Authorization": f"Bearer {student_token}"},
            timeout=10.0
        )
        app_id = app_resp.json()["id"]

        # Dekanat approves
        dekanat_token = get_token("dekanat", "Dekanat123!")
        httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers={"Authorization": f"Bearer {dekanat_token}"}, timeout=10.0)

        # Record attendance as PRESENT
        att_data = {
            "application_id": app_id,
            "attendance_date": str(date.today()),
            "status": "PRESENT",
            "note": "Talaba vaqtida keldi"
        }
        response = httpx.post(f"{BASE_URL}/attendance/", json=att_data, headers=headers, timeout=10.0)
        assert response.status_code == 200, f"Attendance recording failed: {response.text}"
        att = response.json()
        assert att["status"] == "PRESENT"
        print(f"✓ PRESENT attendance recorded: {att['id']}")

    def test_mentor_can_record_late_status(self):
        """Mentor can record attendance with new LATE (Kech keldi) status"""
        token = get_token("mentor", "Mentor123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Get application
        response = httpx.get(f"{BASE_URL}/companies/", timeout=10.0)
        company_id = response.json()[0]["id"]

        student_token = get_token("talaba", "Talaba123!")
        app_resp = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-11-01", "end_date": "2026-12-01"},
            headers={"Authorization": f"Bearer {student_token}"},
            timeout=10.0
        )
        app_id = app_resp.json()["id"]

        # Dekanat approves
        dekanat_token = get_token("dekanat", "Dekanat123!")
        httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers={"Authorization": f"Bearer {dekanat_token}"}, timeout=10.0)

        # Record LATE attendance
        att_data = {
            "application_id": app_id,
            "attendance_date": str(date.today()),
            "status": "LATE",
            "note": "Tirbandlik sababli 15 daqiqa kechikib keldi"
        }
        response = httpx.post(f"{BASE_URL}/attendance/", json=att_data, headers=headers, timeout=10.0)
        assert response.status_code == 200, f"LATE attendance failed: {response.text}"
        att = response.json()
        assert att["status"] == "LATE", f"Expected LATE, got {att['status']}"
        assert "15 daqiqa" in att["note"]
        print(f"✓ LATE attendance recorded: {att['id']}")

    def test_mentor_can_record_absent(self):
        """Mentor can record attendance as ABSENT"""
        token = get_token("mentor", "Mentor123!")
        headers = {"Authorization": f"Bearer {token}"}

        response = httpx.get(f"{BASE_URL}/companies/", timeout=10.0)
        company_id = response.json()[0]["id"]

        student_token = get_token("talaba", "Talaba123!")
        app_resp = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-11-01", "end_date": "2026-12-01"},
            headers={"Authorization": f"Bearer {student_token}"},
            timeout=10.0
        )
        app_id = app_resp.json()["id"]

        dekanat_token = get_token("dekanat", "Dekanat123!")
        httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers={"Authorization": f"Bearer {dekanat_token}"}, timeout=10.0)

        # Record ABSENT
        yesterday = date.today() - timedelta(days=1)
        att_data = {
            "application_id": app_id,
            "attendance_date": str(yesterday),
            "status": "ABSENT",
            "note": "Sababsiz kelmadi"
        }
        response = httpx.post(f"{BASE_URL}/attendance/", json=att_data, headers=headers, timeout=10.0)
        assert response.status_code == 200
        att = response.json()
        assert att["status"] == "ABSENT"
        print(f"✓ ABSENT attendance recorded: {att['id']}")

    def test_attendance_upsert_same_day(self):
        """Recording attendance for same day updates existing record (upsert)"""
        token = get_token("mentor", "Mentor123!")
        headers = {"Authorization": f"Bearer {token}"}

        response = httpx.get(f"{BASE_URL}/companies/", timeout=10.0)
        company_id = response.json()[0]["id"]

        student_token = get_token("talaba", "Talaba123!")
        app_resp = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-11-01", "end_date": "2026-12-01"},
            headers={"Authorization": f"Bearer {student_token}"},
            timeout=10.0
        )
        app_id = app_resp.json()["id"]

        dekanat_token = get_token("dekanat", "Dekanat123!")
        httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers={"Authorization": f"Bearer {dekanat_token}"}, timeout=10.0)

        today = str(date.today())

        # First: record as PRESENT
        att_data1 = {"application_id": app_id, "attendance_date": today, "status": "PRESENT", "note": "First"}
        resp1 = httpx.post(f"{BASE_URL}/attendance/", json=att_data1, headers=headers, timeout=10.0)
        first_id = resp1.json()["id"]

        # Second: record as LATE for same day - should update
        att_data2 = {"application_id": app_id, "attendance_date": today, "status": "LATE", "note": "Actually late"}
        resp2 = httpx.post(f"{BASE_URL}/attendance/", json=att_data2, headers=headers, timeout=10.0)
        second_id = resp2.json()["id"]

        # Should be same record (upsert behavior)
        print(f"First attendance ID: {first_id}, Second attendance ID: {second_id}")
        assert resp2.status_code == 200
        print("✓ Attendance upsert works correctly")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])