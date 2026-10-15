---
name: Tiny Flat Checker
description: A terminal wayfinding sign you can walk through a flat viewing with.
colors:
  sign-yellow: "#ffcc00"
  sign-yellow-pressed: "#f2bf00"
  field-white: "#ffffff"
  sign-black: "#0b0b0b"
  panel-black: "#1a1a1a"
  on-panel-white: "#ffffff"
  ochre-ink: "#4a3b00"
  signal-red: "#8f0017"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 12vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  numeral:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.25
  title:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
  question:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
  caption:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  inset: "3px"
  control: "4px"
  panel: "6px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  target: "52px"
components:
  button-primary:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.sign-yellow}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.target}"
  button-secondary:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.sign-black}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.target}"
  button-secondary-hover:
    backgroundColor: "{colors.sign-yellow-pressed}"
  button-ghost:
    textColor: "{colors.sign-black}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.target}"
  button-inverse:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.sign-yellow}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.target}"
  choice-tile:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.sign-black}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "{spacing.target}"
  choice-tile-selected:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.sign-yellow}"
  input:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.sign-black}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "{spacing.target}"
  section-band:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.sign-yellow}"
    typography: "{typography.title}"
    rounded: "{rounded.panel}"
    padding: "8px 16px 8px 8px"
  pictogram:
    backgroundColor: "{colors.sign-black}"
    textColor: "{colors.on-panel-white}"
    rounded: "{rounded.inset}"
    size: "48px"
  sign-panel:
    backgroundColor: "{colors.sign-yellow}"
    textColor: "{colors.sign-black}"
    rounded: "{rounded.panel}"
    padding: "16px"
---

# Design System: Tiny Flat Checker

## Overview

**Creative North Star: "The Terminal Junction Sign"**

A flat viewing is treated as a walk through an airport terminal. The whole page is a saturated sign-yellow panel. Sign black carries the type, the frames and every selected state. White shows up in only two places: pictograms set on black and the fields you type into. Each checklist section opens with a junction sign that tells you where you are, what comes next and how much is left. Numbers such as counts, totals and prices are set at monumental size because they are the information a sign exists to deliver.

Density is low and the targets are big. Every control is at least 52px tall, answers take one tap, and type starts at 18px for reading text, because the system is built for a phone held in one hand in bright daylight. There is almost no ornament. Depth comes from thick black frames and black-on-yellow reversal, not from shadows. The build rejects white cards with a blue accent and accordions, which is the category default.

**Key Characteristics:**
- One yellow ground, one black ink, white only for pictograms and input fields.
- Selection is shown by reversal: a chosen tile turns into black with yellow type, like a lit sign.
- Thick black frames (2px on controls, 4px on panels and bars) do the work that elevation would do elsewhere.
- Monumental numerals for counts and totals, with sentence-case type everywhere.
- Square-ish corners in three steps (3 / 4 / 6px) that nest from inset to control to panel.

## Colors

The palette is a two-ink sign: saturated yellow and near-black, with white and one red held back for narrow jobs.

