import { test, expect } from '@playwright/test';
import { newTestEmail, signIn, testPassword } from './helpers';

test('anonymous visitors cannot access learning data or create accounts', async ({
  page,
  request,
}) => {
  const response = await request.get('/', { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/login');
  const session = await request.get('/api/auth/session');
  expect(session.status()).toBe(401);
  const signup = await request.post('/api/auth/signup', {
    data: { email: newTestEmail(), password: testPassword },
  });
  expect(signup.status()).toBe(404);
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Welcome back.' }),
  ).toBeVisible();
  expect(await page.content()).not.toContain('An algorithm is an ordered plan');
  await expect(
    page.getByRole('link', { name: /register|sign up/i }),
  ).toHaveCount(0);
  await page.getByLabel('Language').selectOption('es');
  await expect(
    page.getByRole('button', { name: 'Iniciar sesión', exact: true }),
  ).toBeVisible();
});

test('new login rejects the previous browser without affecting a different account', async ({
  browser,
}) => {
  const first = await browser.newContext(),
    second = await browser.newContext(),
    other = await browser.newContext();
  const pageA = await first.newPage(),
    pageB = await second.newPage(),
    pageC = await other.newPage();
  try {
    const email = await signIn(pageA);
    await signIn(pageC);
    await signIn(pageB, email);
    expect((await first.request.get('/api/auth/session')).status()).toBe(401);
    expect((await second.request.get('/api/auth/session')).status()).toBe(200);
    expect((await other.request.get('/api/auth/session')).status()).toBe(200);
    // A stale logout may only revoke its old digest, never the newer browser's session.
    await first.request.post('/api/auth/logout', {
      headers: { Origin: 'http://127.0.0.1:3100' },
    });
    expect((await second.request.get('/api/auth/session')).status()).toBe(200);
    await pageA.evaluate(() => window.dispatchEvent(new Event('focus')));
    await expect(pageA).toHaveURL(/\/login\?reason=ended/);
    await expect(
      pageA.getByRole('navigation', { name: 'Course units' }),
    ).toHaveCount(0);
    await pageB.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(pageB).toHaveURL(/\/login$/);
    expect((await second.request.get('/api/auth/session')).status()).toBe(401);
  } finally {
    await first.close();
    await second.close();
    await other.close();
  }
});

test('wrong passwords and cross-origin login do not create a session', async ({
  page,
  request,
}) => {
  await page.goto('/login');
  await page.getByLabel('Email', { exact: true }).fill(newTestEmail());
  await page.getByLabel('Password', { exact: true }).fill('incorrect-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Welcome back.' }).getByRole('alert'),
  ).toHaveText('Check your email and password, then try again.');
  expect((await page.request.get('/api/auth/session')).status()).toBe(401);
  const rejected = await request.post('/api/auth/login', {
    headers: { Origin: 'https://other.example' },
    data: { email: newTestEmail(), password: testPassword },
  });
  expect(rejected.status()).toBe(400);
});
