import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale, SupportedLocale } from '@/lib/i18n/config';
import { SERVICE_CATEGORIES } from '@/lib/data/services';
import { Container, SectionHeader, Card, CardContent } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout';
import { Plane, ArrowRight, ArrowLeft } from 'lucide-react';

interface GeneralRequestPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string; tour?: string }>;
}

export default async function GeneralRequestPage({ params, searchParams }: GeneralRequestPageProps) {
  const { locale: rawLocale } = await params;
  const { service: queryService, tour: queryTour } = await searchParams;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="py-8 pb-16">
      <Container size="default">
        <Breadcrumbs
          locale={locale}
          items={[{ label: isAr ? 'اطلب رحلتك الآن' : 'Request Your Trip' }]}
        />

        <div className="mt-4 mb-12">
          <SectionHeader
            title={isAr ? 'مركز طلب الخدمات والسياحة' : 'Universal Trip & Service Request Center'}
            subtitle={
              isAr
                ? 'اختر الخدمة المطلوبة لبدء تقديم طلبك وتحديد أدق التفاصيل.'
                : 'Select the service you require to submit your details directly to our travel consultants.'
            }
            align="start"
          />
        </div>

        {queryTour && (
          <div className="mb-8 p-4 rounded-[var(--radius-card)] bg-brand-gold-light/40 border border-brand-gold/40 text-sm font-semibold text-text-primary flex items-center justify-between">
            <span>
              {isAr ? `البرنامج المختار: ${queryTour}` : `Selected Program: ${queryTour}`}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = queryService === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/${locale}/request?service=${cat.slug}${queryTour ? `&tour=${queryTour}` : ''}`}
                className="group"
              >
                <Card
                  variant={isSelected ? 'bordered' : 'default'}
                  padding="md"
                  className={`h-full flex flex-col justify-between transition-all duration-200 ${
                    isSelected ? 'border-2 border-brand-red bg-cream' : 'hover:border-brand-red/40 hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-full bg-sand text-brand-red flex items-center justify-center">
                        <Plane className="h-6 w-6" />
                      </div>
                      <ArrowIcon className="h-5 w-5 text-text-muted group-hover:text-brand-red group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                    </div>

                    <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-red transition-colors">
                      {cat.title[locale]}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {cat.description[locale]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Phase 5 Form Integration Notice */}
        <div className="mt-12 p-6 rounded-[var(--radius-card)] bg-sand/60 border border-border text-center">
          <p className="text-sm text-text-secondary font-medium">
            {isAr
              ? 'ملاحظة: النماذج التفاعلية المعقدة وحفظ البيانات في قاعدة البيانات تكتمل في المرحلة 5.'
              : 'Interactive form inputs and server-side request submissions will be fully wired up in Phase 5.'}
          </p>
        </div>
      </Container>
    </div>
  );
}
