import { cookies } from 'next/headers';

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

/**
 * Web Crypto HMAC-SHA256 signature generator (Edge & Node.js compatible)
 */
async function signBase64(base64Payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(getSecretKey());
  const payloadData = encoder.encode(base64Payload);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, payloadData);
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Encodes and signs session payload: base64(payload).signature
 */
export async function createSessionToken(payload: AdminUserPayload): Promise<string> {
  const jsonString = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonString).toString('base64url');
  const signature = await signBase64(base64Payload);
  return `${base64Payload}.${signature}`;
}

/**
 * Decodes and verifies session token signature.
 */
export async function verifySessionToken(token: string): Promise<AdminUserPayload | null> {
  try {
    if (!token || !token.includes('.')) return null;

    const [base64Payload, signature] = token.split('.');
    if (!base64Payload || !signature) return null;

    const expectedSignature = await signBase64(base64Payload);
    if (signature !== expectedSignature) return null;

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
 * Synchronous lightweight token check for Edge middleware (parses payload & checks expiration).
 */
export function parseSessionTokenSync(token: string): AdminUserPayload | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [base64Payload] = token.split('.');
    if (!base64Payload) return null;

    const jsonString = Buffer.from(base64Payload, 'base64url').toString('utf-8');
    const payload = JSON.parse(jsonString) as AdminUserPayload;

    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Set HTTP-Only admin session cookie in Next.js response context.
 */
export async function setAdminSessionCookie(payload: AdminUserPayload): Promise<void> {
  const token = await createSessionToken(payload);
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

  return await verifySessionToken(sessionCookie.value);
}

/**
 * Delete admin session cookie on logout.
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
