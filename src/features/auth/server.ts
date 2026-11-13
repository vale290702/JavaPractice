import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import type { AppSession, AuthErrorCode } from './types';

export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
  }
}
export const cookieName = () =>
  process.env.NODE_ENV === 'production' ? '__Host-jp_session' : 'jp_session';
export const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 43200,
});
const digest = (token: string) =>
  createHash('sha256').update(token).digest('hex');
async function service(
  path: string,
  body: unknown,
  bearer?: string,
): Promise<unknown> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new AuthError('unavailable');
  let response: Response;
  try {
    response = await fetch(`${url.replace(/\/$/, '')}${path}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${bearer ?? key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new AuthError('unavailable');
  }
  if (!response.ok) {
    if (
      path.startsWith('/auth/v1/token') &&
      [400, 401, 422].includes(response.status)
    )
      throw new AuthError('invalid_credentials');
    if (response.status === 429) throw new AuthError('rate_limited');
    throw new AuthError('unavailable');
  }
  if (response.status === 204) return null;
  try {
    return await response.json();
  } catch {
    throw new AuthError('unavailable');
  }
}
const rpc = (name: string, body: unknown) =>
  service(`/rest/v1/rpc/${name}`, body);
function parseSession(value: unknown): AppSession | null {
  if (value === null) return null;
  const session = value as AppSession;
  if (
    !session ||
    typeof session.user?.id !== 'string' ||
    typeof session.user.email !== 'string' ||
    typeof session.user.displayName !== 'string' ||
    typeof session.expiresAt !== 'string' ||
    !Number.isFinite(Date.parse(session.expiresAt))
  )
    throw new AuthError('unavailable');
  return Date.parse(session.expiresAt) > Date.now()
    ? {
        user: {
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.displayName,
        },
        expiresAt: session.expiresAt,
      }
    : null;
}
export async function login(
  email: string,
  password: string,
): Promise<{ token: string; session: AppSession }> {
  const normalized = email.trim().toLowerCase();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ||
    normalized.length > 254 ||
    password.length < 1 ||
    password.length > 1024
  )
    throw new AuthError('invalid_request');
  // Do not trust caller-controlled forwarded IP headers. Account throttling works on every host.
  const allowed = await rpc('app_check_login_limit', {
    p_key: digest(`email:${normalized}`),
    p_limit: 8,
  });
  if (allowed === false) throw new AuthError('rate_limited');
  if (allowed !== true) throw new AuthError('unavailable');
  const claim = (await rpc('app_get_login_version', {
    p_email: normalized,
  })) as { userId?: string; version?: number } | null;
  const auth = (await service('/auth/v1/token?grant_type=password', {
    email: normalized,
    password,
  })) as { user?: { id?: string }; access_token?: string };
  if (
    typeof auth.user?.id !== 'string' ||
    typeof auth.access_token !== 'string'
  )
    throw new AuthError('unavailable');
  // Revoke only the short-lived provider session created by this password check.
  // A provider failure prevents app-session issuance rather than leaking refresh tokens.
  await service('/auth/v1/logout?scope=local', {}, auth.access_token);
  if (
    !claim ||
    claim.userId !== auth.user.id ||
    !Number.isSafeInteger(claim.version) ||
    Number(claim.version) < 0
  )
    throw new AuthError('invalid_credentials');
  const token = randomBytes(32).toString('base64url');
  const session = parseSession(
    await rpc('app_replace_session', {
      p_user_id: auth.user.id,
      p_token_hash: digest(token),
      p_credential_version: claim.version,
    }),
  );
  if (!session) throw new AuthError('invalid_credentials');
  return { token, session };
}
export async function readSession(token: string): Promise<AppSession | null> {
  if (!/^[\w-]{43}$/.test(token)) return null;
  return parseSession(
    await rpc('app_read_session', { p_token_hash: digest(token) }),
  );
}
export async function revokeSession(token: string): Promise<void> {
  if (/^[\w-]{43}$/.test(token))
    await rpc('app_revoke_session', { p_token_hash: digest(token) });
}
export async function getCurrentSession(): Promise<AppSession | null> {
  const token = (await cookies()).get(cookieName())?.value;
  return token ? readSession(token) : null;
}
