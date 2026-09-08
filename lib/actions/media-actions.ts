'use server';

import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { getAdminSession } from '@/lib/auth/session';
import { del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export interface MediaDeleteResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function deleteMediaAction(mediaId: string): Promise<MediaDeleteResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const connected = await isDatabaseConnected();
    if (!connected || !prisma) {
      return { success: false, error: 'تعذر الاتصال بقاعدة البيانات' };
    }

    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      return { success: false, error: 'الصورة غير موجودة أو تم حذفها بالفعل' };
    }

    // Safety Check: Verify if media is referenced across any CMS models
    const [tourRef, galleryRef, serviceRef, hajjRef, umrahRef, reviewRef] = await Promise.all([
      prisma.tour.findFirst({ where: { mainMediaId: mediaId } }),
      prisma.tourGalleryItem.findFirst({ where: { mediaId } }),
      prisma.service.findFirst({ where: { iconOrMediaId: mediaId } }),
      prisma.hajjProgram.findFirst({ where: { programImageMediaId: mediaId } }),
      prisma.umrahProgram.findFirst({ where: { programImageMediaId: mediaId } }),
      prisma.review.findFirst({ where: { avatarMediaId: mediaId } }),
    ]);

    if (tourRef || galleryRef || serviceRef || hajjRef || umrahRef || reviewRef) {
      return {
        success: false,
        error: 'لا يمكن حذف هذه الصورة لأنها مستخدمة حالياً في محتوى الموقع.',
      };
    }

    // Delete Blob object if it's a Vercel Blob URL
    if (media.storageKey.startsWith('http')) {
      try {
        await del(media.storageKey);
      } catch (blobErr) {
        console.error('[MediaDelete] Blob delete error:', blobErr);
      }
    }

    // Delete Media record from DB
    await prisma.media.delete({
      where: { id: mediaId },
    });

    revalidatePath('/admin/media');

    return {
      success: true,
      message: 'تم حذف الصورة بنجاح من مكتبة الصور.',
    };
  } catch (err: any) {
    console.error('[MediaDeleteAction] Error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء حذف الصورة.',
    };
  }
}
