'use server';

import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { getAdminSession } from '@/lib/auth/session';
import { RequestStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface AdminActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server action to update customer request status and log event history.
 */
export async function updateAdminRequestStatusAction(
  requestId: string,
  newStatus: RequestStatus
): Promise<AdminActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    const connected = await isDatabaseConnected();
    if (!connected) {
      return {
        success: true,
        message: 'تم تحديث حالة الطلب في وضع المعايرة (Offline Mode)',
      };
    }

    const existingRequest = await prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!existingRequest) {
      return { success: false, error: 'الطلب غير موجود / Request not found' };
    }

    const oldStatus = existingRequest.status;

    // Update Request status & timestamp
    await prisma.request.update({
      where: { id: requestId },
      data: {
        status: newStatus,
        contactedAt: newStatus === 'contacted' ? new Date() : existingRequest.contactedAt,
        completedAt: newStatus === 'completed' ? new Date() : existingRequest.completedAt,
      },
    });

    // Create RequestEvent log
    await prisma.requestEvent.create({
      data: {
        requestId,
        adminUserId: session.userId !== '00000000-0000-0000-0000-000000000001' ? session.userId : null,
        eventType: 'status_changed',
        oldValue: oldStatus,
        newValue: newStatus,
      },
    });

    revalidatePath('/admin');
    revalidatePath('/admin/requests');
    revalidatePath(`/admin/requests/${requestId}`);

    return {
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح / Status updated successfully',
    };
  } catch (err: any) {
    console.error('[AdminActions] Status update error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء تحديث حالة الطلب / Failed to update status',
    };
  }
}

/**
 * Server action to add a private admin note to a request.
 */
export async function addAdminRequestNoteAction(
  requestId: string,
  noteText: string
): Promise<AdminActionResult> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'غير مصرح / Unauthorized' };
    }

    if (!noteText || noteText.trim().length === 0) {
      return { success: false, error: 'محتوى الملاحظة مطلوب / Note content is required' };
    }

    const connected = await isDatabaseConnected();
    if (!connected) {
      return {
        success: true,
        message: 'تم إضافة الملاحظة في وضع المعايرة (Offline Mode)',
      };
    }

    await prisma.requestNote.create({
      data: {
        requestId,
        adminUserId: session.userId !== '00000000-0000-0000-0000-000000000001' ? session.userId : session.userId,
        note: noteText.trim(),
      },
    });

    revalidatePath(`/admin/requests/${requestId}`);

    return {
      success: true,
      message: 'تمت إضافة الملاحظة بنجاح / Note added successfully',
    };
  } catch (err: any) {
    console.error('[AdminActions] Add note error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء إضافة الملاحظة / Failed to add note',
    };
  }
}
