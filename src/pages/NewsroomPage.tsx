import { useEffect } from "react";
import CSLLayout from "@/components/CSLLayout";
import { Button } from "@/components/ui/button";
import {
  Radio,
  Signal,
  Users,
  ShieldCheck,
  Sparkles,
  Mic,
  GraduationCap,
  Handshake,
  Briefcase,
  Eye,
  MessageSquare,
} from "lucide-react";

const GHL_NEWSROOM_FORM = "https://api.leadconnectorhq.com/widget/form/k7POjiPe1fllvT2Gwo0b";

const NAVY = "#0B132B";
const GOLD = "#D4AF37";

const scrollToForm = () => {
  const el = document.getElementById("newsroom-intake");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const whatThisIs = [
  { icon: Signal, title: "Live Intelligence", body: "Real-time signal curation across cyber and AI risk." },
  { icon: Radio, title: "Moderated Broadcasts", body: "Leadership-grade sessions with operators and analysts." },
  { icon: Users, title: "Contributor Network", body: "A vetted circle of practitioners adding insight." },
  { icon: ShieldCheck, title: "Built for Leaders", body: "For those accountable for cyber and AI outcomes." },
];

const whoShouldJoin = [
  { icon: Briefcase, label: "Leaders" },
  { icon: Handshake, label: "Partners" },
  { icon: Mic, label: "Creators" },
  { icon: GraduationCap, label: "Education / SOC" },
];

const howItWorks = [
  { step: "01", title: "Signals Curated", body: "Cyber and AI signals are filtered for leadership relevance." },
  { step: "02", title: "Contributors Add Insight", body: "Practitioners shape the signal with field context." },
  { step: "03", title: "Live Broadcasts", body: "Moderated sessions turn insight into discussion." },
];

const comingSoon = [
  { icon: Radio, title: "Live Broadcasts" },
  { icon: Users, title: "Contributor Network" },
  { icon: Eye, title: "Industry Briefings" },
  { icon: GraduationCap, title: "Student SOC Collaboration" },
];

export default function NewsroomPage() {
  useEffect(() => {
    document.title = "CSL Newsroom | Coming Soon";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "CSL Newsroom is a live cyber and AI intelligence network for leaders. Request early access or join as a contributor.";
    if (meta) meta.setAttribute("content", desc);

    const scriptId = "ghl-form-embed";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://link.msgsndr.com/js/form_embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <CSLLayout>
      <div style={{ background: NAVY }} className="text-white">

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, ${GOLD}22, transparent 45%), radial-gradient(circle at 80% 70%, ${GOLD}11, transparent 50%)`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-36 text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border text-xs uppercase tracking-[0.25em] font-[Barlow_Condensed]"
              style={{ borderColor: `${GOLD}66`, color: GOLD, background: `${GOLD}10` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
              Coming Soon
            </div>
            <h1 className="font-[DM_Serif_Display] text-5xl md:text-7xl leading-tight mb-6">
              CSL <span style={{ color: GOLD }}>Newsroom</span>
            </h1>
            <p className="font-[Barlow] text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12">
              A live cyber and AI intelligence network for leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToForm}
                className="font-[Barlow_Condensed] uppercase tracking-wider px-8 h-12 text-base"
                style={{ background: GOLD, color: NAVY }}
              >
                Request Early Access
              </Button>
              <Button
                onClick={scrollToForm}
                variant="outline"
                className="font-[Barlow_Condensed] uppercase tracking-wider px-8 h-12 text-base bg-transparent hover:bg-white/5"
                style={{ borderColor: `${GOLD}80`, color: GOLD }}
              >
                Become a Contributor
              </Button>
            </div>
          </div>
        </section>

        {/* WHAT THIS IS */}
        <section className="py-20 border-t" style={{ borderColor: "#ffffff10" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs uppercase tracking-[0.3em] font-[Barlow_Condensed] mb-3" style={{ color: GOLD }}>
                What This Is
              </div>
              <h2 className="font-[DM_Serif_Display] text-3xl md:text-5xl">A signal network, not a feed</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whatThisIs.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="p-6 rounded-lg border transition-colors"
                  style={{ borderColor: "#ffffff15", background: "#ffffff05" }}
                >
                  <Icon className="w-8 h-8 mb-4" style={{ color: GOLD }} />
                  <h3 className="font-[Barlow_Condensed] text-xl uppercase tracking-wide mb-2">{title}</h3>
                  <p className="font-[Barlow] text-sm text-white/70 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO SHOULD JOIN */}
        <section className="py-20 border-t" style={{ borderColor: "#ffffff10", background: "#0a1024" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs uppercase tracking-[0.3em] font-[Barlow_Condensed] mb-3" style={{ color: GOLD }}>
                Who Should Join
              </div>
              <h2 className="font-[DM_Serif_Display] text-3xl md:text-5xl">Built for the people responsible</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {whoShouldJoin.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border"
                  style={{ borderColor: "#ffffff15", background: NAVY }}
                >
                  <Icon className="w-8 h-8" style={{ color: GOLD }} />
                  <span className="font-[Barlow_Condensed] text-base md:text-lg uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 border-t" style={{ borderColor: "#ffffff10" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs uppercase tracking-[0.3em] font-[Barlow_Condensed] mb-3" style={{ color: GOLD }}>
                How It Works
              </div>
              <h2 className="font-[DM_Serif_Display] text-3xl md:text-5xl">From signal to discussion</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howItWorks.map(({ step, title, body }) => (
                <div
                  key={step}
                  className="p-8 rounded-lg border"
                  style={{ borderColor: "#ffffff15", background: "#ffffff05" }}
                >
                  <div className="font-[DM_Serif_Display] text-4xl mb-4" style={{ color: GOLD }}>{step}</div>
                  <h3 className="font-[Barlow_Condensed] text-xl uppercase tracking-wide mb-2">{title}</h3>
                  <p className="font-[Barlow] text-sm text-white/70 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="py-20 border-t" style={{ borderColor: "#ffffff10", background: "#0a1024" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-xs uppercase tracking-[0.3em] font-[Barlow_Condensed] mb-3" style={{ color: GOLD }}>
                Coming Soon
              </div>
              <h2 className="font-[DM_Serif_Display] text-3xl md:text-5xl">What launches first</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {comingSoon.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 p-6 rounded-lg border"
                  style={{ borderColor: `${GOLD}30`, background: NAVY }}
                >
                  <Icon className="w-7 h-7 flex-shrink-0" style={{ color: GOLD }} />
                  <span className="font-[Barlow_Condensed] text-base md:text-lg uppercase tracking-wide">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="newsroom-intake" className="py-20 border-t scroll-mt-20" style={{ borderColor: "#ffffff10" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-[0.3em] font-[Barlow_Condensed] mb-3" style={{ color: GOLD }}>
                Get In
              </div>
              <h2 className="font-[DM_Serif_Display] text-3xl md:text-5xl mb-4">Join the CSL Newsroom</h2>
              <p className="font-[Barlow] text-base md:text-lg text-white/75 max-w-xl mx-auto">
                Request early access or apply to contribute. We will be in touch as launch nears.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border bg-white" style={{ borderColor: `${GOLD}40` }}>
              <iframe
                src={GHL_NEWSROOM_FORM}
                id="inline-k7POjiPe1fllvT2Gwo0b"
                title="CSL | Newsroom Interest"
                style={{ width: "100%", height: 1050, border: "none", background: "white" }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-16 border-t text-center" style={{ borderColor: "#ffffff10", background: NAVY }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-6">
              Be first inside the <span style={{ color: GOLD }}>Newsroom</span>
            </h2>
            <Button
              onClick={scrollToForm}
              className="font-[Barlow_Condensed] uppercase tracking-wider px-10 h-12 text-base"
              style={{ background: GOLD, color: NAVY }}
            >
              Get Early Access
            </Button>
          </div>
        </section>
      </div>
    </CSLLayout>
  );
}
