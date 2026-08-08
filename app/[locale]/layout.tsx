import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, localeDirection, locales } from "@/lib/i18n/config";
import { cairoFont, interFont } from "@/lib/utils/fonts";
import { COMPANY } from "@/lib/utils/constants";
import { generateOrganizationSchema } from "@/lib/seo/metadata";
import "@/app/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return {
    title: {
      default: COMPANY.name[locale],
      template: `%s | ${COMPANY.name[locale]}`,
    },
    description: COMPANY.tagline[locale],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = localeDirection[locale];
  const fontClass =
    locale === "ar"
      ? `${cairoFont.variable} ${interFont.variable}`
      : `${interFont.variable} ${cairoFont.variable}`;

  return (
    <html lang={locale} dir={dir} className={fontClass}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </body>
    </html>
  );
}

