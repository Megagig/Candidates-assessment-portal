import apiClient from '../lib/axios';
import type { User } from '../types';

export interface PendingAdminsResponse {
  success: boolean;
  count: number;
  data: User[];
}

export interface ApproveAdminResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface RejectAdminResponse {
  success: boolean;
  message: string;
}

export interface BulkApproveResponse {
  success: boolean;
  message: string;
  approvedCount: number;
  approvedIds: string[];
}

export interface BulkRejectResponse {
  success: boolean;
  message: string;
  rejectedCount: number;
  rejectedIds: string[];
}

export const adminApi = {
  // Get all pending admin registrations
  getPendingAdmins: async (): Promise<PendingAdminsResponse> => {
    const response = await apiClient.get<PendingAdminsResponse>('/admin/pending');
    return response.data;
  },

  // Approve an admin registration
  approveAdmin: async (adminId: string): Promise<ApproveAdminResponse> => {
    const response = await apiClient.put<ApproveAdminResponse>(`/admin/approve/${adminId}`);
    return response.data;
  },

  // Reject an admin registration
  rejectAdmin: async (adminId: string, reason: string): Promise<RejectAdminResponse> => {
    const response = await apiClient.delete<RejectAdminResponse>(`/admin/reject/${adminId}`, {
      data: { reason },
    });
    return response.data;
  },

  // Bulk approve admin registrations
  bulkApproveAdmins: async (adminIds: string[]): Promise<BulkApproveResponse> => {
    const response = await apiClient.post<BulkApproveResponse>('/admin/bulk-approve', {
      adminIds,
    });
    return response.data;
  },

  // Bulk reject admin registrations
  bulkRejectAdmins: async (adminIds: string[], reason: string): Promise<BulkRejectResponse> => {
    const response = await apiClient.post<BulkRejectResponse>('/admin/bulk-reject', {
      adminIds,
      reason,
    });
    return response.data;
  },
};
