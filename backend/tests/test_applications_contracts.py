"""
Test Applications and Contract Generation
- Student submits internship application
- Dekanat approves application
- PDF and DOCX contract files are generated
"""
import pytest
import httpx
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from app.core.config import settings

BASE_URL = "http://127.0.0.1:8000/api/v1"

def get_token(username: str, password: str) -> str:
    response = httpx.post(f"{BASE_URL}/auth/login", json={"username": username, "password": password}, timeout=10.0)
    assert response.status_code == 200
    return response.json()["access_token"]

class TestApplicationsContracts:
    """Test internship application flow and contract generation"""

    def test_student_can_submit_application(self):
        """Student can submit an internship application"""
        token = get_token("talaba", "Talaba123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Get companies list
        response = httpx.get(f"{BASE_URL}/companies/", timeout=10.0)
        assert response.status_code == 200
        companies = response.json()
        assert len(companies) > 0
        company_id = companies[0]["id"]

        # Submit application
        app_data = {
            "company_id": company_id,
            "internship_type": "INDUSTRIAL",
            "start_date": "2026-11-15",
            "end_date": "2026-12-15"
        }
        response = httpx.post(f"{BASE_URL}/applications/", json=app_data, headers=headers, timeout=10.0)
        assert response.status_code == 200, f"Application submission failed: {response.text}"
        app = response.json()
        assert app["status"] == "SUBMITTED"
        print(f"✓ Student submitted application: {app['id']}")
        return app["id"]

    def test_dekanat_can_approve_and_generate_contract(self):
        """Dekanat can approve application and generate PDF/DOCX contracts"""
        # First, student submits application
        student_token = get_token("talaba", "Talaba123!")
        student_headers = {"Authorization": f"Bearer {student_token}"}
        response = httpx.get(f"{BASE_URL}/companies/", timeout=10.0)
        company_id = response.json()[0]["id"]

        app_response = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-11-20", "end_date": "2026-12-20"},
            headers=student_headers,
            timeout=10.0
        )
        app_id = app_response.json()["id"]

        # Dekanat approves application
        dekanat_token = get_token("dekanat", "Dekanat123!")
        dekanat_headers = {"Authorization": f"Bearer {dekanat_token}"}
        response = httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers=dekanat_headers, timeout=10.0)
        assert response.status_code == 200, f"Approval failed: {response.text}"
        result = response.json()
        assert result["success"] is True

        # Verify contract files were generated
        assert "contract_number" in result
        contract_num = result["contract_number"]
        docx_path = f"media/contracts/{contract_num}.docx"
        pdf_path = f"media/contracts/{contract_num}.pdf"

        # Check files exist in backend folder
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        for path in [docx_path, pdf_path]:
            full_path = os.path.join(base_dir, path)
            # Use forward slashes for Windows compatibility
            full_path = os.path.normpath(full_path)
            print(f"Checking contract file: {full_path}")
            assert os.path.exists(full_path), f"Contract file not found: {full_path}"

        print(f"✓ Contract generated: {contract_num} (PDF and DOCX)")

    def test_approved_application_has_approved_status(self):
        """Verified approved applications have APPROVED status"""
        # Submit new application
        student_token = get_token("talaba", "Talaba123!")
        company_id = httpx.get(f"{BASE_URL}/companies/", timeout=10.0).json()[0]["id"]
        app_response = httpx.post(
            f"{BASE_URL}/applications/",
            json={"company_id": company_id, "internship_type": "INDUSTRIAL", "start_date": "2026-12-01", "end_date": "2027-01-01"},
            headers={"Authorization": f"Bearer {student_token}"},
            timeout=10.0
        )
        assert app_response.status_code == 200, f"Application creation failed: {app_response.text}"
        app_data = app_response.json()
        print(f"Created application: {app_data}")
        app_id = app_data["id"]

        # Approve
        dekanat_token = get_token("dekanat", "Dekanat123!")
        approve_response = httpx.post(f"{BASE_URL}/applications/{app_id}/approve", headers={"Authorization": f"Bearer {dekanat_token}"}, timeout=10.0)
        assert approve_response.status_code == 200, f"Approval failed: {approve_response.text}"
        print(f"Approval response: {approve_response.json()}")

        # Check status
        response = httpx.get(f"{BASE_URL}/applications/", headers={"Authorization": f"Bearer {student_token}"}, timeout=10.0)
        assert response.status_code == 200, f"Failed to get applications: {response.text}"
        apps = response.json()
        print(f"Total applications for student: {len(apps)}")
        print(f"Application IDs: {[a.get('id') for a in apps]}")
        approved = [a for a in apps if a["id"] == app_id]
        assert len(approved) > 0, f"Application {app_id} not found in student's applications"
        assert approved[0]["status"] == "APPROVED", f"Expected APPROVED status, got {approved[0]['status']}"
        print("✓ Approved application has correct status")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])