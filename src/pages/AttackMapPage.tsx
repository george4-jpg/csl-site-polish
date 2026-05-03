import { useMemo, useState } from "react";
import { ChevronDown, Lock, ShieldCheck, Mail, Phone, Sparkles } from "lucide-react";

type Industry = "Education" | "Government" | "Private Sector";
type EntryPoint = "Email" | "Identity" | "Device" | "Network" | "Cloud" | "Application" | "Data" | "Human";
type ActorType = "Phisher" | "Access Broker" | "Ransom Crew" | "Insider" | "Nation State" | "Opportunist";
type Commonality = "Very Common" | "Common" | "Emerging" | "Targeted";
type Sort = "Most Common" | "Highest Impact" | "Fastest Growing";
type Relevance = "high" | "medium" | "neutral";

interface Domain {
  id: number;
  name: string;
  why: string;
  useCases: string[];
  emergingThreats: string[];
  solutions: string[];
  tools: string[];
  archetypes: ActorType[];
  commonality: Commonality;
  scenario: string;
  hook: { title: string; line: string; hook: string };
  entryPoints: EntryPoint[];
  industryRelevance: Record<Industry, Relevance>;
  impactScore: number; // 1-10
  growthScore: number; // 1-10
  commonScore: number; // 1-10
}

const DOMAINS: Domain[] = [
  {
    id: 1,
    name: "Email Security",
    why: "Most intrusions still begin in the inbox.",
    useCases: [
      "Block credential phishing across executive accounts",
      "Detect QR code and link based payload delivery",
      "Reduce business email compromise on finance workflows",
    ],
    emergingThreats: [
      "AI generated lookalike sender voice",
      "Phishing as a service with reverse proxy kits",
      "QR code redirection to credential capture pages",
    ],
    solutions: [
      "Inbound mail authentication and filtering",
      "User reporting and adaptive friction",
      "Link rewriting and time of click analysis",
    ],
    tools: ["Evilginx", "EvilProxy", "Gophish", "Mailsploit"],
    archetypes: ["Phisher", "Access Broker", "Ransom Crew"],
    commonality: "Very Common",
    scenario: "An executive clicks a vendor invoice link, lands on a proxy login page, and the attacker captures the live session token within seconds.",
    hook: {
      title: "The number one threat vector",
      line: "Most breaches still start in the inbox using links, QR codes, and login flows.",
      hook: "Three common mistakes are over trusting filters, weak user friction, and poor link control.",
    },
    entryPoints: ["Email", "Human"],
    industryRelevance: { Education: "high", Government: "medium", "Private Sector": "high" },
    impactScore: 8, growthScore: 9, commonScore: 10,
  },
  {
    id: 2,
    name: "Identity and Access",
    why: "Attackers no longer break in, they log in.",
    useCases: [
      "Detect token theft and session replay",
      "Enforce phishing resistant authentication",
      "Govern privileged and service identities",
    ],
    emergingThreats: [
      "Session token replay after MFA",
      "OAuth consent phishing on cloud apps",
      "Service account abuse for lateral movement",
    ],
    solutions: [
      "Phishing resistant MFA and passkeys",
      "Conditional access and continuous evaluation",
      "Identity threat detection and response",
    ],
    tools: ["AADInternals", "ROADtools", "TokenSmith", "Mimikatz"],
    archetypes: ["Access Broker", "Nation State", "Ransom Crew"],
    commonality: "Very Common",
    scenario: "A stolen refresh token is replayed from a foreign IP, granting silent access to mailboxes and cloud drives without triggering MFA.",
    hook: {
      title: "The new attack surface",
      line: "Attackers log in using identity, tokens, and sessions.",
      hook: "Two critical decisions are session control and token visibility.",
    },
    entryPoints: ["Identity", "Cloud"],
    industryRelevance: { Education: "medium", Government: "high", "Private Sector": "high" },
    impactScore: 10, growthScore: 10, commonScore: 9,
  },
  {
    id: 3,
    name: "Endpoint and Cyber Physical",
    why: "Trusted devices and physical interfaces create silent entry points.",
    useCases: [
      "Detect living off the land binaries on endpoints",
      "Govern removable media and rogue device risk",
      "Protect operational and cyber physical systems",
    ],
    emergingThreats: [
      "USB based implant devices in shared spaces",
      "Firmware level persistence on workstations",
      "Wireless implant tools targeting facilities",
    ],
    solutions: [
      "Endpoint detection and response with behavioral analytics",
      "Application allow listing on critical hosts",
      "Asset discovery for cyber physical environments",
    ],
    tools: ["Flipper Zero", "Cobalt Strike", "Sliver", "Rubber Ducky"],
    archetypes: ["Insider", "Opportunist", "Ransom Crew"],
    commonality: "Common",
    scenario: "A dropped USB is plugged into a kiosk, a small implant beacons out over an allowed channel, and an operator uses it to pivot into the building network.",
    hook: {
      title: "Trusted devices, untrusted paths",
      line: "Endpoints and physical interfaces create silent entry points.",
      hook: "Visibility gaps and device trust assumptions drive risk.",
    },
    entryPoints: ["Device", "Network"],
    industryRelevance: { Education: "high", Government: "high", "Private Sector": "medium" },
    impactScore: 8, growthScore: 7, commonScore: 8,
  },
  {
    id: 4,
    name: "Network and Edge",
    why: "Once inside, attackers spread across networks and edge devices.",
    useCases: [
      "Detect lateral movement between segments",
      "Reduce exposure of edge appliances and VPNs",
      "Identify rogue or unmanaged east west traffic",
    ],
    emergingThreats: [
      "Edge appliance zero days on VPN and firewall",
      "ARP and DNS poisoning in flat networks",
      "Living off the network with built in tools",
    ],
    solutions: [
      "Network segmentation and microperimeters",
      "Edge device patching and exposure management",
      "East west traffic inspection",
    ],
    tools: ["Nmap", "Responder", "Impacket", "Cobalt Strike"],
    archetypes: ["Access Broker", "Nation State", "Ransom Crew"],
    commonality: "Common",
    scenario: "An unpatched edge appliance is exploited from the internet, the operator pivots into a flat segment, and reaches a domain controller in under an hour.",
    hook: {
      title: "Access is easy, movement is easier",
      line: "Once inside, attackers spread across networks and edge systems.",
      hook: "Weak segmentation and edge visibility gaps create exposure.",
    },
    entryPoints: ["Network"],
    industryRelevance: { Education: "medium", Government: "high", "Private Sector": "high" },
    impactScore: 9, growthScore: 7, commonScore: 8,
  },
  {
    id: 5,
    name: "Cloud Security",
    why: "Speed and scale create risk across accounts and services.",
    useCases: [
      "Detect identity drift across cloud tenants",
      "Catch misconfigured storage and exposed services",
      "Govern third party app and OAuth grants",
    ],
    emergingThreats: [
      "Cross tenant token abuse in SaaS suites",
      "Public exposure of object storage and databases",
      "Privilege escalation through chained roles",
    ],
    solutions: [
      "Cloud security posture management",
      "Cloud workload protection and runtime defense",
      "SaaS identity and configuration governance",
    ],
    tools: ["Pacu", "ScoutSuite", "ROADtools", "Cloudfox"],
    archetypes: ["Access Broker", "Nation State", "Opportunist"],
    commonality: "Very Common",
    scenario: "A developer role is granted broad permissions for a sprint, an attacker compromises that identity, and chains roles to read production data.",
    hook: {
      title: "What makes cloud hard to defend",
      line: "Speed and scale create risk across accounts and services.",
      hook: "Identity drift, misconfiguration, and weak guardrails are common.",
    },
    entryPoints: ["Cloud", "Identity"],
    industryRelevance: { Education: "medium", Government: "high", "Private Sector": "high" },
    impactScore: 9, growthScore: 10, commonScore: 9,
  },
  {
    id: 6,
    name: "Application Security",
    why: "Continuous delivery pushes vulnerabilities into production.",
    useCases: [
      "Catch insecure dependencies before release",
      "Protect APIs from abuse and scraping",
      "Detect runtime exploitation in production",
    ],
    emergingThreats: [
      "Malicious packages in software supply chain",
      "API business logic abuse at scale",
      "Prompt injection in AI powered features",
    ],
    solutions: [
      "Software composition and dependency analysis",
      "API gateway and runtime protection",
      "Secure design reviews integrated with delivery",
    ],
    tools: ["Burp Suite", "ZAP", "Semgrep", "Trufflehog"],
    archetypes: ["Opportunist", "Access Broker", "Nation State"],
    commonality: "Common",
    scenario: "A new package version is pulled into a build, ships to production by Friday, and exfiltrates credentials from runtime over the weekend.",
    hook: {
      title: "Code moves fast, risk moves faster",
      line: "Continuous delivery pushes vulnerabilities into production.",
      hook: "Supply chain trust and runtime exposure are often missed.",
    },
    entryPoints: ["Application"],
    industryRelevance: { Education: "medium", Government: "medium", "Private Sector": "high" },
    impactScore: 8, growthScore: 9, commonScore: 7,
  },
  {
    id: 7,
    name: "Data Security",
    why: "Data exists across systems with fragmented control.",
    useCases: [
      "Discover sensitive data across cloud and on prem",
      "Govern access paths to crown jewel datasets",
      "Detect mass export and exfiltration",
    ],
    emergingThreats: [
      "Shadow data created by analytics pipelines",
      "AI training and inference data exposure",
      "Bulk export through trusted SaaS connectors",
    ],
    solutions: [
      "Data discovery and classification at scale",
      "Data security posture management",
      "Egress monitoring and DLP for cloud and SaaS",
    ],
    tools: ["Rclone", "Mega tools", "Custom exfil scripts", "MegaSync"],
    archetypes: ["Insider", "Ransom Crew", "Nation State"],
    commonality: "Common",
    scenario: "An analyst uses a sanctioned SaaS connector to copy a customer dataset to a personal cloud, and no control flags the bulk transfer.",
    hook: {
      title: "Data sprawl is the real problem",
      line: "Data exists across systems with fragmented control.",
      hook: "Classification drift and access path sprawl create exposure.",
    },
    entryPoints: ["Data", "Cloud"],
    industryRelevance: { Education: "high", Government: "high", "Private Sector": "high" },
    impactScore: 10, growthScore: 8, commonScore: 8,
  },
  {
    id: 8,
    name: "Governance",
    why: "Policy without proof is risk.",
    useCases: [
      "Map controls to NIST, Zero Trust, and CMMC",
      "Show evidence of enforcement to leadership and auditors",
      "Prioritize gaps tied to material business risk",
    ],
    emergingThreats: [
      "Audit fatigue driving control drift",
      "Fragmented evidence across tools and teams",
      "Regulatory expansion outpacing program maturity",
    ],
    solutions: [
      "Continuous control monitoring",
      "Risk register tied to business outcomes",
      "Automated evidence collection",
    ],
    tools: ["GRC platforms", "Control mapping tools", "Evidence collectors", "Policy as code"],
    archetypes: ["Insider", "Opportunist"],
    commonality: "Targeted",
    scenario: "A board asks how identity controls map to recent breach patterns, and the team cannot show current evidence without weeks of manual work.",
    hook: {
      title: "Policy without proof is risk",
      line: "Policies exist but enforcement and evidence often lag.",
      hook: "Mapping policy to controls and proving effectiveness is difficult.",
    },
    entryPoints: ["Identity", "Data"],
    industryRelevance: { Education: "medium", Government: "high", "Private Sector": "high" },
    impactScore: 7, growthScore: 7, commonScore: 6,
  },
  {
    id: 9,
    name: "Human and Machine Factor",
    why: "Human behavior and AI create new manipulation paths.",
    useCases: [
      "Reduce risk from voice and video impersonation",
      "Govern AI assistants connected to internal data",
      "Detect manipulation of approval workflows",
    ],
    emergingThreats: [
      "Voice cloning targeting executives and finance",
      "Prompt injection in AI workflow agents",
      "Social engineering of help desks at scale",
    ],
    solutions: [
      "Human risk management beyond awareness",
      "AI usage governance and guardrails",
      "Out of band verification for sensitive actions",
    ],
    tools: ["ElevenLabs misuse", "Deepfake kits", "AI prompt frameworks", "Social engineering toolkits"],
    archetypes: ["Phisher", "Insider", "Nation State"],
    commonality: "Emerging",
    scenario: "A finance lead receives a voice message that sounds like the CEO approving a wire, and the team executes before any verification step.",
    hook: {
      title: "Trust is now programmable",
      line: "Human behavior and AI create new manipulation paths.",
      hook: "Training and controls have not caught up to AI assisted attacks.",
    },
    entryPoints: ["Human"],
    industryRelevance: { Education: "high", Government: "high", "Private Sector": "high" },
    impactScore: 9, growthScore: 10, commonScore: 7,
  },
  {
    id: 10,
    name: "Cybersecurity Operations",
    why: "Teams receive alerts but lack context to act.",
    useCases: [
      "Prioritize alerts by business and identity context",
      "Reduce mean time to respond on real incidents",
      "Run repeatable response playbooks",
    ],
    emergingThreats: [
      "Alert volume outpacing analyst capacity",
      "AI generated noise blending with real signals",
      "Telemetry blind spots across SaaS and cloud",
    ],
    solutions: [
      "Detection engineering aligned with MITRE ATT and CK",
      "SOAR style automation for known patterns",
      "Threat informed defense and purple teaming",
    ],
    tools: ["SIEM platforms", "EDR consoles", "SOAR runbooks", "Threat intel feeds"],
    archetypes: ["Opportunist", "Ransom Crew", "Nation State"],
    commonality: "Very Common",
    scenario: "A real intrusion sits in a queue of low priority alerts for hours while analysts triage routine noise from a noisy detection rule.",
    hook: {
      title: "Signals are plenty, clarity is rare",
      line: "Teams receive alerts but lack context to act.",
      hook: "Detection without prioritization slows response.",
    },
    entryPoints: ["Network", "Identity"],
    industryRelevance: { Education: "medium", Government: "high", "Private Sector": "high" },
    impactScore: 9, growthScore: 8, commonScore: 9,
  },
];

