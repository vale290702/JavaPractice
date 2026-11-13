# JavaPractice

A bilingual Java learning workspace for tutoring a tenth-grade student. Built with Next.js 16, React 19, TypeScript 6, and custom CSS.

## Run locally

Use Node.js 24, pinned in `.nvmrc` and the package engine for consistent local and Vercel builds.

```sh
nvm use
npm ci
npm run dev
```

This feature branch requires managed account setup before learning access. Follow `docs/auth-setup.md` to configure a dedicated Supabase project, apply the migration, and create accounts. With no backend configured, sign-in fails closed; no demo login is enabled. The login page remains available at `/login`.

Open http://localhost:3000.

## Learning experience

All four units and 53 numbered topics from the supplied AP Computer Science A course document: Using Objects and Methods (15), Selection and Iteration (12), Class Creation (9), and Data Collections (17). Each topic includes original explanations, an interactive code walkthrough, guided practice, a quiz with feedback, progressive hints, and an editable coding exercise with a review checklist and revealable solution. These quick checks are original tutoring activities, not official AP exams.

English and Spanish UI copy lives in `src/i18n/content.ts`; localized lessons and Java examples are split by unit in `src/features/curriculum`. Switching language preserves the current activity, answer, and code. Completed learning activities are saved to the authenticated account in Supabase and follow it across devices. Teacher accounts can view student completion by unit at `/teacher`. Language persists in the browser; code edits persist during the current session. Old browser-only progress is not automatically attached to an account.

The examples are authored walkthroughs, not an executing Java interpreter. Coding exercises do not compile or claim passing tests. A future Java execution service must run untrusted submissions in an isolated environment with resource limits.

## Structure

- `src/app`: route entry, metadata, font imports, and custom design tokens/styles.
- `src/components`: learning workspace and code walkthrough presentation.
- `src/i18n`: typed bilingual interface copy.
- `src/features/curriculum`: typed unit registry, bilingual lessons, Java examples, and source-page references.
- `src/features/learning`: code examples, progress validation, server persistence, and browser locale preference.
- `tests`: unit and React interaction tests.
- `e2e`: desktop/mobile Playwright learning flow.
- `PRODUCT.md`: product constraints and open integrations.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
npm run build
npm run check:client-bundle
```

## Integration boundaries

This feature branch integrates Supabase Auth password checks and PostgreSQL-backed approved accounts, rate limits, and single active sessions. Cloud credentials, schema application, and actual account provisioning are separate setup steps and must be completed before deployment. Supabase Storage, Deno Edge Functions, Resend email, SINPE receipts, and remote Java execution remain unconnected. Never expose service-role keys or other service credentials to browser code.

The supplied document and editorial conventions are recorded in `docs/curriculum/source.md`. Topic references use PDF page numbers, not printed page numbers. Spanish lessons are original instructional translations, not official College Board translations. All topic numbers match the supplied 2025 four-unit framework.

## Content conventions

Keep all user-facing prose in locale resources. Java identifiers, filenames, and code samples retain Java syntax across locales. Keep official topic IDs and activity IDs stable so existing progress remains valid; version migrations explicitly when the curriculum structure changes. The three starter topic IDs migrate to 1.2, 2.3, and 2.8 without marking new work complete.

## Dependency audit

At initial verification, `npm audit --omit=dev` reported no production vulnerabilities. The development lint dependency chain has a moderate minimatch advisory; its upstream TypeScript ESLint package currently pins the affected major range. A normal `npm audit fix` did not clear it. Avoid forcing a major override without verifying upstream compatibility.

## Managed access

The user-approved implementation lives on `feat/managed-login-single-session`; production is unchanged until it is merged and deployed after backend setup. No public signup or account-admin page exists. Accounts are managed with `scripts/manage-users.mjs`; passwords use a hidden terminal prompt or stdin. Each successful login atomically replaces the account’s prior opaque application session. The server rejects displaced requests immediately; open pages recheck at most every ten seconds while visible and whenever they regain focus. Previously delivered information cannot be erased by revocation.

Session cookies are HttpOnly/SameSite and Secure on production HTTPS. Only token digests are stored in the database. The full password-change trigger migration prevents in-flight old-password claims after a reset. Progress is stored per account in Supabase. Teacher access to student summaries is checked on the server and database; student accounts can access only their own progress.

Browser tests use an external loopback-only Supabase protocol fixture started by `e2e/start.mjs`; the application still executes its real login and session code. Fixture accounts and passwords are synthetic. SQL semantic tests apply the actual migration to embedded PostgreSQL (PGlite), with a minimal auth schema; they do not establish multi-connection concurrency or validate a hosted Supabase project.
