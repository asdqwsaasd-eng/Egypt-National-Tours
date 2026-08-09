import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { TransportationRequestForm } from '@/components/forms';
import { Compass, ShieldCheck } from 'lucide-react';

interface TransportationPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TransportationPage({ params }: TransportationPageProps) {
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
            { label: isAr ? 'خدمات النقل السياحي' : 'Tourist Transportation' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'خدمات النقل السياحي والانتقالات' : 'Tourist Transportation & Transfers'}
            subtitle={
              isAr
                ? 'تنسيق خدمات الاستقبال والتوصيل من وإلى المطار والانتقالات بين المدن السياحية بحافلات وسيارات حديثة.'
                : 'Coordinating airport transfers, intercity transport, and private chauffeured vehicles.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج طلب خدمة النقل' : 'Transportation Request Form'}
            </h3>
            <TransportationRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'أنواع الانتقالات' : 'Transfer Options'}
              </h4>
              <InfoCard
                icon={<Compass className="h-5 w-5" />}
                title={isAr ? 'استقبال بالمطار' : 'Airport Pickup'}
                description={isAr ? 'متابعة مواعيد الرحلات والاستقبال بالمطار.' : 'Airport greeting and flight arrival tracking.'}
              />
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'انتقالات حديثة' : 'Modern Vehicles'}
                description={isAr ? 'سيارات وميني باصات حديثة مكيفة.' : 'Modern air-conditioned cars and minibuses.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
