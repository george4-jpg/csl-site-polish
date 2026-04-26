-- Run this once in your Supabase SQL editor:
-- https://supabase.com/dashboard/project/oursmnzsgwjfiejppxac/sql

-- =====================================================================
-- Table 1: oracle_optimization_leads
-- Captures leads from /strategic-partners/oracle savings estimator.
-- =====================================================================
create table if not exists public.oracle_optimization_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  company text,
  title text,
  industry text,
  oracle_modules text[],
  annual_oracle_spend text,
  complexity text,
  estimated_savings_low numeric,
  estimated_savings_high numeric,
  preferred_contact_method text,
  notes text,
  source_page text,
  status text not null default 'new'
);

alter table public.oracle_optimization_leads enable row level security;

-- Anon inserts allowed (writes happen via edge function with service role,
-- but this policy keeps the table safe even if the anon key were used directly).
drop policy if exists "Anyone can submit an oracle lead" on public.oracle_optimization_leads;
create policy "Anyone can submit an oracle lead"
  on public.oracle_optimization_leads
  for insert
  to anon, authenticated
  with check (true);

create index if not exists oracle_leads_email_idx on public.oracle_optimization_leads (email);
create index if not exists oracle_leads_created_at_idx on public.oracle_optimization_leads (created_at desc);

-- =====================================================================
-- Table 2: strategic_partner_applications
-- Captures applications from /strategic-partners/apply.
-- =====================================================================
create table if not exists public.strategic_partner_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  phone text,
  company text,
  website text,
  solution_area text,
  target_market text,
  member_value text,
  revenue_model text,
  notes text,
  source_page text,
  status text not null default 'new'
);

alter table public.strategic_partner_applications enable row level security;

drop policy if exists "Anyone can submit a partner application" on public.strategic_partner_applications;
create policy "Anyone can submit a partner application"
  on public.strategic_partner_applications
  for insert
  to anon, authenticated
  with check (true);

create index if not exists partner_applications_email_idx on public.strategic_partner_applications (email);
create index if not exists partner_applications_created_at_idx on public.strategic_partner_applications (created_at desc);
