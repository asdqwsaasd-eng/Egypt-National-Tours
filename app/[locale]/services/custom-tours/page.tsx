import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { Sparkles, Calendar, HeartHandshake } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

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
            { label: isAr ? 'خدماتنا' : 'Services', href: `/${locale}/services` },
            { label: isAr ? 'البرامج السياحية الخاصة' : 'Custom Tours' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'تصميم برنامج سياحي خاص' : 'Tailor-Made Custom Tours'}
            subtitle={
              isAr
                ? 'نصمم رحلتك بالكامل حسب رغبتك ومواعيدك والمزارات السياحية التي تفضل زيارتها.'
                : 'Customized itineraries crafted specifically around your travel dates, preferred sights, and budget.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              {isAr ? 'برنامج مصمم خصيصاً لك' : 'Personalized Itinerary Design'}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? 'إذا لم تجد برنامجاً يناسب احتياجاتك ضمن البرامج الجاهزة، يمكنك تحديد المدن، نوع الإقامة، والمزارات المفضلة لتقوم شركتنا بتنسيق رحلة فريدة لك ولعائلتك.'
                : 'Design your dream Egypt or international holiday with dedicated guidance from our senior travel consultants.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InfoCard
                icon={<Sparkles className="h-5 w-5" />}
                title={isAr ? 'مرونة كاملة' : 'Full Flexibility'}
                description={isAr ? 'مرونة في اختيار الأيام والمزارات ونوع الفنادق.' : 'Flexibility in selecting dates, sights, and hotel tiers.'}
              />
              <InfoCard
                icon={<HeartHandshake className="h-5 w-5" />}
                title={isAr ? 'استشارة مجانية' : 'Dedicated Advisory'}
                description={isAr ? 'مستشار سياحي متخصص لتنسيق أدق التفاصيل.' : 'Dedicated consultant coordinating every detail.'}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'تصميم رحلتك الخاصة' : 'Request Custom Itinerary'}
            </h4>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'أرسل تفاصيل رغباتك وسيتواصل معك مستشار السفر بالخطة المناسبة.'
                : 'Share your preferences to receive a custom proposal.'}
            </p>
            <LinkButton href={`/${locale}/request?service=custom-tours`} variant="primary" size="lg" fullWidth>
              {isAr ? 'طلب برنامج خاص' : 'Submit Custom Request'}
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
