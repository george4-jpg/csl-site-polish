// Supabase Edge Function: csl-leader-nomination
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-leader-nomination
// JWT verification: OFF (public form endpoint)
//
// Mirrors the csl-sponsor-inquiry pattern:
// 1. Upsert a GHL contact for the NOMINATOR (location pawIA5SdWkMp2xKDUsN2)
// 2. Apply tag form-leader-nomination-submitter to the nominator
// 3. Write all nominee details to custom fields on the nominator AND add a contact note
// 4. Do NOT create a separate contact for the nominee
// 5. Send internal notification email (when RESEND_API_KEY is configured)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_LOCATION_ID = "pawIA5SdWkMp2xKDUsN2";
const NOTIFICATION_EMAIL = "george4@cybersecurity-leadership.org";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      your_name,
      your_email,
      your_phone,
      your_organization,
      relationship_to_nominee,
      nominee_name,
      nominee_title,
      nominee_organization,
      nominee_email,
      nominee_phone,
      nominee_city_state,
      why_nominating,
      nominee_hosts,
      source_page,
      cta_name,
    } = body || {};

    if (!your_name || !your_email || !nominee_name) {
      return new Response(
        JSON.stringify({ error: "your_name, your_email, and nominee_name are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tags: string[] = ["form-leader-nomination-submitter"];

    // 1. Upsert nominator contact in GHL with nomination details on custom fields
    const ghlApiKey = Deno.env.get("GHL_API_KEY");
    let nominatorContactId: string | null = null;

    if (ghlApiKey) {
      try {
        const nameParts = String(your_name).trim().split(/\s+/);
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
            email: your_email,
            phone: your_phone || "",
            companyName: your_organization || "",
            tags,
            source: `CSL Website - ${source_page || "States"} - Leader Nomination`,
            customFields: [
              { key: "form_type", value: "leader_nomination" },
              { key: "relationship_to_nominee", value: relationship_to_nominee || "" },
              { key: "nominee_name", value: nominee_name || "" },
              { key: "nominee_title", value: nominee_title || "" },
              { key: "nominee_organization", value: nominee_organization || "" },
              { key: "nominee_email", value: nominee_email || "" },
              { key: "nominee_phone", value: nominee_phone || "" },
              { key: "nominee_city_state", value: nominee_city_state || "" },
              { key: "nominee_hosts", value: nominee_hosts || "" },
              { key: "why_nominating", value: why_nominating || "" },
              { key: "cta_name", value: cta_name || "" },
              { key: "source_page", value: source_page || "" },
            ],
          }),
        });

        if (!ghlRes.ok) {
          const detail = await ghlRes.text();
          console.error("GHL upsert non-OK:", ghlRes.status, detail);
        } else {
          const ghlBody = await ghlRes.json().catch(() => null);
          // GHL upsert response shape: { contact: { id: "..." }, ... } or { id: "..." }
          nominatorContactId =
            ghlBody?.contact?.id || ghlBody?.id || ghlBody?.new_contact?.id || null;
        }
      } catch (ghlErr) {
        console.error("GHL upsert error:", ghlErr);
      }

      // Add a note to the nominator's contact capturing the nomination
      if (nominatorContactId) {
        try {
          const noteBody = [
            `LEADER NOMINATION submitted via CSL website.`,
            ``,
            `NOMINEE`,
            `Name: ${nominee_name || "—"}`,
            `Title: ${nominee_title || "—"}`,
            `Organization: ${nominee_organization || "—"}`,
            `Email: ${nominee_email || "—"}`,
            `Phone: ${nominee_phone || "—"}`,
            `City / State: ${nominee_city_state || "—"}`,
            `Already hosts events / groups: ${nominee_hosts || "—"}`,
            ``,
            `RELATIONSHIP TO NOMINEE`,
            `${relationship_to_nominee || "—"}`,
            ``,
            `WHY NOMINATING`,
            `${why_nominating || "—"}`,
            ``,
            `Source: ${source_page || "States"} — ${cta_name || ""}`,
          ].join("\n");

          const noteRes = await fetch(
            `https://services.leadconnectorhq.com/contacts/${nominatorContactId}/notes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ghlApiKey}`,
                Version: "2021-07-28",
              },
              body: JSON.stringify({ body: noteBody }),
            }
          );

          if (!noteRes.ok) {
            const detail = await noteRes.text();
            console.error("GHL note non-OK:", noteRes.status, detail);
          }
        } catch (noteErr) {
          console.error("GHL note error:", noteErr);
        }
      }
    } else {
      console.warn("GHL_API_KEY not configured — skipping GHL upsert");
    }

    // 2. Internal notification email (best-effort)
    try {
      console.log(`NOTIFICATION: New Leader Nomination — ${nominee_name} nominated by ${your_name}`);
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
            subject: `New Leader Nomination — ${nominee_name} (nom. by ${your_name})`,
            html: `
              <h2>New Leader Nomination</h2>
              <h3 style="margin-top:16px;">Nominator</h3>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${your_name}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${your_email}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${your_phone || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${your_organization || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Relationship:</td><td>${relationship_to_nominee || "—"}</td></tr>
              </table>
              <h3 style="margin-top:16px;">Nominee</h3>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${nominee_name || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Title:</td><td>${nominee_title || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${nominee_organization || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${nominee_email || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${nominee_phone || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">City / State:</td><td>${nominee_city_state || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Already hosts:</td><td>${nominee_hosts || "—"}</td></tr>
              </table>
              <h3 style="margin-top:16px;">Why Nominating</h3>
              <p>${(why_nominating || "—").replace(/\n/g, "<br>")}</p>
              <p style="margin-top:16px;color:#666;font-size:12px;">Source: ${source_page || "States"} — ${cta_name || ""}</p>
            `,
          }),
        });
      }
    } catch (emailErr) {
      console.error("Email notification error:", emailErr);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Leader nomination received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("csl-leader-nomination error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
