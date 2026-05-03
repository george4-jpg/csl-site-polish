import { useMemo, useState } from "react";
import { ChevronDown, Lock, ShieldCheck, Mail, Phone, Newspaper } from "lucide-react";

type Industry = "Education" | "Government" | "Private Sector";
type EntryPoint =
  | "Email"
  | "Identity"
  | "Device"
  | "Network"
  | "Cloud"
  | "Application"
  | "Data"
  | "Human";
type ActorType =
  | "Phisher"
  | "Access Broker"
  | "Ransom Crew"
  | "Insider"
  | "Nation State"
  | "Opportunist";
type Commonality = "Very Common" | "Common" | "Emerging" | "Targeted";
type Activity = "high" | "common" | "low";

interface Domain {
  number: number;
  name: string;
  whyItMatters: string;
  useCases: string[];
  emergingThreats: string[];
  hook: { title: string; text: string; detail: string };
  attackPaths: string[];
  tools: string[];
  archetypes: ActorType[];
  tactics: string[];
  relevance: string;
  commonality: Commonality;
  scenario: string;
  entryPoints: EntryPoint[];
  industryActivity: Record<Industry, Activity>;
}

const ENTRY_POINTS: EntryPoint[] = [
  "Email",
  "Identity",
  "Device",
  "Network",
  "Cloud",
  "Application",
  "Data",
  "Human",
];
const INDUSTRIES: Industry[] = ["Education", "Government", "Private Sector"];
const ACTORS: ActorType[] = [
  "Phisher",
  "Access Broker",
  "Ransom Crew",
  "Insider",
  "Nation State",
  "Opportunist",
];

