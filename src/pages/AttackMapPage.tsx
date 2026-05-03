import { useMemo, useState } from "react";
import { ChevronDown, Eye, Sparkles, Compass } from "lucide-react";

type Industry = "Education" | "Government" | "Private";
type Focus = "Most Relevant" | "Highest Impact" | "Most Active";
type Level = "High" | "Medium" | "Low";

interface Domain {
  id: string;
  number: number;
  name: string;
  hook: string;
  entryPoint: string;
  impact: Level;
  activity: Level;
  industryRelevance: Record<Industry, Level>;
  useCases: [string, string];
  emergingThreats: [string, string];
  blindSpots: [string, string];
  solutions: [string, string, string];
  deepDive: string;
}

const DOMAINS: Domain[] = [
  {
    id: "email",
    number: 1,
    name: "Email Security",
    hook: "Still the easiest way in",
    entryPoint: "Email",
    impact: "High",
    activity: "High",
    industryRelevance: { Education: "High", Government: "High", Private: "High" },
    useCases: ["Executive impersonation and wire fraud", "Vendor invoice manipulation"],
    emergingThreats: ["AI generated spear phishing at scale", "MFA bypass via reverse proxy kits"],
    blindSpots: ["Internal to internal phishing after one account is taken over", "Lookalike domain monitoring rarely covers suppliers"],
    solutions: ["Cloud email security gateways", "Account takeover detection platforms", "Domain and brand protection services"],
    deepDive: "A finance leader receives a thread that looks like an existing vendor exchange. The reply address is one character off. Wire instructions update mid conversation and the transfer clears before reconciliation.",
  },
  {
    id: "identity",
    number: 2,
    name: "Identity and Access",
    hook: "Access is the new perimeter",
    entryPoint: "Identity",
    impact: "High",
    activity: "High",
    industryRelevance: { Education: "Medium", Government: "High", Private: "High" },
    useCases: ["Token theft and session replay", "Service account abuse for lateral movement"],
    emergingThreats: ["Help desk social engineering for MFA reset", "OAuth consent phishing across SaaS"],
    blindSpots: ["Non human identities outnumber humans and are rarely governed", "Stale privileged access from past projects"],
    solutions: ["Identity threat detection and response", "Privileged access management", "SaaS identity posture management"],
    deepDive: "An attacker calls the service desk pretending to be a traveling executive. MFA is reset, a session token is captured, and within minutes the actor pivots into payroll and finance applications.",
  },
  {
    id: "endpoint",
    number: 3,
    name: "Endpoint and Cyber Physical",
    hook: "Trust at the edge creates exposure",
    entryPoint: "Device",
    impact: "High",
    activity: "Medium",
    industryRelevance: { Education: "Medium", Government: "High", Private: "Medium" },
    useCases: ["Unmanaged contractor laptops on sensitive networks", "OT and building systems exposed to IT"],
    emergingThreats: ["Firmware level implants on peripherals", "Living off the land binaries to evade EDR"],
    blindSpots: ["IoT and facility devices outside the EDR footprint", "BYOD with corporate SSO and no posture checks"],
    solutions: ["Modern EDR and XDR", "OT and IoT visibility platforms", "Device posture and zero trust enforcement"],
    deepDive: "A facilities vendor connects a maintenance laptop to a building automation network. That network shares a flat path to corporate. One unpatched device becomes the foothold for everything else.",
  },
  {
    id: "network",
    number: 4,
    name: "Network and Edge",
    hook: "Movement happens faster than detection",
    entryPoint: "Network",
    impact: "Medium",
    activity: "High",
    industryRelevance: { Education: "High", Government: "Medium", Private: "Medium" },
    useCases: ["VPN and edge appliance exploitation", "East west movement across flat networks"],
    emergingThreats: ["Zero days in perimeter appliances", "Encrypted command and control over common ports"],
    blindSpots: ["Legacy segmentation that exists on diagrams but not in practice", "Branch and remote sites without inspection"],
    solutions: ["Secure access service edge", "Network detection and response", "Microsegmentation platforms"],
    deepDive: "An edge appliance is exploited on a Friday night. By Monday, the actor has mapped the internal network through normal looking traffic and pre staged tools across three business units.",
  },
  {
    id: "cloud",
    number: 5,
    name: "Cloud Security",
    hook: "Visibility struggles at scale",
    entryPoint: "Cloud",
    impact: "High",
    activity: "High",
    industryRelevance: { Education: "Medium", Government: "Medium", Private: "High" },
    useCases: ["Misconfigured storage and public buckets", "Cross account role abuse"],
    emergingThreats: ["Cloud key theft from developer endpoints", "Shadow tenants spun up outside central IT"],
    blindSpots: ["Drift between infrastructure as code and live state", "Permissions that look least privilege but chain into admin"],
    solutions: ["Cloud native application protection platforms", "Cloud infrastructure entitlement management", "Posture management with runtime context"],
    deepDive: "A developer key ends up in a public repo for nine minutes. Automated scanners find it first. The actor uses it to enumerate roles and quietly assumes a path into the production data plane.",
  },
  {
    id: "appsec",
    number: 6,
    name: "Application Security",
    hook: "Speed creates blind spots",
    entryPoint: "Application",
    impact: "Medium",
    activity: "Medium",
    industryRelevance: { Education: "Medium", Government: "Medium", Private: "High" },
    useCases: ["API abuse and broken object level authorization", "Vulnerable open source components in production"],
    emergingThreats: ["AI assisted code introducing silent flaws", "Supply chain compromise of build pipelines"],
    blindSpots: ["Internal APIs treated as trusted by default", "Secrets embedded in build artifacts"],
    solutions: ["API security platforms", "Software composition analysis", "Pipeline and build integrity tooling"],
    deepDive: "A mobile API trusts the client to enforce limits. A researcher changes a single ID parameter and pulls records belonging to other customers. The flaw shipped six releases ago.",
  },
  {
    id: "data",
    number: 7,
    name: "Data Security",
    hook: "Data moves faster than control",
    entryPoint: "Data",
    impact: "High",
    activity: "Medium",
    industryRelevance: { Education: "High", Government: "High", Private: "High" },
    useCases: ["Sensitive data sprawl across SaaS", "Insider exfiltration to personal accounts"],
    emergingThreats: ["Generative AI tools ingesting confidential content", "Data poisoning of internal models"],
    blindSpots: ["Unstructured data in collaboration tools", "Backups treated as archive and not as targets"],
    solutions: ["Data security posture management", "Data loss prevention with context", "AI usage monitoring and guardrails"],
    deepDive: "A team uses a public AI tool to summarize a board deck. Fragments of strategy and financials sit in a third party log store outside any retention or legal hold.",
  },
  {
    id: "governance",
    number: 8,
    name: "Governance",
    hook: "Gaps between policy and reality",
    entryPoint: "Process",
    impact: "Medium",
    activity: "Low",
    industryRelevance: { Education: "Medium", Government: "High", Private: "Medium" },
    useCases: ["Third party risk that ends at the questionnaire", "Control evidence collected once a year"],
    emergingThreats: ["Regulatory expectations outpacing internal capability", "Board exposure on AI use and disclosure"],
    blindSpots: ["Exceptions that quietly become permanent", "Ownership gaps between business, IT, and security"],
    solutions: ["Integrated risk and control platforms", "Continuous controls monitoring", "Board level reporting frameworks"],
    deepDive: "A critical vendor is reassessed and quietly downgraded. The risk register reflects it. No one reopens the contract, the integration, or the data flow that depends on it.",
  },
  {
    id: "human",
    number: 9,
    name: "Human and Machine Factor",
    hook: "Behavior is now attackable",
    entryPoint: "People",
    impact: "Medium",
    activity: "High",
    industryRelevance: { Education: "High", Government: "Medium", Private: "Medium" },
    useCases: ["Targeted social engineering of executive assistants", "Insider risk during reorganizations"],
    emergingThreats: ["Deepfake voice and video on routine calls", "AI agents acting on behalf of users with broad scope"],
    blindSpots: ["Trust signals like familiar voices no longer reliable", "Agent permissions inherited without review"],
    solutions: ["Human risk management platforms", "Insider risk and behavioral analytics", "AI agent governance tooling"],
    deepDive: "An assistant gets a short voice note from a known executive asking to expedite a wire. The voice is right, the context is right, the timing is right. None of it is real.",
  },
  {
    id: "soc",
    number: 10,
    name: "Cybersecurity Operations",
    hook: "Noise hides real signals",
    entryPoint: "Operations",
    impact: "High",
    activity: "High",
    industryRelevance: { Education: "Medium", Government: "High", Private: "High" },
    useCases: ["Alert fatigue masking active intrusions", "Detection coverage gaps across new platforms"],
    emergingThreats: ["Faster intrusion to impact timelines", "Adversaries using the same automation defenders rely on"],
    blindSpots: ["Playbooks that assume working logging and identity context", "Tabletop exercises that never test real handoffs"],
    solutions: ["Modern SIEM and detection engineering", "Managed detection and response", "Incident response retainers and orchestration"],
    deepDive: "A high severity alert fires at 2 a.m. It blends into a queue of similar alerts triaged as benign each week. Three hours later, the actor reaches the data they came for.",
  },
];

