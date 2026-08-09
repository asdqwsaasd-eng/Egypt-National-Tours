import * as React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)]',
  elevated:
    'bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow duration-200 motion-reduce:transition-none',
  bordered: 'bg-white rounded-[var(--radius-card)] border border-border',
};

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden',
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 pt-6 pb-2 space-y-1.5', className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 pb-6', className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 pb-6 pt-0 flex items-center gap-3', className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export interface CardImageProps extends ImageProps {
  containerClassName?: string;
  children?: React.ReactNode;
}

export const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ containerClassName, className, alt, fill = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full aspect-[16/9] overflow-hidden', containerClassName)}
      >
        <Image
          alt={alt}
          fill={fill}
          className={cn('object-cover rounded-t-[var(--radius-card)]', className)}
          {...props}
        />
        {children}
      </div>
    );
  }
);
CardImage.displayName = 'CardImage';
