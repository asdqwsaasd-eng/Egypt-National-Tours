import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { CustomTourRequestForm } from '@/components/forms';
import { Compass, ShieldCheck } from 'lucide-react';

interface CustomToursPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CustomToursPage({ params }: CustomToursPageProps) {
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
            { label: isAr ? 'البرامج السياحية الخاصة (Custom Tours)' : 'Custom Tours' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'تصميم جولة سياحية خاصة' : 'Tailor-Made Custom Tour Design'}
            subtitle={
              isAr
                ? 'رحلات مصممة خصيصاً حسب ميزانيتك واهتماماتك في مصر أو أي وجهة دولية أخرى.'
                : 'Customized travel itineraries crafted specifically to your preferences and travel style.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج تصميم رحلة خاصة' : 'Custom Tour Design Request Form'}
            </h3>
            <CustomTourRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'خطوات تصميم رحلتك' : 'How It Works'}
              </h4>
              <InfoCard
                icon={<Compass className="h-5 w-5" />}
                title={isAr ? 'تحديد الرغبات' : 'Share Preferences'}
                description={isAr ? 'اختر المدن والفنادق وأسلوب الرحلة.' : 'Tell us your cities, hotel preferences, and style.'}
              />
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'عرض أسعار مخصص' : 'Custom Itinerary'}
                description={isAr ? 'يقوم المستشار بإرسال جدول المقترحات والأسعار.' : 'Our advisor sends a detailed proposed itinerary.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
