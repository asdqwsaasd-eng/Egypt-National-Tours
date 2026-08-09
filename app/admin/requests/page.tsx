import * as React from 'react';
import Link from 'next/link';
import { getAdminRequests } from '@/lib/db/admin-repository';
import { SectionHeader, Badge, Button, Card } from '@/components/ui';
import { Search, Eye, Filter } from 'lucide-react';
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
    { label: 'الكل (All)', value: 'all' },
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
          subtitle={`إجمالي الطلبات المطابقة: ${totalCount}`}
          align="start"
        />
      </div>

      {!isDbConnected && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-semibold">
          ملاحظة: يتم عرض نموذج عينات الطلبات المعينة آلياً (Offline Preview Mode).
        </div>
      )}

      {/* Filter Bar */}
      <Card variant="default" padding="md" className="space-y-4">
        <form method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="ابحث بالرقم المرجعي (ENT-...)، الاسم، البريد، أو الهاتف..."
              className="w-full h-10 pr-9 pl-4 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand-gold text-text-primary"
            />
            <Search className="h-4 w-4 text-text-muted absolute right-3 top-3 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              name="status"
              defaultValue={statusFilter}
              className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand-gold text-text-primary"
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
            <Button type="submit" variant="primary" size="md" fullWidth className="h-10 text-xs">
              <Filter className="h-4 w-4 ml-1" />
              تطبيق التصفية
            </Button>
          </div>
        </form>
      </Card>

      {/* Requests Table */}
      <div className="bg-white rounded-[var(--radius-card)] border border-border overflow-hidden shadow-xs">
        {items.length === 0 ? (
          <div className="p-12 text-center text-text-muted text-sm">
            لا توجد طلبات مطابقة لمعايير البحث الحالية.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-sand/60 border-b border-border text-text-secondary font-bold">
                <tr>
                  <th className="p-3.5">الرقم المرجعي</th>
                  <th className="p-3.5">اسم العميل</th>
                  <th className="p-3.5">نوع الخدمة</th>
                  <th className="p-3.5">تاريخ الطلب</th>
                  <th className="p-3.5">الحالة</th>
                  <th className="p-3.5 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-sand/20 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-brand-red">
                      {item.reference}
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-text-primary">{item.customerName}</p>
                      <p className="text-[11px] text-text-muted dir-ltr text-right">{item.customerPhone}</p>
                    </td>
                    <td className="p-3.5 font-medium text-text-primary">
                      {item.serviceTitle}
                    </td>
                    <td className="p-3.5 text-text-secondary dir-ltr text-right">
                      {new Date(item.createdAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="p-3.5">{getStatusBadge(item.status)}</td>
                    <td className="p-3.5 text-left">
                      <Link
                        href={`/admin/requests/${item.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-brand-gold-light/60 text-brand-red font-bold hover:bg-brand-gold-light transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>تفاصيل</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
