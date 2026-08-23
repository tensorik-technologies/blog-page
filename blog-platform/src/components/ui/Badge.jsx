import { clsx } from 'clsx';

const variants = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  secondary: 'bg-dark-100 text-dark-700 dark:bg-dark-800 dark:text-dark-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  outline: 'bg-transparent border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export function Badge({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function CategoryBadge({ category, categories }) {
  const cat = categories.find(c => c.id === category);
  if (!cat) return null;
  
  const colors = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  };
  
  const colorClass = colors[cat.color] || colors.blue;
  
  return (
    <Badge variant="outline" className={colorClass} size="sm">
      {cat.name}
    </Badge>
  );
}

export default Badge;