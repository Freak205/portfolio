/* =============================================================================
   SITE CONTENT — the single file you edit.
   -----------------------------------------------------------------------------
   Everything visible on this website comes from this file. No copy is hard-coded
   in components. Search for "EDIT:" to find fields that need your attention, and
   "CONFIRM:" for facts taken from your resume / project docs worth checking
   before you publish.

   Nothing here is invented. Every claim traces back to your resume, the CLINVARA
   handover document, the Southeast Media README, or the project case studies for
   InsightFlow AI, Project Steer and ForgeLens.

   The site speaks to two audiences at once — hiring teams and clients — so most
   sections carry both. Search for "HIRING" to find the parts aimed at recruiters.
   ============================================================================= */

/* -----------------------------------------------------------------------------
   1. IDENTITY & CONTACT
   -------------------------------------------------------------------------- */

export const profile = {
  fullName: "Ineedi Venkata Sai Anirudh",
  firstName: "Anirudh",
  /** Rendered huge across the hero. Keep it to one word if you can. */
  heroName: "Anirudh",
  /** Sits under the hero name, letter-spaced uppercase. */
  heroRole: "Full-Stack Developer",
  title: "Full-Stack Developer",
  positioning:
    "Full-stack developer who builds websites and web platforms of every kind — commerce, brand, product, SaaS, content, internal tooling — and takes each one from first sketch to live and maintained.",
  location: "Hyderabad, Telangana, India",
  locationShort: "Hyderabad, India",

  /* HIRING — both switches drive the status dots, the hero strip and the two
     lanes in the Contact section. Flip either to false when it stops being true
     and the copy updates everywhere. */
  openToRoles: true,
  openToFreelance: true,
  rolesLine: "Open to full-time & internship roles",
  freelanceLine: "Available for freelance projects",
  responseLine: "Typical response within 24 hours",
} as const;

/** Kept for the availability dot in Contact — true if either lane is open. */
export const available = profile.openToRoles || profile.openToFreelance;

