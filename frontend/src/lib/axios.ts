import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '../types';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return the data directly
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error
      const apiError: ApiError = {
        success: false,
        message: error.response.data?.message || 'An error occurred',
        errors: error.response.data?.errors,
      };

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login or clear auth state
          // This will be handled by the auth store
          break;
        case 403:
          // Forbidden
          apiError.message = 'You do not have permission to perform this action';
          break;
        case 404:
          // Not found
          apiError.message = error.response.data?.message || 'Resource not found';
          break;
        case 422:
          // Validation error
          apiError.message = error.response.data?.message || 'Validation error';
          break;
        case 500:
          // Server error
          apiError.message = 'Internal server error. Please try again later.';
          break;
        default:
          break;
      }

      return Promise.reject(apiError);
    } else if (error.request) {
      // Request made but no response
      const apiError: ApiError = {
        success: false,
        message: 'Network error. Please check your internet connection.',
      };
      return Promise.reject(apiError);
    } else {
      // Something else happened
      const apiError: ApiError = {
        success: false,
        message: error.message || 'An unexpected error occurred',
      };
      return Promise.reject(apiError);
    }
  }
);

export default apiClient;
