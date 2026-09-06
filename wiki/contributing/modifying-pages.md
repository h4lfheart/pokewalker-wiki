---
title: Modifying Pages
description: Simple steps for adding or editing documentation pages
order: 1
---

# Modifying Pages

## Pick a section
| Topic        | Folder               |
|--------------|----------------------|
| Hardware     | `wiki/hardware/`     |
| Firmware     | `wiki/firmware/`     |
| Development  | `wiki/development/`  |
| Contributing | `wiki/contributing/` |

## Copy the Template

1. Copy [`wiki/templates/new-page.md`](https://github.com/h4lfheart/pokewalker-wiki/blob/main/wiki/templates/new-page.md)
2. Put it in the right folder
3. Name it in kebab-case (lowercase and hyphens), e.g. `rtc-timer.md`

## Fill in the Page

### File Header

At the top of each page, add a frontmatter header with the page's metadata:

```md
---
title: Page Title
description: One sentence about this page
order: 1
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The page title shown in the sidebar and page heading |
| `description` | Yes | A one-sentence summary of the page |
| `order` | No | Controls page order in the sidebar. Lower numbers appear first. |
| `section` | No | Set to `true` on an `index.md` file to create a collapsible sidebar section |

## Adding a New Section

To create a new sidebar group, add an `index.md` file inside a folder and set `section: true` in its frontmatter:

```md
---
title: Section Name
section: true
order: 1
---
```

The `index.md` file acts as the section header. Any other pages in the same folder will appear grouped under this section in the sidebar.

## Add File Content

1. Drop the file in `public/` (e.g. `public/hardware/overview/teardown.png`)
2. Reference it as:

```md
![Teardown Image](/hardware/overview/teardown.png)
```
