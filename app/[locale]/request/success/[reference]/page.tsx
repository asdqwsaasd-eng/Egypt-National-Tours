import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, LinkButton, Badge } from '@/components/ui';
import { CheckCircle2, MessageCircle, Home } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

interface SuccessPageProps {
  params: Promise<{ locale: string; reference: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { locale: rawLocale, reference } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return (
    <div className="py-16">
      <Container size="narrow">
        <div className="bg-white p-8 sm:p-12 rounded-[var(--radius-card)] border border-border shadow-xl text-center space-y-6">
          <div className="mx-auto h-20 w-20 rounded-full bg-success/10 text-success flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-text-primary">
              {isAr ? 'تم إرسال طلبكم بنجاح' : 'Your request has been submitted successfully.'}
            </h1>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'شكراً لتواصلك مع إيجيبت ناشيونال تورز. سيتواصل معك أحد مستشارينا السفر قريباً.'
                : 'Thank you for choosing Egypt National Tours. One of our travel consultants will contact you shortly.'}
            </p>
          </div>

          <div className="inline-block p-4 rounded-xl bg-cream border border-border space-y-1">
            <p className="text-xs text-text-muted">
              {isAr ? 'رقم المرجع الخاص بطلبكم:' : 'Request Reference Number:'}
            </p>
            <p className="text-xl font-extrabold text-brand-red tracking-wider dir-ltr font-mono">
              {reference}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <LinkButton href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
              <MessageCircle className="h-5 w-5" />
              <span>{isAr ? 'متابعة عبر واتساب' : 'Follow up via WhatsApp'}</span>
            </LinkButton>
            <LinkButton href={`/${locale}`} variant="secondary" size="lg">
              <Home className="h-5 w-5" />
              <span>{isAr ? 'العودة للرئيسية' : 'Return to Home'}</span>
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
