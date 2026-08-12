import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SupportedLocale } from '@/lib/i18n/config';
import { COMPANY, CONTACT } from '@/lib/utils/constants';
import { Container } from '@/components/ui/Container';

interface FooterProps {
  locale: SupportedLocale;
  dictionary: {
    rights: string;
    workingHours: string;
    workingDays: string;
    offDays: string;
    onlineNote: string;
  };
  className?: string;
}

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({
  locale,
  dictionary,
  className,
}) => {
  const isAr = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-cream border-t border-border pt-12 pb-8 text-text-primary', className)}>
      <Container size="default">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-border">
          {/* Column 1: Company Identity */}
          <div className="flex flex-col gap-4">
            <Link href={`/${locale}`} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg p-1 w-fit">
              <Image
                src="/assets/brand/logo-original.png"
                alt="Egypt National Tours"
                width={150}
                height={48}
                style={{ width: 'auto', height: 'auto', maxHeight: '42px' }}
              />
            </Link>
            <p className="text-sm font-semibold text-brand-red">
              {COMPANY.tagline[locale]}
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              {COMPANY.license[locale]}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/about-contact`}
                className="text-sm font-medium text-brand-red hover:underline inline-flex items-center gap-1"
              >
                {isAr ? 'تعرف على الشركة والتواصل' : 'About & Contact Us'} →
              </Link>
            </div>
          </div>

          {/* Column 2: Services Navigation */}
          <div>
            <h3 className="text-base font-bold text-text-primary mb-4 pb-1 border-b border-brand-gold/40 w-fit">
              {isAr ? 'خدماتنا' : 'Services'}
            </h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link href={`/${locale}/services/flights`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'تذاكر الطيران' : 'Flight Tickets'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/hotels`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'حجز الفنادق' : 'Hotel Reservations'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/visas`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'خدمات التأشيرات' : 'Visa Services'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/security-approvals`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'الموافقات الأمنية' : 'Security Approvals'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/transportation`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'النقل السياحي' : 'Tourist Transportation'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Programs */}
          <div>
            <h3 className="text-base font-bold text-text-primary mb-4 pb-1 border-b border-brand-gold/40 w-fit">
              {isAr ? 'البرامج السياحية' : 'Travel & Tours'}
            </h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link href={`/${locale}/egypt-tours`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'برامج مصر السياحية' : 'Egypt Tours'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/international-tours`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'السياحة الدولية' : 'International Tours'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/hajj-umrah`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'الحج والعمرة' : 'Hajj & Umrah'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services/custom-tours`} className="hover:text-brand-red transition-colors">
                  {isAr ? 'الخدمات الأخرى' : 'Other Services'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Information */}
          <div>
            <h3 className="text-base font-bold text-text-primary mb-4 pb-1 border-b border-brand-gold/40 w-fit">
              {isAr ? 'معلومات الاتصال' : 'Contact Details'}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-red transition-colors font-medium inline-block"
                >
                  <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    WA: {CONTACT.whatsapp}
                  </span>
                </a>
              </li>

              {/* Fix 2: Phone Numbers with PH: prefix and strict LTR Bidi Isolation */}
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${CONTACT.phonePrimaryRaw}`} className="hover:text-brand-red transition-colors inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.phonePrimary}
                    </span>
                  </a>
                  <a href={`tel:${CONTACT.phoneSecondaryRaw}`} className="hover:text-brand-red transition-colors inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.phoneSecondary}
                    </span>
                  </a>
                  <a href={`tel:${CONTACT.mobile1Raw}`} className="hover:text-brand-red transition-colors inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.mobile1}
                    </span>
                  </a>
                  <a href={`tel:${CONTACT.mobile2Raw}`} className="hover:text-brand-red transition-colors inline-block">
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      PH: {CONTACT.mobile2}
                    </span>
                  </a>
                </div>
              </li>

              {/* Fix 3: Both Public Emails in EXACT required order: Yahoo top, Domain below */}
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${CONTACT.secondaryEmail}`} className="hover:text-brand-red transition-colors break-all">
                    {CONTACT.secondaryEmail}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-red transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                <span>{CONTACT.address[locale]}</span>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-text-primary">{CONTACT.workingHoursHeader[locale]}</p>
                  <p>{CONTACT.workingHours[locale]}</p>
                  <p className="text-brand-red font-medium">{CONTACT.offDays[locale]}</p>
                </div>
              </li>
            </ul>

            {/* Social & Google Maps Links */}
            <div className="mt-4 pt-3 flex items-center gap-3">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1877F2] hover:underline"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="h-4 w-4" />
                <span>Facebook</span>
              </a>
              <span className="text-text-muted opacity-40">•</span>
              <a
                href={CONTACT.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:underline"
                aria-label="Google Maps Location"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{isAr ? 'خريطة الموقع' : 'Google Maps'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar — Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>© {currentYear} {COMPANY.name[locale]}. {dictionary.rights}.</p>
          <p className="text-[11px] text-text-muted/80">
            {COMPANY.license[locale]}
          </p>
        </div>
      </Container>
    </footer>
  );
};
