import * as React from 'react';
import Link from 'next/link';
import { SectionHeader, Badge, Button } from '@/components/ui';
import { Star, Info, Plus, Edit } from 'lucide-react';

export default function AdminReviewsPage() {
  const reviews = [
    {
      id: 'rev-001',
      customerName: 'محمد أحمد',
      country: 'مصر',
      rating: 5,
      comment: 'تجربة حجز طيران ممتازة وسريعة جداً. الخدمة والمتابعة تفوق التوقعات.',
      isDemo: false,
      status: 'approved',
      createdAt: '2026-08-01',
    },
    {
      id: 'rev-002',
      customerName: 'David Miller',
      country: 'المملكة المتحدة',
      rating: 5,
      comment: 'Wonderful Nile Cruise experience arranged by Egypt National Tours!',
      isDemo: false,
      status: 'approved',
      createdAt: '2026-07-28',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="إدارة آراء وتقييمات العملاء"
          subtitle="مراجعة واعتماد آراء المسافرين وتصفية التعليقات الحقيقية"
          align="start"
        />
        <Link href="/admin/reviews/new">
          <Button variant="primary" size="md" className="shadow-md">
            <Plus className="h-4 w-4 ml-1" />
            إضافة تقييم جديد
          </Button>
        </Link>
      </div>

      <div className="p-4 rounded-xl bg-sand/60 border border-brand-gold/30 text-xs text-text-secondary flex items-start gap-2">
        <Info className="h-4 w-4 text-brand-gold-dark shrink-0 mt-0.5" />
        <p>
          ملاحظة: وفقاً لضوابط المصداقية في النظام، يتم نشر التقييمات الحقيقية المعتمدة فقط على الواجهة العامة للموقع.
        </p>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        <table className="w-full text-right text-xs">
          <thead className="bg-sand/60 border-b border-border text-text-secondary font-bold">
            <tr>
              <th className="p-3.5">اسم العميل</th>
              <th className="p-3.5">الدولة</th>
              <th className="p-3.5">التقييم</th>
              <th className="p-3.5">التعليق / الرأي</th>
              <th className="p-3.5">التاريخ</th>
              <th className="p-3.5">الحالة</th>
              <th className="p-3.5 text-left">تعديل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-sand/20 transition-colors">
                <td className="p-3.5 font-bold text-text-primary">{rev.customerName}</td>
                <td className="p-3.5 text-text-secondary">{rev.country}</td>
                <td className="p-3.5">
                  <div className="flex items-center text-amber-500 font-bold gap-0.5">
                    <span>{rev.rating}</span>
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                </td>
                <td className="p-3.5 text-text-primary max-w-xs truncate">{rev.comment}</td>
                <td className="p-3.5 text-text-muted dir-ltr text-right">{rev.createdAt}</td>
                <td className="p-3.5">
                  <Badge variant="gold">معتمد ومقبول</Badge>
                </td>
                <td className="p-3.5 text-left">
                  <Link
                    href={`/admin/reviews/${rev.id}`}
                    className="p-1.5 rounded-md bg-sand/60 hover:bg-sand text-text-primary transition-colors inline-block"
                    title="تعديل"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
