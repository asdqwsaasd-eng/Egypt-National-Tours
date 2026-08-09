import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-[var(--radius-card)] border border-border p-6',
          className
        )}
        {...props}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold-light text-brand-red shrink-0">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    );
  }
);

InfoCard.displayName = 'InfoCard';
