# Backend ES Modules Import Fixes

## Issues Fixed

### 1. **ES Module Import Extensions**
**Problem:** When using ES modules with TypeScript, all relative imports must include the `.js` extension, even when importing `.ts` files.

**Files Fixed:**
- `backend/src/types/index.ts` - Added `.js` to type exports
- `backend/src/types/assessment.types.ts` - Added `.js` to candidate.types import
- `backend/src/models/User.ts` - Added `.js` to types import
- `backend/src/models/Candidate.ts` - Added `.js` to types import
- `backend/src/models/index.ts` - Added `.js` to model exports

**Before:**
```typescript
export * from './user.types';
import { ExperienceLevel } from './candidate.types';
```

**After:**
```typescript
export * from './user.types.js';
import { ExperienceLevel } from './candidate.types.js';
```

### 2. **Resend API Key Initialization**
**Problem:** Resend was being initialized even when API key was missing or placeholder, causing server crash.

**File Fixed:**
- `backend/src/services/email.service.ts`

**Solution:** 
- Added conditional initialization
- Graceful handling when API key is not configured
- Returns error instead of crashing

**Before:**
```typescript
const resend = new Resend(process.env.RESEND_API_KEY);
```

**After:**
```typescript
const resend = process.env.RESEND_API_KEY && 
  process.env.RESEND_API_KEY !== 'your-resend-api-key-here'
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
```

### 3. **JWT Environment Variable**
**Problem:** Code expected `JWT_EXPIRES_IN` but `.env` had `JWT_EXPIRE`.

**File Fixed:**
- `backend/.env`

**Change:**
```env
# Before
JWT_EXPIRE=7d

# After
JWT_EXPIRES_IN=7d
```

### 4. **Duplicate Schema Indexes**
**Problem:** Mongoose was warning about duplicate indexes - both `unique: true` and explicit `.index()` calls.

**Files Fixed:**
- `backend/src/models/User.ts` - Removed duplicate email index
- `backend/src/models/Candidate.ts` - Removed duplicate email index

**Solution:** Removed explicit index declarations since `unique: true` already creates an index.

**Before:**
```typescript
userSchema.index({ email: 1 }); // Duplicate!
```

**After:**
```typescript
// Removed - email already has unique:true which creates index
```

## Current Status

✅ **Server is running successfully**

```
🚀 Server listening on port 3000
📝 Environment: development
🔗 API URL: http://localhost:3000
🌐 Frontend URL: http://localhost:5173
✅ MongoDB Connected: ac-sgugawb-shard-00-02.zcelvza.mongodb.net
```

## Testing the API

### Health Check
```bash
curl http://localhost:3000/
```

### Register Admin
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Admin123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123!"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

## Notes

- **MongoDB Atlas**: Connected successfully
- **Email Service**: Currently disabled (no valid Resend API key)
  - To enable: Add a real Resend API key to `.env`
  - Email service will work automatically once configured
- **All imports**: Now use `.js` extension as required by ES modules
- **TypeScript**: Compiling successfully with no errors
- **All endpoints**: Ready to use

## Environment Variables Required

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
APP_URL=http://localhost:5173
RESEND_API_KEY=re_... (optional - for email)
FROM_EMAIL=noreply@domain.com (optional)
```

---

**All issues resolved!** ✅ The backend server is now running successfully with MongoDB Atlas.
