import { useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import CSLFormModal, { FormContext } from "@/components/CSLFormModal";

const FRAMEWORK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/CSLFramework3.0_0160c662.jpg";

const domains = [
  {
    num: "Domain 0: The Foundation", title: "Cyber Asset Intelligence",
    tagline: "You cannot protect what you cannot see.",
    useCases: ["Asset discovery and continuous inventory across hybrid environments", "Shadow IT detection and rogue device identification", "Real-time classification and risk scoring of all connected assets"],
    threats: ["Unmanaged devices creating blind spots in security posture", "Cloud sprawl outpacing asset tracking capabilities", "Supply chain assets introducing unknown risk vectors"],
  },
  {
    num: "Domain 1: Stop BEC & Fraud", title: "Email Security",
    tagline: "Email remains the #1 attack vector. This domain addresses it directly.",
    useCases: ["DMARC, DKIM, and SPF enforcement across all domains", "Executive impersonation and BEC detection", "Phishing simulation and employee resilience testing"],
    threats: ["AI-generated phishing attacks bypassing traditional filters", "Business email compromise targeting finance and executive teams", "Deepfake voice and video used in social engineering chains"],
  },
  {
    num: "Domain 2: Control Trust", title: "Identity & Access",
    tagline: "Identity is the new perimeter. Trust must be earned continuously.",
    useCases: ["Zero Trust architecture design and implementation", "Privileged access management and just-in-time provisioning", "Identity governance across cloud and on-premises environments"],
    threats: ["Credential stuffing and password spray attacks at scale", "Session hijacking and token theft in SaaS environments", "Lateral movement through over-provisioned service accounts"],
  },
  {
    num: "Domain 3: Protect All Devices", title: "Endpoint & Cyber-Physical",
    tagline: "Every endpoint is a potential entry point.",
    useCases: ["EDR deployment and tuning across distributed workforces", "IoT and OT device security in converged environments", "Mobile device management and BYOD policy enforcement"],
    threats: ["Ransomware targeting unpatched endpoints and legacy systems", "IoT botnets exploiting default credentials at scale", "IT/OT convergence creating new attack surfaces in critical infrastructure"],
  },
  {
    num: "Domain 4: Primary Enforcement", title: "Network & Edge",
    tagline: "The network is where policy meets reality.",
    useCases: ["Network segmentation and micro-segmentation strategies", "SASE/SSE deployment for distributed workforces", "DNS security and IDS/IPS tuning for threat detection"],
    threats: ["Encrypted traffic hiding malicious payloads from inspection", "Edge device compromise enabling persistent network access", "DDoS attacks overwhelming critical service availability"],
  },
  {
    num: "Domain 5: Hybrid Protection", title: "Cloud Security",
    tagline: "Cloud-first requires cloud-secure.",
    useCases: ["Cloud security posture management across multi-cloud", "Container and workload protection in CI/CD pipelines", "Cloud access security broker deployment and policy enforcement"],
    threats: ["Misconfigured cloud storage exposing sensitive data publicly", "Container escape vulnerabilities in shared compute environments", "Cross-tenant attacks in multi-cloud architectures"],
  },
  {
    num: "Domain 6: Secure Apps & APIs", title: "Application Security",
    tagline: "Software is the business. Securing it is non-negotiable.",
    useCases: ["Secure SDLC integration with shift-left testing", "API security testing and runtime protection", "Web application firewall deployment and rule management"],
    threats: ["API abuse and broken authentication in production services", "Software supply chain attacks through compromised dependencies", "Zero-day vulnerabilities in web application frameworks"],
  },
  {
    num: "Domain 7: Protect Sensitive Data", title: "Data Security",
    tagline: "Data is the asset. Everything else is infrastructure.",
    useCases: ["Data classification, encryption, and DLP policy enforcement", "Privacy engineering and regulatory compliance automation", "Data loss prevention across endpoints, cloud, and email"],
    threats: ["Data exfiltration through sanctioned collaboration tools", "Regulatory penalties from unclassified sensitive data exposure", "Insider threats leveraging legitimate access to steal data"],
  },
  {
    num: "Domain 8: Prove & Manage Risk", title: "Governance, Risk & Compliance",
    tagline: "Risk that cannot be quantified cannot be managed.",
    useCases: ["Cyber risk quantification for board-level reporting", "Third-party risk management and vendor assessments", "Compliance framework mapping and audit readiness"],
    threats: ["Regulatory landscape shifting faster than compliance programs", "Third-party breaches cascading through supply chain relationships", "Cyber insurance coverage gaps after material incidents"],
  },
  {
    num: "Domain 9: Reduce Behavioral Risk", title: "Human + Machine Factor",
    tagline: "People are not the weakest link. Untrained people are.",
    useCases: ["Security awareness training and phishing simulation programs", "Insider threat detection and behavioral analytics", "Social engineering defense and deepfake awareness training"],
    threats: ["AI-powered social engineering at unprecedented scale", "Deepfake audio and video used for executive impersonation", "Insider threats amplified by remote work and reduced oversight"],
  },
  {
    num: "Domain 10: Detect & Respond", title: "Security Operations",
    tagline: "Detection without response is observation. Response without detection is guessing.",
    useCases: ["SOC design, SIEM/SOAR integration, and alert optimization", "Threat intelligence operationalization and threat hunting", "Incident response planning and tabletop exercises"],
    threats: ["Alert fatigue causing critical detections to be missed", "Advanced persistent threats evading signature-based detection", "AI-assisted attacks accelerating the speed of compromise"],
  },
];

const pillars = [
  { icon: "📐", label: "11 Domains", desc: "A complete architecture spanning assets through operations" },
  { icon: "🎯", label: "Board-Ready", desc: "Designed for executive reporting and strategic alignment" },
  { icon: "🔒", label: "Vendor-Neutral", desc: "Built on principles, not product recommendations" },
  { icon: "⚡", label: "Actionable", desc: "Use cases, threat context, and leadership questions per domain" },
];

export default function FrameworkPage() {
  const [active, setActive] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formVariant, setFormVariant] = useState<"interest" | "advisory" | "brief">("interest");
  const [formContext, setFormContext] = useState<FormContext>({});

  const openGuideForm = () => {
    setFormVariant("brief");
    setFormContext({
      request_type: "Framework Guide Download",
      source_page: "Framework",
      cta_name: "Download the Executive Guide",
    });
    setFormOpen(true);
  };

  const openAdvisoryForm = () => {
    setFormVariant("advisory");
    setFormContext({
      request_type: "Framework Strategy Session",
      source_page: "Framework",
      cta_name: "Book a Strategy Session",
    });
    setFormOpen(true);
  };

  return (
    <CSLLayout>
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">CSL 3.0 | The Cyber Leadership Framework</span>
          <h1 className="mt-3 max-w-[750px]">
            The Operating Framework for<br/>
            <span className="text-gold">Cybersecurity Leadership.</span>
          </h1>
          <p className="text-sm mt-4 max-w-[580px] leading-relaxed text-foreground/80">
            CSL 3.0 is the structured, vendor-neutral leadership model used by CISOs, executives, and boards to align cybersecurity strategy with business outcomes. 11 domains. One clear operating architecture.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={openGuideForm} className="csl-btn csl-btn-primary">
              Download the Executive Guide
            </button>
            <Link to="/membership" className="csl-btn csl-btn-outline">
              Explore Membership
            </Link>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="pb-10">
        <div className="csl-container" style={{ maxWidth: 880 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pillars.map((p) => (
              <div key={p.label} className="rounded-lg p-4 text-center border border-border bg-secondary/40">
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-display text-sm font-bold text-foreground">{p.label}</div>
                <p className="text-xs mt-1 text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMEWORK IMAGE */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="relative rounded-xl overflow-hidden">
            <img src={FRAMEWORK_IMG} alt="CSL Cyber Framework 3.0 visual architecture" className="w-full" />
            <div className="absolute inset-0 pointer-events-none" style={{
              boxShadow: "inset 0 0 60px 30px hsl(var(--navy))",
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `
                linear-gradient(to bottom, hsl(var(--navy) / 0.3) 0%, transparent 12%),
                linear-gradient(to top, hsl(var(--navy) / 0.4) 0%, transparent 10%),
                linear-gradient(to right, hsl(var(--navy) / 0.3) 0%, transparent 8%),
                linear-gradient(to left, hsl(var(--navy) / 0.3) 0%, transparent 8%)
              `,
            }} />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            The CSL 3.0 Framework | 11 domains from asset intelligence through security operations
          </p>
        </div>
      </section>

      {/* MID-PAGE GUIDE CTA */}
      <section className="py-8">
        <div className="csl-container" style={{ maxWidth: 680 }}>
          <div className="rounded-lg border border-accent/20 p-6 text-center" style={{ background: "hsl(var(--accent) / 0.04)" }}>
            <div className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-accent mb-2">Free Resource</div>
            <h3 className="font-display text-lg font-bold text-foreground">Get the CSL 3.0 Executive Guide</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-[440px] mx-auto leading-relaxed">
              A concise overview of the framework, built for leaders who need to brief their board or align their security program.
            </p>
            <button onClick={openGuideForm} className="csl-btn csl-btn-primary mt-4">
              Download the Guide
            </button>
          </div>
        </div>
      </section>

      {/* DOMAIN EXPLORER */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <div className="mb-6">
            <span className="csl-label">Domain Explorer</span>
            <h2 className="mt-2">Explore the 11 Domains</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-[540px] leading-relaxed">
              Each domain includes public use cases and threat context. Members unlock vendor intelligence, leadership questions, and private research.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {domains.map((d, i) => (
              <div key={i}>
                <div className={`domain-card ${active === i ? "active" : ""}`} onClick={() => setActive(active === i ? null : i)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-[0.65rem] font-bold tracking-[0.12em] uppercase text-accent">{d.num}</div>
                      <div className="font-display text-base font-bold mt-1 text-foreground">{d.title}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 text-muted-foreground ${active === i ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                {active === i && (
                  <div className="p-5 rounded-b-lg bg-secondary/60 border-x border-b border-border">
                    {/* Domain tagline */}
                    <p className="text-sm italic text-muted-foreground mb-4">"{d.tagline}"</p>

                    {/* Top 3 Use Cases */}
                    <div className="mb-4">
                      <h5 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-accent mb-2">Top 3 Use Cases</h5>
                      <ul className="flex flex-col gap-1.5">
                        {d.useCases.map((uc, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--emerald))" strokeWidth="2" className="flex-shrink-0 mt-[3px]"><polyline points="20 6 9 17 4 12"/></svg>
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Top 3 Emerging Threats */}
                    <div className="mb-4">
                      <h5 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(var(--orange-bright))" }}>Top 3 Emerging Threats</h5>
                      <ul className="flex flex-col gap-1.5">
                        {d.threats.map((t, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--orange-bright))" strokeWidth="2" className="flex-shrink-0 mt-[3px]"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Member-Only Sections */}
                    <div className="pt-3 mt-3 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {["Top Vendors in the Space", "Key Leadership Questions", "Private CSL Research & Briefing"].map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-display font-semibold tracking-[0.06em] uppercase bg-accent/10 text-accent border border-accent/20">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">Members unlock the full operational manual for every domain.</p>
                    </div>

                    {/* Domain CTA row */}
                    <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-3 items-center">
                      <Link to="/membership" className="csl-btn csl-btn-outline csl-btn-sm">Unlock Full Domain</Link>
                      <button onClick={openGuideForm} className="csl-btn csl-btn-sm text-accent border-accent/30 hover:bg-accent/10" style={{ borderWidth: 1, borderStyle: "solid" }}>
                        Get the Executive Guide
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP VALUE */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 680 }}>
          <div className="text-center mb-8">
            <span className="csl-label">Why Membership</span>
            <h2 className="mt-2">What Members Get</h2>
          </div>
          <div className="grid gap-3">
            {[
              { label: "Full Domain Curriculum", desc: "Complete operational playbooks, vendor maps, and leadership question sets for all 11 domains." },
              { label: "Monthly Domain Sessions", desc: "Live peer sessions focused on one domain at a time. Real problems. Real leaders." },
              { label: "Board-Ready Briefing Materials", desc: "Presentation-ready content designed to communicate cyber risk to non-technical executives." },
              { label: "Private Research & Intelligence", desc: "Access to CSL research, threat briefings, and curated intelligence not available publicly." },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start p-4 rounded-lg border border-border bg-secondary/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <div className="font-display text-sm font-bold text-foreground">{item.label}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/membership" className="csl-btn csl-btn-primary">Become a Member</Link>
          </div>
        </div>
      </section>

      {/* ADVISORY CTA */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container text-center">
          <span className="csl-label">For Organizations</span>
          <h2 className="mt-2">Need Help Applying the Framework?</h2>
          <p className="text-sm mt-3 mx-auto max-w-[500px] leading-relaxed text-foreground/80">
            CSL advisory services help organizations operationalize the framework through assessments, strategy sessions, and executive alignment workshops.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <button onClick={openAdvisoryForm} className="csl-btn csl-btn-primary csl-btn-lg">
              Book a Strategy Session
            </button>
            <button onClick={openGuideForm} className="csl-btn csl-btn-outline csl-btn-lg">
              Download the Guide
            </button>
          </div>
        </div>
      </section>

      <CSLFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        context={formContext}
        variant={formVariant}
      />
    </CSLLayout>
  );
}
