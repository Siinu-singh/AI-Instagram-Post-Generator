'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button, Card, ErrorAlert, SuccessAlert } from './common';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface InstagramPreviewProps {
  post: any;
  onPostSubmitted: () => void;
}

export default function InstagramPreview({ post, onPostSubmitted }: InstagramPreviewProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/post`, {
        draft_id: post.preview.id,
      });

      setSubmitted(true);
      setTimeout(() => {
        onPostSubmitted();
      }, 2000);
    } catch (err: any) {
      console.error('Error submitting post:', err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Failed to submit post. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const wordCount = post.draft_post.caption.split(/\s+/).length;

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Preview Header */}
      <div className="bg-indigo-600 text-white p-5">
        <h2 className="text-xl font-bold mb-1">Preview</h2>
        <p className="text-indigo-100 text-sm">Your post will look like this</p>
      </div>

      {/* Instagram Post Mockup */}
      <div className="bg-white dark:bg-slate-800">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">ai_content_creator</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI Generated</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <img
            src={post.draft_post.image_url}
            alt="Generated post"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/1080x1080?text=Image+Loading...';
            }}
          />
        </div>

        {/* Actions */}
        <div className="px-4 py-3 flex items-center gap-4 text-xl border-b border-slate-200 dark:border-slate-700">
          <span className="cursor-pointer hover:opacity-70">❤️</span>
          <span className="cursor-pointer hover:opacity-70">💬</span>
          <span className="cursor-pointer hover:opacity-70">📤</span>
          <span className="ml-auto cursor-pointer hover:opacity-70">🔖</span>
        </div>

        {/* Likes */}
        <div className="px-4 py-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">0 likes</p>
        </div>

        {/* Caption */}
        <div className="px-4 pb-3">
          <p className="text-sm text-slate-900 dark:text-white leading-relaxed">
            <span className="font-semibold">ai_content_creator</span>{' '}
            <span className="text-slate-700 dark:text-slate-300">{post.draft_post.caption}</span>
          </p>
        </div>

        {/* Hashtags */}
        <div className="px-4 pb-3 flex flex-wrap gap-1">
          {post.draft_post.hashtags.map((tag: string, idx: number) => (
            <span key={idx} className="text-sm text-indigo-600 dark:text-indigo-400">
              {tag}
            </span>
          ))}
        </div>

        {/* Timestamp */}
        <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
          {new Date(post.preview.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Stats & Actions */}
      <div className="p-5 space-y-4 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Words</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{wordCount}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hashtags</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{post.draft_post.hashtags.length}</p>
          </div>
        </div>

        {error && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError('')}
            dismissible={true}
          />
        )}

        {submitted ? (
          <SuccessAlert
            message="Post published! Redirecting..."
            dismissible={false}
          />
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            isLoading={submitting}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {submitting ? 'Publishing...' : 'Publish Post'}
          </Button>
        )}
      </div>
    </Card>
  );
}
