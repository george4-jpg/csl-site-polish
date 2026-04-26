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

    const { data, error } = await supabase
      .from("strategic_partner_applications")
      .insert({
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
      })
      .select("id")
      .single();

    if (error) {
      console.error("strategic_partner_applications insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save application", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
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
