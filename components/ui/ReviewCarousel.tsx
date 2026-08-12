'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ReviewCarouselProps {
  className?: string;
  isAr?: boolean;
}

const REVIEWS = [
  { id: 'rev-01', src: '/images/site-update/reviews/customer-review-01.webp', alt: 'Customer Review 1' },
  { id: 'rev-02', src: '/images/site-update/reviews/customer-review-02.webp', alt: 'Customer Review 2' },
  { id: 'rev-03', src: '/images/site-update/reviews/customer-review-03.webp', alt: 'Customer Review 3' },
  { id: 'rev-04', src: '/images/site-update/reviews/customer-review-04.webp', alt: 'Customer Review 4' },
];

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ className, isAr }) => {
  // Duplicate reviews array for seamless infinite marquee loop
  const marqueeItems = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <div className={cn('relative w-full overflow-hidden py-4', className)}>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0%); }
          100% { transform: translateX(33.333%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 35s linear infinite;
        }
      `}</style>

      {/* Fade overlays for smooth edges */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-12 bg-gradient-to-r from-cream to-transparent dark:from-background" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-12 bg-gradient-to-l from-cream to-transparent dark:from-background" />

      {/* Marquee Track */}
      <div
        className={cn(
          'flex gap-6 w-max items-center hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none',
          isAr ? 'animate-marquee-rtl' : 'animate-marquee'
        )}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="shrink-0 w-[260px] sm:w-[320px] bg-white p-3 rounded-[var(--radius-card)] border border-border shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
          >
            <div className="relative w-full h-[180px] sm:h-[220px]">
              <Image
                src={item.src}
                alt={isAr ? 'تقييم معتمد من عملائنا الكرام' : item.alt}
                fill
                sizes="(max-width: 640px) 260px, 320px"
                className="object-contain block rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
