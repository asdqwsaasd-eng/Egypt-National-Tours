import * as React from 'react';
import Link from 'next/link';
import { getAdminRequests } from '@/lib/db/admin-repository';
import { SectionHeader, Badge, Button, Card } from '@/components/ui';
import { Search, Eye, Filter, Calendar, User, Phone, FileText } from 'lucide-react';
import { RequestStatus, RequestType } from '@prisma/client';

interface RequestsPageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
    type?: string;
  }>;
}

export default async function AdminRequestsPage({ searchParams }: RequestsPageProps) {
  const params = await searchParams;
  const search = params.q || '';
  const statusFilter = (params.status as RequestStatus) || 'all';
  const typeFilter = (params.type as RequestType) || 'all';

  const { items, totalCount, isDbConnected } = await getAdminRequests({
    search,
    status: statusFilter,
    requestType: typeFilter,
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'new_request':
        return <Badge variant="gold">طلب جديد</Badge>;
      case 'contacted':
        return <Badge variant="outline">تم التواصل</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">قيد المتابعة</Badge>;
      case 'completed':
        return <Badge variant="gold">مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-400 text-red-600 bg-red-50">ملغي</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const statusOptions = [
    { label: 'الكل (All Statuses)', value: 'all' },
    { label: 'جديد (New)', value: 'new_request' },
    { label: 'تم التواصل (Contacted)', value: 'contacted' },
    { label: 'قيد المتابعة (In Progress)', value: 'in_progress' },
    { label: 'مكتمل (Completed)', value: 'completed' },
    { label: 'ملغي (Cancelled)', value: 'cancelled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إدارة طلبات العملاء"
          subtitle={`إجمالي الطلبات المطابقة للبحث: ${totalCount}`}
          align="start"
        />
      </div>

      {!isDbConnected && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
          ملاحظة: يتم عرض وضع المعايرة المحلية (Offline Mode).
        </div>
      )}

      {/* Filter Bar Card */}
      <Card variant="default" padding="md" className="space-y-4">
        <form method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="ابحث بالرقم المرجعي (ENT-...)، الاسم، البريد، أو الهاتف..."
              className="w-full h-11 pr-10 pl-4 text-xs bg-sand/30 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-gold text-text-primary font-medium"
            />
            <Search className="h-4 w-4 text-text-muted absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              name="status"
              defaultValue={statusFilter}
              className="w-full h-11 px-3 text-xs bg-sand/30 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-gold text-text-primary font-bold"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3">
            <Button type="submit" variant="primary" size="md" fullWidth className="h-11 text-xs gap-1 font-bold">
              <Filter className="h-4 w-4" />
              <span>تطبيق التصفية</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Requests Container */}
      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        {items.length === 0 ? (
          <div className="p-12 text-center text-text-muted text-sm space-y-2">
            <FileText className="h-10 w-10 mx-auto text-text-muted/60" />
            <p className="font-bold text-text-primary">لا توجد طلبات مطابقة لمعايير البحث الحالية.</p>
            <p className="text-xs">جرب البحث بكلمات أخرى أو إعادة ضبط التصفية.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-sand/40 border-b border-border text-text-secondary font-bold">
                  <tr>
                    <th className="p-4">الرقم المرجعي</th>
                    <th className="p-4">اسم العميل والتواصل</th>
                    <th className="p-4">نوع الخدمة</th>
                    <th className="p-4">تاريخ الطلب</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-left">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-sand/20 transition-colors">
                      <td className="p-4 font-mono font-bold text-brand-red text-sm">
                        {item.reference}
                      </td>
                      <td className="p-4">
                        <p className="font-extrabold text-text-primary text-xs">{item.customerName}</p>
                        <p className="text-[11px] text-text-muted dir-ltr text-right font-mono">{item.customerPhone}</p>
                      </td>
                      <td className="p-4 font-bold text-text-secondary">
                        {item.serviceTitle}
                      </td>
                      <td className="p-4 text-text-muted dir-ltr text-right font-medium">
                        {new Date(item.createdAt).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="p-4">{getStatusBadge(item.status)}</td>
                      <td className="p-4 text-left">
                        <Link
                          href={`/admin/requests/${item.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-gold-light/60 text-brand-red font-extrabold hover:bg-brand-gold-light transition-colors text-xs border border-brand-gold/30"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>عرض التفاصيل</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (For Small Viewports) */}
            <div className="sm:hidden divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className="p-4 space-y-3 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-brand-red text-sm">
                      {item.reference}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-text-primary">
                      <User className="h-3.5 w-3.5 text-text-muted" />
                      <span>{item.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted dir-ltr text-right">
                      <Phone className="h-3.5 w-3.5 text-text-muted" />
                      <span>{item.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-secondary font-medium pt-1">
                      <FileText className="h-3.5 w-3.5 text-brand-gold-dark" />
                      <span>{item.serviceTitle}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-0.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/admin/requests/${item.id}`}
                      className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-brand-gold-light/60 text-brand-red font-extrabold text-xs border border-brand-gold/30"
                    >
                      <Eye className="h-4 w-4" />
                      <span>عرض التفاصيل والتحديث</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
