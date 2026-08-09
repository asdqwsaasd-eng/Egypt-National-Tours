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

interface ReligiousRequestFormProps {
  locale: SupportedLocale;
  programType: 'hajj' | 'umrah';
  defaultTitle?: string;
  className?: string;
}

export const ReligiousRequestForm: React.FC<ReligiousRequestFormProps> = ({
  locale,
  programType,
  defaultTitle,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';
  const isHajj = programType === 'hajj';

  const [programTitle, setProgramTitle] = React.useState(
    defaultTitle || (isHajj ? (isAr ? 'برنامج الحج المبارك' : 'Hajj Pilgrimage Program') : (isAr ? 'برنامج العمرة' : 'Umrah Program'))
  );
  const [preferredMonth, setPreferredMonth] = React.useState('');
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
      requestType: programType,
      programTitle,
      preferredMonth: preferredMonth || undefined,
      travelersCount,
      customer: {
        fullName,
        phone,
        email,
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
            label={isHajj ? (isAr ? 'البرنامج المطلوب' : 'Selected Hajj Package') : (isAr ? 'البرنامج المطلوب' : 'Selected Umrah Package')}
            value={programTitle}
            onChange={(e) => setProgramTitle(e.target.value)}
            required
          />

          <TextInput
            label={isAr ? 'الموسم / الشهر المفضل' : 'Preferred Departure Month'}
            placeholder={isAr ? 'مثال: رجب، شعبان، رمضان، أو شهر محدد' : 'e.g., Ramadan, October'}
            value={preferredMonth}
            onChange={(e) => setPreferredMonth(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <NumberCounter
            label={isAr ? 'عدد الحجاج / المعتمرين' : 'Number of Pilgrims'}
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
              label={isAr ? 'البريد الإلكتروني' : 'Email Address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
              required
            />
          </div>

          <Textarea
            label={isAr ? 'أي متطلبات سكنية أو صحية خاصة؟' : 'Special accommodation or assistance needs?'}
            placeholder={isAr ? 'غرف ثنائية، كراسي متحركة، الإقامة بالقرب من الحرم' : 'e.g., wheelchair assistance, double rooms'}
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
          {isHajj
            ? isAr ? 'إرسال طلب برنامج الحج' : 'Submit Hajj Registration Request'
            : isAr ? 'إرسال طلب برنامج العمرة' : 'Submit Umrah Booking Request'}
        </Button>
      </div>
    </form>
  );
};
