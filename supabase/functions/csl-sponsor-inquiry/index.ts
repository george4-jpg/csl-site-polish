// Supabase Edge Function: csl-sponsor-inquiry
// Deploy to: https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-sponsor-inquiry
// JWT verification: OFF
//
// This function:
// 1. Writes submission to sponsor_inquiries table
// 2. Upserts a GHL contact with tag sponsor_inquiry
// 3. Sends internal notification email to george4@cybersecurity-leadership.org

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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
    const body = await req.json();
    const {
      full_name,
      first_name,
      last_name,
      email,
      phone,
      title,
      organization,
      sponsorship_type,
      message,
      form_type,
      source_page,
      cta_name,
      tags: incomingTags,
    } = body;

    // Derive full_name from first/last if not provided
    const derivedFullName = full_name || `${first_name || ""} ${last_name || ""}`.trim();

    if (!derivedFullName || !email) {
      return new Response(
        JSON.stringify({ error: "full_name (or first_name + last_name) and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Write to sponsor_inquiries table
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("sponsor_inquiries").insert({
      full_name: derivedFullName,
      email,
      phone: phone || null,
      title: title || null,
      organization: organization || null,
      sponsorship_type: sponsorship_type || null,
      message: message || null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
    }

    // 2. Upsert GHL contact with tags
    const ghlApiKey = Deno.env.get("GHL_API_KEY");
    if (ghlApiKey) {
      try {
        const nameParts = derivedFullName.trim().split(/\s+/);
        const ghlFirstName = first_name || nameParts[0] || "";
        const ghlLastName = last_name || nameParts.slice(1).join(" ") || "";

        // Use incoming tags if provided, otherwise fall back to derived tags
        const tags = Array.isArray(incomingTags) && incomingTags.length > 0
          ? incomingTags
          : ["sponsor_inquiry", sponsorship_type ? `sponsor_${sponsorship_type.toLowerCase().replace(/\s+/g, "_")}` : "sponsor_general"];

        await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ghlApiKey}`,
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            firstName: ghlFirstName,
            lastName: ghlLastName,
            email,
            phone: phone || "",
            companyName: organization || "",
            tags,
            source: `CSL Website - ${source_page || "/sponsor"}`,
            customFields: [
              { key: "title", value: title || "" },
              { key: "message", value: message || "" },
              { key: "sponsorship_type", value: sponsorship_type || "" },
              { key: "form_type", value: form_type || "sponsor-inquiry" },
              { key: "cta_name", value: cta_name || "" },
            ],
          }),
        });
      } catch (ghlErr) {
        console.error("GHL upsert error:", ghlErr);
      }
    }

    // 3. Send internal notification email
    try {
      // Use Supabase's built-in email or a simple SMTP approach
      // For now, log the notification (replace with actual email sending)
      console.log(`NOTIFICATION: New Sponsor Inquiry from ${organization || full_name}`);
      console.log(`To: ${NOTIFICATION_EMAIL}`);
      console.log(`Subject: New Sponsor Inquiry — ${organization || full_name}`);
      console.log(`Body: Name: ${full_name}, Email: ${email}, Phone: ${phone}, Title: ${title}, Org: ${organization}, Type: ${sponsorship_type}, Message: ${message}`);

      // If you have a Resend API key or similar, send the email here
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
            subject: `New Sponsor Inquiry — ${organization || full_name}`,
            html: `
              <h2>New Sponsor Inquiry</h2>
              <table style="border-collapse:collapse;">
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${full_name}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${phone || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Title:</td><td>${title || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${organization || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Sponsorship Type:</td><td>${sponsorship_type || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Message:</td><td>${message || "—"}</td></tr>
                <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Source:</td><td>${source_page || "Sponsor"} — ${cta_name || ""}</td></tr>
              </table>
            `,
          }),
        });
      }
    } catch (emailErr) {
      console.error("Email notification error:", emailErr);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Sponsor inquiry received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
