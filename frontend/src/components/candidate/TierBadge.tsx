import React from 'react';
import type { Tier } from '../../types';

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
}

const tierConfig: Record<
  Tier,
  { label: string; color: string; description: string }
> = {
  0: {
    label: 'Tier 0',
    color: 'bg-gray-500',
    description: 'Beginner',
  },
  1: {
    label: 'Tier 1',
    color: 'bg-blue-500',
    description: 'CRUD Developer',
  },
  2: {
    label: 'Tier 2',
    color: 'bg-green-500',
    description: 'Full-Stack Next.js Developer',
  },
  3: {
    label: 'Tier 3',
    color: 'bg-yellow-500',
    description: 'Multi-Framework Developer',
  },
  4: {
    label: 'Tier 4',
    color: 'bg-purple-500',
    description: 'Advanced Full-Stack Developer',
  },
  5: {
    label: 'Tier 5',
    color: 'bg-red-500',
    description: 'Expert Level',
  },
};

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md' }) => {
  const config = tierConfig[tier];

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full text-white ${config.color} ${sizes[size]}`}
      title={config.description}
    >
      {config.label}
    </span>
  );
};
