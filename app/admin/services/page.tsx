import * as React from 'react';
import Link from 'next/link';
import { SectionHeader, Badge } from '@/components/ui';
import { Edit, Eye } from 'lucide-react';

export default function AdminServicesPage() {
  const services = [
    { key: 'flight', titleAr: 'حجز الطيران', titleEn: 'Flight Booking', slug: 'flights', status: 'published' },
    { key: 'hotel', titleAr: 'حجز الفنادق', titleEn: 'Hotel Booking', slug: 'hotels', status: 'published' },
    { key: 'custom_tour', titleAr: 'تصميم رحلة خاصة', titleEn: 'Custom Tour Design', slug: 'custom-tours', status: 'published' },
    { key: 'visa', titleAr: 'خدمات التأشيرات', titleEn: 'Visa Services', slug: 'visas', status: 'published' },
    { key: 'security_approval', titleAr: 'الموافقات الأمنية', titleEn: 'Security Approvals', slug: 'security-approvals', status: 'published' },
    { key: 'transportation', titleAr: 'النقل والمواصلات', titleEn: 'Transportation', slug: 'transportation', status: 'published' },
    { key: 'egypt_tour', titleAr: 'السياحة الداخلية (مصر)', titleEn: 'Egypt Domestic Tours', slug: 'egypt-tours', status: 'published' },
    { key: 'international_tour', titleAr: 'السياحة الخارجية', titleEn: 'International Tours', slug: 'international-tours', status: 'published' },
    { key: 'hajj', titleAr: 'برامج الحج', titleEn: 'Hajj Packages', slug: 'hajj-umrah/hajj', status: 'published' },
    { key: 'umrah', titleAr: 'برامج العمرة', titleEn: 'Umrah Packages', slug: 'hajj-umrah/umrah', status: 'published' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إدارة الخدمات والقطاعات"
          subtitle="تعديل وتنظيم أقسام الموقع والخدمات المتاحة للجمهور"
          align="start"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        <table className="w-full text-right text-xs">
          <thead className="bg-sand/60 border-b border-border text-text-secondary font-bold">
            <tr>
              <th className="p-3.5">اسم الخدمة (بالعربية)</th>
              <th className="p-3.5">English Title</th>
              <th className="p-3.5">الرابط (Slug)</th>
              <th className="p-3.5">الحالة</th>
              <th className="p-3.5 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((srv) => (
              <tr key={srv.key} className="hover:bg-sand/20 transition-colors">
                <td className="p-3.5 font-bold text-text-primary">{srv.titleAr}</td>
                <td className="p-3.5 text-text-secondary dir-ltr text-right">{srv.titleEn}</td>
                <td className="p-3.5 font-mono text-text-muted dir-ltr text-right">{srv.slug}</td>
                <td className="p-3.5">
                  <Badge variant="gold">منشور (Published)</Badge>
                </td>
                <td className="p-3.5 text-left">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/admin/services/${srv.key}`}
                      className="p-1.5 rounded-md bg-sand/60 hover:bg-sand text-text-primary transition-colors inline-block"
                      title="تعديل الخدمة"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={`/ar/services/${srv.slug.replace('services/', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-sand/60 hover:bg-sand text-text-primary transition-colors inline-block"
                      title="معاينة بالموقع"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
