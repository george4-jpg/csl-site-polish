import { useState, useEffect, FormEvent } from "react";
import { Lock, ShieldCheck, Clock, User, Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import CSL_LOGO from "@/assets/csl-logo-icon.png";

const ROLES = [
  "CTO / Director of Technology",
  "CISO / Security Director",
  "Superintendent / Administrator",
  "State / Government Leader",
  "Higher Education",
  "Critical Infrastructure",
  "Partner / Sponsor",
  "Other",
];

const BENEFITS = [
  "The Leadership Brief — full access, every issue",
  "Executive Dinners in active cities",
  "All webinars, lunches & roundtables",
  "Priority AI Governance Cohort enrollment",
  "CSL Funding Navigator — SLCGP & Title IV-A",
  "Complimentary wealth strategy consultation",
  "20% discount on all advisory services",
  "Founding Member recognition nationally",
];

const NEXT_STEPS = [
  {
    title: "CHECK YOUR INBOX",
    desc: "Your welcome email is on its way with your Founding Member confirmation, your first issue of The Leadership Brief, and your city chapter details.",
    eta: "WITHIN 5 MINUTES",
  },
  {
    title: "PERSONAL FOLLOW-UP FROM GEORGE",
    desc: "George Cater IV will reach out personally to introduce himself, confirm your city, and walk you through everything available to you as a Founding Member.",
    eta: "WITHIN 24 HOURS",
  },
  {
    title: "YOUR FIRST EVENT INVITATION",
    desc: "You'll receive your invitation to the next CSL Executive Dinner or Roundtable in your city — or the nearest active city. Members get priority access before public registration opens.",
    eta: "THIS WEEK",
  },
  {
    title: "MEMBER PORTAL ACCESS",
    desc: "We're finalizing the private member portal. You'll receive your access credentials as soon as it's live — it will include the full CSL Cyber Framework™ 3.0, the Funding Navigator, and your peer directory.",
    eta: "COMING SOON",
  },
];

const LINKEDIN_SHARE_URL =
  "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcybersecurity-leadership.org&summary=I%20joined%20CSL%20as%20a%20Founding%20Member%20%E2%80%94%20the%20first%20peer%20network%20built%20around%20a%20Leadership%20Operating%20System%20for%20Cybersecurity%20Leaders.%20If%20you%27re%20a%20CTO%2C%20CISO%2C%20or%20security%20leader%20in%20K-12%2C%20government%2C%20or%20critical%20infrastructure%20%E2%80%94%20this%20is%20worth%20your%20attention.%20Interesting%2C%20right%3F%20Come%20check%20it%20out%3A%20https%3A%2F%2Fcybersecurity-leadership.org";

const SHARE_TEXT =
  "I joined CSL as a Founding Member — the first peer network built around a Leadership Operating System for Cybersecurity Leaders. If you're a CTO, CISO, or security leader in K-12, government, or critical infrastructure — this is worth your attention. Interesting, right? Come check it out: https://cybersecurity-leadership.org";

const STEP_LABELS = ["YOUR INFO", "MEMBERSHIP", "PAYMENT"];

/* ─── tiny SVGs ─── */
const CheckSVG = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const LinkedInSVG = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const StripeSVG = () => (
  <svg width="48" height="20" viewBox="0 0 60 25" fill="#6772E5">
    <path d="M5 10.2c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V6.7c-1.4-.6-2.9-.8-4.3-.8C3.2 5.9.8 7.8.8 10.4c0 4.1 5.6 3.4 5.6 5.2 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.4v3.6c1.7.7 3.3 1 4.9 1 3.4 0 5.7-1.7 5.7-4.4 0-4.4-5.6-3.6-5.6-5.3zM14.7 3.3l-4.1.9v3.5l4.1-.9V3.3zm0 4.2h-4.1V19h4.1V7.5zm5.7 1.3l-.3-1.3h-3.8V19h4.1v-7.8c1-1.3 2.6-1 3.1-.8V7.5c-.5-.2-2.5-.6-3.5 1.3h.4zm8.3-1.3l-.2 1.2c-.8-1-2-1.4-3.3-1.4-3.1 0-5.8 3.1-5.8 6.9 0 3.8 2.7 5.9 5.8 5.9 1.3 0 2.5-.5 3.3-1.4l.2 1.2h3.7V7.5h-3.7zm0 8.4c-.6.8-1.5 1.3-2.5 1.3-1.4 0-2.4-1.1-2.4-3s1-3 2.4-3c1 0 1.9.5 2.5 1.3v3.4zm9.5-9.7c-1.9 0-3.2.9-3.9 1.5l-.2-1.2h-3.7V23l4.1-.9v-3.8c.7.5 1.8 1.2 3.5 1.2 3.5 0 5.9-2.8 5.9-7 .1-4.4-2.4-6.8-5.7-6.8zm-1 9.8c-1 0-1.6-.4-2-1V12c.4-.5 1.1-1 2-1 1.5 0 2.6 1.2 2.6 2.9 0 1.8-1 3.1-2.6 3.1zm15.3.9c-3.5 0-5.7-2.7-5.7-6.3 0-3.7 2.4-6.3 5.9-6.3 3.4 0 5.6 2.6 5.6 6.3 0 3.7-2.2 6.3-5.8 6.3zm0-3.5c1.3 0 1.7-1.2 1.7-2.8 0-1.6-.4-2.8-1.7-2.8-1.3 0-1.8 1.2-1.8 2.8 0 1.6.5 2.8 1.8 2.8z" />
  </svg>
);

/* ─── Component ─── */
export default function EnrollPage() {
  const [step, setStep] = useState(1);
  const [animClass, setAnimClass] = useState("enroll-fade-in");
  const [copied, setCopied] = useState(false);

  /* form fields */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const goStep = (n: number) => {
    setAnimClass("enroll-fade-out");
    setTimeout(() => {
      setStep(n);
      setAnimClass("enroll-fade-in");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  };

  const validateStep1 = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!firstName.trim()) errs.firstName = true;
    if (!lastName.trim()) errs.lastName = true;
    if (!email.trim()) errs.email = true;
    if (!org.trim()) errs.org = true;
    if (!role) errs.role = true;
    if (!city.trim()) errs.city = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) goStep(2);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setCopied(true);
      toast("Text copied to clipboard");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy text");
    }
  };

  /* font class helpers */
  const fc = "font-[Barlow_Condensed]";
  const fd = "font-[DM_Serif_Display]";
  const fb = "font-[Barlow]";

  const inputCls =
    `w-full px-3.5 py-3 rounded-[3px] text-[0.9rem] ${fb} text-white placeholder:text-[#9ba8bb] outline-none enroll-input`;
  const inputStyle = (field: string) => ({
    background: "#131f33",
    border: `1px solid ${errors[field] ? "rgba(200,90,30,0.8)" : "rgba(255,255,255,0.15)"}`,
  });

  const labelCls = `block mb-1.5 text-[0.65rem] ${fc} font-bold tracking-[0.18em] uppercase text-[#e06820]`;

  return (
    <div className="min-h-screen" style={{ background: "#0d1321" }}>
      {/* Ambient radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(200,90,30,.09) 0%, transparent 55%), radial-gradient(ellipse 50% 70% at 15% 75%, rgba(26,51,88,.5) 0%, transparent 50%)",
      }} />
      {/* Grid texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 lg:px-8" style={{
        background: "rgba(11,17,32,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <a href="https://cybersecurity-leadership.org" className="flex items-center gap-2 no-underline">
          <img src={CSL_LOGO} alt="CSL" className="w-9 h-9 rounded-full" onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }} />
          <div className="w-9 h-9 rounded-full items-center justify-center shrink-0 hidden" style={{
            background: "#c85a1e",
            border: "2px solid rgba(255,255,255,0.15)",
            display: "none",
          }}>
            <span className={`${fc} font-extrabold text-white text-[0.85rem] tracking-[0.06em]`}>CSL</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[0.8rem] font-extrabold tracking-[0.02em] text-[#F1F5F9]">
              Cyber<span className="text-[#d4a843]">Security</span> Leadership
            </span>
            <span className="hidden sm:block font-display text-[0.55rem] tracking-[0.08em] uppercase text-[#CBD5E1]">
              For C-Level, Boards, and Community Leaders
            </span>
          </div>
        </a>
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{
            background: "#2d9e6b",
            boxShadow: "0 0 0 3px rgba(45,158,107,0.2)",
          }} />
          <span className={`${fc} font-bold text-[0.65rem] tracking-[0.14em] text-[#9ba8bb]`}>SECURE CHECKOUT</span>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="relative pt-16 z-[1]">
        <div className="max-w-[640px] mx-auto px-6 py-12 sm:py-14">
          {/* ── STEPPER ── */}
          <div className="flex items-center justify-center mb-10 gap-0">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300" style={{
                      background: done ? "#e06820" : active ? "rgba(224,104,32,0.15)" : "transparent",
                      border: `1px solid ${done ? "#e06820" : active ? "#e06820" : "rgba(255,255,255,0.2)"}`,
                      boxShadow: done
                        ? "0 0 12px rgba(224,104,32,0.25)"
                        : active
                        ? "0 0 0 4px rgba(224,104,32,0.12)"
                        : "none",
                    }}>
                      {done ? <CheckSVG size={16} color="white" /> : (
                        <span className={`${fc} font-bold text-[0.82rem]`} style={{ color: active ? "white" : "#9ba8bb" }}>{n}</span>
                      )}
                    </div>
                    <span className={`${fc} font-bold tracking-[0.18em] text-center`} style={{
                      color: active ? "#e06820" : done ? "#e8e4de" : "#9ba8bb",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.62rem)",
                      letterSpacing: active ? "0.18em" : "0.14em",
                    }}>{label}</span>
                  </div>
                  {i < 2 && (
                    <div className="w-8 sm:w-[60px] h-px mx-1 sm:mx-2 mt-[-18px] enroll-connector" style={{
                      background: step > n ? "#c85a1e" : "rgba(255,255,255,0.10)",
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── STEP PANELS ── */}
          <div className={animClass}>
            {step === 1 && <Step1
              fc={fc} fd={fd} fb={fb}
              inputCls={inputCls} inputStyle={inputStyle} labelCls={labelCls}
              firstName={firstName} setFirstName={setFirstName}
              lastName={lastName} setLastName={setLastName}
              email={email} setEmail={setEmail}
              org={org} setOrg={setOrg}
              role={role} setRole={setRole}
              city={city} setCity={setCity}
              errors={errors} setErrors={setErrors}
              onSubmit={validateStep1}
            />}
            {step === 2 && <Step2 fc={fc} fd={fd} fb={fb} goStep={goStep} />}
            {step === 3 && <Step3 fc={fc} fd={fd} fb={fb} goStep={goStep} />}
            {step === 4 && <Step4 fc={fc} fd={fd} fb={fb} copied={copied} onCopy={handleCopy} />}
          </div>

          {/* ── TRUST BAR ── */}
          <div className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { icon: <Lock size={12} />, text: "SSL ENCRYPTED" },
              { icon: <Check size={12} />, text: "501(c)(3) APPLICATION PENDING IRS APPROVAL" },
              { icon: <Clock size={12} />, text: "CANCEL ANY TIME" },
              { icon: <User size={12} />, text: "PRACTITIONERS ONLY · NO VENDOR AGENDA" },
            ].map((t) => (
              <div key={t.text} className={`flex items-center gap-1.5 ${fc} font-bold text-[0.60rem] tracking-[0.14em] uppercase text-[#9ba8bb] opacity-60`}>
                {t.icon}<span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        .enroll-fade-in { animation: enrollIn 0.45s cubic-bezier(0.22,0.68,0,1.2) forwards; }
        .enroll-fade-out { animation: enrollOut 0.2s ease forwards; }
        @keyframes enrollIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes enrollOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-8px); } }
        @keyframes pulse-check { 0%,100% { box-shadow: 0 0 0 8px rgba(200,90,30,0.06), 0 0 0 16px rgba(200,90,30,0.03); } 50% { box-shadow: 0 0 0 10px rgba(200,90,30,0.10), 0 0 0 20px rgba(200,90,30,0.05); } }
        .enroll-connector { transition: background 0.4s ease; }
        .enroll-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .enroll-input:focus {
          border-color: rgba(255,255,255,0.35) !important;
          box-shadow: none;
          background: #131f33 !important;
        }
        .enroll-cta {
          transition: all 0.2s ease;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(200,90,30,0.35);
        }
        .enroll-cta:hover {
          background: #e06820 !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 6px 32px rgba(200,90,30,0.5);
          transform: translateY(-2px);
        }
        .enroll-stagger-1 { animation: staggerIn 0.6s ease both; animation-delay: 0.1s; }
        .enroll-stagger-2 { animation: staggerIn 0.6s ease both; animation-delay: 0.25s; }
        .enroll-stagger-3 { animation: staggerIn 0.6s ease both; animation-delay: 0.4s; }
        .enroll-stagger-4 { animation: staggerIn 0.6s ease both; animation-delay: 0.55s; }
        .enroll-stagger-5 { animation: staggerIn 0.6s ease both; animation-delay: 0.7s; }
        @keyframes staggerIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 1                                                        */
/* ══════════════════════════════════════════════════════════════ */
interface Step1Props {
  fc: string; fd: string; fb: string;
  inputCls: string; inputStyle: (f: string) => React.CSSProperties; labelCls: string;
  firstName: string; setFirstName: (v: string) => void;
  lastName: string; setLastName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  org: string; setOrg: (v: string) => void;
  role: string; setRole: (v: string) => void;
  city: string; setCity: (v: string) => void;
  errors: Record<string, boolean>; setErrors: (v: Record<string, boolean>) => void;
  onSubmit: (e: FormEvent) => void;
}

function Step1({ fc, fd, fb, inputCls, inputStyle, labelCls, firstName, setFirstName, lastName, setLastName, email, setEmail, org, setOrg, role, setRole, city, setCity, errors, setErrors, onSubmit }: Step1Props) {
  const errMsg = <p className={`mt-1 text-[0.72rem] ${fb} text-[#9ba8bb]`}>This field is required.</p>;
  return (
    <div>
      <p className={`${fc} font-bold text-[0.65rem] tracking-[0.22em] uppercase text-[#e06820] mb-2 enroll-stagger-1`}>STEP 1 OF 3 · FOUNDING MEMBER</p>
      <h1 className={`${fd} text-[clamp(1.8rem,5vw,2.6rem)] text-[#f8f6f2] mb-3 enroll-stagger-2`}>
        Tell us a little about <em className="text-[#d4a843]">yourself.</em>
      </h1>
      <p className={`${fb} text-[0.9rem] font-light text-[#9ba8bb] mb-8 leading-relaxed enroll-stagger-3`}>
        You're joining a curated network of cybersecurity leaders. We need a few details to personalize your experience and connect you to the right city chapter.
      </p>
      <form onSubmit={onSubmit} noValidate>
        <div className="enroll-stagger-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>First Name</label>
              <input className={inputCls} style={inputStyle("firstName")} value={firstName} onChange={e => { setFirstName(e.target.value); if (errors.firstName) { const { firstName: _, ...rest } = errors; setErrors(rest as any); } }} placeholder="First name" />
              {errors.firstName && errMsg}
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input className={inputCls} style={inputStyle("lastName")} value={lastName} onChange={e => { setLastName(e.target.value); if (errors.lastName) { const { lastName: _, ...rest } = errors; setErrors(rest as any); } }} placeholder="Last name" />
              {errors.lastName && errMsg}
            </div>
          </div>
          <div className="mb-4">
            <label className={labelCls}>Work Email</label>
            <input type="email" className={inputCls} style={inputStyle("email")} value={email} onChange={e => { setEmail(e.target.value); if (errors.email) { const { email: _, ...rest } = errors; setErrors(rest as any); } }} placeholder="you@organization.gov" />
            {errors.email && errMsg}
          </div>
          <div className="mb-4">
            <label className={labelCls}>Organization</label>
            <input className={inputCls} style={inputStyle("org")} value={org} onChange={e => { setOrg(e.target.value); if (errors.org) { const { org: _, ...rest } = errors; setErrors(rest as any); } }} placeholder="School district, agency, or company" />
            {errors.org && errMsg}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className={labelCls}>Your Role</label>
              <select className={`${inputCls} appearance-none`} style={{ ...inputStyle("role"), background: "rgba(255,255,255,0.05)" }} value={role} onChange={e => { setRole(e.target.value); if (errors.role) { const { role: _, ...rest } = errors; setErrors(rest as any); } }}>
                <option value="" style={{ background: "#131f33" }}>Select your role</option>
                {ROLES.map(r => <option key={r} value={r} style={{ background: "#131f33" }}>{r}</option>)}
              </select>
              {errors.role && errMsg}
            </div>
            <div>
              <label className={labelCls}>City, State</label>
              <input className={inputCls} style={inputStyle("city")} value={city} onChange={e => { setCity(e.target.value); if (errors.city) { const { city: _, ...rest } = errors; setErrors(rest as any); } }} placeholder="Kansas City, MO" />
              {errors.city && errMsg}
            </div>
          </div>
        </div>
        <button type="submit" className={`w-full h-[54px] rounded-[3px] ${fc} font-bold text-[0.9rem] tracking-[0.14em] uppercase text-white flex items-center justify-center gap-2 enroll-cta enroll-stagger-5`} style={{ background: "#c85a1e" }}>
          CONTINUE TO MEMBERSHIP <ArrowRight />
        </button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 2                                                        */
/* ══════════════════════════════════════════════════════════════ */
function Step2({ fc, fd, fb, goStep }: { fc: string; fd: string; fb: string; goStep: (n: number) => void }) {
  return (
    <div>
      <p className={`${fc} font-bold text-[0.65rem] tracking-[0.22em] uppercase text-[#e06820] mb-2 enroll-stagger-1`}>STEP 2 OF 3 · FOUNDING MEMBER</p>
      <h1 className={`${fd} text-[clamp(1.8rem,5vw,2.6rem)] text-[#f8f6f2] mb-3 enroll-stagger-2`}>
        Your seat at the <em className="text-[#d4a843]">founding table.</em>
      </h1>
      <p className={`${fb} text-[0.9rem] font-light text-[#9ba8bb] mb-8 leading-relaxed enroll-stagger-3`}>
        100 founding seats. Once filled, this rate closes permanently. You're joining the leaders who set the standard for every city CSL opens.
      </p>

      {/* Tier card */}
      <div className="rounded-md overflow-hidden mb-6 enroll-stagger-4" style={{ background: "#0f1a2e", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6 }}>
        {/* Orange header strip */}
        <div className="px-6 sm:px-7 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: "#c85a1e", borderBottom: "none", maxHeight: "80px" }}>
          <div className="flex items-center gap-3">
            <span className={`inline-block ${fc} font-bold text-[0.60rem] tracking-[0.20em] uppercase px-3 py-1 rounded-full`} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
              Founding Member · Limited Seats
            </span>
          </div>
          <div className="flex items-baseline gap-2 sm:text-right">
            <p className={`${fd} text-[2rem] text-white leading-none`}>$297</p>
            <p className={`${fb} text-[0.72rem] text-[#9ba8bb]`}>/ year · locked for life</p>
          </div>
        </div>
        {/* Title + urgency */}
        <div className="px-6 sm:px-7 pt-5 pb-1 flex items-center justify-between">
          <p className={`${fc} font-extrabold text-[1.2rem] text-white tracking-[0.04em]`}>CSL FOUNDING MEMBERSHIP</p>
          <p className={`${fc} font-bold text-[0.60rem] tracking-[0.08em] text-[#d4a843]`}>⚡ Seats filling</p>
        </div>
        {/* Benefits */}
        <div className="px-6 sm:px-7 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(200,90,30,0.15)", border: "1px solid rgba(200,90,30,0.4)" }}>
                  <CheckSVG size={9} color="#c85a1e" />
                </div>
                <span className={`${fb} text-[0.82rem] text-[#e8e4de] leading-snug`}>{b}</span>
              </div>
            ))}
          </div>
          {/* Guarantee */}
          <div className="mt-5 pt-4 flex items-start gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(45,158,107,0.10)", border: "1px solid rgba(45,158,107,0.30)" }}>
              <Lock size={13} color="#2d9e6b" />
            </div>
            <p className={`${fb} text-[0.78rem] text-[#9ba8bb] italic leading-relaxed`}>
              Annual subscription. Secured through Stripe. Cancel any time. Your founding rate is locked permanently once enrolled.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 enroll-stagger-5">
        <button onClick={() => goStep(1)} className={`px-5 py-3 rounded-[3px] ${fc} font-bold text-[0.85rem] tracking-[0.10em] uppercase text-[#9ba8bb] transition-colors hover:text-white`} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.10)" }}>
          ← BACK
        </button>
        <button onClick={() => goStep(3)} className={`flex-1 h-[54px] rounded-[3px] ${fc} font-bold text-[0.85rem] tracking-[0.14em] uppercase text-white flex items-center justify-center gap-2 enroll-cta`} style={{ background: "#c85a1e" }}>
          CONFIRM MEMBERSHIP — PROCEED TO PAYMENT <ArrowRight />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 3                                                        */
