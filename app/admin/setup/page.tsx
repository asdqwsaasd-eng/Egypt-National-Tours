import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { checkSetupAvailabilityAction } from '@/lib/actions/admin-setup-actions';
import { AdminSetupForm } from '@/components/admin/AdminSetupForm';
import { ShieldAlert, ShieldCheck, CheckCircle, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'تهيئة مدير النظام | ENT Admin Setup',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminSetupPage() {
  const availability = await checkSetupAvailabilityAction();

  return (
    <div className="min-h-screen bg-sand/40 flex items-center justify-center p-4 dir-rtl">
      <div className="w-full max-w-lg bg-white rounded-[var(--radius-card)] border border-border shadow-xl p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="relative h-16 w-48 mx-auto">
            <Image
              src="/assets/brand/logo-original.png"
              alt="Egypt National Tours Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-light/60 text-brand-red text-xs font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>تهيئة حساب مدير النظام للأول مرة</span>
          </div>
        </div>

        {!availability.available ? (
          <div className="space-y-6 text-center">
            {availability.reason === 'already_initialized' ? (
              <>
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-text-primary">
                    حساب مدير النظام موجود بالفعل
                  </h2>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    تم تهيئة حساب مدير النظام (asdqwsaasd@gmail.com) وتفعيله بنجاح في قاعدة البيانات.
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 text-right">
                  <strong>ملاحظة أمان:</strong> يفضل الآن حذف متغير البيئة <code className="font-mono font-bold">ADMIN_SETUP_TOKEN</code> من لوحة Vercel.
                </div>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-center w-full h-11 px-6 rounded-lg bg-brand-gold text-brand-red font-bold hover:bg-brand-gold/90 transition-colors shadow-md text-sm"
                >
                  الانتقال إلى صفحة تسجيل الدخول / Go to Admin Login
                </Link>
              </>
            ) : (
              <>
                <div className="mx-auto h-16 w-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Lock className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-text-primary">
                    خدمة التهيئة الأولية غير مفعّلة
                  </h2>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {availability.message || 'يلزم إضافة متغير البيئة ADMIN_SETUP_TOKEN في Vercel لتفعيل هذه الصفحة.'}
                  </p>
                </div>
                <div className="p-3 bg-sand/60 rounded-lg border border-border text-xs text-text-secondary text-right space-y-1">
                  <p className="font-bold text-text-primary">خطوات التفعيل:</p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px]">
                    <li>أضف متغير <code className="font-mono font-bold text-brand-red">ADMIN_SETUP_TOKEN</code> بقيمة من اختيارك في Vercel.</li>
                    <li>قم بعمل Redeploy للتطبيق في Vercel.</li>
                    <li>أعد فتح هذه الصفحة واستخدم الرمز المختار لتهيئة الحساب.</li>
                  </ol>
                </div>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg border border-border text-text-primary text-xs font-bold hover:bg-sand/30 transition-colors"
                >
                  العودة لتسجيل الدخول / Back to Login
                </Link>
              </>
            )}
          </div>
        ) : (
          <AdminSetupForm />
        )}

        <div className="text-center pt-4 border-t border-border">
          <p className="text-[11px] text-text-muted">
            إيجيبت ناشيونال تورز — جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
