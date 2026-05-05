-- Central intake table for csl-intake-router
-- Apply in Supabase SQL editor.
create table if not exists public.intakes (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  first_name text,
  last_name text,
  full_name text,
  email text not null,
  phone text,
  organization text,
  title text,
  role text,
  city text,
  state text,
  message text,
  source_page text,
  source_url text,
  cta_name text,
  request_type text,
  event_id text,
  event_name text,
  payload jsonb,
  ghl_sync_status text default 'pending',
  ghl_sync_error text,
  created_at timestamptz not null default now()
);

alter table public.intakes enable row level security;

-- No public read; service role (edge function) writes only.
drop policy if exists "intakes_no_select" on public.intakes;
create policy "intakes_no_select" on public.intakes for select using (false);

create index if not exists intakes_form_type_idx on public.intakes(form_type);
create index if not exists intakes_email_idx on public.intakes(email);
create index if not exists intakes_created_at_idx on public.intakes(created_at desc);
