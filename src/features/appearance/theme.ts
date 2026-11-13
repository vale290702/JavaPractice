export type Theme = 'light' | 'dark';
const key = 'java-practice:theme';
const eventName = 'java-practice:theme-change';
let fallback: Theme | undefined;
let writeFailed = false;
const systemTheme = (): Theme =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
export function readTheme(): Theme {
  if (writeFailed && fallback) return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved === 'light' || saved === 'dark' ? saved : systemTheme();
  } catch {
    return fallback ?? systemTheme();
  }
}
export function applyTheme() {
  document.documentElement.dataset.theme = readTheme();
}
export function setTheme(theme: Theme) {
  fallback = theme;
  try {
    localStorage.setItem(key, theme);
    writeFailed = false;
  } catch {
    writeFailed = true;
  }
  applyTheme();
  window.dispatchEvent(new Event(eventName));
}
export function subscribeTheme(listener: () => void) {
  const update = () => {
    applyTheme();
    listener();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      writeFailed = false;
      fallback = undefined;
      update();
    }
  };
  const media =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
  window.addEventListener(eventName, update);
  window.addEventListener('storage', storage);
  media?.addEventListener('change', update);
  return () => {
    window.removeEventListener(eventName, update);
    window.removeEventListener('storage', storage);
    media?.removeEventListener('change', update);
  };
}
// Runs in the head before the body is painted; only validated fixed theme names reach the DOM.
export const themeBootstrap = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(key)})}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t})()`;
