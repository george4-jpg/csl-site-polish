import CSLLayout from "@/components/CSLLayout";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const interestOptions = [
  "Cybersecurity Leadership", "AI Governance", "Risk Management", "Resilience",
  "K-12", "Higher Education", "State and Local Government", "Critical Infrastructure",
  "Healthcare", "Board / Executive Communication", "Peer Networking",
  "Advisory Services", "Sponsorship / Partnership Interest",
];

const frameworkInterests = ["Leadership", "Health", "Wealth"];

const communityOptions = [
  "Golf", "Private Dinners", "Sporting Events", "Whiskey / Bourbon Tastings",
  "Outdoor Events", "Live Music", "Executive Roundtables",
  "Family-Friendly Gatherings", "Fitness / Wellness", "Travel",
];

export default function OnboardingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string[]>([]);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 900);
  };

  if (submitted) {
    return (
      <CSLLayout>
        <section className="csl-section" style={{ minHeight: "60vh" }}>
          <div className="csl-container" style={{ maxWidth: 640 }}>
            <div className="glass-card p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(107,197,160,0.15)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2 className="font-display" style={{ color: "#F1F5F9" }}>Welcome to CSL</h2>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "#E2E8F0" }}>
                Your membership has been received and onboarding is underway. The CSL Security Brief will be sent to the email you provided.
              </p>
              <div className="glass-card gold-bar-left p-5 mt-6 text-left">
                <p className="text-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
                  <strong className="text-gold">What happens next:</strong>
                </p>
                <ul className="mt-3 space-y-2 text-sm" style={{ color: "#CBD5E1" }}>
                  <li className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Your CSL Security Brief will arrive at the email you provided
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    A member of our team will follow up to confirm your membership tier
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(153 40% 60%)" strokeWidth="2" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    We are finalizing our private member portal and will provide your access details shortly
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Link to="/" className="csl-btn csl-btn-primary">Return Home</Link>
                <Link to="/events" className="csl-btn csl-btn-outline">View Upcoming Events</Link>
              </div>
            </div>
          </div>
        </section>
      </CSLLayout>
    );
  }

  return (
    <CSLLayout>
      <section className="csl-section" style={{ paddingBottom: "1rem" }}>
        <div className="csl-container" style={{ maxWidth: 700 }}>
          <div className="text-center mb-2">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(212,168,67,0.15)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(42 60% 55%)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <span className="csl-label text-gold">Member Onboarding</span>
            <h1 className="mt-3">Complete Your Profile</h1>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#CBD5E1" }}>
              Help us personalize your CSL experience. This takes about two minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="csl-container" style={{ maxWidth: 640 }}>
          <form onSubmit={handleSubmit}>
            {/* Core Profile */}
            <div className="glass-card p-6 mb-4">
              <h3 className="font-display text-lg mb-4" style={{ color: "#F1F5F9" }}>Your Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="csl-form-label">Full Name</label>
                    <input type="text" required className="csl-form-input" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="csl-form-label">Title</label>
                    <input type="text" className="csl-form-input" placeholder="Your title" />
                  </div>
                </div>
                <div>
                  <label className="csl-form-label">Organization</label>
                  <input type="text" className="csl-form-input" placeholder="Your organization" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="csl-form-label">Email</label>
                    <input type="email" required className="csl-form-input" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="csl-form-label">Mobile</label>
                    <input type="tel" className="csl-form-input" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="csl-form-label">City</label>
                    <input type="text" className="csl-form-input" placeholder="Your city" />
                  </div>
                  <div>
                    <label className="csl-form-label">State</label>
                    <input type="text" className="csl-form-input" placeholder="Your state" />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Interests */}
            <div className="glass-card p-6 mb-4">
              <h3 className="font-display text-lg mb-2" style={{ color: "#F1F5F9" }}>Professional Interests</h3>
              <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>Select all that apply. This helps us tailor your experience.</p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(selectedInterests, setSelectedInterests, item)}
                    className="px-3 py-1.5 rounded-full text-[0.68rem] font-display font-semibold tracking-[0.06em] uppercase transition-all"
                    style={{
                      background: selectedInterests.includes(item) ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${selectedInterests.includes(item) ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: selectedInterests.includes(item) ? "hsl(42 60% 55%)" : "#94A3B8",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Framework Interests */}
            <div className="glass-card p-6 mb-4">
              <h3 className="font-display text-lg mb-2" style={{ color: "#F1F5F9" }}>CSL Framework Focus</h3>
              <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>Which pillars resonate most with you?</p>
              <div className="flex flex-wrap gap-2">
                {frameworkInterests.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(selectedFramework, setSelectedFramework, item)}
                    className="px-4 py-2 rounded-full text-sm font-display font-semibold tracking-[0.06em] uppercase transition-all"
                    style={{
                      background: selectedFramework.includes(item) ? "rgba(200,90,30,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${selectedFramework.includes(item) ? "rgba(200,90,30,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: selectedFramework.includes(item) ? "hsl(22 75% 54%)" : "#94A3B8",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Community Preferences */}
            <div className="glass-card p-6 mb-4">
              <h3 className="font-display text-lg mb-2" style={{ color: "#F1F5F9" }}>Community Preferences</h3>
              <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>Optional. Let us know what kinds of experiences you enjoy outside the boardroom.</p>
              <div className="flex flex-wrap gap-2">
                {communityOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(selectedCommunity, setSelectedCommunity, item)}
                    className="px-3 py-1.5 rounded-full text-[0.68rem] font-display font-semibold tracking-[0.06em] uppercase transition-all"
                    style={{
                      background: selectedCommunity.includes(item) ? "rgba(107,197,160,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${selectedCommunity.includes(item) ? "rgba(107,197,160,0.3)" : "rgba(255,255,255,0.08)"}`,
                      color: selectedCommunity.includes(item) ? "hsl(153 40% 60%)" : "#94A3B8",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Open Text */}
            <div className="glass-card p-6 mb-6">
              <h3 className="font-display text-lg mb-4" style={{ color: "#F1F5F9" }}>In Your Own Words</h3>
              <div className="space-y-4">
                <div>
                  <label className="csl-form-label">What are you hoping to gain from CSL?</label>
                  <textarea className="csl-form-textarea" placeholder="What would make your membership worthwhile?" style={{ minHeight: 80 }} />
                </div>
                <div>
                  <label className="csl-form-label">What topics are most important to you this year?</label>
                  <textarea className="csl-form-textarea" placeholder="Anything specific you want us to prioritize..." style={{ minHeight: 80 }} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="csl-btn csl-btn-gold csl-btn-block csl-btn-lg">
              {submitting ? "Submitting..." : "Complete Onboarding"}
              {!submitting && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              )}
            </button>
          </form>
        </div>
      </section>
    </CSLLayout>
  );
}
