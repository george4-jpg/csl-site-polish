import { useState } from "react";
import { ChevronDown, Lock, ShieldCheck } from "lucide-react";

interface Domain {
  number: number;
  name: string;
  whyItMatters: string;
  useCases: string[];
  emergingThreats: string[];
  tools: string[];
  actors: string[];
  ttps: string[];
  relevance: string;
}

const DOMAINS: Domain[] = [
  {
    number: 1,
    name: "Identity & Access",
    whyItMatters: "Most breaches originate from identity compromise.",
    useCases: ["Credential theft", "Session hijacking", "Privilege escalation"],
    emergingThreats: ["MFA bypass kits", "Token replay attacks", "Deepfake authentication"],
    tools: ["Evilginx", "Modlishka", "EvilProxy"],
    actors: ["Initial access brokers", "Scattered Spider style crews", "Nation-state operators"],
    ttps: ["Adversary-in-the-middle phishing", "MFA fatigue", "Help desk social engineering"],
    relevance: "Highly relevant for Enterprise, K-12, Higher Ed, and Government.",
  },
  {
    number: 2,
    name: "Network & Connectivity",
    whyItMatters: "Flat networks turn one foothold into full compromise.",
    useCases: ["Lateral movement", "Rogue access points", "DNS abuse"],
    emergingThreats: ["Edge device 0-days", "Encrypted C2 over QUIC", "AI-driven traffic blending"],
    tools: ["WiFi Pineapple", "Responder", "Cobalt Strike"],
    actors: ["Ransomware affiliates", "Hacktivists", "Espionage groups"],
    ttps: ["VPN appliance exploitation", "ARP/LLMNR poisoning", "Pivoting via trusted segments"],
    relevance: "Critical for Enterprise, Healthcare, and Critical Infrastructure.",
  },
  {
    number: 3,
    name: "Endpoint & Devices",
    whyItMatters: "Endpoints remain the most reliable entry point for attackers.",
    useCases: ["Infostealer infections", "Ransomware staging", "Persistence implants"],
    emergingThreats: ["EDR bypass loaders", "BYOVD attacks", "Browser session theft"],
    tools: ["RedLine", "Lumma", "Raccoon Stealer"],
    actors: ["Commodity malware crews", "Initial access brokers", "Ransomware operators"],
    ttps: ["Malvertising delivery", "Cracked software trojans", "Token and cookie theft"],
    relevance: "Universal across every sector and company size.",
  },
  {
    number: 4,
    name: "Cloud & SaaS",
    whyItMatters: "Cloud misconfig and OAuth abuse bypass traditional perimeter controls.",
    useCases: ["OAuth consent phishing", "Tenant takeover", "SaaS data exfiltration"],
    emergingThreats: ["Cross-tenant attacks", "Shadow SaaS sprawl", "Token theft at scale"],
    tools: ["TeamFiltration", "MFASweep", "Custom Azure apps"],
    actors: ["Storm-0558 style actors", "Financially motivated crews", "Insider threats"],
    ttps: ["Illicit consent grants", "Mailbox rule abuse", "Federation backdoors"],
    relevance: "Critical for SaaS-heavy Enterprise, SMB, and Government tenants.",
  },
  {
    number: 5,
    name: "Data & Privacy",
    whyItMatters: "Data exposure drives regulatory, legal, and reputational impact.",
    useCases: ["Exposed storage buckets", "Insider exfiltration", "Backup compromise"],
    emergingThreats: ["AI training data leaks", "Vector DB exposure", "Double-extortion ransomware"],
    tools: ["grayhatwarfare", "Rclone", "MEGAsync"],
    actors: ["Ransomware cartels", "Insiders", "Data brokers"],
    ttps: ["Public bucket discovery", "Mass download via legitimate tools", "Backup deletion"],
    relevance: "High impact for Healthcare, Finance, Education, and Government.",
  },
  {
    number: 6,
    name: "Applications",
    whyItMatters: "Vulnerable apps and dependencies open direct paths to your data.",
    useCases: ["Webshell deployment", "API abuse", "Supply chain compromise"],
    emergingThreats: ["LLM prompt injection", "Malicious npm/PyPI packages", "API token leakage"],
    tools: ["Metasploit modules", "Public PoC exploits", "Burp Suite"],
    actors: ["Opportunistic scanners", "Targeted APTs", "Supply chain attackers"],
    ttps: ["Unpatched CVE exploitation", "Dependency confusion", "Auth bypass chaining"],
    relevance: "Essential for SaaS, FinTech, and any internet-facing application owner.",
  },
  {
    number: 7,
    name: "Infrastructure",
    whyItMatters: "Edge and core infrastructure compromise enables long-dwell intrusions.",
    useCases: ["VPN appliance exploits", "Hypervisor attacks", "Domain controller takeover"],
    emergingThreats: ["ESXi ransomware", "Firmware implants", "Cloud control plane abuse"],
    tools: ["Targeted exploits", "Custom implants", "Mimikatz"],
    actors: ["Nation-state operators", "Top-tier ransomware crews", "Persistent intruders"],
    ttps: ["Edge 0-day exploitation", "Golden ticket attacks", "Hypervisor escape"],
    relevance: "Critical for Enterprise, Government, and Critical Infrastructure.",
  },
  {
    number: 8,
    name: "Operations",
    whyItMatters: "Process gaps and human factors are exploited every day.",
    useCases: ["Help desk social engineering", "Vendor impersonation", "Change control abuse"],
    emergingThreats: ["AI-generated pretexting", "Deepfake video calls", "Insider-as-a-service"],
    tools: ["OSINT toolkits", "Caller ID spoofing", "Social engineering frameworks"],
    actors: ["Scattered Spider style crews", "Business email compromise actors", "Insiders"],
    ttps: ["MFA reset social engineering", "Wire transfer fraud", "Approval workflow bypass"],
    relevance: "Universal: every organization with a help desk or finance function.",
  },
  {
    number: 9,
    name: "AI & Automation",
    whyItMatters: "AI tools introduce new attack surface and amplify existing threats.",
    useCases: ["Prompt injection", "Voice clone fraud", "Model and data poisoning"],
    emergingThreats: ["Agent hijacking", "Indirect prompt injection via documents", "Shadow AI usage"],
    tools: ["ElevenLabs", "Open-source voice clones", "Crafted injection payloads"],
    actors: ["BEC operators", "Fraud rings", "Researchers turned adversaries"],
    ttps: ["CEO voice fraud", "Hidden instructions in shared docs", "Tool-use abuse in agents"],
    relevance: "Rapidly rising risk for Finance, Executive Offices, and AI-enabled workflows.",
  },
  {
    number: 10,
    name: "Physical & IoT",
    whyItMatters: "Physical access and IoT devices bypass most digital controls.",
    useCases: ["Malicious USB/cable drops", "Badge cloning", "IoT device hijacking"],
    emergingThreats: ["OMG cables at scale", "Smart building exploits", "Connected medical device attacks"],
    tools: ["OMG Cable", "Flipper Zero", "Proxmark3"],
    actors: ["Red teams", "Insider threats", "Targeted intruders"],
    ttps: ["HID injection", "RFID cloning", "Default credential exploitation on IoT"],
    relevance: "Critical for Healthcare, Manufacturing, Education, and Government facilities.",
  },
];

