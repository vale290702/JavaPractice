import { cookies } from 'next/headers';
import {
  cookieName,
  cookieOptions,
  revokeSession,
} from '../../../../features/auth/server';
import {
  assertOrigin,
  errorResponse,
  json,
} from '../../../../features/auth/http';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    assertOrigin(request);
  } catch (error) {
    return errorResponse(error);
  }
  let response;
  try {
    const token = (await cookies()).get(cookieName())?.value;
    if (token) await revokeSession(token);
    response = json({ ok: true });
  } catch (error) {
    response = errorResponse(error);
  }
  response.cookies.set(cookieName(), '', { ...cookieOptions(), maxAge: 0 });
  return response;
}
