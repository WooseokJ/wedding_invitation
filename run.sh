#!/bin/sh
set -eu

cd "$(dirname "$0")"

if command -v bun >/dev/null 2>&1; then
  if [ ! -x node_modules/.bin/vite ]; then
    bun install --frozen-lockfile
  fi
  exec bun run dev
fi

if command -v npm >/dev/null 2>&1; then
  vite_config_loads() {
    node --input-type=module -e 'import { loadConfigFromFile } from "vite"; await loadConfigFromFile({ command: "serve", mode: "development" }, "vite.config.ts")' >/dev/null 2>&1
  }
  if ! command -v node >/dev/null 2>&1; then
    printf '%s\n' 'Node.js 22.12 or newer is required. Install Node.js, then run this script again.' >&2
    exit 1
  fi
  if ! node -e 'const [major, minor] = process.versions.node.split(".").map(Number); process.exit(major < 22 || (major === 22 && minor < 12) ? 1 : 0)'; then
    printf 'Node.js 22.12 or newer is required; found %s. Upgrade Node.js, then run this script again.\n' "$(node --version)" >&2
    exit 1
  fi
  if [ ! -x node_modules/.bin/vite ] || ! vite_config_loads; then
    npm install --no-package-lock
    if ! vite_config_loads && [ "$(node -p 'process.platform + "-" + process.arch')" = "darwin-arm64" ]; then
      rolldown_version=$(node -p 'require("./node_modules/rolldown/package.json").version')
      oxc_parser_version=$(node -p 'require("./node_modules/oxc-parser/package.json").version')
      npm install --no-save --no-package-lock "@rolldown/binding-darwin-arm64@$rolldown_version" "@oxc-parser/binding-darwin-arm64@$oxc_parser_version"
    fi
  fi
  exec npm run dev
fi

printf '%s\n' 'Bun or Node.js with npm is required to run this project.' >&2
exit 1