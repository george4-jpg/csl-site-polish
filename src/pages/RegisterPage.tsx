import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CSLLayout from "@/components/CSLLayout";
import { CheckCircle, MapPin, Calendar, Clock } from "lucide-react";

const SUPABASE_URL = "https://oursmnzsgwjfiejppxac.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KyGK6iPCIKGEyI1hMUCZtw_42xZoQvV";
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/csl-register`;

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  city: string;
  format?: string;
}

const ROLE_OPTIONS = [
  "CTO/Director of Technology",
  "CISO/Security Director",
  "Superintendent/Administrator",
  "State/Government Leader",
  "Higher Education",
  "Critical Infrastructure",
  "Partner/Sponsor",
  "Other",
];

const inputClass =
  "w-full h-10 rounded-md px-3 text-sm bg-transparent outline-none border border-input text-foreground focus:ring-2 focus:ring-ring";

export default function RegisterPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    organization: "",
    title: "",
    role: "",
  });

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/events?status=eq.active&order=sort_order.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load events. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...form,
          event_id: selectedEvent.id,
          event_name: selectedEvent.name,
          event_date: selectedEvent.date,
          event_time: selectedEvent.time,
          event_city: selectedEvent.city,
          event_format: selectedEvent.format || "",
        }),
      });

      if (!res.ok) throw new Error("Registration failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && selectedEvent) {
    return (
      <CSLLayout>
        <Helmet>
          <title>Event Registration — Cybersecurity-Leadership Inc.</title>
        </Helmet>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              You're registered.
            </h1>
            <div className="rounded-xl p-6 space-y-3 bg-secondary border border-border">
              <p className="text-lg font-semibold text-accent">
                {selectedEvent.name}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {selectedEvent.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {selectedEvent.city}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email will be sent to {form.email}.
            </p>
          </div>
        </section>
      </CSLLayout>
    );
  }

  return (
    <CSLLayout>
      <Helmet>
        <title>Event Registration — Cybersecurity-Leadership Inc.</title>
      </Helmet>
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <div className="text-center space-y-3">
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Event Registration
          </h1>
          <p className="text-muted-foreground">Select an event below to register.</p>
        </div>

        {/* Event cards */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No active events at this time.</div>
        ) : (
          <div className="grid gap-4">
            {events.map((ev) => {
              const isSelected = selectedEvent?.id === ev.id;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className={`w-full text-left rounded-xl p-5 transition-all duration-200 ${
                    isSelected
                      ? "bg-muted border-2 border-accent shadow-[0_0_20px_hsl(var(--accent)/0.15)]"
                      : "bg-secondary border border-border"
                  }`}
                >
                  <p className="text-lg font-semibold text-foreground">{ev.name}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {ev.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {ev.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {ev.city}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected event confirmation strip */}
        {selectedEvent && (
          <div className="rounded-lg p-4 flex items-center gap-3 bg-accent/10 border border-accent/30">
            <CheckCircle className="w-5 h-5 shrink-0 text-accent" />
            <div className="text-sm">
              <span className="font-semibold text-accent">{selectedEvent.name}</span>
              <span className="text-muted-foreground">
                {" "}— {selectedEvent.date} · {selectedEvent.time} · {selectedEvent.city}
              </span>
            </div>
          </div>
        )}

        {/* Registration form */}
        {selectedEvent && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">First Name *</label>
                <input name="first_name" required value={form.first_name} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Last Name *</label>
                <input name="last_name" required value={form.last_name} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Work Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Organization *</label>
              <input name="organization" required value={form.organization} onChange={handleChange} className={inputClass} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Title</label>
                <input name="title" value={form.title} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Role *</label>
                <select
                  name="role"
                  required
                  value={form.role}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none ${!form.role ? "text-muted-foreground" : ""}`}
                >
                  <option value="" disabled>Select your role</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r} className="bg-secondary text-foreground">{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md text-base font-semibold transition-all disabled:opacity-50 text-primary-foreground"
              style={{
                height: 54,
                background: "hsl(var(--orange))",
                boxShadow: "0 4px 24px rgba(200,90,30,0.35)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              {submitting ? "Submitting..." : "Complete Registration"}
            </button>
          </form>
        )}
      </section>
    </CSLLayout>
  );
}
