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
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Enhanced Navigation with Premium Glass Effect */}
      <nav className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand with Icon */}
            <div className="flex items-center gap-3">
              <Link 
                to="/admin/dashboard" 
                className="flex items-center gap-3 group transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--gradient-end))] flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold gradient-text">
                    MegaHub
                  </h1>
                  <p className="text-xs text-muted-foreground">Admin Portal</p>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink 
                to="/admin/dashboard" 
                active={location.pathname === '/admin/dashboard'}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/admin/candidates" 
                active={location.pathname.startsWith('/admin/candidates')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              >
                Candidates
              </NavLink>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card transition-all duration-300 hover:shadow-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--gradient-end))] flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-110">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover-lift rounded-xl"
              >
                <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
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
            <div className="md:hidden py-4 border-t border-border/50 animate-fade-in-down">
              <div className="flex flex-col space-y-2">
                <MobileNavLink 
                  to="/admin/dashboard" 
                  active={location.pathname === '/admin/dashboard'} 
                  onClick={closeMobileMenu}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  }
                >
                  Dashboard
                </MobileNavLink>
                <MobileNavLink 
                  to="/admin/candidates" 
                  active={location.pathname.startsWith('/admin/candidates')} 
                  onClick={closeMobileMenu}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                >
                  Candidates
                </MobileNavLink>
                <div className="pt-4 mt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl glass-card mx-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--gradient-end))] flex items-center justify-center text-white font-semibold shadow-lg shadow-primary/30">
                      {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full rounded-xl hover-lift">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
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

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 MegaHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, active, icon }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${
        active
          ? 'bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))] text-primary-foreground shadow-lg shadow-primary/30'
          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      {active && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></span>
      )}
      <span className={`transition-transform duration-300 ${active ? '' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, active, onClick, icon }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))] text-primary-foreground shadow-lg'
          : 'text-foreground hover:bg-accent'
      }`}
    >
      {icon}
      {children}
    </Link>
  );
};
