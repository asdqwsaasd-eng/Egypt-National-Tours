import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      id,
      className,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      defaultValue,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

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
            htmlFor={selectId}
            className="text-sm font-medium text-text-primary flex items-center"
          >
            {label}
            {required && <span className="text-brand-red ms-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              'h-12 w-full rounded-[var(--radius-input)] border border-border bg-white px-4 pe-10 text-base text-text-primary appearance-none transition-colors cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red',
              error && 'border-error focus:ring-error/20 focus:border-error',
              disabled && 'opacity-50 cursor-not-allowed bg-cream',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted flex items-center justify-center">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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

Select.displayName = 'Select';
