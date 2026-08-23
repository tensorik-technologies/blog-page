import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Heart, Bookmark, Share2, Edit, Trash2, User, Calendar, Clock, 
  MessageSquare, ChevronDown, Loader2, ArrowLeft, Flag, MoreHorizontal
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { formatDate, formatRelativeTime, calculateReadingTime, getRelatedPosts } from '../utils/helpers';
import { parseMarkdown } from '../utils/markdown';
import { categories } from '../data/mockData';
import { Button, Badge, Avatar, Modal, CategoryBadge, Card, Skeleton } from '../components/ui';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, authors, comments, currentUser, toggleLike, toggleBookmark, deletePost, updatePost, addComment, deleteComment, likeComment, loading: loadingContext } = useBlog();
  const { openModal, closeModal } = useModal();
  const { success, error } = useToast();

  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const postCommentsWithAuthors = useMemo(() => 
    postComments.map(comment => ({
      ...comment,
      author: authors.find(a => a.id === comment.authorId),
      replies: comment.replies.map(reply => ({
        ...reply,
        author: authors.find(a => a.id === reply.authorId),
      })),
    })),
    [postComments, authors]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getRelatedPosts(posts, post.id, post.category, 3);
  }, [posts, post]);

  useEffect(() => {
    if (loadingContext) return;
    
    const foundPost = posts.find(p => p.id === id);
    if (foundPost) {
      const postWithAuthor = {
        ...foundPost,
        author: authors.find(a => a.id === foundPost.authorId),
        isLiked: false,
        isBookmarked: false,
      };
      setPost(postWithAuthor);
      const commentsForPost = comments
        .filter(c => c.postId === id)
        .map(comment => ({
          ...comment,
          author: authors.find(a => a.id === comment.authorId),
          replies: comment.replies.map(reply => ({
            ...reply,
            author: authors.find(a => a.id === reply.authorId),
          })),
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPostComments(commentsForPost);
    } else {
      navigate('/404');
    }
    setLoading(false);
  }, [id, posts, authors, comments, navigate, loadingContext]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PostDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const author = post.author;

  const handleLike = () => {
    if (!currentUser) { error('Please sign in to like'); return; }
    toggleLike(post.id, currentUser.id);
    setPost(prev => ({ ...prev, likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1, isLiked: !prev.isLiked }));
    success(prev => prev.isLiked ? 'Like removed' : 'Post liked!');
  };

  const handleBookmark = () => {
    if (!currentUser) { error('Please sign in to bookmark'); return; }
    toggleBookmark(post.id, currentUser.id);
    setPost(prev => ({ ...prev, bookmarks: prev.isBookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1, isBookmarked: !prev.isBookmarked }));
    success(prev => prev.isBookmarked ? 'Bookmark removed' : 'Post bookmarked!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareModalOpen(true);
      success('Link copied to clipboard!');
    }
  };

  const handleDelete = () => {
    deletePost(post.id);
    success('Post deleted');
    navigate('/');
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!currentUser) { error('Please sign in to comment'); return; }
    if (!newComment.trim()) return;
    
    const comment = {
      id: `comment-${Date.now()}`,
      postId: post.id,
      authorId: currentUser.id,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      replies: [],
    };
    
    addComment(comment);
    setPostComments(prev => [comment, ...prev]);
    setNewComment('');
    success('Comment added!');
  };

  const handleSubmitReply = (e, parentId) => {
    e.preventDefault();
    if (!currentUser) { error('Please sign in to reply'); return; }
    if (!replyText.trim()) return;
    
    const reply = {
      id: `reply-${Date.now()}`,
      postId: post.id,
      authorId: currentUser.id,
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      parentId,
    };
    
    setPostComments(prev => prev.map(c => 
      c.id === parentId 
        ? { ...c, replies: [reply, ...c.replies] }
        : c
    ));
    setReplyingTo(null);
    setReplyText('');
    success('Reply added!');
  };

  const handleLikeComment = (commentId) => {
    if (!currentUser) { error('Please sign in to like'); return; }
    likeComment(commentId, currentUser.id);
  };

  const handleDeleteComment = (commentId) => {
    if (!confirm('Delete this comment?')) return;
    deleteComment(commentId);
    setPostComments(prev => prev.filter(c => c.id !== commentId));
    success('Comment deleted');
  };

  const contentHtml = parseMarkdown(post.content);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white mb-12 transition-colors group"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <CategoryBadge category={post.category} categories={categories} />
            <span className="text-dark-300 dark:text-dark-700 hidden sm:block">•</span>
            <Badge variant="outline" className="text-xs px-3 py-1 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm border-dark-200 dark:border-dark-800">
              {calculateReadingTime(post.content)} min read
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-dark-100 dark:border-dark-800/50">
            <div className="flex items-center gap-4">
              <Link to={`/author/${author?.id}`} className="flex items-center gap-4 group" aria-label={`View ${author?.name}'s profile`}>
                <Avatar src={author?.avatar} name={author?.name} size="lg" className="ring-2 ring-transparent group-hover:ring-dark-100 dark:group-hover:ring-dark-800 transition-all" />
                <div>
                  <p className="font-semibold text-dark-900 dark:text-white group-hover:text-dark-600 dark:group-hover:text-dark-300 transition-colors">
                    {author?.name}
                  </p>
                  <p className="text-sm font-medium text-dark-500 dark:text-dark-400 mt-0.5">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900 transition-colors"
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {post.likes}
              </button>
              <button
                onClick={handleBookmark}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-900 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                {post.bookmarks}
              </button>
              <button onClick={handleShare} className="p-2 rounded-full text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white hover:bg-dark-50 dark:hover:bg-dark-900 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              {(currentUser?.id === post.authorId || currentUser?.role === 'admin') && (
                <div className="relative">
                  <button onClick={() => openModal({ title: 'Post Options', size: 'sm' })} className="p-2 rounded-full text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-white hover:bg-dark-50 dark:hover:bg-dark-900 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-dark-900/5 dark:shadow-none border border-dark-100 dark:border-dark-800">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div 
              className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-dark-900 dark:prose-a:text-white hover:prose-a:text-dark-600 dark:hover:prose-a:text-dark-300 prose-img:rounded-2xl max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-dark-100 dark:border-dark-800/50">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider">Tags:</span>
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs px-3 py-1 bg-dark-50 dark:bg-dark-900 border-dark-200 dark:border-dark-800 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 pt-12 border-t border-dark-100 dark:border-dark-800/50">
              <h3 className="text-2xl font-display font-bold text-dark-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
                <MessageSquare className="w-6 h-6" />
                Discussion ({postCommentsWithAuthors.length})
              </h3>

              {currentUser ? (
                <form onSubmit={handleSubmitComment} className="mb-12">
                  <div className="flex gap-4">
                    <Avatar src={currentUser.avatar} name={currentUser.name} size="md" className="shrink-0" />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="What are your thoughts?"
                        className="w-full min-h-[120px] p-5 rounded-2xl border border-dark-200 dark:border-dark-800 bg-dark-50 dark:bg-dark-900 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-dark-900 dark:focus:ring-white focus:border-transparent resize-none transition-all"
                        rows={3}
                      />
                      <div className="flex justify-end gap-3 mt-4">
                        <button type="submit" disabled={!newComment.trim()} className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-dark-900 dark:bg-white dark:text-dark-900 hover:bg-dark-800 dark:hover:bg-dark-100 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-800 rounded-2xl p-8 mb-12 text-center">
                  <p className="text-dark-600 dark:text-dark-400 font-medium mb-4">
                    Join the conversation
                  </p>
                  <Link to="/login" className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-dark-900 dark:bg-white dark:text-dark-900 hover:bg-dark-800 dark:hover:bg-dark-100 transition-all shadow-md inline-block">
                    Sign in to comment
                  </Link>
                </div>
              )}

              <div className="space-y-8">
                {postCommentsWithAuthors.map(comment => (
                  <CommentThread
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    onLike={handleLikeComment}
                    onReply={setReplyingTo}
                    onDelete={handleDeleteComment}
                    replyingTo={replyingTo}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    onSubmitReply={handleSubmitReply}
                    setReplyingTo={setReplyingTo}
                  />
                ))}
                
                {postCommentsWithAuthors.length === 0 && (
                  <div className="text-center py-16 text-dark-500 dark:text-dark-400 bg-dark-50 dark:bg-dark-900/50 rounded-3xl border border-dark-100 dark:border-dark-800/50">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-dark-300 dark:text-dark-700" />
                    <p className="font-medium text-dark-900 dark:text-white mb-1">No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8 sticky top-28 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pb-4">
            <AuthorCard author={author} postCount={posts.filter(p => p.authorId === author?.id).length} />
            
            {relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg text-dark-900 dark:text-white mb-6 tracking-tight">Related Posts</h3>
                <div className="space-y-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} to={`/post/${relatedPost.id}`} className="block group">
                      <h4 className="font-semibold text-dark-900 dark:text-white line-clamp-2 mb-2 group-hover:text-dark-600 dark:group-hover:text-dark-300 transition-colors leading-snug">{relatedPost.title}</h4>
                      <p className="text-sm font-medium text-dark-500 dark:text-dark-400">{formatRelativeTime(relatedPost.publishedAt)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-800 rounded-3xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-dark-900 dark:text-white mb-6 tracking-tight">Share This Post</h3>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-700 text-sm font-semibold text-dark-900 dark:text-white hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Copy Link
                </button>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-700 text-sm font-semibold text-dark-900 dark:text-white hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Tweet
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Post"
        size="sm"
      >
        <p className="text-dark-600 dark:text-dark-400 mb-6">
          Are you sure you want to delete "{post.title}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
        </div>
      </Modal>

      <Modal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Link Copied"
        size="sm"
      >
        <p className="text-dark-600 dark:text-dark-400 text-center mb-6">
          The link has been copied to your clipboard!
        </p>
        <div className="flex justify-center">
          <Button onClick={() => setShareModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}

function CommentThread({ 
  comment, 
  currentUser, 
  onLike, 
  onReply, 
  onDelete, 
  replyingTo, 
  replyText, 
  setReplyText, 
  onSubmitReply, 
  setReplyingTo 
}) {
  const [showReplies, setShowReplies] = useState(false);
  const isLiked = comment.likedBy?.includes(currentUser?.id);
  const isAuthor = currentUser?.id === comment.authorId;

  return (
    <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
      <Avatar src={comment.author?.avatar} name={comment.author?.name} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/author/${comment.author?.id}`} className="font-medium text-dark-900 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-400">
              {comment.author?.name}
            </Link>
            <span className="ml-2 text-sm text-dark-500 dark:text-dark-400">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(comment.id)}
              className={isLiked ? 'text-red-500' : 'text-dark-400 hover:text-red-500'}
              aria-label={isLiked ? 'Unlike comment' : 'Like comment'}
              aria-pressed={isLiked}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply(comment.id)}
              className={replyingTo === comment.id ? 'text-primary-600' : 'text-dark-400'}
            >
              <MessageSquare className="w-4 h-4" />
              Reply
            </Button>
            {isAuthor && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(comment.id)}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        <p className="mt-2 text-dark-700 dark:text-dark-300">{comment.content}</p>

        {replyingTo === comment.id && (
          <form onSubmit={onSubmitReply} className="mt-4 flex gap-2">
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="xs" />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 input py-2"
                autoFocus
              />
              <Button type="submit" size="sm" disabled={!replyText.trim()}>Reply</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {comment.replies.length > 0 && (
          <div className="mt-4 ml-10 border-l-2 border-dark-200 dark:border-dark-700 pl-4 space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              className="text-dark-500 hover:text-dark-700 dark:hover:text-dark-300"
            >
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              <ChevronDown className={`w-4 h-4 ml-1 ${showReplies ? 'rotate-180' : ''}`} />
            </Button>
            
            {showReplies && (
              <div className="space-y-4 mt-2">
                {comment.replies.map(reply => (
                  <CommentThread
                    key={reply.id}
                    comment={reply}
                    currentUser={currentUser}
                    onLike={onLike}
                    onReply={onReply}
                    onDelete={onDelete}
                    replyingTo={replyingTo}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    onSubmitReply={onSubmitReply}
                    setReplyingTo={setReplyingTo}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AuthorCard({ author, postCount }) {
  if (!author) return null;

  return (
    <div className="bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-800 rounded-3xl p-8 shadow-sm">
      <div className="text-center">
        <Avatar src={author.avatar} name={author.name} size="xl" className="mx-auto mb-5 ring-4 ring-white dark:ring-dark-950" />
        <Link to={`/author/${author.id}`}>
          <h3 className="text-2xl font-display font-bold text-dark-900 dark:text-white hover:text-dark-600 dark:hover:text-dark-300 transition-colors">{author.name}</h3>
        </Link>
        <p className="text-sm font-medium text-dark-500 dark:text-dark-400 mt-1">@{author.username}</p>
        <p className="text-dark-600 dark:text-dark-400 text-sm mt-4 line-clamp-3 leading-relaxed">{author.bio}</p>
        
        <div className="mt-6 flex justify-center gap-6 text-sm font-semibold text-dark-900 dark:text-white">
          <div className="flex flex-col items-center">
            <span>{postCount}</span>
            <span className="text-xs font-medium text-dark-500 dark:text-dark-400 mt-1 uppercase tracking-wider">Posts</span>
          </div>
          <div className="w-px h-8 bg-dark-200 dark:bg-dark-700"></div>
          <div className="flex flex-col items-center">
            <span>{author.stats?.followers?.toLocaleString() || 0}</span>
            <span className="text-xs font-medium text-dark-500 dark:text-dark-400 mt-1 uppercase tracking-wider">Followers</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {author.social?.twitter && (
            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {author.social?.github && (
            <a href={author.social.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          )}
          {author.social?.linkedin && (
            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white dark:bg-dark-800 text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors shadow-sm" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
        </div>

        <Link to={`/author/${author.id}`} className="px-6 py-2.5 rounded-full text-sm font-semibold text-dark-900 dark:text-white bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors w-full inline-block mt-6 shadow-sm">
          View Profile
        </Link>
      </div>
    </div>
  );
}

import { PostDetailSkeleton } from '../components/ui';