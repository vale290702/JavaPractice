import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { signIn } from './helpers';
const origin = 'http://127.0.0.1:3100';

test('progress follows the account and stale sessions cannot change it', async ({
  browser,
}) => {
  const first = await browser.newContext();
  const second = await browser.newContext();
  const other = await browser.newContext();
  try {
    const email = await signIn(await first.newPage());
    const saved = await first.request.post('/api/progress', {
      headers: { Origin: origin },
      data: { activity: '1.1:learn' },
    });
    expect(saved.status()).toBe(200);
    expect((await saved.json()).completed).toContain('1.1:learn');
    await signIn(await second.newPage(), email);
    expect(
      (await (await second.request.get('/api/progress')).json()).completed,
    ).toContain('1.1:learn');
    expect(
      (
        await first.request.post('/api/progress', {
          headers: { Origin: origin },
          data: { activity: '1.1:example' },
        })
      ).status(),
    ).toBe(401);
    await signIn(await other.newPage());
    expect(
      (await (await other.request.get('/api/progress')).json()).completed,
    ).toEqual([]);
    expect(
      (
        await second.request.post('/api/progress', {
          headers: { Origin: 'https://other.example' },
          data: { activity: '1.1:example' },
        })
      ).status(),
    ).toBe(400);
    const denied = await second.request.get('/teacher', { maxRedirects: 0 });
    expect(denied.status()).toBe(307);
    expect(denied.headers().location).toBe('/');
  } finally {
    await first.close();
    await second.close();
    await other.close();
  }
});

test('teacher can open student progress in both languages', async ({
  page,
}) => {
  await signIn(page, `teacher-${randomUUID()}@example.test`);
  await page.goto('/teacher');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByText('Test learner').first()).toBeVisible();
  await page.getByLabel('Language').selectOption('es');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});
