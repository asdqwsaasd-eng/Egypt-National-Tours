'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginAdminAction } from '@/lib/auth/actions';
import { TextInput, Button, Alert } from '@/components/ui';
import { Mail, Lock, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await loginAdminAction({ email, password });
    setIsLoading(false);

    if (res.success) {
      router.push(res.redirectTo || '/admin');
    } else {
      setError(res.error || 'فشل تسجيل الدخول / Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-sand/40 flex items-center justify-center p-4 dir-rtl">
      <div className="w-full max-w-md bg-white rounded-[var(--radius-card)] border border-border shadow-xl p-8 space-y-6">
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
            <span>لوحة التحكم وإدارة الموقع</span>
          </div>
          <h1 className="text-2xl font-extrabold text-text-primary pt-2">
            تسجيل دخول مدير النظام
          </h1>
          <p className="text-xs text-text-secondary">
            أدخل بيانات الاعتماد الخاصة بمدير الشركة للوصول إلى لوحة المحتوى
          </p>
        </div>

        {error && (
          <Alert variant="error" dismissible onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            type="email"
            label="البريد الإلكتروني"
            placeholder="admin@egyptnationaltours.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
            required
            autoFocus
          />

          <TextInput
            type="password"
            label="كلمة المرور"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4 text-text-muted" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="shadow-md mt-2"
          >
            تسجيل الدخول
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-[11px] text-text-muted">
            إيجيبت ناشيونال تورز — جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
