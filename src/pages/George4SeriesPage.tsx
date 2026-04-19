import { useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";
import G4_PHOTO from "@/assets/george4.jpeg";

const tracks = [
  {
    title: "Applied AI for Technology Leaders",
    audience: "Technology Leaders",
    sessions: [
      "Intro 1: What Matters, What Doesn't, and What to Do Next",
      "Intro 2: Building Internal AI Readiness",
      "Advanced Series: Strategic Implementation and Governance",
    ],
  },
  {
    title: "Cyber Executive AI Series",
    audience: "Cyber Executives",
    sessions: [
      "Intro 1: Readiness, Risk, and Leadership in a Fast-Moving Market",
      "Intro 2: From Experimentation to Execution",
      "Advanced Series: Operationalizing AI in Security Programs",
    ],
  },
  {
    title: "Executive Risk & Board Governance Series",
    audience: "Boards / Executive Teams",
    sessions: [
      "Intro 1: What Leaders Need to Know Now",
      "Intro 2: Governance Frameworks and Board Communication",
      "Advanced Series: Policy, Oversight, and Responsible Adoption",
    ],
  },
];

const engagementBullets = [
  "Board and executive briefings",
  "Leadership workshops",
  "AI readiness and governance discussions",
  "Policy and oversight support",
  "Custom advisory engagements",
];

export default function George4SeriesPage() {
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideContext] = useState<FormContext>({
    request_type: "Executive Guide Request",
    source_page: "George4 Series",
    cta_name: "Request the Executive Guide",
  });

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "#002046", minHeight: "70vh" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(196,155,47,0.1) 0%, transparent 60%)" }} />
        <div className="csl-container relative py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: "#C49B2F" }}>
                George4 | AI Leadership Series
              </span>
              <h1 className="mt-5" style={{ color: "#FAF8F3", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900, lineHeight: 1.12, fontFamily: "'Outfit', sans-serif" }}>
                AI is moving faster than most leadership teams can govern it.
              </h1>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "#F5EDD4" }}>
                Most people use AI like a tool. George4 thinks in systems. He helps boards, cyber executives, and technology leaders turn AI into clearer decisions, stronger governance, and real-world execution.
              </p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
                A practical learning and leadership series from Cyber Security Leadership focused on strategic AI architecture, orchestrated intelligence systems, and governance that goes beyond basic usage policy.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/events" className="csl-btn csl-btn-primary">Register for a Free Briefing</Link>
                <Link to="/book?source=george4-series-hero" className="csl-btn" style={{ background: "#C49B2F", color: "#002046" }}>Book a 20-Minute Strategy Call</Link>
                <Link to="/membership" className="csl-btn csl-btn-outline">Explore Membership</Link>
                <button onClick={() => setGuideOpen(true)} className="csl-btn csl-btn-outline">
                  Request the Executive Guide
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden flex-shrink-0" style={{ border: "4px solid #C49B2F", boxShadow: "0 0 40px rgba(196,155,47,0.2)" }}>
                <img src={G4_PHOTO} alt="George4 | AI Leadership Series" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-sm font-bold tracking-[0.1em] uppercase" style={{ color: "#C49B2F" }}>George4</span>
              <p className="text-xs text-center max-w-[280px]" style={{ color: "#CBD5E1" }}>
                Cybersecurity Leader. AI Strategy Architect. 30+ Years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section style={{ background: "#FAF8F3" }} className="py-16 lg:py-20">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(22 75% 45%)" }}>About George4</span>
          <h2 className="mt-4" style={{ color: "#002046", fontWeight: 800 }}>Practitioner. Architect. Operator.</h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed" style={{ color: "#334155" }}>
            <p>
              George4 is a cybersecurity leader and strategic advisor who has spent his career helping organizations navigate risk, technology, and leadership at scale.
            </p>
            <p>
              His background spans leadership roles across HP, HP Enterprise Services, Lenovo, SHI, Proofpoint, and Armis, across enterprise, public sector, and critical infrastructure.
            </p>
            <p>
              Today, his work is focused on strategic AI architecture, multi-model orchestration, and coordinated intelligence systems built for real organizational environments. Most of the market is still experimenting. George4 is building practical operating systems for how leaders govern, validate, and apply AI.
            </p>
            <p>
              He is shaping a next-generation approach to AI governance that goes well beyond usage policy, one built for coordinated agents, human authority, checks and balances, and controlled execution.
            </p>
            <p>
              George4 helps boards, executives, CIOs, CISOs, and technology leaders cut through noise, assess organizational readiness, and move from experimentation to defensible, practical implementation.
            </p>
          </div>
        </div>
      </section>

      {/* LEARNING TRACKS */}
      <section style={{ background: "#002046", borderTop: "1px solid rgba(196,155,47,0.15)" }} className="py-16 lg:py-20">
        <div className="csl-container">
          <div className="text-center mb-12">
            <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: "#C49B2F" }}>Learning Tracks</span>
            <h2 className="mt-4" style={{ color: "#FAF8F3" }}>Three Role-Based Tracks. One Clear Path.</h2>
            <p className="mt-3 text-sm mx-auto max-w-[560px]" style={{ color: "#CBD5E1" }}>
              Each track is structured as a progression, not random sessions. Start with an introduction, build depth, and advance into applied leadership.
            </p>
          </div>
          <div className="csl-grid csl-grid-3">
            {tracks.map((track) => (
              <div key={track.title} className="glass-card p-6">
                <span className="csl-badge csl-badge-gold">{track.audience}</span>
                <h3 className="mt-4 text-lg font-bold" style={{ color: "#FAF8F3" }}>{track.title}</h3>
                <ul className="mt-5 space-y-3">
                  {track.sessions.map((session, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#E2E8F0" }}>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(196,155,47,0.15)", color: "#C49B2F" }}>
                        {i + 1}
                      </span>
                      {session}
                    </li>
                  ))}
                </ul>
                <Link to="/events" className="csl-btn csl-btn-outline csl-btn-sm csl-btn-block mt-6">
                  View Sessions
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE GUIDE */}
      <section style={{ background: "hsl(var(--navy-mid))", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="py-16 lg:py-20">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: "#C49B2F" }}>Executive Guide</span>
          <h2 className="mt-4" style={{ color: "#FAF8F3" }}>Start with the Executive Guide</h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
            Request the CSL Executive Guide | Overview Edition to get a high-level view of the operating model, leadership perspective, and strategic direction behind Cyber Security Leadership.
          </p>
          <button onClick={() => setGuideOpen(true)} className="csl-btn csl-btn-primary mt-6">
            Request the Executive Guide
          </button>
        </div>
      </section>

      {/* CUSTOM ENGAGEMENT */}
      <section style={{ background: "#002046", borderTop: "1px solid rgba(196,155,47,0.15)" }} className="py-16 lg:py-20">
        <div className="csl-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" style={{ maxWidth: 960, margin: "0 auto" }}>
            <div>
              <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase" style={{ color: "#C49B2F" }}>Custom Engagement</span>
              <h2 className="mt-4" style={{ color: "#FAF8F3" }}>Tailored to Your Organization</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
                Every organization operates at a different speed, faces different risks, and needs a different level of support. George4 works with boards, executives, and technology leaders through mission-aligned engagements focused on AI strategy, governance, cybersecurity leadership, and practical execution.
              </p>
              <Link to="/book?source=george4-series-custom-engagement" className="csl-btn csl-btn-primary mt-6">
                Book a 20-Minute Strategy Call
              </Link>
            </div>
            <div className="space-y-3 mt-2">
              {engagementBullets.map((b) => (
                <div key={b} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(250,248,243,0.04)", border: "1px solid rgba(250,248,243,0.08)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C49B2F" strokeWidth="2" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm" style={{ color: "#E2E8F0" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONVERSION CTA */}
      <section style={{ background: "#F5EDD4" }} className="py-16 lg:py-20">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <h2 style={{ color: "#002046", fontWeight: 800 }}>Ready to start?</h2>
          <p className="mt-3 text-sm" style={{ color: "#334155" }}>
            Every path leads to better decisions, stronger governance, and practical execution.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/events" className="csl-btn" style={{ background: "#002046", color: "#FAF8F3" }}>
              Register for a Free Briefing
            </Link>
            <Link to="/book?source=george4-series-conversion-cta" className="csl-btn" style={{ background: "#C49B2F", color: "#002046" }}>
              Book a Strategy Call
            </Link>
            <Link to="/membership" className="csl-btn" style={{ background: "transparent", color: "#002046", border: "2px solid #002046" }}>
              Explore Membership
            </Link>
          </div>
        </div>
      </section>

      <CSLFormModal
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        context={guideContext}
        variant="guide"
        guideDownloadUrl="/guides/CSL_Framework_3_0_Overview_Guide.pdf"
        successOverride={{
          title: "Request Received",
          message: "Thank you. Your request has been received.",
          subtext: "Your CSL Overview Guide is ready now.",
        }}
      />
    </CSLLayout>
  );
}
