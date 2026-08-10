import { prisma, isDatabaseConnected } from './prisma';
import { generateRequestReference } from '@/lib/actions/request-actions';
import { RequestType, SupportedLocale } from '@prisma/client';

export interface SaveRequestParams {
  requestType: RequestType;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
  };
  details: Record<string, unknown>;
  locale?: SupportedLocale;
}

export interface SaveRequestResult {
  success: boolean;
  reference: string;
  isDbConnected: boolean;
  requestId?: string;
  customerId?: string;
  error?: string;
}

/**
 * Persist customer request to PostgreSQL database if connected, or return explicit failure if unreachable.
 */
export async function saveRequestToDatabase(
  params: SaveRequestParams
): Promise<SaveRequestResult> {
  // 1. Generate reference ENT-YYYY-XXXXXX
  const reference = await generateRequestReference();
  const locale: SupportedLocale = params.locale === 'en' ? 'en' : 'ar';

  // 2. Check if PostgreSQL database is reachable
  const connected = await isDatabaseConnected();
  if (!connected || !prisma) {
    console.warn(`[RequestRepository] Database disconnected or unreachable. Skipping DB save for ref ${reference}`);
    return {
      success: false,
      reference,
      isDbConnected: false,
      error: 'POSTGRESQL_DISCONNECTED',
    };
  }

  try {
    // 3. Execute database transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find or create Customer
      let customer = await tx.customer.findFirst({
        where: {
          OR: [{ email: params.customer.email }, { phone: params.customer.phone }],
        },
      });

      if (!customer) {
        customer = await tx.customer.create({
          data: {
            fullName: params.customer.fullName,
            email: params.customer.email,
            phone: params.customer.phone,
            whatsapp: params.customer.whatsapp || params.customer.phone,
            preferredLanguage: locale,
          },
        });
      } else {
        // Update contact info if changed
        customer = await tx.customer.update({
          where: { id: customer.id },
          data: {
            fullName: params.customer.fullName,
            email: params.customer.email,
            phone: params.customer.phone,
            whatsapp: params.customer.whatsapp || customer.whatsapp,
          },
        });
      }

      // Find or create Service record
      const serviceKey = String(params.requestType);
      let service = await tx.service.findUnique({
        where: { serviceKey },
      });

      if (!service) {
        service = await tx.service.create({
          data: {
            serviceKey,
            titleAr: serviceKey,
            titleEn: serviceKey,
            slug: serviceKey,
            status: 'published',
          },
        });
      }

      // Create Request
      const newRequest = await tx.request.create({
        data: {
          reference,
          customerId: customer.id,
          serviceId: service.id,
          requestType: params.requestType,
          status: 'new_request',
          preferredLanguage: locale,
          source: 'website',
          detailsJson: params.details as any,
          notificationStatus: 'pending',
        },
      });

      return {
        request: newRequest,
        customer,
      };
    });

    console.log(`[RequestRepository] Successfully persisted request ${result.request.reference} (ID: ${result.request.id})`);

    return {
      success: true,
      reference: result.request.reference,
      isDbConnected: true,
      requestId: result.request.id,
      customerId: result.customer.id,
    };
  } catch (error: any) {
    console.error(`[RequestRepository] Save request transaction failed for ref ${reference}:`, error?.message || error);

    return {
      success: false,
      reference,
      isDbConnected: true,
      error: error?.message || 'DATABASE_SAVE_FAILED',
    };
  }
}

/**
 * Update request notification status after email dispatch.
 */
export async function updateRequestNotificationStatus(
  requestId: string,
  status: 'sent' | 'failed' | 'skipped_no_credentials',
  errorMessage?: string
): Promise<void> {
  try {
    const connected = await isDatabaseConnected();
    if (!connected || !requestId || !prisma) return;

    await prisma.request.update({
      where: { id: requestId },
      data: {
        notificationStatus: status,
        notificationError: errorMessage || null,
      },
    });
  } catch (error: any) {
    console.error('[RequestRepository] Failed to update notification status:', error?.message || error);
  }
}
