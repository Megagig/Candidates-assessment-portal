# Phase 6 Testing Guide

## 🧪 Testing Checklist for Advanced Features

This guide provides step-by-step instructions to test all Phase 6 features.

---

## Prerequisites

1. **Backend Running:** `cd backend && npm run dev`
2. **Frontend Running:** `cd frontend && npm run dev`
3. **Database:** MongoDB connection active
4. **Admin Account:** Have admin credentials ready
5. **Test Candidates:** At least 5-10 candidates registered

---

## 1. Analytics Dashboard Testing

### Line Chart - Registrations Over Time

**Steps:**
1. Login as admin
2. Navigate to Dashboard (`/admin/dashboard`)
3. Scroll to "Registrations Over Time" chart

**Verify:**
- ✅ Chart displays correctly
- ✅ Last 7 days shown on X-axis
- ✅ Registration counts on Y-axis
- ✅ Line connects data points
- ✅ Tooltip shows on hover
- ✅ Empty state if no registrations in 7 days

### Pie Chart - Tier Distribution

**Verify:**
- ✅ Shows percentage for each tier
- ✅ Colors match tier badges
- ✅ Legend displays correctly
- ✅ Tooltip shows count and percentage

### Bar Chart - Candidates per Tier

**Verify:**
- ✅ Bars represent each tier
- ✅ Height matches candidate count
- ✅ Tooltip displays count

### Stats Cards

**Verify:**
- ✅ Total Candidates count is accurate
- ✅ Recent Registrations (last 7 days) is accurate
- ✅ Icons display correctly

### Responsive Testing
- ✅ Test on mobile (< 768px width)
- ✅ Charts stack vertically on mobile
- ✅ Charts remain readable

---

## 2. CSV Export Testing

### Basic Export

**Steps:**
1. Go to Candidates List (`/admin/candidates`)
2. Click "Export CSV" button

**Verify:**
- ✅ Loading state shows
- ✅ CSV file downloads
- ✅ Filename format: `candidates-YYYY-MM-DD.csv`
- ✅ Contains all candidates
- ✅ All fields included (Name, Email, Phone, Country, Tier, etc.)

### Export with Filters

**Test Cases:**

**A. Export with Tier Filter:**
1. Select "Tier 2" filter
2. Click Export CSV
3. **Verify:** CSV contains only Tier 2 candidates

**B. Export with Search:**
1. Search for "john"
2. Click Export CSV
3. **Verify:** CSV contains only matching candidates

**C. Export with Date Range:**
1. Set Start Date to 7 days ago
2. Set End Date to today
3. Click Export CSV
4. **Verify:** CSV contains only candidates from date range

**D. Export with Combined Filters:**
1. Set Tier filter to "Tier 1"
2. Set Start Date to 30 days ago
3. Click Export CSV
4. **Verify:** CSV contains Tier 1 candidates from last 30 days

### Error Handling
1. Clear all filters so no candidates match
2. Click Export CSV
3. **Verify:** Error toast displays "No candidates found"

---

## 3. Search & Filter Testing

### Search Functionality

**Test Cases:**

**A. Search by Name:**
1. Enter candidate name in search box
2. Wait 500ms (debounce)
3. **Verify:** Only matching candidates shown

**B. Search by Email:**
1. Enter email or partial email
2. **Verify:** Matching candidates shown

**C. Search by Phone:**
1. Enter phone number
2. **Verify:** Matching candidates shown

**D. Empty Search:**
1. Clear search field
2. **Verify:** All candidates shown

### Tier Filter

**Test Cases:**

**A. Single Tier:**
1. Select "Tier 0" from dropdown
2. **Verify:** Only Tier 0 candidates shown

**B. Different Tiers:**
1. Test each tier (0-4)
2. **Verify:** Correct filtering for each

**C. Clear Tier Filter:**
1. Select "(All Tiers)"
2. **Verify:** All candidates shown

### Date Range Filters

**Test Cases:**

**A. Start Date Only:**
1. Set Start Date to 7 days ago
2. **Verify:** Candidates registered after that date

**B. End Date Only:**
1. Set End Date to today
2. **Verify:** Candidates registered before today

**C. Date Range:**
1. Set Start Date to 30 days ago
2. Set End Date to 7 days ago
3. **Verify:** Candidates within that range

**D. Invalid Range:**
1. Set Start Date after End Date
2. **Verify:** No candidates or proper handling

### Combined Filters

**Test Case:**
1. Search: "test"
2. Tier: "Tier 1"
3. Start Date: 30 days ago
4. End Date: today
5. **Verify:** Only matching candidates shown

### Clear All Filters

**Steps:**
1. Apply multiple filters
2. Click "Clear All Filters" button
3. **Verify:**
   - ✅ Search cleared
   - ✅ Tier reset to "All"
   - ✅ Dates cleared
   - ✅ All candidates shown

### Responsive Filter Grid

**Test:**
- ✅ Mobile (1 column)
- ✅ Tablet (2 columns)
- ✅ Desktop (4 columns)

---

## 4. Email Notification Testing

### Initial Send on Registration

**Steps:**
1. Register a new candidate via `/register`
2. Complete assessment form
3. Submit registration

