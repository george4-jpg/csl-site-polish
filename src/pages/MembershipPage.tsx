import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import { FeatureItem } from "@/components/CSLComponents";

/*
  Founding Member availability state.
  Change this single value to control the CTA across the page:
    "active"  → "Join as Founding Member" (clickable)
    "limited" → "Limited Spots Remaining" (clickable, urgency)
    "closed"  → "Founding Membership Opening Soon" (disabled)
*/
const FOUNDING_STATE: "active" | "limited" | "closed" = "active";

const FOUNDING_CTA = {
  active: { label: "Join as Founding Member", disabled: false },
  limited: { label: "Limited Spots Remaining", disabled: false },
  closed: { label: "Founding Membership Opening Soon", disabled: true },
};

const FOUNDING_BENEFITS = [
  "Full access to the CSL Cyber Framework 3.0",
  "Monthly member events and CPE-eligible programming",
  "Peer community access and member briefings",
  "Financial Strategy Session",
  "Quarterly Level Up sessions across leadership, health, and wealth",
  "Access to mentorship programming",
  "Founding Member recognition nationally",
  "Rate locked permanently while membership remains active",
];

const STANDARD_BENEFITS = [
  "Full access to the CSL Cyber Framework 3.0",
  "Monthly member events and CPE-eligible programming",
  "Peer community access and member briefings",
  "Financial Strategy Session",
  "Quarterly Level Up sessions across leadership, health, and wealth",
  "Access to mentorship programming",
  "Select guest access opportunities",
];

const EXECUTIVE_BENEFITS = [
  "Executive & Organizational Financial Mastery & Advisory",
  "Private Quarterly CISO / vCISO Sessions",
  "Dedicated Executive Advisor Access",
  "Regulatory Playbook & Advisory",
  "Executive Mentorship Guest Pass ($600 Value)",
  "Concierge Support for Personal Leadership and Organizational Planning",
];

