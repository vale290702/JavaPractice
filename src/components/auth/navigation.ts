export function navigate(path: '/' | '/login' | '/login?reason=ended') {
  window.location.assign(path);
}
