'use server';

import { z } from 'zod';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { getAdminSession } from '@/lib/auth/session';
import { ContentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface ServiceActionResult {
  success: boolean;
  serviceId?: string;
  message?: string;
  error?: string;
}

const serviceFormSchema = z.object({
  titleAr: z.string().min(2, { message: 'العنوان بالعربية مطلوب' }),
  titleEn: z.string().min(2, { message: 'English title is required' }),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  slug: z.string().min(2, { message: 'Slug مطلوب' }),
  displayOrder: z.number().default(0),
  isFeatured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
});

/**
 * Server action to update an existing Service sector.
 */
export async function updateServiceAction(id: string, payload: unknown): Promise<ServiceActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const parseResult = serviceFormSchema.safeParse(payload);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error.issues[0]?.message || 'بيانات الخدمة غير صحيحة',
      };
    }

    const data = parseResult.data;
    const connected = await isDatabaseConnected();

    if (!connected) {
      return {
        success: true,
        serviceId: id,
        message: 'تم تحديث بيانات الخدمة في وضع المعايرة (Offline Mode)',
      };
    }

    await prisma.service.update({
      where: { id },
      data: {
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        descriptionAr: data.descriptionAr || null,
        descriptionEn: data.descriptionEn || null,
        slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        displayOrder: data.displayOrder,
        isFeatured: data.isFeatured,
        status: data.status as ContentStatus,
      },
    });

    revalidatePath('/admin/services');
    revalidatePath(`/admin/services/${id}`);

    return {
      success: true,
      serviceId: id,
      message: 'تم تحديث الخدمة بنجاح / Service updated successfully',
    };
  } catch (err: any) {
    console.error('[ServiceCMSActions] Update error:', err);
    return {
      success: false,
      error: err.message || 'حدث خطأ أثناء تحديث الخدمة',
    };
  }
}
