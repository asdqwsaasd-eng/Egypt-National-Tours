import * as React from 'react';
import {
  Plane,
  Building2,
  Landmark,
  Globe,
  FileCheck,
  ShieldCheck,
  Compass,
  Moon,
  Bus,
  Sparkles,
  HelpCircle,
  LucideProps,
} from 'lucide-react';

interface ServiceIconProps extends LucideProps {
  iconName?: string;
  serviceId?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  iconName,
  serviceId,
  className = 'h-5 w-5',
  ...props
}) => {
  const key = (iconName || serviceId || '').toLowerCase();

  if (key.includes('plane') || key.includes('flight')) {
    return <Plane className={className} {...props} />;
  }
  if (key.includes('building') || key.includes('hotel')) {
    return <Building2 className={className} {...props} />;
  }
  if (key.includes('landmark') || key.includes('pyramid') || key.includes('egypt')) {
    return <Landmark className={className} {...props} />;
  }
  if (key.includes('globe') || key.includes('international')) {
    return <Globe className={className} {...props} />;
  }
  if (key.includes('file') || key.includes('visa')) {
    return <FileCheck className={className} {...props} />;
  }
  if (key.includes('shield') || key.includes('security')) {
    return <ShieldCheck className={className} {...props} />;
  }
  if (key.includes('compass') || key.includes('hajj')) {
    return <Compass className={className} {...props} />;
  }
  if (key.includes('moon') || key.includes('umrah')) {
    return <Moon className={className} {...props} />;
  }
  if (key.includes('bus') || key.includes('transportation')) {
    return <Bus className={className} {...props} />;
  }
  if (key.includes('sparkle') || key.includes('custom') || key.includes('other')) {
    return <Sparkles className={className} {...props} />;
  }

  return <HelpCircle className={className} {...props} />;
};
