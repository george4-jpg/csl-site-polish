import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import CSLLayout from "@/components/CSLLayout";

type Intent = "member" | "advisory" | "events" | "partner" | "recommend";
type Role = "leader" | "practitioner" | "partner" | "advisor";
type Domain = "cyber" | "ai";

const intents: { id: Intent; title: string; sub: string; to?: string }[] = [
  { id: "member", title: "Become a Member", sub: "Step into the private ecosystem.", to: "/membership" },
  { id: "advisory", title: "Get Advisory Support", sub: "Speak with the CSL team.", to: "/advisory" },
  { id: "events", title: "Attend or Host Events", sub: "Join, host, or register.", to: "/events" },
  { id: "partner", title: "Explore Strategic Partnership", sub: "Partner pathways for vendors and firms." },
  { id: "recommend", title: "Recommend a Partner", sub: "Refer someone we should know." },
];

const roles: { id: Role; label: string; badge?: string }[] = [
  { id: "leader", label: "Leader" },
  { id: "practitioner", label: "Practitioner" },
  { id: "partner", label: "Strategic Partner" },
  { id: "advisor", label: "Advisor", badge: "Invite only" },
];

const domainOpts: { id: Domain; label: string }[] = [
  { id: "cyber", label: "Cyber" },
  { id: "ai", label: "AI" },
];

type Step = 1 | 2 | 3;

