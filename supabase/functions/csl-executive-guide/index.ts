// Supabase Edge Function: csl-executive-guide
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-executive-guide
// JWT verification: OFF (public form endpoint)
//
// Standardized Executive Guide intake:
// 1. Validate payload (form_type, first_name, last_name, email required)
// 2. Persist to Supabase document_requests table (best-effort)
// 3. Send transactional email to requester with guide link (Resend)
// 4. Send internal notification email
// 5. Upsert GHL contact + tags for CRM/nurture
// 6. Return { success: true } or { success: false, error }

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_LOCATION_ID = "pawIA5SdWkMp2xKDUsN2";
const NOTIFICATION_EMAIL = "george4@cybersecurity-leadership.org";
const GUIDE_URL = "https://cybersecurity-leadership.org/guides/CSL_Framework_3_0_Overview_Guide.pdf";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      form_type,
      first_name,
      last_name,
      email,
      phone,
      company,
      title,
      state,
      city,
      source_page,
      source_url,
      tags: incomingTags,
      metadata,
    } = body || {};

    if (!first_name || !last_name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "first_name, last_name, and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tags: string[] = Array.isArray(incomingTags) && incomingTags.length
      ? incomingTags
      : ["Requested | Executive Guide", "executive_guide_request"];

    // 1. Persist to Supabase (best-effort)
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (supabaseUrl && serviceKey) {
        await fetch(`${supabaseUrl}/rest/v1/document_requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            form_type: form_type || "executive_guide",
            first_name,
            last_name,
            email,
            phone: phone || null,
            company: company || null,
            title: title || null,
            state: state || null,
            city: city || null,
            source_page: source_page || null,
            source_url: source_url || null,
            tags,
            metadata: metadata || null,
            requested_at: new Date().toISOString(),
          }),
        });
      }
    } catch (dbErr) {
      console.error("Supabase persist error:", dbErr);
    }

    // 2. Transactional email to requester
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "CSL <george4@cybersecurity-leadership.org>",
            to: [email],
            subject: "Your CSL Executive Guide",
            html: `
              <p>Hi ${first_name},</p>
              <p>Thanks for requesting the CSL Executive Guide. You can download your copy here:</p>
              <p><a href="${GUIDE_URL}" style="color:#c85a1e;font-weight:bold;">Download the CSL Executive Guide (PDF)</a></p>
              <p>If you have questions or want to talk through how CSL could support your team, just reply to this email.</p>
              <p>— George Cater IV<br/>Founder, Cybersecurity-Leadership Inc.</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Requester email error:", emailErr);
      }

      // 3. Internal notification
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "CSL Website <noreply@cybersecurity-leadership.org>",
            to: [NOTIFICATION_EMAIL],
            subject: `New Executive Guide Request — ${company || `${first_name} ${last_name}`}`,
            html: `
              <h2>New Executive Guide Request</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${first_name} ${last_name}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${company || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Role:</td><td>${title || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">State:</td><td>${state || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">City:</td><td>${city || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Source:</td><td>${source_page || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Referral:</td><td>${metadata?.referral_source || "—"}</td></tr>
              </table>
            `,
          }),
        });
      } catch (notifyErr) {
        console.error("Notification email error:", notifyErr);
      }
    } else {
      console.warn("RESEND_API_KEY not configured — skipping emails");
    }

    // 4. Sync to GHL — create contact, fall back to existing on duplicate, then tag
    const ghlApiKey = Deno.env.get("GHL_API_KEY");
    if (ghlApiKey) {
      try {
        let contactId: string | null = null;

        const createRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ghlApiKey}`,
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            firstName: first_name,
            lastName: last_name,
            email,
            phone: phone || "",
            companyName: company || "",
            city: city || "",
            state: state || "",
            tags,
            source: `CSL Website - ${source_page || "framework"}`,
            customFields: [
              { key: "title", value: title || "" },
              { key: "form_type", value: form_type || "executive_guide" },
              { key: "source_page", value: source_page || "" },
              { key: "source_url", value: source_url || "" },
              { key: "referral_source", value: metadata?.referral_source || "" },
            ],
          }),
        });

        const createBody = await createRes.json().catch(() => ({}));

        if (createRes.ok) {
          contactId = createBody?.contact?.id || createBody?.id || null;
        } else if (
          createRes.status === 400 &&
          typeof createBody?.message === "string" &&
          createBody.message.includes("This location does not allow duplicated contacts")
        ) {
          contactId = createBody?.meta?.contactId || null;
          console.log("GHL contact already exists, reusing contactId:", contactId);
        } else {
          console.error("GHL create contact failed:", createRes.status, createBody);
        }

        // Apply executive guide request tag to the contact (new or existing)
        if (contactId) {
          try {
            const tagRes = await fetch(
              `https://services.leadconnectorhq.com/contacts/${contactId}/tags`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${ghlApiKey}`,
                  Version: "2021-07-28",
                },
                body: JSON.stringify({ tags: ["executive guide request"] }),
              }
            );
            if (!tagRes.ok) {
              const tagBody = await tagRes.text().catch(() => "");
              console.error("GHL tag apply failed:", tagRes.status, tagBody);
            }
          } catch (tagErr) {
            console.error("GHL tag apply error:", tagErr);
          }
        }
      } catch (ghlErr) {
        console.error("GHL sync error:", ghlErr);
      }
    } else {
      console.warn("GHL_API_KEY not configured — skipping GHL sync");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Executive Guide request received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("csl-executive-guide error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
