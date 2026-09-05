import type { Metadata, Viewport } from "next";
import { Cherry_Bomb_One, Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const cherry = Cherry_Bomb_One({ variable: "--font-cherry", weight: "400", subsets: ["latin"] });

// Absolute URL for link-preview images. Set NEXT_PUBLIC_SITE_URL in the Pages project (the canonical
// pages.dev or custom domain); CF_PAGES_URL is Pages' per-deployment URL and keeps previews working.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "RempitMeter",
  description: "Meter untuk nilai tahap kerempitan awak. Jawab 16 soalan, dapatkan diagnosis.",
  openGraph: {
    title: "RempitMeter",
    description: "Berapa rempit awak? Buat ujian ni.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#05010f" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ms" className={`${fredoka.variable} ${cherry.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
