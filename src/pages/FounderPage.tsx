import { useEffect, useRef } from "react";
import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import CSL_LOGO from "@/assets/csl-logo-full.png";
import G4_HERO from "@/assets/george4-ceo-founder.png";

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

export default function FounderPage() {
  return (
    <CSLLayout>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "#002046", minHeight: "70vh" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(196,155,47,0.08) 0%, transparent 60%)" }} />
        <div className="csl-container relative py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <FadeSection>
              <span className="font-founder-body text-sm tracking-[0.15em] uppercase font-semibold" style={{ color: "#C49B2F" }}>
                Founder Perspective
              </span>
              <h1 className="font-founder-display mt-4" style={{ color: "#FAF8F3", fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.12 }}>
                Built for leaders responsible for Cyber and AI risk.
              </h1>
              <p className="font-founder-body mt-6 text-lg leading-relaxed" style={{ color: "#F5EDD4" }}>
                Cyber Security Leadership was created to give executives, boards, and community leaders a private platform where they can make better decisions, connect with trusted peers, and move from noise to action.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to="/membership"
                  className="csl-btn"
                  style={{ background: "#C49B2F", color: "#002046", fontFamily: "'Jost', sans-serif" }}
                >
                  Join CSL
                </Link>
                <Link
                  to="/book?source=founder-hero-risk-conversation"
                  className="csl-btn csl-btn-outline"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Request a Risk Conversation
                </Link>
              </div>
            </FadeSection>

            {/* Right: Image */}
            <FadeSection className="flex justify-center lg:justify-end">
              <div
                className="w-full overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid rgba(196,155,47,0.25)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(196,155,47,0.12)",
                  maxWidth: 640,
                }}
              >
                <img
                  src={G4_HERO}
                  alt="George4, Founder & Director of Cyber Security Leadership"
                  className="w-full h-auto block"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* WHY I BUILT CSL */}
      <section style={{ background: "#FAF8F3" }} className="py-16 lg:py-24">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <FadeSection>
            <span className="font-founder-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#C49B2F" }}>Founder Intro</span>
            <h2 className="font-founder-display mt-4" style={{ color: "#002046", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              Why I Built CSL
            </h2>
            <div className="mt-8 space-y-6 font-founder-body text-base leading-relaxed" style={{ color: "#334155" }}>
              <p>
                I built Cyber Security Leadership because leaders are being asked to make high-stakes decisions in cybersecurity and AI without enough trusted context, peer support, or practical guidance.
              </p>
              <p>CSL is designed to change that.</p>
              <p>
                This is not a vendor-first community. It is a leadership platform for people responsible for protecting organizations, serving communities, and preparing for what is coming next.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* 40 YEARS OF EXPERIENCE */}
      <section style={{ background: "#002046" }} className="py-16 lg:py-24">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <FadeSection>
            <span className="font-founder-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#C49B2F" }}>Experience</span>
            <h2 className="font-founder-display mt-4" style={{ color: "#FAF8F3", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              40 Years of Real-World Experience
            </h2>
            <div className="mt-8 space-y-6 font-founder-body text-base leading-relaxed" style={{ color: "#F5EDD4" }}>
              <p>
                My work spans technology, cybersecurity, leadership, consulting, workforce development, and executive advisory. That experience shaped CSL into a practical operating environment for leaders who need clarity, trusted relationships, and action-oriented support.
              </p>
              <p>
                The focus is simple: help leaders get informed, get connected, and get moving.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ background: "#FAF8F3", borderTop: "1px solid rgba(0,32,70,0.08)" }} className="py-16 lg:py-24">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <FadeSection>
            <span className="font-founder-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: "#C49B2F" }}>Our Mission</span>
            <h2 className="font-founder-display mt-4" style={{ color: "#002046", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              CSL Connects Leaders to the Conversations That Matter
            </h2>
            <div className="mt-8 space-y-6 font-founder-body text-base leading-relaxed" style={{ color: "#334155" }}>
              <p>
                Cyber Security Leadership exists to help leaders have the conversations they need to have, with the people they need in the room.
              </p>
              <p>
                CSL provides a trusted ecosystem and operating model that connects executives, practitioners, educators, advisors, sponsors, vendors, and community partners around real cyber and AI risk.
              </p>
              <p>
                We connect local leadership with global expertise, trusted resources, assessment support, delivery partners, curated education, and in-person leadership experiences shaped around member needs and community priorities.
              </p>
              <p>
                Our events are intentionally designed as high-trust leadership experiences. CSL works with experienced restaurant, hospitality, and sommelier professionals to curate food, wine, venue, and atmosphere in partnership with the local community.
              </p>
              <p>
                Everyone has a role in the mission. Members, advisors, sponsors, vendors, educators, practitioners, and community leaders can all participate by helping provide real value to the leaders CSL serves.
              </p>
              <p className="font-founder-display text-lg" style={{ color: "#002046" }}>
                CSL creates the room. CSL connects the right people. CSL helps leaders make better cyber and AI decisions.
              </p>
            </div>

            {/* Founder title block */}
            <div className="mt-10 pl-5 py-4" style={{ borderLeft: "3px solid #C49B2F" }}>
              <p className="font-founder-display text-2xl font-semibold" style={{ color: "#002046" }}>George4</p>
              <p className="font-founder-body text-sm mt-2" style={{ color: "#334155" }}>
                Founder & Director, Cyber Security Leadership
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "#002046", borderTop: "1px solid rgba(196,155,47,0.15)" }} className="py-16 lg:py-24">
        <div className="csl-container text-center" style={{ maxWidth: 760 }}>
          <FadeSection>
            <h2 className="font-founder-display" style={{ color: "#FAF8F3", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
              CSL is built for the leaders carrying the weight.
            </h2>
            <p className="font-founder-body mt-6 text-base leading-relaxed mx-auto" style={{ color: "#F5EDD4", maxWidth: 640 }}>
              Whether you lead a school district, city, agency, company, or community institution, CSL gives you a trusted place to learn, align, and act before risk becomes crisis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                to="/membership"
                className="csl-btn"
                style={{ background: "#C49B2F", color: "#002046", fontFamily: "'Jost', sans-serif" }}
              >
                Join the Cyber Security Leadership ecosystem
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
            </div>
            <p className="text-xs" style={{ color: "#F5EDD4", opacity: 0.5 }}>CSL Nonprofit in Formation</p>
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
