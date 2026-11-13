// @vitest-environment node
import { beforeEach, expect, test, vi } from 'vitest';
import { createHash } from 'node:crypto';
vi.mock('server-only', () => ({}));
const cookieState = vi.hoisted(() => ({
  token: undefined as string | undefined,
}));
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: () => (cookieState.token ? { value: cookieState.token } : undefined),
  }),
}));
import {
  login,
  readSession,
  revokeSession,
  AuthError,
} from '../src/features/auth/server';
import { POST } from '../src/app/api/auth/login/route';
import { POST as logout } from '../src/app/api/auth/logout/route';
import { GET as getSession } from '../src/app/api/auth/session/route';
const session = {
  user: { role: 'student', id: 'a', email: 'a@example.com', displayName: 'A' },
  expiresAt: new Date(Date.now() + 43200000).toISOString(),
};
let active: string | null;
let approved: boolean;
let version: number;
let resetOnVerify: boolean;
let fetcher: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.stubEnv('APP_ORIGIN', undefined);
  vi.stubEnv('SUPABASE_URL', 'https://project.example');
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'service-secret');
  active = null;
  approved = true;
  version = 0;
  resetOnVerify = false;
  cookieState.token = undefined;
  fetcher = vi.fn(async (input: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body ?? '{}'));
    if (input.includes('app_get_login_version'))
      return Response.json(approved ? { userId: 'a', version } : null);
    if (input.includes('/token?')) {
      if (resetOnVerify) version++;
      return Response.json({
        user: { id: 'a' },
        access_token: 'provider-secret',
        refresh_token: 'refresh-secret',
      });
    }
    if (input.includes('/logout')) return new Response(null, { status: 204 });
    if (input.includes('app_check_login_limit')) return Response.json(true);
    if (input.includes('app_replace_session')) {
      if (!approved || body.p_credential_version !== version)
        return Response.json(null);
      active = body.p_token_hash;
      return Response.json(session);
    }
    if (input.includes('app_read_session'))
      return Response.json(active === body.p_token_hash ? session : null);
    if (input.includes('app_revoke_session')) {
      if (active === body.p_token_hash) active = null;
      return Response.json(null);
    }
    throw Error('unexpected endpoint');
  });
  vi.stubGlobal('fetch', fetcher);
});
test('login returns opaque token while only its hash reaches registry', async () => {
  const result = await login('A@example.com', 'long-password');
  expect(result.token).toMatch(/^[\w-]{43}$/);
  expect(active).toBe(createHash('sha256').update(result.token).digest('hex'));
  expect(result.session).toEqual(session);
  expect(JSON.stringify(result.session)).not.toContain('secret');
});
test('concurrent replacements retain only latest and stale logout cannot revoke it', async () => {
  const [a, b] = await Promise.all([
    login('a@example.com', 'password'),
    login('a@example.com', 'password'),
  ]);
  expect(await readSession(a.token)).toBeNull();
  expect(await readSession(b.token)).toEqual(session);
  await revokeSession(a.token);
  expect(await readSession(b.token)).toEqual(session);
});
test('unapproved or disabled account cannot create session', async () => {
  approved = false;
  await expect(login('a@example.com', 'password')).rejects.toMatchObject({
    code: 'invalid_credentials',
  });
});
test('credentials fail generically and storage fails closed', async () => {
  fetcher
    .mockResolvedValueOnce(Response.json(true))
    .mockResolvedValueOnce(Response.json({ userId: 'a', version: 0 }))
    .mockResolvedValueOnce(
      Response.json({ error: 'details' }, { status: 400 }),
    );
  await expect(login('a@example.com', 'password')).rejects.toMatchObject({
    code: 'invalid_credentials',
  });
  fetcher.mockRejectedValueOnce(Error('network secret'));
  await expect(readSession('x'.repeat(43))).rejects.toBeInstanceOf(AuthError);
});
test('invalid or expired session is rejected', async () => {
  expect(await readSession('bad')).toBeNull();
  active = createHash('sha256').update('x'.repeat(43)).digest('hex');
  fetcher.mockResolvedValueOnce(
    Response.json({ ...session, expiresAt: '2020-01-01T00:00:00Z' }),
  );
  expect(await readSession('x'.repeat(43))).toBeNull();
});
test('throttling blocks credential checks', async () => {
  fetcher.mockResolvedValueOnce(Response.json(false));
  await expect(login('a@example.com', 'password')).rejects.toMatchObject({
    code: 'rate_limited',
  });
  expect(fetcher).toHaveBeenCalledTimes(1);
});
test('route rejects cross origin and malformed input before provider calls', async () => {
  for (const [origin, body] of [
    [
      'https://evil.example',
      JSON.stringify({ email: 'a@example.com', password: 'password' }),
    ],
    ['https://app.example', 'bad'],
    [
      'https://app.example',
      JSON.stringify({ email: 'invalid', password: 'x' }),
    ],
  ]) {
    const response = await POST(
      new Request('https://app.example/api/auth/login', {
        method: 'POST',
        headers: { origin, 'content-type': 'application/json' },
        body,
      }),
    );
    expect(response.status).toBe(400);
    expect(response.headers.get('cache-control')).toContain('no-store');
  }
  expect(fetcher).not.toHaveBeenCalled();
});
test('successful route sets bounded opaque HttpOnly cookie and keeps token out of body', async () => {
  const response = await POST(
    new Request('https://app.example/api/auth/login', {
      method: 'POST',
      headers: {
        origin: 'https://app.example',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email: 'a@example.com', password: 'password' }),
    }),
  );
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true });
  const cookie = response.headers.get('set-cookie')!;
  expect(cookie).toMatch(/jp_session=[\w-]{43};/);
  expect(cookie).toContain('HttpOnly');
  expect(cookie).toContain('SameSite=lax');
  expect(cookie).toContain('Max-Age=43200');
});
test('provider tokens never become a registry digest or browser token', async () => {
  const { token } = await login('a@example.com', 'password');
  expect(token).not.toContain('provider');
  const calls = fetcher.mock.calls as unknown as [string, RequestInit][];
  const registry = calls
    .filter(([url]) => url.includes('/rest/'))
    .map(([, init]) => String(init.body))
    .join('');
  expect(registry).not.toContain('provider-secret');
  expect(registry).not.toContain('refresh-secret');
  expect(registry).not.toContain('password');
});
test('service failure returns only unavailable and never issues cookie', async () => {
  fetcher.mockRejectedValueOnce(Error('service-secret'));
  const response = await POST(
    new Request('https://app.example/api/auth/login', {
      method: 'POST',
      headers: {
        origin: 'https://app.example',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email: 'a@example.com', password: 'password' }),
    }),
  );
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ code: 'unavailable' });
  expect(response.headers.get('set-cookie')).toBeNull();
});
test('oversized streaming body is rejected before credential check', async () => {
  const response = await POST(
    new Request('https://app.example/api/auth/login', {
      method: 'POST',
      headers: {
        origin: 'https://app.example',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'a@example.com',
        password: 'x'.repeat(9000),
      }),
    }),
  );
  expect(response.status).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
});
test('JSON-like media types are rejected', async () => {
  const response = await POST(
    new Request('https://app.example/api/auth/login', {
      method: 'POST',
      headers: {
        origin: 'https://app.example',
        'content-type': 'application/jsonp',
      },
      body: JSON.stringify({ email: 'a@example.com', password: 'password' }),
    }),
  );
  expect(response.status).toBe(400);
  expect(fetcher).not.toHaveBeenCalled();
});

