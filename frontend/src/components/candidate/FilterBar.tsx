import React from 'react';
import { Select, Button } from '../ui';
import type { Tier } from '../../types';

interface FilterBarProps {
  selectedTier?: Tier | '';
  onTierChange: (tier: Tier | '') => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedTier,
  onTierChange,
  onClearFilters,
}) => {
  const tierOptions = [
    { value: '', label: 'All Tiers' },
    { value: '0', label: 'Tier 0 - Beginner' },
    { value: '1', label: 'Tier 1 - CRUD Developer' },
    { value: '2', label: 'Tier 2 - Full-Stack Next.js' },
    { value: '3', label: 'Tier 3 - Multi-Framework' },
    { value: '4', label: 'Tier 4 - Advanced Full-Stack' },
    { value: '5', label: 'Tier 5 - Expert' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1">
        <Select
          label="Filter by Tier"
          value={selectedTier ?? ''}
          onChange={(e) => onTierChange(e.target.value as Tier | '')}
          options={tierOptions}
        />
      </div>
      <Button variant="ghost" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};
