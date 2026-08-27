import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart, ChevronRight, Loader2, Grid, List, Filter, X } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/mockData';
import { filterByCategory, searchPosts, sortByDate, paginate } from '../utils/helpers';
import { BlogCard } from '../components/blog';
import { Button, Badge, Input, Skeleton, Avatar, CategoryBadge } from '../components/ui';
import { clsx } from 'clsx';

const POSTS_PER_PAGE = 6;

export default function Bookmarks() {
  const { posts, bookmarks, currentUser, toggleBookmark, toggleLike } = useBlog();
  const { success, error } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  const bookmarkedPosts = useMemo(() => {
    if (!currentUser) return [];
    const bookmarkedIds = bookmarks
      .filter(b => b.userId === currentUser.id)
      .map(b => b.postId);
    return posts.filter(p => bookmarkedIds.includes(p.id) && p.status === 'published');
  }, [posts, bookmarks, currentUser]);

  const filteredPosts = useMemo(() => {
    let result = bookmarkedPosts;
    result = filterByCategory(result, selectedCategory);
    result = searchPosts(result, searchQuery);
    result = sortByDate(result);
    return result;
  }, [bookmarkedPosts, selectedCategory, searchQuery]);

  const { items: paginatedPosts, totalPages, hasNext, hasPrev } = useMemo(
    () => paginate(filteredPosts, currentPage, POSTS_PER_PAGE),
    [filteredPosts, currentPage]
  );

  const handleBookmark = (postId) => {
    if (!currentUser) { error('Please sign in'); return; }
    toggleBookmark(postId, currentUser.id);
    success('Bookmark removed');
  };

  const handleLike = (postId) => {
    if (!currentUser) { error('Please sign in to like'); return; }
    toggleLike(postId, currentUser.id);
    success('Post liked!');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center">
        <div className="text-center py-12 max-w-md mx-auto px-4">
          <Bookmark className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
          <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-2">Sign in to view bookmarks</h2>
          <p className="text-dark-600 dark:text-dark-400 mb-6">
            Bookmark your favorite articles to read later. Your saved posts will appear here.
          </p>
          <Link to="/login" className="btn-primary btn-lg inline-block">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <header className="bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-900 dark:text-dark-100 mb-2">
                Your Bookmarks
              </h1>
              <p className="text-dark-600 dark:text-dark-400">
                {bookmarkedPosts.length} {bookmarkedPosts.length === 1 ? 'saved article' : 'saved articles'}
              </p>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} leftIcon={<X className="w-4 h-4" />}>
                Clear Filters
              </Button>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-10"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={clsx(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 border border-dark-200 dark:border-dark-700'
                )}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedCategory === cat.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 border border-dark-200 dark:border-dark-700'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
            <h3 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-2">
              {hasActiveFilters ? 'No matching bookmarks' : 'No bookmarks yet'}
            </h3>
            <p className="text-dark-600 dark:text-dark-400 mb-6 max-w-md mx-auto">
              {hasActiveFilters 
                ? 'Try adjusting your search or filter criteria'
                : 'Start reading articles and bookmark your favorites to see them here.'
              }
            </p>
            {!hasActiveFilters && (
              <Link to="/" className="btn-primary btn-lg inline-flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Browse Articles
              </Link>
            )}
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} leftIcon={<X className="w-4 h-4" />}>
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-500 dark:text-dark-400 hidden sm:block">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx(
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                  )}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div 
              className={clsx(
                'grid gap-6',
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              )}
              role="list"
            >
              {paginatedPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={{ ...post, isLiked: false, isBookmarked: true }}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(p => p - 1)}
                  disabled={!hasPrev}
                  aria-label="Previous page"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={clsx(
                          'w-10 h-10 rounded-xl font-medium transition-all',
                          currentPage === pageNum
                            ? 'bg-primary-600 text-white'
                            : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                        )}
                        aria-label={`Page ${pageNum}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={!hasNext}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}
