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
import { ZodError } from 'zod';

export interface ActionResponse {
  success: boolean;
  reference?: string;
  errors?: Record<string, string[]>;
  message?: string;
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
 * Server action to process and validate any service request submission.
 */
export async function submitRequestAction(payload: any): Promise<ActionResponse> {
  try {
    if (!payload || typeof payload !== 'object' || !payload.requestType) {
      return {
        success: false,
        message: 'نوع الطلب غير محدد / Request type is missing',
      };
    }

    // Select validation schema based on request type
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

    // Generate unique server-side reference number
    const reference = await generateRequestReference();

    // Return successful response with reference number
    return {
      success: true,
      reference,
      message: 'تم استلام طلبكم بنجاح / Request received successfully',
    };
  } catch (err: any) {
    if (err instanceof ZodError) {
      return {
        success: false,
        errors: formatZodErrors(err),
        message: 'يرجى تصحيح الأخطاء الموضحة في النموذج / Please correct the highlighted errors in the form',
      };
    }

    return {
      success: false,
      message: err.message || 'حدث خطأ غير متوقع عند معالجة الطلب / Unexpected error occurred',
    };
  }
}
