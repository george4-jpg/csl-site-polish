import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import { FeatureItem, FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

export default function MembershipPage() {
  return (
    <CSLLayout>
      {/* HEADER */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Membership</span>
          <h1 className="mt-3 max-w-[600px]">Your Seat at the <span className="text-gold">Trusted Room</span></h1>
           <p className="text-sm mt-3 max-w-[480px] leading-relaxed" style={{ color: "#E2E8F0" }}>
             For C-Level, boards, and community leaders. CSL membership is not a subscription. It is a commitment to peer-led leadership development. Every member earns their seat. Every engagement is governed by trust.
           </p>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="pb-14">
        <div className="csl-container">
          <div className="csl-grid csl-grid-3">
            {/* Founding */}
            <div className="pricing-card featured">
              <div className="flex items-center justify-between mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span className="csl-badge csl-badge-orange">First 100 Only</span>
              </div>
              <h3 className="font-display">Founding Member</h3>
              <div className="mt-2"><span className="font-display text-[2.5rem] font-black">$297</span><span className="text-sm text-muted-foreground">/year, locked for life</span></div>
              <div className="my-5">
                <FeatureItem>Monthly Executive Dinner Access</FeatureItem>
                <FeatureItem>CSL Cyber Framework 3.0 Access</FeatureItem>
                <FeatureItem>AI Governance Cohort Discount</FeatureItem>
                <FeatureItem>CPE Credits at Every Event</FeatureItem>
                <FeatureItem>Founding Member Designation (Permanent)</FeatureItem>
                <FeatureItem>Peer Community & Trusted Room Access</FeatureItem>
                <FeatureItem>Free Financial Strategy Session</FeatureItem>
                <FeatureItem>Rate Locked: Never Increases</FeatureItem>
              </div>
              <a href="#apply" className="csl-btn csl-btn-primary csl-btn-block">Claim Founding Seat</a>
            </div>
            {/* Standard */}
            <div className="pricing-card">
              <div className="mb-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3 className="font-display">Standard Member</h3>
              <div className="mt-2"><span className="font-display text-[2.5rem] font-black">$597</span><span className="text-sm text-muted-foreground">/year</span></div>
              <div className="my-5">
                <FeatureItem>Monthly Executive Dinner Access</FeatureItem>
                <FeatureItem>CSL Cyber Framework 3.0 Access</FeatureItem>
                <FeatureItem>CPE Credits at Every Event</FeatureItem>
                <FeatureItem>Peer Community Access</FeatureItem>
                <FeatureItem>Free Financial Strategy Session</FeatureItem>
                <FeatureItem>Quarterly Level Up Sessions</FeatureItem>
              </div>
              <a href="#apply" className="csl-btn csl-btn-outline csl-btn-block">Apply Now</a>
            </div>
            {/* Executive */}
            <div className="pricing-card" style={{ borderColor: "#4A90D9" }}>
              <div className="flex items-center justify-between mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" strokeWidth="2"><path d="M2 4l3 12h14l3-12-5.5 4L12 2l-4.5 6L2 4z"/><path d="M5 16l-1 4h16l-1-4"/></svg>
                <span className="csl-badge csl-badge-blue">Premium</span>
              </div>
              <h3 className="font-display">Executive Member</h3>
              <div className="mt-2"><span className="font-display text-[2.5rem] font-black">$1,200</span><span className="text-sm text-muted-foreground">/year</span></div>
              <div className="my-5">
                <FeatureItem>Everything in Standard, plus:</FeatureItem>
                <FeatureItem>National Executive Council Access</FeatureItem>
                <FeatureItem>Priority AI Governance Cohort Seating</FeatureItem>
                <FeatureItem>Board Communication Masterclass</FeatureItem>
                <FeatureItem>1:1 vCISO Advisory Session (Annual)</FeatureItem>
                <FeatureItem>Executive Resilience Programming</FeatureItem>
                <FeatureItem>Wealth Strategy Deep Dive</FeatureItem>
                <FeatureItem>Direct Board-Level Networking</FeatureItem>
              </div>
              <a href="#apply" className="csl-btn csl-btn-outline csl-btn-block" style={{ borderColor: "rgba(74,144,217,0.4)", color: "#4A90D9" }}>Apply Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <h2 className="text-center mb-6 italic">Traditional Roundtables vs. CSL</h2>
          <div className="overflow-x-auto">
            <table className="comparison-table" style={{ minWidth: 500 }}>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Feature</th>
                  <th>Traditional</th>
                  <th>The CSL Difference</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Governance", "Sponsor-driven agendas", "Leader-controlled, non-sales rules"],
                  ["Structure", "One-off, disconnected dinners", "Ongoing platform with framework continuity"],
                  ["Participation", "General attendance", "Curated, invite-only peer dialogue"],
                  ["Vendor Access", "Pay-to-play sponsorships", "Earn Your Seat: vetted partners only"],
                  ["Curriculum", "Ad hoc topics", "10-Domain CSL Framework 3.0"],
                  ["CPE Credits", "Rarely offered", "Every session earns CPE credits"],
                  ["Whole Leader", "Cyber only", "Leadership + Health + Wealth"],
                ].map(([feature, trad, csl], i) => (
                  <tr key={i}>
                    <td>{feature}</td>
                    <td>{trad}</td>
                    <td className="font-semibold" style={{ color: "hsl(var(--orange-bright))" }}>{csl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="csl-section" id="apply">
        <div className="csl-container" style={{ maxWidth: 640 }}>
          <div className="text-center mb-6">
            <span className="csl-label">Apply Now</span>
            <h2 className="mt-3">Membership Application</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Complete the form below. All fields auto-fill on mobile for a frictionless experience.</p>
            <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:membership@cybersecurity-leadership.org" className="text-gold">membership@cybersecurity-leadership.org</a></p>
          </div>
          <div className="glass-card p-6">
            <CSLForm formName="membership" submitLabel="Submit Application" successTitle="Application Received" successMessage="Welcome to CSL. We'll review your application and reach out within 48 hours with next steps.">
              <FormRow>
                <FormGroup label="First Name" htmlFor="firstName">
                  <input type="text" id="firstName" className="csl-form-input" autoComplete="given-name" required placeholder="John" />
                </FormGroup>
                <FormGroup label="Last Name" htmlFor="lastName">
                  <input type="text" id="lastName" className="csl-form-input" autoComplete="family-name" required placeholder="Smith" />
                </FormGroup>
              </FormRow>
              <FormGroup label="Email" htmlFor="email">
                <input type="email" id="email" className="csl-form-input" autoComplete="email" required placeholder="john@company.com" />
              </FormGroup>
              <FormGroup label="Phone" htmlFor="phone">
                <input type="tel" id="phone" className="csl-form-input" autoComplete="tel" placeholder="(555) 000-0000" />
              </FormGroup>
              <FormRow>
                <FormGroup label="Job Title" htmlFor="title">
                  <input type="text" id="title" className="csl-form-input" placeholder="CISO" />
                </FormGroup>
                <FormGroup label="Company" htmlFor="company">
                  <input type="text" id="company" className="csl-form-input" placeholder="Acme Corp" />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup label="Career Stage" htmlFor="careerStage">
                  <select id="careerStage" className="csl-form-select" required>
                    <option value="">Select...</option>
                     <option value="executive">C-Level (CISO/CIO/CTO)</option>
                     <option value="board">Board Member / Advisor</option>
                     <option value="senior">Senior Leader (Director/VP)</option>
                     <option value="mid">Mid-Career (Manager/Lead)</option>
                     <option value="community">Community / Workforce Leader</option>
                     <option value="early">Early Career / Student</option>
                     <option value="investor">Investor / Supporter</option>
                  </select>
                </FormGroup>
                <FormGroup label="Nearest City" htmlFor="city">
                  <select id="city" className="csl-form-select" required>
                    <option value="">Select...</option>
                    <option value="kansas-city">Kansas City</option>
                    <option value="st-louis">St. Louis</option>
                    <option value="springfield">Springfield</option>
                    <option value="columbia">Columbia</option>
                    <option value="jefferson-city">Jefferson City</option>
                    <option value="other">Other</option>
                  </select>
                </FormGroup>
              </FormRow>
              <FormGroup label="Membership Tier" htmlFor="tier">
                <select id="tier" className="csl-form-select" required>
                  <option value="">Select tier...</option>
                  <option value="founding">Founding Member: $297/year (Locked for Life)</option>
                  <option value="standard">Standard Member: $597/year</option>
                  <option value="executive">Executive Member: $1,200/year</option>
                </select>
              </FormGroup>
            </CSLForm>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
