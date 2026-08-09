'use server';

import { z } from 'zod';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { getAdminSession } from '@/lib/auth/session';
import { ContentStatus, TourType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface TourActionResult {
  success: boolean;
  tourId?: string;
  message?: string;
  error?: string;
}

const tourFormSchema = z.object({
  tourType: z.enum(['egypt', 'international']),
  titleAr: z.string().min(3, { message: 'العنوان بالعربية مطلوب' }),
  titleEn: z.string().min(3, { message: 'English title is required' }),
  shortDescriptionAr: z.string().optional(),
  shortDescriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  durationTextAr: z.string().optional(),
  durationTextEn: z.string().optional(),
  slug: z.string().min(3, { message: 'الرابط المختصر (Slug) مطلوب' }),
  isFeatured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  destinations: z.array(
    z.object({
      nameAr: z.string(),
      nameEn: z.string(),
    })
  ).optional(),
  days: z.array(
    z.object({
      dayNumber: z.number(),
      titleAr: z.string(),
      titleEn: z.string(),
      descriptionAr: z.string(),
      descriptionEn: z.string(),
    })
  ).optional(),
});

/**
 * Server action to create a new Tour program.
 */
export async function createTourAction(payload: unknown): Promise<TourActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const parseResult = tourFormSchema.safeParse(payload);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.issues[0]?.message || 'بيانات البرنامج غير صحيحة',
      };
    }

    const data = parseResult.data;
    const connected = await isDatabaseConnected();

    if (!connected) {
      return {
        success: true,
        tourId: 'tour-offline-demo',
        message: 'تم حفظ البرنامج بنجاح في وضع المعاينة المحلية (Offline Mode)',
      };
    }

    const newTour = await prisma.$transaction(async (tx) => {
      const tour = await tx.tour.create({
        data: {
          tourType: data.tourType as TourType,
          titleAr: data.titleAr,
          titleEn: data.titleEn,
          shortDescriptionAr: data.shortDescriptionAr || null,
          shortDescriptionEn: data.shortDescriptionEn || null,
          descriptionAr: data.descriptionAr || null,
          descriptionEn: data.descriptionEn || null,
          durationTextAr: data.durationTextAr || null,
          durationTextEn: data.durationTextEn || null,
          slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          isFeatured: data.isFeatured,
          status: data.status as ContentStatus,
          publishedAt: data.status === 'published' ? new Date() : null,
        },
      });

      if (data.destinations && data.destinations.length > 0) {
        await tx.tourDestination.createMany({
          data: data.destinations.map((dest, idx) => ({
            tourId: tour.id,
            destinationNameAr: dest.nameAr,
            destinationNameEn: dest.nameEn,
            displayOrder: idx + 1,
          })),
        });
      }

      if (data.days && data.days.length > 0) {
        await tx.tourDay.createMany({
          data: data.days.map((d) => ({
            tourId: tour.id,
            dayNumber: d.dayNumber,
            titleAr: d.titleAr,
            titleEn: d.titleEn,
            descriptionAr: d.descriptionAr,
            descriptionEn: d.descriptionEn,
            displayOrder: d.dayNumber,
          })),
        });
      }

      return tour;
    });

    revalidatePath('/admin/tours');
    revalidatePath('/ar/egypt-tours');
    revalidatePath('/en/egypt-tours');

    return {
      success: true,
      tourId: newTour.id,
      message: 'تم إنشاء البرنامج السياحي بنجاح / Tour program created successfully',
    };
  } catch (err: any) {
    console.error('[TourCMSActions] Create error:', err);
    return {
      success: false,
      error: err.message || 'حدث خطأ أثناء حفظ البرنامج',
    };
  }
}

/**
 * Server action to update an existing Tour program.
 */
export async function updateTourAction(id: string, payload: unknown): Promise<TourActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const parseResult = tourFormSchema.safeParse(payload);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.issues[0]?.message || 'بيانات البرنامج غير صحيحة',
      };
    }

    const data = parseResult.data;
    const connected = await isDatabaseConnected();

    if (!connected) {
      return {
        success: true,
        tourId: id,
        message: 'تم تحديث البرنامج بنجاح في وضع المعايرة (Offline Mode)',
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.tour.update({
        where: { id },
        data: {
          tourType: data.tourType as TourType,
          titleAr: data.titleAr,
          titleEn: data.titleEn,
          shortDescriptionAr: data.shortDescriptionAr || null,
          shortDescriptionEn: data.shortDescriptionEn || null,
          descriptionAr: data.descriptionAr || null,
          descriptionEn: data.descriptionEn || null,
          durationTextAr: data.durationTextAr || null,
          durationTextEn: data.durationTextEn || null,
          slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          isFeatured: data.isFeatured,
          status: data.status as ContentStatus,
          publishedAt: data.status === 'published' ? new Date() : undefined,
        },
      });

      // Update destinations & days if provided
      if (data.destinations) {
        await tx.tourDestination.deleteMany({ where: { tourId: id } });
        if (data.destinations.length > 0) {
          await tx.tourDestination.createMany({
            data: data.destinations.map((dest, idx) => ({
              tourId: id,
              destinationNameAr: dest.nameAr,
              destinationNameEn: dest.nameEn,
              displayOrder: idx + 1,
            })),
          });
        }
      }

      if (data.days) {
        await tx.tourDay.deleteMany({ where: { tourId: id } });
        if (data.days.length > 0) {
          await tx.tourDay.createMany({
            data: data.days.map((d) => ({
              tourId: id,
              dayNumber: d.dayNumber,
              titleAr: d.titleAr,
              titleEn: d.titleEn,
              descriptionAr: d.descriptionAr,
              descriptionEn: d.descriptionEn,
              displayOrder: d.dayNumber,
            })),
          });
        }
      }
    });

    revalidatePath('/admin/tours');
    revalidatePath(`/admin/tours/${id}`);

    return {
      success: true,
      tourId: id,
      message: 'تم تحديث البرنامج السياحي بنجاح / Tour updated successfully',
    };
  } catch (err: any) {
    console.error('[TourCMSActions] Update error:', err);
    return {
      success: false,
      error: err.message || 'حدث خطأ أثناء تحديث البرنامج',
    };
  }
}

/**
 * Server action to delete or archive a Tour program.
 */
export async function deleteTourAction(id: string): Promise<TourActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const connected = await isDatabaseConnected();
    if (connected) {
      await prisma.tour.delete({ where: { id } });
    }

    revalidatePath('/admin/tours');

    return {
      success: true,
      message: 'تم حذف البرنامج السياحي / Tour deleted successfully',
    };
  } catch (err: any) {
    console.error('[TourCMSActions] Delete error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء حذف البرنامج',
    };
  }
}
