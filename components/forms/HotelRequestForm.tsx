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

interface HotelRequestFormProps {
  locale: SupportedLocale;
  className?: string;
}

export const HotelRequestForm: React.FC<HotelRequestFormProps> = ({
  locale,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [destination, setDestination] = React.useState('');
  const [hotelName, setHotelName] = React.useState('');
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [rooms, setRooms] = React.useState(1);
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);

  // Decision 002: ONLY 3, 4, 5 Stars
  const [starRating, setStarRating] = React.useState<number>(5);

  // Decision 003: ONLY Room Only, Breakfast, Half Board, Soft All Inclusive
  const [mealPlan, setMealPlan] = React.useState<string>('breakfast');

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
      requestType: 'hotel',
      destination,
      hotelName,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
      starRating: Number(starRating),
      mealPlan,
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

  const starOptions = [
    { value: '3', label: isAr ? '3 نجوم (3 Stars)' : '3 Stars' },
    { value: '4', label: isAr ? '4 نجوم (4 Stars)' : '4 Stars' },
    { value: '5', label: isAr ? '5 نجوم (5 Stars)' : '5 Stars' },
  ];

  const mealPlanOptions = [
    { value: 'room_only', label: isAr ? 'بدون وجبات (Room Only)' : 'Room Only' },
    { value: 'breakfast', label: isAr ? 'إفطار (Breakfast)' : 'Breakfast' },
    { value: 'half_board', label: isAr ? 'إفطار وعشاء (Half Board)' : 'Half Board' },
    { value: 'soft_all_inclusive', label: isAr ? 'سوفت أول إنكلوسف (Soft All Inclusive)' : 'Soft All Inclusive' },
  ];

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
            label={isAr ? 'الوجهة / المدينة' : 'Destination / City'}
            placeholder={isAr ? 'مثال: شرم الشيخ، القاهرة، الأقصر' : 'e.g., Sharm El Sheikh, Cairo'}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            error={formErrors['destination']?.[0]}
            required
          />
          <TextInput
            label={isAr ? 'اسم فندق محدد (اختياري)' : 'Specific Hotel Name (Optional)'}
            placeholder={isAr ? 'اسم الفندق إن وجد' : 'Hotel name if preferred'}
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
          <TextInput
            type="date"
            label={isAr ? 'تاريخ الوصول (Check-in)' : 'Check-in Date'}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            error={formErrors['checkIn']?.[0]}
            required
          />
          <TextInput
            type="date"
            label={isAr ? 'تاريخ المغادرة (Check-out)' : 'Check-out Date'}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            error={formErrors['checkOut']?.[0]}
            required
          />
        </div>

        {/* Category & Meal Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label={isAr ? 'فئة الفندق' : 'Hotel Category'}
            options={starOptions}
            value={String(starRating)}
            onChange={(e) => setStarRating(Number(e.target.value))}
            error={formErrors['starRating']?.[0]}
            required
          />
          <Select
            label={isAr ? 'نظام الوجبات' : 'Meal Plan'}
            options={mealPlanOptions}
            value={mealPlan}
            onChange={(e) => setMealPlan(e.target.value)}
            error={formErrors['mealPlan']?.[0]}
            required
          />
        </div>

        {/* Rooms & Guests */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-base font-bold text-text-primary">
            {isAr ? 'عدد الغرف والنزلاء' : 'Rooms & Guests'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <NumberCounter
              label={isAr ? 'عدد الغرف' : 'Rooms'}
              value={rooms}
              onChange={setRooms}
              min={1}
              max={10}
            />
            <NumberCounter
              label={isAr ? 'عدد البالغين' : 'Adults'}
              value={adults}
              onChange={setAdults}
              min={1}
              max={20}
            />
            <NumberCounter
              label={isAr ? 'عدد الأطفال' : 'Children'}
              value={children}
              onChange={setChildren}
              min={0}
              max={10}
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
              label={isAr ? 'البريد الإلكتروني' : 'Email Address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
              error={formErrors['customer.email']?.[0]}
              required
            />
          </div>

          <Textarea
            label={isAr ? 'طلبات إضافية أو ملاحظات؟' : 'Special requests or notes?'}
            placeholder={isAr ? 'مثال: غرفة مطلة، أسرّة منفصلة، تفاصيل أعمار الأطفال' : 'e.g., sea view, twin beds, children ages'}
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
          {isAr ? 'إرسال طلب حجز الفندق' : 'Submit Hotel Request'}
        </Button>
      </div>
    </form>
  );
};
