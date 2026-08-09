import * as React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { Container, SectionHeader, LinkButton, Card, CardHeader, CardContent, CardFooter } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { Compass, Moon } from 'lucide-react';

interface HajjUmrahPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HajjUmrahPage({ params }: HajjUmrahPageProps) {
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
          items={[{ label: isAr ? 'الحج والعمرة' : 'Hajj & Umrah' }]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'برامج الحج والعمرة' : 'Hajj & Umrah Packages'}
            subtitle={
              isAr
                ? 'خدمات سياحة دينية متكاملة لضيوف الرحمن بإقامة مريحة في مكة المكرمة والمدينة المنورة.'
                : 'Comprehensive religious travel packages and pilgrim care in Makkah Al-Mukarramah and Al-Madinah.'
            }
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Hajj Card */}
          <Card variant="bordered" padding="lg" className="flex flex-col justify-between text-center hover:border-brand-gold transition-colors">
            <CardContent className="pt-6 flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-brand-gold-light text-brand-red flex items-center justify-center">
                <Compass className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                {isAr ? 'برامج الحج' : 'Hajj Packages'}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {isAr
                  ? 'برامج حج متميزة تشمل الإقامة والتنقلات والإشراف الطبي والديني لضمان أداء المناسك بكل يسر.'
                  : 'Distinguished Hajj programs covering accommodations, transfers, and guidance.'}
              </p>
            </CardContent>
            <CardFooter className="justify-center pt-4">
              <LinkButton href={`/${locale}/hajj-umrah/hajj`} variant="primary" size="md">
                {isAr ? 'تفاصيل برامج الحج' : 'View Hajj Packages'} →
              </LinkButton>
            </CardFooter>
          </Card>

          {/* Umrah Card */}
          <Card variant="bordered" padding="lg" className="flex flex-col justify-between text-center hover:border-brand-gold transition-colors">
            <CardContent className="pt-6 flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-brand-gold-light text-brand-red flex items-center justify-center">
                <Moon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                {isAr ? 'برامج العمرة' : 'Umrah Packages'}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {isAr
                  ? 'رحلات عمرة طوال العام مع خيارات متنوعة للإقامة بالقرب من الحرمين الشريفين.'
                  : 'Year-round Umrah journeys offering varied accommodation tiers close to the Haramain.'}
              </p>
            </CardContent>
            <CardFooter className="justify-center pt-4">
              <LinkButton href={`/${locale}/hajj-umrah/umrah`} variant="primary" size="md">
                {isAr ? 'تفاصيل برامج العمرة' : 'View Umrah Packages'} →
              </LinkButton>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </div>
  );
}