export default function GetMorePage() {
  const [step, setStep] = useState<Step>(1);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);

  const effectiveDomain = domains.length === 1 ? domains[0] : "both";

  const ctx = useMemo(() => {
    const p = new URLSearchParams();
    p.set("source", "get-more");
    if (intent) p.set("intent", intent);
    if (role) p.set("role", role);
    p.set("domain", effectiveDomain);
    return p.toString();
  }, [intent, role, effectiveDomain]);

  const link = (path: string) => `${path}?${ctx}`;

  const toggleDomain = (d: Domain) =>
    setDomains((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const pickIntent = (id: Intent) => {
    setIntent(id);
    setStep(2);
  };

  const goStep3 = () => role && setStep(3);

  // Step 3 routing content
  const step3Actions = (): { title: string; sub: string; to: string; tone?: "gold" }[] => {
    switch (intent) {
      case "member":
        return [
          { title: "Choose Your Membership", sub: "Founding, Standard, or Executive.", to: link("/membership"), tone: "gold" },
          { title: "Talk to the Team First", sub: "Book a short conversation.", to: link("/book") },
        ];
      case "advisory":
        return [
          { title: "Book a Conversation", sub: "Speak with the CSL team.", to: link("/book"), tone: "gold" },
          { title: "Submit Advisory Intake", sub: "Tell us what you need help with.", to: link("/advisory") },
        ];
      case "events":
        return [
          { title: "Browse Upcoming Events", sub: "See what is open now.", to: link("/events"), tone: "gold" },
          { title: "Register for an Event", sub: "Reserve your seat.", to: link("/register") },
          { title: "Host CSL in Your City", sub: "Apply to host a chapter event.", to: link("/strategic-partners/apply") },
        ];
      case "partner":
        return [
          { title: "Strategic Partner Overview", sub: "Pillars, value, and process.", to: link("/strategic-partners"), tone: "gold" },
          { title: "Apply to Partner", sub: "Submit a partner intake.", to: link("/strategic-partners/apply") },
        ];
      case "recommend":
        return [
          { title: "Recommend a Partner", sub: "Quick referral form.", to: link("/strategic-partners/apply"), tone: "gold" },
        ];
      default:
        return [];
    }
  };

  return (
    <CSLLayout>
      <section style={{ background: "#0B1120", minHeight: "92vh" }}>
        {/* Sticky header */}
        <div className="sticky top-[64px] z-10 bg-[#0B1120]/95 backdrop-blur border-b border-white/5">
          <div className="csl-container flex items-center justify-between py-4">
            <button
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : 1))}
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm transition ${
                step === 1 ? "opacity-30 cursor-default" : "text-foreground/80 hover:text-[hsl(var(--gold))]"
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`h-1.5 rounded-full transition-all ${
                    step >= (n as Step) ? "w-6 bg-[hsl(var(--gold))]" : "w-3 bg-white/15"
                  }`}
                />
              ))}
            </div>
            <span className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[hsl(var(--gold))]">
              Get More
            </span>
          </div>
        </div>

        <div className="csl-container py-10 md:py-16">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h1 className="font-display text-foreground" style={{ maxWidth: 680 }}>
                What do you want to do?
              </h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">Pick one to continue.</p>

              <div className="mt-8 flex flex-col gap-3">
                {intents.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => pickIntent(i.id)}
                    className="group w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[hsl(var(--gold))]/60 hover:bg-[hsl(var(--gold))]/[0.06] transition p-5 md:p-6 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="font-display text-lg md:text-xl text-foreground group-hover:text-[hsl(var(--gold))] transition">
                        {i.title}
                      </div>
                      <div className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] mt-1">{i.sub}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-foreground/40 group-hover:text-[hsl(var(--gold))] shrink-0 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h1 className="font-display text-foreground" style={{ maxWidth: 680 }}>
                Tell us where you fit
              </h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">Used to route you correctly.</p>

              <div className="mt-8">
                <div className="csl-label text-[hsl(var(--gold))]">Your Role</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {roles.map((r) => {
                    const active = role === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={`rounded-xl border p-4 text-left transition ${
                          active
                            ? "border-[hsl(var(--gold))]/70 bg-[hsl(var(--gold))]/[0.10]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block h-3 w-3 rounded-full border ${
                              active ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]" : "border-white/40"
                            }`}
                          />
                          <span className={`font-display ${active ? "text-[hsl(var(--gold))]" : "text-foreground"}`}>
                            {r.label}
                          </span>
                        </div>
                        {r.badge && (
                          <div className="text-[10px] font-semibold tracking-wider uppercase text-[hsl(var(--muted-foreground))] mt-2">
                            {r.badge}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <div className="csl-label text-[hsl(var(--gold))]">
                  Domain <span className="text-[hsl(var(--muted-foreground))] font-sans normal-case tracking-normal">(optional)</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {domainOpts.map((d) => {
                    const active = domains.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        onClick={() => toggleDomain(d.id)}
                        className={`rounded-full border px-5 py-2 text-sm transition ${
                          active
                            ? "border-[hsl(var(--gold))]/70 bg-[hsl(var(--gold))]/[0.12] text-[hsl(var(--gold))]"
                            : "border-white/15 bg-white/[0.03] text-foreground/80 hover:border-white/30"
                        }`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-3">
                  No selection defaults to Both.
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={goStep3}
                  disabled={!role}
                  className={`inline-flex items-center gap-2 rounded-full px-7 py-3 font-display text-sm transition ${
                    role
                      ? "bg-[hsl(var(--gold))] text-[#0B1120] hover:brightness-110 shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.55)]"
                      : "bg-white/[0.06] text-foreground/40 cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h1 className="font-display text-foreground" style={{ maxWidth: 680 }}>
                Choose your next step
              </h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3">
                {intents.find((i) => i.id === intent)?.title} · {roles.find((r) => r.id === role)?.label}
                {effectiveDomain !== "both" && ` · ${effectiveDomain.toUpperCase()}`}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {step3Actions().map((a) => (
                  <Link
                    key={a.title}
                    to={a.to}
                    className={`group w-full rounded-2xl border p-5 md:p-6 flex items-center justify-between gap-4 transition ${
                      a.tone === "gold"
                        ? "border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/[0.08] hover:bg-[hsl(var(--gold))]/[0.14]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-display text-lg text-foreground group-hover:text-[hsl(var(--gold))] transition">
                        {a.title}
                      </div>
                      <div className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] mt-1">{a.sub}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-foreground/40 group-hover:text-[hsl(var(--gold))] shrink-0 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </CSLLayout>
  );
}
