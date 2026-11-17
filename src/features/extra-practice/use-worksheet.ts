'use client';
import { useEffect, useRef, useState } from 'react';
import { authRequest } from '../../components/auth/request';
import { navigate } from '../../components/auth/navigation';
import type {
  SavedWorksheet,
  WorksheetDefinition,
  WorksheetWork,
} from './types';
type Draft = { version: number; work: WorksheetWork; completed: boolean };
type Issue = 'loadError' | 'saveError' | 'conflict' | 'ended' | 'limit' | null;
function validWork(work: unknown): work is WorksheetWork {
  if (
    !work ||
    typeof work !== 'object' ||
    Array.isArray(work) ||
    Object.keys(work).length !== 5 ||
    !['prediction', 'trace', 'files', 'results', 'explanation'].every((key) =>
      Object.hasOwn(work, key),
    )
  )
    return false;
  const w = work as WorksheetWork;
  return (
    ['prediction', 'trace', 'results', 'explanation'].every(
      (k) => typeof w[k as keyof WorksheetWork] === 'string',
    ) &&
    !!w.files &&
    typeof w.files === 'object' &&
    !Array.isArray(w.files) &&
    Object.values(w.files).every((v) => typeof v === 'string')
  );
}
export function useWorksheet(userId: string, definition: WorksheetDefinition) {
  const initial: WorksheetWork = {
    prediction: '',
    trace: '',
    results: '',
    explanation: '',
    files: Object.fromEntries(
      definition.files.filter((f) => !f.readOnly).map((f) => [f.name, f.code]),
    ),
  };
  function validSaved(value: unknown): value is SavedWorksheet {
    if (!value || typeof value !== 'object') return false;
    const saved = value as SavedWorksheet;
    const expectedFiles = definition.files
      .filter((f) => !f.readOnly)
      .map((f) => f.name);
    return (
      saved.id === definition.id &&
      Number.isSafeInteger(saved.version) &&
      saved.version > 0 &&
      typeof saved.completed === 'boolean' &&
      typeof saved.updatedAt === 'string' &&
      Number.isFinite(Date.parse(saved.updatedAt)) &&
      validWork(saved.work) &&
      ['prediction', 'trace', 'results', 'explanation'].every(
        (k) =>
          saved.work[k as keyof Omit<WorksheetWork, 'files'>].length <= 8000,
      ) &&
      new TextEncoder().encode(JSON.stringify(saved.work)).length <= 65536 &&
      (!saved.completed ||
        [
          saved.work.prediction,
          saved.work.trace,
          saved.work.results,
          saved.work.explanation,
          ...Object.values(saved.work.files),
        ].every((value) => value.trim().length > 0)) &&
      Object.keys(saved.work.files).length === expectedFiles.length &&
      expectedFiles.every(
        (name) =>
          Object.hasOwn(saved.work.files, name) &&
          saved.work.files[name].length <= 32000,
      )
    );
  }
  const key = `extra-practice:${encodeURIComponent(userId)}:${definition.id}`;
  const [draft, setDraft] = useState<Draft>({
    version: 0,
    work: initial,
    completed: false,
  });
  const ref = useRef(draft);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const [dirty, setDirty] = useState(false);
  const [issue, setIssue] = useState<Issue>(null);
  const [storageError, setStorageError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [recovered, setRecovered] = useState(false);
  const live = useRef(true);
  function backup(next: Draft) {
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  useEffect(() => {
    live.current = true;
    let active = true;
    // Reloading reconciles the external account version and device backup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setIssue(null);
    let local: Draft | null = null;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const d = JSON.parse(raw);
        if (
          validWork(d.work) &&
          Number.isInteger(d.version) &&
          d.version >= 0 &&
          typeof d.completed === 'boolean'
        )
          local = d;
      }
    } catch {
      setStorageError(true);
    }
    if (local) {
      ref.current = local;
      setDraft(local);
      setDirty(true);
      setRecovered(true);
    }
    void (async () => {
      try {
        const response = await authRequest(
          `/api/extra-practice?id=${encodeURIComponent(definition.id)}`,
          { headers: { 'X-Account-ID': userId } },
        );
        if (!active) return;
        if (response.status === 401) {
          setIssue('ended');
          navigate('/login?reason=ended');
          return;
        }
        if (!response.ok) throw new Error();
        const data = (await response.json()) as {
          worksheet: SavedWorksheet | null;
        };
        if (
          !data ||
          typeof data !== 'object' ||
          !Object.hasOwn(data, 'worksheet')
        )
          throw new Error();
        const saved = data.worksheet;
        if (saved !== null && !validSaved(saved)) throw new Error();
        const remote = saved
          ? {
              version: saved.version,
              work: saved.work,
              completed: saved.completed,
            }
          : { version: 0, work: initial, completed: false };
        if (local && local.version !== remote.version) {
          setIssue('conflict');
          return;
        }
        if (!local) {
          ref.current = remote;
          setDraft(remote);
          setDirty(false);
        } else if (
          JSON.stringify(local.work) === JSON.stringify(remote.work) &&
          local.completed === remote.completed
        ) {
          setDirty(false);
        }
      } catch {
        if (active) setIssue('loadError');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
      live.current = false;
    };
    // The component is keyed by account and worksheet; retry only reloads this worksheet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);
  function edit(work: WorksheetWork) {
    const next = { ...ref.current, work, completed: false };
    ref.current = next;
    setDraft(next);
    setDirty(true);
    setRecovered(false);
    backup(next);
  }
  async function save(completed = false) {
    if (
      busy.current ||
      loading ||
      issue === 'loadError' ||
      issue === 'conflict' ||
      issue === 'ended'
    )
      return;
    const next = { ...ref.current, completed };
    const payload = { id: definition.id, ...next };
    const notes = [
      next.work.prediction,
      next.work.trace,
      next.work.results,
      next.work.explanation,
    ];
    if (
      notes.some((n) => n.length > 8000) ||
      Object.values(next.work.files).some((f) => f.length > 32000) ||
      new TextEncoder().encode(JSON.stringify(next.work)).length > 65024 ||
      new TextEncoder().encode(JSON.stringify(payload)).length > 65536
    ) {
      setIssue('limit');
      return;
    }
    backup(next);
    busy.current = true;
    setPending(true);
    setIssue(null);
    try {
      const response = await authRequest('/api/extra-practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Account-ID': userId },
        body: JSON.stringify(payload),
      });
      if (!live.current) return;
      if (response.status === 401) {
        setIssue('ended');
        navigate('/login?reason=ended');
        return;
      }
      if (response.status === 409) {
        setIssue('conflict');
        return;
      }
      if (!response.ok) throw new Error();
      const { worksheet: saved } = (await response.json()) as {
        worksheet: SavedWorksheet;
      };
      if (!validSaved(saved) || saved.version !== next.version + 1)
        throw new Error();
      const confirmed = {
        version: saved.version,
        work: saved.work,
        completed: saved.completed,
      };
      ref.current = confirmed;
      setDraft(confirmed);
      setDirty(false);
      setRecovered(false);
      try {
        // Another tab may have written a newer local draft during this request.
        if (localStorage.getItem(key) === JSON.stringify(next))
          localStorage.removeItem(key);
      } catch {
        setStorageError(true);
      }
    } catch {
      if (live.current) setIssue('saveError');
    } finally {
      busy.current = false;
      if (live.current) setPending(false);
    }
  }
  function latest() {
    try {
      localStorage.removeItem(key);
    } catch {
      setStorageError(true);
      return;
    }
    setRecovered(false);
    setDirty(false);
    setAttempt((n) => n + 1);
  }
  return {
    version: draft.version,
    work: draft.work,
    completed: draft.completed,
    loading,
    pending,
    dirty,
    issue,
    storageError,
    recovered,
    edit,
    save,
    latest,
    retry: () => setAttempt((n) => n + 1),
  };
}
