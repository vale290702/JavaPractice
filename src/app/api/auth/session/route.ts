import { getCurrentSession } from '../../../../features/auth/server';
import { errorResponse, json } from '../../../../features/auth/http';
export const runtime = 'nodejs';
export async function GET() {
  try {
    const session = await getCurrentSession();
    return session ? json(session) : json({ code: 'invalid_credentials' }, 401);
  } catch (error) {
    return errorResponse(error);
  }
}
