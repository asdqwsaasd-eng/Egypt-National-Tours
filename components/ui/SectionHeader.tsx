import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      subtitle,
      align = 'center',
      className,
      titleAs: TitleTag = 'h2',
      ...props
    },
    ref
  ) => {
    const isCentered = align === 'center';

    return (
      <div
        ref={ref}
        className={cn(
          'mb-10',
          isCentered ? 'text-center' : 'text-start',
          className
        )}
        {...props}
      >
        <TitleTag className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
          {title}
        </TitleTag>

        <div
          className={cn(
            'h-1 w-16 bg-brand-gold rounded-full mt-3',
            isCentered ? 'mx-auto' : 'ms-0 me-auto'
          )}
          aria-hidden="true"
        />

        {subtitle && (
          <p
            className={cn(
              'text-lg text-text-secondary mt-3 max-w-2xl',
              isCentered && 'mx-auto'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
