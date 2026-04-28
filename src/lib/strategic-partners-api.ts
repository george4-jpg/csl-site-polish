// Strategic Partners API helpers
// Supabase is the source of truth. The Strategic Partner Apply form writes
// directly to PostgREST because its edge function is not currently deployed.

const SUPABASE_URL = "https://oursmnzsgwjfiejppxac.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";

// Edge functions used by other workflows.
export const ORACLE_LEAD_ENDPOINT = `${SUPABASE_URL}/functions/v1/csl-oracle-lead`;
export const PARTNER_APP_NOTIFICATION_ENDPOINT = `${SUPABASE_URL}/functions/v1/csl-strategic-partner-notification`;

// Direct PostgREST endpoints (source of truth for the public apply form).
export const PARTNER_APP_REST_ENDPOINT = `${SUPABASE_URL}/rest/v1/strategic_partner_applications`;

// Columns confirmed present in the deployed strategic_partner_applications table.
const PARTNER_APP_ALLOWED_COLUMNS = new Set([
  "name",
  "email",
  "phone",
  "company",
  "website",
  "solution_area",
  "target_market",
  "member_value",
  "revenue_model",
  "notes",
]);

function pickAllowed(payload: Record<string, unknown>, allowed: Set<string>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (allowed.has(k)) out[k] = v;
  }
  return out;
}

function humanizeError(status: number, raw: string): string {
  // Try to surface a clean, user-readable message.
  let parsed: { message?: string; code?: string; error?: string } | null = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    /* non-JSON */
  }

  if (status === 401 || status === 403 || parsed?.code === "42501") {
    return "We could not save your application. Please contact CSL leadership directly.";
  }
  if (status === 400 || status === 422 || parsed?.code?.startsWith("PGRST")) {
    return "Some required information was missing or invalid. Please review your entries and try again.";
  }
  if (status >= 500) {
    return "Our system is temporarily unavailable. Please try again in a moment.";
  }
  return parsed?.message || parsed?.error || "Submission failed. Please try again.";
}

/**
 * Submit a Strategic Partner application directly to Supabase PostgREST.
 * The deployed edge function is not currently available, so writes go through
 * REST with the publishable (anon) key; the table's RLS policy permits anon inserts.
 */
export async function submitStrategicPartnerApplication(payload: Record<string, unknown>) {
  const body = pickAllowed(payload, PARTNER_APP_ALLOWED_COLUMNS);

  let res: Response;
  try {
    res = await fetch(PARTNER_APP_REST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
        // The live table permits anonymous inserts but not anonymous row reads,
        // so requesting a returned representation causes PostgREST to reject the insert.
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    });
  } catch (networkErr) {
    console.error("[strategic-partner-apply] Network error:", networkErr);
    throw new Error("We could not reach the application service. Please check your connection and try again.");
  }

  const bodyText = await res.text();

  if (!res.ok) {
    console.error("[strategic-partner-apply] Response status:", res.status);
    console.error("[strategic-partner-apply] Response body:", bodyText);
    throw new Error(humanizeError(res.status, bodyText));
  }

  // Fire-and-forget internal notification. Never block the user success message
  // if notification delivery fails after the Supabase row has been saved.
  try {
    void fetch(PARTNER_APP_NOTIFICATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(body),
    })
      .then(async (notifyRes) => {
        if (!notifyRes.ok) {
          const txt = await notifyRes.text().catch(() => "");
          console.error("[strategic-partner-apply] Notification failed:", notifyRes.status, txt);
        }
      })
      .catch((notifyErr) => {
        console.error("[strategic-partner-apply] Notification error:", notifyErr);
      });
  } catch (notifyErr) {
    console.error("[strategic-partner-apply] Notification dispatch error:", notifyErr);
  }

  return { success: true };
}

// Backwards-compatible helper (still used by Oracle lead form via the existing edge function).
export async function postToEdgeFunction(url: string, payload: Record<string, unknown>) {
  if (!url) {
    throw new Error("This service is not configured. Please try again later.");
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    console.error("[edge-fn] Network error:", networkErr);
    throw new Error("We could not reach the service. Please try again.");
  }

  const bodyText = await res.text();

  if (!res.ok) {
    console.error("[edge-fn] Failed", { url, status: res.status, body: bodyText });
    throw new Error(humanizeError(res.status, bodyText));
  }

  try {
    return bodyText ? JSON.parse(bodyText) : null;
  } catch {
    return null;
  }
}

// =====================================================================
// Oracle savings calculator
// =====================================================================
export const ORACLE_SPEND_OPTIONS = [
  { label: "$250K – $500K", value: "250k-500k", midpoint: 375_000 },
  { label: "$500K – $1M", value: "500k-1m", midpoint: 750_000 },
  { label: "$1M – $5M", value: "1m-5m", midpoint: 3_000_000 },
  { label: "$5M – $10M", value: "5m-10m", midpoint: 7_500_000 },
  { label: "$10M+", value: "10m-plus", midpoint: 10_000_000 },
] as const;

export const COMPLEXITY_OPTIONS = [
  { label: "Low", value: "low", multiplier: 0.85 },
  { label: "Moderate", value: "moderate", multiplier: 1.0 },
  { label: "High", value: "high", multiplier: 1.15 },
] as const;

export const ORACLE_MODULES = [
  "Database",
  "OCI",
  "ERP",
  "Middleware",
  "Contracts & Support",
  "Infrastructure Design",
  "Not Sure",
] as const;

export const INDUSTRIES = ["Government", "Education", "Finance", "Healthcare", "Other"] as const;

export const CONTACT_METHODS = ["Email", "Phone", "Text"] as const;

export function calculateOracleSavings(spendValue: string, complexityValue: string) {
  const spend = ORACLE_SPEND_OPTIONS.find((s) => s.value === spendValue)?.midpoint ?? 0;
  const multiplier = COMPLEXITY_OPTIONS.find((c) => c.value === complexityValue)?.multiplier ?? 1.0;
  const low = Math.round(spend * 0.2 * multiplier);
  const high = Math.round(spend * 0.4 * multiplier);
  return { low, high };
}

export function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}
