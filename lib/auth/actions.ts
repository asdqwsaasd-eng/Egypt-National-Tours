'use server';

import { z } from 'zod';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { verifyPassword, hashPassword } from './password';
import { setAdminSessionCookie, destroyAdminSession, getAdminSession } from './session';

export interface LoginActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صحيح / Invalid email address' }),
  password: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل / Password must be at least 6 characters' }),
});

/**
 * Server action to authenticate admin user and issue signed HTTP-Only session cookie.
 */
export async function loginAdminAction(payload: unknown): Promise<LoginActionResult> {
  try {
    const parseResult = loginSchema.safeParse(payload);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message;
      return {
        success: false,
        error: firstError || 'بيانات الدخول غير صحيحة / Invalid input',
      };
    }

    const { email, password } = parseResult.data;
    const dbConnected = await isDatabaseConnected();

    let authenticatedAdmin: {
      id: string;
      email: string;
      displayName: string;
    } | null = null;

    if (dbConnected && prisma) {
      // Find admin user in PostgreSQL
      const adminUser = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (adminUser && adminUser.isActive) {
        const isValid = verifyPassword(password, adminUser.passwordHash);
        if (isValid) {
          authenticatedAdmin = {
            id: adminUser.id,
            email: adminUser.email,
            displayName: adminUser.displayName,
          };

          // Update lastLoginAt
          await prisma.adminUser.update({
            where: { id: adminUser.id },
            data: { lastLoginAt: new Date() },
          });
        }
      }
    }

    // Default Seed / Disconnected Fallback Account (Disabled in production unless ALLOW_DEFAULT_ADMIN === 'true')
    const allowDefaultAdmin =
      process.env.NODE_ENV !== 'production' || process.env.ALLOW_DEFAULT_ADMIN === 'true';

    if (!authenticatedAdmin && allowDefaultAdmin) {
      const defaultEmail = 'admin@egyptnationaltours.com';
      const defaultPass = 'Admin@ENT2026';

      if (email.toLowerCase() === defaultEmail && password === defaultPass) {
        authenticatedAdmin = {
          id: '00000000-0000-0000-0000-000000000001',
          email: defaultEmail,
          displayName: 'مدير النظام (Default Admin)',
        };
      }
    }

    if (!authenticatedAdmin) {
      return {
        success: false,
        error: 'اسم المستخدم أو كلمة المرور غير صحيحة / Invalid email or password',
      };
    }

    // Issue HTTP-Only session cookie
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 Hours
    await setAdminSessionCookie({
      userId: authenticatedAdmin.id,
      email: authenticatedAdmin.email,
      displayName: authenticatedAdmin.displayName,
      role: 'admin',
      expiresAt,
    });

    return {
      success: true,
      redirectTo: '/admin',
    };
  } catch (err: any) {
    console.error('[LoginAdminAction] Error:', err);
    return {
      success: false,
      error: 'حدث خطأ أثناء تسجيل الدخول / Unexpected login error',
    };
  }
}

/**
 * Server action to log out active admin user and destroy session cookie.
 */
export async function logoutAdminAction(): Promise<void> {
  await destroyAdminSession();
}

/**
 * Server-side helper to get currently authenticated admin session.
 */
export async function getCurrentAdmin() {
  return await getAdminSession();
}
