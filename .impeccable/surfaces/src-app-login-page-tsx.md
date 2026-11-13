---
version: 1
slug: "src-app-login-page-tsx"
primary_target: "src/app/login/page.tsx"
related_targets: ["src/components/auth/login-form.tsx","src/components/auth/session-boundary.tsx","src/app/auth.css"]
---

# Managed login

Scope: `/login`, implemented by the login page and authentication form. Visitor mode: Operate.

Audience and job: a tutor-provisioned learner enters email and password to open the protected Java workspace. There is no public registration or social sign-in.

Chosen direction: inherit Learning lab, explicitly selected as `lab` with code-first build path in `.impeccable/questions/b9857cbd.answer.json`. Preserve the historical missing seed-to-candidate mapping disclosure in `.impeccable/direction.md`; no new tournament or image-comp approval is inferred.

First viewport: brand and language selector share a ruled header above a narrow, unenclosed form on warm paper. A serif sign-in heading, short introduction, labeled email/password fields, green primary action, and a ruled tutor-account note establish the hierarchy. Desktop form width caps at 420px; at 650px the page uses 20px side insets and the header may wrap. Credential fields and language selection use 16px text; login and session retry actions have a 48px minimum height.

Content and behavior: English and Spanish copy follows the existing locale convention. Pending submission uses read-only fields, disabled submission, a busy form, and an explicit signing-in label. Generic credential, invalid-request, rate-limit, and unavailable errors appear as inline alerts. Ended-session and unavailable return reasons appear as status notices. Pale selected-tone notices retain the inherited row corners; words and semantics explain the state. Temporary session verification failure replaces the workspace with a plain retry view. A successful new account login displaces its prior application session; local progress remains scoped per account.

Evidence: reviewed desktop English and mobile Spanish login captures at `.impeccable/review/login-desktop.png` and `login-mobile.png`, plus healthy authenticated workspace captures. Failure and session-state presentation is evidenced in source, not captured in those images. The authenticated test learner is a synthetic fixture. No new raster assets were added.

Status: feature branch only; production is unchanged. Supabase project selection, migration application, credentials, and real account provisioning remain external setup. Visual primitives and durable rules are recorded in `DESIGN.md`.

Appearance extension: the shared localized sun/moon control joins the wrapping header preferences. Both light and dark appearances preserve the Learning Lab hierarchy and ruled layout. A saved preference persists across routes and reloads; without one, appearance follows the device. Semantic palette roles and control states are recorded in `DESIGN.md`. Source evidence: `src/features/appearance/theme.ts`, `src/components/theme-toggle.tsx`, and `src/app/globals.css`; theme review captures are in `/tmp/jp-theme-review/`. This bounded extension is on `feat/theme-editor-indent`; it does not replace the visual world.
