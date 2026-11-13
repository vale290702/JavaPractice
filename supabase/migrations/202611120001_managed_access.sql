begin;

create table public.app_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(display_name) between 1 and 200),
  enabled boolean not null default true,
  credential_version bigint not null default 0 check (credential_version >= 0)
);
create table public.app_sessions (
  user_id uuid primary key references public.app_accounts(user_id) on delete cascade,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz not null
);
create table public.app_login_limits (
  key_hash text primary key check (key_hash ~ '^[0-9a-f]{64}$'),
  window_start timestamptz not null,
  attempts integer not null check (attempts > 0)
);
alter table public.app_accounts enable row level security;
alter table public.app_sessions enable row level security;
alter table public.app_login_limits enable row level security;
revoke all on public.app_accounts, public.app_sessions, public.app_login_limits from public, anon, authenticated;
grant all on public.app_accounts, public.app_sessions, public.app_login_limits to service_role;

create function public.app_read_session(p_token_hash text) returns jsonb
language sql security definer set search_path = '' as $$
  select jsonb_build_object('user', jsonb_build_object('id', u.id, 'email', u.email,
    'displayName', a.display_name), 'expiresAt', s.expires_at)
  from public.app_sessions s
  join public.app_accounts a on a.user_id = s.user_id
  join auth.users u on u.id = a.user_id
  where s.token_hash = p_token_hash and s.expires_at > statement_timestamp()
    and a.enabled and u.deleted_at is null
    and (u.banned_until is null or u.banned_until <= statement_timestamp());
$$;

create function public.app_get_login_version(p_email text) returns jsonb
language sql security definer set search_path = '' as $$
  select jsonb_build_object('userId', a.user_id, 'version', a.credential_version)
  from public.app_accounts a join auth.users u on u.id = a.user_id
  where lower(u.email) = lower(p_email) and a.enabled and u.deleted_at is null
    and (u.banned_until is null or u.banned_until <= statement_timestamp());
$$;

create function public.app_rotate_credentials() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.app_accounts set credential_version = credential_version + 1 where user_id = new.id;
  delete from public.app_sessions where user_id = new.id;
  return new;
end;
$$;
create trigger app_password_changed after update of encrypted_password on auth.users
  for each row when (old.encrypted_password is distinct from new.encrypted_password)
  execute function public.app_rotate_credentials();
revoke all on function public.app_rotate_credentials() from public, anon, authenticated;

create function public.app_replace_session(p_user_id uuid, p_token_hash text, p_credential_version bigint) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  -- Serialize account changes and all claims for this account; unique user_id is authoritative.
  perform 1 from auth.users u where u.id = p_user_id for update;
  perform 1 from public.app_accounts a join auth.users u on u.id = a.user_id
    where a.user_id = p_user_id and a.credential_version = p_credential_version and a.enabled and u.deleted_at is null
      and (u.banned_until is null or u.banned_until <= statement_timestamp())
    for update of a, u;
  if not found then return null; end if;
  insert into public.app_sessions(user_id,token_hash,expires_at)
    values (p_user_id,p_token_hash,statement_timestamp() + interval '12 hours')
    on conflict (user_id) do update set token_hash=excluded.token_hash, expires_at=excluded.expires_at;
  return public.app_read_session(p_token_hash);
end;
$$;

create function public.app_revoke_session(p_token_hash text) returns void
language sql security definer set search_path = '' as $$
  delete from public.app_sessions where token_hash = p_token_hash;
$$;

create function public.app_check_login_limit(p_key text, p_limit integer) returns boolean
language plpgsql security definer set search_path = '' as $$
declare current_attempts integer;
begin
  if p_limit not between 1 and 50 then raise exception 'invalid limit'; end if;
  insert into public.app_login_limits(key_hash,window_start,attempts)
    values (p_key,statement_timestamp(),1)
    on conflict (key_hash) do update set
      attempts = case when public.app_login_limits.window_start <= statement_timestamp() - interval '15 minutes'
        then 1 else least(public.app_login_limits.attempts + 1, 1000000) end,
      window_start = case when public.app_login_limits.window_start <= statement_timestamp() - interval '15 minutes'
        then statement_timestamp() else public.app_login_limits.window_start end
    returning attempts into current_attempts;
  return current_attempts <= p_limit;
end;
$$;
revoke all on function public.app_read_session(text), public.app_replace_session(uuid,text,bigint), public.app_get_login_version(text),
  public.app_revoke_session(text), public.app_check_login_limit(text,integer) from public, anon, authenticated;
grant execute on function public.app_read_session(text), public.app_replace_session(uuid,text,bigint), public.app_get_login_version(text),
  public.app_revoke_session(text), public.app_check_login_limit(text,integer) to service_role;
commit;
