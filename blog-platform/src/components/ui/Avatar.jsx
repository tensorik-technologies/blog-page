import { clsx } from 'clsx';
import { getInitials } from '../../utils/helpers';

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-24 h-24 text-2xl',
};

const colorPalette = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-green-500',
  'bg-teal-500', 'bg-cyan-500', 'bg-blue-500', 'bg-indigo-500',
  'bg-violet-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500',
];

function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
}

export function Avatar({ 
  src, 
  alt, 
  name, 
  size = 'md', 
  className = '', 
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  ...props 
}) {
  const sizeClass = sizes[size] || sizes.md;
  const shapeClass = shape === 'square' ? 'rounded-xl' : 'rounded-full';
  const showInitials = !src || src === '';
  
  const initials = name ? getInitials(name) : '?';
  const bgColor = name ? getColorFromName(name) : 'bg-dark-400';

  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
    offline: 'bg-dark-400',
  };

  const statusPositions = {
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
  };

  return (
    <div className={clsx('relative inline-flex shrink-0', className)} {...props}>
      {showInitials ? (
        <div
          className={clsx(sizeClass, shapeClass, bgColor, 'flex items-center justify-center font-medium text-white')}
          aria-label={name ? `${name}'s avatar` : 'User avatar'}
        >
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={alt || (name ? `${name}'s avatar` : 'Avatar')}
          className={clsx(sizeClass, shapeClass, 'object-cover')}
          loading="lazy"
        />
      )}
      {status && (
        <span
          className={clsx(
            'absolute border-2 border-white dark:border-dark-950 rounded-full',
            statusColors[status] || statusColors.offline,
            statusPositions[statusPosition],
            size === 'xs' && 'w-2 h-2',
            size === 'sm' && 'w-2.5 h-2.5',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-3.5 h-3.5',
            size === 'xl' && 'w-4 h-4',
            size === '2xl' && 'w-5 h-5',
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export function AvatarGroup({ avatars = [], max = 5, size = 'md', className = '', ...props }) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  
  const overlaps = {
    xs: '-space-x-1',
    sm: '-space-x-1.5',
    md: '-space-x-2',
    lg: '-space-x-2.5',
    xl: '-space-x-3',
    '2xl': '-space-x-4',
  };

  return (
    <div className={clsx('flex', overlaps[size], className)} {...props} aria-label={`${avatars.length} people`}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar key={avatar.id || index} {...avatar} size={size} />
      ))}
      {remainingCount > 0 && (
        <div
          className={clsx(
            sizes[size],
            'rounded-full bg-dark-200 dark:bg-dark-700 flex items-center justify-center font-medium text-dark-600 dark:text-dark-400 border-2 border-white dark:border-dark-950'
          )}
          aria-label={`${remainingCount} more people`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default Avatar;