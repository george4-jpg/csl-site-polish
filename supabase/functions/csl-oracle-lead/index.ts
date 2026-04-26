// Supabase Edge Function: csl-oracle-lead
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-oracle-lead
// JWT verification: OFF
//
// Writes Oracle Optimization savings estimator submissions to the
// oracle_optimization_leads table. Source of truth = Supabase. No GHL.

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
      first_name,
      last_name,
      email,
      phone,
      company,
      title,
      industry,
      oracle_modules,
      annual_oracle_spend,
      complexity,
      estimated_savings_low,
      estimated_savings_high,
      preferred_contact_method,
      notes,
      source_page,
    } = body || {};

    // Required fields
    if (!email || !company || (!first_name && !last_name)) {
      return new Response(
        JSON.stringify({ error: "first_name (or last_name), email, and company are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!annual_oracle_spend) {
      return new Response(
        JSON.stringify({ error: "annual_oracle_spend is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!Array.isArray(oracle_modules) || oracle_modules.length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one oracle_modules entry is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("oracle_optimization_leads")
      .insert({
        first_name: first_name ?? null,
        last_name: last_name ?? null,
        email,
        phone: phone ?? null,
        company,
        title: title ?? null,
        industry: industry ?? null,
        oracle_modules,
        annual_oracle_spend,
        complexity: complexity ?? null,
        estimated_savings_low: estimated_savings_low ?? null,
        estimated_savings_high: estimated_savings_high ?? null,
        preferred_contact_method: preferred_contact_method ?? null,
        notes: notes ?? null,
        source_page: source_page ?? "/strategic-partners/oracle",
      })
      .select("id")
      .single();

    if (error) {
      console.error("oracle_optimization_leads insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save submission", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("csl-oracle-lead error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
