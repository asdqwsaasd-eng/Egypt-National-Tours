'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SupportedLocale } from '@/lib/i18n/config';
import { LinkButton } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileNavProps {
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

export const MobileNav: React.FC<MobileNavProps> = ({
  locale,
  dictionary,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close menu on route change
  React.useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { key: 'home', label: dictionary.home, href: `/${locale}` },
    { key: 'services', label: dictionary.services, href: `/${locale}/services` },
    { key: 'egyptTours', label: dictionary.egyptTours, href: `/${locale}/egypt-tours` },
    { key: 'hajjUmrah', label: dictionary.hajjUmrah, href: `/${locale}/hajj-umrah` },
    { key: 'internationalTours', label: dictionary.internationalTours, href: `/${locale}/international-tours` },
    { key: 'aboutContact', label: dictionary.aboutContact, href: `/${locale}/about-contact` },
  ];

  const isActive = (href: string): boolean => {
    if (!pathname) return false;
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={cn('lg:hidden', className)}>
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-lg text-text-primary hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-drawer"
        aria-label={isOpen ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (locale === 'ar' ? 'فتح القائمة' : 'Open menu')}
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {/* Drawer backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 motion-safe:animate-in motion-safe:fade-in"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'ar' ? 'قائمة التنقل' : 'Navigation Menu'}
        className={cn(
          'fixed inset-y-0 z-50 w-full max-w-xs bg-white shadow-xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out',
          /* Positioning based on dir: start-0 for LTR/RTL sliding */
          locale === 'ar' ? 'start-0 border-e border-border' : 'end-0 border-s border-border',
          isOpen
            ? 'translate-x-0'
            : locale === 'ar'
            ? '-translate-x-full'
            : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-6">
          {/* Header row in drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <Link href={`/${locale}`} onClick={closeMenu} className="flex items-center gap-2">
              <Image
                src="/assets/brand/logo-original.png"
                alt="Egypt National Tours"
                width={120}
                height={40}
                style={{ height: 'auto', width: 'auto', maxHeight: '36px' }}
                priority
              />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="p-2 rounded-lg text-text-secondary hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label={locale === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    'px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                    active
                      ? 'bg-brand-gold-light/40 text-brand-red font-bold'
                      : 'text-text-primary hover:bg-sand/60 hover:text-brand-red'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions in drawer */}
        <div className="flex flex-col gap-4 pt-6 border-t border-border">
          <div className="flex justify-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <LinkButton
            href={`/${locale}/request`}
            variant="primary"
            size="lg"
            fullWidth
            onClick={closeMenu}
          >
            {dictionary.requestTrip}
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
