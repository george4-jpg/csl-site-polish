import CSLLayout from "@/components/CSLLayout";
import { useState } from "react";
import { FeatureItem } from "@/components/CSLComponents";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const capabilities = [
  { title: "AI Risk Assessment", desc: "Identify where AI introduces risk across your organization. We map exposure points, regulatory gaps, and liability zones so leadership can act with clarity." },
  { title: "Governance Framework Design", desc: "Build a governance structure that fits your size, industry, and risk profile. Not a template. A working framework your board and regulators will take seriously." },
  { title: "Policy Development", desc: "Acceptable use policies, procurement rules, vendor AI risk assessments. We draft them with you so they actually get adopted." },
  { title: "Regulatory Alignment", desc: "NIST AI RMF, EU AI Act, state-level mandates. We translate what applies to you into actionable compliance steps." },
  { title: "Board Readiness", desc: "Turn AI risk into language your board understands. We help you build the narrative, the metrics, and the presentation." },
  { title: "Ongoing Advisory", desc: "AI governance is not a one-time project. We provide continuous guidance as regulations evolve and your AI footprint grows." },
];

const packages = [
  {
    id: "assessment",
    title: "AI Governance Assessment",
    price: "Starting at $15,000",
    description: "A focused engagement to evaluate your current AI governance posture and deliver an actionable roadmap.",
    features: [
      "AI risk exposure mapping",
      "Regulatory gap analysis",
      "Governance maturity assessment",
      "Prioritized remediation roadmap",
      "Executive summary for board reporting",
    ],
    cta: "Request Assessment",
  },
  {
    id: "executive",
    title: "Executive Package",
    price: "Starting at $35,000",
    featured: true,
    description: "End-to-end AI governance program design for organizations ready to lead. Includes framework build, policy drafting, board preparation, and 90-day advisory support.",
    features: [
      "Full AI governance framework design",
      "Custom policy development and review",
      "Board-ready risk narrative and metrics",
      "Regulatory alignment (NIST AI RMF, EU AI Act)",
      "90-day post-delivery advisory support",
      "Executive briefing and leadership workshop",
    ],
    cta: "Start a Conversation",
  },
  {
    id: "retainer",
    title: "Ongoing Advisory Retainer",
    price: "Starting at $5,000/mo",
    description: "Continuous strategic advisory for organizations with evolving AI programs, regulatory exposure, or board-level reporting requirements.",
    features: [
      "Dedicated senior AI governance advisor",
      "Monthly strategic check-ins",
      "Regulatory change monitoring and updates",
      "Board and leadership support on demand",
      "Priority incident response guidance",
    ],
    cta: "Discuss Retainer",
  },
];

