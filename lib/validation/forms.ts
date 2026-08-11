import { z } from 'zod';
import {
  HOTEL_STAR_RATINGS,
  REQUEST_TYPES,
  SUPPORTED_LOCALES,
} from './schemas';

export const customerInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'الاسم يجب أن يتكون من حرفين على الأقل / Name must be at least 2 characters' })
    .max(100),
  phone: z
    .string()
    .min(6, { message: 'رقم الهاتف/الواتساب غير صحيح / Invalid phone or WhatsApp number' })
    .max(30),
  email: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'البريد الإلكتروني غير صحيح / Invalid email address',
    })
    .or(z.literal('')),
  whatsapp: z.string().optional(),
});

export type CustomerInfoInput = z.infer<typeof customerInfoSchema>;

// ─── Flight Request Schema ───
export const flightSegmentSchema = z.object({
  from: z.string().min(2, { message: 'مدينة المغادرة مطلوبة / Origin is required' }),
  to: z.string().min(2, { message: 'وجهة الوصول مطلوبة / Destination is required' }),
  departureDate: z.string().min(1, { message: 'تاريخ المغادرة مطلوب / Departure date is required' }),
});

export const flightRequestSchema = z
  .object({
    requestType: z.literal('flight'),
    tripType: z.enum(['one_way', 'round_trip', 'multi_city']),
    from: z.string().optional(),
    to: z.string().optional(),
    departureDate: z.string().optional(),
    returnDate: z.string().optional(),
    segments: z.array(flightSegmentSchema).optional(),
    adults: z.number().int().min(1, { message: 'عدد البالغين يجب أن يكون 1 على الأقل / Adults must be at least 1' }),
    children: z.number().int().min(0).default(0),
    childrenAges: z.array(z.number().int().min(0).max(12)).optional(),
    infants: z.number().int().min(0).default(0),
    customer: customerInfoSchema,
    notes: z.string().optional(),
    locale: z.enum(['ar', 'en']).default('ar'),
  })
  .superRefine((data, ctx) => {
    if (data.tripType === 'one_way' || data.tripType === 'round_trip') {
      if (!data.from || data.from.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['from'],
          message: 'مدينة المغادرة مطلوبة / Origin is required',
        });
      }
      if (!data.to || data.to.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['to'],
          message: 'وجهة الوصول مطلوبة / Destination is required',
        });
      }
      if (!data.departureDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['departureDate'],
          message: 'تاريخ المغادرة مطلوب / Departure date is required',
        });
      }
    }

    if (data.tripType === 'round_trip') {
      if (!data.returnDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['returnDate'],
          message: 'تاريخ العودة مطلوب لرحلات الذهاب والعودة / Return date is required for round trips',
        });
      }
    }

    if (data.tripType === 'multi_city') {
      if (!data.segments || data.segments.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['segments'],
          message: 'رحلات الوجهات المتعددة تتطلب قطاعين على الأقل / Multi-City requires at least 2 flight segments',
        });
      }
    }
  });

export type FlightRequestInput = z.infer<typeof flightRequestSchema>;

