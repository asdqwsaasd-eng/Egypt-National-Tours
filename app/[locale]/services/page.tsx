import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { SERVICE_CATEGORIES } from '@/lib/data/services';
import { Container, SectionHeader, ServiceCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Plane } from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isAr ? 'خدمات السفر والسياحة الشاملة' : 'Travel & Tourism Services',
    description: isAr
      ? 'خدمات الطيران، الفنادق، التأشيرات، الموافقات الأمنية، رحلات مصر، السياحة الدولية، وبرامج الحج والعمرة.'
      : 'Flight bookings, hotel reservations, visa services, security clearance, Egypt tours, international travel, and Hajj & Umrah packages.',
    locale,
    path: '/services',
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  const groupTitles: Record<string, { ar: string; en: string }> = {
    travel: { ar: 'السفر والحجوزات', en: 'Travel & Booking' },
    egypt_international: { ar: 'البرامج السياحية', en: 'Egypt & International Travel' },
    visas: { ar: 'التأشيرات وإجراءات الدخول', en: 'Visas & Entry Assistance' },
    religious: { ar: 'السياحة الدينية', en: 'Religious Travel' },
    ground: { ar: 'الخدمات الأرضية والنقل', en: 'Ground Services' },
  };

  const groups = ['travel', 'egypt_international', 'visas', 'religious', 'ground'] as const;

  return (
    <div className="py-8 pb-16">
      <Container size="default">
        <Breadcrumbs
          locale={locale}
          items={[{ label: isAr ? 'خدماتنا' : 'Services' }]}
        />

        <div className="mt-4 mb-12 text-center">
          <SectionHeader
            title={isAr ? 'خدمات السفر والسياحة الشاملة' : 'Comprehensive Travel & Tourism Services'}
            subtitle={
              isAr
                ? 'نقدم لكم مجموعة كاملة من الخدمات المتميزة لتسهيل كافة إجراءات سفركم وإقامتكم.'
                : 'Providing a full suite of services to facilitate your flight, hotel, tour, visa, and entry arrangements.'
            }
            align="center"
          />
        </div>

        <div className="flex flex-col gap-12">
          {groups.map((groupKey) => {
            const groupServices = SERVICE_CATEGORIES.filter((cat) => cat.group === groupKey);
            if (groupServices.length === 0) return null;

            return (
              <div key={groupKey} className="flex flex-col gap-6">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-brand-gold/40 pb-2 w-fit">
                  {groupTitles[groupKey][locale]}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupServices.map((cat) => (
                    <ServiceCard
                      key={cat.id}
                      title={cat.title[locale]}
                      description={cat.description[locale]}
                      icon={<Plane className="h-7 w-7" />}
                      href={`/${locale}${cat.href}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
