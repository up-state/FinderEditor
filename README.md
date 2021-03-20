# liquid-client

## Development

### Requirements

- [Node.js](https://nodejs.org) >= 12 with npm

### Getting Started

```sh
# Project setup: Install dependencies
npm ci

# Development: Compiles and hot-reloads
npm run serve

# Lint and fix files
npm run lint

# Production: Build and minify
npm run build
```

### Build Tool Reference

See [Configuration Reference](https://cli.vuejs.org/config/).

### Conventions

#### Code Formatting

This project uses the code formatter [prettier](https://prettier.io/) to format all code consistently.
Staged code is prettied in a git hook on-commit. Additionally it's recommended to setup your code editor for prettier.

- VSCode: [Prettier Plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- JetBrains:
  - [JetBrains Plugin Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)
  - [Configuring Prettier for JetBrains IDEs](https://www.jetbrains.com/help/idea/prettier.html#ws_prettier_reformat_code)


## Deployment

This site is currently developed as a static site which makes it very easy to deploy.

We use Github Pages for hosting. Check out the `gh-pages` branch.