'use client';

import { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import PostGenerator from './components/PostGenerator';
import InstagramPreview from './components/InstagramPreview';
import PostsList from './components/PostsList';
import { Button } from './components/common';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<'generator' | 'posts'>('generator');
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const handlePostGenerated = (post: any) => {
    setGeneratedPost(post);
  };

  const handlePostSubmitted = () => {
    setGeneratedPost(null);
    setCurrentTab('posts');
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
      {/* Curved Header */}
      <header className="sticky top-0 z-50 mx-4 sm:mx-6 mt-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Instagram Post Generator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Powered by AI
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Create Instagram Posts with AI
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Generate engaging captions, hashtags, and images instantly.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-10 justify-center px-4">
          <Button
            variant={currentTab === 'generator' ? 'primary' : 'secondary'}
            onClick={() => setCurrentTab('generator')}
          >
            Create Post
          </Button>
          <Button
            variant={currentTab === 'posts' ? 'primary' : 'secondary'}
            onClick={() => setCurrentTab('posts')}
          >
            View Posts
          </Button>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentTab === 'generator' ? (
              <>
                <div>
                  <PostGenerator onPostGenerated={handlePostGenerated} />
                </div>
                {generatedPost && (
                  <div className="animate-slide-up">
                    <InstagramPreview 
                      post={generatedPost} 
                      onPostSubmitted={handlePostSubmitted}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="lg:col-span-2">
                <PostsList refreshTrigger={refreshTrigger} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Curved Footer */}
      <footer className="mx-4 sm:mx-6 mb-4 mt-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            AI Instagram Post Generator &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
