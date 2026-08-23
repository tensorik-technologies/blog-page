import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { initialData } from '../data/mockData';
import { storageGet, storageSet, generateId } from '../utils/helpers';

const STORAGE_KEYS = {
  POSTS: 'blog-posts',
  COMMENTS: 'blog-comments',
  BOOKMARKS: 'blog-bookmarks',
  LIKES: 'blog-likes',
  AUTHORS: 'blog-authors',
  THEME: 'blog-theme',
  USER: 'blog-current-user',
};

const initialState = {
  posts: [],
  authors: [],
  comments: [],
  bookmarks: [],
  likes: [],
  currentUser: null,
  theme: 'light',
  loading: true,
};

function blogReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        ...state,
        posts: action.payload.posts,
        authors: action.payload.authors,
        comments: action.payload.comments,
        bookmarks: action.payload.bookmarks,
        likes: action.payload.likes,
        currentUser: action.payload.currentUser,
        theme: action.payload.theme,
        loading: false,
      };
    }
    case 'SET_THEME': {
      return { ...state, theme: action.payload };
    }
    case 'SET_USER': {
      return { ...state, currentUser: action.payload };
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        authors: state.authors.map(a => a.id === state.currentUser.id ? { ...a, ...action.payload } : a),
      };
    }
    case 'CREATE_POST': {
      return { ...state, posts: [action.payload, ...state.posts] };
    }
    case 'UPDATE_POST': {
      return {
        ...state,
        posts: state.posts.map(p => p.id === action.payload.id ? action.payload : p),
      };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.payload),
        comments: state.comments.filter(c => c.postId !== action.payload),
      };
    }
    case 'TOGGLE_LIKE': {
      const { postId, userId } = action.payload;
      const hasLiked = state.likes.some(l => l.postId === postId && l.userId === userId);
      let newLikes = state.likes;
      let post = state.posts.find(p => p.id === postId);
      
      if (hasLiked) {
        newLikes = state.likes.filter(l => !(l.postId === postId && l.userId === userId));
        post = { ...post, likes: post.likes - 1 };
      } else {
        newLikes = [...state.likes, { id: generateId('like'), postId, userId, createdAt: new Date().toISOString() }];
        post = { ...post, likes: post.likes + 1 };
      }
      
      return {
        ...state,
        likes: newLikes,
        posts: state.posts.map(p => p.id === postId ? post : p),
      };
    }
    case 'TOGGLE_BOOKMARK': {
      const { postId, userId } = action.payload;
      const hasBookmarked = state.bookmarks.some(b => b.postId === postId && b.userId === userId);
      let newBookmarks = state.bookmarks;
      let post = state.posts.find(p => p.id === postId);
      
      if (hasBookmarked) {
        newBookmarks = state.bookmarks.filter(b => !(b.postId === postId && b.userId === userId));
        post = { ...post, bookmarks: post.bookmarks - 1 };
      } else {
        newBookmarks = [...state.bookmarks, { id: generateId('bookmark'), postId, userId, createdAt: new Date().toISOString() }];
        post = { ...post, bookmarks: post.bookmarks + 1 };
      }
      
      return {
        ...state,
        bookmarks: newBookmarks,
        posts: state.posts.map(p => p.id === postId ? post : p),
      };
    }
    case 'ADD_COMMENT': {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    }
    case 'DELETE_COMMENT': {
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.payload),
      };
    }
    case 'LIKE_COMMENT': {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find(c => c.id === commentId);
      if (!comment) return state;
      
      const hasLiked = comment.likedBy?.includes(userId);
      const newLikedBy = hasLiked 
        ? comment.likedBy.filter(id => id !== userId)
        : [...(comment.likedBy || []), userId];
      
      return {
        ...state,
        comments: state.comments.map(c => 
          c.id === commentId 
            ? { ...c, likes: hasLiked ? c.likes - 1 : c.likes + 1, likedBy: newLikedBy }
            : c
        ),
      };
    }
    default:
      return state;
  }
}

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const savedPosts = storageGet(STORAGE_KEYS.POSTS);
      const savedComments = storageGet(STORAGE_KEYS.COMMENTS);
      const savedBookmarks = storageGet(STORAGE_KEYS.BOOKMARKS);
      const savedLikes = storageGet(STORAGE_KEYS.LIKES);
      const savedAuthors = storageGet(STORAGE_KEYS.AUTHORS);
      const savedUser = storageGet(STORAGE_KEYS.USER);
      const savedTheme = storageGet(STORAGE_KEYS.THEME, 'light');

      const posts = savedPosts || initialData.posts.map(post => ({
        ...post,
        author: initialData.authors.find(a => a.id === post.authorId),
      }));
      
      const authors = savedAuthors || initialData.authors;
      const comments = savedComments || initialData.comments.map(comment => ({
        ...comment,
        author: initialData.authors.find(a => a.id === comment.authorId),
        likedBy: [],
        replies: comment.replies.map(reply => ({
          ...reply,
          author: initialData.authors.find(a => a.id === reply.authorId),
          likedBy: [],
        })),
      }));
      const bookmarks = savedBookmarks || [];
      const likes = savedLikes || [];
      const currentUser = savedUser || authors[0];

      dispatch({
        type: 'INITIALIZE',
        payload: { posts, authors, comments, bookmarks, likes, currentUser, theme: savedTheme },
      });
    } catch (error) {
      console.error('Failed to initialize blog data:', error);
      // Fallback to initial data
      const posts = initialData.posts.map(post => ({
        ...post,
        author: initialData.authors.find(a => a.id === post.authorId),
      }));
      dispatch({
        type: 'INITIALIZE',
        payload: { 
          posts, 
          authors: initialData.authors, 
          comments: initialData.comments.map(comment => ({
            ...comment,
            author: initialData.authors.find(a => a.id === comment.authorId),
            likedBy: [],
            replies: comment.replies.map(reply => ({
              ...reply,
              author: initialData.authors.find(a => a.id === reply.authorId),
              likedBy: [],
            })),
          })), 
          bookmarks: [], 
          likes: [], 
          currentUser: initialData.authors[0], 
          theme: 'light' 
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!state.loading) {
      storageSet(STORAGE_KEYS.POSTS, state.posts);
      storageSet(STORAGE_KEYS.COMMENTS, state.comments);
      storageSet(STORAGE_KEYS.BOOKMARKS, state.bookmarks);
      storageSet(STORAGE_KEYS.LIKES, state.likes);
      storageSet(STORAGE_KEYS.AUTHORS, state.authors);
      storageSet(STORAGE_KEYS.USER, state.currentUser);
      storageSet(STORAGE_KEYS.THEME, state.theme);
      
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    }
  }, [state.posts, state.comments, state.bookmarks, state.likes, state.authors, state.currentUser, state.theme, state.loading]);

  const actions = useMemo(() => ({
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user }),
    createPost: (post) => dispatch({ type: 'CREATE_POST', payload: post }),
    updatePost: (post) => dispatch({ type: 'UPDATE_POST', payload: post }),
    deletePost: (postId) => dispatch({ type: 'DELETE_POST', payload: postId }),
    toggleLike: (postId, userId) => dispatch({ type: 'TOGGLE_LIKE', payload: { postId, userId } }),
    toggleBookmark: (postId, userId) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: { postId, userId } }),
    addComment: (comment) => dispatch({ type: 'ADD_COMMENT', payload: comment }),
    deleteComment: (commentId) => dispatch({ type: 'DELETE_COMMENT', payload: commentId }),
    likeComment: (commentId, userId) => dispatch({ type: 'LIKE_COMMENT', payload: { commentId, userId } }),
  }), []);

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}