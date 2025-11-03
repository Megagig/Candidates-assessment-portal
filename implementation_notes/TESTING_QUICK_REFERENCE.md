# Quick Testing Reference Guide

## Prerequisites

1. **Backend server running:**
   ```bash
   cd backend
   npm run dev
   ```

2. **MongoDB connected** (check backend console for "✅ MongoDB Connected")

3. **Environment variables set** (.env file configured)

## Running Tests

### Option 1: Python Test Suite (Recommended)

```bash
cd backend
python3 test_api.py
```

**Features:**
- Comprehensive coverage
- Better rate limiting handling
- Colored output
- Detailed error messages
- JSON response parsing

### Option 2: Bash Test Script

```bash
cd backend
./test-api.sh
```

**Features:**
- Fast execution
- Cookie management
- Curl-based requests
- Works on any Unix system

## Important Notes

### Rate Limiting
The API has rate limiting enabled:
- **General routes:** 100 requests per 15 minutes
- **Auth routes:** 10 requests per 15 minutes

**If tests fail due to rate limiting:**
1. Wait 15 minutes
2. Or temporarily disable rate limiting in `backend/src/server.ts`:
   ```typescript
   // Comment out:
   // app.use('/api/auth', authLimiter, authRoutes);
   // Use:
   app.use('/api/auth', authRoutes);
   ```

### First-Time Setup

1. **Register admin user** (if not exists):
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin User","email":"admin@desishub.com","password":"Admin@123456"}'
   ```

2. **Verify admin credentials:**
   - Email: `admin@desishub.com`
   - Password: `Admin@123456`

## Test Coverage

### Backend API Endpoints Tested

✅ **Health Check**
- GET / - Root endpoint
- GET /api/health - Health status

✅ **Authentication**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

✅ **Candidate Management (Protected)**
- POST /api/candidates/register (public)
- GET /api/candidates
- GET /api/candidates/:id
- PUT /api/candidates/:id
- DELETE /api/candidates/:id
- GET /api/candidates/stats
- GET /api/candidates/export
- POST /api/candidates/:id/resend-email

## Expected Results

### Successful Test Run

```
Total Tests: 21
Passed: 18-21 (depending on rate limiting)
Failed: 0-3
Success Rate: 85-100%
```

### Common Test Failures

1. **Rate Limiting**
   - Error: "Too many authentication attempts"
   - Solution: Wait 15 minutes or disable rate limiter

2. **MongoDB Connection**
   - Error: "Cannot connect to database"
   - Solution: Check MongoDB is running

3. **Server Not Running**
   - Error: "Connection refused"
   - Solution: Start backend server

## Tier Assignment Validation

The tests verify correct tier assignment:

| Test Profile | Expected Tier | Validation |
|--------------|---------------|------------|
| HTML/CSS/JS only, no CRUD | Tier 0 | ✅ |
| CRUD + partial auth | Tier 1-2 | ✅ |
| Next.js + Express + full auth | Tier 3 | ✅ |
| + Golang knowledge | Tier 4-5 | ✅ |

## Manual Testing

For manual API testing, use:

### Postman Collection
Import the following endpoints:

```
GET    http://localhost:3000/api/health
POST   http://localhost:3000/api/auth/login
POST   http://localhost:3000/api/candidates/register
GET    http://localhost:3000/api/candidates
```

### Thunder Client (VS Code)
1. Install Thunder Client extension
2. Import endpoints from above
3. Set base URL: `http://localhost:3000`

## Debugging Failed Tests

### Check Server Logs
```bash
# Backend terminal shows detailed error messages
```

### Check Test Output
```bash
# Python script shows colored output with error details
# Look for RED ✗ FAIL messages
```

### Individual Endpoint Testing
```bash
# Test single endpoint with curl
curl -X GET http://localhost:3000/api/health

# Test with authentication
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@desishub.com","password":"Admin@123456"}' \
  -c cookies.txt

curl -X GET http://localhost:3000/api/candidates \
  -b cookies.txt
```

## Frontend Testing

For frontend testing, see:
- `implementation_notes/PHASE7_TESTING_GUIDE.md`

Manual testing checklist:
1. Open `http://localhost:5173`
2. Test candidate registration flow
3. Test admin login
4. Test dashboard
5. Test filtering and search
6. Test export to CSV

## Continuous Testing

### Watch Mode
For continuous testing during development:

```bash
# Option 1: Use nodemon to restart server on changes
cd backend
npm run dev

# Option 2: Run tests in separate terminal
cd backend
watch -n 60 python3 test_api.py  # Run every 60 seconds
```

## Reporting Issues

If tests fail unexpectedly:

1. Check server logs
2. Verify MongoDB connection
3. Check environment variables
4. Review recent code changes
5. Document in GitHub Issues

## Next Steps

After successful test run:
1. ✅ All backend tests passing
2. ⏳ Frontend manual testing
3. ⏳ Cross-browser testing
4. ⏳ Mobile responsiveness
5. → Ready for Phase 8 (Deployment)

---

**Last Updated:** November 2, 2025  
**Test Scripts Version:** 1.0  
**Compatibility:** Backend v1.0, Node.js 18+, Python 3.8+
