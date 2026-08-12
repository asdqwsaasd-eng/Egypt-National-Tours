import * as React from 'react';
import Image from 'next/image';
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

        {/* Available Umrah Program Departures */}
        <div className="mb-12 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              {isAr ? 'برامج ورحلات العمرة' : 'Umrah Programs & Departures'}
            </h3>
            <p className="text-text-secondary">
              {isAr
                ? 'اختر من أحدث برامج العمرة المتاحة، ويمكنك إرسال طلبك أو استفسارك من النموذج أدناه.'
                : 'Explore our latest available Umrah programs, then send your request or inquiry using the form below.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[var(--radius-card)] overflow-hidden border border-border shadow-sm flex items-center justify-center p-2">
              <Image
                src="/images/site-update/umrah/umrah-program-8-days.webp"
                alt={isAr ? 'برنامج العمرة 8 أيام' : 'Umrah Program 8 Days'}
                width={800}
                height={1000}
                className="w-full h-auto object-contain block rounded-lg"
                priority
              />
            </div>
            <div className="bg-white rounded-[var(--radius-card)] overflow-hidden border border-border shadow-sm flex items-center justify-center p-2">
              <Image
                src="/images/site-update/umrah/umrah-program-15-days.webp"
                alt={isAr ? 'برنامج العمرة 15 يوم' : 'Umrah Program 15 Days'}
                width={800}
                height={1000}
                className="w-full h-auto object-contain block rounded-lg"
                priority
              />
            </div>
          </div>
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
