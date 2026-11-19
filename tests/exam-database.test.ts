// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { beforeAll, beforeEach, afterAll, test, expect } from 'vitest';
import type { ExamAttempt, ExamSubmission } from '../src/features/exams/types';
import { emptyAnswers } from '../src/features/exams/metadata';
let db: PGlite;
const student = '00000000-0000-0000-0000-000000000001',
  other = '00000000-0000-0000-0000-000000000002',
  teacher = '00000000-0000-0000-0000-000000000003';
const token = 'a'.repeat(64),
  second = 'b'.repeat(64),
  teacherToken = 'c'.repeat(64);
async function scalar<T = unknown>(sql: string, params: unknown[] = []) {
  return (await db.query<{ v: T }>(`select ${sql} as v`, params)).rows[0].v;
}
const read = (hash = token, id = student) =>
  scalar<{ ok: boolean; attempt: ExamAttempt }>(
    'public.app_read_unit1_exam($1,$2)',
    [hash, id],
  );
const save = (
  version = 0,
  submit = false,
  answers = emptyAnswers(),
  hash = token,
  id = student,
) =>
  scalar<{ ok: boolean; code?: string; attempt: ExamAttempt }>(
    'public.app_save_unit1_exam($1,$2,$3,$4::jsonb,$5,true,$6)',
    [hash, id, version, JSON.stringify(answers), 'en', submit],
  );
beforeAll(async () => {
  db = new PGlite();
  await db.exec(
    'create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,email text,encrypted_password text,deleted_at timestamptz,banned_until timestamptz);',
  );
  for (const f of [
    '202611120001_managed_access.sql',
    '202611120002_teacher_progress.sql',
    '202611190003_unit_1_exam.sql',
  ])
    await db.exec(
      await readFile(
        new URL('../supabase/migrations/' + f, import.meta.url),
        'utf8',
      ),
    );
}, 30000);
beforeEach(async () => {
  await db.exec('reset role;truncate auth.users cascade;');
  for (const [id, name, role, hash] of [
    [student, 'Student', 'student', token],
    [other, 'Other', 'student', second],
    [teacher, 'Teacher', 'teacher', teacherToken],
  ]) {
    await db.query('insert into auth.users(id,email) values($1,$2)', [
      id,
      name + '@example.test',
    ]);
    await db.query(
      'insert into public.app_accounts(user_id,display_name,role) values($1,$2,$3)',
      [id, name, role],
    );
    await scalar('public.app_replace_session($1,$2,0)', [id, hash]);
  }
});
afterAll(async () => db?.close());
test('drafts persist by account, conflicts preserve work, and final submission is immutable', async () => {
  expect(await read()).toEqual({ ok: true, attempt: null });
  const answers = { ...emptyAnswers(), q1: 'B', q22code: 'my own code' };
  const first = await save(0, false, answers);
  expect(first.attempt).toMatchObject({
    version: 1,
    status: 'draft',
    answers,
    submittedAt: null,
  });
  expect((await read(second, other)).attempt).toBeNull();
  expect(await save(0, false, emptyAnswers())).toEqual({
    ok: false,
    code: 'conflict',
  });
  const submitted = await save(1, true, answers);
  expect(submitted.attempt).toMatchObject({
    version: 2,
    status: 'submitted',
    answers,
    startedAt: first.attempt.startedAt,
  });
  expect(submitted.attempt.submittedAt).toBeTruthy();
  expect((await save(2, false, emptyAnswers())).code).toBe('submitted');
  expect((await save(2, true, emptyAnswers())).code).toBe('submitted');
  expect((await read()).attempt).toEqual(submitted.attempt);
});
test('only teachers see submitted work, including its exact stored answers', async () => {
  await save();
  expect(
    await scalar('public.app_list_unit1_submissions($1,$2)', [
      teacherToken,
      teacher,
    ]),
  ).toEqual([]);
  expect(
    await scalar('public.app_get_unit1_submission($1,$2,$3)', [
      teacherToken,
      teacher,
      student,
    ]),
  ).toEqual({ ok: true, submission: null });
  const submitted = await save(1, true);
  expect(
    await scalar('public.app_list_unit1_submissions($1,$2)', [token, student]),
  ).toBeNull();
  expect(
    await scalar('public.app_get_unit1_submission($1,$2,$3)', [
      token,
      student,
      other,
    ]),
  ).toBeNull();
  const detail = await scalar<{ submission: ExamSubmission }>(
    'public.app_get_unit1_submission($1,$2,$3)',
    [teacherToken, teacher, student],
  );
  expect(detail.submission).toMatchObject({
    userId: student,
    displayName: 'Student',
    attempt: submitted.attempt,
  });
  expect(await read(teacherToken, teacher)).toBeNull();
  expect(
    await save(0, false, emptyAnswers(), teacherToken, teacher),
  ).toBeNull();
});
test('displaced sessions and old account assertions cannot read or write an exam', async () => {
  await save();
  expect(await read(token, other)).toBeNull();
  expect(await save(1, true, emptyAnswers(), token, other)).toBeNull();
  expect(
    await scalar('public.app_list_unit1_submissions($1,$2)', [
      teacherToken,
      student,
    ]),
  ).toBeNull();
  await scalar('public.app_replace_session($1,$2,0)', [
    student,
    'd'.repeat(64),
  ]);
  expect(await read()).toBeNull();
  expect(await save(1, true)).toBeNull();
});
test('database validates fixed answer fields, choices, limits, rules acknowledgement and roles', async () => {
  for (const body of [
    { ...emptyAnswers(), q1: 'E' },
    { ...emptyAnswers(), extra: 'x' },
    { ...emptyAnswers(), q16a: 'x'.repeat(8001) },
    { ...emptyAnswers(), q22code: 'x'.repeat(32001) },
  ])
    expect(
      await scalar('public.app_valid_unit1_exam_answers($1::jsonb)', [
        JSON.stringify(body),
      ]),
    ).toBe(false);
  expect(
    await scalar('public.app_valid_unit1_exam_answers($1::jsonb)', [
      JSON.stringify(emptyAnswers()),
    ]),
  ).toBe(true);
  await expect(
    scalar("public.app_save_unit1_exam($1,$2,0,$3::jsonb,'en',false,false)", [
      token,
      student,
      JSON.stringify(emptyAnswers()),
    ]),
  ).rejects.toThrow();
  for (const role of ['anon', 'authenticated']) {
    await db.exec('set role ' + role);
    await expect(
      db.query('select * from public.app_unit1_exams'),
    ).rejects.toThrow();
    await expect(read()).rejects.toThrow();
    await expect(save()).rejects.toThrow();
    await expect(
      scalar('public.app_list_unit1_submissions($1,$2)', [
        teacherToken,
        teacher,
      ]),
    ).rejects.toThrow();
    await db.exec('reset role');
  }
});
