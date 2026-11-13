---
name: JavaPractice
description: A warm paper learning lab with green ink and coordinated code tracing.
colors:
  paper: "#f7f6f0"
  surface: "#fffefa"
  ink: "#213b35"
  muted: "#64736b"
  line: "#dddfd4"
  green: "#234d40"
  lime: "#d8e898"
  editor: "#1d2c29"
  focus: "#406b30"
  selected: "#dfe6d6"
  chosen: "#e7edda"
  on-action: "#fffefa"
  control-border: "#9da99c"
  dark-paper: "#101a2c"
  dark-surface: "#19283e"
  dark-ink: "#edf2fa"
  dark-muted: "#b2c0d4"
  dark-line: "#34465f"
  dark-green: "#d6e1f0"
  dark-focus: "#f0f4fa"
  dark-selected: "#2b3d58"
  dark-chosen: "#2a3c56"
  dark-on-action: "#142238"
  dark-control-border: "#7a8ea9"
  dark-editor: "#142137"
  dark-lime: "#e8edf4"
  dark-code-text: "#e4eaf2"
  code-text: "#e2e6c5"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(36px, 3.8vw, 54px)"
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
  code:
    fontFamily: "ui-monospace, monospace"
    fontSize: "12px"
rounded:
  control: "7px"
  row: "8px"
  panel: "10px"
spacing:
  compact: "8px"
  control: "12px"
  inset: "16px"
  section: "25px"
  activity: "32px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  button-secondary:
    backgroundColor: "transparent"
    rounded: "{rounded.control}"
    padding: "9px 13px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.green}"
    padding: "7px 0"
  answer-input:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  access-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
  access-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px"
  choice:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.row}"
    padding: "15px 17px"
---

# Design System: JavaPractice

## Overview

**Creative North Star: "Learning lab"**

Warm paper and green ink frame a quiet learning lab, with navy surfaces and light gray and white accents for dark appearance. Serif headings establish the reading hierarchy; compact sans-serif controls keep topic selection and practice precise. A dark code surface gives source, values, and output their own material without turning the workspace into a dashboard.

This is a scan of the implemented interface, grounded in `src/app/globals.css`, the learning workspace, and the code panel. The managed-access extension also uses `src/app/auth.css` and the authentication components, retaining the same world. The teacher overview and account-saved progress extension are evidenced by `src/app/teacher.css`, `src/app/progress.css`, `teacher-overview.tsx`, and `use-progress.ts`. The persisted appearance and native-textarea indentation extension is evidenced by `theme.ts`, `theme-toggle.tsx`, `java-editor.tsx`, and `editor-indentation.ts`. The direction was code-first; there is no approved image comp. Directional vocabulary comes from the recorded learning-lab contract rather than a new identity workshop.

**Key Characteristics:**
- Warm paper with green ink in light appearance; navy with light gray and white accents in dark appearance
- Serif lesson hierarchy with compact sans-serif controls
- Ruled separation and restrained soft corners
- Coordinated source, variable, output, and explanation states

## Colors

Light appearance uses restrained green on warm neutrals, with lime for selection and code emphasis. Dark appearance uses navy and slate surfaces with light gray and white accents.

### Primary
- **Green ink:** primary actions, selected topic numerals, active activity tabs, and progress.
- **Lime:** active code indicators, variable values, and text selection.

### Neutral
- **Paper:** page canvas.
- **Surface:** answer fields and answer options.
- **Ink:** reading text and headings.
- **Muted:** supporting prose and compact metadata.
- **Line:** structural dividers and option borders.
- **Editor:** code, editable source, and revealed solution surfaces.
- **Code text:** readable source on the dark editor.
- **Selected:** current unit background.
- **Chosen:** chosen answer and walkthrough backgrounds.
- **On action:** contrasting text on filled green actions; distinct from the general surface color.
- **Control border:** shared field and secondary-control stroke.
- **Focus:** keyboard outlines on interactive controls.

The default frontmatter roles describe light appearance; `dark-` counterparts record the matching overrides in `html[data-theme='dark']`. Paper, surface, ink, muted, line, green, focus, selected, chosen, action text, and control strokes change together. Supporting callouts, feedback, progress tracks, and hints also use semantic CSS properties from `globals.css`. Editor, code header, console, source text, active-line highlight, caret, and brand details also change to navy, slate, and light gray or white in dark appearance. The CSS names `green` and `lime` are incumbent semantic names: their dark values are neutral light accents, not green hues.

**The Two Materials Rule.** Use the themed reading canvas for explanation and the dark editor for code, output, and revealed solutions.

**The Semantic Appearance Rule.** Bind shared controls and reading surfaces to their semantic CSS properties so foreground, background, border, and focus change together.

## Typography

**Display Font:** Newsreader with Georgia and serif fallbacks.
**Body Font:** DM Sans with a sans-serif fallback.
**Label/Mono Font:** UI monospace for code, line numerals, variable values, and console output.

