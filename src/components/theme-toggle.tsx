'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import {
  applyTheme,
  readTheme,
  setTheme,
  subscribeTheme,
} from '../features/appearance/theme';
import { appearanceMessages } from '../i18n/appearance';
import type { Locale } from '../i18n/content';
const serverTheme = () => 'light' as const;
export function ThemeController() {
  useEffect(() => {
    applyTheme();
    return subscribeTheme(() => {});
  }, []);
  return null;
}
export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
  const t = appearanceMessages[locale];
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={dark ? t.toLight : t.toDark}
      title={dark ? t.toLight : t.toDark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      {dark ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
      <span>{dark ? t.light : t.dark}</span>
    </button>
  );
}
