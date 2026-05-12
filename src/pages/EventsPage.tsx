import CSLLayout from "@/components/CSLLayout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";


interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  city: string;
  format?: string;
  seats_remaining?: number;
  description?: string;
  highlights?: string[];
  attire?: string;
  rsvp_note?: string;
  rsvp_disabled?: boolean;
}

/* Static dinner/gathering events (formerly fetched from Supabase events table).
   IDs preserved so existing analytics / form-submission attribution remain consistent. */
const STATIC_DINNER_EVENTS: Event[] = [
  {
    id: "77848a0c-105d-4825-9ad9-33879619de11",
    name: "CSL Gather KC: BBQ",
    date: "Wednesday, June 3, 2026",
    time: "4:00 PM - 7:00 PM CT",
    city: "Kansas City, MO",
    format: "In-person leadership gathering",
    seats_remaining: 100,
    description:
      "A relaxed Kansas City gathering for cyber, AI, education, business, and community leaders to connect before CSL officially launches.",
    highlights: [
      "Cybersecurity, AI, education, business, nonprofit, and community leaders",
      "City Park | Lion's Shelter — 10601 Lee Blvd, Leawood, KS 66206",
      "Good food and meaningful conversation",
      "Meet the early CSL community",
    ],
    attire: "Summer business casual",
    rsvp_note: "RSVP deadline: May 29, 2026 · 100 seats available",
  },
  {
    id: "6817f8c5-a148-49c5-b3cd-e8ae86ddeb38",
    name: "Columbia Peer Lunch",
    date: "Tuesday, June 16",
    time: "12:00 PM CT",
    city: "Columbia, MO",
    format: "City Lunch",
    seats_remaining: 20,
  },
  {
    id: "dd6e04c3-3f03-4fce-9df9-e084dd454d63",
    name: "St. Louis Peer Lunch",
    date: "Wednesday, June 17",
    time: "12:00 PM CT",
    city: "St. Louis, MO",
    format: "City Lunch",
    seats_remaining: 20,
  },
  {
    id: "11163374-1f04-4122-a9c7-233c26bc8ede",
    name: "Jefferson City Lunch",
    date: "Tuesday, June 23",
    time: "12:00 PM CT",
    city: "Jefferson City, MO",
    format: "City Lunch",
    seats_remaining: 20,
  },
  {
    id: "3c0cf3bb-b53b-40bd-b595-1325d508de27",
    name: "Springfield Happy Hour",
    date: "Wednesday, June 24",
    time: "5:00 PM CT",
    city: "Springfield, MO",
    format: "Happy Hour",
    seats_remaining: 20,
  },
];

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

/* ─── Static CSL-Managed Events ─── */
interface ManagedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  topics: string[];
  format: "Virtual" | "In Person" | "Hybrid";
  audience: string;
  price: "Free" | "Paid" | "Invite" | "Member Only";
  cta_label: string;
  description?: string;
  featured?: boolean;
  cta_link?: string;
}

