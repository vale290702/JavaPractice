import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ExtraPractice } from '../src/components/extra-practice/extra-practice';
import type { ExtraActivity } from '../src/features/extra-practice/types';
vi.mock('../src/components/auth/request', () => ({ authRequest: vi.fn() }));
vi.mock('../src/components/auth/navigation', () => ({ navigate: vi.fn() }));
import { authRequest } from '../src/components/auth/request';
const worksheet = {
  id: 'a1-guided',
  prompt: { en: 'Predict this program', es: 'Predice este programa' },
  steps: { en: ['Read the code'], es: ['Lee el código'] },
  files: [{ name: 'Main.java', code: 'class Main {}' }],
  sourcePages: [1],
};
const activity: ExtraActivity = {
  id: 'a1',
  topicId: '1.1',
  group: '1.1–1.5',
  title: { en: 'First program', es: 'Primer programa' },
  goal: { en: 'Understand output', es: 'Comprende la salida' },
  guided: worksheet,
  independent: { ...worksheet, id: 'a1-independent' },
  helpers: [{ name: 'Helper.java', code: 'class Helper {}', readOnly: true }],
};
const mock = vi.mocked(authRequest);
afterEach(cleanup);
beforeEach(() => {
  localStorage.clear();
  mock.mockReset();
  mock.mockResolvedValue(new Response(JSON.stringify({ worksheet: null })));
});
it('shows localized worksheets and read-only reference tabs without a run button', async () => {
  render(<ExtraPractice activities={[activity]} locale="es" userId="one" />);
  await screen.findByLabelText('Predicción');
  expect(screen.getByText('Práctica adicional')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Helper.java' }));
  expect(screen.getByLabelText('Helper.java')).toHaveAttribute('readonly');
  expect(screen.queryByRole('button', { name: /run|ejecutar/i })).toBeNull();
  fireEvent.click(
    screen.getByRole('button', { name: 'Inténtalo por tu cuenta' }),
  );
  await waitFor(() =>
    expect(mock).toHaveBeenCalledWith('/api/extra-practice?id=a1-independent', {
      headers: { 'X-Account-ID': 'one' },
    }),
  );
});
it('backs up drafts immediately and isolates accounts', async () => {
  const view = render(
    <ExtraPractice activities={[activity]} locale="en" userId="one" />,
  );
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  fireEvent.change(screen.getByLabelText('Prediction'), {
    target: { value: 'My prediction' },
  });
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toContain(
    'My prediction',
  );
  view.rerender(
    <ExtraPractice activities={[activity]} locale="en" userId="two" />,
  );
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).toHaveValue(''),
  );
});
it('preserves a conflicted local draft and disables saving until explicit recovery', async () => {
  localStorage.setItem(
    'extra-practice:one:a1-guided',
    JSON.stringify({
      version: 0,
      work: {
        prediction: 'keep me',
        trace: '',
        files: { 'Main.java': 'class Main {}' },
        results: '',
        explanation: '',
      },
      completed: false,
    }),
  );
  mock.mockImplementation(
    async () =>
      new Response(
        JSON.stringify({
          worksheet: {
            id: 'a1-guided',
            version: 2,
            work: {
              prediction: 'remote',
              trace: '',
              files: { 'Main.java': 'x' },
              results: '',
              explanation: '',
            },
            completed: false,
            updatedAt: '2026-11-16T00:00:00Z',
          },
        }),
      ),
  );
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await screen.findByRole('button', {
    name: 'Load latest and replace local draft',
  });
  expect(screen.getByRole('button', { name: 'Save worksheet' })).toBeDisabled();
  expect(screen.getByLabelText('Prediction')).toHaveValue('keep me');
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toContain(
    'keep me',
  );
  fireEvent.click(
    screen.getByRole('button', { name: 'Load latest and replace local draft' }),
  );
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).toHaveValue('remote'),
  );
});
it('fails closed on load errors and supports retry', async () => {
  mock.mockRejectedValueOnce(new Error('offline'));
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await screen.findByRole('button', { name: 'Retry loading' });
  expect(screen.getByLabelText('Prediction')).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Retry loading' }));
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
});
it('saves explicitly and leaves work intact after a save error', async () => {
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  fireEvent.change(screen.getByLabelText('Prediction'), {
    target: { value: 'draft' },
  });
  mock.mockRejectedValueOnce(new Error('offline'));
  fireEvent.click(screen.getByRole('button', { name: 'Save worksheet' }));
  await screen.findByText(/could not be saved/);
  expect(screen.getByLabelText('Prediction')).toHaveValue('draft');
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toContain(
    'draft',
  );
});
it('shows an honest empty state', () => {
  render(<ExtraPractice activities={[]} locale="en" userId="one" />);
  expect(
    screen.getByText('No additional worksheet is available for this topic.'),
  ).toBeVisible();
  expect(mock).not.toHaveBeenCalled();
});

it('saves all fields and records completion only after confirmation', async () => {
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  expect(screen.getByRole('button', { name: 'Mark complete' })).toBeDisabled();
  for (const label of [
    'Prediction',
    'Trace your reasoning',
    'Testing and results',
    'Explain what you learned',
  ]) {
    fireEvent.change(screen.getByLabelText(label), {
      target: { value: 'My note' },
    });
  }
  mock.mockImplementationOnce(async (_path, init) => {
    const body = JSON.parse(init!.body as string);
    expect(init!.headers).toEqual({
      'Content-Type': 'application/json',
      'X-Account-ID': 'one',
    });
    expect(body.completed).toBe(true);
    expect(body.version).toBe(0);
    return new Response(
      JSON.stringify({
        worksheet: { ...body, version: 1, updatedAt: '2026-11-16T00:00:00Z' },
      }),
    );
  });
  fireEvent.click(screen.getByRole('button', { name: 'Mark complete' }));
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Completed · self-reported' }),
    ).toBeDisabled(),
  );
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toBeNull();
});

