import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { signIn, newTestEmail } from './helpers';
const origin = 'http://127.0.0.1:3100';
const work = {
  prediction: 'Five rows',
  trace: 'One println per row',
  files: { 'Main.java': 'public class Main {}' },
  results: 'Recorded from my IDE',
  explanation: 'Spaces and punctuation matter',
};

test('student saves extra practice across reloads and keeps independent work separate', async ({
  page,
}) => {
  await signIn(page);
  await page
    .getByRole('button', { name: 'Extra Practice', exact: true })
    .click();
  const extra = page.getByRole('region', {
    name: 'Extra Practice',
    exact: true,
  });
  await expect(extra.getByLabel('Prediction')).toBeEnabled();
  const tutor = extra.getByRole('region', {
    name: 'Virtual tutor',
    exact: true,
  });
  await expect(tutor.getByText('Step 1 of 4')).toBeVisible();
  await tutor.getByRole('button', { name: 'Next step', exact: true }).click();
  await expect(tutor.getByText('Step 2 of 4')).toBeVisible();
  await tutor
    .getByRole('button', { name: 'Previous step', exact: true })
    .click();
  await expect(
    tutor.getByRole('button', { name: 'Previous step', exact: true }),
  ).toBeDisabled();
  await extra.getByLabel('Prediction').fill(work.prediction);
  await page
    .getByRole('navigation', { name: 'Course units' })
    .getByRole('button')
    .first()
    .click();
  await expect(extra).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Extra Practice', exact: true })
    .click();
  await expect(extra.getByLabel('Prediction')).toHaveValue(work.prediction);
  await extra.getByLabel('Trace your reasoning').fill(work.trace);
  await extra
    .getByRole('textbox', { name: 'Main.java', exact: true })
    .fill(work.files['Main.java']);
  await extra.getByLabel('Testing and results').fill(work.results);
  await extra.getByLabel('Explain what you learned').fill(work.explanation);
  await extra
    .getByRole('button', { name: 'Save worksheet', exact: true })
    .click();
  await expect(extra.getByRole('status')).toContainText(
    'Saved to your account',
  );
  await extra
    .getByRole('button', { name: 'Mark complete', exact: true })
    .click();
  await expect(
    extra.getByRole('button', { name: 'Completed · self-reported' }),
  ).toBeDisabled();
  await page.reload();
  await page
    .getByRole('button', { name: 'Extra Practice', exact: true })
    .click();
  await expect(extra.getByLabel('Prediction')).toHaveValue(work.prediction);
  await extra
    .getByRole('button', { name: 'Try it yourself', exact: true })
    .click();
  await expect(extra.getByLabel('Prediction')).toHaveValue('');
  await page.getByLabel('Language').selectOption('es');
  await expect(
    page.getByRole('region', { name: 'Práctica adicional' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('worksheet versions, displaced sessions and account-switch assertions protect saved answers', async ({
  browser,
}) => {
  const context = await browser.newContext(),
    other = await browser.newContext();
  try {
    const page = await context.newPage();
    const email = await signIn(page);
    const aid = (await (await context.request.get('/api/auth/session')).json())
      .user.id;
    const headers = { Origin: origin, 'X-Account-ID': aid };
    const first = await context.request.post('/api/extra-practice', {
      headers,
      data: { id: 'a1-guided', version: 0, work, completed: true },
    });
    expect(first.status()).toBe(200);
    expect(
      (
        await context.request.post('/api/extra-practice', {
          headers,
          data: { id: 'a1-guided', version: 0, work, completed: true },
        })
      ).status(),
    ).toBe(409);
    await signIn(await other.newPage(), email);
    expect(
      (
        await context.request.get('/api/extra-practice?id=a1-guided', {
          headers,
        })
      ).status(),
    ).toBe(401);
    const replacement = await context.newPage();
    await signIn(replacement, newTestEmail());
    expect(
      (
        await context.request.get('/api/extra-practice?id=a1-guided', {
          headers,
        })
      ).status(),
    ).toBe(401);
    expect(
      (
        await context.request.post('/api/extra-practice', {
          headers,
          data: { id: 'a1-guided', version: 0, work, completed: true },
        })
      ).status(),
    ).toBe(401);
    const bid = (await (await context.request.get('/api/auth/session')).json())
      .user.id;
    const fresh = await context.request.get(
      '/api/extra-practice?id=a1-guided',
      { headers: { 'X-Account-ID': bid } },
    );
    expect(fresh.status()).toBe(200);
    expect((await fresh.json()).worksheet).toBeNull();
  } finally {
    await context.close();
    await other.close();
  }
});

test('topic 1.10 exposes supplied read-only helpers and teacher extra totals stay separate', async ({
  page,
}) => {
  const studentEmail = await signIn(page);
  await page.getByLabel('Choose a topic').selectOption('1.10');
  await page
    .getByRole('button', { name: 'Extra Practice', exact: true })
    .click();
  const extra = page.getByRole('region', {
    name: 'Extra Practice',
    exact: true,
  });
  await extra
    .getByRole('combobox', { name: 'Choose a worksheet' })
    .selectOption('b5');
  await extra.getByRole('button', { name: 'Logger.java', exact: true }).click();
  await expect(
    extra.getByRole('textbox', { name: 'Logger.java', exact: true }),
  ).toHaveAttribute('readonly');
  const id = (await (await page.request.get('/api/auth/session')).json()).user
    .id;
  await page.request.post('/api/extra-practice', {
    headers: { Origin: origin, 'X-Account-ID': id },
    data: { id: 'a1-guided', version: 0, work, completed: true },
  });
  await signIn(page, `teacher-extra-${randomUUID()}@example.test`);
  await page.goto('/teacher');
  await expect(
    page.getByRole('columnheader', { name: 'Extra Practice' }),
  ).toBeVisible();
  await expect(
    page.getByRole('row').filter({ hasText: studentEmail }).getByText('1 / 46'),
  ).toBeAttached();
});

test('Unit 2 algorithms save as text and Bill helpers stay scoped to guided work', async ({
  page,
}) => {
  await signIn(page);
  await page
    .getByRole('button', { name: 'Extra Practice', exact: true })
    .click();
  const extra = page.getByRole('region', {
    name: 'Extra Practice',
    exact: true,
  });
  const select = extra.getByRole('combobox', { name: 'Choose a worksheet' });
  await select.selectOption('c1');
  await expect(
    extra.getByRole('textbox', { name: 'Algorithm.txt', exact: true }),
  ).toBeEnabled();
  await expect(extra.getByText(/javac/)).toHaveCount(0);
  await extra
    .getByRole('textbox', { name: 'Algorithm.txt', exact: true })
    .fill('Check balance. Repeat until three tickets have been bought.');
  await extra
    .getByRole('button', { name: 'Save worksheet', exact: true })
    .click();
  await expect(extra.getByRole('status')).toContainText(
    'Saved to your account',
  );
  await page.reload();
  await page
    .getByRole('button', { name: 'Extra Practice', exact: true })
    .click();
  await select.selectOption('c1');
  await expect(
    extra.getByRole('textbox', { name: 'Algorithm.txt', exact: true }),
  ).toHaveValue('Check balance. Repeat until three tickets have been bought.');
  await select.selectOption('c3');
  await expect(
    extra.getByText(
      'javac Bill.java BillRunner.java BillBoundaryRunner.java java BillRunner',
    ),
  ).toBeVisible();
  await extra
    .getByRole('button', { name: 'BillRunner.java', exact: true })
    .click();
  await expect(
    extra.getByRole('textbox', { name: 'BillRunner.java', exact: true }),
  ).toHaveAttribute('readonly');
  await extra
    .getByRole('button', { name: 'Try it yourself', exact: true })
    .click();
  await expect(
    extra.getByRole('textbox', { name: 'ParkingFee.java', exact: true }),
  ).toBeEnabled();
  await expect(
    extra.getByRole('button', { name: 'BillRunner.java', exact: true }),
  ).toHaveCount(0);
  await page.getByLabel('Language').selectOption('es');
  await expect(
    page.getByRole('heading', { name: 'Requisitos de la tarea' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
