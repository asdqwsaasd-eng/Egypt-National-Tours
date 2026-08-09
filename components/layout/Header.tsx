import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SupportedLocale } from '@/lib/i18n/config';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  locale: SupportedLocale;
  dictionary: {
    home: string;
    services: string;
    egyptTours: string;
    hajjUmrah: string;
    internationalTours: string;
    aboutContact: string;
    requestTrip: string;
  };
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  locale,
  dictionary,
  className,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-[var(--shadow-header)] transition-shadow duration-200">
      <Container size="default">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Official Brand Logo — sacred asset, exact proportions preserved */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg p-1 shrink-0"
            aria-label="Egypt National Tours"
          >
            <Image
              src="/assets/brand/logo-original.png"
              alt="Egypt National Tours — إيجيبت ناشيونال تورز"
              width={160}
              height={52}
              style={{ width: 'auto', height: 'auto', maxHeight: '48px' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav locale={locale} dictionary={dictionary} />

          {/* Header Action Items (Language Switcher + Primary CTA Button) */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <LanguageSwitcher currentLocale={locale} />
            <LinkButton
              href={`/${locale}/request`}
              variant="primary"
              size="md"
              className="shadow-sm hover:shadow transition-shadow"
            >
              {dictionary.requestTrip}
            </LinkButton>
          </div>

          {/* Mobile Navigation Trigger & Drawer */}
          <MobileNav
            locale={locale}
            dictionary={dictionary}
          />
        </div>
      </Container>
    </header>
  );
};
