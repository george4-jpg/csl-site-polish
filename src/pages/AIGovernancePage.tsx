import CSLLayout from "@/components/CSLLayout";
import { FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

const capabilities = [
  {
    title: "AI Risk Assessment",
    desc: "Identify where AI introduces risk across your organization. We map exposure points, regulatory gaps, and liability zones so leadership can act with clarity.",
  },
  {
    title: "Governance Framework Design",
    desc: "Build a governance structure that fits your size, industry, and risk profile. Not a template. A working framework your board and regulators will take seriously.",
  },
  {
    title: "Policy Development",
    desc: "Acceptable use policies, procurement rules, vendor AI risk assessments. We draft them with you so they actually get adopted.",
  },
  {
    title: "Regulatory Alignment",
    desc: "NIST AI RMF, EU AI Act, state-level mandates. We translate what applies to you into actionable compliance steps.",
  },
  {
    title: "Board Readiness",
    desc: "Turn AI risk into language your board understands. We help you build the narrative, the metrics, and the presentation.",
  },
  {
    title: "Ongoing Advisory",
    desc: "AI governance is not a one-time project. We provide continuous guidance as regulations evolve and your AI footprint grows.",
  },
];

export default function AIGovernancePage() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="max-w-2xl">
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>Strategic Advisory</span>
            <h1 className="mt-2">
              AI Governance <span className="text-gold">Advisory</span>
            </h1>
            <p className="text-sm mt-4 max-w-[520px] leading-relaxed" style={{ color: "#E2E8F0" }}>
              AI is moving faster than most governance programs can keep up. We help executive teams build governance frameworks that are practical, defensible, and board-ready.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#contact" className="csl-btn csl-btn-primary csl-btn-lg">Start a Conversation</a>
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
                  <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 font-display text-sm font-extrabold" style={{ background: "rgba(212,168,67,0.15)", color: "hsl(var(--gold))" }}>
                    {i + 1}
                  </div>
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

      {/* WHO IT'S FOR */}
      <section className="csl-section csl-section-dark">
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

      {/* CONTACT FORM */}
      <section className="csl-section" id="contact">
        <div className="csl-container" style={{ maxWidth: 580 }}>
          <div className="text-center mb-6">
            <span className="csl-label">Get Started</span>
            <h2 className="mt-3">Start a Conversation</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>
              Tell us where you are with AI governance. We'll follow up within 48 hours.
            </p>
          </div>
          <div className="glass-card p-6">
            <CSLForm formName="ai-governance-inquiry" submitLabel="Submit Inquiry" successTitle="Inquiry Received" successMessage="We'll be in touch within 48 hours to discuss your AI governance needs.">
              <FormRow>
                <FormGroup label="First Name"><input type="text" className="csl-form-input" required /></FormGroup>
                <FormGroup label="Last Name"><input type="text" className="csl-form-input" required /></FormGroup>
              </FormRow>
              <FormGroup label="Email"><input type="email" className="csl-form-input" required /></FormGroup>
              <FormGroup label="Phone"><input type="tel" className="csl-form-input" /></FormGroup>
              <FormRow>
                <FormGroup label="Job Title"><input type="text" className="csl-form-input" /></FormGroup>
                <FormGroup label="Organization"><input type="text" className="csl-form-input" /></FormGroup>
              </FormRow>
              <FormGroup label="What best describes your need?">
                <select className="csl-form-select">
                  <option value="">Select...</option>
                  <option>Build an AI governance framework from scratch</option>
                  <option>Assess and improve our current AI governance</option>
                  <option>Prepare for board-level AI risk reporting</option>
                  <option>Regulatory compliance alignment</option>
                  <option>AI policy development</option>
                  <option>Other</option>
                </select>
              </FormGroup>
              <FormGroup label="Anything else we should know?">
                <textarea className="csl-form-input" rows={3} />
              </FormGroup>
            </CSLForm>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
