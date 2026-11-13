import React from 'react';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { TeacherOverview } from '../src/components/teacher-overview';
import { AccountControls } from '../src/components/auth/account-controls';
const teacher = {
  id: 't',
  email: 't@example.test',
  displayName: 'Tutor',
  role: 'teacher' as const,
};
beforeEach(() => localStorage.clear());
afterEach(cleanup);
it('offers the student progress link only to teachers', () => {
  const view = render(<AccountControls user={teacher} />);
  expect(
    screen.getByRole('link', { name: 'Student progress' }),
  ).toHaveAttribute('href', '/teacher');
  view.rerender(<AccountControls user={{ ...teacher, role: 'student' }} />);
  expect(
    screen.queryByRole('link', { name: 'Student progress' }),
  ).not.toBeInTheDocument();
});
it('uses the saved Spanish preference for the helpful empty state', () => {
  localStorage.setItem('java-practice:locale', 'es');
  render(<TeacherOverview user={teacher} students={[]} />);
  expect(
    screen.getByRole('heading', { name: 'Progreso de estudiantes' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Todavía no hay estudiantes.')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Volver a practicar' }),
  ).toHaveAttribute('href', '/');
});
it('shows account access and completed activities by unit, including students without progress', () => {
  render(
    <TeacherOverview
      user={teacher}
      students={[
        {
          id: 's',
          email: 'student@example.test',
          displayName: 'Ana',
          enabled: true,
          completed: ['1.1:learn', '2.1:quiz'],
          lastActivity: '2026-11-12T12:00:00Z',
        },
        {
          id: 's2',
          email: 'other@example.test',
          displayName: 'Luis',
          enabled: false,
          completed: [],
          lastActivity: null,
        },
      ]}
    />,
  );
  expect(screen.getByText('Ana')).toBeInTheDocument();
  expect(screen.getByText('student@example.test')).toBeInTheDocument();
  expect(screen.getByText('Enabled')).toBeInTheDocument();
  expect(screen.getByText('Disabled')).toBeInTheDocument();
  expect(screen.getByText('1 / 75')).toBeInTheDocument();
  expect(screen.getByText('1 / 60')).toBeInTheDocument();
  expect(screen.getByText('No activity yet')).toBeInTheDocument();
});
it.each([
  [
    'en',
    'Student',
    'Overall completion',
    'Account access',
    'Scroll horizontally to see account access, unit completion, and last activity.',
  ],
  [
    'es',
    'Estudiante',
    'Progreso general',
    'Acceso de la cuenta',
    'Desplázate horizontalmente para ver el acceso de la cuenta, el progreso por unidad y la última actividad.',
  ],
])(
  'puts overall progress beside student identity and explains horizontal scrolling in %s',
  (locale, student, total, access, cue) => {
    localStorage.setItem('java-practice:locale', locale);
    render(
      <TeacherOverview
        user={teacher}
        students={[
          {
            id: 's',
            email: 'student@example.test',
            displayName: 'Ana',
            enabled: true,
            completed: ['1.1:learn'],
            lastActivity: null,
          },
        ]}
      />,
    );
    expect(
      screen
        .getAllByRole('columnheader')
        .slice(0, 3)
        .map((header) => header.textContent),
    ).toEqual([student, total, access]);
    expect(screen.getByText(cue)).toBeInTheDocument();
    expect(
      screen.getByRole('region', {
        name: locale === 'es' ? 'Progreso de estudiantes' : 'Student progress',
      }),
    ).toHaveAttribute('aria-describedby', 'teacher-scroll-hint');
  },
);
