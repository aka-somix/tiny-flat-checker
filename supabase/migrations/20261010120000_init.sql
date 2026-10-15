-- Tiny Flat Checker: schema, API keys, invite-only signup.
-- Only the backend (secret key, role service_role) reads or writes tables:
-- RLS is on with no policies, and anon/authenticated get no grants.

create table public.invited_emails (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

create table public.api_clients (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  key_hash text not null unique,
  created_at timestamptz not null default now()
);

create table public.checklist_templates (
  version int primary key check (version > 0),
  fields jsonb not null check (jsonb_typeof(fields) = 'array'),
  created_at timestamptz not null default now()
);

create table public.flatchecks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  template_version int not null references public.checklist_templates (version),
  title text not null check (length(trim(title)) > 0),
  link text,
  price numeric(12, 2) not null check (price > 0),
  answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
  created_at timestamptz not null default now()
);

create index flatchecks_user_created_idx on public.flatchecks (user_id, created_at desc);

alter table public.invited_emails enable row level security;
alter table public.api_clients enable row level security;
alter table public.checklist_templates enable row level security;
alter table public.flatchecks enable row level security;

revoke all on public.invited_emails, public.api_clients, public.checklist_templates, public.flatchecks
  from anon, authenticated;

-- API keys -------------------------------------------------------------------
-- Keys are stored as HMAC-SHA256(key, salt). The salt is the Vault secret
-- 'api_key_salt' and is only read inside these functions.

create function public.api_key_hash(p_key text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select encode(
    extensions.hmac(
      p_key,
      (select decrypted_secret from vault.decrypted_secrets where name = 'api_key_salt'),
      'sha256'
    ),
    'hex'
  );
$$;

-- Returns the client name owning the key, or null.
create function public.verify_api_key(p_key text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select name from public.api_clients where key_hash = public.api_key_hash(p_key);
$$;

-- Mints a key for a client and returns it once. Run from the SQL editor:
--   select public.create_api_key('webapp');
create function public.create_api_key(p_name text)
returns text
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_key text := encode(extensions.gen_random_bytes(32), 'hex');
begin
  if (select decrypted_secret from vault.decrypted_secrets where name = 'api_key_salt') is null then
    raise exception 'Vault secret api_key_salt is missing';
  end if;
  insert into public.api_clients (name, key_hash) values (p_name, public.api_key_hash(v_key));
  return v_key;
end;
$$;

revoke execute on function public.api_key_hash(text), public.verify_api_key(text), public.create_api_key(text)
  from public, anon, authenticated;
grant execute on function public.verify_api_key(text) to service_role;

-- Invite-only signup -----------------------------------------------------------
-- Enable in Dashboard > Authentication > Hooks > "Before User Created".

create function public.hook_before_user_created(event jsonb)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if exists (
    select 1 from public.invited_emails where email = lower(event -> 'user' ->> 'email')
  ) then
    return '{}'::jsonb;
  end if;
  return jsonb_build_object(
    'error', jsonb_build_object('http_code', 403, 'message', 'This app is invite-only.')
  );
end;
$$;

revoke execute on function public.hook_before_user_created(jsonb) from public, anon, authenticated;
grant execute on function public.hook_before_user_created(jsonb) to supabase_auth_admin;
