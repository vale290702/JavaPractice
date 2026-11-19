import 'server-only';
import { AuthError } from '../auth/server';
import { isAccountId } from '../extra-practice/validation';
import { maxExamBytes } from './metadata';
export function expectedExamAccount(request: Request): string {
  const id = request.headers.get('X-Account-ID');
  if (!isAccountId(id)) throw new AuthError('invalid_request');
  return id;
}
export function studentParam(request: Request): string {
  const params = new URL(request.url).searchParams;
  const id = params.get('student');
  if (params.getAll('student').length !== 1 || !isAccountId(id))
    throw new AuthError('invalid_request');
  return id;
}
export async function examBody(request: Request): Promise<unknown> {
  if (
    request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !==
      'application/json' ||
    !request.body ||
    Number(request.headers.get('content-length')) > maxExamBytes
  )
    throw new AuthError('invalid_request');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > maxExamBytes) {
        await reader.cancel();
        throw new Error();
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new AuthError('invalid_request');
  }
}
