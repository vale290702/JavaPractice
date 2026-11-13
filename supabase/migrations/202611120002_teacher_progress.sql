begin;
alter table public.app_accounts add column role text not null default 'student' check (role in ('teacher','student'));
create table public.app_progress (
  user_id uuid not null references public.app_accounts(user_id) on delete cascade,
  activity text not null check (activity ~ '^([1]\.(1[0-5]|[1-9])|2\.(1[0-2]|[1-9])|3\.[1-9]|4\.(1[0-7]|[1-9])):(learn|example|practice|quiz|code)$'),
  completed_at timestamptz not null default statement_timestamp(),
  primary key(user_id,activity)
);
alter table public.app_progress enable row level security;
revoke all on public.app_progress from public,anon,authenticated;
grant all on public.app_progress to service_role;
create or replace function public.app_read_session(p_token_hash text) returns jsonb
language sql security definer set search_path = '' as $$
  select jsonb_build_object('user',jsonb_build_object('id',u.id,'email',u.email,'displayName',a.display_name,'role',a.role),'expiresAt',s.expires_at)
  from public.app_sessions s join public.app_accounts a on a.user_id=s.user_id join auth.users u on u.id=a.user_id
  where s.token_hash=p_token_hash and s.expires_at>statement_timestamp() and a.enabled and u.deleted_at is null
  and (u.banned_until is null or u.banned_until<=statement_timestamp());
$$;
-- All progress RPCs take locks in the same auth -> account -> session order as login
-- and the password trigger. Recheck the token after waiting: a replaced token can never write.
create function public.app_lock_progress_session(p_token_hash text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
  select user_id into target from public.app_sessions where token_hash=p_token_hash;
  if target is null then return null; end if;
  perform 1 from auth.users where id=target for update;
  perform 1 from public.app_accounts where user_id=target for update;
  perform 1 from public.app_sessions where user_id=target for update;
  if public.app_read_session(p_token_hash) is null then return null; end if;
  return target;
end;
$$;
create function public.app_read_progress(p_token_hash text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
  target := public.app_lock_progress_session(p_token_hash);
  if target is null then return null; end if;
  return (select coalesce(jsonb_agg(activity order by activity),'[]'::jsonb) from public.app_progress where user_id=target);
end;
$$;
create function public.app_complete_activity(p_token_hash text,p_activity text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
  target := public.app_lock_progress_session(p_token_hash);
  if target is null then return null; end if;
  if p_activity is null or p_activity !~ '^([1]\.(1[0-5]|[1-9])|2\.(1[0-2]|[1-9])|3\.[1-9]|4\.(1[0-7]|[1-9])):(learn|example|practice|quiz|code)$' then
    raise exception 'invalid activity';
  end if;
  insert into public.app_progress(user_id,activity) values (target,p_activity) on conflict do nothing;
  return (select coalesce(jsonb_agg(activity order by activity),'[]'::jsonb) from public.app_progress where user_id=target);
end;
$$;
create function public.app_teacher_progress(p_token_hash text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
  target := public.app_lock_progress_session(p_token_hash);
  if target is null or not exists(select 1 from public.app_accounts where user_id=target and role='teacher') then return null; end if;
  return (select coalesce(jsonb_agg(row_data order by row_data->>'displayName',row_data->>'id'),'[]'::jsonb) from (
    select jsonb_build_object('id',a.user_id,'email',u.email,'displayName',a.display_name,'enabled',a.enabled,
      'completed',coalesce((select jsonb_agg(p.activity order by p.activity) from public.app_progress p where p.user_id=a.user_id),'[]'::jsonb),
      'lastActivity',(select max(p.completed_at) from public.app_progress p where p.user_id=a.user_id)) row_data
    from public.app_accounts a join auth.users u on u.id=a.user_id where a.role='student'
  ) roster);
end;
$$;
revoke all on function public.app_lock_progress_session(text),public.app_read_progress(text),public.app_complete_activity(text,text),public.app_teacher_progress(text) from public,anon,authenticated;
grant execute on function public.app_read_progress(text),public.app_complete_activity(text,text),public.app_teacher_progress(text) to service_role;
commit;
