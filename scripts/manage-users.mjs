#!/usr/bin/env node
import { emitKeypressEvents, createInterface } from 'node:readline';
import { pathToFileURL } from 'node:url';

const HELP = `Managed tutoring accounts (Node 24)
  node --env-file=.env.local scripts/manage-users.mjs create --email student@example.com --name "Student" [--role student|teacher]
  node --env-file=.env.local scripts/manage-users.mjs list
  node --env-file=.env.local scripts/manage-users.mjs disable --user-id UUID
  node --env-file=.env.local scripts/manage-users.mjs reset-password --user-id UUID
Passwords: hidden terminal prompt or one line on stdin. Never use password arguments.
Requires server-only SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.`;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
class ToolError extends Error {}

export async function readPassword(
  input = process.stdin,
  output = process.stderr,
) {
  if (!input.isTTY) {
    const lines = createInterface({ input, crlfDelay: Infinity });
    try {
      for await (const line of lines) return line;
      throw new ToolError('No password supplied on stdin.');
    } finally {
      lines.close();
    }
  }
  output.write('New password (at least 12 characters; hidden): ');
  emitKeypressEvents(input);
  const previousRaw = Boolean(input.isRaw);
  input.setRawMode(true);
  input.resume();
  return new Promise((resolve, reject) => {
    let password = '';
    const finish = (error) => {
      input.off('keypress', onKey);
      input.setRawMode(previousRaw);
      input.pause();
      output.write('\n');
      if (error) reject(error);
      else resolve(password);
      password = '';
    };
    const onKey = (text, key = {}) => {
      if (key.ctrl && key.name === 'c')
        return finish(new ToolError('Cancelled.'));
      if (key.name === 'return' || key.name === 'enter') return finish();
      if (key.name === 'backspace') {
        password = [...password].slice(0, -1).join('');
        return;
      }
      if (
        !key.ctrl &&
        !key.meta &&
        text &&
        !/[\u0000-\u001f\u007f]/u.test(text)
      )
        password += text;
    };
    input.on('keypress', onKey);
  });
}

function parse(args) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0]))
    return { command: 'help' };
  const [command, ...rest] = args;
  const allowed = {
    create: ['--email', '--name', '--role'],
    list: [],
    disable: ['--user-id'],
    'reset-password': ['--user-id'],
  };
  if (!Object.hasOwn(allowed, command ?? ''))
    throw new ToolError('Unsupported command. Use --help.');
  const options = {};
  for (let i = 0; i < rest.length; i += 2) {
    const flag = rest[i];
    if (
      !allowed[command].includes(flag) ||
      options[flag] !== undefined ||
      !rest[i + 1] ||
      rest[i + 1].startsWith('--')
    ) {
      throw new ToolError(
        'Unsupported or missing argument. Use --help; passwords must use the hidden prompt or stdin.',
      );
    }
    options[flag] = rest[i + 1];
  }
  if (command === 'create') {
    if (
      options['--role'] !== undefined &&
      !['teacher', 'student'].includes(options['--role'])
    )
      throw new ToolError('Provide --role teacher or student.');
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(options['--email'] ?? '') ||
      options['--email'].length > 254
    )
      throw new ToolError('Provide a valid --email.');
    if (
      !options['--name']?.trim() ||
      options['--name'].length > 120 ||
      /[\u0000-\u001f\u007f]/u.test(options['--name'])
    )
      throw new ToolError('Provide --name (1–120 characters).');
  }
  if (
    ['disable', 'reset-password'].includes(command) &&
    !UUID.test(options['--user-id'] ?? '')
  )
    throw new ToolError('Provide a valid --user-id UUID.');
  return { command, options };
}

