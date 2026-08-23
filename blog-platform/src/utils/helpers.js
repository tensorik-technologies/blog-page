export function calculateReadingTime(text, wordsPerMinute = 200) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

export function formatDate(dateString, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text, length = 160) {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function getCategoryInfo(categoryId, categories) {
  return categories.find(c => c.id === categoryId) || categories[0];
}

export function sortByDate(items, field = 'publishedAt', order = 'desc') {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[field]).getTime();
    const dateB = new Date(b[field]).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function filterByCategory(items, categoryId) {
  if (!categoryId || categoryId === 'all') return items;
  return items.filter(item => item.category === categoryId);
}

export function searchPosts(posts, query) {
  if (!query.trim()) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    (post.author?.name?.toLowerCase().includes(lowerQuery))
  );
}

export function paginate(items, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    items: items.slice(start, end),
    totalPages: Math.ceil(items.length / perPage),
    currentPage: page,
    totalItems: items.length,
    hasNext: end < items.length,
    hasPrev: page > 1,
  };
}

export function getRelatedPosts(posts, currentPostId, category, limit = 3) {
  return posts
    .filter(p => p.id !== currentPostId && p.category === category && p.status === 'published')
    .slice(0, limit);
}

export function debounceSearch(callback, delay = 300) {
  let timeoutId;
  return (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(value), delay);
  };
}

export function storageGet(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function storageRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}