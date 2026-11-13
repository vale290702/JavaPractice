import { randomUUID } from 'node:crypto';
import { expect, type Page } from '@playwright/test';
export const testPassword = 'test-only-password-123';
export function newTestEmail() {
  return `student-${randomUUID()}@example.test`;
}
export async function signIn(page: Page, email = newTestEmail()) {
  await page.goto('/login');
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByLabel('Password', { exact: true }).fill(testPassword);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(
    page.getByRole('navigation', { name: 'Course units' }),
  ).toBeVisible();
  return email;
}
