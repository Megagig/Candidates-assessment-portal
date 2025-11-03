import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '../ui';

export const DashboardPreview: React.FC = () => {
  // Mock data for preview
  const stats = [
    { label: 'Total Candidates', value: '1,234', change: '+12%', color: 'text-blue-600' },
    { label: 'Tier 4 Experts', value: '89', change: '+8%', color: 'text-purple-600' },
    { label: 'This Month', value: '156', change: '+24%', color: 'text-green-600' },
    { label: 'Avg. Score', value: '87%', change: '+5%', color: 'text-yellow-600' },
  ];

  const recentCandidates = [
    { name: 'John Doe', tier: 4, email: 'john@example.com' },
    { name: 'Jane Smith', tier: 3, email: 'jane@example.com' },
    { name: 'Bob Johnson', tier: 2, email: 'bob@example.com' },
  ];

  const tierColors: Record<number, string> = {
    4: 'bg-purple-500',
    3: 'bg-yellow-500',
    2: 'bg-green-500',
    1: 'bg-blue-500',
    0: 'bg-gray-500',
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powerful Admin Dashboard
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get instant insights into your candidate pipeline with our intuitive dashboard
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
              >
                <div className="text-sm md:text-base text-gray-300 mb-2">{stat.label}</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className={`text-sm md:text-base ${stat.color} font-semibold`}>{stat.change} this week</div>
              </div>
            ))}
          </div>

          {/* Mock Table */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="px-6 md:px-8 py-5 md:py-6 border-b border-white/20">
              <h3 className="text-xl md:text-2xl font-bold">Recent Candidates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-base md:text-lg font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-base md:text-lg font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-base md:text-lg font-semibold">Tier</th>
                    <th className="px-6 py-4 text-left text-base md:text-lg font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentCandidates.map((candidate, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5 text-base md:text-lg font-medium">{candidate.name}</td>
                      <td className="px-6 py-5 text-base md:text-lg text-gray-300">{candidate.email}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm md:text-base font-bold ${tierColors[candidate.tier]} text-white`}
                        >
                          Tier {candidate.tier}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button className="text-blue-400 hover:text-blue-300 text-base md:text-lg font-semibold hover:underline">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Overlay */}
          <div className="mt-10 md:mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-6 p-8 md:p-10 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all">
              <ExternalLink className="w-14 h-14 md:w-16 md:h-16 text-blue-400" />
              <p className="text-xl md:text-2xl font-bold">
                Want to see the full dashboard in action?
              </p>
              <Button size="lg" className="px-10 py-6 text-lg md:text-xl font-semibold">
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
