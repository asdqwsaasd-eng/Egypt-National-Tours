'use server';

import { z } from 'zod';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { getAdminSession } from '@/lib/auth/session';
import { ContentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface ReviewActionResult {
  success: boolean;
  reviewId?: string;
  message?: string;
  error?: string;
}

const reviewFormSchema = z.object({
  customerName: z.string().min(2, { message: 'اسم العميل مطلوب' }),
  countryName: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  reviewAr: z.string().optional(),
  reviewEn: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isDemo: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

/**
 * Server action to create a new Customer Review.
 */
export async function createReviewAction(payload: unknown): Promise<ReviewActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const parseResult = reviewFormSchema.safeParse(payload);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.issues[0]?.message || 'بيانات التقييم غير صحيحة',
      };
    }

    const data = parseResult.data;
    const connected = await isDatabaseConnected();

    if (!connected || !prisma) {
      return {
        success: true,
        reviewId: 'rev-offline-demo',
        message: 'تم إضافة التقييم في وضع المعايرة (Offline Mode)',
      };
    }

    const review = await prisma.review.create({
      data: {
        customerName: data.customerName,
        reviewAr: data.reviewAr || null,
        reviewEn: data.reviewEn || null,
        rating: data.rating,
        isFeatured: data.isFeatured,
        isDemo: data.isDemo,
        status: data.status as ContentStatus,
        publishedAt: data.status === 'published' ? new Date() : null,
      },
    });

    revalidatePath('/admin/reviews');

    return {
      success: true,
      reviewId: review.id,
      message: 'تم إضافة التقييم بنجاح / Review created successfully',
    };
  } catch (err: any) {
    console.error('[ReviewCMSActions] Create error:', err);
    return {
      success: false,
      error: err.message || 'حدث خطأ أثناء حفظ التقييم',
    };
  }
}

/**
 * Server action to update an existing Customer Review.
 */
export async function updateReviewAction(id: string, payload: unknown): Promise<ReviewActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const parseResult = reviewFormSchema.safeParse(payload);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.issues[0]?.message || 'بيانات التقييم غير صحيحة',
      };
    }

    const data = parseResult.data;
    const connected = await isDatabaseConnected();

    if (!connected || !prisma) {
      return {
        success: true,
        reviewId: id,
        message: 'تم تحديث التقييم في وضع المعايرة (Offline Mode)',
      };
    }

    await prisma.review.update({
      where: { id },
      data: {
        customerName: data.customerName,
        reviewAr: data.reviewAr || null,
        reviewEn: data.reviewEn || null,
        rating: data.rating,
        isFeatured: data.isFeatured,
        isDemo: data.isDemo,
        status: data.status as ContentStatus,
        publishedAt: data.status === 'published' ? new Date() : undefined,
      },
    });

    revalidatePath('/admin/reviews');
    revalidatePath(`/admin/reviews/${id}`);

    return {
      success: true,
      reviewId: id,
      message: 'تم تحديث التقييم بنجاح / Review updated successfully',
    };
  } catch (err: any) {
    console.error('[ReviewCMSActions] Update error:', err);
    return {
      success: false,
      error: err.message || 'حدث خطأ أثناء تحديث التقييم',
    };
  }
}

/**
 * Server action to delete a Customer Review.
 */
export async function deleteReviewAction(id: string): Promise<ReviewActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const connected = await isDatabaseConnected();
    if (connected && prisma) {
      await prisma.review.delete({ where: { id } });
    }

    revalidatePath('/admin/reviews');

    return {
      success: true,
      message: 'تم حذف التقييم بنجاح / Review deleted successfully',
    };
  } catch (err: any) {
    console.error('[ReviewCMSActions] Delete error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء حذف التقييم',
    };
  }
}
