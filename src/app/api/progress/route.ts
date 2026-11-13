import { AuthError } from '../../../features/auth/server';
import { assertOrigin, errorResponse, json } from '../../../features/auth/http';
import {
  completeActivity,
  getCurrentProgress,
  isActivity,
} from '../../../features/learning/server';
export const runtime = 'nodejs';
export async function GET() {
  try {
    return json({ completed: await getCurrentProgress() });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: Request) {
  try {
    assertOrigin(request);
    if (
      request.headers
        .get('content-type')
        ?.split(';')[0]
        .trim()
        .toLowerCase() !== 'application/json' ||
      !request.body
    )
      throw new AuthError('invalid_request');
    const reader = request.body.getReader();
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1024) {
        await reader.cancel();
        throw new AuthError('invalid_request');
      }
      chunks.push(value);
    }
    let body: unknown;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      throw new AuthError('invalid_request');
    }
    if (
      !body ||
      typeof body !== 'object' ||
      !('activity' in body) ||
      !isActivity(body.activity)
    )
      throw new AuthError('invalid_request');
    return json({ completed: await completeActivity(body.activity) });
  } catch (error) {
    return errorResponse(error);
  }
}
