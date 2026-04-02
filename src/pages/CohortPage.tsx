import CSLLayout from "@/components/CSLLayout";
import { FeatureItem, FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

const curriculum = [
  { title: "The AI Risk Landscape", desc: "Understanding the current state of AI risk — regulatory environment, threat vectors, and why boards are asking questions CISOs can't yet answer." },
  { title: "Building Your AI Governance Framework", desc: "Constructing a practical governance framework tailored to your organization's size, industry, and risk appetite." },
  { title: "AI Policy Development Lab", desc: "Hands-on workshop — drafting acceptable use policies, procurement guidelines, and vendor AI risk assessments." },
  { title: "Data Privacy & AI Compliance", desc: "Navigating GDPR, CCPA, and emerging AI-specific regulations." },
  { title: "AI Threat Modeling & Red Team Exercises", desc: "Practical threat modeling for AI systems — adversarial attacks, model poisoning, deepfakes." },
  { title: "Board Communication Masterclass", desc: "Translating AI risk into business language. Building your board presentation deck." },
  { title: "Vendor AI Risk Assessment Workshop", desc: "Evaluating third-party AI tools. Building vendor questionnaires and risk scoring frameworks." },
  { title: "Capstone: Present to the Board", desc: "Final presentations — each participant delivers their AI governance framework for peer review." },
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
                An 8-week intensive for cybersecurity executives who need to lead the AI governance conversation at the board level.
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
              <h3 className="font-display mb-4">What You'll Walk Away With</h3>
              <div className="flex flex-col gap-3">
                {["A complete AI Governance Framework customized to your organization", "Board-ready AI risk presentation deck", "AI policy templates for immediate deployment", "Peer network of 7 other executive leaders", "CPE credits for all 8 sessions", "CSL AI Governance Certificate of Completion"].map((item, i) => (
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
            <h2 className="mt-3">Week-by-Week Breakdown</h2>
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
          <h2 className="mt-3 mb-6">Built for Decision-Makers</h2>
          <div className="csl-grid csl-grid-3">
            {[
              { title: "CISOs & CIOs", desc: "Who need to lead the AI governance conversation at the board level." },
              { title: "Board Members", desc: "Who need to understand AI risk without the technical jargon." },
              { title: "VP/Director Level", desc: "Who are building the AI governance program from the ground up." },
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
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>8 seats. First come, first served. CSL members receive priority enrollment and a $500 discount.</p>
            <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:director@cybersecurity-leadership.org" className="text-gold">director@cybersecurity-leadership.org</a></p>
          </div>
          <div className="glass-card p-6">
            <CSLForm formName="cohort-enrollment" submitLabel="Submit Enrollment" successTitle="Enrollment Received" successMessage="Welcome to the AI Governance Cohort. We'll send payment details and your onboarding package within 48 hours.">
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
                  <option>Yes — Founding Member ($500 discount applies)</option>
                  <option>Yes — Standard Member ($500 discount applies)</option>
                  <option>Yes — Executive Member (Priority + $500 discount)</option>
                  <option>Not yet — I'd like to learn more about membership</option>
                </select>
              </FormGroup>
              <FormGroup label="Primary Goal">
                <select className="csl-form-select">
                  <option value="">What do you hope to achieve?</option>
                  <option>Build a board-ready AI governance framework</option>
                  <option>Develop AI policies for my organization</option>
                  <option>Understand AI threat landscape</option>
                  <option>Navigate AI compliance requirements</option>
                  <option>Advance my career in AI governance</option>
                </select>
              </FormGroup>
            </CSLForm>
            <p className="text-xs text-muted-foreground text-center mt-3">You'll receive payment instructions after enrollment confirmation.</p>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
