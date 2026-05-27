import { useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const EVENT_ID = "77848a0c-105d-4825-9ad9-33879619de11";
const EVENT_NAME = "CSL Gather KC: Launch Cookout";
const EVENT_DATE = "Wednesday, June 3, 2026";
const EVENT_TIME = "4:00 PM - 7:00 PM CT";
const EVENT_LOCATION = "City Park | Lion's Shelter — 10601 Lee Blvd, Leawood, KS 66206";

export default function KCGatherCookoutPage() {
  const [formOpen, setFormOpen] = useState(false);

  const context: FormContext = {
    request_type: "Event Registration",
    event_id: EVENT_ID,
    event_name: EVENT_NAME,
    event_date: EVENT_DATE,
    event_time: EVENT_TIME,
    event_city: "Kansas City, MO",
    event_location: EVENT_LOCATION,
    event_format: "In-person leadership gathering",
    source_page: "CSL Gather KC | Launch Cookout",
    cta_name: "RSVP Now",
    campaign: "csl-gather-kc-launch-cookout",
  };

  const open = () => setFormOpen(true);

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section" style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="csl-badge csl-badge-emerald">CSL Gather</span>
            <span className="csl-badge csl-badge-orange">In Person</span>
            <span className="csl-badge csl-badge-gold">Kansas City</span>
          </div>
          <span className="csl-label">CSL Leadership Gathering</span>
          <h1 className="mt-3 leading-tight">
            CSL Gather KC: <span className="text-gold">Launch Cookout</span>
          </h1>
          <p className="text-sm sm:text-base mt-4 leading-relaxed text-muted-foreground">
            A relaxed Kansas City gathering for cyber, AI, education, business, and community leaders to
            connect before CSL officially launches.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm">
            <span><strong className="text-gold">Date:</strong> {EVENT_DATE}</span>
            <span><strong className="text-gold">Time:</strong> {EVENT_TIME}</span>
            <span><strong className="text-gold">Format:</strong> In Person</span>
          </div>
          <p className="text-sm mt-3 leading-relaxed">
            <strong className="text-gold">Location:</strong>{" "}
            <span className="text-muted-foreground">{EVENT_LOCATION}</span>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={open}
              className="csl-btn csl-btn-primary"
              style={{ width: "100%", maxWidth: 320 }}
            >
              RSVP Now
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic opacity-80">
            RSVP deadline: June 1, 2026 · 50 seats available
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="csl-section-dark" style={{ padding: "2.5rem 0" }}>
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p>
              Before CSL officially launches, we are gathering the early Kansas City community for an
              evening of good food and meaningful conversation.
            </p>
            <p>
              This is a relaxed, in-person setting to meet the leaders shaping the cyber, AI, education,
              business, and civic conversation across the region.
            </p>
          </div>

          <div className="csl-grid csl-grid-3 mt-10 gap-6">
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>Event Highlights</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "Cybersecurity, AI, education, business, nonprofit, and community leaders",
                  "City Park | Lion's Shelter — 10601 Lee Blvd, Leawood, KS 66206",
                  "Good food and meaningful conversation",
                  "Meet the early CSL community",
                ].map((b) => (
                  <li key={b} className="flex gap-2"><span style={{ color: "hsl(var(--gold))" }}>•</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>Who Should Attend</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "Cybersecurity leaders",
                  "AI and technology leaders",
                  "Education leaders",
                  "Business and nonprofit leaders",
                  "Civic and community leaders",
                ].map((b) => (
                  <li key={b} className="flex gap-2"><span style={{ color: "hsl(var(--gold))" }}>•</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>Event Details</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <li><strong className="text-gold">Date:</strong> {EVENT_DATE}</li>
                <li><strong className="text-gold">Time:</strong> {EVENT_TIME}</li>
                <li><strong className="text-gold">Attire:</strong> Summer business casual</li>
                <li><strong className="text-gold">Seats:</strong> 50 available</li>
                <li><strong className="text-gold">RSVP by:</strong> June 1, 2026</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={open}
              className="csl-btn csl-btn-primary"
              style={{ width: "100%", maxWidth: 320 }}
            >
              RSVP Now
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              No login. No payment. Confirmation and details will be sent after you RSVP.
            </p>
          </div>
        </div>
      </section>

      <section className="csl-section">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <p className="text-xs text-muted-foreground">
            Questions? <a href="mailto:events@cybersecurity-leadership.org" className="text-gold">events@cybersecurity-leadership.org</a>
          </p>
          <div className="mt-3">
            <Link to="/events" className="text-xs text-muted-foreground underline underline-offset-2">← Back to all CSL events</Link>
          </div>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={context} variant="event" />
    </CSLLayout>
  );
}
