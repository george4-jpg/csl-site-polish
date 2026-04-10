import CSLLayout from "@/components/CSLLayout";
import { useState, useEffect } from "react";

const GHL_RSVP_FORM = "https://api.leadconnectorhq.com/widget/form/CvmRzPSyXgXa6QRJovmV";

const events = [
  { city: "kansas-city", badge: "csl-badge-orange", badgeLabel: "Kansas City", title: "AI Governance & Board Risk", desc: "Domains 8 & 9. How to translate AI risk into language your board will act on.", date: "April 17, 2026", time: "6:00 PM", location: "Kansas City, MO", seats: 12 },
  { city: "st-louis", badge: "csl-badge-emerald", badgeLabel: "St. Louis", title: "Identity & Zero Trust Architecture", desc: "Domain 2. Identity is the new perimeter. Practical Zero Trust strategies.", date: "April 22, 2026", time: "6:00 PM", location: "St. Louis, MO", seats: 14 },
  { city: "springfield", badge: "csl-badge-gold", badgeLabel: "Springfield", title: "K-12 Cybersecurity & SLCGP Grants", desc: "How Missouri school districts can secure federal cybersecurity funding.", date: "April 24, 2026", time: "5:30 PM", location: "Springfield, MO", seats: 10 },
  { city: "columbia", badge: "csl-badge-blue", badgeLabel: "Columbia", title: "Cloud Security & Hybrid Protection", desc: "Domain 5. Multi-cloud posture management for real environments.", date: "May 1, 2026", time: "6:00 PM", location: "Columbia, MO", seats: 10 },
  { city: "jefferson-city", badge: "csl-badge-gold", badgeLabel: "Jefferson City", title: "State Government Cyber Strategy", desc: "Where state CISO priorities meet private sector leadership.", date: "May 8, 2026", time: "5:30 PM", location: "Jefferson City, MO", seats: 10 },
  { city: "kansas-city", badge: "csl-badge-gold", badgeLabel: "Annual Summit", title: "CSL Annual Cybersecurity Leadership Summit", desc: "Full day. Keynotes, all 10 domains, board communication masterclass.", date: "September 2026", time: "", location: "Kansas City, MO", seats: 0, flagship: true },
];

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "kansas-city", "st-louis", "springfield", "columbia", "jefferson-city"];
  const filterLabels: Record<string, string> = { all: "All Cities", "kansas-city": "Kansas City", "st-louis": "St. Louis", springfield: "Springfield", columbia: "Columbia", "jefferson-city": "Jefferson City" };

  const openGHLForm = () => {
    window.open(GHL_RSVP_FORM, "_blank", "noopener,noreferrer");
  };

  return (
    <CSLLayout>
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">Executive Dinners</span>
          <h1 className="mt-3 max-w-[600px]">Monthly City <span className="text-gold">Council Sessions</span></h1>
           <p className="text-sm mt-3 max-w-[540px] leading-relaxed text-muted-foreground">
             Private, invite-only dinners across 5 Missouri cities. No sales pitches. Peer-led. Every session maps to the CSL Framework and earns CPE credits.
           </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { color: "var(--gold)", title: "Trusted Room", desc: "No vendors. No pitches. Peer-led only." },
              { color: "var(--orange-bright)", title: "CPE Credits", desc: "Every session counts." },
              { color: "var(--emerald)", title: "Small Tables", desc: "Invite-only. 12-18 leaders max." },
              { color: "#4A90D9", title: "Framework-Aligned", desc: "Topics tied to the 10-Domain Framework." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <h4 className="font-display text-sm mt-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <h2 className="mb-4">Upcoming Dinners</h2>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {filters.map((f) => (
              <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{filterLabels[f]}</button>
            ))}
          </div>
          <div className="csl-grid csl-grid-2">
            {events.filter(e => filter === "all" || e.city === filter).map((ev, i) => (
              <div key={i} className="event-card" style={ev.flagship ? { borderColor: "hsl(var(--gold))" } : {}}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`csl-badge ${ev.badge}`}>{ev.badgeLabel}</span>
                  {ev.flagship ? <span className="text-xs text-gold">Flagship Event</span> : <span className="text-xs text-muted-foreground">{ev.seats} seats</span>}
                </div>
                <h3 className="font-display">{ev.title}</h3>
                <p className="text-sm mt-1 text-muted-foreground">{ev.desc}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{ev.date}</span>
                  {ev.time && <span>{ev.time}</span>}
                </div>
                {ev.flagship ? (
                  <button onClick={() => openRSVP(ev, "Register Interest")} className="csl-btn csl-btn-gold csl-btn-sm csl-btn-block mt-4">Register Interest</button>
                ) : (
                  <button onClick={() => openRSVP(ev, "RSVP Now")} className="csl-btn csl-btn-primary csl-btn-sm csl-btn-block mt-4">RSVP Now</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section className="csl-section" id="rsvp">
        <div className="csl-container text-center" style={{ maxWidth: 580 }}>
          <span className="csl-label">RSVP</span>
          <h2 className="mt-3">Reserve Your Seat</h2>
          <p className="text-sm mt-2 text-muted-foreground">30 seconds. We'll confirm within 24 hours.</p>
          <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
          <button
            onClick={openGeneralRSVP}
            className="csl-btn csl-btn-primary csl-btn-lg mt-6"
          >
            RSVP Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </section>

      {/* GHL RSVP Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0" style={{ background: "rgba(11,17,32,0.85)", backdropFilter: "blur(8px)" }} />
          <div
            className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: "hsl(222 47% 11%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <button onClick={() => setFormOpen(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors z-10" style={{ color: "#94A3B8" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-1">{formTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">Secure your seat. We will confirm within 24 hours.</p>
              <div className="rounded-lg p-6 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm text-muted-foreground mb-5">You'll be taken to our secure registration form to complete your RSVP.</p>
                <a
                  href={GHL_RSVP_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csl-btn csl-btn-primary csl-btn-lg"
                >
                  Continue Registration
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </CSLLayout>
  );
}