const DOMAINS: Domain[] = [
  {
    number: 1,
    name: "Email Security",
    whyItMatters: "Most breaches still start in the inbox.",
    useCases: ["Credential phishing", "QR code lures", "Business email compromise"],
    emergingThreats: ["AI-written spear phishing", "OAuth consent abuse", "Reply-chain hijack"],
    hook: {
      title: "The number one threat vector",
      text: "Most breaches still start in the inbox. Modern phishing uses links, QR codes, and login flows that look real.",
      detail: "Three mistakes organizations overlook are over trusting default filters, weak user friction controls, and poor link and session handling.",
    },
    attackPaths: [
      "Adversary-in-the-middle phishing capturing session tokens",
      "Malicious OAuth app via consent grant",
      "QR phishing routed through mobile to bypass filters",
      "Reply-chain hijack from a trusted vendor inbox",
    ],
    tools: ["Evilginx", "EvilProxy", "Tycoon 2FA", "Crafted phishing kits"],
    archetypes: ["Phisher", "Access Broker", "Opportunist"],
    tactics: ["Initial access via credential capture", "Session token replay", "Inbox rule manipulation"],
    relevance: "Highly relevant for Education, Government, and Private Sector.",
    commonality: "Very Common",
    scenario: "A user clicks a vendor invoice link, authenticates through a proxy page, and the attacker silently steals the live session.",
    entryPoints: ["Email", "Identity", "Human"],
    industryActivity: { Education: "high", Government: "high", "Private Sector": "high" },
  },
  {
    number: 2,
    name: "Identity and Access",
    whyItMatters: "Attackers log in using identity, tokens, and sessions.",
    useCases: ["MFA fatigue", "Token theft", "Privilege escalation"],
    emergingThreats: ["Help desk social engineering", "Device code phishing", "Federation abuse"],
    hook: {
      title: "The new attack surface",
      text: "Attackers log in using identity, tokens, and sessions.",
      detail: "Two decisions to get right before zero trust are session control strategy and token lifecycle visibility.",
    },
    attackPaths: [
      "MFA fatigue against privileged users",
      "Stolen refresh tokens replayed from new device",
      "Help desk reset abuse to take over an account",
      "Federation backdoor via rogue trust",
    ],
    tools: ["AADInternals", "TokenSmith", "ROADtools", "Custom OAuth apps"],
    archetypes: ["Access Broker", "Phisher", "Nation State"],
    tactics: ["Token replay", "Conditional access bypass", "Persistence via app registrations"],
    relevance: "Highly relevant for Government, Enterprise, and Education.",
    commonality: "Very Common",
    scenario: "An attacker calls the help desk, resets MFA on a director account, and adds a persistent OAuth app within minutes.",
    entryPoints: ["Identity", "Email", "Human"],
    industryActivity: { Education: "high", Government: "high", "Private Sector": "high" },
  },
  {
    number: 3,
    name: "Endpoint and Cyber Physical",
    whyItMatters: "Endpoints and physical interfaces create silent entry points.",
    useCases: ["Infostealer infections", "USB and HID drops", "OT device hijack"],
    emergingThreats: ["EDR bypass loaders", "BYOVD attacks", "Smart facility exploits"],
    hook: {
      title: "Trusted devices, untrusted paths",
      text: "Endpoints and physical interfaces create silent entry points.",
      detail: "Common gaps include device trust assumptions and lack of visibility across hybrid and operational environments.",
    },
    attackPaths: [
      "Infostealer harvests browser sessions from a contractor laptop",
      "Malicious USB cable drops a HID payload",
      "Driver-based EDR unhooking on a workstation",
      "Compromised smart device pivots into the corporate VLAN",
    ],
    tools: ["RedLine", "Lumma", "OMG Cable", "Flipper Zero"],
    archetypes: ["Ransom Crew", "Opportunist", "Insider"],
    tactics: ["Token theft from browsers", "Living-off-the-land binaries", "Physical implant persistence"],
    relevance: "Highly relevant for Education, Healthcare, and Manufacturing.",
    commonality: "Common",
    scenario: "A staff laptop visits a malvertised download, an infostealer pulls cookies, and the attacker resumes a live SaaS session.",
    entryPoints: ["Device", "Network", "Human"],
    industryActivity: { Education: "high", Government: "common", "Private Sector": "high" },
  },
  {
    number: 4,
    name: "Network and Edge",
    whyItMatters: "Once inside, attackers spread across networks and edge systems.",
    useCases: ["Edge appliance exploits", "Lateral movement", "Rogue access"],
    emergingThreats: ["VPN appliance 0-days", "Encrypted C2 over QUIC", "Edge firmware implants"],
    hook: {
      title: "Access is easy, movement is easier",
      text: "Once inside, attackers spread across networks and edge systems.",
      detail: "Weak segmentation and edge visibility gaps create exposure.",
    },
    attackPaths: [
      "Edge VPN exploit yields shell on the gateway",
      "ARP and LLMNR poisoning on a flat segment",
      "Pivoting through trusted vendor segments",
      "C2 hidden in normal HTTPS traffic",
    ],
    tools: ["Public edge exploits", "Responder", "Cobalt Strike", "Sliver"],
    archetypes: ["Nation State", "Ransom Crew", "Access Broker"],
    tactics: ["Edge exploitation", "Internal pivoting", "Credential harvest in transit"],
    relevance: "Highly relevant for Government, Enterprise, and Critical Infrastructure.",
    commonality: "Common",
    scenario: "An unpatched edge device is exploited at midnight, and within an hour a domain admin hash is captured internally.",
    entryPoints: ["Network", "Device", "Identity"],
    industryActivity: { Education: "common", Government: "high", "Private Sector": "common" },
  },
  {
    number: 5,
    name: "Cloud Security",
    whyItMatters: "Speed and scale create risk across accounts and services.",
    useCases: ["Tenant takeover", "OAuth consent abuse", "Misconfigured storage"],
    emergingThreats: ["Cross-tenant attacks", "Shadow SaaS sprawl", "Workload identity abuse"],
    hook: {
      title: "What makes cloud hard to defend",
      text: "Speed and scale create risk across accounts and services.",
      detail: "Common gaps include identity drift, misconfiguration, and weak guardrails.",
    },
    attackPaths: [
      "Illicit OAuth grant gives full mailbox access",
      "Public storage bucket discovered and exfiltrated",
      "Stolen workload identity abused across services",
      "Cross-tenant trust exploited to reach customer data",
    ],
    tools: ["TeamFiltration", "MFASweep", "ROADtools", "Cloud-native APIs"],
    archetypes: ["Access Broker", "Nation State", "Opportunist"],
    tactics: ["Consent phishing", "Mailbox rule abuse", "Workload identity replay"],
    relevance: "Highly relevant for SaaS-heavy Enterprise, Education, and Government tenants.",
    commonality: "Very Common",
    scenario: "A finance user approves an OAuth app, and the attacker silently exfiltrates years of email and shared files.",
    entryPoints: ["Cloud", "Identity", "Email"],
    industryActivity: { Education: "high", Government: "high", "Private Sector": "high" },
  },
  {
    number: 6,
    name: "Application Security",
    whyItMatters: "Continuous delivery pushes vulnerabilities into production.",
    useCases: ["API abuse", "Webshell deployment", "Supply chain compromise"],
    emergingThreats: ["LLM prompt injection", "Malicious npm and PyPI packages", "API token leakage"],
    hook: {
      title: "Code moves fast, risk moves faster",
      text: "Continuous delivery pushes vulnerabilities into production.",
      detail: "Supply chain trust and runtime exposure are often missed.",
    },
    attackPaths: [
      "Unpatched CVE chained with auth bypass",
      "Malicious dependency added to a build pipeline",
      "Leaked API token from a public repo abused at scale",
      "Prompt injection in an internal LLM workflow",
    ],
    tools: ["Burp Suite", "Public PoC exploits", "Metasploit modules", "Crafted payloads"],
    archetypes: ["Opportunist", "Nation State", "Access Broker"],
    tactics: ["CVE exploitation", "Dependency confusion", "Token abuse"],
    relevance: "Highly relevant for SaaS, FinTech, and any internet-facing application owner.",
    commonality: "Common",
    scenario: "A leaked CI token is found in a public repo and used to push a backdoored build into production overnight.",
    entryPoints: ["Application", "Cloud", "Data"],
    industryActivity: { Education: "common", Government: "common", "Private Sector": "high" },
  },
  {
    number: 7,
    name: "Data Security",
    whyItMatters: "Data lives across systems with fragmented control.",
    useCases: ["Insider exfiltration", "Backup compromise", "Exposed datasets"],
    emergingThreats: ["AI training data leaks", "Vector DB exposure", "Double extortion ransomware"],
    hook: {
      title: "Data sprawl is the real problem",
      text: "Data lives across systems with fragmented control.",
      detail: "Classification drift and access path sprawl create exposure.",
    },
    attackPaths: [
      "Insider downloads sensitive datasets via approved tools",
      "Backup repository encrypted before primary systems",
      "Public bucket discovered through internet-wide scans",
      "AI assistant indexes unprotected sensitive folders",
    ],
    tools: ["Rclone", "MEGAsync", "grayhatwarfare", "Cloud-native exports"],
    archetypes: ["Insider", "Ransom Crew", "Opportunist"],
    tactics: ["Mass download via legitimate tools", "Backup deletion", "Discovery via metadata"],
    relevance: "Highly relevant for Healthcare, Finance, Education, and Government.",
    commonality: "Common",
    scenario: "An AI search tool is enabled across a tenant and quickly surfaces sensitive HR and legal files to every user.",
    entryPoints: ["Data", "Cloud", "Identity"],
    industryActivity: { Education: "high", Government: "high", "Private Sector": "high" },
  },
  {
    number: 8,
    name: "Governance",
    whyItMatters: "Policies exist but enforcement and evidence often lag.",
    useCases: ["Policy drift", "Audit gaps", "Vendor risk blind spots"],
    emergingThreats: ["AI policy gaps", "Regulatory exposure", "Third-party concentration risk"],
    hook: {
      title: "Policy without proof is risk",
      text: "Policies exist but enforcement and evidence often lag.",
      detail: "Mapping policy to controls and proving effectiveness is a common failure point.",
    },
    attackPaths: [
      "Stale access policy leaves former vendors with active accounts",
      "Untracked AI tool adoption creates regulatory exposure",
      "Control gaps surface only during incident response",
      "Vendor breach reaches the organization through trusted access",
    ],
    tools: ["GRC platforms misused as checklists", "Manual evidence gathering", "Spreadsheet trackers"],
    archetypes: ["Insider", "Opportunist", "Access Broker"],
    tactics: ["Exploiting documented but unenforced controls", "Abusing exception processes"],
    relevance: "Highly relevant for Government, Healthcare, Finance, and Education.",
    commonality: "Common",
    scenario: "An auditor discovers that a critical control has been documented for two years but never tested or enforced in production.",
    entryPoints: ["Identity", "Application", "Data"],
    industryActivity: { Education: "common", Government: "high", "Private Sector": "common" },
  },
  {
    number: 9,
    name: "Human and Machine Factor",
    whyItMatters: "Human behavior and AI create new manipulation paths.",
    useCases: ["Voice clone fraud", "Deepfake video calls", "AI-assisted social engineering"],
    emergingThreats: ["Agent hijacking", "Indirect prompt injection", "Synthetic identity fraud"],
    hook: {
      title: "Trust is now programmable",
      text: "Human behavior and AI create new manipulation paths.",
      detail: "Training and controls have not caught up to AI assisted attacks.",
    },
    attackPaths: [
      "Cloned executive voice authorizes a wire transfer",
      "Deepfake video on a finance call drives urgency",
      "Hidden instructions in a shared document hijack an AI agent",
      "Synthetic identity passes onboarding controls",
    ],
    tools: ["ElevenLabs", "Open-source voice clones", "Crafted injection payloads"],
    archetypes: ["Phisher", "Insider", "Opportunist"],
    tactics: ["CEO voice fraud", "Tool-use abuse in agents", "Pretexting at scale"],
    relevance: "Rising risk for Finance, Executive Offices, and AI-enabled workflows.",
    commonality: "Emerging",
    scenario: "A controller receives a voice call that sounds exactly like the CEO, instructing an urgent wire that bypasses normal review.",
    entryPoints: ["Human", "Email", "Identity"],
    industryActivity: { Education: "common", Government: "common", "Private Sector": "high" },
  },
  {
    number: 10,
    name: "Cybersecurity Operations",
    whyItMatters: "Teams receive alerts but lack context to act.",
    useCases: ["Alert fatigue", "Detection gaps", "Slow response handoff"],
    emergingThreats: ["AI noise in detections", "Cross-tool blind spots", "Burnout-driven misses"],
    hook: {
      title: "Signals are plenty, clarity is rare",
      text: "Teams receive alerts but lack context to act.",
      detail: "Detection without prioritization and response without alignment slows action.",
    },
    attackPaths: [
      "High-severity alert is closed as a false positive under load",
      "Cross-tool blind spot lets lateral movement go undetected",
      "Response handoff between teams loses critical context",
      "Detection logic decays after a platform change",
    ],
    tools: ["SIEM and SOAR misconfigurations", "Disjointed EDR and identity tools", "Manual runbooks"],
    archetypes: ["Ransom Crew", "Nation State", "Access Broker"],
    tactics: ["Living-off-the-land to blend in", "Timing attacks for off-hours", "Exploiting handoff gaps"],
    relevance: "Highly relevant for Enterprise, Government, and Education with mature stacks.",
    commonality: "Targeted",
    scenario: "An alert fires at 2 AM, gets auto-closed during a noisy week, and surfaces again only after exfiltration is complete.",
    entryPoints: ["Identity", "Network", "Cloud"],
    industryActivity: { Education: "common", Government: "high", "Private Sector": "high" },
  },
];

