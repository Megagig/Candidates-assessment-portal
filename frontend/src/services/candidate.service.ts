import apiClient from '../lib/axios';
import type {
  Candidate,
  CandidateRegistrationData,
  CandidateListResponse,
  CandidateDetailResponse,
  StatsResponse,
  QueryParams,
} from '../types';

export const candidateApi = {
  // Register a new candidate (public)
  register: async (data: CandidateRegistrationData): Promise<CandidateDetailResponse> => {
    const response = await apiClient.post<CandidateDetailResponse>('/candidates/register', data);
    return response.data;
  },

  // Get all candidates with filters (protected)
  getAll: async (params?: QueryParams): Promise<CandidateListResponse> => {
    const response = await apiClient.get<CandidateListResponse>('/candidates', { params });
    return response.data;
  },

  // Get single candidate (protected)
  getById: async (id: string): Promise<CandidateDetailResponse> => {
    const response = await apiClient.get<CandidateDetailResponse>(`/candidates/${id}`);
    return response.data;
  },

  // Update candidate (protected)
  update: async (id: string, data: Partial<Candidate>): Promise<CandidateDetailResponse> => {
    const response = await apiClient.put<CandidateDetailResponse>(`/candidates/${id}`, data);
    return response.data;
  },

  // Delete candidate (protected)
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/candidates/${id}`);
    return response.data;
  },

  // Get statistics (protected)
  getStats: async (): Promise<StatsResponse> => {
    const response = await apiClient.get<StatsResponse>('/candidates/stats');
    return response.data;
  },

  // Export to CSV (protected)
  exportCsv: async (params?: QueryParams): Promise<Blob> => {
    const response = await apiClient.get('/candidates/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },

  // Resend notification email (protected)
  resendNotification: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/candidates/${id}/resend-email`);
    return response.data;
  },
};
