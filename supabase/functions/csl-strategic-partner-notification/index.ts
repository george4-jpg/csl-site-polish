// Supabase Edge Function: csl-strategic-partner-notification
// Sends an internal notification email when a new Strategic Partner application
// has been saved to public.strategic_partner_applications.
// JWT verification: OFF

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFICATION_EMAIL = "info@cybersecurity-leadership.org";
const FROM_ADDRESS = "CSL Website <noreply@cybersecurity-leadership.org>";

function row(label: string, value: unknown) {
  const v = value === null || value === undefined || value === "" ? "—" : String(value);
  const safe = v.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
  return `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top;">${label}:</td><td>${safe}</td></tr>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
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
    } = body ?? {};

    const submittedAt = new Date().toISOString();

    console.log(
      `NOTIFICATION: New CSL Strategic Partner Application from ${company || name || email || "(unknown)"}`
    );

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured; skipping email send.");
      return new Response(
        JSON.stringify({ success: false, skipped: true, reason: "missing_resend_api_key" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = `
      <h2>New CSL Strategic Partner Application</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        ${row("Name", name)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        ${row("Company", company)}
        ${row("Website", website)}
        ${row("Solution Area", solution_area)}
        ${row("Target Market", target_market)}
        ${row("Member Value", member_value)}
        ${row("Revenue Model", revenue_model)}
        ${row("Notes", notes)}
        ${row("Submitted", submittedAt)}
      </table>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [NOTIFICATION_EMAIL],
        subject: "New CSL Strategic Partner Application",
        html,
      }),
    });

    const respText = await resp.text();
    if (!resp.ok) {
      console.error("Resend send failed:", resp.status, respText);
      return new Response(
        JSON.stringify({ success: false, status: resp.status, body: respText }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("csl-strategic-partner-notification error:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
