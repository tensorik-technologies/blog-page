import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/mockData';
import { searchPosts, filterByCategory, sortByDate, paginate, debounceSearch } from '../utils/helpers';
import { BlogCard, FeaturedPostCard } from '../components/blog';
import { Badge } from '../components/ui';
import { clsx } from 'clsx';

const POSTS_PER_PAGE = 6;

export default function Home() {
  const { posts, toggleLike, toggleBookmark, currentUser, loading } = useBlog();
  const { success, error } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debouncedSetSearch = useCallback(debounceSearch(setDebouncedSearch, 300), []);

  useEffect(() => {
    debouncedSetSearch(searchQuery);
    setCurrentPage(1);
  }, [searchQuery, debouncedSetSearch]);

  const filteredPosts = useMemo(() => {
    let result = posts.filter(p => p.status === 'published');
    result = filterByCategory(result, selectedCategory);
    result = searchPosts(result, debouncedSearch);
    result = sortByDate(result);
    return result;
  }, [posts, selectedCategory, debouncedSearch]);

  const featuredPosts = useMemo(() => 
    posts.filter(p => p.featured && p.status === 'published').slice(0, 3),
    [posts]
  );

  const { paginatedPosts, totalPages, hasNext } = useMemo(() => {
    const limit = currentPage * POSTS_PER_PAGE;
    return {
      paginatedPosts: filteredPosts.slice(0, limit),
      totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
      hasNext: limit < filteredPosts.length
    };
  }, [filteredPosts, currentPage]);

  const handleLike = useCallback((postId) => {
    if (!currentUser) {
      error('Please sign in to like posts');
      return;
    }
    toggleLike(postId, currentUser.id);
    success('Post liked!');
  }, [currentUser, toggleLike, success, error]);

  const handleBookmark = useCallback((postId) => {
    if (!currentUser) {
      error('Please sign in to bookmark posts');
      return;
    }
    toggleBookmark(postId, currentUser.id);
    success('Bookmark updated!');
  }, [currentUser, toggleBookmark, success, error]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    posts.filter(p => p.status === 'published').forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 border-b border-dark-100 dark:border-dark-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-50/40 via-white to-white dark:from-primary-900/10 dark:via-dark-950 dark:to-dark-950 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-left animate-slide-up">
              <Badge variant="primary" className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 border border-primary-100 dark:border-primary-800 backdrop-blur-md">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to the Future of Reading
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-dark-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                Ideas that <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500">
                  shape the world.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-dark-500 dark:text-dark-400 mb-10 max-w-xl leading-relaxed">
                Dive into a curated collection of essays, technical deep-dives, and creative stories crafted by industry leaders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-white bg-dark-900 dark:bg-white dark:text-dark-900 hover:bg-dark-800 dark:hover:bg-dark-100 transition-all duration-300 shadow-xl shadow-dark-900/10 dark:shadow-white/10 hover:-translate-y-0.5">
                  Start Writing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/trending" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-dark-900 dark:text-white bg-white dark:bg-dark-900 border-2 border-dark-100 dark:border-dark-800 hover:border-dark-200 dark:hover:border-dark-700 transition-all duration-300">
                  Explore Trending
                </Link>
              </div>
            </div>

            {featuredPosts.length > 0 && (
              <div className="lg:w-1/2 w-full animate-slide-up animation-delay-200 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 blur-3xl -z-10 rounded-full" />
                <FeaturedPostCard
                  post={{ ...featuredPosts[0], isLiked: false, isBookmarked: false }}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-dark-900 dark:text-white">
                Latest Articles
              </h2>
              <p className="text-dark-500 dark:text-dark-400 mt-2">
                Stay updated with the newest insights
              </p>
            </div>
            
            <div className="flex-1 w-full md:w-auto md:max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-3 mb-12 pb-4 border-b border-dark-100 dark:border-dark-800 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={clsx(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                selectedCategory === 'all'
                  ? 'bg-dark-900 dark:bg-white text-white dark:text-dark-900 shadow-md'
                  : 'bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 border border-dark-200 dark:border-dark-800'
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={clsx(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2',
                  selectedCategory === cat.id
                    ? 'bg-dark-900 dark:bg-white text-white dark:text-dark-900 shadow-md'
                    : 'bg-dark-50 dark:bg-dark-900 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 border border-dark-200 dark:border-dark-800'
                )}
              >
                {cat.name}
                <span className="opacity-60 text-xs">{categoryCounts[cat.id] || 0}</span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse bg-dark-50 dark:bg-dark-900 rounded-3xl h-96"></div>
              ))}
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-dark-50 dark:bg-dark-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-dark-400" />
              </div>
              <h3 className="text-2xl font-semibold text-dark-900 dark:text-white mb-2">No results found</h3>
              <p className="text-dark-500 dark:text-dark-400 mb-8 max-w-md mx-auto">
                We couldn't find any articles matching your search or filter criteria. Try adjusting them.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post, i) => (
                  <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <BlogCard
                      post={{ ...post, isLiked: false, isBookmarked: false }}
                      onLike={handleLike}
                      onBookmark={handleBookmark}
                    />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-16 text-center">
                  <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={!hasNext}
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full font-medium text-dark-900 dark:text-white bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {hasNext ? (
                      <>
                        Load More <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      "You've reached the end"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}