import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'ent_admin_session';

export interface AdminUserPayload {
  userId: string;
  email: string;
  displayName: string;
  role: 'admin';
  expiresAt: number;
}

function getSecretKey(): string {
  return process.env.AUTH_SECRET || 'dev-secret-change-in-production-ent-2026';
}

function signPayload(payloadString: string): string {
  const hmac = createHmac('sha256', getSecretKey());
  hmac.update(payloadString);
  return hmac.digest('hex');
}

/**
 * Encodes and signs session payload: base64(payload).signature
 */
export function createSessionToken(payload: AdminUserPayload): string {
  const jsonString = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonString).toString('base64url');
  const signature = signPayload(base64Payload);
  return `${base64Payload}.${signature}`;
}

/**
 * Decodes and verifies session token signature.
 */
export function verifySessionToken(token: string): AdminUserPayload | null {
  try {
    if (!token || !token.includes('.')) return null;

    const [base64Payload, signature] = token.split('.');
    if (!base64Payload || !signature) return null;

    const expectedSignature = signPayload(base64Payload);
    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

    const jsonString = Buffer.from(base64Payload, 'base64url').toString('utf-8');
    const payload = JSON.parse(jsonString) as AdminUserPayload;

    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Set HTTP-Only admin session cookie in Next.js response context.
 */
export async function setAdminSessionCookie(payload: AdminUserPayload): Promise<void> {
  const token = createSessionToken(payload);
  const cookieStore = await cookies();
  
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60, // 24 Hours
  });
}

/**
 * Retrieve and verify currently active admin session from cookies.
 */
export async function getAdminSession(): Promise<AdminUserPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  return verifySessionToken(sessionCookie.value);
}

/**
 * Delete admin session cookie on logout.
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
