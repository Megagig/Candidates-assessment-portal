import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '../../types';
import { TierBadge } from './TierBadge';

interface CandidateTableProps {
  candidates: Candidate[];
}

export const CandidateTable: React.FC<CandidateTableProps> = ({ candidates }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Registered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {candidates.map((candidate) => (
              <tr
                key={candidate._id}
                onClick={() => navigate(`/admin/candidates/${candidate._id}`)}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {candidate.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {candidate.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {candidate.phone || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TierBadge tier={candidate.assignedTier} size="sm" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(candidate.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidate.notificationSent
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}
                  >
                    {candidate.notificationSent ? 'Notified' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            onClick={() => navigate(`/admin/candidates/${candidate._id}`)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {candidate.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {candidate.email}
                </p>
                {candidate.phone && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {candidate.phone}
                  </p>
                )}
              </div>
              <TierBadge tier={candidate.assignedTier} size="sm" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {new Date(candidate.createdAt).toLocaleDateString()}
              </span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  candidate.notificationSent
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}
              >
                {candidate.notificationSent ? 'Notified' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
