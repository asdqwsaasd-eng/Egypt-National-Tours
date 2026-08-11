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
import { User, Phone, Mail, ChevronDown, Check } from 'lucide-react';

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
  const [childrenAges, setChildrenAges] = React.useState<number[]>([]);

  // Task 3: Multi-select hotel category (3, 4, 5 stars)
  const [starRatings, setStarRatings] = React.useState<number[]>([5]);
  const [isStarDropdownOpen, setIsStarDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Decision 003: Meal Plan
  const [mealPlan, setMealPlan] = React.useState<string>('breakfast');

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<Record<string, string[]>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Close star dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const toggleStarRating = (star: number) => {
    setStarRatings((prev) => {
      if (prev.includes(star)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((s) => s !== star);
      } else {
        return [...prev, star].sort((a, b) => a - b);
      }
    });
  };

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
      childrenAges: children > 0 ? childrenAges : undefined,
      starRatings,
      starRating: starRatings[0] || 5, // Backward compatibility
      mealPlan,
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

  const starOptions = [
    { value: 3, label: isAr ? '3 نجوم (3 Stars)' : '3 Stars' },
    { value: 4, label: isAr ? '4 نجوم (4 Stars)' : '4 Stars' },
    { value: 5, label: isAr ? '5 نجوم (5 Stars)' : '5 Stars' },
  ];

  const mealPlanOptions = [
    { value: 'room_only', label: isAr ? 'بدون وجبات (Room Only)' : 'Room Only' },
    { value: 'breakfast', label: isAr ? 'إفطار (Breakfast)' : 'Breakfast' },
    { value: 'half_board', label: isAr ? 'إفطار وعشاء (Half Board)' : 'Half Board' },
    { value: 'soft_all_inclusive', label: isAr ? 'سوفت أول إنكلوسف (Soft All Inclusive)' : 'Soft All Inclusive' },
  ];

  const selectedStarsText = starRatings.length === 0
    ? (isAr ? 'اختر الفئة' : 'Select Category')
    : starRatings.map((s) => (isAr ? `${s} نجوم` : `${s} Stars`)).join(' ، ');

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
            placeholder={isAr ? 'شرم الشيخ – إسطنبول – دبي – لندن' : 'Sharm El Sheikh – Istanbul – Dubai – London'}
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
          {/* Task 3: Multi-Select Hotel Category */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-bold text-text-primary mb-1">
              {isAr ? 'فئة الفندق (يمكن اختيار أكثر من فئة)' : 'Hotel Category (Multi-select)'}
            </label>
            <button
              type="button"
              onClick={() => setIsStarDropdownOpen(!isStarDropdownOpen)}
              className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary flex items-center justify-between transition-colors hover:border-brand-red"
            >
              <span className="truncate">{selectedStarsText}</span>
              <ChevronDown className="h-4 w-4 text-text-muted shrink-0" />
            </button>

            {isStarDropdownOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-border rounded-lg shadow-lg p-2 space-y-1">
                {starOptions.map((opt) => {
                  const isChecked = starRatings.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleStarRating(opt.value)}
                      className={`w-full flex items-center justify-between p-2 rounded.md text-xs font-semibold transition-colors ${
                        isChecked
                          ? 'bg-brand-gold-light/40 text-brand-red'
                          : 'hover:bg-sand/40 text-text-primary'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <div
                        className={`h-4 w-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-border'
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {formErrors['starRatings']?.[0] && (
              <p className="text-xs text-error mt-1">{formErrors['starRatings'][0]}</p>
            )}
          </div>

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
              onChange={handleChildrenChange}
              min={0}
              max={10}
            />
          </div>

          {/* Task 4: Dynamic Child Age Selectors */}
          {children > 0 && (
            <div className="p-4 rounded-xl bg-sand/40 border border-border space-y-3 pt-3">
              <h5 className="text-xs font-bold text-text-primary">
                {isAr ? 'تحديد أوراق وعمر كل طفل (من 0 إلى 12 سنة)' : 'Specify age for each child (0 to 12 yrs)'}
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
            label={isAr ? 'طلبات إضافية أو ملاحظات؟' : 'Special requests or notes?'}
            placeholder={isAr ? 'مثال: غرفة مطلة، أسرّة منفصلة' : 'e.g., sea view, twin beds'}
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
