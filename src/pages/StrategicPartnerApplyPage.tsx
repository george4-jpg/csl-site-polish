import { useState, FormEvent } from "react";
import CSLLayout from "@/components/CSLLayout";
import { postToEdgeFunction, PARTNER_APP_ENDPOINT } from "@/lib/strategic-partners-api";

const LOOK_FOR = [
  "Clear member value",
  "Proven execution capability",
  "Relevant market or domain expertise",
  "Revenue-sharing or shared-success alignment",
  "Ability to support CSL member outcomes",
];

export default function StrategicPartnerApplyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [solutionArea, setSolutionArea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [memberValue, setMemberValue] = useState("");
  const [revenueModel, setRevenueModel] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!company.trim()) return setError("Company is required.");

    setSubmitting(true);
    try {
      await postToEdgeFunction(PARTNER_APP_ENDPOINT, {
        submission_type: "strategic_partner",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        company: company.trim(),
        website: website.trim() || null,
        solution_area: solutionArea.trim() || null,
        target_market: targetMarket.trim() || null,
        member_value: memberValue.trim() || null,
        revenue_model: revenueModel.trim() || null,
        notes: notes.trim() || null,
        source_page: "/strategic-partners/apply",
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Apply</span>
          <h1 className="mt-3 max-w-[820px]">
            Become a CSL<br />
            <span className="text-gold">Strategic Partner.</span>
          </h1>
          <p className="text-sm mt-4 max-w-[640px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Join a curated ecosystem built on leadership, execution, member value, and shared success.
          </p>
        </div>
      </section>

      {/* NOT A DIRECTORY */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Positioning</span>
          <h2 className="mt-3">This Is Not a Directory.</h2>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
            CSL Strategic Partners are reviewed and approved based on member value, execution capability, and
            alignment with CSL's leadership model.
          </p>
        </div>
      </section>

      {/* WHAT WE LOOK FOR */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Criteria</span>
            <h2 className="mt-3">What We Look For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[960px] mx-auto">
            {LOOK_FOR.map((item) => (
              <div key={item} className="glass-card p-5 gold-bar-left">
                <p className="font-display text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container max-w-[820px]">
          <div className="text-center mb-8">
            <span className="csl-label">Application</span>
            <h2 className="mt-3">Strategic Partner Application</h2>
            <p className="text-sm mt-2 max-w-[560px] mx-auto leading-relaxed text-muted-foreground">
              Submit your information. CSL leadership will review and follow up if there is alignment.
            </p>
          </div>

          {success ? (
            <div className="glass-card p-8 text-center">
              <span className="csl-badge csl-badge-gold mb-4">Application Received</span>
              <h3 className="font-display">Thank you. Your Strategic Partner application has been received.</h3>
              <p className="text-sm mt-4 leading-relaxed text-muted-foreground max-w-[520px] mx-auto">
                CSL leadership will review your submission and follow up if there is alignment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="csl-form-label">Name *</label>
                  <input className="csl-form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="csl-form-label">Work Email *</label>
                  <input type="email" className="csl-form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="csl-form-label">Phone</label>
                  <input type="tel" className="csl-form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="csl-form-label">Company *</label>
                  <input className="csl-form-input" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="csl-form-label">Website</label>
                  <input type="url" className="csl-form-input" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" />
                </div>
              </div>

              <div>
                <label className="csl-form-label">Solution Area</label>
                <input
                  className="csl-form-input"
                  value={solutionArea}
                  onChange={(e) => setSolutionArea(e.target.value)}
                  placeholder="e.g., Identity, GRC, Cloud Security, Advisory"
                />
              </div>

              <div>
                <label className="csl-form-label">Target Market</label>
                <input
                  className="csl-form-input"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  placeholder="e.g., State & Local Gov, Higher Ed, Mid-Market Enterprise"
                />
              </div>

              <div>
                <label className="csl-form-label">Member Value</label>
                <textarea
                  className="csl-form-textarea"
                  rows={3}
                  value={memberValue}
                  onChange={(e) => setMemberValue(e.target.value)}
                  placeholder="What measurable value do you provide CSL members?"
                />
              </div>

              <div>
                <label className="csl-form-label">Revenue Model</label>
                <textarea
                  className="csl-form-textarea"
                  rows={2}
                  value={revenueModel}
                  onChange={(e) => setRevenueModel(e.target.value)}
                  placeholder="Revenue-share, referral economics, or other shared-success model."
                />
              </div>

              <div>
                <label className="csl-form-label">Notes</label>
                <textarea
                  className="csl-form-textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything else CSL leadership should know."
                />
              </div>

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="csl-btn csl-btn-primary csl-btn-block"
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="csl-section">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Process</span>
          <h2 className="mt-3">What Happens Next</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Submission reviewed by CSL leadership",
              "Alignment assessed against member value and execution capability",
              "Follow-up scheduled if there is a fit",
            ].map((b) => (
              <li key={b} className="flex gap-3 text-sm" style={{ color: "#E2E8F0" }}>
                <span className="text-gold font-bold">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </CSLLayout>
  );
}
