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
  whatsapp: "00201063314240",
  whatsappLink: "https://wa.me/201063314240",
  phonePrimary: "0020224052937",
  phoneSecondary: "0020222637554",
  email: "egypt_nationaltours@yahoo.com",
  facebook: "https://www.facebook.com/EgyptNationalTours/",
  googleMaps: "https://share.google/x5xQDEnwcpAnw4NPq",
  address: {
    en: "152 El Tawfik Buildings, El Tayaran Street, Nasr City, Cairo, Egypt",
    ar: "152 عمارات التوفيق، شارع الطيران، مدينة نصر، القاهرة، مصر",
  },
  workingHours: {
    en: "Sunday – Thursday: 10:30 AM – 5:00 PM",
    ar: "الأحد – الخميس: 10:30 صباحاً – 5:00 مساءً",
  },
  offDays: {
    en: "Friday & Saturday: Closed",
    ar: "الجمعة والسبت: مغلق",
  },
} as const;

/** Request reference number prefix */
export const REQUEST_REFERENCE_PREFIX = "ENT";

/** Default notification recipient */
export const NOTIFICATION_EMAIL = "egypt_nationaltours@yahoo.com";
