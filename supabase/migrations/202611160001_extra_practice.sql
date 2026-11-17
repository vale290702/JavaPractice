begin;
-- Fixed catalogue and payload validation are enforced again at the persistence boundary.
create function public.app_valid_extra_work(p_id text,p_work jsonb,p_completed boolean) returns boolean
language plpgsql immutable set search_path = '' as $$
declare names text[]; field text; item record;
begin
 if p_id is null or p_id !~ '^(a[1-6]|b[1-8])-(guided|independent)$' or p_completed is null
   or p_work is null or jsonb_typeof(p_work)<>'object' then return false; end if;
 if octet_length(p_work::text)>65536 or (select count(*) from jsonb_object_keys(p_work))<>5
   or not p_work ?& array['prediction','trace','files','results','explanation'] then return false; end if;
 foreach field in array array['prediction','trace','results','explanation'] loop
   if jsonb_typeof(p_work->field)<>'string' or length(p_work->>field)>8000
     or (p_completed and (p_work->>field) !~ '[^[:space:]]') then return false; end if;
 end loop;
 names := case split_part(p_id,'-',1) when 'a2' then array['Main.java','Debugging.txt'] when 'b5' then array['LogRunner.java'] when 'b6' then array['UnitRunner.java'] when 'b7' then array['HelloRunner.java'] when 'b8' then array['CalculatorRunner.java'] else array['Main.java'] end;
 if jsonb_typeof(p_work->'files')<>'object' then return false; end if;
 if (select count(*) from jsonb_object_keys(p_work->'files'))<>cardinality(names) or not (p_work->'files') ?& names then return false; end if;
 for item in select * from jsonb_each(p_work->'files') loop
   if jsonb_typeof(item.value)<>'string' or length(item.value#>>'{}')>32000
      or (p_completed and (item.value#>>'{}') !~ '[^[:space:]]') then return false; end if;
 end loop;
 -- jsonb text adds one separator space per key and per comma. With fixed
 -- shape, subtract exactly those separators to enforce the compact work budget.
 if octet_length(p_work::text)-(8+2*cardinality(names))>65024 then return false; end if;
 return true;
end;
$$;
create table public.app_extra_worksheets (
 user_id uuid not null references public.app_accounts(user_id) on delete cascade,
 worksheet_id text not null,
 work jsonb not null,
 completed boolean not null default false,
 version integer not null check(version>0),
 updated_at timestamptz not null default statement_timestamp(),
 primary key(user_id,worksheet_id),
 check(public.app_valid_extra_work(worksheet_id,work,completed))
);
alter table public.app_extra_worksheets enable row level security;
revoke all on public.app_extra_worksheets from public,anon,authenticated;
grant all on public.app_extra_worksheets to service_role;
create function public.app_read_extra_worksheet(p_token_hash text,p_id text,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; worksheet jsonb;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id then return null; end if;
 if p_id is null or p_id !~ '^(a[1-6]|b[1-8])-(guided|independent)$' then raise exception 'invalid worksheet'; end if;
 select jsonb_build_object('id',worksheet_id,'work',work,'completed',completed,'version',version,'updatedAt',updated_at)
 into worksheet from public.app_extra_worksheets where user_id=target and worksheet_id=p_id;
 return jsonb_build_object('ok',true,'worksheet',worksheet);
end;
$$;
create function public.app_save_extra_worksheet(p_token_hash text,p_id text,p_version integer,p_work jsonb,p_completed boolean,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; current_version integer;
begin
 -- Serializes saves for this account, including first insert, and revalidates revocation
 -- under the same auth -> account -> session lock ordering as login/password reset.
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id then return null; end if;
 if p_version is null or p_version<0 or p_version>=2147483647 or not public.app_valid_extra_work(p_id,p_work,p_completed) then raise exception 'invalid worksheet'; end if;
 select version into current_version from public.app_extra_worksheets where user_id=target and worksheet_id=p_id for update;
 if coalesce(current_version,0)<>p_version then return jsonb_build_object('ok',false,'code','conflict'); end if;
 insert into public.app_extra_worksheets(user_id,worksheet_id,work,completed,version,updated_at)
 values(target,p_id,p_work,p_completed,p_version+1,statement_timestamp())
 on conflict(user_id,worksheet_id) do update set work=excluded.work,completed=excluded.completed,version=excluded.version,updated_at=excluded.updated_at;
 return public.app_read_extra_worksheet(p_token_hash,p_id,p_expected_user_id);
end;
$$;
create function public.app_extra_teacher_progress(p_token_hash text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or not exists(select 1 from public.app_accounts where user_id=target and role='teacher') then return null; end if;
 return (select coalesce(jsonb_agg(row_data order by row_data->>'userId'),'[]'::jsonb) from (
 select jsonb_build_object('userId',a.user_id,
 'completed',coalesce((select jsonb_agg(w.worksheet_id order by w.worksheet_id) from public.app_extra_worksheets w where w.user_id=a.user_id and w.completed),'[]'::jsonb),
 'updatedAt',(select max(w.updated_at) from public.app_extra_worksheets w where w.user_id=a.user_id)) row_data
 from public.app_accounts a where a.role='student') roster);
end;
$$;
revoke all on function public.app_valid_extra_work(text,jsonb,boolean),public.app_read_extra_worksheet(text,text,uuid),public.app_save_extra_worksheet(text,text,integer,jsonb,boolean,uuid),public.app_extra_teacher_progress(text) from public,anon,authenticated;
grant execute on function public.app_valid_extra_work(text,jsonb,boolean),public.app_read_extra_worksheet(text,text,uuid),public.app_save_extra_worksheet(text,text,integer,jsonb,boolean,uuid),public.app_extra_teacher_progress(text) to service_role;
commit;
