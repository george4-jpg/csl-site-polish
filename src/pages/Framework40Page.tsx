import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import { GHL_EXECUTIVE_GUIDE } from "@/lib/ghl-urls";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/hero-bg-ioRD65NXC9m76UpRhkM2HH.webp";

const tickerItems = [
  "Framework 4.0",
  "New Category",
  "End of April 2026",
  "Leadership Operating Model",
  "Member Workspace",
  "Domain Intelligence",
  "Founding Members Get First Access",
  "Built for Execution",
];

export default function Framework40Page() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  const openGuideForm = () => {
    setFormContext({
      request_type: "Executive Guide Request",
      source_page: "Framework 4.0",
      cta_name: "Access the Framework",
    });
    setFormOpen(true);
  };

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
              CSL Framework 4.0 · Coming End of April 2026
            </span>
            <h1 className="font-display" style={{ color: "#F1F5F9" }}>
              The Next Evolution of the<br />
              <span className="text-gold">CSL Operating Model.</span>
            </h1>
            <p className="mt-6 text-base max-w-[580px] leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              A dynamic, member-driven system to navigate organizational cyber strategy. Built for CIOs and CISOs who need real-time intelligence, leadership alignment, and execution support in one place.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={openGuideForm} className="csl-btn csl-btn-primary">
                Access the Framework
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
              <Link to="/enroll?tier=founding" className="csl-btn csl-btn-outline">
                Join CSL Founding Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OPENING POSITIONING */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="max-w-[720px] mx-auto text-center">
            <h2 className="font-display" style={{ color: "#F1F5F9" }}>This is not a framework in the traditional sense.</h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              It is a living system designed to help cybersecurity leaders make better decisions, faster.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              CSL Framework 4.0 connects strategy, intelligence, and execution across your organization. It evolves with the threat landscape, your environment, and your leadership priorities.
            </p>
            <p className="mt-4 text-base leading-relaxed font-semibold" style={{ color: "hsl(var(--gold))" }}>
              There is nothing else like this in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* CORE DIFFERENTIATION */}
      <section className="csl-section" style={{ background: "#0B1120" }}>
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Core Differentiation</span>
            <h2 className="mt-3" style={{ color: "#F1F5F9" }}>What makes this different.</h2>
          </div>
          <div className="csl-grid csl-grid-2 max-w-[800px] mx-auto">
            {[
              { heading: "Dynamic, not static.", body: "This system updates as conditions change." },
              { heading: "Member-specific.", body: "Tailored to how you lead, not a generic model." },
              { heading: "Built for execution.", body: "Not theory, not compliance checklists." },
              { heading: "Integrated with leadership.", body: "Aligns cyber decisions to business outcomes." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6" style={{ borderLeft: "3px solid hsl(var(--gold))" }}>
                <h3 className="font-display text-lg font-bold" style={{ color: "#F1F5F9" }}>{item.heading}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#E2E8F0" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Value Stack</span>
            <h2 className="mt-3" style={{ color: "#F1F5F9" }}>What you gain.</h2>
          </div>
          <div className="csl-grid csl-grid-3">
            {[
              {
                label: "Intelligence.",
                heading: "Live domain intelligence.",
                body: "Aligned to your environment. Updated continuously. Always relevant to your leadership context.",
                color: "hsl(var(--emerald))",
              },
              {
                label: "Prioritization.",
                heading: "Structured decision support.",
                body: "Built-in prioritization for cyber leadership decisions. Know what matters now and what can wait.",
                color: "hsl(var(--gold))",
              },
              {
                label: "Integration.",
                heading: "Full program access.",
                body: "Integrated access to CSL programs across events, leadership development, health, and wealth.",
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
          <p className="text-center mt-8 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            A centralized workspace designed for how cybersecurity leaders actually operate.
          </p>
        </div>
      </section>

      {/* POSITIONING STATEMENT */}
      <section className="py-16" style={{ background: "#0B1120", borderTop: "1px solid rgba(212,168,67,0.15)", borderBottom: "1px solid rgba(212,168,67,0.15)" }}>
        <div className="csl-container">
          <div className="max-w-[680px] mx-auto text-center">
            <p className="font-display text-xl leading-relaxed" style={{ color: "#F1F5F9" }}>
              A system built to unify how cybersecurity leaders think, prioritize, and act across their organization.
            </p>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Not a document. Not a slide deck. Not a static framework.
            </p>
            <p className="mt-2 font-display text-base font-bold" style={{ color: "hsl(var(--gold))" }}>
              A dynamic operating model built for leadership execution.
            </p>
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

      {/* MEMBERSHIP TIE-IN CTA */}
      <section className="py-16" style={{ background: "hsl(var(--orange))" }}>
        <div className="csl-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-[560px]">
              <h2 className="font-display" style={{ color: "#fff" }}>Included with CSL Founding Membership.</h2>
              <p className="text-base mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                Framework 4.0 is included within CSL Founding Membership, with early access, enhanced capabilities, and ongoing development tied directly to member needs.
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-2">
              <Link
                to="/enroll?tier=founding"
                className="csl-btn csl-btn-lg font-display"
                style={{ background: "#fff", color: "hsl(var(--navy))", fontWeight: 700 }}
              >
                Join CSL Founding Membership
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

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="guide" />
    </CSLLayout>
  );
}
