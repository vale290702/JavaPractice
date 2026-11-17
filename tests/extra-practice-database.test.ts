// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import type {
  SavedWorksheet,
  ExtraStudentProgress,
} from '../src/features/extra-practice/types';
import { beforeAll, beforeEach, afterAll, test, expect } from 'vitest';
let db: PGlite;
const a = '00000000-0000-0000-0000-000000000001',
  b = '00000000-0000-0000-0000-000000000002',
  hash = 'a'.repeat(64),
  other = 'b'.repeat(64);
const work = {
  prediction: 'p',
  trace: 't',
  files: { 'Main.java': 'class Main {}' },
  results: 'r',
  explanation: 'e',
};
async function scalar<T = { worksheet: SavedWorksheet }>(
  sql: string,
  params: unknown[] = [],
) {
  return (await db.query<{ value: T }>(`select ${sql} as value`, params))
    .rows[0].value;
}
const read = (token = hash) =>
  scalar('public.app_read_extra_worksheet($1,$2,$3)', [
    token,
    'a1-guided',
    token === other ? b : a,
  ]);
const save = (
  version = 0,
  body: unknown = work,
  id = 'a1-guided',
  token = hash,
) =>
  scalar('public.app_save_extra_worksheet($1,$2,$3,$4::jsonb,true,$5)', [
    token,
    id,
    version,
    JSON.stringify(body),
    token === other ? b : a,
  ]);
beforeAll(async () => {
  db = new PGlite();
  await db.exec(
    'create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,email text,encrypted_password text,deleted_at timestamptz,banned_until timestamptz);',
  );
  for (const file of [
    '202611120001_managed_access.sql',
    '202611120002_teacher_progress.sql',
    '202611160001_extra_practice.sql',
  ])
    await db.exec(
      await readFile(
        new URL('../supabase/migrations/' + file, import.meta.url),
        'utf8',
      ),
    );
}, 30000);
beforeEach(async () => {
  await db.exec('reset role;truncate auth.users cascade;');
  await db.query(
    "insert into auth.users(id,email) values ($1,'a@example.com'),($2,'b@example.com')",
    [a, b],
  );
  await db.query(
    "insert into public.app_accounts(user_id,display_name) values ($1,'A'),($2,'B')",
    [a, b],
  );
  await scalar('public.app_replace_session($1,$2,0)', [a, hash]);
  await scalar('public.app_replace_session($1,$2,0)', [b, other]);
});
afterAll(async () => {
  await db?.close();
});
test('missing row, isolated persistence, CAS and student self-reported completion', async () => {
  expect(await read()).toEqual({ ok: true, worksheet: null });
  expect((await save()).worksheet).toMatchObject({
    id: 'a1-guided',
    version: 1,
    completed: true,
    work,
  });
  expect(await read(other)).toEqual({ ok: true, worksheet: null });
  expect(await save()).toEqual({ ok: false, code: 'conflict' });
  expect((await save(1)).worksheet.version).toBe(2);
});
test.each(['stale', 'disabled', 'banned', 'password'])(
  'rejects %s sessions for reads and writes',
  async (state) => {
    await save();
    if (state === 'stale')
      await scalar('public.app_replace_session($1,$2,0)', [a, 'c'.repeat(64)]);
    if (state === 'disabled')
      await db.query(
        'update public.app_accounts set enabled=false where user_id=$1',
        [a],
      );
    if (state === 'banned')
      await db.query(
        "update auth.users set banned_until=now()+interval '1 day' where id=$1",
        [a],
      );
    if (state === 'password')
      await db.query(
        "update auth.users set encrypted_password='changed' where id=$1",
        [a],
      );
    expect(await read()).toBeNull();
    expect(await save(1)).toBeNull();
  },
);
test('database independently rejects invalid IDs, shape, completion and oversized notes', async () => {
  for (const [id, body] of [
    ['bad', work],
    ['a2-guided', work],
    ['a1-guided', { ...work, extra: 1 }],
    ['a1-guided', { ...work, prediction: '' }],
    ['a1-guided', { ...work, files: { '../Main.java': 'x' } }],
    ['a1-guided', { ...work, trace: 'x'.repeat(8001) }],
  ] as [string, unknown][])
    await expect(save(0, body, id)).rejects.toThrow();
});
test('teacher-only summary includes students with zero completions and excludes work', async () => {
  expect(
    await scalar<ExtraStudentProgress[]>(
      'public.app_extra_teacher_progress($1)',
      [hash],
    ),
  ).toBeNull();
  await db.query(
    "update public.app_accounts set role='teacher' where user_id=$1",
    [a],
  );
  const rows = await scalar<ExtraStudentProgress[]>(
    'public.app_extra_teacher_progress($1)',
    [hash],
  );
  expect(rows).toEqual([{ userId: b, completed: [], updatedAt: null }]);
  await save(0, work, 'a1-guided', other);
  expect(
    (
      await scalar<ExtraStudentProgress[]>(
        'public.app_extra_teacher_progress($1)',
        [hash],
      )
    )[0],
  ).toMatchObject({ userId: b, completed: ['a1-guided'] });
});
test('anon and authenticated cannot use table or RPC; service may call RPC', async () => {
  for (const role of ['anon', 'authenticated']) {
    await db.exec('set role ' + role);
    await expect(
      db.query('select * from public.app_extra_worksheets'),
    ).rejects.toThrow();
    await expect(read()).rejects.toThrow();
    await db.exec('reset role');
  }
  await db.exec('set role service_role');
  expect(await read()).toEqual({ ok: true, worksheet: null });
});

test('old account UI cannot read or write new cookie account', async () => {
  await save(0, work, 'a1-guided', other);
  expect(
    await scalar('public.app_read_extra_worksheet($1,$2,$3)', [
      other,
      'a1-guided',
      a,
    ]),
  ).toBeNull();
  expect(
    await scalar('public.app_save_extra_worksheet($1,$2,1,$3::jsonb,true,$4)', [
      other,
      'a1-guided',
      JSON.stringify({ ...work, prediction: 'overwritten' }),
      a,
    ]),
  ).toBeNull();
  expect((await read(other)).worksheet).toMatchObject({ version: 1, work });
});
test('database compact byte budget agrees with client boundary', async () => {
  const base = { ...work, files: { 'Main.java': 'é'.repeat(32000) } };
  const overhead = new TextEncoder().encode(JSON.stringify(base)).length;
  const atLimit = { ...base, prediction: 'p' + 'x'.repeat(65024 - overhead) };
  expect((await save(0, atLimit)).worksheet.version).toBe(1);
  await expect(
    save(1, { ...atLimit, prediction: atLimit.prediction + 'x' }),
  ).rejects.toThrow();
});
