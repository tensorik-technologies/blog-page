import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

function ModalContent({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showClose = true, 
  closeOnOverlay = true,
  className = '',
  ...props 
}) {
  const contentRef = useRef(null);
  const previousActiveRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      contentRef.current?.focus();
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab') trapFocus(e);
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const trapFocus = (e) => {
    const focusable = contentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable?.length) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" 
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        tabIndex={-1}
        className={`
          relative w-full ${sizes[size]} glass rounded-2xl shadow-glass dark:shadow-glass-dark
          animate-scale-in overflow-hidden ${className}
        `}
        {...props}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 border-b border-dark-200 dark:border-dark-700">
            {title && <h2 id="modal-title" className="text-xl font-semibold text-dark-900 dark:text-dark-100">{title}</h2>}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default ModalContent;