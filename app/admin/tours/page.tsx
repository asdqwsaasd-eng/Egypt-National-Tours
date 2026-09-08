import * as React from 'react';
import Link from 'next/link';
import { getAllAdminTours } from '@/lib/db/tours-repository';
import { SectionHeader, Badge, Button, Card } from '@/components/ui';
import { Plus, Edit, Eye, Compass, MapPin, Clock, Filter } from 'lucide-react';

interface AdminToursPageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export default async function AdminToursPage({ searchParams }: AdminToursPageProps) {
  const params = await searchParams;
  const statusFilter = params.status || 'all';

  const { tours, totalCount, isDbConnected } = await getAllAdminTours(statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="gold">منشور (Published)</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50 font-extrabold">مسودة (Draft)</Badge>;
      case 'archived':
        return <Badge variant="outline" className="border-red-400 text-red-600 bg-red-50">مؤرشف (Archived)</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات (All Statuses)' },
    { value: 'published', label: 'المنشور (Published)' },
    { value: 'draft', label: 'المسودات (Drafts)' },
    { value: 'archived', label: 'المؤرشف (Archived)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="إدارة البرامج والرحلات السياحية"
          subtitle={`إجمالي البرامج المسجلة بالنظام: ${totalCount} برنامج سياحي`}
          align="start"
        />
        <Link href="/admin/tours/new">
          <Button variant="primary" size="md" className="shadow-md gap-1 font-bold">
            <Plus className="h-4 w-4" />
            <span>إضافة برنامج جديد</span>
          </Button>
        </Link>
      </div>

      {!isDbConnected && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
          ملاحظة: يتم عرض وضع المعايرة المحلية (Offline Mode).
        </div>
      )}

      {/* Filter Bar */}
      <Card variant="default" padding="md" className="flex items-center justify-between gap-4">
        <form method="GET" className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-text-muted" />
            <span className="text-xs font-bold text-text-primary">التصفية بالحالة:</span>
          </div>
          <select
            name="status"
            defaultValue={statusFilter}
            className="h-10 px-3 text-xs bg-sand/30 border border-border rounded-xl focus:outline-hidden text-text-primary font-bold"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Button type="submit" variant="secondary" size="sm" className="h-10 text-xs px-4">
            تصفية
          </Button>
        </form>
      </Card>

      {/* Desktop Table View */}
      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        {tours.length === 0 ? (
          <div className="p-12 text-center text-text-muted text-xs font-bold">
            لا توجد برامج سياحية مطابقة للتصفية الحالية.
          </div>
        ) : (
          <>
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
                  {tours.map((tour) => {
                    const isEgypt = tour.tourType === 'egypt';
                    const categoryLabel = isEgypt ? 'السياحة الداخلية (مصر)' : 'السياحة الخارجية';
                    const categoryKey = isEgypt ? 'egypt-tours' : 'international-tours';
                    const badgeVariant = isEgypt ? ('gold' as const) : ('outline' as const);

                    return (
                      <tr key={tour.id} className="hover:bg-sand/20 transition-colors">
                        <td className="p-4 font-extrabold text-text-primary text-xs">
                          <div className="flex items-center gap-2">
                            <Compass className="h-4 w-4 text-brand-red shrink-0" />
                            <span>{tour.titleAr}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-text-secondary">
                          <Badge variant={badgeVariant}>{categoryLabel}</Badge>
                        </td>
                        <td className="p-4 text-text-muted font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {tour.durationTextAr || 'غير محدد'}
                          </span>
                        </td>
                        <td className="p-4 text-text-primary font-medium">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-brand-gold-dark" />
                            {tour.destinationsAr.length > 0 ? tour.destinationsAr.join('، ') : '—'}
                          </span>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(tour.status)}
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

                            {tour.status === 'published' && (
                              <a
                                href={`/ar/${categoryKey}/${tour.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sand/40 hover:bg-sand text-text-muted hover:text-brand-red transition-colors text-xs border border-border"
                                title="معاينة بالموقع"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>معاينة</span>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden divide-y divide-border">
              {tours.map((tour) => {
                const isEgypt = tour.tourType === 'egypt';
                const categoryLabel = isEgypt ? 'السياحة الداخلية (مصر)' : 'السياحة الخارجية';
                const categoryKey = isEgypt ? 'egypt-tours' : 'international-tours';
                const badgeVariant = isEgypt ? ('gold' as const) : ('outline' as const);

                return (
                  <div key={tour.id} className="p-4 space-y-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-text-primary text-xs flex items-center gap-1.5">
                        <Compass className="h-4 w-4 text-brand-red shrink-0" />
                        <span>{tour.titleAr}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant={badgeVariant}>{categoryLabel}</Badge>
                        {getStatusBadge(tour.status)}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-text-secondary">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        <span>المدة: {tour.durationTextAr || 'غير محدد'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-primary">
                        <MapPin className="h-3.5 w-3.5 text-brand-gold-dark" />
                        <span>الوجهات: {tour.destinationsAr.length > 0 ? tour.destinationsAr.join('، ') : '—'}</span>
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
                      {tour.status === 'published' && (
                        <a
                          href={`/ar/${categoryKey}/${tour.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-sand/40 border border-border text-text-secondary text-xs font-bold"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
