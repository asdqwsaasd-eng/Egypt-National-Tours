import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { FileCheck, Globe, ShieldCheck } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

interface VisaServicePageProps {
  params: Promise<{ locale: string }>;
}

export default async function VisaServicePage({ params }: VisaServicePageProps) {
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
            { label: isAr ? 'خدمات التأشيرات' : 'Visa Services' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'خدمات المساعدة في التأشيرات' : 'Visa Assistance & Advisory Services'}
            subtitle={
              isAr
                ? 'مساعدة واستشارات متخصصة لتجهيز وتنسيق متطلبات تقديم التأشيرات لمختلف الوجهات.'
                : 'Guidance and document coordination for international visa application procedures.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              {isAr ? 'خدمات التنسيق والتأشيرات' : 'Visa Support & Coordination'}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? 'يوفر فريقنا الدعم الفني في مراجعة الأوراق، حجز المواعيد، وإرشاد المسافرين بالاشتراطات المطلوبة لكل دولة لضمان تقديم طلب مكتمل.'
                : 'Our travel advisory team assists with document reviews, appointment scheduling, and destination entry requirements.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InfoCard
                icon={<FileCheck className="h-5 w-5" />}
                title={isAr ? 'مراجعة الأوراق' : 'Document Checklist'}
                description={isAr ? 'مراجعة وتأكيد اكتمال ملف التقديم.' : 'Reviewing file completeness prior to submission.'}
              />
              <InfoCard
                icon={<Globe className="h-5 w-5" />}
                title={isAr ? 'وجهات متعددة' : 'Global Destinations'}
                description={isAr ? 'دعم التأشيرات لمجموعة واسعة من الدول.' : 'Assistance across a broad range of global destinations.'}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'اطلب استشارة تأشيرة' : 'Request Visa Assistance'}
            </h4>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'حدد الدولة المطلوبة وسيتم التواصل معك بالمتطلبات والتفاصيل.'
                : 'Select your visa destination to receive required checklist details.'}
            </p>
            <LinkButton href={`/${locale}/request?service=visas`} variant="primary" size="lg" fullWidth>
              {isAr ? 'تقديم طلب تأشيرة' : 'Submit Visa Request'}
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
