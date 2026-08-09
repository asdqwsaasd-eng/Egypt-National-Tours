import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { SupportedLocale } from '@/lib/i18n/config';
import { CONTACT } from '@/lib/utils/constants';

interface WhatsAppFloatingButtonProps {
  locale: SupportedLocale;
  className?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  locale,
  className,
}) => {
  const isAr = locale === 'ar';
  const label = isAr ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp';

  return (
    <a
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        'fixed bottom-6 end-6 z-40 flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#1DA855] hover:shadow-xl motion-safe:transition-all motion-safe:duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 group',
        className
      )}
    >
      <MessageCircle className="h-6 w-6 shrink-0 fill-current" aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold group-hover:max-w-xs transition-all duration-300 opacity-0 group-hover:opacity-100 pe-1">
        {label}
      </span>
    </a>
  );
};
