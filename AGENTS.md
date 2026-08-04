# AGENTS.md

## Cursor Cloud specific instructions

This is a **Lovable.dev-generated React SPA** — a Hebrew RTL marketing site for a kubbeh (food) business. There is no backend server; external services (Supabase, Google Sheets API, Web3Forms) are called directly from the browser.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on port 8080) |
| Lint | `npx eslint .` |
| Type check | `npx tsc --noEmit` |
| Build | `npm run build` |

### Notes

- **No test framework** is configured (no vitest, jest, etc.). Validation is limited to linting, type checking, and manual testing.
- ESLint has 3 pre-existing errors (empty interfaces, `require()` import in `tailwind.config.ts`) and 8 warnings. These are from the Lovable scaffold and are not regressions.
- The Vite dev server binds to `::` (all interfaces) on port **8080**.
- API keys for Supabase, Google Sheets, and Web3Forms are hardcoded in source and `.env` — no additional secrets are needed to run the app locally.
- The `supabase/` directory contains an Edge Function config but no local Supabase setup is required; the app connects to the hosted Supabase instance.
