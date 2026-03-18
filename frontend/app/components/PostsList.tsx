'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Badge, LoadingSpinner, ErrorAlert } from './common';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface PostsListProps {
  refreshTrigger: number;
}

export default function PostsList({ refreshTrigger }: PostsListProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data.posts || []);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Failed to fetch posts. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <Card className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Loading posts..." />
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
        Published Posts
      </h2>

      {error && (
        <div className="mb-6">
          <ErrorAlert
            message={error}
            onDismiss={() => setError('')}
            dismissible={true}
          />
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-2">
            No published posts yet
          </p>
          <p className="text-slate-500">
            Create your first post to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.post_id || post.id}
              padding="none"
              className="overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <img
                  src={post.content.image_url}
                  alt="Post"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/500x500?text=Image+Not+Found';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                    Topic
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white capitalize">
                    {post.topic}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                    Caption
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
                    {post.content.caption}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Hashtags
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {post.content.hashtags.slice(0, 3).map((tag: string, idx: number) => (
                      <span key={idx} className="text-xs text-indigo-600 dark:text-indigo-400">
                        {tag}
                      </span>
                    ))}
                    {post.content.hashtags.length > 3 && (
                      <span className="text-xs text-slate-500">
                        +{post.content.hashtags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-auto border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Published: {new Date(post.posted_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
