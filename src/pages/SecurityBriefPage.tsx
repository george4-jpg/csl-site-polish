import CSLLayout from "@/components/CSLLayout";
import { useState, FormEvent } from "react";

const SUPABASE_SECURITY_BRIEF_URL =
  "https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-security-brief";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";

export default function SecurityBriefPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const first_name = (fd.get("first_name") as string || "").trim();
    const last_name = (fd.get("last_name") as string || "").trim();
    const email = (fd.get("email") as string || "").trim();
    const organization = (fd.get("organization") as string || "").trim();
    const role = (fd.get("role") as string || "").trim();

    if (!first_name || !last_name || !email) {
      setError("First name, last name, and email are required.");
      setSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(SUPABASE_SECURITY_BRIEF_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          form_type: "security_brief",
          first_name,
          last_name,
          full_name: `${first_name} ${last_name}`.trim(),
          email,
          organization,
          role,
          source_page: "Security Brief",
          cta_name: "Subscribe — Inline Form",
          request_type: "Security Brief Signup",
        }),
      });

      if (!res.ok) {
        let msg = "Subscription failed. Please try again.";
        try {
          const body = await res.json();
          msg = body?.error || body?.message || msg;
        } catch {}
        throw new Error(msg);
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="max-w-2xl">
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>
              CSL Security Brief
            </span>
            <h1 className="mt-2">
              Cybersecurity leadership intelligence, <span className="text-gold">delivered.</span>
            </h1>
            <p className="text-sm mt-4 max-w-[560px] leading-relaxed" style={{ color: "#E2E8F0" }}>
              The CSL Security Brief is a practitioner-led briefing for executives, boards, and community leaders. Threat context, regulatory shifts, and what is actually working across the field, written for decision-makers.
            </p>
            <div className="mt-6">
              <a href="#subscribe" className="csl-btn csl-btn-primary csl-btn-lg">
                Subscribe to the Brief
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="max-w-2xl">
            <span className="csl-label">What You Get</span>
            <h2 className="mt-3">Signal, not noise.</h2>
          </div>
          <div className="csl-grid csl-grid-3 mt-8" style={{ gap: "1.5rem" }}>
            {[
              {
                title: "Executive Threat Context",
                body: "What changed this week and why it matters at the leadership level.",
              },
              {
                title: "Regulatory Movement",
                body: "Federal and state-level shifts that affect your organization, summarized for action.",
              },
              {
                title: "Field Notes",
                body: "What CSL operators and members are seeing across critical infrastructure, education, and government.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-5">
                <h4 className="font-display">{item.title}</h4>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#E2E8F0" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INLINE SUBSCRIBE FORM */}
      <section id="subscribe" className="csl-section" style={{ scrollMarginTop: 80 }}>
        <div className="csl-container" style={{ maxWidth: 580 }}>
          <div className="text-center">
            <span className="csl-label">Subscribe</span>
            <h2 className="mt-3">Join the CSL Security Brief</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>
              Free to subscribe. No vendor agenda. Unsubscribe anytime.
            </p>
          </div>

          <div
            className="mt-6 p-6 sm:p-8 rounded-2xl"
            style={{
              background: "hsl(222 47% 11%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(107,197,160,0.15)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3 className="font-display text-xl font-bold" style={{ color: "#F1F5F9" }}>You're subscribed.</h3>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "#E2E8F0" }}>
                  Watch your inbox for the next CSL Security Brief.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="csl-form-row">
                  <div className="csl-form-field">
                    <label className="csl-form-label">First name <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                    <input type="text" name="first_name" required maxLength={100} className="csl-form-input" placeholder="First name" />
                  </div>
                  <div className="csl-form-field">
                    <label className="csl-form-label">Last name <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                    <input type="text" name="last_name" required maxLength={100} className="csl-form-input" placeholder="Last name" />
                  </div>
                </div>
                <div className="csl-form-field mt-4">
                  <label className="csl-form-label">Work email <span style={{ color: "hsl(0 70% 60%)" }}>*</span></label>
                  <input type="email" name="email" required maxLength={255} className="csl-form-input" placeholder="you@organization.com" />
                </div>
                <div className="csl-form-field mt-4">
                  <label className="csl-form-label">Organization</label>
                  <input type="text" name="organization" maxLength={200} className="csl-form-input" placeholder="Your organization" />
                </div>
                <div className="csl-form-field mt-4">
                  <label className="csl-form-label">Role / title</label>
                  <input type="text" name="role" maxLength={150} className="csl-form-input" placeholder="e.g. CISO, Board Member" />
                </div>

                {error && (
                  <p className="text-sm mt-4" style={{ color: "hsl(0 70% 65%)" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="csl-btn csl-btn-primary csl-btn-lg csl-btn-block mt-6"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                  {!submitting && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
