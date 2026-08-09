import * as React from 'react';
import { SectionHeader, Badge } from '@/components/ui';
import { FEATURED_EGYPT_TOURS, INTERNATIONAL_TOURS } from '@/lib/data/tours';
import { Eye } from 'lucide-react';

export default function AdminToursPage() {
  const allTours = [
    ...FEATURED_EGYPT_TOURS.map((t) => ({ ...t, category: 'السياحة الداخلية (مصر)', categoryKey: 'egypt-tours' })),
    ...INTERNATIONAL_TOURS.map((t) => ({ ...t, category: 'السياحة الخارجية', categoryKey: 'international-tours' })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إدارة البرامج والرحلات السياحية"
          subtitle="تعديل وتنظيم البرامج السياحية الداخلية والخارجية"
          align="start"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        <table className="w-full text-right text-xs">
          <thead className="bg-sand/60 border-b border-border text-text-secondary font-bold">
            <tr>
              <th className="p-3.5">عنوان البرنامج</th>
              <th className="p-3.5">القسم / التصنيف</th>
              <th className="p-3.5">المدة</th>
              <th className="p-3.5">الوجهة الرئيسية</th>
              <th className="p-3.5">الحالة</th>
              <th className="p-3.5 text-left">معاينة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allTours.map((tour) => (
              <tr key={tour.id} className="hover:bg-sand/20 transition-colors">
                <td className="p-3.5 font-bold text-text-primary">{tour.title.ar}</td>
                <td className="p-3.5 text-text-secondary">{tour.category}</td>
                <td className="p-3.5 text-text-muted">{tour.duration.ar}</td>
                <td className="p-3.5 text-text-primary font-medium">{tour.destinations.ar.join('، ')}</td>
                <td className="p-3.5">
                  <Badge variant="gold">منشور (Published)</Badge>
                </td>
                <td className="p-3.5 text-left">
                  <a
                    href={`/ar/${tour.categoryKey}/${tour.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-sand/60 hover:bg-sand text-text-primary transition-colors inline-block"
                    title="معاينة بالموقع"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