**Verify:**
- ✅ Success message shows
- ✅ Check candidate detail page
- ✅ Notification status shows "Sent" (may take a few seconds)
- ✅ Email received (check inbox or logs if using test mode)

### Resend Notification

**Steps:**
1. Go to candidate detail page
2. Check notification status
3. Click "Resend Notification" button

**Verify:**
- ✅ Loading state shows
- ✅ Success toast appears
- ✅ Status updates to "Sent"
- ✅ Email received

### Pending Notification

**Steps:**
1. Create candidate with failed email (simulate by disconnecting Resend)
2. View candidate detail
3. **Verify:** Status shows "Pending" (yellow badge)

### Error Handling

**Steps:**
1. Temporarily break email service (invalid API key)
2. Try resending
3. **Verify:** Error toast displays

---

## 5. Responsive Design Testing

### Mobile Navigation (< 768px)

**Steps:**
1. Resize browser to mobile width (e.g., 375px)
2. Login as admin

**Verify:**
- ✅ Hamburger menu icon visible
- ✅ Desktop nav links hidden
- ✅ Click hamburger opens menu
- ✅ Menu shows:
  - Dashboard link
  - Candidates link
  - User name
  - Logout button
- ✅ Active route highlighted
- ✅ Links work correctly
- ✅ Menu closes after clicking link
- ✅ X icon visible when menu open

### Mobile Candidate Table

**Steps:**
1. Go to Candidates List on mobile
2. View candidate list

**Verify:**
- ✅ Cards display instead of table
- ✅ Each card shows:
  - Candidate name
  - Email
  - Phone (if available)
  - Tier badge
  - Registration date
  - Notification status
- ✅ Cards are tappable
- ✅ Tapping opens detail page

### Desktop Candidate Table (≥ 768px)

**Steps:**
1. Resize to desktop width
2. View Candidates List

**Verify:**
- ✅ Table displays
- ✅ Cards hidden
- ✅ All columns visible
- ✅ Rows clickable

### Page Responsiveness

**Test Each Page:**

**A. Dashboard:**
- Mobile: Stats cards stack (1 column)
- Tablet: 2-3 columns
- Desktop: 3 columns
- Charts remain readable

**B. Candidates List:**
- Header stacks on mobile
- Export button full-width on mobile
- Filters stack (1 column) on mobile
- Filters grid (4 columns) on desktop

**C. Candidate Detail:**
- Header stacks on mobile
- Delete button full-width on mobile
- Info grid responsive
- Email doesn't overflow
- Action buttons full-width on mobile

**D. Home Page:**
- Heading sizes responsive
- Padding adjusts
- CTA button full-width on mobile
- Tier cards readable

**E. Login Page:**
- Form centered
- Proper spacing
- Button full-width on mobile

### Touch Targets

**Verify (on touch device or Chrome DevTools):**
- ✅ All buttons at least 44x44px
- ✅ Links have adequate spacing
- ✅ Form inputs easy to tap
- ✅ No accidental taps

### Text Readability

**Verify:**
- ✅ Font sizes readable on all devices
- ✅ No text too small (minimum 14px)
- ✅ Proper line height
- ✅ Adequate contrast

### No Horizontal Scroll

**Test:**
- ✅ No horizontal overflow on any page
- ✅ Content fits within viewport
- ✅ Tables handle overflow properly

---

## 6. Integration Testing

### Complete User Flow

**Scenario: Admin manages candidates with all features**

1. **Login:** Admin logs in
2. **View Dashboard:** Check stats and charts
3. **Go to Candidates:** View list
4. **Apply Filters:** Search + Tier + Date range
5. **Export:** Download filtered CSV
6. **View Details:** Click on a candidate
7. **Resend Email:** Trigger notification resend
8. **Navigate:** Use mobile menu (on mobile)
9. **Logout:** Successfully log out

**Verify:** All steps work smoothly without errors

---

## 7. Cross-Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Verify:**
- Charts render correctly
- Date inputs work
- CSV download works
- Styles consistent

---

## 8. Performance Testing

### Dashboard Loading
- ✅ Charts load within 2 seconds
- ✅ No layout shift
- ✅ Smooth animations

### Candidate List
- ✅ Search is debounced (not instant)
- ✅ Pagination works smoothly
- ✅ Filters apply quickly

### CSV Export
- ✅ Large exports (100+ candidates) complete successfully
- ✅ No browser freeze

---

## 🐛 Bug Reporting Template

If you find issues, report them with:

```
**Issue:** [Brief description]
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected:** [What should happen]
**Actual:** [What actually happened]
**Browser:** [Browser and version]
**Screen Size:** [Desktop/Tablet/Mobile]
**Screenshots:** [If applicable]
```

---

## ✅ Sign-off Checklist

Before moving to Phase 7, verify:

- [ ] All analytics charts working
- [ ] CSV export functional with filters
- [ ] Search and filters working correctly
- [ ] Email notifications sending and resending
- [ ] Mobile navigation working
- [ ] All pages responsive
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Cross-browser tested
- [ ] Performance acceptable

---

**Happy Testing! 🚀**

If all tests pass, Phase 6 is ready for production!
