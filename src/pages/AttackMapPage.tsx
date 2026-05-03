import { useState } from "react";
import {
  Smartphone, Network, Fingerprint, Cloud, Brain, Monitor,
  Database, AppWindow, Server, Settings, ChevronDown, Lock, ShieldCheck
} from "lucide-react";

type Difficulty = "Easy" | "Moderate" | "Advanced";
type Skill = "Low" | "Medium" | "High";
type Access = "Physical" | "Remote" | "Social";

interface Attack {
  name: string;
  blurb: string;
  difficulty: Difficulty;
  skill: Skill;
  access: Access;
  scenario: string;
  tools: string[];
  whyItWorks: string[];
  impact: string[];
}

interface Domain {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  subtext: string;
  attacks: Attack[];
}

const DOMAINS: Domain[] = [
  {
    id: "physical",
    name: "Physical / Device",
    icon: Smartphone,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "OMG Cable",
        blurb: "Malicious USB-C/Lightning cable injects keystrokes when plugged in.",
        difficulty: "Easy", skill: "Low", access: "Physical",
        scenario: "Employee plugs in a 'spare' charging cable. Commands execute silently in the background.",
        tools: ["OMG Cable", "USB Rubber Ducky", "Bash Bunny"],
        whyItWorks: ["Devices trust HID input by default", "No user awareness of malicious cables", "Looks identical to a real cable"],
        impact: ["Immediate shell access", "Credential compromise", "Persistence via scheduled task"],
      },
      {
        name: "Drop Attack (USB)",
        blurb: "Branded USB left in lobby or parking lot is plugged in by a curious employee.",
        difficulty: "Easy", skill: "Low", access: "Physical",
        scenario: "USB labeled 'Payroll Q4' dropped near entrance. Found and plugged in to identify owner.",
        tools: ["Rubber Ducky", "Custom autorun payloads"],
        whyItWorks: ["Human curiosity", "Default USB trust", "No endpoint USB policy"],
        impact: ["Foothold on workstation", "Lateral movement", "Data exfiltration"],
      },
    ],
  },
  {
    id: "network",
    name: "Network",
    icon: Network,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Evil Twin WiFi",
        blurb: "Rogue AP impersonates a trusted SSID to capture traffic and credentials.",
        difficulty: "Moderate", skill: "Medium", access: "Remote",
        scenario: "Attacker stands up 'CorpGuest' at a conference. Devices auto-connect.",
        tools: ["WiFi Pineapple", "hostapd-mana", "Evilginx"],
        whyItWorks: ["Devices auto-join known SSIDs", "No certificate pinning", "Users ignore warnings"],
        impact: ["Session hijack", "MFA bypass via proxy", "Email and SaaS compromise"],
      },
    ],
  },
  {
    id: "identity",
    name: "Identity",
    icon: Fingerprint,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "MFA Fatigue",
        blurb: "Repeated push prompts until the user approves out of frustration.",
        difficulty: "Easy", skill: "Low", access: "Remote",
        scenario: "Attacker has the password. Sends 30 push prompts at 2am until approved.",
        tools: ["Stolen credentials", "Push spam scripts"],
        whyItWorks: ["Push fatigue", "No number matching", "No risk-based MFA"],
        impact: ["Full account takeover", "Cloud admin access", "Token theft"],
      },
      {
        name: "AiTM Phishing",
        blurb: "Reverse-proxy phishing kit captures session token after legit MFA.",
        difficulty: "Moderate", skill: "Medium", access: "Social",
        scenario: "User clicks a link, enters creds and MFA on a proxy. Attacker steals the session cookie.",
        tools: ["Evilginx", "Modlishka"],
        whyItWorks: ["MFA does not protect the session token", "Realistic login pages"],
        impact: ["Persistent session access", "Mailbox rules and exfiltration"],
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud / SaaS",
    icon: Cloud,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "OAuth Consent Phish",
        blurb: "Malicious app requests broad scopes; user clicks Allow.",
        difficulty: "Moderate", skill: "Medium", access: "Social",
        scenario: "Email invites user to grant a 'productivity app' Mail.Read and offline access.",
        tools: ["Custom Azure app registrations"],
        whyItWorks: ["No app governance", "Users trust consent screens"],
        impact: ["Persistent mailbox access", "Bypasses password and MFA changes"],
      },
    ],
  },
  {
    id: "ai",
    name: "AI / Social Engineering",
    icon: Brain,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Voice Clone CEO Fraud",
        blurb: "Cloned voice of executive instructs finance to wire funds.",
        difficulty: "Moderate", skill: "Medium", access: "Social",
        scenario: "AP receives a call that sounds exactly like the CFO requesting an urgent wire.",
        tools: ["ElevenLabs", "Open-source TTS clones"],
        whyItWorks: ["Voice is trusted", "Urgency bypasses process", "No callback verification"],
        impact: ["Direct financial loss", "Reputational damage"],
      },
      {
        name: "Prompt Injection",
        blurb: "Hidden instructions in documents hijack an AI assistant's behavior.",
        difficulty: "Moderate", skill: "Medium", access: "Remote",
        scenario: "AI assistant summarizes a document containing hidden 'forward all email to X' instructions.",
        tools: ["Crafted documents", "Indirect injection payloads"],
        whyItWorks: ["LLMs cannot distinguish data from instructions", "Tool use enables real actions"],
        impact: ["Data exfiltration via the assistant", "Unauthorized actions in connected tools"],
      },
    ],
  },
  {
    id: "endpoint",
    name: "Endpoint",
    icon: Monitor,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Infostealer Malware",
        blurb: "Cracked software or fake installer drops a credential stealer.",
        difficulty: "Easy", skill: "Low", access: "Remote",
        scenario: "Employee installs a 'free PDF tool'. Browser cookies and saved passwords are exfiltrated.",
        tools: ["RedLine", "Lumma", "Raccoon"],
        whyItWorks: ["Local admin rights", "Browsers store sessions", "No EDR or weak policy"],
        impact: ["Corporate SSO session theft", "Initial access broker sales"],
      },
    ],
  },
  {
    id: "data",
    name: "Data",
    icon: Database,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Exposed Storage Bucket",
        blurb: "Misconfigured S3/Blob/GCS exposes sensitive data to the public.",
        difficulty: "Easy", skill: "Low", access: "Remote",
        scenario: "Backup bucket left public. Indexed by scanners within hours.",
        tools: ["grayhatwarfare", "S3Scanner"],
        whyItWorks: ["Default deny not enforced", "No CSPM coverage"],
        impact: ["PII and IP loss", "Regulatory exposure"],
      },
    ],
  },
  {
    id: "application",
    name: "Application",
    icon: AppWindow,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Vulnerable Dependency",
        blurb: "Unpatched library exploited for remote code execution.",
        difficulty: "Moderate", skill: "Medium", access: "Remote",
        scenario: "Public app runs a vulnerable version of a popular library; PoC exploit drops a webshell.",
        tools: ["Public PoC exploits", "Metasploit modules"],
        whyItWorks: ["Slow patch cycles", "No SBOM or runtime visibility"],
        impact: ["Webshell on production", "Pivot to internal network"],
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: Server,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Edge Device 0-Day",
        blurb: "VPN or firewall appliance exploited before patch is available.",
        difficulty: "Advanced", skill: "High", access: "Remote",
        scenario: "Internet-facing VPN appliance exploited via auth bypass; attacker pivots inside.",
        tools: ["Targeted exploits", "Custom implants"],
        whyItWorks: ["Edge devices are internet exposed", "Limited EDR on appliances"],
        impact: ["Full network foothold", "Long-dwell intrusion"],
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    icon: Settings,
    subtext: "Common attack paths",
    attacks: [
      {
        name: "Help Desk Social Engineering",
        blurb: "Attacker calls IT, impersonates an exec, and resets MFA.",
        difficulty: "Moderate", skill: "Medium", access: "Social",
        scenario: "Caller pressures help desk to reset MFA without strong verification.",
        tools: ["OSINT (LinkedIn, leaks)", "Caller ID spoofing"],
        whyItWorks: ["Weak verification scripts", "Pressure and urgency"],
        impact: ["Account takeover at admin tier", "Tenant-wide compromise"],
      },
    ],
  },
];

