import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services';
import { notifications } from '@mantine/notifications';

export const usePendingAdmins = () => {
  return useQuery({
    queryKey: ['pendingAdmins'],
    queryFn: adminApi.getPendingAdmins,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useApproveAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminId: string) => adminApi.approveAdmin(adminId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pendingAdmins'] });
      notifications.show({
        title: 'Success',
        message: data.message || 'Admin approved successfully',
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to approve admin',
        color: 'red',
      });
    },
  });
};

export const useRejectAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adminId, reason }: { adminId: string; reason: string }) =>
      adminApi.rejectAdmin(adminId, reason),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pendingAdmins'] });
      notifications.show({
        title: 'Success',
        message: data.message || 'Admin rejected successfully',
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to reject admin',
        color: 'red',
      });
    },
  });
};

export const useBulkApproveAdmins = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminIds: string[]) => adminApi.bulkApproveAdmins(adminIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pendingAdmins'] });
      notifications.show({
        title: 'Success',
        message: data.message || `${data.approvedCount} admin(s) approved successfully`,
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to approve admins',
        color: 'red',
      });
    },
  });
};

export const useBulkRejectAdmins = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adminIds, reason }: { adminIds: string[]; reason: string }) =>
      adminApi.bulkRejectAdmins(adminIds, reason),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pendingAdmins'] });
      notifications.show({
        title: 'Success',
        message: data.message || `${data.rejectedCount} admin(s) rejected successfully`,
        color: 'green',
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to reject admins',
        color: 'red',
      });
    },
  });
};
