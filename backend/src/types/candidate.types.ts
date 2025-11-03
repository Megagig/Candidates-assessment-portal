import { Document } from 'mongoose';

export enum SkillTier {
  TIER_0 = 0, // Beginner
  TIER_1 = 1, // CRUD Developer
  TIER_2 = 2, // Full-Stack Next.js Developer
  TIER_3 = 3, // Multi-Framework Developer
  TIER_4 = 4, // Advanced Full-Stack Developer
  TIER_5 = 5, // Expert (if applicable)
}

export enum ExperienceLevel {
  NONE = 'none',
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface IAssessmentResponse {
  // HTML/CSS/JavaScript
  htmlCssJsKnowledge: ExperienceLevel;
  
  // React/Next.js
  reactNextJsKnowledge: ExperienceLevel;
  canBuildCrudApp: boolean;
  
  // Authentication
  canImplementAuth: boolean;
  canImplementGoogleAuth: boolean;
  
  // Database
  databaseKnowledge: ExperienceLevel;
  
  // Backend Frameworks
  expressHonoKnowledge: ExperienceLevel;
  canBuildAuthenticatedApi: boolean;
  canDocumentApi: boolean;
  
  // Laravel
  laravelKnowledge: ExperienceLevel;
  
  // Golang
  golangKnowledge: ExperienceLevel;
  canBuildGoApi: boolean;
  
  // Deployment
  canDeployApps: boolean;
}

export interface ICandidate extends Document {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  country?: string;
  
  // Assessment Data
  assessmentResponses: IAssessmentResponse;
  
  // Tier Assignment
  assignedTier: SkillTier;
  tierAssignedAt: Date;
  
  // Notification Status
  notificationSent: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface ICandidateInput {
  name: string;
  email: string;
  phone: string;
  country?: string;
  assessmentResponses: IAssessmentResponse;
}

export interface ICandidateResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  assessmentResponses: IAssessmentResponse;
  assignedTier: SkillTier;
  tierAssignedAt: Date;
  notificationSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICandidateFilter {
  tier?: SkillTier | SkillTier[];
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ICandidateSort {
  field: 'name' | 'email' | 'createdAt' | 'assignedTier';
  order: 'asc' | 'desc';
}
