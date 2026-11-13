import { test, expect } from '@playwright/test';
import { signIn } from './helpers';
test('dark theme persists through navigation, reload and language changes', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/login');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await signIn(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Language').selectOption('es');
  await page.getByRole('button', { name: 'Cambiar a tema claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test('code editor indents Enter, keeps caret, supports undo and lets Tab leave', async ({
  page,
}) => {
  await signIn(page);
  await page.getByRole('button', { name: 'Code it', exact: true }).click();
  const editor = page.getByRole('textbox', { name: 'Java code editor' });
  await editor.fill('public class Main {\n    int score = 1;');
  await editor.press('End');
  await editor.press('Enter');
  await expect(editor).toHaveValue(
    'public class Main {\n    int score = 1;\n    ',
  );
  await editor.press('ControlOrMeta+z');
  await expect(editor).toHaveValue('public class Main {\n    int score = 1;');
  await editor.fill('    if (true) {}');
  await editor.evaluate((el: HTMLTextAreaElement) => {
    const p = el.value.indexOf('}');
    el.setSelectionRange(p, p);
  });
  await editor.press('Enter');
  await expect(editor).toHaveValue('    if (true) {\n        \n    }');
  const caret = await editor.evaluate(
    (el: HTMLTextAreaElement) => el.selectionStart,
  );
  expect(caret).toBe('    if (true) {\n        '.length);
  await editor.press('Tab');
  await expect(editor).not.toBeFocused();
});
