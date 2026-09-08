import { RequestType, RequestStatus } from '@prisma/client';

/**
 * Centralized Arabic presentation mapping for all RequestType enum values.
 * Stored database values remain untouched.
 */
export const REQUEST_TYPE_LABELS_AR: Record<RequestType | string, string> = {
  flight: 'حجز طيران',
  hotel: 'حجز فندق',
  egypt_tour: 'برنامج سياحي داخل مصر',
  international_tour: 'برنامج سياحي خارج مصر',
  visa: 'تأشيرات سفر',
  security_approval: 'موافقة أمنية',
  hajj: 'برنامج حج',
  umrah: 'برنامج عمرة',
  transportation: 'نقل ومواصلات سياحية',
  general: 'طلب عام / استفسار',
  custom_tour: 'تصميم رحلة خاصة',
};

/**
 * Centralized Arabic presentation mapping for all RequestStatus enum values.
 */
export const REQUEST_STATUS_LABELS_AR: Record<RequestStatus | string, string> = {
  new_request: 'طلب جديد',
  contacted: 'تم التواصل',
  in_progress: 'قيد المتابعة',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};

/**
 * Helper to safely format a RequestType or Service key to Arabic display label.
 */
export function formatRequestTypeAr(type: string | RequestType | null | undefined): string {
  if (!type) return 'خدمة سياحية';
  const str = String(type).trim().toLowerCase();

  if (str in REQUEST_TYPE_LABELS_AR) {
    return REQUEST_TYPE_LABELS_AR[str];
  }

  if (str.includes('hotel') || str.includes('فندق')) return 'حجز فندق';
  if (str.includes('flight') || str.includes('طيران')) return 'حجز طيران';
  if (str.includes('security') || str.includes('أمني')) return 'موافقة أمنية';
  if (str.includes('egypt_tour') || (str.includes('مصر') && !str.includes('خارج'))) return 'برنامج سياحي داخل مصر';
  if (str.includes('international') || str.includes('خارج')) return 'برنامج سياحي خارج مصر';
  if (str.includes('visa') || str.includes('تأشير')) return 'تأشيرات سفر';
  if (str.includes('hajj') || str.includes('حج')) return 'برنامج حج';
  if (str.includes('umrah') || str.includes('عمرة')) return 'برنامج عمرة';
  if (str.includes('transport') || str.includes('نقل')) return 'نقل ومواصلات سياحية';
  if (str.includes('custom') || str.includes('خاص')) return 'تصميم رحلة خاصة';

  return String(type);
}

/**
 * Helper to safely format a RequestStatus to Arabic display label.
 */
export function formatRequestStatusAr(status: string | RequestStatus | null | undefined): string {
  if (!status) return 'غير محدد';
  const str = String(status).trim().toLowerCase();

  if (str in REQUEST_STATUS_LABELS_AR) {
    return REQUEST_STATUS_LABELS_AR[str];
  }

  return String(status);
}
