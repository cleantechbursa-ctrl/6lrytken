import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): { ctx: TrpcContext; cookies: string[] } {
  const cookies: string[] = [];
  return {
    ctx: { user: null, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: { cookie: (name: string) => cookies.push(name), clearCookie: () => undefined } as TrpcContext["res"] },
    cookies,
  };
}

describe("GLORY local administrator login", () => {
  it("accepts the configured server-side credentials and sets a local administrator session", async () => {
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
