# Homepage Launch Cleanup — Frontend Only

Scope: presentation-only edits in `src/pages/HomePage.tsx`, `src/pages/GetMorePage.tsx`, and `src/pages/EventsPage.tsx`. No forms, backend, Supabase, GHL, Beehiiv, SEO, or schema touched.

## 1. `src/pages/HomePage.tsx` — section reorder + duplicate label fix

Current order (top to bottom):
1. Hero
2. Newsroom "Coming Soon"
3. Founding Member band
4. City ticker
5. How CSL Works
6. The Problem
7. What CSL Is (Solution)
8. Three Pillars
9. The Community
10. Executive Council
11. State Security Brief / States Engine
12. Founding CTA

New order:
1. Hero
2. Founding Member band
3. City ticker
4. **The Problem** (moved up, right after the ticker)
5. What CSL Is (Solution)
6. Three Pillars
7. **How CSL Works** (moved down to sit just above The Community)
8. The Community
9. Executive Council
10. State Security Brief / States Engine
11. **Newsroom "Coming Soon"** (moved below the State Engine)
12. Founding CTA

Duplicate-label fix in the How CSL Works section: today the eyebrow `csl-label` and the `<h2>` both read "How CSL Works". Change the eyebrow to "The Operating System" so the heading reads "How CSL Works" once. No other copy edits.

No styling, animation, or responsive class changes — just block reordering inside the existing JSX and the one-line eyebrow text swap.

## 2. `src/pages/GetMorePage.tsx` — direct CTA routing

The homepage hero/final CTAs route to `/get-more`, where the Step 1 intent buttons currently advance an internal wizard. Spec says each top-level intent must navigate directly to its conversion page.

Change the Step 1 intent list so the three named items become direct links instead of `pickIntent` triggers:

- "Get Advisory Support" → `/advisory`
- "Become a Member" → `/membership`
- "Attend or Host Events" → `/events`

Implementation: extend the `intents` array entries with an optional `to` field for those three, and in Step 1 render a `<Link to={i.to}>` when present, else keep the existing `<button onClick={pickIntent}>` for "Explore Strategic Partnership" and "Recommend a Partner". Preserve the existing card styling and `?source=get-more` query so attribution still flows. No changes to Step 2/3 or wizard state.

## 3. `src/pages/EventsPage.tsx` — display sort

Apply a display-only sort to the Supabase `dinnerEvents` array before render:

- Parse `event.date` to a Date when possible.
- Upcoming (date ≥ today) before past.
- Within upcoming, in-person (default for dinners, or `format !== "Virtual"`) before virtual.
- Within each bucket, soonest date first.
- Unparseable dates fall to the end of upcoming (treated as TBD upcoming, not past).

No backend, schema, or fetch changes. The existing `sort_order` from the API is used only as the secondary tiebreaker.

The static `seriesEvents` list is all "Coming Soon"; leave its order unchanged.

## Verification checklist (post-implement)

- Homepage renders; The Problem appears immediately after the city ticker.
- How CSL Works renders just above The Community, with a single "How CSL Works" heading and "The Operating System" eyebrow.
- Newsroom Coming Soon renders below the States Engine block, above Founding CTA.
- `/get-more` Step 1: clicking Get Advisory Support, Become a Member, or Attend or Host Events navigates to `/advisory`, `/membership`, `/events` respectively (with `?source=get-more`).
- `/events`: upcoming dinners appear above past, in-person ahead of virtual where dates are comparable.
- Mobile (current 816px and ≤414px): all sections stack as before; no new breakpoints introduced.

## Files changed
- `src/pages/HomePage.tsx`
- `src/pages/GetMorePage.tsx`
- `src/pages/EventsPage.tsx`

## Out of scope (explicitly not touched)
Advisory, Executive Guide, Newsroom backend, Security Brief, Strategic Partner Apply, Events backend/schema, SEO, sitemap, robots, Supabase functions, GHL webhooks, Beehiiv, form components, brand tokens.
