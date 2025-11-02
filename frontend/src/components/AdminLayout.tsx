import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { useLogout } from '../hooks';
import { Button } from './ui';

export const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/admin/login');
      },
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
                Desishub Admin
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/admin/dashboard" active={location.pathname === '/admin/dashboard'}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/candidates" active={location.pathname.startsWith('/admin/candidates')}>
                Candidates
              </NavLink>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {user?.name}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                <MobileNavLink to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} onClick={closeMobileMenu}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/admin/candidates" active={location.pathname.startsWith('/admin/candidates')} onClick={closeMobileMenu}>
                  Candidates
                </MobileNavLink>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Logged in as: {user?.name}
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, active }) => {
  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${
        active
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, active, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </Link>
  );
};
