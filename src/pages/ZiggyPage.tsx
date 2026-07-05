import { useEffect, useRef } from "react";
import CSLLayout from "@/components/CSLLayout";
import ziggyPortrait from "@/assets/ziggy-portrait.jpg";
import ziggyMedallion from "@/assets/ziggy-medallion.jpg";

/* ---------- Scroll reveal ---------- */
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ziggy-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("ziggy-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("ziggy-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Icons ---------- */
const stroke = "hsl(var(--gold))";
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}
const ClockIcon = () => <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const HeartIcon = () => <Icon><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" /></Icon>;
const LockIcon = () => <Icon><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>;
const CompassIcon = () => <Icon><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></Icon>;
const BoltIcon = () => <Icon><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></Icon>;
const SparkIcon = () => <Icon><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></Icon>;
const ListIcon = () => <Icon><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></Icon>;
const ShieldIcon = () => <Icon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></Icon>;
const BrainIcon = () => <Icon><path d="M9.5 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 9a2.5 2.5 0 0 0 1 2 2.5 2.5 0 0 0 1.5 4.5 2.5 2.5 0 0 0 2 1V4z" /><path d="M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 19 9a2.5 2.5 0 0 1-1 2 2.5 2.5 0 0 1-1.5 4.5 2.5 2.5 0 0 1-2 1V4z" /></Icon>;
const CheckIcon = () => <Icon><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></Icon>;
const GrowIcon = () => <Icon><path d="M3 20h18M6 20V10M12 20V4M18 20v-7" /></Icon>;
const TrophyIcon = () => <Icon><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0z" /><path d="M17 4h3v2a3 3 0 0 1-3 3M7 4H4v2a3 3 0 0 0 3 3" /></Icon>;

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`ziggy-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- Ambient particles ---------- */
function Particles() {
  const dots = useRef(
    Array.from({ length: 9 }, (_, i) => ({
      left: `${8 + i * 10.5}%`,
      size: 2 + (i % 3),
      duration: 12 + (i % 5) * 3,
      delay: i * 1.6,
    })),
  ).current;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            background: "hsl(var(--gold) / 0.55)",
            animation: `ziggy-float-dot ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Trait pill ---------- */
function Trait({ label }: { label: string }) {
  return (
    <span className="font-display text-[0.62rem] sm:text-xs tracking-[0.22em] uppercase" style={{ color: "hsl(var(--gold))" }}>
      {label}
    </span>
  );
}

/* ---------- Protects item ---------- */
function ProtectItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,67,0.14)" }}>
      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.1)" }}>{icon}</span>
      <span className="font-display text-sm sm:text-base font-semibold" style={{ color: "#F1F5F9" }}>{label}</span>
    </div>
  );
}

/* ---------- Benefit card ---------- */
function BenefitCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-6 sm:p-7 h-full flex flex-col gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}>
        {icon}
      </div>
      <h3 className="font-display text-lg" style={{ color: "#F1F5F9" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>{children}</p>
    </div>
  );
}