### Primary
- **Sign Yellow** (#ffcc00): the ground of the page, the panels and the unselected tiles. It is also the type color on black surfaces (section band, primary button, user card). Yellow is the page itself, not an accent sprinkled on top.
- **Sign Yellow Pressed** (#f2bf00): the hover and pressed fill for yellow controls (secondary buttons, unselected tiles, list rows, the start sign) and the empty track of the progress bar.

### Neutral
- **Sign Black** (#0b0b0b): all type, every frame and rule, selected tiles, pictogram insets, the section band, the primary button, the focus outline and text selection. The `line`, `accent` and `success` tokens in the theme are aliases of this one value. Success is shown with a black check mark, not with green.
- **Panel Black** (#1a1a1a): the hover fill for black buttons. Nothing else uses it.
- **Ochre Ink** (#4a3b00): secondary text such as hints, metadata, placeholders, "(optional)" and read-only unselected tiles. It is tinted from the yellow's hue so it sits on the ground without looking grey (about 7:1 on Sign Yellow).
- **Field White** (#ffffff): the fill of text inputs and text areas. This is the only place white is used as a surface.
- **On-Panel White** (#ffffff): pictogram strokes and type set on black inset squares.

### Tertiary
- **Signal Red** (#8f0017): validation errors only, as error text and the border of an invalid field (about 5.6:1 on Sign Yellow). It is not used for destructive actions. Delete actions use the normal secondary and primary buttons.

### Named Rules
**The Two-Ink Rule.** Every surface is either Sign Yellow or Sign Black, and type always takes the other one. If a surface needs a third color, the design is wrong. White is allowed only on inputs and pictograms.

**The Reversal Rule.** State is shown by swapping yellow and black: a selected tile, an answered check code, an inset square. Never show selection with a tint, a glow or a new hue.

## Typography

**Display Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif)
**Label/Mono Font:** ui-monospace stack is declared in the theme but the build does not use it.

**Character:** One humanist sans designed for legibility carries every role. Hierarchy comes from weight (400 / 600 / 700 / 800) and size, never from a second family. The face's distinct glyph shapes, such as the slashed zero, keep numerals easy to read at a glance.

### Hierarchy
- **Display** (800, clamp(2.75rem, 12vw, 4.5rem), 0.95, -0.03em): the landing headline only. It is set as black on yellow with balanced line breaks.
- **Numeral** (800, 48px, 1, tight tracking): the counts on the start sign. The same 800-weight tight style scales down to 36px for section band counts and 30px for action bar totals and prices.
- **Headline** (800, 30–36px, 1.05–1.25): page-level names such as a saved flat's title (36px), the user's name and the "Saved checks" heading.
- **Title** (700–800, 24px, 1.25): section band names (800, truncated to one line) and panel headings such as "Which flat?" (700).
- **Question** (600, 20px, 1.25, balanced): the question on each check.
- **Body** (400, 18px, 1.5): reading text, input values, button and tile labels (labels at 600). Hints sit at 16px in Ochre Ink.
- **Label** (700, 16px): form field labels.
- **Caption** (400, 14px): field hints, status lines, the Poor/Great scale ends (600) and check codes (700).

### Named Rules
**The Sentence Case Rule.** Every string is in sentence case. The build has no uppercase labels and no letter-spaced small caps.

**The Monumental Number Rule.** A number that answers "how many" or "how much" (checks left, total answered, asking price) is set at 800 weight and at least 30px, larger than the words around it.

## Layout

The layout is a single column on a 4px base. Content sits in a centered 672px column (`max-w-2xl`) with 16px side gutters at every width. Page sections are spaced 24px apart. Inside panels, groups are 16px apart, and tiles and buttons in a row are 8px apart. Each check is a band with 20px of vertical padding, separated from the next by a 2px black rule.

The top bar sits above a 4px black rule. The action bar is fixed to the bottom thumb zone under a 4px black rule, with a 6px progress track along its top edge and room for the safe-area inset. The main column reserves bottom padding so content is never covered. The section band is sticky at the top of its section. It bleeds 16px into the gutters on a yellow backing so content scrolls cleanly underneath it.

The layout is mobile-first with one breakpoint (640px). At that width the action bar moves from stacked to a single row, the price field takes a fixed 12rem column next to the link, and list row actions move from a vertical stack to a horizontal one. Every interactive target is at least 52px. The page never scrolls sideways.

## Elevation & Depth

The system is flat and framed. Depth comes from black frames and yellow/black reversal: a panel has a 4px frame, a control has a 2px frame, and a selected element turns solid black. There is one shadow, and it does a job. The sticky section band uses it to separate itself from the checks scrolling underneath.

### Shadow Vocabulary
- **Sticky lift** (`box-shadow: 0 6px 14px -8px rgb(0 0 0 / 0.55)`): only under the sticky section band.

### Named Rules
**The Frame-Not-Float Rule.** Containers are separated by black frames, never by drop shadows. The only shadow belongs to the element that physically sits over scrolling content.

## Shapes

Corners are nearly square, in three nesting steps. Inner squares (pictogram insets, check-code chips, icons inside buttons) use 3px. Controls (buttons, tiles, inputs, list rows, the avatar) use 4px. Panels and signs (flat sign, start sign, section band, user card, dialog) use 6px. Strokes follow the same logic: 2px for controls and rules between checks, 4px for panel frames and the top and bottom bar rules. Pictograms are Lucide line icons at a heavy 2.5–3 stroke, so they read like sign symbols. The only circle in the system is the spinner. Empty states use a 4px dashed black frame.

## Components

### Buttons
Heavy, sign-like blocks with a 52px minimum height, 18px semibold labels and a 4px radius. A leading icon goes into its own 36px inset square, which reverses against the button ground.
- **Primary:** Sign Black fill with Sign Yellow type. The icon inset is a 2px yellow outline square. Used for the main commit action ("Sign in to save", "Save check") and the confirm button in dialogs.
- **Secondary:** Sign Yellow fill with a 2px black frame. Hover fills with Sign Yellow Pressed. The icon inset is solid black with a white icon. Used for PDF, retry and delete.
- **Ghost:** no fill, with a 2px underline offset 4px and a bare icon. Used for "Sign in" in the top bar and "Clear answers".
- **Inverse:** for black panels. Black fill with a 2px yellow frame and a yellow icon inset (user card "Sign out").
- **Focus / Disabled:** a 3px black outline offset 3px. Disabled buttons drop to 50% opacity. Color transitions run over 150ms.

### Choice Tiles (signature)
One-tap answer bands built as radio groups. Yes/No and 1–5 ratings fill the row in equal columns. Option lists wrap.
- **Style:** Sign Yellow with a 2px black frame, 52px minimum in both directions, and an 18px semibold label.
- **State:** selected tiles reverse to Sign Black with yellow type. Tapping the selected tile again clears it. Hover fills with Sign Yellow Pressed, press scales to 0.97, and focus puts a 3px outline on the tile. In read-only mode, unselected tiles fade to an Ochre Ink frame and text.

### Cards / Containers (sign panels)
- **Corner Style:** 6px.
- **Background:** Sign Yellow inside a 4px black frame (flat sign, error panels, start sign), or solid Sign Black with yellow type (user card, auth error banner).
- **Shadow Strategy:** none. See Elevation & Depth.
- **Internal Padding:** 16px. The start sign and section band use 8px around a full-height inset square.

### Inputs / Fields
- **Style:** Field White fill, 2px black frame, 4px radius, 52px tall, 18px text, Ochre Ink placeholder. Text areas add 12px vertical padding.
- **Focus:** the browser outline is replaced by a 3px black outline offset 2px.
- **Error / Disabled:** errors turn the frame Signal Red and add a 14px bold red message linked through `aria-describedby`. Disabled fields drop to 60% opacity.

### Navigation
The top bar holds the black logo pictogram and the bold "Tiny Flat Checker" name on the left. Account controls sit on the right: the ghost "Sign in" button, or "My checks" with a 40px black-framed avatar. The bar sits above a 4px black rule. There is no menu, and the same bar is used on mobile and desktop.

### Section Band (signature)
The junction sign. It is a black 6px panel that stays stuck to the top while you scroll its section. A full-height yellow inset on the left holds the section pictogram in black. The 24px extrabold section name sits next to it, with a line below reading "n of N → next section" in 85% yellow. On the right is a monumental "answered/count" figure, which gains a check mark when the section is complete.

### Check Row
Each check is a band separated by a 2px rule. A 3px-radius chip with a 2px frame shows the check code (for example "3.2") and fills black once the check is answered. Next to it are the 20px question and an Ochre Ink hint, with the answer tiles below.

### Pictogram
A white line icon on a black 3px inset square, in three sizes (36 / 48 / 64px). It is always decorative and always paired with text. On a black surface the inset reverses to yellow with a black icon.

### Action Bar
Fixed to the bottom with a 4px top rule and a 6px black progress fill on a Sign Yellow Pressed track. The overall count is set as a 30px monumental numeral, with a polite live status line in Ochre Ink. The last action stretches to fill the row on mobile.

## Do's and Don'ts

### Do:
- **Do** set every surface as Sign Yellow or Sign Black and type it in the other ink (The Two-Ink Rule).
- **Do** show selection and completion by reversing yellow and black, as tiles, check codes and inset squares already do.
- **Do** keep every interactive target at least 52px and every answer to a single tap.
- **Do** frame containers with black strokes: 2px for controls and rules, 4px for panels and bars.
- **Do** nest corners from 3px (insets) to 4px (controls) to 6px (panels).
- **Do** put pictograms on a black inset square with a heavy 2.5–3 stroke, and pair each one with text.
- **Do** set counts, totals and prices at 800 weight and at least 30px.
- **Do** keep the 3px black focus outline visible on every control.

### Don't:
- **Don't** use white cards, a blue accent or accordions. That is the category default this system replaces.
- **Don't** use white as a panel surface. It belongs only to inputs and pictogram strokes.
- **Don't** add drop shadows to cards or panels. The sticky section band's lift is the only shadow.
- **Don't** set text in uppercase or as letter-spaced labels. Every string is sentence case.
- **Don't** use Signal Red for anything except validation errors.
- **Don't** introduce a second typeface. Atkinson Hyperlegible Next carries every role through weight and size.
