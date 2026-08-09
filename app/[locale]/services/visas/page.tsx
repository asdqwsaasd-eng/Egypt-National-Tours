import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { VisaRequestForm } from '@/components/forms';
import { ShieldCheck, Clock } from 'lucide-react';

interface VisasPageProps {
  params: Promise<{ locale: string }>;
}

export default async function VisasPage({ params }: VisasPageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return (
    <div className="py-8 pb-16">
      <Container size="default">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: isAr ? 'الخدمات' : 'Services', href: `/${locale}/services` },
            { label: isAr ? 'استشارات وخدمات التأشيرات' : 'Visa Assistance' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'استشارات وخدمات التأشيرات' : 'Visa Support & Advisory'}
            subtitle={
              isAr
                ? 'مساعدة وإرشادات متكاملة لإعداد مستندات التأشيرات لمختلف الوجهات السياحية العالمية.'
                : 'Guidance and document checklist support for tourist visa applications.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج طلب استشارة تأشيرة' : 'Visa Inquiry Form'}
            </h3>
            <VisaRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'ملاحظات هامة' : 'Important Note'}
              </h4>
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'استشارات معتمدة' : 'Official Assistance'}
                description={isAr ? 'نقدم الدعم في تجهيز الأوراق والمواعيد.' : 'We assist with document checklists and appointment guidance.'}
              />
              <InfoCard
                icon={<Clock className="h-5 w-5" />}
                title={isAr ? 'متابعة دورية' : 'Prompt Review'}
                description={isAr ? 'يتواصل معك موظف التأشيرات فور إرسال الطلب.' : 'Our visa coordinator will review your request promptly.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
