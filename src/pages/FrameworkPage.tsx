import { useState } from "react";
import { Link } from "react-router-dom";
import CSLLayout from "@/components/CSLLayout";

const FRAMEWORK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/CSLFramework3.0_0160c662.jpg";

const domains = [
  {
    num: "Domain 0: The Foundation", title: "Cyber Asset Intelligence",
    useCases: ["Asset discovery and continuous inventory across hybrid environments", "Shadow IT detection and rogue device identification", "Real-time classification and risk scoring of all connected assets"],
    threats: ["Unmanaged devices creating blind spots in security posture", "Cloud sprawl outpacing asset tracking capabilities", "Supply chain assets introducing unknown risk vectors"],
  },
  {
    num: "Domain 1: Stop BEC & Fraud", title: "Email Security",
    useCases: ["DMARC, DKIM, and SPF enforcement across all domains", "Executive impersonation and BEC detection", "Phishing simulation and employee resilience testing"],
    threats: ["AI-generated phishing attacks bypassing traditional filters", "Business email compromise targeting finance and executive teams", "Deepfake voice and video used in social engineering chains"],
  },
  {
    num: "Domain 2: Control Trust", title: "Identity & Access",
    useCases: ["Zero Trust architecture design and implementation", "Privileged access management and just-in-time provisioning", "Identity governance across cloud and on-premises environments"],
    threats: ["Credential stuffing and password spray attacks at scale", "Session hijacking and token theft in SaaS environments", "Lateral movement through over-provisioned service accounts"],
  },
  {
    num: "Domain 3: Protect All Devices", title: "Endpoint & Cyber-Physical",
    useCases: ["EDR deployment and tuning across distributed workforces", "IoT and OT device security in converged environments", "Mobile device management and BYOD policy enforcement"],
    threats: ["Ransomware targeting unpatched endpoints and legacy systems", "IoT botnets exploiting default credentials at scale", "IT/OT convergence creating new attack surfaces in critical infrastructure"],
  },
  {
    num: "Domain 4: Primary Enforcement", title: "Network & Edge",
    useCases: ["Network segmentation and micro-segmentation strategies", "SASE/SSE deployment for distributed workforces", "DNS security and IDS/IPS tuning for threat detection"],
    threats: ["Encrypted traffic hiding malicious payloads from inspection", "Edge device compromise enabling persistent network access", "DDoS attacks overwhelming critical service availability"],
  },
  {
    num: "Domain 5: Hybrid Protection", title: "Cloud Security",
    useCases: ["Cloud security posture management across multi-cloud", "Container and workload protection in CI/CD pipelines", "Cloud access security broker deployment and policy enforcement"],
    threats: ["Misconfigured cloud storage exposing sensitive data publicly", "Container escape vulnerabilities in shared compute environments", "Cross-tenant attacks in multi-cloud architectures"],
  },
  {
    num: "Domain 6: Secure Apps & APIs", title: "Application Security",
    useCases: ["Secure SDLC integration with shift-left testing", "API security testing and runtime protection", "Web application firewall deployment and rule management"],
    threats: ["API abuse and broken authentication in production services", "Software supply chain attacks through compromised dependencies", "Zero-day vulnerabilities in web application frameworks"],
  },
  {
    num: "Domain 7: Protect Sensitive Data", title: "Data Security",
    useCases: ["Data classification, encryption, and DLP policy enforcement", "Privacy engineering and regulatory compliance automation", "Data loss prevention across endpoints, cloud, and email"],
    threats: ["Data exfiltration through sanctioned collaboration tools", "Regulatory penalties from unclassified sensitive data exposure", "Insider threats leveraging legitimate access to steal data"],
  },
  {
    num: "Domain 8: Prove & Manage Risk", title: "Governance, Risk & Compliance",
    useCases: ["Cyber risk quantification for board-level reporting", "Third-party risk management and vendor assessments", "Compliance framework mapping and audit readiness"],
    threats: ["Regulatory landscape shifting faster than compliance programs", "Third-party breaches cascading through supply chain relationships", "Cyber insurance coverage gaps after material incidents"],
  },
  {
    num: "Domain 9: Reduce Behavioral Risk", title: "Human + Machine Factor",
    useCases: ["Security awareness training and phishing simulation programs", "Insider threat detection and behavioral analytics", "Social engineering defense and deepfake awareness training"],
    threats: ["AI-powered social engineering at unprecedented scale", "Deepfake audio and video used for executive impersonation", "Insider threats amplified by remote work and reduced oversight"],
  },
  {
    num: "Domain 10: Detect & Respond", title: "Security Operations",
    useCases: ["SOC design, SIEM/SOAR integration, and alert optimization", "Threat intelligence operationalization and threat hunting", "Incident response planning and tabletop exercises"],
    threats: ["Alert fatigue causing critical detections to be missed", "Advanced persistent threats evading signature-based detection", "AI-assisted attacks accelerating the speed of compromise"],
  },
];

