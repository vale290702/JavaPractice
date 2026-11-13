import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LoginForm } from '../src/components/auth/login-form';
import { AccountControls } from '../src/components/auth/account-controls';
import { SessionBoundary } from '../src/components/auth/session-boundary';
import { navigate } from '../src/components/auth/navigation';
vi.mock('../src/components/auth/navigation', () => ({ navigate: vi.fn() }));
const session = {
  user: {
    id: 'one',
    email: 'student@example.com',
    displayName: 'Student',
    role: 'student' as const,
  },
  expiresAt: '2099-01-01T00:00:00Z',
};
beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, '', '/login');
  vi.stubGlobal('fetch', vi.fn());
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  vi.useRealTimers();
});
describe('managed account UI', () => {
  it('shows a translated service-unavailable status only for known reasons', () => {
    window.history.replaceState({}, '', '/login?reason=unavailable');
    const { unmount } = render(<LoginForm />);
    expect(screen.getByRole('status')).toHaveTextContent(
      'Sign-in is temporarily unavailable',
    );
    fireEvent.change(screen.getByLabelText('Language'), {
      target: { value: 'es' },
    });
    expect(screen.getByRole('status')).toHaveTextContent(
      'no está disponible temporalmente',
    );
    unmount();
    window.history.replaceState({}, '', '/login?reason=arbitrary-query-value');
    render(<LoginForm />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByText('arbitrary-query-value')).not.toBeInTheDocument();
  });

  it('offers only tutor-provided login and translates all form states', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ code: 'invalid_credentials' }), {
        status: 401,
      }),
    );
    render(<LoginForm />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Language'), {
      target: { value: 'es' },
    });
    expect(document.documentElement.lang).toBe('es');
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'student@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Revisa tu correo',
    );
    expect(fetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({ credentials: 'same-origin' }),
    );
  });
  it('prevents duplicate login submissions and navigates after success', async () => {
    let resolve!: (response: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'student@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.submit(
      screen.getByRole('button', { name: 'Sign in' }).closest('form')!,
    );
    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
    fireEvent.submit(screen.getByRole('button').closest('form')!);
    expect(fetch).toHaveBeenCalledTimes(1);
    await act(async () => resolve(new Response(JSON.stringify({ ok: true }))));
    expect(navigate).toHaveBeenCalledWith('/');
  });
  it('locks displaced sessions before redirecting', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 401 }));
    render(
      <SessionBoundary session={session}>
        <button>Private lesson</button>
      </SessionBoundary>,
    );
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('/login?reason=ended'),
    );
    expect(
      screen.queryByRole('button', { name: 'Private lesson' }),
    ).not.toBeInTheDocument();
  });
  it('blocks learning on verification failure and can retry', async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValue(new Response(JSON.stringify(session)));
    render(
      <SessionBoundary session={session}>
        <button>Private lesson</button>
      </SessionBoundary>,
    );
    expect(await screen.findByRole('alert')).toHaveTextContent('verify');
    expect(
      screen.queryByRole('button', { name: 'Private lesson' }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(
      await screen.findByRole('button', { name: 'Private lesson' }),
    ).toBeVisible();
  });
  it('keeps the same learning draft across healthy heartbeat checks', async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockImplementation(
      async () => new Response(JSON.stringify(session)),
    );
    render(
      <SessionBoundary session={session}>
        <input aria-label="Draft" defaultValue="my work" />
      </SessionBoundary>,
    );
    await act(async () => {
      await Promise.resolve();
    });
    const draft = screen.getByLabelText('Draft');
    fireEvent.change(draft, { target: { value: 'unfinished answer' } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });
    expect(screen.getByLabelText('Draft')).toBe(draft);
    expect(draft).toHaveValue('unfinished answer');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it('locks a healthy workspace when heartbeat headers arrive but the body stalls, then retries', async () => {
    vi.useFakeTimers();
    let streamController!: ReadableStreamDefaultController<Uint8Array>;
    const stalled = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          streamController = controller;
        },
      }),
    );
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(JSON.stringify(session)))
      .mockResolvedValueOnce(stalled)
      .mockResolvedValueOnce(new Response(JSON.stringify(session)));
    render(
      <SessionBoundary session={session}>
        <input aria-label="Draft" defaultValue="unfinished answer" />
      </SessionBoundary>,
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const draft = screen.getByLabelText('Draft');
    expect(draft).toBeVisible();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });
    expect(draft).toBeVisible();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(8000);
    });
    expect(screen.getByRole('alert')).toHaveTextContent('cannot verify');
    expect(draft).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(draft).toBeVisible();
    expect(draft).toHaveValue('unfinished answer');
    expect(fetch).toHaveBeenCalledTimes(3);
    streamController.close();
  });
  it('rejects an unexpected account identity', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({ ...session, user: { ...session.user, id: 'two' } }),
      ),
    );
    render(
      <SessionBoundary session={session}>
        <button>Private lesson</button>
      </SessionBoundary>,
    );
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('/login?reason=ended'),
    );
    expect(
      screen.queryByRole('button', { name: 'Private lesson' }),
    ).not.toBeInTheDocument();
  });
  it('bounds a stalled verification and blocks learning', async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));
    render(
      <SessionBoundary session={session}>
        <button>Private lesson</button>
      </SessionBoundary>,
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(8000);
    });
    expect(screen.getByRole('alert')).toHaveTextContent('cannot verify');
    expect(
      screen.queryByRole('button', { name: 'Private lesson' }),
    ).not.toBeInTheDocument();
  });
  it('signs out only after the server confirms and shows recovery on failure', async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));
    render(<AccountControls user={session.user} />);
    expect(screen.getByText('Student')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'could not sign you out',
    );
    expect(navigate).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/login'));
  });
});
