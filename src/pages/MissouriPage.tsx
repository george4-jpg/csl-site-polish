import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const CITIES = [
  { name: "Kansas City", status: "Launched" },
  { name: "St. Louis", status: "Launched" },
  { name: "Springfield", status: "Forming" },
  { name: "Columbia", status: "Forming" },
  { name: "Jefferson City", status: "Forming" },
];

export default function MissouriPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});
  const [formVariant, setFormVariant] = useState<"brief" | "partner" | "host">("brief");

  const openBriefForm = () => {
    setFormVariant("brief");
    setFormContext({ request_type: "Intelligence Brief", state: "Missouri", source_page: "Missouri", cta_name: "Get Notified" });
    setFormOpen(true);
  };

  const openPartnerForm = (ctaName: string) => {
    setFormVariant("partner");
    setFormContext({ request_type: "Partner Interest", state: "Missouri", source_page: "Missouri", cta_name: ctaName });
    setFormOpen(true);
  };

  const openHostForm = () => {
    setFormVariant("host");
    setFormContext({ request_type: "Host Application", state: "Missouri", source_page: "Missouri", cta_name: "Apply to Host" });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section" style={{ paddingBottom: "1rem" }}>
        <div className="csl-container">
          <span className="csl-label text-emerald">Flagship State</span>
          <h1 className="mt-2 max-w-[780px]">
            Missouri <span className="text-gold">| First Active CSL State</span>
          </h1>
          <p className="text-sm mt-3 max-w-[680px] leading-relaxed text-muted-foreground">
            The CSL model was built and proven in Missouri. Five cities. Executive-level rooms.
            K-12 cybersecurity leadership. State funding alignment. This is the blueprint.
          </p>
          <div className="flex gap-2 flex-wrap mt-6">
            <Link to="/membership" className="csl-btn csl-btn-primary">Join Missouri Network</Link>
            <button onClick={openHostForm} className="csl-btn csl-btn-outline">Host a City Room</button>
          </div>
        </div>
      </section>

      {/* OVERVIEW STATS */}
      <section className="pb-10">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { val: "5", label: "City Rooms", color: "text-emerald" },
              { val: "1st", label: "State Launched", color: "text-gold" },
              { val: "K-12", label: "Cyber Focus", color: "text-orange-bright" },
              { val: "Active", label: "Executive Network", color: "text-foreground" },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center p-5">
                <div className={`font-display text-[1.75rem] font-black ${s.color}`}>{s.val}</div>
                <div className="text-[0.7rem] text-muted-foreground mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSOURI OVERVIEW */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container" style={{ maxWidth: 760 }}>
          <span className="csl-label text-gold">State Profile</span>
          <h2 className="mt-2">Why Missouri First</h2>
          <p className="text-sm mt-3 text-muted-foreground leading-relaxed">
            Missouri offered the right conditions to launch CSL at the state level. Strong executive demand,
            underserved school districts, federal funding in motion, and leadership willing to move.
            The result is a connected statewide network that other states will replicate.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["Executive leadership", "K-12 protection", "Funding pathways", "Regional partnerships"].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-full border border-border bg-secondary text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CITY ACTIVATION PREVIEW */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">City Rooms</span>
          <h2 className="mt-2">Five Cities. One Network.</h2>
          <p className="text-sm mt-2 text-muted-foreground max-w-[600px]">
            Each city operates a local executive room with regional context and statewide coordination.
          </p>
          <div className="csl-grid csl-grid-3 mt-6">
            {CITIES.map((city) => (
              <div key={city.name} className="glass-card p-5 gold-bar-left">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-display text-[0.95rem]">{city.name}</h4>
                  <span
                    className="csl-badge"
                    style={{
                      background: city.status === "Launched"
                        ? "hsl(var(--emerald) / 0.15)"
                        : "hsl(var(--gold) / 0.12)",
                      color: city.status === "Launched"
                        ? "hsl(var(--emerald))"
                        : "hsl(var(--gold))",
                    }}
                  >
                    {city.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS / ENGAGEMENT PREVIEW */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container" style={{ maxWidth: 760 }}>
          <span className="csl-label text-emerald">Engagement</span>
          <h2 className="mt-2">Events and Briefings</h2>
          <p className="text-sm mt-3 text-muted-foreground leading-relaxed">
            Missouri hosts quarterly executive briefings, regional roundtables, and working sessions
            across all five city rooms. Event details are shared directly with members and partners.
          </p>
          <div className="glass-card p-6 mt-6 text-center">
            <p className="text-sm text-foreground">
              View upcoming Missouri events and reserve your seat.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <Link to="/events" className="csl-btn csl-btn-primary">View Events</Link>
              <Link to="/register" className="csl-btn csl-btn-outline">Register Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOST / PARTNER / INVITE CTA */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="csl-grid csl-grid-3">
            {[
              {
                label: "Host",
                heading: "Lead a City Room",
                body: "Bring CSL to your region. Host executive-level cybersecurity conversations locally.",
                cta: "Apply to Host",
                action: () => openHostForm(),
              },
              {
                label: "Partner",
                heading: "Support Missouri",
                body: "Sponsor, co-host, or align your organization with Missouri's cybersecurity network.",
                cta: "Partner With CSL",
                action: () => openPartnerForm("Partner With CSL"),
              },
              {
                label: "Join",
                heading: "Become a Member",
                body: "Access briefings, connect with state-level leadership, and shape cybersecurity strategy.",
                cta: "Join Now",
                href: "/enroll",
              },
            ].map((card) => (
              <div key={card.label} className="glass-card p-6 flex flex-col">
                <span className="csl-label text-gold">{card.label}</span>
                <h3 className="font-display text-[1.05rem] mt-2">{card.heading}</h3>
                <p className="text-sm mt-2 text-muted-foreground leading-relaxed flex-1">{card.body}</p>
                {card.href ? (
                  <Link to={card.href} className="csl-btn csl-btn-outline mt-4 self-start">{card.cta}</Link>
                ) : (
                  <button onClick={card.action} className="csl-btn csl-btn-outline mt-4 self-start">{card.cta}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container" style={{ maxWidth: 700 }}>
          <div className="glass-card p-8 text-center">
            <span className="csl-label text-emerald">The Blueprint</span>
            <h2 className="mt-3">Missouri Proved It. Now It Scales.</h2>
            <p className="text-sm mt-3 text-muted-foreground leading-relaxed">
              Every future state page follows this model. Local leadership, city-level rooms,
              K-12 protection, funding strategy, and executive community.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link to="/states" className="csl-btn csl-btn-outline">Explore All States</Link>
              <Link to="/membership" className="csl-btn csl-btn-primary">Become a Member</Link>
            </div>
          </div>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant={formVariant} />
    </CSLLayout>
  );
}
