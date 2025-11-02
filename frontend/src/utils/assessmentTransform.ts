import type { AssessmentResponse } from '../types';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';

/**
 * Transform raw assessment answers from the form into an array of AssessmentResponse objects
 */
export const transformAssessmentAnswers = (
  answers: Record<string, string>
): AssessmentResponse[] => {
  return ASSESSMENT_QUESTIONS.map((question) => {
    const answer = answers[question.id] || '';
    
    return {
      questionId: question.id,
      question: question.question,
      answer: answer,
    };
  });
};

/**
 * Validate that all required assessment fields are present
 */
export const validateAssessmentAnswers = (
  answers: Record<string, string>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const requiredFields = [
    'htmlCssJsKnowledge',
    'reactNextJsKnowledge',
    'canBuildCrudApp',
    'databaseKnowledge',
    'canImplementAuth',
    'canImplementGoogleAuth',
    'expressHonoKnowledge',
    'canBuildAuthenticatedApi',
    'canDocumentApi',
    'laravelKnowledge',
    'golangKnowledge',
    'canBuildGoApi',
    'canDeployApps',
  ];

  requiredFields.forEach((field) => {
    if (!answers[field] || answers[field] === '') {
      errors.push(`${field} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get a user-friendly summary of assessment responses
 */
export const getAssessmentSummary = (answers: Record<string, string>) => {
  const getAnswer = (questionId: string) => answers[questionId] || 'not answered';

  return {
    frontend: {
      htmlCssJs: getAnswer('htmlCssJsKnowledge'),
      reactNextJs: getAnswer('reactNextJsKnowledge'),
      canBuildCrud: getAnswer('canBuildCrudApp'),
    },
    authentication: {
      password: getAnswer('canImplementAuth'),
      oauth: getAnswer('canImplementGoogleAuth'),
    },
    backend: {
      expressHono: getAnswer('expressHonoKnowledge'),
      laravel: getAnswer('laravelKnowledge'),
      canBuildAuthApi: getAnswer('canBuildAuthenticatedApi'),
      canDocument: getAnswer('canDocumentApi'),
    },
    advanced: {
      golang: getAnswer('golangKnowledge'),
      canBuildGoApi: getAnswer('canBuildGoApi'),
    },
    deployment: getAnswer('canDeployApps'),
    database: getAnswer('databaseKnowledge'),
  };
};
