import type { Request, Response, NextFunction } from 'express';
import { ExperienceLevel } from '../types/index.js';
import type { IAssessmentResponse } from '../types/index.js';

interface AssessmentArrayItem {
  questionId: string;
  question: string;
  answer: string | boolean;
}

/**
 * Middleware to transform assessment responses from array format to object format
 * Handles frontend sending array of {questionId, question, answer} and converts
 * to backend's expected IAssessmentResponse object format
 */
export const transformAssessmentResponses = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const { assessmentResponses } = req.body;

    // If assessmentResponses is already an object, skip transformation
    if (assessmentResponses && !Array.isArray(assessmentResponses)) {
      return next();
    }

    // If it's an array, transform it
    if (Array.isArray(assessmentResponses)) {
      const transformed: Partial<IAssessmentResponse> = {};

      assessmentResponses.forEach((item: AssessmentArrayItem) => {
        const { questionId, answer } = item;
        
        // Map array items to the expected object structure
        switch (questionId) {
          case 'htmlCssJsKnowledge':
          case 'reactNextJsKnowledge':
          case 'databaseKnowledge':
          case 'expressHonoKnowledge':
          case 'laravelKnowledge':
          case 'golangKnowledge':
            // These should be ExperienceLevel enum values
            transformed[questionId] = answer as ExperienceLevel;
            break;
          
          case 'canBuildCrudApp':
          case 'canImplementAuth':
          case 'canImplementGoogleAuth':
          case 'canBuildAuthenticatedApi':
          case 'canDocumentApi':
          case 'canBuildGoApi':
          case 'canDeployApps':
            // These should be boolean values
            transformed[questionId] = answer === 'true' || answer === true;
            break;
          
          default:
            // Unknown field, skip it
            console.warn(`Unknown assessment question ID: ${questionId}`);
        }
      });

      // Replace the array with the transformed object
      req.body.assessmentResponses = transformed;
    }

    next();
  } catch (error) {
    next(error);
  }
};
