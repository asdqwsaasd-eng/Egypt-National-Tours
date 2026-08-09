/**
 * Provider-agnostic email notification adapter interface per Doc 08.
 * Concrete implementations support Resend, SendGrid, SMTP, and Mock/Dev providers.
 */
export interface EmailNotificationService {
  sendRequestNotification(params: RequestNotificationParams): Promise<EmailResult>;
}

export interface RequestNotificationParams {
  reference: string;
  requestType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export type EmailDeliveryStatus = 'sent' | 'failed' | 'skipped_no_credentials';

export interface EmailResult {
  success: boolean;
  status: EmailDeliveryStatus;
  error?: string;
  provider?: string;
}
