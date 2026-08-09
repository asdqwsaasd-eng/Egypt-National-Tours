import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
  secondary: 'bg-white text-brand-red border-2 border-brand-red hover:bg-brand-red hover:text-white',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1DA855]',
  ghost: 'bg-transparent text-text-primary hover:bg-sand',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-13 px-8 text-base',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-semibold motion-safe:transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      asChild = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      className
    );

    const spinner = (
      <svg
        className="h-4 w-4 animate-spin shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const content = (
      <>
        {isLoading ? spinner : leftIcon}
        {children}
        {rightIcon}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement> }>;
      return React.cloneElement(child, {
        className: cn(combinedClassName, child.props.className),
        ref,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? true : undefined}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      className
    );

    return (
      <a
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
