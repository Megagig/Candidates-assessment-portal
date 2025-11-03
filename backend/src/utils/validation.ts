import { z } from 'zod';
import { UserRole, ExperienceLevel } from '../types/index.js';

/**
 * Authentication Validation Schemas
 */

// User registration schema
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(100, { message: 'Name cannot exceed 100 characters' })
      .trim(),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Please provide a valid email address' })
      .toLowerCase()
      .trim(),
    password: z
      .string({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(100, { message: 'Password cannot exceed 100 characters' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' }
      ),
    role: z.nativeEnum(UserRole).optional(),
  }),
});

// User login schema
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Please provide a valid email address' })
      .toLowerCase()
      .trim(),
    password: z.string({ message: 'Password is required' }),
  }),
});

/**
 * Candidate Validation Schemas
 */

// Assessment response schema
const assessmentResponseSchema = z.object({
  htmlCssJsKnowledge: z.nativeEnum(ExperienceLevel, {
    message: 'HTML/CSS/JS knowledge level is required',
  }),
  reactNextJsKnowledge: z.nativeEnum(ExperienceLevel, {
    message: 'React/Next.js knowledge level is required',
  }),
  canBuildCrudApp: z.boolean({
    message: 'CRUD app building capability is required',
  }),
  canImplementAuth: z.boolean({
    message: 'Authentication implementation capability is required',
  }),
  canImplementGoogleAuth: z.boolean({
    message: 'Google authentication capability is required',
  }),
  databaseKnowledge: z.nativeEnum(ExperienceLevel, {
    message: 'Database knowledge level is required',
  }),
  expressHonoKnowledge: z.nativeEnum(ExperienceLevel, {
    message: 'Express/Hono knowledge level is required',
  }),
  canBuildAuthenticatedApi: z.boolean({
    message: 'Authenticated API building capability is required',
  }),
  canDocumentApi: z.boolean({
    message: 'API documentation capability is required',
  }),
  laravelKnowledge: z.nativeEnum(ExperienceLevel, {
    message: 'Laravel knowledge level is required',
  }),
  golangKnowledge: z.nativeEnum(ExperienceLevel, {
    message: 'Golang knowledge level is required',
  }),
  canBuildGoApi: z.boolean({
    message: 'Go API building capability is required',
  }),
  canDeployApps: z.boolean({
    message: 'App deployment capability is required',
  }),
});

// Candidate registration schema
export const candidateRegistrationSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(100, { message: 'Name cannot exceed 100 characters' })
      .trim(),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Please provide a valid email address' })
      .toLowerCase()
      .trim(),
    phone: z
      .string({ message: 'Phone number is required' })
      .regex(
        /^[\d\s\-\+\(\)]+$/,
        { message: 'Please provide a valid phone number' }
      )
      .trim(),
    country: z
      .string()
      .max(100, { message: 'Country name cannot exceed 100 characters' })
      .trim()
      .optional(),
    assessmentResponses: assessmentResponseSchema,
  }),
});

// Candidate update schema (partial)
export const candidateUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(
        /^[\d\s\-\+\(\)]+$/,
        'Please provide a valid phone number'
      )
      .trim()
      .optional(),
    country: z
      .string()
      .max(100, 'Country name cannot exceed 100 characters')
      .trim()
      .optional(),
  }),
});

// Query parameters validation for filtering
export const candidateQuerySchema = z.object({
  query: z.object({
    tier: z
      .string()
      .transform((val) => {
        // Handle single tier or comma-separated tiers
        if (val.includes(',')) {
          return val.split(',').map((t) => parseInt(t.trim(), 10));
        }
        return parseInt(val, 10);
      })
      .optional(),
    search: z.string().trim().optional(),
    startDate: z
      .string()
      .transform((val) => new Date(val))
      .optional(),
    endDate: z
      .string()
      .transform((val) => new Date(val))
      .optional(),
    sortBy: z
      .enum(['name', 'email', 'createdAt', 'assignedTier'])
      .optional()
      .default('createdAt'),
    sortOrder: z
      .enum(['asc', 'desc'])
      .optional()
      .default('desc'),
    page: z
      .string()
      .transform((val) => parseInt(val, 10))
      .optional()
      .default(1),
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .optional()
      .default(10),
  }),
});

// MongoDB ObjectId validation
export const objectIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid candidate ID'),
  }),
});

/**
 * Type exports for use in controllers
 */
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type CandidateRegistrationInput = z.infer<typeof candidateRegistrationSchema>['body'];
export type CandidateUpdateInput = z.infer<typeof candidateUpdateSchema>['body'];
export type CandidateQueryInput = z.infer<typeof candidateQuerySchema>['query'];
