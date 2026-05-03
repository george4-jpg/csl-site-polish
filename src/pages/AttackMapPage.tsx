import { useMemo, useState } from "react";

type Industry = "Education" | "Government" | "Private";
type EntryPoint = "Email" | "Identity" | "Device" | "Network" | "Cloud" | "Application" | "Data" | "Human";
type Sort = "Most Relevant" | "Highest Impact" | "Most Active";
type ActorType = "Phisher" | "Access Broker" | "Ransom Crew" | "Insider" | "Nation State" | "Opportunist";
type Tag = "High Impact" | "Active Threat" | "Common Entry" | "Emerging";

interface Domain {
  id: number;
  name: string;
  hook: string;
  entryPoints: EntryPoint[];
  primaryEntry: EntryPoint;
  primaryActor: ActorType;
  impact: "High" | "Medium";
  tags: Tag[];
  useCases: string[];
  emergingThreats: string[];
  solutionAreas: string[];
  scenario: string;
  tools: string[];
  archetypes: string[];
  howCommon: "Very Common" | "Common" | "Emerging";
  industryRelevance: Record<Industry, "high" | "medium" | "low">;
  impactScore: number;
  activeScore: number;
}

const DOMAINS: Domain[] = [
  {
    id: 1,
    name: "Email Security",
    hook: "The number one entry point for real attacks",
    entryPoints: ["Email", "Human"],
    primaryEntry: "Email",
    primaryActor: "Phisher",
    impact: "High",
    tags: ["High Impact", "Active Threat", "Common Entry"],
    useCases: ["Block credential phishing on executive accounts", "Detect QR and link based payload delivery"],
    emergingThreats: ["Reverse proxy phishing kits", "AI generated sender voice and tone"],
    solutionAreas: ["Inbound authentication and filtering", "Time of click link analysis"],
    scenario: "An executive clicks a vendor invoice link, lands on a proxy login page, and the attacker captures the live session within seconds.",
    tools: ["Evilginx", "EvilProxy", "Gophish"],
    archetypes: ["Phishing crews", "Initial access brokers"],
    howCommon: "Very Common",
    industryRelevance: { Education: "high", Government: "medium", Private: "high" },
    impactScore: 9, activeScore: 10,
  },
  {
    id: 2,
    name: "Identity and Access",
    hook: "Where attackers log in instead of breaking in",
    entryPoints: ["Identity", "Cloud"],
    primaryEntry: "Identity",
    primaryActor: "Access Broker",
    impact: "High",
    tags: ["High Impact", "Active Threat", "Emerging"],
    useCases: ["Detect token theft and session replay", "Enforce phishing resistant authentication"],
    emergingThreats: ["Session token replay after MFA", "OAuth consent phishing on cloud apps"],
    solutionAreas: ["Phishing resistant MFA and passkeys", "Identity threat detection and response"],
    scenario: "A stolen refresh token is replayed from a foreign IP, granting silent access to mailboxes and cloud drives without triggering MFA.",
    tools: ["AADInternals", "ROADtools", "Mimikatz"],
    archetypes: ["Access brokers", "Nation state operators"],
    howCommon: "Very Common",
    industryRelevance: { Education: "medium", Government: "high", Private: "high" },
    impactScore: 10, activeScore: 10,
  },
  {
    id: 3,
    name: "Endpoint and Cyber Physical",
    hook: "Trusted devices create silent entry paths",
    entryPoints: ["Device", "Network"],
    primaryEntry: "Device",
    primaryActor: "Insider",
    impact: "High",
    tags: ["High Impact", "Common Entry"],
    useCases: ["Detect living off the land binaries", "Govern removable media and rogue devices"],
    emergingThreats: ["USB implant devices in shared spaces", "Wireless implant tools targeting facilities"],
    solutionAreas: ["EDR with behavioral analytics", "Application allow listing on critical hosts"],
    scenario: "A dropped USB is plugged into a kiosk, a small implant beacons over an allowed channel, and an operator pivots into the building network.",
    tools: ["Flipper Zero", "Cobalt Strike", "Rubber Ducky"],
    archetypes: ["Insiders", "Opportunists"],
    howCommon: "Common",
    industryRelevance: { Education: "high", Government: "high", Private: "medium" },
    impactScore: 8, activeScore: 7,
  },
  {
    id: 4,
    name: "Network and Edge",
    hook: "Entry is easy. Movement is easier",
    entryPoints: ["Network"],
    primaryEntry: "Network",
    primaryActor: "Ransom Crew",
    impact: "High",
    tags: ["High Impact", "Active Threat"],
    useCases: ["Detect lateral movement between segments", "Reduce exposure of edge appliances and VPNs"],
    emergingThreats: ["Edge appliance zero days", "Living off the network with built in tools"],
    solutionAreas: ["Network segmentation and microperimeters", "East west traffic inspection"],
    scenario: "An unpatched edge appliance is exploited from the internet, the operator pivots into a flat segment, and reaches a domain controller in under an hour.",
    tools: ["Nmap", "Responder", "Impacket"],
    archetypes: ["Ransom crews", "Nation state operators"],
    howCommon: "Common",
    industryRelevance: { Education: "medium", Government: "high", Private: "high" },
    impactScore: 9, activeScore: 8,
  },
  {
    id: 5,
    name: "Cloud Security",
    hook: "Speed and scale create exposure",
    entryPoints: ["Cloud", "Identity"],
    primaryEntry: "Cloud",
    primaryActor: "Access Broker",
    impact: "High",
    tags: ["High Impact", "Active Threat", "Emerging"],
    useCases: ["Detect identity drift across tenants", "Catch misconfigured storage and exposed services"],
    emergingThreats: ["Cross tenant token abuse in SaaS", "Privilege escalation through chained roles"],
    solutionAreas: ["Cloud security posture management", "SaaS identity and config governance"],
    scenario: "A developer role is granted broad permissions for a sprint, an attacker compromises that identity, and chains roles to read production data.",
    tools: ["Pacu", "ScoutSuite", "Cloudfox"],
    archetypes: ["Access brokers", "Opportunists"],
    howCommon: "Very Common",
    industryRelevance: { Education: "medium", Government: "high", Private: "high" },
    impactScore: 9, activeScore: 10,
  },
  {
    id: 6,
    name: "Application Security",
    hook: "Code moves fast. Risk moves faster",
    entryPoints: ["Application"],
    primaryEntry: "Application",
    primaryActor: "Opportunist",
    impact: "Medium",
    tags: ["Active Threat", "Emerging"],
    useCases: ["Catch insecure dependencies before release", "Protect APIs from abuse and scraping"],
    emergingThreats: ["Malicious packages in supply chain", "Prompt injection in AI features"],
    solutionAreas: ["Software composition analysis", "API gateway and runtime protection"],
    scenario: "A new package version is pulled into a build, ships to production by Friday, and exfiltrates credentials over the weekend.",
    tools: ["Burp Suite", "Semgrep", "Trufflehog"],
    archetypes: ["Opportunists", "Nation state operators"],
    howCommon: "Common",
    industryRelevance: { Education: "medium", Government: "medium", Private: "high" },
    impactScore: 8, activeScore: 9,
  },
  {
    id: 7,
    name: "Data Security",
    hook: "Data is everywhere. Control is not",
    entryPoints: ["Data", "Cloud"],
    primaryEntry: "Data",
    primaryActor: "Insider",
    impact: "High",
    tags: ["High Impact", "Common Entry"],
    useCases: ["Discover sensitive data across cloud and on prem", "Detect mass export and exfiltration"],
    emergingThreats: ["Shadow data created by analytics pipelines", "AI training and inference data exposure"],
    solutionAreas: ["Data discovery and classification", "Egress monitoring and DLP"],
    scenario: "An analyst uses a sanctioned SaaS connector to copy a customer dataset to a personal cloud, and no control flags the bulk transfer.",
    tools: ["Rclone", "MegaSync", "Custom exfil scripts"],
    archetypes: ["Insiders", "Ransom crews"],
    howCommon: "Common",
    industryRelevance: { Education: "high", Government: "high", Private: "high" },
    impactScore: 10, activeScore: 8,
  },
  {
    id: 8,
    name: "Governance",
    hook: "Policy without visibility is risk",
    entryPoints: ["Identity", "Data"],
    primaryEntry: "Data",
    primaryActor: "Insider",
    impact: "Medium",
    tags: ["High Impact"],
    useCases: ["Map controls to NIST and Zero Trust", "Show evidence of enforcement to leadership"],
    emergingThreats: ["Audit fatigue driving control drift", "Regulatory expansion outpacing maturity"],
    solutionAreas: ["Continuous control monitoring", "Automated evidence collection"],
    scenario: "A board asks how identity controls map to recent breach patterns, and the team cannot show current evidence without weeks of manual work.",
    tools: ["GRC platforms", "Policy as code", "Evidence collectors"],
    archetypes: ["Insiders", "Opportunists"],
    howCommon: "Common",
    industryRelevance: { Education: "medium", Government: "high", Private: "high" },
    impactScore: 7, activeScore: 6,
  },
  {
    id: 9,
    name: "Human and Machine Factor",
    hook: "Trust can now be manipulated",
    entryPoints: ["Human"],
    primaryEntry: "Human",
    primaryActor: "Phisher",
    impact: "High",
    tags: ["High Impact", "Active Threat", "Emerging"],
    useCases: ["Reduce risk from voice and video impersonation", "Govern AI assistants connected to internal data"],
    emergingThreats: ["Voice cloning targeting executives", "Prompt injection in AI workflow agents"],
    solutionAreas: ["Human risk management beyond awareness", "Out of band verification for sensitive actions"],
    scenario: "A finance lead receives a voice message that sounds like the CEO approving a wire, and the team executes before any verification step.",
    tools: ["Voice cloning kits", "Deepfake tooling", "Social engineering frameworks"],
    archetypes: ["Phishers", "Nation state operators"],
    howCommon: "Emerging",
    industryRelevance: { Education: "high", Government: "high", Private: "high" },
    impactScore: 9, activeScore: 10,
  },
  {
    id: 10,
    name: "Cybersecurity Operations",
    hook: "Too many signals. Not enough clarity",
    entryPoints: ["Network", "Identity"],
    primaryEntry: "Network",
    primaryActor: "Opportunist",
    impact: "Medium",
    tags: ["Active Threat", "Common Entry"],
    useCases: ["Prioritize alerts by business and identity context", "Reduce mean time to respond on real incidents"],
    emergingThreats: ["Alert volume outpacing analyst capacity", "AI generated noise blending with real signals"],
    solutionAreas: ["Detection engineering and tuning", "Threat informed defense and purple teaming"],
    scenario: "A real intrusion sits in a queue of low priority alerts for hours while analysts triage routine noise from a noisy detection rule.",
    tools: ["SIEM platforms", "EDR consoles", "SOAR runbooks"],
    archetypes: ["Opportunists", "Ransom crews"],
    howCommon: "Very Common",
    industryRelevance: { Education: "medium", Government: "high", Private: "high" },
    impactScore: 8, activeScore: 9,
  },
];

