import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface EventReservationFormProps {
  registeredEngagement: string;
  sourcePage: string;
  webhookUrl: string;
  ctaLabel?: string;
}

export default function EventReservationForm({
  registeredEngagement,
  sourcePage,
  webhookUrl,
  ctaLabel = "Reserve My Spot",
}: EventReservationFormProps) {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key: string, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    (Object.keys(fields) as (keyof typeof fields)[]).forEach((k) => {
      if (!fields[k].trim()) next[k] = "This field is required.";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      firstName: fields.firstName.trim(),
      lastName: fields.lastName.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      jobTitle: fields.jobTitle.trim(),
      registeredEngagement,
      sourcePage,
      formType: "event-reservation",
      tags: [registeredEngagement, "Event Registration"],
      source: sourcePage,
    };

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          background: "#0f1a2e",
          border: "1px solid rgba(255,255,255,.15)",
          borderRadius: 4,
          padding: 48,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "2px solid #d4a843",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#f8f6f2", fontSize: "1.5rem", margin: 0 }}>
          You're registered.
        </h3>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            color: "#d4a843",
            fontSize: "0.95rem",
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          {registeredEngagement}
        </p>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            color: "#9ba8bb",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            marginTop: 12,
            maxWidth: 380,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A confirmation email is on its way. George Cater IV will follow up personally before the event.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <Link
            to="/events"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#0d1321",
              background: "#d4a843",
              padding: "10px 24px",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            View Upcoming Events →
          </Link>
          <Link
            to="/"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#9ba8bb",
              border: "1px solid rgba(255,255,255,.2)",
              padding: "10px 24px",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const fieldDefs: { key: keyof typeof fields; label: string; type: string; placeholder: string }[] = [
    { key: "firstName", label: "First Name", type: "text", placeholder: "First name" },
    { key: "lastName", label: "Last Name", type: "text", placeholder: "Last name" },
    { key: "email", label: "Email", type: "email", placeholder: "you@company.com" },
    { key: "phone", label: "Phone", type: "tel", placeholder: "(555) 000-0000" },
    { key: "jobTitle", label: "Job Title", type: "text", placeholder: "CISO, CTO, Director…" },
  ];

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "0.65rem",
    letterSpacing: ".16em",
    textTransform: "uppercase",
    color: "#9ba8bb",
    display: "block",
    marginBottom: 6,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#131f33",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 2,
    padding: "12px 14px",
    color: "#f8f6f2",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, box-shadow .2s",
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,.35)";
    e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,.05)";
  };
  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#0f1a2e",
        border: "1px solid rgba(255,255,255,.15)",
        borderRadius: 4,
        padding: 40,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {fieldDefs.map((f) => (
          <div key={f.key}>
            <label style={labelStyle}>{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={fields[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              style={{
                ...inputStyle,
                ...(errors[f.key] ? { borderColor: "#e06820" } : {}),
              }}
            />
            {errors[f.key] && (
              <p
                style={{
                  color: "#e06820",
                  fontSize: "0.72rem",
                  fontFamily: "'Barlow', sans-serif",
                  margin: "4px 0 0",
                }}
              >
                {errors[f.key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          width: "100%",
          height: 52,
          marginTop: 24,
          background: status === "submitting" ? "#c85a1e" : "#c85a1e",
          color: "#fff",
          border: "none",
          borderRadius: 2,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          cursor: status === "submitting" ? "not-allowed" : "pointer",
          opacity: status === "submitting" ? 0.7 : 1,
          transition: "all .2s",
        }}
        onMouseEnter={(e) => {
          if (status !== "submitting") {
            const t = e.currentTarget;
            t.style.background = "#e06820";
            t.style.transform = "translateY(-1px)";
            t.style.boxShadow = "0 6px 24px rgba(200,90,30,.35)";
          }
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget;
          t.style.background = "#c85a1e";
          t.style.transform = "none";
          t.style.boxShadow = "none";
        }}
      >
        {status === "submitting" ? "Submitting..." : ctaLabel}
      </button>

      {status === "error" && (
        <p
          style={{
            color: "#e06820",
            fontSize: "0.8rem",
            fontFamily: "'Barlow', sans-serif",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
