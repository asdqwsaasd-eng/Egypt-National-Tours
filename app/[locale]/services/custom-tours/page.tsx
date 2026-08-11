import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { CustomTourRequestForm } from '@/components/forms';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface OtherServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: OtherServicesPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isAr ? 'الخدمات الأخرى والترتيبات الخاصة' : 'Other Travel & Support Services',
    description: isAr
      ? 'نموذج تقديم الطلبات المخصصة والخدمات السياحية والترتيبات الخاصة من إيجيبت ناشيونال تورز.'
      : 'Submit custom requests for special travel arrangements and additional support services with Egypt National Tours.',
    locale,
    path: '/services/custom-tours',
  });
}

export default async function OtherServicesPage({ params }: OtherServicesPageProps) {
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
            { label: isAr ? 'الخدمات الأخرى' : 'Other Services' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'الخدمات الأخرى والترتيبات الخاصة' : 'Other Services & Special Requests'}
            subtitle={
              isAr
                ? 'إذا كانت لديك متطلبات خاصة أو خدمات غير مدرجة، اكتب تفاصيل طلبك وسيقوم مستشارنا بالتواصل معك.'
                : 'If you have special requirements or unlisted travel services, submit your request details below.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج طلب الخدمات الأخرى' : 'Other Services Request Form'}
            </h3>
            <CustomTourRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'خدمتكم غايتنا' : 'Direct Assistance'}
              </h4>
              <InfoCard
                icon={<Sparkles className="h-5 w-5" />}
                title={isAr ? 'طلبات مخصصة بالكامل' : 'Tailored Requests'}
                description={isAr ? 'نساعدك في ترتيب كافة تفاصيل سفرك حسب رغبتك.' : 'We facilitate your unique travel arrangements.'}
              />
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'متابعة مباشرة' : 'Direct Consultation'}
                description={isAr ? 'يتواصل معك مستشار سفر مختص لدراسة طلبك.' : 'A dedicated advisor reviews and answers your request.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
