import 'server-only';
import { NextResponse } from 'next/server';
import { AuthError } from './server';
export function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      Pragma: 'no-cache',
      Vary: 'Cookie',
    },
  });
}
export function assertOrigin(request: Request) {
  let expectedOrigin = new URL(request.url).origin;
  const configuredOrigin = process.env.APP_ORIGIN;
  if (configuredOrigin !== undefined) {
    try {
      const parsed = new URL(configuredOrigin);
      if (
        !['http:', 'https:'].includes(parsed.protocol) ||
        configuredOrigin !== parsed.origin
      )
        throw new Error();
      expectedOrigin = parsed.origin;
    } catch {
      throw new AuthError('unavailable');
    }
  }
  if (
    request.headers.get('origin') !== expectedOrigin ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  )
    throw new AuthError('invalid_request');
}
export function errorResponse(error: unknown) {
  const code = error instanceof AuthError ? error.code : 'unavailable';
  return json(
    { code },
    {
      invalid_request: 400,
      invalid_credentials: 401,
      rate_limited: 429,
      unavailable: 503,
    }[code],
  );
}
export async function credentials(
  request: Request,
): Promise<{ email: string; password: string }> {
  if (
    request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !==
    'application/json'
  )
    throw new AuthError('invalid_request');
  // Bound bytes even when Content-Length is absent or dishonest.
  if (Number(request.headers.get('content-length')) > 8192 || !request.body)
    throw new AuthError('invalid_request');
  const reader = request.body.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        throw new AuthError('invalid_request');
      }
      chunks.push(value);
    }
    const bytes = Buffer.concat(chunks);
    const body = JSON.parse(bytes.toString('utf8'));
    if (typeof body?.email !== 'string' || typeof body?.password !== 'string')
      throw new Error();
    return { email: body.email, password: body.password };
  } catch {
    throw new AuthError('invalid_request');
  }
}
