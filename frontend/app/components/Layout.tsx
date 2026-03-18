'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './common';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-glass border-b border-glass-light dark:border-glass-dark bg-glass-light dark:bg-glass-dark">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Instagram Post
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                AI-Powered Generator
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-250"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.293 2.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.829a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.555a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zm1.414 8.486a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 11a1 1 0 100-2H4a1 1 0 100 2h1zM3.055 15.555a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zm1.414-8.486a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-glass-light dark:border-glass-dark bg-glass-light dark:bg-glass-dark backdrop-blur-glass py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 AI Instagram Post Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
