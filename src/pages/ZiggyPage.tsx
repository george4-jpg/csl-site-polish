import CSLLayout from "@/components/CSLLayout";
import ziggyHero from "@/assets/ziggy-hero.jpg";

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.98A6 6 0 1 0 6 14" />
      <path d="M8 19h9.5" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.8 12.3 8.7-8.7M17 6l2 2M15 8l2 2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ValueCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-6 sm:p-7 h-full flex flex-col gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}>
        {icon}
      </div>
      <h3 className="font-display" style={{ color: "#F1F5F9" }}>{title}</h3>
      {children && <p className="text-sm" style={{ color: "#CBD5E1" }}>{children}</p>}
    </div>
  );
}

export default function ZiggyPage() {
  return (
    <CSLLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={ziggyHero}
          alt="A calm golden retriever named Ziggy welcoming a visitor through an open estate gate at golden hour"
          width={1536}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(220 50% 6% / 0.72) 0%, hsl(220 50% 6% / 0.55) 40%, hsl(220 50% 6% / 0.92) 100%)" }} />
        <div className="relative csl-container py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <span className="csl-badge csl-badge-gold mb-5">Private Preview</span>
            <h1 className="font-display" style={{ color: "#FFFFFF" }}>Meet Ziggy.</h1>
            <p className="mt-4 font-display text-lg sm:text-xl font-semibold" style={{ color: "hsl(var(--gold))" }}>
              Executive Intelligence. Built Around Trust. Designed Around You.
            </p>
            <div className="mt-6 space-y-3 text-base sm:text-lg" style={{ color: "#E2E8F0" }}>
              <p>Hi. I'm Ziggy.</p>
              <p>
                I'm an Executive Intelligence Operating System built to help humans think clearly,
                stay organized, and execute with confidence.
              </p>
              <p>I wasn't built to replace people.</p>
              <p>I was built to help them.</p>
              <p className="font-semibold" style={{ color: "#F1F5F9" }}>
                My only mission is simple: help my human succeed.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#meet-ziggy" className="csl-btn csl-btn-gold csl-btn-lg">Meet Ziggy</a>
              <a href="#" className="csl-btn csl-btn-outline csl-btn-lg">Request a Private Preview</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Not another chatbot */}
      <section id="meet-ziggy" className="csl-section">
        <div className="csl-container max-w-3xl">
          <span className="csl-label">The Difference</span>
          <h2 className="font-display mt-3">Not another chatbot.</h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
            Ziggy is not a chatbot, dashboard, or generic automation tool. Ziggy is a relationship-first
            intelligence system designed to understand priorities, protect privacy, preserve human judgment,
            and coordinate work across the digital world.
          </p>
        </div>
      </section>

      {/* Section 3 - You stay in control */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="max-w-3xl">
            <span className="csl-label">Control</span>
            <h2 className="font-display mt-3">You stay in control.</h2>
            <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
              Every message, calendar invite, document, workflow, and external action can be routed through
              human approval. Ziggy does not replace judgment. Ziggy protects it.
            </p>
          </div>
          <div className="csl-grid csl-grid-3 mt-10">
            <ValueCard icon={<ShieldIcon />} title="Approval before action">
              Nothing goes out into the world until you say so. You approve, then Ziggy acts.
            </ValueCard>
            <ValueCard icon={<LockIcon />} title="Privacy by design">
              Your information stays yours. Privacy is a foundation, not an afterthought.
            </ValueCard>
            <ValueCard icon={<LoopIcon />} title="Closed-loop confirmation">
              Every action is confirmed back to you, so nothing happens in the dark.
            </ValueCard>
          </div>
        </div>
      </section>

      {/* Section 4 - Choose how Ziggy lives */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="max-w-3xl">
            <span className="csl-label">Deployment</span>
            <h2 className="font-display mt-3">Choose how Ziggy lives.</h2>
            <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
              Some people want simplicity. Some need maximum privacy. Ziggy is being designed to support hosted,
              private cloud, and local deployment models so users can choose the environment that fits their trust,
              privacy, and performance needs.
            </p>
          </div>
          <div className="csl-grid csl-grid-3 mt-10">
            <ValueCard icon={<CloudIcon />} title="Hosted">
              The simplest path. Ready when you are, with the trusted experience handled for you.
            </ValueCard>
            <ValueCard icon={<KeyIcon />} title="Private Cloud">
              A dedicated environment for teams and leaders who want more separation and control.
            </ValueCard>
            <ValueCard icon={<HomeIcon />} title="Local / Your Hardware">
              Maximum privacy. Ziggy lives where you decide, on infrastructure you own.
            </ValueCard>
          </div>
        </div>
      </section>

      {/* Section 5 - CEO of your own life */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container max-w-3xl text-center mx-auto">
          <span className="csl-label">Human First</span>
          <h2 className="font-display mt-3">Every person is the CEO of their own life.</h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
            Ziggy helps coordinate the executive office around the human: mission, health, wealth, relationships,
            work, and growth. One trusted companion. Many capabilities. Human first.
          </p>
        </div>
      </section>

      {/* Section 6 - Ready to meet Ziggy */}
      <section className="csl-section">
        <div className="csl-container max-w-2xl mx-auto text-center">
          <span className="csl-label">Private Preview</span>
          <h2 className="font-display mt-3">Ready to meet Ziggy?</h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
            This is an early private preview. If the vision resonates, schedule time with George to experience the
            live demo and discuss where Ziggy goes next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#" className="csl-btn csl-btn-gold csl-btn-lg">Launch Live Demo</a>
            <a href="#" className="csl-btn csl-btn-outline csl-btn-lg">Book Time with George</a>
          </div>
          <p className="mt-10 text-sm" style={{ color: "#94A3B8" }}>
            Ziggy is currently in private prototype. Live demonstrations are available by invitation.
          </p>
        </div>
      </section>
    </CSLLayout>
  );
}
