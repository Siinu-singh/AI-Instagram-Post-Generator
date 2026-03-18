import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Clean Card Component
 * Simple, readable with subtle shadow
 */
export const Card: React.FC<CardProps> = ({
  children,
  hover = true,
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200';
  
  const hoverStyles = hover
    ? 'hover:shadow-md hover:-translate-y-0.5'
    : '';

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
