import CSLLayout from "@/components/CSLLayout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const SUPABASE_URL = "https://oursmnzsgwjfiejppxac.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  city: string;
  format?: string;
  seats_remaining?: number;
}

const cityBadge: Record<string, string> = {
  "Kansas City": "csl-badge-orange",
  "St. Louis": "csl-badge-emerald",
  "Columbia": "csl-badge-blue",
  "Springfield": "csl-badge-gold",
  "Jefferson City": "csl-badge-gold",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/events?status=eq.active&order=sort_order.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const cities = Array.from(new Set(events.map((e) => e.city))).filter(Boolean);
  const filters = ["all", ...cities];
  const filtered = events.filter((e) => filter === "all" || e.city === filter);

  const openEventModal = (ev: Event) => {
    setFormContext({
      request_type: "Event Registration",
      event_id: ev.id,
      event_name: ev.name,
      event_date: ev.date,
      event_time: ev.time,
      event_city: ev.city,
      event_location: ev.city,
      event_format: ev.format || "",
      source_page: "Events",
      cta_name: "Reserve Your Seat",
    });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      <section className="csl-section" style={{ paddingBottom: "1.5rem" }}>
        <div className="csl-container">
          <span className="csl-label">Executive Dinners</span>
          <h1 className="mt-3 max-w-[600px]">Monthly City <span className="text-gold">Council Sessions</span></h1>
          <p className="text-sm mt-3 max-w-[540px] leading-relaxed text-muted-foreground">
            Private, invite-only dinners across Missouri cities. No sales pitches. Peer-led. Every session maps to the CSL Framework and earns CPE credits.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-4">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { title: "Trusted Room", desc: "No vendors. No pitches. Peer-led only." },
              { title: "CPE Credits", desc: "Every session counts." },
              { title: "Small Tables", desc: "Invite-only. 12-18 leaders max." },
              { title: "Framework-Aligned", desc: "Topics tied to the 10-Domain Framework." },
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
      <section className="csl-section-dark" style={{ padding: "2.5rem 0 3.5rem" }}>
        <div className="csl-container">
          <h2 className="mb-4">Upcoming Dinners</h2>

          {cities.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All Cities" : f}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading events...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No active events at this time.</div>
          ) : (
            <div className="csl-grid csl-grid-2">
              {filtered.map((ev) => {
                const isFull = ev.seats_remaining === 0;
                const badge = cityBadge[ev.city] || "csl-badge-gold";
                return (
                  <div key={ev.id} className="event-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`csl-badge ${badge}`}>{ev.city}</span>
                      {isFull ? (
                        <span className="text-xs font-display font-bold tracking-wider uppercase" style={{ color: "hsl(0 70% 60%)" }}>Event Full</span>
                      ) : ev.seats_remaining != null ? (
                        <span className="text-xs text-muted-foreground">{ev.seats_remaining} seats</span>
                      ) : null}
                    </div>
                    <h3 className="font-display">{ev.name}</h3>
                    <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                      <span>{ev.date}</span>
                      {ev.time && <span>{ev.time}</span>}
                    </div>
                    <button
                      onClick={() => openEventModal(ev)}
                      disabled={isFull}
                      className="block w-full mt-4 text-center no-underline disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        background: isFull ? "rgba(255,255,255,0.06)" : "hsl(var(--orange-bright))",
                        color: isFull ? "#9ba8bb" : "#fff",
                        padding: "12px 0",
                        borderRadius: 4,
                        border: "none",
                        cursor: isFull ? "not-allowed" : "pointer",
                      }}
                    >
                      {isFull ? "EVENT FULL" : "RESERVE YOUR SEAT"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
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

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="event" />
    </CSLLayout>
  );
}
