import * as React from 'react';
import Link from 'next/link';
import { SectionHeader, Badge, Button } from '@/components/ui';
import { FEATURED_EGYPT_TOURS, INTERNATIONAL_TOURS } from '@/lib/data/tours';
import { Plus, Edit, Eye, Compass, MapPin, Clock } from 'lucide-react';

export default function AdminToursPage() {
  const allTours = [
    ...FEATURED_EGYPT_TOURS.map((t) => ({
      ...t,
      category: 'السياحة الداخلية (مصر)',
      categoryKey: 'egypt-tours',
      badgeVariant: 'gold' as const,
    })),
    ...INTERNATIONAL_TOURS.map((t) => ({
      ...t,
      category: 'السياحة الخارجية',
      categoryKey: 'international-tours',
      badgeVariant: 'outline' as const,
    })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="إدارة البرامج والرحلات السياحية"
          subtitle={`إجمالي البرامج المعروضة حالياً: ${allTours.length} برنامج سياحي`}
          align="start"
        />
        <Link href="/admin/tours/new">
          <Button variant="primary" size="md" className="shadow-md gap-1 font-bold">
            <Plus className="h-4 w-4" />
            <span>إضافة برنامج جديد</span>
          </Button>
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-sand/40 border-b border-border text-text-secondary font-bold">
              <tr>
                <th className="p-4">عنوان البرنامج</th>
                <th className="p-4">التصنيف</th>
                <th className="p-4">المدة</th>
                <th className="p-4">الوجهات الرئيسيّة</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-sand/20 transition-colors">
                  <td className="p-4 font-extrabold text-text-primary text-xs">
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-brand-red shrink-0" />
                      <span>{tour.title.ar}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-text-secondary">
                    <Badge variant={tour.badgeVariant}>{tour.category}</Badge>
                  </td>
                  <td className="p-4 text-text-muted font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {tour.duration.ar}
                    </span>
                  </td>
                  <td className="p-4 text-text-primary font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-gold-dark" />
                      {tour.destinations.ar.join('، ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant="gold">منشور (Published)</Badge>
                  </td>
                  <td className="p-4 text-left">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/tours/${tour.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sand/60 hover:bg-sand text-text-primary font-bold transition-colors text-xs border border-border"
                        title="تعديل تفاصيل البرنامج"
                      >
                        <Edit className="h-3.5 w-3.5 text-brand-red" />
                        <span>تعديل</span>
                      </Link>
                      <a
                        href={`/ar/${tour.categoryKey}/${tour.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sand/40 hover:bg-sand text-text-muted hover:text-brand-red transition-colors text-xs border border-border"
                        title="معاينة بالموقع"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>معاينة</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden divide-y divide-border">
          {allTours.map((tour) => (
            <div key={tour.id} className="p-4 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-text-primary text-xs flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-brand-red shrink-0" />
                  <span>{tour.title.ar}</span>
                </span>
                <Badge variant={tour.badgeVariant}>{tour.category}</Badge>
              </div>

              <div className="space-y-1.5 text-xs text-text-secondary">
                <div className="flex items-center gap-1 text-text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>المدة: {tour.duration.ar}</span>
                </div>
                <div className="flex items-center gap-1 text-text-primary">
                  <MapPin className="h-3.5 w-3.5 text-brand-gold-dark" />
                  <span>الوجهات: {tour.destinations.ar.join('، ')}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  href={`/admin/tours/${tour.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-brand-gold-light/60 text-brand-red font-bold text-xs border border-brand-gold/30"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>تعديل البرنامج</span>
                </Link>
                <a
                  href={`/ar/${tour.categoryKey}/${tour.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-sand/40 border border-border text-text-secondary text-xs font-bold"
                >
                  <Eye className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
