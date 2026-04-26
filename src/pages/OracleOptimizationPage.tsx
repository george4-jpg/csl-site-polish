import { useMemo, useState, FormEvent } from "react";
import CSLLayout from "@/components/CSLLayout";
import {
  ORACLE_SPEND_OPTIONS,
  COMPLEXITY_OPTIONS,
  ORACLE_MODULES,
  INDUSTRIES,
  CONTACT_METHODS,
  calculateOracleSavings,
  formatCurrency,
  postToEdgeFunction,
  ORACLE_LEAD_ENDPOINT,
} from "@/lib/strategic-partners-api";

const OPTIMIZATION_AREAS = [
  {
    title: "Database",
    signal: "Licensing rarely aligns with actual utilization.",
    bullets: [
      "Core licensing exceeds actual usage",
      "Paid options enabled but unused",
      "DR environments fully licensed",
      "Dev/test environments not optimized",
      "Legacy contracts misaligned with cloud",
    ],
    insight: "Most environments were not designed with cost as a continuous constraint.",
  },
  {
    title: "Cloud / OCI",
    signal: "Consumption expands faster than governance.",
    bullets: [
      "Idle or oversized compute",
      "Storage tier mismatch",
      "Reserved capacity underused",
      "Network costs overlooked",
      "Lift-and-shift inefficiencies",
    ],
    insight: "Cloud does not reduce cost by default. It amplifies decisions.",
  },
  {
    title: "ERP Systems",
    signal: "Adoption rarely matches cost.",
    bullets: [
      "Modules purchased but not fully adopted",
      "Manual workflows remain in place",
      "Duplicate systems outside Oracle",
      "Reporting inefficiencies",
      "User licenses exceed active usage",
    ],
    insight: "Enterprise systems evolve faster than contract assumptions.",
  },
  {
    title: "Middleware",
    signal: "Visibility gaps create exposure.",
    bullets: [
      "WebLogic environments over-licensed",
      "Java licensing changes overlooked",
      "Shadow deployments outside IT visibility",
      "Legacy middleware under full support",
      "Audit exposure from inconsistent tracking",
    ],
    insight: "Middleware cost often hides in complexity.",
  },
  {
    title: "Contracts & Support",
    signal: "Renewals compound without structural review.",
    bullets: [
      "Paying support on unused assets",
      "Annual uplift accepted without challenge",
      "Shelfware still under support",
      "M&A assets bundled into renewals",
      "No negotiation strategy before renewal",
    ],
    insight: "Support cost compounds quietly unless someone challenges the structure.",
  },
  {
    title: "Infrastructure Design",
    signal: "Architecture drives long-term cost.",
    bullets: [
      "Environments duplicated without cost review",
      "HA/DR models overbuilt",
      "Regional expansion increases licensing exposure",
      "Cloud and on-prem spend overlap",
      "Procurement and technical design disconnected",
    ],
    insight: "Architecture decisions become financial commitments.",
  },
];

