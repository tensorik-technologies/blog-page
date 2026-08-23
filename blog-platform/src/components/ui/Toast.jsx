import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
};

export function ToastItem({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const Icon = icons[toast.type] || icons.info;

  useEffect(() => {
    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => onRemove(toast.id), 200);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onRemove]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 200);
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border shadow-lg glass animate-slide-up
        ${colors[toast.type]} ${exiting ? 'animate-fade-out translate-x-full opacity-0' : ''}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5 text-current">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-current"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

import { useToast } from '../../context/ToastContext';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  
  if (!toasts || toasts.length === 0) return null;
  
  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;