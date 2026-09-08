import { prisma, isDatabaseConnected } from '@/lib/db/prisma';

export interface AdminMediaListItem {
  id: string;
  fileName: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;
  width?: number | null;
  height?: number | null;
  altTextAr?: string | null;
  altTextEn?: string | null;
  createdAt: Date;
  isBlob: boolean;
  isDeletable: boolean;
}

export const STATIC_REUSABLE_MEDIA = [
  {
    id: 'static-cairo-classic',
    fileName: 'cairo-classic.jpg',
    storageKey: '/assets/references/cairo-classic.jpg',
    mimeType: 'image/jpeg',
    fileSize: 245000,
    width: 1600,
    height: 900,
    altTextAr: 'القاهرة الكلاسيكية الأهرامات والمتحف',
    altTextEn: 'Classic Cairo Pyramids & Museum',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-cairo-alexandria',
    fileName: 'cairo-alexandria.jpg',
    storageKey: '/assets/references/cairo-alexandria.jpg',
    mimeType: 'image/jpeg',
    fileSize: 280000,
    width: 1600,
    height: 900,
    altTextAr: 'القاهرة والإسكندرية عروس البحر المتوسط',
    altTextEn: 'Cairo & Alexandria Tour',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-nile-cruise',
    fileName: 'nile-cruise.jpg',
    storageKey: '/assets/references/nile-cruise.jpg',
    mimeType: 'image/jpeg',
    fileSize: 310000,
    width: 1600,
    height: 900,
    altTextAr: 'نايل كروز الأقصر وأسوان',
    altTextEn: 'Nile Cruise Luxor & Aswan',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-hurghada-sharm',
    fileName: 'egypt-tour-hurghada-sharm.webp',
    storageKey: '/images/site-update/tours/egypt-tour-hurghada-sharm.webp',
    mimeType: 'image/webp',
    fileSize: 195000,
    width: 1600,
    height: 900,
    altTextAr: 'الغردقة وشرم الشيخ البحر الأحمر',
    altTextEn: 'Hurghada & Sharm El Sheikh Red Sea',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-dubai-highlights',
    fileName: 'dubai-highlights.jpg',
    storageKey: '/assets/references/dubai-highlights.jpg',
    mimeType: 'image/jpeg',
    fileSize: 260000,
    width: 1600,
    height: 900,
    altTextAr: 'سحر دبي والإمارات',
    altTextEn: 'Dubai Highlights & Emirates',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-istanbul-week',
    fileName: 'international-tour-istanbul-week.webp',
    storageKey: '/images/site-update/tours/international-tour-istanbul-week.webp',
    mimeType: 'image/webp',
    fileSize: 210000,
    width: 1600,
    height: 900,
    altTextAr: 'أسبوع في إسطنبول تركيا',
    altTextEn: 'Istanbul Week Turkey Tour',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-company-banner',
    fileName: 'egypt-national-tours-company-banner.webp',
    storageKey: '/images/site-update/banners/egypt-national-tours-company-banner.webp',
    mimeType: 'image/webp',
    fileSize: 340000,
    width: 1920,
    height: 800,
    altTextAr: 'بنر شركة إيجيبت ناشيونال تورز',
    altTextEn: 'Egypt National Tours Company Banner',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
  {
    id: 'static-umrah-banner',
    fileName: 'umrah-program-banner.webp',
    storageKey: '/images/site-update/umrah/umrah-program-banner.webp',
    mimeType: 'image/webp',
    fileSize: 320000,
    width: 1920,
    height: 800,
    altTextAr: 'بنر برامج العمرة المتميزة',
    altTextEn: 'Umrah Program Banner',
    createdAt: new Date(),
    isBlob: false,
    isDeletable: false,
  },
];

export async function getAdminMediaList(searchQuery?: string): Promise<{
  items: AdminMediaListItem[];
  isDbConnected: boolean;
}> {
  const connected = await isDatabaseConnected();
  let dbItems: AdminMediaListItem[] = [];

  if (connected && prisma) {
    try {
      const records = await prisma.media.findMany({
        orderBy: { createdAt: 'desc' },
      });

      dbItems = records.map((m) => ({
        id: m.id,
        fileName: m.fileName,
        storageKey: m.storageKey,
        mimeType: m.mimeType,
        fileSize: m.fileSize,
        width: m.width,
        height: m.height,
        altTextAr: m.altTextAr,
        altTextEn: m.altTextEn,
        createdAt: m.createdAt,
        isBlob: m.storageKey.startsWith('http'),
        isDeletable: true,
      }));
    } catch (err) {
      console.error('[MediaRepository] Query error:', err);
    }
  }

  // Combine DB records with static fallback catalog
  const existingKeys = new Set(dbItems.map((i) => i.storageKey));
  const missingStatic = STATIC_REUSABLE_MEDIA.filter((s) => !existingKeys.has(s.storageKey));

  let combined = [...dbItems, ...missingStatic];

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    combined = combined.filter(
      (m) =>
        m.fileName.toLowerCase().includes(q) ||
        m.storageKey.toLowerCase().includes(q) ||
        (m.altTextAr && m.altTextAr.toLowerCase().includes(q)) ||
        (m.altTextEn && m.altTextEn.toLowerCase().includes(q))
    );
  }

  return {
    items: combined,
    isDbConnected: connected,
  };
}

/**
 * Idempotently register a media record in Neon PostgreSQL.
 * If storageKey already exists, returns the existing record without creating duplicates.
 */
export async function registerMediaRecord(data: {
  fileName: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  altTextAr?: string;
  altTextEn?: string;
}) {
  const connected = await isDatabaseConnected();
  if (connected && prisma) {
    const existing = await prisma.media.findFirst({
      where: { storageKey: data.storageKey },
    });

    if (existing) {
      return existing;
    }

    return await prisma.media.create({
      data: {
        fileName: data.fileName,
        storageKey: data.storageKey,
        mimeType: data.mimeType,
        fileSize: data.fileSize,
        width: data.width || null,
        height: data.height || null,
        altTextAr: data.altTextAr || null,
        altTextEn: data.altTextEn || null,
      },
    });
  }
  return null;
}
