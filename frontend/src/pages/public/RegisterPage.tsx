import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, AssessmentForm } from '../../components';
import { useRegisterCandidate } from '../../hooks';
import { transformAssessmentAnswers } from '../../utils/assessmentTransform';

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

  const handleAssessmentSubmit = (answers: Record<string, string>) => {
    if (!personalInfo) return;

    // Transform assessment answers to the expected format
    const assessmentResponses = transformAssessmentAnswers(answers);

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
            <div>
              <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isPending} />
              <div className="mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="w-full"
                  disabled={isPending}
                >
                  ← Back to Personal Information
                </Button>
              </div>
            </div>
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