const INDUSTRIES: Industry[] = ["Education", "Government", "Private"];
const ENTRY_POINTS: EntryPoint[] = ["Email", "Identity", "Device", "Network", "Cloud", "Application", "Data", "Human"];
const SORTS: Sort[] = ["Most Relevant", "Highest Impact", "Most Active"];

const TAG_STYLES: Record<Tag, string> = {
  "High Impact": "bg-red-500/15 text-red-300 border-red-500/30",
  "Active Threat": "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  "Common Entry": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Emerging": "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[0.72rem] font-medium tracking-wide transition-all border ${
        active
          ? "bg-[hsl(var(--gold)/0.15)] border-[hsl(var(--gold)/0.5)] text-[hsl(var(--gold))] shadow-[0_0_14px_hsl(var(--gold)/0.18)]"
          : "bg-white/[0.03] border-white/[0.08] text-[hsl(var(--muted-foreground))] hover:text-foreground hover:border-white/20"
      }`}
    >
      {children}
    </button>
  );
}

export default function AttackMapPage() {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [entry, setEntry] = useState<EntryPoint | null>(null);
  const [sort, setSort] = useState<Sort>("Most Relevant");
  const [openId, setOpenId] = useState<number | null>(null);

  const sorted = useMemo(() => {
    const list = [...DOMAINS];
    const relevanceWeight = (d: Domain) => {
      let w = 0;
      if (industry && d.industryRelevance[industry] === "high") w += 3;
      else if (industry && d.industryRelevance[industry] === "medium") w += 1;
      if (entry && d.entryPoints.includes(entry)) w += 2;
      return w;
    };
    if (sort === "Most Relevant") {
      list.sort((a, b) => relevanceWeight(b) - relevanceWeight(a) || b.impactScore - a.impactScore);
    } else if (sort === "Highest Impact") {
      list.sort((a, b) => b.impactScore - a.impactScore);
    } else {
      list.sort((a, b) => b.activeScore - a.activeScore);
    }
    return list;
  }, [industry, entry, sort]);

  const isHighlighted = (d: Domain) => {
    if (industry && d.industryRelevance[industry] === "high") return true;
    if (entry && d.entryPoints.includes(entry)) return true;
    return false;
  };

  const highlightLabel = (d: Domain): string | null => {
    if (industry && d.industryRelevance[industry] === "high") return "High relevance";
    if (entry && d.entryPoints.includes(entry)) return "Active threat";
    return null;
  };

  const clearAll = () => {
    setIndustry(null);
    setEntry(null);
    setSort("Most Relevant");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--navy))] text-foreground">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="text-[0.7rem] font-bold tracking-[0.3em] text-[hsl(var(--gold))]">CSL</div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
          Attack Surface Intelligence
        </h1>
        <p className="mt-4 text-[hsl(var(--muted-foreground))] text-lg max-w-2xl">
          See where attacks are actually happening and what matters to your environment.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
            <div className="min-w-0">
              <div className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[hsl(var(--muted-foreground))] mb-2">Industry</div>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((opt) => (
                  <Pill key={opt} active={industry === opt} onClick={() => setIndustry(industry === opt ? null : opt)}>{opt}</Pill>
                ))}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[hsl(var(--muted-foreground))] mb-2">Entry Point</div>
              <div className="flex flex-wrap gap-2">
                {ENTRY_POINTS.map((opt) => (
                  <Pill key={opt} active={entry === opt} onClick={() => setEntry(entry === opt ? null : opt)}>{opt}</Pill>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <div className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[hsl(var(--muted-foreground))] mb-2">Sort</div>
              <div className="flex flex-wrap gap-2">
                {SORTS.map((opt) => (
                  <Pill key={opt} active={sort === opt} onClick={() => setSort(opt)}>{opt}</Pill>
                ))}
              </div>
            </div>

            <div className="ml-auto self-end">
              <button
                onClick={clearAll}
                className="text-[0.72rem] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--gold))] underline-offset-4 hover:underline transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((d) => {
            const open = openId === d.id;
            const highlighted = isHighlighted(d);
            const label = highlightLabel(d);
            return (
              <div
                key={d.id}
                className={`md:col-span-${open ? "2" : "1"} ${open ? "lg:col-span-3" : ""}`}
                style={open ? {} : {}}
              >
                <button
                  onClick={() => setOpenId(open ? null : d.id)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 ${
                    highlighted
                      ? "border-[hsl(var(--gold)/0.6)] bg-[hsl(var(--gold)/0.04)] shadow-[0_0_24px_hsl(var(--gold)/0.18)] scale-[1.015]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold leading-snug">{d.name}</h3>
                    {label && (
                      <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-[hsl(var(--gold)/0.15)] text-[hsl(var(--gold))] border border-[hsl(var(--gold)/0.3)] whitespace-nowrap">
                        {label}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[hsl(var(--foreground)/0.85)] leading-snug mb-3">
                    {d.hook}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[0.62rem] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[hsl(var(--muted-foreground))]">
                      {d.primaryEntry}
                    </span>
                    <span className="text-[0.62rem] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[hsl(var(--muted-foreground))]">
                      {d.primaryActor}
                    </span>
                    {d.tags.map((t) => (
                      <span key={t} className={`text-[0.62rem] font-medium px-2 py-0.5 rounded-full border ${TAG_STYLES[t]}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-1.5">Top Use Cases</div>
                      <ul className="space-y-1">
                        {d.useCases.slice(0, 2).map((u) => (
                          <li key={u} className="text-[0.82rem] text-[hsl(var(--foreground)/0.8)] leading-snug pl-3 relative">
                            <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-[hsl(var(--gold)/0.6)]" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-1.5">Emerging Threats</div>
                      <ul className="space-y-1">
                        {d.emergingThreats.slice(0, 2).map((u) => (
                          <li key={u} className="text-[0.82rem] text-[hsl(var(--foreground)/0.8)] leading-snug pl-3 relative">
                            <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-[hsl(var(--gold)/0.6)]" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-1.5">Solution Areas</div>
                      <ul className="space-y-1">
                        {d.solutionAreas.slice(0, 2).map((u) => (
                          <li key={u} className="text-[0.82rem] text-[hsl(var(--foreground)/0.8)] leading-snug pl-3 relative">
                            <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-[hsl(var(--gold)/0.6)]" />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 text-[0.72rem] text-[hsl(var(--gold))] font-medium">
                    {open ? "Hide details" : "View more"}
                  </div>
                </button>

                {open && (
                  <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 animate-fadeUp">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-2">Scenario</div>
                        <p className="text-sm text-[hsl(var(--foreground)/0.85)] leading-relaxed">{d.scenario}</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-1.5">Common Tools</div>
                          <div className="text-sm text-[hsl(var(--foreground)/0.85)]">{d.tools.join(", ")}</div>
                        </div>
                        <div>
                          <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-1.5">Threat Archetypes</div>
                          <div className="text-sm text-[hsl(var(--foreground)/0.85)]">{d.archetypes.join(", ")}</div>
                        </div>
                        <div>
                          <div className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[hsl(var(--gold))] mb-1.5">How Common</div>
                          <div className="text-sm text-[hsl(var(--foreground)/0.85)]">{d.howCommon}</div>
                        </div>
                      </div>
                    </div>

                    {/* Conversion Block */}
                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                      <h4 className="text-lg font-bold mb-1.5">Understand how this shows up in environments like yours</h4>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5 max-w-2xl">
                        Get deeper visibility into patterns, actors, and where organizations typically miss risk.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button className="px-5 py-2.5 rounded-lg text-[0.72rem] font-bold tracking-[0.1em] uppercase bg-[hsl(var(--blue))] text-white hover:opacity-90 transition-opacity">
                          Get the Cyber Security Brief
                        </button>
                        <button className="px-5 py-2.5 rounded-lg text-[0.72rem] font-bold tracking-[0.1em] uppercase bg-[hsl(var(--navy-mid))] text-foreground border border-white/15 hover:border-white/30 transition-colors">
                          Book a Call with Our Advisory Team
                        </button>
                        <button className="px-5 py-2.5 rounded-lg text-[0.72rem] font-bold tracking-[0.1em] uppercase bg-[hsl(var(--gold))] text-[hsl(var(--navy))] hover:opacity-90 transition-opacity">
                          Become a Member
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
