begin;

-- AP topic numbers are ordered by unit and section, so 2.10 follows 2.9.
create function public.app_topic_order(p_topic text) returns integer
language sql immutable set search_path = '' as $$
  select case
    when p_topic = 'none' then 0
    when p_topic ~ '^([1]\.(1[0-5]|[1-9])|2\.(1[0-2]|[1-9])|3\.[1-9]|4\.(1[0-7]|[1-9]))$'
      then split_part(p_topic, '.', 1)::integer * 100 + split_part(p_topic, '.', 2)::integer
  end;
$$;

alter table public.app_accounts add column curriculum_through text
  check (curriculum_through is null or public.app_topic_order(curriculum_through) is not null);

create function public.app_can_access_topic(p_student_id uuid, p_topic text) returns boolean
language sql stable set search_path = '' as $$
  select role = 'teacher' or curriculum_through is null
    or public.app_topic_order(p_topic) <= public.app_topic_order(curriculum_through)
  from public.app_accounts where user_id = p_student_id;
$$;

-- Worksheet IDs index the published activity-to-topic groups.
create function public.app_worksheet_topic(p_id text) returns text
language sql immutable strict set search_path = '' as $$
  select case left(p_id, 1)
    when 'a' then (array['1.1','1.1','1.2','1.3','1.4','1.5'])[index]
    when 'b' then (array['1.6','1.7','1.8','1.9','1.10','1.10','1.10','1.10'])[index]
    when 'c' then (array['2.1','2.2','2.3','2.3','2.4','2.4','2.4','2.5','2.5'])[index]
    when 'd' then (array['1.10','1.10','1.10','1.10','1.11','1.11','1.12','1.13','1.13','1.14','1.14','1.15'])[index]
  end
  from (select substring(p_id from '^[a-d]([1-9][0-9]?)-(?:guided|independent)$')::integer as index) worksheet;
$$;

