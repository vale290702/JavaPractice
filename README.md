# JavaPractice

A bilingual Java learning workspace for tutoring a tenth-grade student. Built with Next.js 16, React 19, TypeScript 6, and custom CSS.

## Run locally

Use Node.js 22.12 or newer (Node 24 is pinned in `.nvmrc`).

```sh
nvm use
npm ci
npm run dev
```

Open http://localhost:3000.

## Learning experience

All four units and 53 numbered topics from the supplied AP Computer Science A course document: Using Objects and Methods (15), Selection and Iteration (12), Class Creation (9), and Data Collections (17). Each topic includes original explanations, an interactive code walkthrough, guided practice, a quiz with feedback, progressive hints, and an editable coding exercise with a review checklist and revealable solution. These quick checks are original tutoring activities, not official AP exams.

English and Spanish UI copy lives in `src/i18n/content.ts`; localized lessons and Java examples are split by unit in `src/features/curriculum`. Switching language preserves the current activity, answer, and code. Learning progress and language persist on the same browser; code edits persist only during the current session. Blocked browser storage falls back to session memory.

The examples are authored walkthroughs, not an executing Java interpreter. Coding exercises do not compile or claim passing tests. A future Java execution service must run untrusted submissions in an isolated environment with resource limits.

## Structure

- `src/app`: route entry, metadata, font imports, and custom design tokens/styles.
- `src/components`: learning workspace and code walkthrough presentation.
- `src/i18n`: typed bilingual interface copy.
- `src/features/curriculum`: typed unit registry, bilingual lessons, Java examples, and source-page references.
- `src/features/learning`: code examples, progress validation, and browser persistence.
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
```

## Integration boundaries

The app currently runs without backend credentials. Supabase Auth, PostgreSQL, Storage, Deno Edge Functions, Resend email, SINPE receipt workflows, and remote Java execution are not connected. They should be added as separate features with real states and tests. Never expose Supabase service-role keys, Resend keys, or runner credentials to browser code.

The supplied document and editorial conventions are recorded in `docs/curriculum/source.md`. Topic references use PDF page numbers, not printed page numbers. Spanish lessons are original instructional translations, not official College Board translations. All topic numbers match the supplied 2025 four-unit framework.

## Content conventions

Keep all user-facing prose in locale resources. Java identifiers, filenames, and code samples retain Java syntax across locales. Keep official topic IDs and activity IDs stable so existing progress remains valid; version migrations explicitly when the curriculum structure changes. The three starter topic IDs migrate to 1.2, 2.3, and 2.8 without marking new work complete.

## Dependency audit

At initial verification, `npm audit --omit=dev` reported no production vulnerabilities. The development lint dependency chain has a moderate minimatch advisory; its upstream TypeScript ESLint package currently pins the affected major range. A normal `npm audit fix` did not clear it. Avoid forcing a major override without verifying upstream compatibility.
