import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";

const CITIES = [
  { name: "Kansas City", status: "Active", detail: "Executive room launched. Hosting quarterly briefings." },
  { name: "St. Louis", status: "Active", detail: "Regional partnerships in progress. First cohort forming." },
  { name: "Springfield", status: "Active", detail: "K-12 cybersecurity pilot underway with district partners." },
  { name: "Columbia", status: "Active", detail: "University corridor engagement. Workforce pipeline focus." },
  { name: "Jefferson City", status: "Active", detail: "State capitol liaison. Policy and funding alignment." },
];

const PRIORITIES = [
  {
    title: "K-12 Cybersecurity",
    desc: "Protecting school districts statewide through assessments, training, and executive-level guidance for superintendents and boards.",
  },
  {
    title: "Funding Pathways",
    desc: "Mapping federal, state, and private funding opportunities — from E-Rate modernization to SLCGP allocations and philanthropic grants.",
  },
  {
    title: "Executive Leadership",
    desc: "Building a network of CISOs, CIOs, and board-level leaders across Missouri's public and private sectors.",
  },
  {
    title: "Partnerships & Sponsors",
    desc: "Engaging regional technology firms, MSSPs, and national partners to support Missouri's cybersecurity ecosystem.",
  },
];

export default function MissouriPage() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section" style={{ paddingBottom: "1.5rem" }}>
        <div className="csl-container">
          <span className="csl-label text-emerald">Flagship State Profile</span>
          <h1 className="mt-2 max-w-[820px]">
            Missouri — <span className="text-gold">The First Active CSL State</span>
          </h1>
          <p className="text-sm mt-3 max-w-[760px] leading-relaxed text-muted-foreground">
            Missouri is where the CSL model was built and proven. Five active cities, K-12 cybersecurity leadership,
            funding strategy, and a growing executive network — setting the standard for every state that follows.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Flagship state", "5 active cities", "K-12 focus", "Funding aligned", "Executive network"].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-full border border-emerald/20 bg-emerald/[0.06] text-[0.68rem] tracking-[0.08em] uppercase text-emerald"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mt-6">
            <Link to="/membership" className="csl-btn csl-btn-primary">Join as a Member</Link>
            <Link to="/states#host-form" className="csl-btn csl-btn-outline">Become a Host</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { val: "5", color: "text-emerald", label: "Active Cities" },
              { val: "1st", color: "text-gold", label: "State Launched" },
              { val: "K-12", color: "text-orange-bright", label: "Cyber Focus" },
              { val: "Growing", color: "text-foreground", label: "Executive Network" },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center p-5">
                <div className={`font-display text-[1.75rem] font-black ${s.color}`}>{s.val}</div>
                <div className="text-[0.7rem] text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE CITIES */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <span className="csl-label">City Rooms</span>
          <h2 className="mt-2">Five Cities. One Connected Network.</h2>
          <p className="text-sm mt-2 text-muted-foreground max-w-[640px]">
            Each city operates its own executive room with local context, regional partnerships, and statewide coordination.
          </p>
          <div className="csl-grid csl-grid-3 mt-6">
            {CITIES.map((city) => (
              <div key={city.name} className="glass-card p-5 gold-bar-left">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-display text-[0.95rem]">{city.name}</h4>
                  <span
                    className="csl-badge"
                    style={{ background: "rgba(107,197,160,0.15)", color: "hsl(153 40% 60%)" }}
                  >
                    {city.status}
                  </span>
                </div>
                <p className="text-xs mt-2 text-muted-foreground">{city.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC PRIORITIES */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label text-gold">Strategic Priorities</span>
          <h2 className="mt-2">What Missouri Is Building</h2>
          <div className="csl-grid csl-grid-2 mt-6">
            {PRIORITIES.map((p) => (
              <div key={p.title} className="glass-card p-6">
                <h3 className="font-display text-[1.05rem]">{p.title}</h3>
                <p className="text-sm mt-2 text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODEL STATE */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="glass-card p-8 text-center">
            <span className="csl-label text-emerald">The Model</span>
            <h2 className="mt-3">Missouri Is the Blueprint</h2>
            <p className="text-sm mt-3 text-muted-foreground leading-relaxed">
              Every state page CSL builds will follow the Missouri model — local leadership, city-level rooms,
              K-12 protection, funding strategy, and executive community. Missouri proved it works. Now it scales.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link to="/states" className="csl-btn csl-btn-outline">Explore All States</Link>
              <Link to="/membership" className="csl-btn csl-btn-primary">Become a Member</Link>
            </div>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
