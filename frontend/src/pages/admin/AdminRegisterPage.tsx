import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, UserPlus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { authApi } from '../../services';

const adminRegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type AdminRegisterFormData = z.infer<typeof adminRegisterSchema>;

export const AdminRegisterPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminRegisterFormData>({
    resolver: zodResolver(adminRegisterSchema),
  });

  const onSubmit = async (data: AdminRegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call the registration API
      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Registration Pending Approval
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for registering! Your admin account has been submitted for approval.
            Our super admin team will review your request and send you an email once approved.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>What's Next?</strong><br />
              • Our team will verify your details<br />
              • You'll receive an approval email within 24-48 hours<br />
              • Once approved, you can log in and access the dashboard
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1">
              <Button variant="secondary" className="w-full">
                Back to Home
              </Button>
            </Link>
            <Link to="/admin/login" className="flex-1">
              <Button className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Back */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Registration
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Register for an admin account to manage candidates
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Approval Required:</strong> Admin registrations require approval from our super admin team.
                You'll be notified via email once your account is approved.
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                {...register('name')}
                label="Full Name"
                placeholder="John Doe"
                error={errors.name?.message}
                required
              />

              <Input
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="admin@example.com"
                error={errors.email?.message}
                required
              />

              <Input
                {...register('password')}
                type="password"
                label="Password"
                placeholder="Min. 6 characters"
                error={errors.password?.message}
                required
              />

              <Input
                {...register('confirmPassword')}
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                error={errors.confirmPassword?.message}
                required
              />

              <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                <UserPlus className="w-5 h-5 mr-2" />
                Register Admin Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an admin account?{' '}
              <Link to="/admin/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login here
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Admin Account Benefits
            </h3>
            <ul className="space-y-3">
              {[
                'Access to comprehensive candidate dashboard',
                'Advanced filtering and search capabilities',
                'Export candidate data to CSV',
                'View detailed analytics and tier distribution',
                'Manage and update candidate information',
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