const INDUSTRIES: Industry[] = ["Education", "Government", "Private Sector"];
const ENTRY_POINTS: EntryPoint[] = ["Email", "Identity", "Device", "Network", "Cloud", "Application", "Data", "Human"];
const ACTORS: ActorType[] = ["Phisher", "Access Broker", "Ransom Crew", "Insider", "Nation State", "Opportunist"];
const SORTS: Sort[] = ["Most Common", "Highest Impact", "Fastest Growing"];

const STAGES = ["Get In", "Take Control", "Move", "Exfiltrate", "Impact"];

function PillFilter<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (v: T | null) => void;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[hsl(var(--muted-foreground))] mb-2 px-1">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(active ? null : opt)}
              className={`px-3 py-1.5 rounded-full text-[0.72rem] font-medium tracking-wide transition-all border ${
                active
                  ? "bg-[hsl(var(--gold)/0.15)] border-[hsl(var(--gold)/0.5)] text-[hsl(var(--gold))] shadow-[0_0_18px_hsl(var(--gold)/0.18)]"
                  : "bg-white/[0.02] border-white/[0.08] text-[hsl(var(--muted-foreground))] hover:text-foreground hover:border-white/20"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HookSnippet({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 mt-1">
      {items.slice(0, 3).map((it, i) => (
        <li key={i} className="text-[0.78rem] text-[hsl(var(--muted-foreground))] truncate">
          • {it}
        </li>
      ))}
    </ul>
  );
}

function MiniSection({ title, count, open, onToggle, children }: { title: string; count: number; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/[0.06] pt-2">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-left">
        <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[hsl(var(--gold))]">
          {title} <span className="text-[hsl(var(--muted-foreground))] ml-1">({count})</span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all ${open ? "max-h-48 mt-1.5" : "max-h-9"}`}>
        {children}
      </div>
    </div>
  );
}

