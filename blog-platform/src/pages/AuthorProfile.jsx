import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, X, Calendar, Clock, Heart, Bookmark, ChevronRight, Mail } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { formatDate, formatRelativeTime, sortByDate } from '../utils/helpers';
import { BlogCard } from '../components/blog';
import { Button, Badge, Avatar, Card, Skeleton, CategoryBadge } from '../components/ui';
import { clsx } from 'clsx';

export default function AuthorProfile() {
  const { id } = useParams();
  const { authors, posts, currentUser, toggleLike, toggleBookmark } = useBlog();
  const [activeTab, setActiveTab] = useState('posts');

  const author = useMemo(() => authors.find(a => a.id === id), [authors, id]);
  const authorPosts = useMemo(() => 
    sortByDate(posts.filter(p => p.authorId === id && p.status === 'published')),
    [posts, id]
  );

  if (!author) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center">
        <div className="text-center py-12">
          <User className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
          <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-2">Author not found</h2>
          <p className="text-dark-600 dark:text-dark-400">The author you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary btn-sm mt-4 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleLike = (postId) => {
    if (!currentUser) return;
    toggleLike(postId, currentUser.id);
  };

  const handleBookmark = (postId) => {
    if (!currentUser) return;
    toggleBookmark(postId, currentUser.id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      <header className="relative overflow-hidden bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-100/50 via-transparent to-dark-200/50 dark:from-dark-800/50 dark:to-dark-900/50" />
        {author.avatar && (
          <img 
            src={author.avatar} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] dark:opacity-[0.05]"
          />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 text-center lg:text-left">
              <Avatar src={author.avatar} name={author.name} size="2xl" className="mx-auto lg:mx-0 mb-6 ring-4 ring-white dark:ring-dark-950 shadow-xl" />
              <div className="flex flex-col items-center lg:items-start gap-2 mb-6">
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-dark-900 dark:text-white tracking-tight">{author.name}</h1>
                <Badge variant="outline" className="px-3 py-1 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm">@{author.username}</Badge>
              </div>
              <p className="text-dark-600 dark:text-dark-400 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">{author.bio}</p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                {author.social?.twitter && (
                  <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="Twitter">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {author.social?.github && (
                  <a href={author.social.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="GitHub">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                )}
                {author.social?.linkedin && (
                  <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="LinkedIn">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {author.social?.website && (
                  <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="Website">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white dark:bg-dark-800 border border-dark-100 dark:border-dark-700 rounded-2xl shadow-sm">
                  <p className="text-2xl font-bold text-dark-900 dark:text-white">{author.stats?.posts || 0}</p>
                  <p className="text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider mt-1">Posts</p>
                </div>
                <div className="p-4 bg-white dark:bg-dark-800 border border-dark-100 dark:border-dark-700 rounded-2xl shadow-sm">
                  <p className="text-2xl font-bold text-dark-900 dark:text-white">{author.stats?.followers?.toLocaleString() || 0}</p>
                  <p className="text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider mt-1">Followers</p>
                </div>
                <div className="p-4 bg-white dark:bg-dark-800 border border-dark-100 dark:border-dark-700 rounded-2xl shadow-sm">
                  <p className="text-2xl font-bold text-dark-900 dark:text-white">{author.stats?.following?.toLocaleString() || 0}</p>
                  <p className="text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider mt-1">Following</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 rounded-3xl p-8 shadow-sm">
                <div className="flex flex-wrap gap-2 mb-8 border-b border-dark-100 dark:border-dark-800 pb-4" role="tablist" aria-label="Author content">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={clsx(
                      'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
                      activeTab === 'posts'
                        ? 'bg-dark-900 text-white dark:bg-white dark:text-dark-900 shadow-md'
                        : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900'
                    )}
                    role="tab"
                    aria-selected={activeTab === 'posts'}
                  >
                    Posts ({authorPosts.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('bookmarks')}
                    className={clsx(
                      'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
                      activeTab === 'bookmarks'
                        ? 'bg-dark-900 text-white dark:bg-white dark:text-dark-900 shadow-md'
                        : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900'
                    )}
                    role="tab"
                    aria-selected={activeTab === 'bookmarks'}
                  >
                    Bookmarks
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={clsx(
                      'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
                      activeTab === 'about'
                        ? 'bg-dark-900 text-white dark:bg-white dark:text-dark-900 shadow-md'
                        : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900'
                    )}
                    role="tab"
                    aria-selected={activeTab === 'about'}
                  >
                    About
                  </button>
                </div>

                {activeTab === 'posts' && (
                  <div role="tabpanel">
                    {authorPosts.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        {authorPosts.map(post => (
                          <BlogCard
                            key={post.id}
                            post={{ ...post, isLiked: false, isBookmarked: false }}
                            onLike={handleLike}
                            onBookmark={handleBookmark}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-dark-500 dark:text-dark-400">
                        <p>No posts yet. Check back later!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div role="tabpanel">
                    <div className="text-center py-12 text-dark-500 dark:text-dark-400">
                      <p>Author's bookmarks are private.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'about' && (
                  <div role="tabpanel" className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-3">Details</h3>
                        <dl className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-dark-500 dark:text-dark-400">Joined</dt>
                            <dd className="font-medium text-dark-900 dark:text-dark-100">{formatDate(author.joinedAt)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-dark-500 dark:text-dark-400">Posts</dt>
                            <dd className="font-medium text-dark-900 dark:text-dark-100">{author.stats?.posts || 0}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-dark-500 dark:text-dark-400">Followers</dt>
                            <dd className="font-medium text-dark-900 dark:text-dark-100">{author.stats?.followers?.toLocaleString() || 0}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-3">Bio</h3>
                        <p className="text-dark-600 dark:text-dark-400">{author.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}