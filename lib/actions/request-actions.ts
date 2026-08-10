'use server';

import { REQUEST_REFERENCE_PREFIX } from '@/lib/utils/constants';
import {
  flightRequestSchema,
  hotelRequestSchema,
  customTourRequestSchema,
  visaRequestSchema,
  securityApprovalRequestSchema,
  transportationRequestSchema,
  religiousRequestSchema,
  tourProgramRequestSchema,
  generalRequestSchema,
} from '@/lib/validation/forms';
import { saveRequestToDatabase, updateRequestNotificationStatus } from '@/lib/db/request-repository';
import { emailNotificationService } from '@/lib/email/service';
import { RequestType } from '@prisma/client';
import { ZodError } from 'zod';

export interface ActionResponse {
  success: boolean;
  reference?: string;
  errors?: Record<string, string[]>;
  message?: string;
  notificationSent?: boolean;
}

/**
 * Generate server-side request reference number: ENT-YYYY-XXXXXX
 */
export async function generateRequestReference(): Promise<string> {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `${REQUEST_REFERENCE_PREFIX}-${year}-${randomDigits}`;
}

/**
 * Format Zod validation errors into flat Record<string, string[]>
 */
function formatZodErrors(error: ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (!formatted[key]) {
      formatted[key] = [];
    }
    formatted[key].push(issue.message);
  }
  return formatted;
}

/**
 * Map client payload requestType to Prisma RequestType enum
 */
function mapToPrismaRequestType(rawType: string): RequestType {
  switch (rawType) {
    case 'flight':
      return 'flight';
    case 'hotel':
      return 'hotel';
    case 'custom_tour':
    case 'egypt_tour':
      return 'egypt_tour';
    case 'international_tour':
      return 'international_tour';
    case 'visa':
      return 'visa';
    case 'security_approval':
      return 'security_approval';
    case 'hajj':
      return 'hajj';
    case 'umrah':
      return 'umrah';
    case 'transportation':
      return 'transportation';
    default:
      return 'general';
  }
}

/**
 * Server action to process and validate any service request submission (Phase 6 Pipeline).
 */
export async function submitRequestAction(payload: any): Promise<ActionResponse> {
  try {
    if (!payload || typeof payload !== 'object' || !payload.requestType) {
      return {
        success: false,
        message: 'نوع الطلب غير محدد / Request type is missing',
      };
    }

    // 1. Execute Zod validation on server side
    let validatedData: any;

    switch (payload.requestType) {
      case 'flight':
        validatedData = flightRequestSchema.parse(payload);
        break;
      case 'hotel':
        validatedData = hotelRequestSchema.parse(payload);
        break;
      case 'custom_tour':
        validatedData = customTourRequestSchema.parse(payload);
        break;
      case 'visa':
        validatedData = visaRequestSchema.parse(payload);
        break;
      case 'security_approval':
        validatedData = securityApprovalRequestSchema.parse(payload);
        break;
      case 'transportation':
        validatedData = transportationRequestSchema.parse(payload);
        break;
      case 'hajj':
      case 'umrah':
        validatedData = religiousRequestSchema.parse(payload);
        break;
      case 'egypt_tour':
      case 'international_tour':
        validatedData = tourProgramRequestSchema.parse(payload);
        break;
      default:
        validatedData = generalRequestSchema.parse(payload);
        break;
    }

    // 2. Map request type & attempt PostgreSQL database persistence
    const prismaRequestType = mapToPrismaRequestType(validatedData.requestType);
    const dbResult = await saveRequestToDatabase({
      requestType: prismaRequestType,
      customer: validatedData.customer,
      details: validatedData,
      locale: validatedData.locale,
    });

    const reference = dbResult.reference;

    // 3. Attempt email notification dispatch asynchronously
    let notificationSent = false;
    try {
      const emailResult = await emailNotificationService.sendRequestNotification({
        reference,
        requestType: validatedData.requestType,
        customerName: validatedData.customer.fullName,
        customerEmail: validatedData.customer.email,
        customerPhone: validatedData.customer.phone,
        details: validatedData,
        timestamp: new Date().toISOString(),
      });

      notificationSent = emailResult.success;

      // 4. Update notification status in DB if record exists
      if (dbResult.requestId) {
        await updateRequestNotificationStatus(
          dbResult.requestId,
          emailResult.status,
          emailResult.error
        );
      }
    } catch (emailErr: any) {
      console.error('[SubmitRequestAction] Email dispatch caught error:', emailErr?.message || emailErr);
      if (dbResult.requestId) {
        await updateRequestNotificationStatus(
          dbResult.requestId,
          'failed',
          emailErr.message || 'Email dispatch failed'
        );
      }
    }

    const dbSuccess = dbResult.success && Boolean(dbResult.requestId);

    // CRITICAL: A request MUST NOT return success if BOTH database persistence AND email notification failed/skipped.
    if (!dbSuccess && !notificationSent) {
      console.error(
        `[SubmitRequestAction] CRITICAL PERSISTENCE FAILURE for ref ${reference}. DB Saved: ${dbSuccess} (Error: ${dbResult.error}), Email Sent: ${notificationSent}`
      );

      return {
        success: false,
        reference,
        notificationSent: false,
        message:
          validatedData.locale === 'en'
            ? 'Unable to submit your request at this time. Please contact us directly via WhatsApp or phone.'
            : 'عذراً، تعذر حفظ طلبكم في الوقت الحالي. يرجى التواصل معنا مباشرة عبر الواتساب أو الهاتف.',
      };
    }

    console.log(
      `[SubmitRequestAction] Request ${reference} processed successfully (DB Persisted: ${dbSuccess}, Email Sent: ${notificationSent})`
    );

    return {
      success: true,
      reference,
      notificationSent,
      message:
        validatedData.locale === 'en'
          ? 'Request received successfully'
          : 'تم استلام طلبكم بنجاح',
    };
  } catch (err: any) {
    if (err instanceof ZodError) {
      return {
        success: false,
        errors: formatZodErrors(err),
        message: 'يرجى تصحيح الأخطاء الموضحة في النموذج / Please correct the highlighted errors in the form',
      };
    }

    console.error('[SubmitRequestAction] Unexpected error:', err?.message || err);

    return {
      success: false,
      message: 'حدث خطأ عند معالجة الطلب / Unexpected error occurred',
    };
  }
}
