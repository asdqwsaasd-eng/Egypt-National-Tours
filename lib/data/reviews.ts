import { SupportedLocale } from '@/lib/i18n/config';

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  reviewText: Record<SupportedLocale, string>;
  country?: Record<SupportedLocale, string>;
  date?: string;
  isDemo?: boolean;
}

export const FEATURED_REVIEWS: ReviewItem[] = [
  {
    id: 'demo-1',
    customerName: 'أحمد محمود',
    rating: 5,
    reviewText: {
      ar: 'خدمة راقية جداً وتنظيم ممتاز لرحلة أهرامات الجيزة والأقصر. الشكر لكل فريق الشركة على الاهتمام بالتفاصيل.',
      en: 'Exceptional service and seamless organization for our Cairo & Luxor trip. Outstanding attention to detail!',
    },
    country: { ar: 'مصر', en: 'Egypt' },
    date: '2026-01-15',
    isDemo: true,
  },
  {
    id: 'demo-2',
    customerName: 'Sarah Jenkins',
    rating: 5,
    reviewText: {
      ar: 'رحلة النايل كروز كانت تجربة لا تُنسى. المرشد كان خبيراً ومتعاوناً جداً طوال الرحلة.',
      en: 'The Nile Cruise experience was unforgettable. Our guide was incredibly knowledgeable and supportive.',
    },
    country: { ar: 'المملكة المتحدة', en: 'United Kingdom' },
    date: '2026-02-02',
    isDemo: true,
  },
  {
    id: 'demo-3',
    customerName: 'محمد العتيبي',
    rating: 5,
    reviewText: {
      ar: 'سرعة في استخراج التأشيرة وتسهيل إجراءات السفر، التعامل احترافي وموثوق منذ عام 1990.',
      en: 'Prompt visa handling and professional travel coordination. Highly reliable agency with decades of experience.',
    },
    country: { ar: 'السعودية', en: 'Saudi Arabia' },
    date: '2026-02-10',
    isDemo: true,
  },
];
