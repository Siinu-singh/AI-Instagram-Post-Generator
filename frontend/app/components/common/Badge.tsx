import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'purple' | 'blue' | 'gray';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-block rounded-full font-medium transition-all duration-250 ease-out';
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const variantStyles = {
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200',
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
    gray: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
