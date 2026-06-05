# Copilot instructions — MAUE-W3

Purpose: short, machine-friendly guide so Copilot sessions understand how to build, run, and modify this repo.

---

Quick commands
- Install dependencies (CI): `npm ci`
- Install locally: `npm install`
- Dev server (hot reload): `npm run dev`  (Vite)
- Build (type-check + bundle): `npm run build`  — runs `tsc -b` then `vite build`
- Preview production build locally: `npm run preview`
- Lint: `npm run lint` (runs `eslint .`)
  - Lint a single file: `npx eslint src/components/DesignSystem.tsx` (or any path)
- Deploy (local / gh-pages): `npm run deploy` (`gh-pages -d dist`) — CI uses GitHub Actions instead (see below)

Tests
- There is no test runner or test scripts configured in package.json. (No `test` script present.)

---

High-level architecture (big picture)
- Tech stack: React + TypeScript + Vite. UI built with Fluent UI components & tokens.
- Entry: `src/main.tsx` mounts `src/App.tsx`.
- App versioning: `src/App.tsx` selects one of the variant entry points in `src/versions/` (AppV1..AppV4). Each variant is a self-contained UI prototype.
- Shared design system: `src/components/DesignSystem.tsx` centralizes theme (createLightTheme), tokens, makeStyles and large CSS/snippet collections used across versions.
- Features: PDF export via `jspdf` + `jspdf-autotable` (used in `src/versions/AppV4.tsx`), client-side UI only (no backend in this repo).
- Type-check + build: `tsc -b` is used to type-check composite project references (see `tsconfig.json`) before the Vite build.

---

Key repo conventions (what matters to Copilot)
- "Versions" pattern: UI experiments/use-cases live as `src/versions/AppV*.tsx`. When changing UI, prefer editing or adding a version file and update `src/App.tsx`'s version list rather than making sweeping changes in multiple versions.
- Design tokens and styles:
  - Use the theme/tokens in `src/components/DesignSystem.tsx` (createLightTheme + tokens) for colors, spacing, typography.
  - Styles are implemented with Fluent UI's `makeStyles` and CSS snippets inside the DesignSystem; prefer tokens over hard-coded hex when adding UI.
- TypeScript project refs: `tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`. `npm run build` depends on this. If adding new TS packages or folders, update these references and use `tsc -b` to validate.
- PDF/Export: `jspdf` + `jspdf-autotable` are used — changes to export tables should be made in the version that calls `jsPDF` (AppV4 currently).
- Deployment: CI workflow (`.github/workflows/deploy.yml`) runs on Node 20 and uses `npm ci` and `npm run build`. The published artifact is `dist/`. The workflow optionally encrypts `dist/index.html` with `staticrypt` when `SITE_PASSWORD` secret is set.
- Linting: `eslint` is available; run `npm run lint`. Copilot edits that change TS/JS files should include a lint pass.

---

Files and places to check first
- package.json (scripts & deps)
- tsconfig.json / tsconfig.app.json (build/type-check setup)
- src/main.tsx, src/App.tsx (version switch), src/versions/*.tsx (UI variants)
- src/components/DesignSystem.tsx (theme, tokens, global styles)
- .github/workflows/deploy.yml (CI / pages deployment)
- README.md (project notes & contributor guidance)

---

How to prompt Copilot for repository tasks (short examples)
- For UI changes: "Update the agent card layout in src/versions/AppV4.tsx to move the avatar left of the title; reuse tokens from src/components/DesignSystem.tsx."
- For theme changes: "Add a new brand shade 170 to the customBrand in src/components/DesignSystem.tsx and use it for the version pill background." 
- For build/deploy fixes: "The CI deploy step fails with Node 18; update .github/workflows/deploy.yml to use Node 20 and ensure npm ci is used." 

---

Notes
- This repo currently doesn't include automated tests; add a test runner (Vitest/Jest) and `test` scripts when adding unit tests.
- Prefer `npm ci` in CI to ensure lockfile fidelity.

---

If you need the instructions expanded for a specific task area (tests, CI, Playwright/Cypress setup), mention which area and Copilot sessions can be tailored to that scope.
