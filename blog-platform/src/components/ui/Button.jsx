import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  leftIcon, 
  rightIcon, 
  fullWidth = false,
  type = 'button',
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/25',
    secondary: 'bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-200 hover:bg-dark-200 dark:hover:bg-dark-700 focus:ring-dark-400',
    ghost: 'bg-transparent text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 focus:ring-dark-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/25',
    outline: 'border-2 border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-200 hover:bg-dark-100 dark:hover:bg-dark-800 focus:ring-dark-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-lg shadow-green-500/25',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
    xl: 'px-9 py-4 text-xl',
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;