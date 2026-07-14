import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Anton } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const TITLE = "Preppa | Homemade Food From Real Local Cooks";
const DESCRIPTION =
  "Skip the chains. Order fresh meals, weekly plans, and local food experiences from real cooks near you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://preppa.live"),
  alternates: { canonical: "https://preppa.live" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://preppa.live",
    siteName: "Preppa",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Preppa",
  url: "https://preppa.live",
  logo: "https://preppa.live/icon.png",
  sameAs: ["https://www.instagram.com/preppa.live", "https://www.tiktok.com/@preppa.live"],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Preppa",
  url: "https://preppa.live",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${anton.variable}`}>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
