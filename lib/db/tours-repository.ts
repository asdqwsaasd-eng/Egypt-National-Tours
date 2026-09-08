import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { FEATURED_EGYPT_TOURS, INTERNATIONAL_TOURS, TourProgram } from '@/lib/data/tours';

export async function getPublishedTours(type?: 'egypt' | 'international'): Promise<TourProgram[]> {
  const connected = await isDatabaseConnected();
  if (connected && prisma) {
    try {
      const dbTours = await prisma.tour.findMany({
        where: {
          status: 'published',
          ...(type ? { tourType: type } : {}),
        },
        include: {
          destinations: { orderBy: { displayOrder: 'asc' } },
          days: { orderBy: { dayNumber: 'asc' } },
          mainMedia: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (dbTours.length > 0) {
        return dbTours.map((t) => mapDbTourToProgram(t));
      }
    } catch (err) {
      console.error('[ToursRepository] Published query failed:', err);
    }
  }

  // Safe code fallback
  if (type === 'egypt') return FEATURED_EGYPT_TOURS;
  if (type === 'international') return INTERNATIONAL_TOURS;
  return [...FEATURED_EGYPT_TOURS, ...INTERNATIONAL_TOURS];
}

export async function getPublishedTourBySlug(slug: string): Promise<TourProgram | null> {
  const connected = await isDatabaseConnected();
  if (connected && prisma) {
    try {
      const dbTour = await prisma.tour.findUnique({
        where: { slug: slug.toLowerCase() },
        include: {
          destinations: { orderBy: { displayOrder: 'asc' } },
          days: { orderBy: { dayNumber: 'asc' } },
          mainMedia: true,
        },
      });

      if (dbTour && dbTour.status === 'published') {
        return mapDbTourToProgram(dbTour);
      }
    } catch (err) {
      console.error('[ToursRepository] Slug query failed:', err);
    }
  }

  const allStatic = [...FEATURED_EGYPT_TOURS, ...INTERNATIONAL_TOURS];
  return allStatic.find((t) => t.slug === slug || t.id === slug) || null;
}

export async function getFeaturedTours(): Promise<TourProgram[]> {
  const connected = await isDatabaseConnected();
  if (connected && prisma) {
    try {
      const dbTours = await prisma.tour.findMany({
        where: { status: 'published', isFeatured: true },
        include: {
          destinations: { orderBy: { displayOrder: 'asc' } },
          days: { orderBy: { dayNumber: 'asc' } },
          mainMedia: true,
        },
        take: 6,
      });

      if (dbTours.length > 0) {
        return dbTours.map((t) => mapDbTourToProgram(t));
      }
    } catch (err) {
      console.error('[ToursRepository] Featured query failed:', err);
    }
  }

  return [...FEATURED_EGYPT_TOURS.slice(0, 3), ...INTERNATIONAL_TOURS.slice(0, 3)];
}

function mapDbTourToProgram(t: any): TourProgram {
  const defaultImage = t.tourType === 'egypt' 
    ? '/assets/references/cairo-classic.jpg' 
    : '/assets/references/dubai-highlights.jpg';

  return {
    id: t.id,
    slug: t.slug,
    type: t.tourType as 'egypt' | 'international',
    title: { ar: t.titleAr, en: t.titleEn },
    summary: {
      ar: t.shortDescriptionAr || t.descriptionAr || '',
      en: t.shortDescriptionEn || t.descriptionEn || '',
    },
    overview: {
      ar: t.descriptionAr || t.shortDescriptionAr || '',
      en: t.descriptionEn || t.shortDescriptionEn || '',
    },
    duration: {
      ar: t.durationTextAr || '',
      en: t.durationTextEn || '',
    },
    destinations: {
      ar: (t.destinations || []).map((d: any) => d.destinationNameAr),
      en: (t.destinations || []).map((d: any) => d.destinationNameEn),
    },
    imageSrc: t.mainMedia?.storageKey || defaultImage,
    imageAlt: { ar: t.titleAr, en: t.titleEn },
    itinerary: (t.days || []).map((d: any) => ({
      day: d.dayNumber,
      title: { ar: d.titleAr, en: d.titleEn },
      description: { ar: d.descriptionAr, en: d.descriptionEn },
    })),
    included: {
      ar: ['الإقامة بالفندق بالإفطار', 'الانتقالات بسيارات حديثة', 'مرشد سياحي متخصص'],
      en: ['Hotel accommodation with breakfast', 'Private transfers', 'Licensed guide'],
    },
    excluded: {
      ar: ['الطيران الدولي', 'المصروفات الشخصية والإكراميات'],
      en: ['International flights', 'Personal expenses'],
    },
  };
}
