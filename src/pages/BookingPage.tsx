import CSLLayout from "@/components/CSLLayout";
import { BOOKING_URL } from "@/lib/ghl-urls";
import { useEffect, useRef } from "react";

export default function BookingPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load GHL widget script for the embedded booking
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
      {/* HERO */}
      <section className="csl-section">
        <div className="csl-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="csl-badge csl-badge-orange mb-3" style={{ display: "inline-flex" }}>
              Executive Access
            </span>
            <h1 className="mt-2">
              Book Your <span className="text-gold">Discovery Call</span>
            </h1>
            <p
              className="text-sm mt-4 mx-auto max-w-[520px] leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Meet with George Washington IV to explore partnership, advisory,
              speaking, sponsorship, or CSL alignment.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING WIDGET */}
      <section className="csl-section csl-section-dark" style={{ paddingTop: 0 }}>
        <div className="csl-container" style={{ maxWidth: 720 }}>
          <div className="glass-card gold-bar-left p-0 overflow-hidden">
            <iframe
              ref={iframeRef}
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
          <p
            className="text-xs text-center mt-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            You will receive Google Meet details upon confirmation.
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
