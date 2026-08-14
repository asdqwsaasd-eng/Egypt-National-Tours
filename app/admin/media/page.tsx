import * as React from 'react';
import Image from 'next/image';
import { SectionHeader, Card, Badge, CardHeader, CardContent } from '@/components/ui';
import { Image as ImageIcon, ShieldCheck, Info, ExternalLink } from 'lucide-react';

export default function AdminMediaPage() {
  const mediaItems = [
    {
      id: 'brand-logo-original',
      name: 'شعار الشركة الأصلي (Original Brand Logo)',
      path: '/assets/brand/logo-original.png',
      category: 'هوية مخصصة',
      type: 'PNG Image',
      isProtected: true,
    },
    {
      id: 'hajj-banner',
      name: 'بنر خدمة الحج المعتمد (Hajj Company Banner)',
      path: '/images/site-update/banners/egypt-national-tours-company-banner.webp',
      category: 'بنرات الخدمات',
      type: 'WEBP Image',
      isProtected: false,
    },
    {
      id: 'umrah-banner',
      name: 'بنر برامج العمرة (Umrah Program Banner)',
      path: '/images/site-update/umrah/umrah-program-banner.webp',
      category: 'بنرات الخدمات',
      type: 'WEBP Image',
      isProtected: false,
    },
    {
      id: 'hero-egypt-bg',
      name: 'خلفية القسم الرئيسي (Pyramids Hero Background)',
      path: '/assets/hero/hero-bg.jpg',
      category: 'خلفيات الصفحة',
      type: 'JPG Image',
      isProtected: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="مكتبة الصور والبنرات البصرية"
          subtitle="معاينة واستعراض الأصول البصرية المعروضة على صفحات الموقع العام"
          align="start"
        />
      </div>

      {/* Info Status Banner */}
      <Card variant="default" padding="md" className="bg-sand/30">
        <CardContent className="flex items-start gap-3 text-xs text-text-secondary">
          <Info className="h-5 w-5 text-brand-gold-dark shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-text-primary">حالة نظام وسائط الموقع:</p>
            <p>
              يتم تقديم أصول الصور والبنرات حالياً مباشرة عبر مجلد الأصول الثابت المعتمد بالتطبيق (<code className="font-mono bg-sand/60 px-1 py-0.5 rounded">public/assets/</code> و <code className="font-mono bg-sand/60 px-1 py-0.5 rounded">public/images/</code>) لضمان أسرع وقت تحميل واستقرار كامل للهوية البصرية.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {mediaItems.map((item) => (
          <Card key={item.id} variant="default" padding="md" className="space-y-4 hover:shadow-md transition-shadow">
            <div className="relative h-44 w-full bg-sand/30 rounded-xl overflow-hidden border border-border flex items-center justify-center p-4">
              <Image
                src={item.path}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-text-primary text-sm">{item.name}</p>
                {item.isProtected ? (
                  <Badge variant="gold" className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>هوية محمية</span>
                  </Badge>
                ) : (
                  <Badge variant="outline">{item.category}</Badge>
                )}
              </div>

              <p className="font-mono text-text-muted dir-ltr text-right text-[11px] bg-sand/40 p-1.5 rounded border border-border">
                {item.path}
              </p>

              <div className="flex items-center justify-between text-text-secondary pt-2 border-t border-border">
                <span>نوع الملف: <strong className="text-text-primary">{item.type}</strong></span>
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-brand-red hover:underline"
                >
                  <span>عرض الحجم الكامل</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
