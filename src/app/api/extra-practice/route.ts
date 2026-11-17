import { AuthError } from '../../../features/auth/server';
import { assertOrigin, errorResponse, json } from '../../../features/auth/http';
import {
  getExtraWorksheet,
  saveExtraWorksheet,
  WorksheetConflict,
} from '../../../features/extra-practice/server';
import {
  exactKeys,
  isAccountId,
  maxWorksheetBytes,
} from '../../../features/extra-practice/validation';
import type { WorksheetWork } from '../../../features/extra-practice/types';
export const runtime = 'nodejs';
function expectedAccount(request: Request): string {
  const id = request.headers.get('X-Account-ID');
  if (!isAccountId(id)) throw new AuthError('invalid_request');
  return id;
}
export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    if (params.getAll('id').length !== 1)
      throw new AuthError('invalid_request');
    return json({
      worksheet: await getExtraWorksheet(
        params.get('id')!,
        expectedAccount(request),
      ),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: Request) {
  try {
    assertOrigin(request);
    const expectedUserId = expectedAccount(request);
    if (
      request.headers
        .get('content-type')
        ?.split(';')[0]
        .trim()
        .toLowerCase() !== 'application/json' ||
      !request.body ||
      Number(request.headers.get('content-length')) > maxWorksheetBytes
    )
      throw new AuthError('invalid_request');
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    let body: unknown;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxWorksheetBytes) {
          await reader.cancel();
          throw new Error();
        }
        chunks.push(value);
      }
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      throw new AuthError('invalid_request');
    }
    if (!exactKeys(body, ['id', 'version', 'work', 'completed']))
      throw new AuthError('invalid_request');
    return json({
      worksheet: await saveExtraWorksheet(
        body.id as string,
        body.version as number,
        body.work as WorksheetWork,
        body.completed as boolean,
        expectedUserId,
      ),
    });
  } catch (error) {
    return error instanceof WorksheetConflict
      ? json({ code: 'conflict' }, 409)
      : errorResponse(error);
  }
}
