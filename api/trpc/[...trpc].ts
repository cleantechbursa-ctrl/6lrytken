/**
 * Explicit Vercel Function for GLORY tRPC requests.
 * A dedicated /api/trpc catch-all is used instead of relying on the broader
 * storage/OAuth function so production Control Room authentication is always
 * discovered as a Vercel API route.
 */
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../../server/routers.js";
import { createContext } from "../../server/_core/context.js";

const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
