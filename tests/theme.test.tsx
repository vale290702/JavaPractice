import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle, ThemeController } from '../src/components/theme-toggle';
import { themeBootstrap } from '../src/features/appearance/theme';
beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
it('switches themes with localized labels and remembers the choice', async () => {
  const user = userEvent.setup();
  const view = render(
    <>
      <ThemeController />
      <ThemeToggle locale="en" />
    </>,
  );
  await user.click(
    screen.getByRole('button', { name: 'Switch to dark theme' }),
  );
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(localStorage.getItem('java-practice:theme')).toBe('dark');
  view.rerender(
    <>
      <ThemeController />
      <ThemeToggle locale="es" />
    </>,
  );
  await user.click(
    screen.getByRole('button', { name: 'Cambiar a tema claro' }),
  );
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
});
it('uses a saved preference before paint, even when the system differs', () => {
  localStorage.setItem('java-practice:theme', 'dark');
  window.eval(themeBootstrap);
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  render(
    <>
      <ThemeController />
      <ThemeToggle locale="en" />
    </>,
  );
  expect(
    screen.getByRole('button', { name: 'Switch to light theme' }),
  ).toBeInTheDocument();
});
it('uses system dark preference until a choice is saved', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  window.eval(themeBootstrap);
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  render(
    <>
      <ThemeController />
      <ThemeToggle locale="en" />
    </>,
  );
  expect(
    screen.getByRole('button', { name: 'Switch to light theme' }),
  ).toBeInTheDocument();
});
it('stays usable when local storage is blocked', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw Error('blocked');
  });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw Error('blocked');
  });
  render(
    <>
      <ThemeController />
      <ThemeToggle locale="en" />
    </>,
  );
  await userEvent.click(
    screen.getByRole('button', { name: 'Switch to dark theme' }),
  );
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
});
it('updates on another tab changing the stored preference', () => {
  render(
    <>
      <ThemeController />
      <ThemeToggle locale="en" />
    </>,
  );
  localStorage.setItem('java-practice:theme', 'dark');
  fireEvent(
    window,
    new StorageEvent('storage', {
      key: 'java-practice:theme',
      newValue: 'dark',
    }),
  );
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
});
it('keeps a session preference when writes fail but storage remains readable', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw Error('quota exceeded');
  });
  render(
    <>
      <ThemeController />
      <ThemeToggle locale="en" />
    </>,
  );
  await userEvent.click(
    screen.getByRole('button', { name: 'Switch to dark theme' }),
  );
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
});
