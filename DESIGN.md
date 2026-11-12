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
  selected: "#e7edda"
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
    textColor: "{colors.surface}"
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
  choice:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.row}"
    padding: "15px 17px"
---

# Design System: JavaPractice

## Overview

**Creative North Star: "Learning lab"**

Warm paper and green ink frame a quiet learning lab. Serif headings establish the reading hierarchy; compact sans-serif controls keep topic selection and practice precise. A dark code surface gives source, values, and output their own material without turning the workspace into a dashboard.

This is a scan of the implemented interface, grounded in `src/app/globals.css`, the learning workspace, and the code panel. The direction was code-first; there is no approved image comp. Directional vocabulary comes from the recorded learning-lab contract rather than a new identity workshop.

**Key Characteristics:**
- Warm paper with green ink and lime emphasis
- Serif lesson hierarchy with compact sans-serif controls
- Ruled separation and restrained soft corners
- Coordinated source, variable, output, and explanation states

## Colors

A restrained green palette sits on warm neutrals, with lime reserved for selection and code emphasis.

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
- **Selected:** chosen answer and walkthrough backgrounds.
- **Focus:** keyboard outlines on interactive controls.

**The Two Materials Rule.** Use paper for explanation and the dark editor for code, output, and revealed solutions.

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

Compact and quiet. Primary actions use green with warm white text; secondary help actions are transparent with a muted green border; text actions remove the enclosing border. Hover darkens through brightness (0.96), with background and color transitions over 0.18s. Keyboard focus uses a visible two-pixel focus outline with four-pixel offset. Disabled controls lower opacity to 0.5; completed actions retain full opacity and use a pale green fill.

### Cards / Containers

Lesson prose sits directly on paper. Takeaways and hints use pale green tonal containers; feedback uses warm caution or pale success backgrounds and explicit explanatory text. Code uses the dedicated dark surface. These are content roles rather than interchangeable dashboard cards.

### Inputs / Fields

Answer fields use the warm surface, muted green stroke, and shared control corners. Choice rows place a native radio beside readable source, with a pale selected background, stronger border, and check icon. The source editor uses monospace, a lime caret, and vertical resizing. Shared keyboard outlines remain visible; the source textarea moves its outline inward.

### Navigation

Four units are broad rows with circular numbers, supporting completion counts, and a selected fill. On mobile they become a two-column grid with wrapping labels and visible counts. Within the current unit, a native topic select shares its row with previous/next icon buttons; endpoint buttons are disabled. The select uses the warm surface, a muted green border, shared control corners, and compact text. The unit heading and description sit above; a quiet source reference below identifies the PDF page. Activity navigation is a row of icon-and-label buttons; the active item gains green ink, heavier weight, and an underline, with horizontal scrolling where needed. Icons are inline SVG, paired with text or an accessible label.

### Coordinated Code Trace

A file header, numbered source, variable watch, console, and previous/next controls share one dark panel. The selected step coordinates the active source line, variable value, console output, and accompanying explanation. Variable-watch prose follows the selected English or Spanish locale while Java identifiers and code tokens remain unchanged. Endpoint controls are disabled. Activity changes use a short clip-path and opacity arrival (0.25s ease-out); reduced-motion disables animation, transitions, and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** preserve the serif heading and sans-serif control relationship.
- **Do** pair selected state color with a border, numeral, weight, or text cue.
- **Do** preserve horizontal scrolling for activity tabs and code, and wrapping labels in the mobile unit grid.
- **Do** disable arrival animation and transitions for reduced motion.

### Don't:
- **Don't** turn every lesson section into an elevated card.
- **Don't** use the lime highlight as ordinary body text on paper.
- **Don't** clip bilingual labels or code to force a fixed layout.

Not canonized: the decorative Java stamp and brand-dot green (#73924b) are identity flourishes rather than new reusable components or palette roles; tiny metadata sizes and the solution’s 9px radius are observed implementation details, not new scale tokens. Tiny source references should not set the size of new reading text. No seed candidate mapping or comp approval is inferred: the direction record explicitly identifies its missing pre-implementation mapping.
