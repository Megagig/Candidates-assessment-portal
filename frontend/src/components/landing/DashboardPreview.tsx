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
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Powerful Admin Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Get instant insights into your candidate pipeline with our intuitive dashboard
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="text-sm text-gray-300 mb-1">{stat.label}</div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className={`text-sm ${stat.color}`}>{stat.change} this week</div>
              </div>
            ))}
          </div>

          {/* Mock Table */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/20">
              <h3 className="text-xl font-semibold">Recent Candidates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Tier</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentCandidates.map((candidate, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm">{candidate.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{candidate.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierColors[candidate.tier]} text-white`}
                        >
                          Tier {candidate.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
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
          <div className="mt-8 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <ExternalLink className="w-12 h-12 text-blue-400" />
              <p className="text-lg font-medium">
                Want to see the full dashboard in action?
              </p>
              <Button size="lg" className="px-8">
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
