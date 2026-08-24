# GLORY — Vercel Deployment Notes

## Official guidance consulted

- Vercel’s [Vite deployment guide](https://vercel.com/docs/frameworks/frontend/vite), accessed 2026-08-25, specifies a root `vercel.json` SPA fallback rewrite to `/index.html` for Vite deep links.
- Vercel’s [Express deployment guide](https://vercel.com/kb/guide/using-express-with-vercel), accessed 2026-08-25, describes exporting an Express app from an `/api` entry and routing server-backed requests through that function.
- Vercel’s [rewrites documentation](https://vercel.com/docs/routing/rewrites), accessed 2026-08-25, documents route rewriting as an in-app request mapping mechanism.

## GLORY implication

GLORY is not a static-only Vite site: it includes tRPC, a database-backed content manager and administrator authentication. Vercel therefore needs both a static SPA build output and a serverless Express API entry. The deployment rules must keep `/api/*` and `/manus-storage/*` on the Express function while sending other deep links to the built SPA entry point.

## Environment configuration required on Vercel

The Vercel project must define `DATABASE_URL`, `JWT_SECRET`, `GLORY_ADMIN_EMAIL`, and `GLORY_ADMIN_PASSWORD` for the control room. `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY` are required only if the legacy `/manus-storage/*` proxy remains in use; exported sites should prefer externally reachable asset URLs.
