import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SupportedLocale } from '@/lib/i18n/config';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  locale: SupportedLocale;
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  locale,
  items,
  className,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const isAr = locale === 'ar';
  const homeLabel = isAr ? 'الرئيسية' : 'Home';
  const SeparatorIcon = isAr ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'}
      className={cn('py-3 text-sm text-text-secondary select-none', className)}
    >
      <ol className="flex items-center flex-wrap gap-1.5 list-none m-0 p-0">
        {/* Home link */}
        <li className="inline-flex items-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1 hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
          >
            <Home className="h-4 w-4 text-text-muted shrink-0" aria-hidden="true" />
            <span>{homeLabel}</span>
          </Link>
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <SeparatorIcon
                className="h-4 w-4 text-text-muted shrink-0 rtl:rotate-180"
                aria-hidden="true"
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-medium text-text-primary line-clamp-1 max-w-[200px] sm:max-w-xs"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