export default function AttackMapPage() {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [entry, setEntry] = useState<EntryPoint | null>(null);
  const [actor, setActor] = useState<ActorType | null>(null);
  const [sort, setSort] = useState<Sort | null>(null);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => setOpenSection((s) => ({ ...s, [key]: !s[key] }));

  const sorted = useMemo(() => {
    const list = [...DOMAINS];
    if (sort === "Most Common") list.sort((a, b) => b.commonScore - a.commonScore);
    if (sort === "Highest Impact") list.sort((a, b) => b.impactScore - a.impactScore);
    if (sort === "Fastest Growing") list.sort((a, b) => b.growthScore - a.growthScore);
    return list;
  }, [sort]);

  const relevanceFor = (d: Domain): Relevance => {
    let r: Relevance = "neutral";
    if (industry) {
      const ir = d.industryRelevance[industry];
      if (ir === "high") r = "high";
      else if (ir === "medium") r = "medium";
    }
    if (entry && d.entryPoints.includes(entry)) r = (r as Relevance) === "neutral" ? "medium" : "high";
    if (actor && d.archetypes.includes(actor)) r = (r as Relevance) === "neutral" ? "medium" : "high";
    return r;
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--navy))] text-foreground">
      {/* Header */}
      <header className="px-6 py-5 border-b border-white/[0.05]">
        <div className="text-[0.7rem] font-bold tracking-[0.3em] text-[hsl(var(--gold))]">CSL</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        {/* Hero */}
        <section className="max-w-3xl">
          <div className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-[hsl(var(--orange-bright))] mb-4">
            Attack Surface Intelligence
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight">
            A leadership view of how attacks <span className="text-[hsl(var(--gold))]">actually happen</span> across your environment
          </h1>
          <p className="mt-5 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            Aligned with MITRE ATT and industry standards including NIST, Zero Trust, and CMMC.
          </p>
        </section>

        {/* MITRE-inspired stage strip */}
        <section className="mt-10">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
            {STAGES.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="px-3 sm:px-4 py-2 rounded-md bg-white/[0.03] border border-white/[0.06] text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-[hsl(var(--muted-foreground))]">
                  {stage}
                </div>
                {i < STAGES.length - 1 && (
                  <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-[hsl(var(--gold)/0.4)] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] shadow-[0_0_40px_rgba(0,0,0,0.25)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PillFilter label="Industry" options={INDUSTRIES} value={industry} onChange={(v) => setIndustry(v as Industry | null)} />
            <PillFilter label="Sort" options={SORTS} value={sort} onChange={(v) => setSort(v as Sort | null)} />
            <PillFilter label="Entry Point" options={ENTRY_POINTS} value={entry} onChange={(v) => setEntry(v as EntryPoint | null)} />
            <PillFilter label="Actor Type" options={ACTORS} value={actor} onChange={(v) => setActor(v as ActorType | null)} />
          </div>
          {(industry || entry || actor || sort) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => { setIndustry(null); setEntry(null); setActor(null); setSort(null); }}
                className="text-[0.7rem] tracking-wider uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--gold))] transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Domain grid */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((d) => {
            const rel = relevanceFor(d);
            const isOpen = openCard === d.id;
            const highBadge = industry && d.industryRelevance[industry] === "high";

            return (
              <div key={d.id} className="contents">
                <article
                  onClick={() => setOpenCard(isOpen ? null : d.id)}
                  className={`group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border bg-gradient-to-b from-white/[0.04] to-white/[0.01] flex flex-col min-h-[360px] ${
                    rel === "high"
                      ? "border-[hsl(var(--gold)/0.55)] shadow-[0_0_30px_hsl(var(--gold)/0.18)] scale-[1.015]"
                      : rel === "medium"
                      ? "border-[hsl(var(--gold)/0.25)] shadow-[0_0_18px_hsl(var(--gold)/0.08)]"
                      : "border-white/[0.07] hover:border-white/[0.15]"
                  } ${isOpen ? "ring-1 ring-[hsl(var(--gold)/0.4)]" : ""}`}
                >
                  {highBadge && (
                    <div className="absolute -top-2 right-4 px-2.5 py-1 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] text-[0.55rem] font-bold tracking-[0.15em] uppercase shadow-md">
                      High relevance for {industry}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold leading-tight">{d.name}</h3>
                    <span className="text-[0.6rem] font-bold tracking-[0.18em] text-[hsl(var(--gold))]/80 mt-1 shrink-0">0{d.id}</span>
                  </div>
                  <p className="mt-2 text-[0.85rem] text-[hsl(var(--muted-foreground))] leading-relaxed">{d.why}</p>

                  {/* Baby hooks */}
                  <div className="mt-4 space-y-2 flex-1 relative">
                    <MiniSection
                      title="Use Cases"
                      count={d.useCases.length}
                      open={!!openSection[`uc-${d.id}`]}
                      onToggle={() => toggleSection(`uc-${d.id}`)}
                    >
                      <HookSnippet items={d.useCases} />
                    </MiniSection>
                    <MiniSection
                      title="Emerging Threats"
                      count={d.emergingThreats.length}
                      open={!!openSection[`et-${d.id}`]}
                      onToggle={() => toggleSection(`et-${d.id}`)}
                    >
                      <HookSnippet items={d.emergingThreats} />
                    </MiniSection>
                    <MiniSection
                      title="Solutions"
                      count={d.solutions.length}
                      open={!!openSection[`sol-${d.id}`]}
                      onToggle={() => toggleSection(`sol-${d.id}`)}
                    >
                      <HookSnippet items={d.solutions} />
                    </MiniSection>
                  </div>

                  {/* Hook bar */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <div className="text-[0.7rem] font-bold tracking-wide text-[hsl(var(--gold))]">
                      {d.hook.title}
                    </div>
                    <div className="text-[0.78rem] text-[hsl(var(--muted-foreground))] mt-1 leading-snug">
                      {d.hook.line}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2 py-1 rounded bg-[hsl(var(--gold)/0.1)] text-[hsl(var(--gold))]">
                      MITRE aligned
                    </span>
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2 py-1 rounded bg-white/[0.04] text-[hsl(var(--muted-foreground))]">
                      NIST
                    </span>
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2 py-1 rounded bg-white/[0.04] text-[hsl(var(--muted-foreground))]">
                      Zero Trust
                    </span>
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase font-bold px-2 py-1 rounded bg-white/[0.04] text-[hsl(var(--muted-foreground))]">
                      CMMC
                    </span>
                  </div>
                </article>

                {/* Expanded panel — full row */}
                {isOpen && (
                  <div className="md:col-span-2 lg:col-span-3 animate-fade-in">
                    <div className="rounded-2xl border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--navy-mid))] p-6 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-[hsl(var(--gold))]">Domain 0{d.id}</div>
                          <h2 className="font-display text-2xl lg:text-3xl font-black mt-1">{d.name}</h2>
                        </div>
                        <div className="text-[0.7rem] tracking-[0.15em] uppercase font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[hsl(var(--muted-foreground))]">
                          {d.commonality}
                        </div>
                      </div>

                      <div className="mt-3 text-[0.9rem] text-[hsl(var(--gold))]/90 italic leading-relaxed">
                        {d.hook.hook}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <PanelBlock title="Top 3 Use Cases" items={d.useCases} />
                        <PanelBlock title="Top 3 Emerging Threats" items={d.emergingThreats} />
                        <PanelBlock title="Top 3 Solution Areas" items={d.solutions} />
                        <PanelBlock title="Common Tools" items={d.tools} />
                        <PanelBlock title="Linked Threat Archetypes" items={d.archetypes} />
                        <div>
                          <div className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[hsl(var(--gold))] mb-2">How Common</div>
                          <div className="text-[0.85rem] text-foreground">{d.commonality}</div>
                          <div className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[hsl(var(--gold))] mt-5 mb-2">Scenario</div>
                          <p className="text-[0.85rem] text-[hsl(var(--muted-foreground))] leading-relaxed">{d.scenario}</p>
                        </div>
                      </div>

                      {/* Conversion section */}
                      <div className="mt-10 pt-8 border-t border-white/[0.08]">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.3)] flex items-center justify-center shrink-0">
                            <Lock className="w-4 h-4 text-[hsl(var(--gold))]" />
                          </div>
                          <div>
                            <h4 className="font-display text-xl font-bold">What is really happening in this domain</h4>
                            <p className="mt-2 text-[0.88rem] text-[hsl(var(--muted-foreground))] leading-relaxed max-w-3xl">
                              Members gain a deeper view into how these attack patterns unfold, the tools and actors behind them, how often they occur across environments like yours, and where organizations typically miss them.
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <CTACard
                            tone="blue"
                            icon={<Newspaper />}
                            title="Get the Cyber Security Brief"
                            sub="Weekly signals on what is changing in cyber and AI risk"
                          />
                          <CTACard
                            tone="dark"
                            icon={<Phone />}
                            title="Book a Call with Our Advisory Team"
                            sub="Walk through your environment and identify where this applies"
                          />
                          <CTACard
                            tone="gold"
                            icon={<ShieldCheck />}
                            title="Become a Member"
                            sub="Deeper breakdowns and practical guidance across all domains"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <footer className="mt-20 pt-8 border-t border-white/[0.05] flex items-center justify-between text-[0.7rem] text-[hsl(var(--muted-foreground))]">
          <span>CSL Attack Surface Intelligence</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-[hsl(var(--gold))]" /> Prototype</span>
        </footer>
      </main>
    </div>
  );
}

function Newspaper(props: any) {
  // Reuse Mail icon style from lucide via existing imports — fall back to inline svg
  return <Mail {...props} />;
}

function PanelBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[hsl(var(--gold))] mb-2">{title}</div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-[0.85rem] text-foreground/90 flex gap-2">
            <span className="text-[hsl(var(--gold))]/60 mt-0.5">›</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CTACard({ tone, icon, title, sub }: { tone: "blue" | "dark" | "gold"; icon: React.ReactNode; title: string; sub: string }) {
  const styles =
    tone === "blue"
      ? "bg-[hsl(var(--blue)/0.12)] border-[hsl(var(--blue)/0.4)] hover:bg-[hsl(var(--blue)/0.18)]"
      : tone === "gold"
      ? "bg-[hsl(var(--gold)/0.14)] border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.22)] shadow-[0_0_25px_hsl(var(--gold)/0.15)]"
      : "bg-white/[0.03] border-white/[0.12] hover:bg-white/[0.06]";

  const iconColor =
    tone === "blue" ? "text-[hsl(var(--blue))]" : tone === "gold" ? "text-[hsl(var(--gold))]" : "text-foreground";

  return (
    <button className={`text-left p-5 rounded-xl border transition-all ${styles}`}>
      <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${iconColor}`}>
        <span className="[&_svg]:w-5 [&_svg]:h-5">{icon}</span>
      </div>
      <div className="font-display font-bold text-[0.95rem] leading-tight">{title}</div>
      <div className="mt-1.5 text-[0.75rem] text-[hsl(var(--muted-foreground))] leading-snug">{sub}</div>
    </button>
  );
}
