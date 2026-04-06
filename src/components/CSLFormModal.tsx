import { useState, useEffect, FormEvent } from "react";

export interface FormContext {
  request_type?: string;
  event_name?: string;
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
  variant?: "rsvp" | "interest" | "brief" | "advisory" | "host" | "partner" | "cohort";
}

const variantConfig: Record<string, { title: string; subtitle: string; successTitle: string; successMessage: string; fields: string[] }> = {
  rsvp: {
    title: "Register for This Event",
    subtitle: "Secure your seat. We will confirm within 24 hours.",
    successTitle: "You're Registered",
    successMessage: "We have received your registration and will follow up with confirmation details shortly.",
    fields: ["name", "email", "phone", "title", "organization"],
  },
  interest: {
    title: "Express Interest",
    subtitle: "Let us know you want CSL in your state.",
    successTitle: "Interest Received",
    successMessage: "We have recorded your interest and will reach out as activity builds in your area.",
    fields: ["name", "email", "phone", "title", "organization", "city", "state"],
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
    successMessage: "A member of our advisory team will reach out to discuss your needs and next steps.",
    fields: ["name", "email", "phone", "title", "organization", "message"],
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
    successMessage: "Our partnerships team will review your submission and follow up within 5 business days.",
    fields: ["name", "email", "phone", "title", "organization", "message"],
  },
  cohort: {
    title: "Enroll in the AI Governance Cohort",
    subtitle: "8 weeks. 8 leaders. Submit your enrollment interest below.",
    successTitle: "Enrollment Interest Received",
    successMessage: "We will confirm your seat and send payment instructions within 48 hours.",
    fields: ["name", "email", "phone", "title", "organization"],
  },
};

export default function CSLFormModal({ open, onClose, context, variant = "interest" }: CSLFormModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitting(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const config = variantConfig[variant] || variantConfig.interest;
  const fields = config.fields;

  const contextLabel = context.event_name || context.request_type || context.state || context.campaign;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission - in production this would POST to a webhook
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(11,17,32,0.85)", backdropFilter: "blur(8px)" }} />
      <div
        className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: "hsl(222 47% 11%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "#94A3B8" }}>
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
              {variant === "rsvp" && context.event_name && (
                <p className="text-sm mt-3" style={{ color: "#CBD5E1" }}>Event: <strong style={{ color: "#F1F5F9" }}>{context.event_name}</strong></p>
              )}
              {context.state && variant === "interest" && (
                <p className="text-sm mt-3" style={{ color: "#CBD5E1" }}>State: <strong style={{ color: "#F1F5F9" }}>{context.state}</strong></p>
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

              {/* Hidden context fields for attribution */}
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="request_type" value={context.request_type || ""} />
                <input type="hidden" name="event_name" value={context.event_name || ""} />
                <input type="hidden" name="source_page" value={context.source_page || ""} />
                <input type="hidden" name="cta_name" value={context.cta_name || ""} />
                <input type="hidden" name="state_context" value={context.state || ""} />
                <input type="hidden" name="audience_type" value={context.audience_type || ""} />
                <input type="hidden" name="campaign" value={context.campaign || ""} />

                <div className="space-y-4">
                  {fields.includes("name") && (
                    <div>
                      <label className="csl-form-label">Full Name</label>
                      <input type="text" required className="csl-form-input" placeholder="Your full name" />
                    </div>
                  )}
                  {fields.includes("email") && (
                    <div>
                      <label className="csl-form-label">Email</label>
                      <input type="email" required className="csl-form-input" placeholder="you@example.com" />
                    </div>
                  )}
                  {fields.includes("phone") && (
                    <div>
                      <label className="csl-form-label">Phone</label>
                      <input type="tel" className="csl-form-input" placeholder="(555) 000-0000" />
                    </div>
                  )}
                  {fields.includes("title") && fields.includes("organization") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="csl-form-label">Title</label>
                        <input type="text" className="csl-form-input" placeholder="Your title" />
                      </div>
                      <div>
                        <label className="csl-form-label">Organization</label>
                        <input type="text" className="csl-form-input" placeholder="Your organization" />
                      </div>
                    </div>
                  )}
                  {fields.includes("city") && fields.includes("state") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="csl-form-label">City</label>
                        <input type="text" className="csl-form-input" placeholder="Your city" />
                      </div>
                      <div>
                        <label className="csl-form-label">State</label>
                        <input type="text" className="csl-form-input" defaultValue={context.state || ""} placeholder="Your state" />
                      </div>
                    </div>
                  )}
                  {fields.includes("state") && !fields.includes("city") && (
                    <div>
                      <label className="csl-form-label">State</label>
                      <input type="text" className="csl-form-input" defaultValue={context.state || ""} placeholder="Your state" />
                    </div>
                  )}
                  {fields.includes("venue") && (
                    <div>
                      <label className="csl-form-label">Venue Access</label>
                      <select className="csl-form-select">
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
                      <select className="csl-form-select">
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
                      <select className="csl-form-select">
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
                      <select className="csl-form-select">
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
                      <select className="csl-form-select">
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
                      <select className="csl-form-select">
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
                      <select className="csl-form-select">
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
                      <textarea className="csl-form-textarea" placeholder={variant === "advisory" ? "Describe your situation or goals..." : "Optional details..."} />
                    </div>
                  )}
                </div>

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
