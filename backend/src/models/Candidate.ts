import mongoose, { Schema } from 'mongoose';
import { SkillTier, ExperienceLevel } from '../types/index.js';
import type { ICandidate, IAssessmentResponse } from '../types/index.js';

const assessmentResponseSchema = new Schema<IAssessmentResponse>(
  {
    // HTML/CSS/JavaScript
    htmlCssJsKnowledge: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, 'HTML/CSS/JS knowledge level is required'],
    },
    
    // React/Next.js
    reactNextJsKnowledge: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, 'React/Next.js knowledge level is required'],
    },
    canBuildCrudApp: {
      type: Boolean,
      required: [true, 'CRUD app building capability is required'],
    },
    
    // Authentication
    canImplementAuth: {
      type: Boolean,
      required: [true, 'Authentication implementation capability is required'],
    },
    canImplementGoogleAuth: {
      type: Boolean,
      required: [true, 'Google authentication capability is required'],
    },
    
    // Database
    databaseKnowledge: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, 'Database knowledge level is required'],
    },
    
    // Backend Frameworks
    expressHonoKnowledge: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, 'Express/Hono knowledge level is required'],
    },
    canBuildAuthenticatedApi: {
      type: Boolean,
      required: [true, 'Authenticated API building capability is required'],
    },
    canDocumentApi: {
      type: Boolean,
      required: [true, 'API documentation capability is required'],
    },
    
    // Laravel
    laravelKnowledge: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, 'Laravel knowledge level is required'],
    },
    
    // Golang
    golangKnowledge: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: [true, 'Golang knowledge level is required'],
    },
    canBuildGoApi: {
      type: Boolean,
      required: [true, 'Go API building capability is required'],
    },
    
    // Deployment
    canDeployApps: {
      type: Boolean,
      required: [true, 'App deployment capability is required'],
    },
  },
  { _id: false }
);

const candidateSchema = new Schema<ICandidate>(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[\d\s\-\+\(\)]+$/,
        'Please provide a valid phone number',
      ],
    },
    country: {
      type: String,
      trim: true,
      maxlength: [100, 'Country name cannot exceed 100 characters'],
    },
    
    // Assessment Data
    assessmentResponses: {
      type: assessmentResponseSchema,
      required: [true, 'Assessment responses are required'],
    },
    
    // Tier Assignment
    assignedTier: {
      type: Number,
      enum: Object.values(SkillTier).filter(v => typeof v === 'number'),
      required: [true, 'Skill tier is required'],
    },
    tierAssignedAt: {
      type: Date,
      default: Date.now,
    },
    
    // Notification Status
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
candidateSchema.index({ assignedTier: 1 });
candidateSchema.index({ createdAt: -1 });
candidateSchema.index({ name: 'text', email: 'text' }); // Text index for search

const Candidate = mongoose.model<ICandidate>('Candidate', candidateSchema);

export default Candidate;