const INDUSTRIES: Industry[] = ["Education", "Government", "Private"];
const FOCUSES: Focus[] = ["Most Relevant", "Highest Impact", "Most Active"];

const levelRank: Record<Level, number> = { High: 3, Medium: 2, Low: 1 };

const impactClass = (lvl: Level) =>
  lvl === "High"
    ? "bg-[hsl(var(--orange))]/15 text-[hsl(var(--orange-bright))]"
    : lvl === "Medium"
      ? "bg-[hsl(var(--gold))]/12 text-[hsl(var(--gold))]"
      : "bg-white/5 text-[hsl(var(--muted-foreground))]";

const activityClass = (lvl: Level) =>
  lvl === "High"
    ? "bg-[hsl(var(--blue))]/15 text-[hsl(var(--blue))]"
    : lvl === "Medium"
      ? "bg-white/8 text-[hsl(var(--foreground))]/85"
      : "bg-white/5 text-[hsl(var(--muted-foreground))]";

export default function AttackMapPage() {
  const [industry, setIndustry] = useState<Industry>("Private");
  const [focus, setFocus] = useState<Focus>("Most Relevant");
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<Record<string, "miss" | "solving" | "deep" | null>>({});

  const ranked = useMemo(() => {
    const scored = DOMAINS.map((d) => {
      let score = 0;
      if (focus === "Most Relevant") score = levelRank[d.industryRelevance[industry]] * 3 + levelRank[d.impact];
      if (focus === "Highest Impact") score = levelRank[d.impact] * 3 + levelRank[d.industryRelevance[industry]];
      if (focus === "Most Active") score = levelRank[d.activity] * 3 + levelRank[d.industryRelevance[industry]];
      return { d, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [industry, focus]);

  const featured = ranked.slice(0, 4);
  const rest = ranked.slice(4);

  const priorityLabel = (d: Domain): string | null => {
    if (focus === "Most Active" && d.activity === "High") return "Active signal";
    if (focus === "Highest Impact" && d.impact === "High") return "High impact";
    if (d.industryRelevance[industry] === "High") return "Priority now";
    return null;
  };

  const toggleSection = (id: string, key: "miss" | "solving" | "deep") =>
    setOpenSection((s) => ({ ...s, [id]: s[id] === key ? null : key }));

  const renderCard = (d: Domain, isFeatured: boolean) => {
    const isOpen = openCard === d.id;
    const tag = priorityLabel(d);
    const section = openSection[d.id] ?? null;

    return (
      <div
        key={d.id}
        className={`rounded-xl border transition-all ${
          isFeatured
            ? "bg-[hsl(var(--navy-mid))]/70 border-[hsl(var(--gold))]/35 shadow-[0_8px_28px_-12px_hsl(var(--gold)/0.25)]"
            : "bg-[hsl(var(--navy-mid))]/40 border-white/8"
        }`}
      >
        <button
          onClick={() => setOpenCard(isOpen ? null : d.id)}
          className="w-full text-left p-5"
          aria-expanded={isOpen}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-widest text-[hsl(var(--muted-foreground))]">
                  D{String(d.number).padStart(2, "0")}
                </span>
                {tag && isFeatured && (
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[hsl(var(--gold))]/12 text-[hsl(var(--gold))]">
                    {tag}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
                {d.name}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1.5">{d.hook}</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-[hsl(var(--muted-foreground))] mt-1 shrink-0 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-[hsl(var(--foreground))]/75">
              {d.entryPoint}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md ${impactClass(d.impact)}`}>
              Impact {d.impact}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md ${activityClass(d.activity)}`}>
              Activity {d.activity}
            </span>
          </div>
        </button>

        {isOpen && (
          <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-5 animate-fadeUp">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--gold))] mb-2">
                  Top Use Cases
                </div>
                <ul className="space-y-1.5">
                  {d.useCases.map((u) => (
                    <li key={u} className="text-sm text-[hsl(var(--foreground))]/85 flex gap-2">
                      <span className="text-[hsl(var(--gold))]/60 mt-0.5">•</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--gold))] mb-2">
                  Emerging Threats
                </div>
                <ul className="space-y-1.5">
                  {d.emergingThreats.map((u) => (
                    <li key={u} className="text-sm text-[hsl(var(--foreground))]/85 flex gap-2">
                      <span className="text-[hsl(var(--orange))]/70 mt-0.5">•</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { key: "miss" as const, label: "Common blind spots", title: "What Most Teams Miss", icon: Eye },
                { key: "solving" as const, label: "Top solutions in the space", title: "Who Is Solving This Well", icon: Sparkles },
                { key: "deep" as const, label: "Deep dive use case", title: "Go Deeper", icon: Compass },
              ].map(({ key, label, title, icon: Icon }) => {
                const open = section === key;
                return (
                  <div key={key} className="rounded-lg border border-white/8 bg-white/[0.02]">
                    <button
                      onClick={() => toggleSection(d.id, key)}
                      className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="h-3.5 w-3.5 text-[hsl(var(--gold))] shrink-0" />
                        <div className="text-left min-w-0">
                          <div className="text-sm font-medium text-foreground">{title}</div>
                          <div className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">{label}</div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] shrink-0 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-3.5 pb-3.5 pt-1 text-sm text-[hsl(var(--foreground))]/85 animate-fadeUp">
                        {key === "miss" && (
                          <ul className="space-y-1.5">
                            {d.blindSpots.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="text-[hsl(var(--gold))]/60 mt-0.5">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {key === "solving" && (
                          <ul className="space-y-1.5">
                            {d.solutions.map((s) => (
                              <li key={s} className="flex gap-2">
                                <span className="text-[hsl(var(--blue))]/70 mt-0.5">•</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {key === "deep" && <p className="leading-relaxed">{d.deepDive}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/5">
              <div className="text-[11px] uppercase tracking-widest text-[hsl(var(--gold))] mb-1">
                Hook
              </div>
              <p className="font-display text-base text-foreground italic">{d.hook}</p>
            </div>

            <div className="rounded-lg bg-white/[0.03] border border-white/8 p-4 space-y-3">
              <div>
                <h4 className="font-display text-sm font-semibold text-foreground">
                  Understand how this shows up in environments like yours
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                  Gain deeper insight into patterns, tools, and where organizations typically miss risk.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="text-[11px] font-semibold tracking-wider uppercase px-3 py-2 rounded-md bg-[hsl(var(--blue))] text-white hover:opacity-90 transition">
                  Get the Cyber Security Brief
                </button>
                <button className="text-[11px] font-semibold tracking-wider uppercase px-3 py-2 rounded-md bg-[hsl(var(--navy-light))] text-foreground border border-white/10 hover:bg-white/5 transition">
                  Book a Call with Our Advisory Team
                </button>
                <button className="text-[11px] font-semibold tracking-wider uppercase px-3 py-2 rounded-md bg-[hsl(var(--gold))] text-[hsl(var(--navy))] hover:opacity-90 transition">
                  Become a Member
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--navy))] text-foreground">
      <header className="px-6 py-5">
        <div className="font-display text-xs font-bold tracking-[0.3em] text-[hsl(var(--gold))]">
          CSL
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section className="pt-6 pb-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Where Attacks Actually Happen
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-3 text-base sm:text-lg">
            A leadership view across the CSL domains
          </p>
        </section>

        {/* Framework reference */}
        <section className="pb-8">
          <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[hsl(var(--muted-foreground))] mb-3">
            CSL Framework
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {DOMAINS.map((d) => (
              <span
                key={d.id}
                className="text-xs text-[hsl(var(--foreground))]/40 hover:text-[hsl(var(--foreground))]/75 transition cursor-default"
              >
                <span className="text-[hsl(var(--gold))]/40 mr-1.5 font-mono">
                  {String(d.number).padStart(2, "0")}
                </span>
                {d.name}
              </span>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/5 mb-8" />

        {/* Filter bar */}
        <section className="pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--muted-foreground))] mr-1">
                Industry
              </span>
              {INDUSTRIES.map((i) => (
                <button
                  key={i}
                  onClick={() => setIndustry(i)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    industry === i
                      ? "bg-[hsl(var(--gold))]/12 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))]"
                      : "border-white/10 text-[hsl(var(--muted-foreground))] hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--muted-foreground))] mr-1">
                Focus
              </span>
              {FOCUSES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFocus(f)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    focus === f
                      ? "bg-white/8 border-white/25 text-foreground"
                      : "border-white/10 text-[hsl(var(--muted-foreground))] hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">In focus</h2>
            <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
              Top {featured.length} for {industry} · {focus}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map(({ d }) => renderCard(d, true))}
          </div>
        </section>

        {/* Rest */}
        <section className="pb-12">
          <h2 className="font-display text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-4">
            Other domains
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map(({ d }) => renderCard(d, false))}
          </div>
        </section>
      </main>
    </div>
  );
}
