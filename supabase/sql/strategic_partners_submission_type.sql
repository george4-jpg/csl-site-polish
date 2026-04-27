-- Run once in the Supabase SQL editor.
-- Adds a unified submission_type field for unified inbox / reporting.

alter table public.oracle_optimization_leads
  add column if not exists submission_type text not null default 'oracle_lead';

alter table public.strategic_partner_applications
  add column if not exists submission_type text not null default 'strategic_partner';

create index if not exists oracle_leads_submission_type_idx
  on public.oracle_optimization_leads (submission_type);

create index if not exists partner_applications_submission_type_idx
  on public.strategic_partner_applications (submission_type);
