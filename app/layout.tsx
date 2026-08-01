import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { contact, profile, seo, siteUrl } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Intro from "@/components/motion/Intro";

const display = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-src",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-src",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s — ${seo.titleSuffix}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  applicationName: `${profile.fullName} — Portfolio`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: `${profile.fullName} — ${profile.title}`,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before paint: if the intro has already played this session, or the
 * visitor prefers reduced motion, mark <html> so the curtain never shows.
 */
const introScript = `try{if(sessionStorage.getItem('intro-seen')||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-done')}}catch(e){}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.title,
  description: seo.description,
  url: siteUrl,
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  sameAs: [contact.github, contact.linkedin],
  knowsAbout: [
    "Full-stack web development",
    "E-commerce platforms",
    "Next.js",
    "Firebase",
    "Cloud Firestore",
    "Search engine optimization",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="sr-only-focusable">
          Skip to content
        </a>

        <Intro />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
