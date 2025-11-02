import React, { useState } from 'react';
import { ChevronDown, Award } from 'lucide-react';

export const TierShowcase: React.FC = () => {
  const [openTier, setOpenTier] = useState<number | null>(0);

  const tiers = [
    {
      tier: 0,
      name: 'Beginner',
      color: 'bg-gray-500',
      borderColor: 'border-gray-500',
      bgLight: 'bg-gray-50 dark:bg-gray-800/50',
      skills: 'HTML, CSS, Basic JavaScript',
      capabilities: 'Basic React/Next.js knowledge',
      limitations: 'Cannot build CRUD apps with databases',
    },
    {
      tier: 1,
      name: 'CRUD Developer',
      color: 'bg-blue-500',
      borderColor: 'border-blue-500',
      bgLight: 'bg-blue-50 dark:bg-blue-900/20',
      skills: 'Next.js, Database integration',
      capabilities: 'Full CRUD applications',
      limitations: 'No authentication implementation',
    },
    {
      tier: 2,
      name: 'Full-Stack Next.js Developer',
      color: 'bg-green-500',
      borderColor: 'border-green-500',
      bgLight: 'bg-green-50 dark:bg-green-900/20',
      skills: 'Next.js, Authentication, Deployment',
      capabilities: 'Authenticated CRUD apps, Can deploy applications',
      limitations: 'No backend framework knowledge (Express/Hono)',
    },
    {
      tier: 3,
      name: 'Multi-Framework Developer',
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-500',
      bgLight: 'bg-yellow-50 dark:bg-yellow-900/20',
      skills: 'Next.js, Express/Hono, Authentication',
      capabilities: 'Authenticated CRUD APIs with documentation',
      limitations: 'No Golang knowledge',
    },
    {
      tier: 4,
      name: 'Advanced Full-Stack Developer',
      color: 'bg-purple-500',
      borderColor: 'border-purple-500',
      bgLight: 'bg-purple-50 dark:bg-purple-900/20',
      skills: 'Next.js, Express, Hono, Golang',
      capabilities: 'Full-stack development with Go APIs',
      limitations: 'None - Expert level',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white dark:bg-gray-900 rounded-full border border-purple-200 dark:border-purple-800">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              5 Tier System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Skill Tier System
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We categorize developers into five distinct tiers based on their skills and experience
          </p>
        </div>

        {/* Tier Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.tier}
              className={`border-2 ${tier.borderColor} rounded-xl overflow-hidden transition-all ${
                openTier === tier.tier ? 'shadow-lg' : 'shadow'
              }`}
            >
              {/* Tier Header */}
              <button
                onClick={() => setOpenTier(openTier === tier.tier ? null : tier.tier)}
                className={`w-full px-6 py-5 flex items-center justify-between ${tier.bgLight} hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${tier.color} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                    {tier.tier}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Tier {tier.tier} - {tier.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tier.skills}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform ${
                    openTier === tier.tier ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Tier Details (Accordion) */}
              {openTier === tier.tier && (
                <div className="px-6 py-5 bg-white dark:bg-gray-900 border-t-2 border-gray-100 dark:border-gray-800">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        ✅ Capabilities:
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {tier.capabilities}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        ⚠️ Limitations:
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {tier.limitations}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
