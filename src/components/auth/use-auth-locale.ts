'use client';
import { useEffect } from 'react';
import { useLocalStorage } from '../../features/learning/use-local-storage';
import { authMessages } from '../../i18n/auth';
export function useAuthLocale() {
  const store = useLocalStorage('java-practice:locale');
  const locale = store.raw === 'es' ? 'es' : 'en';
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return { locale, setLocale: store.set, t: authMessages[locale] };
}
