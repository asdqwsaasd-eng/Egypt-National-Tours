import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, localeDirection, locales, SupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cairoFont, interFont } from "@/lib/utils/fonts";
import { COMPANY } from "@/lib/utils/constants";
import { generateOrganizationSchema } from "@/lib/seo/metadata";
import { Header, Footer, WhatsAppFloatingButton } from "@/components/layout";
import { ToastProvider } from "@/components/ui";
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

  const validLocale = locale as SupportedLocale;

  return {
    title: {
      default: `${COMPANY.name[validLocale]} | ${COMPANY.tagline[validLocale]}`,
      template: `%s | ${COMPANY.name[validLocale]}`,
    },
    description: `${COMPANY.tagline[validLocale]} — ${COMPANY.license[validLocale]}`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    alternates: {
      canonical: `/${validLocale}`,
      languages: {
        ar: "/ar",
        en: "/en",
        "x-default": "/ar",
      },
    },
    openGraph: {
      siteName: COMPANY.name[validLocale],
      locale: validLocale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
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

  const validLocale = locale as SupportedLocale;
  const dict = await getDictionary(validLocale);
  const dir = localeDirection[validLocale];
  const fontClass =
    validLocale === "ar"
      ? `${cairoFont.variable} ${interFont.variable}`
      : `${interFont.variable} ${cairoFont.variable}`;

  const skipText = validLocale === "ar" ? "الانتقال إلى المحتوى الرئيسي" : "Skip to main content";

  return (
    <html lang={validLocale} dir={dir} className={fontClass}>
      <body className="antialiased flex flex-col min-h-screen bg-white text-text-primary">
        {/* WCAG 2.2 AA Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-red focus:text-white focus:rounded-md focus:shadow-lg text-xs font-bold focus:ring-2 focus:ring-brand-gold"
        >
          {skipText}
        </a>

        <ToastProvider>
          <Header locale={validLocale} dictionary={dict.nav} />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
            {children}
          </main>
          <Footer locale={validLocale} dictionary={dict.footer} />
          <WhatsAppFloatingButton locale={validLocale} />
        </ToastProvider>

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
