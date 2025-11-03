import type { AssessmentResponses, ExperienceLevel } from '../types';

/**
 * Transform raw assessment answers from the form into AssessmentResponses object
 */
export const transformAssessmentAnswers = (
  answers: Record<string, string>
): AssessmentResponses => {
  return {
    htmlCssJsKnowledge: (answers.htmlCssJsKnowledge || 'none') as ExperienceLevel,
    reactNextJsKnowledge: (answers.reactNextJsKnowledge || 'none') as ExperienceLevel,
    canBuildCrudApp: answers.canBuildCrudApp === 'true' || answers.canBuildCrudApp === 'yes',
    canImplementAuth: answers.canImplementAuth === 'true' || answers.canImplementAuth === 'yes',
    canImplementGoogleAuth: answers.canImplementGoogleAuth === 'true' || answers.canImplementGoogleAuth === 'yes',
    databaseKnowledge: (answers.databaseKnowledge || 'none') as ExperienceLevel,
    expressHonoKnowledge: (answers.expressHonoKnowledge || 'none') as ExperienceLevel,
    canBuildAuthenticatedApi: answers.canBuildAuthenticatedApi === 'true' || answers.canBuildAuthenticatedApi === 'yes',
    canDocumentApi: answers.canDocumentApi === 'true' || answers.canDocumentApi === 'yes',
    laravelKnowledge: (answers.laravelKnowledge || 'none') as ExperienceLevel,
    golangKnowledge: (answers.golangKnowledge || 'none') as ExperienceLevel,
    canBuildGoApi: answers.canBuildGoApi === 'true' || answers.canBuildGoApi === 'yes',
    canDeployApps: answers.canDeployApps === 'true' || answers.canDeployApps === 'yes',
  };
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
