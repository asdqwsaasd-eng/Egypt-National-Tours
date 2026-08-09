import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      children,
      className,
      as: Component = 'div',
      size = 'default',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      default: 'max-w-7xl',
      narrow: 'max-w-4xl',
      wide: 'max-w-[1400px]',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
