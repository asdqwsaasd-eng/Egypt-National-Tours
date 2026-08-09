import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { FEATURED_EGYPT_TOURS, INTERNATIONAL_TOURS } from '@/lib/data/tours';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about-contact',
    '/services',
    '/services/flights',
    '/services/hotels',
    '/services/visas',
    '/services/security-approvals',
    '/services/transportation',
    '/services/custom-tours',
    '/hajj-umrah',
    '/hajj-umrah/hajj',
    '/hajj-umrah/umrah',
    '/international-tours',
    '/request',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add all static routes for each supported locale (ar & en)
  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    // Add Egypt tours
    for (const tour of FEATURED_EGYPT_TOURS) {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}/egypt-tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Add International tours
    for (const tour of INTERNATIONAL_TOURS) {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}/international-tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return sitemapEntries;
}
