import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  hint?: string;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, hint, className, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary select-none">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full rounded-[var(--radius-input)] border bg-white ps-4 pe-4 text-base text-text-primary motion-safe:transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-border focus:border-brand-red focus:ring-brand-red/20',
          )}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-muted mt-0.5">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-error mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
