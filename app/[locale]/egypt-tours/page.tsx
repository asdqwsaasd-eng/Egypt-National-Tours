import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { FEATURED_EGYPT_TOURS } from '@/lib/data/tours';
import { Container, SectionHeader, TourCard, LinkButton } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { generatePageMetadata } from '@/lib/seo/metadata';

interface EgyptToursPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: EgyptToursPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isAr ? 'برامج رحلات وسياحة مصر' : 'Egypt Tour Packages',
    description: isAr
      ? 'استكشف أفضل برامج السياحة الداخلية في مصر، أهرامات الجيزة، القاهرة الكلاسيكية، ورحلات النايل كروز بالأقصر وأسوان.'
      : 'Explore top Egypt holiday packages, Cairo discoveries, Nile cruises between Luxor & Aswan, and Giza Pyramids tours.',
    locale,
    path: '/egypt-tours',
  });
}

export default async function EgyptToursPage({ params }: EgyptToursPageProps) {
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
          items={[{ label: isAr ? 'رحلات مصر' : 'Egypt Tours' }]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'برامج سياحة ورحلات مصر' : 'Egypt Tour Packages'}
            subtitle={
              isAr
                ? 'رحلات سياحية كلاسيكية ونايل كروز فاخرة لاستكشاف أعرق حضارات التاريخ في القاهرة والجيزة والأقصر وأسوان.'
                : 'Classic sight-seeing tours and luxury Nile Cruises discovering ancient monuments in Cairo, Giza, Luxor & Aswan.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_EGYPT_TOURS.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title[locale]}
              slug={tour.slug}
              type={tour.type}
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
            {isAr ? 'ترغب في برنامج خاص ومخصص داخل مصر؟' : 'Looking for a Tailor-made Egypt Itinerary?'}
          </h3>
          <p className="text-sm text-text-secondary max-w-xl">
            {isAr
              ? 'يمكن لخبراء إيجيبت ناشيونال تورز تصميم رحلتك المخصصة وتعديل الفنادق والانتقالات حسب رغبتك.'
              : 'Our travel department designs custom Egypt itineraries tailored to your schedule and hotel preferences.'}
          </p>
          <LinkButton href={`/${locale}/services/custom-tours`} variant="primary" size="md">
            {isAr ? 'طلب برنامج خاص' : 'Request Custom Egypt Tour'}
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
