import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { generateId } from '../utils/helpers';

const ToastContext = createContext(null);

const initialState = {
  toasts: [],
};

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case 'CLEAR_TOASTS':
      return { ...state, toasts: [] };
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = generateId('toast');
    const toast = { id, message, type, duration };
    dispatch({ type: 'ADD_TOAST', payload: toast });
    
    if (duration > 0) {
      setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  }, []);

  const clearToasts = useCallback(() => {
    dispatch({ type: 'CLEAR_TOASTS' });
  }, []);

  const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

  const value = useMemo(() => ({
    toasts: state.toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  }), [state.toasts, addToast, removeToast, clearToasts, success, error, warning, info]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}