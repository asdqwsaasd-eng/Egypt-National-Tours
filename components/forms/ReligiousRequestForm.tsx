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

  const hajjProgramOptions = [
    { value: 'حج 5 نجوم / 5-Star Hajj', label: isAr ? 'حج 5 نجوم (5-Star Hajj)' : '5-Star Hajj' },
    { value: 'حج اقتصادي / Economy Hajj', label: isAr ? 'حج اقتصادي (Economy Hajj)' : 'Economy Hajj' },
    { value: 'حج بري / Overland Hajj', label: isAr ? 'حج بري (Overland Hajj)' : 'Overland Hajj' },
    { value: 'حج سريع / Express Hajj', label: isAr ? 'حج سريع (Express Hajj)' : 'Express Hajj' },
    { value: 'حج مباشر / Direct Hajj', label: isAr ? 'حج مباشر (Direct Hajj)' : 'Direct Hajj' },
  ];

  const [programTitle, setProgramTitle] = React.useState(
    defaultTitle || (isHajj ? 'حج 5 نجوم / 5-Star Hajj' : (isAr ? 'برنامج العمرة' : 'Umrah Program'))
  );
  const [preferredMonth, setPreferredMonth] = React.useState('');
  const [performedHajjBefore, setPerformedHajjBefore] = React.useState<'yes' | 'no' | ''>('');

  const [travelersCount, setTravelersCount] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [childrenAges, setChildrenAges] = React.useState<number[]>([]);

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [hajjFieldError, setHajjFieldError] = React.useState<string | null>(null);

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

    if (isHajj && !performedHajjBefore) {
      setHajjFieldError(isAr ? 'يرجى تحديد الإجابة (هل سبق لك أداء مناسك الحج؟)' : 'Please answer: Have you performed Hajj before?');
      return;
    }

    setHajjFieldError(null);
    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      requestType: programType,
      programTitle,
      preferredMonth: !isHajj ? (preferredMonth || undefined) : undefined,
      performedHajjBefore: isHajj ? performedHajjBefore : undefined,
      hasPerformedHajjBefore: isHajj ? (performedHajjBefore === 'yes') : undefined,
      travelersCount,
      children: !isHajj ? children : undefined,
      childrenAges: !isHajj && children > 0 ? childrenAges : undefined,
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
          {isHajj ? (
            <Select
              label={isAr ? 'نوع برنامج الحج المطلوب' : 'Selected Hajj Package'}
              options={hajjProgramOptions}
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
              required
            />
          ) : (
            <TextInput
              label={isAr ? 'البرنامج المطلوب' : 'Selected Umrah Package'}
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
              required
            />
          )}

          {isHajj ? (
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-text-primary">
                {isAr ? 'هل سبق لك أداء مناسك الحج؟' : 'Have you performed Hajj before?'} <span className="text-brand-red">*</span>
              </label>
              <div className="flex items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-text-primary">
                  <input
                    type="radio"
                    name="performedHajjBefore"
                    value="yes"
                    checked={performedHajjBefore === 'yes'}
                    onChange={() => {
                      setPerformedHajjBefore('yes');
                      setHajjFieldError(null);
                    }}
                    className="h-4 w-4 text-brand-red focus:ring-brand-red border-border"
                  />
                  <span>{isAr ? 'نعم' : 'Yes'}</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-text-primary">
                  <input
                    type="radio"
                    name="performedHajjBefore"
                    value="no"
                    checked={performedHajjBefore === 'no'}
                    onChange={() => {
                      setPerformedHajjBefore('no');
                      setHajjFieldError(null);
                    }}
                    className="h-4 w-4 text-brand-red focus:ring-brand-red border-border"
                  />
                  <span>{isAr ? 'لا' : 'No'}</span>
                </label>
              </div>
              {hajjFieldError && (
                <p className="text-xs font-semibold text-brand-red mt-1">{hajjFieldError}</p>
              )}
            </div>
          ) : (
            <TextInput
              label={isAr ? 'الموسم / الشهر المفضل' : 'Preferred Departure Month'}
              placeholder={isAr ? 'مثال: رجب، شعبان، رمضان، أو شهر محدد' : 'e.g., Ramadan, October'}
              value={preferredMonth}
              onChange={(e) => setPreferredMonth(e.target.value)}
            />
          )}
        </div>

        <div className="space-y-4 pt-2">
          <div className={`grid grid-cols-1 ${!isHajj ? 'sm:grid-cols-2' : ''} gap-6`}>
            <NumberCounter
              label={isHajj ? (isAr ? 'عدد الحجاج' : 'Number of Hajjis') : (isAr ? 'عدد البالغين / المعتمرين' : 'Number of Adult Pilgrims')}
              value={travelersCount}
              onChange={setTravelersCount}
              min={1}
              max={30}
            />
            {!isHajj && (
              <NumberCounter
                label={isAr ? 'عدد الأطفال' : 'Children'}
                value={children}
                onChange={handleChildrenChange}
                min={0}
                max={20}
              />
            )}
          </div>

          {/* Child Age Selectors for Umrah */}
          {!isHajj && children > 0 && (
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
