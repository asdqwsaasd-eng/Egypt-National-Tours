import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Egypt National Tours",
  description: "Discover the Charm of Egypt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
