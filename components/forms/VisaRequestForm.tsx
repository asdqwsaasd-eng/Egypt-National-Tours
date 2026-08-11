'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SupportedLocale } from '@/lib/i18n/config';
import { submitRequestAction } from '@/lib/actions/request-actions';
import {
  TextInput,
  Textarea,
  Select,
  NumberCounter,
  Button,
  Alert,
} from '@/components/ui';
import { User, Phone, Mail } from 'lucide-react';

interface VisaRequestFormProps {
  locale: SupportedLocale;
  className?: string;
}

export const VisaRequestForm: React.FC<VisaRequestFormProps> = ({
  locale,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [destinationCountry, setDestinationCountry] = React.useState('Schengen / الشنغن');
  const [otherDestination, setOtherDestination] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [travelDate, setTravelDate] = React.useState('');
  const [travelersCount, setTravelersCount] = React.useState(1);

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<Record<string, string[]>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);

  const visaOptions = [
    { value: 'Schengen / الشنغن', label: isAr ? 'دول الشنغن (Schengen)' : 'Schengen Area' },
    { value: 'UK / المملكة المتحدة', label: isAr ? 'المملكة المتحدة (UK)' : 'United Kingdom' },
    { value: 'USA / الولايات المتحدة', label: isAr ? 'الولايات المتحدة (USA)' : 'United States' },
    { value: 'Saudi Arabia / السعودية', label: isAr ? 'السعودية (Saudi Arabia)' : 'Saudi Arabia' },
    { value: 'UAE / الإمارات', label: isAr ? 'دولة الإمارات (UAE)' : 'United Arab Emirates' },
    { value: 'Turkey / تركيا', label: isAr ? 'تركيا (Turkey)' : 'Turkey' },
    { value: 'Oman / سلطنة عمان', label: isAr ? 'سلطنة عمان (Oman)' : 'Oman' },
    { value: 'Qatar / قطر', label: isAr ? 'قطر (Qatar)' : 'Qatar' },
    { value: 'Bahrain / البحرين', label: isAr ? 'البحرين (Bahrain)' : 'Bahrain' },
    { value: 'China / الصين', label: isAr ? 'الصين (China)' : 'China' },
    { value: 'Japan / اليابان', label: isAr ? 'اليابان (Japan)' : 'Japan' },
    { value: 'Canada / كندا', label: isAr ? 'كندا (Canada)' : 'Canada' },
    { value: 'Thailand / تايلاند', label: isAr ? 'تايلاند (Thailand)' : 'Thailand' },
    { value: 'Vietnam / فيتنام', label: isAr ? 'فيتنام (Vietnam)' : 'Vietnam' },
    { value: 'Sri Lanka / سريلانكا', label: isAr ? 'سريلانكا (Sri Lanka)' : 'Sri Lanka' },
    { value: 'Armenia / أرمينيا', label: isAr ? 'أرمينيا (Armenia)' : 'Armenia' },
    { value: 'Georgia / جورجيا', label: isAr ? 'جورجيا (Georgia)' : 'Georgia' },
    { value: 'Morocco / المغرب', label: isAr ? 'المغرب (Morocco)' : 'Morocco' },
    { value: 'Algeria / الجزائر', label: isAr ? 'الجزائر (Algeria)' : 'Algeria' },
    { value: 'Libya / ليبيا', label: isAr ? 'ليبيا (Libya)' : 'Libya' },
    { value: 'Kenya / كينيا', label: isAr ? 'كينيا (Kenya)' : 'Kenya' },
    { value: 'Lithuania / ليتوانيا', label: isAr ? 'ليتوانيا (Lithuania)' : 'Lithuania' },
    { value: 'other', label: isAr ? 'أخرى / Other Destination' : 'Other Destination' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setServerError(null);

    const payload = {
      requestType: 'visa',
      destinationCountry: destinationCountry === 'other' ? otherDestination : destinationCountry,
      otherDestination: destinationCountry === 'other' ? otherDestination : undefined,
      nationality,
      travelDate: travelDate || undefined,
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
      if (res.errors) {
        setFormErrors(res.errors);
      }
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
          <Select
            label={isAr ? 'وجهة التأشيرة المطلوبة' : 'Visa Destination'}
            options={visaOptions}
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            required
          />

          {destinationCountry === 'other' && (
            <TextInput
              label={isAr ? 'حدد الدولة الأخرى' : 'Specify Country'}
              placeholder={isAr ? 'اسم الدولة' : 'Country name'}
              value={otherDestination}
              onChange={(e) => setOtherDestination(e.target.value)}
              required
            />
          )}

          <TextInput
            label={isAr ? 'الجنسية أو الإقامة' : 'Nationality or Residency'}
            placeholder={isAr ? 'مثال: مصري، سعودي، أردني، أو بلد الإقامة' : 'e.g., Egyptian, British, Saudi, or residence country'}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />

          <TextInput
            type="date"
            label={isAr ? 'تاريخ السفر المتوقع (اختياري)' : 'Intended Travel Date (Optional)'}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <NumberCounter
            label={isAr ? 'عدد الأفراد المتقدمين' : 'Number of Applicants'}
            value={travelersCount}
            onChange={setTravelersCount}
            min={1}
            max={20}
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
              error={formErrors['customer.fullName']?.[0]}
              required
            />
            <TextInput
              label={isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="h-4 w-4 text-text-muted" />}
              error={formErrors['customer.phone']?.[0]}
              required
            />
            <TextInput
              type="email"
              label={isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
              error={formErrors['customer.email']?.[0]}
            />
          </div>

          <Textarea
            label={isAr ? 'ملاحظات أو استفسارات إضافية' : 'Additional Notes or Inquiries'}
            placeholder={isAr ? 'تفاصيل نوع التأشيرة، السفر السابق، الملاحظات' : 'Any prior visa history or notes'}
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
          {isAr ? 'إرسال طلب التأشيرة' : 'Submit Visa Request'}
        </Button>
      </div>
    </form>
  );
};