create function public.app_set_curriculum_access(p_token_hash text, p_student_id uuid, p_through text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare actor uuid;
begin
  actor := public.app_lock_progress_session(p_token_hash);
  if actor is null or not exists(select 1 from public.app_accounts where user_id = actor and role = 'teacher') then
    return null;
  end if;
  if p_through is not null and public.app_topic_order(p_through) is null then
    return jsonb_build_object('ok', false, 'code', 'invalid_request');
  end if;
  -- Course writes lock this same account row before evaluating its current access.
  update public.app_accounts set curriculum_through = p_through
  where user_id = p_student_id and role = 'student';
  if not found then
    return jsonb_build_object('ok', false, 'code', 'invalid_request');
  end if;
  return jsonb_build_object('ok', true, 'curriculumThrough', p_through);
end;
$$;

revoke all on function public.app_topic_order(text), public.app_can_access_topic(uuid,text),
  public.app_worksheet_topic(text), public.app_set_curriculum_access(text,uuid,text) from public,anon,authenticated;
grant execute on function public.app_topic_order(text), public.app_set_curriculum_access(text,uuid,text) to service_role;

create or replace function public.app_read_session(p_token_hash text) returns jsonb
language sql security definer set search_path = '' as $$
  select jsonb_build_object('user',jsonb_build_object('id',u.id,'email',u.email,'displayName',a.display_name,'role',a.role),'expiresAt',s.expires_at,
    'curriculumThrough',case when a.role='student' then a.curriculum_through end)
  from public.app_sessions s join public.app_accounts a on a.user_id=s.user_id join auth.users u on u.id=a.user_id
  where s.token_hash=p_token_hash and s.expires_at>statement_timestamp() and a.enabled and u.deleted_at is null
  and (u.banned_until is null or u.banned_until<=statement_timestamp());
$$;

create or replace function public.app_teacher_progress(p_token_hash text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
  target := public.app_lock_progress_session(p_token_hash);
  if target is null or not exists(select 1 from public.app_accounts where user_id=target and role='teacher') then return null; end if;
  return (select coalesce(jsonb_agg(row_data order by row_data->>'displayName',row_data->>'id'),'[]'::jsonb) from (
    select jsonb_build_object('id',a.user_id,'email',u.email,'displayName',a.display_name,'enabled',a.enabled,
      'curriculumThrough',a.curriculum_through,
      'completed',coalesce((select jsonb_agg(p.activity order by p.activity) from public.app_progress p where p.user_id=a.user_id),'[]'::jsonb),
      'lastActivity',(select max(p.completed_at) from public.app_progress p where p.user_id=a.user_id)) row_data
    from public.app_accounts a join auth.users u on u.id=a.user_id where a.role='student'
  ) roster);
end;
$$;

create or replace function public.app_complete_activity(p_token_hash text,p_activity text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
  target := public.app_lock_progress_session(p_token_hash);
  if target is null then return null; end if;
  if p_activity is null or p_activity !~ '^([1]\.(1[0-5]|[1-9])|2\.(1[0-2]|[1-9])|3\.[1-9]|4\.(1[0-7]|[1-9])):(learn|example|practice|quiz|code)$' then
    raise exception 'invalid activity';
  end if;
  if public.app_can_access_topic(target,split_part(p_activity,':',1)) is not true then
    return jsonb_build_object('ok',false,'code','curriculum_locked');
  end if;
  insert into public.app_progress(user_id,activity) values (target,p_activity) on conflict do nothing;
  return (select coalesce(jsonb_agg(activity order by activity),'[]'::jsonb) from public.app_progress where user_id=target);
end;
$$;

create or replace function public.app_read_extra_worksheet(p_token_hash text,p_id text,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; worksheet jsonb;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id then return null; end if;
 if public.app_worksheet_topic(p_id) is null then raise exception 'invalid worksheet'; end if;
 if public.app_can_access_topic(target,public.app_worksheet_topic(p_id)) is not true then
  return jsonb_build_object('ok',false,'code','curriculum_locked');
 end if;
 select jsonb_build_object('id',worksheet_id,'work',work,'completed',completed,'version',version,'updatedAt',updated_at)
 into worksheet from public.app_extra_worksheets where user_id=target and worksheet_id=p_id;
 return jsonb_build_object('ok',true,'worksheet',worksheet);
end;
$$;

create or replace function public.app_save_extra_worksheet(p_token_hash text,p_id text,p_version integer,p_work jsonb,p_completed boolean,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; current_version integer;
begin
 -- Serializes saves for this account, including first insert, and revalidates revocation
 -- under the same auth -> account -> session lock ordering as login/password reset.
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id then return null; end if;
 if p_version is null or p_version<0 or p_version>=2147483647 or not public.app_valid_extra_work(p_id,p_work,p_completed) then raise exception 'invalid worksheet'; end if;
 if public.app_can_access_topic(target,public.app_worksheet_topic(p_id)) is not true then
  return jsonb_build_object('ok',false,'code','curriculum_locked');
 end if;
 select version into current_version from public.app_extra_worksheets where user_id=target and worksheet_id=p_id for update;
 if coalesce(current_version,0)<>p_version then return jsonb_build_object('ok',false,'code','conflict'); end if;
 insert into public.app_extra_worksheets(user_id,worksheet_id,work,completed,version,updated_at)
 values(target,p_id,p_work,p_completed,p_version+1,statement_timestamp())
 on conflict(user_id,worksheet_id) do update set work=excluded.work,completed=excluded.completed,version=excluded.version,updated_at=excluded.updated_at;
 return public.app_read_extra_worksheet(p_token_hash,p_id,p_expected_user_id);
end;
$$;

create or replace function public.app_read_unit1_exam(p_token_hash text,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; attempt jsonb;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id
    or not exists(select 1 from public.app_accounts where user_id=target and role='student') then return null; end if;
 if public.app_can_access_topic(target,'1.15') is not true then
  return jsonb_build_object('ok',false,'code','curriculum_locked');
 end if;
 select jsonb_build_object('examId','unit-1','examVersion',exam_version,'version',version,'status',status,'locale',locale,
 'answers',answers,'startedAt',started_at,'updatedAt',updated_at,'submittedAt',submitted_at)
 into attempt from public.app_unit1_exams where user_id=target;
 return jsonb_build_object('ok',true,'attempt',attempt);
end;
$$;

create or replace function public.app_save_unit1_exam(p_token_hash text,p_expected_user_id uuid,p_version integer,p_answers jsonb,p_locale text,p_acknowledged boolean,p_submit boolean) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; current_row public.app_unit1_exams%rowtype;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id
    or not exists(select 1 from public.app_accounts where user_id=target and role='student') then return null; end if;
 if p_version is null or p_version<0 or p_version>=2147483647 or p_acknowledged is distinct from true
    or p_submit is null or p_locale is null or p_locale not in ('en','es') or not public.app_valid_unit1_exam_answers(p_answers)
    then raise exception 'invalid exam'; end if;
 if public.app_can_access_topic(target,'1.15') is not true then
  return jsonb_build_object('ok',false,'code','curriculum_locked');
 end if;
 select * into current_row from public.app_unit1_exams where user_id=target for update;
 if current_row.status='submitted' then
   return jsonb_build_object('ok',false,'code','submitted','attempt',public.app_read_unit1_exam(p_token_hash,p_expected_user_id)->'attempt');
 end if;
 if coalesce(current_row.version,0)<>p_version then return jsonb_build_object('ok',false,'code','conflict'); end if;
 insert into public.app_unit1_exams(user_id,answers,locale,acknowledged,status,version,submitted_at)
 values(target,p_answers,p_locale,true,case when p_submit then 'submitted' else 'draft' end,p_version+1,case when p_submit then statement_timestamp() else null end)
 on conflict(user_id) do update set answers=excluded.answers,locale=excluded.locale,status=excluded.status,version=excluded.version,
 submitted_at=excluded.submitted_at,updated_at=statement_timestamp();
 return public.app_read_unit1_exam(p_token_hash,p_expected_user_id);
end;
$$;

commit;
