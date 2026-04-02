import { useState } from "react";
import CSLLayout from "@/components/CSLLayout";
import { FormRow, FormGroup } from "@/components/CSLComponents";
import CSLForm from "@/components/CSLForm";

const events = [
  { city: "kansas-city", badge: "csl-badge-orange", badgeLabel: "Kansas City", title: "AI Governance & Board Risk", desc: "Domain 8 & 9 — Translating AI risk into boardroom language.", date: "April 17, 2026", time: "6:00 PM", seats: 12 },
  { city: "st-louis", badge: "csl-badge-emerald", badgeLabel: "St. Louis", title: "Identity & Zero Trust Architecture", desc: "Domain 2 — Identity is the new perimeter. Practical Zero Trust implementation strategies.", date: "April 22, 2026", time: "6:00 PM", seats: 14 },
  { city: "springfield", badge: "csl-badge-gold", badgeLabel: "Springfield", title: "K-12 Cybersecurity & SLCGP Grants", desc: "How Missouri school districts can secure federal cybersecurity grants.", date: "April 24, 2026", time: "5:30 PM", seats: 10 },
  { city: "columbia", badge: "csl-badge-blue", badgeLabel: "Columbia", title: "Cloud Security & Hybrid Protection", desc: "Domain 5 — Multi-cloud security posture management.", date: "May 1, 2026", time: "6:00 PM", seats: 10 },
  { city: "jefferson-city", badge: "csl-badge-gold", badgeLabel: "Jefferson City", title: "State Government Cyber Strategy", desc: "Bridging state CISO priorities with private sector leadership.", date: "May 8, 2026", time: "5:30 PM", seats: 10 },
  { city: "kansas-city", badge: "csl-badge-gold", badgeLabel: "Annual Summit", title: "CSL Annual Cybersecurity Leadership Summit", desc: "Full-day event — keynotes, all 10 domains, board communication masterclass.", date: "September 2026", time: "", seats: 0, flagship: true },
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
          <p className="text-sm mt-3 max-w-[540px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Curated, invite-only executive dinners in 5 Missouri cities. Each session is governed by CSL's non-sales rules, led by peers, and aligned to the CSL Cyber Framework.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { color: "var(--gold)", title: "Trusted Room", desc: "No vendors. No pitches. Peer-led only." },
              { color: "var(--orange-bright)", title: "CPE Credits", desc: "Every session earns continuing education." },
              { color: "var(--emerald)", title: "Curated Guests", desc: "Invite-only. 12-18 leaders per table." },
              { color: "#4A90D9", title: "Framework-Aligned", desc: "Topics mapped to CSL 10-Domain Framework." },
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
                <p className="text-sm mt-1" style={{ color: "#E2E8F0" }}>{ev.desc}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{ev.date}</span>
                  {ev.time && <span>{ev.time}</span>}
                </div>
                <a href="#rsvp" className={`csl-btn ${ev.flagship ? "csl-btn-gold" : "csl-btn-primary"} csl-btn-sm csl-btn-block mt-4`}>
                  {ev.flagship ? "Register Interest" : "RSVP Now"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="csl-section" id="rsvp">
        <div className="csl-container" style={{ maxWidth: 580 }}>
          <div className="text-center mb-6">
            <span className="csl-label">RSVP</span>
            <h2 className="mt-3">Reserve Your Seat</h2>
            <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>Quick RSVP — takes 30 seconds. We'll confirm your seat within 24 hours.</p>
            <p className="text-xs mt-1 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
          </div>
          <div className="glass-card p-6">
            <CSLForm formName="event-rsvp" submitLabel="Confirm RSVP" successTitle="You're In" successMessage="Your RSVP has been received. Check your email for confirmation and dinner details.">
              <FormRow>
                <FormGroup label="First Name"><input type="text" className="csl-form-input" required /></FormGroup>
                <FormGroup label="Last Name"><input type="text" className="csl-form-input" required /></FormGroup>
              </FormRow>
              <FormGroup label="Email"><input type="email" className="csl-form-input" required /></FormGroup>
              <FormGroup label="Phone"><input type="tel" className="csl-form-input" /></FormGroup>
              <FormGroup label="Select Event">
                <select className="csl-form-select" required>
                  <option value="">Choose an event...</option>
                  <option>Kansas City — April 17 — AI Governance & Board Risk</option>
                  <option>St. Louis — April 22 — Identity & Zero Trust</option>
                  <option>Springfield — April 24 — K-12 Cybersecurity</option>
                  <option>Columbia — May 1 — Cloud Security</option>
                  <option>Jefferson City — May 8 — State Government Cyber</option>
                  <option>Annual Summit — September 2026</option>
                </select>
              </FormGroup>
              <FormGroup label="Job Title"><input type="text" className="csl-form-input" /></FormGroup>
            </CSLForm>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
