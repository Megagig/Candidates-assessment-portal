import { useQuery } from '@tanstack/react-query';
import { candidateApi } from '../services';

// Hook to get candidate statistics
export const useCandidateStats = () => {
  return useQuery({
    queryKey: ['candidate-stats'],
    queryFn: async () => {
      const response = await candidateApi.getStats();
      return response.data;
    },
  });
};
