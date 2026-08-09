import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

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
            { label: isAr ? 'خدماتنا' : 'Services', href: `/${locale}/services` },
            { label: isAr ? 'الموافقات الأمنية' : 'Security Approvals' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'الموافقات الأمنية وإجراءات الدخول' : 'Security Clearance & Entry Clearance Services'}
            subtitle={
              isAr
                ? 'مساعدة المسافرين والزوار الأجانب في متابعة وإجراءات الحصول على الموافقات الأمنية لدخول مصر.'
                : 'Assistance for international travelers regarding entry security clearance procedures for Egypt.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              {isAr ? 'خدمات تسهيل دخول الزوار' : 'Visitor Entry Clearance Assistance'}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? 'نقدم الدعم والاستشارة للزوار والمجموعات السياحية الراغبة في الحصول على التراخيص والموافقات الأمنية الرسمية المعتمدة قبل السفر لمصر.'
                : 'We provide guidance and coordination for tourists and groups requiring pre-approved security clearance for entering Egypt.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title={isAr ? 'متابعة الإجراءات' : 'Process Coordination'}
                description={isAr ? 'متابعة رسمية ودقيقة للبيانات والمستندات.' : 'Formal tracking and submission of travel details.'}
              />
              <InfoCard
                icon={<UserCheck className="h-5 w-5" />}
                title={isAr ? 'دعم الجنسيات المختلفة' : 'Multinational Support'}
                description={isAr ? 'خدمة مخصصة لمختلف الجنسيات والزائرين.' : 'Tailored support for foreign passport holders.'}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'اطلب الموافقة الأمنية' : 'Request Security Clearance'}
            </h4>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'أدخل بيانات الجنسية وتاريخ السفر المتوقع للتواصل معك فوراً.'
                : 'Provide your nationality and intended travel dates for consultation.'}
            </p>
            <LinkButton href={`/${locale}/request?service=security-approvals`} variant="primary" size="lg" fullWidth>
              {isAr ? 'تقديم الطلب' : 'Submit Clearance Request'}
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
