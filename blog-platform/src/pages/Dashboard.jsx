import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, BarChart2, Bookmark, Heart, Loader2, MoreVertical, Search, Filter } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useToast } from '../context/ToastContext';
import { formatDate, formatRelativeTime, sortByDate, paginate } from '../utils/helpers';
import { categories } from '../data/mockData';
import { Button, Badge, Avatar, Card, Input, Modal, Dropdown } from '../components/ui';

const POSTS_PER_PAGE = 10;

export default function Dashboard() {
  const navigate = useNavigate();
  const { posts, currentUser, deletePost, toggleLike, toggleBookmark } = useBlog();
  const { success, error } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);

  const userPosts = useMemo(() => {
    if (!currentUser) return [];
    let result = posts.filter(p => p.authorId === currentUser.id);
    result = sortByDate(result);
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    return result;
  }, [posts, currentUser, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const userPostsAll = posts.filter(p => p.authorId === currentUser?.id);
    return {
      total: userPostsAll.length,
      published: userPostsAll.filter(p => p.status === 'published').length,
      drafts: userPostsAll.filter(p => p.status === 'draft').length,
      totalViews: userPostsAll.reduce((sum, p) => sum + p.views, 0),
      totalLikes: userPostsAll.reduce((sum, p) => sum + p.likes, 0),
      totalBookmarks: userPostsAll.reduce((sum, p) => sum + p.bookmarks, 0),
    };
  }, [posts, currentUser]);

  const { items: paginatedPosts, totalPages, hasNext, hasPrev } = useMemo(
    () => paginate(userPosts, currentPage, POSTS_PER_PAGE),
    [userPosts, currentPage]
  );

  const handleDelete = (postId) => {
    setDeletingPostId(postId);
  };

  const confirmDelete = () => {
    if (deletingPostId) {
      deletePost(deletingPostId);
      success('Post deleted');
      setDeletingPostId(null);
    }
  };

  const handleLike = (postId) => {
    if (!currentUser) return;
    toggleLike(postId, currentUser.id);
  };

  const handleBookmark = (postId) => {
    if (!currentUser) return;
    toggleBookmark(postId, currentUser.id);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center">
        <div className="text-center py-12 max-w-md mx-auto px-4">
          <BarChart2 className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
          <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100 mb-2">Sign in to access dashboard</h2>
          <p className="text-dark-600 dark:text-dark-400 mb-6">
            Manage your posts, track analytics, and grow your audience.
          </p>
          <Link to="/login" className="btn-primary btn-lg inline-block">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <header className="bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-dark-100">Dashboard</h1>
              <p className="text-dark-600 dark:text-dark-400">Manage your content and track performance</p>
            </div>
            <Link to="/create">
              <Button leftIcon={<Plus className="w-4 h-4" />}>
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Posts" value={stats.total} icon={<Bookmark className="w-5 h-5" />} color="blue" />
          <StatCard label="Published" value={stats.published} icon={<Eye className="w-5 h-5" />} color="green" />
          <StatCard label="Drafts" value={stats.drafts} icon={<Edit className="w-5 h-5" />} color="yellow" />
          <StatCard label="Total Views" value={stats.totalViews.toLocaleString()} icon={<BarChart2 className="w-5 h-5" />} color="purple" />
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-dark-200 dark:border-dark-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100">Your Posts</h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="input appearance-none w-40"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {paginatedPosts.length === 0 ? (
            <div className="p-12 text-center">
              <Bookmark className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
              <h3 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-2">
                {searchQuery || statusFilter !== 'all' ? 'No matching posts' : 'No posts yet'}
              </h3>
              <p className="text-dark-600 dark:text-dark-400 mb-6 max-w-md mx-auto">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start writing your first article to see it here.'
                }
              </p>
              {!(searchQuery || statusFilter !== 'all') && (
                <Link to="/create">
                  <Button leftIcon={<Plus className="w-4 h-4" />}>
                    Create Your First Post
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-dark-200 dark:border-dark-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Post</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider hidden lg:table-cell">Views</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Engagement</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Updated</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-200 dark:divide-dark-700">
                    {paginatedPosts.map(post => (
                      <tr key={post.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                        <td className="px-6 py-4">
                          <Link to={`/post/${post.id}`} className="font-medium text-dark-900 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-1 block max-w-xs">
                            {post.title}
                          </Link>
                          <p className="text-sm text-dark-500 dark:text-dark-400 line-clamp-1 mt-1">{post.excerpt}</p>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <CategoryBadge category={post.category} categories={categories} />
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <Badge variant={post.status === 'published' ? 'success' : 'warning'}>
                            {post.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell text-dark-600 dark:text-dark-400">
                          {post.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4 text-sm text-dark-500 dark:text-dark-400">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4 fill-current text-red-400" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bookmark className="w-4 h-4" />
                              {post.bookmarks}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-dark-500 dark:text-dark-400 whitespace-nowrap">
                          {formatRelativeTime(post.updatedAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/edit/${post.id}`} className="p-2 rounded-lg text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors" aria-label="Edit">
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link to={`/post/${post.id}`} className="p-2 rounded-lg text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors" aria-label="View">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Dropdown
                              trigger={<MoreVertical className="w-5 h-5 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800" />}
                              items={[
                                { id: 'edit', label: 'Edit', icon: <Edit className="w-4 h-4" />, onClick: () => navigate(`/edit/${post.id}`) },
                                { id: 'view', label: 'View', icon: <Eye className="w-4 h-4" />, onClick: () => navigate(`/post/${post.id}`) },
                                { id: 'divider', divider: true },
                                { id: 'delete', label: 'Delete', icon: <Trash2 className="w-4 h-4" />, onClick: () => handleDelete(post.id), variant: 'danger' },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="p-6 border-t border-dark-200 dark:border-dark-700 flex items-center justify-between">
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    Showing page {currentPage} of {totalPages} ({userPosts.length} posts)
                  </p>
                  <nav className="flex items-center gap-2" aria-label="Pagination">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={!hasPrev}>
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
                    <Button variant="ghost" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={!hasNext}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Modal
        isOpen={!!deletingPostId}
        onClose={() => setDeletingPostId(null)}
        title="Delete Post"
        size="sm"
      >
        <p className="text-dark-600 dark:text-dark-400 mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingPostId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete Post</Button>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-dark-500 dark:text-dark-400">{label}</p>
          <p className="text-2xl font-bold text-dark-900 dark:text-dark-100 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

import { clsx } from 'clsx';