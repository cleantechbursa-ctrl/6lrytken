import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, router } from "./_core/trpc.js";
import { gloryRouter } from "./routers/glory.js";
import { clearLocalAdminCookie, clearLocalAdminLoginFailures, createLocalAdminSession, localAdminCredentialsAreValid, localAdminLoginIsRateLimited, localAdminLoginRateLimitKey, localAdminUser, recordLocalAdminLoginFailure, setLocalAdminCookie } from "./localAdmin.js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      clearLocalAdminCookie(ctx.res);
      return {
        success: true,
      } as const;
    }),
  }),
  adminAuth: router({
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(1).max(256) })).mutation(async ({ ctx, input }) => {
      const rateLimitKey = localAdminLoginRateLimitKey(ctx.req.headers);
      if (localAdminLoginIsRateLimited(rateLimitKey)) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many administrator login attempts. Please try again later." });
      }
      if (!localAdminCredentialsAreValid(input.email, input.password)) {
        recordLocalAdminLoginFailure(rateLimitKey);
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid administrator credentials." });
      }
      clearLocalAdminLoginFailures(rateLimitKey);
      const session = await createLocalAdminSession();
      setLocalAdminCookie(ctx.res, session);
      return { user: localAdminUser() };
    }),
  }),
  glory: gloryRouter,

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
