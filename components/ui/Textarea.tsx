import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
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
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

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
            htmlFor={textareaId}
            className="text-sm font-medium text-text-primary flex items-center"
          >
            {label}
            {required && <span className="text-brand-red ms-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'min-h-[120px] w-full rounded-[var(--radius-input)] border border-border bg-white p-4 text-base text-text-primary placeholder:text-text-muted resize-y transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red',
            error && 'border-error focus:ring-error/20 focus:border-error',
            disabled && 'opacity-50 cursor-not-allowed bg-cream',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
