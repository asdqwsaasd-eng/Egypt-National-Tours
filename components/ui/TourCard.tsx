import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from './Badge';
import { Button } from './Button';

export interface TourCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  slug: string;
  locale: string;
  imageSrc: string;
  imageAlt: string;
  type?: 'egypt' | 'international';
  duration?: string;
  destinations?: string[];
  summary?: string;
  className?: string;
  viewDetailsText?: string;
  requestTourText?: string;
  detailsHref?: string;
  requestHref?: string;
}

export const TourCard = React.forwardRef<HTMLDivElement, TourCardProps>(
  (
    {
      title,
      slug,
      locale,
      imageSrc,
      imageAlt,
      type = 'egypt',
      duration,
      destinations,
      summary,
      className,
      viewDetailsText,
      requestTourText,
      detailsHref,
      requestHref,
      ...props
    },
    ref
  ) => {
    const detailsLabel = viewDetailsText ?? (locale === 'ar' ? 'عرض التفاصيل' : 'View Details');
    const requestLabel = requestTourText ?? (locale === 'ar' ? 'طلب الرحلة' : 'Request Tour');
    const detailsUrl = detailsHref ?? (type === 'international' ? `/${locale}/international-tours/${slug}` : `/${locale}/egypt-tours/${slug}`);
    const bookingUrl = requestHref ?? `/${locale}/request?tour=${slug}`;

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] group flex flex-col justify-between',
          className
        )}
        {...props}
      >
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 motion-safe:transition-transform duration-300"
            />
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-1">
              <Link href={detailsUrl} className="hover:text-brand-red transition-colors">
                {title}
              </Link>
            </h3>

            {duration && (
              <div className="mb-2">
                <Badge variant="default" size="sm" className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-brand-red shrink-0" aria-hidden="true" />
                  <span>{duration}</span>
                </Badge>
              </div>
            )}

            {destinations && destinations.length > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-text-secondary mb-2">
                <MapPin className="h-4 w-4 text-brand-red shrink-0" aria-hidden="true" />
                <span className="line-clamp-1">{destinations.join(', ')}</span>
              </div>
            )}

            {summary && (
              <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                {summary}
              </p>
            )}
          </div>
        </div>

        <div className="p-5 pt-0 flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href={detailsUrl}>{detailsLabel}</Link>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href={bookingUrl}>{requestLabel}</Link>
          </Button>
        </div>
      </div>
    );
  }
);

TourCard.displayName = 'TourCard';
