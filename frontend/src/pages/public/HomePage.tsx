import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Desishub Talent Assessment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join our team of skilled developers
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome to Desishub!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We're an innovative tech agency looking for talented developers to join our team.
              Our skill assessment helps us understand your expertise and match you with the right opportunities.
            </p>
          </div>

          {/* Tier Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Skill Tiers
            </h3>
            <div className="space-y-4">
              <TierCard
                tier="Tier 0 - Beginner"
                description="HTML, CSS, basic JavaScript, and basics of React/Next.js"
                color="bg-gray-500"
              />
              <TierCard
                tier="Tier 1 - CRUD Developer"
                description="Can build CRUD apps with Next.js and databases"
                color="bg-blue-500"
              />
              <TierCard
                tier="Tier 2 - Full-Stack Next.js Developer"
                description="Can build authenticated CRUD apps and deploy them"
                color="bg-green-500"
              />
              <TierCard
                tier="Tier 3 - Multi-Framework Developer"
                description="Proficient in Next.js and Express/Hono with authentication"
                color="bg-yellow-500"
              />
              <TierCard
                tier="Tier 4 - Advanced Full-Stack Developer"
                description="Expert in Next.js, Express, and Golang"
                color="bg-purple-500"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Start Your Assessment
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Takes about 10-15 minutes to complete
            </p>
          </div>
        </div>

        {/* Admin Link */}
        <div className="text-center mt-8">
          <Link
            to="/admin/login"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

interface TierCardProps {
  tier: string;
  description: string;
  color: string;
}

const TierCard: React.FC<TierCardProps> = ({ tier, description, color }) => {
  return (
    <div className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className={`${color} rounded-full w-3 h-3 mt-1.5 mr-4 flex-shrink-0`}></div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{tier}</h4>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};
