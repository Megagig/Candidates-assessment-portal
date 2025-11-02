import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services';
import { useAuthStore } from '../stores';
import type { LoginCredentials, RegisterData, ApiError } from '../types';
import { useUIStore } from '../stores/uiStore';

// Hook for login
export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useUIStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      showToast('Login successful!', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Login failed', 'error');
    },
  });
};

// Hook for register
export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useUIStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      showToast('Registration successful!', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Registration failed', 'error');
    },
  });
};

// Hook for logout
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const showToast = useUIStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
      showToast('Logged out successfully', 'success');
    },
    onError: (error: ApiError) => {
      showToast(error.message || 'Logout failed', 'error');
    },
  });
};

// Hook to check authentication
export const useCheckAuth = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => checkAuth(),
    enabled: !isAuthenticated,
    retry: false,
  });
};
