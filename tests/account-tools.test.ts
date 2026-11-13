// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { run, readPassword } from '../scripts/manage-users.mjs';
import { PassThrough, Readable } from 'node:stream';

const userId = '01234567-89ab-4cde-8fab-0123456789ab';
function fixture(statuses: number[], payloads: unknown[] = []) {
  const requests: { url: string; method: string; body: unknown }[] = [];
  const output: string[] = [];
  return {
    requests,
    output,
    options: {
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
      },
      readPassword: async () => 'secure-test-password',
      write: (line: string) => output.push(line),
      fetch: async (url: string, init: RequestInit) => {
        requests.push({
          url,
          method: init.method ?? 'GET',
          body: init.body ? JSON.parse(String(init.body)) : null,
        });
        const status = statuses.shift() ?? 200;
        return new Response(
          status === 204 ? null : JSON.stringify(payloads.shift() ?? {}),
          { status },
        );
      },
    },
  };
}
describe('administrative account tools', () => {
  it('rolls back a newly created auth user if approval fails', async () => {
    const f = fixture(
      [200, 500, 204],
      [{ id: userId }, { message: 'SECRET provider details' }],
    );
    await expect(
      run(
        ['create', '--email', 'student@example.com', '--name', 'Student'],
        f.options,
      ),
    ).rejects.toThrow('approval failed');
    expect(f.requests.map((r) => r.method)).toEqual(['POST', 'POST', 'DELETE']);
    expect(f.requests[2].url.endsWith(`/auth/v1/admin/users/${userId}`)).toBe(
      true,
    );
    expect(f.requests[0].body).toMatchObject({ email_confirm: true });
  });
  it('disables approval before revoking all sessions', async () => {
    const f = fixture([204, 204]);
    await run(['disable', '--user-id', userId], f.options);
    expect(f.requests.map((r) => r.method)).toEqual(['PATCH', 'DELETE']);
    expect(f.requests[0].body).toEqual({ enabled: false });
    expect(f.requests[1].url).toContain('/rest/v1/app_sessions?user_id=eq.');
  });
  it('revokes before changing password so partial failure leaves old sessions revoked', async () => {
    const f = fixture([204, 200]);
    await run(['reset-password', '--user-id', userId], f.options);
    expect(f.requests.map((r) => r.method)).toEqual([
      'DELETE',
      'PUT',
      'DELETE',
    ]);
    expect(f.requests[1].body).toEqual({ password: 'secure-test-password' });
    expect(f.output.join(' ')).not.toContain('secure-test-password');
  });
  it('lists only approved accounts and resolves their email through the admin API', async () => {
    const f = fixture(
      [200, 200],
      [
        [{ user_id: userId, display_name: 'Student', enabled: true }],
        { id: userId, email: 'student@example.com' },
      ],
    );
    await run(['list'], f.options);
    expect(JSON.parse(f.output[0])).toEqual({
      userId,
      displayName: 'Student',
      email: 'student@example.com',
      enabled: true,
    });
    expect(f.requests[1].url).toContain(`/auth/v1/admin/users/${userId}`);
  });
  it('does not call the provider for a short password', async () => {
    const f = fixture([]);
    f.options.readPassword = async () => 'short';
    await expect(
      run(['reset-password', '--user-id', userId], f.options),
    ).rejects.toThrow('12–1024');
    expect(f.requests).toEqual([]);
  });
  it('reports failed rollback without exposing provider details', async () => {
    const f = fixture([200, 500, 500], [{ id: userId }, {}, {}]);
    await expect(
      run(
        ['create', '--email', 'student@example.com', '--name', 'Student'],
        f.options,
      ),
    ).rejects.toThrow(
      `cleanup also failed. Remove unapproved Auth user ${userId}`,
    );
  });
  it('rejects password arguments before reading credentials or calling the provider', async () => {
    await expect(
      run(['create', '--password', 'do-not-print-me'], { env: {} }),
    ).rejects.toThrow('Unsupported');
  });
  it('supports help without credentials', async () => {
    const lines: string[] = [];
    await run(['--help'], {
      env: {},
      write: (line: string) => lines.push(line),
    });
    expect(lines.join(' ')).toContain('reset-password');
  });
  it('never exposes provider response bodies', async () => {
    const f = fixture([403], [{ message: 'sensitive-provider-detail' }]);
    await expect(
      run(['disable', '--user-id', userId], f.options),
    ).rejects.toThrow('disable approval failed (HTTP 403)');
  });
});

describe('password input', () => {
  it('reads only the first stdin line without printing it', async () => {
    const output = new PassThrough();
    let visible = '';
    output.on('data', (chunk) => {
      visible += chunk.toString();
    });
    expect(
      await readPassword(
        Readable.from(['private-password\nignored\n']) as typeof process.stdin,
        output as unknown as typeof process.stderr,
      ),
    ).toBe('private-password');
    expect(visible).toBe('');
  });
  it('hides terminal input and restores terminal mode', async () => {
    const input = Object.assign(new PassThrough(), {
      isTTY: true,
      isRaw: false,
      setRawMode(raw: boolean) {
        this.isRaw = raw;
      },
    });
    const output = new PassThrough();
    let visible = '';
    output.on('data', (chunk) => {
      visible += chunk.toString();
    });
    const pending = readPassword(
      input as unknown as typeof process.stdin,
      output as unknown as typeof process.stderr,
    );
    input.emit('keypress', 'private-password', {});
    input.emit('keypress', '\r', { name: 'return' });
    expect(await pending).toBe('private-password');
    expect(visible).not.toContain('private-password');
    expect(input.isRaw).toBe(false);
    expect(input.listenerCount('keypress')).toBe(0);
  });
});

it('creates a teacher only with an explicit valid role', async () => {
  const f = fixture([200, 204], [{ id: userId }]);
  await run(
    [
      'create',
      '--email',
      'teacher@example.com',
      '--name',
      'Teacher',
      '--role',
      'teacher',
    ],
    f.options,
  );
  expect(f.requests[1].body).toMatchObject({ role: 'teacher' });
  await expect(
    run(
      ['create', '--email', 'x@example.com', '--name', 'X', '--role', 'admin'],
      f.options,
    ),
  ).rejects.toThrow(/role/);
});
