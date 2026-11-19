import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { signIn } from './helpers';

test('student saves independent exam answers, submits once, and teacher reviews and downloads PDF', async ({
  page,
  browser,
}) => {
  const email = await signIn(page);
  await page.getByRole('link', { name: 'Unit 1 exam', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Unit 1 Exam',
  );
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Start exam', exact: true }).click();
  await expect(page.locator('#answer-q16a')).toBeEnabled();
  await expect(
    page.getByRole('button', {
      name: /hint|run code|virtual tutor|show solution/i,
    }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Back to learning', exact: true }),
  ).toHaveCount(0);
  await page.locator('input[name="q1"][value="A"]').check();
  await page.locator('#answer-q16a').fill('My independent written response.');
  await page
    .locator('#answer-q22code')
    .fill('My own program text — not executed.');
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Draft saved');
  await page.reload();
  await expect(page.locator('#answer-q16a')).toHaveValue(
    'My independent written response.',
  );
  await expect(page.locator('#answer-q22code')).toHaveValue(
    'My own program text — not executed.',
  );
  await page.getByRole('button', { name: 'Submit exam', exact: true }).click();
  await expect(
    page.getByRole('alert').filter({ hasText: 'unanswered fields' }),
  ).toContainText('unanswered fields');
  await page
    .getByRole('button', { name: 'Confirm final submission', exact: true })
    .click();
  await expect(page.getByRole('status')).toContainText('Submitted');
  await expect(
    page.getByRole('button', { name: 'Save draft', exact: true }),
  ).toHaveCount(0);
  await expect(page.getByRole('textbox')).toHaveCount(0);
  const aid = (await (await page.request.get('/api/auth/session')).json()).user
    .id;
  expect(
    (
      await page.request.get('/api/exam/unit-1/pdf?student=' + aid, {
        headers: { 'X-Account-ID': aid },
      })
    ).status(),
  ).toBe(401);
  const teacherContext = await browser.newContext({
    viewport: page.viewportSize() ?? undefined,
  });
  try {
    const teacher = await teacherContext.newPage();
    await signIn(teacher, `teacher-exam-${randomUUID()}@example.test`);
    await teacher.goto('/teacher/exams/unit-1');
    const row = teacher.getByRole('row').filter({ hasText: email });
    await expect(row).toBeVisible();
    await row.getByRole('button', { name: /View answers/ }).click();
    await expect(
      teacher.getByText('My independent written response.', { exact: true }),
    ).toBeVisible();
    const downloading = teacher.waitForEvent('download');
    await row.getByRole('button', { name: /Download PDF/ }).click();
    const download = await downloading;
    expect(download.suggestedFilename()).toMatch(
      /exam-Test-learner-unit-1-v1\.pdf/,
    );
    expect(await download.failure()).toBeNull();
    await teacher.setViewportSize({ width: 320, height: 900 });
    expect(
      await teacher.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await teacherContext.close();
  }
});

test('exam rejects displaced sessions and a student cannot export another account', async ({
  browser,
}) => {
  const a = await browser.newContext(),
    b = await browser.newContext();
  try {
    const page = await a.newPage();
    const email = await signIn(page);
    const aid = (await (await a.request.get('/api/auth/session')).json()).user
      .id;
    const initial = await a.request.get('/api/exam/unit-1', {
      headers: { 'X-Account-ID': aid },
    });
    expect(initial.status()).toBe(200);
    await signIn(await b.newPage(), email);
    expect(
      (
        await a.request.get('/api/exam/unit-1', {
          headers: { 'X-Account-ID': aid },
        })
      ).status(),
    ).toBe(401);
    const bid = (await (await b.request.get('/api/auth/session')).json()).user
      .id;
    expect(
      (
        await b.request.get(
          '/api/exam/unit-1/submissions?student=' + randomUUID(),
          { headers: { 'X-Account-ID': bid } },
        )
      ).status(),
    ).toBe(401);
  } finally {
    await a.close();
    await b.close();
  }
});
