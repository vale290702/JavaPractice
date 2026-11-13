// @vitest-environment node
// Executes actual migration SQL; single-connection PGlite cannot prove concurrent claims.
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { afterAll, beforeAll, beforeEach, expect, test } from 'vitest';
import type { AppSession } from '../src/features/auth/types';
let db: PGlite;
const a = '00000000-0000-0000-0000-000000000001';
const b = '00000000-0000-0000-0000-000000000002';
const oldHash = 'a'.repeat(64),
  newHash = 'b'.repeat(64),
  otherHash = 'c'.repeat(64);
async function scalar<T>(sql: string, params: unknown[] = []): Promise<T> {
  const result = await db.query<{ value: T }>(`select ${sql} as value`, params);
  return result.rows[0].value;
}
const claim = (user: string, hash: string, version = 0) =>
  scalar<AppSession | null>(
    'public.app_replace_session($1::uuid,$2,$3::bigint)',
    [user, hash, version],
  );
const read = (hash: string) =>
  scalar<AppSession | null>('public.app_read_session($1)', [hash]);
beforeAll(async () => {
  db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role;
 create schema auth;
 create table auth.users(id uuid primary key,email text,encrypted_password text,deleted_at timestamptz,banned_until timestamptz);`);
  await db.exec(
    await readFile(
      new URL(
        '../supabase/migrations/202611120001_managed_access.sql',
        import.meta.url,
      ),
      'utf8',
    ),
  );
}, 30000);
beforeEach(async () => {
  await db.exec(
    'reset role; truncate auth.users cascade; truncate public.app_login_limits;',
  );
  await db.query(
    'insert into auth.users(id,email,encrypted_password) values ($1,$2,$3),($4,$5,$6)',
    [a, 'a@example.com', 'hash-a', b, 'b@example.com', 'hash-b'],
  );
  await db.query(
    'insert into public.app_accounts(user_id,display_name) values ($1,$2),($3,$4)',
    [a, 'Student A', b, 'Student B'],
  );
});
afterAll(async () => {
  await db?.close();
});
test('replacement leaves one authoritative session and stale logout preserves it', async () => {
  expect((await claim(a, oldHash))?.user).toEqual({
    id: a,
    email: 'a@example.com',
    displayName: 'Student A',
  });
  const replacement = await claim(a, newHash);
  expect(replacement).not.toBeNull();
  expect(
    await scalar<number>('(select count(*)::integer from public.app_sessions)'),
  ).toBe(1);
  expect(await read(oldHash)).toBeNull();
  expect(await read(newHash)).toEqual(replacement);
  await scalar('public.app_revoke_session($1)', [oldHash]);
  expect(await read(newHash)).toEqual(replacement);
  const expires = new Date(replacement!.expiresAt).getTime();
  expect(expires - Date.now()).toBeGreaterThan(43100000);
  expect(expires - Date.now()).toBeLessThanOrEqual(43200000);
});
test('different accounts retain independent sessions', async () => {
  await claim(a, oldHash);
  await claim(b, otherHash);
  await claim(a, newHash);
  expect((await read(otherHash))?.user.id).toBe(b);
  expect((await read(newHash))?.user.id).toBe(a);
  expect(
    await scalar<number>('(select count(*)::integer from public.app_sessions)'),
  ).toBe(2);
});
test('expired sessions cannot be read', async () => {
  await claim(a, oldHash);
  await db.query(
    "update public.app_sessions set expires_at=statement_timestamp()-interval '1 second' where user_id=$1",
    [a],
  );
  expect(await read(oldHash)).toBeNull();
});
test.each(['disabled', 'banned', 'deleted'])(
  '%s account cannot read or replace a session',
  async (state) => {
    await claim(a, oldHash);
    if (state === 'disabled')
      await db.query(
        'update public.app_accounts set enabled=false where user_id=$1',
        [a],
      );
    else
      await db.query(
        `update auth.users set ${state === 'banned' ? 'banned_until' : 'deleted_at'}=statement_timestamp()+interval '1 day' where id=$1`,
        [a],
      );
    expect(await read(oldHash)).toBeNull();
    expect(await claim(a, newHash)).toBeNull();
    expect(
      await scalar('public.app_get_login_version($1)', ['a@example.com']),
    ).toBeNull();
  },
);
test('password mutation rotates version, revokes session and rejects pre-reset claims', async () => {
  expect(
    await scalar('public.app_get_login_version($1)', ['A@example.com']),
  ).toEqual({ userId: a, version: 0 });
  await claim(a, oldHash);
  await db.query('update auth.users set encrypted_password=$1 where id=$2', [
    'new-hash',
    a,
  ]);
  expect(await read(oldHash)).toBeNull();
  expect(await claim(a, newHash, 0)).toBeNull();
  expect(
    await scalar('public.app_get_login_version($1)', ['a@example.com']),
  ).toEqual({ userId: a, version: 1 });
  expect(await claim(a, newHash, 1)).not.toBeNull();
  await db.query(
    'update auth.users set encrypted_password=encrypted_password where id=$1',
    [a],
  );
  expect(await read(newHash)).not.toBeNull();
});
test.each(['anon', 'authenticated'])(
  '%s cannot access application tables or RPCs',
  async (role) => {
    await db.exec(`set role ${role}`);
    try {
      for (const table of ['app_accounts', 'app_sessions', 'app_login_limits'])
        await expect(db.query(`select * from public.${table}`)).rejects.toThrow(
          /permission denied/,
        );
      for (const [sql, params] of [
        ['public.app_read_session($1)', [oldHash]],
        ['public.app_replace_session($1::uuid,$2,$3::bigint)', [a, oldHash, 0]],
        ['public.app_get_login_version($1)', ['a@example.com']],
        ['public.app_revoke_session($1)', [oldHash]],
        ['public.app_check_login_limit($1,$2::integer)', [oldHash, 8]],
      ] as [string, unknown[]][])
        await expect(scalar(sql, params)).rejects.toThrow(/permission denied/);
    } finally {
      await db.exec('reset role');
    }
  },
);
test('service role can execute permitted session RPCs', async () => {
  await db.exec('set role service_role');
  try {
    expect(await claim(a, oldHash)).not.toBeNull();
    expect((await read(oldHash))?.user.id).toBe(a);
  } finally {
    await db.exec('reset role');
  }
});
test('rate window allows eight attempts, blocks ninth, and resets after fifteen minutes', async () => {
  for (let i = 0; i < 8; i++)
    expect(await scalar('public.app_check_login_limit($1,8)', [oldHash])).toBe(
      true,
    );
  expect(await scalar('public.app_check_login_limit($1,8)', [oldHash])).toBe(
    false,
  );
  await db.query(
    "update public.app_login_limits set window_start=statement_timestamp()-interval '16 minutes' where key_hash=$1",
    [oldHash],
  );
  expect(await scalar('public.app_check_login_limit($1,8)', [oldHash])).toBe(
    true,
  );
});
