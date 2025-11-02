import React, { useState, useEffect } from 'react';
import { useCandidates } from '../../hooks/useCandidates';
import { useExportCandidates } from '../../hooks/useExportCandidates';
import { useCandidateStore } from '../../stores';
import { Loading, EmptyState, Button } from '../../components/ui';
import { CandidateTable, SearchBar, FilterBar } from '../../components/candidate';
import type { Tier } from '../../types';

export const CandidatesListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<Tier | ''>('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { currentPage, setPage, clearFilters } = useCandidateStore();
  const { mutate: exportCandidates, isPending: isExporting } = useExportCandidates();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build query params
  const queryParams = {
    page: currentPage,
    limit: 10,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(selectedTier && { tier: selectedTier }),
  };

  const { data, isLoading, error } = useCandidates(queryParams);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTier('');
    clearFilters();
  };

  const handleExport = () => {
    exportCandidates(queryParams);
  };

  if (isLoading && !data) {
    return <Loading fullScreen text="Loading candidates..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load candidates"
        description="There was an error loading the candidates. Please try again."
      />
    );
  }

  const candidates = data?.data || [];
  const hasFilters = searchQuery || selectedTier;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Candidates
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Total: {data?.pagination.total || 0} candidates
          </p>
        </div>
        <Button
          onClick={handleExport}
          isLoading={isExporting}
          variant="secondary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <FilterBar
            selectedTier={selectedTier}
            onTierChange={(tier) => setSelectedTier(tier)}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {candidates.length > 0 ? (
          <>
            <CandidateTable candidates={candidates} />
            
            {/* Pagination */}
            {data && data.pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Page {data.pagination.page} of {data.pagination.pages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(currentPage + 1)}
                      disabled={currentPage === data.pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title={hasFilters ? 'No candidates found' : 'No candidates yet'}
            description={
              hasFilters
                ? 'Try adjusting your search or filters'
                : 'New candidate registrations will appear here'
            }
            action={
              hasFilters
                ? {
                    label: 'Clear Filters',
                    onClick: handleClearFilters,
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};
