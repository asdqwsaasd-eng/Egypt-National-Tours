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

interface TransportationRequestFormProps {
  locale: SupportedLocale;
  className?: string;
}

export const TransportationRequestForm: React.FC<TransportationRequestFormProps> = ({
  locale,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [serviceType, setServiceType] = React.useState('Airport Transfer / استقبال وتوصيل بالمطار');
  const [pickupLocation, setPickupLocation] = React.useState('');
  const [dropoffLocation, setDropoffLocation] = React.useState('');
  const [travelDate, setTravelDate] = React.useState('');
  const [travelTime, setTravelTime] = React.useState('');
  const [travelersCount, setTravelersCount] = React.useState(1);

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const serviceOptions = [
    { value: 'Airport Transfer / استقبال وتوصيل بالمطار', label: isAr ? 'انتقالات المطار (Airport Transfer)' : 'Airport Transfer' },
    { value: 'Private Vehicle / سيارة خاصة وسائق', label: isAr ? 'سيارة خاصة بسائق (Private Car with Driver)' : 'Private Car with Driver' },
    { value: 'Minibus / ميني باص', label: isAr ? 'ميني باص للمجموعات (Minibus)' : 'Group Minibus' },
    { value: 'Intercity Transfer / انتقال بين المحافظات', label: isAr ? 'انتقالات بين المدن (Intercity Transfer)' : 'Intercity Transfer' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      requestType: 'transportation',
      serviceType,
      pickupLocation,
      dropoffLocation,
      travelDate,
      travelTime: travelTime || undefined,
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
          <Select
            label={isAr ? 'نوع خدمة النقل' : 'Transportation Service Type'}
            options={serviceOptions}
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          />

          <TextInput
            label={isAr ? 'مكان الانطلاق / الاستقبال' : 'Pickup Location'}
            placeholder={isAr ? 'مثال: مطار القاهرة الدولي مبنى 3' : 'e.g., Cairo Airport Terminal 3'}
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />

          <TextInput
            label={isAr ? 'مكان التوصيل / الوصول' : 'Dropoff Location'}
            placeholder={isAr ? 'مثال: فندق في وسط البلد، القاهرة' : 'e.g., Hotel in Downtown Cairo'}
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            required
          />

          <TextInput
            type="date"
            label={isAr ? 'تاريخ الخدمة' : 'Service Date'}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />
          <TextInput
            type="time"
            label={isAr ? 'توقيت التحرك (اختياري)' : 'Pickup Time (Optional)'}
            value={travelTime}
            onChange={(e) => setTravelTime(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <NumberCounter
            label={isAr ? 'عدد الركاب' : 'Number of Passengers'}
            value={travelersCount}
            onChange={setTravelersCount}
            min={1}
            max={50}
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
            label={isAr ? 'حجم الأمتعة أو أي ملاحظات' : 'Luggage size or special notes'}
            placeholder={isAr ? 'عدد الحقائب أو تفاصيل أجهزة خاصة' : 'Number of luggage bags'}
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
          {isAr ? 'إرسال طلب خدمة النقل' : 'Submit Transportation Request'}
        </Button>
      </div>
    </form>
  );
};
