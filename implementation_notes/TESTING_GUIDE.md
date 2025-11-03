# Admin Authentication Testing Guide

## Prerequisites
- MongoDB running (local or Atlas)
- Node.js installed
- Both backend and frontend dependencies installed

## Step 1: Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server listening on port 5000
📝 Environment: development
🔗 API URL: http://localhost:5000
🌐 Frontend URL: http://localhost:5173
```

## Step 2: Start the Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 3: Test Admin Registration

1. Open browser and navigate to: `http://localhost:5173/admin/register`

2. Fill out the registration form:
   - **Full Name:** Test Admin
   - **Email Address:** test@admin.com
   - **Password:** Password123
   - **Confirm Password:** Password123
   
   Note: Password must be at least 8 characters and contain:
   - At least one uppercase letter (A-Z)
   - At least one lowercase letter (a-z)
   - At least one number (0-9)

3. Click "Register Admin Account"

4. You should see a success page with:
   - ⏰ Clock icon
   - "Registration Pending Approval" title
   - Message about waiting for approval
   - "What's Next?" alert with steps

**Expected Backend Response:**
```json
{
  "success": true,
  "message": "Registration submitted successfully. Your account is pending approval from a super admin.",
  "user": {
    "_id": "...",
    "name": "Test Admin",
    "email": "test@admin.com",
    "role": "admin",
    "approved": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Step 4: Try to Login (Before Approval)

1. Navigate to: `http://localhost:5173/admin/login`

2. Enter credentials:
   - **Email:** test@admin.com
   - **Password:** password123

3. Click "Sign In"

4. You should see an error message:
   - "Your account is pending approval. Please wait for admin verification."

## Step 5: Approve the Admin User

Open a new terminal in the backend directory:

```bash
cd backend
npm run approve-admin test@admin.com
```

You should see:
```
✅ Connected to MongoDB
✅ User approved successfully!
   Name: Test Admin
   Email: test@admin.com
   Role: admin
   Approved: true
```

## Step 6: Login (After Approval)

1. Go back to: `http://localhost:5173/admin/login`

2. Enter credentials:
   - **Email:** test@admin.com
   - **Password:** Password123

3. Click "Sign In"

4. You should be:
   - Redirected to `/admin/dashboard`
   - See a success toast notification
   - Have access to the admin dashboard

**Expected Backend Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "Test Admin",
    "email": "test@admin.com",
    "role": "admin",
    "approved": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Cookie Set:**
- Name: `token`
- Value: JWT token
- HttpOnly: true
- Secure: false (development)
- SameSite: strict

## Step 7: Test Protected Routes

1. While logged in, navigate to: `http://localhost:5173/admin/dashboard`
   - Should work ✅

2. Click "Logout" in the admin panel
   - Should redirect to `/admin/login`
   - Cookie should be cleared

3. Try to access: `http://localhost:5173/admin/dashboard`
   - Should redirect to `/admin/login` ✅

## Step 8: Test Authentication Persistence

1. Login again with your approved account

2. Refresh the page
   - Should stay logged in ✅
   - User data should persist

3. Close the browser and reopen
   - Should stay logged in (cookie persists) ✅

4. Wait 7 days or manually delete cookie
   - Should be logged out ✅

## Troubleshooting

### Backend not starting
- Check if port 5000 is already in use: `lsof -i :5000`
- Verify MongoDB connection string in `backend/.env`
- Check for syntax errors in modified files

### Frontend not connecting to backend
- Verify `frontend/.env` has: `VITE_API_URL=http://localhost:5000/api`
- Check browser console for CORS errors
- Verify backend CORS settings allow `http://localhost:5173`

### Login not working
- Check browser DevTools > Network tab for API responses
- Verify user is approved in database
- Check browser DevTools > Application > Cookies for token

### Cookie not being set
- Verify `withCredentials: true` in axios config
- Check CORS settings allow credentials
- Verify cookie settings in auth controller

## API Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "email": "test@admin.com",
    "password": "Password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@admin.com",
    "password": "Password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

## Success Criteria

✅ Registration creates user with `approved: false`
✅ Unapproved users cannot login
✅ Approved users can login successfully
✅ JWT token is set in httpOnly cookie
✅ Protected routes require authentication
✅ Logout clears the cookie
✅ Authentication persists across page refreshes
✅ Error messages are displayed correctly
✅ Success messages are displayed correctly
