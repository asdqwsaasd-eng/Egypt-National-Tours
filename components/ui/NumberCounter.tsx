import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface NumberCounterProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  className?: string;
}

export const NumberCounter = React.forwardRef<HTMLDivElement, NumberCounterProps>(
  (
    {
      label,
      value,
      onChange,
      min,
      max,
      step = 1,
      error,
      className,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const errorId = `${generatedId}-error`;

    const isAtMin = min !== undefined && value <= min;
    const isAtMax = max !== undefined && value >= max;

    const handleDecrease = () => {
      if (isAtMin) return;
      const newValue = value - step;
      onChange(min !== undefined ? Math.max(min, newValue) : newValue);
    };

    const handleIncrease = () => {
      if (isAtMax) return;
      const newValue = value + step;
      onChange(max !== undefined ? Math.min(max, newValue) : newValue);
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <span className="text-sm font-medium text-text-primary select-none">
            {label}
          </span>
        )}
        <div
          className={cn(
            'inline-flex items-center border rounded-[var(--radius-input)] overflow-hidden w-fit',
            error ? 'border-error' : 'border-border'
          )}
        >
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isAtMin}
            aria-label={label ? `Decrease ${label}` : 'Decrease count'}
            className="h-12 w-12 flex items-center justify-center text-text-secondary hover:bg-sand motion-safe:transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:bg-sand cursor-pointer"
          >
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <span
            role="status"
            aria-live="polite"
            className="h-12 w-16 flex items-center justify-center text-lg font-semibold text-text-primary border-s border-e border-border bg-white tabular-nums select-none"
          >
            {value}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={isAtMax}
            aria-label={label ? `Increase ${label}` : 'Increase count'}
            className="h-12 w-12 flex items-center justify-center text-text-secondary hover:bg-sand motion-safe:transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:bg-sand cursor-pointer"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {error && (
          <p id={errorId} className="text-sm text-error mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NumberCounter.displayName = 'NumberCounter';
