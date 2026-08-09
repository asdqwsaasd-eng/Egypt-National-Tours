import * as React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { FEATURED_EGYPT_TOURS, TourProgram } from '@/lib/data/tours';
import { Container, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { TourProgramRequestForm } from '@/components/forms';
import { Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  const tour = FEATURED_EGYPT_TOURS.find((t: TourProgram) => t.slug === slug);
  if (!tour) {
    notFound();
  }

  return (
    <div className="py-8 pb-16">
      <Container size="default">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: isAr ? 'رحلات مصر' : 'Egypt Tours', href: `/${locale}/egypt-tours` },
            { label: tour.title[locale] },
          ]}
        />

        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-image)] border border-border shadow-md my-6 bg-sand">
          <Image
            src={tour.imageSrc}
            alt={tour.imageAlt[locale]}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
              {tour.title[locale]}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              <Badge variant="gold" size="md" className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-red shrink-0" />
                <span>{tour.duration[locale]}</span>
              </Badge>
              <div className="flex items-center gap-1 text-text-secondary">
                <MapPin className="h-4 w-4 text-brand-red shrink-0" />
                <span>{tour.destinations[locale].join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-text-primary border-b border-brand-gold/40 pb-2 w-fit">
                {isAr ? 'نبذة عن الرحلة' : 'Tour Overview'}
              </h2>
              <p className="text-base text-text-secondary leading-relaxed">
                {tour.overview[locale]}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary border-b border-brand-gold/40 pb-2 w-fit">
                {isAr ? 'برنامج الجولة اليومي' : 'Daily Itinerary'}
              </h2>
              <div className="space-y-4">
                {tour.itinerary.map((dayItem) => (
                  <div key={dayItem.day} className="bg-white p-6 rounded-[var(--radius-card)] border border-border space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-full bg-brand-gold-light text-brand-red font-bold flex items-center justify-center text-sm shrink-0">
                        {dayItem.day}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary">
                        {dayItem.title[locale]}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary ps-11 leading-relaxed">
                      {dayItem.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-success/5 border border-success/20 p-6 rounded-[var(--radius-card)] space-y-4">
                <h3 className="text-lg font-bold text-success flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{isAr ? 'الخدمات المشمولة' : "What's Included"}</span>
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {tour.included[locale].map((inc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-success font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-error/5 border border-error/20 p-6 rounded-[var(--radius-card)] space-y-4">
                <h3 className="text-lg font-bold text-error flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>{isAr ? 'غير مشمول' : "What's Excluded"}</span>
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {tour.excluded[locale].map((exc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-error font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Interactive Request Form */}
            <div className="pt-4 border-t border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                {isAr ? 'حجز هذه الجولة السياحية' : 'Book This Tour'}
              </h2>
              <TourProgramRequestForm
                locale={locale}
                tourSlug={tour.slug}
                tourTitle={tour.title[locale]}
                tourType="egypt_tour"
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
              <h3 className="text-lg font-bold text-text-primary">
                {isAr ? 'تأكيد الحجز والتعديل' : 'Tour Customization'}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {isAr
                  ? 'يمكن تعديل الفنادق أو إضافة ليالي إضافية في القاهرة أو الأقصر حسب ميزانيتك ورغبتك.'
                  : 'Flight options, additional nights, and hotel upgrades can be tailored by our team.'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
