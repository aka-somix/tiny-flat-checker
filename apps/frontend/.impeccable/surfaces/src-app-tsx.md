---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/pages","src/ui"]
---

# Surface: Tiny Flat Checker app (landing checklist, profile, saved check)

Mode: Operate. Phone in hand during a 15–40 min flat viewing; desk review is secondary.
Task: answer ~47 checks in 11 sections with one tap each, name the flat, and save (when signed in) or download a PDF.
Constraints: the checklist is the first screen; drafts survive the sign-in redirect; invite-only Google sign-in; WCAG 2.2 AA; daylight legibility.
Chosen world: Terminal Yellow Wayfinding (a challenger the user adopted over the assigned Daylight Signage).
Memorable moment: the sticky yellow sign band that re-signs itself as you move room to room ("Plumbing → next: Electrical · 3 left").

## Direction contract
THESIS: A viewing is a walk through a terminal. Each section is a junction sign telling you where you are, what is next and how much is left. It refuses the category default: white cards, a blue accent and accordions.

OWN-WORLD: Schiphol-style saturated sign yellow as the panel ground, sign black type and inset squares, and white pictograms or glyphs on black. Answer tiles are black-framed bands, and the selected tile reverses to black on yellow. A humanist sans (Atkinson Hyperlegible Next) is set in sentence case. Numbers (section index, counts, price) are monumental. Hairline black rules divide the bands. Yellow is reserved for wayfinding and state; the reading surfaces of long lists (the profile list) sit on yellow panels framed in black.

STORY: The visitor lands on a sign that says "Checking a flat? Start here", with the first section already answerable. They tap down through the sections while the band re-signs at each turn and keeps count. They name the flat, then either save it (once signed in) or take the PDF.

FIRST VIEWPORT (390 px phone): The top bar holds the black square logo glyph and "Tiny Flat Checker" on the left and "Sign in" on the right. Below it sits a monumental black heading, "Check the flat, not the photos.", with a one-line subhead. Next is the flat sign (title, link, price fields) framed as a panel. Then comes the sticky section band: a black inset with a section number, the section name at large size, and "4 checks · next: Windows & doors". The first check bands are visible below the fold line. A bottom action bar fixed to the thumb zone carries a black "Save check" button (or "Sign in to save") and an outline "PDF" button.

FORM: Terminal Yellow Wayfinding. It was a challenger the user adopted from the full hand (assigned was list #4, Daylight Signage). Seed key 95ef20fa.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
