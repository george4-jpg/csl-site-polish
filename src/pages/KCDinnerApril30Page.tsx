import CSLLayout from "@/components/CSLLayout";
import EventReservationForm from "@/components/EventReservationForm";

export default function KCDinnerApril30Page() {
  return (
    <CSLLayout>
      {/* Nav context tag */}
      <div
        style={{
          background: "#0a1628",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: "0.7rem",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#9ba8bb",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#34d399",
              marginRight: 8,
              verticalAlign: "middle",
            }}
          />
          KANSAS CITY · APRIL 30
        </span>
      </div>

      <section style={{ background: "#0d1321", padding: "64px 0 80px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
          className="kc-dinner-grid"
        >
          {/* LEFT — Event details */}
          <div>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#e06820",
              }}
            >
              EXECUTIVE DINNER · KANSAS CITY
            </span>

            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#f8f6f2",
                fontSize: "2.2rem",
                lineHeight: 1.15,
                marginTop: 14,
              }}
            >
              KC Wine &amp; Leadership Dinner
            </h1>

            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "#d4a843",
                fontSize: "0.95rem",
                marginTop: 14,
              }}
            >
              Wednesday, April 30, 2026
            </p>

            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                color: "rgba(255,255,255,.6)",
                fontSize: "0.92rem",
                lineHeight: 1.65,
                marginTop: 16,
                maxWidth: 440,
              }}
            >
              Sommelier-led evening for K-12 and government cybersecurity leaders.
              15 seats. Peer conversation, not a sales pitch. Hosted by George Cater IV.
            </p>

            <span
              style={{
                display: "inline-block",
                marginTop: 20,
                background: "#d4a843",
                color: "#0d1321",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: 2,
              }}
            >
              ⚡ 15 seats — invitation only
            </span>
          </div>

          {/* RIGHT — Form */}
          <div>
            <EventReservationForm
              registeredEngagement="KC Wine & Leadership Dinner — April 30, 2026"
              sourcePage="/events/kc-dinner-april-30"
              webhookUrl="https://api.leadconnectorhq.com/widget/form/92hr37LbOZcdfFWk8Stc"
              ctaLabel="Reserve My Spot"
            />
          </div>
        </div>
      </section>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .kc-dinner-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </CSLLayout>
  );
}
