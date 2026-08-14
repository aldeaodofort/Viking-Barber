-- BASE DO BANCO PARA A VERSÃO REAL
-- Depois vamos executar este SQL no Supabase e substituir o localStorage pelo banco.

create extension if not exists "pgcrypto";

create table if not exists studios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  whatsapp text not null,
  rating numeric(2,1) default 0,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  duration_minutes integer,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  price numeric(10,2) not null default 0,
  status text not null default 'pending',
  created_at timestamptz default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,
  customer_name text,
  customer_phone text,
  service_name text not null,
  appointment_at timestamptz not null,
  status text not null default 'scheduled',
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios(id) on delete cascade,
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios(id) on delete cascade,
  image_url text not null,
  caption text,
  created_at timestamptz default now()
);

-- Na versão real, vamos ativar RLS e criar policies específicas.
-- O ponto principal é que TODAS as tabelas possuem studio_id,
-- impedindo que dados de uma profissional sejam misturados com os de outra.
