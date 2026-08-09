import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  customerName: string;
  rating: number;
  reviewText: string;
  country?: string;
  date?: string;
  isDemo?: boolean;
  className?: string;
}

export const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    {
      customerName,
      rating,
      reviewText,
      country,
      date,
      isDemo = false,
      className,
      ...props
    },
    ref
  ) => {
    const clampedRating = Math.min(Math.max(Math.round(rating), 0), 5);
    const stars = Array.from({ length: 5 }, (_, i) => i < clampedRating);
    const initial = customerName ? customerName.trim().charAt(0).toUpperCase() : '?';

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-[var(--radius-card)] border border-border p-6 flex flex-col justify-between',
          className
        )}
        {...props}
      >
        <div>
          <div
            className="flex items-center gap-1"
            aria-label={`Rating: ${clampedRating} out of 5 stars`}
          >
            {stars.map((isFilled, idx) => (
              <Star
                key={idx}
                aria-hidden="true"
                className={cn(
                  'h-5 w-5 shrink-0',
                  isFilled
                    ? 'fill-brand-gold text-brand-gold'
                    : 'text-text-muted fill-transparent'
                )}
              />
            ))}
          </div>

          <p className="text-base text-text-secondary mt-3 line-clamp-4">
            "{reviewText}"
          </p>
        </div>

        <div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-sand flex items-center justify-center text-brand-red font-bold text-lg shrink-0 select-none">
                {initial}
              </div>
              <div>
                <div className="font-semibold text-text-primary text-sm">
                  {customerName}
                </div>
                {country && (
                  <div className="text-text-muted text-sm">{country}</div>
                )}
              </div>
            </div>
            {date && (
              <span className="text-xs text-text-muted shrink-0">{date}</span>
            )}
          </div>

          {isDemo && (
            <div className="mt-3 pt-2 border-t border-border/50 text-end">
              <span className="text-xs text-text-muted italic">Demo</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ReviewCard.displayName = 'ReviewCard';