The heading ramp is expressive but restrained; the interface remains dense enough for tutoring. The frontmatter records the desktop roles. Lesson prose uses smaller supporting text (13px, line-height 1.8), with a larger goal statement and a reading width of at most 70ch. Compact metadata generally runs from 10px to 12px and is subordinate to the lesson. The curriculum expansion uses 11px topic labels, 9px mobile unit counts and source references; these are incidental metadata sizes, not a reading-text scale.

### Hierarchy
- **Display:** greeting; fluid desktop size, becoming 38px on mobile.
- **Headline:** topic heading; becomes 23px on mobile in the expanded curriculum.
- **Title:** explanation, exercise, and challenge headings; becomes 23px on mobile.
- **Body:** general prose and inherited controls; lesson supporting text is smaller.
- **Unit title:** the curriculum picker uses Newsreader (23px/1.3), becoming 22px on mobile.
- **Lesson numeral:** desktop uses Newsreader (37px/1); the numbered curriculum uses 27px on mobile.
- **Label:** navigation and button text, primarily sentence case. The brand wordmark uses DM Sans (20px desktop, 19px mobile), a distinct identity detail rather than a display-heading role.
- **Code:** source uses line-height 2.1; editable source uses 1.9; the console uses 11px/1.7.

**The Reading Hierarchy Rule.** Reserve Newsreader for headings and lesson numerals; use DM Sans for prose and controls, and monospace for source and values.

## Layout

Desktop uses a fixed unit rail (272px) and an offset fluid main area. The main container caps at 1320px with generous horizontal inset (46px). Explanation and demonstration share a near-equal two-column grid, with the code slightly wider. Ruled headers, activity navigation, and the footer organize the page without card chrome.

At 1150px the rail narrows to 235px and content inset to 28px. At 930px explanation and code stack. At 650px the rail becomes a static full-width header, the four-unit navigation becomes a two-column grid, main inset becomes 20px, and mobile progress appears above the introduction. Activity tabs and code scroll within their own regions. At 1600px the reading area gains vertical space and larger lesson prose and code. Spacing uses compact control gaps and larger section gaps; there is no enforced universal baseline grid.

The access surface uses the same paper canvas and ruled header without an enclosing card. Its header caps at 1228px; the single-column form caps at 420px. Desktop page inset is 46px and mobile inset is 20px at the existing 650px breakpoint. The session-status view caps at 520px with a 24px inset. These are surface-specific compositions, not replacements for the workspace grid.

The teacher overview shares the 1320px content cap and 46px desktop / 20px mobile page inset. Its header wraps at 650px; the roster stays a semantic table in a keyboard-focusable horizontal scroll region, preserving columns rather than compressing names and counts into cards. Long student names and email addresses wrap. Student identity and overall completion lead the columns. On mobile, a visible localized scroll hint describes the table region; narrower identity columns and wrapping column headings expose useful completion information before scrolling. These roster dimensions are surface-specific, not a new global grid.

## Elevation & Depth

Most surfaces are flat, distinguished by tone, rules, and whitespace. A single diffuse code-panel shadow introduces restrained depth; selected rows and callouts use tonal fills.

### Shadow Vocabulary
- **Code-panel ambient:** `0 12px 28px #20372812`, reserved for the read-only code panel.
- **Active source marker:** an inset lime edge marks the current line; this is a state indicator, not elevation.

**The Quiet Surface Rule.** Separate ordinary sections with rules and space; reserve the diffuse shadow for the code panel.

## Shapes

Controls have gently rounded corners; selectable rows use the slightly broader row radius. Callouts and editable code use panel corners, while the read-only code panel is slightly rounder (12px). Unit and walkthrough numerals use circles. Topic picker arrows use a smaller corner (6px); revealed solutions use an incidental corner (9px). These local exceptions do not extend the reusable radius scale. Fine one-pixel borders and clipped editor sections create containment; the build has no general pill-based control system.

## Components

### Buttons

Compact and quiet. Primary actions use the semantic action color (green in light appearance, light gray in dark) with contrasting on-action text; secondary help actions are transparent with the semantic control border; text actions remove the enclosing border. Hover darkens through brightness (0.96), with background and color transitions over 0.18s. Keyboard focus uses a visible two-pixel focus outline with four-pixel offset. Disabled controls lower opacity to 0.5; completed actions retain full opacity and use the themed completed fill.

### Cards / Containers

Lesson prose sits directly on paper. Takeaways and hints use pale green tonal containers in light appearance and slate tonal containers in dark; feedback uses warm caution or pale success backgrounds and explicit explanatory text. Code uses the dedicated dark surface. These are content roles rather than interchangeable dashboard cards.

### Inputs / Fields

Answer fields use the themed surface and control stroke, and shared control corners. Choice rows place a native radio beside readable source, with a pale selected background, stronger border, and check icon. The source editor uses monospace, a themed accent caret, and vertical resizing. Shared keyboard outlines remain visible; the source textarea moves its outline inward.

### Appearance Control

