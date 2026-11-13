import { spawn } from 'node:child_process';
import { startFixture, fixtureKey } from './fixtures/supabase.mjs';
const fixture = await startFixture();
const child = spawn(
  process.execPath,
  [
    'node_modules/next/dist/bin/next',
    'dev',
    '--hostname',
    '127.0.0.1',
    '--port',
    '3100',
  ],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_BUILD_DIR: '.next-e2e',
      APP_ORIGIN: 'http://127.0.0.1:3100',
      SUPABASE_URL: 'http://127.0.0.1:54339',
      SUPABASE_SERVICE_ROLE_KEY: fixtureKey,
    },
  },
);
function stop() {
  child.kill('SIGTERM');
  fixture.close();
}
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
child.on('exit', (code) => {
  fixture.close();
  process.exit(code ?? 0);
});
