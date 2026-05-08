// Supabase Edge Function: csl-strategic-partner-application
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-strategic-partner-application
// JWT verification: OFF
//
// Writes Strategic Partner applications to strategic_partner_applications.
// Source of truth = Supabase. No GHL.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      submission_type,
      name,
      email,
      phone,
      company,
      website,
      solution_area,
      target_market,
      member_value,
      revenue_model,
      notes,
      source_page,
    } = body || {};

    if (!name || !email || !company) {
      return new Response(
        JSON.stringify({ error: "name, email, and company are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/strategic-partner-apply";

    const insertPayload = {
      submission_type: submission_type ?? "strategic_partner",
      name,
      email,
      phone: phone ?? null,
      company,
      website: website ?? null,
      solution_area: solution_area ?? null,
      target_market: target_market ?? null,
      member_value: member_value ?? null,
      revenue_model: revenue_model ?? null,
      notes: notes ?? null,
      source_page: source_page ?? "/strategic-partners/apply",
      ghl_sync_status: "pending",
    };

    const { data, error } = await supabase
      .from("strategic_partner_applications")
      .insert(insertPayload)
      .select("id")
      .single();

    if (error) {
      console.error("strategic_partner_applications insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save application", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    try {
      const ghlRes = await fetch(GHL_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone ?? "",
          company,
          website: website ?? "",
          solution_area: solution_area ?? "",
          target_market: target_market ?? "",
          member_value: member_value ?? "",
          revenue_model: revenue_model ?? "",
          notes: notes ?? "",
          submission_type: insertPayload.submission_type,
          source_page: insertPayload.source_page,
          submitted_at: new Date().toISOString(),
          tags: ["strategic_partner_applicant"],
        }),
      });

      if (!ghlRes.ok) {
        throw new Error(`GHL webhook failed with status ${ghlRes.status}`);
      }

      await supabase
        .from("strategic_partner_applications")
        .update({ ghl_sync_status: "ghl_synced" })
        .eq("id", data.id);
    } catch (ghlErr) {
      console.error("Strategic partner GHL sync error:", ghlErr);
      await supabase
        .from("strategic_partner_applications")
        .update({ ghl_sync_status: "ghl_error" })
        .eq("id", data.id);
    }

    return new Response(
      JSON.stringify({ success: true, id: data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("csl-strategic-partner-application error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
