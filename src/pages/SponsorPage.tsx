import CSLLayout from "@/components/CSLLayout";
import { FeatureItem, FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

export default function SponsorPage() {
  return (
    <CSLLayout>
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Strategic Partners</span>
          <h1 className="mt-3 max-w-[600px]">Earn Your Seat.<br/><span className="text-gold">Not Pay-to-Play.</span></h1>
          <p className="text-sm mt-3 max-w-[540px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            CSL does not sell access to its members. Every partner goes through a 5-step vetting process run by our leadership council. That's how we keep the room trusted.
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
              <div key={step.num} className={`step-card ${step.num === 5 ? "col-span-2 lg:col-span-1" : ""}`}>
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold font-display text-sm font-extrabold mb-3" style={{ color: "#0B1120" }}>{step.num}</div>
                <h4 className="font-display text-sm">{step.title}</h4>
                <p className="text-xs mt-1 text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORSHIP TIERS */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Sponsorship Tiers</span>
            <h2 className="mt-3">Partner With Purpose</h2>
          </div>
          <div className="csl-grid csl-grid-3">
            <div className="pricing-card">
              <h3 className="font-display mb-2">City Event Sponsor</h3>
              <div className="mt-1"><span className="font-display text-[2.5rem] font-black">$2,500</span><span className="text-sm text-muted-foreground">/event</span></div>
              <div className="my-5">
                <FeatureItem>Sponsor one city dinner</FeatureItem>
                <FeatureItem>2 seats at the executive table</FeatureItem>
                <FeatureItem>Logo on event materials</FeatureItem>
                <FeatureItem>5-minute speaking slot</FeatureItem>
                <FeatureItem>Post-event introductions</FeatureItem>
              </div>
              <a href="#partner-apply" className="csl-btn csl-btn-outline csl-btn-block">Apply to Sponsor</a>
            </div>
            <div className="pricing-card featured">
              <div className="flex items-center justify-between mb-2">
                <span className="csl-badge csl-badge-gold">Most Popular</span>
              </div>
              <h3 className="font-display mb-2">Platform Sponsor</h3>
              <div className="mt-1"><span className="font-display text-[2.5rem] font-black">$10,000</span><span className="text-sm text-muted-foreground">/year</span></div>
              <div className="my-5">
                <FeatureItem>4 city dinners (your pick)</FeatureItem>
                <FeatureItem>4 executive table seats</FeatureItem>
                <FeatureItem>Logo on CSL website & materials</FeatureItem>
                <FeatureItem>Quarterly content placement</FeatureItem>
                <FeatureItem>Direct member introductions</FeatureItem>
                <FeatureItem>Annual Summit VIP access</FeatureItem>
              </div>
              <a href="#partner-apply" className="csl-btn csl-btn-gold csl-btn-block">Apply to Sponsor</a>
            </div>
            <div className="pricing-card" style={{ borderColor: "#4A90D9" }}>
              <div className="flex items-center justify-between mb-2"><span className="csl-badge csl-badge-blue">Founding</span></div>
              <h3 className="font-display mb-2">Founding Sponsor</h3>
              <div className="mt-1"><span className="font-display text-[2.5rem] font-black">$4,000</span><span className="text-sm text-muted-foreground">/year (locked)</span></div>
              <div className="my-5">
                <FeatureItem>First 10 sponsors only</FeatureItem>
                <FeatureItem>Permanent Founding Partner title</FeatureItem>
                <FeatureItem>2 city dinners per year</FeatureItem>
                <FeatureItem>2 executive table seats</FeatureItem>
                <FeatureItem>Logo on all CSL materials</FeatureItem>
                <FeatureItem>Rate never increases</FeatureItem>
              </div>
              <a href="#partner-apply" className="csl-btn csl-btn-outline csl-btn-block" style={{ borderColor: "rgba(74,144,217,0.4)", color: "#4A90D9" }}>Apply to Sponsor</a>
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
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Fill this out. We'll review within 5 business days.</p>
            <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:sponsors@cybersecurity-leadership.org" className="text-gold">sponsors@cybersecurity-leadership.org</a></p>
          </div>
          <div className="glass-card p-6">
            <CSLForm formName="sponsor-application" submitLabel="Submit Application" successTitle="Application Received" successMessage="Thanks for your interest. We'll review and reach out within 5 business days." buttonVariant="gold">
              <FormRow>
                <FormGroup label="First Name"><input type="text" className="csl-form-input" required /></FormGroup>
                <FormGroup label="Last Name"><input type="text" className="csl-form-input" required /></FormGroup>
              </FormRow>
              <FormGroup label="Work Email"><input type="email" className="csl-form-input" required /></FormGroup>
              <FormGroup label="Phone"><input type="tel" className="csl-form-input" /></FormGroup>
              <FormRow>
                <FormGroup label="Company Name"><input type="text" className="csl-form-input" required /></FormGroup>
                <FormGroup label="Your Title"><input type="text" className="csl-form-input" /></FormGroup>
              </FormRow>
              <FormGroup label="Sponsorship Interest">
                <select className="csl-form-select" required>
                  <option value="">Select tier...</option>
                  <option value="city-event">City Event Sponsor: $2,500/event</option>
                  <option value="platform">Platform Sponsor: $10,000/year</option>
                  <option value="founding">Founding Sponsor: $4,000/year (locked)</option>
                  <option value="custom">Custom / Let's Talk</option>
                </select>
              </FormGroup>
              <FormGroup label="Why CSL?">
                <textarea className="csl-form-textarea" placeholder="Why is your company a good fit for CSL's community?" />
              </FormGroup>
            </CSLForm>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
