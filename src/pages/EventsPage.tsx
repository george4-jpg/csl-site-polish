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

/* ─── Static George4 Series Events ─── */
interface SeriesEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  topics: string[];
  format: "Virtual" | "In Person";
  audience: string;
  price: "Free" | "Paid" | "Invite";
}

const seriesEvents: SeriesEvent[] = [
  {
    id: "g4-webinar-1",
    title: "AI for Technology Leaders: What Matters, What Doesn't, and What to Do Next",
    date: "Coming Soon",
    time: "TBD",
    topics: ["AI Leadership"],
    format: "Virtual",
    audience: "Technology Leaders",
    price: "Free",
  },
  {
    id: "g4-webinar-2",
    title: "Board-Level AI & Cyber Governance: What Leaders Need to Know Now",
    date: "Coming Soon",
    time: "TBD",
    topics: ["Board / Executive", "Cybersecurity", "AI Leadership"],
    format: "Virtual",
    audience: "Boards / Executive Teams",
    price: "Free",
  },
  {
    id: "g4-webinar-3",
    title: "AI for Cyber Executives: Readiness, Risk, and Leadership in a Fast-Moving Market",
    date: "Coming Soon",
    time: "TBD",
    topics: ["Cybersecurity", "AI Leadership"],
    format: "Virtual",
    audience: "Cyber Executives",
    price: "Free",
  },
  {
    id: "g4-class-1",
    title: "Applied AI for Technology Leaders | Intro 1",
    date: "Coming Soon",
    time: "TBD",
    topics: ["AI Leadership"],
    format: "Virtual",
    audience: "Technology Leaders",
    price: "Paid",
  },
  {
    id: "g4-class-2",
    title: "Cyber Executive AI Series | Intro 1",
    date: "Coming Soon",
    time: "TBD",
    topics: ["Cybersecurity", "AI Leadership"],
    format: "Virtual",
    audience: "Cyber Executives",
    price: "Paid",
  },
  {
    id: "g4-class-3",
    title: "Executive Risk & Board Governance | Intro 1",
    date: "Coming Soon",
    time: "TBD",
    topics: ["Board / Executive"],
    format: "Virtual",
    audience: "Boards / Executive Teams",
    price: "Paid",
  },
  {
    id: "g4-roundtable",
    title: "Executive AI Roundtable with George4",
    date: "Coming Soon",
    time: "TBD",
    topics: ["AI Leadership", "Board / Executive"],
    format: "In Person",
    audience: "Senior Leaders / Executives",
    price: "Invite",
  },
];

const topicFilters = ["All", "Cybersecurity", "AI Leadership", "Board / Executive", "Technology Leaders", "Virtual", "In Person"];

/* Split long titles into title + subtitle at colon */
function splitTitle(full: string): { title: string; subtitle?: string } {
  const sep = full.indexOf(":");
  if (sep > 0 && sep < full.length - 1) return { title: full.slice(0, sep).trim(), subtitle: full.slice(sep + 1).trim() };
  const pipe = full.indexOf("|");
  if (pipe > 0 && pipe < full.length - 1) return { title: full.slice(0, pipe).trim(), subtitle: full.slice(pipe + 1).trim() };
  return { title: full };
}

const priceBadge: Record<string, string> = {
  Free: "csl-badge-emerald",
  Paid: "csl-badge-orange",
  Invite: "csl-badge-gold",
};

const formatBadge: Record<string, string> = {
  Virtual: "csl-badge-blue",
  "In Person": "csl-badge-orange",
};

const cityBadge: Record<string, string> = {
  "Kansas City": "csl-badge-orange",
  "St. Louis": "csl-badge-emerald",
  "Columbia": "csl-badge-blue",
  "Springfield": "csl-badge-gold",
  "Jefferson City": "csl-badge-gold",
};

