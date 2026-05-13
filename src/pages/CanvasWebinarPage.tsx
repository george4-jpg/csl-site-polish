import { useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const EVENT_ID = "csl-webinar-canvas-lessons";
const EVENT_NAME = "Canvas Lessons Learned Webinar";
const EVENT_DATE = "Tuesday, May 26, 2026";
const EVENT_TIME = "11:00 AM CT";

export default function CanvasWebinarPage() {
  const [formOpen, setFormOpen] = useState(false);

  const context: FormContext = {
    request_type: "Webinar Registration",
    event_id: EVENT_ID,
    event_name: EVENT_NAME,
    event_date: EVENT_DATE,
    event_time: EVENT_TIME,
    event_city: "Virtual",
    event_location: "Virtual (link sent before webinar)",
    event_format: "Virtual",
    source_page: "Canvas Lessons Learned Webinar",
    cta_name: "Register Free",
    campaign: "canvas-lessons-learned",
  };

  const open = () => setFormOpen(true);

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section" style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="csl-badge csl-badge-emerald">Free Webinar</span>
            <span className="csl-badge csl-badge-blue">Virtual</span>
            <span className="csl-badge csl-badge-gold">Education Cybersecurity</span>
          </div>
          <span className="csl-label">CSL Leadership Webinar</span>
          <h1 className="mt-3 leading-tight">
            Canvas Lessons Learned:{" "}
            <span className="text-gold">Protecting Student Identity Requires Institutional Change</span>
          </h1>
          <p className="text-sm sm:text-base mt-4 leading-relaxed text-muted-foreground">
            A free CSL leadership conversation on what the Canvas incident teaches us about student privacy,
            vendor risk, public trust, and the changes education leaders can make before the next crisis.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm">
            <span><strong className="text-gold">Date:</strong> {EVENT_DATE}</span>
            <span><strong className="text-gold">Time:</strong> {EVENT_TIME}</span>
            <span><strong className="text-gold">Format:</strong> Free Webinar</span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={open}
              className="csl-btn csl-btn-primary"
              style={{ width: "100%", maxWidth: 320 }}
            >
              Register Free
            </button>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="csl-section-dark" style={{ padding: "2.5rem 0" }}>
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p>
              The Canvas/Instructure cybersecurity incident is not just a vendor issue. It is a leadership signal.
            </p>
            <p>
              When student identities, family trust, school operations, and institutional credibility are at risk,
              education leaders need more than a technical response. They need a better way to think, communicate,
              prepare, and govern vendor risk.
            </p>
            <p>
              CSL is hosting a free leadership conversation on the lessons learned from Canvas and the institutional
              changes schools, universities, and boards should consider now.
            </p>
          </div>

          <div className="csl-grid csl-grid-3 mt-10 gap-6">
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>What You'll Learn</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "What leaders should know about the Canvas incident",
                  "How to communicate clearly during a vendor cyber event",
                  "What questions to ask vendors after an incident",
                  "How to reduce phishing and account risk",
                  "How to prepare academic continuity plans",
                  "What to brief boards and executives on",
                ].map((b) => (
                  <li key={b} className="flex gap-2"><span style={{ color: "hsl(var(--gold))" }}>•</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>Best For</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "Superintendents",
                  "CIOs / CISOs",
                  "IT Directors",
                  "Academic technology leaders",
                  "Provosts",
                  "Risk and compliance leaders",
                  "Communications teams",
                  "Board members",
                ].map((b) => (
                  <li key={b} className="flex gap-2"><span style={{ color: "hsl(var(--gold))" }}>•</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>Agenda</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "What happened and what we know so far",
                  "Why vendor cyber incidents become leadership events",
                  "Immediate action checklist for schools and universities",
                  "Communications, phishing, continuity, and board updates",
                  "Discuss strategies for strategic partners and risk mitigation",
                  "Q&A and next steps",
                ].map((b) => (
                  <li key={b} className="flex gap-2"><span style={{ color: "hsl(var(--gold))" }}>•</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={open}
              className="csl-btn csl-btn-primary"
              style={{ width: "100%", maxWidth: 320 }}
            >
              Register Free
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              No login. No payment. Webinar access details will be sent before the event.
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
