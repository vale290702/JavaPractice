// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';
import { createHash } from 'node:crypto';
vi.mock('server-only', () => ({}));
const state = vi.hoisted(() => ({ token: undefined as string | undefined }));
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: () => (state.token ? { value: state.token } : undefined),
  }),
}));
import {
  getCurrentProgress,
  getTeacherProgress,
} from '../src/features/learning/server';
import { GET, POST } from '../src/app/api/progress/route';
const fetcher = vi.fn();
beforeEach(() => {
  state.token = 'x'.repeat(43);
  vi.stubEnv('SUPABASE_URL', 'https://project.example');
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'secret');
  vi.stubEnv('APP_ORIGIN', undefined);
  fetcher.mockReset();
  vi.stubGlobal('fetch', fetcher);
});
test('reads progress with only the opaque cookie digest and denies missing or revoked cookies', async () => {
  fetcher.mockResolvedValueOnce(Response.json(['1.1:learn']));
  expect(await getCurrentProgress()).toEqual(['1.1:learn']);
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({
    p_token_hash: createHash('sha256').update(state.token!).digest('hex'),
  });
  fetcher.mockResolvedValueOnce(Response.json(null));
  await expect(getCurrentProgress()).rejects.toMatchObject({
    code: 'invalid_credentials',
  });
  state.token = undefined;
  await expect(getCurrentProgress()).rejects.toMatchObject({
    code: 'invalid_credentials',
  });
});
test('teacher data fails closed when RPC denies role or returns malformed response', async () => {
  fetcher.mockResolvedValueOnce(Response.json(null));
  await expect(getTeacherProgress()).rejects.toMatchObject({
    code: 'invalid_credentials',
  });
  fetcher.mockResolvedValueOnce(Response.json([{ id: 'x' }]));
  await expect(getTeacherProgress()).rejects.toMatchObject({
    code: 'unavailable',
  });
});
test('progress API validates activity and origin and returns persisted completion', async () => {
  const request = (activity: string, origin = 'https://app.example') =>
    new Request('https://app.example/api/progress', {
      method: 'POST',
      headers: { origin, 'content-type': 'application/json' },
      body: JSON.stringify({ activity, userId: 'other' }),
    });
  expect((await POST(request('1.16:learn'))).status).toBe(400);
  expect(
    (await POST(request('1.1:learn', 'https://evil.example'))).status,
  ).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
  fetcher.mockResolvedValueOnce(Response.json(['1.1:learn']));
  const response = await POST(request('1.1:learn'));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ completed: ['1.1:learn'] });
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).not.toHaveProperty(
    'userId',
  );
  state.token = undefined;
  expect((await GET()).status).toBe(401);
});