export default function AttackMapPage() {
  const [openDomain, setOpenDomain] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--navy))" }}>
      {/* Minimal header */}
      <header className="border-b border-white/5">
        <div className="csl-container py-4">
          <span className="font-display text-sm font-bold tracking-[0.2em] text-white/70">CSL</span>
        </div>
      </header>

      {/* Hero */}
      <section className="csl-container pt-12 pb-10">
        <div className="max-w-3xl">
          <span className="csl-label">Private Prototype</span>
          <h1 className="mt-3 font-display text-white">
            Attack Intelligence Across the 10 Domains
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/70">
            See how real cyber and AI threats map to the CSL Leadership Framework.
          </p>
        </div>
      </section>

      {/* Domain grid */}
      <section className="csl-container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOMAINS.map((d) => {
            const open = openDomain === d.number;
            return (
              <div key={d.number} className="contents">
                <button
                  onClick={() => setOpenDomain(open ? null : d.number)}
                  className={`text-left p-5 rounded-xl border transition-all ${
                    open
                      ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.06)] shadow-[0_0_24px_rgba(212,168,67,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-xs font-bold tracking-[0.18em]"
                      style={{ color: "hsl(var(--gold))" }}
                    >
                      DOMAIN {d.number}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </div>

                  <h3 className="mt-2 font-display text-lg font-bold text-white leading-tight">
                    {d.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/70">{d.whyItMatters}</p>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <MiniList label="Use Cases" items={d.useCases} />
                    <MiniList label="Emerging Threats" items={d.emergingThreats} />
                  </div>
                </button>

                {open && (
                  <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-white/10 bg-[hsl(var(--navy-mid))] p-5 md:p-6 animate-fade-in">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="font-display text-xs font-bold tracking-[0.18em]"
                        style={{ color: "hsl(var(--gold))" }}
                      >
                        DOMAIN {d.number}
                      </span>
                      <span className="text-white/30">|</span>
                      <h2 className="font-display text-xl text-white">{d.name}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <DetailList label="Common Tools" items={d.tools} />
                      <DetailList label="Common Threat Actors" items={d.actors} />
                      <DetailList label="TTPs" items={d.ttps} />
                    </div>

                    <div className="mt-5">
                      <div className="csl-label mb-1">Relevance</div>
                      <p className="text-sm text-white/80">{d.relevance}</p>
                    </div>

                    {/* Locked conversion section */}
                    <div className="relative mt-6 rounded-xl border border-[hsl(var(--gold)/0.3)] overflow-hidden">
                      <div className="p-5 blur-sm select-none pointer-events-none" aria-hidden>
                        <div className="font-display font-bold text-white mb-2">
                          Full Threat Breakdown & Defense Strategy
                        </div>
                        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                          <li>Specific detections mapped to each TTP</li>
                          <li>Control coverage by environment and platform</li>
                          <li>Tabletop scenarios and executive playbooks</li>
                          <li>Vendor-neutral implementation guidance</li>
                        </ul>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 bg-[hsl(var(--navy)/0.78)]">
                        <Lock className="h-5 w-5" style={{ color: "hsl(var(--gold))" }} />
                        <div className="mt-2 font-display font-bold text-white text-sm md:text-base">
                          Full Threat Breakdown & Defense Strategy
                        </div>
                        <p className="mt-1 text-xs md:text-sm text-white/70 max-w-md">
                          Members unlock detailed tools, actors, and exact controls for their environment.
                        </p>
                        <button className="csl-btn csl-btn-gold csl-btn-sm mt-4">
                          <ShieldCheck className="h-3.5 w-3.5" /> Become a Member
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
