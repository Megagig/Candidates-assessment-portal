# Testing Guide - Phase 5: Skill Assessment

## Quick Start Testing

### Prerequisites
1. Backend server running: `cd backend && npm run dev`
2. Frontend server running: `cd frontend && npm run dev`
3. MongoDB connected
4. Environment variables configured (especially Resend API key for emails)

---

## Test Scenario 1: Tier 0 (Beginner)

**Expected Result**: Candidate with basic HTML/CSS/JS only

1. Navigate to `/register`
2. Fill personal information:
   - Name: `John Beginner`
   - Email: `john.beginner@test.com`
   - Phone: `+1234567890`
3. Click "Next: Assessment"
4. Answer questions:
   - HTML/CSS/JS: `Basic`
   - React/Next.js: `Basic`
   - Can build CRUD: `No`
   - Database: `Basic`
   - Can implement auth: `No`
   - Can implement OAuth: `No`
   - Express/Hono: `None`
   - Can build auth API: `No`
   - Can document API: `No`
   - Laravel: `None`
   - Can deploy: `No`
   - Golang: `None`
   - Can build Go API: `No`
5. Click through categories (use Next button)
6. Review answers
7. Submit
8. **Expected**: Assigned to Tier 0, email sent

---

## Test Scenario 2: Tier 1 (CRUD Developer)

**Expected Result**: Can build CRUD apps, no authentication

1. Personal info: `Jane Crud Developer` / `jane.crud@test.com`
2. Answer questions:
   - HTML/CSS/JS: `Intermediate`
   - React/Next.js: `Intermediate`
   - Can build CRUD: `Yes` ✅
   - Database: `Basic`
   - Can implement auth: `No` ❌
   - Can implement OAuth: `No`
   - Express/Hono: `None`
   - Can build auth API: `No`
   - Can document API: `No`
   - Laravel: `None`
   - Can deploy: `No`
   - Golang: `None`
   - Can build Go API: `No`
3. **Expected**: Assigned to Tier 1

---

## Test Scenario 3: Tier 2 (Full-Stack Next.js)

**Expected Result**: Next.js with auth, no backend frameworks

1. Personal info: `Mike Fullstack` / `mike.fullstack@test.com`
2. Answer questions:
   - HTML/CSS/JS: `Intermediate`
   - React/Next.js: `Intermediate` ✅
   - Can build CRUD: `Yes` ✅
   - Database: `Intermediate`
   - Can implement auth: `Yes` ✅
   - Can implement OAuth: `Yes` ✅
   - Express/Hono: `None` ❌ (must be None)
   - Can build auth API: `No`
   - Can document API: `No`
   - Laravel: `None` ❌ (must be None)
   - Can deploy: `Yes` ✅
   - Golang: `None`
   - Can build Go API: `No`
3. **Expected**: Assigned to Tier 2

---

## Test Scenario 4: Tier 3 (Multi-Framework)

**Expected Result**: Next.js + Express/Hono with auth APIs

1. Personal info: `Sarah Backend` / `sarah.backend@test.com`
2. Answer questions:
   - HTML/CSS/JS: `Intermediate`
   - React/Next.js: `Intermediate` ✅
   - Can build CRUD: `Yes` ✅
   - Database: `Intermediate`
   - Can implement auth: `Yes` ✅
   - Can implement OAuth: `Yes`
   - Express/Hono: `Intermediate` ✅
   - Can build auth API: `Yes` ✅
   - Can document API: `Yes`
   - Laravel: `None` (or any level)
   - Can deploy: `Yes`
   - Golang: `None` ❌ (must be None)
   - Can build Go API: `No`
3. **Expected**: Assigned to Tier 3

---

## Test Scenario 5: Tier 4 (Advanced Full-Stack)

**Expected Result**: Next.js + Express + Golang

1. Personal info: `Tom Advanced` / `tom.advanced@test.com`
2. Answer questions:
   - HTML/CSS/JS: `Advanced`
   - React/Next.js: `Intermediate` ✅
   - Can build CRUD: `Yes`
   - Database: `Intermediate`
   - Can implement auth: `Yes`
   - Can implement OAuth: `Yes`
   - Express/Hono: `Intermediate` ✅
   - Can build auth API: `Yes`
   - Can document API: `Yes`
   - Laravel: `None`
   - Can deploy: `Yes`
   - Golang: `Basic` ✅ (at least Basic)
   - Can build Go API: `Yes` ✅
3. **Expected**: Assigned to Tier 4

---

## Test Scenario 6: Tier 5 (Expert)

**Expected Result**: Advanced in everything

1. Personal info: `Alice Expert` / `alice.expert@test.com`
2. Answer questions:
   - HTML/CSS/JS: `Advanced`
   - React/Next.js: `Advanced` ✅
   - Can build CRUD: `Yes`
   - Database: `Advanced`
   - Can implement auth: `Yes` ✅
   - Can implement OAuth: `Yes` ✅
   - Express/Hono: `Advanced` ✅
   - Can build auth API: `Yes` ✅
   - Can document API: `Yes`
   - Laravel: `Advanced`
   - Can deploy: `Yes` ✅
   - Golang: `Intermediate` ✅ (at least Intermediate)
   - Can build Go API: `Yes` ✅
3. **Expected**: Assigned to Tier 5

---

## UI/UX Testing

