'use client';
import { useRef, useState } from 'react';
import { authRequest } from '../../components/auth/request';
import { navigate } from '../../components/auth/navigation';
export function useProgress(initialCompleted: string[]) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [pending, setPending] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const busy = useRef(false);
  async function complete(activity: string) {
    if (busy.current) return;
    busy.current = true;
    setPending(activity);
    setFailed(null);
    try {
      const response = await authRequest('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity }),
      });
      if (response.status === 401) {
        navigate('/login?reason=ended');
        throw new Error('Session ended');
      }
      if (!response.ok) throw new Error('Progress unavailable');
      const data: unknown = await response.json();
      if (
        !data ||
        typeof data !== 'object' ||
        !('completed' in data) ||
        !Array.isArray(data.completed) ||
        data.completed.some((item) => typeof item !== 'string')
      )
        throw new Error('Invalid progress');
      setCompleted(data.completed);
    } catch {
      setFailed(activity);
    } finally {
      busy.current = false;
      setPending(null);
    }
  }
  return { completed, pending, failed, complete };
}
