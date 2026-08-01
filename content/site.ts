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
    /**
     * 4:5 crop of the source photograph (800×800), extracted at left=40 so the
     * subject — in profile, facing left — keeps looking room in front of his
     * face rather than behind his head. Used by both the hero plate and About.
     *
     * /portrait-blur.webp is the matching out-of-focus field behind the hero
     * plate: the same photo at 160px, blurred at build time. Blur discards
     * detail, so shipping the full-size image twice would buy nothing. Replace
     * one and you must replace the other.
     */
    src: "/portrait.webp" as string | null,
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
  intro: "One person, first conversation to live site. Nothing changes hands.",
} as const;

export const services: {
  icon: ServiceIcon;
  color: string;
  title: string;
  /** One line. The `points` below carry the detail — keep this short. */
  body: string;
  /** Three short chips. They replace a paragraph, so keep each to 1–3 words. */
  points: string[];
}[] = [
  {
    icon: "commerce",
    color: "#FF8A3D",
    title: "E-commerce Development",
    body: "Storefronts built to be run by the people who own them.",
    points: ["Catalogue & search", "Cart to checkout", "Admin & orders"],
  },
  {
    icon: "browser",
    color: "#4ADE80",
    title: "Business & Brand Websites",
    body: "Sites that build trust, explain the work and bring in enquiries.",
    points: ["Art direction", "Responsive build", "Enquiry flows"],
  },
  {
    icon: "spark",
    color: "#A78BFA",
    title: "AI Feature Integration",
    body: "AI that earns its place in the product, not a bolted-on demo.",
    points: ["Product-aware chat", "Grounded answers", "Content tooling"],
  },
  {
    icon: "gauge",
    color: "#F472B6",
    title: "SEO, Deployment & Operations",
    body: "Getting it found, getting it shipped, keeping it alive.",
    points: ["Structured data", "Deploy pipeline", "Ongoing support"],
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
  intro: "All of it in production on a live platform.",
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
  /**
   * Hex colour that art-directs this case study — rules, glows, active states
   * and the running title all pick it up, so the two projects don't feel like
   * the same page with the words swapped.
   */
  accent: string;
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
  intro: "Both are live. Open them and click around — that's the point.",
} as const;

export const projects: Project[] = [
  {
    slug: "clinvara",
    index: "01",
    name: "CLINVARA",
    subtitle: "Clinical Skincare E-commerce",
    tagline: "A clinical luxury skincare e-commerce platform, built and operated end-to-end.",
    accent: "#FF8A3D",
    sector: "D2C · Skincare · E-commerce",
    // CONFIRM: your resume dates this engagement "May 2026 – Present".
    timeframe: "2026 — ongoing",
    role: "Sole developer — design, build, deploy, operate",
    status: "Live in production",
    liveUrl: "https://www.clinvara.global",
    liveLabel: "clinvara.global",
    overview:
      "A live skincare store for the Indian market, built around pigmentation correction for Indian skin tones. Storefront, customer accounts, operations console — I built all three, deployed them, and still run them.",
    need: "Premium and clinical at the same time, with the tooling to actually run it. Catalogue, orders, returns, reviews and coupons all had to be manageable without a developer in the loop.",
    // CONFIRM: your brief says RADIENT AI PVT LTD; your resume lists Boltzmann Labs
    // for this engagement. Set whichever is correct for public use.
    context: "Built during a Full Stack Developer internship at RADIENT AI PVT LTD, Hyderabad.",
    responsibilities: [
      "Frontend architecture",
      "Customer-facing storefront",
      "Firestore data modelling",
      "Auth — social, email, OTP",
      "Admin operations console",
      "Serverless API",
      "Transactional email",
      "SEO & structured data",
      "Deployment & operation",
      "Handover documentation",
    ],
    features: [
      {
        title: "Storefront and discovery",
        body: "Shop listing, search overlay, filtering by category, concern and routine, and product pages with galleries, ingredients and reviews.",
      },
      {
        title: "Cart, wishlist, checkout",
        body: "Cart and wishlist persist to Firestore when signed in and to local storage when not — with live price refresh and address validation.",
      },
      {
        title: "Accounts and returns",
        body: "Order history and timelines, tracking, self-service cancellation where eligible, and a full return-request flow.",
      },
      {
        title: "Operations console",
        body: "Twelve modules from products to analytics, behind a role-guarded shell the business runs without me.",
      },
      {
        title: "Email automation",
        body: "Ten lifecycle emails wired to order and return events, from placed through refund processed.",
      },
      {
        title: "AI assistant",
        body: "A product-aware chat assistant served from the backend function, with the catalogue supplied as context.",
      },
    ],
    implementation: [
      {
        title: "Firestore-first catalogue with a static fallback",
        body: "Products load from Firestore and merge over a local catalogue, so the storefront stays up if seeding is incomplete. Slugs double as document IDs, which keeps URLs, orders and reviews pointing at the same thing forever.",
      },
      {
        title: "Security rules as the access boundary",
        body: "Firestore rules, not UI guards, separate customer and admin surfaces. Customers touch only their own orders, cart and returns; products, coupons and order status are admin-write only.",
      },
      {
        title: "Graceful degradation everywhere",
        body: "Products without artwork get styled placeholders, metadata filters empty image fields so nothing ships a broken URL, and the social feed falls back cleanly when a token expires.",
      },
      {
        title: "SEO built in, not bolted on",
        body: "Route-level metadata, canonicals, OG and Twitter cards, dynamic sitemap and robots, and JSON-LD for product, FAQ, breadcrumb and review.",
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
    accent: "#22D3EE",
    sector: "Media · Studio · Brand site",
    // CONFIRM: your resume dates this engagement "June 2026 – Present".
    timeframe: "2026 — ongoing",
    role: "Sole developer — design, build, deploy",
    status: "Live in production",
    liveUrl: "https://www.southeastmedia.in",
    liveLabel: "southeastmedia.in",
    overview:
      "Seven business verticals — pharma, real estate, films, VFX, animation, SaaS, enterprise — each art-directed on its own terms and each carrying a lot of in-house film. I built all of it, scroll choreography through deployment.",
    need: "A studio that sells visual craft can't ship an ordinary website. Roughly 127 MB of film and stills that never feels slow, seven verticals with their own identity, one brand holding it together.",
    responsibilities: [
      "Brand direction to build",
      "Seven vertical compositions",
      "Shared motion system",
      "Media pipeline",
      "AVIF/WebP delivery",
      "Enquiry form & validation",
      "SEO & canonical routing",
      "Deployment & DNS cutover",
    ],
    features: [
      {
        title: "Seven art-directed verticals",
        body: "Pharma, real estate, films, VFX, animation, SaaS and enterprise each get their own composition, built from one shared vocabulary so the brand holds.",
      },
      {
        title: "Scroll choreography",
        body: "GSAP ScrollTrigger over Lenis smooth scrolling, with Framer Motion, CSS 3D, canvas noise and matter.js each used where it's actually the right tool.",
      },
      {
        title: "A media system, not a folder",
        body: "~127 MB of in-house film served from a manifest — stable filenames, AVIF/WebP, lazy video and a deliberate cache policy.",
      },
      {
        title: "Enquiry pipeline",
        body: "Zod on both sides, rate limiting and honeypot on the server, delivery over Resend or a webhook depending on the environment.",
      },
      {
        title: "Reduced motion respected",
        body: "Every scroll-driven scene has a static equivalent. The site is fully usable with prefers-reduced-motion set.",
      },
    ],
    implementation: [
      {
        title: "Motion as a shared system",
        body: "Scroll behaviour lives in a handful of primitives every scene composes, instead of being hand-animated per page. Timing stays consistent across seven very different pages and the reduced-motion path lives in one place.",
      },
      {
        title: "Deliberate cache headers",
        body: "Media filenames are stable and overwritten in place, so the cache header is deliberately not immutable — one day of cache with a week of stale-while-revalidate lets the studio swap assets without renaming anything.",
      },
      {
        title: "App Hosting over static hosting",
        body: "Static hosting would have forced an export build and dropped both the enquiry route handler and image optimization. App Hosting keeps them, and pushes to main roll out on their own.",
      },
      {
        title: "Hardened by default",
        body: "Zod validation, rate limiting, honeypot fields, security headers, environment-aware SEO and dynamic imports for the heavy scenes.",
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
  body: "Independent deep-learning research into document forgery detection and pixel-level tamper localization — PyTorch training, a leakage-safe pipeline, and LoRA fine-tuning of an open-weight VLM.",
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
    src: "/portrait.webp" as string | null,
    alt: "Ineedi Venkata Sai Anirudh",
  },
  paragraphs: [
    "Full-stack developer in Hyderabad. I build e-commerce platforms and business websites and take them all the way — architecture, interface, data, backend, deployment, and the unglamorous work of keeping them running.",
    "Two live platforms came out of that. Different problems, same habit: I don't hand off at the halfway mark.",
    "A storefront the owner can't update isn't finished. Neither is a beautiful site nobody can find.",
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
    "Open to freelance e-commerce, D2C and business website work. Tell me what you're building.",
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
