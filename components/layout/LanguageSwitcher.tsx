'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { SupportedLocale } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: SupportedLocale;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  className,
}) => {
  const pathname = usePathname() || `/${currentLocale}`;

  const getLocaleUrl = (targetLocale: SupportedLocale): string => {
    if (!pathname) return `/${targetLocale}`;
    
    // Replace the leading /[locale] with /[targetLocale]
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'ar' || segments[1] === 'en')) {
      segments[1] = targetLocale;
      return segments.join('/');
    }
    
    return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary select-none',
        className
      )}
      aria-label={currentLocale === 'ar' ? 'تغيير اللغة' : 'Change Language'}
    >
      <Link
        href={getLocaleUrl('ar')}
        lang="ar"
        dir="rtl"
        aria-current={currentLocale === 'ar' ? 'true' : undefined}
        className={cn(
          'px-2 py-1 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
          currentLocale === 'ar'
            ? 'font-bold text-brand-red bg-brand-gold-light/40'
            : 'hover:text-text-primary hover:bg-sand/60'
        )}
      >
        العربية
      </Link>
      <span className="text-text-muted text-xs opacity-60" aria-hidden="true">
        |
      </span>
      <Link
        href={getLocaleUrl('en')}
        lang="en"
        dir="ltr"
        aria-current={currentLocale === 'en' ? 'true' : undefined}
        className={cn(
          'px-2 py-1 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
          currentLocale === 'en'
            ? 'font-bold text-brand-red bg-brand-gold-light/40'
            : 'hover:text-text-primary hover:bg-sand/60'
        )}
      >
        English
      </Link>
    </div>
  );
};