const COMMONALITY_STYLE: Record<Commonality, string> = {
  "Very Common": "border-red-400/40 bg-red-500/10 text-red-200",
  Common: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  Emerging: "border-sky-400/40 bg-sky-500/10 text-sky-200",
  Targeted: "border-purple-400/40 bg-purple-500/10 text-purple-200",
};

export default function AttackMapPage() {
  const [openDomain, setOpenDomain] = useState<number | null>(null);
  const [selDomain, setSelDomain] = useState<number | null>(null);
  const [selEntry, setSelEntry] = useState<EntryPoint | null>(null);
  const [selIndustry, setSelIndustry] = useState<Industry | null>(null);
  const [selActor, setSelActor] = useState<ActorType | null>(null);

  const matches = useMemo(() => {
    return DOMAINS.map((d) => {
      const okDomain = !selDomain || d.number === selDomain;
      const okEntry = !selEntry || d.entryPoints.includes(selEntry);
      const okActor = !selActor || d.archetypes.includes(selActor);
      const okIndustry =
        !selIndustry || d.industryActivity[selIndustry] !== "low";
      return { d, match: okDomain && okEntry && okActor && okIndustry };
    });
  }, [selDomain, selEntry, selIndustry, selActor]);

  const clearFilters = () => {
    setSelDomain(null);
    setSelEntry(null);
    setSelIndustry(null);
    setSelActor(null);
  };

  const anyFilter = selDomain || selEntry || selIndustry || selActor;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "hsl(var(--navy))" }}>
      <header className="border-b border-white/5">
        <div className="csl-container py-4">
          <span className="font-display text-sm font-bold tracking-[0.2em] text-white/70">CSL</span>
        </div>
      </header>

      {/* Hero */}
      <section className="csl-container pt-10 pb-6">
        <div className="max-w-3xl">
          <span className="csl-label">Private Prototype</span>
          <h1 className="mt-3 font-display text-white">
            Attack Intelligence Across the 10 Domains
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/70">
            See how real cyber and AI threats map to the CSL Leadership Framework.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="csl-container pb-8 space-y-4">
        <FilterRow label="Domain">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <Chip
              key={n}
              active={selDomain === n}
              onClick={() => setSelDomain(selDomain === n ? null : n)}
            >
              {n}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Entry Point">
          {ENTRY_POINTS.map((e) => (
            <Chip
              key={e}
              active={selEntry === e}
              onClick={() => setSelEntry(selEntry === e ? null : e)}
            >
              {e}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Industry">
          {INDUSTRIES.map((i) => (
            <Chip
              key={i}
              active={selIndustry === i}
              onClick={() => setSelIndustry(selIndustry === i ? null : i)}
            >
              {i}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Actor Type">
          {ACTORS.map((a) => (
            <Chip
              key={a}
              active={selActor === a}
              onClick={() => setSelActor(selActor === a ? null : a)}
            >
              {a}
            </Chip>
          ))}
        </FilterRow>
        {anyFilter && (
          <button
            onClick={clearFilters}
            className="text-xs text-white/60 hover:text-white underline"
          >
            Clear all filters
          </button>
        )}
      </section>

      {/* Domain grid */}
      <section className="csl-container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(({ d, match }) => {
            const open = openDomain === d.number;
            const activity = selIndustry ? d.industryActivity[selIndustry] : null;
            const dimmed = anyFilter && !match;
            const ring =
              activity === "high"
                ? "border-red-400/60 shadow-[0_0_18px_rgba(248,113,113,0.25)]"
                : activity === "common"
                  ? "border-amber-300/60 shadow-[0_0_18px_rgba(252,211,77,0.18)]"
                  : "";

            return (
              <div key={d.number} className="contents">
                <button
                  onClick={() => setOpenDomain(open ? null : d.number)}
                  className={`text-left p-5 rounded-xl border transition-all flex flex-col ${
                    open
                      ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.06)] shadow-[0_0_24px_rgba(212,168,67,0.15)]"
                      : ring
                        ? `${ring} bg-white/[0.02]`
                        : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:-translate-y-0.5"
                  } ${dimmed ? "opacity-30" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-display text-xs font-bold tracking-[0.18em]"
                      style={{ color: "hsl(var(--gold))" }}
                    >
                      DOMAIN {d.number}
                    </span>
                    <div className="flex items-center gap-2">
                      {activity === "high" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-red-400/40 bg-red-500/10 text-red-200">
                          High activity in {selIndustry}
                        </span>
                      )}
                      {activity === "common" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-300/40 bg-amber-500/10 text-amber-200">
                          Common in {selIndustry}
                        </span>
                      )}
                      <ChevronDown
                        className={`h-4 w-4 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-bold text-white leading-tight">
                    {d.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/70">
                    <span className="text-white/55">Why it matters: </span>
                    {d.whyItMatters}
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <MiniList label="Use Cases" items={d.useCases} />
                    <MiniList label="Emerging Threats" items={d.emergingThreats} />
                  </div>

                  {/* Hook bar */}
                  <div className="mt-4 rounded-lg border border-[hsl(var(--gold)/0.25)] bg-[hsl(var(--gold)/0.04)] p-3">
                    <div
                      className="font-display text-[11px] font-bold tracking-[0.18em] uppercase"
                      style={{ color: "hsl(var(--gold))" }}
                    >
                      {d.hook.title}
                    </div>
                    <p className="mt-1 text-xs text-white/85 leading-snug">{d.hook.text}</p>
                    <p className="mt-1 text-[11px] text-white/55 leading-snug">{d.hook.detail}</p>
                  </div>
                </button>

                {open && (
                  <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-white/10 bg-[hsl(var(--navy-mid))] p-5 md:p-6 animate-fade-in">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span
                        className="font-display text-xs font-bold tracking-[0.18em]"
                        style={{ color: "hsl(var(--gold))" }}
                      >
                        DOMAIN {d.number}
                      </span>
                      <span className="text-white/30">|</span>
                      <h2 className="font-display text-xl text-white">{d.name}</h2>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${COMMONALITY_STYLE[d.commonality]}`}
                      >
                        {d.commonality}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <DetailList label="Common Attack Paths" items={d.attackPaths} />
                      <DetailList label="Common Tools" items={d.tools} />
                      <DetailList label="Tactics" items={d.tactics} />
                      <div>
                        <div className="csl-label mb-2">Linked Threat Archetypes</div>
                        <div className="flex flex-wrap gap-2">
                          {d.archetypes.map((a) => (
                            <span
                              key={a}
                              className="text-xs px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] text-white/85"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <div className="csl-label mb-1">Relevance</div>
                        <p className="text-sm text-white/80">{d.relevance}</p>
                      </div>
                      <div>
                        <div className="csl-label mb-1">Scenario</div>
                        <p className="text-sm text-white/80">{d.scenario}</p>
                      </div>
                    </div>

                    {/* Conversion section */}
                    <div className="relative mt-6 rounded-xl border border-[hsl(var(--gold)/0.3)] overflow-hidden p-5 bg-[hsl(var(--navy)/0.6)]">
                      <div className="flex items-start gap-3">
                        <Lock
                          className="h-5 w-5 mt-0.5 shrink-0"
                          {...({ style: { color: "hsl(var(--gold))" } } as React.SVGProps<SVGSVGElement>)}
                        />
                        <div>
                          <div className="font-display font-bold text-white">
                            What is really happening in this domain
                          </div>
                          <p className="mt-1 text-sm text-white/75 max-w-2xl">
                            Members get a deeper view into how these attacks unfold, the tools and actors behind them, how common they are across environments like yours, and where organizations typically fail to catch them.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <CTACard
                          color="blue"
                          icon={<Newspaper className="h-4 w-4" />}
                          title="Get the Cyber Security Brief"
                          subtitle="Weekly signals on what is changing in cyber and AI risk"
                        />
                        <CTACard
                          color="red"
                          icon={<Phone className="h-4 w-4" />}
                          title="Book a Call with Our Advisory Team"
                          subtitle="Walk through your environment and identify where this applies"
                        />
                        <CTACard
                          color="gold"
                          icon={<ShieldCheck className="h-4 w-4" />}
                          title="Become a Member"
                          subtitle="Deeper breakdowns and practical guidance across all domains"
                        />
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

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="csl-label mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
        active
          ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.12)] text-white"
          : "border-white/15 bg-white/[0.03] text-white/75 hover:border-white/35 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function MiniList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="csl-label text-[0.65rem] mb-1">{label}</div>
      <ul className="text-xs text-white/75 space-y-0.5">
        {items.map((i) => (
          <li key={i} className="flex gap-1.5">
            <span style={{ color: "hsl(var(--gold))" }}>•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="csl-label mb-1">{label}</div>
      <ul className="text-sm text-white/80 list-disc pl-5 space-y-0.5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function CTACard({
  color,
  icon,
  title,
  subtitle,
}: {
  color: "blue" | "red" | "gold";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const styles =
    color === "blue"
      ? "border-sky-400/40 bg-sky-500/10 hover:bg-sky-500/15"
      : color === "red"
        ? "border-red-400/40 bg-red-500/10 hover:bg-red-500/15"
        : "border-[hsl(var(--gold)/0.5)] bg-[hsl(var(--gold)/0.1)] hover:bg-[hsl(var(--gold)/0.15)]";
  const iconColor =
    color === "blue" ? "text-sky-300" : color === "red" ? "text-red-300" : "text-[hsl(var(--gold))]";
  return (
    <button
      type="button"
      className={`text-left rounded-lg border p-3 transition-all ${styles}`}
    >
      <div className={`flex items-center gap-2 ${iconColor}`}>
        {icon}
        <span className="font-display text-sm font-bold text-white">{title}</span>
      </div>
      <p className="mt-1 text-xs text-white/70">{subtitle}</p>
    </button>
  );
}
