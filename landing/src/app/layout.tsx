import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

// One characterful family, committed weight contrast — deliberately NOT the
// reflex-default faces (Inter / Plus Jakarta / DM / Instrument / Fraunces).
// Bricolage Grotesque's mixed contrast and quirky terminals read hand-made and
// modern-food-brand, not corporate. See DESIGN.md.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const TITLE = "Preppa | Meal Prep, Local Cooks and Food Experiences";
const DESCRIPTION =
  "Discover weekly meal prep, meal plans, local food services and food experiences from trusted Preppers near you.";

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
    <html lang="en" className={bricolage.variable}>
      <head>
        {/* No-flash theme: default is warm-orange (light); apply the saved dark choice
            before paint so the hero never flickers. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('preppa-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}`,
          }}
        />
      </head>
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
