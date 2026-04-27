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
    signal: "Licensing rarely reflects how environments actually operate at scale",
    visibleBullets: [
      "Core counts drift beyond real workload demand",
      "Paid options remain enabled long after initial use",
      "DR environments fully licensed but rarely active",
    ],
    footer: "Common source of significant hidden cost",
    bullets: [
      "Core licensing exceeds real workload requirements",
      "Partitioning and Tuning Pack enabled but unused",
      "Disaster recovery environments fully licensed",
      "Dev and test environments not optimized",
      "Legacy agreements misaligned with current architecture",
    ],
    insight: "Environments evolve. Licensing typically does not.",
  },
  {
    title: "Cloud (OCI)",
    signal: "Consumption expands faster than governance",
    visibleBullets: [
      "Idle or oversized compute runs continuously",
      "Storage tiers misaligned with usage",
      "Reserved capacity underutilized",
    ],
    footer: "Ongoing cost leakage is common",
    bullets: [
      "Oversized compute instances",
      "Storage tier misalignment",
      "Reserved capacity not fully utilized",
      "Network and egress costs overlooked",
      "Lift and shift environments never optimized",
    ],
    insight: "Cloud amplifies decisions. It does not optimize them.",
  },
  {
    title: "ERP Systems",
    signal: "Adoption rarely aligns with cost",
    visibleBullets: [
      "Modules purchased but not fully used",
      "Manual processes still in place",
      "Duplicate systems exist outside Oracle",
    ],
    footer: "Spend often exceeds realized value",
    bullets: [
      "Underutilized ERP modules",
      "Manual processes replacing automation",
      "Duplicate systems outside Oracle",
      "Reporting inefficiencies",
      "User licenses exceed active usage",
    ],
    insight: "Systems are implemented once. Cost follows long after.",
  },
  {
    title: "Middleware",
    signal: "Visibility gaps create exposure",
    visibleBullets: [
      "WebLogic environments over-licensed",
      "Java licensing changes not fully accounted for",
      "Shadow deployments exist outside governance",
    ],
    footer: "Often overlooked, frequently material",
    bullets: [
      "WebLogic environments over-licensed",
      "Java licensing changes not accounted for",
      "Shadow deployments outside IT visibility",
      "Legacy middleware under full support",
      "Audit exposure from inconsistent tracking",
    ],
    insight: "Complexity hides cost better than any system.",
  },
  {
    title: "Contracts & Support",
    signal: "Cost compounds quietly through renewal structure",
    visibleBullets: [
      "Support paid on unused assets",
      "Annual increases accepted without challenge",
      "Contract structure rarely revisited",
    ],
    footer: "Financial impact is cumulative, not visible",
    bullets: [
      "Paying support on unused or underutilized licenses",
      "Annual increases applied without renegotiation",
      "Shelfware still included in support agreements",
      "M and A assets bundled into current contracts",
      "No structured approach before renewal or audit cycles",
    ],
    insight: "Most organizations optimize usage. Cost lives in contracts.",
  },
  {
    title: "Infrastructure Design",
    signal: "Architecture decisions become financial commitments",
    visibleBullets: [
      "Environments duplicated across regions",
      "HA and DR overbuilt beyond requirements",
      "Cloud and on prem overlap",
    ],
    footer: "Design decisions drive long-term cost",
    bullets: [
      "Environments duplicated without cost review",
      "HA and DR models overbuilt",
      "Regional expansion increases licensing exposure",
      "Cloud and on prem overlap",
      "Procurement and architecture disconnected",
    ],
    insight: "Technical architecture often drives financial inefficiency.",
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
  const [formUnlocked, setFormUnlocked] = useState(false);

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
  const unlockForm = () => {
    setFormUnlocked(true);
    setTimeout(() => {
      document.getElementById("oracle-lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
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
        submission_type: "oracle_lead",
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
      setTimeout(() => {
        document.getElementById("result-screen")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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
              Schedule Operator-Level Consultation
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

      {/* WHEN THIS MATTERS MOST */}
      <section className="csl-section">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Timing</span>
          <h2 className="mt-3">When This Matters Most</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Before Oracle contract renewals",
              "Following audit activity",
              "During cloud migration or expansion",
              "After mergers, acquisitions, or restructuring",
            ].map((b) => (
              <li key={b} className="flex gap-3 text-sm" style={{ color: "#E2E8F0" }}>
                <span className="text-gold font-bold">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs mt-5 italic text-muted-foreground">
            These moments often expose the largest gaps between spend and actual need.
          </p>
        </div>
      </section>

      {/* SAVINGS ESTIMATOR — HYBRID PREVIEW → UNLOCK → FORM → RESULT */}
      <section id="savings-estimator" className="csl-section">
        <div className="csl-container max-w-[920px]">
          <div className="text-center mb-8">
            <span className="csl-label">Savings Estimator</span>
            <h2 className="mt-3">Estimate Your Cost Savings</h2>
            <p className="text-sm mt-2 max-w-[560px] mx-auto leading-relaxed text-muted-foreground">
              See what may be sitting in your Oracle environment.
            </p>
          </div>

          {success ? (
            // ============ STEP 4: RESULT SCREEN ============
            <div
              id="result-screen"
              className="glass-card p-8 md:p-10 text-center animate-in fade-in zoom-in-95 duration-500"
            >
              <span className="csl-badge csl-badge-gold mb-4">Full Estimate Unlocked</span>
              <h3 className="font-display text-xl md:text-2xl mt-2">
                Potential Recoverable Oracle Spend
              </h3>
              <div className="my-6 py-8 border-y border-[hsl(var(--gold))]/20">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-gold leading-none tracking-tight">
                  {formatCurrency(success.low)} – {formatCurrency(success.high)}
                </div>
                <div className="text-sm mt-3 text-muted-foreground">annually</div>
              </div>

              <div className="space-y-3 max-w-[600px] mx-auto">
                <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
                  Environments in your range typically recover 20–40% of total Oracle spend.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This is a directional estimate based on similar enterprise environments.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This level of variance is common in environments that have not been reviewed
                  recently.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[hsl(var(--border))] max-w-[520px] mx-auto text-left">
                <div className="csl-label text-center">Where this typically exists</div>
                <ul className="mt-4 space-y-2">
                  {[
                    "Licensing misalignment",
                    "Cloud inefficiencies",
                    "Contract and renewal structure",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm" style={{ color: "#E2E8F0" }}>
                      <span className="text-gold font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-8 border-t border-[hsl(var(--gold))]/20">
                <h4 className="font-display text-lg">Validate This Estimate</h4>
                <p className="text-sm mt-3 leading-relaxed max-w-[560px] mx-auto" style={{ color: "#E2E8F0" }}>
                  Review your environment with a former Oracle operator to confirm where these
                  savings exist and whether a deeper engagement is warranted.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button type="button" onClick={scrollToBook} className="csl-btn csl-btn-primary">
                    Validate This Estimate (25 min)
                  </button>
                  <button type="button" onClick={scrollToBook} className="csl-btn csl-btn-outline">
                    Schedule Operator-Level Review
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* ============ STEP 1: PREVIEW (BEFORE FORM SUBMIT) ============ */}
              <div className="glass-card p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="csl-form-label">Annual Oracle Spend</label>
                    <select
                      className="csl-form-select"
                      value={spend}
                      onChange={(e) => setSpend(e.target.value)}
                    >
                      <option value="">Select spend range</option>
                      {ORACLE_SPEND_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="csl-form-label">Environment Complexity</label>
                    <select
                      className="csl-form-select"
                      value={complexity}
                      onChange={(e) => setComplexity(e.target.value)}
                    >
                      <option value="">Select complexity</option>
                      {COMPLEXITY_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* PREVIEW BLOCK */}
                {estimate ? (
                  <div className="mt-6 rounded-lg border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-400">
                    <div className="csl-label">Estimated Range (Preview)</div>
                    <div className="font-display text-4xl md:text-5xl font-extrabold text-gold mt-3 leading-none tracking-tight">
                      {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
                    </div>
                    <div className="text-xs mt-2 text-muted-foreground">annually</div>
                    <div className="mt-5 space-y-1.5">
                      <p className="text-xs text-muted-foreground">
                        Based on similar enterprise environments.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Most organizations in this range recover 20–40% of Oracle spend.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 rounded-lg border border-dashed border-[hsl(var(--border))] p-6 text-center text-xs text-muted-foreground">
                    Select spend and complexity to see a preview estimate.
                  </div>
                )}

                {/* ============ STEP 2: UNLOCK PROMPT ============ */}
                {estimate && !formUnlocked && (
                  <div className="mt-6 text-center animate-in fade-in duration-500">
                    <p className="text-sm leading-relaxed max-w-[480px] mx-auto" style={{ color: "#E2E8F0" }}>
                      Unlock your full estimate and see where these savings typically exist.
                    </p>
                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={unlockForm}
                        className="csl-btn csl-btn-primary csl-btn-lg"
                      >
                        Get My Full Savings Breakdown
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ============ STEP 3: FORM (REVEALED ON UNLOCK) ============ */}
              {formUnlocked && (
                <form
                  id="oracle-lead-form"
                  onSubmit={handleSubmit}
                  className="glass-card p-6 md:p-8 space-y-5 mt-6 animate-in fade-in slide-in-from-bottom-3 duration-500"
                >
                  <div className="text-center pb-2">
                    <span className="csl-label">Unlock Full Estimate</span>
                    <h3 className="font-display text-lg mt-2">A few details to validate your environment</h3>
                  </div>

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

                  {/* Reminder of preview while filling out */}
                  {estimate && (
                    <div className="rounded-md border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-4 text-center">
                      <div className="csl-label">Preview Estimate</div>
                      <div className="font-display text-2xl font-extrabold text-gold mt-1">
                        {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}{" "}
                        <span className="text-xs text-muted-foreground font-normal">annually</span>
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">
                        Submit to unlock the full breakdown.
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="csl-btn csl-btn-primary csl-btn-block csl-btn-lg"
                      disabled={submitting}
                    >
                      {submitting ? "Unlocking…" : "Unlock Full Estimate"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </section>

      {/* EXPLORE OPTIMIZATION */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Explore</span>
            <h2 className="mt-3">Explore Oracle Optimization</h2>
            <p className="text-sm mt-3 max-w-[640px] mx-auto leading-relaxed" style={{ color: "#E2E8F0" }}>
              Where enterprise Oracle environments typically drift from intent, structure, and financial
              control.
            </p>
            <p className="text-xs mt-3 max-w-[600px] mx-auto leading-relaxed text-muted-foreground italic">
              Select a domain to see common signals. We do not publish the playbook. We validate it with you.
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
                  className={`glass-card p-5 text-left transition-all duration-300 ease-out hover:border-[hsl(var(--gold))]/60 hover:shadow-[0_0_24px_-6px_hsl(var(--gold)/0.35)] ${
                    isOpen ? "border-[hsl(var(--gold))]/60 shadow-[0_0_24px_-6px_hsl(var(--gold)/0.35)]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base">{area.title}</h4>
                    <span className="text-gold text-lg leading-none mt-0.5">{isOpen ? "−" : "+"}</span>
                  </div>
                  <p className="text-xs mt-2 text-muted-foreground">{area.signal}</p>
                  <ul className="space-y-1.5 mt-3">
                    {area.visibleBullets.map((b) => (
                      <li key={b} className="text-xs leading-relaxed flex gap-2">
                        <span className="text-gold mt-0.5">·</span>
                        <span style={{ color: "#E2E8F0" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] mt-3 pt-3 border-t border-[hsl(var(--border))] text-muted-foreground italic">
                    {area.footer}
                  </p>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="csl-label text-[10px]">Where we typically identify savings</div>
                      <ul className="space-y-1.5 mt-2">
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
          <div className="mt-10 text-center max-w-[680px] mx-auto">
            <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
              Most organizations recognize at least one of these patterns. The question is how much it is
              costing.
            </p>
            <div className="mt-6">
              <button type="button" onClick={scrollToEstimator} className="csl-btn csl-btn-primary">
                Validate My Oracle Environment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL */}
      <section className="csl-section">
        <div className="csl-container max-w-[920px]">
          <div className="text-center mb-8">
            <span className="csl-label">Engagement Model</span>
            <h2 className="mt-3">Aligned, Low-Risk Engagement</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                title: "Free Consultation",
                subtitle: "Operator-level review",
                bullets: [
                  "High-level understanding of your environment",
                  "Identify where savings are likely to exist",
                  "Determine if further analysis is warranted",
                ],
                outcome: "Clear go or no go decision",
                footer: "No commitment required",
              },
              {
                num: "02",
                title: "Short Validation",
                subtitle: "Focused, fixed-scope review",
                bullets: [
                  "Confirm where savings exist",
                  "Build optimized strategy",
                  "Deliver key findings and savings in 60 to 90 days",
                ],
                outcome: "Clear savings range and execution path",
                footer: "Fixed scope. No scope creep. Designed to be fast and efficient.",
              },
              {
                num: "03",
                title: "Immediate ROI",
                subtitle: "Execution aligned to outcomes",
                bullets: [
                  "Capture and realize identified savings",
                  "Support optimization and positioning",
                  "Contract performance improvements with proven outcomes",
                ],
                outcome: "Measurable financial impact realized early",
                footer: "Savings are typically identified and realized early in the engagement.",
              },
            ].map((card) => (
              <div key={card.num} className="glass-card p-6 flex flex-col">
                <div className="font-display text-gold text-sm">{card.num}</div>
                <h4 className="font-display text-base mt-2">{card.title}</h4>
                <p className="text-[11px] mt-1 text-muted-foreground uppercase tracking-wider">
                  {card.subtitle}
                </p>
                <ul className="text-xs mt-4 space-y-1.5" style={{ color: "#E2E8F0" }}>
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-gold mt-0.5">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                  <div className="csl-label text-[10px]">Outcome</div>
                  <p className="text-xs mt-1.5 italic text-gold">{card.outcome}</p>
                </div>
                <p className="text-[11px] mt-4 pt-3 border-t border-[hsl(var(--border))] text-muted-foreground mt-auto">
                  {card.footer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK CONSULTATION */}
      <section id="book-consultation" className="csl-section csl-section-dark">
        <div className="csl-container max-w-[720px]">
          <div className="glass-card p-8 text-center">
            <span className="csl-label">Schedule</span>
            <h2 className="mt-3">Schedule an Operator-Level Consultation</h2>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#E2E8F0" }}>
              Validate your estimate and determine whether a deeper engagement makes sense.
            </p>
            <p className="text-xs mt-5 italic text-gold/90 max-w-[520px] mx-auto">
              Organizations in similar environments regularly identify six- and seven-figure
              optimization opportunities.
            </p>
            <div className="mt-6">
              <a href="#" className="csl-btn csl-btn-primary csl-btn-lg">
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
