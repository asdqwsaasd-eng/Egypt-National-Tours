'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { SupportedLocale } from '@/lib/i18n/config';

interface NavItem {
  key: string;
  label: string;
  href: string;
}

interface DesktopNavProps {
  locale: SupportedLocale;
  dictionary: {
    home: string;
    services: string;
    egyptTours: string;
    hajjUmrah: string;
    internationalTours: string;
    aboutContact: string;
  };
  className?: string;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  locale,
  dictionary,
  className,
}) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
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
    <nav className={cn('hidden lg:flex items-center gap-6 xl:gap-8', className)} aria-label="Main Navigation">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              'relative py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 rounded-sm',
              active
                ? 'text-brand-red font-bold'
                : 'text-text-primary hover:text-brand-red'
            )}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
            {active && (
              <span
                className="absolute bottom-0 start-0 end-0 h-0.5 bg-brand-red rounded-full motion-safe:animate-in motion-safe:fade-in"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
