---
title: Creating a Pull Request
description: Submit documentation changes for review on GitHub
order: 2
---

# Creating a Pull Request

A pull request asks maintainers to review and merge your changes into the wiki.

## From the Wiki Website

Best for small edits to one page.

1. Open the page on the wiki site
2. Click **Edit this Page** at the bottom
3. Make your changes on GitHub
4. Click **Commit Changes** and fill in a short commit message
5. Open a pull request against `main` using the title and description format below

## From Your Computer

Best for new pages, media, or changes across multiple files. You can set up a [local preview](/contributing/running-locally) after cloning.

1. Fork [pokewalker-wiki](https://github.com/h4lfheart/pokewalker-wiki) on GitHub, then clone your fork:

```sh
git clone https://github.com/YOUR-USERNAME/pokewalker-wiki
cd pokewalker-wiki
```

*Replace `YOUR-USERNAME` with your GitHub username.*

2. Create a branch for your work (you cannot commit straight to `main`):

```sh
git checkout -b your-change-name
```

3. Make your edits under `wiki/` (and `public/` if you add visual content)
   - Make sure to follow the [Style Guidelines](/contributing/style/guidelines)!
4. Commit your changes with a clear message:

```sh
git add .
git commit -m "Short description of the change"
```

5. Push your branch:

```sh
git push -u origin your-change-name
```

6. Open GitHub and create a pull request into `main`
7. Fill in the title and description using the format below

## Pull Request Conventions

### Title

Use a short [conventional commit](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) prefix, then a clear name for what changed:

| Prefix      | When to use | Example                                 |
|-------------| --- |-----------------------------------------|
| `feat:`     | New or updated documentation | `feat: add teardown images to hardware` |
| `fix:`      | Corrects wrong or broken docs | `fix: correct instruction cycle count`  |
| `refactor:` | Restructures docs without changing meaning | `refactor: reorganize ghidra docs`      |

Keep the title specific. Prefer `feat: add timer breakdown page` over `feat: update page`.

### Description

Write enough for a maintainer to understand the change without needing to open every file.

- What you added, changed, or removed
- Which pages or sections are affected
- Why the change was needed, if it is not obvious

Example:

```md
- Adds an RTC page under Hardware with register docs and behavior info.
```