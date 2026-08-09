import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { ReligiousRequestForm } from '@/components/forms';
import { Moon, MapPin } from 'lucide-react';

interface UmrahPageProps {
  params: Promise<{ locale: string }>;
}

export default async function UmrahPage({ params }: UmrahPageProps) {
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
            { label: isAr ? 'الحج والعمرة' : 'Hajj & Umrah', href: `/${locale}/hajj-umrah` },
            { label: isAr ? 'برامج العمرة' : 'Umrah Program' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'برامج العمرة طوال العام' : 'Year-Round Umrah Programs'}
            subtitle={
              isAr
                ? 'رحلات عمرة منظمة بانتظام مع أفضل خيارات الإقامة والانتقالات في مكة المكرمة والمدينة المنورة.'
                : 'Regularly scheduled Umrah trips offering comfortable hotel stays and seamless transfers.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
              <h3 className="text-xl font-bold text-text-primary">
                {isAr ? 'رحلات ميسرة طوال الموسم' : 'Comfortable Pilgrimage Experience'}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {isAr
                  ? 'نوفر برامج عمرة اقتصادية ومميزة تشمل تذاكر الطيران، التأشيرة الإلكترونية، الانتقالات بالسيارات الحديثة، والإقامة القريبة من المسجد الحرام والمسجد النبوي.'
                  : 'We offer value and premium Umrah packages including flights, e-visa coordination, modern transfers, and hotel stays near the Holy Harams.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <InfoCard
                  icon={<Moon className="h-5 w-5" />}
                  title={isAr ? 'مواعيد مستمرة' : 'Year-Round Flights'}
                  description={isAr ? 'رحلات منتظمة طوال مواسم العمرة.' : 'Regular departures scheduled throughout the season.'}
                />
                <InfoCard
                  icon={<MapPin className="h-5 w-5" />}
                  title={isAr ? 'فنادق الحرمين' : 'Haramain Accommodations'}
                  description={isAr ? 'مستويات إقامة متميزة بمكة والمدينة.' : 'Quality accommodations close to Makkah and Madinah Harams.'}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                {isAr ? 'نموذج طلب رحلة عمرة' : 'Umrah Booking Form'}
              </h3>
              <ReligiousRequestForm locale={locale} programType="umrah" />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'استفسارات العمرة' : 'Umrah Assistance'}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {isAr
                ? 'اختر الشهر المفضل وسيتواصل معك موظف الحج والعمرة بجميع الخيارات المتاحة.'
                : 'Select your preferred departure month to view current Umrah flight and hotel tiers.'}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
