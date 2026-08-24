# GLORY Vercel Control Room Diagnosis — 2026-08-25

## Live observations

The Vercel project originally had no environment variables. The Production `GLORY_ADMIN_EMAIL`, `GLORY_ADMIN_PASSWORD`, and `JWT_SECRET` secrets have now been added and a Production redeploy completed successfully. However, a controlled request to the live `POST /api/trpc/adminAuth.login?batch=1` endpoint returned **HTTP 404** with Vercel's `NOT_FOUND` response. The client therefore renders the same generic credential error even when the configured credentials are used.

## Root cause

The live API function is not being served under `/api/*`. This is a deployment-routing issue rather than an administrator-email or password mismatch. The source file `api/[...path].ts` exists in the GitHub `main` tree, but the current Vite-style Vercel configuration publishes the static output without recognizing that catch-all file as an active backend entry.

## Required correction

The project needs a recognized root Express entry such as `server.ts` that default-exports the Express application, then needs Vercel rewrites that preserve `/api/*` and route public SPA paths to `index.html`. The existing local-admin router, timing-safe credential comparison, secure HTTP-only session cookie and tRPC procedure should remain unchanged.

## External references

Vercel’s current Express guidance states that it detects a default-exported Express app only at recognized entry names and locations, including root `app.ts`, `index.ts`, `server.ts`, and their `src/` counterparts. It also states that the Express application becomes the Vercel Function. [Vercel Express documentation](https://vercel.com/docs/frameworks/backend/express) and [Vercel Express deployment guide](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) were consulted on 2026-08-25.
