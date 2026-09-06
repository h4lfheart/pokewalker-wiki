---
title: Style Guidelines
description: Naming, structure, titles, and writing style for documentation pages
order: 2
---

# Guidelines

Follow these conventions so new pages match the rest of the wiki.

## File Structure

- One topic per page. Split long topics into separate pages.
- Nested group: put related pages in a subfolder with its own `index.md`.
- Keep media paths mirrored under `public/`
  - i.e. `public/hardware/overview/pw-demo.mp4` for a page at `wiki/hardware/overview.md`.

## Naming

- Files and folders: **kebab-case** only (lowercase letters, numbers, and hyphens).
  - Good: `rtc-timer.md`, `picowalker-pcb.md`
  - Bad: `RtcTimer.md`, `PicowalkerPcb.md`
- Name the file after what the reader is doing or looking up.
- Do not use spaces or special characters in paths.

## Titles and Page Header

Every page starts with something like this:

```md
---
title: RTC Timer
description: Documentation on the registers and behavior of the onboard RTC timer.
order: 1
---

# RTC Timer
```

- The `title` and main `#` heading must match.
- Capitalize the main words in titles. Prefer clear actions or nouns: **RTC Timer**, **Poke-Radar Behavior**, **IR Protocol**.
- `description` is one short sentence that says what the page covers. Do not repeat the title word-for-word.
- Use `order` when sidebar order matters. Lower numbers appear first. Put cheatsheets and reference pages last.
- Do not make titles sound like ads, they should generally explain what they cover. Don't be over specific either.

## Text Style

- Lead with one or two short sentences, then the steps or list.
- Prefer numbered steps for how-tos. Prefer bullets for notes, options, or loose lists.
- Use backticks for paths, filenames, and similar values: `pocketwalker.exe`, `wiki/hardware/`.
- Link related pages with clean paths: `[CPU Summary](/hardware/cpu/summary)`.
- Keep sentences short. Say what to do, then any needed why.
- Avoid filler words and long walls of text.
- Use callouts as intended:
  - `tip` for optional helpful advice
  - `warning` for easy mistakes
  - `danger` for something that can break a project or lose work

## Images and Media

- Prefer short clips or screenshots that show one action, not a full tour.
- Reference public files from the site root: `![Teardown Image](/hardware/overview/teardown.png)`.
