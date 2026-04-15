import CSLLayout from "@/components/CSLLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CheckIcon, SectionDivider } from "@/components/CSLComponents";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/hero-bg-ioRD65NXC9m76UpRhkM2HH.webp";
const FRAMEWORK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/framework-bg-MbcoETn3RxzwaoE3dBAiie.webp";
const COMMUNITY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/community-bg-9eS9LjJdvnGRE58mxs2CZS.webp";

const cities = ["Jefferson City", "Kansas City", "St. Louis", "Springfield", "Columbia"];

export default function HomePage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formContext, setFormContext] = useState<FormContext>({});
  const [formVariant, setFormVariant] = useState<"brief" | "newsletter">("brief");

  const openBriefForm = (ctaName: string) => {
    setFormVariant("brief");
    setFormContext({ request_type: "Intelligence Brief", source_page: "Home", cta_name: ctaName });
    setFormOpen(true);
  };

  const openNewsletterForm = (ctaName: string) => {
    setFormVariant("newsletter");
    setFormContext({ request_type: "Security Brief Signup", source_page: "Home", cta_name: ctaName });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: "#0B1120" }}>
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,17,32,0.92), rgba(11,17,32,0.82), rgba(11,17,32,0.55))" }} />
        </div>
        <div className="csl-container relative py-12">
          <div className="max-w-[640px]">
            <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5 inline-block" style={{ color: "#E8712A" }}>Built for C-Level, Boards, and Community Leaders</span>
             <h1 className="animate-fadeUp font-display" style={{ color: "#F1F5F9" }}>
               Where <span className="text-gold">Cybersecurity Leaders</span> Do Real Work Together
             </h1>
             <p className="animate-fadeUp delay-2 mt-5 text-base max-w-[540px] leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
               CSL is a governed, peer-led platform. Members, sponsors, partners, and workforce leaders work side by side on cyber and AI risk. No vendor pitches. No pay-to-play. Just trusted rooms where decisions get made.
             </p>
            <div className="animate-fadeUp delay-3 flex flex-wrap gap-3 mt-8">
              <Link to="/membership" className="csl-btn csl-btn-primary">
                Become a Founding Member
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link to="/framework" className="csl-btn csl-btn-outline">Explore the Framework</Link>
              <button onClick={() => openNewsletterForm("Get Your Security Brief")} className="csl-btn csl-btn-outline" style={{ borderColor: "rgba(196,155,47,0.3)", color: "#C49B2F" }}>Get Your Security Brief</button>
            </div>
            <div className="animate-fadeUp delay-4 flex flex-wrap gap-4 mt-6 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span>5 Missouri Cities</span>
              <span style={{ opacity: 0.4 }}>&middot;</span>
              <span>100 Founding Spots</span>
              <span style={{ opacity: 0.4 }}>&middot;</span>
              <span>$297/year Locked</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING MEMBER CALLOUT BAND */}
      <div className="py-4 text-center" style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.12), rgba(200,90,30,0.08))", borderTop: "1px solid rgba(212,168,67,0.25)", borderBottom: "1px solid rgba(212,168,67,0.25)" }}>
        <div className="csl-container flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="font-display text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold">
            Founding Member Enrollment Open · First 100 Only
          </span>
          <Link to="/membership" className="csl-btn csl-btn-gold csl-btn-sm" style={{ padding: "0.5rem 1.25rem", fontSize: "0.65rem" }}>
            Claim Your Seat
          </Link>
        </div>
      </div>

      {/* CITY TICKER */}
      <div className="py-3 overflow-hidden" style={{ background: "#0F172A", borderTop: "1px solid rgba(212,168,67,0.15)", borderBottom: "1px solid rgba(212,168,67,0.15)" }}>
        <div className="flex w-max" style={{ animation: "ticker 28s linear infinite" }}>
          {[...cities, ...cities].map((city, i) => (
            <span key={i} className="font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-gold px-6 flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#E8712A" }} />
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* CRISIS STATS - LIGHT */}
      <section className="csl-section-light py-14">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label" style={{ color: "#C85A1E" }}>The Problem</span>
            <h2 className="mt-3" style={{ color: "#0F172A" }}>Three Crises. No One Owns the Fix.</h2>
          </div>
          <div className="csl-grid csl-grid-4">
            {[
              { stat: "750K+", label: "Unfilled U.S. Cyber Jobs" },
              { stat: "6.5T", label: "Global Cybercrime Cost (2026)" },
              { stat: "38%", label: "School Districts Using General Funds" },
              { stat: "0", label: "Unified National Leadership Platform" },
            ].map((item, i) => (
              <div key={i} className="light-card p-5 text-center">
                <div className="font-display text-[1.75rem] font-extrabold" style={{ color: "#C85A1E" }}>{item.stat}</div>
                <div className="text-xs mt-1" style={{ color: "#64748B" }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="csl-grid csl-grid-3 mt-4">
            {[
              { title: "Workforce Crisis", desc: "750K+ roles sit empty. The talent exists. The pipeline to connect students and mentors does not." },
              { title: "Leadership Crisis", desc: "CISOs are isolated. Boards want AI governance answers. Nobody has a shared playbook." },
              { title: "Ecosystem Fragmentation", desc: "Government, education, and industry keep working alone and keep failing alone. CSL is the bridge." },
            ].map((item, i) => (
              <div key={i} className="light-card orange-bar-top p-5">
                <h4 className="font-display mb-2" style={{ color: "#0F172A" }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* WHAT CSL IS - DARK */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="csl-grid csl-grid-2 items-center" style={{ gap: "2rem" }}>
            <div>
              <span className="csl-label">The Platform</span>
              <h2 className="mt-3 leading-snug" style={{ color: "#F1F5F9" }}>Not an Event.<br/>A Leadership Operating Model.</h2>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
                CSL connects education, government, and industry through a governed, peer-led platform. Every relationship is designed to be good for the member, good for CSL, and good for the community.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                {[
                  { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, title: "Trust Over Transaction", desc: "No vendors in the room. Leaders think, learn, and decide together." },
                  { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, title: "Leader-Controlled Outcomes", desc: "Peers set the agenda. Sponsors earn their seat, they don't buy it." },
                  { icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></>, title: "Ongoing Platform", desc: "Monthly roundtables and Level Up sessions. Not one-off dinners." },
                ].map((item, i) => (
                  <div key={i} className="glass-card gold-bar-left p-4 flex gap-4 items-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="2" className="flex-shrink-0 mt-0.5">{item.icon}</svg>
                    <div>
                      <h4 className="font-display text-sm font-bold" style={{ color: "#F1F5F9" }}>{item.title}</h4>
                      <p className="text-sm mt-1" style={{ color: "#E2E8F0" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <img src={FRAMEWORK_BG} alt="CSL Framework" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,17,32,0.7), transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold">CSL 3.0 Operating Model</span>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.9)" }}>10 Domains · Board-Ready · Built for Every Level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* THREE PILLARS - LIGHT */}
      <section className="csl-section-light py-14">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label" style={{ color: "#C85A1E" }}>Lead. Build. Sustain.</span>
            <h2 className="mt-3" style={{ color: "#0F172A" }}>Three Pillars. The Whole Leader.</h2>
          </div>
          <div className="csl-grid csl-grid-3">
            {[
              { title: "Cyber Leadership", color: "#C85A1E", items: ["CSL Cyber Framework 3.0", "Monthly City Council Sessions", "AI Governance Cohort (8 Weeks)", "Board Communication Masterclass", "vCISO Advisory Services", "CPE Credits at Every Event"] },
              { title: "Health & Wellness", color: "#6BC5A0", items: ["Executive Resilience Programming", "Burnout Prevention & Recovery", "Peer Accountability Groups", "Community Outdoor Events", "Leadership Longevity Framework", "Guided Meditation & Mindfulness"] },
              { title: "Wealth & Career", color: "#B8922E", items: ["Free Financial Strategy Session", "Executive Compensation Advisory", "Retirement & Investment Strategy", "Consulting Income Structure", "CISO-to-Board Transition Planning", "Estate & Protection Planning"] },
            ].map((pillar, i) => (
              <div key={i} className="light-card p-6" style={{ borderTop: `3px solid ${pillar.color}` }}>
                <h3 className="font-display text-xl mb-4" style={{ color: "#0F172A" }}>{pillar.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {pillar.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#334155" }}>
                      <CheckIcon color={pillar.color} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* WHO CSL SERVES - DARK */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="text-center mb-8">
            <span className="csl-label">The Community</span>
            <h2 className="mt-3" style={{ color: "#F1F5F9" }}>Built for Decision-Makers at Every Level</h2>
          </div>
           <div className="csl-grid csl-grid-2 lg:csl-grid-3">
             {[
               { title: "Executive Leaders", color: "#C85A1E", desc: "CISOs, CIOs, CTOs, and security leaders. Private dinners, AI governance sessions, and a real peer network.", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
               { title: "Sponsors & Partners", color: "#D4A843", desc: "Vetted technology and service companies. You earn your seat through a 5-step vetting process. Membership is the foundation.", icon: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></> },
               { title: "Community & Workforce Leaders", color: "#6BC5A0", desc: "Students, educators, K-12 staff, and early-career professionals. Mentorship, career pathways, and real connections.", icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></> },
               { title: "Public Sector Leaders", color: "#4A90D9", desc: "CISA, state CISOs, municipal IT, mayors, and city managers. Intelligence sharing, K-12 advisory, and grant coordination.", icon: <><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-4h6v4"/></> },
               { title: "Boards & Advisors", color: "#9B7FD4", desc: "Board members and advisors who need to understand AI risk and hear directly from practitioners.", icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></> },
               { title: "Investors & Supporters", color: "#E8712A", desc: "Mission-aligned funders helping scale a national cybersecurity leadership nonprofit.", icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
             ].map((item, i) => (
              <div key={i} className="glass-card p-5" style={{ borderLeft: `3px solid ${item.color}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: `${item.color}1f` }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2">{item.icon}</svg>
                  </div>
                  <h4 className="font-display" style={{ color: "#F1F5F9" }}>{item.title}</h4>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE COUNCIL SIGNALING */}
      <section className="py-12" style={{ background: "#0F172A", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="csl-container">
          <div className="glass-card gold-bar-left p-6 max-w-[720px] mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,168,67,0.15)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(42 60% 55%)" strokeWidth="2"><path d="M2 4l3 12h14l3-12-5.5 4L12 2l-4.5 6L2 4z"/><path d="M5 16l-1 4h16l-1-4"/></svg>
              </div>
              <div>
                <h3 className="font-display text-lg" style={{ color: "#F1F5F9" }}>Executive Council & Strategic Advisors</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "#E2E8F0" }}>
                  CSL's Executive Council brings together founding members, strategic advisors, and senior practitioners to guide platform direction, curriculum standards, and community governance. Participation is curated and by invitation.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Founding Advisory Network", "Curated Participation", "Governance & Standards", "Strategic Direction"].map((pill) => (
                    <span key={pill} className="px-3 py-1 rounded-full border text-[0.6rem] tracking-[0.08em] uppercase font-display font-semibold" style={{ borderColor: "rgba(212,168,67,0.2)", color: "hsl(42 60% 55%)", background: "rgba(212,168,67,0.06)" }}>{pill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATE INTELLIGENCE BRIEF */}
      <section className="py-16" style={{ background: "#0F172A", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="csl-container">
          <div className="csl-grid csl-grid-2" style={{ alignItems: "stretch" }}>
            <div className="glass-card gold-bar-left p-6">
              <span className="csl-label text-gold">State Intelligence Brief</span>
              <h2 className="font-display mt-3" style={{ color: "#F1F5F9" }}>Free for everyone. Premium for members.</h2>
              <p className="text-[0.95rem] mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
                Every state gets a public brief. Members get the full version with strategy notes, protected signals, and executive context.
              </p>
              <div className="csl-grid csl-grid-2 mt-5">
                <div className="glass-card p-4">
                  <h4 className="font-display text-[0.95rem]" style={{ color: "#F1F5F9" }}>Free Brief</h4>
                  <p className="text-[0.82rem] mt-1.5 leading-relaxed" style={{ color: "#CBD5E1" }}>State risks, funding signals, leadership activity, and CSL expansion updates.</p>
                </div>
                <div className="glass-card p-4">
                  <h4 className="font-display text-[0.95rem]" style={{ color: "#F1F5F9" }}>Member Edition</h4>
                  <p className="text-[0.82rem] mt-1.5 leading-relaxed" style={{ color: "#CBD5E1" }}>Full intelligence, executive context, host city signals, and protected notes.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={() => openNewsletterForm("Join the Security Brief")} className="csl-btn csl-btn-primary">Join the Security Brief</button>
                <Link to="/membership" className="csl-btn csl-btn-outline">Go Premium</Link>
              </div>
            </div>

            <div className="glass-card p-6">
              <span className="csl-label">States Engine</span>
              <h3 className="font-display text-2xl font-extrabold mt-3" style={{ color: "#F1F5F9" }}>All 50 states. Local signal. National platform.</h3>
              <p className="text-[0.9rem] mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
                Pick your state. See what CSL is building there. Raise your hand to host. Missouri is live. The rest are coming.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["All 50 States", "Target Cities", "Host Invitations", "Member Intelligence"].map((pill) => (
                  <span key={pill} className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[0.68rem] tracking-[0.08em] uppercase" style={{ color: "#CBD5E1" }}>{pill}</span>
                ))}
              </div>
              <p className="text-[0.82rem] text-gold mt-5">Missouri CIOs have already requested 4 city hosts. Those rooms are being built now.</p>
            </div>
          </div>
        </div>
      </section>


      {/* FOUNDING CTA */}
      <section className="relative py-20 overflow-hidden" style={{ background: "#0B1120" }}>
        <div className="absolute inset-0">
          <img src={COMMUNITY_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,17,32,0.75), rgba(15,23,42,0.65))" }} />
        </div>
        <div className="csl-container relative text-center">
          <span className="font-display text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold">The Founding Invitation</span>
          <h2 className="font-display mt-3 max-w-[640px] mx-auto leading-snug" style={{ color: "#FFFFFF" }}>
            100 Founding Members. 5 Cities.<br/>Rate Locked Forever.
          </h2>
           <p className="text-sm mt-4 max-w-[540px] mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
             Be one of the first 100. $297/year, locked for life. Your founding designation never expires.
           </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link to="/membership" className="csl-btn csl-btn-gold csl-btn-lg">
              Claim Your Founding Seat
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/events" className="csl-btn csl-btn-outline csl-btn-lg">View Upcoming Dinners</Link>
          </div>
        </div>
      </section>

      <CSLFormModal open={formOpen} onClose={() => setFormOpen(false)} context={formContext} variant={formVariant} />
    </CSLLayout>
  );
}