export default function EventsPage() {
  const [dinnerEvents, setDinnerEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
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
        setDinnerEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* Filter logic */
  const filteredSeries = seriesEvents.filter((ev) => {
    if (filter === "All") return true;
    if (filter === "Virtual") return ev.format === "Virtual";
    if (filter === "In Person") return ev.format === "In Person";
    if (filter === "Technology Leaders") return ev.audience.includes("Technology");
    return ev.topics.includes(filter);
  });

  const filteredDinners = dinnerEvents.filter(() => {
    if (filter === "All" || filter === "Cybersecurity" || filter === "In Person") return true;
    return false;
  });

  const openDinnerModal = (ev: Event) => {
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

  const openSeriesModal = (ev: SeriesEvent) => {
    setFormContext({
      request_type: "Event Registration",
      event_id: ev.id,
      event_name: ev.title,
      event_date: ev.date,
      event_time: ev.time,
      event_format: ev.format,
      source_page: "Events",
      cta_name: ev.price === "Free" ? "Register for Free Briefing" : "Reserve Your Seat",
    });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section" style={{ paddingBottom: "1.5rem" }}>
        <div className="csl-container">
          <span className="csl-label">Events & Programs</span>
          <h1 className="mt-3 max-w-[640px]">George4 | <span className="text-gold">AI Leadership Series</span></h1>
          <p className="text-sm mt-3 max-w-[560px] leading-relaxed text-muted-foreground">
            Free briefings, paid classes, executive roundtables, and private dinners. Every session is practitioner-led, framework-aligned, and built for leaders who need clarity, not noise.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-4">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { title: "Practitioner-Led", desc: "No vendors. No pitches. Real operators." },
              { title: "CPE Credits", desc: "Every qualifying session counts." },
              { title: "Virtual & In Person", desc: "Choose the format that fits." },
              { title: "Framework-Aligned", desc: "Topics tied to real governance outcomes." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <h4 className="font-display text-sm mt-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS + EVENTS */}
      <section className="csl-section-dark" style={{ padding: "2.5rem 0 3.5rem" }}>
        <div className="csl-container">
          <h2 className="mb-4">Upcoming Events & Programs</h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {topicFilters.map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* George4 Series Events */}
          {filteredSeries.length > 0 && (
            <>
              <h3 className="text-lg font-display font-bold tracking-wide mb-4" style={{ color: "hsl(var(--emerald))" }}>
                AI Leadership
              </h3>
              <div className="csl-grid csl-grid-2 mb-8">
                {filteredSeries.map((ev) => (
                  {(() => {
                    const { title, subtitle } = splitTitle(ev.title);
                    const isComingSoon = ev.date === "Coming Soon";
                    const topicBadgeClass = (t: string) =>
                      t === "AI Leadership" ? "csl-badge csl-badge-green" : "csl-badge csl-badge-gold";
                    return (
                      <div key={ev.id} className="event-card">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {ev.topics.map((t) => (
                            <span key={t} className={topicBadgeClass(t)}>{t}</span>
                          ))}
                          <span className={`csl-badge ${formatBadge[ev.format]}`}>{ev.format}</span>
                          <span className={`csl-badge ${priceBadge[ev.price]}`}>{ev.price}</span>
                        </div>
                        <h3 className="font-display text-base leading-snug">{title}</h3>
                        {subtitle && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>}
                        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                          <span>{ev.date}</span>
                          {ev.time !== "TBD" && <span>{ev.time}</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 opacity-70">{ev.audience}</p>
                        <button
                          onClick={() => openSeriesModal(ev)}
                          className="block w-full mt-4 text-center no-underline"
                          style={{
                            fontFamily: "'Barlow Condensed', 'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            background: isComingSoon
                              ? "rgba(107,197,160,0.15)"
                              : ev.price === "Invite"
                              ? "rgba(196,155,47,0.2)"
                              : "hsl(var(--orange-bright))",
                            color: isComingSoon
                              ? "hsl(var(--emerald))"
                              : ev.price === "Invite"
                              ? "#C49B2F"
                              : "#fff",
                            padding: "12px 0",
                            borderRadius: 4,
                            border: isComingSoon
                              ? "1px solid rgba(107,197,160,0.2)"
                              : ev.price === "Invite"
                              ? "1px solid rgba(196,155,47,0.3)"
                              : "none",
                            cursor: "pointer",
                          }}
                        >
                          {isComingSoon
                            ? "GET NOTIFIED"
                            : ev.price === "Free"
                            ? "REGISTER FREE"
                            : ev.price === "Invite"
                            ? "REQUEST INVITATION"
                            : "RESERVE YOUR SEAT"}
                        </button>
                      </div>
                    );
                  })()}
                ))}
              </div>
            </>
          )}

          {/* Council Dinners (from Supabase) */}
          {filteredDinners.length > 0 || loading ? (
            <>
              <h3 className="text-sm font-display font-bold tracking-[0.1em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>
                Executive Council Dinners
              </h3>
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading events...</div>
              ) : filteredDinners.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No active dinners at this time.</div>
              ) : (
                <div className="csl-grid csl-grid-2">
                  {filteredDinners.map((ev) => {
                    const isFull = ev.seats_remaining === 0;
                    const badge = cityBadge[ev.city] || "csl-badge-gold";
                    return (
                      <div key={ev.id} className="event-card">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex gap-2">
                            <span className={`csl-badge ${badge}`}>{ev.city}</span>
                            <span className="csl-badge csl-badge-orange">In Person</span>
                            <span className="csl-badge csl-badge-gold">Cybersecurity</span>
                          </div>
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
                          onClick={() => openDinnerModal(ev)}
                          disabled={isFull}
                          className="block w-full mt-4 text-center no-underline disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            fontFamily: "'Barlow Condensed', 'Outfit', sans-serif",
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
            </>
          ) : null}

          {filteredSeries.length === 0 && filteredDinners.length === 0 && !loading && (
            <div className="text-center py-12 text-muted-foreground">No events match this filter.</div>
          )}
        </div>
      </section>

      {/* CONVERSION SECTION */}
      <section className="csl-section" id="rsvp">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <span className="csl-label">Next Steps</span>
          <h2 className="mt-3">Every path leads to better decisions.</h2>
          <p className="text-sm mt-2 text-muted-foreground">Choose the path that fits your organization.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Link to="/membership" className="csl-btn csl-btn-primary">Explore Membership</Link>
            <Link to="/book" className="csl-btn csl-btn-gold">Book a 20-Minute Strategy Call</Link>
            <Link to="/george4-series" className="csl-btn csl-btn-outline">Learn About the George4 Series</Link>
          </div>
          <p className="text-xs mt-4 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="event" />
    </CSLLayout>
  );
}