/* ══════════════════════════════════════════════════════════════ */
function Step3({ fc, fd, fb, goStep }: { fc: string; fd: string; fb: string; goStep: (n: number) => void }) {
  const rows = [
    { label: "Membership Tier", value: "CSL Founding Member", style: {} },
    { label: "Billing", value: "Annual — renews April 2027", style: {} },
    { label: "Rate Guarantee", value: "✓ Locked for life", style: { color: "#2d9e6b" } },
  ];
  return (
    <div>
      <p className={`${fc} font-bold text-[0.65rem] tracking-[0.22em] uppercase text-[#e06820] mb-2 enroll-stagger-1`}>STEP 3 OF 3 · SECURE CHECKOUT</p>
      <h1 className={`${fd} text-[clamp(1.8rem,5vw,2.6rem)] text-[#f8f6f2] mb-3 enroll-stagger-2`}>
        Review & complete your <em className="text-[#d4a843]">enrollment.</em>
      </h1>
      <p className={`${fb} text-[0.9rem] font-light text-[#9ba8bb] mb-8 leading-relaxed enroll-stagger-3`}>
        You'll be redirected to Stripe's secure checkout to complete payment. Your founding rate is guaranteed the moment you complete enrollment.
      </p>

      {/* Order Summary */}
      <div className="rounded-md p-6 sm:p-7 mb-4 enroll-stagger-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 6 }}>
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
            <span className={`${fb} text-[0.85rem] text-[#9ba8bb]`}>{r.label}</span>
            <span className={`${fb} text-[0.85rem] text-[#e8e4de]`} style={r.style}>{r.value}</span>
          </div>
        ))}
        {/* Total */}
        <div className="flex items-center justify-between pt-3">
          <span className={`${fc} font-bold text-[1rem] tracking-[0.06em] uppercase text-white`}>Total Today</span>
          <span className={`${fd} text-[1.6rem] text-[#e06820]`}>$297.00</span>
        </div>
      </div>

      {/* Stripe badge */}
      <div className="flex items-center gap-3 rounded p-3 mb-4 enroll-stagger-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.10)" }}>
        <StripeSVG />
        <p className={`${fb} text-[0.78rem] text-[#9ba8bb]`}>
          <strong className="text-[#e8e4de]">Secured by Stripe.</strong> Your card data never touches CSL servers. 256-bit SSL encryption.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3 enroll-stagger-5">
        <button onClick={() => goStep(2)} className={`px-5 py-3 rounded-[3px] ${fc} font-bold text-[0.85rem] tracking-[0.10em] uppercase text-[#9ba8bb] transition-colors hover:text-white`} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.10)" }}>
          ← BACK
        </button>
        <a href="STRIPE_CHECKOUT_URL_PLACEHOLDER" className={`flex-1 h-[54px] rounded-[3px] ${fc} font-bold text-[0.85rem] tracking-[0.14em] uppercase text-white flex items-center justify-center gap-2 enroll-cta no-underline`} style={{ background: "#c85a1e" }}>
          COMPLETE ENROLLMENT — $297 🔒
        </a>
      </div>
      <p className={`text-center ${fb} text-[0.72rem] text-[#9ba8bb] opacity-60`}>
        You will be redirected to Stripe's secure checkout page to complete payment.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* STEP 4                                                        */
