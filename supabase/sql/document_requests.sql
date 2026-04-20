-- Run this once in your Supabase SQL editor:
-- https://supabase.com/dashboard/project/oursmnzsgwjfiejppxac/sql

create table if not exists public.document_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  organization text,
  role text,
  state text,
  city text,
  referral_source text,
  document_slug text not null,
  edition text,
  requested_at timestamptz not null default now(),
  source_page text,
  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now()
);

alter table public.document_requests enable row level security;

-- Allow public (anon) inserts from the website forms.
-- Reads are NOT permitted to anon; admins/service role can read everything.
drop policy if exists "Anyone can submit a document request" on public.document_requests;
create policy "Anyone can submit a document request"
  on public.document_requests
  for insert
  to anon, authenticated
  with check (true);

create index if not exists document_requests_email_idx on public.document_requests (email);
create index if not exists document_requests_requested_at_idx on public.document_requests (requested_at desc);
