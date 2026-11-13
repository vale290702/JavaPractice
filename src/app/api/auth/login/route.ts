import {
  login,
  cookieName,
  cookieOptions,
} from '../../../../features/auth/server';
import {
  assertOrigin,
  credentials,
  errorResponse,
  json,
} from '../../../../features/auth/http';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    assertOrigin(request);
    const { email, password } = await credentials(request);
    const { token } = await login(email, password);
    const response = json({ ok: true });
    response.cookies.set(cookieName(), token, cookieOptions());
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
