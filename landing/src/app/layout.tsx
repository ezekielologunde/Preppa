import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Preppa — Homemade food, cooked by a local you trust",
  description:
    "Preppa is a live marketplace for homemade food. Order fresh meals from ID-verified local cooks, subscribe to a weekly meal plan, or book a cook for your next event.",
  metadataBase: new URL("https://preppa.live"),
  openGraph: {
    title: "Preppa — Homemade food, cooked by a local you trust",
    description: "Order fresh meals from ID-verified local cooks near you. Live now, taking orders.",
    url: "https://preppa.live",
    siteName: "Preppa",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Preppa",
  url: "https://preppa.live",
  logo: "https://preppa.live/icon.svg",
  sameAs: ["https://www.instagram.com/preppa.live", "https://www.tiktok.com/@preppa.live"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
