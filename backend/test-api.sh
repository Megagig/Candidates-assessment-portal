#!/bin/bash

# Desishub Candidates Assessment - Backend API Testing Script
# This script tests all API endpoints systematically

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api"

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Cookie storage
COOKIE_FILE="test_cookies.txt"
rm -f "$COOKIE_FILE"

# Print header
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Desishub API Testing Suite${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Helper function to print test result
print_result() {
    local test_name=$1
    local status=$2
    local response=$3
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$status" -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC} - $test_name"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ FAIL${NC} - $test_name"
        echo -e "${YELLOW}Response: $response${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Helper function to make API request
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expect_success=${4:-true}
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -b "$COOKIE_FILE" -c "$COOKIE_FILE" \
            "${API_URL}${endpoint}")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            -b "$COOKIE_FILE" -c "$COOKIE_FILE" \
            "${API_URL}${endpoint}")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$expect_success" = true ]; then
        if [[ "$http_code" =~ ^2[0-9]{2}$ ]]; then
            echo "$body"
            return 0
        else
            echo "$body"
            return 1
        fi
    else
        if [[ "$http_code" =~ ^[45][0-9]{2}$ ]]; then
            echo "$body"
            return 0
        else
            echo "$body"
            return 1
        fi
    fi
}

echo -e "${BLUE}[1] Testing Health Check Endpoints${NC}\n"

# Test 1: Root endpoint
response=$(make_request "GET" "" "" true)
print_result "GET / - Root endpoint" $? "$response"

# Test 2: Health check
response=$(make_request "GET" "/health" "" true)
print_result "GET /api/health - Health check" $? "$response"

echo -e "\n${BLUE}[2] Testing Authentication Endpoints${NC}\n"

# Test 3: Register admin (should fail - already exists)
admin_data='{
  "name": "Test Admin",
  "email": "admin@desishub.com",
  "password": "Admin@123456"
}'
response=$(make_request "POST" "/auth/register" "$admin_data" false)
print_result "POST /api/auth/register - Admin registration (should fail if exists)" $? "$response"

# Test 4: Login with wrong password
wrong_login='{
  "email": "admin@desishub.com",
  "password": "wrongpassword"
}'
response=$(make_request "POST" "/auth/login" "$wrong_login" false)
print_result "POST /api/auth/login - Login with wrong password (should fail)" $? "$response"

# Test 5: Login with correct credentials
correct_login='{
  "email": "admin@desishub.com",
  "password": "Admin@123456"
}'
response=$(make_request "POST" "/auth/login" "$correct_login" true)
print_result "POST /api/auth/login - Login with correct credentials" $? "$response"

# Test 6: Get current user
response=$(make_request "GET" "/auth/me" "" true)
print_result "GET /api/auth/me - Get current user" $? "$response"

echo -e "\n${BLUE}[3] Testing Candidate Registration${NC}\n"

# Test 7: Register candidate with complete assessment
timestamp=$(date +%s)
candidate_data=$(cat <<EOF
{
  "name": "John Doe Test ${timestamp}",
  "email": "john.doe.${timestamp}@example.com",
  "phone": "+1234567890",
  "country": "USA",
  "assessmentResponses": {
    "htmlCssJsKnowledge": "advanced",
    "reactNextJsKnowledge": "intermediate",
    "canBuildCrudApp": true,
    "canImplementAuth": true,
    "canImplementGoogleAuth": false,
    "databaseKnowledge": "intermediate",
    "expressHonoKnowledge": "intermediate",
    "canBuildAuthenticatedApi": true,
    "canDocumentApi": true,
    "laravelKnowledge": "none",
    "golangKnowledge": "none",
    "canBuildGoApi": false,
    "canDeployApps": true
  }
}
EOF
)
response=$(make_request "POST" "/candidates/register" "$candidate_data" true)
print_result "POST /api/candidates/register - Register candidate (Tier 2-3)" $? "$response"

# Extract candidate ID from response
CANDIDATE_ID=$(echo "$response" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)

