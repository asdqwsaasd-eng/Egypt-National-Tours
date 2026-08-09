import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export interface ServiceCardProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title' | 'href'> {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  ctaText?: string;
  className?: string;
}

export const ServiceCard = React.forwardRef<HTMLAnchorElement, ServiceCardProps>(
  ({ title, description, icon, href, ctaText = 'Learn More', className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          'group block bg-white rounded-[var(--radius-card)] border border-border p-6 text-center hover:shadow-[var(--shadow-card)] motion-safe:transition-shadow duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-brand-red">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {description}
        </p>
        <span className="text-sm font-medium text-brand-red group-hover:underline">
          {ctaText}
        </span>
      </Link>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
