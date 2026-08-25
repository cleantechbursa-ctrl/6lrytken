import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { clearLocalAdminLoginFailures, localAdminLoginIsRateLimited, localAdminLoginRateLimitKey, recordLocalAdminLoginFailure, resetLocalAdminLoginRateLimitsForTests } from "./localAdmin";

function createContext(): { ctx: TrpcContext; cookies: string[] } {
  const cookies: string[] = [];
  return {
    ctx: { user: null, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: { cookie: (name: string) => cookies.push(name), clearCookie: () => undefined } as TrpcContext["res"] },
    cookies,
  };
}

describe("GLORY local administrator login", () => {
  it("limits repeated failed requests by forwarded client identifier and clears the window after a successful reset", () => {
    resetLocalAdminLoginRateLimitsForTests();
    const key = localAdminLoginRateLimitKey({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" });
    expect(key).toBe("203.0.113.7");

    for (let attempt = 0; attempt < 5; attempt += 1) recordLocalAdminLoginFailure(key, 1_000);
    expect(localAdminLoginIsRateLimited(key, 1_001)).toBe(true);

    clearLocalAdminLoginFailures(key);
    expect(localAdminLoginIsRateLimited(key, 1_001)).toBe(false);
  });

  it("accepts the configured server-side credentials and sets a local administrator session", async () => {
    resetLocalAdminLoginRateLimitsForTests();
    const configuredEmail = process.env.GLORY_ADMIN_EMAIL;
    const configuredPassword = process.env.GLORY_ADMIN_PASSWORD;
    expect(configuredEmail).toBeTruthy();
    expect(configuredPassword).toBeTruthy();
    const { ctx, cookies } = createContext();
    const result = await appRouter.createCaller(ctx).adminAuth.login({ email: configuredEmail!, password: configuredPassword! });
    expect(result.user.role).toBe("admin");
    expect(cookies).toContain("glory_admin_session");
  });
});
