# Quick Reference Card

## 🚀 Start Servers

```bash
# Backend (Terminal 1)
cd backend
npm run dev
# Should start on http://localhost:5000

# Frontend (Terminal 2)
cd frontend
npm run dev
# Should start on http://localhost:5173
```

## 🔑 Test Login

### Register
```
URL: http://localhost:5173/admin/register
Email: test@admin.com
Password: Password123 (must have A-Z, a-z, 0-9, 8+ chars)
```

### Approve
```bash
cd backend
npm run approve-admin test@admin.com
```

### Login
```
URL: http://localhost:5173/admin/login
Email: test@admin.com
Password: Password123
```

## 📍 Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:5173 |
| Admin Login | http://localhost:5173/admin/login |
| Admin Register | http://localhost:5173/admin/register |
| Dashboard | http://localhost:5173/admin/dashboard |
| Candidates | http://localhost:5173/admin/candidates |
| API Health | http://localhost:5000/health |

## 🔐 Password Requirements

✅ Minimum 8 characters
✅ At least one uppercase (A-Z)
✅ At least one lowercase (a-z)
✅ At least one number (0-9)

**Valid Examples:**
- Password123 ✅
- Admin2024 ✅
- Test1234 ✅

## 🚪 Logout Button Location

**Desktop:** Top-right corner, next to user info
**Mobile:** Bottom of hamburger menu (☰)

## 🔧 Common Commands

```bash
# Approve admin user
npm run approve-admin <email>

# Start backend dev server
npm run dev

# Build backend
npm run build

# Lint backend
npm run lint
```

## 📊 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Candidates
- GET /api/candidates
- GET /api/candidates/:id
- POST /api/candidates/register
- PUT /api/candidates/:id
- DELETE /api/candidates/:id
- GET /api/candidates/stats
- GET /api/candidates/export
- POST /api/candidates/:id/resend-email

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check port 5000, verify MongoDB URI |
| Frontend can't connect | Check `frontend/.env` exists |
| Login fails | Check password requirements |
| Candidates list fails | Restart backend server |
| Logout not visible | Check you're on /admin/* route |

## 📝 Response Format

```json
{
  "success": true,
  "message": "Optional message",
  "data": {},
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

## ✅ Testing Checklist

- [ ] Backend starts on port 5000
- [ ] Frontend starts on port 5173
- [ ] Can register with valid password
- [ ] Can approve user via script
- [ ] Can login after approval
- [ ] Candidates list loads
- [ ] Logout button works
- [ ] Protected routes redirect

## 📚 Documentation Files

- `ALL_FIXES_COMPLETE.md` - Complete overview
- `TESTING_GUIDE.md` - Detailed testing steps
- `QUICK_START_CHECKLIST.md` - Quick start guide
- `CANDIDATES_API_FIX.md` - API fixes
- `LOGOUT_BUTTON_LOCATION.md` - Logout guide
- `QUICK_REFERENCE.md` - This file

## 🎯 Success Indicators

✅ No "Failed to load candidates" error
✅ Login errors show inline
✅ Logout button visible
✅ Pagination works
✅ Filters work
✅ Authentication persists

## 💡 Pro Tips

1. Always use Password123 (or similar) for testing
2. Approve users immediately after registration
3. Check browser console for detailed errors
4. Restart backend after code changes
5. Clear browser cache if issues persist

---

**Everything is fixed and ready to use! 🎉**
