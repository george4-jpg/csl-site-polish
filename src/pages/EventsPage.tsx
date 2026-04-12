import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import { useState } from "react";

const events = [
  { city: "kansas-city", badge: "csl-badge-orange", badgeLabel: "Kansas City", title: "KC Wine & Leadership Dinner", desc: "Sommelier-led evening for K-12 and government cybersecurity leaders. Peer conversation, not a sales pitch.", date: "April 30, 2026", time: "6:00 PM", location: "Kansas City, MO", seats: 15 },
  { city: "st-louis", badge: "csl-badge-emerald", badgeLabel: "St. Louis", title: "St. Louis Peer Lunch", desc: "Peer-led lunch for cybersecurity leaders in the St. Louis metro.", date: "May 5, 2026", time: "12:00 PM", location: "St. Louis, MO", seats: 14 },
  { city: "columbia", badge: "csl-badge-blue", badgeLabel: "Columbia", title: "Columbia Peer Lunch", desc: "Peer-led lunch for cybersecurity leaders in the Columbia area.", date: "May 12, 2026", time: "12:00 PM", location: "Columbia, MO", seats: 10 },
  { city: "springfield", badge: "csl-badge-gold", badgeLabel: "Springfield", title: "Springfield Happy Hour", desc: "Casual happy hour for cybersecurity leaders in Springfield.", date: "May 15, 2026", time: "5:30 PM", location: "Springfield, MO", seats: 10 },
  { city: "jefferson-city", badge: "csl-badge-gold", badgeLabel: "Jefferson City", title: "Jefferson City Lunch", desc: "Peer-led lunch where state and private sector cyber leaders connect.", date: "May 19, 2026", time: "12:00 PM", location: "Jefferson City, MO", seats: 10 },
  { city: "kansas-city", badge: "csl-badge-gold", badgeLabel: "Annual Summit", title: "CSL Annual Cybersecurity Leadership Summit", desc: "Full day. Keynotes, all 10 domains, board communication masterclass.", date: "September 2026", time: "", location: "Kansas City, MO", seats: 0, flagship: true },
];

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "kansas-city", "st-louis", "springfield", "columbia", "jefferson-city"];
  const filterLabels: Record<string, string> = { all: "All Cities", "kansas-city": "Kansas City", "st-louis": "St. Louis", springfield: "Springfield", columbia: "Columbia", "jefferson-city": "Jefferson City" };

  

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
                <Link
                  to="/register"
                  className="block mt-4 text-center no-underline"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    background: "hsl(var(--orange-bright))",
                    color: "#fff",
                    padding: "12px 0",
                    borderRadius: 4,
                  }}
                >
                  RESERVE YOUR SEAT
                </Link>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Link
              to="/register"
              className="no-underline"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: ".12em",
                textTransform: "uppercase",
                background: "hsl(var(--orange-bright))",
                color: "#fff",
                padding: "14px 36px",
                borderRadius: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              RESERVE YOUR SEAT
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
