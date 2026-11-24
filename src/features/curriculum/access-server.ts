import 'server-only';
import { AuthError, requireSessionHash, rpc } from '../auth/server';
import { exactKeys, isAccountId } from '../extra-practice/validation';
import { isCurriculumThrough } from './access';

export function assertCurriculumUnlocked(value: unknown) {
  if (
    exactKeys(value, ['ok', 'code']) &&
    value.ok === false &&
    value.code === 'curriculum_locked'
  )
    throw new AuthError('curriculum_locked');
}

export async function setCurriculumAccess(
  studentId: unknown,
  through: unknown,
) {
  if (!isAccountId(studentId) || !isCurriculumThrough(through))
    throw new AuthError('invalid_request');
  const result = await rpc('app_set_curriculum_access', {
    p_token_hash: await requireSessionHash(),
    p_student_id: studentId,
    p_through: through,
  });
  if (result === null) throw new AuthError('invalid_credentials');
  if (
    exactKeys(result, ['ok', 'code']) &&
    result.ok === false &&
    result.code === 'invalid_request'
  )
    throw new AuthError('invalid_request');
  if (
    !exactKeys(result, ['ok', 'curriculumThrough']) ||
    result.ok !== true ||
    result.curriculumThrough !== through
  )
    throw new AuthError('unavailable');
  return through;
}
