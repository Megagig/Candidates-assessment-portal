import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { queryClient } from './lib/queryClient';
import { useAuthStore } from './stores';
import { theme } from './theme/mantine-theme';
import { ProtectedRoute } from './components/auth';
import { AdminLayout } from './components/AdminLayout';

// Public pages
import { HomePage, RegisterPage, RegistrationSuccessPage, ContactPage } from './pages/public';

// Admin pages
import {
  LoginPage,
  AdminRegisterPage,
  DashboardPage,
  CandidatesListPage,
  CandidateDetailPage,
} from './pages/admin';

// Mantine styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications position="top-right" zIndex={1000} />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/registration-success" element={<RegistrationSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Login & Registration */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="candidates" element={<CandidatesListPage />} />
              <Route path="candidates/:id" element={<CandidateDetailPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
