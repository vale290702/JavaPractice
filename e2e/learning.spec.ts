import { test, expect } from '@playwright/test';
import { signIn } from './helpers';
test.beforeEach(async ({ page }) => {
  await signIn(page);
});
test('student can learn, practice and resume in Spanish', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('navigation', { name: 'Course units' }).getByRole('button'),
  ).toHaveCount(4);
  await page.getByLabel('Choose a topic').selectOption('1.2');
  await page.getByRole('button', { name: 'Next step', exact: true }).click();
  await expect(page.getByText('score = 15', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await page.getByLabel('Your answer').fill('16');
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await page.getByRole('button', { name: 'Mark as understood' }).click();
  await page.getByLabel('Language').selectOption('es');
  await expect(
    page.getByRole('button', { name: 'Comprendido', exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Dale sentido a Java.' }),
  ).toBeVisible();
  await page.getByLabel('Elige un tema').selectOption('1.2');
  await page.getByRole('button', { name: 'Practica', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Comprendido', exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test('four-unit navigation reaches the last topic in each unit', async ({
  page,
}) => {
  await page.goto('/');
  for (const [name, lastTopic] of [
    ['Using Objects and Methods', '1.15'],
    ['Selection and Iteration', '2.12'],
    ['Class Creation', '3.9'],
    ['Data Collections', '4.17'],
  ]) {
    await page.getByRole('button', { name: new RegExp(name) }).click();
    await page.getByLabel('Choose a topic').selectOption(lastTopic);
    await expect(page.getByLabel('Choose a topic')).toHaveValue(lastTopic);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test('continue crosses unit boundaries in curriculum order', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Choose a topic').selectOption('1.15');
  await page.getByRole('button', { name: 'Code it', exact: true }).click();
  await page
    .getByRole('button', { name: 'Keep learning', exact: true })
    .click();
  await expect(page.getByLabel('Choose a topic')).toHaveValue('2.1');
  await expect(
    page.getByRole('heading', { name: 'Unit 2: Selection and Iteration' }),
  ).toBeVisible();
});
