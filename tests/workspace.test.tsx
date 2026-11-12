import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LearningWorkspace } from '../src/components/learning-workspace';
beforeEach(() => localStorage.clear());
afterEach(cleanup);
describe('learning workspace', () => {
  it('shows all four units and opens the final topic in Data Collections', async () => {
    const user = userEvent.setup();
    render(<LearningWorkspace />);
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
    render(<LearningWorkspace />);
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
    expect(localStorage.getItem('java-practice:progress:v1')).toContain(
      '1.2:practice',
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
    render(<LearningWorkspace />);
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