export const contact = {
  // CONFIRM: from your resume.
  email: "ineedianirudh@gmail.com",
  // CONFIRM: from your resume. Used for the tel: link.
  phone: "+91 90596 88369",
  /** Digits only with country code, no "+" — this is what wa.me needs. */
  whatsappNumber: "919059688369",
  whatsappMessage: "Hi Anirudh — I found your portfolio and I'd like to talk.",
  // CONFIRM: from your resume (GitHub username: Freak205).
  github: "https://github.com/Freak205",
  // EDIT: your resume lists the display name only, not the URL slug.
  // Open your LinkedIn profile, copy the URL from the address bar, paste it here.
  linkedin: "https://www.linkedin.com/in/venkata-sai-anirudh-ineedi-20052005m/",
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
  { label: "Lab", href: "/#lab" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

/* -----------------------------------------------------------------------------
   3. TICKER
   The scrolling strip in the top-right of the header.
   -------------------------------------------------------------------------- */

export const ticker = {
  show: true,
  /** Tiny label before the strip. Set to null to hide it. */
  label: "Now" as string | null,
  items: [
    "Open to roles",
    "Building CLINVARA",
    "Shipping Southeast Media",
    "Available for freelance",
    "Based in Hyderabad",
  ],
} as const;

/* -----------------------------------------------------------------------------
   4. HERO
   -----------------------------------------------------------------------------
   No photograph, and no card. The whole window is a heads-up display: a ring
   assembly turning behind the name, a radar sweep, telemetry down both margins
   and a reticle that locks to the pointer, with the name set edge to edge
   across the middle of it.

   Everything on the display is data-driven from `hud` and `layers` below, so
   changing a label or a colour re-draws it. Keep the telemetry values true —
   they read off your real profile, and a HUD full of invented numbers is a
   screensaver.
   -------------------------------------------------------------------------- */

export const hero = {
  /** HIRING — the status chips in the top-right of the display. */
  status: {
    roles: "Open to roles",
    freelance: "Freelance available",
  },
  /** The display's chrome. Short machine-set strings — keep them that way. */
  hud: {
    /** Top-left of the frame. */
    code: "SYS · Anirudh — Online",
    /** Set vertically up the frame's left edge. */
    edge: profile.locationShort,
    /** Runs through the scale line above the name. */
    dimension: "Full-stack",
    /** Bottom-left, under the layer rail. */
    readout: "One owner · idea → production",
    /** Bottom-right stamp. */
    stamp: "Rev. 2026.1",
    /**
     * The readout groups down both margins. Two words each at most — they are
     * set at 10px, and the column is only as wide as the frame's padding.
     * Every value here is true and comes from the profile above.
     */
    telemetry: [
      { label: "Stack", value: "3 layers" },
      { label: "Base", value: profile.locationShort },
      { label: "Roles", value: profile.openToRoles ? "Open" : "Closed" },
      { label: "Reply", value: "< 24 h" },
    ],
  },
  /**
   * The three layers, spread along the rail under the name. Three is the
   * number the rail is drawn for; the colours also tint their own tick.
   */
  layers: [
    { label: "Interface", color: "#22D3EE" },
    { label: "Logic", color: "#7B7BF5" },
    { label: "Data", color: "#5B5BF0" },
  ],
  /** Revealed over the sheet as it fades away. Two lines. */
  scrollHeadline: ["I build every layer —", "idea to deployment."],
  scrollTag: "Client platforms in production, plus AI, vision and research projects of my own.",
  scrollHint: "Scroll",
} as const;

/* -----------------------------------------------------------------------------
   5. SERVICES — "What I Do"
   -----------------------------------------------------------------------------
   Deliberately broad. The first card is the umbrella — any kind of site — and
   the rest are the specialisms underneath it. These four titles also scroll
   through the band directly under the hero.
   -------------------------------------------------------------------------- */

export type ServiceIcon = "browser" | "commerce" | "spark" | "gauge";

export const servicesSection = {
  label: "What I Offer",
  headingLight: "What I",
  headingBold: "Do",
  intro:
    "Any kind of website or web platform, and every layer of it. One person, first conversation to live site — nothing changes hands.",
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
    icon: "browser",
    color: "#4ADE80",
    title: "Websites & Web Platforms",
    body: "Whatever the site needs to be — brand, studio, product, SaaS, content, internal tool.",
    points: ["Art direction", "Responsive build", "Dashboards & tools"],
  },
  {
    icon: "commerce",
    color: "#FF8A3D",
    title: "E-commerce & D2C",
    body: "Storefronts built to be run by the people who own them.",
    points: ["Catalogue & search", "Cart to checkout", "Admin & orders"],
  },
  {
    icon: "spark",
    color: "#A78BFA",
    title: "AI & Data Features",
    body: "AI and analytics that earn their place in the product, not a bolted-on demo.",
    points: ["Grounded answers", "Analytics & reporting", "Computer vision"],
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
   nothing breaks. Browse slugs at https://simpleicons.org, then register the
   import in lib/brand-icons.ts.
   -------------------------------------------------------------------------- */

export const arsenalSection = {
  label: "Technologies & Tools",
  headingLight: "My",
  headingBold: "Arsenal",
  intro: "All of it in production or in a shipped project — nothing on this list is theory.",
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
    { slug: "siVercel", label: "Vercel" },
  ],
  [
    { slug: "siNodedotjs", label: "Node.js" },
    { slug: "siExpress", label: "Express" },
    { slug: "siFirebase", label: "Firebase" },
    { slug: "siGooglecloud", label: "Cloud Firestore" },
    { slug: "siPython", label: "Python" },
    { slug: "siFlask", label: "Flask" },
    { slug: "siPandas", label: "Pandas" },
    { slug: "siNumpy", label: "NumPy" },
    { slug: "siPytorch", label: "PyTorch" },
    { slug: "siOpencv", label: "OpenCV" },
    { slug: "siMediapipe", label: "MediaPipe" },
    { slug: "siHuggingface", label: "Hugging Face" },
    { slug: "siZod", label: "Zod" },
    { slug: "siPytest", label: "Pytest" },
    { slug: "siGithubactions", label: "GitHub Actions" },
    { slug: "siGit", label: "Git" },
  ],
];

/* -----------------------------------------------------------------------------
   7. SELECTED WORK — the two flagships
   -----------------------------------------------------------------------------
   These are the headline builds and they get the whole top of the page plus a
   full case study each at /work/[slug]. Personal projects live in section 8 and
   are deliberately presented below these, not beside them.

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
  label: "Flagship Projects",
  headingLight: "Selected",
  headingBold: "Work",
  intro:
    "Two production platforms, each built and operated end to end. Both are live — open them and click around, that's the point.",
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
   8. THE LAB — personal projects
   -----------------------------------------------------------------------------
   Built for their own sake, not for a client. They carry the range the two
   flagships can't: Python, data, generative AI, computer vision, real-time
   systems, test suites and CI.

   `caseStudy: true` gives a project its own page at /lab/[slug] and needs every
   optional field below filled in. `caseStudy: false` renders the card only and
   sends visitors straight to the repository — use it when there isn't enough
   verified detail to fill a page honestly.
   -------------------------------------------------------------------------- */

export type LabProject = {
  slug: string;
  index: string;
  name: string;
  /** Uppercase strapline under the card title. */
  subtitle: string;
  /** One line, used on the card and as the case-study lede. */
  tagline: string;
  accent: string;
  /** Discipline line — what kind of engineering this is. */
  discipline: string;
  /** Version / platform / release state. */
  release: string;
  role: string;
  status: string;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
  /** Shown when there is no public link — say why, honestly. */
  linkNote?: string;
  /** Two or three sentences. The card body. */
  summary: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  caseStudy: boolean;

  /* Everything below is required when caseStudy is true. */
  overview?: string;
  problem?: string;
  approach?: string;
  highlights?: { title: string; body: string }[];
  engineering?: { title: string; body: string }[];
  stack?: { group: string; items: string[] }[];
  /** Stated plainly. Knowing where a thing stops is part of the work. */
  limitations?: string[];
  next?: string[];
};

export const labSection = {
  label: "Personal Projects & Research",
  headingLight: "The",
  headingBold: "Lab",
  intro:
    "Built because I wanted them to exist — and finished to the same standard as the client work: tested, typed, documented, deployed.",
} as const;

export const lab: LabProject[] = [
  {
    slug: "insightflow-ai",
    index: "01",
    name: "InsightFlow AI",
    subtitle: "AI Sales Analytics Platform",
    tagline:
      "Upload a sales CSV, get a full analytics dashboard — no account, no database, no file ever stored.",
    accent: "#4ADE80",
    discipline: "Full-stack · Data analytics · Generative AI",
    release: "v2.0.0 · Production-ready",
    role: "Sole developer",
    status: "Live",
    liveUrl: "https://insightflow-ai-clean.vercel.app",
    liveLabel: "insightflow-ai-clean.vercel.app",
    repoUrl: "https://github.com/Freak205/insightflow-ai-clean",
    repoLabel: "Freak205/insightflow-ai-clean",
    summary:
      "A Flask and Pandas analytics app that turns raw sales CSVs into revenue KPIs, product rankings, time-series charts, seasonal analysis and downloadable reports — detecting the revenue, product and date columns on its own. It runs stateless on serverless: the uploaded file is never persisted, only a compressed, signed analytics digest that fits inside a cookie.",
    tags: ["Python", "Flask", "Pandas", "OpenAI API", "SVG", "Vercel", "Serverless"],
    metrics: [
      { label: "Automated tests", value: "146" },
      { label: "Branch coverage", value: "92.55%" },
      { label: "Session digest", value: "3.2 KB" },
      { label: "Frontend JS deps", value: "0" },
    ],
    caseStudy: true,
    overview:
      "InsightFlow AI is a privacy-conscious sales analytics platform built with Python and Flask. A visitor uploads a CSV and immediately gets revenue KPIs, product rankings, a revenue trend, seasonal performance, plain-language findings, demand observations and downloadable reports — with no account, no manual column mapping, no database and no persistent file storage. It also answers questions about the uploaded data in plain language, grounded in the computed summary rather than in the model's own guesses.",
    problem:
      "Small retailers keep sales records in CSVs but rarely have the time or tooling to configure a BI platform, map columns by hand, build a dashboard per dataset, and maintain a database behind it. For a one-off look at a file — what sold, what didn't, which way the trend is going — a traditional BI product is far more setup than the question is worth.",
    approach:
      "Upload, normalise, analyse, reduce, render. Pandas does the whole analysis inside the upload request; the DataFrame is then reduced to a compact aggregate digest, and that digest — not the file — is what survives. Compressed, encoded and signed into the session cookie, it lets any serverless instance render the dashboard, answer a question or build an export without shared storage of any kind.",
    highlights: [
      {
        title: "Column detection that doesn't guess badly",
        body: "Headers are normalised to snake_case, then revenue is found by exact name, partial match and numeric fallback. Text columns are scored to find the product label, and ID-, code- and SKU-like fields are penalised so a chart never keys off a meaningless identifier.",
      },
      {
        title: "A dashboard, not a chart dump",
        body: "Total revenue, record count, growth across visible periods, top product, average per record, revenue trend, product rankings and revenue share, best and worst performers, strongest period, and a preview of the data itself.",
      },
      {
        title: "Charts written by hand in SVG",
        body: "No Chart.js, no D3, no charting dependency at all. A responsive line-and-area chart, a horizontal ranking chart and a stacked share chart, all native SVG with keyboard-accessible data points, focus tooltips, ResizeObserver redraws and a table view of every value.",
      },
      {
        title: "Grounded AI question answering",
        body: "Only a compact factual summary of the analysis is sent to the model, with instructions to answer from that data alone. If the API is missing, slow or empty, deterministic logic answers the common questions — top product, weakest product, total revenue, trend direction, best and worst period — from the same digest.",
      },
      {
        title: "Seasonal retail analysis",
        body: "The year is split into summer, monsoon and winter for Indian retail patterns. For the current season it surfaces top products, the best month and its revenue, inventory and promotion suggestions, and local weather proxied through the backend so the API key never reaches the browser.",
      },
      {
        title: "Reports without a spreadsheet library",
        body: "CSV and JSON exports covering dataset summary, top products, revenue over time, seasonal rankings, generated insights and demand observations. Filenames are sanitised so a hostile dataset name can't malform the Content-Disposition header, and responses are marked private, no-store.",
      },
    ],
    engineering: [
      {
        title: "Keeping state without a database",
        body: "The obvious design — save the upload to disk, put its ID in the session — fails on serverless: the filesystem may be read-only, temp storage is per-instance, and consecutive requests can land on different instances. Instead the DataFrame is reduced during the upload request itself and only the resulting aggregate digest is carried forward, so any instance can serve the next request.",
      },
      {
        title: "Fitting an analysis inside a cookie",
        body: "Browsers cap cookies near 4 KB, so the encoded digest targets a 3,200-byte budget. When it doesn't fit, detail is dropped in a fixed least-important-first order: the data preview, then older trend points, then the longer product rankings, then extra insight text, then additional seasonal entries. The dashboard degrades in a predictable way instead of failing.",
      },
      {
        title: "Staying useful when the APIs aren't",
        body: "Both external services can be missing, slow or down. Requests are bounded by timeouts, errors are mapped rather than surfaced raw, and every AI answer has a deterministic fallback. With no OpenAI key the chat still answers; with no weather key only the weather lookup is disabled. The dashboard and exports never depend on either.",
      },
      {
        title: "A strict CSP the frontend can actually live under",
        body: "No CDN scripts, no external fonts, no inline handlers, no charting library — which is what makes a default-src 'self' policy possible while still shipping responsive charts and a theme switch. CI enforces it: the pipeline fails if a third-party frontend dependency or a CSP-breaking inline style or handler is introduced.",
      },
      {
        title: "Protecting paid APIs from anonymous traffic",
        body: "Anonymous visitors can burn model and weather quota, so the AI and lookup routes get separate per-IP sliding-window limits with bounded limiter memory. CSRF protection with constant-time token comparison, signed HTTP-only SameSite cookies, HSTS and a production startup check on SECRET_KEY sit alongside it.",
      },
      {
        title: "Two dependency manifests that can't drift",
        body: "Vercel reads dependencies from pyproject.toml while other deployment paths use requirements.txt. Automated tests assert the two lists stay synchronised and fully pinned, so a deploy target can't silently install a different set of packages than the one the suite ran against.",
      },
    ],
    stack: [
      {
        group: "Backend",
        items: ["Python 3.12+", "Flask 3.1", "Pandas 2.3", "NumPy 2.5", "Gunicorn"],
      },
      {
        group: "Frontend",
        items: ["Jinja templates", "Vanilla JavaScript", "Hand-authored CSS", "Native SVG charts", "Light & dark themes"],
      },
      {
        group: "AI & APIs",
        items: ["OpenAI Responses API", "gpt-4.1-mini", "OpenWeatherMap weather", "OpenWeatherMap geocoding"],
      },
      {
        group: "Security",
        items: ["CSRF tokens", "Signed sessions", "Strict CSP", "HSTS", "Per-IP rate limiting"],
      },
      {
        group: "Delivery",
        items: ["Vercel serverless", "WSGI app factory", "GitHub Actions", "Python 3.12 & 3.13 matrix"],
      },
      {
        group: "Quality",
        items: ["Pytest", "Coverage.py", "Ruff", "Strict MyPy", "pip-audit", "Pre-commit hooks"],
      },
    ],
    limitations: [
      "Uploads are capped at roughly 4 MB by default.",
      "Results last for the current browser session only, and dashboards can't be shared with another user.",
      "The session digest is signed against tampering but not encrypted.",
      "Rate limits are per serverless instance rather than global.",
      "Demand observations are interpretable heuristics, not a trained forecasting model — I don't describe them as ML forecasting.",
    ],
    next: [
      "Authentication and saved dashboards",
      "Object storage for persistent datasets",
      "Redis-backed global rate limiting",
      "Multi-file and period-over-period comparison",
      "Backtested forecasting and anomaly detection",
    ],
  },
  {
    slug: "project-steer",
    index: "02",
    name: "Project Steer",
    subtitle: "Webcam Gesture Driving Controller",
    tagline: "Drive Windows racing games with your hands and a webcam — no controller, no keyboard, no wheel.",
    accent: "#F472B6",
    discipline: "Computer vision · Real-time systems · HCI",
    release: "v0.4.1 · Windows",
    role: "Sole developer",
    status: "Open source",
    // EDIT: add the public repository URL here and the card links to it
    // automatically. Until then the card shows `linkNote` instead.
    repoUrl: undefined,
    repoLabel: undefined,
    linkNote: "Repository link and demo capture available on request.",
    summary:
      "A real-time computer-vision controller that turns hand gestures into Xbox 360 controller input. MediaPipe reads 21 landmarks per hand; a geometry and interaction layer converts wheel rotation, hand height, palm pose and fist motion into analog steering, throttle, brake, nitro and full menu navigation — including calibration and exit, so a session never needs a keyboard.",
    tags: ["Python", "MediaPipe", "OpenCV", "vgamepad", "XInput", "State machines", "Pytest"],
    metrics: [
      { label: "Automated tests", value: "30" },
      { label: "Production modules", value: "16" },
      { label: "Landmarks per hand", value: "21" },
      { label: "Gesture commands", value: "10" },
    ],
    caseStudy: true,
    overview:
      "Project Steer explores how an ordinary webcam becomes an accessible, contactless game controller. It detects up to two hands, extracts 21 landmarks from each, and analyses palm position, wheel angle, vertical movement, finger extension and fist rotation to recognise driving and menu gestures — which it emits as analog axes and button pulses on an emulated Xbox 360 controller. What separates it from a gesture demo is everything around the recognition: calibration, adaptive smoothing, conflict resolution, camera recovery, fail-safe neutralisation, per-game profiles and a test suite.",
    problem:
      "Racing games expect a keyboard, gamepad or dedicated wheel — devices that may be unavailable, expensive, or difficult to use with certain mobility limitations. A webcam prototype can demonstrate steering in an afternoon; making it playable is the hard part. Tracking drops out. Landmarks jitter. Everyone holds their hands at a different angle and height. Similar poses trigger conflicting actions. A disconnected camera can leave a button held down mid-race. And menus need discrete presses while driving needs continuous analog input.",
    approach:
      "The player holds two closed hands up like a wheel. A short neutral-pose calibration captures their natural angle and hand height, then the app continuously computes the angle and midpoint of the virtual wheel and maps it to the left stick and triggers. Driving and menu interaction are separated by an explicit state machine, smoothing adapts to how fast the input is changing, and every failure path resets the controller to neutral before anything else happens.",
    highlights: [
      {
        title: "Webcam-only from launch to exit",
        body: "Steering, throttle, braking, nitro, pause, menu navigation, confirm, back, resume, recalibration and a safe shutdown are all gestures. No keyboard command is required during normal operation.",
      },
      {
        title: "Analog, not binary",
        body: "Wheel angle becomes a continuous −1 to 1 stick value past a configurable dead zone, with wrapped-angle arithmetic so crossing ±180° never flips the steering. Hand height above the calibrated midpoint becomes analog throttle; opening both palms is an immediate full brake that still allows steering.",
      },
      {
        title: "Calibration that is verified, not trusted",
        body: "Neutral pose is captured from median samples, rejecting frames with excessive angular or vertical movement. It is persisted per Windows user, game profile, camera index and mirroring mode — but never trusted on launch: every start validates it against a fresh live sample and fully recalibrates if the pose has drifted.",
      },
      {
        title: "A gesture-driven menu mode",
        body: "An open palm plus a V sign enters menu mode, where analog axes go neutral and open-palm movement becomes D-pad pulses, the screen-left fist confirms, the screen-right fist goes back, and holding both fists resumes driving. Buttons are emitted as short pulses so games register them without leaving anything held.",
      },
      {
        title: "Per-game JSON profiles",
        body: "Button mappings, steering, throttle and brake scaling, dead zones, full-scale ranges, smoothing coefficients and adaptive response boosts all live in a profile. The Asphalt Legends profile, for example, uses a 4° dead zone and reaches full steering at 22°.",
      },
      {
        title: "Diagnostics and a privacy-safe analyser",
        body: "A live OpenCV HUD shows landmarks, the virtual wheel line, steering and throttle meters, active buttons, mode, FPS, tracking confidence and camera reconnections. Recorded video can be replayed through the production control pipeline offline, producing a JSON timeline that deliberately excludes frames and raw landmark coordinates.",
      },
    ],
    engineering: [
      {
        title: "Mirrored-hand ambiguity",
        body: "Mirrored webcam footage and an occasionally wrong handedness prediction can reverse the steering — the worst possible failure in a driving game. Hands are therefore ordered by visible horizontal screen position rather than by the model's Left/Right label, which is kept only for diagnostics.",
      },
      {
        title: "Responsiveness against stability",
        body: "A fixed exponential moving average either lets jitter through or adds lag; there is no setting that does both. The smoothing coefficient adapts instead: near the current output it stays heavy so a resting hand doesn't twitch the wheel, and it rises automatically as the input change grows, so sharp turns and hard acceleration land quickly.",
      },
      {
        title: "Gestures that don't collide",
        body: "Open palms, menu entry, braking, steering and nitro all overlap in landmark space. They are separated by explicit interaction modes, temporal hold requirements, a priority order, and mutual exclusivity between throttle and brake with brake winning. Finger counting ignores the thumb, whose apparent direction changes too much as the hand rotates.",
      },
      {
        title: "Nitro that normal steering can't trigger",
        body: "Nitro is a rotating fist — a motion, not a pose — which ordinary wheel rotation resembles closely. It requires one rotating fist and one stable anchor fist, a wheel angle that stays roughly still, physically plausible per-frame rotation steps, a minimum net rotation, and all of it inside a bounded time window.",
      },
      {
        title: "Failing safe on hardware faults",
        body: "A camera disconnect could otherwise leave the virtual controller holding its last input — full throttle into a wall. Output is neutralised whenever the expected two hands are missing, a pose is unrecognised, frames stop arriving, the preview closes, tracking throws, or the app exits. Recovery neutralises first, scans other camera indexes, prefers DirectShow on Windows, retries a bounded number of times, and then demands fresh calibration.",
      },
    ],
    stack: [
      { group: "Vision", items: ["MediaPipe Hand Landmarker", "OpenCV", "NumPy geometry"] },
      { group: "Control output", items: ["vgamepad", "ViGEmBus", "Xbox 360 / XInput"] },
      { group: "Language & config", items: ["Python", "JSON game profiles", "setuptools + pyproject.toml"] },
      { group: "Interface", items: ["OpenCV-rendered HUD", "Preview-only safety mode", "Doctor diagnostics command"] },
      { group: "Quality", items: ["Pytest", "Ruff", "PowerShell automation", "GitHub Actions on Windows"] },
    ],
    limitations: [
      "Windows-first — virtual controller output depends on XInput and ViGEmBus.",
      "Requires a game that accepts Xbox controller input.",
      "Performance depends on webcam quality, lighting and hand visibility.",
      "Recognition uses landmark geometry and temporal rules, not a custom-trained gesture model.",
      "Some online games restrict synthetic or virtual-controller input.",
    ],
    next: [
      "Gesture-controlled in-app settings",
      "Additional game profiles",
      "A custom-trained gesture model and automatic sensitivity personalisation",
      "Signed Windows installer and standalone executable",
      "Cross-platform virtual-controller output",
    ],
  },
  {
    slug: "forgelens",
    index: "03",
    name: "ForgeLens",
    subtitle: "Document Forensics Research",
    tagline: "Calibrated multimodal detection and pixel-level localization of document forgery.",
    accent: "#A78BFA",
    discipline: "Deep learning · Computer vision · Research",
    release: "Ongoing research",
    role: "Independent research",
    status: "In progress",
    repoUrl: "https://github.com/Freak205/FORGELENS",
    repoLabel: "Freak205/FORGELENS",
    summary:
      "Independent deep-learning research into document forgery detection and pixel-level tamper localization — PyTorch training, a leakage-safe data pipeline, and LoRA fine-tuning of an open-weight vision-language model.",
    tags: ["PyTorch", "Computer vision", "VLM fine-tuning", "LoRA", "Research engineering"],
    metrics: [],
    caseStudy: false,
  },
];

/* -----------------------------------------------------------------------------
   9. AWARDS & RECOGNITION
   -----------------------------------------------------------------------------
   OFF by default. Nothing was invented here — your resume lists no awards or
   certifications, so there was nothing true to put in.

   To switch it on: add real entries below and set `show: true`. The section is
   fully built and will slot straight into the page.
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
   -----------------------------------------------------------------------------
   No photograph here either. The left column is a drawn profile plate carrying
   the range of work — which is the thing a visitor actually needs from this
   section.
   -------------------------------------------------------------------------- */

export const about = {
  label: "Who I Am",
  headingLight: "About",
  headingBold: "Me",
  /** The drawn plate that replaces the portrait. */
  plate: {
    label: "Working profile",
    monogram: "A",
    /** The kinds of site I build. This is the "any kind of site" claim, itemised. */
    disciplines: [
      "Commerce & D2C",
      "Brand & studio",
      "Product & SaaS",
      "Content & editorial",
      "Internal tools",
      "AI & data apps",
    ],
    note: "Interface, logic and data — same pair of hands.",
  },
  paragraphs: [
    "Full-stack developer in Hyderabad. I build websites and web platforms of every kind — storefronts, studio sites, product and SaaS front ends, content platforms, internal tools — and I take each one the whole way: architecture, interface, data, backend, deployment, and the unglamorous work of keeping it running.",
    "Two of those are live client platforms I still operate. Three more are mine: an AI analytics app, a computer-vision game controller, and deep-learning research into document forensics.",
    "Different problems, one habit — I don't hand off at the halfway mark. A storefront the owner can't update isn't finished. Neither is a beautiful site nobody can find.",
  ],
  /** Three counters. Every number here is verifiable from the projects listed. */
  stats: [
    { value: "02", label: "Live client platforms in production" },
    { value: "03", label: "Personal engineering projects" },
    { value: "176", label: "Automated tests across my own projects" },
  ],
  /** Compact supporting facts. Education sits here, not at the centre. */
  credentials: [
    { label: "Based in", value: "Hyderabad, Telangana, India" },
    {
      label: "Education",
      value: "B.Tech, Computer Science & Engineering — GITAM (Deemed to be University), Hyderabad · 2023 – 2027",
    },
    {
      label: "Open to",
      value:
        "Full-time and internship roles in full-stack, frontend or product engineering — and freelance work of any kind",
    },
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
   -----------------------------------------------------------------------------
   Two lanes, because the site has two audiences. HIRING is the first one.
   -------------------------------------------------------------------------- */

export const contactSection = {
  label: "Get In Touch",
  headingLight: "Let's Work",
  headingBold: "Together",
  intro:
    "Two ways in — hire me for a role, or bring me a project. Either way, tell me what you're building and I'll give you an honest read.",
  lanes: [
    {
      kind: "hiring" as const,
      label: "For hiring teams",
      title: "Full-time & internship roles",
      body: "Full-stack, frontend or product engineering. Everything on this site is running in production or public on GitHub — the résumé, the live platforms and the source all check out against each other.",
      cta: "Download CV",
    },
    {
      kind: "clients" as const,
      label: "For clients & founders",
      title: "Freelance projects",
      body: "Any kind of site — storefront, brand, studio, product, SaaS, content or internal tool. One person from the first conversation to live, indexed and maintained.",
      cta: "Start a project",
    },
  ],
  primaryCta: "Send a message",
  secondaryCta: "Download CV",
  form: {
    title: "Start a conversation",
    subtitle:
      "A role or a project — both go to the same inbox. Tell me what you need and I'll reply with an honest read on fit, scope and timeline.",
    projectTypes: [
      "Full-time or internship role",
      "E-commerce platform",
      "Business, brand or studio website",
      "Product, SaaS or web app",
      "AI or data feature",
      "SEO, deployment & operations",
      "Something else",
    ],
    /** No prices are quoted anywhere else on the site. */
    budgetRanges: [
      "Not applicable — hiring enquiry",
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
    "Full-stack developer in Hyderabad building websites and web platforms of every kind — commerce, brand, product, SaaS, content and internal tools — from design through deployment and operation. Two live client platforms, plus AI, computer-vision and deep-learning projects of my own. Open to roles and freelance work.",
  keywords: [
    "full-stack developer",
    "hire full-stack developer",
    "Next.js developer",
    "React developer Hyderabad",
    "web developer Hyderabad",
    "freelance web developer India",
    "e-commerce developer",
    "Python developer",
    "computer vision engineer",
    "Firebase developer",
  ],
  /** Twitter/X handle including "@". Leave null to omit the tag. */
  twitterHandle: null as string | null,
  /**
   * The social sharing card. Kept short deliberately — it is read at thumbnail
   * size in a chat window, not on a page.
   */
  og: {
    headline: "I build websites and web platforms of every kind.",
    sub: "Live client platforms, plus AI, computer-vision and deep-learning projects of my own.",
  },
} as const;
