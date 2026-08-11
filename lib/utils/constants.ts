/**
 * Company-wide constants centralized from project documentation.
 * These are the ONLY approved company facts.
 * DO NOT invent additional business information.
 */

export const COMPANY = {
  name: {
    en: "Egypt National Tours",
    ar: "إيجيبت ناشيونال تورز",
  },
  tagline: {
    en: "Discover the Charm of Egypt",
    ar: "اكتشف سحر مصر",
  },
  license: {
    en: "Licensed since 1990 in Egypt & USA",
    ar: "مرخصة منذ عام 1990 في مصر والولايات المتحدة",
  },
} as const;

export const CONTACT = {
  whatsapp: "+20 106 331 4240",
  whatsappRaw: "201063314240",
  whatsappLink: "https://wa.me/201063314240",
  phonePrimary: "+20 2 2405 2937",
  phonePrimaryRaw: "+20224052937",
  phoneSecondary: "+20 2 2263 7554",
  phoneSecondaryRaw: "+20222637554",
  mobile1: "+20 100 189 8414",
  mobile1Raw: "+201001898414",
  mobile2: "+20 107 045 6186",
  mobile2Raw: "+201070456186",
  email: "travel@egyptnationaltours.com",
  secondaryEmail: "egypt_nationaltours@yahoo.com",
  facebook: "https://www.facebook.com/EgyptNationalTours/",
  googleMaps: "https://share.google/x5xQDEnwcpAnw4NPq",
  address: {
    en: "152 El Tawfik Buildings, El Tayaran Street, Nasr City, Cairo, Egypt",
    ar: "152 عمارات التوفيق، شارع الطيران، مدينة نصر، القاهرة، مصر",
  },
  workingHoursHeader: {
    en: "Office Working Hours",
    ar: "ساعات العمل بالمكتب",
  },
  workingHours: {
    en: "Sunday – Thursday: 10:30 AM – 5:00 PM",
    ar: "الأحد – الخميس: 10:30 صباحاً – 5:00 مساءً",
  },
  offDays: {
    en: "Friday & Saturday: Online",
    ar: "الجمعة والسبت: أونلاين",
  },
} as const;

/** Request reference number prefix */
export const REQUEST_REFERENCE_PREFIX = "ENT";

/** Default notification recipient */
export const NOTIFICATION_EMAIL = "egypt_nationaltours@yahoo.com";
