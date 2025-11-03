# Phase 7: Testing & Quality Assurance Guide

## Overview
This document provides a comprehensive testing guide for the Desishub Candidates Assessment Portal. It covers backend API testing, frontend testing, security review, and quality assurance procedures.

---

## 🔧 Prerequisites

### Backend Testing
- Backend server running on `http://localhost:3000`
- MongoDB connection established
- Environment variables configured
- At least one admin user registered

### Frontend Testing
- Frontend server running on `http://localhost:5173`
- Backend API accessible
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 📋 Testing Checklist

### ✅ Backend Testing

#### 1. Health Check Endpoints
- [ ] `GET /` - Root endpoint returns API info
- [ ] `GET /api/health` - Health check returns status

#### 2. Authentication Endpoints
- [ ] `POST /api/auth/register` - Admin registration
  - [ ] Success with valid data
  - [ ] Fail with duplicate email
  - [ ] Fail with invalid email format
  - [ ] Fail with weak password
  - [ ] Password is hashed in database
- [ ] `POST /api/auth/login` - Admin login
  - [ ] Success with correct credentials
  - [ ] Fail with wrong password
  - [ ] Fail with non-existent email
  - [ ] JWT token set in httpOnly cookie
  - [ ] Rate limiting works (max 10 attempts per 15 min)
- [ ] `GET /api/auth/me` - Get current user
  - [ ] Success when authenticated
  - [ ] Fail when not authenticated
  - [ ] Returns correct user data
- [ ] `POST /api/auth/logout` - Logout
  - [ ] Cookie is cleared
  - [ ] Cannot access protected routes after logout

#### 3. Candidate Registration (Public)
- [ ] `POST /api/candidates/register` - Register candidate
  - [ ] Success with complete valid data
  - [ ] Tier 0 assigned correctly
  - [ ] Tier 1 assigned correctly
  - [ ] Tier 2 assigned correctly
  - [ ] Tier 3 assigned correctly
  - [ ] Tier 4 assigned correctly
  - [ ] Email notification sent
  - [ ] Fail with duplicate email
  - [ ] Fail with invalid phone number
  - [ ] Fail with missing required fields
  - [ ] Fail with invalid assessment responses

#### 4. Candidate Management (Protected)
- [ ] `GET /api/candidates` - Get all candidates
  - [ ] Returns paginated results
  - [ ] Filter by tier works
  - [ ] Filter by date range works
  - [ ] Search by name works
  - [ ] Search by email works
  - [ ] Sorting by date works
  - [ ] Sorting by tier works
  - [ ] Combining filters works
  - [ ] Require authentication
- [ ] `GET /api/candidates/:id` - Get single candidate
  - [ ] Returns correct candidate
  - [ ] Fail with invalid ID
  - [ ] Fail when not authenticated
- [ ] `PUT /api/candidates/:id` - Update candidate
  - [ ] Success with valid data
  - [ ] Cannot update tier directly
  - [ ] Fail with invalid data
  - [ ] Fail when not authenticated
- [ ] `DELETE /api/candidates/:id` - Delete candidate
  - [ ] Success with valid ID
  - [ ] Fail with invalid ID
  - [ ] Fail when not authenticated

#### 5. Statistics & Analytics
- [ ] `GET /api/candidates/stats` - Get statistics
  - [ ] Returns total candidates count
  - [ ] Returns tier distribution
  - [ ] Returns correct percentages
  - [ ] Returns registrations over time
  - [ ] Require authentication

#### 6. Export Functionality
- [ ] `GET /api/candidates/export` - Export to CSV
  - [ ] Returns valid CSV format
  - [ ] Includes all candidate fields
  - [ ] Includes assessment responses
  - [ ] Date range filter works
  - [ ] Tier filter works
  - [ ] Require authentication

#### 7. Email Notifications
- [ ] `POST /api/candidates/:id/resend-notification` - Resend email
  - [ ] Email sent successfully
  - [ ] Email contains correct tier info
  - [ ] Email template is professional
  - [ ] Fail with invalid candidate ID
  - [ ] Require authentication

---

### ✅ Frontend Testing

#### 1. Public Pages
- [ ] Landing/Home Page
  - [ ] Loads without errors
  - [ ] Navigation works
  - [ ] CTA buttons redirect correctly
  - [ ] Responsive on mobile
  - [ ] Dark/light theme toggle works

- [ ] Candidate Registration Page
  - [ ] Multi-step form navigation works
  - [ ] Progress indicator accurate
  - [ ] Form validation works
  - [ ] Assessment questions display correctly
  - [ ] All question types work (select, radio, checkbox)
  - [ ] Review step shows all answers
  - [ ] Submit creates candidate
  - [ ] Success message displays
  - [ ] Loading states work
  - [ ] Error handling works
  - [ ] Responsive on mobile

#### 2. Admin Pages (Protected)