const diffColor = (d: Difficulty) =>
  d === "Easy" ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
  : d === "Moderate" ? "bg-amber-500/15 text-amber-300 border-amber-400/30"
  : "bg-rose-500/15 text-rose-300 border-rose-400/30";

const pill = "inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider border";

export default function AttackMapPage() {
  const [openDomain, setOpenDomain] = useState<string | null>(null);
  const [openAttack, setOpenAttack] = useState<string | null>(null);

  const toggleDomain = (id: string) => {
    setOpenAttack(null);
    setOpenDomain(openDomain === id ? null : id);
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--navy))" }}>
      {/* Minimal header */}
      <header className="border-b border-white/5">
        <div className="csl-container py-4">
          <span className="font-display text-sm font-bold tracking-[0.2em] text-white/70">CSL</span>
        </div>
      </header>

      {/* Hero */}
      <section className="csl-container pt-12 pb-8">
        <div className="max-w-3xl">
          <span className="csl-label">Private Prototype</span>
          <h1 className="mt-3 font-display">Attack Map: How You Get Compromised</h1>
          <p className="mt-4 text-base md:text-lg text-white/70">
            Explore real attacks across cyber and AI domains. Click a domain, then click an attack.
          </p>
        </div>
      </section>

      {/* Domain grid */}
      <section className="csl-container pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {DOMAINS.map((d) => {
            const Icon = d.icon;
            const active = openDomain === d.id;
            return (
              <button
                key={d.id}
                onClick={() => toggleDomain(d.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  active
                    ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.06)] shadow-[0_0_24px_rgba(212,168,67,0.15)]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:-translate-y-0.5"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-[hsl(var(--gold))]" : "text-white/70"}`} />
                <div className="mt-3 font-display font-bold text-sm text-white">{d.name}</div>
                <div className="mt-1 text-xs text-white/50">{d.subtext}</div>
                <ChevronDown className={`mt-2 h-4 w-4 text-white/40 transition-transform ${active ? "rotate-180" : ""}`} />
              </button>
            );
          })}
        </div>

        {/* Expanded domain panel */}
        {openDomain && (
          <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-4 md:p-6 animate-fade-in">
            {(() => {
              const d = DOMAINS.find((x) => x.id === openDomain)!;
              return (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <d.icon className="h-5 w-5 text-[hsl(var(--gold))]" />
                    <h2 className="font-display text-xl text-white">{d.name} — Attack Paths</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {d.attacks.map((a) => {
                      const id = `${d.id}:${a.name}`;
                      const open = openAttack === id;
                      return (
                        <div key={id} className="rounded-xl border border-white/8 bg-[hsl(var(--navy-mid))]">
                          <button
                            onClick={() => setOpenAttack(open ? null : id)}
                            className="w-full text-left p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-display font-bold text-white">{a.name}</div>
                                <div className="mt-1 text-xs text-white/60">{a.blurb}</div>
                              </div>
                              <ChevronDown className={`h-4 w-4 text-white/40 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              <span className={`${pill} ${diffColor(a.difficulty)}`}>{a.difficulty}</span>
                              <span className={`${pill} bg-white/5 text-white/70 border-white/10`}>Skill: {a.skill}</span>
                              <span className={`${pill} bg-white/5 text-white/70 border-white/10`}>Access: {a.access}</span>
                            </div>
                          </button>

                          {open && (
                            <div className="border-t border-white/8 p-4 space-y-4 animate-fade-in">
                              <Detail label="Scenario">{a.scenario}</Detail>
                              <DetailList label="Tools Used" items={a.tools} />
                              <DetailList label="Why It Works" items={a.whyItWorks} />
                              <DetailList label="Impact" items={a.impact} />

                              {/* Locked content */}
                              <div className="relative mt-4 rounded-lg border border-[hsl(var(--gold)/0.3)] overflow-hidden">
                                <div className="p-4 blur-sm select-none pointer-events-none" aria-hidden>
                                  <div className="font-display font-bold text-white mb-2">Fix This in Your Environment</div>
                                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                                    <li>Specific control mapped to this attack</li>
                                    <li>Detection rule and telemetry source</li>
                                    <li>Playbook and tabletop scenario</li>
                                  </ul>
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-[hsl(var(--navy)/0.7)]">
                                  <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
                                  <div className="mt-2 font-display font-bold text-white text-sm">
                                    Members unlock exact controls and playbooks
                                  </div>
                                  <button className="csl-btn csl-btn-gold csl-btn-sm mt-3">
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
                </>
              );
            })()}
          </div>
        )}
      </section>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="csl-label mb-1">{label}</div>
      <p className="text-sm text-white/80">{children}</p>
    </div>
  );
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="csl-label mb-1">{label}</div>
      <ul className="text-sm text-white/80 list-disc pl-5 space-y-0.5">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
