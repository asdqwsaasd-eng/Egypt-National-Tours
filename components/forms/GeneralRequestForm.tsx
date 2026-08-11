'use client';

import * as React from 'react';
import { SupportedLocale } from '@/lib/i18n/config';
import { FlightRequestForm } from './FlightRequestForm';
import { HotelRequestForm } from './HotelRequestForm';
import { CustomTourRequestForm } from './CustomTourRequestForm';
import { VisaRequestForm } from './VisaRequestForm';
import { SecurityApprovalRequestForm } from './SecurityApprovalRequestForm';
import { TransportationRequestForm } from './TransportationRequestForm';
import { TourProgramRequestForm } from './TourProgramRequestForm';
import { ReligiousRequestForm } from './ReligiousRequestForm';

interface GeneralRequestFormProps {
  locale: SupportedLocale;
  activeService?: string;
  queryTour?: string;
  className?: string;
}

export const GeneralRequestForm: React.FC<GeneralRequestFormProps> = ({
  locale,
  activeService = 'flights',
  queryTour,
  className,
}) => {
  switch (activeService) {
    case 'flights':
    case 'flight':
      return <FlightRequestForm locale={locale} className={className} />;

    case 'hotels':
    case 'hotel':
      return <HotelRequestForm locale={locale} className={className} />;

    case 'egypt-tours':
    case 'egypt_tour':
      return (
        <TourProgramRequestForm
          locale={locale}
          tourSlug="egypt-tours"
          tourTitle={queryTour || (locale === 'ar' ? 'برامج رحلات مصر' : 'Egypt Tour Program')}
          tourType="egypt_tour"
          className={className}
        />
      );

    case 'international-tours':
    case 'international_tour':
      return (
        <TourProgramRequestForm
          locale={locale}
          tourSlug="international-tours"
          tourTitle={queryTour || (locale === 'ar' ? 'رحلة دولية' : 'International Tour Program')}
          tourType="international_tour"
          className={className}
        />
      );

    case 'custom-tours':
    case 'custom_tour':
      return <CustomTourRequestForm locale={locale} className={className} />;

    case 'visas':
    case 'visa':
      return <VisaRequestForm locale={locale} className={className} />;

    case 'security-approvals':
    case 'security_approval':
      return <SecurityApprovalRequestForm locale={locale} className={className} />;

    case 'transportation':
      return <TransportationRequestForm locale={locale} className={className} />;

    case 'hajj':
      return <ReligiousRequestForm locale={locale} programType="hajj" defaultTitle={queryTour} className={className} />;

    case 'umrah':
      return <ReligiousRequestForm locale={locale} programType="umrah" defaultTitle={queryTour} className={className} />;

    default:
      return <CustomTourRequestForm locale={locale} className={className} />;
  }
};
