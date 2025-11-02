import { ExperienceLevel, SkillTier } from './candidate.types';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  YES_NO = 'yes_no',
  EXPERIENCE_LEVEL = 'experience_level',
}

export interface IQuestionOption {
  label: string;
  value: string | boolean | ExperienceLevel;
  points?: number; // Optional: for scoring
}

export interface IAssessmentQuestion {
  id: string;
  category: 'html_css_js' | 'react_nextjs' | 'authentication' | 'database' | 'backend' | 'laravel' | 'golang' | 'deployment';
  questionText: string;
  questionType: QuestionType;
  options: IQuestionOption[];
  required: boolean;
  helpText?: string;
  tierRelevance?: SkillTier[]; // Which tiers does this question help determine
}

export interface ITierCriteria {
  tier: SkillTier;
  name: string;
  description: string;
  requirements: {
    htmlCssJs?: ExperienceLevel;
    reactNextJs?: ExperienceLevel;
    canBuildCrud?: boolean;
    canImplementAuth?: boolean;
    canImplementGoogleAuth?: boolean;
    database?: ExperienceLevel;
    expressHono?: ExperienceLevel;
    canBuildAuthApi?: boolean;
    laravel?: ExperienceLevel;
    golang?: ExperienceLevel;
    canBuildGoApi?: boolean;
    canDeploy?: boolean;
  };
}

// Tier definitions for reference
export const TIER_DEFINITIONS: ITierCriteria[] = [
  {
    tier: SkillTier.TIER_0,
    name: 'Beginner',
    description: 'A complete beginner. Has done HTML, CSS, and basic JavaScript. Knows the basics of Next.js or React but is not capable of building a CRUD app with a database.',
    requirements: {
      htmlCssJs: ExperienceLevel.BASIC,
      reactNextJs: ExperienceLevel.BASIC,
      canBuildCrud: false,
    },
  },
  {
    tier: SkillTier.TIER_1,
    name: 'CRUD Developer',
    description: 'I know some Next.js/React. I can build a CRUD application with a database using server actions or API routes, but I cannot add advanced authentication.',
    requirements: {
      reactNextJs: ExperienceLevel.INTERMEDIATE,
      canBuildCrud: true,
      database: ExperienceLevel.BASIC,
      canImplementAuth: false,
    },
  },
  {
    tier: SkillTier.TIER_2,
    name: 'Full-Stack Next.js Developer',
    description: 'I know Next.js/React. I can build an authenticated (password + Google) CRUD App, deploy it, but I don\'t have knowledge of Express/Hono or other backend frameworks.',
    requirements: {
      reactNextJs: ExperienceLevel.INTERMEDIATE,
      canBuildCrud: true,
      canImplementAuth: true,
      canDeploy: true,
      expressHono: ExperienceLevel.NONE,
    },
  },
  {
    tier: SkillTier.TIER_3,
    name: 'Multi-Framework Developer',
    description: 'I know Next.js/React, and can build an authenticated CRUD app. I know Express/Hono and can build an authenticated CRUD API with API documentation, but I do not know Golang.',
    requirements: {
      reactNextJs: ExperienceLevel.INTERMEDIATE,
      canBuildCrud: true,
      canImplementAuth: true,
      expressHono: ExperienceLevel.INTERMEDIATE,
      canBuildAuthApi: true,
      golang: ExperienceLevel.NONE,
    },
  },
  {
    tier: SkillTier.TIER_4,
    name: 'Advanced Full-Stack Developer',
    description: 'I know Next.js/React, Express/Hono, and I know Golang. I can build a simple API with Go and integrate it with a frontend.',
    requirements: {
      reactNextJs: ExperienceLevel.INTERMEDIATE,
      expressHono: ExperienceLevel.INTERMEDIATE,
      golang: ExperienceLevel.BASIC,
      canBuildGoApi: true,
    },
  },
  {
    tier: SkillTier.TIER_5,
    name: 'Expert Full-Stack Developer',
    description: 'Advanced proficiency in all areas with expert-level skills in multiple frameworks and languages.',
    requirements: {
      reactNextJs: ExperienceLevel.ADVANCED,
      expressHono: ExperienceLevel.ADVANCED,
      golang: ExperienceLevel.INTERMEDIATE,
      canBuildGoApi: true,
      canBuildAuthApi: true,
      canDeploy: true,
    },
  },
];
