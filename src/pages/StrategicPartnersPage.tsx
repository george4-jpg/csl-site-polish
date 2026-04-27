import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";

const REQUIREMENTS = [
  {
    title: "Member Value",
    desc: "Must provide a meaningful benefit to CSL members.",
  },
  {
    title: "Operational Alignment",
    desc: "Must align with CSL's leadership and execution model.",
  },
  {
    title: "Shared Success",
    desc: "Must support revenue participation, referral economics, or another win-win model.",
  },
  {
    title: "Execution Capability",
    desc: "Must be able to deliver real outcomes.",
  },
];

export default function StrategicPartnersPage() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Strategic Partners</span>
          <h1 className="mt-3 max-w-[820px]">
            Strategic Partners of<br />
            <span className="text-gold">Cyber Security Leadership.</span>
          </h1>
          <p className="text-sm mt-4 max-w-[640px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            A curated ecosystem of trusted operators, platforms, and advisory partners aligned to deliver
            measurable value to CSL members.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#featured-partners" className="csl-btn csl-btn-primary">
              Explore Featured Partners
            </a>
            <Link to="/strategic-partners/apply" className="csl-btn csl-btn-outline">
              Apply to Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* BUILT FOR EXECUTION */}
      <section className="csl-section">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Model</span>
          <h2 className="mt-3">Built for Execution, Not Exposure.</h2>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
            Strategic partners are selected based on their ability to deliver measurable outcomes to CSL
            members. This is not a sponsorship model. It is an execution model.
          </p>
        </div>
      </section>

      {/* NOT SPONSORS */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container max-w-[820px]">
          <span className="csl-label">Positioning</span>
          <h2 className="mt-3">Not Sponsors. Strategic Partners.</h2>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
            CSL Strategic Partners are selected because they deliver meaningful value to members. They are
            operators, advisors, platforms, and service providers aligned to CSL's leadership model.
          </p>
        </div>
      </section>

      {/* PARTNER REQUIREMENTS */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">Partner Requirements</span>
            <h2 className="mt-3">What We Require</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {REQUIREMENTS.map((r) => (
              <div key={r.title} className="glass-card p-5 gold-bar-left">
                <h4 className="font-display text-base">{r.title}</h4>
                <p className="text-xs mt-2 leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PARTNER */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container max-w-[820px]">
          <div className="text-center mb-6">
            <span className="csl-label">Featured Partner</span>
          </div>
          <div className="glass-card p-8 border border-[hsl(var(--gold))]/40">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <span className="csl-badge csl-badge-gold mb-3">Strategic Partner</span>
                <h3 className="font-display text-2xl">Monarch Precision Group</h3>
                <p className="text-sm mt-1 text-gold">Oracle Insider Advisory & Optimization</p>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
                  Former Oracle operators and enterprise leaders helping organizations identify where Oracle
                  environments diverge from how they were intended to be structured, licensed, and priced.
                </p>
                <div className="mt-5">
                  <Link to="/strategic-partners/oracle" className="csl-btn csl-btn-primary">
                    Explore Oracle Optimization
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY CTA */}
      <section className="csl-section">
        <div className="csl-container max-w-[720px]">
          <div className="glass-card p-8 text-center">
            <span className="csl-label">Apply</span>
            <h2 className="mt-3">Become a CSL Strategic Partner</h2>
            <p className="text-sm mt-3 leading-relaxed text-muted-foreground">
              Submit your interest. CSL leadership reviews each application against member value, execution
              capability, and shared-success alignment.
            </p>
            <div className="mt-6">
              <Link to="/strategic-partners/apply" className="csl-btn csl-btn-gold">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