export async function run(args, dependencies = {}) {
  const { command, options } = parse(args);
  const write = dependencies.write ?? ((line) => console.log(line));
  if (command === 'help') {
    write(HELP);
    return;
  }
  const env = dependencies.env ?? process.env;
  let base;
  try {
    const url = new URL(env.SUPABASE_URL);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== '/'
    )
      throw new Error();
    base = url.origin;
  } catch {
    throw new ToolError('Set SUPABASE_URL to the HTTPS project origin.');
  }
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key?.trim())
    throw new ToolError('Set server-only SUPABASE_SERVICE_ROLE_KEY.');
  const fetcher = dependencies.fetch ?? fetch;
  async function request(path, method, body, operation) {
    let response;
    try {
      response = await fetcher(`${base}${path}`, {
        method,
        redirect: 'error',
        signal: AbortSignal.timeout(15_000),
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
    } catch {
      throw new ToolError(`${operation} failed (network error).`);
    }
    if (!response.ok)
      throw new ToolError(`${operation} failed (HTTP ${response.status}).`);
    if (response.status === 204) return null;
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      throw new ToolError(`${operation} failed (invalid response).`);
    }
  }
  const accountPath = (id) => `/rest/v1/app_accounts?user_id=eq.${id}`;
  const revoke = (id) =>
    request(
      `/rest/v1/app_sessions?user_id=eq.${id}`,
      'DELETE',
      undefined,
      'Session revocation',
    );
  if (command === 'list') {
    const accounts = [];
    // Explicit pagination avoids silently truncating at PostgREST's response limit.
    for (let offset = 0; ; offset += 100) {
      const page = await request(
        `/rest/v1/app_accounts?select=user_id,display_name,enabled,role&order=user_id&limit=100&offset=${offset}`,
        'GET',
        undefined,
        'Account listing',
      );
      if (!Array.isArray(page))
        throw new ToolError('Account listing failed (invalid response).');
      accounts.push(...page);
      if (page.length < 100) break;
    }
    for (const account of accounts) {
      if (!UUID.test(account.user_id))
        throw new ToolError('Account listing failed (invalid user ID).');
      const payload = await request(
        `/auth/v1/admin/users/${account.user_id}`,
        'GET',
        undefined,
        'Email lookup',
      );
      const user = payload?.user ?? payload;
      // JSON escapes control characters so stored names cannot inject terminal commands.
      write(
        JSON.stringify({
          userId: account.user_id,
          displayName: account.display_name,
          email: user?.email ?? null,
          enabled: account.enabled,
          role: account.role,
        }),
      );
    }
    write(`${accounts.length} approved account(s).`);
    return;
  }
  const id = options['--user-id'];
  if (command === 'disable') {
    await request(
      accountPath(id),
      'PATCH',
      { enabled: false },
      'Account disable approval',
    );
    await revoke(id);
    write('Account disabled; existing application sessions revoked.');
    return;
  }
  let password = await (dependencies.readPassword ?? readPassword)();
  if (
    typeof password !== 'string' ||
    [...password].length < 12 ||
    password.length > 1024 ||
    /[\r\n\u0000]/u.test(password)
  )
    throw new ToolError(
      'Password must contain 12–1024 characters without newlines or NUL.',
    );
  try {
    if (command === 'reset-password') {
      await revoke(id);
      await request(
        `/auth/v1/admin/users/${id}`,
        'PUT',
        { password },
        'Password update',
      );
      await revoke(id);
      write('Password updated; existing application sessions revoked.');
      return;
    }
    const payload = await request(
      '/auth/v1/admin/users',
      'POST',
      { email: options['--email'], password, email_confirm: true },
      'Account creation',
    );
    const user = payload?.user ?? payload;
    if (!UUID.test(user?.id ?? ''))
      throw new ToolError(
        'Account creation returned an invalid user ID; inspect the Auth dashboard before retrying.',
      );
    try {
      await request(
        '/rest/v1/app_accounts',
        'POST',
        {
          user_id: user.id,
          display_name: options['--name'].trim(),
          role: options['--role'] ?? 'student',
          enabled: true,
        },
        'Account approval',
      );
    } catch {
      try {
        await request(
          `/auth/v1/admin/users/${user.id}`,
          'DELETE',
          undefined,
          'Account cleanup',
        );
      } catch {
        throw new ToolError(
          `Account approval failed; cleanup also failed. Remove unapproved Auth user ${user.id} in the dashboard before retrying.`,
        );
      }
      throw new ToolError(
        'Account approval failed; newly created Auth user removed.',
      );
    }
    write(`Account created and approved: ${user.id}`);
  } finally {
    password = '';
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  run(process.argv.slice(2)).catch((error) => {
    console.error(
      error instanceof ToolError
        ? error.message
        : 'Account command failed. No sensitive provider details are displayed.',
    );
    process.exitCode = 1;
  });
}
