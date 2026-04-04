import CSLLayout from "@/components/CSLLayout";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup } from "@/components/CSLComponents";

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
              <a href="#brief" className="csl-btn csl-btn-outline">Get the Free Brief</a>
              <a href="#host-form" className="csl-btn csl-btn-primary">Apply to Host</a>
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

      {/* STATE INTELLIGENCE BRIEF + FORM */}
      <section className="csl-section csl-section-dark">
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

            <div id="brief" className="glass-card p-6">
              <span className="csl-label">Join the Brief</span>
              <h3 className="font-display mt-2">Get your free state brief</h3>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormGroup label="Name"><input className="csl-form-input" type="text" placeholder="Your name" /></FormGroup>
                  <FormGroup label="Email"><input className="csl-form-input" type="email" placeholder="you@company.com" /></FormGroup>
                  <FormGroup label="State">
                    <select className="csl-form-select">
                      <option value="">Select your state</option>
                      {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup label="Role">
                     <select className="csl-form-select">
                       <option>C-Level (CISO / CIO / CTO)</option>
                       <option>Board Member / Advisor</option>
                       <option>Community / Workforce Leader</option>
                       <option>Government / Education</option>
                       <option>Partner / Sponsor</option>
                       <option>Investor / Supporter</option>
                       <option>Other</option>
                     </select>
                  </FormGroup>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="csl-btn csl-btn-primary" type="submit">Subscribe Free</button>
                  <Link to="/membership" className="csl-btn csl-btn-outline">Go Premium</Link>
                </div>
              </form>
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
            <a href="#host-form" className="csl-btn csl-btn-primary">Nominate a Host</a>
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
              return (
                <Link
                  key={state}
                  to={status === "active" ? "/states/missouri" : "#host-form"}
                  className="state-card"
                  onClick={(e) => {
                    if (status !== "active") {
                      e.preventDefault();
                      document.getElementById("host-form")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  style={{
                    textDecoration: "none",
                    borderColor: status === "active"
                      ? "rgba(107,197,160,0.35)"
                      : status === "interest"
                        ? "rgba(212,168,67,0.2)"
                        : undefined,
                  }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-display text-[0.92rem]">{state}</h4>
                    <span
                      className="csl-badge"
                      style={
                        status === "active"
                          ? { background: "rgba(107,197,160,0.15)", color: "hsl(153 40% 60%)" }
                          : status === "interest"
                            ? { background: "rgba(212,168,67,0.12)", color: "hsl(40 55% 58%)" }
                            : { background: "rgba(255,255,255,0.05)", color: "hsl(213 16% 60%)" }
                      }
                    >
                      {status === "active" ? "Active" : status === "interest" ? "Interest Expressed" : "Nominate a Host"}
                    </span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#E2E8F0" }}>
                    {status === "active"
                      ? "5 active cities · Kansas City · St. Louis · Springfield · Columbia · Jefferson City"
                      : status === "interest"
                        ? "Interest has been expressed. Help shape what launches next."
                        : "View the profile, join the brief, or apply to host."}
                  </p>
                  <span
                    className="inline-block mt-2 font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase"
                    style={{
                      color: status === "active"
                        ? "hsl(153 40% 60%)"
                        : status === "interest"
                          ? "hsl(40 55% 58%)"
                          : "hsl(213 16% 60%)",
                    }}
                  >
                    {status === "active" ? "View Profile" : status === "interest" ? "Express Interest" : "Nominate a Host"}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOST APPLICATION FORM */}
      <section className="csl-section csl-section-dark" id="host-form">
        <div className="csl-container" style={{ maxWidth: 640 }}>
          <div className="text-center mb-6">
            <span className="csl-label">Become a Host</span>
            <h2 className="mt-3">Apply to Host a CSL City Room</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Want to bring CSL to your city? Tell us where and why.</p>
            <p className="text-xs mt-1 text-muted-foreground">Contact: <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
          </div>
          <div className="glass-card p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormGroup label="Name"><input className="csl-form-input" type="text" required /></FormGroup>
                <FormGroup label="Email"><input className="csl-form-input" type="email" required /></FormGroup>
                <FormGroup label="State">
                  <select className="csl-form-select">
                    <option value="">Select state</option>
                    {ALL_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </FormGroup>
                <FormGroup label="Target City"><input className="csl-form-input" type="text" placeholder="Your city" /></FormGroup>
              </div>
              <FormGroup label="Why do you want to host?">
                <textarea className="csl-form-textarea" placeholder="What would a CSL room look like in your city?" />
              </FormGroup>
              <button type="submit" className="csl-btn csl-btn-primary csl-btn-block csl-btn-lg mt-4">Submit Host Application</button>
            </form>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
