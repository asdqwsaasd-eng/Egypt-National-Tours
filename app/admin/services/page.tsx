import * as React from 'react';
import Link from 'next/link';
import { SectionHeader, Badge, Card, CardHeader, CardContent } from '@/components/ui';
import {
  Plane,
  Building2,
  Compass,
  FileCheck,
  ShieldCheck,
  Car,
  Globe,
  Moon,
  Edit,
  Eye,
  Briefcase,
} from 'lucide-react';

export default function AdminServicesPage() {
  const services = [
    { key: 'flight', titleAr: 'حجز وتذاكر الطيران', titleEn: 'Flight Booking', slug: 'services/flights', icon: Plane, status: 'published' },
    { key: 'hotel', titleAr: 'حجز الفنادق والإقامة', titleEn: 'Hotel Booking', slug: 'services/hotels', icon: Building2, status: 'published' },
    { key: 'visa', titleAr: 'خدمات التأشيرات', titleEn: 'Visa Services', slug: 'services/visas', icon: FileCheck, status: 'published' },
    { key: 'security_approval', titleAr: 'الموافقات الأمنية', titleEn: 'Security Approvals', slug: 'services/security-approvals', icon: ShieldCheck, status: 'published' },
    { key: 'transportation', titleAr: 'النقل السياحي والمواصلات', titleEn: 'Transportation', slug: 'services/transportation', icon: Car, status: 'published' },
    { key: 'custom_tour', titleAr: 'تصميم برامج خاصة', titleEn: 'Custom Tours', slug: 'services/custom-tours', icon: Compass, status: 'published' },
    { key: 'egypt_tour', titleAr: 'برامج مصر السياحية', titleEn: 'Egypt Tours', slug: 'egypt-tours', icon: Globe, status: 'published' },
    { key: 'international_tour', titleAr: 'السياحة الدولية', titleEn: 'International Tours', slug: 'international-tours', icon: Globe, status: 'published' },
    { key: 'hajj_umrah', titleAr: 'رحلات الحج والعمرة', titleEn: 'Hajj & Umrah', slug: 'hajj-umrah', icon: Moon, status: 'published' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إدارة قطاعات وخدمات الشركة"
          subtitle={`إجمالي أقسام الخدمات النشطة: ${services.length} قطاعات`}
          align="start"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <Card key={srv.key} variant="default" padding="lg" className="hover:shadow-md transition-shadow">
              <CardHeader className="border-b border-border pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-10 w-10 rounded-xl bg-brand-gold-light/60 text-brand-red flex items-center justify-center border border-brand-gold/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="gold">نشط (Published)</Badge>
                </div>
                <h3 className="text-sm font-extrabold text-text-primary">
                  {srv.titleAr}
                </h3>
                <p className="text-[11px] text-text-muted dir-ltr text-right">
                  {srv.titleEn}
                </p>
              </CardHeader>

              <CardContent className="pt-3 flex items-center justify-between text-xs">
                <Link
                  href={`/admin/services/${srv.key}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sand/60 hover:bg-sand text-brand-red font-extrabold transition-colors border border-border"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>تعديل التفاصيل</span>
                </Link>

                <a
                  href={`/ar/${srv.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text-muted hover:text-brand-red font-bold transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>معاينة بالموقع</span>
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