A shared sun/moon SVG button appears in the login preferences, workspace header, and teacher header. Its visible English or Spanish label names the appearance it will activate; its accessible label and title describe the same action. It uses the shared surface, ink, control stroke and control corners, a 44px minimum height, and the existing keyboard focus treatment. Preference groups and header actions wrap on narrow screens.

A validated saved light/dark preference takes precedence over device appearance. Without one, the page follows the device preference, including later changes. A head bootstrap applies appearance before body paint. Explicit changes persist across reloads and routes and synchronize across tabs; unavailable storage uses an in-memory fallback. Appearance is independent of the selected language.

### Java Source Editing

The editor remains a labeled native textarea. Plain Enter preserves the current line's leading spaces or tabs, adding four spaces after an opening Java block brace. Between paired braces it creates an indented blank line and places the closing brace at the original indentation. Braces within strings, character literals, text blocks, and comments do not trigger block indentation. The insertion replaces the selected range while keeping surrounding code and places the caret on the new line.

Cancelable mobile line-break input follows the same insertion behavior. Composition input and modified Enter retain native handling; Tab retains native focus navigation. Spellcheck, autocorrect, and automatic capitalization are disabled for source. This is an editing affordance, not a new type, spacing, or component-shape scale.

### Managed Access

The login and session-status surfaces inherit serif headings, the themed canvas and action colors, and shared keyboard outlines. Email and password fields and the language select use 16px text, the themed control stroke, and shared control corners. Login and retry actions have a minimum height of 48px; the compact workspace logout action has a 40px minimum. Pending login keeps fields read-only and disables submission with an explicit changing label. Access notices use the existing selected tone, rounded row corners, and readable status or alert text; failure is conveyed by copy and semantics rather than color alone. Login headings use a surface-specific fluid size (36–48px), not a new global heading token.

Account identity and logout wrap within the workspace header; long names wrap rather than truncate. Checking, blocked, and ended sessions replace the interactive workspace with a plain status view; blocked access offers retry. Logout failure appears alongside account controls. No elevated dialog or new icon language is introduced. English and Spanish labels follow the shared locale resources.

### Saved Progress and Teacher Roster

Completion remains a compact lesson action: a translated saving label and disabled control show the pending request; completed styling and counts update only after the server confirms the saved completion list. A failed save leaves completion unchanged and presents a ruled inline alert with the existing secondary retry action. Sidebar and mobile progress copy identify account storage. This extends existing state language without adding a new palette or elevation treatment.

The teacher-only account link opens a quiet roster on paper. A serif display heading and muted introduction precede a captioned, ruled table. Student names and overall percentages receive weight; email and count metadata use the existing compact label size. Tabular numerals support comparison. Account access is written explicitly, alongside overall and per-unit completion and a locale-formatted last-activity time or no-activity label. Empty and unavailable states occupy the same ruled content region; unavailable data has an alert and reload action. Completion is described as practice rather than a grade. English and Spanish labels remain in typed locale resources.

### Navigation

Four units are broad rows with circular numbers, supporting completion counts, and a selected fill. On mobile they become a two-column grid with wrapping labels and visible counts. Within the current unit, a native topic select shares its row with previous/next icon buttons; endpoint buttons are disabled. The select uses the themed surface and control border, shared control corners, and compact text. The unit heading and description sit above; a quiet source reference below identifies the PDF page. Activity navigation is a row of icon-and-label buttons; the active item gains semantic action ink, heavier weight, and an underline, with horizontal scrolling where needed. Icons are inline SVG, paired with text or an accessible label.

### Coordinated Code Trace

A file header, numbered source, variable watch, console, and previous/next controls share one dark panel. The selected step coordinates the active source line, variable value, console output, and accompanying explanation. Variable-watch prose follows the selected English or Spanish locale while Java identifiers and code tokens remain unchanged. Endpoint controls are disabled. Activity changes use a short clip-path and opacity arrival (0.25s ease-out); reduced-motion disables animation, transitions, and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** preserve the serif heading and sans-serif control relationship.
- **Do** pair selected state color with a border, numeral, weight, or text cue.
- **Do** preserve horizontal scrolling for activity tabs and code, and wrapping labels in the mobile unit grid.
- **Do** disable arrival animation and transitions for reduced motion.
- **Do** use semantic foreground, background, border, and focus properties together in both appearances.
- **Do** preserve native composition and Tab focus navigation in source editing.

### Don't:
- **Don't** turn every lesson section into an elevated card.
- **Don't** use the lime highlight as ordinary body text on paper.
- **Don't** clip bilingual labels or code to force a fixed layout.

Not canonized: the decorative Java stamp and brand-dot green (#73924b) are identity flourishes rather than new reusable components or palette roles; tiny metadata sizes and the solution’s 9px radius are observed implementation details, not new scale tokens. Tiny source references should not set the size of new reading text. The access hover and account-note tones remain supporting semantic treatments rather than independent palette primitives; the shared field/control stroke now belongs to the recorded semantic palette. Roster column minimum widths and row padding remain local table layout details, not reusable spacing tokens. No seed candidate mapping or comp approval is inferred: the direction record explicitly identifies its missing pre-implementation mapping.
