begin;
-- Extend the fixed worksheet catalogue; existing rows, RPC signatures and grants are preserved.
create or replace function public.app_valid_extra_work(p_id text,p_work jsonb,p_completed boolean) returns boolean
language plpgsql immutable set search_path = '' as $$
declare names text[]; field text; item record;
begin
 if p_id is null or p_id !~ '^(a[1-6]|b[1-8]|c[1-9])-(guided|independent)$' or p_completed is null
   or p_work is null or jsonb_typeof(p_work)<>'object' then return false; end if;
 if octet_length(p_work::text)>65536 or (select count(*) from jsonb_object_keys(p_work))<>5
   or not p_work ?& array['prediction','trace','files','results','explanation'] then return false; end if;
 foreach field in array array['prediction','trace','results','explanation'] loop
   if jsonb_typeof(p_work->field)<>'string' or length(p_work->>field)>8000
     or (p_completed and (p_work->>field) !~ '[^[:space:]]') then return false; end if;
 end loop;
 names := case split_part(p_id,'-',1) when 'a2' then array['Main.java','Debugging.txt'] when 'b5' then array['LogRunner.java'] when 'b6' then array['UnitRunner.java'] when 'b7' then array['HelloRunner.java'] when 'b8' then array['CalculatorRunner.java'] when 'c1' then array[case when p_id like '%-guided' then 'Algorithm.txt' else 'Algorithm.txt' end] when 'c2' then array[case when p_id like '%-guided' then 'Goals.java' else 'ReadingGoal.java' end] when 'c3' then array[case when p_id like '%-guided' then 'Bill.java' else 'ParkingFee.java' end] when 'c4' then array[case when p_id like '%-guided' then 'DrinkOrder.java' else 'DeliveryOrder.java' end] when 'c5' then array[case when p_id like '%-guided' then 'SmoothieRunner.java' else 'PrintMode.java' end] when 'c6' then array[case when p_id like '%-guided' then 'TemperatureClassifier.java' else 'BatteryStatus.java' end] when 'c7' then array[case when p_id like '%-guided' then 'TheaterDiscounts.java' else 'LibraryAccess.java' end] when 'c8' then array[case when p_id like '%-guided' then 'Salmon.java' else 'SchoolTerm.java' end] when 'c9' then array[case when p_id like '%-guided' then 'FindMedian.java' else 'MiddleReading.java' end] else array['Main.java'] end;
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
create or replace function public.app_read_extra_worksheet(p_token_hash text,p_id text,p_expected_user_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target uuid; worksheet jsonb;
begin
 target := public.app_lock_progress_session(p_token_hash);
 if target is null or p_expected_user_id is null or target<>p_expected_user_id then return null; end if;
 if p_id is null or p_id !~ '^(a[1-6]|b[1-8]|c[1-9])-(guided|independent)$' then raise exception 'invalid worksheet'; end if;
 select jsonb_build_object('id',worksheet_id,'work',work,'completed',completed,'version',version,'updatedAt',updated_at)
 into worksheet from public.app_extra_worksheets where user_id=target and worksheet_id=p_id;
 return jsonb_build_object('ok',true,'worksheet',worksheet);
end;
$$;
commit;
