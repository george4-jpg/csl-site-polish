// Strategic Partners API helpers
// Writes flow through Supabase edge functions; Supabase is the source of truth.

const SUPABASE_URL = "https://oursmnzsgwjfiejppxac.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";

export const ORACLE_LEAD_ENDPOINT = `${SUPABASE_URL}/functions/v1/csl-oracle-lead`;
export const PARTNER_APP_ENDPOINT = `${SUPABASE_URL}/functions/v1/csl-strategic-partner-application`;

export async function postToEdgeFunction(url: string, payload: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(payload),
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* empty body is fine */
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : null) || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data as { success?: boolean; id?: string } | null;
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
