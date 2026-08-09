import * as React from 'react';
import { SectionHeader, Badge } from '@/components/ui';
import { Eye } from 'lucide-react';

export default function AdminHajjUmrahPage() {
  const religiousPrograms = [
    {
      id: 'hajj-2026',
      titleAr: 'برنامج الحج السياحي 1447هـ / 2026م',
      category: 'الحج',
      duration: '14 - 21 يوم',
      slug: 'hajj-umrah/hajj',
      status: 'published',
    },
    {
      id: 'umrah-2026',
      titleAr: 'برامج العمرة المتميزة (طوال العام)',
      category: 'العمرة',
      duration: '10 - 15 يوم',
      slug: 'hajj-umrah/umrah',
      status: 'published',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إدارة برامج الحج والعمرة"
          subtitle="تعديل وتنظيم رحلات الحج والعمرة والخدمات الدينية"
          align="start"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        <table className="w-full text-right text-xs">
          <thead className="bg-sand/60 border-b border-border text-text-secondary font-bold">
            <tr>
              <th className="p-3.5">عنوان البرنامج</th>
              <th className="p-3.5">التصنيف</th>
              <th className="p-3.5">المدة المتوقعة</th>
              <th className="p-3.5">الحالة</th>
              <th className="p-3.5 text-left">معاينة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {religiousPrograms.map((prog) => (
              <tr key={prog.id} className="hover:bg-sand/20 transition-colors">
                <td className="p-3.5 font-bold text-text-primary">{prog.titleAr}</td>
                <td className="p-3.5 text-text-secondary">{prog.category}</td>
                <td className="p-3.5 text-text-muted">{prog.duration}</td>
                <td className="p-3.5">
                  <Badge variant="gold">نشط ومتاح (Published)</Badge>
                </td>
                <td className="p-3.5 text-left">
                  <a
                    href={`/ar/${prog.slug}`}
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
