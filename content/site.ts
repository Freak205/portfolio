/* =============================================================================
   SITE CONTENT — the single file you edit.
   -----------------------------------------------------------------------------
   Everything visible on this website comes from this file. No copy is hard-coded
   in components. Search for "EDIT:" to find fields that need your attention, and
   "CONFIRM:" for facts taken from your resume / project docs worth checking
   before you publish.

   Nothing here is invented. Every claim traces back to your resume, the CLINVARA
   handover document, or the Southeast Media README.
   ============================================================================= */

/* -----------------------------------------------------------------------------
   1. IDENTITY & CONTACT
   -------------------------------------------------------------------------- */

export const profile = {
  fullName: "Ineedi Venkata Sai Anirudh",
  firstName: "Anirudh",
  /** Rendered huge over the hero image. Keep it to one word if you can. */
  heroName: "Anirudh",
  /** Sits under the hero name, letter-spaced uppercase. */
  heroRole: "Full-Stack Developer",
  title: "Full-Stack Developer",
  positioning:
    "Full-stack developer who ships complete e-commerce and business websites end-to-end — design, build, deploy, operate.",
  location: "Hyderabad, Telangana, India",
  locationShort: "Hyderabad, India",
  available: true,
  availabilityLine: "Available for freelance projects",
  responseLine: "Typical response within 24 hours",
} as const;

export const contact = {
  // CONFIRM: from your resume.
  email: "ineedianirudh@gmail.com",
  // CONFIRM: from your resume. Used for the tel: link.
  phone: "+91 90596 88369",
  /** Digits only with country code, no "+" — this is what wa.me needs. */
  whatsappNumber: "919059688369",
  whatsappMessage: "Hi Anirudh — I found your portfolio and I'd like to discuss a project.",
  // CONFIRM: from your resume (GitHub username: Freak205).
  github: "https://github.com/Freak205",
  // EDIT: your resume lists the display name only, not the URL slug.
  // Open your LinkedIn profile, copy the URL from the address bar, paste it here.
  linkedin: "https://www.linkedin.com/in/venkata-sai-anirudh-ineedi",
  linkedinLabel: "Venkata Sai Anirudh Ineedi",
  /**
   * EDIT: the file behind the "Resume" and "Download CV" buttons.
   * A copy of Anirudh_Resume_PL.pdf is already in /public. Replace that file to
   * update it, or point this at a different path. Set to null to hide both
   * buttons everywhere.
   */
  resumeUrl: "/resume.pdf" as string | null,
} as const;

/**
 * EDIT: your production domain. Canonical URLs, sitemap, robots and OG images
 * read it, all at BUILD time — the pages are prerendered.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel, so a fresh deploy
 *      already points at its real .vercel.app domain instead of the fallback.
 *   3. The fallback below.
 */
const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://anirudh.dev");

export const siteUrl = resolvedSiteUrl.replace(/\/$/, "");

/* -----------------------------------------------------------------------------
   2. NAVIGATION
   -------------------------------------------------------------------------- */

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

/* -----------------------------------------------------------------------------
   3. TICKER
   The scrolling strip in the top-right of the header.
   Swap `items` for anything — a now-playing list, a status line, a manifesto.
   -------------------------------------------------------------------------- */

export const ticker = {
  show: true,
  /** Tiny label before the strip. Set to null to hide it. */
  label: "Now" as string | null,
  items: [
    "Building CLINVARA",
    "Shipping Southeast Media",
    "Open to freelance",
    "Based in Hyderabad",
    "Next.js · Firebase · Firestore",
  ],
} as const;

/* -----------------------------------------------------------------------------
   4. HERO
   The portrait fills the viewport and scales as you scroll.

   EDIT: drop a photo into /public (a tall portrait, ideally 1600×2000 or larger,
   subject centred) and set `image.src` to "/your-file.jpg". Leave it null and a
   designed placeholder renders instead — the layout is identical either way.
   -------------------------------------------------------------------------- */

