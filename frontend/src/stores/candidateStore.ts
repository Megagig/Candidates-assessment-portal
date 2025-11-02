import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Candidate, CandidateFilters, CandidateSortOptions } from '../types';

interface CandidateState {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  filters: CandidateFilters;
  sort: CandidateSortOptions;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  totalCandidates: number;
}

interface CandidateActions {
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  setFilters: (filters: Partial<CandidateFilters>) => void;
  setSort: (sort: CandidateSortOptions) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setPagination: (total: number, pages: number, currentPage: number) => void;
  clearFilters: () => void;
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  removeCandidate: (id: string) => void;
}

type CandidateStore = CandidateState & CandidateActions;

const initialFilters: CandidateFilters = {
  tier: undefined,
  search: undefined,
  dateFrom: undefined,
  dateTo: undefined,
};

const initialSort: CandidateSortOptions = {
  field: 'createdAt',
  order: 'desc',
};

export const useCandidateStore = create<CandidateStore>()(
  devtools(
    (set) => ({
      // State
      candidates: [],
      selectedCandidate: null,
      filters: initialFilters,
      sort: initialSort,
      searchQuery: '',
      currentPage: 1,
      totalPages: 1,
      totalCandidates: 0,

      // Actions
      setCandidates: (candidates) => set({ candidates }),

      setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1, // Reset to first page on filter change
        })),

      setSort: (sort) =>
        set({
          sort,
          currentPage: 1, // Reset to first page on sort change
        }),

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
          currentPage: 1, // Reset to first page on search
        }),

      setPage: (page) => set({ currentPage: page }),

      setPagination: (total, pages, currentPage) =>
        set({
          totalCandidates: total,
          totalPages: pages,
          currentPage,
        }),

      clearFilters: () =>
        set({
          filters: initialFilters,
          searchQuery: '',
          currentPage: 1,
        }),

      addCandidate: (candidate) =>
        set((state) => ({
          candidates: [candidate, ...state.candidates],
          totalCandidates: state.totalCandidates + 1,
        })),

      updateCandidate: (id, updates) =>
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c._id === id ? { ...c, ...updates } : c
          ),
          selectedCandidate:
            state.selectedCandidate?._id === id
              ? { ...state.selectedCandidate, ...updates }
              : state.selectedCandidate,
        })),

      removeCandidate: (id) =>
        set((state) => ({
          candidates: state.candidates.filter((c) => c._id !== id),
          totalCandidates: Math.max(0, state.totalCandidates - 1),
          selectedCandidate:
            state.selectedCandidate?._id === id ? null : state.selectedCandidate,
        })),
    }),
    { name: 'CandidateStore' }
  )
);
