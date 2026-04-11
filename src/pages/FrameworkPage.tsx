import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";
import { GHL_BRIEF } from "@/lib/ghl-urls";

const FRAMEWORK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/CSLFramework3.0_0160c662.jpg";

const domains = [
  {
    num: "Domain 1", title: "Email Security",
    subtitle: "Stop BEC & Fraud",
    tagline: "Email remains the #1 attack vector. This domain addresses it directly.",
    description: "Covers the full spectrum of email-based threats: phishing, business email compromise, executive impersonation, and AI-generated social engineering delivered through inboxes.",
    whyItMatters: "BEC losses exceeded $2.9B in 2023. Email is where trust is exploited and where most breaches begin. Leaders who deprioritize this domain accept the most common risk in cybersecurity.",
    insight: "Enforcing DMARC across all organizational domains is one of the highest-impact, lowest-cost controls a security leader can implement today.",
    useCases: ["DMARC, DKIM, and SPF enforcement across all domains", "Executive impersonation and BEC detection", "Phishing simulation and employee resilience testing"],
    threats: ["AI-generated phishing attacks bypassing traditional filters", "Business email compromise targeting finance and executive teams", "Deepfake voice and video used in social engineering chains"],
  },
  {
    num: "Domain 2", title: "Identity & Access",
    subtitle: "Control Trust",
    tagline: "Identity is the new perimeter. Trust must be earned continuously.",
    description: "Addresses how organizations authenticate, authorize, and govern access across cloud, on-premises, and hybrid environments. Covers Zero Trust, privileged access, and identity lifecycle management.",
    whyItMatters: "Compromised credentials are involved in over 80% of breaches. Identity is no longer just an IT function. It is a board-level risk conversation.",
    insight: "Just-in-time provisioning for privileged accounts eliminates standing access, the single largest source of lateral movement in enterprise breaches.",
    useCases: ["Zero Trust architecture design and implementation", "Privileged access management and just-in-time provisioning", "Identity governance across cloud and on-premises environments"],
    threats: ["Credential stuffing and password spray attacks at scale", "Session hijacking and token theft in SaaS environments", "Lateral movement through over-provisioned service accounts"],
  },
  {
    num: "Domain 3", title: "Endpoint & Cyber-Physical",
    subtitle: "Protect All Devices",
    tagline: "Every endpoint is a potential entry point.",
    description: "Covers security for traditional endpoints, IoT devices, operational technology, and the growing convergence of IT and physical systems.",
    whyItMatters: "Ransomware does not start at the firewall. It starts at the endpoint. With remote work and IoT expansion, your attack surface grows every day whether you manage it or not.",
    insight: "Organizations with tuned EDR and enforced BYOD policies see 60% fewer successful ransomware events compared to those relying on perimeter defenses alone.",
    useCases: ["EDR deployment and tuning across distributed workforces", "IoT and OT device security in converged environments", "Mobile device management and BYOD policy enforcement"],
    threats: ["Ransomware targeting unpatched endpoints and legacy systems", "IoT botnets exploiting default credentials at scale", "IT/OT convergence creating new attack surfaces in critical infrastructure"],
  },
  {
    num: "Domain 4", title: "Network & Edge",
    subtitle: "Primary Enforcement",
    tagline: "The network is where policy meets reality.",
    description: "Focuses on segmentation, edge security, and network-level threat detection. Covers micro-segmentation, SASE/SSE, DNS security, and IDS/IPS strategy.",
    whyItMatters: "Flat networks give attackers free movement. Segmentation and edge enforcement are the mechanisms that turn security policy into operational reality.",
    insight: "Micro-segmentation consistently ranks as the most effective control for limiting blast radius after an initial compromise.",
    useCases: ["Network segmentation and micro-segmentation strategies", "SASE/SSE deployment for distributed workforces", "DNS security and IDS/IPS tuning for threat detection"],
    threats: ["Encrypted traffic hiding malicious payloads from inspection", "Edge device compromise enabling persistent network access", "DDoS attacks overwhelming critical service availability"],
  },
  {
    num: "Domain 5", title: "Cloud Security",
    subtitle: "Hybrid Protection",
    tagline: "Cloud-first requires cloud-secure.",
    description: "Addresses security posture management, container protection, and access brokering across multi-cloud and hybrid environments.",
    whyItMatters: "Cloud misconfigurations are now the leading cause of data exposure. The shared responsibility model means your cloud provider secures the platform, not your data or configurations.",
    insight: "A single misconfigured S3 bucket or storage blob can expose millions of records. Cloud security posture management catches these before attackers do.",
    useCases: ["Cloud security posture management across multi-cloud", "Container and workload protection in CI/CD pipelines", "Cloud access security broker deployment and policy enforcement"],
    threats: ["Misconfigured cloud storage exposing sensitive data publicly", "Container escape vulnerabilities in shared compute environments", "Cross-tenant attacks in multi-cloud architectures"],
  },
  {
    num: "Domain 6", title: "Application Security",
    subtitle: "Secure Apps & APIs",
    tagline: "Software is the business. Securing it is non-negotiable.",
    description: "Covers the full application lifecycle: secure development, API security, web application firewalls, and software supply chain integrity.",
    whyItMatters: "APIs are the connective tissue of modern business. Every exposed API is a potential attack surface. Application security is no longer optional for any organization building or consuming software.",
    insight: "Shifting security left into CI/CD pipelines catches 95% of common vulnerabilities before they reach production, at a fraction of the cost of post-deployment remediation.",
    useCases: ["Secure SDLC integration with shift-left testing", "API security testing and runtime protection", "Web application firewall deployment and rule management"],
    threats: ["API abuse and broken authentication in production services", "Software supply chain attacks through compromised dependencies", "Zero-day vulnerabilities in web application frameworks"],
  },
  {
    num: "Domain 7", title: "Data Security",
    subtitle: "Protect Sensitive Data",
    tagline: "Data is the asset. Everything else is infrastructure.",
    description: "Addresses data classification, encryption, data loss prevention, and privacy engineering across endpoints, cloud, and communication channels.",
    whyItMatters: "Regulators do not fine you for losing servers. They fine you for losing data. Classification and DLP are the controls that determine whether a breach becomes a headline.",
    insight: "Most data exfiltration happens through sanctioned tools like email, cloud storage, and collaboration platforms. DLP that only watches the perimeter misses the majority of risk.",
    useCases: ["Data classification, encryption, and DLP policy enforcement", "Privacy engineering and regulatory compliance automation", "Data loss prevention across endpoints, cloud, and email"],
    threats: ["Data exfiltration through sanctioned collaboration tools", "Regulatory penalties from unclassified sensitive data exposure", "Insider threats leveraging legitimate access to steal data"],
  },
  {
    num: "Domain 8", title: "Governance, Risk & Compliance",
    subtitle: "Prove & Manage Risk",
    tagline: "Risk that cannot be quantified cannot be managed.",
    description: "Covers cyber risk quantification, third-party risk management, regulatory compliance mapping, and board-level reporting frameworks.",
    whyItMatters: "Boards do not want technical updates. They want risk posture in business terms. This domain bridges the gap between security operations and executive decision-making.",
    insight: "Organizations that present cyber risk in financial terms (annualized loss expectancy, scenario modeling) consistently receive faster budget approvals and stronger board engagement.",
    useCases: ["Cyber risk quantification for board-level reporting", "Third-party risk management and vendor assessments", "Compliance framework mapping and audit readiness"],
    threats: ["Regulatory landscape shifting faster than compliance programs", "Third-party breaches cascading through supply chain relationships", "Cyber insurance coverage gaps after material incidents"],
  },
  {
    num: "Domain 9", title: "Human + Machine Factor",
    subtitle: "Reduce Behavioral Risk",
    tagline: "People are not the weakest link. Untrained people are.",
    description: "Addresses security awareness, insider threat detection, behavioral analytics, and defense against social engineering including deepfake-enabled attacks.",
    whyItMatters: "AI-powered social engineering is scaling faster than traditional awareness programs can adapt. The human factor is no longer a training checkbox. It is a continuous risk surface.",
    insight: "Phishing simulation programs that run quarterly produce significantly different outcomes than those running monthly. Frequency and realism drive resilience.",
    useCases: ["Security awareness training and phishing simulation programs", "Insider threat detection and behavioral analytics", "Social engineering defense and deepfake awareness training"],
    threats: ["AI-powered social engineering at unprecedented scale", "Deepfake audio and video used for executive impersonation", "Insider threats amplified by remote work and reduced oversight"],
  },
  {
    num: "Domain 10", title: "Security Operations",
    subtitle: "Detect & Respond",
    tagline: "Detection without response is observation. Response without detection is guessing.",
    description: "Covers SOC design, SIEM/SOAR integration, threat intelligence, threat hunting, and incident response planning.",
    whyItMatters: "The average time to detect a breach is still measured in months. Mature security operations compress that to hours. This domain is the difference between containment and catastrophe.",
    insight: "Tabletop exercises that include legal, communications, and executive leadership produce materially better incident outcomes than exercises confined to the security team alone.",
    useCases: ["SOC design, SIEM/SOAR integration, and alert optimization", "Threat intelligence operationalization and threat hunting", "Incident response planning and tabletop exercises"],
    threats: ["Alert fatigue causing critical detections to be missed", "Advanced persistent threats evading signature-based detection", "AI-assisted attacks accelerating the speed of compromise"],
  },
];

