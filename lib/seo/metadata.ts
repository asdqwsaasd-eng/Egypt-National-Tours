import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { COMPANY, CONTACT } from "@/lib/utils/constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  ogImage?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Generate consistent page metadata for SEO.
 * Follows Doc 07 requirements: unique titles, meta descriptions,
 * hreflang, canonical, OG tags.
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  path,
  ogImage,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${COMPANY.name[locale]}`;
  const canonicalUrl = `${siteUrl}/${locale}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: `${siteUrl}/ar${path}`,
        en: `${siteUrl}/en${path}`,
        "x-default": `${siteUrl}/ar${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: COMPANY.name[locale],
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Generate the Organization structured data (Schema.org TravelAgency).
 * Uses ONLY verified company facts from constants.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: COMPANY.name.en,
    alternateName: COMPANY.name.ar,
    url: siteUrl,
    logo: `${siteUrl}/assets/brand/logo-original.png`,
    description: COMPANY.tagline.en,
    telephone: [
      `+${CONTACT.phonePrimary.replace(/^00/, "")}`,
      `+${CONTACT.phoneSecondary.replace(/^00/, "")}`,
    ],
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "152 El Tawfik Buildings, El Tayaran Street",
      addressLocality: "Nasr City, Cairo",
      addressCountry: "EG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:30",
        closes: "17:00",
      },
    ],
    sameAs: [CONTACT.facebook],
  };
}

/**
 * Generate BreadcrumbList structured data (Schema.org BreadcrumbList).
 */
export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/**
 * Generate Tour/TouristAttraction structured data (Schema.org TouristAttraction & Offer).
 */
export function generateTourSchema(tour: {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    url: tour.url,
    ...(tour.image && { image: tour.image }),
    provider: {
      "@type": "TravelAgency",
      name: COMPANY.name.en,
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: tour.url,
      priceCurrency: "USD",
      seller: {
        "@type": "TravelAgency",
        name: COMPANY.name.en,
      },
    },
  };
}
