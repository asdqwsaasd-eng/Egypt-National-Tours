import * as React from 'react';
import { SectionHeader, Badge, Card, CardHeader, CardContent } from '@/components/ui';
import { Eye, Moon, Star, CheckCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminHajjUmrahPage() {
  const religiousPrograms = [
    {
      id: 'hajj-2026',
      titleAr: 'برنامج الحج السياحي المباشر (1447هـ / 2026م)',
      category: 'الحج',
      duration: '14 - 21 يوم',
      slug: 'hajj-umrah/hajj',
      status: 'published',
      bannerPath: '/images/site-update/banners/egypt-national-tours-company-banner.webp',
      badgeColor: 'gold' as const,
    },
    {
      id: 'umrah-2026',
      titleAr: 'برامج العمرة المتميزة (اقتصادي - مميز - فاخر)',
      category: 'العمرة',
      duration: '10 - 15 يوم',
      slug: 'hajj-umrah/umrah',
      status: 'published',
      bannerPath: '/images/site-update/umrah/umrah-program-banner.webp',
      badgeColor: 'outline' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إدارة رحلات وبرامج الحج والعمرة"
          subtitle="تعديل وتنظيم الخدمات الدينية وباقات الحج والعمرة المعروضة على الموقع العام"
          align="start"
        />
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {religiousPrograms.map((prog) => (
          <Card key={prog.id} variant="default" padding="lg" className="space-y-4">
            <CardHeader className="border-b border-border pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={prog.badgeColor}>{prog.category}</Badge>
                <Badge variant="gold">نشط ومتاح 24/7</Badge>
              </div>
              <h3 className="text-base font-extrabold text-text-primary pt-2 flex items-center gap-2">
                <Moon className="h-5 w-5 text-brand-gold-dark" />
                <span>{prog.titleAr}</span>
              </h3>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1 text-text-secondary">
                <p><strong className="text-text-primary">المدة المعتمدة:</strong> {prog.duration}</p>
                <p><strong className="text-text-primary">مسار البنرات:</strong> <code className="font-mono bg-sand/60 px-1 py-0.5 rounded text-[11px]">{prog.bannerPath}</code></p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <a
                  href={`/ar/${prog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-gold-light/60 text-brand-red font-bold hover:bg-brand-gold-light transition-colors text-xs border border-brand-gold/30"
                >
                  <Eye className="h-4 w-4" />
                  <span>معاينة الصفحة العامة</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card variant="default" padding="md" className="bg-sand/30">
        <CardContent className="flex items-start gap-3 text-xs text-text-secondary">
          <Star className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-text-primary">ضوابط برامج الحج والعمرة الرسمية:</p>
            <p>
              يتم تلقي الطلبات إلكترونياً على مدار الساعة عبر نماذج حجز الحج والعمرة، ويقوم فريق المبيعات بالتواصل المباشر مع العملاء لتأكيد تفاصيل التأشيرات وحجوزات الفنادق بمكة والمدينة المنورة.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
