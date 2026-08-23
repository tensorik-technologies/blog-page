import { Link } from 'react-router-dom';
import { Heart, Bookmark, Clock, Eye, MessageSquare, ChevronRight } from 'lucide-react';
import { formatRelativeTime, formatDate } from '../../utils/helpers';
import { parseMarkdown } from '../../utils/markdown';
import { Card, Badge, Avatar, CategoryBadge } from '../ui';

export function BlogCard({ 
  post, 
  variant = 'default', 
  onLike, 
  onBookmark, 
  showActions = true,
  className = '',
  ...props 
}) {
  const { title, excerpt, coverImage, category, author, publishedAt, readingTime, likes, bookmarks, views, comments } = post;
  const isLiked = post.isLiked;
  const isBookmarked = post.isBookmarked;

  const variants = {
    default: '',
    featured: 'col-span-1 md:col-span-2 lg:col-span-3',
    compact: '',
  };

  return (
    <article 
      className={`glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${variants[variant]} ${className}`}
      {...props}
    >
      {coverImage && (
        <Link to={`/post/${post.id}`} className="block aspect-video relative overflow-hidden" aria-label={`Read ${title}`}>
          <img 
            src={coverImage} 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <CategoryBadge category={category} categories={[]} />
        </Link>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Link to={`/post/${post.id}`}>
              <h3 className="text-xl font-semibold text-dark-900 dark:text-dark-100 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {title}
              </h3>
            </Link>
            <p className="mt-2 text-dark-600 dark:text-dark-400 line-clamp-3 text-sm leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dark-200 dark:border-dark-700">
          <div className="flex items-center gap-3">
            <Link to={`/author/${author?.id}`} className="flex items-center gap-2" aria-label={`View ${author?.name}'s profile`}>
              <Avatar src={author?.avatar} name={author?.name} size="sm" />
              <span className="text-sm font-medium text-dark-700 dark:text-dark-300 hidden sm:block">{author?.name}</span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-dark-500 dark:text-dark-400">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {readingTime} min read
            </span>
          </div>

          {showActions && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike?.(post.id); }}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isLiked 
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                    : 'text-dark-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                }`}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                aria-pressed={isLiked}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} aria-hidden="true" />
                <span className="text-sm font-medium">{likes}</span>
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark?.(post.id); }}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isBookmarked 
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/30' 
                    : 'text-dark-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                aria-pressed={isBookmarked}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-dark-500 dark:text-dark-400">
          <span>{formatRelativeTime(publishedAt)}</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              {comments?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedPostCard({ post, onLike, onBookmark }) {
  const { title, excerpt, coverImage, category, author, publishedAt, readingTime, likes, bookmarks, views, comments } = post;
  const isLiked = post.isLiked;
  const isBookmarked = post.isBookmarked;

  return (
    <article className="glass rounded-2xl overflow-hidden relative group">
      <Link to={`/post/${post.id}`} className="block relative" aria-label={`Read ${title}`}>
        <img 
          src={coverImage} 
          alt="" 
          className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <CategoryBadge category={category} categories={[]} className="absolute top-4 left-4 z-10" />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 mb-3">{title}</h2>
        </Link>
        
        <p className="text-white/80 text-base md:text-lg line-clamp-3 mb-4">{excerpt}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to={`/author/${author?.id}`} className="flex items-center gap-2" aria-label={`View ${author?.name}'s profile`}>
              <Avatar src={author?.avatar} name={author?.name} size="md" />
              <div className="hidden sm:block">
                <p className="text-white font-medium">{author?.name}</p>
                <p className="text-white/60 text-sm">{formatDate(publishedAt)} · {readingTime} min read</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike?.(post.id); }}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isLiked 
                  ? 'text-red-400 bg-white/10' 
                  : 'text-white/80 hover:text-red-400 hover:bg-white/10'
              }`}
              aria-label={isLiked ? 'Unlike' : 'Like'}
              aria-pressed={isLiked}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} aria-hidden="true" />
              <span className="font-medium">{likes}</span>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark?.(post.id); }}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isBookmarked 
                  ? 'text-primary-400 bg-white/10 fill-current' 
                  : 'text-white/80 hover:text-primary-400 hover:bg-white/10'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              aria-pressed={isBookmarked}
            >
              <Bookmark className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;