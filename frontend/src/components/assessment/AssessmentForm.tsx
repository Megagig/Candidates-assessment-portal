import React, { useState } from 'react';
import { Button } from '../ui';
import { ASSESSMENT_QUESTIONS, ASSESSMENT_CATEGORIES } from '../../data/assessmentQuestions';
import type { AssessmentQuestion } from '../../data/assessmentQuestions';

interface AssessmentFormProps {
  onSubmit: (answers: Record<string, string>) => void;
  isLoading?: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, isLoading = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showReview, setShowReview] = useState(false);

  // Group questions by category
  const questionsByCategory = ASSESSMENT_CATEGORIES.map((category) => ({
    ...category,
    questions: ASSESSMENT_QUESTIONS.filter((q) => q.category === category.id),
  })).filter((cat) => cat.questions.length > 0);

  const totalSteps = questionsByCategory.length;
  const currentCategory = questionsByCategory[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isStepComplete = () => {
    if (!currentCategory) return false;
    return currentCategory.questions.every((q) => {
      if (!q.required) return true;
      return answers[q.id] && answers[q.id] !== '';
    });
  };

  const allQuestionsAnswered = ASSESSMENT_QUESTIONS.filter((q) => q.required).every(
    (q) => answers[q.id] && answers[q.id] !== ''
  );

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowReview(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (showReview) {
      setShowReview(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const getAnswerLabel = (question: AssessmentQuestion, answerId: string) => {
    const option = question.options?.find((opt) => opt.value === answerId);
    return option?.label || answerId;
  };

  if (showReview) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Review Your Answers
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please review your responses before submitting. You can go back to make changes.
          </p>
        </div>

        <div className="space-y-6">
          {ASSESSMENT_CATEGORIES.map((category) => {
            const categoryQuestions = ASSESSMENT_QUESTIONS.filter(
              (q) => q.category === category.id
            );
            if (categoryQuestions.length === 0) return null;

            return (
              <div
                key={category.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {categoryQuestions.map((question) => (
                    <div key={question.id} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {question.question}
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {getAnswerLabel(question, answers[question.id])}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="flex-1"
            disabled={isLoading}
          >
            Back to Edit
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1"
            isLoading={isLoading}
            disabled={!allQuestionsAnswered || isLoading}
          >
            Submit Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress: Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Category Header */}
      {currentCategory && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{currentCategory.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentCategory.name}
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-14">
            Answer the questions below about your experience in this area.
          </p>
        </div>
      )}

      {/* Questions */}
      {currentCategory && (
        <div className="space-y-6">
          {currentCategory.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
              value={answers[question.id] || ''}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex-1"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!isStepComplete()}
          className="flex-1"
        >
          {currentStep === totalSteps - 1 ? 'Review Answers' : 'Next'}
        </Button>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 pt-4">
        {questionsByCategory.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'w-8 bg-blue-600'
                : index < currentStep
                ? 'w-2 bg-green-500'
                : 'w-2 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: AssessmentQuestion;
  questionNumber: number;
  value: string;
  onChange: (value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  value,
  onChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">
          {questionNumber}. {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {question.helpText && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            💡 {question.helpText}
          </p>
        )}
      </div>

      <div className="space-y-2">
        {question.options?.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
              value === option.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900 dark:text-white font-medium">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
