# Quick Start Checklist ✅

## Before You Start
- [ ] MongoDB is running (local or Atlas)
- [ ] Node.js is installed
- [ ] Dependencies installed in both backend and frontend

## Step 1: Start Backend
```bash
cd backend
npm run dev
```
- [ ] Backend starts on port 5000
- [ ] See "🚀 Server listening on port 5000"
- [ ] MongoDB connection successful

## Step 2: Start Frontend
```bash
cd frontend
npm run dev
```
- [ ] Frontend starts on port 5173
- [ ] Can access http://localhost:5173

## Step 3: Test Registration
- [ ] Go to http://localhost:5173/admin/register
- [ ] Fill form with valid data:
  - Name: Test Admin
  - Email: test@admin.com
  - Password: Password123 (must have A-Z, a-z, 0-9, 8+ chars)
  - Confirm: Password123
- [ ] Submit form
- [ ] See "Registration Pending Approval" page

## Step 4: Approve User
```bash
cd backend
npm run approve-admin test@admin.com
```
- [ ] See "✅ User approved successfully!"

## Step 5: Test Login
- [ ] Go to http://localhost:5173/admin/login
- [ ] Enter credentials:
  - Email: test@admin.com
  - Password: Password123
- [ ] Click "Sign In"
- [ ] Redirected to /admin/dashboard
- [ ] See success toast notification

## Step 6: Test Protected Routes
- [ ] Can access dashboard
- [ ] Can access candidates list
- [ ] Can see user info in header

## Step 7: Test Logout
- [ ] Click logout button
- [ ] Redirected to /admin/login
- [ ] Cannot access dashboard without login

## Step 8: Test Auth Persistence
- [ ] Login again
- [ ] Refresh page - still logged in
- [ ] Close browser and reopen - still logged in (within 7 days)

---

## Common Issues & Quick Fixes

### ❌ Registration fails
**Check:** Password meets requirements (8+ chars, A-Z, a-z, 0-9)
**Fix:** Use password like "Password123"

### ❌ Login shows "pending approval"
**Check:** User approved in database
**Fix:** Run `npm run approve-admin <email>`

### ❌ Backend won't start
**Check:** Port 5000 available
**Fix:** Kill process on port 5000: `lsof -i :5000` then `kill -9 <PID>`

### ❌ Frontend can't connect to backend
**Check:** Backend running on port 5000
**Check:** `frontend/.env` has `VITE_API_URL=http://localhost:5000/api`
**Fix:** Restart frontend after creating .env file

### ❌ Cookie not being set
**Check:** Browser DevTools > Network > Response Headers
**Check:** CORS allows credentials
**Fix:** Already configured, should work

---

## Password Requirements Reminder
✅ Minimum 8 characters
✅ At least one uppercase letter (A-Z)
✅ At least one lowercase letter (a-z)
✅ At least one number (0-9)

**Valid Examples:**
- Password123 ✅
- Admin2024 ✅
- Test1234 ✅

**Invalid Examples:**
- password ❌ (no uppercase, no number)
- PASSWORD123 ❌ (no lowercase)
- Pass123 ❌ (less than 8 chars)

---

## All Systems Go! 🚀

If all checkboxes are checked, your admin authentication system is fully functional!

**Next:** Read `COMPLETE_FIX_SUMMARY.md` for detailed information.
