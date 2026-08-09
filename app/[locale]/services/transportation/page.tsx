import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { Bus, MapPin, ShieldCheck } from 'lucide-react';
import { CONTACT } from '@/lib/utils/constants';

interface TransportationPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TransportationPage({ params }: TransportationPageProps) {
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
            { label: isAr ? 'النقل السياحي' : 'Tourist Transportation' },
          ]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'خدمات النقل والانتقالات السياحية' : 'Tourist Transportation & Transfer Services'}
            subtitle={
              isAr
                ? 'تنسيق انتقالات المطارات، الرحلات اليومية، والسيارات والحافلات السياحية الفاخرة.'
                : 'Arranging airport transfers, private vehicles, and air-conditioned buses for tours and travel.'
            }
            align="start"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 bg-white p-8 rounded-[var(--radius-card)] border border-border space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              {isAr ? 'انتقالات مريحة وآمنة' : 'Comfortable & Safe Transfers'}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {isAr
                ? 'ننسق كافة خدمات النقل السياحي من وإلى المطارات بين المحافظات والمزارات السياحية عبر شركاء موثوقين وحافلات حديثة مكيفة.'
                : 'We coordinate private transfers, airport pickups, and intercity tourist transport through verified transport partners.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <InfoCard
                icon={<Bus className="h-5 w-5" />}
                title={isAr ? 'مركبات حديثة' : 'Modern Vehicles'}
                description={isAr ? 'حافلات وسيارة خاصة حديثة ومكيفة.' : 'Air-conditioned modern sedans, vans, and buses.'}
              />
              <InfoCard
                icon={<MapPin className="h-5 w-5" />}
                title={isAr ? 'تغطية شاملة' : 'Full Destination Coverage'}
                description={isAr ? 'انتقالات المطار، القاهرة، الأقصر، أسوان والمنتجعات.' : 'Covering Cairo, Alexandria, Luxor, Aswan, and Red Sea resorts.'}
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-sand/60 p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
            <h4 className="text-lg font-bold text-text-primary">
              {isAr ? 'اطلب خدمة النقل' : 'Request Transport'}
            </h4>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'حدد نقطة التحرك والوصول وعدد المسافرين للتسعير.'
                : 'Specify pickup/drop-off locations and traveler count.'}
            </p>
            <LinkButton href={`/${locale}/request?service=transportation`} variant="primary" size="lg" fullWidth>
              {isAr ? 'تقديم طلب النقل' : 'Submit Transport Request'}
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
