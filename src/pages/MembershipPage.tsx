import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FeatureItem } from "@/components/CSLComponents";
import { GHL_MEMBERSHIP, PAY_FOUNDING, PAY_STANDARD } from "@/lib/ghl-urls";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

export default function MembershipPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});
  const [formVariant, setFormVariant] = useState<"partner" | "interest">("partner");

  const openPartnerForm = () => {
    setFormVariant("partner");
    setFormContext({
      request_type: "Partner Interest",
      source_page: "Membership",
      cta_name: "Submit partner interest",
    });
    setFormOpen(true);
  };

  const openExecutiveForm = () => {
    setFormVariant("interest");
    setFormContext({
      request_type: "Executive Membership Inquiry",
      source_page: "Membership",
      cta_name: "Apply Now - Executive Member",
      audience_type: "Executive Member",
    });
    setFormOpen(true);
  };

  const openApplicationForm = () => {
    setFormVariant("interest");
    setFormContext({
      request_type: "Membership Application",
      source_page: "Membership",
      cta_name: "Submit Application",
    });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* HEADER */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Membership</span>
          <h1 className="mt-3 max-w-[600px]">Your Seat at the <span className="text-gold">Trusted Room</span></h1>
           <p className="text-sm mt-3 max-w-[520px] leading-relaxed" style={{ color: "#E2E8F0" }}>
             Membership is the foundation of everything CSL builds. Sponsorship builds on participation, not the other way around. Every session is peer-led, vendor-free, and governed by trust. We're building relationships, not transactions.
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
              <p className="text-xs mt-1" style={{ color: "#CBD5E1" }}>For the first 100 qualified practitioner members helping shape CSL from the beginning.</p>
              <div className="mt-3"><span className="font-display text-[2.5rem] font-black">$257</span><span className="text-sm text-muted-foreground">/year</span></div>
              <p className="text-xs mt-1" style={{ color: "#C49B2F" }}>Founding rate locked while membership remains active</p>
              <div className="my-5">
                <FeatureItem>Premium Newsletter included</FeatureItem>
                <FeatureItem>Weekly Security Signal Brief</FeatureItem>
                <FeatureItem>Quarterly Executive Briefing</FeatureItem>
                <FeatureItem>Founding rate locked while active</FeatureItem>
                <FeatureItem>Preferred pricing on advisory services</FeatureItem>
                <FeatureItem>Priority access to programs and events</FeatureItem>
                <FeatureItem>Peer network of cybersecurity and technology leaders</FeatureItem>
              </div>
              <a href={PAY_FOUNDING} target="_blank" rel="noopener noreferrer" className="csl-btn csl-btn-primary csl-btn-block">Claim Founding Seat</a>
              <p className="text-[0.65rem] mt-3 leading-relaxed text-center" style={{ color: "#94A3B8" }}>
                Founding Membership is reserved for qualified practitioner members. Vendors, sponsors, and solution providers follow a separate partner path.
              </p>
            </div>
            {/* Standard */}
            <div className="pricing-card">
              <div className="mb-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3 className="font-display">Standard Member</h3>
              <div className="mt-2"><span className="font-display text-[2.5rem] font-black">$597</span><span className="text-sm text-muted-foreground">/year</span></div>
              <div className="my-5">
                <FeatureItem>Monthly Executive Dinner Access</FeatureItem>
                <FeatureItem>CSL Cyber Framework 3.0</FeatureItem>
                <FeatureItem>CPE Credits at Every Event</FeatureItem>
                <FeatureItem>Peer Community Access</FeatureItem>
                <FeatureItem>Free Financial Strategy Session</FeatureItem>
                <FeatureItem>Quarterly Level Up Sessions</FeatureItem>
              </div>
              <a href={PAY_STANDARD} target="_blank" rel="noopener noreferrer" className="csl-btn csl-btn-outline csl-btn-block">Join Now</a>
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
                <FeatureItem>National Executive Council</FeatureItem>
                <FeatureItem>Priority AI Cohort Seating</FeatureItem>
                <FeatureItem>Board Communication Masterclass</FeatureItem>
                <FeatureItem>1:1 vCISO Advisory (Annual)</FeatureItem>
                <FeatureItem>Executive Resilience Programming</FeatureItem>
                <FeatureItem>Wealth Strategy Deep Dive</FeatureItem>
                <FeatureItem>Board-Level Networking</FeatureItem>
              </div>
              <a href={GHL_MEMBERSHIP} target="_blank" rel="noopener noreferrer" className="csl-btn csl-btn-outline csl-btn-block" style={{ borderColor: "rgba(74,144,217,0.4)", color: "#4A90D9" }}>Apply Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBER-FIRST ECOSYSTEM NOTE */}
      <section className="pb-10">
        <div className="csl-container">
          <div className="glass-card gold-bar-left p-5 max-w-[640px] mx-auto">
            <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
              <strong className="text-gold">Membership is the foundation.</strong> Sponsors and partners participate within a structured, member-first ecosystem. Founding Member status is reserved for core leadership audiences. We're building a partner-supported community, not a pay-to-play environment.
            </p>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: "#94A3B8" }}>
            Partner or sponsor inquiry? <button onClick={openPartnerForm} className="text-gold hover:underline bg-transparent border-none cursor-pointer font-inherit text-xs">Submit partner interest.</button>
          </p>
        </div>
      </section>

      {/* POST-PAYMENT NOTE */}
      <section className="pb-10">
        <div className="csl-container">
          <div className="glass-card p-5 max-w-[640px] mx-auto text-center" style={{ borderColor: "rgba(107,197,160,0.2)" }}>
            <p className="text-xs font-display font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(153 40% 60%)" }}>After You Join</p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "#E2E8F0" }}>
              After payment, you will be directed to complete your member profile so we can personalize your CSL experience.
            </p>
            <p className="text-xs mt-2" style={{ color: "#94A3B8" }}>
              We are finalizing our private member portal and will provide your access details shortly.
            </p>
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
                  <th>CSL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Governance", "Sponsor-driven agendas", "Leader-controlled, no-sales rules"],
                  ["Structure", "One-off dinners", "Ongoing platform with framework continuity"],
                  ["Participation", "Open attendance", "Invite-only peer dialogue"],
                  ["Vendor Access", "Pay-to-play", "Earn Your Seat (vetted only)"],
                  ["Curriculum", "Random topics", "10-Domain CSL Framework 3.0"],
                  ["CPE Credits", "Rarely offered", "Every session"],
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

      {/* APPLICATION CTA */}
      <section className="csl-section" id="apply">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <span className="csl-label">Apply Now</span>
          <h2 className="mt-3">Membership Application</h2>
          <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Complete your application through our secure form. We'll get back to you within 48 hours.</p>
          <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:membership@cybersecurity-leadership.org" className="text-gold">membership@cybersecurity-leadership.org</a></p>
          <a href={GHL_MEMBERSHIP} target="_blank" rel="noopener noreferrer" className="csl-btn csl-btn-primary csl-btn-lg mt-6">
            Submit Application
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="partner" />
    </CSLLayout>
  );
}