/* ══════════════════════════════════════════════════════════════ */
function Step4({ fc, fd, fb, copied, onCopy }: { fc: string; fd: string; fb: string; copied: boolean; onCopy: () => void }) {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-6" style={{
          background: "linear-gradient(135deg, rgba(200,90,30,0.25) 0%, rgba(200,90,30,0.08) 100%)",
          border: "2px solid rgba(200,90,30,0.4)",
          animation: "pulse-check 2.5s ease infinite",
        }}>
          <CheckSVG size={32} color="white" />
        </div>
        <h1 className={`${fd} text-[clamp(1.8rem,5vw,2.8rem)] text-[#f8f6f2]`}>
          Welcome to <em className="text-[#d4a843]">CSL.</em>
        </h1>
        <p className={`${fb} text-[0.95rem] font-light text-[#9ba8bb] mt-4 max-w-[460px] mx-auto leading-relaxed`}>
          Your membership is confirmed. You're now part of the first peer network built around a Leadership Operating System for cybersecurity leaders. The room is yours.
        </p>
      </div>

      {/* What Happens Next */}
      <div className="rounded-md overflow-hidden mb-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 6 }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)", background: "rgba(200,90,30,0.06)" }}>
          <span className={`${fc} font-bold text-[0.78rem] tracking-[0.18em] text-[#e06820]`}>WHAT HAPPENS NEXT</span>
        </div>
        {NEXT_STEPS.map((s, i) => (
          <div key={i} className="flex gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(200,90,30,0.12)", border: "1px solid rgba(200,90,30,0.30)" }}>
              <span className={`${fc} font-extrabold text-[0.72rem] text-[#e06820]`}>{i + 1}</span>
            </div>
            <div>
              <p className={`${fc} font-bold text-[0.9rem] tracking-[0.04em] uppercase text-white`}>{s.title}</p>
              <p className={`${fb} text-[0.82rem] text-[#9ba8bb] leading-relaxed mt-1`}>{s.desc}</p>
              <span className={`inline-block mt-2 ${fc} font-bold text-[0.60rem] tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm`} style={{
                color: "#d4a843",
                background: "rgba(212,168,67,0.08)",
                border: "1px solid rgba(212,168,67,0.20)",
              }}>{s.eta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LinkedIn Share */}
      <div className="rounded-md overflow-hidden mb-8" style={{ background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.25)", borderRadius: 6 }}>
        <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(10,102,194,0.20)", background: "rgba(10,102,194,0.08)" }}>
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "#0a66c2" }}>
            <LinkedInSVG size={14} />
          </div>
          <div>
            <p className={`${fc} font-bold text-[0.80rem] tracking-[0.10em] text-white`}>SHARE ON LINKEDIN</p>
            <p className={`${fb} text-[0.72rem] text-[#9ba8bb]`}>Let your network know you're a Founding Member</p>
          </div>
        </div>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(10,102,194,0.15)" }}>
          <p className={`${fb} text-[0.85rem] text-[#e8e4de] italic leading-relaxed`}>
            "I joined CSL as a Founding Member — the first peer network built around a <strong className="text-[#d4a843]">Leadership Operating System for Cybersecurity Leaders.</strong> If you're a CTO, CISO, or security leader in K-12, government, or critical infrastructure — this is worth your attention. Interesting, right? Come check it out: <strong className="text-[#d4a843]">cybersecurity-leadership.org</strong>"
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 px-5 py-3.5">
          <a
            href={LINKEDIN_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] ${fc} font-bold text-[0.82rem] tracking-[0.06em] uppercase text-white transition-opacity hover:opacity-90`}
            style={{ background: "#0a66c2" }}
          >
            <LinkedInSVG size={13} /> SHARE ON LINKEDIN
          </a>
          <button
            onClick={onCopy}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] ${fc} font-bold text-[0.82rem] tracking-[0.06em] uppercase transition-colors`}
            style={{
              background: copied ? "rgba(45,158,107,0.15)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${copied ? "rgba(45,158,107,0.4)" : "rgba(255,255,255,0.10)"}`,
              color: copied ? "#2d9e6b" : "#9ba8bb",
            }}
          >
            {copied ? <><Check size={13} /> ✓ COPIED!</> : <><Copy size={13} /> COPY TEXT</>}
          </button>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://cybersecurity-leadership.org/events"
          className={`flex-1 h-[54px] rounded-[3px] ${fc} font-bold text-[0.85rem] tracking-[0.14em] uppercase text-white flex items-center justify-center gap-2 enroll-cta no-underline`}
          style={{ background: "#c85a1e" }}
        >
          VIEW UPCOMING EVENTS <ArrowRight />
        </a>
        <a
          href="https://cybersecurity-leadership.org"
          className={`px-5 py-3 rounded-[3px] ${fc} font-bold text-[0.85rem] tracking-[0.10em] uppercase text-[#9ba8bb] text-center transition-colors hover:text-white no-underline`}
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.10)" }}
        >
          RETURN HOME
        </a>
      </div>
    </div>
  );
}
