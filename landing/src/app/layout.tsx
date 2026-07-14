import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
    description:
      "Order fresh meals from ID-verified local cooks near you. Live now in Atlanta, GA.",
    url: "https://preppa.live",
    siteName: "Preppa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
