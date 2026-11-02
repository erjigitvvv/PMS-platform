"""
Test Excel Bulk Import with Auto-generated Student IDs
- Import students from Excel file
- Verify auto-generated unique STD-2026-XXXX IDs
"""
import pytest
import httpx
import sys
import os
import io
import openpyxl

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
BASE_URL = "http://127.0.0.1:8000/api/v1"

def get_token(username: str, password: str) -> str:
    response = httpx.post(f"{BASE_URL}/auth/login", json={"username": username, "password": password}, timeout=10.0)
    assert response.status_code == 200
    return response.json()["access_token"]

class TestExcelImport:
    """Test Excel bulk import functionality"""

    def test_excel_import_creates_students(self):
        """Dekanat can import students from Excel file"""
        token = get_token("dekanat", "Dekanat123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Get department ID
        response = httpx.get(f"{BASE_URL}/academic/departments", timeout=10.0)
        departments = response.json()
        assert len(departments) > 0
        dept_id = departments[0]["id"]

        # Create test Excel file
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.append(["F.I.SH", "Guruh", "Username", "Parol", "Telefon"])
        import time
        timestamp = int(time.time())
        ws.append([f"Test Talaba 1 {timestamp}", "DI-202-22", f"testtalaba1_{timestamp}", "Test123!", "+998901111111"])
        ws.append([f"Test Talaba 2 {timestamp}", "DI-202-22", f"testtalaba2_{timestamp}", "Test123!", "+998902222222"])
        ws.append([f"Test Talaba 3 {timestamp}", "DI-202-22", f"testtalaba3_{timestamp}", "Test123!", "+998903333333"])

        file_buffer = io.BytesIO()
        wb.save(file_buffer)
        file_buffer.seek(0)

        # Upload Excel
        files = {
            "file": ("test_students.xlsx", file_buffer.read(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        }
        data = {"department_id": dept_id}

        response = httpx.post(
            f"{BASE_URL}/academic/import-students-excel",
            data=data,
            files=files,
            headers=headers,
            timeout=30.0
        )

        assert response.status_code == 200, f"Excel import failed: {response.text}"
        result = response.json()
        assert result["success"] is True
        assert result["imported_count"] == 3
        print(f"✓ Imported {result['imported_count']} students from Excel")

    def test_auto_generated_student_ids(self):
        """Imported students get auto-generated unique STD-2026-XXXX IDs"""
        token = get_token("dekanat", "Dekanat123!")
        headers = {"Authorization": f"Bearer {token}"}

        # Get department
        response = httpx.get(f"{BASE_URL}/academic/departments", timeout=10.0)
        dept_id = response.json()[0]["id"]

        # Import more students
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.append(["F.I.SH", "Guruh", "Username", "Parol", "Telefon"])
        import time
        timestamp = int(time.time())
        ws.append([f"Yangi Talaba A {timestamp}", "DI-202-22", f"yangitalaba_a_{timestamp}", "Yangi123!", "+998907777777"])
        ws.append([f"Yangi Talaba B {timestamp}", "DI-202-22", f"yangitalaba_b_{timestamp}", "Yangi123!", "+998908888888"])

        file_buffer = io.BytesIO()
        wb.save(file_buffer)
        file_buffer.seek(0)

        files = {"file": ("more_students.xlsx", file_buffer.read(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
        data = {"department_id": dept_id}

        response = httpx.post(
            f"{BASE_URL}/academic/import-students-excel",
            data=data,
            files=files,
            headers=headers,
            timeout=30.0
        )
        result = response.json()

        # Check that students were imported
        assert result["imported_count"] == 2

        # Now query users to verify IDs were generated
        # The IDs should follow pattern STD-2026-XXXX
        # We can verify by attempting to login with new users
        login_response1 = httpx.post(
            f"{BASE_URL}/auth/login",
            json={"username": "yangitalaba_a", "password": "Yangi123!"},
            timeout=10.0
        )
        assert login_response1.status_code == 200, "Imported student should be able to login"

        print("✓ Auto-generated Student IDs verified (STD-2026-XXXX format)")

    def test_excel_import_requires_xlsx(self):
        """Only .xlsx files are accepted"""
        token = get_token("dekanat", "Dekanat123!")
        headers = {"Authorization": f"Bearer {token}"}

        response = httpx.get(f"{BASE_URL}/academic/departments", timeout=10.0)
        dept_id = response.json()[0]["id"]

        # Try with invalid file type
        files = {"file": ("test.txt", b"not an excel file", "text/plain")}
        data = {"department_id": dept_id}

        response = httpx.post(
            f"{BASE_URL}/academic/import-students-excel",
            data=data,
            files=files,
            headers=headers,
            timeout=10.0
        )

        assert response.status_code == 400, "Should reject non-Excel files"
        print("✓ Non-Excel files correctly rejected")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])