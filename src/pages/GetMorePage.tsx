import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";

type Domain = "cyber" | "ai" | "both";
type Role = "leader" | "practitioner" | "partner" | "advisor";

const domainOptions: { id: Domain; label: string; sub: string }[] = [
  { id: "cyber", label: "Cyber", sub: "Security risk and operations" },
  { id: "ai", label: "AI", sub: "Governance, safety, and adoption" },
  { id: "both", label: "Both", sub: "Where they intersect" },
];

const roleOptions: { id: Role; label: string; sub: string; badge?: string }[] = [
  { id: "leader", label: "Leader", sub: "Accountable for Cyber or AI risk" },
  { id: "practitioner", label: "Practitioner", sub: "Operating and executing" },
  { id: "partner", label: "Strategic Partner", sub: "Solution provider or sponsor" },
  { id: "advisor", label: "Advisor", sub: "Council or strategic guidance", badge: "Invite only" },
];

function Chip({
  active,
  onClick,
  children,
  badge,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  badge?: string;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition w-full ${
        active
          ? "border-[hsl(var(--gold))]/60 bg-[hsl(var(--gold))]/8 shadow-[0_4px_18px_-8px_hsl(var(--gold)/0.35)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`font-display font-semibold ${active ? "text-[hsl(var(--gold))]" : "text-foreground"}`}>{children}</span>
        {badge && (
          <span className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-white/10 text-[hsl(var(--muted-foreground))]">
            {badge}
          </span>
        )}
      </div>
      {sub && <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-snug">{sub}</div>}
    </button>
  );
}

export default function GetMorePage() {
  const [domain, setDomain] = useState<Domain | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const ctx = useMemo(() => {
    const p = new URLSearchParams();
    p.set("source", "get-more");
    if (domain) p.set("domain", domain);
    if (role) p.set("role", role);
    return p;
  }, [domain, role]);

  const link = (path: string, intent: string) => {
    const p = new URLSearchParams(ctx);
    p.set("intent", intent);
    return `${path}?${p.toString()}`;
  };

  const finalActions: { title: string; sub: string; to: string; tone?: "gold" | "default" }[] = [
    { title: "Apply for Membership", sub: "Step into the private ecosystem.", to: link("/membership", "membership"), tone: "gold" },
    { title: "Book a Conversation", sub: "Speak with the CSL team.", to: link("/book", "book-call") },
    { title: "Explore Advisory Support", sub: "For organizations that need help executing.", to: link("/advisory", "advisory") },
    { title: "Become a Host", sub: "Bring CSL to your city.", to: link("/strategic-partners/apply", "host") },
    { title: "Explore Partnership", sub: "Strategic partner and sponsor pathways.", to: link("/strategic-partners", "partner") },
    { title: "Recommend a Partner", sub: "Suggest a leader, operator, or solution.", to: link("/strategic-partners/apply", "recommend") },
  ];

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="relative" style={{ background: "#0B1120" }}>
        <div className="csl-container py-20">
          <span className="font-display text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[hsl(var(--gold))]">
            Get More
          </span>
          <h1 className="mt-3 font-display text-foreground" style={{ maxWidth: 720 }}>
            You&rsquo;re exploring CSL. Good.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/80" style={{ maxWidth: 640 }}>
            Most communities talk. CSL brings leaders, operators, and partners together to solve real problems.
          </p>
          <p className="mt-3 text-sm text-[hsl(var(--gold))]/85">Keep going. This gets interesting.</p>
        </div>
      </section>

      {/* TRUST */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container">
          <div className="max-w-[820px]">
            <span className="csl-label text-[hsl(var(--gold))]">Trust + Credibility</span>
            <h2 className="mt-3" style={{ color: "#F1F5F9" }}>Built by experienced leaders. Delivered as a team.</h2>
            <p className="text-sm mt-4 leading-relaxed text-foreground/85">
              CSL is supported by experienced leadership, active delivery partners, a growing advisory network, and a
              forming advisory council. The foundation includes over 40 years of real-world experience, but CSL is bigger
              than one person. It is a growing ecosystem designed to help leaders move forward with clarity.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {[
              "This is not a sales platform.",
              "No cold pitches. No pressure.",
              "Partners support outcomes, not sales cycles.",
            ].map((t) => (
              <div key={t} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-foreground/85">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CSL DOES */}
      <section className="csl-section csl-section-dark border-t border-white/5">
        <div className="csl-container">
          <span className="csl-label text-[hsl(var(--gold))]">What CSL Does</span>
          <h2 className="mt-3" style={{ color: "#F1F5F9" }}>Four moving parts. One operating model.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {[
              { t: "Leaders solve real problems", s: "Members bring the priorities. CSL brings the structure." },
              { t: "Practitioners execute and contribute", s: "Operators who have done the work, not just talked about it." },
              { t: "Global and local partners support", s: "Federal, state, industry, and private sector resources." },
              { t: "Local and virtual experiences", s: "Roundtables, briefings, and working sessions that produce outcomes." },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-white/10 bg-[hsl(var(--navy-mid))]/40 p-5">
                <h4 className="font-display text-sm text-foreground">{b.t}</h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">{b.s}</p>
              </div>
            ))}
          </div>
          <p className="font-display text-[0.72rem] font-bold tracking-[0.18em] uppercase text-[hsl(var(--gold))] mt-8">
            Global expertise. Local execution. No sales pressure. Real outcomes.
          </p>
        </div>
      </section>

      {/* SOFT SIGNAL */}
      <section className="csl-section csl-section-dark border-t border-white/5">
        <div className="csl-container">
          <span className="csl-label text-[hsl(var(--gold))]">Tell us where you are</span>
          <h2 className="mt-3" style={{ color: "#F1F5F9" }}>What are you most interested in?</h2>
          <div className="grid sm:grid-cols-3 gap-3 mt-5">
            {domainOptions.map((d) => (
              <Chip key={d.id} active={domain === d.id} onClick={() => setDomain(d.id)} sub={d.sub}>
                {d.label}
              </Chip>
            ))}
          </div>

          <h3 className="mt-10 font-display text-xl text-foreground">Where do you fit today?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {roleOptions.map((r) => (
              <Chip key={r.id} active={role === r.id} onClick={() => setRole(r.id)} sub={r.sub} badge={r.badge}>
                {r.label}
              </Chip>
            ))}
          </div>

          {(domain || role) && (
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-5">
              We&rsquo;ll carry your selections into the next step. Nothing is submitted until you choose an action below.
            </p>
          )}
        </div>
      </section>

      {/* HOW PEOPLE ENGAGE */}
      <section className="csl-section csl-section-dark border-t border-white/5">
        <div className="csl-container">
          <span className="csl-label text-[hsl(var(--gold))]">How People Engage</span>
          <h2 className="mt-3" style={{ color: "#F1F5F9" }}>Pick the door that fits.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {[
              "Become a Member",
              "Attend or host local and virtual events",
              "Use advisory services",
              "Become a strategic partner or sponsor",
              "Recommend a partner",
              "Request advisor consideration",
            ].map((t) => (
              <div key={t} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-foreground/85">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ACTIONS */}
      <section className="csl-section csl-section-dark border-t border-white/5">
        <div className="csl-container">
          <span className="csl-label text-[hsl(var(--gold))]">Final Actions</span>
          <h2 className="mt-3" style={{ color: "#F1F5F9" }}>When you&rsquo;re ready, choose your next step.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {finalActions.map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className={`rounded-xl border p-5 transition group ${
                  a.tone === "gold"
                    ? "border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/[0.06] hover:bg-[hsl(var(--gold))]/[0.12]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <div className="font-display text-base text-foreground group-hover:text-[hsl(var(--gold))] transition">
                  {a.title}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">{a.sub}</div>
              </Link>
            ))}
          </div>
          <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-6">
            Your selections travel with you as context. No forms here. No pressure.
          </p>
        </div>
      </section>
    </CSLLayout>
  );
}
