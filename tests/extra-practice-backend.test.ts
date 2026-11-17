// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';
vi.mock('server-only', () => ({}));
const state = vi.hoisted(() => ({
  token: 'x'.repeat(43) as string | undefined,
}));
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: () => (state.token ? { value: state.token } : undefined),
  }),
}));
import { GET, POST } from '../src/app/api/extra-practice/route';
import { validWork } from '../src/features/extra-practice/validation';
const accountId = '00000000-0000-0000-0000-000000000001';
const work = {
  prediction: 'p',
  trace: 't',
  files: { 'Main.java': 'class Main {}' },
  results: 'r',
  explanation: 'e',
};
const fetcher = vi.fn();
beforeEach(() => {
  state.token = 'x'.repeat(43);
  fetcher.mockReset();
  vi.stubGlobal('fetch', fetcher);
  vi.stubEnv('SUPABASE_URL', 'https://db.example');
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'secret');
  vi.stubEnv('APP_ORIGIN', undefined);
});
const post = (body: unknown, origin = 'https://app.example') =>
  POST(
    new Request('https://app.example/api/extra-practice', {
      method: 'POST',
      headers: {
        origin,
        'content-type': 'application/json',
        'X-Account-ID': accountId,
      },
      body: JSON.stringify(body),
    }),
  );
test('validates exact fields, file names, bounds and completion', () => {
  expect(validWork('a1-guided', work, true)).toBe(true);
  for (const bad of [
    { ...work, extra: 1 },
    { ...work, files: { '../Main.java': 'x' } },
    { ...work, prediction: 'x'.repeat(8001) },
    { ...work, trace: '' },
    { ...work, files: { 'Main.java': '' } },
  ])
    expect(validWork('a1-guided', bad, true)).toBe(false);
  expect(validWork('a2-guided', work, false)).toBe(false);
  expect(validWork('a1-guided', { ...work, trace: '' }, false)).toBe(true);
});
test('distinguishes missing worksheet and revoked session', async () => {
  fetcher.mockResolvedValueOnce(Response.json({ ok: true, worksheet: null }));
  expect(
    await (
      await GET(
        new Request('https://app.example/api/extra-practice?id=a1-guided', {
          headers: { 'X-Account-ID': accountId },
        }),
      )
    ).json(),
  ).toEqual({ worksheet: null });
  fetcher.mockResolvedValueOnce(Response.json(null));
  expect(
    (
      await GET(
        new Request('https://app.example/api/extra-practice?id=a1-guided', {
          headers: { 'X-Account-ID': accountId },
        }),
      )
    ).status,
  ).toBe(401);
});
test('rejects foreign origin, client identity, invalid IDs and oversized bytes before RPC', async () => {
  for (const body of [
    { id: 'bad', version: 0, work, completed: false },
    { id: 'a1-guided', version: 0, work, completed: false, userId: 'other' },
    {
      id: 'a1-guided',
      version: 0,
      work: { ...work, prediction: 'x'.repeat(66000) },
      completed: false,
    },
  ])
    expect((await post(body)).status).toBe(400);
  expect(
    (
      await post(
        { id: 'a1-guided', version: 0, work, completed: false },
        'https://evil.example',
      )
    ).status,
  ).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
});
test('returns conflict and persists only session digest and validated work', async () => {
  fetcher.mockResolvedValueOnce(Response.json({ ok: false, code: 'conflict' }));
  const response = await post({
    id: 'a1-guided',
    version: 0,
    work,
    completed: false,
  });
  expect(response.status).toBe(409);
  expect(await response.json()).toEqual({ code: 'conflict' });
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).toMatchObject({
    p_expected_user_id: accountId,
    p_id: 'a1-guided',
    p_version: 0,
    p_work: work,
    p_completed: false,
  });
});

test('requires valid identity assertion and propagates account mismatch as 401', async () => {
  expect(
    (
      await GET(
        new Request('https://app.example/api/extra-practice?id=a1-guided'),
      )
    ).status,
  ).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
  fetcher.mockResolvedValueOnce(Response.json(null));
  expect(
    (await post({ id: 'a1-guided', version: 0, work, completed: false }))
      .status,
  ).toBe(401);
});
test('enforces compact work byte budget independently of code character cap', () => {
  const base = { ...work, files: { 'Main.java': 'é'.repeat(32000) } };
  const overhead = new TextEncoder().encode(JSON.stringify(base)).length;
  const atLimit = { ...base, prediction: 'p' + 'x'.repeat(65024 - overhead) };
  expect(validWork('a1-guided', atLimit, true)).toBe(true);
  expect(
    validWork(
      'a1-guided',
      { ...atLimit, prediction: atLimit.prediction + 'x' },
      true,
    ),
  ).toBe(false);
});
