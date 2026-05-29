// Lightweight analytics helper wrapping Microsoft Clarity custom events.
// The Clarity script itself is loaded once in index.html.

// Supported CSL event names
export const CSL_EVENTS = {
  BOOK_CALL_CLICK: "book_call_click",
} as const;

export type CSLEvent = (typeof CSL_EVENTS)[keyof typeof CSL_EVENTS];

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a custom Clarity event. Safe no-op if Clarity has not loaded
 * (e.g. blocked by an ad blocker or running before the snippet executes).
 * Optional metadata is attached as Clarity custom tags.
 */
export function trackEvent(
  event: CSLEvent,
  metadata?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.clarity !== "function") return;
  window.clarity("event", event);
  if (metadata) {
    for (const [key, value] of Object.entries(metadata)) {
      window.clarity("set", key, String(value));
    }
  }
}
