# Email Service Fix - Lazy Initialization

## The Problem

The email service was initializing the Resend client at **module load time**, before `dotenv.config()` had loaded the environment variables.

### Timeline of Events

```
1. server.ts imports email.service.ts
2. email.service.ts runs: const resend = new Resend(process.env.RESEND_API_KEY)
   ❌ process.env.RESEND_API_KEY is undefined at this point!
3. server.ts runs: dotenv.config()
   ✅ NOW the environment variables are loaded (too late!)
```

**Result:** `resend` was always `null`, so emails never sent.

## The Solution

Changed from **eager initialization** to **lazy initialization**:

### Before (Eager - Wrong)
```typescript
// Runs immediately when module loads
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
```

### After (Lazy - Correct)
```typescript
// Runs when actually needed (after dotenv.config())
let resend: Resend | null = null;

const getResendClient = (): Resend | null => {
  if (resend) return resend;
  
  if (process.env.RESEND_API_KEY && 
      process.env.RESEND_API_KEY !== 'your-resend-api-key-here') {
    resend = new Resend(process.env.RESEND_API_KEY);
    return resend;
  }
  
  return null;
};
```

## Changes Made

### File: `backend/src/services/email.service.ts`

1. **Removed eager initialization:**
   - Deleted: `const resend = new Resend(...)`

2. **Added lazy initialization:**
   - Added: `getResendClient()` function
   - Initializes Resend only when first called
   - Caches the instance for reuse

3. **Updated sendTierResultEmail:**
   - Calls `getResendClient()` at runtime
   - Now has access to loaded environment variables

4. **Added debug logging:**
   - Shows API key prefix in logs
   - Helps verify it's being read correctly

## Testing

### 1. Restart Backend Server
```bash
cd backend
# Stop current server (Ctrl+C)
npm run dev
```

### 2. Register a New Candidate

### 3. Check Backend Logs

**With Valid API Key:**
```
📧 SENDING EMAIL VIA RESEND
================================================================================
To: candidate@example.com
From: admin@megagigsolutions.com
Subject: Your Skill Assessment Results - Advanced Full-Stack Developer (Tier 4)
API Key: re_2yJvKzJ...
================================================================================
✅ Email sent successfully!
Email ID: abc123xyz
================================================================================
```

**Without API Key:**
```
⚠️  RESEND API KEY NOT CONFIGURED
📧 EMAIL NOTIFICATION (Development Mode - Not Actually Sent)
================================================================================
To: candidate@example.com
...
================================================================================
```

### 4. Check Candidate Email

The candidate should receive an email with:
- Subject: "Your Skill Assessment Results - [Tier Name] (Tier X)"
- Tier badge and description
- Next steps
- Contact information

## Why This Happens

### Module Loading Order in Node.js

```javascript
// server.ts
import dotenv from 'dotenv';
import { sendEmail } from './services/email.service.js';  // ← Runs email.service.ts code NOW

dotenv.config();  // ← Too late! email.service.ts already ran
```

### The Fix: Lazy Initialization

```javascript
// email.service.ts
let client = null;

const getClient = () => {
  if (!client) {
    client = new Resend(process.env.KEY);  // ← Runs LATER, after dotenv.config()
  }
  return client;
};
```

## Verification

### Check Environment Variable is Loaded

Add this to your backend logs:
```typescript
console.log('RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY);
console.log('API Key prefix:', process.env.RESEND_API_KEY?.substring(0, 10));
```

Should show:
```
RESEND_API_KEY loaded: true
API Key prefix: re_2yJvKzJ
```

### Check Resend Dashboard

1. Go to https://resend.com/emails
2. Login with your account
3. Check "Emails" section
4. Should see sent emails listed

## Common Issues

### Issue: Still says "Development Mode"
**Solution:** 
- Restart backend server
- Check `.env` file has `RESEND_API_KEY=re_...`
- Check no spaces around the `=` sign

### Issue: Email sends but not received
**Solution:**
- Check spam folder
- Verify `FROM_EMAIL` is verified in Resend dashboard
- Check Resend dashboard for delivery status

### Issue: "Invalid API key" error
**Solution:**
- Verify API key is correct in Resend dashboard
- Check for extra spaces or newlines in `.env`
- Regenerate API key if needed

## Summary

✅ **Changed to lazy initialization** - Resend client created at runtime
✅ **Fixed timing issue** - Now reads env vars after dotenv.config()
✅ **Added debug logging** - Shows API key is loaded
✅ **Emails will now send** - When API key is configured

**Restart the backend server and test! Emails should now be sent! 📧✅**
