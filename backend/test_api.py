#!/usr/bin/env python3
"""
Desishub Candidates Assessment - API Testing Script
Comprehensive testing for all backend endpoints
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any, Optional
import sys

# Configuration
BASE_URL = "http://localhost:3000"
API_URL = f"{BASE_URL}/api"

# Color codes
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  # No Color

# Test results
test_results = {
    'total': 0,
    'passed': 0,
    'failed': 0,
    'tests': []
}

# Session for cookies
session = requests.Session()

def print_header(text: str):
    """Print a formatted header"""
    print(f"\n{Colors.BLUE}{'='*60}{Colors.NC}")
    print(f"{Colors.BLUE}  {text}{Colors.NC}")
    print(f"{Colors.BLUE}{'='*60}{Colors.NC}\n")

def print_section(text: str):
    """Print a section header"""
    print(f"\n{Colors.BLUE}[{text}]{Colors.NC}\n")

def print_result(test_name: str, passed: bool, response: Optional[str] = None):
    """Print test result"""
    test_results['total'] += 1
    
    if passed:
        print(f"{Colors.GREEN}✓ PASS{Colors.NC} - {test_name}")
        test_results['passed'] += 1
        test_results['tests'].append({'name': test_name, 'status': 'PASS'})
    else:
        print(f"{Colors.RED}✗ FAIL{Colors.NC} - {test_name}")
        if response:
            print(f"{Colors.YELLOW}Response: {response}{Colors.NC}")
        test_results['failed'] += 1
        test_results['tests'].append({'name': test_name, 'status': 'FAIL', 'response': response})

def make_request(method: str, endpoint: str, data: Optional[Dict] = None, 
                 expect_success: bool = True, delay: float = 0.5) -> tuple:
    """Make an API request and return (success, response_data)"""
    time.sleep(delay)  # Rate limiting protection
    
    url = f"{API_URL}{endpoint}"
    try:
        if method == "GET":
            response = session.get(url)
        elif method == "POST":
            response = session.post(url, json=data)
        elif method == "PUT":
            response = session.put(url, json=data)
        elif method == "DELETE":
            response = session.delete(url)
        else:
            return False, "Invalid method"
        
        # Check if response matches expectation
        if expect_success:
            success = 200 <= response.status_code < 300
        else:
            success = 400 <= response.status_code < 600
        
        try:
            response_data = response.json()
        except:
            response_data = response.text
        
        return success, response_data
    except Exception as e:
        return False, str(e)

def run_tests():
    """Run all API tests"""
    print_header("Desishub API Testing Suite")
    
    # Store test data
    candidate_id = None
    timestamp = int(time.time())
    
    # ===== SECTION 1: Health Check =====
    print_section("1. Health Check Endpoints")
    
    success, data = make_request("GET", "/health")
    print_result("GET /api/health - Health check", success, json.dumps(data) if not success else None)
    
    # ===== SECTION 2: Authentication =====
    print_section("2. Authentication Endpoints")
    
    # Test register (should fail - already exists)
    admin_data = {
        "name": "Test Admin",
        "email": "admin@desishub.com",
        "password": "Admin@123456"
    }
    success, data = make_request("POST", "/auth/register", admin_data, expect_success=False, delay=2)
    print_result("POST /api/auth/register - Admin registration (should fail if exists)", 
                success, json.dumps(data) if not success else None)
    
    # Test login with wrong password
    wrong_login = {
        "email": "admin@desishub.com",
        "password": "wrongpassword"
    }
    success, data = make_request("POST", "/auth/login", wrong_login, expect_success=False, delay=2)
    print_result("POST /api/auth/login - Login with wrong password (should fail)", 
                success, json.dumps(data) if not success else None)
    
    # Test login with correct credentials
    correct_login = {
        "email": "admin@desishub.com",
        "password": "Admin@123456"
    }
    success, data = make_request("POST", "/auth/login", correct_login, delay=2)
    print_result("POST /api/auth/login - Login with correct credentials", 
                success, json.dumps(data) if not success else None)
    
    # Test get current user
    success, data = make_request("GET", "/auth/me", delay=1)
    print_result("GET /api/auth/me - Get current user", 
                success, json.dumps(data) if not success else None)
    
    # ===== SECTION 3: Candidate Registration =====
    print_section("3. Candidate Registration (Public)")
    
    # Test Tier 2-3 candidate
    candidate_data = {
        "name": f"John Doe Test {timestamp}",
        "email": f"john.doe.{timestamp}@example.com",
        "phone": "+1234567890",
        "country": "USA",
        "assessmentResponses": {
            "htmlCssJsKnowledge": "advanced",
            "reactNextJsKnowledge": "intermediate",
            "canBuildCrudApp": True,
            "canImplementAuth": True,
            "canImplementGoogleAuth": False,
            "databaseKnowledge": "intermediate",
            "expressHonoKnowledge": "intermediate",
            "canBuildAuthenticatedApi": True,
            "canDocumentApi": True,
            "laravelKnowledge": "none",
            "golangKnowledge": "none",
            "canBuildGoApi": False,
            "canDeployApps": True
        }
    }
    success, data = make_request("POST", "/candidates/register", candidate_data, delay=1)
    print_result("POST /api/candidates/register - Register Tier 2-3 candidate", 
                success, json.dumps(data) if not success else None)
    
    if success and isinstance(data, dict) and 'data' in data and 'candidate' in data['data']:
        candidate_id = data['data']['candidate']['_id']
        assigned_tier = data['data']['candidate']['assignedTier']
        print(f"  → Candidate ID: {candidate_id}, Assigned Tier: {assigned_tier}")
    
    # Test Tier 0 candidate
    tier0_data = {
        "name": f"Beginner User {timestamp}",
        "email": f"beginner.{timestamp}@example.com",
        "phone": "+1234567891",
        "country": "Canada",
        "assessmentResponses": {
            "htmlCssJsKnowledge": "basic",
            "reactNextJsKnowledge": "basic",
            "canBuildCrudApp": False,
            "canImplementAuth": False,
            "canImplementGoogleAuth": False,
            "databaseKnowledge": "none",
            "expressHonoKnowledge": "none",
            "canBuildAuthenticatedApi": False,
            "canDocumentApi": False,
            "laravelKnowledge": "none",
            "golangKnowledge": "none",
            "canBuildGoApi": False,
            "canDeployApps": False
        }
    }
    success, data = make_request("POST", "/candidates/register", tier0_data, delay=1)
    print_result("POST /api/candidates/register - Register Tier 0 candidate", 
                success, json.dumps(data) if not success else None)
    
    if success and isinstance(data, dict) and 'data' in data and 'candidate' in data['data']:
        assigned_tier = data['data']['candidate']['assignedTier']
        print(f"  → Assigned Tier: {assigned_tier} (expected: 0)")
    
    # Test Tier 4 candidate
    tier4_data = {
        "name": f"Advanced Developer {timestamp}",
        "email": f"advanced.{timestamp}@example.com",
        "phone": "+1234567892",
        "country": "UK",
        "assessmentResponses": {
            "htmlCssJsKnowledge": "advanced",
            "reactNextJsKnowledge": "advanced",
            "canBuildCrudApp": True,
            "canImplementAuth": True,
            "canImplementGoogleAuth": True,
            "databaseKnowledge": "advanced",
            "expressHonoKnowledge": "advanced",
            "canBuildAuthenticatedApi": True,
            "canDocumentApi": True,
            "laravelKnowledge": "none",
            "golangKnowledge": "intermediate",
            "canBuildGoApi": True,
            "canDeployApps": True
        }
    }
    success, data = make_request("POST", "/candidates/register", tier4_data, delay=1)
    print_result("POST /api/candidates/register - Register Tier 4 candidate", 
                success, json.dumps(data) if not success else None)
    
    if success and isinstance(data, dict) and 'data' in data and 'candidate' in data['data']:
        assigned_tier = data['data']['candidate']['assignedTier']
        print(f"  → Assigned Tier: {assigned_tier} (expected: 4)")
    
    # Test invalid email
    invalid_data = {
        "name": "Invalid User",
        "email": "invalidemail",
        "phone": "+1234567893",
        "assessmentResponses": {}
    }
    success, data = make_request("POST", "/candidates/register", invalid_data, expect_success=False, delay=1)
    print_result("POST /api/candidates/register - Invalid email (should fail)", 
                success, json.dumps(data) if not success else None)
    
    # ===== SECTION 4: Candidate Retrieval =====
    print_section("4. Candidate Retrieval (Protected)")
    
    # Get all candidates
    success, data = make_request("GET", "/candidates", delay=1)
    print_result("GET /api/candidates - Get all candidates", 
                success, json.dumps(data) if not success else None)
    
    # Filter by tier
    success, data = make_request("GET", "/candidates?tier=0", delay=1)
    print_result("GET /api/candidates?tier=0 - Filter by Tier 0", 
                success, json.dumps(data) if not success else None)
    
    # Sort by date
    success, data = make_request("GET", "/candidates?sortBy=createdAt&sortOrder=desc", delay=1)
    print_result("GET /api/candidates - Sort by date descending", 
                success, json.dumps(data) if not success else None)
    
    # Search by name
    success, data = make_request("GET", "/candidates?search=John", delay=1)
    print_result("GET /api/candidates?search=John - Search by name", 
                success, json.dumps(data) if not success else None)
    
    # Get single candidate
    if candidate_id:
        success, data = make_request("GET", f"/candidates/{candidate_id}", delay=1)
        print_result(f"GET /api/candidates/{candidate_id} - Get single candidate", 
                    success, json.dumps(data) if not success else None)
    
    # ===== SECTION 5: Statistics =====
    print_section("5. Statistics & Analytics")
    
    success, data = make_request("GET", "/candidates/stats", delay=1)
    print_result("GET /api/candidates/stats - Get tier statistics", 
                success, json.dumps(data) if not success else None)
    
    # ===== SECTION 6: Export =====
    print_section("6. Export Functionality")
    
    success, data = make_request("GET", "/candidates/export", delay=1)
    print_result("GET /api/candidates/export - Export to CSV", 
                success, json.dumps(data) if not success else None)
    
    # ===== SECTION 7: Update =====
    print_section("7. Candidate Update")
    
    if candidate_id:
        update_data = {
            "phone": "+9876543210",
            "country": "Updated Location"
        }
        success, data = make_request("PUT", f"/candidates/{candidate_id}", update_data, delay=1)
        print_result(f"PUT /api/candidates/{candidate_id} - Update candidate", 
                    success, json.dumps(data) if not success else None)
    
    # ===== SECTION 8: Email Resend =====
    print_section("8. Email Notification")
    
    if candidate_id:
        success, data = make_request("POST", f"/candidates/{candidate_id}/resend-email", delay=1)
        print_result(f"POST /api/candidates/{candidate_id}/resend-email - Resend email", 
                    success, json.dumps(data) if not success else None)
    
    # ===== SECTION 9: Authorization =====
    print_section("9. Authorization Tests")
    
    # Logout
    success, data = make_request("POST", "/auth/logout", delay=1)
    print_result("POST /api/auth/logout - Logout", 
                success, json.dumps(data) if not success else None)
    
    # Try to access protected route
    success, data = make_request("GET", "/candidates", expect_success=False, delay=1)
    print_result("GET /api/candidates - Access after logout (should fail)", 
                success, json.dumps(data) if not success else None)
    
    # ===== SECTION 10: Delete =====
    # Re-login first
    session.post(f"{API_URL}/auth/login", json=correct_login)
    time.sleep(2)
    
    print_section("10. Delete Candidate")
    
    if candidate_id:
        success, data = make_request("DELETE", f"/candidates/{candidate_id}", delay=1)
        print_result(f"DELETE /api/candidates/{candidate_id} - Delete candidate", 
                    success, json.dumps(data) if not success else None)
    
    # Print summary
    print_header("Test Results Summary")
    print(f"Total Tests: {test_results['total']}")
    print(f"{Colors.GREEN}Passed: {test_results['passed']}{Colors.NC}")
    print(f"{Colors.RED}Failed: {test_results['failed']}{Colors.NC}")
    
    success_rate = (test_results['passed'] / test_results['total'] * 100) if test_results['total'] > 0 else 0
    print(f"Success Rate: {success_rate:.1f}%")
    
    if test_results['failed'] == 0:
        print(f"\n{Colors.GREEN}🎉 All tests passed!{Colors.NC}\n")
        return 0
    else:
        print(f"\n{Colors.RED}❌ Some tests failed. Please review the output above.{Colors.NC}\n")
        return 1

if __name__ == "__main__":
    try:
        exit_code = run_tests()
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Tests interrupted by user{Colors.NC}\n")
        sys.exit(1)
    except Exception as e:
        print(f"\n{Colors.RED}Error running tests: {e}{Colors.NC}\n")
        sys.exit(1)
