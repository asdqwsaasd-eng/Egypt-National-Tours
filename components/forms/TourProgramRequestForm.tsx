'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SupportedLocale } from '@/lib/i18n/config';
import { submitRequestAction } from '@/lib/actions/request-actions';
import {
  TextInput,
  Textarea,
  NumberCounter,
  Select,
  Button,
  Alert,
} from '@/components/ui';
import { User, Phone, Mail } from 'lucide-react';

interface TourProgramRequestFormProps {
  locale: SupportedLocale;
  tourSlug: string;
  tourTitle: string;
  tourType: 'egypt_tour' | 'international_tour';
  className?: string;
}

export const TourProgramRequestForm: React.FC<TourProgramRequestFormProps> = ({
  locale,
  tourSlug,
  tourTitle,
  tourType,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [travelDate, setTravelDate] = React.useState('');
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [childrenAges, setChildrenAges] = React.useState<number[]>([]);
  const [infants, setInfants] = React.useState(0);

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleChildrenChange = (newCount: number) => {
    setChildren(newCount);
    setChildrenAges((prev) => {
      if (newCount === 0) return [];
      if (newCount > prev.length) {
        const added = Array(newCount - prev.length).fill(5);
        return [...prev, ...added];
      }
      return prev.slice(0, newCount);
    });
  };

  const handleChildAgeChange = (index: number, age: number) => {
    setChildrenAges((prev) => {
      const next = [...prev];
      next[index] = age;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      requestType: tourType,
      tourSlug,
      tourTitle,
      travelDate,
      adults,
      children,
      childrenAges: children > 0 ? childrenAges : undefined,
      infants,
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

        <div className="p-4 rounded-xl bg-sand/60 border border-border space-y-1">
          <p className="text-xs text-text-muted">
            {isAr ? 'البرنامج السياحي المختار:' : 'Selected Tour Program:'}
          </p>
          <p className="text-base font-bold text-text-primary">
            {tourTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="date"
            label={isAr ? 'تاريخ السفر المطلوب' : 'Preferred Travel Date'}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 pt-2">
          <h4 className="text-base font-bold text-text-primary">
            {isAr ? 'عدد المسافرين' : 'Travelers'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <NumberCounter
              label={isAr ? 'بالغين' : 'Adults'}
              value={adults}
              onChange={setAdults}
              min={1}
              max={30}
            />
            <NumberCounter
              label={isAr ? 'أطفال' : 'Children'}
              value={children}
              onChange={handleChildrenChange}
              min={0}
              max={20}
            />
            <NumberCounter
              label={isAr ? 'رضع' : 'Infants'}
              value={infants}
              onChange={setInfants}
              min={0}
              max={10}
            />
          </div>

          {/* Task 4: Dynamic Child Age Selectors */}
          {children > 0 && (
            <div className="p-4 rounded-xl bg-sand/40 border border-border space-y-3 pt-3">
              <h5 className="text-xs font-bold text-text-primary">
                {isAr ? 'تحديد عمر كل طفل (من 0 إلى 12 سنة)' : 'Specify age for each child (0 to 12 yrs)'}
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {childrenAges.map((age, idx) => (
                  <Select
                    key={idx}
                    label={isAr ? `عمر الطفل ${idx + 1}` : `Child ${idx + 1} Age`}
                    value={String(age)}
                    onChange={(e) => handleChildAgeChange(idx, Number(e.target.value))}
                    options={Array.from({ length: 13 }, (_, i) => ({
                      value: String(i),
                      label: isAr
                        ? i === 0 ? 'أقل من سنة (0)' : `${i} سنة`
                        : i === 0 ? 'Under 1 yr (0)' : `${i} yrs`,
                    }))}
                  />
                ))}
              </div>
            </div>
          )}
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
            label={isAr ? 'ملاحظات أو تعديلات مطلوبة على الجولة' : 'Notes or requested tour modifications'}
            placeholder={isAr ? 'ترقية الفندق، تذاكر الطيران، جولات إضافية' : 'e.g., hotel upgrade, extra excursions'}
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
          {isAr ? 'إرسال طلب الحجز للجولة' : 'Submit Tour Booking Request'}
        </Button>
      </div>
    </form>
  );
};
