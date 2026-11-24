import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { signIn } from './helpers';

test('a teacher can release the course through topic 2.5 for one student', async ({
  page,
  browser,
  isMobile,
}) => {
  const teacherContext = await browser.newContext({
    viewport: page.viewportSize(),
    isMobile,
    hasTouch: isMobile,
  });
  teacherContext.setDefaultTimeout(5000);
  try {
    const email = await signIn(page);
    const teacher = await teacherContext.newPage();
    await signIn(teacher, `teacher-${randomUUID()}@example.test`);
    await teacher.goto('/teacher');
    await teacher
      .getByLabel('Student', { exact: true })
      .selectOption({ label: `Test learner (${email})` });
    const limit = teacher.getByLabel('Available through');
    await expect(limit).toHaveValue('');
    await limit.selectOption('2.5');
    await teacher.getByRole('button', { name: 'Save access' }).click();
    await expect(teacher.getByRole('status')).toHaveText(
      'Course access saved.',
    );

    // An already-open student tab also picks up changes from the session check.
    await page.evaluate(() => dispatchEvent(new Event('focus')));
    await expect(
      page.getByText('Your teacher has opened the course through topic 2.5.'),
    ).toBeVisible({ timeout: 15000 });
    const units = page.getByRole('navigation', { name: 'Course units' });
    await expect(
      units.getByRole('button', { name: /data collections/i }),
    ).toBeDisabled();
    await units
      .getByRole('button', { name: /selection and iteration/i })
      .click();
    const topics = page.locator('#course-topic');
    await topics.selectOption('2.5');
    await expect(topics.locator('option[value="2.6"]')).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Next topic' }),
    ).toBeDisabled();

    const html = await page.request.get('/');
    const content = await html.text();
    expect(content).toContain('Compound Boolean Expressions');
    expect(content).not.toContain('Comparing Boolean Expressions');
    const blocked = await page.request.post('/api/progress', {
      headers: { Origin: 'http://127.0.0.1:3100' },
      data: { activity: '2.6:learn' },
    });
    expect(blocked.status()).toBe(403);

    await teacher.reload();
    await teacher
      .getByLabel('Student', { exact: true })
      .selectOption({ label: `Test learner (${email})` });
    await expect(limit).toHaveValue('2.5');
    await page.getByRole('button', { name: 'Code it' }).click();
    const editor = page.getByRole('textbox', { name: 'Java code editor' });
    await editor.fill('class MyDraft {}');
    await limit.selectOption('2.6');
    await teacher.getByRole('button', { name: 'Save access' }).click();
    await expect(teacher.getByRole('status')).toHaveText(
      'Course access saved.',
    );
    await page.evaluate(() => dispatchEvent(new Event('focus')));
    await expect(
      page.getByText('Your teacher has opened the course through topic 2.6.'),
    ).toBeVisible({ timeout: 15000 });
    await expect(editor).toHaveValue('class MyDraft {}');

    await limit.selectOption('2.4');
    await teacher.getByRole('button', { name: 'Save access' }).click();
    await expect(teacher.getByRole('status')).toHaveText(
      'Course access saved.',
    );
    await page.evaluate(() => dispatchEvent(new Event('focus')));
    await expect(
      page.getByText('Your teacher has opened the course through topic 2.4.'),
    ).toBeVisible({ timeout: 15000 });
    await expect(topics).toHaveValue('1.1');

    await limit.selectOption('none');
    await teacher.getByRole('button', { name: 'Save access' }).click();
    await expect(teacher.getByRole('status')).toHaveText(
      'Course access saved.',
    );
    await page.goto('/exam/unit-1');
    await expect(page).toHaveURL('/');
    await expect(
      page.getByText('Your teacher has not opened any topics yet.'),
    ).toBeVisible();

    await limit.selectOption('');
    await teacher.getByRole('button', { name: 'Save access' }).click();
    await expect(teacher.getByRole('status')).toHaveText(
      'Course access saved.',
    );
    await page.reload();
    await expect(
      units.getByRole('button', { name: /data collections/i }),
    ).toBeEnabled();
    await teacher.getByLabel('Language').selectOption('es');
    await expect(
      teacher.getByRole('heading', { name: 'Acceso al curso' }),
    ).toBeVisible();
    await expect(teacher.getByLabel('Disponible hasta')).toHaveValue('');
    expect(
      await teacher.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await teacherContext.close();
  }
});
