import { prisma, isDatabaseConnected } from './prisma';
import { CONTACT } from '@/lib/utils/constants';

export interface ContactSettingsData {
  whatsappNumber: string;
  whatsappRaw: string;
  whatsappLink: string;
  phonePrimary: string;
  phonePrimaryRaw: string;
  phoneSecondary: string;
  phoneSecondaryRaw: string;
  mobile1: string;
  mobile1Raw: string;
  mobile2: string;
  mobile2Raw: string;
  email: string;
  secondaryEmail: string;
  facebookUrl: string;
  googleMapsUrl: string;
  addressAr: string;
  addressEn: string;
  workingHoursAr: string;
  workingHoursEn: string;
  offDaysAr: string;
  offDaysEn: string;
}

function cleanDigits(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}

export async function getContactSettings(): Promise<ContactSettingsData> {
  const fallbackData: ContactSettingsData = {
    whatsappNumber: CONTACT.whatsapp,
    whatsappRaw: CONTACT.whatsappRaw,
    whatsappLink: CONTACT.whatsappLink,
    phonePrimary: CONTACT.phonePrimary,
    phonePrimaryRaw: CONTACT.phonePrimaryRaw,
    phoneSecondary: CONTACT.phoneSecondary,
    phoneSecondaryRaw: CONTACT.phoneSecondaryRaw,
    mobile1: CONTACT.mobile1,
    mobile1Raw: CONTACT.mobile1Raw,
    mobile2: CONTACT.mobile2,
    mobile2Raw: CONTACT.mobile2Raw,
    email: CONTACT.email,
    secondaryEmail: CONTACT.secondaryEmail,
    facebookUrl: CONTACT.facebook,
    googleMapsUrl: CONTACT.googleMaps,
    addressAr: CONTACT.address.ar,
    addressEn: CONTACT.address.en,
    workingHoursAr: CONTACT.workingHours.ar,
    workingHoursEn: CONTACT.workingHours.en,
    offDaysAr: CONTACT.offDays.ar,
    offDaysEn: CONTACT.offDays.en,
  };

  try {
    const connected = await isDatabaseConnected();
    if (!connected || !prisma) {
      return fallbackData;
    }

    const settings = await prisma.contactSettings.findFirst();
    if (!settings) {
      return fallbackData;
    }

    const rawWhatsapp = cleanDigits(settings.whatsappNumber || CONTACT.whatsapp).replace(/^\+/, '');

    return {
      whatsappNumber: settings.whatsappNumber || CONTACT.whatsapp,
      whatsappRaw: rawWhatsapp || CONTACT.whatsappRaw,
      whatsappLink: `https://wa.me/${rawWhatsapp || CONTACT.whatsappRaw}`,
      phonePrimary: settings.phonePrimary || CONTACT.phonePrimary,
      phonePrimaryRaw: cleanDigits(settings.phonePrimary || CONTACT.phonePrimaryRaw),
      phoneSecondary: settings.phoneSecondary || CONTACT.phoneSecondary,
      phoneSecondaryRaw: cleanDigits(settings.phoneSecondary || CONTACT.phoneSecondaryRaw),
      mobile1: settings.mobile1 || CONTACT.mobile1,
      mobile1Raw: cleanDigits(settings.mobile1 || CONTACT.mobile1Raw),
      mobile2: settings.mobile2 || CONTACT.mobile2,
      mobile2Raw: cleanDigits(settings.mobile2 || CONTACT.mobile2Raw),
      email: settings.email || CONTACT.email,
      secondaryEmail: settings.secondaryEmail || CONTACT.secondaryEmail,
      facebookUrl: settings.facebookUrl || CONTACT.facebook,
      googleMapsUrl: settings.googleMapsUrl || CONTACT.googleMaps,
      addressAr: settings.addressAr || CONTACT.address.ar,
      addressEn: settings.addressEn || CONTACT.address.en,
      workingHoursAr: settings.workingHoursAr || CONTACT.workingHours.ar,
      workingHoursEn: settings.workingHoursEn || CONTACT.workingHours.en,
      offDaysAr: settings.offDaysAr || CONTACT.offDays.ar,
      offDaysEn: settings.offDaysEn || CONTACT.offDays.en,
    };
  } catch (err) {
    console.error('[ContactSettingsRepository] Failed to read settings, using fallback:', err);
    return fallbackData;
  }
}
