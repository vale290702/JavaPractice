# Extra Practice workbook implementation

Approved scope: adapt the two user-provided student workbooks for topics1.1–1.10 only, bilingual interactive worksheets with saved answers/code and completion tracking. Existing Practice gains Extra Practice grouped by activity, guided/independent sections and prediction/trace/code/testing/explanation. Java runs externally; no invented compiler or automatic grading. Four supplied helper classes remain read-only. Preserve dark navy and light green themes and authentication.

1. Content worker owns content.ts and content tests:14activities/28worksheets, EN/ES, named Java files, exact provided buggy examples/helpers, PDFpage references. Protected data delivered after auth only.
2. Backend worker owns server.ts/validation.ts/API/migration003/backendtests: per-account worksheet JSON, explicit save, version conflicts, max payload64KiB, session registry checks, service-only grants, teacher read completion summaries. Never widen existing265 activity IDs/counts.
3. UI worker owns ExtraPractice component/hook/copy/CSS/RTLtests: editable worksheets, readonly helpers, local account-scoped draft backup, load/save/failure/conflict/end-session, explicit save and completion, localized accessible sections. Do not fake grading.
4. Root owns workspace/serverpage/teacherintegration, protocolfixture/e2e, real dedicatedSupabase migrationverification, design/code reviews and branchPR. No production deployment/mainmerge.

Interfaces: src/features/extra-practice/types.ts and metadata.ts; worksheetIDs a1-guided..b8-independent. GET /api/extra-practice?id=ID -> {worksheet:SavedWorksheet|null}; POST {id,version,work,completed} -> {worksheet:SavedWorksheet},409 {code:'conflict'},401/503 usualauth errors. Work contains prediction,trace,files{name:source},results,explanation. Completion is student-reported and requires nonempty notes/code fields. Version0 creates, savedversions increment. Teacher server getExtraTeacherProgress -> ExtraStudentProgress[] {userId,completed:string[],updatedAt:string|null}. Separate extra completion does not alter regular progress percentages.

Preflight ownership: types/metadata produced byroot consumed byallworkers; no overlapping sourceownership. UI rootintegrates via ExtraPractice({activities:ExtraActivity[],locale,userId}) inside practice, filtered bytopic. Content rootimports server-only content export extraActivities afterauth. Teacher completioncolumn separate28total, no savedstudentanswersdisclosure/newteacherreviewUI. Concurrenttab CAS prevents silentoverwrite; localbackup avoids navigationloss. Explicit save controls serverwrites. Existingaccountsessionrevocationmustreject stale worksheetreads/writes.

- [x] Content imported and verified against PDF rendering
- [x] Backend SQL/API tests and live migration
- [x] Worksheet UI tested and integrated
- [x] Reviews, desktop/mobile/bilingual/darklight tests, build/lint/bundlechecks
- [x] Commit/push feature branch and ready PR

Verification:150 unit/component/content/SQL tests and26 desktop/mobile browser tests pass. ESLint, production build and client-bundle audit pass (15 chunks,162 prose markers). Actual dedicated Supabase migration applied and registered; production-mode local server verified real provider login, persisted answers, conflicts, account-switch and displaced-session denial, input/origin checks, teacher-only answer-free summary and unchanged regular progress. Three temporary verification accounts removed. Live production UI not deployed.

Reviews: security finding fixed by expected-account assertions checked under the same SQL session lock;16 focused backend/database tests pass. Whole-feature integration/content review approved. Impeccable independent worksheet title finding fixed using neutral ASCII art identity; refreshed desktop/mobile captures shipped. Manual detector zero findings on changedUI. Existing historical seed-provenance limitation remains documented, with no new mapping or full historical verification claimed. Design docs updated.
