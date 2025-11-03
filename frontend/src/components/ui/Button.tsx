import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 relative overflow-hidden group';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary border border-border shadow-md hover:shadow-lg',
    danger:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-accent',
    gradient:
      'bg-gradient-to-r from-primary via-primary to-[hsl(var(--gradient-end))] text-primary-foreground hover:shadow-2xl hover:-translate-y-1 shadow-lg focus:ring-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-2.5 text-base gap-2',
    lg: 'px-8 py-3.5 text-lg gap-3',
  };

  const shimmerEffect = variant === 'primary' || variant === 'gradient' ? (
    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
  ) : null;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {shimmerEffect}
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
