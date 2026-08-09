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

  const [desiredDestination, setDesiredDestination] = React.useState('');
  const [travelDate, setTravelDate] = React.useState('');
  const [travelersCount, setTravelersCount] = React.useState(1);
  const [durationDays, setDurationDays] = React.useState('');
  const [tripStyle, setTripStyle] = React.useState('');
  const [hotelPreference, setHotelPreference] = React.useState('');
  
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

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
      desiredDestination,
      travelDate,
      travelersCount,
      durationDays,
      tripStyle,
      hotelPreference,
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
          <TextInput
            label={isAr ? 'الوجهة أو المدن المطلوبة' : 'Desired Destination / Program'}
            placeholder={isAr ? 'مثال: القاهرة والأقصر وأسوان، أو دبي' : 'e.g., Cairo, Luxor, Aswan, or Dubai'}
            value={desiredDestination}
            onChange={(e) => setDesiredDestination(e.target.value)}
            error={formErrors['desiredDestination']?.[0]}
            required
          />
          <TextInput
            type="date"
            label={isAr ? 'تاريخ السفر التقريبي' : 'Approximate Travel Date'}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            error={formErrors['travelDate']?.[0]}
            required
          />
          <TextInput
            label={isAr ? 'مدة الرحلة بالتقريب (أيام)' : 'Trip Duration (Days)'}
            placeholder={isAr ? 'مثال: 7 أيام' : 'e.g., 7 Days'}
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
          />
          <TextInput
            label={isAr ? 'نمط الرحلة المفضّل (اختياري)' : 'Trip Style (Optional)'}
            placeholder={isAr ? 'مثال: عائلي، استرخاء، مغامرة، ثقافي' : 'e.g., Family, Cultural, Leisure'}
            value={tripStyle}
            onChange={(e) => setTripStyle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <NumberCounter
            label={isAr ? 'عدد المسافرين' : 'Number of Travelers'}
            value={travelersCount}
            onChange={setTravelersCount}
            min={1}
            max={50}
          />
          <TextInput
            label={isAr ? 'تفصيل الفنادق المفضلة (اختياري)' : 'Hotel Preference (Optional)'}
            placeholder={isAr ? 'مثال: 4 نجوم أو 5 نجوم على النيل' : 'e.g., 5-star Nile view'}
            value={hotelPreference}
            onChange={(e) => setHotelPreference(e.target.value)}
          />
        </div>

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
              label={isAr ? 'البريد الإلكتروني' : 'Email Address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
              error={formErrors['customer.email']?.[0]}
              required
            />
          </div>

          <Textarea
            label={isAr ? 'تفاصيل ورغبات إضافية' : 'Additional Notes or Preferences'}
            placeholder={isAr ? 'اكتب أي متطلبات خاصة أو المزارات المفضلة' : 'Share any special requests or places you wish to visit'}
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
          {isAr ? 'إرسال طلب البرنامج الخاص' : 'Submit Custom Tour Request'}
        </Button>
      </div>
    </form>
  );
};
