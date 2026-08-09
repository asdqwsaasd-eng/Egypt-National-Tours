import * as React from 'react';
import Image from 'next/image';
import { SectionHeader, Card, Badge } from '@/components/ui';
import { Image as ImageIcon, CheckCircle, ShieldCheck } from 'lucide-react';

export default function AdminMediaPage() {
  const mediaItems = [
    {
      id: 'brand-logo-original',
      name: 'الشعار الأصلي المعترف به (Sacred Brand Logo)',
      path: '/assets/brand/logo-original.png',
      dimensions: '300x120',
      type: 'PNG Image',
      isProtected: true,
    },
    {
      id: 'hero-egypt-bg',
      name: 'صورة خلفية القسم الرئيسي (Pyramids Hero Background)',
      path: '/assets/hero/hero-bg.jpg',
      dimensions: '1920x1080',
      type: 'JPG Image',
      isProtected: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="مكتبة الوسائط والصور"
          subtitle="إدارة ومعاينة الأصول البصرية والهوية المعتمدة للموقع"
          align="start"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaItems.map((item) => (
          <Card key={item.id} variant="default" padding="md" className="space-y-4">
            <div className="relative h-44 w-full bg-sand/40 rounded-lg overflow-hidden border border-border flex items-center justify-center p-4">
              <Image
                src={item.path}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <p className="font-bold text-text-primary text-sm">{item.name}</p>
                {item.isProtected ? (
                  <Badge variant="gold" className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>محمي محلياً</span>
                  </Badge>
                ) : (
                  <Badge variant="outline">وسائط هيدر</Badge>
                )}
              </div>

              <p className="font-mono text-text-muted dir-ltr text-right">{item.path}</p>
              <div className="flex items-center justify-between text-text-secondary pt-1 border-t border-border">
                <span>الأبعاد: {item.dimensions}</span>
                <span>النوع: {item.type}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
