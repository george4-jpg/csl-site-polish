// Lightweight analytics helper wrapping Microsoft Clarity custom events.
// The Clarity script itself is loaded once in index.html.

// Supported CSL event names
export type CSLEvent =
  | "book_call_click";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a custom Clarity event. Safe no-op if Clarity has not loaded
 * (e.g. blocked by an ad blocker or running before the snippet executes).
 */
export function trackEvent(event: CSLEvent): void {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("event", event);
  }
}