# Test 8: Register Tier 0 candidate
tier0_data=$(cat <<EOF
{
  "name": "Beginner User ${timestamp}",
  "email": "beginner.${timestamp}@example.com",
  "phone": "+1234567891",
  "country": "Canada",
  "assessmentResponses": {
    "htmlCssJsKnowledge": "basic",
    "reactNextJsKnowledge": "basic",
    "canBuildCrudApp": false,
    "canImplementAuth": false,
    "canImplementGoogleAuth": false,
    "databaseKnowledge": "none",
    "expressHonoKnowledge": "none",
    "canBuildAuthenticatedApi": false,
    "canDocumentApi": false,
    "laravelKnowledge": "none",
    "golangKnowledge": "none",
    "canBuildGoApi": false,
    "canDeployApps": false
  }
}
EOF
)
response=$(make_request "POST" "/candidates/register" "$tier0_data" true)
print_result "POST /api/candidates/register - Register Tier 0 candidate" $? "$response"

# Test 9: Register Tier 4 candidate
tier4_data=$(cat <<EOF
{
  "name": "Advanced Developer ${timestamp}",
  "email": "advanced.${timestamp}@example.com",
  "phone": "+1234567892",
  "country": "UK",
  "assessmentResponses": {
    "htmlCssJsKnowledge": "advanced",
    "reactNextJsKnowledge": "advanced",
    "canBuildCrudApp": true,
    "canImplementAuth": true,
    "canImplementGoogleAuth": true,
    "databaseKnowledge": "advanced",
    "expressHonoKnowledge": "advanced",
    "canBuildAuthenticatedApi": true,
    "canDocumentApi": true,
    "laravelKnowledge": "none",
    "golangKnowledge": "intermediate",
    "canBuildGoApi": true,
    "canDeployApps": true
  }
}
EOF
)

# Extract candidate ID from response
CANDIDATE_ID=$(echo "$response" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)

# Test 8: Register Tier 0 candidate
tier0_data=$(cat <<EOF
{
  "name": "Beginner User ${timestamp}",
  "email": "beginner.${timestamp}@example.com",
  "phone": "+1234567891",
  "location": "Canada",
  "assessmentResponses": {
    "htmlCssJs": "basic",
    "reactNextJs": "basic",
    "crudApp": "no",
    "authentication": "no",
    "database": "none",
    "backendFramework": "none",
    "golang": "none",
    "deploymentExperience": "no",
    "apiDocumentation": "no"
  }
}
EOF
)
response=$(make_request "POST" "/candidates/register" "$tier0_data" true)
print_result "POST /api/candidates/register - Register Tier 0 candidate" $? "$response"

# Test 9: Register Tier 4 candidate
tier4_data=$(cat <<EOF
{
  "name": "Advanced Developer ${timestamp}",
  "email": "advanced.${timestamp}@example.com",
  "phone": "+1234567892",
  "location": "UK",
  "assessmentResponses": {
    "htmlCssJs": "advanced",
    "reactNextJs": "advanced",
    "crudApp": "yes",
    "authentication": "yes",
    "database": "advanced",
    "backendFramework": "both",
    "golang": "intermediate",
    "deploymentExperience": "yes",
    "apiDocumentation": "yes"
  }
}
EOF
)
response=$(make_request "POST" "/candidates/register" "$tier4_data" true)
print_result "POST /api/candidates/register - Register Tier 4 candidate" $? "$response"

# Test 10: Register with invalid email
invalid_email='{
  "name": "Invalid User",
  "email": "invalidemail",
  "phone": "+1234567893",
  "assessmentResponses": {}
}'
response=$(make_request "POST" "/candidates/register" "$invalid_email" false)
print_result "POST /api/candidates/register - Invalid email (should fail)" $? "$response"

echo -e "\n${BLUE}[4] Testing Candidate Retrieval (Protected)${NC}\n"

