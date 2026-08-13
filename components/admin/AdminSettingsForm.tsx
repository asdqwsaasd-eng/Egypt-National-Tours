'use client';

import * as React from 'react';
import { updateContactSettingsAction } from '@/lib/actions/contact-settings-actions';
import { ContactSettingsData } from '@/lib/db/contact-settings-repository';
import { TextInput, Button, Alert, Card, CardHeader, CardContent } from '@/components/ui';
import { Phone, Mail, Clock, MessageSquare, MapPin, Save, Globe } from 'lucide-react';

interface AdminSettingsFormProps {
  initialSettings: ContactSettingsData;
}

export const AdminSettingsForm: React.FC<AdminSettingsFormProps> = ({ initialSettings }) => {
  const [formData, setFormData] = React.useState<ContactSettingsData>(initialSettings);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleChange = (field: keyof ContactSettingsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);

    const res = await updateContactSettingsAction(formData);
    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage(res.message || 'تم حفظ البيانات بنجاح');
    } else {
      setErrorMessage(res.error || 'فشل تحديث البيانات');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {statusMessage && (
        <Alert variant="success" dismissible onDismiss={() => setStatusMessage(null)}>
          {statusMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="error" dismissible onDismiss={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {/* ─── 1. PHONES & WHATSAPP ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Phone className="h-5 w-5 text-brand-red" />
            <span>أرقام الهواتف والواتساب</span>
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="رقم واتساب المعتمد (WhatsApp)"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              leftIcon={<MessageSquare className="h-4 w-4 text-[#25D366]" />}
              required
              className="dir-ltr text-right font-medium"
            />
            <TextInput
              label="الهاتف الأرضي/الرئيسي (Primary Phone)"
              value={formData.phonePrimary}
              onChange={(e) => handleChange('phonePrimary', e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-brand-red" />}
              required
              className="dir-ltr text-right font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextInput
              label="الهاتف الأرضي الثانوي (Secondary)"
              value={formData.phoneSecondary}
              onChange={(e) => handleChange('phoneSecondary', e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-text-muted" />}
              className="dir-ltr text-right"
            />
            <TextInput
              label="رقم الموبايل 1 (Mobile 1)"
              value={formData.mobile1}
              onChange={(e) => handleChange('mobile1', e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-text-muted" />}
              className="dir-ltr text-right"
            />
            <TextInput
              label="رقم الموبايل 2 (Mobile 2)"
              value={formData.mobile2}
              onChange={(e) => handleChange('mobile2', e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-text-muted" />}
              className="dir-ltr text-right"
            />
          </div>
        </CardContent>
      </Card>

      {/* ─── 2. EMAILS ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-red" />
            <span>البريد الإلكتروني للإشعارات والاتصال</span>
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              type="email"
              label="البريد الإلكتروني الثانوي/الاستلام (Yahoo)"
              value={formData.secondaryEmail}
              onChange={(e) => handleChange('secondaryEmail', e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-brand-red" />}
              className="dir-ltr text-right"
              hint="البريد المعروض أعلى القائمة والمستخدم لإشعارات الطلبات"
            />
            <TextInput
              type="email"
              label="البريد الإلكتروني الرسمي (Domain Email)"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-brand-red" />}
              required
              className="dir-ltr text-right"
              hint="بريد الدومين الرسمي المعروض أسفل القائمة"
            />
          </div>
        </CardContent>
      </Card>

      {/* ─── 3. ADDRESS & WORKING HOURS ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-gold" />
            <span>العنوان ومواعيد العمل بالمكتب</span>
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="عنوان المكتب بالعربية (Arabic Address)"
              value={formData.addressAr}
              onChange={(e) => handleChange('addressAr', e.target.value)}
              leftIcon={<MapPin className="h-4 w-4 text-brand-red" />}
            />
            <TextInput
              label="عنوان المكتب بالإنجليزية (English Address)"
              value={formData.addressEn}
              onChange={(e) => handleChange('addressEn', e.target.value)}
              leftIcon={<MapPin className="h-4 w-4 text-brand-red" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="ساعات العمل بالعربية (Sunday–Thursday)"
              value={formData.workingHoursAr}
              onChange={(e) => handleChange('workingHoursAr', e.target.value)}
              leftIcon={<Clock className="h-4 w-4 text-text-muted" />}
            />
            <TextInput
              label="Working Hours in English"
              value={formData.workingHoursEn}
              onChange={(e) => handleChange('workingHoursEn', e.target.value)}
              leftIcon={<Clock className="h-4 w-4 text-text-muted" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="العطلة الأسبوعية بالعربية (Friday & Saturday)"
              value={formData.offDaysAr}
              onChange={(e) => handleChange('offDaysAr', e.target.value)}
              leftIcon={<Clock className="h-4 w-4 text-brand-red" />}
            />
            <TextInput
              label="Off Days Wording in English"
              value={formData.offDaysEn}
              onChange={(e) => handleChange('offDaysEn', e.target.value)}
              leftIcon={<Clock className="h-4 w-4 text-brand-red" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <TextInput
              label="رابط صفحة فيسبوك الرسمية"
              value={formData.facebookUrl}
              onChange={(e) => handleChange('facebookUrl', e.target.value)}
              leftIcon={<Globe className="h-4 w-4 text-[#1877F2]" />}
              className="dir-ltr text-right text-xs"
            />
            <TextInput
              label="رابط موقع الشركة في خرائط جوجل"
              value={formData.googleMapsUrl}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              leftIcon={<Globe className="h-4 w-4 text-brand-red" />}
              className="dir-ltr text-right text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Action Bar */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="shadow-lg px-8 gap-2"
        >
          <Save className="h-5 w-5" />
          <span>حفظ وتحديث الإعدادات</span>
        </Button>
      </div>
    </form>
  );
};
