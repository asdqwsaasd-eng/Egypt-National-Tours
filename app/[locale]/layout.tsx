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

  return {
    title: {
      default: `${COMPANY.name[locale as SupportedLocale]} | ${COMPANY.tagline[locale as SupportedLocale]}`,
      template: `%s | ${COMPANY.name[locale as SupportedLocale]}`,
    },
    description: `${COMPANY.tagline[locale as SupportedLocale]} — ${COMPANY.license[locale as SupportedLocale]}`,
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

  return (
    <html lang={validLocale} dir={dir} className={fontClass}>
      <body className="antialiased flex flex-col min-h-screen bg-white text-text-primary">
        <ToastProvider>
          <Header locale={validLocale} dictionary={dict.nav} />
          <main className="flex-1">{children}</main>
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
