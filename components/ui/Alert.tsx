'use client';

import * as React from 'react';
import { Info, CheckCircle2, AlertCircle, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'error' | 'warning';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'bg-info/5 border-info/20 text-info',
  success: 'bg-success/5 border-success/20 text-success',
  error: 'bg-error/5 border-error/20 text-error',
  warning: 'bg-brand-gold-light border-brand-gold/30 text-text-primary',
};

const defaultIcons: Record<NonNullable<AlertProps['variant']>, React.ReactNode> = {
  info: <Info className="h-5 w-5 shrink-0" aria-hidden="true" />,
  success: <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />,
  error: <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 text-text-primary" aria-hidden="true" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      icon,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIcon = defaultIcons[variant];
    const renderIcon = icon !== undefined ? icon : defaultIcon;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex items-start gap-3 p-4 rounded-[var(--radius-card)] border',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {renderIcon && <div className="shrink-0 mt-0.5">{renderIcon}</div>}
        <div className="flex-1 min-w-0">
          {title && <h5 className="font-semibold text-sm mb-1">{title}</h5>}
          {children && <div className="text-sm text-text-secondary">{children}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss alert"
            className="ms-auto shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
