import { defineTool } from "@lovable.dev/mcp-js";

const BASE = "https://cybersecurity-leadership.org";

const CONTACT = {
  bookACall: `${BASE}/book`,
  join: `${BASE}/membership`,
  events: `${BASE}/events`,
  register: `${BASE}/register`,
  strategicPartners: `${BASE}/strategic-partners`,
  requestZiggyPreview: `${BASE}/ziggy`,
};

export default defineTool({
  name: "get_contact_and_booking",
  title: "Contact & booking links",
  description:
    "Returns the canonical links for engaging with Cybersecurity Leadership: booking a strategy call, joining as a member, viewing events, registering, partnership inquiries, and requesting a Ziggy private preview.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const text = [
      `Book a strategy call: ${CONTACT.bookACall}`,
      `Join / Membership: ${CONTACT.join}`,
      `Events: ${CONTACT.events}`,
      `Register for an event: ${CONTACT.register}`,
      `Strategic partnerships: ${CONTACT.strategicPartners}`,
      `Request a Ziggy private preview: ${CONTACT.requestZiggyPreview}`,
    ].join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: CONTACT,
    };
  },
});
