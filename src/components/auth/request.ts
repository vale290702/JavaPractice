/** Bound authentication checks so an unresponsive network cannot leave access open. */
export async function authRequest(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout>;
  const deadline = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => {
      controller.abort();
      reject(new Error('Authentication request timed out'));
    }, 8000);
  });
  try {
    return await Promise.race([
      fetch(path, {
        ...init,
        credentials: 'same-origin',
        cache: 'no-store',
        signal: controller.signal,
      }).then(async (response) => {
        // Headers alone do not complete a check: keep the deadline active while
        // reading the body so every caller receives an already buffered response.
        const body = await response.arrayBuffer();
        return new Response(
          [204, 205, 304].includes(response.status) ? null : body,
          {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          },
        );
      }),
      deadline,
    ]);
  } finally {
    clearTimeout(timeout!);
  }
}
