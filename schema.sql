-- Nexo IA · Diagnóstico Cliente — esquema V1
-- Ejecutar en Supabase → SQL Editor.
-- Proyecto creado en región EU (Frankfurt), por privacidad/GDPR.

create extension if not exists pgcrypto;

-- ────────────────────────────────────────────────────────────────
-- CLIENTES
-- ────────────────────────────────────────────────────────────────
create table public.clients (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  brand       text,
  phone       text,
  email       text,
  web         text,
  socials     text,
  notes       text
);

-- ────────────────────────────────────────────────────────────────
-- DIAGNÓSTICOS  (varios por cliente → histórico gratis)
-- ────────────────────────────────────────────────────────────────
create table public.diagnoses (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.clients(id) on delete cascade,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  status        text not null default 'iniciado'
                  check (status in ('iniciado','completado','evaluado')),
  -- Respuestas del cliente (bloques 1–11). Lo ÚNICO que pide la vista cliente.
  answers       jsonb not null default '{}'::jsonb,
  -- 100% INTERNO: evaluación, alertas, recomendación, notas.
  -- La vista cliente NUNCA selecciona esta columna.
  internal_eval jsonb not null default '{}'::jsonb
);

create index diagnoses_client_id_idx on public.diagnoses (client_id);

-- updated_at automático en cada UPDATE
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_diagnoses_touch
  before update on public.diagnoses
  for each row execute function public.touch_updated_at();

-- ────────────────────────────────────────────────────────────────
-- RLS — app de un solo usuario (Salvador).
-- Sin sesión (rol anon) = sin acceso a NADA. Verifica que queda activado.
-- ────────────────────────────────────────────────────────────────
alter table public.clients   enable row level security;
alter table public.diagnoses enable row level security;

create policy "auth full access - clients"
  on public.clients for all
  to authenticated using (true) with check (true);

create policy "auth full access - diagnoses"
  on public.diagnoses for all
  to authenticated using (true) with check (true);

-- NOTA IMPORTANTE sobre la separación cliente / interno:
-- RLS protege frente a EXTRAÑOS (nadie sin sesión entra).
-- La separación cliente vs. interno NO la da RLS, la da la CONSULTA:
--   · vista cliente  /diagnoses/[id]          → select id, status, answers
--   · vista interna  /diagnoses/[id]/interno  → select * (incl. internal_eval)
-- internal_eval no se pide nunca en la ruta del cliente: no llega al navegador.
