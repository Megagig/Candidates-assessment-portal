import React from 'react';
import type { Candidate } from '../../types';
import { TierBadge } from './TierBadge';

interface CandidateCardProps {
  candidate: Candidate;
  onClick?: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onClick,
}) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
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
        <TierBadge tier={candidate.assignedTier} />
      </div>

      {candidate.location && (
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {candidate.location}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span>
          Registered: {new Date(candidate.createdAt).toLocaleDateString()}
        </span>
        <span
          className={`px-2 py-1 rounded ${
            candidate.notificationSent
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
          }`}
        >
          {candidate.notificationSent ? 'Notified' : 'Pending'}
        </span>
      </div>
    </div>
  );
};
