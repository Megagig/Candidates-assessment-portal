# Database Models Documentation

This directory contains all Mongoose models for the Desishub Candidates Assessment application.

## Models Overview

### 1. User Model (`User.ts`)
Manages admin user accounts for the system.

**Purpose:** Authentication and authorization for admin users who manage candidates.

**Fields:**
- `name` - Admin's full name
- `email` - Unique email address (used for login)
- `password` - Hashed password (bcrypt, 10 rounds)
- `role` - User role (admin or super_admin)
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

**Methods:**
- `comparePassword(candidatePassword: string): Promise<boolean>` - Verifies password during login

**Security Features:**
- Automatic password hashing on save
- Password excluded from queries by default
- Password removed from JSON responses
- Email uniqueness enforced

---

### 2. Candidate Model (`Candidate.ts`)
Stores candidate information and assessment results.

**Purpose:** Track candidates who register, their skill assessments, and assigned tiers.

**Fields:**

#### Personal Information
- `name` - Candidate's full name
- `email` - Unique email address
- `phone` - Contact phone number
- `country` - Country/location (optional)

#### Assessment Data
- `assessmentResponses` - Nested object containing:
  - `htmlCssJsKnowledge` - HTML/CSS/JS proficiency level
  - `reactNextJsKnowledge` - React/Next.js proficiency level
  - `canBuildCrudApp` - Ability to build CRUD applications
  - `canImplementAuth` - Ability to implement authentication
  - `canImplementGoogleAuth` - Ability to implement Google OAuth
  - `databaseKnowledge` - Database proficiency level
  - `expressHonoKnowledge` - Express/Hono proficiency level
  - `canBuildAuthenticatedApi` - Ability to build authenticated APIs
  - `canDocumentApi` - Ability to document APIs
  - `laravelKnowledge` - Laravel proficiency level
  - `golangKnowledge` - Golang proficiency level
  - `canBuildGoApi` - Ability to build Go APIs
  - `canDeployApps` - Ability to deploy applications

#### Tier Assignment
- `assignedTier` - Calculated skill tier (0-5)
- `tierAssignedAt` - Timestamp when tier was assigned

#### Status
- `notificationSent` - Whether email notification was sent

#### Timestamps
- `createdAt` - Registration timestamp
- `updatedAt` - Last update timestamp

**Indexes:**
- Email (unique) - Fast authentication and duplicate prevention
- Assigned tier - Fast filtering by skill level
- Created date (descending) - Sorted lists of recent registrations
- Text index - Full-text search on name and email

---

## Usage Examples

### Import Models
```typescript
import { User, Candidate } from './models';
```

### Create a New User
```typescript
const admin = await User.create({
  name: 'Admin Name',
  email: 'admin@desishub.com',
  password: 'securepassword',
  role: UserRole.ADMIN
});
// Password is automatically hashed before saving
```

### Verify User Password
```typescript
const user = await User.findOne({ email: 'admin@desishub.com' }).select('+password');
const isValid = await user.comparePassword('inputPassword');
```

### Create a New Candidate
```typescript
const candidate = await Candidate.create({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  country: 'United States',
  assessmentResponses: {
    htmlCssJsKnowledge: ExperienceLevel.INTERMEDIATE,
    reactNextJsKnowledge: ExperienceLevel.INTERMEDIATE,
    canBuildCrudApp: true,
    canImplementAuth: true,
    canImplementGoogleAuth: false,
    databaseKnowledge: ExperienceLevel.BASIC,
    expressHonoKnowledge: ExperienceLevel.NONE,
    canBuildAuthenticatedApi: false,
    canDocumentApi: false,
    laravelKnowledge: ExperienceLevel.NONE,
    golangKnowledge: ExperienceLevel.NONE,
    canBuildGoApi: false,
    canDeployApps: false
  },
  assignedTier: SkillTier.TIER_1
});
```

### Query Candidates
```typescript
// Find by tier
const tier2Candidates = await Candidate.find({ assignedTier: 2 });

// Search by text
const searchResults = await Candidate.find({ 
  $text: { $search: 'john doe' } 
});

// Filter and sort
const recentCandidates = await Candidate
  .find({ assignedTier: { $gte: 2 } })
  .sort({ createdAt: -1 })
  .limit(10);

// Get tier distribution
const tierStats = await Candidate.aggregate([
  {
    $group: {
      _id: '$assignedTier',
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);
```

### Update Candidate
```typescript
await Candidate.findByIdAndUpdate(
  candidateId,
  { 
    notificationSent: true,
    // Other fields to update
  },
  { new: true, runValidators: true }
);
```

---

## Validation Rules

### User Model
- Name: 2-100 characters, required
- Email: Valid email format, unique, required
- Password: Minimum 8 characters, required (automatically hashed)
- Role: Must be 'admin' or 'super_admin'

### Candidate Model
- Name: 2-100 characters, required
- Email: Valid email format, unique, required
- Phone: Valid phone format, required
- Country: Optional, max 100 characters
- All assessment fields: Required with specific enum values
- Assigned tier: Must be 0-5, required

---

## Indexes Explained

### User Model
1. **Email Index** - Ensures uniqueness and fast login queries

### Candidate Model
1. **Email Index** - Ensures uniqueness and fast lookups
2. **Tier Index** - Optimizes filtering candidates by skill level
3. **Created Date Index (Descending)** - Optimizes sorting by registration date
4. **Text Index** - Enables full-text search on name and email fields

---

## Best Practices

1. **Always use validation** when creating/updating documents
2. **Select password field explicitly** when needed (it's excluded by default)
3. **Use lean() queries** when you don't need Mongoose document methods
4. **Handle unique constraint errors** (duplicate emails) gracefully
5. **Use transactions** for operations affecting multiple collections

---

## Related Types

All TypeScript interfaces and types are defined in `../types/`:
- `user.types.ts` - User-related types
- `candidate.types.ts` - Candidate-related types
- `assessment.types.ts` - Assessment and tier definition types

---

## Testing Models

Run the verification script to ensure all models are properly configured:
```bash
npm run verify-models
```

Or use the verification script directly:
```typescript
import './verify-models';
```

---

**Last Updated:** Phase 2 - Database & Models Implementation