export default function MembershipPage() {
  const cta = FOUNDING_CTA[FOUNDING_STATE];

  return (
    <CSLLayout>
      {/* HEADER */}
      <section className="csl-section">
        <div className="csl-container text-center">
          <span className="csl-label">Membership</span>
          <h1 className="mt-3 max-w-[640px] mx-auto">
            Choose Your <span className="text-gold">Membership</span>
          </h1>
          <p className="text-sm mt-3 max-w-[520px] mx-auto leading-relaxed" style={{ color: "#E2E8F0" }}>
            CSL is a governed, peer-led platform built for cybersecurity leaders. Select the membership that fits your leadership journey.
          </p>
        </div>
      </section>

      {/* TWO TIER CARDS */}
      <section className="pb-16">
        <div className="csl-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">

            {/* Founding Member */}
            <div className="rounded-md overflow-hidden" style={{ background: "#0f1a2e", border: "1px solid rgba(255,255,255,0.15)" }}>
              {/* Header strip */}
              <div className="px-6 py-5" style={{ background: "#131f33", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block font-[Barlow_Condensed] font-bold text-[0.60rem] tracking-[0.20em] uppercase px-3 py-1 rounded-full" style={{ background: "#d4a843", color: "#0d1321" }}>
                    Founding Member | Limited to 100
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-[DM_Serif_Display] text-[2.5rem] text-white leading-none">$297</span>
                  <span className="font-[Barlow] text-[0.78rem]" style={{ color: "rgba(255,255,255,0.55)" }}>/ year</span>
                </div>
                <p className="font-[Barlow_Condensed] font-bold text-[0.60rem] tracking-[0.08em] mt-2" style={{ color: "#d4a843" }}>⚡ Rate locked permanently once enrolled</p>
              </div>
              {/* Body */}
              <div className="px-6 py-5">
                <div className="flex flex-col gap-2.5 mb-6">
                  {FOUNDING_BENEFITS.map((b) => (
                    <FeatureItem key={b}>{b}</FeatureItem>
                  ))}
                </div>
                {cta.disabled ? (
                  <div className="w-full h-[52px] rounded-[3px] font-[Barlow_Condensed] font-bold text-[0.85rem] tracking-[0.12em] uppercase flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: "#9ba8bb", cursor: "not-allowed" }}>
                    {cta.label}
                  </div>
                ) : (
                  <Link to="/enroll?tier=founding" className="w-full h-[52px] rounded-[3px] font-[Barlow_Condensed] font-bold text-[0.85rem] tracking-[0.12em] uppercase text-white flex items-center justify-center gap-2 no-underline transition-all hover:translate-y-[-1px]" style={{ background: "#c85a1e", boxShadow: "0 4px 24px rgba(200,90,30,0.35)" }}>
                    {cta.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                )}
                {FOUNDING_STATE === "limited" && (
                  <p className="text-center text-[0.68rem] mt-3 font-[Barlow] italic" style={{ color: "#d4a843" }}>Only a few founding seats remain.</p>
                )}
              </div>
            </div>

            {/* Standard Member */}
            <div className="rounded-md overflow-hidden" style={{ background: "#0f1a2e", border: "1px solid rgba(255,255,255,0.15)" }}>
              {/* Header strip */}
              <div className="px-6 py-5" style={{ background: "#131f33", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block font-[Barlow_Condensed] font-bold text-[0.60rem] tracking-[0.20em] uppercase px-3 py-1 rounded-full" style={{ background: "transparent", color: "#e8e4de", border: "1px solid rgba(255,255,255,0.25)" }}>
                    Standard Member
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-[DM_Serif_Display] text-[2.5rem] text-white leading-none">$597</span>
                  <span className="font-[Barlow] text-[0.78rem]" style={{ color: "rgba(255,255,255,0.55)" }}>/ year</span>
                </div>
              </div>
              {/* Body */}
              <div className="px-6 py-5">
                <div className="flex flex-col gap-2.5 mb-6">
                  {STANDARD_BENEFITS.map((b) => (
                    <FeatureItem key={b}>{b}</FeatureItem>
                  ))}
                </div>
                <Link to="/enroll?tier=standard" className="w-full h-[52px] rounded-[3px] font-[Barlow_Condensed] font-bold text-[0.85rem] tracking-[0.12em] uppercase flex items-center justify-center gap-2 no-underline transition-all hover:translate-y-[-1px] hover:text-white" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#e8e4de" }}>
                  Join as Standard Member
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>

            {/* Executive Member */}
            <div className="rounded-md overflow-hidden" style={{ background: "#0f1a2e", border: "1px solid rgba(212,168,67,0.35)" }}>
              {/* Header strip */}
              <div className="px-6 py-5" style={{ background: "#131f33", borderBottom: "1px solid rgba(212,168,67,0.25)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block font-[Barlow_Condensed] font-bold text-[0.60rem] tracking-[0.20em] uppercase px-3 py-1 rounded-full" style={{ background: "rgba(212,168,67,0.15)", color: "#d4a843", border: "1px solid rgba(212,168,67,0.4)" }}>
                    Executive Member
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-[DM_Serif_Display] text-[2.5rem] text-white leading-none">$1,497</span>
                  <span className="font-[Barlow] text-[0.78rem]" style={{ color: "rgba(255,255,255,0.55)" }}>/ year</span>
                </div>
              </div>
              {/* Body */}
              <div className="px-6 py-5">
                <div className="flex flex-col gap-2.5 mb-6">
                  {EXECUTIVE_BENEFITS.map((b) => (
                    <FeatureItem key={b}>{b}</FeatureItem>
                  ))}
                </div>
                <Link to="/enroll?tier=executive" className="w-full h-[52px] rounded-[3px] font-[Barlow_Condensed] font-bold text-[0.85rem] tracking-[0.12em] uppercase text-white flex items-center justify-center gap-2 no-underline transition-all hover:translate-y-[-1px]" style={{ background: "linear-gradient(135deg, #c85a1e, #d4a843)", boxShadow: "0 4px 24px rgba(212,168,67,0.25)" }}>
                  Join as Executive Member
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MEMBER-FIRST NOTE */}
      <section className="pb-10">
        <div className="csl-container">
          <div className="glass-card gold-bar-left p-5 max-w-[640px] mx-auto">
            <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
              <strong className="text-gold">Membership is the foundation.</strong> Sponsors and partners participate within a structured, member-first ecosystem. Founding Member status is reserved for qualified practitioner members. Vendors and solution providers follow the Partner path.
            </p>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: "#94A3B8" }}>
            Questions? <a href="mailto:membership@cybersecurity-leadership.org" className="text-gold hover:underline">membership@cybersecurity-leadership.org</a>
          </p>
        </div>
      </section>
    </CSLLayout>
  );
}
