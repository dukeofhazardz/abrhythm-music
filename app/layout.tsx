import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { contact } from "@/data/contact";
import { site } from "@/lib/site";

const title = `${site.name} — ${site.motto}`;
const description = `Abrhythm Music is a music school and creative arts organisation in Aba, Nigeria, offering structured training in drums, piano, wind instruments, guitar, voice, marching band, songwriting and public speaking for children, schools, churches and artistes. ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "music school Aba",
    "music training Aba Nigeria",
    "drumming lessons",
    "piano lessons",
    "kids music training",
    "marching band training",
    "voice training",
    "Abrhythm Music",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#00602B",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness/MusicSchool structured data — address and phones only, per content.md. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicSchool",
  name: site.name,
  slogan: site.motto,
  description: `Music school and creative arts organisation in Aba, Nigeria. ${site.tagline}`,
  url: site.url,
  telephone: "+234 909 899 5532",
  logo: `${site.url}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "69A Aba-Owerri Road, Beside Rosevine Hospital, Umungasi",
    addressLocality: "Aba",
    addressRegion: "Abia State",
    addressCountry: "NG",
  },
  contactPoint: contact.phones.map((phone) => {
    const digits = phone.replace(/\D/g, "").replace(/^0/, "");
    const grouped = digits.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
    return {
      "@type": "ContactPoint",
      telephone: `+234 ${grouped}`,
      contactType: "customer service",
      areaServed: "NG",
    };
  }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <GrainOverlay />
        <Cursor />
      </body>
    </html>
  );
}
