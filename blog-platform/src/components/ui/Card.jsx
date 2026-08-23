import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'p-6',
  bordered = true,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'glass rounded-2xl transition-all duration-300',
        bordered && 'border border-white/20 dark:border-dark-700/50',
        hover && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        padding,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={clsx('mb-4', className)} {...props}>{children}</div>
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(({ children, className = '', ...props }, ref) => (
  <h3 ref={ref} className={clsx('text-lg font-semibold text-dark-900 dark:text-dark-100', className)} {...props}>{children}</h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(({ children, className = '', ...props }, ref) => (
  <p ref={ref} className={clsx('text-sm text-dark-500 dark:text-dark-400 mt-1', className)} {...props}>{children}</p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={clsx(className)} {...props}>{children}</div>
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={clsx('mt-4 pt-4 border-t border-dark-200 dark:border-dark-700 flex items-center gap-3', className)} {...props}>{children}</div>
));
CardFooter.displayName = 'CardFooter';

export default Card;