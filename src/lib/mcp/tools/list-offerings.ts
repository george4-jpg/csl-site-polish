import { defineTool } from "@lovable.dev/mcp-js";

const OFFERINGS = [
  {
    name: "Membership",
    summary:
      "Executive membership in the Cybersecurity Leadership platform. Trust-first community for leaders navigating cyber risk and AI governance.",
    path: "/membership",
    cta: "Join",
  },
  {
    name: "Executive Cohorts",
    summary:
      "Practitioner-led cohorts for executives building leadership capability across cybersecurity and AI adoption.",
    path: "/cohort",
    cta: "Book a call",
  },
  {
    name: "AI Governance",
    summary:
      "Governance program for organizations adopting AI responsibly, with practical operating structure and human oversight.",
    path: "/services/ai-governance",
    cta: "Request",
  },
  {
    name: "Advisory Services",
    summary:
      "Direct advisory engagements for executives and boards on cyber risk, AI governance, and leadership strategy.",
    path: "/services/advisory",
    cta: "Book a call",
  },
  {
    name: "Strategic Partnerships",
    summary:
      "Partnership opportunities for organizations aligned with the platform's mission.",
    path: "/strategic-partners",
    cta: "Apply",
  },
  {
    name: "Ziggy — Executive Intelligence Operating System",
    summary:
      "A relationship-first Executive Intelligence Operating System with a warm companion interface, built on trust, privacy, human approval, and closed-loop execution. Currently in private preview.",
    path: "/ziggy",
    cta: "Request private preview",
  },
];

const BASE = "https://cybersecurity-leadership.org";

export default defineTool({
  name: "list_offerings",
  title: "List offerings",
  description:
    "Lists the programs and services offered by Cybersecurity Leadership (membership, cohorts, AI governance, advisory, partnerships, and Ziggy) with a short summary and page link for each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = OFFERINGS.map((o) => ({ ...o, url: `${BASE}${o.path}` }));
    const text = items
      .map((o) => `• ${o.name}\n  ${o.summary}\n  ${o.url}`)
      .join("\n\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: { offerings: items },
    };
  },
});
