export function CheckIcon({ color = "currentColor", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" className="flex-shrink-0 mt-[3px]">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 py-1.5 text-sm" style={{ color: "#E2E8F0" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--emerald))" strokeWidth="2" className="flex-shrink-0 mt-0.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {children}
    </div>
  );
}

export function SectionDivider() {
  return <div className="csl-divider" />;
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

export function FormGroup({ label, children, htmlFor }: { label: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div className="mb-4">
      <label className="csl-form-label" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
