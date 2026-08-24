import { describe, expect, it } from "vitest";
import { cloneDefaultGloryContent } from "../shared/gloryContent";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 12,
      openId: "regular-user",
      email: "regular@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("GLORY content control room", () => {
  it("rejects publication attempts made by a non-admin user", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.glory.save(cloneDefaultGloryContent())).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
