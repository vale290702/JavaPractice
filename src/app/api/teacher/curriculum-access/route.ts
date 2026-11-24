import { AuthError } from '../../../../features/auth/server';
import {
  assertOrigin,
  errorResponse,
  json,
  readJson,
} from '../../../../features/auth/http';
import { setCurriculumAccess } from '../../../../features/curriculum/access-server';
import { exactKeys } from '../../../../features/extra-practice/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    assertOrigin(request);
    const body = await readJson(request, 1024);
    if (!exactKeys(body, ['studentId', 'curriculumThrough']))
      throw new AuthError('invalid_request');
    const curriculumThrough = await setCurriculumAccess(
      body.studentId,
      body.curriculumThrough,
    );
    return json({ curriculumThrough });
  } catch (error) {
    return errorResponse(error);
  }
}
