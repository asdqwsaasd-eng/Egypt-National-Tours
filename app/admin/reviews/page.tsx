import * as React from 'react';
import Link from 'next/link';
import { SectionHeader, Badge, Button } from '@/components/ui';
import { FEATURED_REVIEWS, ReviewItem } from '@/lib/data/reviews';
import { Star, Plus, Edit, User, MapPin } from 'lucide-react';

export default function AdminReviewsPage() {
  const reviews = FEATURED_REVIEWS.map((rev: ReviewItem) => ({
    id: rev.id,
    customerName: rev.customerName,
    country: rev.country?.ar || 'عام',
    rating: rev.rating,
    comment: rev.reviewText.ar,
    status: 'approved',
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="إدارة آراء وتقييمات العملاء"
          subtitle={`إجمالي تقييمات العملاء المعتمدة: ${reviews.length} تقييم`}
          align="start"
        />
        <Link href="/admin/reviews/new">
          <Button variant="primary" size="md" className="shadow-md gap-1 font-bold">
            <Plus className="h-4 w-4" />
            <span>إضافة تقييم جديد</span>
          </Button>
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-sand/40 border-b border-border text-text-secondary font-bold">
              <tr>
                <th className="p-4">اسم العميل</th>
                <th className="p-4">الموقع / الدولة</th>
                <th className="p-4">التقييم</th>
                <th className="p-4">محتوى الرأي والشهادة</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-left">تعديل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-sand/20 transition-colors">
                  <td className="p-4 font-extrabold text-text-primary text-xs">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-brand-red shrink-0" />
                      <span>{rev.customerName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-text-muted" />
                      {rev.country}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-amber-500 font-bold gap-1">
                      <span>{rev.rating}</span>
                      <div className="flex items-center">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-text-primary font-medium max-w-sm leading-relaxed">
                    "{rev.comment}"
                  </td>
                  <td className="p-4">
                    <Badge variant="gold">معتمد ومقبول (Approved)</Badge>
                  </td>
                  <td className="p-4 text-left">
                    <Link
                      href={`/admin/reviews/${rev.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sand/60 hover:bg-sand text-text-primary font-bold transition-colors text-xs border border-border"
                      title="تعديل التقييم"
                    >
                      <Edit className="h-3.5 w-3.5 text-brand-red" />
                      <span>تعديل</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden divide-y divide-border">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-text-primary text-xs flex items-center gap-1">
                  <User className="h-4 w-4 text-brand-red" />
                  <span>{rev.customerName}</span>
                </span>
                <Badge variant="gold">معتمد</Badge>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-text-muted">{rev.country}</span>
                <span className="text-text-muted opacity-40">•</span>
                <div className="flex items-center text-amber-500 font-bold gap-1">
                  <span>{rev.rating}</span>
                  <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                </div>
              </div>

              <p className="text-xs text-text-secondary italic">"{rev.comment}"</p>

              <div className="pt-2">
                <Link
                  href={`/admin/reviews/${rev.id}`}
                  className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-sand/40 border border-border text-text-primary text-xs font-bold"
                >
                  <Edit className="h-3.5 w-3.5 text-brand-red" />
                  <span>تعديل التقييم</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
