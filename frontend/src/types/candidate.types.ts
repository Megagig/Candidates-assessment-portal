export type Tier = 0 | 1 | 2 | 3 | 4 | 5;

export interface AssessmentResponse {
  questionId: string;
  question: string;
  answer: string | number | boolean;
}

export interface Candidate {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  assessmentResponses: AssessmentResponse[];
  assignedTier: Tier;
  tierAssignedAt: string;
  notificationSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateRegistrationData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  assessmentResponses: AssessmentResponse[];
}

export interface CandidateFilters {
  tier?: Tier | Tier[];
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CandidateSortOptions {
  field: 'name' | 'email' | 'assignedTier' | 'createdAt';
  order: 'asc' | 'desc';
}

export interface CandidateListResponse {
  success: boolean;
  data: Candidate[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface CandidateDetailResponse {
  success: boolean;
  data: Candidate;
}

export interface TierStats {
  tier: Tier;
  tierName: string;
  count: number;
  percentage: string;
}

export interface RegistrationOverTime {
  _id: string;
  count: number;
}

export interface CandidateStats {
  totalCandidates: number;
  tierDistribution: TierStats[];
  recentRegistrations: number;
  registrationsOverTime: RegistrationOverTime[];
}

export interface StatsResponse {
  success: boolean;
  data: CandidateStats;
}
