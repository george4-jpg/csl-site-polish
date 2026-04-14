import { useState, useEffect, useRef, FormEvent } from "react";
import { GHL_WEBHOOKS } from "@/lib/ghl-webhooks";

const SUPABASE_URL = "https://oursmnzsgwjfiejppxac.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";
const SPONSOR_EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/csl-sponsor-inquiry`;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/csl-register`;
const GUIDE_EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/csl-executive-guide`;
const ADVISORY_EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/csl-advisory-inquiry`;

export interface FormContext {
  request_type?: string;
  event_id?: string;
  event_name?: string;
  event_date?: string;
  event_time?: string;
  event_location?: string;
  event_city?: string;
  event_format?: string;
  source_page?: string;
  cta_name?: string;
  state?: string;
  audience_type?: string;
  campaign?: string;
}

interface CSLFormModalProps {
  open: boolean;
  onClose: () => void;
  context: FormContext;
  variant?: "rsvp" | "event" | "interest" | "brief" | "advisory" | "host" | "partner" | "guide" | "cohort" | "newsletter" | "risk";
}

const ROLE_OPTIONS = [
  "CTO/Director of Technology",
  "CISO/Security Director",
  "Superintendent/Administrator",
  "State/Government Leader",
  "Higher Education",
  "Critical Infrastructure",
  "Partner/Sponsor",
  "Other",
];

const STATE_OPTIONS = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const variantConfig: Record<string, { title: string; subtitle: string; successTitle: string; successMessage: string; fields: string[] }> = {
  rsvp: {
    title: "Register for This Event",
    subtitle: "Secure your seat. We will confirm within 24 hours.",
    successTitle: "You're Registered",
    successMessage: "We have received your registration and will follow up with confirmation details shortly.",
    fields: ["name", "email", "phone", "title", "organization"],
  },
  event: {
    title: "Reserve Your Seat",
    subtitle: "Complete your registration below. We will confirm within 24 hours.",
    successTitle: "You're Registered",
    successMessage: "We have received your registration and will follow up with confirmation details shortly.",
    fields: ["first_last", "email", "organization", "title_org", "role"],
  },
  interest: {
    title: "Express Interest",
    subtitle: "Let us know you want CSL in your state.",
    successTitle: "Interest Received",
    successMessage: "We have recorded your interest and will reach out as activity builds in your area.",
    fields: ["name", "email", "phone", "title", "organization", "city"],
  },
  brief: {
    title: "Join the Intelligence Brief",
    subtitle: "Free state-level cybersecurity intelligence, delivered to your inbox.",
    successTitle: "You're Subscribed",
    successMessage: "Your first brief is on the way. Members receive the premium edition with executive context and protected notes.",
    fields: ["name", "email", "state"],
  },
  advisory: {
    title: "Request Advisory Services",
    subtitle: "Share a few details and we will follow up within 48 hours.",
    successTitle: "Inquiry Received",
    successMessage: "Thank you — we'll be in touch within 24 hours.",
    fields: ["first_last", "email", "phone", "title", "organization", "message"],
  },
  host: {
    title: "CSL Host Application",
    subtitle: "Tell us about your readiness to host a CSL City Room.",
    successTitle: "Application Received",
    successMessage: "Our expansion team will review your application and follow up within 5 business days.",
    fields: ["name", "email", "phone", "title", "organization", "city", "state", "venue", "network", "experience", "audience", "format", "timeline", "cosponsor"],
  },
  partner: {
    title: "Partner With CSL",
    subtitle: "Submit your interest in becoming a Strategic Partner.",
    successTitle: "Interest Submitted",
    successMessage: "Thank you — we'll be in touch within 24 hours.",
    fields: ["name", "email", "phone", "title", "organization", "message"],
  },
  guide: {
    title: "Request the Executive Guide",
    subtitle: "Submit your request and we'll deliver the CSL Executive Guide | Overview Edition directly to your inbox.",
    successTitle: "Request Received",
    successMessage: "Thank you — we'll be in touch within 24 hours.",
    fields: ["first_last", "email", "phone", "title", "organization", "role"],
  },
  cohort: {
    title: "Enroll in the AI Governance Cohort",
    subtitle: "8 weeks. 8 leaders. Submit your enrollment interest below.",
    successTitle: "Enrollment Interest Received",
    successMessage: "We will confirm your seat and send payment instructions within 48 hours.",
    fields: ["name", "email", "phone", "title", "organization"],
  },
  newsletter: {
    title: "Join the CSL Newsletter",
    subtitle: "Cybersecurity leadership intelligence, delivered to your inbox.",
    successTitle: "You're Subscribed",
    successMessage: "Welcome to the CSL newsletter. Your first issue is on its way.",
    fields: ["first_last", "email", "organization", "state_select", "role"],
  },
  risk: {
    title: "Start a Risk Conversation",
    subtitle: "Share your challenge. We'll connect you with the right advisor.",
    successTitle: "Message Received",
    successMessage: "A member of our team will follow up within 48 hours to continue the conversation.",
    fields: ["first_last", "email", "organization", "title_org", "role", "challenge"],
  },
};

