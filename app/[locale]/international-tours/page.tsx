import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { INTERNATIONAL_TOURS } from '@/lib/data/tours';
import { Container, SectionHeader, TourCard, LinkButton } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';

interface InternationalToursPageProps {
  params: Promise<{ locale: string }>;
}

export default async function InternationalToursPage({ params }: InternationalToursPageProps) {
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
          items={[{ label: isAr ? 'السياحة الدولية' : 'International Tours' }]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'برامج السياحة الدولية' : 'International Tour Packages'}
            subtitle={
              isAr
                ? 'رحلات وبرامج سياحية دولية إلى أكثر الوجهات العالمية جاذبية وتميزاً.'
                : 'Custom and organized international holiday packages to top worldwide destinations.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INTERNATIONAL_TOURS.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title[locale]}
              slug={tour.slug}
              locale={locale}
              imageSrc={tour.imageSrc}
              imageAlt={tour.imageAlt[locale]}
              duration={tour.duration[locale]}
              destinations={tour.destinations[locale]}
              summary={tour.summary[locale]}
            />
          ))}
        </div>

        <div className="mt-16 bg-sand/60 rounded-[var(--radius-card)] p-8 border border-border text-center flex flex-col items-center gap-4">
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
            {isAr ? 'وجهة أخرى غير مدرجة؟' : 'Looking for Other Global Destinations?'}
          </h3>
          <p className="text-sm text-text-secondary max-w-xl">
            {isAr
              ? 'يمكن لشركة إيجيبت ناشيونال تورز ترتيب وحجز رحلتك الخاصة لأي وجهة في العالم.'
              : 'Our travel department arranges customized international trips worldwide.'}
          </p>
          <LinkButton href={`/${locale}/services/custom-tours`} variant="primary" size="md">
            {isAr ? 'طلب رحلة دولية خاصة' : 'Request Custom Outbound Tour'}
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
