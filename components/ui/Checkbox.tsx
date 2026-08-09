import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col">
        <label
          htmlFor={inputId}
          className={cn(
            'flex items-start gap-3 cursor-pointer select-none',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'h-5 w-5 rounded border-2 text-brand-red focus:ring-brand-red/20 accent-brand-red mt-0.5 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/20 motion-safe:transition-colors',
              error ? 'border-error' : 'border-border',
              disabled && 'cursor-not-allowed'
            )}
            {...props}
          />
          <span className="text-base text-text-primary cursor-pointer select-none leading-snug">
            {label}
          </span>
        </label>
        {error && (
          <p id={errorId} className="text-sm text-error mt-1 ps-8" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
