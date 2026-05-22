import CSLLayout from "@/components/CSLLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FeatureItem } from "@/components/CSLComponents";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const programInclusions = [
  "District-specific AI governance guidance",
  "Leadership working session",
  "Executive and board talking points",
  "Implementation guidance and next-step planning",
  "Follow-up support",
  "Included CSL leadership memberships",
];

const tiers = [
  {
    id: "micro",
    title: "Micro Districts",
    size: "Under 500 students",
    price: "$1,500",
    seats: "3 CSL Leadership Seats",
    cta: "Request Information",
  },
  {
    id: "small",
    title: "Small Districts",
    size: "500 – 1,500 students",
    price: "$3,500",
    seats: "4 CSL Leadership Seats",
    cta: "Request Information",
  },
  {
    id: "mid",
    title: "Mid-Size Districts",
    size: "1,500 – 5,000 students",
    price: "$5,000",
    seats: "5 CSL Leadership Seats",
    featured: true,
    cta: "Request Information",
  },
  {
    id: "large",
    title: "Large Districts",
    size: "5,000+ students",
    price: "Custom",
    seats: "Custom leadership seat allocation",
    cta: "Discuss Engagement",
  },
];

const audiences = [
  { title: "Superintendents", desc: "Set district direction and align leadership around practical AI governance." },
  { title: "Technology Leaders", desc: "CIOs, CTOs, and technology directors leading AI readiness and operational planning." },
  { title: "CFO / Operations", desc: "Operational and financial leaders evaluating AI exposure, procurement, and risk." },
  { title: "Curriculum Leadership", desc: "Academic leaders shaping appropriate AI use across instruction and student services." },
  { title: "Board Leadership", desc: "Board members who need clear talking points, governance posture, and oversight clarity." },
  { title: "Higher Education Leaders", desc: "University and college leadership teams aligning governance, IT, and academic policy." },
];

const whyPoints = [
  { title: "AI adoption is accelerating", desc: "Districts are deploying AI tools faster than internal policy and leadership alignment can keep up." },
  { title: "Leadership teams need direction", desc: "Superintendents, technology, and operations leaders are looking for practical clarity, not consulting decks." },
  { title: "Few districts have dedicated AI governance resources", desc: "Most leadership teams are absorbing AI responsibility on top of existing roles." },
  { title: "Operational readiness matters", desc: "Governance only works when it connects to procurement, instruction, identity, and incident response." },
  { title: "Districts want low-friction support", desc: "The need is collaborative leadership support, not a long, expensive engagement." },
];

