import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { StudentExam } from '../src/components/exam/student-exam';
import { unit1Exam } from '../src/features/exams/unit-1-v1';
import { emptyAnswers } from '../src/features/exams/metadata';
import { authRequest } from '../src/components/auth/request';
vi.mock('../src/components/auth/request', () => ({ authRequest: vi.fn() }));
const user = {
  id: 'student',
  displayName: 'Student',
  email: 's@example.test',
  role: 'student' as const,
};
const attempt = {
  examId: 'unit-1',
  examVersion: 'unit-1-v1',
  version: 1,
  status: 'draft',
  locale: 'en',
  answers: emptyAnswers(),
  startedAt: '2026-11-19T12:00:00Z',
  updatedAt: '2026-11-19T12:00:00Z',
  submittedAt: null,
};
const respond = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), { status });
beforeEach(() => {
  vi.stubGlobal('localStorage', window.localStorage);
  localStorage.clear();
  vi.mocked(authRequest).mockReset();
});
afterEach(cleanup);
it('fails closed when the saved draft is unavailable', async () => {
  vi.mocked(authRequest).mockRejectedValue(Error());
  render(<StudentExam user={user} exam={unit1Exam} />);
  expect(await screen.findByText(/Editing is locked/)).toBeInTheDocument();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
it('requires acknowledgement and a successful start before displaying questions', async () => {
  vi.mocked(authRequest)
    .mockResolvedValueOnce(respond({ attempt: null }))
    .mockResolvedValueOnce(respond({ attempt }));
  render(<StudentExam user={user} exam={unit1Exam} />);
  const start = await screen.findByRole('button', { name: 'Start exam' });
  expect(start).toBeDisabled();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(start);
  await screen.findByRole('button', { name: 'Save draft' });
  const body = JSON.parse(
    vi.mocked(authRequest).mock.calls[1][1]?.body as string,
  );
  expect(Object.keys(body.answers)).toHaveLength(42);
  expect(body).toMatchObject({ version: 0, submit: false, acknowledged: true });
  expect(screen.getAllByRole('textbox')).toHaveLength(27);
});
it('backs up edits immediately and requires inline confirmation before atomic submission', async () => {
  vi.mocked(authRequest)
    .mockResolvedValueOnce(respond({ attempt }))
    .mockImplementation(async (_path, init) => {
      const body = JSON.parse(init?.body as string);
      return respond({
        attempt: {
          ...attempt,
          version: 2,
          status: 'submitted',
          answers: body.answers,
          submittedAt: '2026-11-19T13:00:00Z',
        },
      });
    });
  render(<StudentExam user={user} exam={unit1Exam} />);
  await screen.findByRole('button', { name: 'Save draft' });
  const field = screen.getAllByRole('textbox')[0];
  fireEvent.change(field, { target: { value: 'my latest answer' } });
  expect(
    JSON.parse(localStorage.getItem('java-practice:exam:student:unit-1-v1')!)
      .answers.q16a,
  ).toBe('my latest answer');
  fireEvent.click(screen.getByRole('button', { name: 'Submit exam' }));
  expect(authRequest).toHaveBeenCalledTimes(1);
  fireEvent.click(
    screen.getByRole('button', { name: 'Confirm final submission' }),
  );
  await waitFor(() =>
    expect(
      screen.queryByRole('button', { name: 'Save draft' }),
    ).not.toBeInTheDocument(),
  );
  const body = JSON.parse(
    vi.mocked(authRequest).mock.calls[1][1]?.body as string,
  );
  expect(body).toMatchObject({
    version: 1,
    submit: true,
    answers: { q16a: 'my latest answer' },
  });
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
it('preserves a local backup until explicit restoration and blocks editing after version conflict', async () => {
  const local = {
    version: 1,
    locale: 'en',
    answers: { ...emptyAnswers(), q16a: 'local work' },
  };
  localStorage.setItem(
    'java-practice:exam:student:unit-1-v1',
    JSON.stringify(local),
  );
  vi.mocked(authRequest)
    .mockResolvedValueOnce(respond({ attempt }))
    .mockResolvedValueOnce(respond({ code: 'conflict' }, 409));
  render(<StudentExam user={user} exam={unit1Exam} />);
  await screen.findByRole('button', { name: 'Restore local backup' });
  expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
  expect(
    JSON.parse(localStorage.getItem('java-practice:exam:student:unit-1-v1')!)
      .answers.q16a,
  ).toBe('local work');
  fireEvent.click(screen.getByRole('button', { name: 'Restore local backup' }));
  expect(screen.getAllByRole('textbox')[0]).toHaveValue('local work');
  fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));
  await screen.findByText(/This draft changed in another session/);
  expect(screen.getAllByRole('textbox')[0]).toBeDisabled();
  expect(
    screen.getByRole('button', { name: 'Load saved version' }),
  ).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem('java-practice:exam:student:unit-1-v1')!)
      .answers.q16a,
  ).toBe('local work');
});
it('accepts a submitted conflict response as immutable and rejects malformed remote answers', async () => {
  vi.mocked(authRequest)
    .mockResolvedValueOnce(respond({ attempt }))
    .mockResolvedValueOnce(
      respond(
        {
          code: 'submitted',
          attempt: {
            ...attempt,
            status: 'submitted',
            submittedAt: '2026-11-19T13:00:00Z',
          },
        },
        409,
      ),
    );
  const view = render(<StudentExam user={user} exam={unit1Exam} />);
  await screen.findByRole('button', { name: 'Save draft' });
  fireEvent.click(screen.getByRole('button', { name: 'Save draft' }));
  await waitFor(() =>
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument(),
  );
  expect(screen.getByText('Submitted')).toBeInTheDocument();
  view.unmount();
  vi.mocked(authRequest).mockResolvedValueOnce(
    respond({ attempt: { ...attempt, answers: { q1: 'A' } } }),
  );
  render(<StudentExam user={user} exam={unit1Exam} />);
  expect(await screen.findByText(/Editing is locked/)).toBeInTheDocument();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
