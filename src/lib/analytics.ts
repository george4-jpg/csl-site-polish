// Lightweight analytics helper wrapping Google Analytics 4 (gtag.js) custom events.
// The gtag.js script itself is loaded once in index.html.

// Supported CSL event names
export const CSL_EVENTS = {
  EXECUTIVE_GUIDE_SUBMIT: "executive_guide_submit",
  SECURITY_BRIEF_SIGNUP: "security_brief_signup",
  EVENT_RSVP_SUBMIT: "event_rsvp_submit",
  MEMBERSHIP_INTEREST_SUBMIT: "membership_interest_submit",
  ADVISORY_INQUIRY_SUBMIT: "advisory_inquiry_submit",
  PARTNER_INTEREST_SUBMIT: "partner_interest_submit",
  BOOK_CALL_CLICK: "book_call_click",
  OUTBOUND_CLICK: "outbound_click",
  FILE_DOWNLOAD: "file_download",
  FORM_START: "form_start",
  FORM_ERROR: "form_error",
  SCROLL_75: "scroll_75",
} as const;

export type CSLEvent = (typeof CSL_EVENTS)[keyof typeof CSL_EVENTS];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a custom GA4 event. Safe no-op if gtag has not loaded
 * (e.g. blocked by an ad blocker or running before the snippet executes).
 * Optional metadata is attached as GA4 event parameters.
 */
export function trackEvent(
  event: CSLEvent,
  metadata?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, metadata ?? {});
}
