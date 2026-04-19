// Supabase Edge Function: csl-host-application
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-host-application
// JWT verification: OFF (public form endpoint)
//
// Mirrors the csl-sponsor-inquiry pattern:
// 1. Upsert a GHL contact via Contacts API (location pawIA5SdWkMp2xKDUsN2)
// 2. Apply tag form-host-application, plus state-<slug> when present
// 3. Write host-specific fields to GHL custom fields on the contact
// 4. Send internal notification email (when RESEND_API_KEY is configured)

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
      venue_access,
      existing_executive_network,
      past_event_hosting,
      estimated_local_audience,
      preferred_event_format,
      timeline,
      cosponsor,
      source_page,
      cta_name,
    } = body || {};

    if (!full_name || !work_email) {
      return new Response(
        JSON.stringify({ error: "full_name and work_email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tags: string[] = ["form-host-application"];
    if (state && typeof state === "string" && state.trim().length > 0) {
      tags.push(`state-${slugifyState(state)}`);
    }

    // 1. Upsert GHL contact + write host-specific custom fields
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
            source: `CSL Website - ${source_page || "States"} - Host Application`,
            customFields: [
              { key: "title", value: title || "" },
              { key: "form_type", value: "host_application" },
              { key: "venue_access", value: venue_access || "" },
              { key: "existing_executive_network", value: existing_executive_network || "" },
              { key: "past_event_hosting", value: past_event_hosting || "" },
              { key: "estimated_local_audience", value: estimated_local_audience || "" },
              { key: "preferred_event_format", value: preferred_event_format || "" },
              { key: "timeline", value: timeline || "" },
              { key: "cosponsor", value: cosponsor || "" },
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
      console.log(`NOTIFICATION: New Host Application from ${organization || full_name} (${city || "?"} / ${state || "?"})`);
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
            subject: `New Host Application — ${organization || full_name} (${state || "—"})`,
            html: `
              <h2>New Host Application</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${full_name}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${work_email}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${phone || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Title:</td><td>${title || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${organization || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">City / State:</td><td>${city || "—"} / ${state || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Venue Access:</td><td>${venue_access || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Executive Network:</td><td>${existing_executive_network || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Past Hosting:</td><td>${past_event_hosting || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Est. Audience:</td><td>${estimated_local_audience || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Preferred Format:</td><td>${preferred_event_format || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Timeline:</td><td>${timeline || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Co-sponsor:</td><td>${cosponsor || "—"}</td></tr>
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
      JSON.stringify({ success: true, message: "Host application received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("csl-host-application error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
