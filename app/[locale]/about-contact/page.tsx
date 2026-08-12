import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { COMPANY, CONTACT } from '@/lib/utils/constants';
import { Container, SectionHeader, LinkButton, InfoCard } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Award, Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface AboutContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutContactPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isAr ? 'من نحن والاتصال' : 'About Us & Contact',
    description: isAr
      ? 'شركة إيجيبت ناشيونال تورز - شركة سياحة وسفر مرخصة منذ 1990 بجمهورية مصر العربية والولايات المتحدة الأمريكية.'
      : 'Egypt National Tours - Travel and tourism company licensed since 1990 in Egypt & USA.',
    locale,
    path: '/about-contact',
  });
}

export default async function AboutContactPage({ params }: AboutContactPageProps) {
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
          items={[{ label: isAr ? 'من نحن والاتصال' : 'About & Contact' }]}
        />

        {/* ─── SECTION A: ABOUT US ─── */}
        <div className="mt-4 mb-16">
          <SectionHeader
            title={COMPANY.name[locale]}
            subtitle={COMPANY.tagline[locale]}
            align="start"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-[var(--radius-card)] border border-border space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-light/60 border border-brand-gold/30 text-brand-red text-xs sm:text-sm font-bold">
                <Award className="h-4 w-4 shrink-0" />
                <span>{COMPANY.license[locale]}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                {isAr ? 'عن الشركة وتاريخنا' : 'About Our Heritage & Services'}
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {isAr
                  ? 'شركة إيجيبت ناشيونال تورز هي شركة سياحة وسفر مرخصة منذ عام 1990 في جمهورية مصر العربية والولايات المتحدة الأمريكية. على مدار أكثر من ثلاثة عقود، نمتلك سجلاً حافلاً بالخبرة والتميز في تقديم أرقى الخدمات السياحية للمسافرين من مصر وجميع أنحاء العالم.'
                  : 'Egypt National Tours is an established travel and tourism company licensed since 1990 in Egypt & USA. For over three decades, we have maintained a reputation for reliability, excellence, and personalized hospitality for domestic and international travelers.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <InfoCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title={isAr ? 'ترخيص رسمي 1990' : 'Official License 1990'}
                  description={COMPANY.license[locale]}
                />
                <InfoCard
                  icon={<Award className="h-5 w-5" />}
                  title={isAr ? 'استشارات سياحية' : 'Expert Consultancy'}
                  description={
                    isAr
                      ? 'تقديم أفضل الحلول والخيارات المناسبة لميزانيتك واحتياجاتك.'
                      : 'Providing tailored recommendations to suit your exact budget and preferences.'
                  }
                />
              </div>
            </div>

            <div className="lg:col-span-4 bg-cream p-6 rounded-[var(--radius-card)] border border-border flex flex-col gap-4">
              <h3 className="text-lg font-bold text-text-primary">
                {isAr ? 'مجالات عملنا الرئيسية' : 'Primary Service Areas'}
              </h3>
              <ul className="space-y-2.5 text-sm text-text-secondary">
                <li className="flex items-center gap-2">✓ {isAr ? 'برامج مصر السياحية والنايل كروز' : 'Egypt Tours & Nile Cruises'}</li>
                <li className="flex items-center gap-2">✓ {isAr ? 'حجوزات الطيران والفنادق' : 'Flight & Hotel Bookings'}</li>
                <li className="flex items-center gap-2">✓ {isAr ? 'خدمات التأشيرات والموافقات الأمنية' : 'Visas & Security Clearance'}</li>
                <li className="flex items-center gap-2">✓ {isAr ? 'برامج الحج والعمرة' : 'Hajj & Umrah Pilgrimage'}</li>
                <li className="flex items-center gap-2">✓ {isAr ? 'النقل والرحلات الدولية' : 'Transportation & Outbound Tours'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── SECTION B: CONTACT DETAILS ─── */}
        <div className="mb-16">
          <SectionHeader
            title={isAr ? 'معلومات الاتصال المباشر' : 'Contact Information'}
            subtitle={
              isAr
                ? 'يمكنكم التواصل معنا عبر جميع القنوات الرسمية المعتمدة خلال ساعات العمل بالمكتب أو أونلاين.'
                : 'Reach out to our team through verified contact channels during office working hours or online.'
            }
            align="start"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border space-y-3">
              <div className="h-10 w-10 rounded-full bg-brand-gold-light text-brand-red flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">{isAr ? 'الهاتف والواتساب' : 'Phone & WhatsApp'}</h3>
              <div className="text-sm text-text-secondary space-y-1.5">
                <p className="font-semibold text-brand-red">
                  <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:underline inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      WA: {CONTACT.whatsapp}
                    </span>
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT.phonePrimaryRaw}`} className="hover:text-brand-red inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.phonePrimary}
                    </span>
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT.phoneSecondaryRaw}`} className="hover:text-brand-red inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.phoneSecondary}
                    </span>
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT.mobile1Raw}`} className="hover:text-brand-red inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.mobile1}
                    </span>
                  </a>
                </p>
                <p>
                  <a href={`tel:${CONTACT.mobile2Raw}`} className="hover:text-brand-red inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.mobile2}
                    </span>
                  </a>
                </p>
              </div>
            </div>

            {/* Both Public Emails in EXACT required order (Yahoo top, Domain below) */}
            <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border space-y-3">
              <div className="h-10 w-10 rounded-full bg-brand-gold-light text-brand-red flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</h3>
              <div className="text-sm text-text-secondary space-y-1.5 break-all">
                <p>
                  <a href={`mailto:${CONTACT.secondaryEmail}`} className="hover:text-brand-red transition-colors font-medium">
                    {CONTACT.secondaryEmail}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-red transition-colors font-medium">
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border space-y-3">
              <div className="h-10 w-10 rounded-full bg-brand-gold-light text-brand-red flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">{isAr ? 'العنوان' : 'Office Address'}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {CONTACT.address[locale]}
              </p>
            </div>

            <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border space-y-3">
              <div className="h-10 w-10 rounded-full bg-brand-gold-light text-brand-red flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-text-primary">{CONTACT.workingHoursHeader[locale]}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {CONTACT.workingHours[locale]}
              </p>
              <p className="text-xs text-brand-red font-medium">
                {CONTACT.offDays[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* ─── SECTION C & D: ACTIONS & MAP ─── */}
        <div className="bg-sand/50 p-6 sm:p-8 rounded-[var(--radius-card)] border border-border text-center flex flex-col items-center gap-6">
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
            {isAr ? 'تواصل معنا الآن أو تفضل بزيارتنا' : 'Connect With Us or Find Our Location'}
          </h3>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto">
            <LinkButton href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg" className="w-full sm:w-auto">
              <MessageCircle className="h-5 w-5" />
              <span>{isAr ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp'}</span>
            </LinkButton>
            <LinkButton href={`tel:${CONTACT.phonePrimaryRaw}`} variant="secondary" size="lg" className="w-full sm:w-auto">
              <Phone className="h-5 w-5 text-brand-red" />
              <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>PH: {CONTACT.phonePrimary}</span>
            </LinkButton>
            <LinkButton href={CONTACT.googleMaps} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg" className="w-full sm:w-auto border border-border bg-white">
              <ExternalLink className="h-5 w-5 text-brand-red" />
              <span>{isAr ? 'فتح الموقع في خرائط جوجل' : 'Open in Google Maps'}</span>
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
