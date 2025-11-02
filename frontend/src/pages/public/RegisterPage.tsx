import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select } from '../../components/ui';
import { useRegisterCandidate } from '../../hooks';
import type { AssessmentResponse } from '../../types';

// Assessment questions based on tier requirements
const assessmentQuestions = [
  {
    id: 'html_css_js',
    question: 'How would you rate your knowledge of HTML, CSS, and JavaScript?',
    type: 'select',
    options: [
      { value: 'none', label: 'None - I have no experience' },
      { value: 'basic', label: 'Basic - I know the fundamentals' },
      { value: 'intermediate', label: 'Intermediate - I can build complete pages' },
      { value: 'advanced', label: 'Advanced - I have deep expertise' },
    ],
  },
  {
    id: 'react_nextjs',
    question: 'What is your experience level with React or Next.js?',
    type: 'select',
    options: [
      { value: 'none', label: 'None - I have never used them' },
      { value: 'basic', label: 'Basic - I know the basics' },
      { value: 'intermediate', label: 'Intermediate - I can build apps' },
      { value: 'advanced', label: 'Advanced - I am very proficient' },
    ],
  },
  {
    id: 'crud_capability',
    question: 'Can you build a CRUD (Create, Read, Update, Delete) application with a database?',
    type: 'select',
    options: [
      { value: 'no', label: 'No, I cannot' },
      { value: 'yes_basic', label: 'Yes, with guidance/tutorials' },
      { value: 'yes_confident', label: 'Yes, confidently on my own' },
    ],
  },
  {
    id: 'authentication',
    question: 'Can you implement authentication (password + OAuth like Google Sign-In)?',
    type: 'select',
    options: [
      { value: 'no', label: 'No, I cannot' },
      { value: 'password_only', label: 'Yes, password authentication only' },
      { value: 'both', label: 'Yes, both password and OAuth' },
    ],
  },
  {
    id: 'backend_framework',
    question: 'Do you have experience with backend frameworks like Express, Hono, or Laravel?',
    type: 'select',
    options: [
      { value: 'none', label: 'No experience' },
      { value: 'basic', label: 'Basic - I have tried them' },
      { value: 'intermediate', label: 'Intermediate - I can build APIs' },
      { value: 'advanced', label: 'Advanced - I can build authenticated CRUD APIs with documentation' },
    ],
  },
  {
    id: 'deployment',
    question: 'Can you deploy applications to production?',
    type: 'select',
    options: [
      { value: 'no', label: 'No, I have never deployed' },
      { value: 'yes_basic', label: 'Yes, with help' },
      { value: 'yes_confident', label: 'Yes, confidently' },
    ],
  },
  {
    id: 'golang',
    question: 'Do you know Golang and can you build APIs with it?',
    type: 'select',
    options: [
      { value: 'no', label: 'No, I do not know Golang' },
      { value: 'learning', label: 'Learning - I am studying it' },
      { value: 'yes_basic', label: 'Yes, I can build basic APIs' },
      { value: 'yes_advanced', label: 'Yes, I can build complex applications' },
    ],
  },
];

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const { mutate: registerCandidate, isPending } = useRegisterCandidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo || undefined,
  });

  const onPersonalInfoSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    setStep(2);
  };

  const handleAssessmentChange = (questionId: string, value: string) => {
    setAssessmentAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!personalInfo) return;

    // Prepare assessment responses
    const assessmentResponses: AssessmentResponse[] = assessmentQuestions.map((q) => ({
      questionId: q.id,
      question: q.question,
      answer: assessmentAnswers[q.id] || '',
    }));

    // Submit registration
    registerCandidate(
      {
        ...personalInfo,
        assessmentResponses,
      },
      {
        onSuccess: () => {
          // Navigate to success page
          navigate('/registration-success');
        },
      }
    );
  };

  const allQuestionsAnswered = assessmentQuestions.every(
    (q) => assessmentAnswers[q.id]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Candidate Registration
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {step === 1 ? 'Tell us about yourself' : 'Complete the skill assessment'}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <StepIndicator number={1} active={step === 1} completed={step > 1} label="Personal Info" />
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full bg-blue-600 transition-all duration-300 ${
                    step > 1 ? 'w-full' : 'w-0'
                  }`}
                ></div>
              </div>
              <StepIndicator number={2} active={step === 2} completed={false} label="Assessment" />
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <form onSubmit={handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
              <Input
                {...register('name')}
                id="name"
                label="Full Name"
                placeholder="John Doe"
                error={errors.name?.message}
                required
              />

              <Input
                {...register('email')}
                id="email"
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                error={errors.email?.message}
                required
              />

              <Input
                {...register('phone')}
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                error={errors.phone?.message}
              />

              <Input
                {...register('location')}
                id="location"
                label="Location"
                placeholder="City, Country"
                error={errors.location?.message}
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Next: Assessment
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Assessment */}
          {step === 2 && (
            <form onSubmit={handleAssessmentSubmit} className="space-y-6">
              {assessmentQuestions.map((question, index) => (
                <div key={question.id}>
                  <Select
                    label={`${index + 1}. ${question.question}`}
                    value={assessmentAnswers[question.id] || ''}
                    onChange={(e) => handleAssessmentChange(question.id, e.target.value)}
                    options={[
                      { value: '', label: 'Select an option...' },
                      ...question.options,
                    ]}
                    required
                  />
                </div>
              ))}

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!allQuestionsAnswered}
                  isLoading={isPending}
                >
                  Submit Registration
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  number: number;
  active: boolean;
  completed: boolean;
  label: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ number, active, completed, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
          completed
            ? 'bg-green-500 text-white'
            : active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  );
};