function generateCalendarUrl(context: FormContext): string {
  const title = encodeURIComponent(context.event_name || "CSL Event");
  const location = encodeURIComponent(context.event_location || context.event_city || "");
  const details = encodeURIComponent("Registered through CSL. Confirmation will follow via email.");

  let dateStr = context.event_date || "";
  let dates = "";
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const m = String(parsed.getMonth() + 1).padStart(2, "0");
      const d = String(parsed.getDate()).padStart(2, "0");
      dates = `${y}${m}${d}/${y}${m}${d}`;
    }
  } catch {
    // fall through
  }

  if (!dates) {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&details=${details}`;
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${location}&details=${details}`;
}

export default function CSLFormModal({ open, onClose, context, variant = "interest" }: CSLFormModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitting(false);
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const config = variantConfig[variant] || variantConfig.interest;
  const fields = config.fields;

  const contextLabel = variant === "interest" && context.state
    ? context.state.toUpperCase()
    : context.event_name || context.request_type || context.state || context.campaign;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    // Attach context fields
    payload.request_type = context.request_type || variant;
    payload.event_name = context.event_name || "";
    payload.source_page = context.source_page || "";
    payload.cta_name = context.cta_name || "";
    payload.state_context = context.state || "";
    payload.audience_type = context.audience_type || "";
    payload.campaign = context.campaign || "";

    try {
      if (variant === "event") {
        // Submit to Supabase edge function
        const eventPayload = {
          first_name: payload.first_name || "",
          last_name: payload.last_name || "",
          email: payload.email || "",
          organization: payload.organization || "",
          title: payload.title || "",
          role: payload.role || "",
          event_id: context.event_id || "",
          event_name: context.event_name || "",
          event_date: context.event_date || "",
          event_time: context.event_time || "",
          event_city: context.event_city || "",
          event_format: context.event_format || "",
        };

        const res = await fetch(EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(eventPayload),
        });

        if (!res.ok) {
          let msg = "Registration failed";
          try {
            const body = await res.json();
            msg = body?.error || body?.message || msg;
          } catch {}
          throw new Error(msg);
        }
      } else if (variant === "interest" && context.state) {
        // Submit state interest to GHL with tags
        const stateSlug = context.state.toLowerCase().replace(/\s+/g, "_");
        const ghlPayload = {
          full_name: payload.full_name || "",
          email: payload.email || "",
          phone: payload.phone || "",
          title: payload.title || "",
          organization: payload.organization || "",
          city: payload.city || "",
          selected_state: context.state,
          tags: ["state_interest", `state_${stateSlug}`],
          source: "CSL Website - States Page",
        };
        await fetch("https://app.dragonflymsp.net/v2/location/pawIA5SdWkMp2xKDUsN2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ghlPayload),
          mode: "no-cors",
        });
      } else if (variant === "partner") {
        // Submit partner/sponsor to Supabase edge function
        const sponsorPayload = {
          full_name: payload.full_name || "",
          email: payload.email || "",
          phone: payload.phone || "",
          title: payload.title || "",
          organization: payload.organization || "",
          sponsorship_type: context.request_type || "Partner Interest",
          message: payload.message || "",
          source_page: context.source_page || "Sponsor",
          cta_name: context.cta_name || "",
        };

        const res = await fetch(SPONSOR_EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(sponsorPayload),
        });

        // Fallback to GHL if edge function is not deployed yet
        if (!res.ok) {
          const ghlPayload = {
            ...sponsorPayload,
            tags: ["sponsor_inquiry"],
            source: `CSL Website - ${context.source_page || "Sponsor"}`,
          };
          await fetch("https://services.leadconnectorhq.com/hooks/pawIA5SdWkMp2xKDUsN2/webhook-trigger/7e1a4e61-e123-4ca1-86d2-4e8cf962a1fe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ghlPayload),
            mode: "no-cors",
          });
        }
      } else if (variant === "newsletter") {
        // Submit to Beehiiv
        await fetch("https://csl-newsletter.beehiiv.com/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors",
        });
      } else if (variant === "guide") {
        const guidePayload = {
          first_name: payload.first_name || "",
          last_name: payload.last_name || "",
          email: payload.email || "",
          organization: payload.organization || "",
          title: payload.title || "",
          role: payload.role || "",
          source_page: context.source_page || "Framework",
          cta_name: context.cta_name || "",
        };

        const res = await fetch(GUIDE_EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(guidePayload),
        });
        if (!res.ok) {
          // Fallback to GHL webhook
          const webhookUrl = GHL_WEBHOOKS[variant];
          if (webhookUrl) {
            await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(guidePayload),
              mode: "no-cors",
            });
          }
        }
      } else if (variant === "advisory") {
        const advisoryPayload = {
          first_name: payload.first_name || "",
          last_name: payload.last_name || "",
          email: payload.email || "",
          organization: payload.organization || "",
          title: payload.title || "",
          message: payload.message || "",
          source_page: context.source_page || "Advisory",
          cta_name: context.cta_name || "",
        };

        const res = await fetch(ADVISORY_EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(advisoryPayload),
        });
        if (!res.ok) {
          // Fallback to GHL webhook
          const webhookUrl = GHL_WEBHOOKS[variant];
          if (webhookUrl) {
            await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(advisoryPayload),
              mode: "no-cors",
            });
          }
        }
      } else {
        // Submit to GHL webhook for all other variants
        const webhookUrl = GHL_WEBHOOKS[variant];
        if (webhookUrl) {
          // Include notification metadata for GHL workflow routing
          const enrichedPayload = {
            ...payload,
            notify_email: "george4@cybersecurity-leadership.org",
            form_variant: variant,
            tags: [variant, `form_${variant}`],
          };
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enrichedPayload),
            mode: "no-cors",
          });
        }
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (variant === "event") {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
        setSubmitting(false);
        return;
      }
    }

    setSubmittedEmail(payload.email || "");
    setSubmitted(true);
    setSubmitting(false);

  const isEventVariant = variant === "event" || variant === "rsvp";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(11,17,32,0.85)", backdropFilter: "blur(8px)" }} />
      <div
        className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: "hsl(222 47% 11%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors z-10" style={{ color: "#94A3B8" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(107,197,160,0.15)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="font-display text-xl font-bold" style={{ color: "#F1F5F9" }}>{config.successTitle}</h3>
              {contextLabel && (
                <div className="mt-3 inline-flex px-3 py-1.5 rounded-full text-[0.65rem] font-display font-semibold tracking-[0.1em] uppercase" style={{ background: "rgba(212,168,67,0.12)", color: "hsl(42 60% 55%)", border: "1px solid rgba(212,168,67,0.2)" }}>
                  {contextLabel}
                </div>
              )}
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>{config.successMessage}</p>

              {/* Event-specific details */}
              {isEventVariant && context.event_name && (
                <div className="mt-5 p-4 rounded-xl text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold" style={{ color: "#94A3B8", minWidth: 60 }}>Event</span>
                      <span className="text-sm font-semibold" style={{ color: "#F1F5F9" }}>{context.event_name}</span>
                    </div>
                    {context.event_date && (
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold" style={{ color: "#94A3B8", minWidth: 60 }}>Date</span>
                        <span className="text-sm" style={{ color: "#E2E8F0" }}>{context.event_date}</span>
                      </div>
                    )}
                    {context.event_time && (
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold" style={{ color: "#94A3B8", minWidth: 60 }}>Time</span>
                        <span className="text-sm" style={{ color: "#E2E8F0" }}>{context.event_time}</span>
                      </div>
                    )}
                    {(context.event_location || context.event_city) && (
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold" style={{ color: "#94A3B8", minWidth: 60 }}>Location</span>
                        <span className="text-sm" style={{ color: "#E2E8F0" }}>{context.event_location || context.event_city}</span>
                      </div>
                    )}
                  </div>
                  <a
                    href={generateCalendarUrl(context)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="csl-btn csl-btn-outline csl-btn-sm csl-btn-block mt-4"
                    style={{ borderColor: "rgba(107,197,160,0.3)", color: "hsl(153 40% 60%)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Add to Calendar
                  </a>
                </div>
              )}

              {context.state && variant === "interest" && (
                <p className="text-sm mt-3" style={{ color: "#E2E8F0" }}>
                  We've received your interest in <strong style={{ color: "#F1F5F9" }}>{context.state}</strong>. We'll be in touch about CSL expanding to your area.
                </p>
              )}
              <button onClick={onClose} className="csl-btn csl-btn-outline mt-6">Close</button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold" style={{ color: "#F1F5F9" }}>{config.title}</h3>
                {contextLabel && (
                  <div className="mt-3 inline-flex px-3 py-1.5 rounded-full text-[0.65rem] font-display font-semibold tracking-[0.1em] uppercase" style={{ background: "rgba(212,168,67,0.12)", color: "hsl(42 60% 55%)", border: "1px solid rgba(212,168,67,0.2)" }}>
                    {contextLabel}
                  </div>
                )}
                <p className="text-sm mt-3" style={{ color: "#CBD5E1" }}>{config.subtitle}</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="request_type" value={context.request_type || ""} />
                <input type="hidden" name="event_name" value={context.event_name || ""} />
                <input type="hidden" name="source_page" value={context.source_page || ""} />
                <input type="hidden" name="cta_name" value={context.cta_name || ""} />
                <input type="hidden" name="state_context" value={context.state || ""} />
                <input type="hidden" name="audience_type" value={context.audience_type || ""} />
                <input type="hidden" name="campaign" value={context.campaign || ""} />

                <div className="space-y-4">
                  {/* Standard name field */}
                  {fields.includes("name") && (
                    <div>
                      <label className="csl-form-label">Full Name <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                      <input type="text" name="full_name" required className="csl-form-input" placeholder="Your full name" />
                    </div>
                  )}

                  {/* First/Last name split */}
                  {fields.includes("first_last") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="csl-form-label">First Name <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                        <input type="text" name="first_name" required className="csl-form-input" placeholder="First name" />
                      </div>
                      <div>
                        <label className="csl-form-label">Last Name <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                        <input type="text" name="last_name" required className="csl-form-input" placeholder="Last name" />
                      </div>
                    </div>
                  )}

                  {fields.includes("email") && (
                    <div>
                      <label className="csl-form-label">Work Email <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                      <input type="email" name="email" required className="csl-form-input" placeholder="you@example.com" />
                    </div>
                  )}
                  {fields.includes("phone") && (
                    <div>
                      <label className="csl-form-label">Phone <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                      <input type="tel" name="phone" required className="csl-form-input" placeholder="(555) 000-0000" />
                    </div>
                  )}

                  {/* Title + Organization side by side */}
                  {fields.includes("title") && fields.includes("organization") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="csl-form-label">Title <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                        <input type="text" name="title" required className="csl-form-input" placeholder="Your title" />
                      </div>
                      <div>
                        <label className="csl-form-label">Organization <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                        <input type="text" name="organization" required className="csl-form-input" placeholder="Your organization" />
                      </div>
                    </div>
                  )}

                  {/* Title (standalone for event variant) */}
                  {fields.includes("title_org") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="csl-form-label">Title</label>
                        <input type="text" name="title" className="csl-form-input" placeholder="Your title" />
                      </div>
                      <div>
                        <label className="csl-form-label">Organization <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                        <input type="text" name="organization" required className="csl-form-input" placeholder="Your organization" />
                      </div>
                    </div>
                  )}

                  {/* Organization standalone (for newsletter) */}
                  {fields.includes("organization") && !fields.includes("title") && !fields.includes("title_org") && (
                    <div>
                      <label className="csl-form-label">Organization</label>
                      <input type="text" name="organization" className="csl-form-input" placeholder="Your organization" />
                    </div>
                  )}

                  {/* Role dropdown */}
                  {fields.includes("role") && (
                    <div>
                      <label className="csl-form-label">Role <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                      <select name="role" required className="csl-form-select">
                        <option value="" disabled selected>Select your role</option>
                        {ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* State select dropdown */}
                  {fields.includes("state_select") && (
                    <div>
                      <label className="csl-form-label">State</label>
                      <select name="state" className="csl-form-select">
                        <option value="">Select your state</option>
                        {STATE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* City + State text */}
                  {fields.includes("city") && fields.includes("state") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="csl-form-label">City</label>
                        <input type="text" name="city" className="csl-form-input" placeholder="Your city" />
                      </div>
                      <div>
                        <label className="csl-form-label">State</label>
                        <input type="text" name="state" className="csl-form-input" defaultValue={context.state || ""} placeholder="Your state" />
                      </div>
                    </div>
                  )}
                  {fields.includes("state") && !fields.includes("city") && !fields.includes("state_select") && (
                    <div>
                      <label className="csl-form-label">State</label>
                      <input type="text" name="state" className="csl-form-input" defaultValue={context.state || ""} placeholder="Your state" />
                    </div>
                  )}

                  {/* Challenge textarea (risk variant) */}
                  {fields.includes("challenge") && (
                    <div>
                      <label className="csl-form-label">What is your biggest cybersecurity challenge right now?</label>
                      <textarea name="challenge" className="csl-form-textarea" placeholder="Tell us about your challenge..." />
                    </div>
                  )}

                  {/* Host-specific fields */}
                  {fields.includes("venue") && (
                    <div>
                      <label className="csl-form-label">Venue Access</label>
                      <select name="venue" className="csl-form-select">
                        <option value="">Do you have access to a private venue?</option>
                        <option value="yes-own">Yes, I have my own venue</option>
                        <option value="yes-partner">Yes, through a partner or sponsor</option>
                        <option value="exploring">I am exploring options</option>
                        <option value="no">Not yet, but I can secure one</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("network") && (
                    <div>
                      <label className="csl-form-label">Existing Executive Network</label>
                      <select name="network" className="csl-form-select">
                        <option value="">Do you have an existing professional network in your area?</option>
                        <option value="strong">Yes, strong local network of executives and leaders</option>
                        <option value="growing">Growing network, some key relationships in place</option>
                        <option value="early">Early stage, building connections</option>
                        <option value="none">Starting fresh, but committed to building</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("experience") && (
                    <div>
                      <label className="csl-form-label">Past Event Hosting Experience</label>
                      <select name="experience" className="csl-form-select">
                        <option value="">Have you hosted professional events before?</option>
                        <option value="frequent">Yes, regularly (quarterly or more)</option>
                        <option value="occasional">Occasionally (a few times per year)</option>
                        <option value="rare">Once or twice</option>
                        <option value="none">No, but I am ready to start</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("audience") && (
                    <div>
                      <label className="csl-form-label">Estimated Local Audience</label>
                      <select name="audience" className="csl-form-select">
                        <option value="">How many cybersecurity leaders could you reach locally?</option>
                        <option value="10-25">10 to 25</option>
                        <option value="25-50">25 to 50</option>
                        <option value="50-100">50 to 100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("format") && (
                    <div>
                      <label className="csl-form-label">Preferred Event Format</label>
                      <select name="format" className="csl-form-select">
                        <option value="">What format works best for your area?</option>
                        <option value="dinner">Private Executive Dinner</option>
                        <option value="roundtable">Roundtable Discussion</option>
                        <option value="briefing">Executive Briefing</option>
                        <option value="hybrid">Hybrid (in-person + virtual)</option>
                        <option value="flexible">Flexible / open to guidance</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("timeline") && (
                    <div>
                      <label className="csl-form-label">Timeline to Launch</label>
                      <select name="timeline" className="csl-form-select">
                        <option value="">When could you realistically launch?</option>
                        <option value="30-days">Within 30 days</option>
                        <option value="60-days">Within 60 days</option>
                        <option value="90-days">Within 90 days</option>
                        <option value="6-months">Within 6 months</option>
                        <option value="exploring">Still exploring, no firm timeline</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("cosponsor") && (
                    <div>
                      <label className="csl-form-label">Sponsor or Co-Host Interest</label>
                      <select name="cosponsor" className="csl-form-select">
                        <option value="">Are you interested in securing a local sponsor or co-host?</option>
                        <option value="yes-identified">Yes, I already have potential sponsors or co-hosts</option>
                        <option value="yes-exploring">Yes, I would like help identifying sponsors</option>
                        <option value="self-funded">I plan to self-fund initially</option>
                        <option value="not-yet">Not at this time</option>
                      </select>
                    </div>
                  )}
                  {fields.includes("message") && (
                    <div>
                      <label className="csl-form-label">{variant === "advisory" ? "What do you need help with?" : "Anything else we should know?"}</label>
                      <textarea name="message" className="csl-form-textarea" placeholder={variant === "advisory" ? "Describe your situation or goals..." : "Optional details..."} />
                    </div>
                  )}
                </div>

                {error && <p className="text-sm mt-3" style={{ color: "hsl(0 70% 60%)" }}>{error}</p>}

                <button type="submit" disabled={submitting} className="csl-btn csl-btn-primary csl-btn-block csl-btn-lg mt-6">
                  {submitting ? "Submitting..." : "Submit"}
                  {!submitting && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
