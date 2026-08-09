import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, InfoCard, Badge } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { Building2, Star, Utensils, ShieldCheck } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

interface HotelServicePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HotelServicePage({ params }: HotelServicePageProps) {
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
            { label: isAr ? 'خدماتنا' : 'Services', href: `/${locale}/services` },
            { label: isAr ? 'حجز الفنادق' : 'Hotel Reservations' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'خدمات حجز الفنادق والمنتجعات' : 'Hotel & Resort Booking Services'}
            subtitle={
              isAr
                ? 'مساعدة مخصصة في اختيار وحجز الإقامة بالفنادق بفئات 3 و4 و5 نجوم وبخيارات الوجبات المعتمدة.'
                : 'Personalized assistance for reserving accommodations in 3, 4, and 5-star hotels with approved meal plans.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              {isAr ? 'خيارات الإقامة المتاحة' : 'Available Accommodation Standards'}
            </h3>

            <div className="flex flex-wrap items-center gap-3 pb-2">
              <span className="text-sm font-semibold text-text-primary">
                {isAr ? 'فئات الفنادق:' : 'Star Ratings:'}
              </span>
              <Badge variant="gold" size="md">3 Stars / 3 نجوم</Badge>
              <Badge variant="gold" size="md">4 Stars / 4 نجوم</Badge>
              <Badge variant="gold" size="md">5 Stars / 5 نجوم</Badge>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Utensils className="h-5 w-5 text-brand-red" />
                <span>{isAr ? 'أنظمة الوجبات المتاحة:' : 'Meal Plan Options:'}</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
                <li className="p-2.5 rounded-md bg-cream border border-border">
                  ✓ {isAr ? 'بدون وجبات (Room Only)' : 'Room Only'}
                </li>
                <li className="p-2.5 rounded-md bg-cream border border-border">
                  ✓ {isAr ? 'إفطار (Breakfast)' : 'Breakfast'}
                </li>
                <li className="p-2.5 rounded-md bg-cream border border-border">
                  ✓ {isAr ? 'إفطار وعشاء (Half Board)' : 'Half Board'}
                </li>
                <li className="p-2.5 rounded-md bg-cream border border-border">
                  ✓ {isAr ? 'سوفت أول إنكلوسف (Soft All Inclusive)' : 'Soft All Inclusive'}
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'اطلب حجز فندقك' : 'Request Hotel Booking'}
            </h4>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'حدّد وجهتك والتاريخ وفئة الفندق المطلوبة وسيتواصل معك المستشار فوراً.'
                : 'Specify your destination, travel dates, and hotel rating preference.'}
            </p>
            <LinkButton href={`/${locale}/request?service=hotels`} variant="primary" size="lg" fullWidth>
              {isAr ? 'طلب حجز فندق' : 'Submit Hotel Request'}
            </LinkButton>
            <LinkButton href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="md" fullWidth>
              {isAr ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