export default function DistrictAIGovernancePage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  const openForm = (ctaName: string, requestType: string, campaign?: string) => {
    setFormContext({
      request_type: requestType,
      source_page: "District AI Governance",
      cta_name: ctaName,
      audience_type: "K-12 / Higher Education Leadership",
      campaign: campaign || "District AI Governance Support Program",
    });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="max-w-3xl">
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>
              District Leadership Program
            </span>
            <h1 className="mt-2">
              Practical AI Governance Support for <span className="text-gold">Education Leadership</span>
            </h1>
            <p className="text-base mt-5 max-w-[640px] leading-relaxed" style={{ color: "#E2E8F0" }}>
              CSL helps districts simplify AI governance, leadership alignment, operational readiness, and implementation
              guidance without creating large consulting engagements.
            </p>
            <p className="text-sm mt-4 max-w-[640px] leading-relaxed" style={{ color: "#CBD5E1" }}>
              AI adoption is accelerating across education. Many districts need practical guidance that aligns leadership,
              technology, operations, and governance without adding unnecessary complexity.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <button
                onClick={() => openForm("Hero Primary CTA", "District AI Governance - Leadership Discussion")}
                className="csl-btn csl-btn-primary csl-btn-lg"
              >
                Schedule Leadership Discussion
              </button>
              <a href="#program-options" className="csl-btn csl-btn-outline csl-btn-lg">
                View District Program Options
              </a>
            </div>
            <p className="text-xs mt-5 italic" style={{ color: "hsl(var(--gold))" }}>
              We build relationships, not transactions.
            </p>
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Why This Matters</span>
            <h2 className="mt-3">Leadership Direction Has to Catch Up to AI Adoption</h2>
            <p className="text-sm mt-3 max-w-2xl mx-auto" style={{ color: "#E2E8F0" }}>
              District leaders are being asked to govern AI without dedicated resources, clear playbooks, or peer
              context. CSL provides practical support that meets leadership teams where they are.
            </p>
          </div>
          <div className="csl-grid csl-grid-3" style={{ gap: "1.25rem" }}>
            {whyPoints.map((p, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full mb-3 font-display text-sm font-extrabold"
                  style={{ background: "rgba(212,168,67,0.15)", color: "hsl(var(--gold))" }}>
                  {i + 1}
                </div>
                <h4 className="font-display">{p.title}</h4>
                <p className="text-xs mt-2" style={{ color: "#CBD5E1" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM OVERVIEW */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Program Overview</span>
            <h2 className="mt-3">CSL District AI Governance Support Program</h2>
            <p className="text-sm mt-3 max-w-2xl mx-auto" style={{ color: "#E2E8F0" }}>
              A focused, low-friction program designed for district leadership teams. Built around practical
              guidance, operational readiness, and ongoing leadership support.
            </p>
          </div>
          <div className="glass-card p-7 max-w-3xl mx-auto">
            {programInclusions.map((item, i) => (
              <FeatureItem key={i}>{item}</FeatureItem>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section className="csl-section csl-section-dark" id="program-options">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">District Program Options</span>
            <h2 className="mt-3">Sized to Your District</h2>
            <p className="text-sm mt-3 max-w-2xl mx-auto" style={{ color: "#E2E8F0" }}>
              Transparent program tiers based on district size. Every engagement includes CSL leadership memberships.
            </p>
          </div>
          <div className="csl-grid csl-grid-4" style={{ gap: "1.25rem" }}>
            {tiers.map((t) => (
              <div key={t.id} className={`pricing-card${t.featured ? " featured" : ""}`}>
                {t.featured && (
                  <div className="flex items-center justify-end mb-3">
                    <span className="csl-badge csl-badge-orange">Most Common</span>
                  </div>
                )}
                <h3 className="font-display">{t.title}</h3>
                <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>{t.size}</p>
                <div className="mt-3">
                  <span className="font-display text-[1.75rem] font-black">{t.price}</span>
                </div>
                <p className="text-xs mt-2" style={{ color: "#CBD5E1" }}>{t.seats}</p>
                <button
                  onClick={() => openForm(`${t.title} CTA`, `District AI Governance - ${t.title}`)}
                  className={`csl-btn ${t.featured ? "csl-btn-primary" : "csl-btn-outline"} csl-btn-block mt-5`}
                >
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-[0.7rem] text-center mt-6" style={{ color: "#94A3B8" }}>
            Additional leadership seats available. Final scope confirmed during leadership discussion.
          </p>
        </div>
      </section>

      {/* PILOT COHORT */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="glass-card gold-bar-left p-8">
            <span className="csl-label">Pilot Cohort</span>
            <h2 className="mt-3">AI Governance Leadership Pilot Cohort</h2>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
              CSL is currently onboarding a limited number of districts for the initial AI Governance Leadership
              Pilot Cohort. Pilot districts work alongside CSL leadership to establish practical direction, alignment,
              and operational readiness.
            </p>
            <div className="mt-6">
              <h4 className="font-display text-sm mb-3" style={{ color: "hsl(var(--gold))" }}>Pilot districts receive:</h4>
              <FeatureItem>Priority onboarding</FeatureItem>
              <FeatureItem>Founding leadership participation</FeatureItem>
              <FeatureItem>Early access to future CSL leadership briefings</FeatureItem>
              <FeatureItem>Priority invitations to future CSL events and webinars</FeatureItem>
            </div>
            <div className="mt-7">
              <button
                onClick={() => openForm("Pilot Cohort CTA", "District AI Governance - Pilot Cohort", "Pilot Cohort")}
                className="csl-btn csl-btn-primary csl-btn-lg"
              >
                Express Pilot Cohort Interest
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHO SHOULD PARTICIPATE */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Who Should Participate</span>
            <h2 className="mt-3">Built for District Leadership Teams</h2>
          </div>
          <div className="csl-grid csl-grid-3" style={{ gap: "1.25rem" }}>
            {audiences.map((a, i) => (
              <div key={i} className="glass-card p-5">
                <h4 className="font-display">{a.title}</h4>
                <p className="text-xs mt-2" style={{ color: "#CBD5E1" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="csl-section" id="contact">
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="glass-card gold-bar-left p-8 text-center">
            <span className="csl-label">Get Started</span>
            <h2 className="mt-3">Start the Leadership Conversation</h2>
            <p className="text-sm mt-4 max-w-md mx-auto leading-relaxed" style={{ color: "#E2E8F0" }}>
              Schedule a short leadership discussion to determine whether CSL can support your district's AI
              governance and operational readiness goals.
            </p>
            <button
              onClick={() => openForm("Final CTA - 15 Minute Discussion", "District AI Governance - 15 Min Discussion")}
              className="csl-btn csl-btn-primary csl-btn-lg mt-6"
            >
              Schedule 15-Minute Discussion
            </button>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-display text-base" style={{ color: "hsl(var(--gold))" }}>George4</p>
              <p className="text-xs mt-1" style={{ color: "#CBD5E1" }}>Founder | Cyber Security Leadership</p>
              <p className="text-xs" style={{ color: "#CBD5E1" }}>CEO | Monarch217</p>
              <p className="text-xs mt-4 italic" style={{ color: "hsl(var(--gold))" }}>
                We build relationships, not transactions.
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Prefer email? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a>
            </p>
          </div>
        </div>
      </section>

      <CSLFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        context={formContext}
        variant="advisory"
      />
    </CSLLayout>
  );
}
