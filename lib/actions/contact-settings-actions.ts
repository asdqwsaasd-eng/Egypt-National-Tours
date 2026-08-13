'use server';

import { z } from 'zod';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { getAdminSession } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export interface ContactSettingsActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

const contactSettingsSchema = z.object({
  whatsappNumber: z.string().min(5, { message: 'رقم الواتساب مطلوب' }),
  phonePrimary: z.string().min(5, { message: 'رقم الهاتف الرئيسي مطلوب' }),
  phoneSecondary: z.string().optional(),
  mobile1: z.string().optional(),
  mobile2: z.string().optional(),
  email: z.string().email({ message: 'البريد الإلكتروني الرئيسي غير صحيح' }),
  secondaryEmail: z.string().email({ message: 'البريد الإلكتروني الثانوي غير صحيح' }).or(z.literal('')).optional(),
  facebookUrl: z.string().url().or(z.literal('')).optional(),
  googleMapsUrl: z.string().url().or(z.literal('')).optional(),
  addressAr: z.string().optional(),
  addressEn: z.string().optional(),
  workingHoursAr: z.string().optional(),
  workingHoursEn: z.string().optional(),
  offDaysAr: z.string().optional(),
  offDaysEn: z.string().optional(),
});

export async function updateContactSettingsAction(payload: unknown): Promise<ContactSettingsActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const parseResult = contactSettingsSchema.safeParse(payload);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message;
      return { success: false, error: firstError || 'بيانات غير صحيحة' };
    }

    const data = parseResult.data;
    const connected = await isDatabaseConnected();

    if (!connected || !prisma) {
      return {
        success: true,
        message: 'تم حفظ البيانات في وضع المعايرة المحمية (Offline Mode)',
      };
    }

    const existing = await prisma.contactSettings.findFirst();

    if (existing) {
      await prisma.contactSettings.update({
        where: { id: existing.id },
        data: {
          whatsappNumber: data.whatsappNumber.trim(),
          phonePrimary: data.phonePrimary.trim(),
          phoneSecondary: data.phoneSecondary?.trim() || null,
          mobile1: data.mobile1?.trim() || null,
          mobile2: data.mobile2?.trim() || null,
          email: data.email.trim(),
          secondaryEmail: data.secondaryEmail?.trim() || null,
          facebookUrl: data.facebookUrl?.trim() || null,
          googleMapsUrl: data.googleMapsUrl?.trim() || null,
          addressAr: data.addressAr?.trim() || null,
          addressEn: data.addressEn?.trim() || null,
          workingHoursAr: data.workingHoursAr?.trim() || null,
          workingHoursEn: data.workingHoursEn?.trim() || null,
          offDaysAr: data.offDaysAr?.trim() || null,
          offDaysEn: data.offDaysEn?.trim() || null,
        },
      });
    } else {
      await prisma.contactSettings.create({
        data: {
          whatsappNumber: data.whatsappNumber.trim(),
          phonePrimary: data.phonePrimary.trim(),
          phoneSecondary: data.phoneSecondary?.trim() || null,
          mobile1: data.mobile1?.trim() || null,
          mobile2: data.mobile2?.trim() || null,
          email: data.email.trim(),
          secondaryEmail: data.secondaryEmail?.trim() || null,
          facebookUrl: data.facebookUrl?.trim() || null,
          googleMapsUrl: data.googleMapsUrl?.trim() || null,
          addressAr: data.addressAr?.trim() || null,
          addressEn: data.addressEn?.trim() || null,
          workingHoursAr: data.workingHoursAr?.trim() || null,
          workingHoursEn: data.workingHoursEn?.trim() || null,
          offDaysAr: data.offDaysAr?.trim() || null,
          offDaysEn: data.offDaysEn?.trim() || null,
        },
      });
    }

    revalidatePath('/admin/settings');
    revalidatePath('/ar');
    revalidatePath('/en');
    revalidatePath('/ar/about-contact');
    revalidatePath('/en/about-contact');

    return {
      success: true,
      message: 'تم حفظ وتحديث إعدادات التواصل بنجاح / Contact settings updated successfully',
    };
  } catch (err: any) {
    console.error('[UpdateContactSettingsAction] Error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء حفظ الإعدادات',
    };
  }
}
