begin;
create function public.app_valid_unit1_exam_answers(p_answers jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare field text; value text;
begin
 if p_answers is null or jsonb_typeof(p_answers)<>'object' then return false; end if;
 if (select count(*) from jsonb_object_keys(p_answers))<>42 or not p_answers ?& array['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16a','q16b','q16c','q16d','q17output','q18a','q18b','q18c','q18d','q18e','q19a','q19b','q19c','q19d','q20a','q20b','q20c','q20d','q21a','q21b','q21c','q21d','q21e','q22code','q22output','q23code','q23output'] then return false; end if;
 if octet_length(p_answers::text)-83>258048 then return false; end if;
 foreach field in array array['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16a','q16b','q16c','q16d','q17output','q18a','q18b','q18c','q18d','q18e','q19a','q19b','q19c','q19d','q20a','q20b','q20c','q20d','q21a','q21b','q21c','q21d','q21e','q22code','q22output','q23code','q23output'] loop
  if jsonb_typeof(p_answers->field)<>'string' then return false; end if;
  value := p_answers->>field;
  if field ~ '^q([1-9]|1[0-5])$' then
   if value not in ('','A','B','C','D') then return false; end if;
  elsif field in ('q22code','q23code') then
   if length(value)>32000 then return false; end if;
  elsif length(value)>8000 then return false;
  end if;
 end loop;
 return true;
end;
$$;
create table public.app_unit1_exams (
 user_id uuid primary key references public.app_accounts(user_id) on delete cascade,
 exam_version text not null default 'unit-1-v1' check(exam_version='unit-1-v1'),
 answers jsonb not null check(public.app_valid_unit1_exam_answers(answers)),
 locale text not null check(locale in ('en','es')),
 acknowledged boolean not null check(acknowledged),
 status text not null check(status in ('draft','submitted')),
 version integer not null check(version>0),
 started_at timestamptz not null default statement_timestamp(),
 updated_at timestamptz not null default statement_timestamp(),
 submitted_at timestamptz,
 check((status='submitted')=(submitted_at is not null))
);
alter table public.app_unit1_exams enable row level security;
revoke all on public.app_unit1_exams from public,anon,authenticated;
grant all on public.app_unit1_exams to service_role;
create function public.app_read_unit1_exam(p_token_hash text,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; attempt jsonb;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id
    or not exists(select 1 from public.app_accounts where user_id=target and role='student') then return null; end if;
 select jsonb_build_object('examId','unit-1','examVersion',exam_version,'version',version,'status',status,'locale',locale,
 'answers',answers,'startedAt',started_at,'updatedAt',updated_at,'submittedAt',submitted_at)
 into attempt from public.app_unit1_exams where user_id=target;
 return jsonb_build_object('ok',true,'attempt',attempt);
end;
$$;
create function public.app_save_unit1_exam(p_token_hash text,p_expected_user_id uuid,p_version integer,p_answers jsonb,p_locale text,p_acknowledged boolean,p_submit boolean) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; current_row public.app_unit1_exams%rowtype;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id
    or not exists(select 1 from public.app_accounts where user_id=target and role='student') then return null; end if;
 if p_version is null or p_version<0 or p_version>=2147483647 or p_acknowledged is distinct from true
    or p_submit is null or p_locale is null or p_locale not in ('en','es') or not public.app_valid_unit1_exam_answers(p_answers)
    then raise exception 'invalid exam'; end if;
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
create function public.app_list_unit1_submissions(p_token_hash text,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id
    or not exists(select 1 from public.app_accounts where user_id=target and role='teacher') then return null; end if;
 return (select coalesce(jsonb_agg(jsonb_build_object('userId',e.user_id,'displayName',a.display_name,'email',u.email,
 'submittedAt',e.submitted_at,'examVersion',e.exam_version,'locale',e.locale) order by e.submitted_at desc),'[]'::jsonb)
 from public.app_unit1_exams e join public.app_accounts a on a.user_id=e.user_id join auth.users u on u.id=e.user_id where e.status='submitted');
end;
$$;
create function public.app_get_unit1_submission(p_token_hash text,p_expected_user_id uuid,p_student_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; submission jsonb;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id
    or not exists(select 1 from public.app_accounts where user_id=target and role='teacher') then return null; end if;
 select jsonb_build_object('userId',e.user_id,'displayName',a.display_name,'email',u.email,'submittedAt',e.submitted_at,'examVersion',e.exam_version,'locale',e.locale,
 'attempt',jsonb_build_object('examId','unit-1','examVersion',e.exam_version,'version',e.version,'status',e.status,'locale',e.locale,'answers',e.answers,'startedAt',e.started_at,'updatedAt',e.updated_at,'submittedAt',e.submitted_at))
 into submission from public.app_unit1_exams e join public.app_accounts a on a.user_id=e.user_id join auth.users u on u.id=e.user_id
 where e.user_id=p_student_id and e.status='submitted';
 return jsonb_build_object('ok',true,'submission',submission);
end;
$$;
revoke all on function public.app_valid_unit1_exam_answers(jsonb),public.app_read_unit1_exam(text,uuid),public.app_save_unit1_exam(text,uuid,integer,jsonb,text,boolean,boolean),public.app_list_unit1_submissions(text,uuid),public.app_get_unit1_submission(text,uuid,uuid) from public,anon,authenticated;
grant execute on function public.app_valid_unit1_exam_answers(jsonb),public.app_read_unit1_exam(text,uuid),public.app_save_unit1_exam(text,uuid,integer,jsonb,text,boolean,boolean),public.app_list_unit1_submissions(text,uuid),public.app_get_unit1_submission(text,uuid,uuid) to service_role;
commit;
