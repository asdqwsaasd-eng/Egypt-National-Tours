import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'info' | 'gold' | 'outline';
  size?: 'sm' | 'md';
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-sand text-text-primary',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
  info: 'bg-info/10 text-info',
  gold: 'bg-brand-gold-light text-text-primary',
  outline: 'border border-border text-text-secondary bg-transparent',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors motion-reduce:transition-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
