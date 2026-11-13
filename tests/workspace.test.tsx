import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LearningWorkspace } from '../src/components/learning-workspace';
import { CurriculumProvider } from '../src/features/curriculum/provider';
import { units } from '../src/features/curriculum';
const student = {
  id: '11111111-1111-4111-8111-111111111111',
  email: 'learner@example.test',
  displayName: 'Learner',
  role: 'student' as const,
};
function renderWorkspace(account = student, initialCompleted: string[] = []) {
  return render(
    <CurriculumProvider units={units}>
      <LearningWorkspace user={account} initialCompleted={initialCompleted} />
    </CurriculumProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    'fetch',
    vi.fn(
      async (_url, init) =>
        new Response(
          JSON.stringify({ completed: [JSON.parse(init.body).activity] }),
        ),
    ),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe('learning workspace', () => {
  it('uses server progress without importing browser progress and waits for confirmation', async () => {
    localStorage.setItem(
      'java-practice:progress:v1',
      JSON.stringify({ version: 1, completed: ['1.1:learn'] }),
    );
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 503 }));
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(
      screen.getByRole('button', { name: 'Mark as understood' }),
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'could not save',
    );
    expect(
      screen.queryByRole('button', { name: 'Understood' }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Try saving again' }));
    expect(
      await screen.findByRole('button', { name: 'Understood' }),
    ).toBeDisabled();
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/progress',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ activity: '1.1:learn' }),
      }),
    );
  });
  it('keeps completion pending until the server confirms it', async () => {
    let resolve!: (response: Response) => void;
    vi.mocked(fetch).mockReturnValueOnce(
      new Promise((done) => {
        resolve = done;
      }),
    );
    const user = userEvent.setup();
    renderWorkspace();
    await user.click(
      screen.getByRole('button', { name: 'Mark as understood' }),
    );
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
    expect(
      screen.queryByRole('button', { name: 'Understood' }),
    ).not.toBeInTheDocument();
    await act(async () =>
      resolve(new Response(JSON.stringify({ completed: ['1.1:learn'] }))),
    );
    expect(
      await screen.findByRole('button', { name: 'Understood' }),
    ).toBeDisabled();
  });
  it('hydrates confirmed progress from the server', () => {
    renderWorkspace(student, ['1.1:learn']);
    expect(screen.getByRole('button', { name: 'Understood' })).toBeDisabled();
  });
  it('shows all four units and opens the final topic in Data Collections', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    const navigation = screen.getByRole('navigation', { name: 'Course units' });
    expect(navigation.querySelectorAll('button')).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: /Data Collections/ }));
    await user.selectOptions(screen.getByLabelText('Choose a topic'), '4.17');
    expect(
      screen.getByRole('heading', { name: 'Recursive Searching and Sorting' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Source PDF page 128/)).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('Language'), 'es');
    expect(screen.getByLabelText('Elige un tema')).toHaveValue('4.17');
    await user.click(
      screen.getByRole('button', { name: /Uso de objetos y métodos/ }),
    );
    await user.selectOptions(screen.getByLabelText('Elige un tema'), '1.4');
    expect(screen.getByText('input contiene "12"')).toBeInTheDocument();
  });
  it('preserves work when switching languages and explains quiz answers', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.selectOptions(screen.getByLabelText('Choose a topic'), '1.2');
    await user.click(screen.getByRole('button', { name: 'Practice' }));
    await user.click(screen.getByRole('button', { name: /Show next hint/ }));
    expect(screen.getByRole('list', { name: 'Hints' })).toHaveTextContent(
      'age: 15',
    );
    await user.type(screen.getByLabelText('Your answer'), '16');
    await user.selectOptions(screen.getByLabelText('Language'), 'es');
    expect(screen.getByLabelText('Tu respuesta')).toHaveValue('16');
    await user.click(
      screen.getByRole('button', { name: 'Comprobar respuesta' }),
    );
    expect(screen.getByRole('status')).toHaveTextContent('Lo entendiste.');
    await user.click(
      screen.getByRole('button', { name: 'Marcar como comprendido' }),
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Comprendido' }),
      ).toBeDisabled(),
    );
    await user.click(screen.getByRole('button', { name: 'Comprueba' }));
    await user.click(screen.getByLabelText('String language = "Java";'));
    await user.click(
      screen.getByRole('button', { name: 'Comprobar respuesta' }),
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      'String es el tipo de Java',
    );
  });
  it('shows progressive hints, keeps code across activities and never claims execution', async () => {
    const user = userEvent.setup();
    renderWorkspace();
    await user.selectOptions(screen.getByLabelText('Choose a topic'), '1.2');
    await user.click(screen.getByRole('button', { name: 'Code it' }));
    expect(
      screen.getByText(/Java execution is not connected/),
    ).toBeInTheDocument();
    await user.clear(screen.getByLabelText('Java code editor'));
    await user.type(
      screen.getByLabelText('Java code editor'),
      'int points = 20;',
    );
    await user.click(screen.getByRole('button', { name: /Show next hint/ }));
    expect(screen.getByRole('list', { name: 'Hints' })).toHaveTextContent(
      'int points = 20;',
    );
    await user.click(screen.getByRole('button', { name: 'Understand' }));
    await user.click(screen.getByRole('button', { name: 'Code it' }));
    expect(screen.getByLabelText('Java code editor')).toHaveValue(
      'int points = 20;',
    );
    await user.selectOptions(screen.getByLabelText('Choose a topic'), '1.3');
    await user.click(screen.getByRole('button', { name: 'Code it' }));
    expect(screen.getByLabelText('Java code editor')).not.toHaveValue(
      'int points = 20;',
    );
    await user.type(screen.getByLabelText('Java code editor'), ' ');
    await user.selectOptions(screen.getByLabelText('Choose a topic'), '1.2');
    await user.click(screen.getByRole('button', { name: 'Code it' }));
    expect(screen.getByLabelText('Java code editor')).toHaveValue(
      'int points = 20;',
    );
  });
});
