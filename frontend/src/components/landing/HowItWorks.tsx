import React from 'react';
import { UserPlus, Zap, BarChart3 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Candidate Registration',
      description: 'Candidates complete our comprehensive skill assessment',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Zap,
      title: 'Automated Tier Assessment',
      description: 'Our AI analyzes skills and assigns Tier 0-4 automatically',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
    {
      icon: BarChart3,
      title: 'Dashboard Insights',
      description: 'View categorized candidates with detailed analytics',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Simple, fast, and accurate skill assessment in three easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector Line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-300 dark:border-l-gray-700"></div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:scale-105`}
                >
                  <Icon className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>

                {/* Step Number */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