# Test 11: Get all candidates
response=$(make_request "GET" "/candidates" "" true)
print_result "GET /api/candidates - Get all candidates" $? "$response"

# Test 12: Get candidates with tier filter
response=$(make_request "GET" "/candidates?tier=0" "" true)
print_result "GET /api/candidates?tier=0 - Filter by Tier 0" $? "$response"

# Test 13: Get candidates with sorting
response=$(make_request "GET" "/candidates?sortBy=createdAt&sortOrder=desc" "" true)
print_result "GET /api/candidates - Sort by date descending" $? "$response"

# Test 14: Search candidates
response=$(make_request "GET" "/candidates?search=John" "" true)
print_result "GET /api/candidates?search=John - Search by name" $? "$response"

# Test 15: Get single candidate
if [ -n "$CANDIDATE_ID" ]; then
    response=$(make_request "GET" "/candidates/${CANDIDATE_ID}" "" true)
    print_result "GET /api/candidates/:id - Get single candidate" $? "$response"
fi

echo -e "\n${BLUE}[5] Testing Candidate Statistics${NC}\n"

# Test 16: Get statistics
response=$(make_request "GET" "/candidates/stats" "" true)
print_result "GET /api/candidates/stats - Get tier statistics" $? "$response"

echo -e "\n${BLUE}[6] Testing Export Functionality${NC}\n"

# Test 17: Export candidates to CSV
response=$(make_request "GET" "/candidates/export" "" true)
print_result "GET /api/candidates/export - Export to CSV" $? "$response"

echo -e "\n${BLUE}[7] Testing Candidate Update${NC}\n"

# Test 18: Update candidate
if [ -n "$CANDIDATE_ID" ]; then
    update_data='{
      "phone": "+9876543210",
      "country": "Updated Location"
    }'
    response=$(make_request "PUT" "/candidates/${CANDIDATE_ID}" "$update_data" true)
    print_result "PUT /api/candidates/:id - Update candidate" $? "$response"
fi

echo -e "\n${BLUE}[8] Testing Email Resend${NC}\n"

# Test 19: Resend notification email
if [ -n "$CANDIDATE_ID" ]; then
    response=$(make_request "POST" "/candidates/${CANDIDATE_ID}/resend-email" "" true)
    print_result "POST /api/candidates/:id/resend-email - Resend email" $? "$response"
fi

echo -e "\n${BLUE}[9] Testing Authentication Edge Cases${NC}\n"

# Test 20: Access protected route without auth
rm -f "$COOKIE_FILE"  # Remove cookies
response=$(make_request "GET" "/candidates" "" false)
print_result "GET /api/candidates - Access without authentication (should fail)" $? "$response"

# Re-login for remaining tests
make_request "POST" "/auth/login" "$correct_login" true > /dev/null

echo -e "\n${BLUE}[10] Testing Deletion${NC}\n"

# Test 21: Delete candidate
if [ -n "$CANDIDATE_ID" ]; then
    response=$(make_request "DELETE" "/candidates/${CANDIDATE_ID}" "" true)
    print_result "DELETE /api/candidates/:id - Delete candidate" $? "$response"
fi

echo -e "\n${BLUE}[11] Testing Logout${NC}\n"

# Test 22: Logout
response=$(make_request "POST" "/auth/logout" "" true)
print_result "POST /api/auth/logout - Logout" $? "$response"

# Test 23: Access after logout
response=$(make_request "GET" "/auth/me" "" false)
print_result "GET /api/auth/me - Access after logout (should fail)" $? "$response"

# Cleanup
rm -f "$COOKIE_FILE"

# Print summary
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}  Test Results Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Total Tests: ${TOTAL_TESTS}"
echo -e "${GREEN}Passed: ${PASSED_TESTS}${NC}"
echo -e "${RED}Failed: ${FAILED_TESTS}${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All tests passed!${NC}\n"
    exit 0
else
    echo -e "\n${RED}❌ Some tests failed. Please review the output above.${NC}\n"
    exit 1
fi
