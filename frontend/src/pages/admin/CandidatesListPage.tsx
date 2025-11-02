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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  const { data, isLoading, error } = useCandidates(queryParams);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTier('');
    setStartDate('');
    setEndDate('');
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
  const hasFilters = searchQuery || selectedTier || startDate || endDate;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Candidates
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="font-medium text-blue-900 dark:text-blue-300">
                {data?.pagination.total || 0} Total
              </span>
            </div>
            {hasFilters && (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium text-purple-900 dark:text-purple-300">
                  {candidates.length} Filtered
                </span>
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={handleExport}
          isLoading={isExporting}
          variant="secondary"
          className="w-full sm:w-auto hover-lift shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to CSV
        </Button>
      </div>

      {/* Enhanced Filters Section */}
      <div className="card-modern animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </label>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tier Filter
            </label>
            <FilterBar
              selectedTier={selectedTier}
              onTierChange={(tier) => setSelectedTier(tier)}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              From Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              To Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>
        </div>
        
        {hasFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Table */}
      <div className="card-modern overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {candidates.length > 0 ? (
          <>
            <CandidateTable candidates={candidates} />
            
            {/* Enhanced Pagination */}
            {data && data.pagination.pages > 1 && (
              <div className="px-6 py-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{((currentPage - 1) * 10) + 1}</span> to{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * 10, data.pagination.total)}</span> of{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">{data.pagination.total}</span> results
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="hover-lift"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Button>
                    
                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: Math.min(5, data.pagination.pages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="sm:hidden px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {currentPage} / {data.pagination.pages}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(currentPage + 1)}
                      disabled={currentPage === data.pagination.pages}
                      className="hover-lift"
                    >
                      Next
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
                ? 'Try adjusting your search or filters to find what you\'re looking for'
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
