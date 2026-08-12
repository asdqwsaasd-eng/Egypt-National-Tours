import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { COMPANY, CONTACT } from '@/lib/utils/constants';
import { SERVICE_CATEGORIES } from '@/lib/data/services';
import { FEATURED_EGYPT_TOURS } from '@/lib/data/tours';
import {
  ServiceIcon,
  Container,
  SectionHeader,
  LinkButton,
  ServiceCard,
  TourCard,
  InfoCard,
  ReviewCarousel,
} from '@/components/ui';
import { Award, MapPin, Compass, ShieldCheck, MessageSquarePlus } from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const dict = await getDictionary(locale);
  const isAr = locale === 'ar';

  // Task 1: Prepare Hajj & Umrah card to replace Cairo/Alexandria promotional item on homepage
  const hajjUmrahCard = {
    id: 'hajj-umrah-card',
    title: isAr ? 'الحج والعمرة' : 'Hajj & Umrah',
    slug: 'hajj-umrah',
    imageSrc: '/images/site-update/services/hajj-umrah.webp',
    imageAlt: isAr ? 'رحلات الحج والعمرة' : 'Hajj & Umrah Pilgrimage',
    duration: isAr ? 'برامج طوال العام' : 'Year-Round Packages',
    destinations: isAr ? ['مكة المكرمة', 'المدينة المنورة'] : ['Makkah', 'Madinah'],
    summary: isAr
      ? 'برامج دينية متكاملة تشمل الإقامة القريبة من الحرمين الشريفين والخدمات اللوجستية.'
      : 'Official Hajj & Umrah pilgrimage packages with close Haramain accommodation.',
    href: `/${locale}/hajj-umrah`,
  };

  // Filter cairo-classic and nile-cruise from FEATURED_EGYPT_TOURS for the homepage grid
  const cairoClassic = FEATURED_EGYPT_TOURS.find((t) => t.id === 'cairo-classic');
  const nileCruise = FEATURED_EGYPT_TOURS.find((t) => t.id === 'nile-cruise-luxor-aswan');

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-cream py-16 md:py-24 border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold-light/20 via-transparent to-sand/40 opacity-75" />
        
        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold-light/60 border border-brand-gold/30 text-brand-red text-xs sm:text-sm font-bold">
                <Award className="h-4 w-4 shrink-0" />
                <span>{COMPANY.license[locale]}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight">
                {COMPANY.tagline[locale]}
              </h1>

              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
                {isAr
                  ? 'خبرة أكثر من 35 عاماً في تقديم خدمات السفر والسياحة المتكاملة في مصر وحول العالم بنفس الدقة والاحترافية.'
                  : 'Over 35 years of trusted experience delivering tailor-made travel and tourism solutions across Egypt and worldwide.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <LinkButton
                  href={`/${locale}/request`}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                  {dict.nav.requestTrip}
                </LinkButton>
                <LinkButton
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto shadow-md"
                >
                  {dict.common.chatWhatsApp}
                </LinkButton>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-image)] shadow-xl border-4 border-white bg-sand">
                <Image
                  src="/assets/references/cairo-tour-1.jpg"
                  alt="Egypt Tourism"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -start-4 bg-white p-4 rounded-[var(--radius-card)] shadow-lg border border-border flex items-center gap-3 max-w-xs">
                <div className="h-10 w-10 rounded-full bg-brand-gold-light flex items-center justify-center text-brand-red font-bold shrink-0">
                  35+
                </div>
                <div className="text-xs">
                  <p className="font-bold text-text-primary">
                    {isAr ? 'خبرة عريقة منذ 1990' : 'Experience Since 1990'}
                  </p>
                  <p className="text-text-secondary">
                    {isAr ? 'مصر والولايات المتحدة' : 'Licensed in Egypt & USA'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. MAIN SERVICES (Task 2: Service Cards with desktop image hover effect) ─── */}
      <section className="py-4">
        <Container size="default">
          <SectionHeader
            title={dict.services.egyptTours === 'Egypt Tours' ? 'Our Services' : 'خدماتنا المميزة'}
            subtitle={
              isAr
                ? 'نقدم لكم مجموعة كاملة من خدمات السفر والسياحة وتسهيلات الدخول والإقامة.'
                : 'A comprehensive suite of tourism, booking, visa, and entry assistance services.'
            }
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.slice(0, 8).map((cat) => (
              <ServiceCard
                key={cat.id}
                title={cat.title[locale]}
                description={cat.description[locale]}
                icon={<ServiceIcon iconName={cat.iconName} className="h-7 w-7" />}
                imageSrc={cat.imageSrc}
                href={`/${locale}${cat.href}`}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <LinkButton href={`/${locale}/services`} variant="secondary" size="md">
              {isAr ? 'عرض جميع الخدمات' : 'View All Services'} →
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* ─── 3. QUICK REQUEST NAVIGATOR ─── */}
      <section className="bg-sand/50 py-12 border-y border-border">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              {isAr ? 'ما الذي يمكننا ترتيبه لك؟' : 'What can we arrange for you?'}
            </h2>
            <p className="text-sm text-text-secondary">
              {isAr
                ? 'اختر الخدمة المطلوبة للانتقال المباشر إلى نموذج الطلب السريع'
                : 'Select a service to navigate directly to the quick request form.'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {SERVICE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/request?service=${cat.slug}`}
                className="px-4 py-2.5 rounded-full bg-white border border-border text-sm font-semibold text-text-primary hover:border-brand-red hover:text-brand-red hover:shadow-sm transition-all"
              >
                {cat.title[locale]}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 4. FEATURED TOURS & PROGRAMS (Task 1: Promotes Hajj & Umrah instead of Cairo/Alexandria) ─── */}
      <section className="py-4">
        <Container size="default">
          <SectionHeader
            title={isAr ? 'أبرز البرامج والوجهات' : 'Featured Travel Programs'}
            subtitle={
              isAr
                ? 'برامج سياحية ودينية مصممة بعناية لزيارة الحرمين الشريفين وأعرق معالم التاريخ والنيل.'
                : 'Handcrafted pilgrimage and sightseeing programs to holy sanctuaries and historic treasures.'
            }
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Cairo Classic */}
            {cairoClassic && (
              <TourCard
                title={cairoClassic.title[locale]}
                slug={cairoClassic.slug}
                locale={locale}
                imageSrc={cairoClassic.imageSrc}
                imageAlt={cairoClassic.imageAlt[locale]}
                duration={cairoClassic.duration[locale]}
                destinations={cairoClassic.destinations[locale]}
                summary={cairoClassic.summary[locale]}
              />
            )}

            {/* Card 2: Task 1 - Hajj & Umrah Card replacing Cairo/Alexandria promotional card */}
            <TourCard
              title={hajjUmrahCard.title}
              slug={hajjUmrahCard.slug}
              locale={locale}
              imageSrc={hajjUmrahCard.imageSrc}
              imageAlt={hajjUmrahCard.imageAlt}
              duration={hajjUmrahCard.duration}
              destinations={hajjUmrahCard.destinations}
              summary={hajjUmrahCard.summary}
            />

            {/* Card 3: Nile Cruise */}
            {nileCruise && (
              <TourCard
                title={nileCruise.title[locale]}
                slug={nileCruise.slug}
                locale={locale}
                imageSrc={nileCruise.imageSrc}
                imageAlt={nileCruise.imageAlt[locale]}
                duration={nileCruise.duration[locale]}
                destinations={nileCruise.destinations[locale]}
                summary={nileCruise.summary[locale]}
              />
            )}
          </div>

          <div className="mt-10 text-center flex flex-wrap justify-center gap-4">
            <LinkButton href={`/${locale}/hajj-umrah`} variant="primary" size="md">
              {isAr ? 'استكشف برامج الحج والعمرة' : 'Explore Hajj & Umrah'} →
            </LinkButton>
            <LinkButton href={`/${locale}/egypt-tours`} variant="secondary" size="md">
              {isAr ? 'جميع رحلات مصر' : 'Explore Egypt Tours'} →
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* ─── 5. WHY EGYPT NATIONAL TOURS ─── */}
      <section className="py-4">
        <Container size="default">
          <SectionHeader
            title={isAr ? 'لماذا تختار إيجيبت ناشيونال تورز؟' : 'Why Egypt National Tours?'}
            subtitle={
              isAr
                ? 'حقائق وقيم نعتز بها لضمان أفضل تجربة سفر وتخطيط رحلتك.'
                : 'Core values and established facts that ensure your trip is seamless and memorable.'
            }
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard
              icon={<Award className="h-6 w-6" />}
              title={isAr ? 'خبرة وتراخيص رسمية' : 'Licensing & Experience'}
              description={
                isAr
                  ? 'مرخصة رسمياً منذ عام 1990 في مصر والولايات المتحدة الأمريكية.'
                  : 'Officially licensed since 1990 in Egypt & USA with decades of hospitality excellence.'
              }
            />
            <InfoCard
              icon={<Compass className="h-6 w-6" />}
              title={isAr ? 'خدمات سياحية شاملة' : 'Full Travel Services'}
              description={
                isAr
                  ? 'طيران، فنادق، برامج مصرية ودولية، حج وعمرة، تأشيرات وموافقات أمنية.'
                  : 'Flights, hotels, tours, Hajj & Umrah, visas, and entry clearance assistance.'
              }
            />
            <InfoCard
              icon={<MapPin className="h-6 w-6" />}
              title={isAr ? 'خبرة محليّة متميزة' : 'Local Egypt Expertise'}
              description={
                isAr
                  ? 'فريق متخصص بجميع المزارات والمعالم السياحية في القاهرة والأقصر وأسوان.'
                  : 'Specialized local team knowledgeable in all historical destinations and treasures.'
              }
            />
            <InfoCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title={isAr ? 'استشارات ومتابعة شخصية' : 'Personalized Assistance'}
              description={
                isAr
                  ? 'متابعة دقيقة لكل طلب وتقديم النصيحة والأفضل لراحة العملاء.'
                  : 'Dedicated travel consultants providing clear recommendations tailored to you.'
              }
            />
          </div>
        </Container>
      </section>

      {/* ─── 6. CUSTOMER REVIEWS (Task 5: Moving Customer Reviews Ticker) ─── */}
      <section className="bg-cream py-16 border-y border-border overflow-hidden">
        <Container size="default">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-brand-gold-light text-brand-red mx-auto flex items-center justify-center">
              <MessageSquarePlus className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {isAr ? 'آراء وانطباعات المسافرين' : 'Traveler Feedback'}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {isAr
                ? 'ثقة عميلنا ومسافرينا الكرام هي أساس تميزنا وعراقة خدماتنا.'
                : 'Our travelers’ trust and recommendations inspire our decade-spanning service.'}
            </p>
          </div>

          {/* Task 5: Interactive Marquee Carousel */}
          <ReviewCarousel isAr={isAr} />
        </Container>
      </section>

      {/* ─── 7. FINAL CTA ─── */}
      <section className="py-6">
        <Container size="narrow">
          <div className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white rounded-[var(--radius-card)] p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              {isAr ? 'خطط لرحلتك معنا الآن' : 'Plan Your Trip With Us'}
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              {isAr
                ? 'فريقنا في انتظارك لتقديم أفضل الخيارات والاستشارات لسفر مريح ومميز.'
                : 'Our travel advisors are ready to assist you with customized itineraries and quotes.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <LinkButton href={`/${locale}/request`} variant="secondary" size="lg">
                {dict.nav.requestTrip}
              </LinkButton>
              <LinkButton
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
              >
                {dict.common.chatWhatsApp}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
