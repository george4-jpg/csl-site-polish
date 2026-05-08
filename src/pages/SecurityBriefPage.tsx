import CSLLayout from "@/components/CSLLayout";
import { useState } from "react";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

export default function SecurityBriefPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  const openForm = (ctaName: string) => {
    setFormContext({
      source_page: "Security Brief",
      cta_name: ctaName,
    });
    setFormOpen(true);
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
              <button onClick={() => openForm("Subscribe — Hero")} className="csl-btn csl-btn-primary csl-btn-lg">
                Subscribe to the Brief
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
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

      {/* CTA */}
      <section className="csl-section">
        <div className="csl-container text-center" style={{ maxWidth: 580 }}>
          <span className="csl-label">Subscribe</span>
          <h2 className="mt-3">Join the CSL Security Brief</h2>
          <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>
            Free to subscribe. No vendor agenda. Unsubscribe anytime.
          </p>
          <button onClick={() => openForm("Subscribe — Footer")} className="csl-btn csl-btn-primary csl-btn-lg mt-6">
            Subscribe
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="newsletter" />
    </CSLLayout>
  );
}
