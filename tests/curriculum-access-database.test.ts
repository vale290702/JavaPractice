// @vitest-environment node
import { readdir, readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { emptyAnswers } from '../src/features/exams/metadata';
import { activityTopics } from '../src/features/extra-practice/metadata';

const student = '00000000-0000-0000-0000-000000000001';
const teacher = '00000000-0000-0000-0000-000000000002';
const other = '00000000-0000-0000-0000-000000000003';
const studentToken = 'a'.repeat(64);
const teacherToken = 'b'.repeat(64);
const otherToken = 'c'.repeat(64);
const locked = { ok: false, code: 'curriculum_locked' };
let db: PGlite;

async function scalar(sql: string, params: unknown[] = []) {
  return (await db.query<{ value: unknown }>(`select ${sql} as value`, params))
    .rows[0].value;
}

const setAccess = (
  through: string | null,
  token = teacherToken,
  id = student,
) => scalar('public.app_set_curriculum_access($1,$2,$3)', [token, id, through]);
const complete = (activity: string, token = studentToken) =>
  scalar('public.app_complete_activity($1,$2)', [token, activity]);

beforeAll(async () => {
  db = new PGlite();
  await db.exec(`
    create role anon; create role authenticated; create role service_role;
    create schema auth;
    create table auth.users(id uuid primary key, email text, encrypted_password text,
      deleted_at timestamptz, banned_until timestamptz);
  `);
  const dir = new URL('../supabase/migrations/', import.meta.url);
  for (const file of (await readdir(dir))
    .filter((name) => name.endsWith('.sql'))
    .sort())
    await db.exec(await readFile(new URL(file, dir), 'utf8'));
  for (const [id, role, token] of [
    [student, 'student', studentToken],
    [teacher, 'teacher', teacherToken],
    [other, 'student', otherToken],
  ]) {
    await db.query('insert into auth.users(id,email) values($1,$2)', [
      id,
      `${id}@example.test`,
    ]);
    await db.query(
      'insert into public.app_accounts(user_id,display_name,role) values($1,$2,$3)',
      [id, id, role],
    );
    await scalar('public.app_replace_session($1,$2,0)', [id, token]);
  }
}, 30000);

afterAll(async () => db?.close());

test('only a teacher can change a student limit, and numeric topic order preserves prior progress', async () => {
  expect(await complete('2.10:learn')).toEqual(['2.10:learn']);
  expect(await setAccess('2.5', studentToken)).toBeNull();
  expect(await setAccess('2.5', teacherToken, teacher)).toEqual({
    ok: false,
    code: 'invalid_request',
  });
  expect(await setAccess('2.13')).toEqual({
    ok: false,
    code: 'invalid_request',
  });
  expect(await setAccess('2.5')).toEqual({
    ok: true,
    curriculumThrough: '2.5',
  });
  expect(
    await scalar('public.app_read_session($1)', [studentToken]),
  ).toMatchObject({ curriculumThrough: '2.5' });
  expect(
    await scalar('public.app_teacher_progress($1)', [teacherToken]),
  ).toContainEqual(
    expect.objectContaining({ id: student, curriculumThrough: '2.5' }),
  );
  expect(await complete('2.5:learn')).toEqual(['2.10:learn', '2.5:learn']);
  expect(await complete('2.6:learn')).toEqual(locked);
  expect(await complete('2.10:quiz')).toEqual(locked);
  expect(await complete('3.1:learn')).toEqual(locked);
  expect(await complete('3.1:learn', otherToken)).toEqual(['3.1:learn']);
  expect(await setAccess(null)).toEqual({ ok: true, curriculumThrough: null });
  expect(await complete('2.10:quiz')).toEqual([
    '2.10:learn',
    '2.10:quiz',
    '2.5:learn',
  ]);
});

test('locked worksheets and exams reject reads and writes until their topics are released', async () => {
  await setAccess('none');
  const worksheetRead = () =>
    scalar('public.app_read_extra_worksheet($1,$2,$3)', [
      studentToken,
      'c1-guided',
      student,
    ]);
  const worksheetSave = () =>
    scalar('public.app_save_extra_worksheet($1,$2,0,$3::jsonb,false,$4)', [
      studentToken,
      'c1-guided',
      JSON.stringify({
        prediction: '',
        trace: '',
        files: { 'Algorithm.txt': '' },
        results: '',
        explanation: '',
      }),
      student,
    ]);
  const examRead = () =>
    scalar('public.app_read_unit1_exam($1,$2)', [studentToken, student]);
  const examSave = () =>
    scalar('public.app_save_unit1_exam($1,$2,0,$3::jsonb,$4,true,false)', [
      studentToken,
      student,
      JSON.stringify(emptyAnswers()),
      'en',
    ]);
  expect(await complete('1.1:learn')).toEqual(locked);
  expect(await worksheetRead()).toEqual(locked);
  expect(await worksheetSave()).toEqual(locked);
  expect(await examRead()).toEqual(locked);
  expect(await examSave()).toEqual(locked);
  await setAccess('1.14');
  expect(await examRead()).toEqual(locked);
  await setAccess('1.15');
  expect(await examRead()).toEqual({ ok: true, attempt: null });
  await setAccess('2.1');
  expect(await worksheetRead()).toEqual({ ok: true, worksheet: null });
});

test('each worksheet is released at its assigned topic', async () => {
  for (const [id, topic] of Object.entries(activityTopics)) {
    expect(
      await scalar('public.app_worksheet_topic($1)', [`${id}-guided`]),
    ).toBe(topic);
    expect(
      await scalar('public.app_worksheet_topic($1)', [`${id}-independent`]),
    ).toBe(topic);
  }
});
