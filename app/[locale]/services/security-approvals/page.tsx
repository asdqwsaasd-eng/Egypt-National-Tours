import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { SecurityApprovalRequestForm } from '@/components/forms';
import { ShieldCheck, Compass } from 'lucide-react';

interface SecurityApprovalsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SecurityApprovalsPage({ params }: SecurityApprovalsPageProps) {
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
            { label: isAr ? 'خدمات الموافقات الأمنية' : 'Security Clearance' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'تسهيلات الدخول والموافقات الأمنية' : 'Security Clearance Coordination'}
            subtitle={
              isAr
                ? 'مساعدة وتنسيق إجراءات الدخول للمسافرين الدوليين القادمين إلى جمهورية مصر العربية.'
                : 'Coordinating entry permit arrangements for international travelers visiting Egypt.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {isAr ? 'نموذج طلب التنسيق والموافقة الأمنية' : 'Security Approval Request Form'}
            </h3>
            <SecurityApprovalRequestForm locale={locale} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border space-y-4">
              <h4 className="text-lg font-bold text-text-primary">
                {isAr ? 'إرشادات الخدمة' : 'Service Guidelines'}
              </h4>
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'تنسيق رسمي' : 'Official Assistance'}
                description={isAr ? 'تقديم البيانات الدقيقة يسرع عملية التنسيق.' : 'Providing accurate passport info speeds up processing.'}
              />
              <InfoCard
                icon={<Compass className="h-5 w-5" />}
                title={isAr ? 'تواصل مباشر' : 'Direct Follow-up'}
                description={isAr ? 'يتواصل معك الفريق فور تدقيق البيانات.' : 'Our team contacts you upon reviewing your request.'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
