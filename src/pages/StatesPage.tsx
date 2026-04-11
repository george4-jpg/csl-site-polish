import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const ALL_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];
const INTEREST_STATES = new Set(["Kansas", "Louisiana", "Alabama", "Arizona", "Arkansas", "California", "Nebraska", "Tennessee", "Texas"]);

function getStateStatus(state: string): "active" | "interest" | "nominate" {
  if (state === "Missouri") return "active";
  if (INTEREST_STATES.has(state)) return "interest";
  return "nominate";
}

export default function StatesPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});
  const [formVariant, setFormVariant] = useState<"interest" | "host" | "brief">("interest");

  const openStateForm = (state: string, status: "interest" | "nominate") => {
    if (status === "interest") {
      setFormVariant("interest");
      setFormContext({
        request_type: "State Interest",
        state,
        source_page: "States",
        cta_name: "Express Interest",
      });
    } else {
      setFormVariant("host");
      setFormContext({
        request_type: "Host Application",
        state,
        source_page: "States",
        cta_name: "Nominate a Host",
      });
    }
    setFormOpen(true);
  };

  const openBriefForm = () => {
    setFormVariant("brief");
    setFormContext({ request_type: "Intelligence Brief", source_page: "States", cta_name: "Get the Free Brief" });
    setFormOpen(true);
  };

  const openHostForm = (ctaName: string) => {
    setFormVariant("host");
    setFormContext({ request_type: "Host Application", source_page: "States", cta_name: ctaName });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      <section className="csl-section" style={{ paddingBottom: "1.5rem" }}>
        <div className="csl-container">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="csl-label">National Rollout</span>
              <h1 className="mt-2 max-w-[820px]">Find Your State. Read the Signal. <span className="text-gold">Help Host the Room.</span></h1>
              <p className="text-sm mt-3 max-w-[760px] leading-relaxed" style={{ color: "#E2E8F0" }}>
                CSL is building state-by-state. Cyber risk, AI governance, funding signals, and executive rooms in every state.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["All 50 states", "Free state brief", "Premium member intel", "Host city pipeline"].map((pill) => (
                  <span key={pill} className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-[0.68rem] tracking-[0.08em] uppercase" style={{ color: "#CBD5E1" }}>{pill}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={openBriefForm} className="csl-btn csl-btn-outline">Get the Free Brief</button>
              <button onClick={() => openHostForm("Apply to Host")} className="csl-btn csl-btn-primary">Apply to Host</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { val: "50", color: "text-gold", label: "States Profiled" },
              { val: "Free", color: "text-emerald", label: "State Brief" },
              { val: "Premium", color: "text-orange-bright", label: "Member Intel" },
              { val: "Host", color: "text-white", label: "City-by-City Activation" },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center p-5">
                <div className={`font-display text-[1.75rem] font-black ${s.color}`}>{s.val}</div>
                <div className="text-[0.7rem] text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATE INTELLIGENCE BRIEF */}
      <section className="csl-section csl-section-dark" id="brief">
        <div className="csl-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="glass-card p-6 gold-bar-left">
              <span className="csl-label text-gold">State Intelligence Brief</span>
              <h3 className="font-display mt-2">Free for everyone. Deeper for members.</h3>
              <p className="text-sm mt-3" style={{ color: "#E2E8F0" }}>
                Every state gets a public brief. Members get the full version with executive context and protected notes.
              </p>
              <div className="csl-grid csl-grid-2 mt-4">
                <div className="glass-card p-4">
                  <h4 className="font-display">Free Brief</h4>
                  <p className="text-xs mt-1" style={{ color: "#E2E8F0" }}>Risk signals, funding moves, leadership activity, expansion updates.</p>
                </div>
                <div className="glass-card p-4">
                  <h4 className="font-display">Premium Layer</h4>
                  <p className="text-xs mt-1" style={{ color: "#E2E8F0" }}>Strategic analysis, private briefings, protected state notes.</p>
                </div>
              </div>
              <p className="text-xs text-gold mt-4">Missouri is live. The model is national.</p>
            </div>

            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="csl-label">Join the Brief</span>
              <h3 className="font-display mt-2">Get your free state brief</h3>
              <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Sign up to receive intelligence for your state.</p>
              <div className="flex flex-wrap gap-3 mt-5">
                <button onClick={openBriefForm} className="csl-btn csl-btn-primary">Join the Brief</button>
                <Link to="/enroll" className="csl-btn csl-btn-outline">Go Premium</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATE SELECTOR */}
      <section className="csl-section" id="missouri">
        <div className="csl-container">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <div>
              <span className="csl-label">State Selector</span>
              <h2 className="mt-2">All 50 states. Same structure. Different local signal.</h2>
            </div>
            <button onClick={() => openHostForm("Nominate a Host")} className="csl-btn csl-btn-primary">Nominate a Host</button>
          </div>
          <div className="glass-card p-6 mb-4">
            <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
              Each state profile covers funding pathways, target cities, local activity, and host recruitment.
            </p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "hsl(42 60% 55%)" }}>
              Several states have already expressed interest. Early hosts and partners will help shape the first wave of expansion.
            </p>
          </div>
          <div className="state-grid">
            {ALL_STATES.map((state) => {
              const status = getStateStatus(state);
              if (status === "active") {
                return (
                  <Link key={state} to="/states/missouri" className="state-card" style={{ textDecoration: "none", borderColor: "rgba(107,197,160,0.35)" }}>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display text-[0.92rem]">{state}</h4>
                      <span className="csl-badge" style={{ background: "rgba(107,197,160,0.15)", color: "hsl(153 40% 60%)" }}>Active</span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: "#E2E8F0" }}>5 active cities · Kansas City · St. Louis · Springfield · Columbia · Jefferson City</p>
                    <span className="inline-block mt-2 font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(153 40% 60%)" }}>View Profile</span>
                  </Link>
                );
              }
              return (
                <button
                  key={state}
                  onClick={() => openStateForm(state, status === "interest" ? "interest" : "nominate")}
                  className="state-card text-left"
                  style={{
                    borderColor: status === "interest" ? "rgba(212,168,67,0.2)" : undefined,
                  }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-display text-[0.92rem]">{state}</h4>
                    <span
                      className="csl-badge"
                      style={
                        status === "interest"
                          ? { background: "rgba(212,168,67,0.12)", color: "hsl(40 55% 58%)" }
                          : { background: "rgba(255,255,255,0.05)", color: "hsl(213 16% 60%)" }
                      }
                    >
                      {status === "interest" ? "Interest Expressed" : "Nominate a Host"}
                    </span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#E2E8F0" }}>
                    {status === "interest"
                      ? "Interest has been expressed. Help shape what launches next."
                      : "View the profile, join the brief, or apply to host."}
                  </p>
                  <span
                    className="inline-block mt-2 font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase"
                    style={{ color: status === "interest" ? "hsl(40 55% 58%)" : "hsl(213 16% 60%)" }}
                  >
                    {status === "interest" ? "Express Interest" : "Nominate a Host"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOST APPLICATION CTA */}
      <section className="csl-section csl-section-dark" id="host-form">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <span className="csl-label">Host a CSL City Room</span>
          <h2 className="mt-3">Apply to Bring CSL to Your City</h2>
          <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>
            We are looking for leaders with the network, venue access, and vision to host executive cybersecurity rooms in their city. Tell us about your readiness.
          </p>
          <div className="glass-card gold-bar-left text-left p-5 mt-6 mx-auto" style={{ maxWidth: 480 }}>
            <p className="font-display text-xs font-bold tracking-[0.12em] uppercase text-gold mb-3">What we look for in a host</p>
            <ul className="space-y-2 text-sm" style={{ color: "#E2E8F0" }}>
              {[
                "City and state you would host in",
                "Your organization and leadership role",
                "Access to a private dining or meeting venue",
                "Existing executive network or professional community",
                "Past experience hosting professional events",
                "Estimated audience of local cybersecurity leaders",
                "Preferred format (dinner, roundtable, briefing, hybrid)",
                "Timeline and readiness to launch",
                "Interest in co-hosting or securing a local sponsor",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs mt-4 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
          <button onClick={() => openHostForm("Submit Host Application")} className="csl-btn csl-btn-primary csl-btn-lg mt-6">
            Submit Host Application
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant={formVariant} />
    </CSLLayout>
  );
}