export const hero = {
  image: {
    src: null as string | null,
    alt: "Portrait of Ineedi Venkata Sai Anirudh",
  },
  /** Revealed over the image as it scales away. Two lines. */
  scrollHeadline: ["I build complete platforms —", "idea to deployment."],
  scrollTag: "Two live production platforms, shipped independently.",
  scrollHint: "Scroll",
} as const;

/* -----------------------------------------------------------------------------
   5. SERVICES — "What I Do"
   -------------------------------------------------------------------------- */

export type ServiceIcon = "commerce" | "browser" | "spark" | "gauge";

export const servicesSection = {
  label: "What I Offer",
  headingLight: "What I",
  headingBold: "Do",
  intro:
    "I work end-to-end. A project can go from a first conversation to a live, indexed, maintained website without changing hands.",
} as const;

export const services: {
  icon: ServiceIcon;
  color: string;
  title: string;
  body: string;
}[] = [
  {
    icon: "commerce",
    color: "#FF8A3D",
    title: "E-commerce Development",
    body: "Complete storefronts, catalogues, carts, checkout experiences, admin tools and order-management functionality — built to be run by the people who own them.",
  },
  {
    icon: "browser",
    color: "#4ADE80",
    title: "Business & Brand Websites",
    body: "Professional websites designed to build trust, explain services and generate inquiries, with art direction that holds together across every page.",
  },
  {
    icon: "spark",
    color: "#A78BFA",
    title: "AI Feature Integration",
    body: "Useful AI-powered functionality — product-aware chat assistants, context-grounded responses, workflow automation and content tooling.",
  },
  {
    icon: "gauge",
    color: "#F472B6",
    title: "SEO, Deployment & Operations",
    body: "Search setup, structured data, production deployment, performance and media optimization, and the ongoing technical support that keeps it all live.",
  },
];

/* -----------------------------------------------------------------------------
   6. ARSENAL — "Technologies & Tools"
   Each entry names a simple-icons slug. The logo and its brand colour are pulled
   automatically. If a slug does not exist, the chip falls back to a lettermark —
   nothing breaks. Browse slugs at https://simpleicons.org.
   -------------------------------------------------------------------------- */

export const arsenalSection = {
  label: "Technologies & Tools",
  headingLight: "My",
  headingBold: "Arsenal",
  intro: "Everything here is in production on at least one of the platforms below.",
} as const;

/** Two rows that scroll in opposite directions. */
export const arsenal: { slug: string; label: string }[][] = [
  [
    { slug: "siNextdotjs", label: "Next.js" },
    { slug: "siReact", label: "React" },
    { slug: "siTypescript", label: "TypeScript" },
    { slug: "siTailwindcss", label: "Tailwind CSS" },
    { slug: "siFramer", label: "Framer Motion" },
    { slug: "siGreensock", label: "GSAP" },
    { slug: "siJavascript", label: "JavaScript" },
    { slug: "siHtml5", label: "HTML5" },
    { slug: "siCss", label: "CSS" },
  ],
  [
    { slug: "siNodedotjs", label: "Node.js" },
    { slug: "siExpress", label: "Express" },
    { slug: "siFirebase", label: "Firebase" },
    { slug: "siGooglecloud", label: "Cloud Firestore" },
    { slug: "siZod", label: "Zod" },
    { slug: "siResend", label: "Resend" },
    { slug: "siPython", label: "Python" },
    { slug: "siPytorch", label: "PyTorch" },
    { slug: "siHuggingface", label: "Hugging Face" },
    { slug: "siGit", label: "Git" },
  ],
];

/* -----------------------------------------------------------------------------
   7. SELECTED WORK
   IMAGES: leave `src: null` to render the labelled placeholder frame. To use a
   real screenshot, drop the file into /public/work/ and set src + width + height.
   -------------------------------------------------------------------------- */

