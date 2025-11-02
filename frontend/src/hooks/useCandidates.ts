import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { candidateApi } from '../services';
import { useCandidateStore, useUIStore } from '../stores';
import type {
  CandidateRegistrationData,
  Candidate,
  QueryParams,
  ApiError,
} from '../types';

// Hook to get all candidates
export const useCandidates = (params?: QueryParams) => {
  const setCandidates = useCandidateStore((state) => state.setCandidates);
  const setPagination = useCandidateStore((state) => state.setPagination);

  return useQuery({
    queryKey: ['candidates', params],
    queryFn: async () => {
      const response = await candidateApi.getAll(params);
      setCandidates(response.data);
      setPagination(
        response.pagination.total,
        response.pagination.pages,
        response.pagination.page
      );
      return response;
    },
  });
};

// Hook to get single candidate
export const useCandidate = (id: string) => {
  const setSelectedCandidate = useCandidateStore(
    (state) => state.setSelectedCandidate
  );

  return useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const response = await candidateApi.getById(id);
      setSelectedCandidate(response.data);
      return response.data;
    },
    enabled: !!id,
  });
};

// Hook to register a candidate
export const useRegisterCandidate = () => {
  const showToast = useUIStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CandidateRegistrationData) =>
      candidateApi.register(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidate-stats'] });
      showToast(
        response.message || 'Registration successful! Check your email for tier assignment.',
        'success'
      );
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Registration failed', 'error');
    },
  });
};

// Hook to update candidate
export const useUpdateCandidate = () => {
  const updateCandidate = useCandidateStore((state) => state.updateCandidate);
  const showToast = useUIStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Candidate> }) =>
      candidateApi.update(id, data),
    onSuccess: (response, variables) => {
      updateCandidate(variables.id, response.data);
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidate', variables.id] });
      showToast('Candidate updated successfully', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Update failed', 'error');
    },
  });
};

// Hook to delete candidate
export const useDeleteCandidate = () => {
  const removeCandidate = useCandidateStore((state) => state.removeCandidate);
  const showToast = useUIStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => candidateApi.delete(id),
    onSuccess: (_, id) => {
      removeCandidate(id);
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidate-stats'] });
      showToast('Candidate deleted successfully', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Delete failed', 'error');
    },
  });
};

// Hook to resend notification
export const useResendNotification = () => {
  const showToast = useUIStore((state) => state.showToast);

  return useMutation({
    mutationFn: (id: string) => candidateApi.resendNotification(id),
    onSuccess: (response) => {
      showToast(response.message || 'Notification sent successfully', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Failed to send notification', 'error');
    },
  });
};