const pillars = [
  { icon: "📐", label: "10 Core Domains", desc: "Complete coverage from email to operations, supported by foundational visibility" },
  { icon: "🎯", label: "Board-Ready", desc: "Designed for executive reporting and strategic alignment" },
  { icon: "🔒", label: "Vendor-Neutral", desc: "Built on principles, not product recommendations" },
  { icon: "⚡", label: "Standards-Aligned", desc: "Designed to support alignment with NIST CSF 2.0, CMMC, and Zero Trust" },
];

export default function FrameworkPage() {
  const [active, setActive] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const openGuideForm = () => setFormOpen(true);
  const openChecklistForm = () => setFormOpen(true);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (formOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [formOpen]);

  return (
    <CSLLayout>
      {/* FRAMEWORK 4.0 ANNOUNCEMENT BAR */}
      <div className="mx-auto" style={{ maxWidth: 1200, padding: "1rem" }}>
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg px-5 py-3"
          style={{
            background: "hsl(var(--navy-mid))",
            border: "1px solid hsl(var(--gold))",
            borderLeft: "3px solid hsl(var(--orange))",
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="font-display text-[0.55rem] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "rgba(212,168,67,0.15)", color: "hsl(var(--gold))" }}
            >
              Coming Soon
            </span>
            <span className="font-display text-sm font-bold text-white">
              CSL Framework 4.0 — A dynamic industry operating system.
            </span>
          </div>
          <Link
            to="/framework-40"
            className="font-display text-[0.7rem] font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-lg whitespace-nowrap"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              background: "transparent",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
          >
            See What's Coming
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">CSL 3.0 | Cyber Leadership Operating System</span>
          <h1 className="mt-3 max-w-[750px]">
            The Operating System for<br/>
            <span className="text-gold">Cybersecurity Leadership.</span>
          </h1>
          <p className="text-sm mt-4 max-w-[600px] leading-relaxed text-foreground/80">
            CSL 3.0 is a practical cyber leadership operating system built on 10 core domains, supported by foundational visibility across the framework. It helps leaders translate recognized security models into action, governance, and execution.
          </p>
          <p className="text-xs mt-2 text-muted-foreground max-w-[540px] leading-relaxed">
            Designed to support alignment with NIST CSF 2.0, CMMC, and Zero Trust principles. CSL 3.0 does not replace standards. It helps leaders apply them.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => openGuideForm()} className="csl-btn csl-btn-primary">
              Request the Executive Guide
            </button>
            <Link to="/enroll" className="csl-btn csl-btn-outline">
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
            <img src={FRAMEWORK_IMG} alt="CSL 3.0 Cyber Leadership Operating System" className="w-full" />
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
            CSL 3.0 | 10 core domains supported by foundational visibility
          </p>
        </div>
      </section>

      {/* VISIBILITY FOUNDATION CALLOUT */}
      <section className="py-6">
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="rounded-lg border border-border p-5 bg-secondary/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-accent/20" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <div>
                <div className="font-display text-[0.65rem] font-bold tracking-[0.12em] uppercase text-accent">Foundational Layer</div>
                <div className="font-display text-base font-bold mt-1 text-foreground">Visibility | Cyber Asset Intelligence</div>
                <p className="text-sm text-foreground/75 mt-2 leading-relaxed">
                  Visibility is not a separate domain. It is the foundational layer that supports all 10 core domains. Without a continuously updated inventory of every asset in your environment, every other security investment operates on incomplete information.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  This layer ensures the entire operating system functions on complete, accurate data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MID-PAGE GUIDE CTA */}
      <section className="py-8">
        <div className="csl-container" style={{ maxWidth: 680 }}>
          <div className="rounded-lg border border-accent/20 p-6 text-center" style={{ background: "hsl(var(--accent) / 0.04)" }}>
            <div className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-accent mb-2">Executive Resource</div>
            <h3 className="font-display text-lg font-bold text-foreground">Request the CSL 3.0 Executive Guide</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-[440px] mx-auto leading-relaxed">
              Submit your request and we'll deliver a concise overview of the operating system, built for leaders who need to brief their board, align their security program, or evaluate their current posture.
            </p>
            <button onClick={() => openGuideForm()} className="csl-btn csl-btn-primary mt-4">
              Request the Guide
            </button>
          </div>
        </div>
      </section>

      {/* DOMAIN EXPLORER */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <div className="mb-6">
            <span className="csl-label">Domain Explorer</span>
            <h2 className="mt-2">10 Core Domains</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-[560px] leading-relaxed">
              Each domain includes public use cases and threat context. Members unlock vendor intelligence, leadership questions, and the full operational manual.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {domains.map((d, i) => (
              <div key={i}>
                <div className={`domain-card ${active === i ? "active" : ""}`} onClick={() => setActive(active === i ? null : i)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-[0.65rem] font-bold tracking-[0.12em] uppercase text-accent">{d.num} | {d.subtitle}</div>
                      <div className="font-display text-base font-bold mt-1 text-foreground">{d.title}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 text-muted-foreground ${active === i ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                {active === i && (
                  <div className="p-5 rounded-b-lg bg-secondary/60 border-x border-b border-border">
                    {/* Domain tagline */}
                    <p className="text-sm italic text-muted-foreground mb-3">"{d.tagline}"</p>

                    {/* What this domain covers */}
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4">{d.description}</p>

                    {/* Why it matters */}
                    <div className="mb-4 rounded-md p-3 border border-accent/15" style={{ background: "hsl(var(--accent) / 0.03)" }}>
                      <div className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-accent mb-1">Why This Matters to Leaders</div>
                      <p className="text-sm text-foreground/75 leading-relaxed">{d.whyItMatters}</p>
                    </div>

                    {/* Practical insight */}
                    <div className="mb-4 rounded-md p-3 border border-border bg-secondary/40">
                      <div className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "hsl(var(--emerald))" }}>Practical Insight</div>
                      <p className="text-sm text-foreground/75 leading-relaxed">{d.insight}</p>
                    </div>

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

                    {/* Conversion CTA row */}
                    <div className="mt-4 pt-3 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => openGuideForm()} className="csl-btn csl-btn-primary csl-btn-sm">
                          Request the Guide
                        </button>
                        <button onClick={() => openChecklistForm()} className="csl-btn csl-btn-outline csl-btn-sm">
                          Get the Executive Checklist
                        </button>
                        <Link to="/enroll" className="csl-btn csl-btn-sm border border-accent/30 text-accent hover:bg-accent/10">
                          Unlock Full Manual
                        </Link>
                        <Link to="/book" className="csl-btn csl-btn-sm text-muted-foreground border border-border hover:text-foreground hover:border-foreground/20">
                          Book a Leadership Review
                        </Link>
                      </div>
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
              { label: "Full Domain Curriculum", desc: "Complete operational playbooks, vendor maps, and leadership question sets across all 10 domains." },
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
            <Link to="/enroll" className="csl-btn csl-btn-primary">Become a Member</Link>
          </div>
        </div>
      </section>

      {/* ADVISORY CTA */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container text-center">
          <span className="csl-label">For Organizations</span>
          <h2 className="mt-2">Need Help Applying the Framework?</h2>
          <p className="text-sm mt-3 mx-auto max-w-[520px] leading-relaxed text-foreground/80">
            CSL advisory services help organizations operationalize the framework through assessments, leadership reviews, and executive alignment workshops. We help leaders apply recognized models, not just read about them.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link to="/book" className="csl-btn csl-btn-primary csl-btn-lg">
              Book a Leadership Review
            </Link>
            <button onClick={() => openGuideForm()} className="csl-btn csl-btn-outline csl-btn-lg">
              Request the Guide
            </button>
          </div>
        </div>
      </section>

      {/* GHL Form Embed Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(11,17,32,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setFormOpen(false)}
          />
          <div
            className="relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: "hsl(222 47% 11%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors z-10"
              style={{ color: "#94A3B8" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                Request the Executive Guide
              </h3>
              <p className="text-sm mt-2 mb-4 text-muted-foreground">
                Submit your request and we'll deliver the CSL 3.0 Framework overview directly to your inbox.
              </p>
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  background: "hsl(var(--navy-mid))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <iframe
                  src={GHL_BRIEF}
                  style={{
                    width: "100%",
                    minHeight: 500,
                    border: "none",
                    colorScheme: "dark",
                    filter: "invert(1) hue-rotate(180deg)",
                  }}
                  scrolling="yes"
                  title="Request the Executive Guide"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </CSLLayout>
  );
}
