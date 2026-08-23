import { forwardRef, useId } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  hint, 
  className = '', 
  type = 'text', 
  fullWidth = true,
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`
            w-full rounded-xl border bg-white dark:bg-dark-800 
            text-dark-900 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${leftIcon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'} py-3
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-dark-200 dark:border-dark-700'}
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">{error}</p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-dark-500 dark:text-dark-400">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;