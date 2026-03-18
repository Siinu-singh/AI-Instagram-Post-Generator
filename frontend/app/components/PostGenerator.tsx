'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button, Card, ErrorAlert, LoadingSpinner } from './common';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface PostGeneratorProps {
  onPostGenerated: (post: any) => void;
}

export default function PostGenerator({ onPostGenerated }: PostGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual'>('casual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!topic.trim()) {
        setError('Please enter a topic');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/generate-post`, {
        topic: topic.trim(),
        tone: tone,
      });

      onPostGenerated(response.data);
    } catch (err: any) {
      console.error('Error generating post:', err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Failed to generate post. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-fit sticky top-24" padding="lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
        Create New Post
      </h2>

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Topic Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Topic <span className="text-red-500">*</span>
          </label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Sustainable Fashion, AI in Healthcare, Digital Nomad Tips..."
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none transition-all"
            rows={4}
            disabled={loading}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Describe what your Instagram post should be about
          </p>
        </div>

        {/* Tone Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tone <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            {['professional', 'casual'].map((t) => (
              <label key={t} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="tone"
                  value={t}
                  checked={tone === t}
                  onChange={(e) => setTone(e.target.value as 'professional' | 'casual')}
                  disabled={loading}
                  className="mr-2 w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300 capitalize group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t}
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose the style of your post
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError('')}
            dismissible={true}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          isLoading={loading}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate Post'}
        </Button>

        {loading && (
          <div className="flex flex-col items-center justify-center py-4">
            <LoadingSpinner size="md" text="This may take 30-45 seconds..." />
          </div>
        )}
      </form>
    </Card>
  );
}
