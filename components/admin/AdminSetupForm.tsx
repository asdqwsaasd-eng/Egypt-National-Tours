'use client';

import * as React from 'react';
import Link from 'next/link';
import { executeAdminSetupAction } from '@/lib/actions/admin-setup-actions';
import { TextInput, Button, Alert } from '@/components/ui';
import { Mail, User, Lock, Key, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AdminSetupForm: React.FC = () => {
  const [setupToken, setSetupToken] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await executeAdminSetupAction({
      setupToken,
      password,
      confirmPassword,
    });

    setIsLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setSuccessMessage(res.message || 'تم تهيئة حساب مدير النظام بنجاح!');
    } else {
      setError(res.error || 'فشلت عملية التهيئة');
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-text-primary">
            تمت عملية التهيئة بنجاح!
          </h2>
          <p className="text-sm text-text-secondary">
            {successMessage}
          </p>
        </div>

        <Alert variant="warning" className="text-right text-xs leading-relaxed">
          <strong>خطوة أمان هامة جداً:</strong> الرجاء الانتقال الآن إلى لوحة Vercel وتنزيل أو حذف متغير البيئة المؤقت <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">ADMIN_SETUP_TOKEN</code> لإبقاء الموقع آمناً تماماً.
        </Alert>

        <div className="pt-4">
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-lg bg-brand-gold text-brand-red font-extrabold hover:bg-brand-gold/90 transition-colors shadow-md text-sm"
          >
            <span>الانتقال لتسجيل الدخول / Go to Admin Login</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextInput
        type="email"
        label="البريد الإلكتروني المعتمد لمدير النظام"
        value="asdqwsaasd@gmail.com"
        leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
        readOnly
        className="bg-sand/30 font-medium dir-ltr text-right"
      />

      <TextInput
        type="text"
        label="الاسم المعروض لمدير النظام"
        value="Hossam"
        leftIcon={<User className="h-4 w-4 text-text-muted" />}
        readOnly
        className="bg-sand/30 font-medium"
      />

      <TextInput
        type="password"
        label="رمز التهيئة الأولية (ADMIN_SETUP_TOKEN)"
        placeholder="أدخل الرمز المؤقت المضاف في Vercel"
        value={setupToken}
        onChange={(e) => setSetupToken(e.target.value)}
        leftIcon={<Key className="h-4 w-4 text-brand-red" />}
        required
        autoFocus
        hint="رمز الأمان المؤقت الذي قمت بإضافته في Vercel Production Environment Variables"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <TextInput
          type="password"
          label="كلمة المرور الجديدة"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4 text-text-muted" />}
          required
          hint="8 أحرف على الأقل"
        />

        <TextInput
          type="password"
          label="تأكيد كلمة المرور"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4 text-text-muted" />}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        className="shadow-md mt-4 gap-2"
      >
        <ShieldCheck className="h-5 w-5" />
        <span>إنشاء حساب مدير النظام</span>
      </Button>
    </form>
  );
};
