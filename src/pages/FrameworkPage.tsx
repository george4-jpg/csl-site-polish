import { useState } from "react";
import CSLLayout from "@/components/CSLLayout";

const FRAMEWORK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/CSLFramework3.0_0160c662.jpg";

const domains = [
  { num: "Domain 0 — The Foundation", title: "Cyber Asset Intelligence", detail: "You cannot protect what you cannot see. Domain 0 establishes the foundational discipline of comprehensive asset discovery, classification, and continuous inventory management." },
  { num: "Domain 1 — Stop BEC & Fraud", title: "Email Security", detail: "Business Email Compromise remains the #1 attack vector. Domain 1 covers advanced email authentication (DMARC, DKIM, SPF), AI-powered phishing detection, and executive impersonation defense." },
  { num: "Domain 2 — Control Trust", title: "Identity & Access", detail: "Identity is the new perimeter. Domain 2 addresses Zero Trust architecture, privileged access management, multi-factor authentication, and identity governance." },
  { num: "Domain 3 — Protect All Devices", title: "Endpoint & Cyber-Physical", detail: "From laptops to IoT sensors to OT systems — every connected device is an attack surface. Domain 3 covers EDR, mobile device management, and IT/OT convergence." },
  { num: "Domain 4 — Primary Enforcement", title: "Network & Edge", detail: "Domain 4 covers network segmentation, SASE/SSE architectures, DNS security, intrusion detection/prevention, and distributed edge enforcement." },
  { num: "Domain 5 — Hybrid Protection", title: "Cloud Security", detail: "Multi-cloud and hybrid environments demand a new security operating model. Domain 5 addresses CSPM, workload protection, container security, and shared responsibility." },
  { num: "Domain 6 — Secure Apps & APIs", title: "Application Security", detail: "Domain 6 covers secure development lifecycle (SDLC), API security, web application firewalls, and the shift-left movement." },
  { num: "Domain 7 — Protect Sensitive Data", title: "Data Security", detail: "Data is the ultimate target. Domain 7 addresses data classification, encryption, DLP, privacy engineering, and the regulatory landscape." },
  { num: "Domain 8 — Prove & Manage Risk", title: "Governance, Risk & Compliance", detail: "GRC is where cybersecurity meets the boardroom. Domain 8 covers risk quantification, compliance frameworks, third-party risk management, and cyber insurance." },
  { num: "Domain 9 — Reduce Behavioral Risk", title: "Human + Machine Factor", detail: "People remain the most exploited attack vector. Domain 9 addresses security awareness, social engineering defense, insider threats, and deepfake defense." },
  { num: "Domain 10 — Detect & Respond", title: "Security Operations", detail: "When prevention fails, detection speed determines impact. Domain 10 covers SOC design, SIEM/SOAR, threat intelligence, incident response, and AI-augmented detection." },
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
            The CSL Framework is the curriculum backbone — adopted by executives, validated for education partners, and shared with government agencies through CSL's intelligence network.
          </p>
          <p className="text-xs mt-2 text-muted-foreground">Questions? <a href="mailto:director@cybersecurity-leadership.org" className="text-gold">director@cybersecurity-leadership.org</a></p>
        </div>
      </section>

      {/* FRAMEWORK IMAGE */}
      <section className="pb-8">
        <div className="csl-container">
          <div className="rounded-xl overflow-hidden">
            <img src={FRAMEWORK_IMG} alt="CSL Cyber Framework 3.0" className="w-full" />
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
                  <div className="font-display text-[0.65rem] font-bold tracking-[0.12em] uppercase text-gold">{d.num}</div>
                  <div className="font-display text-base font-bold mt-1">{d.title}</div>
                </div>
                {active === i && (
                  <div className="p-4 text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>{d.detail}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="csl-section csl-section-dark">
        <div className="csl-container text-center">
          <h2>Ready to Lead with the Framework?</h2>
          <p className="text-sm mt-3 mx-auto max-w-[480px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Join CSL to access the full Framework curriculum, monthly domain deep-dives, and board-ready intelligence briefings.
          </p>
          <a href="/membership" className="csl-btn csl-btn-primary csl-btn-lg mt-6">Become a Member</a>
        </div>
      </section>
    </CSLLayout>
  );
}
