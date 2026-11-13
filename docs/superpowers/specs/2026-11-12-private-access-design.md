# Managed accounts and one active session

## Confirmed requirements

- Visitors must log in before accessing the learning workspace.
- No public registration, social sign-in, verification-email flow, or public account-management UI.
- The tutor creates accounts administratively from this development workspace.
- English and Spanish login, logout, failure, and displaced-session messages follow the existing translation convention and learning-lab visual identity.
- A successful new login replaces the account's previous active session. Different accounts remain independent.

## Recommended architecture

Use Supabase Auth for password verification and Supabase PostgreSQL for an application-session registry. Keep account administration and service credentials on the server. Avoid an environment-variable password list: it cannot provide durable cross-instance revocation or safe account administration. Supabase's native single-session setting alone is insufficient for prompt revocation because JWTs can remain valid until expiration.

The registry keeps one active session per approved account. A successful credential check creates a cryptographically random opaque session token; only a digest is stored. Replacing the account's active row is atomic, so concurrent logins cannot leave two valid application sessions. Store the token in a Secure, HttpOnly, SameSite cookie with a finite lifetime. Validate the active registry entry on every protected server request, not only at login. Fail closed if authentication storage is unavailable. Logout deletes only the matching session so a displaced browser cannot revoke a newer login.

Keep a server-managed approved-account record; public or accidental Supabase signups must not grant access to the app. Disable public signup in Supabase configuration as well. An administrative command creates confirmed accounts without sending email and supports disabling/resetting accounts. Password entry is hidden or supplied via secure stdin, never committed or exposed in process arguments.

## Access boundaries and client behavior

Protect the learning page and every lesson/progress endpoint on the server. Deliver protected curriculum data after authentication rather than placing the complete curriculum in unauthenticated client bundles. Expose only session identity and public UI copy to the browser. Use a short session-status heartbeat plus checks when the tab regains focus to close a displaced device's UI; the server rejects its next protected request immediately. Previously delivered information cannot be made unread by revocation. Tabs in one browser share the same session.

Persist local progress under an authenticated user ID so accounts sharing one browser cannot see each other's progress. Anonymous legacy progress must not silently attach to an arbitrary first account. No cross-device progress synchronization is added in this change.

Login uses generic credential errors and provider-backed/app rate limiting, validates input on the server, prevents unsafe return URLs, and checks request origin on state-changing endpoints. Do not deploy a mock login, hardcoded accounts, or an authentication bypass.

## Verification

Test successful and rejected login, no-signup behavior, anonymous route and data denial, expired/disabled/displaced sessions, atomic replacement under concurrent logins, stale logout safety, storage failures, user-specific progress, translated form states, and two independent browser contexts proving only the newer login remains authorized. Run existing curriculum tests, lint, typecheck, production build, and desktop/mobile browser checks. Apply schema and configure backend credentials before deploying access enforcement to production.

## External setup still required

No Supabase integration is connected and no application database/auth credentials are configured on Vercel. The user needs to connect a Supabase account and select a dedicated project (or authorize creation in their chosen organization). Actual account names/emails have not been supplied. These are external setup inputs, not permission to invent user credentials or use another project's database.
