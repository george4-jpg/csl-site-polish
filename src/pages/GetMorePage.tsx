import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";

type Intent = "learn" | "support" | "involved";
type Role = "leader" | "practitioner" | "partner" | "advisor";
type Domain = "cyber" | "ai" | "both";

const primaryChoices: { id: Intent; title: string; sub: string }[] = [
  { id: "learn", title: "Learn & Explore", sub: "Understand how CSL works." },
  { id: "support", title: "Get Support", sub: "Solve a real problem." },
  { id: "involved", title: "Get Involved", sub: "Join, host, or partner." },
];

const roleOptions: { id: Role; label: string; badge?: string }[] = [
  { id: "leader", label: "Leader" },
  { id: "practitioner", label: "Practitioner" },
  { id: "partner", label: "Strategic Partner" },
  { id: "advisor", label: "Advisor", badge: "Invite only" },
];

const domainOptions: { id: Domain; label: string }[] = [
  { id: "cyber", label: "Cyber" },
  { id: "ai", label: "AI" },
  { id: "both", label: "Both" },
];

export default function GetMorePage() {
  const [primary, setPrimary] = useState<Intent | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);

  const effectiveDomain: Domain =
    domains.length === 0 || domains.length > 1 ? "both" : domains[0];

  const toggleDomain = (d: Domain) => {
    if (d === "both") {
      setDomains(domains.includes("both") ? [] : ["both"]);
      return;
    }
    const next = domains.filter((x) => x !== "both");
    setDomains(next.includes(d) ? next.filter((x) => x !== d) : [...next, d]);
  };

  const ctx = useMemo(() => {
    const p = new URLSearchParams();
    p.set("source", "get-more");
    p.set("domain", effectiveDomain);
    if (role) p.set("role", role);
    if (primary) p.set("path", primary);
    return p;
  }, [primary, role, effectiveDomain]);

  const link = (path: string, intent: string) => {
    const p = new URLSearchParams(ctx);
    p.set("intent", intent);
    return `${path}?${p.toString()}`;
  };

  const finalActions: { title: string; sub: string; to: string; tone?: "gold" }[] = [
    { title: "Apply for Membership", sub: "Step into the private ecosystem.", to: link("/membership", "membership"), tone: "gold" },
    { title: "Book a Conversation", sub: "Speak with the CSL team.", to: link("/book", "book-call") },
    { title: "Explore Advisory Support", sub: "Help executing what matters.", to: link("/advisory", "advisory") },
    { title: "Become a Host", sub: "Bring CSL to your city.", to: link("/strategic-partners/apply", "host") },
    { title: "Explore Partnership", sub: "Strategic partner pathways.", to: link("/strategic-partners", "partner") },
  ];

  return (
    <CSLLayout>
      {/* HERO + PRIMARY CHOICE */}
      <section className="relative" style={{ background: "#0B1120", minHeight: "92vh" }}>
        <div className="csl-container py-16 md:py-24">
          <span className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[hsl(var(--gold))]">
            Get More
          </span>
          <h1 className="mt-3 font-display text-foreground" style={{ maxWidth: 720 }}>
            What are you looking to do?
          </h1>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {primaryChoices.map((c) => {
              const active = primary === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setPrimary(c.id)}
                  className={`text-left rounded-2xl border p-6 md:p-7 transition group ${
                    active
                      ? "border-[hsl(var(--gold))]/70 bg-[hsl(var(--gold))]/[0.10] shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.45)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className={`font-display text-xl md:text-2xl ${active ? "text-[hsl(var(--gold))]" : "text-foreground"}`}>
                    {c.title}
                  </div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))] mt-2">{c.sub}</div>
                </button>
              );
            })}
          </div>

          {/* STEP 2 — appears inline */}
          {primary && (
            <div className="mt-14 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="csl-label text-[hsl(var(--gold))]">Step 2</span>
              <h2 className="mt-2 font-display text-foreground">Where do you fit?</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                {roleOptions.map((r) => {
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

              {/* INTEREST */}
              <div className="mt-10">
                <h3 className="font-display text-lg text-foreground">
                  What are you interested in? <span className="text-xs text-[hsl(var(--muted-foreground))] font-sans">(optional)</span>
                </h3>
                <div className="flex flex-wrap gap-3 mt-4">
                  {domainOptions.map((d) => {
                    const active =
                      domains.includes(d.id) || (d.id === "both" && domains.length === 0);
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
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FINAL ACTIONS — visible after any selection */}
      {(primary || role) && (
        <section className="csl-section csl-section-dark border-t border-white/5">
          <div className="csl-container">
            <span className="csl-label text-[hsl(var(--gold))]">Next Step</span>
            <h2 className="mt-2 font-display" style={{ color: "#F1F5F9" }}>
              When you&rsquo;re ready, choose your next step.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
              {finalActions.map((a) => (
                <Link
                  key={a.title}
                  to={a.to}
                  className={`rounded-xl border p-5 transition group ${
                    a.tone === "gold"
                      ? "border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/[0.06] hover:bg-[hsl(var(--gold))]/[0.12]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <div className="font-display text-base text-foreground group-hover:text-[hsl(var(--gold))] transition">
                    {a.title}
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">{a.sub}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </CSLLayout>
  );
}