- [ ] Admin Login Page
  - [ ] Form validation works
  - [ ] Login with correct credentials
  - [ ] Error message for wrong password
  - [ ] Redirects to dashboard on success
  - [ ] Remember me checkbox (optional)
  - [ ] Responsive on mobile

- [ ] Admin Dashboard
  - [ ] Loads with authentication
  - [ ] Redirects to login if not authenticated
  - [ ] Statistics cards display correctly
  - [ ] Tier distribution chart renders
  - [ ] Registrations over time chart renders
  - [ ] Recent candidates list shows
  - [ ] Quick stats accurate
  - [ ] Responsive on mobile

- [ ] Candidates List Page
  - [ ] Table displays candidates
  - [ ] Pagination works
  - [ ] Filter by tier works (single)
  - [ ] Filter by tier works (multiple)
  - [ ] Filter by date range works
  - [ ] Search by name works
  - [ ] Search by email works
  - [ ] Combining filters works
  - [ ] Clear filters works
  - [ ] Sort by name works
  - [ ] Sort by date works
  - [ ] Sort by tier works
  - [ ] View candidate details (click row)
  - [ ] Export to CSV works
  - [ ] Loading states work
  - [ ] Empty state displays
  - [ ] Responsive on mobile

- [ ] Candidate Detail Page
  - [ ] Displays full candidate info
  - [ ] Shows assessment responses
  - [ ] Tier badge displays correctly
  - [ ] Edit mode works
  - [ ] Save changes works
  - [ ] Cancel edit works
  - [ ] Resend notification works
  - [ ] Delete candidate works (with confirmation)
  - [ ] Back to list navigation works
  - [ ] Responsive on mobile

#### 3. Navigation & Layout
- [ ] Admin Layout
  - [ ] Sidebar navigation works
  - [ ] Mobile menu works
  - [ ] User menu displays
  - [ ] Logout works
  - [ ] Active route highlighted
  - [ ] Responsive on mobile

#### 4. State Management
- [ ] Auth Store (Zustand)
  - [ ] Login updates state
  - [ ] Logout clears state
  - [ ] checkAuth on app load
  - [ ] Persists across page refresh
  
- [ ] Candidate Store (Zustand)
  - [ ] Filters update state
  - [ ] Search updates state
  - [ ] State persists during navigation

#### 5. API Integration (TanStack Query)
- [ ] Queries
  - [ ] Candidates list query
  - [ ] Single candidate query
  - [ ] Statistics query
  - [ ] Automatic refetch on window focus
  - [ ] Cache invalidation works
  
- [ ] Mutations
  - [ ] Register candidate mutation
  - [ ] Update candidate mutation
  - [ ] Delete candidate mutation
  - [ ] Optimistic updates work
  - [ ] Error handling works

---

### ✅ Security Review

#### 1. JWT Implementation
- [ ] Tokens stored in httpOnly cookies
- [ ] Tokens have expiration
- [ ] Tokens include necessary claims (userId, email, role)
- [ ] Token verification on protected routes
- [ ] Invalid tokens rejected
- [ ] Expired tokens rejected

#### 2. Password Security
- [ ] Passwords hashed with bcrypt
- [ ] Salt rounds appropriate (>= 10)
- [ ] Passwords never returned in responses
- [ ] Password requirements enforced (length, complexity)
- [ ] Password comparison uses bcrypt.compare

#### 3. Input Validation & Sanitization
- [ ] All inputs validated (Zod schemas)
- [ ] Email format validated
- [ ] Phone number format validated
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention (input sanitization)
- [ ] NoSQL injection prevention
- [ ] File size limits enforced
- [ ] Request body size limits

#### 4. CORS Configuration
- [ ] Only allowed origins accepted
- [ ] Credentials enabled for allowed origins
- [ ] Preflight requests handled
- [ ] No wildcard (*) in production

#### 5. Rate Limiting
- [ ] General rate limit (100 req/15 min)
- [ ] Auth route limit (10 req/15 min)
- [ ] Limits enforced correctly
- [ ] Clear error messages

#### 6. Environment Variables
- [ ] Sensitive data in .env file
- [ ] .env not committed to git
- [ ] .env.example provided
- [ ] Production env vars set correctly
- [ ] No hardcoded secrets

#### 7. HTTP Headers (Helmet)
- [ ] X-Content-Type-Options set
- [ ] X-Frame-Options set
- [ ] X-XSS-Protection set
- [ ] Strict-Transport-Security set (HTTPS)

---

### ✅ Cross-Browser Testing

#### Desktop Browsers
- [ ] Chrome (latest)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Responsive design works
- [ ] Firefox (latest)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Responsive design works
- [ ] Safari (latest)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Responsive design works
- [ ] Edge (latest)
  - [ ] All features work
  - [ ] No console errors
  - [ ] Responsive design works

#### Mobile Browsers
- [ ] Mobile Chrome
  - [ ] Touch interactions work
  - [ ] Responsive layout
  - [ ] Forms usable