export type ProjectImage = {
  src: string | null;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  /** Uppercase strapline under the card title. */
  subtitle: string;
  tagline: string;
  sector: string;
  timeframe: string;
  role: string;
  status: string;
  liveUrl: string;
  liveLabel: string;
  overview: string;
  need: string;
  responsibilities: string[];
  features: { title: string; body: string }[];
  implementation: { title: string; body: string }[];
  stack: { group: string; items: string[] }[];
  facts: { label: string; value: string }[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  context?: string;
};

export const workSection = {
  label: "Portfolio",
  headingLight: "Selected",
  headingBold: "Work",
  intro:
    "Both projects are real and publicly accessible. Open them in a new tab and click around — that is the point.",
} as const;

export const projects: Project[] = [
  {
    slug: "clinvara",
    index: "01",
    name: "CLINVARA",
    subtitle: "Clinical Skincare E-commerce",
    tagline: "A clinical luxury skincare e-commerce platform, built and operated end-to-end.",
    sector: "D2C · Skincare · E-commerce",
    // CONFIRM: your resume dates this engagement "May 2026 – Present".
    timeframe: "2026 — ongoing",
    role: "Sole developer — design, build, deploy, operate",
    status: "Live in production",
    liveUrl: "https://www.clinvara.global",
    liveLabel: "clinvara.global",
    overview:
      "CLINVARA is a live clinical skincare e-commerce platform built for the Indian market, focused on pigmentation-correction products formulated for Indian skin tones. I built the storefront, the customer account system, and the internal operations console, then deployed and now run the platform.",
    need: "A clinical skincare brand needed a storefront that reads as premium and medical at the same time — plus the internal tooling to actually run it. Catalogue, orders, returns, reviews, coupons and content all had to be manageable by the business without a developer in the loop.",
    // CONFIRM: your brief says RADIENT AI PVT LTD; your resume lists Boltzmann Labs
    // for this engagement. Set whichever is correct for public use.
    context: "Built during a Full Stack Developer internship at RADIENT AI PVT LTD, Hyderabad.",
    responsibilities: [
      "Frontend architecture and the full customer-facing storefront",
      "Firestore data modelling for catalogue, orders, customers and returns",
      "Authentication across Google, Facebook, email/password and mobile OTP",
      "Internal admin console covering products, orders, inventory and content",
      "Serverless backend API and transactional email automation",
      "SEO, structured data, sitemap and robots",
      "Cloud deployment, environment handling and ongoing operation",
      "Developer handover documentation",
    ],
    features: [
      {
        title: "Storefront and product discovery",
        body: "Homepage, shop listing, search overlay, category / concern / routine filtering, and product detail pages with galleries, ingredient accordions, delivery estimates and reviews.",
      },
      {
        title: "Cart, wishlist and checkout",
        body: "Persistent cart and wishlist that sync to Firestore for signed-in users and to local storage for guests, with quantity controls, live price refresh, address validation and order creation.",
      },
      {
        title: "Accounts, orders and returns",
        body: "Customer dashboard with order history, order detail timelines, tracking, self-service cancellation for eligible orders, and a return-request flow.",
      },
      {
        title: "Admin operations console",
        body: "Twelve modules — dashboard, products, inventory, orders, customers, coupons, reviews, analytics, returns, settings, maintenance and channel foundations — behind a role-guarded shell.",
      },
      {
        title: "Transactional email automation",
        body: "Ten lifecycle emails wired to order and return events: placed, confirmed, shipped, delivered, cancelled, return requested, return approved, refund processed, plus admin notifications.",
      },
      {
        title: "AI assistant",
        body: "A product-aware chat assistant served from the backend function, with the catalogue supplied as context.",
      },
    ],
    implementation: [
      {
        title: "Firestore-first catalogue with a static fallback",
        body: "Products load from Firestore and merge over a local catalogue, so the storefront stays up if seeding is incomplete. Slugs act as document IDs to keep URLs, orders, reviews and internal links stable, and a dedupe pass prevents duplicate entries.",
      },
      {
        title: "Security rules as the access boundary",
        body: "Firestore rules — not just UI guards — separate customer and admin surfaces. Customers read their own orders and write their own cart, wishlist and return requests; products, settings, coupons and order status are admin-write only.",
      },
      {
        title: "Graceful degradation everywhere",
        body: "A SafeImage component renders styled placeholders for products without artwork, metadata filters empty image fields so nothing ships a broken URL, and the social feed falls back cleanly when a platform token expires.",
      },
      {
        title: "SEO built in, not bolted on",
        body: "Route-level metadata, canonical URLs, Open Graph and Twitter cards, a dynamic sitemap and robots, and JSON-LD for organization, website, product, FAQ, breadcrumb and review schemas.",
      },
    ],
    stack: [
      {
        group: "Frontend",
        items: ["Next.js 14 App Router", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
      },
      { group: "Backend", items: ["Firebase Functions v2", "Express", "Node.js"] },
      {
        group: "Data & auth",
        items: ["Cloud Firestore", "Firebase Authentication", "Firestore security rules"],
      },
      {
        group: "Cloud & delivery",
        items: ["Firebase App Hosting", "Firebase Secret Manager", "Resend"],
      },
      {
        group: "AI & integrations",
        items: ["Groq API", "Instagram Graph API", "YouTube Data API", "Threads API", "GA4"],
      },
    ],
    facts: [
      { label: "Status", value: "Live in production" },
      { label: "Role", value: "Sole developer" },
      { label: "Admin modules", value: "12" },
      { label: "Lifecycle emails", value: "10" },
    ],
    cover: {
      src: "/work/clinvara-home.webp",
      alt: "CLINVARA storefront homepage with the Acne Reset Serum hero",
      caption: "CLINVARA — storefront homepage",
      width: 1600,
      height: 1000,
    },
    // Captured from the live storefront. The admin console is behind auth, so
    // every frame here is a page anyone can open and verify.
    gallery: [
      {
        src: "/work/clinvara-product.webp",
        alt: "CLINVARA product detail page for the Acne Reset Serum",
        caption: "Product detail page",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/clinvara-shop.webp",
        alt: "CLINVARA shop listing with concern and category filters",
        caption: "Shop listing and filtering",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/clinvara-routines.webp",
        alt: "CLINVARA routine finder listing skincare routines by skin need",
        caption: "Routine finder",
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    slug: "southeast-media",
    index: "02",
    name: "Southeast Media",
    subtitle: "CGI & VFX Studio Site",
    tagline: "The public site for a CGI and VFX studio — seven art-directed verticals, one motion system.",
    sector: "Media · Studio · Brand site",
    // CONFIRM: your resume dates this engagement "June 2026 – Present".
    timeframe: "2026 — ongoing",
    role: "Sole developer — design, build, deploy",
    status: "Live in production",
    liveUrl: "https://www.southeastmedia.in",
    liveLabel: "southeastmedia.in",
    overview:
      "Southeast Media is a CGI and VFX studio. Their public site presents seven distinct business verticals — pharma, real estate, films, VFX, animation, SaaS and enterprise — each art-directed on its own terms, and each carrying a large volume of in-house film and stills. I built the whole thing, from the scroll choreography to the deployment pipeline.",
    need: "A studio that sells visual craft cannot ship an ordinary website. The site had to hold roughly 127 MB of in-house film and stills without feeling slow, give seven very different verticals their own identity without fragmenting the brand, and turn attention into enquiries.",
    responsibilities: [
      "Translating brand direction into a production-ready, responsive web experience",
      "Page-level compositions for all seven verticals plus about and enquiry",
      "A shared motion and media system used across every scene",
      "Media pipeline — AVIF/WebP delivery, lazy video playback, caching strategy",
      "Enquiry form with validation, rate limiting and pluggable delivery",
      "SEO, canonical routing, sitemap, robots and Open Graph",
      "Deployment, DNS cutover and post-launch checklist",
    ],
    features: [
      {
        title: "Seven art-directed verticals",
        body: "Pharma, real estate, films, VFX, animation, SaaS and enterprise each get their own page-level composition, built from a shared component vocabulary so the brand holds together.",
      },
      {
        title: "Scroll choreography",
        body: "GSAP ScrollTrigger driving scene transitions over Lenis smooth scrolling, with Framer Motion, CSS 3D, canvas noise and matter.js used where each is the right tool.",
      },
      {
        title: "A media system, not a media folder",
        body: "Roughly 127 MB of in-house film and stills, served from a manifest with stable filenames, AVIF/WebP delivery, lazy video playback and a one-day cache with a week of stale-while-revalidate.",
      },
      {
        title: "Enquiry pipeline",
        body: "React Hook Form and Zod on the client, a route handler with rate limiting and honeypot protection on the server, and delivery over Resend or a webhook — configured per environment.",
      },
      {
        title: "Reduced motion respected throughout",
        body: "Every scroll-driven scene has a static equivalent. The site is fully usable with prefers-reduced-motion set.",
      },
    ],
    implementation: [
      {
        title: "Motion as a shared system",
        body: "Rather than animating each page by hand, scroll behaviour lives in a small set of primitives that every scene composes. It keeps timing consistent across seven very different pages and keeps the reduced-motion path in one place.",
      },
      {
        title: "Deliberate cache headers",
        body: "Media filenames are stable and get overwritten in place, so the cache header is deliberately not immutable — a one-day cache with a week of stale-while-revalidate lets the studio swap assets without a cache-busting rename.",
      },
      {
        title: "App Hosting over static hosting",
        body: "Classic static hosting would have forced an export build, dropping the enquiry route handler and image optimization. App Hosting keeps both, and pushes to main build and roll out automatically.",
      },
      {
        title: "Hardened by default",
        body: "Zod validation, rate limiting, honeypot fields, security headers, environment-aware SEO and dynamic imports for heavy scenes.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js 16 App Router", "React 19", "TypeScript", "Tailwind CSS v4"] },
      { group: "Motion", items: ["GSAP + ScrollTrigger", "Lenis", "Framer Motion", "matter.js", "Canvas"] },
      { group: "Forms & validation", items: ["React Hook Form", "Zod", "Rate limiting", "Honeypot"] },
      { group: "Cloud & delivery", items: ["Firebase App Hosting", "Resend / webhook transport", "AVIF & WebP"] },
      { group: "Quality", items: ["ESLint", "Prettier", "Husky + lint-staged", "TypeScript strict"] },
    ],
    facts: [
      { label: "Status", value: "Live in production" },
      { label: "Role", value: "Sole developer" },
      { label: "Vertical pages", value: "7" },
      { label: "In-house media", value: "~127 MB" },
    ],
    cover: {
      src: "/work/southeast-home.webp",
      alt: "Southeast Media homepage with the in-house CGI hero film playing",
      caption: "Southeast Media — homepage",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/work/southeast-verticals.webp",
        alt: "Southeast Media verticals index showing the seven disciplines as a media grid",
        caption: "Verticals index — seven disciplines",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/southeast-films.webp",
        alt: "Southeast Media films vertical with the in-house reel and shot selector",
        caption: "Films vertical — in-house reel",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/southeast-contact.webp",
        alt: "Southeast Media enquiry form with validated fields",
        caption: "Enquiry form",
        width: 1200,
        height: 900,
      },
    ],
  },
];

/* -----------------------------------------------------------------------------
   8. SIDE PROJECT
   Set `show: false` to remove the strip under Selected Work.
   -------------------------------------------------------------------------- */

export const sideProject = {
  show: true,
  label: "Also building",
  name: "ForgeLens",
  tagline: "Calibrated multimodal document forensics",
  body: "An independent deep-learning research platform for document-image forgery detection and pixel-level tamper localization — PyTorch training, a leakage-safe data pipeline, a calibrated evaluation harness, and LoRA fine-tuning of an open-weight vision-language model.",
  // CONFIRM: repository URL from your resume.
  href: "https://github.com/Freak205/FORGELENS",
  hrefLabel: "github.com/Freak205/FORGELENS",
  tags: ["PyTorch", "Computer vision", "VLM fine-tuning", "Research engineering"],
} as const;

/* -----------------------------------------------------------------------------
   9. AWARDS & RECOGNITION
   -----------------------------------------------------------------------------
   OFF by default. Nothing was invented here — your resume lists no awards or
   certifications, so there was nothing true to put in.

   To switch it on: add real entries below and set `show: true`. The section is
   fully built and will slot straight into the page between Work and About.
   -------------------------------------------------------------------------- */

export type AwardIcon = "trophy" | "medal" | "shield" | "star";

export const awardsSection = {
  show: false,
  label: "Recognition",
  headingLight: "Awards &",
  headingBold: "Recognition",
  intro: "Honours received for building and shipping software.",
} as const;

export const awards: { icon: AwardIcon; color: string; title: string; issuer: string }[] = [
  // Example of the shape — replace with real entries, then flip `show` above.
  // { icon: "trophy", color: "#FFB020", title: "Award name", issuer: "Issued by · Month Year" },
];

/* -----------------------------------------------------------------------------
   10. ABOUT
   EDIT: image.src — drop a photo into /public and set the path. Leave it null
   for the designed placeholder.
   -------------------------------------------------------------------------- */

export const about = {
  label: "Who I Am",
  headingLight: "About",
  headingBold: "Me",
  image: {
    src: null as string | null,
    alt: "Ineedi Venkata Sai Anirudh at work",
  },
  paragraphs: [
    "I'm a full-stack developer in Hyderabad. I build e-commerce platforms and business websites, and I take them all the way — architecture, interface, data model, backend, deployment, search visibility, and the unglamorous work of keeping them running afterwards.",
    "Two live platforms came out of that approach. CLINVARA is a clinical skincare store with a full operations console behind it. Southeast Media is a CGI studio site carrying a serious amount of in-house film. Different problems, same habit: I don't hand off at the halfway mark.",
    "I care about the business side too. A storefront that looks premium but can't be updated by the people who own it isn't finished. Neither is a beautiful site that no one can find.",
  ],
  /** Three counters. Every number here is verifiable from the two platforms. */
  stats: [
    { value: "02", label: "Live platforms in production" },
    { value: "12", label: "Admin modules built for CLINVARA" },
    { value: "07", label: "Art-directed verticals shipped" },
  ],
  /** Compact supporting facts. Education sits here, not at the centre. */
  credentials: [
    { label: "Based in", value: "Hyderabad, Telangana, India" },
    {
      label: "Education",
      value: "B.Tech, Computer Science & Engineering — GITAM (Deemed to be University), Hyderabad · 2023 intake",
    },
    { label: "Open to", value: "Freelance e-commerce, D2C, business and AI-integrated website projects" },
  ],
} as const;

/* -----------------------------------------------------------------------------
   11. PROFESSIONAL EXPERIENCE
   -------------------------------------------------------------------------- */

export const experienceSection = {
  label: "My Career Journey",
  headingLight: "Professional",
  headingBold: "Experience",
} as const;

export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  /** "On-site" | "Remote" | "Hybrid" — or leave it out. */
  mode?: string;
  bullets: string[];
  /** Renders in the muted "education" treatment instead of a role card. */
  kind?: "role" | "education";
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer Intern",
    company: "Southeast Media",
    companyUrl: "https://www.southeastmedia.in",
    // CONFIRM: your resume says "June 2026 – Present".
    period: "Jun 2026 — Present",
    location: "Hyderabad, Telangana, India",
    bullets: [
      "Owned end-to-end delivery of a live CGI/VFX studio platform spanning seven art-directed business verticals, translating brand direction into a production-ready, responsive web experience.",
      "Engineered a modular motion and media system using GSAP ScrollTrigger, Lenis, Framer Motion, CSS 3D, canvas noise and matter.js while preserving reduced-motion accessibility.",
      "Hardened deployment with Zod validation, rate limiting, honeypot protection, security headers, environment-aware SEO, AVIF/WebP delivery, lazy video playback, caching and dynamic imports.",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    // CONFIRM: your brief says RADIENT AI PVT LTD; your resume says Boltzmann Labs.
    company: "RADIENT AI PVT LTD",
    // CONFIRM: your resume says "May 2026 – Present".
    period: "May 2026 — Present",
    location: "Hyderabad, Telangana, India",
    bullets: [
      "Built CLINVARA, a clinical-skincare e-commerce platform, across frontend architecture, authentication, Firestore data design, serverless functions, automation, SEO, deployment readiness and documentation.",
      "Developed an internal operations console for workflow management, lifecycle visibility, content governance, service handling, platform controls and future channel expansion.",
      "Implemented resilient environment and fallback handling, canonical routing, sitemap/robots, Open Graph, JSON-LD structured data and automated social-content ingestion.",
    ],
  },
  {
    kind: "education",
    role: "B.Tech, Computer Science & Engineering",
    company: "GITAM (Deemed to be University)",
    period: "2023 — 2027",
    location: "Hyderabad, Telangana, India",
    bullets: [],
  },
];

/* -----------------------------------------------------------------------------
   12. TESTIMONIALS — "Client Recommendations"
   No quotes are invented. A slot with `quote: null` renders as a clearly
   reserved card. Fill in `quote`, `name`, `role` and `meta` and the card becomes
   a real recommendation. Set `show: false` to hide the section entirely.
   -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string | null;
  name: string | null;
  role: string | null;
  /** e.g. "March 2026 · Worked with Anirudh on the same team" */
  meta: string | null;
  /** Only used when `quote` is null. */
  reservedFor: string;
};

