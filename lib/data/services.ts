import { SupportedLocale } from '@/lib/i18n/config';

export interface ServiceCategory {
  id: string;
  slug: string;
  title: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  iconName: string;
  href: string;
  group: 'travel' | 'egypt_international' | 'visas' | 'religious' | 'ground';
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'flights',
    slug: 'flights',
    title: { ar: 'تذاكر الطيران', en: 'Flight Tickets' },
    description: {
      ar: 'خدمات إحجاز وتنسيق تذاكر الطيران الداخلي والدولي لأفضل الوجهات.',
      en: 'Domestic and international flight ticketing assistance and flight arrangements.',
    },
    iconName: 'Plane',
    href: '/services/flights',
    group: 'travel',
  },
  {
    id: 'hotels',
    slug: 'hotels',
    title: { ar: 'حجز الفنادق', en: 'Hotel Reservations' },
    description: {
      ar: 'حجوزات إقامة في أرقى الفنادق والمنتجعات بفئات 3 و4 و5 نجوم.',
      en: 'Hotel reservation services across 3, 4, and 5-star hotels and luxury resorts.',
    },
    iconName: 'Building2',
    href: '/services/hotels',
    group: 'travel',
  },
  {
    id: 'egypt_tours',
    slug: 'egypt-tours',
    title: { ar: 'برامج سياحية في مصر', en: 'Egypt Tours' },
    description: {
      ar: 'جولات متكاملة تشمل القاهرة، الأقصر، أسوان، النيل، وشرم الشيخ.',
      en: 'Comprehensive tour programs covering Cairo, Luxor, Aswan, Nile Cruises, and Sharm El Sheikh.',
    },
    iconName: 'Pyramid',
    href: '/egypt-tours',
    group: 'egypt_international',
  },
  {
    id: 'international_tours',
    slug: 'international-tours',
    title: { ar: 'السياحة الدولية', en: 'International Tours' },
    description: {
      ar: 'رحلات وبرامج سياحية مخصصة لوجهات مميزة حول العالم.',
      en: 'Customized international tour packages to top global destinations.',
    },
    iconName: 'Globe',
    href: '/international-tours',
    group: 'egypt_international',
  },
  {
    id: 'visas',
    slug: 'visas',
    title: { ar: 'خدمات التأشيرات', en: 'Visa Services' },
    description: {
      ar: 'مساعدة واستشارات في تقديم طلبات التأشيرات للعديد من الدول.',
      en: 'Assistance and advisory for visa applications to various worldwide destinations.',
    },
    iconName: 'FileCheck',
    href: '/services/visas',
    group: 'visas',
  },
  {
    id: 'security_approvals',
    slug: 'security-approvals',
    title: { ar: 'الموافقات الأمنية', en: 'Security Approvals' },
    description: {
      ar: 'متابعة وإجراءات الحصول على الموافقات الأمنية للدخول إلى مصر.',
      en: 'Assistance with security clearance procedures for entering Egypt.',
    },
    iconName: 'ShieldCheck',
    href: '/services/security-approvals',
    group: 'visas',
  },
  {
    id: 'hajj',
    slug: 'hajj',
    title: { ar: 'الحج', en: 'Hajj Packages' },
    description: {
      ar: 'برامج حج متميزة وخدمات متكاملة للحجاج بأسعار تنافسية.',
      en: 'Premium Hajj programs and comprehensive pilgrim care services.',
    },
    iconName: 'Compass',
    href: '/hajj-umrah/hajj',
    group: 'religious',
  },
  {
    id: 'umrah',
    slug: 'umrah',
    title: { ar: 'العمرة', en: 'Umrah Packages' },
    description: {
      ar: 'رحلات عمرة طوال العام بتسهيلات وإقامة مريحة في مكة والمدينة.',
      en: 'Year-round Umrah packages with comfortable accommodations in Makkah and Madinah.',
    },
    iconName: 'Moon',
    href: '/hajj-umrah/umrah',
    group: 'religious',
  },
  {
    id: 'transportation',
    slug: 'transportation',
    title: { ar: 'النقل السياحي', en: 'Tourist Transportation' },
    description: {
      ar: 'تأمين انتقالات وسيارات وحافلات سياحية حديثة ومكيفة.',
      en: 'Tourist transfers and air-conditioned private vehicle and bus arrangements.',
    },
    iconName: 'Bus',
    href: '/services/transportation',
    group: 'ground',
  },
  {
    id: 'custom_tours',
    slug: 'custom-tours',
    title: { ar: 'البرامج السياحية الخاصة', en: 'Custom Tours' },
    description: {
      ar: 'تصميم برنامج سياحي خاص مصمم خصيصًا حسب رغبتك وميزانيتك.',
      en: 'Customized itinerary creation tailored to your exact travel preferences.',
    },
    iconName: 'Sparkles',
    href: '/services/custom-tours',
    group: 'egypt_international',
  },
];
