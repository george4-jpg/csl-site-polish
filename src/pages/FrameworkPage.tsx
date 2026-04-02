import { useState } from "react";
import CSLLayout from "@/components/CSLLayout";

const FRAMEWORK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663445938128/WArMWJGwZpJxGyekH27H5v/CSLFramework3.0_0160c662.jpg";

const domains = [
  { num: "Domain 0: The Foundation", title: "Cyber Asset Intelligence", detail: "You can't protect what you can't see. Asset discovery, classification, and continuous inventory." },
  { num: "Domain 1: Stop BEC & Fraud", title: "Email Security", detail: "BEC is still the #1 attack vector. Email authentication (DMARC, DKIM, SPF), phishing detection, and impersonation defense." },
  { num: "Domain 2: Control Trust", title: "Identity & Access", detail: "Identity is the new perimeter. Zero Trust, privileged access management, MFA, and identity governance." },
  { num: "Domain 3: Protect All Devices", title: "Endpoint & Cyber-Physical", detail: "Laptops, IoT, OT. Every connected device is an attack surface. EDR, mobile management, IT/OT convergence." },
  { num: "Domain 4: Primary Enforcement", title: "Network & Edge", detail: "Network segmentation, SASE/SSE, DNS security, IDS/IPS, and edge enforcement." },
  { num: "Domain 5: Hybrid Protection", title: "Cloud Security", detail: "Multi-cloud and hybrid environments need a different model. CSPM, workload protection, container security." },
  { num: "Domain 6: Secure Apps & APIs", title: "Application Security", detail: "Secure SDLC, API security, WAFs, and shift-left practices." },
  { num: "Domain 7: Protect Sensitive Data", title: "Data Security", detail: "Data is the target. Classification, encryption, DLP, privacy engineering, and regulatory compliance." },
  { num: "Domain 8: Prove & Manage Risk", title: "Governance, Risk & Compliance", detail: "Where cyber meets the boardroom. Risk quantification, compliance frameworks, third-party risk, cyber insurance." },
  { num: "Domain 9: Reduce Behavioral Risk", title: "Human + Machine Factor", detail: "People are still the most exploited vector. Security awareness, social engineering defense, insider threats, deepfakes." },
  { num: "Domain 10: Detect & Respond", title: "Security Operations", detail: "When prevention fails, speed wins. SOC design, SIEM/SOAR, threat intel, incident response, AI-assisted detection." },
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
          <h2>Ready to Use the Framework?</h2>
          <p className="text-sm mt-3 mx-auto max-w-[480px] leading-relaxed" style={{ color: "#E2E8F0" }}>
            Members get the full curriculum, monthly domain sessions, and board-ready briefing materials.
          </p>
          <a href="/membership" className="csl-btn csl-btn-primary csl-btn-lg mt-6">Become a Member</a>
        </div>
      </section>
    </CSLLayout>
  );
}
