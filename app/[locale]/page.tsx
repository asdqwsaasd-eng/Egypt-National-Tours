import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale as Locale);
  return generatePageMetadata({
    title: dict.nav.home,
    description: dict.site.tagline,
    locale: locale as Locale,
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-brand-red mb-4">
        {dict.site.name}
      </h1>
      <p className="text-xl text-text-secondary mb-2">
        {dict.site.tagline}
      </p>
      <p className="text-sm text-text-muted">
        {dict.site.license}
      </p>
      <p className="mt-8 text-sm text-text-muted">
        Phase 1 Foundation — {locale.toUpperCase()} Locale Active
      </p>
    </main>
  );
}
