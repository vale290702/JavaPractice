# Managed access setup

This feature lives on `feat/managed-login-single-session`; production has not been deployed with it. A dedicated JavaPractice Supabase project (`mxotijowgvkeqehedvsg`, US East) is configured for this branch. Local server credentials are in ignored `.env.local`; never reuse another project's credentials.

## Configure the database and Auth

1. Review the SQL migration in `supabase/migrations/`. Apply it to your chosen project using the Supabase dashboard SQL editor, or link that project with the Supabase CLI and run `supabase db push`. Verify the target project before applying SQL. The migration owns the approved-account table, session registry, login throttling, and service-only functions and permissions.
2. In Supabase Authentication settings, disable public signups. Keep email/password sign-in enabled. Do not add a public registration page or browser account-management client. Approval in `app_accounts` is required even if someone creates a Supabase Auth user through another path.
3. Copy `.env.example` to the ignored `.env.local` and enter `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` locally. Never paste secrets into chat, commit `.env.local`, or put the key in a `NEXT_PUBLIC_` variable. The service role bypasses RLS and belongs only in trusted server processes.
4. Before a future deployment, set those same two server-only variables in the intended Vercel project and environments. Configure the database and provision real approved accounts before deploying access enforcement. This branch does not authorize or perform a production deployment.

## Provision and manage accounts

Use Node 24 from the project directory. These commands use native Node fetch and require no Supabase JavaScript SDK:

```sh
node scripts/manage-users.mjs --help
node --env-file=.env.local scripts/manage-users.mjs create --email student@example.com --name "Student" --role student
node --env-file=.env.local scripts/manage-users.mjs create --email teacher@example.com --name "Teacher" --role teacher
node --env-file=.env.local scripts/manage-users.mjs list
node --env-file=.env.local scripts/manage-users.mjs disable --user-id ACCOUNT_UUID
node --env-file=.env.local scripts/manage-users.mjs reset-password --user-id ACCOUNT_UUID
```

Replace the example email, display name, and UUID with the intended account values. `create` and `reset-password` request a new password with a hidden terminal prompt. Use at least 12 characters and transfer the password privately. Passwords are never accepted as command arguments or printed. For trusted automation, provide exactly one password line through stdin from a secret manager or protected pipe; do not put the password literally in shell commands, shell history, repository files, or environment examples. No confirmation or reset emails are sent: the tutor provisions and communicates credentials directly.

`create` makes an email-confirmed Supabase Auth user and then inserts its approved-account record through service-only REST. If approval fails, it attempts to remove only the Auth user created by that invocation. If cleanup also fails, the command reports the unapproved user's UUID for manual dashboard cleanup. A timeout can make an external write's outcome uncertain; inspect Auth users and approved accounts before retrying rather than assuming nothing was created.

`list` prints one JSON record per approved account, including UUID, display name, email, and enabled status. It does not enumerate unapproved Auth users. Treat the output as private student information.

`disable` first sets approval to disabled, then deletes that account's application sessions. The disabled approval immediately prevents app access and replacement sessions, even if subsequent session deletion fails; retry the command after resolving the connection problem. It does not ban or delete the provider user. There is no enable command or public administration interface.

`reset-password` validates the new password before making changes, revokes application sessions, updates the provider password, then revokes sessions again. These calls are separate provider/database operations. A later error can leave the password changed or sessions revoked, so inspect and retry as appropriate; success is reported only after the last revocation succeeds. The migration also installs an Auth password-change trigger that atomically increments the account credential version and deletes sessions inside the password update transaction. Login captures that version before credential verification and checks it at session replacement, so an in-flight login using the previous password cannot claim a new session after the reset. This depends on applying the full migration, including its trigger. Live verification status is recorded in the implementation plan. Reset does not enable a disabled account. For an access incident, disable the account first and keep it disabled while investigating.

## Session behavior and verification

An application session lasts at most 12 hours. One approved account has one authoritative active session; a successful new login displaces its previous session. Different accounts remain independent. Protected server requests validate the database registry every time and reject a displaced session immediately. The browser checks session status every 10 seconds and when it regains focus; already delivered lesson information cannot be made unread. Tabs in one browser share the same cookie/session.

Completed activities are stored in Supabase under the authenticated account and follow that account across devices. The interface confirms a completion only after the server saves it. Old browser-only progress is not automatically assigned to an account. Teachers can open `/teacher` to view approved student accounts, activity completion by unit, and latest activity. Students cannot access this view. Completion records describe learning activity, not independently executed or graded Java code.

After project setup, verify successful login, wrong credentials, disabled/unapproved access denial, logout, expiry, two separate browsers replacing the same account's session, and another account remaining active. Verify the migration's actual RLS and service-role permissions in the live project. Local protocol-fixture tests do not prove live SQL permissions, concurrency, or provider configuration.

Supabase references: [admin user creation](https://supabase.com/docs/reference/javascript/auth-admin-createuser), [admin password updates](https://supabase.com/docs/reference/javascript/auth-admin-updateuserbyid), and [database migrations](https://supabase.com/docs/guides/deployment/database-migrations).

### Canonical request origin

Set server-only `APP_ORIGIN` to the exact browser origin (for production, `https://java-practice-atrizon.vercel.app`; for local development, `http://localhost:3000`). This avoids confusing an internal proxy hostname with the public origin when checking login/logout requests. Configure the appropriate origin separately for a preview deployment. Foreign origins are rejected.
