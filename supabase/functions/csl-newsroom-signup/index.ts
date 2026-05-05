// Supabase Edge Function: csl-newsroom-signup
// JWT verification: OFF (public form endpoint)
// Stores Newsroom requests first, then syncs to GHL best-effort.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_NEWSROOM_WEBHOOK = "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/newsroom-early-access";

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function asOptionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const {
      first_name,
      last_name,
      email,
      phone,
      organization,
      role,
      request_type,
      notes,
      founder_conversation,
    } = body || {};

    if (!isNonEmpty(first_name) || !isNonEmpty(last_name) || !isNonEmpty(email) || !isNonEmpty(organization) || !isNonEmpty(request_type)) {
      return new Response(
        JSON.stringify({ error: "first_name, last_name, email, organization, and request_type are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const submission = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim(),
      phone: asOptionalString(phone),
      organization: organization.trim(),
      role: asOptionalString(role),
      request_type: request_type.trim(),
      notes: asOptionalString(notes),
      founder_conversation: asOptionalString(founder_conversation),
      source: "csl-newsroom-form",
      source_page: "/newsroom",
      ghl_sync_status: "pending",
    };

    const { data, error } = await supabase
      .from("newsroom_signups")
      .insert(submission)
      .select("id")
      .single();

    if (error || !data?.id) {
      console.error("newsroom_signups insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save submission", details: error?.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    try {
      const ghlRes = await fetch(GHL_NEWSROOM_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: submission.first_name,
          last_name: submission.last_name,
          email: submission.email,
          phone: submission.phone || "",
          organization: submission.organization,
          role: submission.role || "",
          request_type: submission.request_type,
          notes: submission.notes || "",
          founder_conversation: submission.founder_conversation || "",
          source: submission.source,
          source_page: submission.source_page,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!ghlRes.ok) {
        throw new Error(`GHL webhook failed with status ${ghlRes.status}`);
      }

      await supabase
        .from("newsroom_signups")
        .update({ ghl_sync_status: "ghl_synced" })
        .eq("id", data.id);
    } catch (ghlErr) {
      console.error("Newsroom GHL sync error:", ghlErr);
      await supabase
        .from("newsroom_signups")
        .update({ ghl_sync_status: "ghl_error" })
        .eq("id", data.id);
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("csl-newsroom-signup error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
