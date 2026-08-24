# GLORY

The official GLORY ecosystem platform, built with React, TypeScript, Vite, Express, tRPC and a persistent content-management Control Room.

## Local development

```bash
pnpm install
pnpm dev
```

## Vercel deployment

The repository includes `vercel.json`, a catch-all API function under `api/[...path].ts`, and `VERCEL_SETUP.md`. Set the required production secrets in Vercel before deploying:

- `DATABASE_URL`
- `JWT_SECRET`
- `GLORY_ADMIN_EMAIL`
- `GLORY_ADMIN_PASSWORD`

Then connect this repository to a Vercel project and deploy from the `main` branch.
