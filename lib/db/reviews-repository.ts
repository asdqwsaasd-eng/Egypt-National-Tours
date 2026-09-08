import { prisma, isDatabaseConnected } from '@/lib/db/prisma';

export interface PublicReview {
  id: string;
  customerName: string;
  country?: string | null;
  rating: number;
  reviewText: { ar: string; en: string };
  imageSrc?: string | null;
  isDemo?: boolean;
}

const STATIC_SCREENSHOT_REVIEWS = [
  { id: 'rev-01', src: '/images/site-update/reviews/customer-review-01.webp', alt: 'Customer Review 1' },
  { id: 'rev-02', src: '/images/site-update/reviews/customer-review-02.webp', alt: 'Customer Review 2' },
  { id: 'rev-03', src: '/images/site-update/reviews/customer-review-03.webp', alt: 'Customer Review 3' },
  { id: 'rev-04', src: '/images/site-update/reviews/customer-review-04.webp', alt: 'Customer Review 4' },
];

export async function getPublishedReviews(): Promise<{
  dbReviews: PublicReview[];
  screenshotFallbacks: typeof STATIC_SCREENSHOT_REVIEWS;
}> {
  const connected = await isDatabaseConnected();
  if (connected && prisma) {
    try {
      const dbReviews = await prisma.review.findMany({
        where: {
          status: 'published',
          isDemo: false, // Never display demo/fake reviews publicly
        },
        include: { country: true, avatarMedia: true },
        orderBy: { createdAt: 'desc' },
      });

      if (dbReviews.length > 0) {
        return {
          dbReviews: dbReviews.map((r) => ({
            id: r.id,
            customerName: r.customerName,
            country: r.country?.nameAr || null,
            rating: r.rating,
            reviewText: {
              ar: r.reviewAr || '',
              en: r.reviewEn || r.reviewAr || '',
            },
            imageSrc: r.avatarMedia?.storageKey || null,
            isDemo: false,
          })),
          screenshotFallbacks: STATIC_SCREENSHOT_REVIEWS,
        };
      }
    } catch (err) {
      console.error('[ReviewsRepository] Failed to fetch published reviews:', err);
    }
  }

  return {
    dbReviews: [],
    screenshotFallbacks: STATIC_SCREENSHOT_REVIEWS,
  };
}
