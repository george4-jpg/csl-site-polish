// Supabase Edge Function: csl-intake-router
// JWT verification: OFF (public form endpoint)
//
// Central intake handler for shared website modal/form submissions.
// Flow:
//   1. Validate { form_type, email } (+ name fields where applicable)
//   2. Persist to public.intakes (Supabase = source of truth)
//   3. Best-effort GHL webhook sync per form_type
//   4. Best-effort internal notification email (Resend)
//   5. Return { success: true, id } or { success: false, error }
//
// Supported form_types:
//   advisory, cohort, security_brief, event_rsvp, event_notify,
//   ai_governance, sponsor_generic, onboarding, guide_generic
//
// NOTE: Pre-existing dedicated functions (csl-executive-guide, csl-sponsor-inquiry,
// csl-oracle-lead, csl-express-interest, csl-host-application, csl-leader-nomination,
// csl-newsroom-signup) remain authoritative for their flows. This router handles
// the variants that previously had no working backend.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFICATION_EMAIL = "george4@cybersecurity-leadership.org";

// Per-form_type GHL webhook routing. Update these as real workflows are wired in GHL.
// Falls back to no GHL sync if a key is missing — submission still succeeds.
const GHL_WEBHOOKS: Record<string, string> = {
  advisory: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/41161a0b-a003-4269-b41e-04220347f055",
  cohort: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/41161a0b-a003-4269-b41e-04220347f055",
  ai_governance: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/41161a0b-a003-4269-b41e-04220347f055",
  security_brief: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/4bce9659-62c0-4387-a76c-4199e0094913",
  event_rsvp: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/4bce9659-62c0-4387-a76c-4199e0094913",
  event_notify: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/4bce9659-62c0-4387-a76c-4199e0094913",
  onboarding: "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/5c11210c-ce6e-4bab-93d6-4ede0bd00fdc",
};

const SUBJECTS: Record<string, string> = {
  advisory: "New Advisory Inquiry",
  cohort: "New Cohort Enrollment Interest",
  ai_governance: "New AI Governance Inquiry",
  security_brief: "New Security Brief Subscriber",
  event_rsvp: "New Event RSVP",
  event_notify: "New Event Notify Request",
  onboarding: "New Member Onboarding",
  guide_generic: "New Guide Request",
  sponsor_generic: "New Sponsor Inquiry",
};

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}
function opt(v: unknown): string | null {
  const t = s(v);
  return t.length ? t : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const form_type = s(body?.form_type);
    const email = s(body?.email);
    const first_name = s(body?.first_name);
    const last_name = s(body?.last_name);
    const full_name = s(body?.full_name) || `${first_name} ${last_name}`.trim();

    if (!form_type) {
      return new Response(JSON.stringify({ error: "form_type is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!full_name) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const row = {
      form_type,
      first_name: opt(first_name),
      last_name: opt(last_name),
      full_name,
      email,
      phone: opt(body?.phone),
      organization: opt(body?.organization) ?? opt(body?.company),
      role: opt(body?.role),
      district_size: opt(body?.district_size),
      city: opt(body?.city),
      state: opt(body?.state),
      message: opt(body?.message) ?? opt(body?.notes) ?? opt(body?.challenge),
      source_page: opt(body?.source_page),
      source_url: opt(body?.source_url),
      cta_name: opt(body?.cta_name),
      request_type: opt(body?.request_type),
      event_id: opt(body?.event_id),
      event_name: opt(body?.event_name),
      payload: body || null,
      ghl_sync_status: "pending" as string,
    };

    const { data, error } = await supabase
      .from("intakes")
      .insert(row)
      .select("id")
      .single();

    if (error || !data?.id) {
      console.error("intakes insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save submission", details: error?.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Best-effort GHL sync
    const webhook = GHL_WEBHOOKS[form_type];
    if (webhook) {
      try {
        const ghlRes = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...row,
            id: data.id,
            submitted_at: new Date().toISOString(),
          }),
        });
        if (!ghlRes.ok) throw new Error(`GHL webhook ${ghlRes.status}`);
        await supabase.from("intakes").update({ ghl_sync_status: "ghl_synced" }).eq("id", data.id);
      } catch (ghlErr) {
        console.error("GHL sync error:", ghlErr);
        await supabase
          .from("intakes")
          .update({ ghl_sync_status: "ghl_error", ghl_sync_error: String(ghlErr) })
          .eq("id", data.id);
      }
    } else {
      await supabase
        .from("intakes")
        .update({ ghl_sync_status: "ghl_not_configured" })
        .eq("id", data.id);
    }

    // Best-effort internal notification
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        const subject = `${SUBJECTS[form_type] || `New Intake (${form_type})`} — ${row.organization || full_name}`;
        const rows = Object.entries({
          "Form Type": form_type,
          Name: full_name,
          Email: email,
          Phone: row.phone || "—",
          Organization: row.organization || "—",
          Title: row.title || "—",
          Role: row.role || "—",
          "District Size": row.district_size || "—",
          City: row.city || "—",
          State: row.state || "—",
          State: row.state || "—",
          Source: row.source_page || "—",
          CTA: row.cta_name || "—",
          Message: row.message || "—",
        })
          .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">${k}:</td><td>${v}</td></tr>`)
          .join("");

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: "CSL Website <noreply@cybersecurity-leadership.org>",
            to: [NOTIFICATION_EMAIL],
            subject,
            html: `<h2>${SUBJECTS[form_type] || "New Intake"}</h2><table style="border-collapse:collapse;">${rows}</table>`,
          }),
        });
      } catch (mailErr) {
        console.error("Notification email error:", mailErr);
      }
    }

      // Best-effort lead confirmation email for advisory/ai_governance
        if (resendKey && (form_type === "advisory" || form_type === "ai_governance") && email) {
            try {
                  const firstName = row.first_name || full_name.split(" ")[0] || "there";
                        await fetch("https://api.resend.com/emails", {
                                method: "POST",
                                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
                                                body: JSON.stringify({
                                                          from: "George4 | CSL <noreply@cybersecurity-leadership.org>",
                                                                    to: [email],
                                                                              subject: "Your CSL AI Governance Inquiry Has Been Received",
                                                                                        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0B1120;color:#E2E8F0;padding:32px;"><div style="border-bottom:2px solid #D4A843;padding-bottom:16px;margin-bottom:24px;"><p style="color:#D4A843;font-size:11px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;margin:0;">Cyber Security Leadership</p></div><h2 style="color:#F1F5F9;font-size:20px;margin:0 0 16px;">Thank you, ${firstName}.</h2><p style="color:#CBD5E1;line-height:1.6;margin:0 0 16px;">We've received your AI governance inquiry and will review it personally.</p><p style="color:#CBD5E1;line-height:1.6;margin:0 0 24px;">You can expect a response within 24 hours.</p><p style="color:#D4A843;font-size:14px;font-weight:bold;margin:0 0 4px;">George4</p><p style="color:#CBD5E1;font-size:12px;margin:0;">Founder | Cyber Security Leadership</p><p style="color:#94A3B8;font-size:12px;margin:8px 0 0;font-style:italic;">We build relationships, not transactions.</p></div>`,
                                                                                                }),
                                                                                                      });
                                                                                                          } catch (confirmErr) {
                                                                                                                console.error("Lead confirmation email error:", confirmErr);
                                                                                                                    }
                                                                                                                      }
                                                                                                                      
    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("csl-intake-router error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
