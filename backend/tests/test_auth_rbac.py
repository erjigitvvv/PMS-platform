"""
Test Authentication and RBAC (Role-Based Access Control)
- Verifies all 5 roles can login and get JWT tokens
- Verifies unauthorized roles get 403 Forbidden
"""
import pytest
import httpx
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from app.core.config import settings

BASE_URL = "http://127.0.0.1:8000/api/v1"

# Test credentials for all 5 roles
TEST_CREDENTIALS = {
    "admin": {"username": "admin", "password": "Admin123!", "expected_role": "ADMIN"},
    "dekanat": {"username": "dekanat", "password": "Dekanat123!", "expected_role": "OTM_STAFF"},
    "oqituvchi": {"username": "oqituvchi", "password": "Ustoz123!", "expected_role": "TEACHER"},
    "mentor": {"username": "mentor", "password": "Mentor123!", "expected_role": "MENTOR"},
    "talaba": {"username": "talaba", "password": "Talaba123!", "expected_role": "STUDENT"},
}

def get_token(username: str, password: str) -> str:
    """Helper to get JWT token"""
    response = httpx.post(
        f"{BASE_URL}/auth/login",
        json={"username": username, "password": password},
        timeout=10.0
    )
    assert response.status_code == 200, f"Login failed for {username}: {response.text}"
    data = response.json()
    return data["access_token"]

class TestAuthRBAC:
    """Test authentication and role-based access control"""

    def test_all_5_roles_can_login(self):
        """Verify all 5 roles can successfully login and receive JWT tokens"""
        for role, creds in TEST_CREDENTIALS.items():
            token = get_token(creds["username"], creds["password"])
            assert token is not None, f"Failed to get token for {role}"
            assert len(token) > 20, f"Token too short for {role}"
            print(f"✓ {role} login successful")

    def test_admin_can_access_admin_endpoints(self):
        """Admin can access admin-protected endpoints"""
        token = get_token("admin", "Admin123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Try to access admin-only endpoint (create faculty)
        # Use unique name to avoid duplicate constraint
        import time
        unique_name = f"Test Faculty Admin {int(time.time())}"
        response = httpx.post(
            f"{BASE_URL}/academic/faculties",
            json={"name": unique_name, "code": "TF"},
            headers=headers,
            timeout=10.0
        )
        assert response.status_code == 200, f"Admin cannot access admin endpoint: {response.status_code} - {response.text}"
        print("✓ Admin can access admin endpoints")

    def test_student_cannot_access_admin_endpoints(self):
        """Students should get 403 Forbidden for admin-only endpoints"""
        token = get_token("talaba", "Talaba123!")
        headers = {"Authorization": f"Bearer {token}"}

        response = httpx.post(
            f"{BASE_URL}/academic/faculties",
            json={"name": "Test Faculty", "code": "TF"},
            headers=headers,
            timeout=10.0
        )
        assert response.status_code == 403, f"Student should get 403, got {response.status_code}"
        print("✓ Student correctly receives 403 for admin endpoints")

    def test_student_cannot_approve_applications(self):
        """Students cannot approve internship applications"""
        token = get_token("talaba", "Talaba123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Try to approve any application (requires ADMIN or OTM_STAFF)
        response = httpx.post(
            f"{BASE_URL}/applications/some-id/approve",
            headers=headers,
            timeout=10.0
        )
        assert response.status_code == 403, f"Student should get 403, got {response.status_code}"
        print("✓ Student correctly receives 403 for approval endpoints")

    def test_mentor_cannot_approve_applications(self):
        """Mentors cannot approve applications (only OTM_STAFF/ADMIN can)"""
        token = get_token("mentor", "Mentor123!")
        headers = {"Authorization": f"Bearer {token}"}

        response = httpx.post(
            f"{BASE_URL}/applications/some-id/approve",
            headers=headers,
            timeout=10.0
        )
        assert response.status_code == 403, f"Mentor should get 403, got {response.status_code}"
        print("✓ Mentor correctly receives 403 for approval endpoints")

    def test_invalid_credentials_fail(self):
        """Invalid credentials should return 400 error"""
        response = httpx.post(
            f"{BASE_URL}/auth/login",
            json={"username": "invalid_user", "password": "wrong_password"},
            timeout=10.0
        )
        assert response.status_code == 400, f"Expected 400 for invalid creds, got {response.status_code}"
        print("✓ Invalid credentials correctly rejected")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])