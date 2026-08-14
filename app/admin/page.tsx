import * as React from 'react';
import Link from 'next/link';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { SectionHeader, Card, CardContent, Badge } from '@/components/ui';
import {
  Inbox,
  Clock,
  CheckCircle2,
  ListFilter,
  ArrowLeft,
  Compass,
  Moon,
  MessageSquarePlus,
  Settings,
  Eye,
  Activity,
} from 'lucide-react';
import { RequestStatus } from '@prisma/client';
import '@/app/globals.css';

export default async function AdminDashboardPage() {
  const dbConnected = await isDatabaseConnected();

  let counts = {
    newRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
    totalRequests: 0,
  };

  let recentRequests: Array<{
    id: string;
    reference: string;
    customerName: string;
    customerPhone: string;
    serviceTitle: string;
    createdAt: Date;
    status: RequestStatus;
  }> = [];

  if (dbConnected && prisma) {
    try {
      const [newCount, inProgressCount, completedCount, totalCount, recentList] = await Promise.all([
        prisma.request.count({ where: { status: 'new_request' } }),
        prisma.request.count({ where: { status: 'in_progress' } }),
        prisma.request.count({ where: { status: 'completed' } }),
        prisma.request.count(),
        prisma.request.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { customer: true, service: true },
        }),
      ]);

      counts = {
        newRequests: newCount,
        inProgressRequests: inProgressCount,
        completedRequests: completedCount,
        totalRequests: totalCount,
      };

      recentRequests = recentList.map((r) => ({
        id: r.id,
        reference: r.reference,
        customerName: r.customer.fullName,
        customerPhone: r.customer.phone,
        serviceTitle: r.service.titleAr || r.requestType,
        createdAt: r.createdAt,
        status: r.status,
      }));
    } catch (err) {
      console.error('[AdminDashboard] Failed to fetch data:', err);
    }
  }

  const statCards = [
    {
      title: 'طلبات جديدة',
      value: counts.newRequests,
      icon: Inbox,
      bg: 'bg-red-50 text-red-600 border border-red-200',
    },
    {
      title: 'قيد المتابعة',
      value: counts.inProgressRequests,
      icon: Clock,
      bg: 'bg-amber-50 text-amber-600 border border-amber-200',
    },
    {
      title: 'طلبات مكتملة',
      value: counts.completedRequests,
      icon: CheckCircle2,
      bg: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    },
    {
      title: 'إجمالي الطلبات',
      value: counts.totalRequests,
      icon: ListFilter,
      bg: 'bg-brand-gold-light/60 text-brand-red border border-brand-gold/30',
    },
  ];

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

  const quickActions = [
    {
      title: 'عرض الطلبات',
      desc: 'متابعة وتحديث كافة طلبات الحجز والاستفسارات الواردة',
      href: '/admin/requests',
      icon: Inbox,
      color: 'text-brand-red',
    },
    {
      title: 'إضافة برنامج سياحي',
      desc: 'إنشاء برنامج سياحي جديد وتحديد المزارات والوجهات',
      href: '/admin/tours/new',
      icon: Compass,
      color: 'text-brand-gold-dark',
    },
    {
      title: 'إدارة الحج والعمرة',
      desc: 'تحديث تفاصيل وباقات رحلات الحج والعمرة المتاحة',
      href: '/admin/hajj-umrah',
      icon: Moon,
      color: 'text-emerald-600',
    },
    {
      title: 'إضافة رأي عميل',
      desc: 'إضافة شهادات وتوصيات المسافرين واعتمادها بالموقع',
      href: '/admin/reviews/new',
      icon: MessageSquarePlus,
      color: 'text-sky-600',
    },
    {
      title: 'إعدادات الموقع',
      desc: 'تحديث بيانات الاتصال وأرقام الهواتف وعنوان الشركة',
      href: '/admin/settings',
      icon: Settings,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Section */}
      <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border shadow-xs space-y-1">
        <h1 className="text-2xl font-extrabold text-brand-red flex items-center gap-2">
          <Activity className="h-6 w-6 text-brand-red" />
          <span>مرحباً Hossam</span>
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary font-medium">
          إليك ملخص نشاط موقع Egypt National Tours وإدارة الطلبات والخدمات
        </p>
      </div>

      {!dbConnected && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
          ملاحظة: يتم عرض وضع المعايرة المحلية (Offline Mode).
        </div>
      )}

      {/* ─── 1. Four Modern Statistics Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} variant="default" padding="md" className="hover:shadow-md transition-shadow">
              <CardContent className="p-0 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary font-extrabold">{card.title}</p>
                  <p className="text-3xl font-extrabold text-text-primary font-mono">
                    {card.value}
                  </p>
                </div>
                <div className={`h-12 w-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ─── 2. Latest Requests Table / Card ─── */}
      <div className="bg-white rounded-[var(--radius-card)] border border-border shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between bg-sand/20">
          <h3 className="text-base font-extrabold text-text-primary">
            أحدث الطلبات
          </h3>
          <Link
            href="/admin/requests"
            className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
          >
            <span>عرض جميع الطلبات</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="p-8 text-center text-xs text-text-muted">
            لا توجد طلبات سابقة في قاعدة البيانات.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-sand/40 border-b border-border text-text-secondary font-bold">
                <tr>
                  <th className="p-4">الرقم المرجعي</th>
                  <th className="p-4">اسم العميل</th>
                  <th className="p-4">نوع الخدمة</th>
                  <th className="p-4">تاريخ الطلب</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-left">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-sand/20 transition-colors">
                    <td className="p-4 font-mono font-extrabold text-brand-red text-sm">
                      {item.reference}
                    </td>
                    <td className="p-4 font-bold text-text-primary">
                      {item.customerName}
                    </td>
                    <td className="p-4 text-text-secondary font-medium">
                      {item.serviceTitle}
                    </td>
                    <td className="p-4 text-text-muted dir-ltr text-right">
                      {new Date(item.createdAt).toLocaleDateString('ar-EG', {
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
        )}
      </div>

      {/* ─── 3. Quick Actions Cards ─── */}
      <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-text-primary flex items-center gap-2">
          <span>إجراءات سريعة</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => {
            const ActionIcon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="p-4 rounded-xl bg-sand/30 border border-border hover:border-brand-red hover:bg-sand/60 transition-all flex items-start justify-between group"
              >
                <div className="space-y-1 pl-2">
                  <div className="flex items-center gap-2">
                    <ActionIcon className={`h-4 w-4 ${action.color}`} />
                    <p className="font-extrabold text-sm text-text-primary group-hover:text-brand-red transition-colors">
                      {action.title}
                    </p>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {action.desc}
                  </p>
                </div>
                <ArrowLeft className="h-4 w-4 text-text-muted group-hover:text-brand-red transition-colors shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
