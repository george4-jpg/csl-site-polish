import { useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const EVENT_ID = "csl-gather-samer-canvas";
const EVENT_NAME = "Samer Canvas Leadership Event";
// TODO: Set final date, time, and location when confirmed.
const EVENT_DATE = "Date to be announced";
const EVENT_TIME = "Time to be announced";
const EVENT_LOCATION = "Location to be announced";

export default function SamerCanvasGatherPage() {
  const [formOpen, setFormOpen] = useState(false);

  const context: FormContext = {
    request_type: "Event Registration",
    event_id: EVENT_ID,
    event_name: EVENT_NAME,
    event_date: EVENT_DATE,
    event_time: EVENT_TIME,
    event_city: "TBA",
    event_location: EVENT_LOCATION,
    event_format: "CSL Gather",
    source_page: "CSL Gather | Samer Canvas",
    cta_name: "Register for the Samer Canvas Event",
    campaign: "csl-gather-samer-canvas",
  };

  const open = () => setFormOpen(true);

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section" style={{ paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="csl-badge csl-badge-emerald">CSL Gather</span>
            <span className="csl-badge csl-badge-gold">Leadership Event</span>
            <span className="csl-badge csl-badge-blue">Invitation</span>
          </div>
          <span className="csl-label">CSL Gather</span>
          <h1 className="mt-3 leading-tight">
            CSL Gather:{" "}
            <span className="text-gold">Samer Canvas Leadership Event</span>
          </h1>
          <p className="text-sm sm:text-base mt-4 leading-relaxed text-muted-foreground">
            A practical leadership conversation on Canvas, AI, cybersecurity, education, and the future
            of how organizations work.
          </p>
          <p className="text-sm sm:text-base mt-3 leading-relaxed text-muted-foreground">
            Join Cyber Security Leadership for a focused gathering featuring Samer and a leadership
            discussion around how Canvas, AI, cybersecurity, and new operating models are changing how
            organizations lead, protect, educate, and grow.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={open}
              className="csl-btn csl-btn-primary"
              style={{ width: "100%", maxWidth: 360 }}
            >
              Register for the Samer Canvas Event
            </button>
            <Link
              to="/"
              className="csl-btn csl-btn-secondary inline-flex items-center justify-center"
              style={{ width: "100%", maxWidth: 200 }}
            >
              Browse CSL
            </Link>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="csl-section-dark" style={{ padding: "2.5rem 0" }}>
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <h2 className="font-display text-xl sm:text-2xl" style={{ color: "hsl(var(--gold))" }}>
              Why This Gathering Matters
            </h2>
            <p>
              AI and cybersecurity are moving faster than most organizations can operationalize. This
              CSL Gather session creates space for leaders to step out of the noise and talk through
              what is real, what is risky, and what deserves action.
            </p>
          </div>

          <div className="csl-grid csl-grid-2 mt-10 gap-6">
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>
                Who Should Attend
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "Executives and business leaders",
                  "Cybersecurity and technology leaders",
                  "Education and nonprofit leaders",
                  "Government and public-sector leaders",
                  "Partners and advisors helping organizations navigate AI, Canvas, and cyber risk",
                ].map((b) => (
                  <li key={b} className="flex gap-2">
                    <span style={{ color: "hsl(var(--gold))" }}>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display text-base mb-3" style={{ color: "hsl(var(--gold))" }}>
                What We'll Discuss
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  "What leaders need to understand about Canvas and AI adoption",
                  "Where cybersecurity and AI risk are converging",
                  "How organizations can train people instead of simply chasing tools",
                  "What practical leadership models are needed next",
                  "How CSL is building a trusted leadership community around these issues",
                ].map((b) => (
                  <li key={b} className="flex gap-2">
                    <span style={{ color: "hsl(var(--gold))" }}>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RESERVE */}
          <div className="mt-12 glass-card p-6 text-center">
            <h2 className="font-display text-xl sm:text-2xl" style={{ color: "hsl(var(--gold))" }}>
              Reserve Your Spot
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Space is intentionally limited so the conversation stays practical, relevant, and
              relationship-driven.
            </p>
            <div className="mt-5 flex justify-center">
              <button
                onClick={open}
                className="csl-btn csl-btn-primary"
                style={{ width: "100%", maxWidth: 320 }}
              >
                Register Now
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Thank you. Your request will be received and we will follow up with event details and confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORE CSL */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <h2 className="font-display text-xl sm:text-2xl text-center" style={{ color: "hsl(var(--gold))" }}>
            Explore Cyber Security Leadership
          </h2>
          <p className="text-sm text-muted-foreground text-center mt-3 leading-relaxed">
            After registering, you can browse CSL's leadership framework, events, membership, and
            strategic initiatives.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="csl-btn csl-btn-secondary text-center">Visit CSL Home</Link>
            <Link to="/events" className="csl-btn csl-btn-secondary text-center">Explore Events</Link>
            <Link to="/membership" className="csl-btn csl-btn-secondary text-center">Learn About Membership</Link>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Questions?{" "}
              <a href="mailto:events@cybersecurity-leadership.org" className="text-gold">
                events@cybersecurity-leadership.org
              </a>
            </p>
          </div>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={context} variant="event" />
    </CSLLayout>
  );
}
