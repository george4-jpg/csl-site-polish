import CSLLayout from "@/components/CSLLayout";
import { FeatureItem, FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

const curriculum = [
  { title: "The AI Risk Landscape", desc: "Where AI risk stands today. Regulatory pressure, real threat vectors, and why boards are asking questions nobody can answer yet." },
  { title: "Building Your AI Governance Framework", desc: "Build a governance framework that fits your org's size, industry, and risk profile." },
  { title: "AI Policy Development Lab", desc: "Hands-on. Draft acceptable use policies, procurement rules, and vendor AI risk assessments." },
  { title: "Data Privacy & AI Compliance", desc: "GDPR, CCPA, and emerging AI-specific rules. What actually applies to you." },
  { title: "AI Threat Modeling & Red Team Exercises", desc: "Threat modeling for AI systems. Adversarial attacks, model poisoning, deepfakes." },
  { title: "Board Communication Masterclass", desc: "Turn AI risk into board-ready language. Build your actual presentation deck." },
  { title: "Vendor AI Risk Assessment Workshop", desc: "How to evaluate third-party AI tools. Build vendor questionnaires and scoring frameworks." },
  { title: "Capstone: Present to the Board", desc: "You present your AI governance framework to the cohort for live peer review." },
];

export default function CohortPage() {
  return (
    <CSLLayout>
      <section className="csl-section">
        <div className="csl-container">
          <div className="csl-grid csl-grid-2 items-center" style={{ gap: "2rem" }}>
            <div>
              <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>8 Seats Only</span>
              <h1 className="mt-2">AI Governance <span className="text-gold">Cohort</span></h1>
               <p className="text-sm mt-4 max-w-[480px] leading-relaxed" style={{ color: "#E2E8F0" }}>
                 8 weeks. 8 leaders. You walk out with a board-ready AI governance framework, not a certificate you'll never use.
               </p>
              <div className="flex gap-4 mt-6 items-center">
                {[{ val: "$5,500", label: "per seat" }, { val: "8", label: "weeks" }, { val: "8", label: "seats max" }].map((s, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    {i > 0 && <div className="w-px h-10" style={{ background: "hsl(var(--border))" }} />}
                    <div>
                      <div className="font-display text-[2rem] font-black text-white">{s.val}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#enroll" className="csl-btn csl-btn-primary csl-btn-lg mt-6">Enroll Now</a>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display mb-4">What You Leave With</h3>
              <div className="flex flex-col gap-3">
                {["AI Governance Framework built for your org", "Board-ready AI risk presentation deck", "AI policy templates you can deploy immediately", "Peer network of 7 other leaders", "CPE credits for all 8 sessions", "CSL AI Governance Certificate"].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--emerald))" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm" style={{ color: "#E2E8F0" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <div className="text-center mb-8">
            <span className="csl-label">8-Week Curriculum</span>
            <h2 className="mt-3">Week by Week</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {curriculum.map((week, i) => (
              <div key={i} className="curriculum-item">
                <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 font-display text-sm font-extrabold" style={{ background: "rgba(212,168,67,0.15)", color: "hsl(var(--gold))" }}>{i + 1}</div>
                <div>
                  <h4 className="font-display">{week.title}</h4>
                  <p className="text-sm mt-1" style={{ color: "#E2E8F0" }}>{week.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="csl-section">
        <div className="csl-container text-center">
          <span className="csl-label">Who This Is For</span>
           <h2 className="mt-3 mb-6">Built for Decision-Makers at Every Level</h2>
           <div className="csl-grid csl-grid-3">
             {[
               { title: "Executive Leaders", desc: "CISOs, CIOs, and CTOs who need to own the AI governance conversation." },
               { title: "Boards & Advisors", desc: "Board members who need AI risk fluency without the technical jargon." },
               { title: "Community & Workforce Leaders", desc: "Directors, VPs, and public sector leaders building AI governance programs." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <h4 className="font-display mb-2">{item.title}</h4>
                <p className="text-xs" style={{ color: "#E2E8F0" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM */}
      <section className="csl-section csl-section-dark" id="enroll">
        <div className="csl-container" style={{ maxWidth: 580 }}>
          <div className="text-center mb-6">
            <span className="csl-label">Enroll Now</span>
            <h2 className="mt-3">Secure Your Seat</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>8 seats. First come, first served. Members get priority and $500 off.</p>
            <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
          </div>
          <div className="glass-card p-6">
            <CSLForm formName="cohort-enrollment" submitLabel="Submit Enrollment" successTitle="Enrollment Received" successMessage="You're in. We'll send payment details and onboarding within 48 hours.">
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
              <FormGroup label="CSL Member?">
                <select className="csl-form-select">
                  <option value="">Select...</option>
                  <option>Yes, Founding Member ($500 off)</option>
                  <option>Yes, Standard Member ($500 off)</option>
                  <option>Yes, Executive Member (Priority + $500 off)</option>
                  <option>Not yet</option>
                </select>
              </FormGroup>
              <FormGroup label="Primary Goal">
                <select className="csl-form-select">
                  <option value="">What are you trying to do?</option>
                  <option>Build a board-ready AI governance framework</option>
                  <option>Write AI policies for my org</option>
                  <option>Understand the AI threat landscape</option>
                  <option>Figure out AI compliance</option>
                  <option>Advance my career in AI governance</option>
                </select>
              </FormGroup>
            </CSLForm>
            <p className="text-xs text-muted-foreground text-center mt-3">Payment instructions come after enrollment confirmation.</p>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
