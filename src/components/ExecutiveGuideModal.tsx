import { useState, useEffect, FormEvent } from "react";
import { GHL_WEBHOOKS } from "@/lib/ghl-webhooks";

const GUIDE_EDGE_FUNCTION_URL = "https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-executive-guide";
const GUIDE_ERROR_MESSAGE = "Something went wrong. Please email membership@cybersecurity-leadership.org";
const GUIDE_SUCCESS_MESSAGE = "Your guide is on the way. Check your inbox.";


const ROLE_OPTIONS = [
  "CTO / Director of Technology",
  "CISO / Security Director",
  "Superintendent / Administrator",
  "State / Government Leader",
  "Higher Education",
  "Critical Infrastructure",
  "Partner / Vendor",
  "Other",
];

const STATE_OPTIONS = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const REFERRAL_OPTIONS = [
  "LinkedIn",
  "Peer referral",
  "Google / Search",
  "CSL Event",
  "Newsletter",
  "Other",
];

const SEGMENT_BY_ROLE: Record<string, string> = {
  "CTO / Director of Technology": "Segment | K12 Tech Leader",
  "CISO / Security Director": "Segment | Security Leader",
  "Superintendent / Administrator": "Segment | District Admin",
  "State / Government Leader": "Segment | SLED Leader",
  "Higher Education": "Segment | SLED Leader",
  "Critical Infrastructure": "Segment | SLED Leader",
  "Partner / Vendor": "Segment | Partner",
};

interface ExecutiveGuideModalProps {
  open: boolean;
  onClose: () => void;
  sourcePage?: string;
}

export default function ExecutiveGuideModal({ open, onClose, sourcePage = "framework" }: ExecutiveGuideModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setSubmitting(false);
      setSubmitted(false);
      setError("");
      setSubmittedEmail("");
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

  // Auto-close 6s after success
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => onClose(), 6000);
    return () => clearTimeout(t);
  }, [submitted, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const first_name = String(fd.get("first_name") || "").trim();
    const last_name = String(fd.get("last_name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const organization = String(fd.get("organization") || "").trim();
    const role = String(fd.get("role") || "").trim();
    const phone = "";
    const company = organization;
    const title = role;
    const payload = {
      first_name,
      last_name,
      email,
      phone,
      company,
      title,
      form_type: "executive_guide",
      source_page: "framework",
      source_url: window.location.href,
    };

    console.log("Submitting guide request", payload);

    try {
      console.log("Submitting guide request", payload);
      const res = await fetch("https://oursmnzsgwjfiejppxac.supabase.co/functions/v1/csl-executive-guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      console.log("RAW RESPONSE:", text);
      if (!res.ok) {
        throw new Error(`Status ${res.status}: ${text}`);
      }
      const data = JSON.parse(text);
      console.log("Parsed response:", data);
      setSubmittedEmail(email);
      setSubmitted(true);
      setError("");
      setSubmitting(false);
    } catch (err: any) {
      console.error("Guide request FAILED:", err);
      setError(err?.message || GUIDE_ERROR_MESSAGE);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,17,32,0.85)", backdropFilter: "blur(8px)" }}
      />
      <div
        className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: "hsl(222 47% 11%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors z-10"
          style={{ color: "#94A3B8" }}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: "rgba(107,197,160,0.15)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold" style={{ color: "#F1F5F9" }}>{GUIDE_SUCCESS_MESSAGE}</h3>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
                Check your inbox. We sent your copy of the CSL Executive Guide to{" "}
                <strong style={{ color: "#F1F5F9" }}>{submittedEmail}</strong>. If you do not see it in 5 minutes, check your spam folder.
              </p>
              <p className="text-xs mt-4" style={{ color: "#94A3B8" }}>
                George Cater IV, Founder, Cybersecurity-Leadership Inc.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold" style={{ color: "#F1F5F9" }}>
                  Request the CSL Executive Guide
                </h3>
                <p className="text-sm mt-3" style={{ color: "#CBD5E1" }}>
                  Your guide will be in your inbox within minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="csl-form-label">
                        First Name <span style={{ color: "hsl(0 70% 60%)" }}>*</span>
                      </label>
                      <input type="text" name="first_name" required className="csl-form-input" placeholder="First name" />
                    </div>
                    <div>
                      <label className="csl-form-label">
                        Last Name <span style={{ color: "hsl(0 70% 60%)" }}>*</span>
                      </label>
                      <input type="text" name="last_name" required className="csl-form-input" placeholder="Last name" />
                    </div>
                  </div>

                  <div>
                    <label className="csl-form-label">
                      Work Email <span style={{ color: "hsl(0 70% 60%)" }}>*</span>
                    </label>
                    <input type="email" name="email" required className="csl-form-input" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="csl-form-label">
                      Organization / District <span style={{ color: "hsl(0 70% 60%)" }}>*</span>
                    </label>
                    <input type="text" name="organization" required className="csl-form-input" placeholder="Your organization" />
                  </div>

                  <div>
                    <label className="csl-form-label">
                      Your Role <span style={{ color: "hsl(0 70% 60%)" }}>*</span>
                    </label>
                    <select name="role" required defaultValue="" className="csl-form-select">
                      <option value="" disabled>Select your role</option>
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="csl-form-label">
                        State <span style={{ color: "hsl(0 70% 60%)" }}>*</span>
                      </label>
                      <select name="state" required defaultValue="" className="csl-form-select">
                        <option value="" disabled>Select your state</option>
                        {STATE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="csl-form-label">City</label>
                      <input type="text" name="city" className="csl-form-input" placeholder="Your city" />
                    </div>
                  </div>

                  <div>
                    <label className="csl-form-label">How did you hear about CSL?</label>
                    <select name="referral_source" defaultValue="" className="csl-form-select">
                      <option value="">Select an option</option>
                      {REFERRAL_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="text-sm mt-4" style={{ color: "hsl(0 70% 65%)" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="csl-btn csl-btn-primary csl-btn-block mt-6"
                  style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "wait" : "pointer" }}
                >
                  {submitting ? "Sending..." : "Send My Guide"}
                </button>
                <p className="text-xs text-center mt-3" style={{ color: "#94A3B8" }}>
                  No vendor pitches. No spam. Unsubscribe any time.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
