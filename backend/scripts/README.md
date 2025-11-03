# Backend Scripts

## Approve Admin User

This script allows you to manually approve an admin user who has registered.

### Usage

```bash
npm run approve-admin <email>
```

### Example

```bash
npm run approve-admin admin@example.com
```

### What it does

1. Connects to MongoDB using the MONGODB_URI from .env
2. Finds the user with the specified email
3. Sets their `approved` field to `true`
4. Displays the updated user information

### Output

Success:
```
✅ Connected to MongoDB
✅ User approved successfully!
   Name: John Doe
   Email: admin@example.com
   Role: admin
   Approved: true
```

Error (user not found):
```
✅ Connected to MongoDB
❌ User with email "admin@example.com" not found
```
