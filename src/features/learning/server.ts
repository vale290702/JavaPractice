import 'server-only';
import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { AuthError, cookieName, rpc } from '../auth/server';
import { topicIds } from '../curriculum/metadata';
import { modes } from '../../i18n/content';
import type { StudentProgress } from './types';
const activities = new Set(
  topicIds.flatMap((topic) => modes.map((mode) => `${topic}:${mode}`)),
);
export function isActivity(value: unknown): value is string {
  return typeof value === 'string' && activities.has(value);
}
async function sessionHash(): Promise<string> {
  const token = (await cookies()).get(cookieName())?.value;
  if (!token || !/^[\w-]{43}$/.test(token))
    throw new AuthError('invalid_credentials');
  return createHash('sha256').update(token).digest('hex');
}
function parseCompleted(value: unknown): string[] {
  if (value === null) throw new AuthError('invalid_credentials');
  if (!Array.isArray(value) || !value.every(isActivity))
    throw new AuthError('unavailable');
  return [...new Set(value)];
}
export async function getCurrentProgress(): Promise<string[]> {
  return parseCompleted(
    await rpc('app_read_progress', { p_token_hash: await sessionHash() }),
  );
}
export async function completeActivity(activity: string): Promise<string[]> {
  if (!isActivity(activity)) throw new AuthError('invalid_request');
  return parseCompleted(
    await rpc('app_complete_activity', {
      p_token_hash: await sessionHash(),
      p_activity: activity,
    }),
  );
}
export async function getTeacherProgress(): Promise<StudentProgress[]> {
  const value = await rpc('app_teacher_progress', {
    p_token_hash: await sessionHash(),
  });
  if (value === null) throw new AuthError('invalid_credentials');
  if (!Array.isArray(value)) throw new AuthError('unavailable');
  return value.map((row: StudentProgress) => {
    if (
      !row ||
      typeof row.id !== 'string' ||
      typeof row.email !== 'string' ||
      typeof row.displayName !== 'string' ||
      typeof row.enabled !== 'boolean' ||
      (row.lastActivity !== null &&
        (typeof row.lastActivity !== 'string' ||
          !Number.isFinite(Date.parse(row.lastActivity))))
    )
      throw new AuthError('unavailable');
    return {
      id: row.id,
      email: row.email,
      displayName: row.displayName,
      enabled: row.enabled,
      completed: parseCompleted(row.completed),
      lastActivity: row.lastActivity,
    };
  });
}
