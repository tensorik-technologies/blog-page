import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Heart, Eye, Bookmark, ChevronRight, Trophy, Flame } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useToast } from '../context/ToastContext';
import { formatRelativeTime, sortByDate } from '../utils/helpers';
import { BlogCard } from '../components/blog';
import { Button, Badge, Avatar, Card, Tabs, TabList, Tab, TabPanel, CategoryBadge } from '../components/ui';

const TIME_RANGES = [
  { id: 'day', label: 'Today', icon: Flame },
  { id: 'week', label: 'This Week', icon: Clock },
  { id: 'month', label: 'This Month', icon: TrendingUp },
  { id: 'all', label: 'All Time', icon: Trophy },
];

export default function Trending() {
  const { posts, authors, currentUser, toggleLike, toggleBookmark } = useBlog();
  const { success, error } = useToast();
  const [timeRange, setTimeRange] = useState('week');

  const trendingPosts = useMemo(() => {
    let filtered = posts.filter(p => p.status === 'published');
    
    const now = new Date();
    const cutoff = new Date();
    switch (timeRange) {
      case 'day':
        cutoff.setDate(now.getDate() - 1);
        break;
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case 'all':
      default:
        cutoff.setFullYear(2020);
    }
    
    filtered = filtered.filter(p => new Date(p.publishedAt) >= cutoff);
    
    return filtered
      .map(post => ({
        ...post,
        trendingScore: calculateTrendingScore(post, cutoff),
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 20);
  }, [posts, timeRange]);

  const topPost = trendingPosts[0];
  const otherPosts = trendingPosts.slice(1);

  const handleLike = (postId) => {
    if (!currentUser) { error('Please sign in to like'); return; }
    toggleLike(postId, currentUser.id);
    success('Post liked!');
  };

  const handleBookmark = (postId) => {
    if (!currentUser) { error('Please sign in to bookmark'); return; }
    toggleBookmark(postId, currentUser.id);
    success('Bookmarked!');
  };

  function calculateTrendingScore(post, cutoff) {
    const hoursSincePublish = (new Date() - new Date(post.publishedAt)) / (1000 * 60 * 60);
    const hoursSinceCutoff = (new Date() - cutoff) / (1000 * 60 * 60);
    const recencyFactor = Math.max(0.1, 1 - (hoursSincePublish / hoursSinceCutoff));
    const engagementScore = (post.likes * 2) + (post.bookmarks * 3) + (post.views * 0.1) + (post.comments?.length * 1.5);
    return engagementScore * recencyFactor;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <header className="bg-gradient-to-b from-primary-50/50 dark:from-primary-900/10 to-transparent py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <Badge variant="primary" className="mb-4 inline-flex">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending Now
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 dark:text-dark-100 mb-2">
                Trending Articles
              </h1>
              <p className="text-dark-600 dark:text-dark-400">
                Most engaging stories based on likes, bookmarks, views, and comments.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Tabs value={timeRange} onChange={setTimeRange} className="hidden sm:flex">
                <TabList className="bg-white dark:bg-dark-800 rounded-xl p-1 gap-1">
                  {TIME_RANGES.map(range => (
                    <Tab 
                      key={range.id} 
                      value={range.id}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
                    >
                      <range.icon className="w-4 h-4" />
                      {range.label}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="sm:hidden input appearance-none bg-white dark:bg-dark-800"
              >
                {TIME_RANGES.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {topPost && (
          <section className="mb-12">
            <article className="glass rounded-2xl overflow-hidden relative">
              <Link to={`/post/${topPost.id}`} className="block relative" aria-label={`Read ${topPost.title}`}>
                {topPost.coverImage && (
                  <img 
                    src={topPost.coverImage} 
                    alt="" 
                    className="w-full h-64 md:h-80 object-cover"
                    loading="eager"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <CategoryBadge category={topPost.category} categories={[]} className="absolute top-4 left-4 z-10" />
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="primary" className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    #1 Trending
                  </Badge>
                </div>
              </Link>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Link to={`/post/${topPost.id}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 mb-3">{topPost.title}</h2>
                </Link>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Link to={`/author/${topPost.author?.id}`} className="flex items-center gap-2" aria-label={`View ${topPost.author?.name}'s profile`}>
                      <Avatar src={topPost.author?.avatar} name={topPost.author?.name} size="sm" />
                      <div className="hidden sm:block">
                        <p className="text-white font-medium">{topPost.author?.name}</p>
                        <p className="text-white/60 text-sm">{formatRelativeTime(topPost.publishedAt)}</p>
                      </div>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-current text-red-400" />
                      {topPost.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {topPost.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4" />
                      {topPost.bookmarks.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-dark-900 dark:text-dark-100">
              More Trending
            </h2>
            <p className="text-dark-600 dark:text-dark-400">
              Showing top {otherPosts.length} articles for {TIME_RANGES.find(r => r.id === timeRange)?.label.toLowerCase()}
            </p>
          </div>

          {otherPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post, index) => (
                <article key={post.id} className="glass rounded-2xl overflow-hidden group">
                  <Link to={`/post/${post.id}`} className="block relative">
                    <img 
                      src={post.coverImage} 
                      alt="" 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary" className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        #{index + 2}
                      </Badge>
                    </div>
                    <CategoryBadge category={post.category} categories={[]} className="absolute top-3 right-3" />
                  </Link>
                  <div className="p-5">
                    <Link to={`/post/${post.id}`}>
                      <h3 className="font-semibold text-dark-900 dark:text-dark-100 line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <Link to={`/author/${post.author?.id}`} className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400">
                        <Avatar src={post.author?.avatar} name={post.author?.name} size="xs" />
                        <span className="hidden sm:block">{post.author?.name}</span>
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-dark-500 dark:text-dark-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-current text-red-400" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <TrendingUp className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
              <h3 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-2">No trending articles</h3>
              <p className="text-dark-600 dark:text-dark-400">Check back later for trending content.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}