/* ---------- Growth medallion ---------- */
function GrowthMark({ variant }: { variant: "personal" | "business" | "enterprise" }) {
  if (variant === "personal") {
    return (
      <div
        className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
        style={{ border: "2px solid hsl(var(--gold) / 0.55)", boxShadow: "0 0 24px hsl(var(--gold) / 0.2)" }}
      >
        <img src={ziggyPortrait} alt="Ziggy" className="w-full h-full object-cover" style={{ objectPosition: "50% 22%" }} loading="lazy" />
      </div>
    );
  }
  const ring =
    variant === "enterprise"
      ? "0 0 0 5px hsl(var(--gold) / 0.16), 0 0 28px hsl(var(--gold) / 0.28)"
      : "0 0 20px hsl(var(--gold) / 0.2)";
  return (
    <div className="relative flex-shrink-0">
      {variant === "enterprise" && (
        <span className="absolute inset-0 rounded-full" style={{ border: "1px dashed hsl(var(--gold) / 0.4)", transform: "scale(1.28)" }} />
      )}
      <div
        className="w-20 h-20 rounded-full overflow-hidden"
        style={{ border: "2px solid hsl(var(--gold) / 0.6)", boxShadow: ring }}
      >
        <img src={ziggyMedallion} alt="Ziggy Z medallion" className="w-full h-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}

function GrowthStage({
  variant,
  stage,
  title,
  children,
}: {
  variant: "personal" | "business" | "enterprise";
  stage: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-7 sm:p-8 h-full flex flex-col items-center text-center gap-4">
      <GrowthMark variant={variant} />
      <div className="font-display text-[0.6rem] tracking-[0.22em] uppercase" style={{ color: "hsl(var(--gold))" }}>{stage}</div>
      <h3 className="font-display text-xl" style={{ color: "#F1F5F9" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>{children}</p>
    </div>
  );
}

/* =========================================================== */
export default function ZiggyPage() {
  useScrollReveal();

  return (
    <CSLLayout>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden" style={{ background: "#0B1120" }}>
        {/* ambient light + grid */}
        <div className="absolute inset-0 ziggy-glow" style={{ background: "radial-gradient(900px 520px at 62% 30%, hsl(var(--gold) / 0.16), transparent 62%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(700px 420px at 8% 100%, rgba(74,144,217,0.08), transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <Particles />

        <div className="relative csl-container py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-8 items-center">
            {/* Left: copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="csl-badge csl-badge-gold">Private Preview</span>
                <span className="font-display text-[0.6rem] tracking-[0.16em] uppercase" style={{ color: "#94A3B8" }}>Monarch217</span>
              </div>
              <h1 className="font-display leading-[0.95]" style={{ color: "#FFFFFF" }}>Meet Ziggy.</h1>
              <p className="mt-4 font-display text-xl sm:text-3xl font-semibold leading-tight ziggy-shimmer-text inline-block">
                Your Executive Operating System.
              </p>
              <div className="mt-6 space-y-1.5">
                <p className="font-display text-lg sm:text-xl font-semibold" style={{ color: "#F1F5F9" }}>Your Best Friend.</p>
                <p className="font-display text-lg sm:text-xl font-semibold" style={{ color: "#F1F5F9" }}>Your Protector.</p>
                <p className="font-display text-lg sm:text-xl font-semibold" style={{ color: "#F1F5F9" }}>Your Life Coach.</p>
              </div>
              <p className="mt-6 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
                Your trusted executive companion. A calm, loyal presence that helps you think clearly,
                protect what matters, and lead with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="csl-btn csl-btn-gold csl-btn-lg ziggy-btn-glow">Meet Ziggy (60 seconds)</a>
                <a href="#ziggy-benefits" className="csl-btn csl-btn-outline csl-btn-lg ziggy-btn-glow">See What Ziggy Can Do</a>
              </div>
            </div>

            {/* Right: Ziggy portrait + overlays */}
            <div className="relative">
              {/* halo behind Ziggy */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="ziggy-glow rounded-full" style={{ width: "78%", height: "78%", background: "radial-gradient(circle, hsl(var(--gold) / 0.28), transparent 70%)", filter: "blur(20px)" }} />
              </div>

              <div className="relative flex justify-center ziggy-breathe">
                <img
                  src={ziggyPortrait}
                  alt="Ziggy, your trusted executive companion, a golden retriever in a navy cape with a gold Z medallion"
                  className="w-full max-w-md object-contain"
                  style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.55))", WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)" }}
                  fetchpriority="high"
                />
              </div>

              {/* Speech bubble */}
              <div className="absolute top-4 sm:top-8 right-0 sm:-right-2 max-w-[13rem] rounded-2xl rounded-br-sm p-4" style={{ background: "rgba(15,23,42,0.92)", border: "1px solid rgba(212,168,67,0.28)", boxShadow: "0 20px 40px rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <HeartIcon />
                  <span className="font-display text-sm font-semibold" style={{ color: "#F1F5F9" }}>I've got your back, always.</span>
                </div>
                <div className="csl-divider my-2" style={{ height: 1 }} />
                <p className="text-[0.82rem] leading-snug" style={{ color: "#CBD5E1" }}>
                  Give me a project… and watch me perform.
                </p>
              </div>

              {/* Status card */}
              <div className="absolute bottom-2 left-0 sm:-left-2 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(15,23,42,0.92)", border: "1px solid rgba(107,197,160,0.3)", boxShadow: "0 16px 32px rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}>
                <span className="w-2.5 h-2.5 rounded-full ziggy-pulse-ring" style={{ background: "hsl(var(--emerald))" }} />
                <div>
                  <div className="font-display text-sm font-bold" style={{ color: "#F1F5F9" }}>Ziggy is Online</div>
                  <div className="text-[0.72rem]" style={{ color: "#94A3B8" }}>Ready when you are.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Traits */}
          <div className="mt-10 pt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <Trait label="Loyal" />
            <span className="hidden sm:inline" style={{ color: "hsl(var(--gold) / 0.35)" }}>|</span>
            <Trait label="Smart" />
            <span className="hidden sm:inline" style={{ color: "hsl(var(--gold) / 0.35)" }}>|</span>
            <Trait label="Protective" />
            <span className="hidden sm:inline" style={{ color: "hsl(var(--gold) / 0.35)" }}>|</span>
            <Trait label="Trustworthy" />
          </div>
        </div>
      </section>

      {/* ============ PRIVATE. SECURE. TRUSTED. ============ */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <Reveal>
            <div className="max-w-2xl">
              <span className="csl-label">The Promise</span>
              <h2 className="font-display mt-3">Private. Secure. Trusted.</h2>
              <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
                A relationship is only as strong as the trust behind it. Ziggy is built to guard the
                things that make your life yours, so you can move through your days with a quiet sense of safety.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              <ProtectItem icon={<ClockIcon />} label="Your Time" />
              <ProtectItem icon={<HeartIcon />} label="Your Relationships" />
              <ProtectItem icon={<LockIcon />} label="Your Privacy" />
              <ProtectItem icon={<CompassIcon />} label="Your Decisions" />
              <ProtectItem icon={<BoltIcon />} label="Your Execution" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section id="ziggy-benefits" className="csl-section">
        <div className="csl-container">
          <Reveal>
            <div className="max-w-2xl">
              <span className="csl-label">A Better Life</span>
              <h2 className="font-display mt-3">What Ziggy does for you.</h2>
              <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
                Not features. Outcomes. Everything Ziggy does answers one question: how does this make
                your life better?
              </p>
            </div>
          </Reveal>
          <div className="csl-grid csl-grid-3 mt-10">
            <Reveal delay={0}><BenefitCard icon={<ListIcon />} title="Organize My Life">Bring order to the noise. Ziggy keeps the moving pieces together so your mind stays free for what matters.</BenefitCard></Reveal>
            <Reveal delay={80}><BenefitCard icon={<ShieldIcon />} title="Protect What Matters">Your people, your privacy, your reputation. Ziggy watches over the things you cannot afford to lose.</BenefitCard></Reveal>
            <Reveal delay={160}><BenefitCard icon={<BrainIcon />} title="Help Me Think Clearly">A calm second mind. Ziggy cuts through complexity so you can see the decision that actually matters.</BenefitCard></Reveal>
            <Reveal delay={0}><BenefitCard icon={<CheckIcon />} title="Keep My Commitments">The promises you make get kept. Ziggy remembers, reminds, and follows through so your word holds.</BenefitCard></Reveal>
            <Reveal delay={80}><BenefitCard icon={<GrowIcon />} title="Help Me Grow">A patient coach at your side. Ziggy helps you build the habits and clarity that compound over years.</BenefitCard></Reveal>
            <Reveal delay={160}><BenefitCard icon={<TrophyIcon />} title="Help Me Win">Momentum you can feel. Ziggy turns intention into progress so you finish what you start, and win.</BenefitCard></Reveal>
          </div>
        </div>
      </section>

      {/* ============ ZIGGY GROWS WITH YOU ============ */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <span className="csl-label">One Relationship</span>
              <h2 className="font-display mt-3">Ziggy grows with you.</h2>
              <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
                There is only one Ziggy. As your life expands, so does everything he carries for you.
                The same companion, the same trust, growing responsibilities.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid lg:grid-cols-3 gap-5 lg:gap-4 max-w-5xl mx-auto items-stretch">
            <Reveal delay={0}>
              <GrowthStage variant="personal" stage="Ziggy Personal" title="Helping one human">
                It starts with you. Ziggy learns your world and helps you run your own life with clarity and calm.
              </GrowthStage>
            </Reveal>
            <Reveal delay={120}>
              <GrowthStage variant="business" stage="Ziggy Business" title="Helping you lead a business">
                As you take on more, the same Ziggy helps you lead a team, protect your focus, and move with confidence.
              </GrowthStage>
            </Reveal>
            <Reveal delay={240}>
              <GrowthStage variant="enterprise" stage="Ziggy Enterprise" title="Helping you lead an organization">
                At the highest level, the same Ziggy carries the weight of an organization, still loyal, still yours.
              </GrowthStage>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p className="mt-10 text-center font-display text-sm sm:text-base font-semibold" style={{ color: "#F1F5F9" }}>
              One Ziggy. Growing responsibilities. Always human in control.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="relative overflow-hidden csl-section" style={{ background: "#0B1120" }}>
        <div className="absolute inset-0 ziggy-glow" style={{ background: "radial-gradient(700px 380px at 50% 0%, hsl(var(--gold) / 0.14), transparent 65%)" }} />
        <div className="relative csl-container">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden ziggy-breathe" style={{ border: "2px solid hsl(var(--gold) / 0.55)", boxShadow: "0 0 30px hsl(var(--gold) / 0.25)" }}>
                  <img src={ziggyPortrait} alt="Ziggy" className="w-full h-full object-cover" style={{ objectPosition: "50% 20%" }} loading="lazy" />
                </div>
              </div>
              <span className="csl-label block mt-6">Private Preview</span>
              <h2 className="font-display mt-3" style={{ color: "#FFFFFF" }}>Ready to Meet Ziggy?</h2>
              <p className="mt-5 text-base sm:text-lg" style={{ color: "#CBD5E1" }}>
                Experience a live executive demonstration. See how Ziggy protects trust, simplifies work,
                and helps humans succeed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <a href="#" className="csl-btn csl-btn-gold csl-btn-lg ziggy-btn-glow">Launch Live Demo</a>
                <a href="/book" className="csl-btn csl-btn-outline csl-btn-lg ziggy-btn-glow">Book a Private Executive Preview</a>
              </div>
              <p className="mt-10 font-display text-sm tracking-[0.14em] uppercase" style={{ color: "#94A3B8" }}>
                Your data. Your trust. Always protected.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </CSLLayout>
  );
}
