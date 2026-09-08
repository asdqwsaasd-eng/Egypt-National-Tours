import { RequestType, RequestStatus } from '@prisma/client';

/**
 * Centralized Arabic presentation mapping for all RequestType enum values.
 * Stored database values remain untouched.
 */
export const REQUEST_TYPE_LABELS_AR: Record<RequestType, string> = {
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
};

/**
 * Centralized Arabic presentation mapping for all RequestStatus enum values.
 */
export const REQUEST_STATUS_LABELS_AR: Record<RequestStatus, string> = {
  new_request: 'طلب جديد',
  contacted: 'تم التواصل',
  in_progress: 'قيد المتابعة',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};

/**
 * Helper to safely format a RequestType to Arabic display label.
 */
export function formatRequestTypeAr(type: string | RequestType | null | undefined): string {
  if (!type) return 'خدمة سياحية';
  if (type in REQUEST_TYPE_LABELS_AR) {
    return REQUEST_TYPE_LABELS_AR[type as RequestType];
  }
  return String(type);
}

/**
 * Helper to safely format a RequestStatus to Arabic display label.
 */
export function formatRequestStatusAr(status: string | RequestStatus | null | undefined): string {
  if (!status) return 'غير محدد';
  if (status in REQUEST_STATUS_LABELS_AR) {
    return REQUEST_STATUS_LABELS_AR[status as RequestStatus];
  }
  return String(status);
}
