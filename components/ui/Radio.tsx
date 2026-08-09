import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      name,
      label,
      options,
      value,
      onChange,
      error,
      direction = 'vertical',
      className,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const errorId = `${generatedId}-error`;

    return (
      <fieldset
        ref={ref}
        className={cn('border-none p-0 m-0', className)}
        aria-describedby={error ? errorId : undefined}
      >
        {label && (
          <legend className="text-sm font-medium text-text-primary mb-2 select-none">
            {label}
          </legend>
        )}
        <div
          className={cn(
            direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-3'
          )}
        >
          {options.map((option) => {
            const optionId = `${generatedId}-${option.value}`;
            const isChecked = value === option.value;

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => onChange?.(option.value)}
                  aria-invalid={!!error}
                  className={cn(
                    'h-5 w-5 border-2 text-brand-red focus:ring-brand-red/20 accent-brand-red cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-red/20 motion-safe:transition-colors',
                    error ? 'border-error' : 'border-border'
                  )}
                />
                <span className="text-base text-text-primary cursor-pointer select-none">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
        {error && (
          <p id={errorId} className="text-sm text-error mt-1" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export const Radio = RadioGroup;
