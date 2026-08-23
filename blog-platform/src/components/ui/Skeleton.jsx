import { clsx } from 'clsx';

export function Skeleton({ className = '', variant = 'text', width, height, ...props }) {
  const baseStyles = 'animate-pulse bg-dark-200 dark:bg-dark-700 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    heading: 'h-8 w-1/2',
    avatar: 'rounded-full w-10 h-10',
    avatarLg: 'rounded-full w-16 h-16',
    image: 'aspect-video w-full rounded-xl',
    imageSm: 'aspect-video w-full rounded-lg',
    button: 'h-10 w-24 rounded-xl',
    card: 'rounded-2xl',
    circle: 'rounded-full',
  };

  const style = {
    width: width || (variant === 'avatar' ? '2.5rem' : variant === 'avatarLg' ? '4rem' : variant === 'button' ? '6rem' : undefined),
    height: height || (variant === 'avatar' ? '2.5rem' : variant === 'avatarLg' ? '4rem' : variant === 'button' ? '2.5rem' : undefined),
  };

  return (
    <div
      className={clsx(baseStyles, variants[variant], className)}
      style={style}
      {...props}
      aria-hidden="true"
    />
  );
}

export function BlogCardSkeleton() {
  return (
    <article className="glass rounded-2xl overflow-hidden p-0 animate-fade-in">
      <Skeleton variant="image" />
      <div className="p-6 space-y-4">
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <Skeleton variant="heading" />
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton variant="avatar" />
          <div className="space-y-1">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="30%" />
          </div>
          <Skeleton variant="badge" />
        </div>
      </div>
      <Skeleton variant="image" />
      <div className="prose space-y-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} variant="text" />
        ))}
        <Skeleton variant="imageSm" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={`img-${i}`} variant="text" />
        ))}
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <Skeleton variant="avatar" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="20%" />
        </div>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" />
      </div>
    </div>
  );
}

export default Skeleton;