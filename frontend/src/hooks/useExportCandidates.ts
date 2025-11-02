import { useMutation } from '@tanstack/react-query';
import { candidateApi } from '../services';
import { useUIStore } from '../stores';
import type { QueryParams, ApiError } from '../types';

// Hook to export candidates to CSV
export const useExportCandidates = () => {
  const showToast = useUIStore((state) => state.showToast);

  return useMutation({
    mutationFn: (params?: QueryParams) => candidateApi.exportCsv(params),
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `candidates-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showToast('Export successful', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Export failed', 'error');
    },
  });
};