export default function OracleOptimizationPage() {
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [modules, setModules] = useState<string[]>([]);
  const [spend, setSpend] = useState("");
  const [complexity, setComplexity] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ low: number; high: number } | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const estimate = useMemo(() => {
    if (!spend || !complexity) return null;
    return calculateOracleSavings(spend, complexity);
  }, [spend, complexity]);

  const toggleModule = (mod: string) => {
    setModules((prev) => (prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]));
  };

  const scrollToEstimator = () => {
    document.getElementById("savings-estimator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToBook = () => {
    document.getElementById("book-consultation")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("First and last name are required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!company.trim()) {
      setError("Company is required.");
      return;
    }
    if (!spend) {
      setError("Annual Oracle spend is required.");
      return;
    }
    if (modules.length === 0) {
      setError("Select at least one Oracle module.");
      return;
    }
    if (!complexity) {
      setError("Select environment complexity.");
      return;
    }

    const calc = calculateOracleSavings(spend, complexity);
    setSubmitting(true);
    try {
      await postToEdgeFunction(ORACLE_LEAD_ENDPOINT, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        company: company.trim(),
        title: title.trim() || null,
        industry: industry || null,
        oracle_modules: modules,
        annual_oracle_spend: spend,
        complexity,
        estimated_savings_low: calc.low,
        estimated_savings_high: calc.high,
        preferred_contact_method: contactMethod || null,
        notes: notes.trim() || null,
        source_page: "/strategic-partners/oracle",
      });
      setSuccess(calc);
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
          <span className="csl-label">Strategic Partner · Monarch Precision Group</span>
          <h1 className="mt-3 max-w-[820px]">
            Oracle Spend,<br />
            <span className="text-gold">Viewed From the Inside.</span>
          </h1>
          <p className="text-sm mt-4 max-w-[640px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Former Oracle operators and enterprise leaders identify where environments diverge from how they
            were intended to be structured, licensed, and priced.
          </p>
          <div className="mt-5 inline-block px-4 py-2 rounded-md border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5">
            <span className="font-display text-sm font-bold text-gold">
              Most organizations uncover 20–40% recoverable spend.
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="csl-btn csl-btn-primary" onClick={scrollToEstimator}>
              Estimate My Savings
            </button>
            <button type="button" className="csl-btn csl-btn-outline" onClick={scrollToBook}>
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Why This Exists</span>
          <h2 className="mt-3">Operator Knowledge, Brought Back to the Market.</h2>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
            Many exceptional Oracle professionals and enterprise operators have moved on from the ecosystem.
            Their knowledge should not disappear. Monarch Precision Group brings that experience back into
            the market, aligned to customer outcomes, financial clarity, and shared success.
          </p>
        </div>
      </section>

      {/* SAVINGS ESTIMATOR */}
      <section id="savings-estimator" className="csl-section">
        <div className="csl-container max-w-[920px]">
          <div className="text-center mb-8">
            <span className="csl-label">Savings Estimator</span>
            <h2 className="mt-3">Estimate Your Oracle Savings</h2>
            <p className="text-sm mt-2 max-w-[560px] mx-auto leading-relaxed text-muted-foreground">
              Check your environment. See what is likely sitting on the table.
            </p>
          </div>

          {success ? (
            <div className="glass-card p-8 text-center">
              <span className="csl-badge csl-badge-gold mb-4">Estimate Received</span>
              <h3 className="font-display mb-3">Thank you. Your Oracle Optimization request has been received.</h3>
              <div className="my-6 py-6 border-y border-[hsl(var(--gold))]/20">
                <div className="csl-label">Estimated Recoverable Spend</div>
                <div className="font-display text-4xl md:text-5xl font-extrabold text-gold mt-2">
                  {formatCurrency(success.low)} – {formatCurrency(success.high)}
                </div>
                <div className="text-xs mt-2 text-muted-foreground">annually</div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-[520px] mx-auto">
                This is a directional estimate. We validate savings through an operator-level review.
              </p>
              <p className="text-sm mt-4 font-semibold">
                Next step: schedule an operator-level consultation.
              </p>
              <div className="mt-6">
                <a href="#book-consultation" className="csl-btn csl-btn-primary">
                  Book CSL-Oracle Consultation
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="csl-form-label">First Name *</label>
                  <input className="csl-form-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                  <label className="csl-form-label">Last Name *</label>
                  <input className="csl-form-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
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
                <div>
                  <label className="csl-form-label">Title</label>
                  <input className="csl-form-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="csl-form-label">Industry</label>
                  <select className="csl-form-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="csl-form-label">Preferred Contact</label>
                  <select
                    className="csl-form-select"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                  >
                    <option value="">Select method</option>
                    {CONTACT_METHODS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="csl-form-label">Oracle Modules in Use *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {ORACLE_MODULES.map((mod) => {
                    const checked = modules.includes(mod);
                    return (
                      <label
                        key={mod}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors text-sm ${
                          checked
                            ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-foreground"
                            : "border-[hsl(var(--border))] hover:border-[hsl(var(--gold))]/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleModule(mod)}
                          className="accent-[hsl(var(--gold))]"
                        />
                        <span>{mod}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="csl-form-label">Annual Oracle Spend *</label>
                  <select
                    className="csl-form-select"
                    value={spend}
                    onChange={(e) => setSpend(e.target.value)}
                    required
                  >
                    <option value="">Select spend range</option>
                    {ORACLE_SPEND_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="csl-form-label">Environment Complexity *</label>
                  <select
                    className="csl-form-select"
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    required
                  >
                    <option value="">Select complexity</option>
                    {COMPLEXITY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="csl-form-label">Notes</label>
                <textarea
                  className="csl-form-textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know before the review."
                />
              </div>

              {/* Live preview of estimate */}
              {estimate && (
                <div className="rounded-md border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-4">
                  <div className="csl-label">Directional Estimate</div>
                  <div className="font-display text-2xl font-extrabold text-gold mt-1">
                    {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}{" "}
                    <span className="text-xs text-muted-foreground font-normal">annually</span>
                  </div>
                  <p className="text-xs mt-2 text-muted-foreground">
                    This is a directional estimate. We validate savings through an operator-level review.
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="csl-btn csl-btn-primary csl-btn-block sm:flex-1"
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : "Estimate Savings"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* EXPLORE OPTIMIZATION */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Explore</span>
            <h2 className="mt-3">Explore Oracle Optimization</h2>
            <p className="text-sm mt-2 max-w-[600px] mx-auto leading-relaxed text-muted-foreground">
              Where enterprise environments typically diverge.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OPTIMIZATION_AREAS.map((area) => {
              const isOpen = expanded === area.title;
              return (
                <button
                  key={area.title}
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : area.title)}
                  className={`glass-card p-5 text-left transition-all ${
                    isOpen ? "border-[hsl(var(--gold))]/60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base">{area.title}</h4>
                    <span className="text-gold text-lg leading-none mt-0.5">{isOpen ? "−" : "+"}</span>
                  </div>
                  <p className="text-xs mt-2 text-muted-foreground">{area.signal}</p>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                      <ul className="space-y-1.5">
                        {area.bullets.map((b) => (
                          <li key={b} className="text-xs leading-relaxed flex gap-2">
                            <span className="text-gold mt-0.5">·</span>
                            <span style={{ color: "#E2E8F0" }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs mt-3 italic text-gold">{area.insight}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className="csl-section">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Engagement Model</span>
          <h2 className="mt-3">Aligned, Low-Risk Engagement</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Directional savings estimate first",
              "Operator-level review before deeper work",
              "Paid validation can be credited forward",
              "Performance-based options available",
              "If value is not identified, the engagement does not proceed",
            ].map((b) => (
              <li key={b} className="flex gap-3 text-sm" style={{ color: "#E2E8F0" }}>
                <span className="text-gold font-bold">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BOOK CONSULTATION */}
      <section id="book-consultation" className="csl-section csl-section-dark">
        <div className="csl-container max-w-[720px]">
          <div className="glass-card p-8 text-center">
            <span className="csl-label">Schedule</span>
            <h2 className="mt-3">Schedule an Operator-Level Consultation</h2>
            <p className="text-sm mt-3 leading-relaxed text-muted-foreground">
              Connect with the CSL-Oracle team to validate your savings estimate and determine whether a
              deeper engagement makes sense.
            </p>
            <div className="mt-6">
              <a href="#" className="csl-btn csl-btn-primary csl-btn-lg">
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