- [ ] Mobile Safari
  - [ ] Touch interactions work
  - [ ] Responsive layout
  - [ ] Forms usable

---

### ✅ Responsive Design Testing

#### Breakpoints
- [ ] Mobile (< 640px)
  - [ ] Navigation menu
  - [ ] Form layouts
  - [ ] Table → Cards
  - [ ] Charts readable
- [ ] Tablet (640px - 1024px)
  - [ ] Sidebar collapse
  - [ ] Grid layouts
  - [ ] Charts responsive
- [ ] Desktop (> 1024px)
  - [ ] Full layout
  - [ ] All features accessible
  - [ ] Optimal use of space

---

## 🚀 Running the Tests

### Automated Backend Testing

```bash
# Navigate to backend directory
cd backend

# Make sure backend server is running
npm run dev

# In another terminal, run the test script
./test-api.sh
```

### Manual Frontend Testing

1. **Start the Application**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

2. **Test Public Flow**
   - Open `http://localhost:5173`
   - Complete candidate registration
   - Verify email received (check Resend dashboard)
   - Verify tier assignment is correct

3. **Test Admin Flow**
   - Navigate to `/admin/login`
   - Login with admin credentials
   - Verify dashboard loads
   - Test all admin features

### Browser DevTools Checks

1. **Console**
   - No errors in console
   - No warnings (except third-party)
   - API calls successful

2. **Network**
   - All requests return 200/201
   - Failed requests handled gracefully
   - Cookies set correctly
   - Request/response sizes reasonable

3. **Application**
   - Cookies present after login
   - Local storage used correctly
   - Session storage used correctly

4. **Performance**
   - Lighthouse score > 90
   - First Contentful Paint < 2s
   - Time to Interactive < 3s

---

## 🐛 Common Issues & Solutions

### Backend Issues

**Issue: MongoDB connection failed**
- Solution: Check MongoDB URI in .env
- Verify MongoDB service is running
- Check network connection

**Issue: Email not sending**
- Solution: Verify Resend API key
- Check domain verification
- Review email logs in Resend dashboard

**Issue: JWT errors**
- Solution: Check JWT_SECRET in .env
- Verify cookie settings
- Check token expiration

### Frontend Issues

**Issue: API calls failing**
- Solution: Check VITE_API_URL in .env
- Verify backend is running
- Check CORS configuration

**Issue: State not persisting**
- Solution: Check Zustand persist configuration
- Clear browser cache
- Verify local storage

**Issue: Routes not working**
- Solution: Check React Router configuration
- Verify protected route logic
- Check route paths

---

## 📊 Test Results Documentation

### Backend API Test Results

| Endpoint | Method | Expected | Actual | Status |
|----------|--------|----------|--------|--------|
| / | GET | 200 | | ⏳ |
| /api/health | GET | 200 | | ⏳ |
| /api/auth/register | POST | 201/409 | | ⏳ |
| /api/auth/login | POST | 200 | | ⏳ |
| /api/auth/me | GET | 200 | | ⏳ |
| /api/auth/logout | POST | 200 | | ⏳ |
| /api/candidates/register | POST | 201 | | ⏳ |
| /api/candidates | GET | 200 | | ⏳ |
| /api/candidates/:id | GET | 200 | | ⏳ |
| /api/candidates/:id | PUT | 200 | | ⏳ |
| /api/candidates/:id | DELETE | 200 | | ⏳ |
| /api/candidates/stats | GET | 200 | | ⏳ |
| /api/candidates/export | GET | 200 | | ⏳ |
| /api/candidates/:id/resend | POST | 200 | | ⏳ |

### Tier Calculation Test Results

| Assessment Profile | Expected Tier | Actual Tier | Status |
|-------------------|---------------|-------------|--------|
| HTML/CSS/JS only | Tier 0 | | ⏳ |
| CRUD, no auth | Tier 1 | | ⏳ |
| Next.js + auth | Tier 2 | | ⏳ |
| + Express/Hono | Tier 3 | | ⏳ |
| + Golang | Tier 4 | | ⏳ |

---

## 🎯 Success Criteria

All tests must pass before moving to Phase 8 (Deployment):

- ✅ All API endpoints working correctly
- ✅ Authentication flow secure and functional
- ✅ Tier calculation algorithm accurate
- ✅ Email notifications sending successfully
- ✅ Frontend user flows complete without errors
- ✅ No console errors in browser
- ✅ Responsive on mobile devices
- ✅ Cross-browser compatibility verified
- ✅ Security review passed
- ✅ No critical bugs identified

---

## 📝 Notes

- Update test results in this document as you complete tests
- Document any bugs found in GitHub Issues
- Keep screenshots of successful tests
- Note any performance issues
- Document workarounds for known issues

---

**Last Updated:** November 2, 2025
**Phase Status:** In Progress
