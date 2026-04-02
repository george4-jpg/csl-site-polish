import { FormEvent, useState } from "react";

interface CSLFormProps {
  formName: string;
  children: React.ReactNode;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  buttonVariant?: "primary" | "gold";
}

export default function CSLForm({ formName, children, submitLabel, successTitle, successMessage, buttonVariant = "primary" }: CSLFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--emerald))" strokeWidth="2" className="mx-auto mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <h3 className="font-display text-emerald">{successTitle}</h3>
        <p className="text-sm mt-2" style={{ color: "#E2E8F0" }}>{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-form={formName}>
      {children}
      <button
        type="submit"
        disabled={submitting}
        className={`csl-btn ${buttonVariant === "gold" ? "csl-btn-gold" : "csl-btn-primary"} csl-btn-block csl-btn-lg mt-4`}
      >
        {submitting ? "Submitting..." : submitLabel}
        {!submitting && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        )}
      </button>
    </form>
  );
}
