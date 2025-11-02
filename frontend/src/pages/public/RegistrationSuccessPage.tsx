import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

export const RegistrationSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Registration Successful!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for completing the assessment. We've analyzed your responses and assigned you to a skill tier.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Check your email for your tier assignment and next steps. We'll be in touch soon!
        </p>

        {/* Action */}
        <Link to="/">
          <Button size="lg" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
