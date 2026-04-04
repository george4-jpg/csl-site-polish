import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import CSL_LOGO from "@/assets/csl-logo-icon.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/membership", label: "Join" },
  { href: "/framework", label: "Framework" },
  { href: "/events", label: "Events" },
  { href: "/sponsor", label: "Sponsor" },
];

const servicesItems = [
  { href: "/ai-governance", label: "AI Governance" },
  { href: "/advisory", label: "Advisory Services" },
  { href: "/cohort", label: "Executive Cohorts" },
  { href: "/advisory#cyber-risk", label: "Cyber Risk Assessments" },
  { href: "/advisory#funding-strategy", label: "Funding Strategy" },
  { href: "/advisory#executive-briefings", label: "Executive Briefings" },
];

const mobileMenuLinks = [
  { href: "/", label: "Home", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>, icon2: <polyline points="9 22 9 12 15 12 15 22"/> },
  { href: "/states", label: "States", icon: <><path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M12 3v18"/><path d="M3 9l9 4 9-4"/></> },
  { href: "/membership", label: "Join", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></> },
  { href: "/framework", label: "Framework", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
  { href: "/events", label: "Events", icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
  { href: "/cohort", label: "Services", icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></> },
  { href: "/sponsor", label: "Sponsor", icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
];

export default function CSLHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const statesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleStatesEnter = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setStatesOpen(true);
  };
  const handleStatesLeave = () => {
    closeTimerRef.current = setTimeout(() => setStatesOpen(false), 250);
  };
  const handleServicesEnter = () => {
    if (servicesCloseRef.current) { clearTimeout(servicesCloseRef.current); servicesCloseRef.current = null; }
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesCloseRef.current = setTimeout(() => setServicesOpen(false), 250);
  };

  useEffect(() => {
    setStatesOpen(false);
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (statesRef.current && !statesRef.current.contains(e.target as Node)) setStatesOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 h-16 lg:px-8" style={{ background: "rgba(11,17,32,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <Link to="/" className="flex items-center gap-2">
          <img src={CSL_LOGO} alt="CSL" className="w-9 h-9 rounded-full" />
          <div>
            <div className="font-display text-[0.8rem] font-extrabold tracking-[0.02em]" style={{ color: "#F1F5F9" }}>
              Cyber<span className="text-gold">Security</span> Leadership
            </div>
             <div className="hidden lg:block font-body text-[0.55rem] tracking-[0.08em] uppercase" style={{ color: "#CBD5E1" }}>
               For C-Level, Boards, and Community Leaders
             </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => {
            if (i === 0) {
              return (
                <Link key={link.href} to={link.href} className={`font-display text-[0.7rem] font-semibold tracking-[0.08em] uppercase px-3 py-2 rounded-md transition-all ${isActive(link.href) ? "text-gold bg-white/5" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"}`}>
                  {link.label}
                </Link>
              );
            }
            return null;
          })}

          {/* States dropdown */}
          <div ref={statesRef} className="relative" onMouseEnter={handleStatesEnter} onMouseLeave={handleStatesLeave}>
            <button
              onClick={() => setStatesOpen(!statesOpen)}
              className={`font-display text-[0.7rem] font-semibold tracking-[0.08em] uppercase px-3 py-2 rounded-md transition-all inline-flex items-center gap-1.5 ${isActive("/states") ? "text-gold bg-white/5" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"}`}
              aria-expanded={statesOpen}
              aria-haspopup="true"
            >
              Explore all 50 states
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${statesOpen ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {statesOpen && (
              <div className="absolute top-full left-0 pt-0 min-w-[240px]">
                <div className="h-2" />
                <div className="rounded-xl p-2" style={{ background: "rgba(11,17,32,0.98)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 12px 36px rgba(0,0,0,0.35)" }}>
                  <Link to="/states" className="block px-3 py-2.5 font-display text-[0.72rem] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-white/5 transition-all" style={{ color: "#E2E8F0" }}>All 50 States</Link>
                  <Link to="/states#missouri" className="block px-3 py-2.5 font-display text-[0.72rem] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-white/5 transition-all" style={{ color: "#E2E8F0" }}>Missouri</Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1, 4).map((link) => (
            <Link key={link.href} to={link.href} className={`font-display text-[0.7rem] font-semibold tracking-[0.08em] uppercase px-3 py-2 rounded-md transition-all ${isActive(link.href) ? "text-gold bg-white/5" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"}`}>
              {link.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div ref={servicesRef} className="relative" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`font-display text-[0.7rem] font-semibold tracking-[0.08em] uppercase px-3 py-2 rounded-md transition-all inline-flex items-center gap-1.5 ${isActive("/cohort") ? "text-gold bg-white/5" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-0 min-w-[240px]">
                <div className="h-2" />
                <div className="rounded-xl p-2" style={{ background: "rgba(11,17,32,0.98)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 12px 36px rgba(0,0,0,0.35)" }}>
                  {servicesItems.map((item) => (
                    <Link key={item.label} to={item.href} className="block px-3 py-2.5 font-display text-[0.72rem] font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-white/5 transition-all" style={{ color: "#E2E8F0" }}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sponsor link */}
          <Link to="/sponsor" className={`font-display text-[0.7rem] font-semibold tracking-[0.08em] uppercase px-3 py-2 rounded-md transition-all ${isActive("/sponsor") ? "text-gold bg-white/5" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"}`}>
            Sponsor
          </Link>

          <Link to="/membership" className="csl-btn csl-btn-primary csl-btn-sm ml-3">Apply Now</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground" aria-label="Menu">
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99] flex flex-col px-6 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} style={{ background: "rgba(11,17,32,0.98)", backdropFilter: "blur(20px)", paddingTop: "calc(env(safe-area-inset-top, 0px) + 72px)" }}>
        {mobileMenuLinks.map((link) => (
          <Link
            key={link.href + link.label}
            to={link.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-4 px-4 py-3.5 font-display text-base font-semibold tracking-[0.06em] rounded-lg transition-all ${isActive(link.href) ? "text-gold bg-white/5" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{link.icon}{link.icon2}</svg>
            {link.label}
          </Link>
        ))}
        <Link to="/membership" onClick={() => setMobileOpen(false)} className="flex items-center justify-center mt-4 px-4 py-3.5 font-display font-semibold rounded-lg" style={{ background: "#C85A1E", color: "#fff" }}>
          Apply for Membership
        </Link>
      </div>
    </>
  );
}
