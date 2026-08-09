'use client';

import * as React from 'react';
import { Info, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ToastData {
  id: string;
  variant: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

export interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const variantIcons: Record<ToastData['variant'], React.ReactNode> = {
  info: <Info className="h-5 w-5 text-info shrink-0" aria-hidden="true" />,
  success: <CheckCircle2 className="h-5 w-5 text-success shrink-0" aria-hidden="true" />,
  error: <AlertCircle className="h-5 w-5 text-error shrink-0" aria-hidden="true" />,
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const { id, variant, title, description } = toast;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 bg-white rounded-[var(--radius-card)] shadow-lg border border-border p-4 min-w-[320px] max-w-[420px]',
        'motion-safe:animate-in motion-safe:slide-in-from-end'
      )}
    >
      <div className="shrink-0 mt-0.5">{variantIcons[variant]}</div>
      <div className="flex-1 min-w-0">
        <h5 className="font-semibold text-sm text-text-primary">{title}</h5>
        {description && (
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss toast"
        className="ms-auto shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1 text-text-muted hover:text-text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

Toast.displayName = 'Toast';
