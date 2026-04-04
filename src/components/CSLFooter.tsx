import { Link } from "react-router-dom";

import CSL_LOGO from "@/assets/csl-logo-icon.png";
import CSL_LOGO_FULL from "@/assets/csl-logo-full.png";

export default function CSLFooter() {
  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden lg:block border-t border-white/[0.06]" style={{ background: "#141C2E", padding: "3rem 0" }}>
        <div className="csl-container">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={CSL_LOGO_FULL} alt="CSL - Cybersecurity Leadership" className="h-20 w-auto" />
              </div>
               <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
                 The national leadership platform for cybersecurity. Built for C-Level, boards, and community leaders.
               </p>
            </div>
            <div>
              <h4 className="font-display text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gold mb-4">Platform</h4>
              <Link to="/framework" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>CSL Framework</Link>
              <Link to="/events" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>Executive Dinners</Link>
              <Link to="/cohort" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>AI Governance Cohort</Link>
              <Link to="/states" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>States & Hosts</Link>
              <Link to="/george4" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#C49B2F" }}>Meet the Founder</Link>
            </div>
            <div>
              <h4 className="font-display text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gold mb-4">Community</h4>
              <Link to="/membership" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>Become a Member</Link>
              <Link to="/sponsor" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>Strategic Partners</Link>
              <span className="block text-sm py-1" style={{ color: "#E2E8F0" }}>Cyber Warrior Program</span>
              <span className="block text-sm py-1" style={{ color: "#E2E8F0" }}>K-12 Advisory</span>
            </div>
            <div>
              <h4 className="font-display text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gold mb-4">Contact</h4>
              <a href="mailto:membership@cybersecurity-leadership.org" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>membership@cybersecurity-leadership.org</a>
              <a href="mailto:info@cybersecurity-leadership.org" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>info@cybersecurity-leadership.org</a>
              <a href="https://cybersecurity-leadership.org" className="block text-sm py-1 hover:text-white transition-colors" style={{ color: "#E2E8F0" }}>cybersecurity-leadership.org</a>
              <span className="block text-xs mt-2" style={{ color: "#CBD5E1" }}>CSL Nonprofit in Formation</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center text-xs" style={{ color: "#CBD5E1" }}>
            &copy; 2026 Cybersecurity Leadership. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around" style={{ background: "rgba(11,17,32,0.98)", borderTop: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
        <TabLink href="/" icon={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} label="Home" />
        <TabLink href="/states" icon={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>} label="States" />
        <TabLink href="/membership" icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>} label="Join" />
        <TabLink href="/events" icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} label="Events" />
      </div>
    </>
  );
}

function TabLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={href} className="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[60px]" style={{ color: "#CBD5E1" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
      <span className="font-display text-[0.55rem] font-semibold tracking-[0.06em]">{label}</span>
    </Link>
  );
}
