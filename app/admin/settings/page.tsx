import * as React from 'react';
import { SectionHeader, Card, CardHeader, CardContent, Button } from '@/components/ui';
import { getContactSettings } from '@/lib/db/contact-settings-repository';
import { AdminSettingsForm } from '@/components/admin/AdminSettingsForm';
import { ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';

export default async function AdminSettingsPage() {
  const contactSettings = await getContactSettings();
  const isMaintenanceActive = process.env.MAINTENANCE_MODE === 'true';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إعدادات الموقع والاتصال الرسمية"
          subtitle="تعديل وإدارة بيانات التواصل ومواعيد العمل وحالة وضع الصيانة"
          align="start"
        />
      </div>

      {/* ─── MAINTENANCE MODE STATUS CARD ─── */}
      <Card variant="default" padding="lg" className="border-border/80">
        <CardHeader className="border-b border-border pb-3 mb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            {isMaintenanceActive ? (
              <ShieldAlert className="h-5 w-5 text-amber-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            )}
            <h3 className="text-base font-bold text-text-primary">
              حالة وضع الصيانة (Maintenance Mode)
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isMaintenanceActive
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isMaintenanceActive ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
              }`}
            />
            {isMaintenanceActive ? 'وضع الصيانة مفعل (ACTIVE)' : 'الموقع متاح للزوار (ONLINE)'}
          </span>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-text-secondary">
          <p>
            {isMaintenanceActive
              ? 'الموقع العام محجوب حالياً وتظهر صفحة الصيانة (503) للزوار مع روابط التواصل. لوحة الإدارة تعمل بالكامل دون أي قيود.'
              : 'الموقع متاح للجمهور والزوار بصورة طبيعية. لتفعيل وضع الصيانة، قم بتعيين المتغير MAINTENANCE_MODE=true في إعدادات Vercel Environment Variables.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/admin/maintenance-preview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sand/60 hover:bg-sand border border-border text-xs font-semibold text-text-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>معاينة صفحة الصيانة (Preview Maintenance Page)</span>
            </a>
            <span className="text-xs text-text-muted">
              المتغير في Vercel: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">MAINTENANCE_MODE=true</code>
            </span>
          </div>
        </CardContent>
      </Card>

      <AdminSettingsForm initialSettings={contactSettings} />
    </div>
  );
}
