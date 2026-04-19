// Supabase Edge Function: csl-express-interest
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-express-interest
// JWT verification: OFF (public form endpoint)
//
// Mirrors the csl-sponsor-inquiry pattern:
// 1. Upsert a GHL contact via Contacts API (location pawIA5SdWkMp2xKDUsN2)
// 2. Apply tag form-express-interest, plus state-<slug> when present
// 3. Send internal notification email (when RESEND_API_KEY is configured)
// 4. Return clean JSON response

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_LOCATION_ID = "pawIA5SdWkMp2xKDUsN2";
const NOTIFICATION_EMAIL = "george4@cybersecurity-leadership.org";

function slugifyState(state: string): string {
  return state
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      full_name,
      work_email,
      phone,
      title,
      organization,
      city,
      state,
      source_page,
      cta_name,
    } = body || {};

    if (!full_name || !work_email) {
      return new Response(
        JSON.stringify({ error: "full_name and work_email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tags: string[] = ["form-express-interest"];
    if (state && typeof state === "string" && state.trim().length > 0) {
      tags.push(`state-${slugifyState(state)}`);
    }

    // 1. Upsert GHL contact
    const ghlApiKey = Deno.env.get("GHL_API_KEY");
    if (ghlApiKey) {
      try {
        const nameParts = String(full_name).trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ghlApiKey}`,
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            firstName,
            lastName,
            email: work_email,
            phone: phone || "",
            companyName: organization || "",
            city: city || "",
            state: state || "",
            tags,
            source: `CSL Website - ${source_page || "States"}`,
            customFields: [
              { key: "title", value: title || "" },
              { key: "form_type", value: "express_interest" },
              { key: "cta_name", value: cta_name || "" },
              { key: "source_page", value: source_page || "" },
            ],
          }),
        });

        if (!ghlRes.ok) {
          const detail = await ghlRes.text();
          console.error("GHL upsert non-OK:", ghlRes.status, detail);
        }
      } catch (ghlErr) {
        console.error("GHL upsert error:", ghlErr);
      }
    } else {
      console.warn("GHL_API_KEY not configured — skipping GHL upsert");
    }

    // 2. Internal notification email (best-effort)
    try {
      console.log(`NOTIFICATION: New Express Interest from ${organization || full_name}`);
      const resendKey = Deno.env.get("RESEND_API_KEY");
      if (resendKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "CSL Website <noreply@cybersecurity-leadership.org>",
            to: [NOTIFICATION_EMAIL],
            subject: `New Express Interest — ${organization || full_name}`,
            html: `
              <h2>New Express Interest</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${full_name}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${work_email}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${phone || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Title:</td><td>${title || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${organization || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">City:</td><td>${city || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">State:</td><td>${state || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Source:</td><td>${source_page || "States"} — ${cta_name || ""}</td></tr>
              </table>
            `,
          }),
        });
      }
    } catch (emailErr) {
      console.error("Email notification error:", emailErr);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Express interest received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("csl-express-interest error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
