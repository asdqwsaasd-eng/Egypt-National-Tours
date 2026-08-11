'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SupportedLocale } from '@/lib/i18n/config';
import { submitRequestAction } from '@/lib/actions/request-actions';
import {
  TextInput,
  Textarea,
  RadioGroup,
  NumberCounter,
  Select,
  Button,
  Alert,
} from '@/components/ui';
import { Plus, Trash2, User, Phone, Mail } from 'lucide-react';

interface FlightSegment {
  from: string;
  to: string;
  departureDate: string;
}

interface FlightRequestFormProps {
  locale: SupportedLocale;
  className?: string;
}

export const FlightRequestForm: React.FC<FlightRequestFormProps> = ({
  locale,
  className,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [tripType, setTripType] = React.useState<'one_way' | 'round_trip' | 'multi_city'>('round_trip');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [departureDate, setDepartureDate] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');
  const [segments, setSegments] = React.useState<FlightSegment[]>([
    { from: '', to: '', departureDate: '' },
    { from: '', to: '', departureDate: '' },
  ]);

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [childrenAges, setChildrenAges] = React.useState<number[]>([]);
  const [infants, setInfants] = React.useState(0);

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<Record<string, string[]>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleAddSegment = () => {
    setSegments((prev) => [...prev, { from: '', to: '', departureDate: '' }]);
  };

  const handleRemoveSegment = (index: number) => {
    if (segments.length <= 2) return;
    setSegments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSegmentChange = (index: number, field: keyof FlightSegment, value: string) => {
    setSegments((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

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
    setFormErrors({});
    setServerError(null);

    const payload = {
      requestType: 'flight',
      tripType,
      from: tripType !== 'multi_city' ? from : undefined,
      to: tripType !== 'multi_city' ? to : undefined,
      departureDate: tripType !== 'multi_city' ? departureDate : undefined,
      returnDate: tripType === 'round_trip' ? returnDate : undefined,
      segments: tripType === 'multi_city' ? segments : undefined,
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
      if (res.errors) {
        setFormErrors(res.errors);
      }
      setServerError(res.message || (isAr ? 'حدث خطأ أثناء إرسال الطلب' : 'Failed to submit request'));
    }
  };

  const tripTypeOptions = [
    { value: 'one_way', label: isAr ? 'ذهاب فقط' : 'One Way' },
    { value: 'round_trip', label: isAr ? 'ذهاب وعودة' : 'Round Trip' },
    { value: 'multi_city', label: isAr ? 'وجهات متعددة (Multi-City)' : 'Multi-City' },
  ];

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="bg-white p-6 sm:p-8 rounded-[var(--radius-card)] border border-border shadow-sm space-y-8">
        {serverError && (
          <Alert variant="error" dismissible onDismiss={() => setServerError(null)}>
            {serverError}
          </Alert>
        )}

        {/* Trip Type Selector */}
        <div className="space-y-3">
          <RadioGroup
            name="tripType"
            label={isAr ? 'نوع الرحلة' : 'Trip Type'}
            options={tripTypeOptions}
            value={tripType}
            onChange={(val) => setTripType(val as any)}
            direction="horizontal"
          />
        </div>

        {/* Standard Flight Fields (One Way / Round Trip) */}
        {tripType !== 'multi_city' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label={isAr ? 'من (مطار/مدينة المغادرة)' : 'From (Origin)'}
              placeholder={isAr ? 'مثال: القاهرة (CAI)' : 'e.g., Cairo (CAI)'}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              error={formErrors['from']?.[0]}
              required
            />
            <TextInput
              label={isAr ? 'إلى (مطار/مدينة الوصول)' : 'To (Destination)'}
              placeholder={isAr ? 'مثال: دبي (DXB)' : 'e.g., Dubai (DXB)'}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              error={formErrors['to']?.[0]}
              required
            />
            <TextInput
              type="date"
              label={isAr ? 'تاريخ المغادرة' : 'Departure Date'}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              error={formErrors['departureDate']?.[0]}
              required
            />
            {tripType === 'round_trip' && (
              <TextInput
                type="date"
                label={isAr ? 'تاريخ العودة' : 'Return Date'}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                error={formErrors['returnDate']?.[0]}
                required
              />
            )}
          </div>
        )}

        {/* Multi-City Flight Segments */}
        {tripType === 'multi_city' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-text-primary">
                {isAr ? 'قطاعات الطيران (Multi-City)' : 'Flight Segments'}
              </h4>
              {formErrors['segments'] && (
                <p className="text-xs text-error">{formErrors['segments'][0]}</p>
              )}
            </div>

            {segments.map((seg, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-sand/40 border border-border relative flex flex-col md:flex-row items-end gap-4"
              >
                <span className="h-7 w-7 rounded-full bg-brand-gold-light text-brand-red font-bold text-xs flex items-center justify-center shrink-0 mb-3 md:mb-[10px]">
                  {idx + 1}
                </span>

                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <TextInput
                    label={isAr ? 'من' : 'From'}
                    value={seg.from}
                    onChange={(e) => handleSegmentChange(idx, 'from', e.target.value)}
                    error={formErrors[`segments.${idx}.from`]?.[0]}
                    required
                  />
                  <TextInput
                    label={isAr ? 'إلى' : 'To'}
                    value={seg.to}
                    onChange={(e) => handleSegmentChange(idx, 'to', e.target.value)}
                    error={formErrors[`segments.${idx}.to`]?.[0]}
                    required
                  />
                  <TextInput
                    type="date"
                    label={isAr ? 'التاريخ' : 'Date'}
                    value={seg.departureDate}
                    onChange={(e) => handleSegmentChange(idx, 'departureDate', e.target.value)}
                    error={formErrors[`segments.${idx}.departureDate`]?.[0]}
                    required
                  />
                </div>

                {segments.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSegment(idx)}
                    className="text-error hover:bg-error/10 mb-1"
                    title={isAr ? 'حذف هذا القطاع' : 'Remove Segment'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddSegment}
              className="mt-2"
            >
              <Plus className="h-4 w-4 me-1" />
              <span>{isAr ? 'إضافة وجهة/قطاع طيران جديد' : 'Add Flight Segment'}</span>
            </Button>
          </div>
        )}

        {/* Passengers Stepper */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-base font-bold text-text-primary">
            {isAr ? 'عدد المسافرين' : 'Passengers'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <NumberCounter
              label={isAr ? 'بالغين (12+ سنة)' : 'Adults (12+ yrs)'}
              value={adults}
              onChange={setAdults}
              min={1}
              max={9}
            />
            <NumberCounter
              label={isAr ? 'أطفال (2-11 سنة)' : 'Children (2-11 yrs)'}
              value={children}
              onChange={handleChildrenChange}
              min={0}
              max={9}
            />
            <NumberCounter
              label={isAr ? 'رضع (أقل من سنتين)' : 'Infants (Under 2)'}
              value={infants}
              onChange={setInfants}
              min={0}
              max={9}
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

        {/* Customer Identity Fields */}
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
            label={isAr ? 'أي تفاصيل أو متطلبات إضافية؟' : 'Any additional requirements or notes?'}
            placeholder={isAr ? 'مثال: الدرجة المفضلة، درجات الأمتعة، شركة طيران محددة' : 'e.g., preferred class, baggage, specific airline'}
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
          {isAr ? 'إرسال طلب تذكرة الطيران' : 'Submit Flight Request'}
        </Button>
      </div>
    </form>
  );
};