const managedEvents: ManagedEvent[] = [
  {
    id: "csl-webinar-canvas-lessons",
    title: "Canvas Lessons Learned: Protecting Student Identity Requires Institutional Change",
    date: "Tuesday, May 26, 2026",
    time: "11:00 AM CT",
    city: "Virtual",
    topics: ["Cybersecurity", "Education"],
    format: "Virtual",
    audience: "K-12, Higher Ed, IT, Risk, Communications, Boards",
    price: "Free",
    cta_label: "Register Free",
    description:
      "A free CSL leadership webinar helping education leaders understand what to do after a vendor cyber incident — communications, phishing risk, continuity, vendor questions, and board updates.",
    featured: true,
    cta_link: "/webinars/canvas-lessons-learned",
  },
  {
    id: "csl-summit-2025",
    title: "CSL Executive Summit | Midwest",
    date: "Coming Soon",
    time: "TBD",
    city: "Kansas City",
    topics: ["Cybersecurity", "AI Leadership", "Board / Executive"],
    format: "In Person",
    audience: "Senior Leaders / Executives",
    price: "Member Only",
    cta_label: "Request Invitation",
    description: "Annual gathering of CSL members and invited guests for cross-industry collaboration on cyber and AI governance priorities.",
  },
  {
    id: "csl-ciso-roundtable-q3",
    title: "CISO Roundtable | Q3",
    date: "Coming Soon",
    time: "TBD",
    city: "St. Louis",
    topics: ["Cybersecurity", "AI Leadership"],
    format: "Hybrid",
    audience: "CISOs / Security Leaders",
    price: "Free",
    cta_label: "Register Interest",
    description: "Peer-led discussion on emerging threats, AI-augmented defense, and leadership under pressure.",
  },
  {
    id: "csl-board-briefing-ai",
    title: "Board Briefing: AI Governance & Risk",
    date: "Coming Soon",
    time: "TBD",
    city: "Virtual",
    topics: ["AI Leadership", "Board / Executive"],
    format: "Virtual",
    audience: "Boards / Executive Teams",
    price: "Free",
    cta_label: "Register Free",
    description: "Concise briefing for board members on AI governance obligations, regulatory signals, and what to ask management.",
  },
];
/* Public-facing managed events: must be featured and non-private. Featured items are treated as Live. */
const publicManagedEvents = managedEvents.filter(
  (ev) => ev.featured === true && ev.price !== "Member Only"
);

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
  const [dinnerEvents, setDinnerEvents] = useState<Event[]>(STATIC_DINNER_EVENTS);
  const [loading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});

  // Static event source — no remote fetch needed.
  useEffect(() => {
    setDinnerEvents(STATIC_DINNER_EVENTS);
  }, []);

  /* Filter logic */
  const filteredSeries = seriesEvents.filter((ev) => {
    if (filter === "All") return true;
    if (filter === "Virtual") return ev.format === "Virtual";
    if (filter === "In Person") return ev.format === "In Person";
    if (filter === "Technology Leaders") return ev.audience.includes("Technology");
    return ev.topics.includes(filter);
  }).slice().sort((a, b) => {
    const now = Date.now();
    const parse = (d?: string) => {
      if (!d || d === "Coming Soon" || d === "TBD") return NaN;
      const t = Date.parse(d);
      return isNaN(t) ? NaN : t;
    };
    const ta = parse(a.date);
    const tb = parse(b.date);
    const getCategory = (t: number) => {
      if (isNaN(t)) return 1;
      if (t >= now - 86400000) return 0;
      return 2;
    };
    const catA = getCategory(ta);
    const catB = getCategory(tb);
    if (catA !== catB) return catA - catB;
    const aInPerson = a.format === "In Person";
    const bInPerson = b.format === "In Person";
    if (aInPerson !== bInPerson) return aInPerson ? -1 : 1;
    if (!isNaN(ta) && !isNaN(tb)) return ta - tb;
    return 0;
  });

  const filteredDinners = dinnerEvents
    .filter(() => {
      if (filter === "All" || filter === "Cybersecurity" || filter === "In Person") return true;
      return false;
    })
    .slice()
    .sort((a, b) => {
      const now = Date.now();
      const parse = (d?: string) => {
        if (!d || d === "Coming Soon" || d === "TBD") return NaN;
        const t = Date.parse(d);
        return isNaN(t) ? NaN : t;
      };
      const ta = parse(a.date);
      const tb = parse(b.date);
      const getCategory = (t: number) => {
        if (isNaN(t)) return 1;
        if (t >= now - 86400000) return 0;
        return 2;
      };
      const catA = getCategory(ta);
      const catB = getCategory(tb);
      if (catA !== catB) return catA - catB;
      const aInPerson = (a.format || "").toLowerCase() !== "virtual";
      const bInPerson = (b.format || "").toLowerCase() !== "virtual";
      if (aInPerson !== bInPerson) return aInPerson ? -1 : 1;
      if (!isNaN(ta) && !isNaN(tb)) return ta - tb;
      return 0;
    });

  /* CSL-Managed Events: featured items are treated as Live regardless of date.
     Past Events section gets only featured items with a parseable date in the past. */
  const filteredCslEvents = publicManagedEvents
    .filter((ev) => {
      const t = Date.parse(ev.date);
      // Exclude only items that have a real past date; everything else (future or TBD) is Live.
      if (!isNaN(t) && t < Date.now() - 86400000) return false;
      if (filter === "All") return true;
      if (filter === "Virtual") return ev.format === "Virtual";
      if (filter === "In Person") return ev.format === "In Person" || ev.format === "Hybrid";
      if (filter === "Technology Leaders") return ev.audience.includes("Technology");
      return ev.topics.includes(filter);
    })
    .slice()
    .sort((a, b) => {
      const ta = Date.parse(a.date);
      const tb = Date.parse(b.date);
      if (isNaN(ta) && isNaN(tb)) return 0;
      if (isNaN(ta)) return 1;
      if (isNaN(tb)) return -1;
      return ta - tb;
    });

  const filteredCslPast = publicManagedEvents
    .filter((ev) => {
      const t = Date.parse(ev.date);
      return !isNaN(t) && t < Date.now() - 86400000;
    })
    .slice()
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

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

  const openCslModal = (ev: ManagedEvent) => {
    setFormContext({
      request_type: "Event Registration",
      event_id: ev.id,
      event_name: ev.title,
      event_date: ev.date,
      event_time: ev.time,
      event_city: ev.city,
      event_location: ev.city,
      event_format: ev.format,
      source_page: "Events",
      cta_name: ev.cta_label,
    });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* NEWSROOM NOTE */}
      <div className="csl-container pt-4">
        <a href="/newsroom" className="block rounded-lg px-4 py-2.5 text-center text-xs sm:text-sm" style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)", color: "hsl(var(--gold))" }}>
          Select sessions and insights will be featured in the CSL Newsroom. <span className="underline underline-offset-2">Explore →</span>
        </a>
      </div>
      {/* HERO */}
      <section className="csl-section" style={{ paddingBottom: "1.5rem" }}>
        <div className="csl-container">
          <span className="csl-label">Events & Programs</span>
          <h1 className="mt-3 max-w-[640px]">
            CSL{" "}
            <span className="text-gold/70" aria-hidden="true">|</span>{" "}
            <span
              style={{
                fontFamily: "'Forte', 'Lucida Handwriting', 'Brush Script MT', 'Apple Chancery', cursive",
                fontWeight: 700,
                fontStyle: "normal",
                color: "hsl(var(--emerald))",
                fontSize: "1.2em",
                lineHeight: 1,
                paddingLeft: "0.05em",
                paddingRight: "0.05em",
                textShadow:
                  "0 0 1px hsl(var(--emerald)), 0 0 6px rgba(107,197,160,0.55), 0 0 14px rgba(107,197,160,0.35)",
              }}
            >
              Live
            </span>{" "}
            <span className="text-gold">Cybersecurity & AI Leadership Events</span>
          </h1>
          <p className="text-sm mt-3 max-w-[560px] leading-relaxed text-muted-foreground">
            Practitioner-led events across two tracks: Cybersecurity and AI Leadership. Built for leaders navigating cyber risk, AI adoption, and governance in the real world.
          </p>
          <p className="text-xs mt-2 max-w-[560px] leading-relaxed text-muted-foreground opacity-80">
            CSL delivers platform programming across both tracks, with select founder-led sessions from George4 on AI leadership, decision-making, and executive readiness.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pb-4">
        <div className="csl-container">
          <div className="csl-grid csl-grid-4">
            {[
              { title: "Cybersecurity Track", desc: "Peer-led sessions on cyber risk, resilience, leadership, and operational priorities." },
              { title: "AI Leadership Track", desc: "Founder-led and expert-led sessions on AI strategy, adoption, governance, and leadership under pressure." },
              { title: "Virtual & In Person", desc: "Choose the format that fits your team, schedule, and market." },
              { title: "Governance Across Both", desc: "Board, executive, and policy-focused programming connecting cyber and AI decision-making." },
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
          <h2 className="mb-5">Upcoming Events & Programs</h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {topicFilters.map((f) => {
              const trackColor =
                f === "Cybersecurity" ? "hsl(var(--gold))" :
                f === "AI Leadership" ? "hsl(var(--emerald))" :
                undefined;
              return (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                  style={trackColor && filter !== f ? { color: trackColor } : undefined}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Council Dinners (from Supabase) — confirmed dated events shown first */}
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
                <div className="csl-grid csl-grid-2 mb-10">
                  {filteredDinners.map((ev) => {
                    const isFull = ev.seats_remaining === 0;
                    const isDisabled = isFull || ev.rsvp_disabled === true;
                    const badge = cityBadge[ev.city] || "csl-badge-gold";
                    return (
                      <div key={ev.id} className="event-card">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-wrap gap-2">
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
                        <h3 className="font-display leading-snug">{ev.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                          <span>{ev.date}</span>
                          {ev.time && <span>{ev.time}</span>}
                        </div>
                        {ev.description && (
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{ev.description}</p>
                        )}
                        {ev.highlights && ev.highlights.length > 0 && (
                          <div className="mt-3">
                            <p className="text-[0.65rem] font-display font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "hsl(var(--gold))" }}>
                              Event Highlights
                            </p>
                            <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
                              {ev.highlights.map((h) => (
                                <li key={h} className="flex gap-2">
                                  <span style={{ color: "hsl(var(--gold))" }}>•</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {ev.attire && (
                          <p className="text-xs text-muted-foreground mt-3">
                            <span className="font-display font-bold tracking-wider uppercase text-[0.65rem]" style={{ color: "hsl(var(--gold))" }}>Attire:</span>{" "}
                            {ev.attire}
                          </p>
                        )}
                        {ev.rsvp_note && (
                          <p className="text-xs text-muted-foreground mt-2 italic opacity-80">{ev.rsvp_note}</p>
                        )}
                        <button
                          onClick={() => !isDisabled && openDinnerModal(ev)}
                          disabled={isDisabled}
                          className="block w-full mt-4 text-center no-underline disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{
                            fontFamily: "'Barlow Condensed', 'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            background: isDisabled ? "rgba(255,255,255,0.06)" : "hsl(var(--orange-bright))",
                            color: isDisabled ? "#9ba8bb" : "#fff",
                            padding: "12px 0",
                            borderRadius: 4,
                            border: "none",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                          }}
                        >
                          {isFull
                            ? "EVENT FULL"
                            : ev.rsvp_disabled
                            ? "RSVP — COMING SOON"
                            : "RESERVE YOUR SEAT"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : null}

          {/* CSL Events — Live (dated) CSL-managed programming */}
          {filteredCslEvents.length > 0 && (
            <>
              <h3 className="text-sm font-display font-bold tracking-[0.1em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>
                CSL Events
              </h3>
              <div className="csl-grid csl-grid-2 mb-10">
                {filteredCslEvents.map((ev) => {
                  const { title, subtitle } = splitTitle(ev.title);
                  const fmtBadge = ev.format === "Hybrid" ? "csl-badge-gold" : formatBadge[ev.format];
                  const cBadge = cityBadge[ev.city] || "csl-badge-gold";
                  const priceClass =
                    ev.price === "Member Only" ? "csl-badge-gold" : priceBadge[ev.price];
                  return (
                    <div key={ev.id} className="event-card">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`csl-badge ${cBadge}`}>{ev.city}</span>
                        <span className={`csl-badge ${fmtBadge}`}>{ev.format}</span>
                        <span className={`csl-badge ${priceClass}`}>{ev.price}</span>
                      </div>
                      <h3 className="font-display text-base leading-snug">{title}</h3>
                      {subtitle && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>}
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{ev.date}</span>
                        {ev.time && ev.time !== "TBD" && <span>{ev.time}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 opacity-70">{ev.audience}</p>
                      {ev.description && (
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{ev.description}</p>
                      )}
                      {ev.cta_link ? (
                        <Link
                          to={ev.cta_link}
                          className="block w-full mt-4 text-center no-underline"
                          style={{
                            fontFamily: "'Barlow Condensed', 'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            background: "hsl(var(--orange-bright))",
                            color: "#fff",
                            padding: "12px 0",
                            borderRadius: 4,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {ev.cta_label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => openCslModal(ev)}
                          className="block w-full mt-4 text-center no-underline"
                          style={{
                            fontFamily: "'Barlow Condensed', 'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            background: "hsl(var(--orange-bright))",
                            color: "#fff",
                            padding: "12px 0",
                            borderRadius: 4,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {ev.cta_label}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* George4 Series Events — TBD/placeholder programs shown after confirmed events */}
          {filteredSeries.length > 0 && (
            <>
              <h3 className="text-sm font-display font-bold tracking-[0.1em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>
                Featured Founder Series | AI Leadership with George4
              </h3>
              <div className="csl-grid csl-grid-2 mb-8">
                {filteredSeries.map((ev) => {
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
                  })}
              </div>
            </>
          )}

          {filteredSeries.length === 0 && filteredDinners.length === 0 && !loading && (
            <div className="text-center py-12 text-muted-foreground">No events match this filter.</div>
          )}
        </div>
      </section>

      {/* PAST EVENTS — only render if there are past CSL events */}
      {filteredCslPast.length > 0 && (
        <section className="csl-section" style={{ padding: "2.5rem 0" }}>
          <div className="csl-container">
            <h2 className="mb-5">Past Events</h2>
            <div className="csl-grid csl-grid-2">
              {filteredCslPast.map((ev) => {
                const { title, subtitle } = splitTitle(ev.title);
                const fmtBadge = ev.format === "Hybrid" ? "csl-badge-gold" : formatBadge[ev.format];
                const cBadge = cityBadge[ev.city] || "csl-badge-gold";
                return (
                  <div key={ev.id} className="event-card opacity-80">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`csl-badge ${cBadge}`}>{ev.city}</span>
                      <span className={`csl-badge ${fmtBadge}`}>{ev.format}</span>
                      <span className="csl-badge csl-badge-gold">Past</span>
                    </div>
                    <h3 className="font-display text-base leading-snug">{title}</h3>
                    {subtitle && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>}
                    <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                      <span>{ev.date}</span>
                      {ev.time && ev.time !== "TBD" && <span>{ev.time}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 opacity-70">{ev.audience}</p>
                    {ev.description && (
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{ev.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONVERSION SECTION */}
      <section className="csl-section" id="rsvp">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <span className="csl-label">Next Steps</span>
          <h2 className="mt-3">Every path leads to better decisions.</h2>
          <p className="text-sm mt-2 text-muted-foreground">Choose the path that fits your organization.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Link to="/membership" className="csl-btn csl-btn-primary">Explore Membership</Link>
            <Link to="/book?source=events" className="csl-btn csl-btn-gold">Book a 20-Minute Strategy Call</Link>
            <Link to="/george4-series" className="csl-btn csl-btn-outline">Learn About the George4 Series</Link>
          </div>
          <p className="text-xs mt-4 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant="event" />
    </CSLLayout>
  );
}
