import * as React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { SERVICE_CATEGORIES } from '@/lib/data/services';
import { Container, SectionHeader } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { GeneralRequestForm } from '@/components/forms';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Plane, ArrowRight, ArrowLeft } from 'lucide-react';

interface GeneralRequestPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string; tour?: string }>;
}

export async function generateMetadata({ params }: GeneralRequestPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isAr ? 'مركز طلب الخدمات والحجوزات' : 'Universal Request Center',
    description: isAr
      ? 'نموذج طلب خدمات السفر والسياحة الشامل - إيجيبت ناشيونال تورز.'
      : 'Comprehensive trip and travel request entry portal - Egypt National Tours.',
    locale,
    path: '/request',
  });
}

export default async function GeneralRequestPage({ params, searchParams }: GeneralRequestPageProps) {
  const { locale: rawLocale } = await params;
  const { service: queryService, tour: queryTour } = await searchParams;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  const currentService = queryService || 'flights';

  return (
    <div className="py-8 pb-16">
      <Container size="default">
        <Breadcrumbs
          locale={locale}
          items={[{ label: isAr ? 'اطلب رحلتك الآن' : 'Request Your Trip' }]}
        />

        <div className="mt-4 mb-8">
          <SectionHeader
            title={isAr ? 'مركز طلب الخدمات والسياحة' : 'Universal Trip & Service Request Center'}
            subtitle={
              isAr
                ? 'اختر نوع الخدمة المطلوبة واملأ النموذج للتواصل المباشر مع مستشاري السفر.'
                : 'Select your required service and fill out the interactive request form below.'
            }
            align="start"
          />
        </div>

        {/* Service Type Switcher Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = currentService === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/${locale}/request?service=${cat.slug}${queryTour ? `&tour=${queryTour}` : ''}`}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'border-2 border-brand-red bg-cream shadow-sm font-bold text-brand-red'
                    : 'border-border bg-white text-text-primary hover:border-brand-red/40 hover:bg-sand/30'
                }`}
              >
                <Plane className={`h-5 w-5 ${isSelected ? 'text-brand-red' : 'text-text-muted'}`} />
                <span className="text-xs sm:text-sm leading-tight">{cat.title[locale]}</span>
              </Link>
            );
          })}
        </div>

        {/* Selected Service Active Form */}
        <div className="max-w-4xl mx-auto">
          <GeneralRequestForm
            locale={locale}
            activeService={currentService}
            queryTour={queryTour}
          />
        </div>
      </Container>
    </div>
  );
}
