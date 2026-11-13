'use client';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createCurriculum } from './model';
import type { CurriculumUnit } from './types';
const CurriculumContext = createContext<ReturnType<
  typeof createCurriculum
> | null>(null);
export function CurriculumProvider({
  units,
  children,
}: {
  units: CurriculumUnit[];
  children: ReactNode;
}) {
  const model = useMemo(() => createCurriculum(units), [units]);
  return (
    <CurriculumContext.Provider value={model}>
      {children}
    </CurriculumContext.Provider>
  );
}
export function useCurriculum() {
  const model = useContext(CurriculumContext);
  if (!model)
    throw new Error(
      'Curriculum must be provided by the authenticated server page',
    );
  return model;
}
