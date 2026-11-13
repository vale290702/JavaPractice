# Managed Access Implementation Plan

> Use subagent-driven-development for independent backend and interface work, then a whole-branch security review. The user explicitly requested a Git branch; use the existing checkout on `feat/managed-login-single-session`, without creating an additional worktree or modifying main.

**Goal:** Add manually provisioned login accounts and exactly one authoritative active session per account.
**Architecture:** Supabase Auth verifies passwords; service-only Postgres tables/RPCs approve accounts, atomically replace opaque session digests, validate/revoke sessions, and throttle login attempts. Next.js serves protected curriculum only after session validation. Public bundles carry UI and types, not curriculum data.
**Tech Stack:** Existing Next.js16 / React19 / TypeScript6 / Node24, Supabase REST/Auth, node:crypto, server-only, Vitest/RTL/Playwright.
**Spec:** docs/superpowers/specs/2026-11-12-private-access-design.md

## Global Constraints

No registration or public account admin. New login replaces the old session. Service credentials server-only. Cookie Secure/HttpOnly/SameSite with finite expiry. Fail closed on storage failure. No production mock or bypass. All visible copy EN/ES. Keep production unchanged; no merge or production deployment from this branch.

## Shared interfaces

`src/features/auth/types.ts`: SessionUser {id,email,displayName}; AppSession {user,expiresAt}; auth error code union invalid_credentials | rate_limited | unavailable | invalid_request.

Backend server exports `getCurrentSession():Promise<AppSession|null>`; `AuthError` exposes `code`. POST /api/auth/login accepts JSON email/password, success200 {ok:true}, errors400/401/429/503 with {code}; sets opaque cookie. POST /api/auth/logout clears cookie and revokes only matching digest. GET /api/auth/session returns AppSession or401/503. All state-changing requests require exact same Origin.

SQL: public.app_accounts(user_id uuid primary key references auth.users, display_name text, enabled boolean); public.app_sessions(user_id unique, token_hash unique, expires_at); rate-limit storage. All tables RLS/no anon or authenticated grants. Only service_role may use RPCs: app_replace_session(p_user_id,p_token_hash), app_read_session(p_token_hash), app_revoke_session(p_token_hash), app_check_login_limit(p_key,p_limit). Session RPC returns {user:{id,email,displayName},expiresAt}. Read/replacement check approved+enabled account and underlying auth user not banned/deleted. Tokens32randombytes base64url, stored SHA256 only; lifetime12hours.

UI exports LoginForm, SessionBoundary({session,children}), AccountControls({user}); auth copy in src/i18n/auth.ts. SessionBoundary checks session on mount, 10s heartbeat, focus/pageshow; blocks UI on verification/network failure and redirects displaced sessions. AccountControls integrates next to locale picker. Local progress key scoped to userID, never adopts anonymous legacy data.

## Task 1 — Backend and database (owned backend worker)

- [x] Write failing unit tests in tests/auth-backend.test.ts for login/invalid/not-approved/disabled, token hashing, replacement, expiry, stale logout, input/origin and store-failure behavior; run to verify red.
- [x] Implement auth modules under src/features/auth (except shared types), route handlers under src/app/api/auth, SQL migration under supabase/migrations. No module-level mutable user/session store.
- [x] Run focused tests, inspect migration permissions and atomic unique-key replacement, report database integration verification limit without live credentials.

## Task 2 — Login and session interface (owned UI worker)

- [x] Write failing RTL tests in tests/auth-ui.test.tsx for locale/form states, no signup, replaced-session redirect and unavailable-state lock; run red.
- [x] Implement src/app/login/page.tsx, src/components/auth/*.tsx, src/i18n/auth.ts, src/app/auth.css. Preserve existing learning-lab identity and native semantics, inputs16px on mobile, keyboard focus and translated errors.
- [x] Run focused tests and report behavior/visual states for integration.

## Task 3 — Protected content and account tools (root)

- [x] Refactor curriculum helpers into pure model/provider supplied by authenticated server page; remove data registry imports from client components/progress. Keep curriculum tests valid. Test anonymous requests cannot receive curriculum and client chunks contain no lesson text.
- [x] Scope progress by userID; test two account draft/progress isolation. Wire AccountControls and SessionBoundary; keep all existing content/navigation functional.
- [x] Add scripts/manage-users.mjs using server credentials and hidden password prompt or stdin; create/list/disable/reset-password. Create allowlist record only administratively; disable/reset revoke app session. Add configuration example and setup instructions; no secrets committed.

## Task 4 — Verification and branch handoff (root + fresh reviewers)

- [x] Run auth HTTP/browser tests against an external test-only Supabase protocol fixture, not an app authentication bypass. Two isolated browser contexts prove new login rejects old requests while another account remains active. Test login errors/logout/no registration/anonymous access and user-scoped progress. Existing browser learning flows log in through real routes.
- [x] Verify SQL on real Supabase if connected; otherwise report migration not applied and production not deployed. Do not treat fixture as database-concurrency proof.
- [x] Run lint/typecheck/build/all tests. Inspect desktop/mobile login and session states, run detector once, request security/code and Impeccable reviews, apply material fixes, refresh design docs.
- [x] Commit branch; push only this feature branch after tests, without merging/deploying main. Report remaining Supabase setup and real-account inputs.

## Execution ledger

- Baseline: 8 tests pass on branch before implementation.
- Ruling: use branch in place, as explicitly requested; avoid an additional worktree/permission round.
- Ruling: existing Vercel login is valid, but leave production untouched. Supabase CLI has no access token; implementation and protocol-fixture verification proceed independently of cloud setup.

- Task 1: complete — backend21tests; canonicalAPP_ORIGIN handlesinternalproxyhost; preauthcredentialversion+passwordtrigger prevents stalepasswordclaims.
- Task 2: complete —10UItests; responsebodyconsumption included in8sdeadline afterreviewfinding; healthychecksretain drafts.
- Task 3: complete — authenticatedserverdata/provider, user-scopedprogress, adminCLI11tests, setupdocs; clientlessonprose audit added.
- Task 4 verification:64unit/component/SQLtests,12desktop/mobileprotocol-fixturebrowsertests, actualmigration appliedtoembeddedPostgres11tests. TargetSupabasemigrationnotapplied; no multi-connectionconcurrencyclaim.
- Security review: oneImportantstalledbodyfindingfixedandscoredresolved. Visualreview:ship forlogin+accountcontroldesktop/mobile;designrecordsupdated.
- External state: SupabaseCLIlogin succeeded. AvailableprojectsSnackyzz/Hamilu areunrelated; neither modified. Dedicatedprojectselection andinitialaccountdetails stillpending. Vercelsessionvalid.
- Branch handoff: commit/pushfeaturebranchonly; do notmergeordeployproduction.