export default function FrameworkPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <CSLLayout>
      <section className="csl-section">
        <div className="csl-container">
          <span className="csl-label">The CSL Cyber Framework 3.0</span>
          <h1 className="mt-3 max-w-[700px]">10-Domain Architecture.<br/><span className="text-gold">Board-Ready Intelligence.</span></h1>
          <p className="text-sm mt-3 max-w-[540px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            The Framework is the backbone of everything CSL teaches. Used by C-Level leaders, validated by education partners, and shared with boards, government agencies, and community leaders.
          </p>
          <p className="text-xs mt-2 text-muted-foreground">Questions? <a href="mailto:info@cybersecurity-leadership.org" className="text-gold">info@cybersecurity-leadership.org</a></p>
        </div>
      </section>

      {/* FRAMEWORK IMAGE - soft fade blend */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="relative rounded-xl overflow-hidden">
            <img src={FRAMEWORK_IMG} alt="CSL Cyber Framework 3.0" className="w-full" />
            {/* Soft fade edges */}
            <div className="absolute inset-0 pointer-events-none" style={{
              boxShadow: "inset 0 0 60px 30px hsl(220 50% 6%)",
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `
                linear-gradient(to bottom, hsl(220 50% 6% / 0.3) 0%, transparent 12%),
                linear-gradient(to top, hsl(220 50% 6% / 0.4) 0%, transparent 10%),
                linear-gradient(to right, hsl(220 50% 6% / 0.3) 0%, transparent 8%),
                linear-gradient(to left, hsl(220 50% 6% / 0.3) 0%, transparent 8%)
              `,
            }} />
          </div>
        </div>
      </section>

      {/* DOMAIN EXPLORER */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 800 }}>
          <h2 className="mb-6">Explore Each Domain</h2>
          <div className="flex flex-col gap-2">
            {domains.map((d, i) => (
              <div key={i}>
                <div className={`domain-card ${active === i ? "active" : ""}`} onClick={() => setActive(active === i ? null : i)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-[0.65rem] font-bold tracking-[0.12em] uppercase text-gold">{d.num}</div>
                      <div className="font-display text-base font-bold mt-1">{d.title}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 text-muted-foreground ${active === i ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                {active === i && (
                  <div className="p-5 rounded-b-lg" style={{ background: "hsl(222 47% 11% / 0.6)", borderLeft: "1px solid hsl(0 0% 100% / 0.08)", borderRight: "1px solid hsl(0 0% 100% / 0.08)", borderBottom: "1px solid hsl(0 0% 100% / 0.08)" }}>
                    {/* Top 3 Use Cases */}
                    <div className="mb-4">
                      <h5 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-gold mb-2">Top 3 Use Cases</h5>
                      <ul className="flex flex-col gap-1.5">
                        {d.useCases.map((uc, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#E2E8F0" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2" className="flex-shrink-0 mt-[3px]"><polyline points="20 6 9 17 4 12"/></svg>
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Top 3 Emerging Threats */}
                    <div className="mb-4">
                      <h5 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "hsl(22 79% 54%)" }}>Top 3 Emerging Threats</h5>
                      <ul className="flex flex-col gap-1.5">
                        {d.threats.map((t, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#E2E8F0" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(22 79% 54%)" strokeWidth="2" className="flex-shrink-0 mt-[3px]"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Member-Only Sections */}
                    <div className="pt-3 mt-3" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.08)" }}>
                      <div className="flex flex-wrap gap-2">
                        {["Top Vendors in the Space", "Key Leadership Questions", "Private CSL Research & Briefing"].map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-display font-semibold tracking-[0.06em] uppercase" style={{ background: "rgba(212,168,67,0.1)", color: "hsl(42 60% 55%)", border: "1px solid rgba(212,168,67,0.2)" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Peer Discussion CTA */}
                    <div className="mt-4 pt-3" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}>
                      <p className="text-xs mb-2" style={{ color: "#CBD5E1" }}>Go deeper with peer-driven discussion, private research, and executive briefings.</p>
                      <Link to="/membership" className="csl-btn csl-btn-outline csl-btn-sm">Join the Conversation</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container text-center">
          <h2>Ready to Use the Framework?</h2>
          <p className="text-sm mt-3 mx-auto max-w-[480px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Members get the full curriculum, monthly domain sessions, and board-ready briefing materials.
          </p>
          <Link to="/membership" className="csl-btn csl-btn-primary csl-btn-lg mt-6">Become a Member</Link>
        </div>
      </section>
    </CSLLayout>
  );
}
