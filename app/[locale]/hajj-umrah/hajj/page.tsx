import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { ReligiousRequestForm } from '@/components/forms';
import { MapPin, ShieldCheck } from 'lucide-react';

interface HajjPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HajjPage({ params }: HajjPageProps) {
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
            { label: isAr ? 'برامج الحج' : 'Hajj Program' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'برنامج الحج المبارك' : 'Hajj Pilgrimage Program'}
            subtitle={
              isAr
                ? 'تفاصيل وإجراءات التقديم لبرامج الحج المعتمدة من شركة إيجيبت ناشيونال تورز.'
                : 'Program details and registration assistance for official Hajj packages.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
              <h3 className="text-xl font-bold text-text-primary">
                {isAr ? 'تفاصيل ومعالم رحلة الحج' : 'Hajj Program Features'}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {isAr
                  ? 'تحرص إيجيبت ناشيونال تورز على تنظيم رحلات حج متكاملة تشمل الإقامة في فنادق قريبة من الحرمين الشريفين، حافلات حديثة لنقل الحجاج في المشاعر المقدسة، وإشراف ديني وإداري طوال الرحلة.'
                  : 'Egypt National Tours organizes Hajj pilgrimage programs providing close accommodations to the Holy Harams, modern transportation across holy sites, and dedicated supervision.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <InfoCard
                  icon={<MapPin className="h-5 w-5" />}
                  title={isAr ? 'إقامة قريبة من الحرم' : 'Close Accommodation'}
                  description={isAr ? 'فنادق ممتازة بمكة المكرمة والمدينة المنورة.' : 'Selected hotels in Makkah and Madinah.'}
                />
                <InfoCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title={isAr ? 'إشراف كامل' : 'Supervision & Care'}
                  description={isAr ? 'إشراف إداري وطبي وديني طوال المناسك.' : 'Full administrative and spiritual guidance.'}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                {isAr ? 'نموذج التقديم لبرنامج الحج' : 'Hajj Registration Form'}
              </h3>
              <ReligiousRequestForm locale={locale} programType="hajj" />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'تعليمات التسجيل' : 'Registration Steps'}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {isAr
                ? 'قدم طلبك وسيتم التواصل معك مباشرة فور فتح باب التسجيل واعتماد ضوابط الحج الرسمية.'
                : 'Submit your contact information to receive Hajj registration guidelines and package updates.'}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