it('keeps a draft after a concurrent save conflict', async () => {
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  fireEvent.change(screen.getByLabelText('Prediction'), {
    target: { value: 'Unsynced work' },
  });
  mock.mockResolvedValueOnce(
    new Response(JSON.stringify({ code: 'conflict' }), { status: 409 }),
  );
  fireEvent.click(screen.getByRole('button', { name: 'Save worksheet' }));
  await screen.findByRole('button', {
    name: 'Load latest and replace local draft',
  });
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toContain(
    'Unsynced work',
  );
  expect(screen.getByRole('button', { name: 'Save worksheet' })).toBeDisabled();
});

it('ends access after a 401 while preserving the local draft', async () => {
  const { navigate } = await import('../src/components/auth/navigation');
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  fireEvent.change(screen.getByLabelText('Prediction'), {
    target: { value: 'Keep this' },
  });
  mock.mockResolvedValueOnce(new Response('{}', { status: 401 }));
  fireEvent.click(screen.getByRole('button', { name: 'Save worksheet' }));
  await screen.findByText('Your session ended. Sign in again to continue.');
  expect(navigate).toHaveBeenCalledWith('/login?reason=ended');
  expect(screen.getByLabelText('Prediction')).toBeDisabled();
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toContain(
    'Keep this',
  );
});

it.each([
  {},
  {
    worksheet: {
      id: 'different',
      version: 1,
      completed: false,
      updatedAt: '2026-11-16T00:00:00Z',
      work: {
        prediction: '',
        trace: '',
        results: '',
        explanation: '',
        files: { 'Main.java': 'code' },
      },
    },
  },
  {
    worksheet: {
      id: 'a1-guided',
      version: 1,
      completed: false,
      updatedAt: 'invalid',
      work: {
        prediction: '',
        trace: '',
        results: '',
        explanation: '',
        files: { 'Main.java': 'code' },
      },
    },
  },
  {
    worksheet: {
      id: 'a1-guided',
      version: 1,
      completed: false,
      updatedAt: '2026-11-16T00:00:00Z',
      work: {
        prediction: '',
        trace: '',
        results: '',
        explanation: '',
        files: { 'Wrong.java': 'code' },
      },
    },
  },
])('fails closed on malformed saved responses: %j', async (payload) => {
  mock.mockResolvedValueOnce(new Response(JSON.stringify(payload)));
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await screen.findByRole('button', { name: 'Retry loading' });
  expect(screen.getByLabelText('Prediction')).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Save worksheet' })).toBeDisabled();
});

it('does not replace work after a malformed successful save', async () => {
  render(<ExtraPractice activities={[activity]} locale="en" userId="one" />);
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  fireEvent.change(screen.getByLabelText('Prediction'), {
    target: { value: 'Preserve me' },
  });
  mock.mockResolvedValueOnce(new Response(JSON.stringify({ worksheet: null })));
  fireEvent.click(screen.getByRole('button', { name: 'Save worksheet' }));
  await screen.findByText(/could not be saved/);
  expect(screen.getByLabelText('Prediction')).toHaveValue('Preserve me');
  expect(localStorage.getItem('extra-practice:one:a1-guided')).toContain(
    'Preserve me',
  );
});
it('guides the student one step at a time through the virtual tutor', async () => {
  const guidedActivity: ExtraActivity = {
    ...activity,
    guided: {
      ...worksheet,
      steps: {
        en: ['Predict the output', 'Trace each line', 'Compare the results'],
        es: ['Predice la salida', 'Traza cada línea', 'Compara los resultados'],
      },
    },
  };
  const view = render(
    <ExtraPractice activities={[guidedActivity]} locale="en" userId="one" />,
  );
  await waitFor(() =>
    expect(screen.getByLabelText('Prediction')).not.toBeDisabled(),
  );
  expect(screen.getByRole('button', { name: 'Virtual tutor' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(screen.getByText('Step 1 of 3')).toBeVisible();
  expect(screen.getByText('Predict the output')).toBeVisible();
  expect(screen.queryByText('Trace each line')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Previous step' })).toBeDisabled();
  fireEvent.change(screen.getByLabelText('Prediction'), {
    target: { value: 'My prediction' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Next step' }));
  expect(screen.getByText('Trace each line')).toBeVisible();
  expect(screen.getByLabelText('Prediction')).toHaveValue('My prediction');
  view.rerender(
    <ExtraPractice activities={[guidedActivity]} locale="es" userId="one" />,
  );
  expect(screen.getByText('Paso 2 de 3')).toBeVisible();
  expect(screen.getByText('Traza cada línea')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Paso anterior' }));
  expect(screen.getByText('Predice la salida')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Siguiente paso' }));
  fireEvent.click(screen.getByRole('button', { name: 'Siguiente paso' }));
  expect(screen.getByText('Compara los resultados')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Siguiente paso' })).toBeDisabled();
  fireEvent.click(
    screen.getByRole('button', { name: 'Inténtalo por tu cuenta' }),
  );
  expect(
    screen.queryByRole('region', { name: 'Tutor virtual' }),
  ).not.toBeInTheDocument();
  expect(screen.getByText('Lee el código')).toBeVisible();
});
