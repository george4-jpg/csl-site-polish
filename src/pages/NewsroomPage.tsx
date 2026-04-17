import { useEffect } from "react";
import CSLLayout from "@/components/CSLLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Radio,
  Layers,
  Mic,
  GraduationCap,
  Users,
  Headphones,
  ShieldCheck,
  BarChart3,
  Briefcase,
  Handshake,
  TrendingUp,
  Eye,
  Sparkles,
  Network,
} from "lucide-react";

// CSL | Form | Newsroom Interest — replace with production GHL form URL when issued
const GHL_NEWSROOM_FORM = "https://api.leadconnectorhq.com/widget/form/w9aNVJUgYtH57d1pPgTE";

const scrollToForm = () => {
  const el = document.getElementById("newsroom-intake");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const comingItems = [
  { icon: Radio, title: "Live Briefings", body: "Real-time sessions with operators, leaders, and partners." },
  { icon: Layers, title: "Cyber & AI Topic Channels", body: "Curated streams across the issues that matter now." },
  { icon: Mic, title: "Practitioner Interviews", body: "Direct conversations with the people doing the work." },
  { icon: GraduationCap, title: "Workforce & University Spotlight", body: "Visibility for student SOCs and emerging talent." },
];

const audience = [
  { icon: Users, label: "Practitioners" },
  { icon: Headphones, label: "Podcasters" },
  { icon: ShieldCheck, label: "University SOC Teams" },
  { icon: BarChart3, label: "Industry Analysts" },
  { icon: Briefcase, label: "Executive Leaders" },
  { icon: Handshake, label: "Sponsors & Workforce Partners" },
];

const valueCards = [
  { icon: TrendingUp, title: "Workforce Development", body: "Connecting students, schools, and employers to real outcomes." },
  { icon: Eye, title: "Executive Signal", body: "Clear, leadership-grade insight from active operators." },
  { icon: Sparkles, title: "Partner Visibility", body: "A curated stage for sponsors and contributing partners." },
  { icon: Network, title: "Community Growth", body: "An expanding network of voices, schools, and leaders." },
];

export default function NewsroomPage() {
  useEffect(() => {
    document.title = "CSL Newsroom | Starting Soon";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "A new Cyber & AI Operations Newsroom built for leaders, practitioners, university SOC partners, podcasters, analysts, and the next generation of talent.";
    if (meta) meta.setAttribute("content", desc);
  }, []);

  return (
    <CSLLayout>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d1321] text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(200,90,30,0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(212,168,67,0.15), transparent 45%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#c85a1e]/40 bg-[#c85a1e]/10 text-[#d4a843] text-xs uppercase tracking-[0.2em] font-[Barlow_Condensed]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c85a1e] animate-pulse" />
            Starting Soon
          </div>
          <h1 className="font-[DM_Serif_Display] text-4xl md:text-6xl leading-tight mb-6">
            CSL Newsroom is Starting Soon
          </h1>
          <p className="font-[Barlow] text-lg md:text-xl text-white/80 max-w-3xl mb-6">
            A new Cyber & AI Operations Newsroom built for leaders, practitioners, university SOC partners, podcasters, analysts, and the next generation of talent.
          </p>
          <p className="font-[Barlow] text-base md:text-lg text-white/65 max-w-3xl mb-10">
            Watch live briefings. Track upcoming sessions. Explore cyber and AI content by topic. Join a growing network of contributors, schools, and leadership voices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={scrollToForm}
              className="bg-[#c85a1e] hover:bg-[#b04e18] text-white font-[Barlow_Condensed] uppercase tracking-wider px-8 h-12"
            >
              Join the Newsroom Waitlist
            </Button>
            <Button
              onClick={scrollToForm}
              variant="outline"
              className="border-[#d4a843]/60 text-[#d4a843] hover:bg-[#d4a843]/10 hover:text-[#d4a843] font-[Barlow_Condensed] uppercase tracking-wider px-8 h-12 bg-transparent"
            >
              Become a Contributor
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT IS COMING */}
      <section className="bg-[#0a1628] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-12 text-center">What's Coming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comingItems.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="bg-[#0d1321] border-white/10 text-white">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 text-[#c85a1e] mb-4" />
                  <h3 className="font-[Barlow_Condensed] text-xl uppercase tracking-wide mb-2">{title}</h3>
                  <p className="font-[Barlow] text-sm text-white/70">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-[#0d1321] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-12 text-center">Who It's For</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {audience.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-5 rounded-md border border-white/10 bg-[#0a1628] hover:border-[#d4a843]/40 transition-colors"
              >
                <Icon className="w-6 h-6 text-[#d4a843] flex-shrink-0" />
                <span className="font-[Barlow_Condensed] text-base md:text-lg uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="bg-[#0a1628] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-4">More Than a Content Channel</h2>
            <p className="font-[Barlow] text-base md:text-lg text-white/75 max-w-3xl mx-auto">
              The CSL Newsroom is being built as a leadership-driven media and workforce platform connecting cyber insight, real operators, partner universities, and the future talent pipeline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="bg-[#0d1321] border-white/10 text-white">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 text-[#d4a843] mb-4" />
                  <h3 className="font-[Barlow_Condensed] text-xl uppercase tracking-wide mb-2">{title}</h3>
                  <p className="font-[Barlow] text-sm text-white/70">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="bg-[#0d1321] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-12 text-center">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border border-[#c85a1e]/30 bg-gradient-to-br from-[#0a1628] to-[#0d1321]">
              <h3 className="font-[DM_Serif_Display] text-2xl mb-3">Join the Waitlist</h3>
              <p className="font-[Barlow] text-white/75 mb-6">
                Get launch updates, early access, briefing announcements, and newsroom opportunities.
              </p>
              <Button
                onClick={scrollToForm}
                className="bg-[#c85a1e] hover:bg-[#b04e18] text-white font-[Barlow_Condensed] uppercase tracking-wider"
              >
                Join the Waitlist
              </Button>
            </div>
            <div className="p-8 rounded-lg border border-[#d4a843]/30 bg-gradient-to-br from-[#0a1628] to-[#0d1321]">
              <h3 className="font-[DM_Serif_Display] text-2xl mb-3">Contribute or Partner</h3>
              <p className="font-[Barlow] text-white/75 mb-6">
                Practitioners, podcasters, analysts, student SOCs, universities, and sponsors are welcome to connect.
              </p>
              <Button
                onClick={scrollToForm}
                variant="outline"
                className="border-[#d4a843]/60 text-[#d4a843] hover:bg-[#d4a843]/10 hover:text-[#d4a843] font-[Barlow_Condensed] uppercase tracking-wider bg-transparent"
              >
                Contribute or Partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* INTAKE FORM */}
      <section id="newsroom-intake" className="bg-[#0a1628] text-white py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-4">Join the CSL Newsroom</h2>
            <p className="font-[Barlow] text-base md:text-lg text-white/75 max-w-2xl mx-auto">
              Get updates on launch timing, live briefings, contributor opportunities, university partnerships, and sponsorship openings.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-white/10 bg-white">
            <iframe
              src={GHL_NEWSROOM_FORM}
              title="CSL | Form | Newsroom Interest"
              style={{ width: "100%", minHeight: 640, border: "none" }}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA BAND */}
      <section className="bg-gradient-to-r from-[#c85a1e] to-[#a8451a] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[DM_Serif_Display] text-3xl md:text-4xl mb-4">Be First In</h2>
          <p className="font-[Barlow] text-base md:text-lg text-white/90 mb-8">
            The CSL Newsroom is launching soon. Join now to get early access and help shape what comes next.
          </p>
          <Button
            onClick={scrollToForm}
            className="bg-white text-[#c85a1e] hover:bg-white/90 font-[Barlow_Condensed] uppercase tracking-wider px-8 h-12"
          >
            Join the Newsroom Waitlist
          </Button>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="bg-[#0d1321] text-white/60 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-[Barlow] text-sm">Powered by Cyber Security Leadership (CSL)</p>
        </div>
      </section>
    </CSLLayout>
  );
}
