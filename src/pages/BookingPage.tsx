import CSLLayout from "@/components/CSLLayout";
import { BOOKING_URL } from "@/lib/ghl-urls";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function BookingPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <CSLLayout>
      {/* A. PAGE INTRO */}
      <section className="csl-section" style={{ paddingBottom: 0 }}>
        <div className="csl-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>
              Executive Access
            </span>
            <h1 className="mt-2">
              Schedule Your <span className="text-gold">CSL Conversation</span>
            </h1>
            <p
              className="text-sm mt-4 mx-auto max-w-[540px] leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Choose a time that works for you, or return to Membership to review
              options before booking.
            </p>
          </div>
        </div>
      </section>

      {/* B. NAVIGATION ROW */}
      <section style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/membership"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border transition-colors"
              style={{
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            >
              <ArrowLeft size={16} />
              Back to Membership
            </Link>
            <Link
              to="/membership#pricing"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border transition-colors"
              style={{
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            >
              <Users size={16} />
              View Membership Options
            </Link>
          </div>
        </div>
      </section>

      {/* E. BRANDED SCHEDULER CONTAINER */}
      <section className="csl-section csl-section-dark" style={{ paddingTop: "2rem" }}>
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="glass-card gold-bar-left p-0 overflow-hidden">
            <iframe
              src={BOOKING_URL}
              style={{
                width: "100%",
                border: "none",
                minHeight: 700,
                background: "transparent",
              }}
              scrolling="no"
              title="Schedule Discovery Call"
            />
          </div>

          {/* C. ALTERNATIVE OPTION LINK */}
          <p
            className="text-xs text-center mt-5 leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Need a different option?{" "}
            <Link
              to="/membership"
              className="underline transition-colors"
              style={{ color: "hsl(var(--gold))" }}
            >
              Return to Membership
            </Link>{" "}
            or{" "}
            <Link
              to="/book"
              className="underline transition-colors"
              style={{ color: "hsl(var(--gold))" }}
            >
              contact CSL
            </Link>{" "}
            for assistance.
          </p>

          {/* F. REASSURANCE LINE */}
          <p
            className="text-xs text-center mt-3 leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            If no time works, you can{" "}
            <Link
              to="/membership"
              className="underline transition-colors"
              style={{ color: "hsl(var(--gold))" }}
            >
              return to Membership
            </Link>{" "}
            and choose the best path for your needs.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="csl-section">
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="text-center mb-8">
            <span className="csl-label">What to Expect</span>
            <h2 className="mt-3">Your Discovery Call</h2>
          </div>
          <div className="csl-grid csl-grid-3">
            {[
              {
                step: "01",
                title: "Select a Time",
                desc: "Choose a date and time that works for your schedule.",
              },
              {
                step: "02",
                title: "Brief Intake",
                desc: "Share context so the conversation is focused and productive.",
              },
              {
                step: "03",
                title: "Meet via Google Meet",
                desc: "A direct conversation with CSL leadership. No sales scripts.",
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-5 text-center">
                <div
                  className="font-display text-[2rem] font-black mb-2"
                  style={{ color: "hsl(var(--gold))" }}
                >
                  {item.step}
                </div>
                <h4 className="font-display mb-1">{item.title}</h4>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CSLLayout>
  );
}
