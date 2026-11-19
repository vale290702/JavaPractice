// @vitest-environment node
import { beforeEach, test, expect, vi } from 'vitest';
vi.mock('server-only', () => ({}));
vi.mock('next/headers', () => ({
  cookies: async () => ({ get: () => ({ value: 'x'.repeat(43) }) }),
}));
import { GET, POST } from '../src/app/api/exam/unit-1/route';
import { GET as PDF } from '../src/app/api/exam/unit-1/pdf/route';
import { GET as detail } from '../src/app/api/exam/unit-1/submissions/route';
import { emptyAnswers } from '../src/features/exams/metadata';
import { validExamAnswers } from '../src/features/exams/validation';
const aid = '00000000-0000-0000-0000-000000000001';
const fetcher = vi.fn();
beforeEach(() => {
  fetcher.mockReset();
  vi.stubGlobal('fetch', fetcher);
  vi.stubEnv('SUPABASE_URL', 'https://db.example');
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'secret');
  vi.stubEnv('APP_ORIGIN', undefined);
});
const headers = {
  'X-Account-ID': aid,
  Origin: 'https://app.example',
  'Content-Type': 'application/json',
};
const payload = {
  version: 0,
  answers: emptyAnswers(),
  locale: 'en',
  acknowledged: true,
  submit: false,
};
const req = (body: unknown = payload) =>
  new Request('https://app.example/api/exam/unit-1', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
test('fixed answer validation rejects unknown keys, invalid choices, overlong programs and malformed Unicode', () => {
  expect(validExamAnswers(emptyAnswers())).toBe(true);
  for (const bad of [
    { ...emptyAnswers(), q1: 'E' },
    { ...emptyAnswers(), q22code: 'x'.repeat(32001) },
    { ...emptyAnswers(), q16a: '\0' },
    { ...emptyAnswers(), q16a: '\ud800' },
    { ...emptyAnswers(), key: 'x' },
  ])
    expect(validExamAnswers(bad)).toBe(false);
});
test('reads require an account assertion and malformed saved data fails closed', async () => {
  expect(
    (await GET(new Request('https://app.example/api/exam/unit-1'))).status,
  ).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
  fetcher.mockResolvedValueOnce(
    Response.json({ ok: true, attempt: { answers: emptyAnswers() } }),
  );
  expect(
    (await GET(new Request('https://app.example/api/exam/unit-1', { headers })))
      .status,
  ).toBe(503);
});
test('cross-origin writes, acknowledgement failures and extra fields never reach the database', async () => {
  const cross = new Request('https://app.example/api/exam/unit-1', {
    method: 'POST',
    headers: { ...headers, Origin: 'https://evil.example' },
    body: JSON.stringify(payload),
  });
  expect((await POST(cross)).status).toBe(400);
  expect((await POST(req({ ...payload, acknowledged: false }))).status).toBe(
    400,
  );
  expect((await POST(req({ ...payload, extra: 'x' }))).status).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
});
test('conflicts and submitted state are explicit and requests disable caching', async () => {
  fetcher.mockResolvedValueOnce(Response.json({ ok: false, code: 'conflict' }));
  const response = await POST(req());
  expect(response.status).toBe(409);
  expect(await response.json()).toEqual({ code: 'conflict' });
  expect(response.headers.get('cache-control')).toContain('no-store');
});
test('student/ended sessions cannot retrieve teacher submissions or PDF and missing rows are not exported', async () => {
  fetcher.mockResolvedValueOnce(Response.json(null));
  expect(
    (
      await PDF(
        new Request('https://app.example/api/exam/unit-1/pdf?student=' + aid, {
          headers,
        }),
      )
    ).status,
  ).toBe(401);
  fetcher.mockResolvedValueOnce(Response.json(null));
  expect(
    (
      await detail(
        new Request(
          'https://app.example/api/exam/unit-1/submissions?student=' + aid,
          { headers },
        ),
      )
    ).status,
  ).toBe(401);
  fetcher.mockResolvedValueOnce(Response.json({ ok: true, submission: null }));
  expect(
    (
      await PDF(
        new Request('https://app.example/api/exam/unit-1/pdf?student=' + aid, {
          headers,
        }),
      )
    ).status,
  ).toBe(404);
});
