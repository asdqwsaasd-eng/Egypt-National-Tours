import * as React from 'react';
import { SectionHeader, Card, CardHeader, CardContent, TextInput } from '@/components/ui';
import { COMPANY, CONTACT } from '@/lib/utils/constants';
import { Settings, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="إعدادات الموقع والاتصال الرسمية"
          subtitle="معاينة وإدارة البيانات المعتمدة لشركة إيجيبت ناشيونال تورز"
          align="start"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card variant="default" padding="lg">
            <CardHeader className="border-b border-border pb-3 mb-4">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Settings className="h-5 w-5 text-brand-red" />
                <span>البيانات الرسمية وقنوات التواصل</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextInput
                label="اسم الشركة الرسمي (Arabic)"
                defaultValue={COMPANY.name.ar}
                readOnly
                className="bg-sand/30"
              />

              <TextInput
                label="اسم الشركة (English)"
                defaultValue={COMPANY.name.en}
                readOnly
                className="bg-sand/30"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="رقم الهاتف المعلن"
                  defaultValue={CONTACT.phonePrimary}
                  leftIcon={<Phone className="h-4 w-4 text-text-muted" />}
                  readOnly
                  className="bg-sand/30 dir-ltr text-right"
                />

                <TextInput
                  label="رقم واتساب المعتمد"
                  defaultValue={`+${CONTACT.whatsapp}`}
                  leftIcon={<MessageSquare className="h-4 w-4 text-text-muted" />}
                  readOnly
                  className="bg-sand/30 dir-ltr text-right"
                />
              </div>

              <TextInput
                label="البريد الإلكتروني للإشعارات والطلبات"
                defaultValue={CONTACT.email}
                leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
                readOnly
                className="bg-sand/30 dir-ltr text-right"
              />

              <TextInput
                label="مواعيد العمل الرسمية (Sun–Thu)"
                defaultValue={CONTACT.workingHours.ar}
                leftIcon={<Clock className="h-4 w-4 text-text-muted" />}
                readOnly
                className="bg-sand/30"
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card variant="default" padding="md" className="space-y-3">
            <CardHeader className="border-b border-border pb-2">
              <h3 className="text-sm font-bold text-text-primary">
                ضوابط العمل الحاكمة
              </h3>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-text-secondary leading-relaxed">
              <p className="font-bold text-brand-red">
                - أيام العمل: الأحد إلى الخميس (من 10:30 صباحاً إلى 5:00 مساءً).
              </p>
              <p className="font-bold text-brand-red">
                - العطلة الأسبوعية: الجمعة والسبت.
              </p>
              <p className="text-text-muted pt-2 border-t border-border">
                يتم استلام طلبات العملاء إلكترونياً على مدار الساعة 24/7 ومعالجتها خلال مواعيد العمل الرسمية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