### Multi-Step Form
- [ ] Progress bar updates correctly (0-100%)
- [ ] Category icons display
- [ ] Step indicators (dots) show current position
- [ ] Can navigate forward with Next button
- [ ] Can navigate backward with Previous button
- [ ] Cannot proceed without answering required questions
- [ ] Smooth scroll to top on step change

### Review Page
- [ ] All answers displayed grouped by category
- [ ] Can go back to edit from review page
- [ ] Submit button only enabled when all required answered
- [ ] Loading spinner shows during submission

### Validation
- [ ] Required questions highlighted if skipped
- [ ] Cannot submit with incomplete answers
- [ ] Error messages clear and helpful

### Dark Mode
- [ ] All components render correctly in dark mode
- [ ] Text remains readable
- [ ] Colors properly themed

### Responsive Design
- [ ] Form works on mobile (320px+)
- [ ] Form works on tablet (768px+)
- [ ] Form works on desktop (1024px+)

---

## Backend Testing

### API Endpoint
**POST** `/api/candidates/register`

#### Test 1: Valid Request
```bash
curl -X POST http://localhost:5000/api/candidates/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "assessmentResponses": [
      {
        "questionId": "htmlCssJsKnowledge",
        "question": "What is your proficiency level with HTML, CSS, and JavaScript?",
        "answer": "basic"
      },
      {
        "questionId": "reactNextJsKnowledge",
        "question": "What is your experience level with React or Next.js?",
        "answer": "basic"
      },
      {
        "questionId": "canBuildCrudApp",
        "question": "Can you build a CRUD application?",
        "answer": "false"
      }
      ... (include all 13 questions)
    ]
  }'
```

**Expected Response**:
```json
{
  "status": "success",
  "message": "Candidate registered successfully",
  "data": {
    "candidate": {
      "_id": "...",
      "name": "Test User",
      "email": "test@example.com",
      "assignedTier": 0,
      "notificationSent": true,
      ...
    },
    "tierInfo": {
      "tier": 0,
      "name": "Beginner",
      "description": "..."
    }
  }
}
```

#### Test 2: Missing Required Field
- Omit one required question
- **Expected**: 400 error with validation message

#### Test 3: Duplicate Email
- Register same email twice
- **Expected**: 409 Conflict error

---

## Email Testing

1. Set up Resend API key in `.env`
2. Register a candidate with a valid email
3. Check email inbox for:
   - ✅ Professional subject line
   - ✅ Candidate name personalized
   - ✅ Tier number and name
   - ✅ Tier description
   - ✅ Next steps information
   - ✅ Contact information
   - ✅ Professional HTML formatting

---

## Database Verification

After registration, check MongoDB:

```javascript
db.candidates.findOne({ email: "test@example.com" })
```

**Verify**:
- [ ] Candidate document created
- [ ] `assignedTier` field set correctly
- [ ] `tierAssignedAt` timestamp present
- [ ] `assessmentResponses` object stored
- [ ] `notificationSent` set to true (if email sent)
- [ ] `createdAt` and `updatedAt` timestamps

---

## Performance Testing

- [ ] Form renders quickly (<1s)
- [ ] Step transitions are smooth
- [ ] API response time acceptable (<2s)
- [ ] Email sends asynchronously (doesn't block response)
- [ ] No memory leaks on multiple submissions

---

## Error Scenarios

### Network Error
1. Disconnect from internet
2. Try to submit form
3. **Expected**: Error message, can retry

### Server Error
1. Stop backend server
2. Try to submit form
3. **Expected**: Connection error message

### Validation Error
1. Send malformed data
2. **Expected**: Clear validation error messages

---

## Accessibility Testing

- [ ] Form can be navigated with keyboard (Tab/Shift+Tab)
- [ ] Radio buttons selectable with keyboard
- [ ] Labels properly associated with inputs
- [ ] Error states announced to screen readers
- [ ] Sufficient color contrast

---

## Success Criteria

All tests should pass:
- ✅ All tier scenarios assign correctly
- ✅ Multi-step form works smoothly
- ✅ Data transforms correctly
- ✅ Backend validation works
- ✅ Emails send successfully
- ✅ Database stores correctly
- ✅ UI is responsive
- ✅ Dark mode works
- ✅ Error handling graceful

---

## Quick Commands

**Start Backend**:
```bash
cd backend
npm run dev
```

**Start Frontend**:
```bash
cd frontend
npm run dev
```

**Check MongoDB**:
```bash
mongosh
use desishub-candidates
db.candidates.find().pretty()
```

**Clear Test Data**:
```bash
db.candidates.deleteMany({ email: /test\.com/ })
```

---

## Common Issues & Solutions

**Issue**: Email not sending
- **Solution**: Check Resend API key in `.env`, verify domain setup

**Issue**: Validation errors
- **Solution**: Ensure all 13 questions answered, check questionId matches

**Issue**: Wrong tier assigned
- **Solution**: Review tier calculation logic in `/backend/src/services/assessment.service.ts`

**Issue**: Form not progressing
- **Solution**: Check console for validation errors, ensure all required questions answered

---

## Documentation References

- Full Implementation: `/implementation_notes/PHASE5_IMPLEMENTATION.md`
- Summary: `/implementation_notes/PHASE5_SUMMARY.md`
- Task Checklist: `/task.md`