export default function AIGovernancePage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  const openForm = (ctaName: string, requestType: string) => {
    setFormContext({
      request_type: requestType,
      source_page: "AI Governance",
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
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>Strategic Advisory</span>
            <h1 className="mt-2">AI Governance <span className="text-gold">Advisory</span></h1>
            <p className="text-sm mt-4 max-w-[520px] leading-relaxed" style={{ color: "#E2E8F0" }}>
              AI is moving faster than most governance programs can keep up. We help executive teams build governance frameworks that are practical, defensible, and board-ready.
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => openForm("Hero CTA", "AI Governance Inquiry")} className="csl-btn csl-btn-primary csl-btn-lg">Start a Conversation</button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container text-center">
          <span className="csl-label">Why This Matters</span>
          <h2 className="mt-3 mb-3">AI Risk Is a Leadership Problem</h2>
          <p className="text-sm max-w-xl mx-auto mb-8" style={{ color: "#E2E8F0" }}>
            Regulators are moving. Boards are asking questions. And most organizations still don't have a clear answer on how they govern AI. That gap is a liability.
          </p>
          <div className="csl-grid csl-grid-3">
            {[
              { stat: "78%", label: "of boards say AI governance is a top priority" },
              { stat: "3x", label: "increase in AI-related regulatory actions since 2023" },
              { stat: "62%", label: "of organizations lack a formal AI governance framework" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <div className="font-display text-[2.2rem] font-black text-gold">{item.stat}</div>
                <p className="text-xs mt-1 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">What We Deliver</span>
            <h2 className="mt-3">End-to-End AI Governance Support</h2>
          </div>
          <div className="csl-grid csl-grid-2" style={{ gap: "1.25rem" }}>
            {capabilities.map((cap, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex gap-3 items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 font-display text-sm font-extrabold" style={{ background: "rgba(212,168,67,0.15)", color: "hsl(var(--gold))" }}>{i + 1}</div>
                  <div>
                    <h4 className="font-display">{cap.title}</h4>
                    <p className="text-sm mt-1" style={{ color: "#E2E8F0" }}>{cap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Engagement Options</span>
            <h2 className="mt-3">Choose the Right Engagement</h2>
            <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: "#E2E8F0" }}>
              Every engagement is scoped to your organization. Final deliverables and pricing are confirmed at kickoff.
            </p>
          </div>
          <div className="csl-grid csl-grid-3">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`pricing-card${pkg.featured ? " featured" : ""}`}>
                {pkg.featured && (
                  <div className="flex items-center justify-between mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span className="csl-badge csl-badge-orange">Recommended</span>
                  </div>
                )}
                <h3 className="font-display">{pkg.title}</h3>
                <div className="mt-2">
                  <span className="font-display text-[1.5rem] font-black">{pkg.price}</span>
                </div>
                <p className="text-xs mt-2" style={{ color: "#CBD5E1" }}>{pkg.description}</p>
                <div className="my-5">
                  {pkg.features.map((f, j) => (
                    <FeatureItem key={j}>{f}</FeatureItem>
                  ))}
                </div>
                <button
                  onClick={() => openForm(pkg.cta, `AI Governance - ${pkg.title}`)}
                  className={`csl-btn ${pkg.featured ? "csl-btn-primary" : "csl-btn-outline"} csl-btn-block`}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-[0.65rem] text-center mt-6" style={{ color: "#94A3B8" }}>
            Final scope, deliverables, and pricing depend on organization size, complexity, and requirements. All engagements are confirmed at kickoff.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="csl-section">
        <div className="csl-container text-center">
          <span className="csl-label">Who This Is For</span>
          <h2 className="mt-3 mb-6">Built for Leaders Who Own the Decision</h2>
          <div className="csl-grid csl-grid-3">
            {[
              { title: "CISOs & CIOs", desc: "You're being asked to own AI risk. We help you build the program and the credibility to lead it." },
              { title: "Board Members", desc: "You need AI risk fluency without the jargon. We give you the questions to ask and the metrics that matter." },
              { title: "General Counsel", desc: "AI liability is real and growing. We help you build governance that reduces legal exposure." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <h4 className="font-display mb-2">{item.title}</h4>
                <p className="text-xs" style={{ color: "#E2E8F0" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="csl-section" id="contact">
        <div className="csl-container" style={{ maxWidth: 640 }}>
          <div className="glass-card gold-bar-left p-8 text-center">
            <span className="csl-label">Get Started</span>
            <h2 className="mt-3">Start a Conversation</h2>
            <p className="text-sm mt-3 max-w-md mx-auto leading-relaxed" style={{ color: "#E2E8F0" }}>
              Tell us where you are with AI governance. We will follow up within 48 hours to discuss your needs and recommended next steps.
            </p>
            <button
              onClick={() => openForm("Submit Inquiry", "AI Governance General Inquiry")}
              className="csl-btn csl-btn-primary csl-btn-lg mt-6"
            >
              Submit Inquiry
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <p className="text-xs text-muted-foreground mt-4">
              Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a>
            </p>
          </div>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="advisory" />
    </CSLLayout>
  );
}
