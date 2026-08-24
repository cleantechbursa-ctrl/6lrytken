# GLORY Vercel Control Room Diagnosis — 2026-08-25

## Live observations

The Vercel project originally had no environment variables. The Production `GLORY_ADMIN_EMAIL`, `GLORY_ADMIN_PASSWORD`, and `JWT_SECRET` secrets have now been added and a Production redeploy completed successfully. However, a controlled request to the live `POST /api/trpc/adminAuth.login?batch=1` endpoint returned **HTTP 404** with Vercel's `NOT_FOUND` response. The client therefore renders the same generic credential error even when the configured credentials are used.

## Root cause

The live API function is not being served under `/api/*`. This is a deployment-routing issue rather than an administrator-email or password mismatch. The source file `api/[...path].ts` exists in the GitHub `main` tree, but the current Vite-style Vercel configuration publishes the static output without recognizing that catch-all file as an active backend entry.

## Required correction

The deployed correction adds an explicit `api/trpc/[...trpc].ts` Vercel function and changes the administrator tRPC dependency graph to explicit relative Node ESM `.js` specifiers. This avoids Vercel’s unsupported `server/routers` directory import and its unsupported TypeScript path aliases. The existing local-admin router, timing-safe credential comparison, secure HTTP-only session cookie and tRPC procedure remain unchanged.

## Resolution verification

After the final GitHub/Vercel deployment, `POST /api/trpc/adminAuth.login?batch=1` returns HTTP 200 for the protected configured administrator account and issues an HTTP-only, Secure `glory_admin_session` cookie. The same credentials were submitted in the live browser; the GLORY Control Room rendered successfully with the authenticated administrator profile and content-management controls.

`DATABASE_URL` remains the only Vercel variable not configured in Production. It is not needed for sign-in, but must be added before the Control Room can persist a future `SAVE & PUBLISH` change across deployments.

## External references

Vercel’s current Express guidance states that it detects a default-exported Express app only at recognized entry names and locations, including root `app.ts`, `index.ts`, `server.ts`, and their `src/` counterparts. It also states that the Express application becomes the Vercel Function. [Vercel Express documentation](https://vercel.com/docs/frameworks/backend/express) and [Vercel Express deployment guide](https://vercel.com/kb/guide/ship-a-express-app-on-vercel) were consulted on 2026-08-25.
