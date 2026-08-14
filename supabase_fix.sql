-- =========================================================
-- CORREÇÃO: tabela "agendamentos" + trava de horário duplicado
-- + segurança (RLS)
--
-- Rode este arquivo inteiro no Supabase:
-- Dashboard > SQL Editor > New query > cole tudo > Run
-- =========================================================

-- Extensão necessária para a trava de horário sobreposto
create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";


-- =========================================================
-- TABELA
-- =========================================================

create table if not exists agendamentos (
  id uuid primary key default gen_random_uuid(),

  nome_cliente text not null,
  telefone text not null,

  servico_id integer not null,
  servico_nome text not null,

  data date not null,
  inicio time not null,
  fim time not null,

  status text not null default 'pendente'
    check (status in ('pendente', 'confirmado', 'cancelado')),

  created_at timestamptz not null default now(),

  -- período calculado automaticamente a partir de data + inicio/fim,
  -- usado só para checar sobreposição de horários
  periodo tsrange generated always as (
    tsrange(
      (data + inicio)::timestamp,
      (data + fim)::timestamp
    )
  ) stored
);


-- =========================================================
-- TRAVA CONTRA HORÁRIO DUPLICADO
--
-- Impede que dois agendamentos ativos (não cancelados)
-- tenham horários que se sobrepõem. Isso é feito no banco,
-- então nem uma falha no site consegue furar essa regra.
-- =========================================================

alter table agendamentos
  add constraint agendamentos_sem_conflito
  exclude using gist (
    periodo with &&
  )
  where (status <> 'cancelado');


-- =========================================================
-- SEGURANÇA (RLS)
--
-- Regra geral:
--   - Qualquer pessoa pode CRIAR um agendamento (é assim que
--     o formulário do site funciona sem login).
--   - Qualquer pessoa pode ver a AGENDA DE HORÁRIOS OCUPADOS,
--     mas SEM nome e telefone do cliente (isso fica só pro admin).
--   - Só o admin logado (autenticado no Supabase) pode ver a
--     lista completa (com nome/telefone) e confirmar/cancelar.
-- =========================================================

alter table agendamentos enable row level security;

-- Qualquer visitante do site pode criar um agendamento
create policy "Qualquer pessoa pode agendar"
  on agendamentos
  for insert
  to anon
  with check (true);

-- Só usuários logados (o admin) podem ler a tabela completa
create policy "Admin logado ve tudo"
  on agendamentos
  for select
  to authenticated
  using (true);

-- Só usuários logados (o admin) podem confirmar/cancelar
create policy "Admin logado atualiza status"
  on agendamentos
  for update
  to authenticated
  using (true)
  with check (true);


-- =========================================================
-- VIEW PÚBLICA (sem dados do cliente)
--
-- O site usa essa view pra saber quais horários já estão
-- ocupados num dia, sem expor nome/telefone de ninguém.
-- =========================================================

create or replace view horarios_ocupados as
  select data, inicio, fim
  from agendamentos
  where status <> 'cancelado';

grant select on horarios_ocupados to anon;


-- =========================================================
-- FIM
--
-- Depois de rodar isso, use os arquivos script.js e admin.js
-- atualizados (foram ajustados para casar com essa estrutura).
-- =========================================================
