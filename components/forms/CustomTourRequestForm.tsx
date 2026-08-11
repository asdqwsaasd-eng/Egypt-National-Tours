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

interface CustomTourRequestFormProps {
  locale: SupportedLocale;
  className?: string;
}

export const CustomTourRequestForm: React.FC<CustomTourRequestFormProps> = ({
  locale,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [details, setDetails] = React.useState('');
  const [travelersCount, setTravelersCount] = React.useState(1);
  
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<Record<string, string[]>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setServerError(null);

    const payload = {
      requestType: 'custom_tour',
      details,
      desiredDestination: 'الخدمات الأخرى / Other Services',
      travelersCount,
      customer: {
        fullName,
        phone,
        email: email || undefined,
      },
      notes: details,
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

        {/* Task 8: Details & Number of Persons */}
        <div className="space-y-6">
          <Textarea
            label={
              isAr
                ? 'اكتب تفاصيل طلبك أو أي متطلبات خاصة'
                : 'Please describe your request or any special requirements'
            }
            placeholder={
              isAr
                ? 'اكتب هنا كل التفاصيل والمتطلبات الخاصة بك بالتفصيل...'
                : 'Share all details and special requirements here...'
            }
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            error={formErrors['details']?.[0] || formErrors['notes']?.[0]}
            rows={4}
            required
          />

          <div className="max-w-xs">
            <NumberCounter
              label={isAr ? 'عدد الأشخاص' : 'Number of Persons'}
              value={travelersCount}
              onChange={setTravelersCount}
              min={1}
              max={50}
            />
          </div>
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
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          className="shadow-md"
        >
          {isAr ? 'إرسال طلب الخدمة' : 'Submit Service Request'}
        </Button>
      </div>
    </form>
  );
};
