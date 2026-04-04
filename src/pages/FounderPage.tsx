import { useEffect, useRef } from "react";
import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import CSL_LOGO from "@/assets/csl-logo-full.png";
import G4_PHOTO from "@/assets/george4.jpeg";

const CALENDLY_PLACEHOLDER = "https://calendly.com";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("fade-in-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}

const services = [
  {
    title: "Funding Strategy",
    desc: "Grant alignment, SLCGP navigation, and sustainable funding models for cybersecurity programs.",
    price: "Starting at $3,500",
  },
  {
    title: "Cyber Risk Assessment",
    desc: "Comprehensive risk assessments aligned to the CSL Cyber Framework 3.0, built for board-level reporting.",
    price: "Starting at $5,000",
  },
  {
    title: "AI Governance Advisory",
    desc: "Policy development, framework design, and board communication for responsible AI adoption.",
    price: "Starting at $7,500",
  },
  {
    title: "Ongoing Advisory",
    desc: "Fractional CISO and strategic advisory services tailored to your organization's complexity and goals.",
    price: "Starting at $2,500/mo",
  },
];

export default function FounderPage() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "#002046", minHeight: "70vh" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(196,155,47,0.08) 0%, transparent 60%)" }} />
        <div className="csl-container relative py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <FadeSection>
              <span className="font-founder-body text-sm tracking-[0.15em] uppercase" style={{ color: "#C49B2F" }}>
                Founder & CEO · CSL Cybersecurity Leadership
              </span>
              <h1 className="font-founder-display mt-4" style={{ color: "#FAF8F3", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.1 }}>
                George<span style={{ color: "#C49B2F" }}>4</span>
              </h1>
              <p className="font-founder-display mt-3 text-lg italic" style={{ color: "#F5EDD4" }}>
                Founder · Cybersecurity Advisor · Community Builder
              </p>

              {/* Quote */}
              <blockquote className="mt-8 pl-5 py-4" style={{ borderLeft: "3px solid #C49B2F" }}>
                <p className="font-founder-display text-lg italic leading-relaxed" style={{ color: "#FAF8F3" }}>
                  "Forty years of showing up for people who needed someone in their corner. Now that someone is in cybersecurity."
                </p>
              </blockquote>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href={CALENDLY_PLACEHOLDER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csl-btn"
                  style={{ background: "#C49B2F", color: "#002046", fontFamily: "'Jost', sans-serif" }}
                >
                  Book a Discovery Call
                </a>
                <a
                  href="mailto:membership@cybersecurity-leadership.org"
                  className="csl-btn csl-btn-outline"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Membership Inquiries
                </a>
                <a
                  href="https://cybersecurity-leadership.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csl-btn csl-btn-outline"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Visit CSL
                </a>
              </div>
            </FadeSection>

            {/* Right */}
            <FadeSection className="flex flex-col items-center gap-6">
              <div
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "4px solid #C49B2F", boxShadow: "0 0 40px rgba(196,155,47,0.2)" }}
              >
                <img src={G4_PHOTO} alt="George4 | Founder & CEO, CSL" className="w-full h-full object-cover" />
              </div>
              <img src={CSL_LOGO} alt="CSL Cybersecurity Leadership" className="h-12 w-auto opacity-80" />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section style={{ background: "#FAF8F3" }} className="py-16 lg:py-24">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <FadeSection>
            <span className="font-founder-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#C49B2F" }}>The Story</span>
            <h2 className="font-founder-display mt-4" style={{ color: "#002046", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              Why CSL Exists
            </h2>
            <div className="mt-8 space-y-6 font-founder-body text-base leading-relaxed" style={{ color: "#334155" }}>
              <p>
                George4 spent four decades in service. To people, to organizations, and to communities that needed someone willing to do the hard work others wouldn't. From workforce development to technology leadership, from boardroom advisory to street-level mentorship, the through line has always been the same: show up, do the work, and leave things better than you found them.
              </p>
              <p>
                When he looked at the cybersecurity landscape, he saw what everyone else saw — a workforce crisis, a leadership vacuum, and an ecosystem where vendors controlled the conversation. But where others saw problems, George4 saw a platform waiting to be built. Not another conference. Not another vendor showcase. A real, governed, peer-led leadership operating system.
              </p>
              <p>
                CSL — Cybersecurity Leadership — is the result. It connects C-level executives, board members, government leaders, educators, and workforce advocates into a single platform where trust is the currency and outcomes are the product. Every dinner, every cohort, every framework session is designed around a simple principle: good for the member, good for CSL, and good for the community.
              </p>
              <p>
                George4 doesn't just lead CSL. He built it from scratch — the framework, the governance model, the membership structure, the advisory services, and the national expansion strategy. And he's just getting started.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* PLATFORM SECTION */}
      <section style={{ background: "#002046" }} className="py-16 lg:py-24">
        <div className="csl-container text-center" style={{ maxWidth: 800 }}>
          <FadeSection>
            <span className="font-founder-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#C49B2F" }}>The Platform</span>
            <h2 className="font-founder-display mt-4" style={{ color: "#FAF8F3", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              This isn't a program. It's an ecosystem.
            </h2>
            <p className="font-founder-body mt-6 text-base leading-relaxed mx-auto" style={{ color: "#F5EDD4", maxWidth: 640 }}>
              CSL connects executives, boards, educators, government, and workforce advocates into one governed platform. Every relationship is designed to produce outcomes — not transactions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                { label: "Lead. Build. Sustain.™", desc: "Three pillars that drive every CSL program and engagement." },
                { label: "Win-Win-Win", desc: "Good for the member. Good for CSL. Good for the community." },
                { label: "50-State Vision", desc: "Local signal. National platform. Building state by state." },
              ].map((item) => (
                <div key={item.label} className="p-6 rounded-xl" style={{ background: "rgba(196,155,47,0.08)", border: "1px solid rgba(196,155,47,0.2)" }}>
                  <h4 className="font-founder-display text-lg font-semibold" style={{ color: "#C49B2F" }}>{item.label}</h4>
                  <p className="font-founder-body text-sm mt-2" style={{ color: "#F5EDD4" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section style={{ background: "#002046", borderTop: "1px solid rgba(196,155,47,0.15)" }} className="py-16 lg:py-24">
        <div className="csl-container">
          <FadeSection>
            <div className="text-center mb-12">
              <span className="font-founder-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#C49B2F" }}>Advisory Services</span>
              <h2 className="font-founder-display mt-4" style={{ color: "#FAF8F3", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
                How George4 can help your organization
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ maxWidth: 900, margin: "0 auto" }}>
              {services.map((svc) => (
                <div key={svc.title} className="p-6 rounded-xl" style={{ background: "rgba(250,248,243,0.04)", border: "1px solid rgba(250,248,243,0.1)" }}>
                  <h4 className="font-founder-display text-lg font-semibold" style={{ color: "#FAF8F3" }}>{svc.title}</h4>
                  <p className="font-founder-body text-sm mt-2 leading-relaxed" style={{ color: "#F5EDD4" }}>{svc.desc}</p>
                  <p className="font-founder-display text-base font-semibold mt-4" style={{ color: "#C49B2F" }}>{svc.price}</p>
                </div>
              ))}
            </div>
            <p className="font-founder-body text-xs text-center mt-6 italic" style={{ color: "#F5EDD4", opacity: 0.7 }}>
              All engagements are scoped prior to kickoff. Final pricing reflects your organization's size, complexity, and deliverables.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "#F5EDD4" }} className="py-16 lg:py-20">
        <div className="csl-container text-center" style={{ maxWidth: 640 }}>
          <FadeSection>
            <h2 className="font-founder-display" style={{ color: "#002046", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              Ready to start the conversation?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a
                href={CALENDLY_PLACEHOLDER}
                target="_blank"
                rel="noopener noreferrer"
                className="csl-btn"
                style={{ background: "#C49B2F", color: "#002046", fontFamily: "'Jost', sans-serif" }}
              >
                Book a Discovery Call
              </a>
              <Link
                to="/"
                className="csl-btn"
                style={{ background: "#002046", color: "#FAF8F3", fontFamily: "'Jost', sans-serif" }}
              >
                Explore CSL
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOUNDER FOOTER */}
      <section style={{ background: "#002046", borderTop: "1px solid rgba(196,155,47,0.15)" }} className="py-12">
        <div className="csl-container text-center">
          <div className="flex flex-col items-center gap-4">
            <img src={CSL_LOGO} alt="CSL" className="h-10 w-auto opacity-70" />
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-founder-body" style={{ color: "#F5EDD4" }}>
              <a href="mailto:membership@cybersecurity-leadership.org" className="hover:underline">membership@cybersecurity-leadership.org</a>
              <span className="hidden sm:inline" style={{ opacity: 0.3 }}>·</span>
              <a href="mailto:info@cybersecurity-leadership.org" className="hover:underline">info@cybersecurity-leadership.org</a>
              <span className="hidden sm:inline" style={{ opacity: 0.3 }}>·</span>
              <a href="https://cybersecurity-leadership.org" target="_blank" rel="noopener noreferrer" className="hover:underline">cybersecurity-leadership.org</a>
            </div>
            <p className="text-xs" style={{ color: "#F5EDD4", opacity: 0.5 }}>CSL Nonprofit in Formation</p>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
