/**
 * Provider-agnostic email notification adapter interface.
 * Concrete implementations will be created when an email provider is chosen.
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

export interface EmailResult {
  success: boolean;
  error?: string;
}
