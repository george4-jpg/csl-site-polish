import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/hero-bg-ioRD65NXC9m76UpRhkM2HH.webp";

const tickerItems = [
  "Framework 4.0",
  "First of its kind",
  "End of April 2026",
  "Free Explorer",
  "Member Workspace",
  "Domain Intelligence",
  "Founding Members Get First Access",
  "Dynamic Industry Operating System",
];

export default function Framework40Page() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: "#0B1120" }}>
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,17,32,0.94), rgba(11,17,32,0.85), rgba(11,17,32,0.6))" }} />
        </div>
        <div className="csl-container relative py-16">
          <div className="max-w-[680px]">
            <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5 inline-block" style={{ color: "hsl(var(--gold))" }}>
              CSL Framework 4.0 · Coming End of April 2026.
            </span>
            <h1 className="font-display" style={{ color: "#F1F5F9" }}>
              The first cybersecurity framework<br />
              <span className="text-gold">built to move.</span>
            </h1>
            <p className="mt-6 text-base max-w-[580px] leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              Not a document. A dynamic industry operating system for CIOs and CISOs who need more than static content. Live domain intelligence, leadership prioritization, and a member workspace built for how security leaders actually work.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/onboarding" className="csl-btn csl-btn-primary">
                Get Early Access
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <Link to="/membership" className="csl-btn csl-btn-outline">
                Join as a Founding Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">What's Inside</span>
            <h2 className="mt-3" style={{ color: "#F1F5F9" }}>Three Layers. One Operating System.</h2>
          </div>
          <div className="csl-grid csl-grid-3">
            {[
              {
                label: "Free Explorer.",
                heading: "Understand every domain.",
                body: "A public tool that helps any leader understand domain risk, know what to ask, and prioritize what matters right now. No login required.",
                color: "hsl(var(--emerald))",
              },
              {
                label: "Member Workspace.",
                heading: "Your program, live.",
                body: "Posture tracking, risk notes, and board-ready exports. Designed for a 15-minute quarterly leadership review.",
                color: "hsl(var(--gold))",
              },
              {
                label: "Domain Intelligence.",
                heading: "What's changing now.",
                body: "Live threat signals, emerging vendor spotlights, and curated leadership context updated every domain, every quarter.",
                color: "hsl(var(--orange-bright))",
              },
            ].map((card, i) => (
              <div key={i} className="glass-card p-6" style={{ borderTop: `3px solid ${card.color}` }}>
                <span className="font-display text-[0.65rem] font-bold tracking-[0.12em] uppercase" style={{ color: card.color }}>
                  {card.label}
                </span>
                <h3 className="font-display text-lg font-bold mt-3" style={{ color: "#F1F5F9" }}>{card.heading}</h3>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "#E2E8F0" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOOKS TICKER */}
      <div
        className="py-3 overflow-hidden relative"
        style={{
          background: "#0F172A",
          borderTop: "1px solid rgba(212,168,67,0.15)",
          borderBottom: "1px solid rgba(212,168,67,0.15)",
        }}
      >
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(to right, #0F172A, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(to left, #0F172A, transparent)" }} />
        <div className="flex w-max" style={{ animation: "ticker 28s linear infinite" }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-gold px-6 flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#E8712A" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* MEMBER CTA BLOCK */}
      <section className="py-16" style={{ background: "hsl(var(--orange))" }}>
        <div className="csl-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-[560px]">
              <h2 className="font-display" style={{ color: "#fff" }}>Founding Members get first access.</h2>
              <p className="text-base mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                100 founding seats. Once filled, the founding rate closes permanently. Members are first into Framework 4.0 at launch.
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-2">
              <Link
                to="/membership"
                className="csl-btn csl-btn-lg font-display"
                style={{ background: "#fff", color: "hsl(var(--navy))", fontWeight: 700 }}
              >
                Join as a Founding Member
              </Link>
              <span className="text-xs italic" style={{ color: "rgba(255,255,255,0.8)" }}>
                Priority access. Locked for life.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BACK LINK */}
      <section className="py-12 text-center">
        <Link
          to="/framework"
          className="font-display text-sm font-semibold tracking-[0.08em] uppercase inline-flex items-center gap-2"
          style={{ color: "hsl(var(--gold))" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to the CSL Framework
        </Link>
      </section>
    </CSLLayout>
  );
}
