export const SITE_URL = "https://cybersecurity-leadership.org";
export const SITE_NAME = "Cybersecurity-Leadership Inc.";
export const DEFAULT_TITLE = "CSL | Cybersecurity Leadership";
export const DEFAULT_DESCRIPTION =
  "The national leadership platform for cybersecurity. Built for C-Level, boards, and community leaders.";

export type SEOConfig = {
  title: string;
  description: string;
  path: string;
  image?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const CANVAS_OG = `${SITE_URL}/og/canvas-webinar.jpg`;

const canvasEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Canvas Lessons Learned Webinar",
  description:
    "A free CSL leadership webinar on the Canvas/Instructure incident, vendor cyber risk, student privacy, and executive response.",
  startDate: "2026-05-29T11:00:00-05:00",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: `${SITE_URL}/events/canvas-lessons-learned`,
  },
  image: CANVAS_OG,
  organizer: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/events/canvas-lessons-learned`,
  },
};

export const seoByPath: Record<string, SEOConfig> = {
  "/": {
    title: "CSL | National Platform for C-Level & Boards",
    description:
      "CSL is a national leadership platform for C-Level, boards, and community leaders working across cybersecurity and AI risk.",
    path: "/",
  },
  "/membership": {
    title: "CSL Membership for Cybersecurity Leaders",
    description:
      "Join CSL as a practitioner member and enter a governed, peer-led platform built for cybersecurity leaders and decision-makers.",
    path: "/membership",
  },
  "/framework": {
    title: "CSL | Cybersecurity Leadership Operating Model",
    description:
      "Use the CSL operating model to assess, organize, and elevate cyber capability across leadership, risk, assets, resilience, and execution.",
    path: "/framework",
  },
  "/framework-40": {
    title: "CSL | Next-Generation Cybersecurity Leadership",
    description:
      "Preview the next-generation CSL leadership operating system built for executive alignment, cyber strategy, and live intelligence.",
    path: "/framework-40",
  },
  "/services": {
    title: "CSL | Advisory, AI Governance & Executive Cohorts",
    description:
      "Explore CSL advisory services, AI governance support, executive cohorts, and partner-led programs for leaders and boards.",
    path: "/services",
  },
  "/ai-governance": {
    title: "CSL AI Governance Package",
    description:
      "CSL helps executive teams build practical, defensible, board-ready AI governance frameworks, policies, and operating models.",
    path: "/ai-governance",
  },
  "/advisory": {
    title: "CSL Executive Cybersecurity Advisory",
    description:
      "Practitioner-led cybersecurity advisory for executive risk, funding strategy, board briefings, assessments, and ongoing leadership support.",
    path: "/advisory",
  },
  "/cohort": {
    title: "CSL Leadership Cohorts",
    description:
      "Small-group CSL leadership cohorts help executives build board-ready AI governance capability through focused peer work.",
    path: "/cohort",
  },
  "/states": {
    title: "Explore Your State Network | CSL",
    description:
      "Explore CSL state networks, city rooms, host opportunities, cybersecurity signals, and leadership activity across all 50 states.",
    path: "/states",
  },
  "/states/missouri": {
    title: "Missouri | CSL State Profile",
    description:
      "View the Missouri CSL state profile, active city rooms, K-12 cyber focus, funding signals, and the flagship state blueprint.",
    path: "/states/missouri",
  },
  "/strategic-partners": {
    title: "CSL Strategic Partner Network",
    description:
      "Explore CSL's strategic partner network of operators, platforms, and advisory partners selected for member value and execution.",
    path: "/strategic-partners",
  },
  "/sponsor": {
    title: "Become a CSL Strategic Partner",
    description:
      "Learn how to contribute practical expertise and member value as a CSL Strategic Partner, with no vendor agenda and a member-first model.",
    path: "/sponsor",
  },
  "/strategic-partners/oracle": {
    title: "CSL Strategic Partner | Monarch Precision Group",
    description:
      "Monarch Precision Group helps leaders identify Oracle licensing, pricing, and architecture issues, often surfacing 20-40% recoverable spend.",
    path: "/strategic-partners/oracle",
  },
  "/strategic-partners/apply": {
    title: "Partner Application | CSL",
    description:
      "Apply to become a CSL Strategic Partner and submit your organization for review based on member value, execution, and alignment.",
    path: "/strategic-partners/apply",
  },
  "/security-brief": {
    title: "Cybersecurity Intelligence for Leaders | CSL",
    description:
      "Subscribe to CSL cybersecurity leadership intelligence for executives, boards, and community leaders who need signal over noise.",
    path: "/security-brief",
  },
  "/newsroom": {
    title: "Cybersecurity Leadership News & Updates | CSL",
    description:
      "Follow CSL cybersecurity leadership news, updates, contributor insights, and cyber and AI intelligence for decision-makers.",
    path: "/newsroom",
  },
  "/george4": {
    title: "Cybersecurity Leadership | George Cater IV",
    description:
      "Read George Cater IV's practitioner-led cybersecurity leadership perspective and CSL founder positioning for executives and boards.",
    path: "/george4",
  },
  "/george4-series": {
    title: "George Cater IV Leadership Series | CSL",
    description:
      "Follow the George Cater IV leadership series on cyber risk, AI governance, and executive decision-making across the CSL platform.",
    path: "/george4-series",
  },
  "/events": {
    title: "CSL Leadership Events Calendar",
    description:
      "Browse upcoming CSL leadership events, executive dinners, gather sessions, and live webinars for cyber and AI risk leaders.",
    path: "/events",
  },
  "/book": {
    title: "Book a CSL Leadership Conversation",
    description:
      "Schedule a direct conversation with CSL leadership to discuss cyber risk, AI governance, advisory, membership, or partner opportunities.",
    path: "/book",
  },
  "/enroll": {
    title: "Enroll in CSL Membership",
    description:
      "Complete CSL membership enrollment as a practitioner, executive, or community leader and join the national cybersecurity leadership platform.",
    path: "/enroll",
  },
  "/register": {
    title: "Reserve Your Seat | CSL",
    description:
      "Reserve your seat at an upcoming CSL leadership event, dinner, or gather session with executive cybersecurity peers.",
    path: "/register",
  },
  "/onboarding": {
    title: "CSL Member Onboarding",
    description:
      "Complete CSL member onboarding to access the leadership operating system, peer rooms, and platform resources.",
    path: "/onboarding",
  },
  "/attack-map": {
    title: "Live Cyber Attack Intelligence | CSL",
    description:
      "Monitor live cyber attack intelligence and executive context curated for CSL leaders, boards, and community decision-makers.",
    path: "/attack-map",
  },
  "/get-more": {
    title: "Go Deeper with CSL",
    description:
      "Explore deeper engagement with CSL through membership, advisory, executive cohorts, AI governance, and strategic partner programs.",
    path: "/get-more",
  },
  "/events/kc-dinner-april-30": {
    title: "Kansas City Executive Dinner | CSL Event",
    description:
      "Reserve your seat at the CSL Kansas City executive leadership dinner for cybersecurity and AI risk decision-makers.",
    path: "/events/kc-dinner-april-30",
  },
  "/events/kc-launch-cookout": {
    title: "Kansas City Launch Cookout | CSL Gather",
    description:
      "Join the CSL Kansas City launch cookout, a relaxed executive gather for cybersecurity, AI, and community leaders.",
    path: "/events/kc-launch-cookout",
  },
  "/gather/kc-launch-cookout": {
    title: "Kansas City Launch Cookout | CSL Gather",
    description:
      "Join the CSL Kansas City launch cookout, a relaxed executive gather for cybersecurity, AI, and community leaders.",
    path: "/gather/kc-launch-cookout",
  },
  "/gather/samer-canvas": {
    title: "Samer Canvas Gather | CSL",
    description:
      "RSVP for the Samer Canvas CSL Gather, a focused leadership conversation on cyber risk and executive response.",
    path: "/gather/samer-canvas",
  },
  "/events/canvas-lessons-learned": {
    title: "Canvas Lessons Learned | CSL Event",
    description:
      "A practical live webinar for education, cybersecurity, and technology leaders on the Canvas incident, identity, AI, student safety, and cyber risk leadership.",
    path: "/events/canvas-lessons-learned",
    image: CANVAS_OG,
    structuredData: canvasEventSchema,
  },
  "/webinars/canvas-lessons-learned": {
    title: "Canvas Lessons Learned Webinar | CSL",
    description:
      "Free CSL webinar for education and cybersecurity leaders on Canvas vendor risk, student privacy, communications, continuity, and board briefings.",
    path: "/webinars/canvas-lessons-learned",
    image: CANVAS_OG,
    structuredData: canvasEventSchema,
  },
};

export const getCanonicalUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export const getSEOConfig = (path: string): SEOConfig =>
  seoByPath[path] ?? {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path,
  };

export const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "CSL",
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      email: "info@cybersecurity-leadership.org",
      areaServed: "United States",
      audience: ["C-Level leaders", "Boards", "Community leaders"],
      knowsAbout: [
        "Cybersecurity leadership",
        "AI governance",
        "Executive advisory",
        "Cyber risk",
        "State cybersecurity networks",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "CSL",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#primary-pages`,
      name: "CSL Primary Pages",
      itemListElement: Object.values(seoByPath).map((page, index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: page.title,
        url: getCanonicalUrl(page.path),
      })),
    },
  ],
};
