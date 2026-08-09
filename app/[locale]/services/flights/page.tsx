import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { Plane, Compass, ShieldCheck, Clock } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

interface FlightServicePageProps {
  params: Promise<{ locale: string }>;
}

export default async function FlightServicePage({ params }: FlightServicePageProps) {
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
            { label: isAr ? 'تذاكر الطيران' : 'Flight Tickets' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'خدمة حجز وتنسيق تذاكر الطيران' : 'Flight Ticketing Assistance'}
            subtitle={
              isAr
                ? 'نساعدك في إصدار وتأكيد حجز تذاكر الطيران الداخلي والدولي لأفضل الوجهات وبخيارات مريحة.'
                : 'Assistance with domestic and international flight ticket bookings, seat preferences, and multi-city routes.'
            }
            align="start"
          />
        </div>

        {/* Overview & CTA Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              {isAr ? 'لماذا تطلب حجز طيرانك مع إيجيبت ناشيونال تورز؟' : 'Why Request Flights Through Egypt National Tours?'}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? 'نوفر مستشارين متخصصين لمراجعة مواعيد رحلتك ومقارنة أفضل خيارات خطوط الطيران المتاحة (ذهاب فقط، ذهاب وعودة، أو وجهات متعددة Multi-City) لضمان سفر مريح وأنسب المسارات.'
                : 'Our travel consultants help you find optimal flight itineraries (One Way, Round Trip, or Multi-City) across major airlines.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <InfoCard
                icon={<Plane className="h-5 w-5" />}
                title={isAr ? 'مسارات متعددة' : 'Flexible Trip Types'}
                description={isAr ? 'دعم رحلات الذهاب، العودة، والوجهات المتعددة.' : 'Support for One Way, Round Trip, and Multi-City routes.'}
              />
              <InfoCard
                icon={<Clock className="h-5 w-5" />}
                title={isAr ? 'متابعة فورية' : 'Personal Follow-up'}
                description={isAr ? 'متابعة شخصية لتأكيد حجزك عبر البريد والواتساب.' : 'Dedicated consultant follow-up via email and WhatsApp.'}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'اطلب تسعير رحلتك الآن' : 'Request a Flight Quote'}
            </h4>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'قدم طلبك المباشر وسيتواصل معك أحد مستشارينا لتوفير الخيارات المتاحة.'
                : 'Submit your flight details to receive tailored airline options from our consultants.'}
            </p>
            <LinkButton href={`/${locale}/request?service=flights`} variant="primary" size="lg" fullWidth>
              {isAr ? 'طلب حجز طيران' : 'Submit Flight Request'}
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
