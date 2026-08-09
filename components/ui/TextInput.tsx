import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      id,
      className,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint ? hintId : null,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary flex items-center"
          >
            {label}
            {required && <span className="text-brand-red ms-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative w-full">
          {leftIcon && (
            <div className="absolute start-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'h-12 w-full rounded-[var(--radius-input)] border border-border bg-white px-4 text-base text-text-primary placeholder:text-text-muted transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red',
              leftIcon && 'ps-10',
              rightIcon && 'pe-10',
              error && 'border-error focus:ring-error/20 focus:border-error',
              disabled && 'opacity-50 cursor-not-allowed bg-cream',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute end-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-sm text-error mt-1" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-sm text-text-muted mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
