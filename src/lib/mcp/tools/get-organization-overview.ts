import { defineTool } from "@lovable.dev/mcp-js";

const OVERVIEW = `Cybersecurity Leadership (CSL) — powered by Monarch217 — is a practitioner-led leadership platform for executives, boards, and community leaders navigating cyber risk, AI adoption, and governance.

Positioning: trust over transaction, leader-controlled outcomes, and an ongoing platform (not a one-off vendor engagement). Legal status: 501(c)(3) pending. No vendor agenda; member-first and neutral.

Core focus areas:
- Cybersecurity leadership and executive readiness
- AI governance and responsible AI adoption
- Executive cohorts and advisory services
- Ziggy — an Executive Intelligence Operating System (private preview)

Website: https://cybersecurity-leadership.org
Founder: George Cater IV — practitioner-led positioning.`;

export default defineTool({
  name: "get_organization_overview",
  title: "Organization overview",
  description:
    "Returns a high-level overview of Cybersecurity Leadership (CSL) / Monarch217: mission, positioning, focus areas, and website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: OVERVIEW }],
    structuredContent: {
      name: "Cybersecurity Leadership (CSL)",
      brand: "Monarch217",
      website: "https://cybersecurity-leadership.org",
      founder: "George Cater IV",
      legalStatus: "501(c)(3) pending",
      focusAreas: [
        "Cybersecurity leadership",
        "AI governance",
        "Executive cohorts",
        "Advisory services",
        "Ziggy — Executive Intelligence Operating System",
      ],
    },
  }),
});
