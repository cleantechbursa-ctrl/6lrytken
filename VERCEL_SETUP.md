# GLORY — Vercel Setup

## Build settings

Set the Vercel project root to this repository root. The committed `vercel.json` selects the Vite framework, runs `pnpm build`, serves `dist/public`, preserves `/api/*` for the serverless function, and routes public deep links to the SPA entry point.

## Required environment variables

Configure these values in **Vercel → Project Settings → Environment Variables** for Preview and Production:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Persistent GLORY content and user data when a managed MySQL database is connected. |
| `BLOB_READ_WRITE_TOKEN` | Required fallback for persistent managed GLORY content when `DATABASE_URL` is not available; the app writes `glory/site-content.json` with overwrite enabled. |
| `JWT_SECRET` | Signs server-side GLORY administrator sessions. |
| `GLORY_ADMIN_EMAIL` | Authorized Control Room username. |
| `GLORY_ADMIN_PASSWORD` | Authorized Control Room password. |

The legacy Manus OAuth fields (`VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OAUTH_SERVER_URL`) are only required if that optional login path is enabled. The public GLORY Control Room uses the local administrator session above.

## Post-deploy check

After Vercel redeploys, open `/`, `/whitepaper`, and `/admin`. Confirm that the administrator can sign in, publish a reversible marker, read it on both public routes, and restore the official content. If `DATABASE_URL` is absent, confirm that `BLOB_READ_WRITE_TOKEN` is configured in the Production environment before testing persistence.
