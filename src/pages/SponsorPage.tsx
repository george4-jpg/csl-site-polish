import CSLLayout from "@/components/CSLLayout";
import { FeatureItem, FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

const PILLARS = [
  {
    title: "Use Cases & Lessons",
    desc: "Share practical use cases, lessons learned, and real-world outcomes that help leaders make better decisions.",
  },
  {
    title: "Content Library",
    desc: "Contribute member-safe case studies, briefings, research inputs, and category education to the CSL knowledge base.",
  },
  {
    title: "Events & Webinars",
    desc: "Host or support CSL dinners, local roundtables, and webinars that bring leaders together around real challenges.",
  },
  {
    title: "Workforce & Career Pathways",
    desc: "Support job listings, talent pathways, mentorship programs, and hiring visibility for the CSL community.",
  },
  {
    title: "Strategic Relationships",
    desc: "Build trust-based relationships with leaders through structured engagement, not sales conversations.",
  },
];

export default function SponsorPage() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Strategic Partners</span>
          <h1 className="mt-3 max-w-[620px]">
            Earn Your Seat.<br />
            <span className="text-gold">Contribute Real Value.</span>
          </h1>
          <p
            className="text-sm mt-3 max-w-[560px] leading-relaxed"
            style={{ color: "#E2E8F0" }}
          >
            CSL does not sell access to its members. Strategic Partners go through a formal vetting process and contribute practical expertise that members actually use. CSL helps translate partner knowledge into useful facts, real-world use cases, and lessons leaders can apply.
          </p>
        </div>
      </section>

      {/* 5-STEP VETTING */}
      <section className="pb-8">
        <div className="csl-container">
          <h2 className="mb-6 text-center">The 5-Step Vetting Process</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {[
              { num: 1, title: "Apply", desc: "Submit your application with company details." },
              { num: 2, title: "Review", desc: "Council checks alignment with member needs." },
              { num: 3, title: "Interview", desc: "30-minute call with CSL leadership." },
              { num: 4, title: "Vote", desc: "Executive council votes on admission." },
              { num: 5, title: "Onboard", desc: "Welcome to the room as a vetted partner." },
            ].map((step) => (
              <div
                key={step.num}
                className={`step-card ${step.num === 5 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold font-display text-sm font-extrabold mb-3"
                  style={{ color: "#0B1120" }}
                >
                  {step.num}
                </div>
                <h4 className="font-display text-sm">{step.title}</h4>
                <p className="text-xs mt-1 text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT PARTNERS CONTRIBUTE */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Partner Contributions</span>
            <h2 className="mt-3">What Strategic Partners Bring to the Room</h2>
            <p
              className="text-sm mt-2 max-w-[560px] mx-auto leading-relaxed"
              style={{ color: "#E2E8F0" }}
            >
              Partner Members are vendors, solution providers, and ecosystem partners who contribute structured value. This is not booth space or logo placement. It is a working relationship built on trust and usefulness.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[900px] mx-auto">
            {PILLARS.map((p) => (
              <div key={p.title} className="glass-card p-5">
                <h4 className="font-display text-sm mb-2">{p.title}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}

            {/* Curation guardrail card */}
            <div
              className="glass-card gold-bar-left p-5 sm:col-span-2 lg:col-span-3"
            >
              <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
                <strong className="text-gold">Member-first curation.</strong>{" "}
                Partner contributions are curated through a member-first lens to ensure the most useful facts, use cases, and lessons rise above sales language. Every contribution is reviewed before it reaches the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER VALUE */}
      <section className="csl-section" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.08)" }}>
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Why Partner With CSL</span>
            <h2 className="mt-3">Strategic Value You Can Justify</h2>
            <p
              className="text-sm mt-2 max-w-[540px] mx-auto leading-relaxed"
              style={{ color: "#E2E8F0" }}
            >
              CSL partner participation is built to be easier to justify internally than traditional sponsorship alone. The value is strategic, structured, and tied to real engagement.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[900px] mx-auto">
            {[
              "Relationship Development",
              "Thought Leadership Visibility",
              "Local Market Engagement",
              "Event Participation",
              "Content Contribution",
              "Category Association",
              "Hiring & Talent Visibility",
              "Strategic Brand Trust",
            ].map((item) => (
              <div
                key={item}
                className="glass-card p-4 text-center"
              >
                <span className="text-xs font-display font-semibold tracking-wide uppercase">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORSHIP LAYER */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">State & Local Sponsorships</span>
            <h2 className="mt-3">Sponsorship Builds on Participation</h2>
            <p
              className="text-sm mt-2 max-w-[560px] mx-auto leading-relaxed"
              style={{ color: "#E2E8F0" }}
            >
              Sponsorship is a separate layer that builds on partner participation. It is not a replacement for membership or partner engagement. These tiers are designed for organizations supporting launch markets and state-level leadership activation.
            </p>
          </div>
          <div className="csl-grid csl-grid-3">
            <div className="pricing-card">
              <h3 className="font-display mb-2">City Event Sponsor</h3>
              <div className="mt-1">
                <span className="font-display text-[2.5rem] font-black">$2,500</span>
                <span className="text-sm text-muted-foreground">/event</span>
              </div>
              <div className="my-5">
                <FeatureItem>Sponsor one city dinner</FeatureItem>
                <FeatureItem>2 seats at the executive table</FeatureItem>
                <FeatureItem>Logo on event materials</FeatureItem>
                <FeatureItem>5-minute speaking slot</FeatureItem>
                <FeatureItem>Post-event introductions</FeatureItem>
              </div>
              <a href="#partner-apply" className="csl-btn csl-btn-outline csl-btn-block">
                Apply to Sponsor
              </a>
            </div>
            <div className="pricing-card featured">
              <div className="flex items-center justify-between mb-2">
                <span className="csl-badge csl-badge-gold">Most Popular</span>
              </div>
              <h3 className="font-display mb-2">Platform Sponsor</h3>
              <div className="mt-1">
                <span className="font-display text-[2.5rem] font-black">$10,000</span>
                <span className="text-sm text-muted-foreground">/year</span>
              </div>
              <div className="my-5">
                <FeatureItem>4 city dinners (your pick)</FeatureItem>
                <FeatureItem>4 executive table seats</FeatureItem>
                <FeatureItem>Logo on CSL website & materials</FeatureItem>
                <FeatureItem>Quarterly content placement</FeatureItem>
                <FeatureItem>Direct member introductions</FeatureItem>
                <FeatureItem>Annual Summit VIP access</FeatureItem>
              </div>
              <a href="#partner-apply" className="csl-btn csl-btn-gold csl-btn-block">
                Apply to Sponsor
              </a>
            </div>
            <div className="pricing-card" style={{ borderColor: "#4A90D9" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="csl-badge csl-badge-blue">Founding</span>
              </div>
              <h3 className="font-display mb-2">Founding Sponsor</h3>
              <div className="mt-1">
                <span className="font-display text-[2.5rem] font-black">$4,000</span>
                <span className="text-sm text-muted-foreground">/year (locked)</span>
              </div>
              <div className="my-5">
                <FeatureItem>First 10 sponsors only</FeatureItem>
                <FeatureItem>Permanent Founding Partner title</FeatureItem>
                <FeatureItem>2 city dinners per year</FeatureItem>
                <FeatureItem>2 executive table seats</FeatureItem>
                <FeatureItem>Logo on all CSL materials</FeatureItem>
                <FeatureItem>Rate never increases</FeatureItem>
              </div>
              <a
                href="#partner-apply"
                className="csl-btn csl-btn-outline csl-btn-block"
                style={{ borderColor: "rgba(74,144,217,0.4)", color: "#4A90D9" }}
              >
                Apply to Sponsor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NATIONAL SPONSORSHIPS */}
      <section className="csl-section" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.08)" }}>
        <div className="csl-container">
          <div className="glass-card gold-bar-left p-8 max-w-[800px] mx-auto">
            <span className="csl-badge csl-badge-gold mb-4" style={{ display: "inline-flex" }}>
              By Application Only
            </span>
            <h2 className="mt-2">National Platform Sponsorships</h2>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
              CSL is launching in selected cities and states while building national partner alignment. Several states have already expressed interest. Organizations interested in sponsoring a state campaign or a national initiative may apply to start the conversation.
            </p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#E2E8F0" }}>
              National sponsorships are structured through application and discussion only. These partnerships are custom-built around platform growth, multi-state visibility, and long-term alignment with CSL's mission.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                "Multi-State Visibility",
                "National Brand Alignment",
                "Custom Partnership Structure",
                "Executive Council Access",
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-full border text-[0.65rem] tracking-[0.08em] uppercase font-display font-semibold"
                  style={{
                    borderColor: "rgba(212,168,67,0.25)",
                    color: "hsl(42 60% 55%)",
                    background: "rgba(212,168,67,0.06)",
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a href="#partner-apply" className="csl-btn csl-btn-gold">
                Start the Conversation
              </a>
              <span className="text-xs" style={{ color: "#CBD5E1" }}>
                <a
                  href="mailto:sponsors@cybersecurity-leadership.org"
                  className="text-gold hover:underline"
                >
                  sponsors@cybersecurity-leadership.org
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section className="csl-section" id="partner-apply">
        <div className="csl-container" style={{ maxWidth: 580 }}>
          <div className="text-center mb-6">
            <span className="csl-label">Partner Application</span>
            <h2 className="mt-3">Start the Vetting Process</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>
              Fill this out. We'll review within 5 business days.
            </p>
            <p className="text-xs mt-1 text-muted-foreground">
              Questions?{" "}
              <a
                href="mailto:sponsors@cybersecurity-leadership.org"
                className="text-gold"
              >
                sponsors@cybersecurity-leadership.org
              </a>
            </p>
          </div>
          <div className="glass-card p-6">
            <CSLForm
              formName="sponsor-application"
              submitLabel="Submit Application"
              successTitle="Application Received"
              successMessage="Thanks for your interest. We'll review and reach out within 5 business days."
              buttonVariant="gold"
            >
              <FormRow>
                <FormGroup label="First Name">
                  <input type="text" className="csl-form-input" required />
                </FormGroup>
                <FormGroup label="Last Name">
                  <input type="text" className="csl-form-input" required />
                </FormGroup>
              </FormRow>
              <FormGroup label="Work Email">
                <input type="email" className="csl-form-input" required />
              </FormGroup>
              <FormGroup label="Phone">
                <input type="tel" className="csl-form-input" />
              </FormGroup>
              <FormRow>
                <FormGroup label="Company Name">
                  <input type="text" className="csl-form-input" required />
                </FormGroup>
                <FormGroup label="Your Title">
                  <input type="text" className="csl-form-input" />
                </FormGroup>
              </FormRow>
              <FormGroup label="Interest Type">
                <select className="csl-form-select" required>
                  <option value="">Select interest...</option>
                  <option value="partner">Partner Membership (Strategic Partner)</option>
                  <option value="city-event">State / Local: City Event Sponsor ($2,500/event)</option>
                  <option value="platform">State / Local: Platform Sponsor ($10,000/year)</option>
                  <option value="founding">State / Local: Founding Sponsor ($4,000/year, locked)</option>
                  <option value="national">National Sponsorship (By Application)</option>
                  <option value="custom">Custom, Let's Talk</option>
                </select>
              </FormGroup>
              <FormGroup label="Why CSL?">
                <textarea
                  className="csl-form-textarea"
                  placeholder="What value would your organization bring to the CSL community?"
                />
              </FormGroup>
            </CSLForm>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
