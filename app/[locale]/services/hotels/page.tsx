import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { HotelRequestForm } from '@/components/forms';
import { Award, ShieldCheck } from 'lucide-react';

interface HotelsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HotelsPage({ params }: HotelsPageProps) {
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
            { label: isAr ? 'حجوزات الفنادق والمنتجعات' : 'Hotel Bookings' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'حجوزات الفنادق والمنتجعات' : 'Hotel & Resort Booking Assistance'}
            subtitle={
              isAr
                ? 'خيارات إقامة متميزة في أفضل فنادق مصر والعالم بأعلى معايير الجودة وخيارات الإفطار والوجبات الشاملة.'
                : 'Selected hotel options across Egypt and top worldwide destinations with preferred meal plans.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج طلب حجز فندقي' : 'Hotel Booking Request Form'}
            </h3>
            <HotelRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'ضوابط الفنادق والإقامة' : 'Booking Terms & Categories'}
              </h4>
              <InfoCard
                icon={<Award className="h-5 w-5" />}
                title={isAr ? 'فئات 3 و4 و5 نجوم' : '3, 4 & 5 Star Options'}
                description={isAr ? 'اختيارات فندقية معتمدة تناسب جميع الفئات.' : 'Strictly verified 3, 4, and 5 star category choices.'}
              />
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'أنظمة وجبات متنوعة' : 'Flexible Meal Plans'}
                description={isAr ? 'إفطار، نصف إقامة، وسوفت أول إنكلوسف.' : 'Room only, breakfast, half board, and soft all inclusive.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
