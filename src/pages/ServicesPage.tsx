import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";

const services = [
  {
    href: "/strategic-partners",
    label: "Strategic Partners",
    desc: "Partner programs and advisory for vendors and ecosystem leaders.",
    highlight: true,
  },
  {
    href: "/george4-series",
    label: "George4 AI Leadership Series",
    desc: "Founder-led AI leadership series for senior executives.",
  },
  {
    href: "/ai-governance",
    label: "AI Governance",
    desc: "Board-ready AI governance frameworks and policy development.",
  },
  {
    href: "/advisory",
    label: "Advisory Services",
    desc: "Practitioner-led advisory engagements for C-Level and boards.",
  },
  {
    href: "/cohort",
    label: "Executive Cohorts",
    desc: "Small-group cohorts for senior cybersecurity leaders.",
  },
  {
    href: "/advisory#cyber-risk",
    label: "Cyber Risk Assessments",
    desc: "Independent assessments mapped to executive and board priorities.",
  },
  {
    href: "/advisory#funding-strategy",
    label: "Funding Strategy",
    desc: "Budget defense, board narratives, and multi-year funding cases.",
  },
  {
    href: "/advisory#executive-briefings",
    label: "Executive Briefings",
    desc: "Closed-door briefings on the issues moving through the boardroom.",
  },
];

export default function ServicesPage() {
  return (
    <CSLLayout>
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>CSL Services</span>
          <h1 className="mt-2">CSL <span className="text-gold">Services</span></h1>
          <p className="text-sm mt-4 max-w-[640px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Practitioner-led advisory, cohorts, and partner programs for C-Level, boards, and community leaders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {services.map((s) => (
              <Link
                key={s.href + s.label}
                to={s.href}
                className="block p-5 rounded-xl transition-all hover:bg-white/[0.04]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${s.highlight ? "hsl(var(--gold) / 0.4)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div
                  className="font-display text-base font-bold tracking-[0.04em]"
                  style={{ color: s.highlight ? "hsl(var(--gold))" : "#F1F5F9" }}
                >
                  {s.label}
                </div>
                <div className="text-sm mt-1.5 leading-relaxed" style={{ color: "#CBD5E1" }}>
                  {s.desc}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/book" className="csl-btn csl-btn-primary">Book Strategy Session</Link>
            <Link to="/membership" className="csl-btn csl-btn-secondary">Become a Member</Link>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
