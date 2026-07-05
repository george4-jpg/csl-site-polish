import { defineMcp } from "@lovable.dev/mcp-js";
import getOrganizationOverview from "./tools/get-organization-overview";
import listOfferings from "./tools/list-offerings";
import getContactAndBooking from "./tools/get-contact-and-booking";

export default defineMcp({
  name: "cybersecurity-leadership-mcp",
  title: "Cybersecurity Leadership MCP",
  version: "0.1.0",
  instructions:
    "Tools for Cybersecurity Leadership (CSL) / Monarch217, a practitioner-led leadership platform for cyber risk, AI governance, and executive readiness. Use `get_organization_overview` for context, `list_offerings` for programs and services, and `get_contact_and_booking` for engagement links.",
  tools: [getOrganizationOverview, listOfferings, getContactAndBooking],
});
