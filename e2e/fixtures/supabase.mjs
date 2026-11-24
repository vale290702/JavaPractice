/** Test-only Supabase protocol fixture. Never imported by application code. */
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { activityTopics } from '../../src/features/extra-practice/metadata.ts';
import { topicIds } from '../../src/features/curriculum/metadata.ts';
export const fixtureKey = 'test-only-service-key-not-a-production-secret';
export const fixturePassword = 'test-only-password-123';
const canAccessTopic = (through, topic) =>
  through === null || topicIds.indexOf(topic) <= topicIds.indexOf(through);
export async function startFixture(port = 54339) {
  if (process.env.NODE_ENV === 'production')
    throw new Error('Test fixture cannot run in production');
  const accounts = new Map(),
    sessions = new Map(),
    providerTokens = new Set(),
    limits = new Map();
  const accountFor = (email) => {
    if (!/^(student|teacher)-[a-z0-9-]+@example\.test$/.test(email))
      return null;
    if (!accounts.has(email))
      accounts.set(email, {
        id: randomUUID(),
        email,
        displayName: email.startsWith('teacher-')
          ? 'Test teacher'
          : 'Test learner',
        role: email.startsWith('teacher-') ? 'teacher' : 'student',
        completed: [],
        worksheets: new Map(),
        lastActivity: null,
        enabled: true,
        version: 0,
        curriculumThrough: null,
      });
    return accounts.get(email);
  };
  const publicSession = (row) => ({
    user: {
      id: row.account.id,
      email: row.account.email,
      displayName: row.account.displayName,
      role: row.account.role,
    },
    expiresAt: row.expiresAt,
    curriculumThrough: row.account.curriculumThrough,
  });
  const server = createServer(async (req, res) => {
    const reply = (status, body) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      });
      res.end(status === 204 ? '' : JSON.stringify(body));
    };
    if (req.headers.apikey !== fixtureKey)
      return reply(401, { message: 'Fixture key required' });
    let body = {};
    try {
      let text = '';
      for await (const chunk of req) text += chunk;
      if (text) body = JSON.parse(text);
    } catch {
      return reply(400, {});
    }
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/auth/v1/token') {
      const account = accountFor(body.email);
      if (!account || body.password !== fixturePassword)
        return reply(400, { error: 'invalid_grant' });
      const token = randomUUID();
      providerTokens.add(token);
      return reply(200, {
        access_token: token,
        user: { id: account.id, email: account.email },
      });
    }
    if (path === '/auth/v1/logout') {
      providerTokens.delete(req.headers.authorization?.replace(/^Bearer /, ''));
      return reply(204, null);
    }
    if (path === '/rest/v1/rpc/app_check_login_limit') {
      // The real migration uses atomic windowed PostgreSQL counters. Tests exercise that API contract.
      const count = (limits.get(body.p_key) ?? 0) + 1;
      limits.set(body.p_key, count);
      return reply(200, count <= body.p_limit);
    }
    if (path === '/rest/v1/rpc/app_get_login_version') {
      const account = accountFor(body.p_email);
      return reply(
        200,
        account?.enabled
          ? { userId: account.id, version: account.version }
          : null,
      );
    }
    if (path === '/rest/v1/rpc/app_replace_session') {
      const account = [...accounts.values()].find(
        (a) => a.id === body.p_user_id,
      );
      if (!account?.enabled || account.version !== body.p_credential_version)
        return reply(200, null);
      const row = {
        account,
        hash: body.p_token_hash,
        expiresAt: new Date(Date.now() + 12 * 3600_000).toISOString(),
      };
      sessions.set(account.id, row);
      return reply(200, publicSession(row));
    }
    if (path === '/rest/v1/rpc/app_read_session') {
      const row = [...sessions.values()].find(
        (s) => s.hash === body.p_token_hash,
      );
      return reply(
        200,
        row && row.account.enabled && Date.parse(row.expiresAt) > Date.now()
          ? publicSession(row)
          : null,
      );
    }
    if (
      [
        'app_read_progress',
        'app_complete_activity',
        'app_teacher_progress',
        'app_set_curriculum_access',
      ].some((name) => path === `/rest/v1/rpc/${name}`)
    ) {
      const row = [...sessions.values()].find(
        (s) => s.hash === body.p_token_hash,
      );
      if (
        !row ||
        !row.account.enabled ||
        Date.parse(row.expiresAt) <= Date.now()
      )
        return reply(200, null);
      if (path.endsWith('/app_set_curriculum_access')) {
        if (row.account.role !== 'teacher') return reply(200, null);
        const student = [...accounts.values()].find(
          (a) => a.id === body.p_student_id && a.role === 'student',
        );
        if (
          !student ||
          (body.p_through !== null &&
            body.p_through !== 'none' &&
            !topicIds.includes(body.p_through))
        )
          return reply(200, { ok: false, code: 'invalid_request' });
        student.curriculumThrough = body.p_through;
        return reply(200, {
          ok: true,
          curriculumThrough: student.curriculumThrough,
        });
      }
      if (path.endsWith('/app_teacher_progress')) {
        if (row.account.role !== 'teacher') return reply(200, null);
        return reply(
          200,
          [...accounts.values()]
            .filter((a) => a.role === 'student')
            .map((a) => ({
              id: a.id,
              email: a.email,
              displayName: a.displayName,
              enabled: a.enabled,
              completed: a.completed,
              lastActivity: a.lastActivity,
              curriculumThrough: a.curriculumThrough,
            })),
        );
      }
      if (path.endsWith('/app_complete_activity')) {
        const match =
          /^(1|2|3|4)\.(\d+):(learn|example|practice|quiz|code)$/.exec(
            body.p_activity ?? '',
          );
        if (
          !match ||
          Number(match[2]) < 1 ||
          Number(match[2]) > [0, 15, 12, 9, 17][Number(match[1])]
        )
          return reply(400, {});
        if (
          !canAccessTopic(
            row.account.curriculumThrough,
            `${match[1]}.${match[2]}`,
          )
        )
          return reply(200, { ok: false, code: 'curriculum_locked' });
        row.account.completed = [
          ...new Set([...row.account.completed, body.p_activity]),
        ];
        row.account.lastActivity = new Date().toISOString();
      }
      return reply(200, row.account.completed);
    }
    if (
      [
        'app_read_extra_worksheet',
        'app_save_extra_worksheet',
        'app_extra_teacher_progress',
      ].some((name) => path === `/rest/v1/rpc/${name}`)
    ) {
      const session = [...sessions.values()].find(
        (s) => s.hash === body.p_token_hash,
      );
      if (
        !session ||
        !session.account.enabled ||
        Date.parse(session.expiresAt) <= Date.now()
      )
        return reply(200, null);
      const account = session.account;
      if (path.endsWith('/app_extra_teacher_progress')) {
        if (account.role !== 'teacher') return reply(200, null);
        return reply(
          200,
          [...accounts.values()]
            .filter((a) => a.role === 'student')
            .map((a) => ({
              userId: a.id,
              completed: [...a.worksheets.values()]
                .filter((w) => w.completed)
                .map((w) => w.id),
              updatedAt:
                [...a.worksheets.values()]
                  .map((w) => w.updatedAt)
                  .sort()
                  .at(-1) ?? null,
            })),
        );
      }
      if (account.id !== body.p_expected_user_id) return reply(200, null);
      if (
        !canAccessTopic(
          account.curriculumThrough,
          activityTopics[body.p_id.split('-')[0]],
        )
      )
        return reply(200, { ok: false, code: 'curriculum_locked' });
      const current = account.worksheets.get(body.p_id) ?? null;
      if (path.endsWith('/app_read_extra_worksheet'))
        return reply(200, { ok: true, worksheet: current });
      if ((current?.version ?? 0) !== body.p_version)
        return reply(200, { ok: false, code: 'conflict' });
      const worksheet = {
        id: body.p_id,
        version: body.p_version + 1,
        work: body.p_work,
        completed: body.p_completed,
        updatedAt: new Date().toISOString(),
      };
      account.worksheets.set(body.p_id, worksheet);
      return reply(200, { ok: true, worksheet });
    }
    if (
      [
        'app_read_unit1_exam',
        'app_save_unit1_exam',
        'app_list_unit1_submissions',
        'app_get_unit1_submission',
      ].some((name) => path === `/rest/v1/rpc/${name}`)
    ) {
      const session = [...sessions.values()].find(
        (s) => s.hash === body.p_token_hash,
      );
      if (
        !session ||
        !session.account.enabled ||
        Date.parse(session.expiresAt) <= Date.now() ||
        session.account.id !== body.p_expected_user_id
      )
        return reply(200, null);
      const account = session.account;
      const summary = (a) => ({
        userId: a.id,
        displayName: a.displayName,
        email: a.email,
        submittedAt: a.exam.submittedAt,
        examVersion: a.exam.examVersion,
        locale: a.exam.locale,
      });
      if (path.endsWith('/app_list_unit1_submissions')) {
        if (account.role !== 'teacher') return reply(200, null);
        return reply(
          200,
          [...accounts.values()]
            .filter((a) => a.exam?.status === 'submitted')
            .map(summary),
        );
      }
      if (path.endsWith('/app_get_unit1_submission')) {
        if (account.role !== 'teacher') return reply(200, null);
        const student = [...accounts.values()].find(
          (a) => a.id === body.p_student_id && a.exam?.status === 'submitted',
        );
        return reply(200, {
          ok: true,
          submission: student
            ? { ...summary(student), attempt: student.exam }
            : null,
        });
      }
      if (account.role !== 'student') return reply(200, null);
      if (!canAccessTopic(account.curriculumThrough, '1.15'))
        return reply(200, { ok: false, code: 'curriculum_locked' });
      const current = account.exam ?? null;
      if (path.endsWith('/app_read_unit1_exam'))
        return reply(200, { ok: true, attempt: current });
      if (current?.status === 'submitted')
        return reply(200, { ok: false, code: 'submitted', attempt: current });
      if ((current?.version ?? 0) !== body.p_version)
        return reply(200, { ok: false, code: 'conflict' });
      if (body.p_acknowledged !== true) return reply(400, {});
      const now = new Date().toISOString();
      account.exam = {
        examId: 'unit-1',
        examVersion: 'unit-1-v1',
        version: body.p_version + 1,
        status: body.p_submit ? 'submitted' : 'draft',
        locale: body.p_locale,
        answers: body.p_answers,
        startedAt: current?.startedAt ?? now,
        updatedAt: now,
        submittedAt: body.p_submit ? now : null,
      };
      return reply(200, { ok: true, attempt: account.exam });
    }
    if (path === '/rest/v1/rpc/app_revoke_session') {
      for (const [id, row] of sessions)
        if (row.hash === body.p_token_hash) sessions.delete(id);
      return reply(204, null);
    }
    if (path === '/_fixture/disable') {
      const account = accountFor(body.email);
      if (account) {
        account.enabled = false;
        sessions.delete(account.id);
      }
      return reply(200, { ok: true });
    }
    return reply(404, {});
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return server;
}
