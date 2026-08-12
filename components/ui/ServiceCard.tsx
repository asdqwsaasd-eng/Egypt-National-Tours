import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface ServiceCardProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'title' | 'href'> {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  imageSrc?: string;
  ctaText?: string;
  className?: string;
}

export const ServiceCard = React.forwardRef<HTMLAnchorElement, ServiceCardProps>(
  ({ title, description, icon, href, imageSrc, ctaText = 'Learn More', className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          'group relative block overflow-hidden bg-white rounded-[var(--radius-card)] border border-border p-6 text-center shadow-sm hover:shadow-[var(--shadow-card)] motion-safe:transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {/* Task 2: Background image revealed on desktop hover with dark overlay for optimal text contrast */}
        {imageSrc && (
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/35" />
          </div>
        )}

        {/* Content container - preserved distinct icons and clear text contrast */}
        <div className="relative z-10 flex flex-col items-center h-full justify-between">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-brand-red group-hover:bg-white/90 group-hover:text-brand-red transition-colors duration-200 shrink-0">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors duration-200 mb-2">
            {title}
          </h3>
          <p className="text-sm text-text-secondary group-hover:text-white/90 transition-colors duration-200 mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
          <span className="text-sm font-medium text-brand-red group-hover:text-brand-gold-light group-hover:underline transition-colors duration-200 mt-auto">
            {ctaText}
          </span>
        </div>
      </Link>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
