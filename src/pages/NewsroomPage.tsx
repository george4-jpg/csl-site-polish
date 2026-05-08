import { useState } from "react";
import CSLLayout from "@/components/CSLLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
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
  CheckCircle2,
  Loader2,
} from "lucide-react";

const REQUEST_TYPES = ["Early Access", "Contributor", "Media", "Partner"] as const;
const FOUNDER_OPTIONS = ["Yes", "Not yet", "Maybe later"] as const;
const SUPABASE_URL = "https://oursmnzsgwjfiejppxac.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";
const NEWSROOM_SIGNUP_URL = `${SUPABASE_URL}/functions/v1/csl-newsroom-signup`;

const newsroomSchema = z.object({
  first_name: z.string().trim().min(1, "Required").max(80),
  last_name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Valid work email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  organization: z.string().trim().min(1, "Required").max(160),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  request_type: z.enum(REQUEST_TYPES),
  founder_conversation: z.enum(FOUNDER_OPTIONS).optional().or(z.literal("")),
});

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  notes: string;
  request_type: typeof REQUEST_TYPES[number];
  founder_conversation: "" | typeof FOUNDER_OPTIONS[number];
};

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
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    notes: "",
    request_type: "Early Access",
    founder_conversation: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value as FormState[typeof k] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = newsroomSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (v && v[0]) fieldErrors[k as keyof FormState] = v[0];
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch(NEWSROOM_SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          first_name: parsed.data.first_name,
          last_name: parsed.data.last_name,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          organization: parsed.data.organization,
          role: parsed.data.role || "",
          request_type: parsed.data.request_type,
          notes: parsed.data.notes || "",
          founder_conversation: parsed.data.founder_conversation || "",
          source: "csl-newsroom-form",
          source_page: "/newsroom",
        }),
      });
      if (!res.ok) throw new Error(`Newsroom signup failed with status ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "We could not reach the service",
        description: "Please try again or email hello@cybersecurity-leadership.org.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            {submitted ? (
              <div
                className="rounded-lg border p-10 text-center"
                style={{ borderColor: `${GOLD}40`, background: "#ffffff05" }}
              >
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: GOLD }} />
                <h3 className="font-[DM_Serif_Display] text-2xl md:text-3xl mb-3">You are on the list</h3>
                <p className="font-[Barlow] text-white/75">
                  Thank you. Your CSL Newsroom request has been received. We will follow up as launch approaches.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border p-6 md:p-8 space-y-5"
                style={{ borderColor: `${GOLD}40`, background: "#ffffff05" }}
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="first_name" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">First name</Label>
                    <Input id="first_name" value={form.first_name} onChange={update("first_name")} className="mt-2 bg-transparent border-white/20 text-white placeholder:text-white/40" />
                    {errors.first_name && <p className="text-xs mt-1" style={{ color: "#ff8a8a" }}>{errors.first_name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Last name</Label>
                    <Input id="last_name" value={form.last_name} onChange={update("last_name")} className="mt-2 bg-transparent border-white/20 text-white placeholder:text-white/40" />
                    {errors.last_name && <p className="text-xs mt-1" style={{ color: "#ff8a8a" }}>{errors.last_name}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Work email</Label>
                  <Input id="email" type="email" value={form.email} onChange={update("email")} className="mt-2 bg-transparent border-white/20 text-white placeholder:text-white/40" />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#ff8a8a" }}>{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Phone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} className="mt-2 bg-transparent border-white/20 text-white placeholder:text-white/40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="organization" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Organization</Label>
                    <Input id="organization" value={form.organization} onChange={update("organization")} className="mt-2 bg-transparent border-white/20 text-white placeholder:text-white/40" />
                    {errors.organization && <p className="text-xs mt-1" style={{ color: "#ff8a8a" }}>{errors.organization}</p>}
                  </div>
                  <div>
                    <Label htmlFor="role" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Role / Title</Label>
                    <Input id="role" value={form.role} onChange={update("role")} className="mt-2 bg-transparent border-white/20 text-white placeholder:text-white/40" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="request_type" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Request Type</Label>
                  <select
                    id="request_type"
                    value={form.request_type}
                    onChange={update("request_type")}
                    className="mt-2 w-full h-10 rounded-md bg-transparent border border-white/20 text-white px-3 text-sm font-[Barlow] focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {REQUEST_TYPES.map((o) => (
                      <option key={o} value={o} style={{ background: NAVY }}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Notes</Label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={update("notes")}
                    className="mt-2 w-full rounded-md bg-transparent border border-white/20 text-white placeholder:text-white/40 px-3 py-2 text-sm font-[Barlow] focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="founder_conversation" className="font-[Barlow_Condensed] uppercase tracking-wide text-xs text-white/70">Founder Conversation</Label>
                  <select
                    id="founder_conversation"
                    value={form.founder_conversation}
                    onChange={update("founder_conversation")}
                    className="mt-2 w-full h-10 rounded-md bg-transparent border border-white/20 text-white px-3 text-sm font-[Barlow] focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" style={{ background: NAVY }}>Select one</option>
                    {FOUNDER_OPTIONS.map((o) => (
                      <option key={o} value={o} style={{ background: NAVY }}>{o}</option>
                    ))}
                  </select>
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-[Barlow_Condensed] uppercase tracking-wider h-12 text-base"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting</>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            )}
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
