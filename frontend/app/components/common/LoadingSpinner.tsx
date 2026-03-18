import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerSizeStyles = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizeStyles[size]}`}>
      <div
        className={`${sizeStyles[size]} border-3 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin`}
      />
      {text && (
        <p className={`text-gray-600 dark:text-gray-400 font-medium ${textSizeStyles[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};
