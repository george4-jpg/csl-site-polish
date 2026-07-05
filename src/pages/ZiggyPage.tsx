import CSLLayout from "@/components/CSLLayout";
import ziggyAvatar from "@/assets/ziggy-avatar.jpg";

/* ---------- Icons ---------- */
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

function ZiggyMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src={ziggyAvatar}
      alt="Ziggy"
      width={size}
      height={size}
      loading="lazy"
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: "1px solid rgba(212,168,67,0.5)" }}
    />
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

/* ---------- Cockpit mockup ---------- */
function StatusDot() {
  return <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(var(--emerald))", boxShadow: "0 0 8px hsl(var(--emerald))" }} />;
}

function CockpitPanel() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(20,28,46,0.95), rgba(11,17,32,0.98))",
        border: "1px solid rgba(212,168,67,0.22)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.02)",
      }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-3">
          <ZiggyMark size={34} />
          <div>
            <div className="font-display text-sm font-bold" style={{ color: "#F1F5F9" }}>Ziggy</div>
            <div className="font-display text-[0.58rem] tracking-[0.14em] uppercase" style={{ color: "#94A3B8" }}>Executive Intelligence OS</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(107,197,160,0.1)", border: "1px solid rgba(107,197,160,0.25)" }}>
          <StatusDot />
          <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase" style={{ color: "hsl(var(--emerald))" }}>Secure</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        {/* briefing preview */}
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-[0.58rem] tracking-[0.14em] uppercase" style={{ color: "hsl(var(--gold))" }}>Executive Briefing</span>
            <span className="font-display text-[0.55rem]" style={{ color: "#94A3B8" }}>07:00</span>
          </div>
          <p className="text-[0.82rem] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Good morning. Three priorities need your judgment today, two documents are ready for review, and your 2:00 is confirmed.
          </p>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 rounded-full" style={{ width: "92%", background: "rgba(212,168,67,0.35)" }} />
            <div className="h-1.5 rounded-full" style={{ width: "74%", background: "rgba(255,255,255,0.1)" }} />
            <div className="h-1.5 rounded-full" style={{ width: "58%", background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>

        {/* approval card */}
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,67,0.2)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="csl-badge csl-badge-gold" style={{ fontSize: "0.5rem" }}>Approval Requested</span>
          </div>
          <p className="text-[0.82rem] leading-snug mb-3" style={{ color: "#F1F5F9" }}>
            Send investor update to 4 recipients?
          </p>
          <div className="flex gap-2">
            <span className="flex-1 text-center font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase py-2 rounded-lg" style={{ background: "hsl(var(--gold))", color: "hsl(var(--navy))" }}>Approve</span>
            <span className="flex-1 text-center font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase py-2 rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#CBD5E1" }}>Hold</span>
          </div>
        </div>

        {/* routed channels */}
        <div className="grid grid-cols-3 gap-2">
          {["Calendar", "Documents", "Comms"].map((c) => (
            <div key={c} className="rounded-lg px-2 py-2.5 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-center gap-1">
                <StatusDot />
                <span className="font-display text-[0.55rem] tracking-[0.08em] uppercase" style={{ color: "#CBD5E1" }}>{c}</span>
              </div>
              <div className="font-display text-[0.48rem] tracking-[0.1em] uppercase mt-1" style={{ color: "#64748B" }}>Approval on</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ZiggyPage() {
  return (
    <CSLLayout>
      {/* Hero — secure executive cockpit */}
      <section className="relative overflow-hidden" style={{ background: "#0B1120" }}>
        {/* ambient glow + grid */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(1200px 500px at 70% -10%, rgba(212,168,67,0.12), transparent 60%), radial-gradient(800px 400px at 10% 110%, rgba(74,144,217,0.08), transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative csl-container py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="csl-badge csl-badge-gold">Private Preview</span>
                <span className="font-display text-[0.6rem] tracking-[0.14em] uppercase" style={{ color: "#94A3B8" }}>Executive Intelligence OS</span>
              </div>
              <h1 className="font-display" style={{ color: "#FFFFFF" }}>Meet Ziggy.</h1>
              <p className="mt-3 font-display text-lg sm:text-2xl font-semibold leading-snug" style={{ color: "hsl(var(--gold))" }}>
                Your Executive Intelligence Operating System.
              </p>
              <p className="mt-5 text-base sm:text-lg" style={{ color: "#E2E8F0" }}>
                A relationship-first intelligence system that helps you think clearly, stay organized,
                and execute with confidence. Ziggy is the trusted front layer to a powerful intelligence
                system, with a warm companion at the interface and human judgment always in command.
              </p>
              <p className="mt-4 font-display text-sm sm:text-base font-semibold" style={{ color: "#F1F5F9" }}>
                One trusted companion. Many capabilities. Human in control.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="csl-btn csl-btn-gold csl-btn-lg">Launch Live Demo</a>
                <a href="#" className="csl-btn csl-btn-outline csl-btn-lg">Request Private Preview</a>
                <a href="#" className="csl-btn csl-btn-outline csl-btn-lg">Book George</a>
              </div>
            </div>

            <div className="relative">
              <CockpitPanel />
            </div>
          </div>
        </div>
      </section>

      {/* Companion intro strip */}
      <section className="csl-section-dark py-8">
        <div className="csl-container flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <ZiggyMark size={64} />
          <div>
            <p className="text-base sm:text-lg" style={{ color: "#E2E8F0" }}>
              <span className="font-semibold" style={{ color: "#F1F5F9" }}>Hi. I'm Ziggy.</span>{" "}
              I wasn't built to replace people. I was built to help them. My only mission is simple:
              help my human succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Not another chatbot */}
      <section id="about-ziggy" className="csl-section">
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
          <ZiggyMark size={56} />
          <span className="csl-label block mt-5">Private Preview</span>
          <h2 className="font-display mt-3">Ready to meet Ziggy?</h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
            This is an early private preview. If the vision resonates, schedule time with George to experience the
            live demo and discuss where Ziggy goes next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="#" className="csl-btn csl-btn-gold csl-btn-lg">Launch Live Demo</a>
            <a href="#" className="csl-btn csl-btn-outline csl-btn-lg">Request Private Preview</a>
            <a href="#" className="csl-btn csl-btn-outline csl-btn-lg">Book George</a>
          </div>
          <p className="mt-10 text-sm" style={{ color: "#94A3B8" }}>
            Ziggy is currently in private prototype. Live demonstrations are available by invitation.
          </p>
        </div>
      </section>
    </CSLLayout>
  );
}
