export type QuestionType = 'multiple-choice' | 'yes-no' | 'experience-level';

export type ExperienceLevel = 'none' | 'basic' | 'intermediate' | 'advanced';

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  category: 'html-css-js' | 'react-nextjs' | 'crud' | 'auth' | 'database' | 'backend' | 'golang';
  required: boolean;
}

export interface AssessmentFormData {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
  };
  responses: {
    [questionId: string]: string | number | boolean | ExperienceLevel;
  };
}

export interface AssessmentResult {
  success: boolean;
  message: string;
  data: {
    candidate: {
      _id: string;
      name: string;
      email: string;
      assignedTier: number;
    };
  };
}
