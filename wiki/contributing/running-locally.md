---
title: Running Locally
description: Install dependencies and preview the wiki site on your computer
order: 3
---

# Running Locally

Preview your changes on your computer before opening a pull request.

## Requirements

- [node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

## Setup

1. Fork and clone the [pokewalker-wiki](https://github.com/h4lfheart/pokewalker-wiki) repository
2. Open a terminal in the project folder
3. Install dependencies:

```sh
pnpm install
```

4. Start the local preview:

```sh
pnpm wiki:dev
```

5. Open the local URL shown in the terminal, usually at `http://localhost:5173`

Changes to markdown and media files hot reload in the browser automatically.

## Other Commands

| Command             | What it does |
|---------------------| --- |
| `pnpm wiki:dev`     | Live preview while you edit |
| `pnpm wiki:build`   | Build the site for production |
| `pnpm wiki:preview` | Preview the production build |

When you are ready to submit your contributions, follow [Creating a Pull Request](/contributing/creating-a-pull-request).
