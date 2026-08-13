import * as React from 'react';
import { SectionHeader } from '@/components/ui';
import { getContactSettings } from '@/lib/db/contact-settings-repository';
import { AdminSettingsForm } from '@/components/admin/AdminSettingsForm';

export default async function AdminSettingsPage() {
  const contactSettings = await getContactSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إعدادات الموقع والاتصال الرسمية"
          subtitle="تعديل وإدارة بيانات التواصل ومواعيد العمل المعروضة على الموقع العام"
          align="start"
        />
      </div>

      <AdminSettingsForm initialSettings={contactSettings} />
    </div>
  );
}
