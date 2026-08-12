'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
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

  const renderDrawer = () => {
    if (!mounted) return null;

    return createPortal(
      <>
        {/* Backdrop: Positioned at root level with z-[9998] */}
        <div
          className={cn(
            'fixed inset-0 z-[9998] bg-black/65 backdrop-blur-xs transition-opacity duration-300',
            isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
          )}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Slide-out Drawer Panel: Positioned at root level with z-[9999] */}
        <div
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? 'قائمة التنقل' : 'Navigation Menu'}
          className={cn(
            'fixed top-0 bottom-0 right-0 inset-y-0 z-[9999] w-[280px] sm:w-80 h-full h-screen h-[100dvh] max-h-screen bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out overflow-y-auto',
            isOpen
              ? 'translate-x-0 opacity-100 pointer-events-auto visible'
              : 'translate-x-full opacity-0 pointer-events-none invisible'
          )}
        >
          <div className="flex flex-col gap-6">
            {/* Header row in drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <Link href={`/${locale}`} onClick={closeMenu} className="flex items-center gap-2">
                <Image
                  src="/assets/brand/logo-original.png"
                  alt="Egypt National Tours"
                  width={140}
                  height={44}
                  className="max-h-9 w-auto"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="p-2 rounded-lg text-text-primary hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                aria-label={isAr ? 'إغلاق القائمة' : 'Close menu'}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'px-4 py-3 rounded-xl text-base font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                      active
                        ? 'bg-brand-gold-light/50 text-brand-red font-extrabold shadow-xs'
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
          <div className="flex flex-col gap-4 pt-6 border-t border-border mt-auto">
            <div className="flex justify-center">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <LinkButton
              href={`/${locale}/request`}
              variant="primary"
              size="lg"
              fullWidth
              onClick={closeMenu}
              className="shadow-md font-bold"
            >
              {dictionary.requestTrip}
            </LinkButton>
          </div>
        </div>
      </>,
      document.body
    );
  };

  return (
    <div className={cn('lg:hidden', className)}>
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-lg text-text-primary hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-drawer"
        aria-label={isOpen ? (isAr ? 'إغلاق القائمة' : 'Close menu') : (isAr ? 'فتح القائمة' : 'Open menu')}
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {renderDrawer()}
    </div>
  );
};
