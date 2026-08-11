'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SupportedLocale } from '@/lib/i18n/config';
import { submitRequestAction } from '@/lib/actions/request-actions';
import {
  TextInput,
  Textarea,
  NumberCounter,
  Button,
  Alert,
} from '@/components/ui';
import { User, Phone, Mail } from 'lucide-react';

interface SecurityApprovalRequestFormProps {
  locale: SupportedLocale;
  className?: string;
}

export const SecurityApprovalRequestForm: React.FC<SecurityApprovalRequestFormProps> = ({
  locale,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [nationality, setNationality] = React.useState('');
  const [countryOfResidence, setCountryOfResidence] = React.useState('');
  const [intendedTravelDate, setIntendedTravelDate] = React.useState('');
  const [travelersCount, setTravelersCount] = React.useState(1);

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      requestType: 'security_approval',
      nationality,
      countryOfResidence,
      intendedTravelDate: intendedTravelDate || undefined,
      travelersCount,
      customer: {
        fullName,
        phone,
        email: email || undefined,
      },
      notes,
      locale,
    };

    const res = await submitRequestAction(payload);
    setIsSubmitting(false);

    if (res.success && res.reference) {
      router.push(`/${locale}/request/success/${res.reference}`);
    } else {
      setServerError(res.message || (isAr ? 'حدث خطأ أثناء إرسال الطلب' : 'Failed to submit request'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="bg-white p-6 sm:p-8 rounded-[var(--radius-card)] border border-border shadow-sm space-y-8">
        {serverError && (
          <Alert variant="error" dismissible onDismiss={() => setServerError(null)}>
            {serverError}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label={isAr ? 'الجنسية كما في جواز السفر' : 'Passport Nationality'}
            placeholder={isAr ? 'مثال: يمني، سوري، سوداني، عراقي' : 'e.g., Yemeni, Syrian, Sudanese'}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />

          <TextInput
            label={isAr ? 'بلد الإقامة الحالي' : 'Current Country of Residence'}
            placeholder={isAr ? 'مثال: الإمارات، السعودية، ألمانيا' : 'e.g., UAE, Saudi Arabia, Germany'}
            value={countryOfResidence}
            onChange={(e) => setCountryOfResidence(e.target.value)}
            required
          />

          <TextInput
            type="date"
            label={isAr ? 'تاريخ السفر المتوقع لمصر' : 'Intended Travel Date to Egypt'}
            value={intendedTravelDate}
            onChange={(e) => setIntendedTravelDate(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <NumberCounter
            label={isAr ? 'عدد المسافرين المطلوبة لهم موافقة' : 'Number of Travelers'}
            value={travelersCount}
            onChange={setTravelersCount}
            min={1}
            max={30}
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-base font-bold text-text-primary">
            {isAr ? 'بيانات التواصل' : 'Contact Information'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              label={isAr ? 'الاسم الكامل' : 'Full Name'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="h-4 w-4 text-text-muted" />}
              required
            />
            <TextInput
              label={isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-text-muted" />}
              required
            />
            <TextInput
              type="email"
              label={isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
            />
          </div>

          <Textarea
            label={isAr ? 'ملاحظات وتفاصيل إضافية' : 'Additional Information or Notes'}
            placeholder={isAr ? 'أي تفاصيل تخص كروت الزيارة أو سبب الزيارة' : 'Reason for visit or special notes'}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          className="shadow-md"
        >
          {isAr ? 'إرسال طلب الموافقة الأمنية' : 'Submit Security Clearance Request'}
        </Button>
      </div>
    </form>
  );
};