// ─── Hotel Request Schema ───
export const hotelRequestSchema = z.object({
  requestType: z.literal('hotel'),
  destination: z.string().min(2, { message: 'الوجهة أو المدينة مطلوبة / Destination is required' }),
  hotelName: z.string().optional(),
  checkIn: z.string().min(1, { message: 'تاريخ الوصول مطلوب / Check-in date is required' }),
  checkOut: z.string().min(1, { message: 'تاريخ المغادرة مطلوب / Check-out date is required' }),
  rooms: z.number().int().min(1, { message: 'عدد الغرف 1 على الأقل / Rooms must be at least 1' }).default(1),
  adults: z.number().int().min(1, { message: 'عدد البالغين 1 على الأقل / Adults must be at least 1' }).default(1),
  children: z.number().int().min(0).default(0),
  childrenAges: z.array(z.number().int().min(0).max(12)).optional(),
  starRatings: z
    .array(z.number().refine((val) => HOTEL_STAR_RATINGS.includes(val as 3 | 4 | 5), {
      message: 'فئة الفندق يجب أن تكون 3 أو 4 أو 5 نجوم فقط / Hotel category must be 3, 4, or 5 stars only',
    }))
    .min(1, { message: 'يرجى اختيار فئة فندق واحدة على الأقل / Select at least one hotel category' })
    .optional(),
  starRating: z.number().optional(),
  mealPlan: z.enum(['room_only', 'breakfast', 'half_board', 'soft_all_inclusive']),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type HotelRequestInput = z.infer<typeof hotelRequestSchema>;

// ─── Custom Tour / Other Services Request Schema ───
export const customTourRequestSchema = z.object({
  requestType: z.literal('custom_tour'),
  details: z.string().min(5, { message: 'يرجى كتابة تفاصيل الطلب (5 أحرف على الأقل) / Please describe your request (at least 5 chars)' }).optional(),
  desiredDestination: z.string().optional().default('الخدمات الأخرى / Other Services'),
  travelDate: z.string().optional(),
  travelersCount: z.number().int().min(1).default(1),
  durationDays: z.string().optional(),
  tripStyle: z.string().optional(),
  hotelPreference: z.string().optional(),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type CustomTourRequestInput = z.infer<typeof customTourRequestSchema>;

// ─── Visa Request Schema ───
export const visaRequestSchema = z.object({
  requestType: z.literal('visa'),
  destinationCountry: z.string().min(2, { message: 'دولة التأشيرة مطلوبة / Visa destination is required' }),
  otherDestination: z.string().optional(),
  nationality: z.string().min(2, { message: 'الجنسية مطلوبة / Nationality is required' }),
  travelDate: z.string().optional(),
  travelersCount: z.number().int().min(1).default(1),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type VisaRequestInput = z.infer<typeof visaRequestSchema>;

// ─── Security Approval Schema ───
export const securityApprovalRequestSchema = z.object({
  requestType: z.literal('security_approval'),
  nationality: z.string().min(2, { message: 'الجنسية مطلوبة / Nationality is required' }),
  countryOfResidence: z.string().min(2, { message: 'بلد الإقامة مطلوب / Residence country is required' }),
  intendedTravelDate: z.string().optional(),
  travelersCount: z.number().int().min(1).default(1),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type SecurityApprovalRequestInput = z.infer<typeof securityApprovalRequestSchema>;

// ─── Transportation Request Schema ───
export const transportationRequestSchema = z.object({
  requestType: z.literal('transportation'),
  serviceType: z.string().min(2, { message: 'نوع خدمة النقل مطلوب / Service type is required' }),
  pickupLocation: z.string().min(2, { message: 'نقطة التحرك مطلوبة / Pickup location is required' }),
  dropoffLocation: z.string().min(2, { message: 'نقطة الوصول مطلوبة / Dropoff location is required' }),
  travelDate: z.string().min(1, { message: 'التاريخ مطلوب / Date is required' }),
  travelTime: z.string().optional(),
  travelersCount: z.number().int().min(1).default(1),
  bagsCount: z.number().int().min(0).default(0).optional(),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type TransportationRequestInput = z.infer<typeof transportationRequestSchema>;

// ─── Hajj & Umrah Request Schema ───
export const religiousRequestSchema = z.object({
  requestType: z.enum(['hajj', 'umrah']),
  programTitle: z.string().min(2, { message: 'اسم البرنامج مطلوب / Program title is required' }),
  travelersCount: z.number().int().min(1).default(1),
  children: z.number().int().min(0).default(0).optional(),
  childrenAges: z.array(z.number().int().min(0).max(12)).optional(),
  preferredMonth: z.string().optional(),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type ReligiousRequestInput = z.infer<typeof religiousRequestSchema>;

// ─── Tour Program Request Schema ───
export const tourProgramRequestSchema = z.object({
  requestType: z.enum(['egypt_tour', 'international_tour']),
  tourSlug: z.string().min(1),
  tourTitle: z.string().min(1),
  travelDate: z.string().min(1, { message: 'تاريخ السفر مطلوب / Travel date is required' }),
  adults: z.number().int().min(1).default(1),
  children: z.number().int().min(0).default(0),
  childrenAges: z.array(z.number().int().min(0).max(12)).optional(),
  infants: z.number().int().min(0).default(0),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type TourProgramRequestInput = z.infer<typeof tourProgramRequestSchema>;

// ─── General Inquiry Request Schema ───
export const generalRequestSchema = z.object({
  requestType: z.enum(REQUEST_TYPES),
  selectedService: z.string().min(1, { message: 'الخدمة مطلوبة / Service selection is required' }),
  customer: customerInfoSchema,
  notes: z.string().optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

export type GeneralRequestInput = z.infer<typeof generalRequestSchema>;

// ─── Unified Request Union Schema ───
export const unifiedRequestSchema = z.discriminatedUnion('requestType', [
  flightRequestSchema,
  hotelRequestSchema,
  customTourRequestSchema,
  visaRequestSchema,
  securityApprovalRequestSchema,
  transportationRequestSchema,
  religiousRequestSchema,
  tourProgramRequestSchema,
  generalRequestSchema,
]);

export type UnifiedRequestInput = z.infer<typeof unifiedRequestSchema>;
