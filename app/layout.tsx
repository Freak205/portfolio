import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import { contact, profile, seo, siteUrl } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Intro from "@/components/motion/Intro";
import Aurora from "@/components/motion/Aurora";

/**
 * Two faces, both engineering-flavoured.
 *
 * Space Grotesk carries headings *and* body. Its flat-sided S, squared curves
 * and angular g give the page a technical voice at display sizes without
 * turning body copy into something you have to decode.
 *
 * JetBrains Mono handles the parts that should read as machine output —
 * section labels, dates, counters, URLs, indices. Restricting the mono to
 * those is deliberate: monospace is measurably slower to read, so it earns its
 * place on short strings and would cost real comprehension in paragraphs.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-src",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-src",
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
    "Web application development",
    "E-commerce platforms",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Firebase",
    "Cloud Firestore",
    "Python",
    "Flask",
    "Data analytics",
    "Computer vision",
    "Generative AI integration",
    "Search engine optimization",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "GITAM (Deemed to be University)",
  },
  /* HIRING — `seeks` is how a Person advertises what they are looking for.
     Both entries are dropped automatically when the matching switch in
     content/site.ts is turned off. */
  seeks: [
    ...(profile.openToRoles
      ? [{ "@type": "Demand", name: "Full-time and internship software engineering roles" }]
      : []),
    ...(profile.openToFreelance
      ? [{ "@type": "Demand", name: "Freelance web development projects" }]
      : []),
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Set by proxy.ts. Every inline script has to carry it or the CSP drops it.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          nonce={nonce}
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
        <Aurora />

        {/* Aurora is fixed at z-0, so everything real has to be lifted above it. */}
        <Header />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </body>
    </html>
  );
}
