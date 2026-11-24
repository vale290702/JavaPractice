'use client';

import { useId, useState, type FormEvent } from 'react';
import type { CurriculumThrough } from '../features/curriculum/access';
import type { Localized } from '../features/curriculum/types';
import type { StudentProgress } from '../features/learning/types';
import type { Locale } from '../i18n/content';
import { curriculumAccessMessages } from '../i18n/curriculum-access';
import { authRequest } from './auth/request';
import { navigate } from './auth/navigation';

export type AccessOptionGroup = {
  number: number;
  title: Localized<string>;
  topics: { id: string; title: Localized<string> }[];
};

export function TeacherCurriculumAccess({
  students,
  units,
  locale,
}: {
  students: StudentProgress[];
  units: AccessOptionGroup[];
  locale: Locale;
}) {
  const id = useId();
  const t = curriculumAccessMessages[locale];
  const [studentId, setStudentId] = useState(students[0].id);
  const [savedByStudent, setSavedByStudent] = useState<
    Record<string, CurriculumThrough>
  >(() =>
    Object.fromEntries(
      students.map((student) => [
        student.id,
        student.curriculumThrough ?? null,
      ]),
    ),
  );
  const [draft, setDraft] = useState<CurriculumThrough | undefined>();
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle',
  );
  const saved = savedByStudent[studentId];
  const through = draft === undefined ? saved : draft;
  const saving = status === 'saving';

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || through === saved) return;
    setStatus('saving');
    try {
      const response = await authRequest('/api/teacher/curriculum-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, curriculumThrough: through }),
      });
      if (response.status === 401) {
        navigate('/login?reason=ended');
        return;
      }
      if (!response.ok || (await response.json()).curriculumThrough !== through)
        throw new Error('Course access unavailable');
      setSavedByStudent((current) => ({ ...current, [studentId]: through }));
      setDraft(undefined);
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className="teacher-curriculum-access"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>{t.title}</h2>
      <p>{t.description}</p>
      <form onSubmit={save}>
        <div>
          <label htmlFor={`${id}-student`}>{t.student}</label>
          <select
            id={`${id}-student`}
            value={studentId}
            disabled={saving}
            onChange={(event) => {
              setStudentId(event.target.value);
              setDraft(undefined);
              setStatus('idle');
            }}
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.displayName} ({student.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-through`}>{t.through}</label>
          <select
            id={`${id}-through`}
            value={through ?? ''}
            disabled={saving}
            onChange={(event) => {
              setDraft(event.target.value || null);
              setStatus('idle');
            }}
          >
            <option value="">{t.all}</option>
            <option value="none">{t.none}</option>
            {units.map((unit) => (
              <optgroup
                key={unit.number}
                label={`${t.unit} ${unit.number} · ${unit.title[locale]}`}
              >
                {unit.topics.map((topic, index) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.id} · {topic.title[locale]}
                    {index === unit.topics.length - 1 ? ` (${t.fullUnit})` : ''}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <button className="auth-primary" disabled={saving || through === saved}>
          {saving ? t.saving : t.save}
        </button>
      </form>
      {status === 'saved' && <p role="status">{t.saved}</p>}
      {status === 'error' && <p role="alert">{t.error}</p>}
    </section>
  );
}
