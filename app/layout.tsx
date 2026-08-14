import type { Metadata } from "next";
import { cairoFont, interFont } from "@/lib/utils/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Egypt National Tours",
  description: "Discover the Charm of Egypt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairoFont.variable} ${interFont.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-white text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
