'use server';

import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { timingSafeEqual } from 'crypto';

export interface SetupAvailabilityResult {
  available: boolean;
  reason?: 'setup_disabled' | 'already_initialized' | 'db_disconnected';
  message?: string;
}

export interface SetupExecutionResult {
  success: boolean;
  message?: string;
  error?: string;
}

const TARGET_ADMIN_EMAIL = 'asdqwsaasd@gmail.com';
const TARGET_ADMIN_DISPLAY_NAME = 'Hossam';

function safeCompareTokens(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const bufA = Buffer.from(provided.trim());
  const bufB = Buffer.from(expected.trim());
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Server action to check if admin setup is enabled and available.
 */
export async function checkSetupAvailabilityAction(): Promise<SetupAvailabilityResult> {
  const setupTokenEnv = process.env.ADMIN_SETUP_TOKEN;

  if (!setupTokenEnv || setupTokenEnv.trim().length === 0) {
    return {
      available: false,
      reason: 'setup_disabled',
      message: 'خاصية التهيئة الأولية متوقفة (ADMIN_SETUP_TOKEN غير معرف في متغيرات بيئة Vercel)',
    };
  }

  try {
    const connected = await isDatabaseConnected();
    if (!connected || !prisma) {
      return {
        available: false,
        reason: 'db_disconnected',
        message: 'تعذر الاتصال بقاعدة البيانات في الوقت الحالي',
      };
    }

    // Check if any AdminUser already exists in PostgreSQL
    const existingAdminCount = await prisma.adminUser.count({
      where: { isActive: true },
    });

    if (existingAdminCount > 0) {
      return {
        available: false,
        reason: 'already_initialized',
        message: 'تم تهيئة حساب مدير النظام مسبقاً في قاعدة البيانات. الرجاء حذف متغير ADMIN_SETUP_TOKEN.',
      };
    }

    return { available: true };
  } catch (err: any) {
    console.error('[AdminSetupAction] Availability check error:', err?.message || err);
    return {
      available: false,
      reason: 'db_disconnected',
      message: 'حدث خطأ أثناء فحص حالة التهيئة الأولية',
    };
  }
}

/**
 * Server action to execute one-time production AdminUser initialization.
 */
export async function executeAdminSetupAction(payload: {
  setupToken: string;
  password: string;
  confirmPassword: string;
}): Promise<SetupExecutionResult> {
  try {
    const expectedToken = process.env.ADMIN_SETUP_TOKEN;

    if (!expectedToken || expectedToken.trim().length === 0) {
      return {
        success: false,
        error: 'خاصية التهيئة الأولية متوقفة (ADMIN_SETUP_TOKEN غير مفعّل)',
      };
    }

    const { setupToken, password, confirmPassword } = payload;

    if (!setupToken || !safeCompareTokens(setupToken, expectedToken)) {
      return {
        success: false,
        error: 'رمز التهيئة (ADMIN_SETUP_TOKEN) غير صحيح',
      };
    }

    if (!password || password.length < 8) {
      return {
        success: false,
        error: 'كلمة المرور يجب أن لا تقل عن 8 أحرف',
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'كلمة المرور وتأكيد كلمة المرور غير متطابقين',
      };
    }

    const connected = await isDatabaseConnected();
    if (!connected || !prisma) {
      return {
        success: false,
        error: 'تعذر الاتصال بقاعدة البيانات (PostgreSQL Connection Error)',
      };
    }

    // Double-check if AdminUser already exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { email: TARGET_ADMIN_EMAIL.toLowerCase() },
    });

    if (existingUser && existingUser.isActive) {
      return {
        success: false,
        error: 'حساب مدير النظام موجود بالفعل ومفعل في قاعدة البيانات (Admin Already Initialized)',
      };
    }

    // Hash password using official SHA-512 implementation
    const passwordHash = hashPassword(password);

    if (existingUser) {
      await prisma.adminUser.update({
        where: { id: existingUser.id },
        data: {
          displayName: TARGET_ADMIN_DISPLAY_NAME,
          passwordHash,
          role: 'admin',
          isActive: true,
        },
      });
    } else {
      await prisma.adminUser.create({
        data: {
          email: TARGET_ADMIN_EMAIL.toLowerCase(),
          displayName: TARGET_ADMIN_DISPLAY_NAME,
          passwordHash,
          role: 'admin',
          isActive: true,
        },
      });
    }

    return {
      success: true,
      message: `تم إنشاء حساب مدير النظام (${TARGET_ADMIN_EMAIL}) بنجاح! يمكنك الآن تسجيل الدخول.`,
    };
  } catch (err: any) {
    console.error('[AdminSetupAction] Execution failure:', err?.message || err);
    return {
      success: false,
      error: 'حدث خطأ أثناء إنشاء حساب المدير',
    };
  }
}
