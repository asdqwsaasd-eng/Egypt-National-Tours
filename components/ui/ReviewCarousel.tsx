'use client';

import * as React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
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
  const [activeImage, setActiveImage] = React.useState<{ src: string; alt: string } | null>(null);

  // Duplicate reviews array for seamless infinite marquee loop
  const marqueeItems = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  // Lock body scroll when lightbox modal is open
  React.useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  // Handle Escape key press to close lightbox modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeImage) {
        setActiveImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

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

      {/* Marquee Track — pauses when hovered, focused, or when lightbox is open */}
      <div
        className={cn(
          'flex gap-6 w-max items-center hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none',
          isAr ? 'animate-marquee-rtl' : 'animate-marquee',
          activeImage && '[animation-play-state:paused]'
        )}
      >
        {marqueeItems.map((item, idx) => (
          <button
            key={`${item.id}-${idx}`}
            type="button"
            onClick={() => setActiveImage({ src: item.src, alt: isAr ? 'تقييم معتمد من عملائنا الكرام' : item.alt })}
            className="shrink-0 w-[260px] sm:w-[320px] bg-white p-3 rounded-[var(--radius-card)] border border-border shadow-sm hover:shadow-md transition-all cursor-zoom-in group text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red flex items-center justify-center"
            aria-label={isAr ? 'تكبير صورة التقييم' : 'Zoom in customer review screenshot'}
          >
            <div className="relative w-full h-[180px] sm:h-[220px]">
              <Image
                src={item.src}
                alt={isAr ? 'تقييم معتمد من عملائنا الكرام' : item.alt}
                fill
                sizes="(max-width: 640px) 260px, 320px"
                className="object-contain block rounded-lg group-hover:scale-[1.02] transition-transform duration-200"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Task 3: Lightbox Modal / Zoom View */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? 'عرض صورة التقييم' : 'Customer Review Modal'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-[95vw] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden p-3 sm:p-5 flex flex-col items-center justify-center border border-border/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button with accessible label */}
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute top-3 end-3 z-10 p-2.5 rounded-full bg-black/75 text-white hover:bg-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold shadow-md"
              aria-label={isAr ? 'إغلاق نافذة التقييم' : 'Close review modal'}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Lightbox full image - strict object-contain to avoid any cropping */}
            <div className="relative w-full h-[75vh] sm:h-[82vh] max-w-5xl flex items-center justify-center">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="95vw"
                className="object-contain block rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