test('session endpoint denies missing cookie without storage and fails closed on outage', async () => {
  expect((await getSession()).status).toBe(401);
  expect(fetcher).not.toHaveBeenCalled();
  cookieState.token = 'x'.repeat(43);
  fetcher.mockRejectedValueOnce(Error('secret'));
  const response = await getSession();
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ code: 'unavailable' });
});
test('stale-browser logout clears cookie while leaving replacement authorized', async () => {
  const a = await login('a@example.com', 'password');
  const b = await login('a@example.com', 'password');
  cookieState.token = a.token;
  const response = await logout(
    new Request('https://app.example/api/auth/logout', {
      method: 'POST',
      headers: { origin: 'https://app.example' },
    }),
  );
  expect(response.status).toBe(200);
  expect(response.headers.get('set-cookie')).toContain('Max-Age=0');
  expect(await readSession(b.token)).toEqual(session);
});

test('password reset during verification rejects stale credential claim', async () => {
  resetOnVerify = true;
  await expect(login('a@example.com', 'password')).rejects.toMatchObject({
    code: 'invalid_credentials',
  });
  expect(active).toBeNull();
});

test('configured public origin permits internal request URL and rejects foreign origin', async () => {
  vi.stubEnv('APP_ORIGIN', 'https://public.example');
  const origins: [string, number][] = [
    ['https://public.example', 200],
    ['https://foreign.example', 400],
  ];
  for (const [origin, status] of origins) {
    const response = await POST(
      new Request('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          origin,
          'content-type': 'application/json',
          'x-forwarded-host': 'foreign.example',
        },
        body: JSON.stringify({ email: 'a@example.com', password: 'password' }),
      }),
    );
    expect(response.status).toBe(status);
  }
});
test.each([
  'invalid',
  '',
  'https://public.example/path',
  'https://user:pass@public.example',
  'file:///tmp',
])('invalid canonical origin fails closed: %s', async (value) => {
  vi.stubEnv('APP_ORIGIN', value);
  const response = await POST(
    new Request('https://app.example/api/auth/login', {
      method: 'POST',
      headers: {
        origin: 'https://app.example',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email: 'a@example.com', password: 'password' }),
    }),
  );
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ code: 'unavailable' });
  expect(fetcher).not.toHaveBeenCalled();
});

test.each([undefined, 'admin'])(
  'session response rejects unrecognized role %s',
  async (role) => {
    fetcher.mockResolvedValueOnce(
      Response.json({ ...session, user: { ...session.user, role } }),
    );
    await expect(readSession('x'.repeat(43))).rejects.toMatchObject({
      code: 'unavailable',
    });
  },
);
