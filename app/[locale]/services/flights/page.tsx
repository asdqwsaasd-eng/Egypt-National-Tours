import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { FlightRequestForm } from '@/components/forms';
import { Plane, Compass, ShieldCheck } from 'lucide-react';

interface FlightsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FlightsPage({ params }: FlightsPageProps) {
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
            { label: isAr ? 'حجز وتذاكر الطيران' : 'Flight Tickets' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'خدمات حجز وتذاكر الطيران' : 'Flight Ticketing Assistance'}
            subtitle={
              isAr
                ? 'استشارات وحجوزات طيران مخصصة لكافة الوجهات المحلية والدولية مع كبرى شركات الطيران العالمية.'
                : 'Tailored flight reservations and ticket issuance assistance for domestic and international trips.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج طلب حجز تذكرة طيران' : 'Flight Booking Request Form'}
            </h3>
            <FlightRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'مميزات الخدمة' : 'Service Features'}
              </h4>
              <InfoCard
                icon={<Plane className="h-5 w-5" />}
                title={isAr ? 'خيارات متعددة' : 'Multiple Trip Options'}
                description={isAr ? 'دعم الذهاب، الذهاب والعودة، والوجهات المتعددة.' : 'One-way, round-trip, and multi-city support.'}
              />
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'تأكيد ودعم مباشر' : 'Direct Consultant Assistance'}
                description={isAr ? 'يتواصل معك موظف الحجز فور إرسال الطلب.' : 'Our agent contacts you to confirm options.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