export const testimonialsSection = {
  show: true,
  label: "What People Say About Me",
  headingLight: "Client",
  headingBold: "Recommendations",
  emptyNote: "References available on request.",
} as const;

export const testimonials: Testimonial[] = [
  { quote: null, name: null, role: null, meta: null, reservedFor: "Internship guide — CLINVARA engagement" },
  { quote: null, name: null, role: null, meta: null, reservedFor: "Southeast Media — studio lead" },
  { quote: null, name: null, role: null, meta: null, reservedFor: "Freelance client" },
];

/* -----------------------------------------------------------------------------
   13. CONTACT — "Let's Work Together"
   -------------------------------------------------------------------------- */

export const contactSection = {
  label: "Get In Touch",
  headingLight: "Let's Work",
  headingBold: "Together",
  intro:
    "Currently open to freelance e-commerce, D2C and business website projects. Whether you have a storefront to build or a creative vision to bring to life, I'd love to hear from you.",
  primaryCta: "Send a message",
  secondaryCta: "Download CV",
  form: {
    title: "Start a project",
    subtitle: "Tell me what you're building and where it's stuck. I'll reply with an honest read on scope, approach and timeline.",
    projectTypes: [
      "E-commerce platform",
      "Business or brand website",
      "AI feature integration",
      "SEO, deployment & operations",
      "Something else",
    ],
    /** No prices are quoted anywhere else on the site. */
    budgetRanges: [
      "Not sure yet",
      "Under ₹50,000",
      "₹50,000 – ₹1,50,000",
      "₹1,50,000 – ₹4,00,000",
      "₹4,00,000+",
    ],
    submitLabel: "Send message",
    submitPendingLabel: "Sending…",
    successTitle: "Message sent.",
    successBody: "Thanks — I've got it. You'll hear back from me within 24 hours.",
    errorTitle: "That didn't go through.",
    errorBody: "Something failed on the way out. Email me directly and I'll pick it up from there.",
  },
} as const;

/* -----------------------------------------------------------------------------
   14. FOOTER
   -------------------------------------------------------------------------- */

export const footer = {
  statement: profile.positioning,
  copyrightName: profile.fullName,
  backToTopLabel: "Back to top",
  colophon: "Built with Next.js. Deployed on Vercel.",
} as const;

/* -----------------------------------------------------------------------------
   15. SEO / METADATA
   -------------------------------------------------------------------------- */

export const seo = {
  title: `${profile.fullName} — ${profile.title}`,
  titleSuffix: `${profile.firstName} · ${profile.title}`,
  description:
    "Full-stack developer in Hyderabad building complete e-commerce platforms and business websites — from design and development through deployment and ongoing operation. Two live production platforms shipped independently.",
  keywords: [
    "full-stack developer",
    "e-commerce developer",
    "Next.js developer",
    "freelance web developer Hyderabad",
    "D2C website developer",
    "Firebase developer",
  ],
  /** Twitter/X handle including "@". Leave null to omit the tag. */
  twitterHandle: null as string | null,
} as const;
