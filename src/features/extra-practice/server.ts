import 'server-only';
import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { AuthError, cookieName, rpc } from '../auth/server';
import { isWorksheetId, validWork, exactKeys, isAccountId } from './validation';
import type {
  SavedWorksheet,
  WorksheetWork,
  ExtraStudentProgress,
} from './types';
export class WorksheetConflict extends Error {}
async function sessionHash() {
  const token = (await cookies()).get(cookieName())?.value;
  if (!token || !/^[\w-]{43}$/.test(token))
    throw new AuthError('invalid_credentials');
  return createHash('sha256').update(token).digest('hex');
}
function saved(value: unknown): SavedWorksheet {
  const row = value as SavedWorksheet;
  if (
    !exactKeys(value, ['id', 'version', 'work', 'completed', 'updatedAt']) ||
    !isWorksheetId(row.id) ||
    !Number.isSafeInteger(row.version) ||
    row.version < 1 ||
    typeof row.completed !== 'boolean' ||
    !validWork(row.id, row.work, row.completed) ||
    typeof row.updatedAt !== 'string' ||
    !Number.isFinite(Date.parse(row.updatedAt))
  )
    throw new AuthError('unavailable');
  return row;
}
function envelope(value: unknown): SavedWorksheet | null {
  if (value === null) throw new AuthError('invalid_credentials');
  const result = value as { ok?: boolean; code?: string; worksheet?: unknown };
  if (result?.ok === false && result.code === 'conflict')
    throw new WorksheetConflict();
  if (!exactKeys(result, ['ok', 'worksheet']) || result.ok !== true)
    throw new AuthError('unavailable');
  return result.worksheet === null ? null : saved(result.worksheet);
}
export async function getExtraWorksheet(
  id: string,
  expectedUserId: string,
): Promise<SavedWorksheet | null> {
  if (!isWorksheetId(id) || !isAccountId(expectedUserId))
    throw new AuthError('invalid_request');
  return envelope(
    await rpc('app_read_extra_worksheet', {
      p_token_hash: await sessionHash(),
      p_id: id,
      p_expected_user_id: expectedUserId,
    }),
  );
}
export async function saveExtraWorksheet(
  id: string,
  version: number,
  work: WorksheetWork,
  completed: boolean,
  expectedUserId: string,
): Promise<SavedWorksheet> {
  if (
    !isAccountId(expectedUserId) ||
    !isWorksheetId(id) ||
    !Number.isSafeInteger(version) ||
    version < 0 ||
    version >= 2147483647 ||
    typeof completed !== 'boolean' ||
    !validWork(id, work, completed)
  )
    throw new AuthError('invalid_request');
  const result = envelope(
    await rpc('app_save_extra_worksheet', {
      p_token_hash: await sessionHash(),
      p_id: id,
      p_expected_user_id: expectedUserId,
      p_version: version,
      p_work: work,
      p_completed: completed,
    }),
  );
  if (!result) throw new AuthError('unavailable');
  return result;
}
export async function getExtraTeacherProgress(): Promise<
  ExtraStudentProgress[]
> {
  const value = await rpc('app_extra_teacher_progress', {
    p_token_hash: await sessionHash(),
  });
  if (value === null) throw new AuthError('invalid_credentials');
  if (!Array.isArray(value)) throw new AuthError('unavailable');
  return value.map((row: ExtraStudentProgress) => {
    if (
      !exactKeys(row, ['userId', 'completed', 'updatedAt']) ||
      typeof row.userId !== 'string' ||
      !Array.isArray(row.completed) ||
      !row.completed.every(isWorksheetId) ||
      (row.updatedAt !== null &&
        (typeof row.updatedAt !== 'string' ||
          !Number.isFinite(Date.parse(row.updatedAt))))
    )
      throw new AuthError('unavailable');
    return { ...row, completed: [...new Set(row.completed)] };
  });
}
