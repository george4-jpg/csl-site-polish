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
    title: "CSL Partner Network",
    description:
      "Explore CSL's strategic partner network of operators, platforms, and advisory partners selected for member value and execution.",
    path: "/strategic-partners",
  },
  "/sponsor": {
    title: "CSL Partner Network",
    description:
      "Learn how CSL Strategic Partners contribute practical expertise, member value, and trusted support without a vendor agenda.",
    path: "/sponsor",
  },
  "/strategic-partners/oracle": {
    title: "CSL Strategic Partner | Monarch Precision Group",
    description:
      "Monarch Precision Group helps leaders identify Oracle licensing, pricing, and architecture issues, often surfacing 20–40% recoverable spend.",
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