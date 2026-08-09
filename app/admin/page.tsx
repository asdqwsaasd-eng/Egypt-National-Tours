import * as React from 'react';
import Link from 'next/link';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { SectionHeader, Card, CardContent } from '@/components/ui';
import { Inbox, Clock, CheckCircle2, ListFilter, ArrowLeft } from 'lucide-react';

export default async function AdminDashboardPage() {
  const dbConnected = await isDatabaseConnected();

  let counts = {
    newRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
    totalRequests: 0,
  };

  if (dbConnected) {
    try {
      const [newCount, inProgressCount, completedCount, totalCount] = await Promise.all([
        prisma.request.count({ where: { status: 'new_request' } }),
        prisma.request.count({ where: { status: 'in_progress' } }),
        prisma.request.count({ where: { status: 'completed' } }),
        prisma.request.count(),
      ]);

      counts = {
        newRequests: newCount,
        inProgressRequests: inProgressCount,
        completedRequests: completedCount,
        totalRequests: totalCount,
      };
    } catch (err) {
      console.error('[AdminDashboard] Failed to fetch counts:', err);
    }
  }

  const statCards = [
    {
      title: 'طلبات جديدة (New)',
      value: counts.newRequests,
      icon: Inbox,
      bg: 'bg-brand-red/10',
      textColor: 'text-brand-red',
    },
    {
      title: 'قيد المتابعة (In Progress)',
      value: counts.inProgressRequests,
      icon: Clock,
      bg: 'bg-amber-500/10',
      textColor: 'text-amber-600',
    },
    {
      title: 'طلبات مكتملة (Completed)',
      value: counts.completedRequests,
      icon: CheckCircle2,
      bg: 'bg-emerald-500/10',
      textColor: 'text-emerald-600',
    },
    {
      title: 'إجمالي الطلبات (Total)',
      value: counts.totalRequests,
      icon: ListFilter,
      bg: 'bg-brand-gold-light',
      textColor: 'text-brand-red',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <SectionHeader
          title="لوحة الإدارة والإحصائيات"
          subtitle="متابعة حالة طلبات العملاء وإدارة محتوى الموقع والخدمات"
          align="start"
        />
      </div>

      {!dbConnected && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-semibold">
          ملاحظة: قاعدة البيانات غير متصلة محلياً. يتم استخدام وضع المعاينة الآمن للإدارة.
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} variant="default" padding="md">
              <CardContent className="p-0 flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-secondary font-medium">{card.title}</p>
                  <p className="text-3xl font-extrabold text-text-primary mt-1 font-mono">
                    {card.value}
                  </p>
                </div>
                <div className={`h-12 w-12 rounded-full ${card.bg} ${card.textColor} flex items-center justify-center`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white p-6 rounded-[var(--radius-card)] border border-border space-y-4">
        <h3 className="text-lg font-bold text-text-primary">
          روابط ومهام سريعة
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/requests"
            className="p-4 rounded-xl bg-sand/40 border border-border hover:border-brand-red transition-all flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-text-primary group-hover:text-brand-red transition-colors">
                عرض وفتح طلبات العملاء
              </p>
              <p className="text-xs text-text-secondary">
                متابعة الحالات، إضافة الملاحظات، وتحديث حالة الطلب
              </p>
            </div>
            <ArrowLeft className="h-5 w-5 text-text-muted group-hover:text-brand-red transition-colors" />
          </Link>

          <Link
            href="/admin/services"
            className="p-4 rounded-xl bg-sand/40 border border-border hover:border-brand-red transition-all flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-text-primary group-hover:text-brand-red transition-colors">
                إدارة الخدمات والرحلات
              </p>
              <p className="text-xs text-text-secondary">
                إضافة وتعديل البرامج السياحية والتأشيرات والخدمات
              </p>
            </div>
            <ArrowLeft className="h-5 w-5 text-text-muted group-hover:text-brand-red transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
