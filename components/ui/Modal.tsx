'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle Escape key press
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus trap and focus restoration
  React.useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;

    const getFocusables = () => {
      if (!dialogRef.current) return [];
      return Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    };

    const focusables = getFocusables();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else if (dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const currentFocusables = getFocusables();
      if (currentFocusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = currentFocusables[0];
      const lastElement = currentFocusables[currentFocusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 motion-safe:animate-in motion-safe:fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          'relative bg-white rounded-[var(--radius-card)] shadow-xl w-full overflow-hidden focus:outline-none',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <h3 id={titleId} className="text-lg font-bold text-text-primary">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 end-4 z-10 text-text-muted hover:text-text-primary transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        {description && (
          <p id={descriptionId} className="px-6 text-sm text-text-secondary">
            {description}
          </p>
        )}

        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
