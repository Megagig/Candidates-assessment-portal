import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth';
import { useAuthStore } from '../../stores';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-[hsl(var(--gradient-end))]/5 transition-colors duration-500"></div>
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[hsl(var(--gradient-end))]/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-info/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-primary to-[hsl(var(--gradient-end))] shadow-2xl shadow-primary/50 hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-3">
              <span className="gradient-text">Admin Portal</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Sign in to continue
            </p>
          </div>

          {/* Login Card with Premium Glass Effect */}
          <div className="glass-card rounded-3xl p-10 shadow-2xl backdrop-blur-2xl animate-fade-in-up border-2 border-border/50">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Sign In
              </h2>
              <p className="text-sm text-muted-foreground">
                Access your admin dashboard
              </p>
            </div>

            <LoginForm />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 glass text-muted-foreground font-medium">
                  or
                </span>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <button
                onClick={() => navigate('/admin/register')}
                className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
              >
                Don't have an account? <span className="font-semibold gradient-text">Register here</span>
              </button>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-8 animate-fade-in">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 group px-6 py-3 rounded-xl hover:bg-accent"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-10 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-accent/50 px-4 py-2 rounded-full">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Secured with end-to-end encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
