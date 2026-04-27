import CSLLayout from "@/components/CSLLayout";
import { useState } from "react";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const services = [
  {
    id: "cyber-risk", label: "Cyber Risk Assessments", title: "Cyber Risk Assessments",
    tagline: "Know where you stand before someone else tells you.",
    description: "We conduct thorough assessments that go beyond compliance checklists. Our team evaluates your security posture, identifies material risk, and delivers findings in language your board and executive team can act on.",
    deliverables: ["Executive-level risk assessment report", "Gap analysis against NIST CSF, ISO 27001, or your framework of choice", "Prioritized remediation roadmap", "Board-ready risk summary"],
  },
  {
    id: "funding-strategy", label: "Funding Strategy", title: "Funding Strategy",
    tagline: "Turn cybersecurity from a cost center into a funded priority.",
    description: "Most organizations underfund cybersecurity because they can't connect risk to revenue. We help you build the business case, identify funding sources, and position security investment as a strategic advantage.",
    deliverables: ["Cybersecurity investment business case", "Grant and funding source identification", "Budget alignment with organizational risk priorities", "ROI framework for security initiatives"],
  },
  {
    id: "executive-briefings", label: "Executive Briefings", title: "Executive Briefings",
    tagline: "The intelligence your leadership team actually needs.",
    description: "Custom briefings designed for executives and board members. We translate the threat landscape, regulatory shifts, and emerging risks into clear, actionable intelligence your leadership team can use to make better decisions.",
    deliverables: ["Quarterly or on-demand threat landscape briefings", "Regulatory update summaries tailored to your industry", "Incident response readiness briefings", "Custom briefings for board meetings or leadership offsites"],
  },
  {
    id: "ongoing-advisory", label: "Ongoing Advisory", title: "Ongoing Advisory Services",
    tagline: "A strategic partner, not a one-time engagement.",
    description: "Security leadership shouldn't be reactive. Our ongoing advisory retainer gives your organization continuous access to senior cybersecurity strategists who understand your business, your risks, and your goals.",
    deliverables: ["Dedicated senior advisor", "Monthly strategic check-ins", "Priority access for incident response guidance", "Continuous posture monitoring and recommendations", "Regulatory and compliance advisory as rules evolve"],
  },
];

export default function AdvisoryPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  const openAdvisoryForm = (serviceName: string, ctaName: string) => {
    setFormContext({
      request_type: serviceName,
      source_page: "Advisory",
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
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>Advisory Services</span>
            <h1 className="mt-2">Strategic <span className="text-gold">Advisory</span> Services</h1>
            <p className="text-sm mt-4 max-w-[520px] leading-relaxed" style={{ color: "#E2E8F0" }}>
              Hands-on cybersecurity advisory for organizations that need more than a report. Risk assessments, funding strategy, executive briefings, and ongoing strategic support.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="csl-btn csl-btn-outline csl-btn-sm">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SECTIONS */}
      {services.map((service, i) => (
        <section key={service.id} id={service.id} className={`csl-section ${i % 2 === 0 ? "csl-section-dark" : ""}`}>
          <div className="csl-container">
            <div className="csl-grid csl-grid-2 items-start" style={{ gap: "2rem" }}>
              <div>
                <span className="csl-label">{service.label}</span>
                <h2 className="mt-3">{service.title}</h2>
                <p className="text-base mt-2 font-display font-semibold text-gold">{service.tagline}</p>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "#E2E8F0" }}>{service.description}</p>
                <button onClick={() => openAdvisoryForm(service.title, "Get Started")} className="csl-btn csl-btn-primary csl-btn-sm mt-5">Get Started</button>
              </div>
              <div className="glass-card p-5">
                <h4 className="font-display mb-3">What You Get</h4>
                <div className="flex flex-col gap-2.5">
                  {service.deliverables.map((item, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--emerald))" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className="text-sm" style={{ color: "#E2E8F0" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* STRATEGIC PARTNER SERVICES */}
      <section className="csl-section">
        <div className="csl-container max-w-[960px]">
          <div className="text-center mb-8">
            <span className="csl-label">Strategic Partners</span>
            <h2 className="mt-3">Strategic Partner Services for CSL Members</h2>
            <p className="text-sm mt-3 max-w-[640px] mx-auto leading-relaxed" style={{ color: "#E2E8F0" }}>
              CSL Strategic Partners provide specialized services, programs, and advisory capabilities
              aligned to member needs.
            </p>
            <div className="mt-6">
              <a href="/strategic-partners" className="csl-btn csl-btn-primary">
                Explore Strategic Partners
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 max-w-[640px] mx-auto gold-bar-left">
            <span className="csl-label">Featured Partner</span>
            <h3 className="font-display text-xl mt-2">Monarch Precision Group</h3>
            <p className="text-sm mt-2 font-display font-semibold text-gold">
              Oracle Insider Advisory & Optimization
            </p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#E2E8F0" }}>
              Former Oracle operators identifying where enterprise environments diverge from how they
              were intended to be structured, licensed, and priced.
            </p>
            <div className="mt-5">
              <a href="/strategic-partners/oracle" className="csl-btn csl-btn-outline csl-btn-sm">
                Explore Oracle Optimization
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="csl-section csl-section-dark" id="contact">
        <div className="csl-container text-center" style={{ maxWidth: 580 }}>
          <span className="csl-label">Get Started</span>
          <h2 className="mt-3">Tell Us What You Need</h2>
          <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Share a few details and we'll follow up within 48 hours to discuss next steps.</p>
          <button onClick={() => openAdvisoryForm("General Advisory Inquiry", "Submit Inquiry")} className="csl-btn csl-btn-primary csl-btn-lg mt-6">
            Submit Inquiry
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="advisory" />
    </CSLLayout>
  );
}
